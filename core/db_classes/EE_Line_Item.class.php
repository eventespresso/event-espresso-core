<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\calculators\LineItemCalculator;
use EventEspresso\core\services\loaders\LoaderFactory;

/**
 * EE_Line_Item class
 * see EEM_Line_Item for description
 *
 * @package            Event Espresso
 * @subpackage         includes/classes/EE_Line_Item.class.php
 * @author             Michael Nelson
 * @method EE_Ticket|EE_Transaction|null get_first_related(string $relation_name, array $query_params = [])
 */
class EE_Line_Item extends EE_Base_Class
{
    /**
     * for children line items (currently not a normal relation)
     *
     * @var EE_Line_Item[]
     */
    protected array $_children = [];

    /**
     * query params used to obtain children line items above
     *
     * @var array
     */
    private array $children_query_params = [];

    /**
     * for the parent line item
     *
     * @var EE_Line_Item|null
     */
    protected ?EE_Line_Item $_parent = null;

    /**
     * @var LineItemCalculator
     */
    protected LineItemCalculator $calculator;


    /**
     * @param array       $props_n_values incoming values
     * @param string|null $timezone       incoming timezone as set by the model.
     *                                    If not set the timezone for the website will be used.
     * @param array       $date_formats   incoming date_formats in an array where the first value is the
     *                                    date_format and the second value is the time format
     * @return EE_Line_Item
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public static function new_instance(
        array $props_n_values = [],
        ?string $timezone = '',
        array $date_formats = []
    ): EE_Line_Item {
        $has_object = parent::_check_for_object(
            $props_n_values,
            __CLASS__,
            $timezone,
            $date_formats
        );
        return $has_object ?: new self($props_n_values, false, $timezone);
    }


    /**
     * @param array       $props_n_values incoming values from the database
     * @param string|null $timezone       incoming timezone as set by the model.
     *                                    If not set the timezone for the website will be used.
     * @return EE_Line_Item
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public static function new_instance_from_db(array $props_n_values = [], ?string $timezone = ''): EE_Line_Item
    {
        return new self($props_n_values, true, $timezone);
    }


    /**
     * Adds some defaults if they're not specified
     *
     * @param array  $fieldValues
     * @param bool   $bydb
     * @param string $timezone
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    protected function __construct($fieldValues = [], $bydb = false, $timezone = '')
    {
        $this->calculator = LoaderFactory::getShared(LineItemCalculator::class);
        parent::__construct($fieldValues, $bydb, $timezone);
        if (! $this->get('LIN_code')) {
            $this->set_code($this->generate_code());
        }
    }


    public function __wakeup()
    {
        $this->calculator = LoaderFactory::getShared(LineItemCalculator::class);
        parent::__wakeup();
    }


    /**
     * Gets ID
     *
     * @return int
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function ID(): int
    {
        return (int) $this->get('LIN_ID');
    }


    /**
     * Gets TXN_ID
     *
     * @return int
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function TXN_ID(): int
    {
        return (int) $this->get('TXN_ID');
    }


    /**
     * Sets TXN_ID
     *
     * @param int $TXN_ID
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function set_TXN_ID(int $TXN_ID)
    {
        $this->set('TXN_ID', $TXN_ID);
    }


    /**
     * Gets name
     *
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function name(): string
    {
        $name = (string) $this->get('LIN_name');
        if (! $name) {
            $name = ucwords(str_replace('-', ' ', $this->type()));
        }
        return $name;
    }


    /**
     * Sets name
     *
     * @param string $name
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function set_name(string $name)
    {
        $this->set('LIN_name', $name);
    }


    /**
     * Gets desc
     *
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function desc(): string
    {
        return (string) $this->get('LIN_desc');
    }


    /**
     * Sets desc
     *
     * @param string $desc
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function set_desc(string $desc)
    {
        $this->set('LIN_desc', $desc);
    }


    /**
     * Gets quantity
     *
     * @return int
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function quantity(): int
    {
        return (int) $this->get('LIN_quantity');
    }


    /**
     * Sets quantity
     *
     * @param int $quantity
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function set_quantity(int $quantity)
    {
        $this->set('LIN_quantity', max($quantity, 0));
    }


    /**
     * @param int $quantity
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     * @since 5.0.30.p
     */
    public function incrementQuantity(int $quantity = 1)
    {
        $this->adjustNumericFieldsInDb(['LIN_quantity' => $quantity]);
    }


