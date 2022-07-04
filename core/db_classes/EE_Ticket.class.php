<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\exceptions\UnexpectedEntityException;

/**
 * EE_Ticket class
 *
 * @package            Event Espresso
 * @subpackage         includes/classes/EE_Ticket.class.php
 * @author             Darren Ethier
 */
class EE_Ticket extends EE_Soft_Delete_Base_Class implements EEI_Line_Item_Object, EEI_Event_Relation, EEI_Has_Icon
{
    /**
     * The following constants are used by the ticket_status() method to indicate whether a ticket is on sale or not.
     */
    const sold_out = 'TKS';

    /**
     *
     */
    const expired = 'TKE';

    /**
     *
     */
    const archived = 'TKA';

    /**
     *
     */
    const pending = 'TKP';

    /**
     *
     */
    const onsale = 'TKO';

    /**
     * extra meta key for tracking ticket reservations
     *
     * @type string
     */
    const META_KEY_TICKET_RESERVATIONS = 'ticket_reservations';

    /**
     * cached result from method of the same name
     *
     * @var float $_ticket_total_with_taxes
     */
    private $_ticket_total_with_taxes;


    /**
     * @param array  $props_n_values          incoming values
     * @param string $timezone                incoming timezone (if not set the timezone set for the website will be
     *                                        used.)
     * @param array  $date_formats            incoming date_formats in an array where the first value is the
     *                                        date_format and the second value is the time format
     * @return EE_Ticket
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function new_instance($props_n_values = [], $timezone = null, $date_formats = [])
    {
        $has_object = parent::_check_for_object($props_n_values, __CLASS__, $timezone, $date_formats);
        return $has_object ? $has_object : new self($props_n_values, false, $timezone, $date_formats);
    }


    /**
     * @param array  $props_n_values  incoming values from the database
     * @param string $timezone        incoming timezone as set by the model.  If not set the timezone for
     *                                the website will be used.
     * @return EE_Ticket
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function new_instance_from_db($props_n_values = [], $timezone = null)
    {
        return new self($props_n_values, true, $timezone);
    }


    /**
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function parent()
    {
        return $this->get('TKT_parent');
    }


    /**
     * return if a ticket has quantities available for purchase
     *
     * @param int $DTT_ID the primary key for a particular datetime
     * @return boolean
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function available($DTT_ID = 0)
    {
        // are we checking availability for a particular datetime ?
        if ($DTT_ID) {
            // get that datetime object
            $datetime = $this->get_first_related('Datetime', [['DTT_ID' => $DTT_ID]]);
            // if  ticket sales for this datetime have exceeded the reg limit...
            if ($datetime instanceof EE_Datetime && $datetime->sold_out()) {
                return false;
            }
        }
        // datetime is still open for registration, but is this ticket sold out ?
        return $this->qty() < 1 || $this->qty() > $this->sold() ? true : false;
    }


    /**
     * Using the start date and end date this method calculates whether the ticket is On Sale, Pending, or Expired
     *
     * @param bool        $display   true = we'll return a localized string, otherwise we just return the value of the
     *                               relevant status const
     * @param bool | null $remaining if it is already known that tickets are available, then simply pass a bool to save
     *                               further processing
     * @return mixed status int if the display string isn't requested
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function ticket_status($display = false, $remaining = null)
    {
        $remaining = is_bool($remaining) ? $remaining : $this->is_remaining();
        if (! $remaining) {
            return $display ? EEH_Template::pretty_status(EE_Ticket::sold_out, false, 'sentence') : EE_Ticket::sold_out;
        }
        if ($this->get('TKT_deleted')) {
            return $display ? EEH_Template::pretty_status(EE_Ticket::archived, false, 'sentence') : EE_Ticket::archived;
        }
        if ($this->is_expired()) {
            return $display ? EEH_Template::pretty_status(EE_Ticket::expired, false, 'sentence') : EE_Ticket::expired;
        }
        if ($this->is_pending()) {
            return $display ? EEH_Template::pretty_status(EE_Ticket::pending, false, 'sentence') : EE_Ticket::pending;
        }
        if ($this->is_on_sale()) {
            return $display ? EEH_Template::pretty_status(EE_Ticket::onsale, false, 'sentence') : EE_Ticket::onsale;
        }
        return '';
    }


    /**
     * The purpose of this method is to simply return a boolean for whether there are any tickets remaining for sale
     * considering ALL the factors used for figuring that out.
     *
     * @access public
     * @param int $DTT_ID if an int above 0 is included here then we get a specific dtt.
     * @return boolean         true = tickets remaining, false not.
     * @throws EE_Error
     */
    public function is_remaining($DTT_ID = 0)
    {
        $num_remaining = $this->remaining($DTT_ID);
        if ($num_remaining === 0) {
            return false;
        }
        if ($num_remaining > 0 && $num_remaining < $this->min()) {
            return false;
        }
        return true;
    }