    /**
     * @param int $quantity
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     * @since 5.0.30.p
     */
    public function decrementQuantity(int $quantity = 1)
    {
        $this->adjustNumericFieldsInDb(['LIN_quantity' => $quantity * -1]);
    }


    /**
     * Gets item_id
     *
     * @return int
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function OBJ_ID(): int
    {
        return (int) $this->get('OBJ_ID');
    }


    /**
     * Sets item_id
     *
     * @param int $item_id
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function set_OBJ_ID(int $item_id)
    {
        $this->set('OBJ_ID', $item_id);
    }


    /**
     * Gets item_type
     *
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function OBJ_type(): string
    {
        return (string) $this->get('OBJ_type');
    }


    /**
     * Gets item_type
     *
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function OBJ_type_i18n(): string
    {
        $obj_type = $this->OBJ_type();
        switch ($obj_type) {
            case EEM_Line_Item::OBJ_TYPE_EVENT:
                $obj_type = esc_html__('Event', 'event_espresso');
                break;
            case EEM_Line_Item::OBJ_TYPE_PRICE:
                $obj_type = esc_html__('Price', 'event_espresso');
                break;
            case EEM_Line_Item::OBJ_TYPE_PROMOTION:
                $obj_type = esc_html__('Promotion', 'event_espresso');
                break;
            case EEM_Line_Item::OBJ_TYPE_TICKET:
                $obj_type = esc_html__('Ticket', 'event_espresso');
                break;
            case EEM_Line_Item::OBJ_TYPE_TRANSACTION:
                $obj_type = esc_html__('Transaction', 'event_espresso');
                break;
        }
        return (string) apply_filters('FHEE__EE_Line_Item__OBJ_type_i18n', $obj_type, $this);
    }


    /**
     * Sets item_type
     *
     * @param string $OBJ_type
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function set_OBJ_type(string $OBJ_type)
    {
        $this->set('OBJ_type', $OBJ_type);
    }


    /**
     * Gets unit_price
     *
     * @return float
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function unit_price(): float
    {
        return (float) $this->get('LIN_unit_price');
    }


    /**
     * Sets unit_price
     *
     * @param int|float $unit_price
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function set_unit_price($unit_price)
    {
        $this->set('LIN_unit_price', (float) $unit_price);
    }


    /**
     * Checks if this item is a percentage modifier or not
     *
     * @return bool
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function is_percent(): bool
    {
        if ($this->is_tax_sub_total()) {
            // tax subtotals HAVE a percent on them, that percentage only applies
            // to taxable items, so it's an exception. Treat it like a flat line item
            return false;
        }
        $unit_price = abs($this->get('LIN_unit_price'));
        $percent    = abs($this->get('LIN_percent'));
        if ($unit_price < .001 && $percent) {
            return true;
        }
        if ($unit_price >= .001 && ! $percent) {
            return false;
        }
        if ($unit_price >= .001 && $percent) {
            throw new EE_Error(
                sprintf(
                    esc_html__(
                        'A Line Item can not have a unit price of (%s) AND a percent (%s)!',
                        'event_espresso'
                    ),
                    $unit_price,
                    $percent
                )
            );
        }
        // if they're both 0, assume it's not a percent item
        return false;
    }


    /**
     * Gets percent (between 100-.001)
     *
     * @return float
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function percent(): float
    {
        return (float) $this->get('LIN_percent');
    }


    /**
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     * @since 5.0.0.p
     */
    public function prettyPercent(): string
    {
        return (string) $this->get_pretty('LIN_percent');
    }


    /**
     * Sets percent (between 100-0.01)
     *
     * @param int|float $percent
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function set_percent($percent)
    {
        $this->set('LIN_percent', (float) $percent);
    }


    /**
     * Gets total
     *
     * @return float
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function pretaxTotal(): float
    {
        return (float) $this->get('LIN_pretax');
    }


    /**
     * Sets total
     *
     * @param int|float $pretax_total
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function setPretaxTotal($pretax_total)
    {
        $this->set('LIN_pretax', (float) $pretax_total);
    }


    /**
     * @return float
     * @throws EE_Error
     * @throws ReflectionException
     * @since  5.0.0.p
     */
    public function totalWithTax(): float
    {
        return (float) $this->get('LIN_total');
    }