    /**
     * return the total number of tickets available for purchase
     *
     * @param int $DTT_ID  the primary key for a particular datetime.
     *                     set to 0 for all related datetimes
     * @return int
     * @throws EE_Error
     */
    public function remaining($DTT_ID = 0)
    {
        return $this->real_quantity_on_ticket('saleable', $DTT_ID);
    }


    /**
     * Gets min
     *
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function min()
    {
        return $this->get('TKT_min');
    }


    /**
     * return if a ticket is no longer available cause its available dates have expired.
     *
     * @return boolean
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function is_expired()
    {
        return ($this->get_raw('TKT_end_date') < time());
    }


    /**
     * Return if a ticket is yet to go on sale or not
     *
     * @return boolean
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function is_pending()
    {
        return ($this->get_raw('TKT_start_date') > time());
    }


    /**
     * Return if a ticket is on sale or not
     *
     * @return boolean
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function is_on_sale()
    {
        return ($this->get_raw('TKT_start_date') < time() && $this->get_raw('TKT_end_date') > time());
    }


    /**
     * This returns the chronologically last datetime that this ticket is associated with
     *
     * @param string $dt_frmt
     * @param string $conjunction - conjunction junction what's your function ? this string joins the start date with
     *                            the end date ie: Jan 01 "to" Dec 31
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function date_range($dt_frmt = '', $conjunction = ' - ')
    {
        $dt_frmt    = ! empty($dt_frmt) ? $dt_frmt : $this->_dt_frmt;
        $first_date = $this->first_datetime() instanceof EE_Datetime
            ? $this->first_datetime()->get_i18n_datetime(
                'DTT_EVT_start',
                $dt_frmt
            ) : '';
        $last_date  =
            $this->last_datetime() instanceof EE_Datetime ? $this->last_datetime()->get_i18n_datetime(
                'DTT_EVT_end',
                $dt_frmt
            ) : '';

        return $first_date && $last_date ? $first_date . $conjunction . $last_date : '';
    }


    /**
     * This returns the chronologically first datetime that this ticket is associated with
     *
     * @return EE_Datetime
     * @throws EE_Error
     */
    public function first_datetime()
    {
        $datetimes = $this->datetimes(['limit' => 1]);
        return reset($datetimes);
    }


    /**
     * Gets all the datetimes this ticket can be used for attending.
     * Unless otherwise specified, orders datetimes by start date.
     *
     * @param array $query_params @see
     *                            https://github.com/eventespresso/event-espresso-core/tree/master/docs/G--Model-System/model-query-params.md
     * @return EE_Datetime[]|EE_Base_Class[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function datetimes($query_params = [])
    {
        if (! isset($query_params['order_by'])) {
            $query_params['order_by']['DTT_order'] = 'ASC';
        }
        return $this->get_many_related('Datetime', $query_params);
    }


    /**
     * This returns the chronologically last datetime that this ticket is associated with
     *
     * @return EE_Datetime
     * @throws EE_Error
     */
    public function last_datetime()
    {
        $datetimes = $this->datetimes(['limit' => 1, 'order_by' => ['DTT_EVT_start' => 'DESC']]);
        return end($datetimes);
    }


    /**
     * This returns the total tickets sold depending on the given parameters.
     *
     * @param string $what    Can be one of two options: 'ticket', 'datetime'.
     *                        'ticket' = total ticket sales for all datetimes this ticket is related to
     *                        'datetime' = total ticket sales for a specified datetime (required $dtt_id)
     *                        'datetime' = total ticket sales in the datetime_ticket table.
     *                        If $dtt_id is not given then we return an array of sales indexed by datetime.
     *                        If $dtt_id IS given then we return the tickets sold for that given datetime.
     * @param int    $dtt_id  [optional] include the dtt_id with $what = 'datetime'.
     * @return mixed (array|int)          how many tickets have sold
     * @throws EE_Error
     */
    public function tickets_sold($what = 'ticket', $dtt_id = null)
    {
        $total        = 0;
        $tickets_sold = $this->_all_tickets_sold();
        switch ($what) {
            case 'ticket':
                return $tickets_sold['ticket'];
                break;
            case 'datetime':
                if (empty($tickets_sold['datetime'])) {
                    return $total;
                }
                if (! empty($dtt_id) && ! isset($tickets_sold['datetime'][ $dtt_id ])) {
                    EE_Error::add_error(
                        esc_html__(
                            'You\'ve requested the amount of tickets sold for a given ticket and datetime, however there are no records for the datetime id you included.  Are you SURE that is a datetime related to this ticket?',
                            'event_espresso'
                        ),
                        __FILE__,
                        __FUNCTION__,
                        __LINE__
                    );
                    return $total;
                }
                return empty($dtt_id) ? $tickets_sold['datetime'] : $tickets_sold['datetime'][ $dtt_id ];
                break;
            default:
                return $total;
        }
    }