    /**
     * Sets total
     *
     * @param int|float $total
     * @throws EE_Error
     * @throws ReflectionException
     * @since  5.0.0.p
     */
    public function setTotalWithTax($total)
    {
        $this->set('LIN_total', (float) $total);
    }


    /**
     * Gets total
     *
     * @return float
     * @throws EE_Error
     * @throws ReflectionException
     * @deprecatd 5.0.0.p
     */
    public function total(): float
    {
        return $this->totalWithTax();
    }


    /**
     * Sets total
     *
     * @param int|float $total
     * @throws EE_Error
     * @throws ReflectionException
     * @deprecatd 5.0.0.p
     */
    public function set_total($total)
    {
        $this->setTotalWithTax((float) $total);
    }


    /**
     * Gets order
     *
     * @return int
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function order(): int
    {
        return (int) $this->get('LIN_order');
    }


    /**
     * Sets order
     *
     * @param int $order
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function set_order(int $order)
    {
        $this->set('LIN_order', $order);
    }


    /**
     * Gets parent
     *
     * @return int
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function parent_ID(): int
    {
        return (int) $this->get('LIN_parent');
    }


    /**
     * Sets parent
     *
     * @param int $parent
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function set_parent_ID(int $parent)
    {
        $this->set('LIN_parent', $parent);
    }


    /**
     * Gets type
     *
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function type(): string
    {
        return (string) $this->get('LIN_type');
    }


    /**
     * Sets type
     *
     * @param string $type
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function set_type(string $type)
    {
        $this->set('LIN_type', $type);
    }


    /**
     * Gets the line item of which this item is a composite. Eg, if this is a subtotal, the parent might be a total\
     * If this line item is saved to the DB, fetches the parent from the DB. However, if this line item isn't in the DB
     * it uses its cached reference to its parent line item (which would have been set by `EE_Line_Item::set_parent()`
     * or indirectly by `EE_Line_item::add_child_line_item()`)
     *
     * @return EE_Line_Item|null
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function parent(): ?EE_Line_Item
    {
        if (! $this->_parent instanceof EE_Line_Item) {
            $this->_parent = $this->ID()
                ? $this->get_model()->get_one_by_ID($this->parent_ID())
                : $this->_parent;
        }
        return $this->_parent;
    }


    /**
     * Gets ALL the children of this line item (ie, all the parts that contribute towards this total).
     *
     * @return EE_Line_Item[]
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function children(array $query_params = []): array
    {
        // check if the query params have changed since the last time we ran this query
        $new_params = ! empty(EEH_Array::array_diff_recursive($query_params, $this->children_query_params));
        if (($new_params || empty($this->_children)) && $this->ID()) {
            $this->children_query_params = $query_params;
            // ensure where params are an array
            $query_params[0] = isset($query_params[0]) && is_array($query_params[0]) ? $query_params[0] : [];
            // add defaults for line item parent and orderby
            $query_params[0] += ['LIN_parent' => $this->ID()];
            $query_params    += ['order_by' => ['LIN_order' => 'ASC']];
            $children = $this->get_model()->get_all($query_params);
            foreach ($children as $child) {
                if ($child instanceof EE_Line_Item) {
                    $this->addLineItemToChildren($child);
                }
            }
        }
        return $this->_children;
    }


    private function addLineItemToChildren($child_line_item)
    {
        $this->_children[ $child_line_item->code() ] = $child_line_item;
    }


    private function getChildLineItemFromCache(string $code): ?EE_Line_Item
    {
        return $this->_children[ $code ] ?? null;
    }


    private function removeChildLineItemFromCache(string $code): int
    {
        if (isset($this->_children[ $code ])) {
            unset($this->_children[ $code ]);
            return 1;
        }
        return 0;
    }


    private function resetChildren()
    {
        $this->_children = [];
    }


    /**
     * Gets code
     *
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function code(): string
    {
        return (string) $this->get('LIN_code');
    }


    /**
     * Sets code
     *
     * @param string $code
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function set_code(string $code)
    {
        $this->set('LIN_code', $code);
    }


    /**
     * Gets is_taxable
     *
     * @return bool
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function is_taxable(): bool
    {
        return (bool) $this->get('LIN_is_taxable');
    }


    /**
     * Sets is_taxable
     *
     * @param bool $is_taxable
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function set_is_taxable(bool $is_taxable)
    {
        $this->set('LIN_is_taxable', $is_taxable);
    }


    /**
     * @param int $timestamp
     * @throws EE_Error
     * @throws ReflectionException
     * @since 5.0.0.p
     */
    public function setTimestamp(int $timestamp)
    {
        $this->set('LIN_timestamp', $timestamp);
    }