    /**
     * This returns an array indexed by datetime_id for tickets sold with this ticket.
     *
     * @return EE_Ticket[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _all_tickets_sold()
    {
        $datetimes    = $this->get_many_related('Datetime');
        $tickets_sold = [];
        if (! empty($datetimes)) {
            foreach ($datetimes as $datetime) {
                $tickets_sold['datetime'][ $datetime->ID() ] = $datetime->get('DTT_sold');
            }
        }
        // Tickets sold
        $tickets_sold['ticket'] = $this->sold();
        return $tickets_sold;
    }


    /**
     * This returns the base price object for the ticket.
     *
     * @param bool $return_array whether to return as an array indexed by price id or just the object.
     * @return EE_Price|EE_Base_Class|EE_Price[]|EE_Base_Class[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function base_price($return_array = false)
    {
        $_where = ['Price_Type.PBT_ID' => EEM_Price_Type::base_type_base_price];
        return $return_array
            ? $this->get_many_related('Price', [$_where])
            : $this->get_first_related('Price', [$_where]);
    }


    /**
     * This returns ONLY the price modifiers for the ticket (i.e. no taxes or base price)
     *
     * @access public
     * @return EE_Price[]
     * @throws EE_Error
     */
    public function price_modifiers()
    {
        $query_params = [
            0 => [
                'Price_Type.PBT_ID' => [
                    'NOT IN',
                    [EEM_Price_Type::base_type_base_price, EEM_Price_Type::base_type_tax],
                ],
            ],
        ];
        return $this->prices($query_params);
    }


    /**
     * Gets all the prices that combine to form the final price of this ticket
     *
     * @param array $query_params @see
     *                            https://github.com/eventespresso/event-espresso-core/tree/master/docs/G--Model-System/model-query-params.md
     * @return EE_Price[]|EE_Base_Class[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function prices($query_params = [])
    {
        return $this->get_many_related('Price', $query_params);
    }


    /**
     * Gets all the ticket applicabilities (ie, relations between datetimes and tickets)
     *
     * @param array $query_params @see
     *                            https://github.com/eventespresso/event-espresso-core/tree/master/docs/G--Model-System/model-query-params.md
     * @return EE_Datetime_Ticket|EE_Base_Class[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function datetime_tickets($query_params = [])
    {
        return $this->get_many_related('Datetime_Ticket', $query_params);
    }


    /**
     * Gets all the datetimes from the db ordered by DTT_order
     *
     * @param boolean $show_expired
     * @param boolean $show_deleted
     * @return EE_Datetime[]
     * @throws EE_Error
     */
    public function datetimes_ordered($show_expired = true, $show_deleted = false)
    {
        return EEM_Datetime::instance($this->_timezone)->get_datetimes_for_ticket_ordered_by_DTT_order(
            $this->ID(),
            $show_expired,
            $show_deleted
        );
    }


    /**
     * Gets ID
     *
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function ID()
    {
        return (int) $this->get('TKT_ID');
    }


    /**
     * get the author of the ticket.
     *
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     * @since 4.5.0
     */
    public function wp_user()
    {
        return $this->get('TKT_wp_user');
    }


    /**
     * Gets the template for the ticket
     *
     * @return EE_Ticket_Template|EE_Base_Class
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function template()
    {
        return $this->get_first_related('Ticket_Template');
    }


    /**
     * Simply returns an array of EE_Price objects that are taxes.
     *
     * @return EE_Price[]
     * @throws EE_Error
     */
    public function get_ticket_taxes_for_admin()
    {
        return EE_Taxes::get_taxes_for_admin();
    }


    /**
     * @return float
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function ticket_price()
    {
        return $this->get('TKT_price');
    }


    /**
     * @return mixed
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function pretty_price()
    {
        return $this->get_pretty('TKT_price');
    }


    /**
     * @return bool
     * @throws EE_Error
     */
    public function is_free()
    {
        return $this->get_ticket_total_with_taxes() === (float) 0;
    }


    /**
     * get_ticket_total_with_taxes
     *
     * @param bool $no_cache
     * @return float
     * @throws EE_Error
     */
    public function get_ticket_total_with_taxes($no_cache = false)
    {
        if ($this->_ticket_total_with_taxes === null || $no_cache) {
            $this->_ticket_total_with_taxes = $this->get_ticket_subtotal() + $this->get_ticket_taxes_total_for_admin();
        }
        return (float) $this->_ticket_total_with_taxes;
    }


    public function ensure_TKT_Price_correct()
    {
        $this->set('TKT_price', EE_Taxes::get_subtotal_for_admin($this));
        $this->save();
    }


    /**
     * @return float
     * @throws EE_Error
     */
    public function get_ticket_subtotal()
    {
        return EE_Taxes::get_subtotal_for_admin($this);
    }


    /**
     * Returns the total taxes applied to this ticket
     *
     * @return float
     * @throws EE_Error
     */
    public function get_ticket_taxes_total_for_admin()
    {
        return EE_Taxes::get_total_taxes_for_admin($this);
    }


    /**
     * Sets name
     *
     * @param string $name
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_name($name)
    {
        $this->set('TKT_name', $name);
    }


    /**
     * Gets description
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function description()
    {
        return $this->get('TKT_description');
    }


    /**
     * Sets description
     *
     * @param string $description
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_description($description)
    {
        $this->set('TKT_description', $description);
    }


    /**
     * Gets start_date
     *
     * @param string $dt_frmt
     * @param string $tm_frmt
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function start_date($dt_frmt = '', $tm_frmt = '')
    {
        return $this->_get_datetime('TKT_start_date', $dt_frmt, $tm_frmt);
    }


    /**
     * Sets start_date
     *
     * @param string $start_date
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_start_date($start_date)
    {
        $this->_set_date_time('B', $start_date, 'TKT_start_date');
    }


    /**
     * Gets end_date
     *
     * @param string $dt_frmt
     * @param string $tm_frmt
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function end_date($dt_frmt = '', $tm_frmt = '')
    {
        return $this->_get_datetime('TKT_end_date', $dt_frmt, $tm_frmt);
    }


    /**
     * Sets end_date
     *
     * @param string $end_date
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_end_date($end_date)
    {
        $this->_set_date_time('B', $end_date, 'TKT_end_date');
    }


    /**
     * Sets sell until time
     *
     * @param string $time a string representation of the sell until time (ex 9am or 7:30pm)
     * @throws EE_Error*@throws ReflectionException
     * @since 4.5.0
     */
    public function set_end_time($time)
    {
        $this->_set_time_for($time, 'TKT_end_date');
    }


    /**
     * Sets min
     *
     * @param int $min
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_min($min)
    {
        $this->set('TKT_min', $min);
    }


    /**
     * Gets max
     *
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function max()
    {
        return $this->get('TKT_max');
    }


    /**
     * Sets max
     *
     * @param int $max
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_max($max)
    {
        $this->set('TKT_max', $max);
    }


    /**
     * Sets price
     *
     * @param float $price
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_price($price)
    {
        $this->set('TKT_price', $price);
    }


    /**
     * Gets sold
     *
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function sold()
    {
        return $this->get_raw('TKT_sold');
    }


    /**
     * Sets sold
     *
     * @param int $sold
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_sold($sold)
    {
        // sold can not go below zero
        $sold = max(0, $sold);
        $this->set('TKT_sold', $sold);
    }


    /**
     * Increments sold by amount passed by $qty AND decrements the reserved count on both this ticket and its
     * associated datetimes.
     *
     * @param int $qty
     * @return boolean
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @since 4.9.80.p
     */
    public function increaseSold($qty = 1)
    {
        $qty = absint($qty);
        // increment sold and decrement reserved datetime quantities simultaneously
        // don't worry about failures, because they must have already had a spot reserved
        $this->increaseSoldForDatetimes($qty);
        // Increment and decrement ticket quantities simultaneously
        $success = $this->adjustNumericFieldsInDb(
            [
                'TKT_reserved' => $qty * -1,
                'TKT_sold'     => $qty,
            ]
        );
        do_action(
            'AHEE__EE_Ticket__increase_sold',
            $this,
            $qty,
            $this->sold(),
            $success
        );
        return $success;
    }


    /**
     * On each datetime related to this ticket, increases its sold count and decreases its reserved count by $qty.
     *
     * @param int           $qty positive or negative. Positive means to increase sold counts (and decrease reserved
     *                           counts), Negative means to decreases old counts (and increase reserved counts).
     * @param EE_Datetime[] $datetimes
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @since 4.9.80.p
     */
    protected function increaseSoldForDatetimes($qty, array $datetimes = [])
    {
        $datetimes = ! empty($datetimes) ? $datetimes : $this->datetimes();
        foreach ($datetimes as $datetime) {
            $datetime->increaseSold($qty);
        }
    }


    /**
     * Decrements (subtracts) sold by amount passed by $qty on both the ticket and its related datetimes directly in the
     * DB and then updates the model objects.
     * Does not affect the reserved counts.
     *
     * @param int $qty
     * @return boolean
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @since 4.9.80.p
     */
    public function decreaseSold($qty = 1)
    {
        $qty = absint($qty);
        $this->decreaseSoldForDatetimes($qty);
        $success = $this->adjustNumericFieldsInDb(
            [
                'TKT_sold' => $qty * -1,
            ]
        );
        do_action(
            'AHEE__EE_Ticket__decrease_sold',
            $this,
            $qty,
            $this->sold(),
            $success
        );
        return $success;
    }


    /**
     * Decreases sold on related datetimes
     *
     * @param int           $qty
     * @param EE_Datetime[] $datetimes
     * @return void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @since 4.9.80.p
     */
    protected function decreaseSoldForDatetimes($qty = 1, array $datetimes = [])
    {
        $datetimes = ! empty($datetimes) ? $datetimes : $this->datetimes();
        if (is_array($datetimes)) {
            foreach ($datetimes as $datetime) {
                if ($datetime instanceof EE_Datetime) {
                    $datetime->decreaseSold($qty);
                }
            }
        }
    }