    /**
     * Gets the object that this model-joins-to.
     * returns one of the model objects that the field OBJ_ID can point to... see the 'OBJ_ID' field on
     * EEM_Promotion_Object
     *        Eg, if this line item join model object is for a ticket, this will return the EE_Ticket object
     *
     * @return EE_Base_Class|null
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function get_object(): ?EE_Base_Class
    {
        $model_name_of_related_obj = $this->OBJ_type();
        return $this->get_model()->has_relation($model_name_of_related_obj)
            ? $this->get_first_related($model_name_of_related_obj)
            : null;
    }


    /**
     * Like EE_Line_Item::get_object(), but can only ever actually return an EE_Ticket.
     * (IE, if this line item is for a price or something else, will return NULL)
     *
     * @param array $query_params deprecated 5.0.12.p
     * @return EE_Ticket|null
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function ticket(array $query_params = []): ?EE_Ticket
    {
        // we're going to assume that when this method is called
        // we always want to receive the attached ticket EVEN if that ticket is archived.
        if (! $this->OBJ_ID() || $this->OBJ_type() !== EEM_Line_Item::OBJ_TYPE_TICKET) {
            return null;
        }
        if (empty($query_args)) {
            return EEM_Ticket::instance()->get_one_by_ID($this->OBJ_ID());
        }
        // legacy usage
        $query_params += ['default_where_conditions' => 'none'];
        return $this->get_first_related(EEM_Line_Item::OBJ_TYPE_TICKET, $query_params);
    }


    /**
     * Gets the EE_Datetime that's related to the ticket, IF this is for a ticket
     *
     * @return EE_Datetime|null
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function get_ticket_datetime(): ?EE_Datetime
    {
        if ($this->OBJ_type() === EEM_Line_Item::OBJ_TYPE_TICKET) {
            $ticket = $this->ticket();
            if ($ticket instanceof EE_Ticket) {
                $datetime = $ticket->first_datetime();
                if ($datetime instanceof EE_Datetime) {
                    return $datetime;
                }
            }
        }
        return null;
    }


    /**
     * Gets the event's name that's related to the ticket, if this is for
     * a ticket
     *
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function ticket_event_name(): string
    {
        $event_name = esc_html__('Unknown', 'event_espresso');
        $event      = $this->ticket_event();
        if ($event instanceof EE_Event) {
            $event_name = $event->name();
        }
        return $event_name;
    }


    /**
     * Gets the event that's related to the ticket, if this line item represents a ticket.
     *
     * @return EE_Event|null
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function ticket_event(): ?EE_Event
    {
        $event  = null;
        $ticket = $this->ticket();
        if ($ticket instanceof EE_Ticket) {
            $datetime = $ticket->first_datetime();
            if ($datetime instanceof EE_Datetime) {
                $event = $datetime->event();
            }
        }
        return $event;
    }


    /**
     * Gets the first datetime for this lien item, assuming it's for a ticket
     *
     * @param string $date_format
     * @param string $time_format
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function ticket_datetime_start(string $date_format = '', string $time_format = ''): string
    {
        $first_datetime_string = esc_html__('Unknown', 'event_espresso');
        $datetime              = $this->get_ticket_datetime();
        if ($datetime) {
            $first_datetime_string = $datetime->start_date_and_time($date_format, $time_format);
        }
        return $first_datetime_string;
    }


    /**
     * Adds the line item as a child to this line item. If there is another child line
     * item with the same LIN_code, it is overwritten by this new one
     *
     * @param EE_Line_Item $line_item
     * @param bool         $set_order
     * @return bool success
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function add_child_line_item(EE_Line_Item $line_item, bool $set_order = true): bool
    {
        // should we calculate the LIN_order for this line item ?
        if ($set_order || $line_item->order() === null) {
            $line_item->set_order(count($this->children()));
        }
        if ($this->ID()) {
            // check for any duplicate line items (with the same code), if so, this replaces it
            $line_item_with_same_code = $this->get_child_line_item($line_item->code());
            if ($line_item_with_same_code instanceof EE_Line_Item && $line_item_with_same_code !== $line_item) {
                $this->delete_child_line_item($line_item_with_same_code->code());
            }
            $line_item->set_parent_ID($this->ID());
            if ($this->TXN_ID()) {
                $line_item->set_TXN_ID($this->TXN_ID());
            }
            $this->addLineItemToChildren($line_item);
            return (bool) $line_item->save();
        }
        $this->addLineItemToChildren($line_item);
        if ($line_item->parent() !== $this) {
            $line_item->set_parent($this);
        }
        return true;
    }


    /**
     * Similar to EE_Base_Class::_add_relation_to, except this isn't a normal relation.
     * If this line item is saved to the DB, this is just a wrapper for set_parent_ID() and save()
     * However, if this line item is NOT saved to the DB, this just caches the parent on
     * the EE_Line_Item::_parent property.
     *
     * @param EE_Line_Item $line_item
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function set_parent(EE_Line_Item $line_item)
    {
        if ($this->ID()) {
            if (! $line_item->ID()) {
                $line_item->save();
            }
            $this->set_parent_ID($line_item->ID());
            $this->save();
        } else {
            $this->_parent = $line_item;
            $this->set_parent_ID($line_item->ID());
        }
    }


    /**
     * Gets the child line item as specified by its code. Because this returns an object (by reference)
     * you can modify this child line item and the parent (this object) can know about them
     * because it also has a reference to that line item
     *
     * @param string $code
     * @return EE_Base_Class|EE_Line_Item|EE_Soft_Delete_Base_Class|NULL
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function get_child_line_item(string $code)
    {
        $child = $this->getChildLineItemFromCache($code);
        if ($child instanceof EE_Line_Item) {
            return $child;
        }
        if ($this->ID()) {
            return $this->get_model()->get_one(
                [['LIN_parent' => $this->ID(), 'LIN_code' => $code]]
            );
        }
        return null;
    }


    /**
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function delete()
    {
        $parent = $this->parent();
        if (! $parent instanceof EE_Line_Item) {
            // in case this is called on the grand total line item which has no parent, just delete it
            return parent::delete();
        }
        // first remove this line item from the parent's cache
        $parent->removeChildLineItemFromCache($this->code());
        // then delete this line item
        $deleted = parent::delete();
        // THEN check if the parent is a subtotal and has no children, if so, delete it
        $parent->delete_if_childless_subtotal();
        return $deleted;
    }


    /**
     * Returns how many items are deleted (or, if this item has not been saved ot the DB yet, just how many it HAD
     * cached on it)
     *
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function delete_children_line_items(): int
    {
        $count = 0;
        foreach ($this->_children as $child_line_item) {
            $count += $child_line_item->delete();
        }
        $this->resetChildren();
        return $count;
    }


    /**
     * If this line item has been saved to the DB, deletes its child with LIN_code == $code. If this line
     * HAS NOT been saved to the DB, removes the child line item with index $code.
     * Also searches through the child's children for a matching line item. However, once a line item has been found
     * and deleted, stops searching (so if there are line items with duplicate codes, only the first one found will be
     * deleted)
     *
     * @param string $code
     * @param bool   $stop_search_once_found
     * @return int count of items deleted (or simply removed from the line item's cache, if not has not been saved to
     *             the DB yet)
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function delete_child_line_item(string $code, bool $stop_search_once_found = true): int
    {
        $removed = $this->removeChildLineItemFromCache($code);
        if ($this->ID()) {
            $items_deleted = 0;
            if ($this->code() === $code) {
                $items_deleted += EEH_Line_Item::delete_all_child_items($this);
                $items_deleted += $this->delete();
                if ($stop_search_once_found) {
                    return $items_deleted;
                }
            }
            foreach ($this->children() as $child_line_item) {
                $items_deleted += $child_line_item->delete_child_line_item($code, $stop_search_once_found);
            }
            return $items_deleted;
        }
        return $removed;
    }


    /**
     * If this line item is in the database, is of the type subtotal, and
     * has no children, why do we have it? It should be deleted so this function
     * does that
     *
     * @return bool
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function delete_if_childless_subtotal(): bool
    {
        if (
            $this->type() === EEM_Line_Item::type_sub_total
            && $this->code() !== 'pre-tax-subtotal'
            && empty($this->_children)
        ) {
            if ($this->ID()) {
                return (bool) $this->delete();
            }
            return (bool) $this->parent()->removeChildLineItemFromCache($this->code());
        }
        return false;
    }


    /**
     * Creates a code and returns a string. doesn't assign the code to this model object
     *
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function generate_code(): string
    {
        // each line item in the cart requires a unique identifier
        return $this->get('OBJ_type') . '-' . $this->get('OBJ_ID');
    }


    /**
     * @return bool
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function isTax(): bool
    {
        return $this->type() === EEM_Line_Item::type_tax || $this->type() === EEM_Line_Item::type_sub_tax;
    }


    /**
     * @return bool
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function isGlobalTax(): bool
    {
        return $this->type() === EEM_Line_Item::type_tax;
    }


    /**
     * @return bool
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function isSubTax(): bool
    {
        return $this->type() === EEM_Line_Item::type_sub_tax;
    }


    /**
     * returns true if this is a line item with a direct descendent of the type sub-tax
     *
     * @return array
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function getSubTaxes(): array
    {
        if (! $this->is_line_item()) {
            return [];
        }
        return EEH_Line_Item::get_descendants_of_type($this, EEM_Line_Item::type_sub_tax);
    }


    /**
     * returns true if this is a line item with a direct descendent of the type sub-tax
     *
     * @return bool
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function hasSubTaxes(): bool
    {
        if (! $this->is_line_item()) {
            return false;
        }
        $sub_taxes = $this->getSubTaxes();
        return ! empty($sub_taxes);
    }


    /**
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     * @deprecated   5.0.0.p
     */
    public function is_tax(): bool
    {
        return $this->isGlobalTax();
    }