    /**
     * Gets qty of reserved tickets
     *
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function reserved()
    {
        return $this->get_raw('TKT_reserved');
    }


    /**
     * Sets reserved
     *
     * @param int $reserved
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_reserved($reserved)
    {
        // reserved can not go below zero
        $reserved = max(0, (int) $reserved);
        $this->set('TKT_reserved', $reserved);
    }


    /**
     * Increments reserved by amount passed by $qty, and persists it immediately to the database.
     *
     * @param int    $qty
     * @param string $source
     * @return bool whether we successfully reserved the ticket or not.
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @since 4.9.80.p
     */
    public function increaseReserved($qty = 1, $source = 'unknown')
    {
        $qty = absint($qty);
        do_action(
            'AHEE__EE_Ticket__increase_reserved__begin',
            $this,
            $qty,
            $source
        );
        $this->add_extra_meta(EE_Ticket::META_KEY_TICKET_RESERVATIONS, "{$qty} from {$source}");
        $success                         = false;
        $datetimes_adjusted_successfully = $this->increaseReservedForDatetimes($qty);
        if ($datetimes_adjusted_successfully) {
            $success = $this->incrementFieldConditionallyInDb(
                'TKT_reserved',
                'TKT_sold',
                'TKT_qty',
                $qty
            );
            if (! $success) {
                // The datetimes were successfully bumped, but not the
                // ticket. So we need to manually rollback the datetimes.
                $this->decreaseReservedForDatetimes($qty);
            }
        }
        do_action(
            'AHEE__EE_Ticket__increase_reserved',
            $this,
            $qty,
            $this->reserved(),
            $success
        );
        return $success;
    }


    /**
     * Increases reserved counts on related datetimes
     *
     * @param int           $qty
     * @param EE_Datetime[] $datetimes
     * @return boolean indicating success
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @since 4.9.80.p
     */
    protected function increaseReservedForDatetimes($qty = 1, array $datetimes = [])
    {
        $datetimes         = ! empty($datetimes) ? $datetimes : $this->datetimes();
        $datetimes_updated = [];
        $limit_exceeded    = false;
        if (is_array($datetimes)) {
            foreach ($datetimes as $datetime) {
                if ($datetime instanceof EE_Datetime) {
                    if ($datetime->increaseReserved($qty)) {
                        $datetimes_updated[] = $datetime;
                    } else {
                        $limit_exceeded = true;
                        break;
                    }
                }
            }
            // If somewhere along the way we detected a datetime whose
            // limit was exceeded, do a manual rollback.
            if ($limit_exceeded) {
                $this->decreaseReservedForDatetimes($qty, $datetimes_updated);
                return false;
            }
        }
        return true;
    }


    /**
     * Decrements (subtracts) reserved by amount passed by $qty, and persists it immediately to the database.
     *
     * @param int    $qty
     * @param bool   $adjust_datetimes
     * @param string $source
     * @return boolean
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @since 4.9.80.p
     */
    public function decreaseReserved($qty = 1, $adjust_datetimes = true, $source = 'unknown')
    {
        $qty = absint($qty);
        $this->add_extra_meta(EE_Ticket::META_KEY_TICKET_RESERVATIONS, "-{$qty} from {$source}");
        if ($adjust_datetimes) {
            $this->decreaseReservedForDatetimes($qty);
        }
        $success = $this->adjustNumericFieldsInDb(
            [
                'TKT_reserved' => $qty * -1,
            ]
        );
        do_action(
            'AHEE__EE_Ticket__decrease_reserved',
            $this,
            $qty,
            $this->reserved(),
            $success
        );
        return $success;
    }


    /**
     * Decreases the reserved count on the specified datetimes.
     *
     * @param int           $qty
     * @param EE_Datetime[] $datetimes
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @since 4.9.80.p
     */
    protected function decreaseReservedForDatetimes($qty = 1, array $datetimes = [])
    {
        $datetimes = ! empty($datetimes) ? $datetimes : $this->datetimes();
        foreach ($datetimes as $datetime) {
            if ($datetime instanceof EE_Datetime) {
                $datetime->decreaseReserved($qty);
            }
        }
    }