    /**
     * @return bool
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function is_tax_sub_total(): bool
    {
        return $this->type() === EEM_Line_Item::type_tax_sub_total;
    }


    /**
     * @return bool
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function is_line_item(): bool
    {
        return $this->type() === EEM_Line_Item::type_line_item;
    }


    /**
     * @return bool
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function is_sub_line_item(): bool
    {
        return $this->type() === EEM_Line_Item::type_sub_line_item;
    }


    /**
     * @return bool
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function is_sub_total(): bool
    {
        return $this->type() === EEM_Line_Item::type_sub_total;
    }


    /**
     * Whether this line item is a cancellation line item
     *
     * @return bool
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function is_cancellation(): bool
    {
        return EEM_Line_Item::type_cancellation === $this->type();
    }


    /**
     * @return bool
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function is_total(): bool
    {
        return $this->type() === EEM_Line_Item::type_total;
    }


    /**
     * @return bool
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function is_cancelled(): bool
    {
        return $this->type() === EEM_Line_Item::type_cancellation;
    }


    /**
     * @return string like '2, 004.00', formatted according to the localized currency
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function unit_price_no_code(): string
    {
        return $this->prettyUnitPrice();
    }


    /**
     * @return string like '2, 004.00', formatted according to the localized currency
     * @throws EE_Error
     * @throws ReflectionException
     * @since 5.0.0.p
     */
    public function prettyUnitPrice(): string
    {
        return $this->get_pretty('LIN_unit_price', 'no_currency_code');
    }


    /**
     * @return string like '2, 004.00', formatted according to the localized currency
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function total_no_code(): string
    {
        return $this->prettyTotal();
    }


    /**
     * @return string like '2, 004.00', formatted according to the localized currency
     * @throws EE_Error
     * @throws ReflectionException
     * @since 5.0.0.p
     */
    public function prettyTotal(): string
    {
        return $this->get_pretty('LIN_total', 'no_currency_code');
    }


    /**
     * Gets the final total on this item, taking taxes into account.
     * Has the side effect of setting the sub-total as it was just calculated.
     * If this is used on a grand-total line item, also updates the transaction's
     * TXN_total (provided this line item is allowed to persist, otherwise we don't
     * want to change a persistable transaction with info from a non-persistent line item)
     *
     * @param bool $update_txn_status
     * @return float
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws RuntimeException
     */
    public function recalculate_total_including_taxes(bool $update_txn_status = false): float
    {
        $grand_total_line_item = EEH_Line_Item::find_transaction_grand_total_for_line_item($this);
        $grand_total_line_item->ensureLineItemsAreSaved();
        return $this->calculator->recalculateTotalIncludingTaxes($grand_total_line_item, $update_txn_status);
    }


    /**
     * Recursively goes through all the children and recalculates sub-totals EXCEPT for
     * tax-sub-totals (they're an odd beast). Updates the 'total' on each line item according to either its
     * unit price * quantity or the total of all its children EXCEPT when we're only calculating the taxable total and
     * when this is called on the grand total
     *
     * @return float
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function recalculate_pre_tax_total(): float
    {
        $grand_total_line_item = EEH_Line_Item::find_transaction_grand_total_for_line_item($this);
        $grand_total_line_item->ensureLineItemsAreSaved();
        [$total] = $this->calculator->recalculateLineItemTotals($grand_total_line_item);
        return (float) $total;
    }


    /**
     * Recalculates the total on each individual tax (based on a recalculation of the pre-tax total), sets
     * the totals on each tax calculated, and returns the final tax total. Re-saves tax line items
     * and tax sub-total if already in the DB
     *
     * @return float
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function recalculate_taxes_and_tax_total(): float
    {
        $grand_total_line_item = EEH_Line_Item::find_transaction_grand_total_for_line_item($this);
        $grand_total_line_item->ensureLineItemsAreSaved();
        return $this->calculator->recalculateTaxesAndTaxTotal($grand_total_line_item);
    }


    /**
     * Gets the total tax on this line item. Assumes taxes have already been calculated using
     * recalculate_taxes_and_total
     *
     * @return float
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function get_total_tax(): float
    {
        $grand_total_line_item = EEH_Line_Item::find_transaction_grand_total_for_line_item($this);
        $grand_total_line_item->ensureLineItemsAreSaved();
        return $this->calculator->recalculateTaxesAndTaxTotal($grand_total_line_item);
    }


    /**
     * Gets the total for all the items purchased only
     *
     * @return float
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function get_items_total()
    {
        // by default, let's make sure we're consistent with the existing line item
        if ($this->is_total()) {
            return $this->pretaxTotal();
        }
        $total = 0;
        foreach ($this->get_items() as $item) {
            if ($item instanceof EE_Line_Item) {
                $total += $item->pretaxTotal();
            }
        }
        return $total;
    }


    /**
     * Gets all the descendants (ie, children or children of children etc.) that
     * are of the type 'tax'
     *
     * @return EE_Line_Item[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function tax_descendants(): array
    {
        return EEH_Line_Item::get_tax_descendants($this);
    }


    /**
     * Gets all the real items purchased which are children of this item
     *
     * @return EE_Line_Item[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_items(): array
    {
        return EEH_Line_Item::get_line_item_descendants($this);
    }


    /**
     * Returns the amount taxable among this line item's children (or if it has no children,
     * how much of it is taxable). Does not recalculate totals or subtotals.
     * If the taxable total is negative, (eg, if none of the tickets were taxable,
     * but there is a "Taxable" discount), returns 0.
     *
     * @return float
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function taxable_total(): float
    {
        $this->ensureLineItemsAreSaved();
        return $this->calculator->taxableAmountForGlobalTaxes($this);
    }


    /**
     * Gets the transaction for this line item
     *
     * @return EE_Transaction|null
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function transaction(): ?EE_Transaction
    {
        return $this->get_first_related(EEM_Line_Item::OBJ_TYPE_TRANSACTION);
    }


    /**
     * Saves this line item to the DB, and recursively saves its descendants.
     * Because there currently is no proper parent-child relation on the model,
     * save_this_and_cached() will NOT save the descendants.
     * Also sets the transaction on this line item and all its descendants before saving
     *
     * @param int|null $txn_id if none is provided, assumes $this->TXN_ID()
     * @return int count of items saved
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function save_this_and_descendants_to_txn(int $txn_id = 0): int
    {
        $count = 0;
        if ($txn_id) {
            $this->set_TXN_ID($txn_id);
        }
        $children = $this->children();
        $count    += $this->save() ? 1 : 0;
        foreach ($children as $child_line_item) {
            if ($child_line_item instanceof EE_Line_Item) {
                $child_line_item->set_parent_ID($this->ID());
                $count += $child_line_item->save_this_and_descendants_to_txn($txn_id);
            }
        }
        return $count;
    }


    /**
     * Saves this line item to the DB, and recursively saves its descendants.
     *
     * @return int count of items saved
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function save_this_and_descendants(): int
    {
        $count    = 0;
        $children = $this->children();
        $count    += $this->save() ? 1 : 0;
        foreach ($children as $child_line_item) {
            if ($child_line_item instanceof EE_Line_Item) {
                $child_line_item->set_parent_ID($this->ID());
                $count += $child_line_item->save_this_and_descendants();
            }
        }
        return $count;
    }


    /**
     * returns the cancellation line item if this item was cancelled
     *
     * @return EE_Line_Item[]
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws ReflectionException
     * @throws EE_Error
     */
    public function get_cancellations(): array
    {
        return EEH_Line_Item::get_descendants_of_type($this, EEM_Line_Item::type_cancellation);
    }