    /**
     * Gets ticket quantity
     *
     * @param string $context     ticket quantity is somewhat subjective depending on the exact information sought
     *                            therefore $context can be one of three values: '', 'reg_limit', or 'saleable'
     *                            '' (default) quantity is the actual db value for TKT_qty, unaffected by other objects
     *                            REG LIMIT: caps qty based on DTT_reg_limit for ALL related datetimes
     *                            SALEABLE: also considers datetime sold and returns zero if ANY DTT is sold out, and
     *                            is therefore the truest measure of tickets that can be purchased at the moment
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function qty($context = '')
    {
        switch ($context) {
            case 'reg_limit':
                return $this->real_quantity_on_ticket();
            case 'saleable':
                return $this->real_quantity_on_ticket('saleable');
            default:
                return $this->get_raw('TKT_qty');
        }
    }


    /**
     * Gets ticket quantity
     *
     * @param string $context     ticket quantity is somewhat subjective depending on the exact information sought
     *                            therefore $context can be one of two values: 'reg_limit', or 'saleable'
     *                            REG LIMIT: caps qty based on DTT_reg_limit for ALL related datetimes
     *                            SALEABLE: also considers datetime sold and returns zero if ANY DTT is sold out, and
     *                            is therefore the truest measure of tickets that can be purchased at the moment
     * @param int    $DTT_ID      the primary key for a particular datetime.
     *                            set to 0 for all related datetimes
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function real_quantity_on_ticket($context = 'reg_limit', $DTT_ID = 0)
    {
        $raw = $this->get_raw('TKT_qty');
        // return immediately if it's zero
        if ($raw === 0) {
            return $raw;
        }
        // echo "\n\n<br />Ticket: " . $this->name() . '<br />';
        // ensure qty doesn't exceed raw value for THIS ticket
        $qty = min(EE_INF, $raw);
        // echo "\n . qty: " . $qty . '<br />';
        // calculate this ticket's total sales and reservations
        $sold_and_reserved_for_this_ticket = $this->sold() + $this->reserved();
        // echo "\n . sold: " . $this->sold() . '<br />';
        // echo "\n . reserved: " . $this->reserved() . '<br />';
        // echo "\n . sold_and_reserved_for_this_ticket: " . $sold_and_reserved_for_this_ticket . '<br />';
        // first we need to calculate the maximum number of tickets available for the datetime
        // do we want data for one datetime or all of them ?
        $query_params = $DTT_ID ? [['DTT_ID' => $DTT_ID]] : [];
        $datetimes    = $this->datetimes($query_params);
        if (is_array($datetimes) && ! empty($datetimes)) {
            foreach ($datetimes as $datetime) {
                if ($datetime instanceof EE_Datetime) {
                    $datetime->refresh_from_db();
                    // echo "\n . . datetime name: " . $datetime->name() . '<br />';
                    // echo "\n . . datetime ID: " . $datetime->ID() . '<br />';
                    // initialize with no restrictions for each datetime
                    // but adjust datetime qty based on datetime reg limit
                    $datetime_qty = min(EE_INF, $datetime->reg_limit());
                    // echo "\n . . . datetime reg_limit: " . $datetime->reg_limit() . '<br />';
                    // echo "\n . . . datetime_qty: " . $datetime_qty . '<br />';
                    // if we want the actual saleable amount, then we need to consider OTHER ticket sales
                    // and reservations for this datetime, that do NOT include sales and reservations
                    // for this ticket (so we add $this->sold() and $this->reserved() back in)
                    if ($context === 'saleable') {
                        $datetime_qty = max(
                            $datetime_qty - $datetime->sold_and_reserved() + $sold_and_reserved_for_this_ticket,
                            0
                        );
                        // echo "\n . . . datetime sold: " . $datetime->sold() . '<br />';
                        // echo "\n . . . datetime reserved: " . $datetime->reserved() . '<br />';
                        // echo "\n . . . datetime sold_and_reserved: " . $datetime->sold_and_reserved() . '<br />';
                        // echo "\n . . . datetime_qty: " . $datetime_qty . '<br />';
                        $datetime_qty = ! $datetime->sold_out() ? $datetime_qty : 0;
                        // echo "\n . . . datetime_qty: " . $datetime_qty . '<br />';
                    }
                    $qty = min($datetime_qty, $qty);
                    // echo "\n . . qty: " . $qty . '<br />';
                }
            }
        }
        // NOW that we know the  maximum number of tickets available for the datetime
        // we can finally factor in the details for this specific ticket
        if ($qty > 0 && $context === 'saleable') {
            // and subtract the sales for THIS ticket
            $qty = max($qty - $sold_and_reserved_for_this_ticket, 0);
            // echo "\n . qty: " . $qty . '<br />';
        }
        // echo "\nFINAL QTY: " . $qty . "<br /><br />";
        return $qty;
    }


    /**
     * Sets qty - IMPORTANT!!! Does NOT allow QTY to be set higher than the lowest reg limit of any related datetimes
     *
     * @param int $qty
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_qty($qty)
    {
        $datetimes = $this->datetimes();
        foreach ($datetimes as $datetime) {
            if ($datetime instanceof EE_Datetime) {
                $qty = min($qty, $datetime->reg_limit());
            }
        }
        $this->set('TKT_qty', $qty);
    }


    /**
     * Gets uses
     *
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function uses()
    {
        return $this->get('TKT_uses');
    }


    /**
     * Sets uses
     *
     * @param int $uses
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_uses($uses)
    {
        $this->set('TKT_uses', $uses);
    }


    /**
     * returns whether ticket is required or not.
     *
     * @return boolean
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function required()
    {
        return $this->get('TKT_required');
    }


    /**
     * sets the TKT_required property
     *
     * @param boolean $required
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_required($required)
    {
        $this->set('TKT_required', $required);
    }


    /**
     * Gets taxable
     *
     * @return boolean
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function taxable()
    {
        return $this->get('TKT_taxable');
    }


    /**
     * Sets taxable
     *
     * @param boolean $taxable
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_taxable($taxable)
    {
        $this->set('TKT_taxable', $taxable);
    }


    /**
     * Gets is_default
     *
     * @return boolean
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function is_default()
    {
        return $this->get('TKT_is_default');
    }


    /**
     * Sets is_default
     *
     * @param boolean $is_default
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_is_default($is_default)
    {
        $this->set('TKT_is_default', $is_default);
    }


    /**
     * Gets order
     *
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function order()
    {
        return $this->get('TKT_order');
    }


    /**
     * Sets order
     *
     * @param int $order
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_order($order)
    {
        $this->set('TKT_order', $order);
    }


    /**
     * Gets row
     *
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function row()
    {
        return $this->get('TKT_row');
    }


    /**
     * Sets row
     *
     * @param int $row
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_row($row)
    {
        $this->set('TKT_row', $row);
    }


    /**
     * Gets deleted
     *
     * @return boolean
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function deleted()
    {
        return $this->get('TKT_deleted');
    }


    /**
     * Sets deleted
     *
     * @param boolean $deleted
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_deleted($deleted)
    {
        $this->set('TKT_deleted', $deleted);
    }


    /**
     * Gets parent
     *
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function parent_ID()
    {
        return $this->get('TKT_parent');
    }


    /**
     * Sets parent
     *
     * @param int $parent
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_parent_ID($parent)
    {
        $this->set('TKT_parent', $parent);
    }


    /**
     * Gets a string which is handy for showing in gateways etc that describes the ticket.
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function name_and_info()
    {
        $times = [];
        foreach ($this->datetimes() as $datetime) {
            $times[] = $datetime->start_date_and_time();
        }
        return $this->name() . ' @ ' . implode(', ', $times) . ' for ' . $this->pretty_price();
    }


    /**
     * Gets name
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function name()
    {
        return $this->get('TKT_name');
    }


    /**
     * Gets price
     *
     * @return float
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function price()
    {
        return $this->get('TKT_price');
    }


    /**
     * Gets all the registrations for this ticket
     *
     * @param array $query_params @see
     *                            https://github.com/eventespresso/event-espresso-core/tree/master/docs/G--Model-System/model-query-params.md
     * @return EE_Registration[]|EE_Base_Class[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function registrations($query_params = [])
    {
        return $this->get_many_related('Registration', $query_params);
    }


    /**
     * Updates the TKT_sold attribute (and saves) based on the number of APPROVED registrations for this ticket.
     *
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function update_tickets_sold()
    {
        $count_regs_for_this_ticket = $this->count_registrations(
            [
                [
                    'STS_ID'      => EEM_Registration::status_id_approved,
                    'REG_deleted' => 0,
                ],
            ]
        );
        $this->set_sold($count_regs_for_this_ticket);
        $this->save();
        return $count_regs_for_this_ticket;
    }


    /**
     * Counts the registrations for this ticket
     *
     * @param array $query_params @see
     *                            https://github.com/eventespresso/event-espresso-core/tree/master/docs/G--Model-System/model-query-params.md
     * @return int
     */
    public function count_registrations($query_params = [])
    {
        return $this->count_related('Registration', $query_params);
    }


    /**
     * Implementation for EEI_Has_Icon interface method.
     *
     * @return string
     * @see EEI_Visual_Representation for comments
     */
    public function get_icon()
    {
        return '<span class="dashicons dashicons-tickets-alt"></span>';
    }


    /**
     * Implementation of the EEI_Event_Relation interface method
     *
     * @return EE_Event
     * @throws EE_Error
     * @throws UnexpectedEntityException*@throws ReflectionException
     * @see EEI_Event_Relation for comments
     */
    public function get_related_event()
    {
        // get one datetime to use for getting the event
        $datetime = $this->first_datetime();
        if (! $datetime instanceof \EE_Datetime) {
            throw new UnexpectedEntityException(
                $datetime,
                'EE_Datetime',
                sprintf(
                    esc_html__('The ticket (%s) is not associated with any valid datetimes.', 'event_espresso'),
                    $this->name()
                )
            );
        }
        $event = $datetime->event();
        if (! $event instanceof \EE_Event) {
            throw new UnexpectedEntityException(
                $event,
                'EE_Event',
                sprintf(
                    esc_html__('The ticket (%s) is not associated with a valid event.', 'event_espresso'),
                    $this->name()
                )
            );
        }
        return $event;
    }


    /**
     * Implementation of the EEI_Event_Relation interface method
     *
     * @return string
     * @throws UnexpectedEntityException
     * @throws EE_Error*@throws ReflectionException
     * @see EEI_Event_Relation for comments
     */
    public function get_event_name()
    {
        $event = $this->get_related_event();
        return $event instanceof EE_Event ? $event->name() : '';
    }


    /**
     * Implementation of the EEI_Event_Relation interface method
     *
     * @return int
     * @throws UnexpectedEntityException
     * @throws EE_Error*@throws ReflectionException
     * @see EEI_Event_Relation for comments
     */
    public function get_event_ID()
    {
        $event = $this->get_related_event();
        return $event instanceof EE_Event ? $event->ID() : 0;
    }