    /**
     * If this item has an ID, then this saves it again to update the db
     *
     * @return bool|int count of items saved or false on error
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function maybe_save()
    {
        if ($this->ID()) {
            return $this->save();
        }
        return false;
    }


    /**
     * clears the cached children and parent from the line item
     *
     * @return void
     */
    public function clear_related_line_item_cache()
    {
        $this->resetChildren();
        $this->_parent   = null;
    }


    /**
     * @param bool $raw
     * @return int|string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function timestamp(bool $raw = false)
    {
        return $raw
            ? (int) $this->get_raw('LIN_timestamp')
            : (string) $this->get('LIN_timestamp');
    }


    /**
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     * @since 5.0.25.p
     */
    private function ensureLineItemsAreSaved()
    {
        if (! $this->ID()) {
            $this->save();
        }
        $children = $this->children();
        foreach ($children as $child_line_item) {
            $child_line_item->ensureLineItemsAreSaved();
        }
    }




    /************************* DEPRECATED *************************/
    /**
     * @param string $type one of the constants on EEM_Line_Item
     * @return EE_Line_Item[]
     * @throws EE_Error
     * @throws ReflectionException
     * @deprecated 4.6.0
     */
    protected function _get_descendants_of_type(string $type): array
    {
        EE_Error::doing_it_wrong(
            'EE_Line_Item::_get_descendants_of_type()',
            sprintf(
                esc_html__('Method replaced with %1$s', 'event_espresso'),
                'EEH_Line_Item::get_descendants_of_type()'
            ),
            '4.6.0'
        );
        return EEH_Line_Item::get_descendants_of_type($this, $type);
    }


    /**
     * @param string $type like one of the EEM_Line_Item::type_*
     * @return EE_Line_Item
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @deprecated 4.6.0
     */
    public function get_nearest_descendant_of_type(string $type): EE_Line_Item
    {
        EE_Error::doing_it_wrong(
            'EE_Line_Item::get_nearest_descendant_of_type()',
            sprintf(
                esc_html__('Method replaced with %1$s', 'event_espresso'),
                'EEH_Line_Item::get_nearest_descendant_of_type()'
            ),
            '4.6.0'
        );
        return EEH_Line_Item::get_nearest_descendant_of_type($this, $type);
    }
}