    /**
     * This simply returns whether a ticket can be permanently deleted or not.
     * The criteria for determining this is whether the ticket has any related registrations.
     * If there are none then it can be permanently deleted.
     *
     * @return bool
     */
    public function is_permanently_deleteable()
    {
        return $this->count_registrations() === 0;
    }


    /*******************************************************************
     ***********************  DEPRECATED METHODS  **********************
     *******************************************************************/


    /**
     * Increments sold by amount passed by $qty AND decrements the reserved count on both this ticket and its
     * associated datetimes.
     *
     * @param int $qty
     * @return void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @deprecated 4.9.80.p
     */
    public function increase_sold($qty = 1)
    {
        EE_Error::doing_it_wrong(
            __FUNCTION__,
            esc_html__('Please use EE_Ticket::increaseSold() instead', 'event_espresso'),
            '4.9.80.p',
            '5.0.0.p'
        );
        $this->increaseSold($qty);
    }


    /**
     * On each datetime related to this ticket, increases its sold count and decreases its reserved count by $qty.
     *
     * @param int $qty positive or negative. Positive means to increase sold counts (and decrease reserved counts),
     *                 Negative means to decreases old counts (and increase reserved counts).
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @deprecated 4.9.80.p
     */
    protected function _increase_sold_for_datetimes($qty)
    {
        EE_Error::doing_it_wrong(
            __FUNCTION__,
            esc_html__('Please use EE_Ticket::increaseSoldForDatetimes() instead', 'event_espresso'),
            '4.9.80.p',
            '5.0.0.p'
        );
        $this->increaseSoldForDatetimes($qty);
    }


    /**
     * Decrements (subtracts) sold by amount passed by $qty on both the ticket and its related datetimes directly in the
     * DB and then updates the model objects.
     * Does not affect the reserved counts.
     *
     * @param int $qty
     * @return void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @deprecated 4.9.80.p
     */
    public function decrease_sold($qty = 1)
    {
        EE_Error::doing_it_wrong(
            __FUNCTION__,
            esc_html__('Please use EE_Ticket::decreaseSold() instead', 'event_espresso'),
            '4.9.80.p',
            '5.0.0.p'
        );
        $this->decreaseSold($qty);
    }


    /**
     * Decreases sold on related datetimes
     *
     * @param int $qty
     * @return void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @deprecated 4.9.80.p
     */
    protected function _decrease_sold_for_datetimes($qty = 1)
    {
        EE_Error::doing_it_wrong(
            __FUNCTION__,
            esc_html__('Please use EE_Ticket::decreaseSoldForDatetimes() instead', 'event_espresso'),
            '4.9.80.p',
            '5.0.0.p'
        );
        $this->decreaseSoldForDatetimes($qty);
    }


    /**
     * Increments reserved by amount passed by $qty, and persists it immediately to the database.
     *
     * @param int    $qty
     * @param string $source
     * @return bool whether we successfully reserved the ticket or not.
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @deprecated 4.9.80.p
     */
    public function increase_reserved($qty = 1, $source = 'unknown')
    {
        EE_Error::doing_it_wrong(
            __FUNCTION__,
            esc_html__('Please use EE_Ticket::increaseReserved() instead', 'event_espresso'),
            '4.9.80.p',
            '5.0.0.p'
        );
        return $this->increaseReserved($qty);
    }


    /**
     * Increases sold on related datetimes
     *
     * @param int $qty
     * @return boolean indicating success
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @deprecated 4.9.80.p
     */
    protected function _increase_reserved_for_datetimes($qty = 1)
    {
        EE_Error::doing_it_wrong(
            __FUNCTION__,
            esc_html__('Please use EE_Ticket::increaseReservedForDatetimes() instead', 'event_espresso'),
            '4.9.80.p',
            '5.0.0.p'
        );
        return $this->increaseReservedForDatetimes($qty);
    }


    /**
     * Decrements (subtracts) reserved by amount passed by $qty, and persists it immediately to the database.
     *
     * @param int    $qty
     * @param bool   $adjust_datetimes
     * @param string $source
     * @return void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @deprecated 4.9.80.p
     */
    public function decrease_reserved($qty = 1, $adjust_datetimes = true, $source = 'unknown')
    {
        EE_Error::doing_it_wrong(
            __FUNCTION__,
            esc_html__('Please use EE_Ticket::decreaseReserved() instead', 'event_espresso'),
            '4.9.80.p',
            '5.0.0.p'
        );
        $this->decreaseReserved($qty);
    }


    /**
     * Decreases reserved on related datetimes
     *
     * @param int $qty
     * @return void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @deprecated 4.9.80.p
     */
    protected function _decrease_reserved_for_datetimes($qty = 1)
    {
        EE_Error::doing_it_wrong(
            __FUNCTION__,
            esc_html__('Please use EE_Ticket::decreaseReservedForDatetimes() instead', 'event_espresso'),
            '4.9.80.p',
            '5.0.0.p'
        );
        $this->decreaseReservedForDatetimes($qty);
    }
}
