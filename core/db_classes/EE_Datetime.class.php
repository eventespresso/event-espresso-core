<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;

/**
 * EE_Datetime class
 *
 * @package     Event Espresso
 * @subpackage  includes/classes/EE_Datetime.class.php
 * @author      Brent Christensen
 */
class EE_Datetime extends EE_Soft_Delete_Base_Class
{
    /**
     * constant used by get_active_status, indicates datetime has no more available spaces
     */
    const sold_out = 'DTS';

    /**
     * constant used by get_active_status, indicating datetime is still active (even is not over, can be registered-for)
     */
    const active = 'DTA';

    /**
     * constant used by get_active_status, indicating the datetime cannot be used for registrations yet, but has not
     * expired
     */
    const upcoming = 'DTU';

    /**
     * Datetime is postponed
     */
    const postponed = 'DTP';

    /**
     * Datetime is cancelled
     */
    const cancelled = 'DTC';

    /**
     * constant used by get_active_status, indicates datetime has expired (event is over)
     */
    const expired = 'DTE';

    /**
     * constant used in various places indicating that an event is INACTIVE (not yet ready to be published)
     */
    const inactive = 'DTI';


    /**
     * @param array  $props_n_values    incoming values
     * @param string $timezone          incoming timezone (if not set the timezone set for the website will be used.)
     * @param array  $date_formats      incoming date_formats in an array where the first value is the date_format
     *                                  and the second value is the time format
     * @return EE_Datetime
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public static function new_instance($props_n_values = array(), $timezone = null, $date_formats = array())
    {
        $has_object = parent::_check_for_object(
            $props_n_values,
            __CLASS__,
            $timezone,
            $date_formats
        );
        return $has_object
            ? $has_object
            : new self($props_n_values, false, $timezone, $date_formats);
    }


    /**
     * @param array  $props_n_values  incoming values from the database
     * @param string $timezone        incoming timezone as set by the model.  If not set the timezone for
     *                                the website will be used.
     * @return EE_Datetime
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public static function new_instance_from_db($props_n_values = array(), $timezone = null)
    {
        return new self($props_n_values, true, $timezone);
    }


    /**
     * @param $name
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function set_name($name)
    {
        $this->set('DTT_name', $name);
    }


    /**
     * @param $description
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function set_description($description)
    {
        $this->set('DTT_description', $description);
    }


    /**
     * Set event start date
     * set the start date for an event
     *
     * @param string $date a string representation of the event's date ex:  Dec. 25, 2025 or 12-25-2025
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function set_start_date($date)
    {
        $this->_set_date_for($date, 'DTT_EVT_start');
    }


    /**
     * Set event start time
     * set the start time for an event
     *
     * @param string $time a string representation of the event time ex:  9am  or  7:30 PM
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function set_start_time($time)
    {
        $this->_set_time_for($time, 'DTT_EVT_start');
    }


    /**
     * Set event end date
     * set the end date for an event
     *
     * @param string $date a string representation of the event's date ex:  Dec. 25, 2025 or 12-25-2025
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function set_end_date($date)
    {
        $this->_set_date_for($date, 'DTT_EVT_end');
    }


    /**
     * Set event end time
     * set the end time for an event
     *
     * @param string $time a string representation of the event time ex:  9am  or  7:30 PM
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function set_end_time($time)
    {
        $this->_set_time_for($time, 'DTT_EVT_end');
    }


    /**
     * Set registration limit
     * set the maximum number of attendees that can be registered for this datetime slot
     *
     * @param int $reg_limit
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function set_reg_limit($reg_limit)
    {
        $this->set('DTT_reg_limit', $reg_limit);
    }


    /**
     * get the number of tickets sold for this datetime slot
     *
     * @return mixed int on success, FALSE on fail
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function sold()
    {
        return $this->get_raw('DTT_sold');
    }


    /**
     * @param int $sold
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function set_sold($sold)
    {
        // sold can not go below zero
        $sold = max(0, $sold);
        $this->set('DTT_sold', $sold);
    }


    /**
     * Increments sold by amount passed by $qty, and persists it immediately to the database.
     * Simultaneously decreases the reserved count, unless $also_decrease_reserved is false.
     *
     * @param int $qty
     * @param boolean $also_decrease_reserved
     * @return boolean indicating success
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function increaseSold($qty = 1, $also_decrease_reserved = true)
    {
        $qty = absint($qty);
        if ($also_decrease_reserved) {
            $success = $this->adjustNumericFieldsInDb(
                [
                    'DTT_reserved' => $qty * -1,
                    'DTT_sold' => $qty
                ]
            );
        } else {
            $success = $this->adjustNumericFieldsInDb(
                [
                    'DTT_sold' => $qty
                ]
            );
        }

        do_action(
            'AHEE__EE_Datetime__increase_sold',
            $this,
            $qty,
            $this->sold(),
            $success
        );
        return $success;
    }


    /**
     * Decrements (subtracts) sold amount passed by $qty directly in the DB and on the model object. (Ie, no need
     * to save afterwards.)
     *
     * @param int $qty
     * @return boolean indicating success
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function decreaseSold($qty = 1)
    {
        $qty = absint($qty);
        $success = $this->adjustNumericFieldsInDb(
            [
                'DTT_sold' => $qty * -1
            ]
        );
        do_action(
            'AHEE__EE_Datetime__decrease_sold',
            $this,
            $qty,
            $this->sold(),
            $success
        );
        return $success;
    }


    /**
     * Gets qty of reserved tickets for this datetime
     *
     * @return int
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function reserved()
    {
        return $this->get_raw('DTT_reserved');
    }


    /**
     * Sets qty of reserved tickets for this datetime
     *
     * @param int $reserved
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function set_reserved($reserved)
    {
        // reserved can not go below zero
        $reserved = max(0, (int) $reserved);
        $this->set('DTT_reserved', $reserved);
    }


    /**
     * Increments reserved by amount passed by $qty, and persists it immediately to the database.
     *
     * @param int $qty
     * @return boolean indicating success
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function increaseReserved($qty = 1)
    {
        $qty = absint($qty);
        $success = $this->incrementFieldConditionallyInDb(
            'DTT_reserved',
            'DTT_sold',
            'DTT_reg_limit',
            $qty
        );
        do_action(
            'AHEE__EE_Datetime__increase_reserved',
            $this,
            $qty,
            $this->reserved(),
            $success
        );
        return $success;
    }


    /**
     * Decrements (subtracts) reserved by amount passed by $qty, and persists it immediately to the database.
     *
     * @param int $qty
     * @return boolean indicating success
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function decreaseReserved($qty = 1)
    {
        $qty = absint($qty);
        $success = $this->adjustNumericFieldsInDb(
            [
                'DTT_reserved' => $qty * -1
            ]
        );
        do_action(
            'AHEE__EE_Datetime__decrease_reserved',
            $this,
            $qty,
            $this->reserved(),
            $success
        );
        return $success;
    }


    /**
     * total sold and reserved tickets
     *
     * @return int
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function sold_and_reserved()
    {
        return $this->sold() + $this->reserved();
    }


    /**
     * returns the datetime name
     *
     * @return string
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function name()
    {
        return $this->get('DTT_name');
    }


    /**
     * returns the datetime description
     *
     * @return string
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function description()
    {
        return $this->get('DTT_description');
    }


    /**
     * This helper simply returns whether the event_datetime for the current datetime is a primary datetime
     *
     * @return boolean  TRUE if is primary, FALSE if not.
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function is_primary()
    {
        return $this->get('DTT_is_primary');
    }


    /**
     * This helper simply returns the order for the datetime
     *
     * @return int  The order of the datetime for this event.
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function order()
    {
        return $this->get('DTT_order');
    }


    /**
     * This helper simply returns the parent id for the datetime
     *
     * @return int
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function parent()
    {
        return $this->get('DTT_parent');
    }


    /**
     * show date and/or time
     *
     * @param string $date_or_time    whether to display a date or time or both
     * @param string $start_or_end    whether to display start or end datetimes
     * @param string $dt_frmt
     * @param string $tm_frmt
     * @param bool   $echo            whether we echo or return (note echoing uses "pretty" formats,
     *                                otherwise we use the standard formats)
     * @return string|bool  string on success, FALSE on fail
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    private function _show_datetime(
        $date_or_time = null,
        $start_or_end = 'start',
        $dt_frmt = '',
        $tm_frmt = '',
        $echo = false
    ) {
        $field_name = "DTT_EVT_{$start_or_end}";
        $dtt = $this->_get_datetime(
            $field_name,
            $dt_frmt,
            $tm_frmt,
            $date_or_time,
            $echo
        );
        if (! $echo) {
            return $dtt;
        }
        return '';
    }


    /**
     * get event start date.  Provide either the date format, or NULL to re-use the
     * last-used format, or '' to use the default date format
     *
     * @param string $dt_frmt string representation of date format defaults to 'F j, Y'
     * @return mixed            string on success, FALSE on fail
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function start_date($dt_frmt = '')
    {
        return $this->_show_datetime('D', 'start', $dt_frmt);
    }


    /**
     * Echoes start_date()
     *
     * @param string $dt_frmt
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function e_start_date($dt_frmt = '')
    {
        $this->_show_datetime('D', 'start', $dt_frmt, null, true);
    }


    /**
     * get end date. Provide either the date format, or NULL to re-use the
     * last-used format, or '' to use the default date format
     *
     * @param string $dt_frmt string representation of date format defaults to 'F j, Y'
     * @return mixed            string on success, FALSE on fail
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function end_date($dt_frmt = '')
    {
        return $this->_show_datetime('D', 'end', $dt_frmt);
    }


    /**
     * Echoes the end date. See end_date()
     *
     * @param string $dt_frmt
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function e_end_date($dt_frmt = '')
    {
        $this->_show_datetime('D', 'end', $dt_frmt, null, true);
    }


    /**
     * get date_range - meaning the start AND end date
     *
     * @access public
     * @param string $dt_frmt     string representation of date format defaults to WP settings
     * @param string $conjunction conjunction junction what's your function ?
     *                            this string joins the start date with the end date ie: Jan 01 "to" Dec 31
     * @return mixed              string on success, FALSE on fail
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function date_range($dt_frmt = '', $conjunction = ' - ')
    {
        $dt_frmt = ! empty($dt_frmt) ? $dt_frmt : $this->_dt_frmt;
        $start = str_replace(
            ' ',
            '&nbsp;',
            $this->get_i18n_datetime('DTT_EVT_start', $dt_frmt)
        );
        $end = str_replace(
            ' ',
            '&nbsp;',
            $this->get_i18n_datetime('DTT_EVT_end', $dt_frmt)
        );
        return $start !== $end ? $start . $conjunction . $end : $start;
    }


    /**
     * @param string $dt_frmt
     * @param string $conjunction
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function e_date_range($dt_frmt = '', $conjunction = ' - ')
    {
        echo esc_html($this->date_range($dt_frmt, $conjunction));
    }


    /**
     * get start time
     *
     * @param string $tm_format - string representation of time format defaults to 'g:i a'
     * @return mixed        string on success, FALSE on fail
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function start_time($tm_format = '')
    {
        return $this->_show_datetime('T', 'start', null, $tm_format);
    }


    /**
     * @param string $tm_format
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function e_start_time($tm_format = '')
    {
        $this->_show_datetime('T', 'start', null, $tm_format, true);
    }


    /**
     * get end time
     *
     * @param string $tm_format string representation of time format defaults to 'g:i a'
     * @return mixed                string on success, FALSE on fail
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function end_time($tm_format = '')
    {
        return $this->_show_datetime('T', 'end', null, $tm_format);
    }


    /**
     * @param string $tm_format
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function e_end_time($tm_format = '')
    {
        $this->_show_datetime('T', 'end', null, $tm_format, true);
    }


    /**
     * get time_range
     *
     * @access public
     * @param string $tm_format   string representation of time format defaults to 'g:i a'
     * @param string $conjunction conjunction junction what's your function ?
     *                            this string joins the start date with the end date ie: Jan 01 "to" Dec 31
     * @return mixed              string on success, FALSE on fail
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function time_range($tm_format = '', $conjunction = ' - ')
    {
        $tm_format = ! empty($tm_format) ? $tm_format : $this->_tm_frmt;
        $start = str_replace(
            ' ',
            '&nbsp;',
            $this->get_i18n_datetime('DTT_EVT_start', $tm_format)
        );
        $end = str_replace(
            ' ',
            '&nbsp;',
            $this->get_i18n_datetime('DTT_EVT_end', $tm_format)
        );
        return $start !== $end ? $start . $conjunction . $end : $start;
    }


    /**
     * @param string $tm_format
     * @param string $conjunction
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function e_time_range($tm_format = '', $conjunction = ' - ')
    {
        echo esc_html($this->time_range($tm_format, $conjunction));
    }


    /**
     * This returns a range representation of the date and times.
     * Output is dependent on the difference (or similarity) between DTT_EVT_start and DTT_EVT_end.
     * Also, the return value is localized.
     *
     * @param string $dt_format
     * @param string $tm_format
     * @param string $conjunction used between two different dates or times.
     *                            ex: Dec 1{$conjunction}}Dec 6, or 2pm{$conjunction}3pm
     * @param string $separator   used between the date and time formats.
     *                            ex: Dec 1, 2016{$separator}2pm
     * @return string
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function date_and_time_range(
        $dt_format = '',
        $tm_format = '',
        $conjunction = ' - ',
        $separator = ' '
    ) {
        $dt_format = ! empty($dt_format) ? $dt_format : $this->_dt_frmt;
        $tm_format = ! empty($tm_format) ? $tm_format : $this->_tm_frmt;
        $full_format = $dt_format . $separator . $tm_format;
        // the range output depends on various conditions
        switch (true) {
            // start date timestamp and end date timestamp are the same.
            case ($this->get_raw('DTT_EVT_start') === $this->get_raw('DTT_EVT_end')):
                $output = $this->get_i18n_datetime('DTT_EVT_start', $full_format);
                break;
            // start and end date are the same but times are different
            case ($this->start_date() === $this->end_date()):
                $output = $this->get_i18n_datetime('DTT_EVT_start', $full_format)
                          . $conjunction
                          . $this->get_i18n_datetime('DTT_EVT_end', $tm_format);
                break;
            // all other conditions
            default:
                $output = $this->get_i18n_datetime('DTT_EVT_start', $full_format)
                          . $conjunction
                          . $this->get_i18n_datetime('DTT_EVT_end', $full_format);
                break;
        }
        return $output;
    }


    /**
     * This echos the results of date and time range.
     *
     * @see date_and_time_range() for more details on purpose.
     * @param string $dt_format
     * @param string $tm_format
     * @param string $conjunction
     * @return void
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function e_date_and_time_range($dt_format = '', $tm_format = '', $conjunction = ' - ')
    {
        echo esc_html($this->date_and_time_range($dt_format, $tm_format, $conjunction));
    }


    /**
     * get start date and start time
     *
     * @param    string $dt_format - string representation of date format defaults to 'F j, Y'
     * @param    string $tm_format - string representation of time format defaults to 'g:i a'
     * @return    mixed    string on success, FALSE on fail
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function start_date_and_time($dt_format = '', $tm_format = '')
    {
        return $this->_show_datetime('', 'start', $dt_format, $tm_format);
    }


    /**
     * @param string $dt_frmt
     * @param string $tm_format
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function e_start_date_and_time($dt_frmt = '', $tm_format = '')
    {
        $this->_show_datetime('', 'start', $dt_frmt, $tm_format, true);
    }


    /**
     * Shows the length of the event (start to end time).
     * Can be shown in 'seconds','minutes','hours', or 'days'.
     * By default, rounds up. (So if you use 'days', and then event
     * only occurs for 1 hour, it will return 1 day).
     *
     * @param string $units 'seconds','minutes','hours','days'
     * @param bool   $round_up
     * @return float|int|mixed
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function length($units = 'seconds', $round_up = false)
    {
        $start = $this->get_raw('DTT_EVT_start');
        $end = $this->get_raw('DTT_EVT_end');
        $length_in_units = $end - $start;
        switch ($units) {
            // NOTE: We purposefully don't use "break;" in order to chain the divisions
            /** @noinspection PhpMissingBreakStatementInspection */
            // phpcs:disable PSR2.ControlStructures.SwitchDeclaration.TerminatingComment
            case 'days':
                $length_in_units /= 24;
            /** @noinspection PhpMissingBreakStatementInspection */
            case 'hours':
                // fall through is intentional
                $length_in_units /= 60;
            /** @noinspection PhpMissingBreakStatementInspection */
            case 'minutes':
                // fall through is intentional
                $length_in_units /= 60;
            case 'seconds':
            default:
                $length_in_units = ceil($length_in_units);
        }
        // phpcs:enable
        if ($round_up) {
            $length_in_units = max($length_in_units, 1);
        }
        return $length_in_units;
    }


    /**
     *        get end date and time
     *
     * @param string $dt_frmt   - string representation of date format defaults to 'F j, Y'
     * @param string $tm_format - string representation of time format defaults to 'g:i a'
     * @return    mixed                string on success, FALSE on fail
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function end_date_and_time($dt_frmt = '', $tm_format = '')
    {
        return $this->_show_datetime('', 'end', $dt_frmt, $tm_format);
    }


    /**
     * @param string $dt_frmt
     * @param string $tm_format
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function e_end_date_and_time($dt_frmt = '', $tm_format = '')
    {
        $this->_show_datetime('', 'end', $dt_frmt, $tm_format, true);
    }


    /**
     *        get start timestamp
     *
     * @return        int
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function start()
    {
        return $this->get_raw('DTT_EVT_start');
    }


    /**
     *        get end timestamp
     *
     * @return        int
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function end()
    {
        return $this->get_raw('DTT_EVT_end');
    }


    /**
     *    get the registration limit for this datetime slot
     *
     * @return        mixed        int on success, FALSE on fail
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function reg_limit()
    {
        return $this->get_raw('DTT_reg_limit');
    }


    /**
     *    have the tickets sold for this datetime, met or exceed the registration limit ?
     *
     * @return        boolean
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function sold_out()
    {
        return $this->reg_limit() > 0 && $this->sold() >= $this->reg_limit();
    }


    /**
     * return the total number of spaces remaining at this venue.
     * This only takes the venue's capacity into account, NOT the tickets available for sale
     *
     * @param bool $consider_tickets Whether to consider tickets remaining when determining if there are any spaces left
     *                               Because if all tickets attached to this datetime have no spaces left,
     *                               then this datetime IS effectively sold out.
     *                               However, there are cases where we just want to know the spaces
     *                               remaining for this particular datetime, hence the flag.
     * @return int
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function spaces_remaining($consider_tickets = false)
    {
        // tickets remaining available for purchase
        // no need for special checks for infinite, because if DTT_reg_limit == EE_INF, then EE_INF - x = EE_INF
        $dtt_remaining = $this->reg_limit() - $this->sold_and_reserved();
        if (! $consider_tickets) {
            return $dtt_remaining;
        }
        $tickets_remaining = $this->tickets_remaining();
        return min($dtt_remaining, $tickets_remaining);
    }


    /**
     * Counts the total tickets available
     * (from all the different types of tickets which are available for this datetime).
     *
     * @param array $query_params @see https://github.com/eventespresso/event-espresso-core/tree/master/docs/G--Model-System/model-query-params.md
     * @return int
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function tickets_remaining($query_params = array())
    {
        $sum = 0;
        $tickets = $this->tickets($query_params);
        if (! empty($tickets)) {
            foreach ($tickets as $ticket) {
                if ($ticket instanceof EE_Ticket) {
                    // get the actual amount of tickets that can be sold
                    $qty = $ticket->qty('saleable');
                    if ($qty === EE_INF) {
                        return EE_INF;
                    }
                    // no negative ticket quantities plz
                    if ($qty > 0) {
                        $sum += $qty;
                    }
                }
            }
        }
        return $sum;
    }


    /**
     * Gets the count of all the tickets available at this datetime (not ticket types)
     * before any were sold
     *
     * @param array $query_params @see https://github.com/eventespresso/event-espresso-core/tree/master/docs/G--Model-System/model-query-params.md
     * @return int
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function sum_tickets_initially_available($query_params = array())
    {
        return $this->sum_related('Ticket', $query_params, 'TKT_qty');
    }


    /**
     * Returns the lesser-of-the two: spaces remaining at this datetime, or
     * the total tickets remaining (a sum of the tickets remaining for each ticket type
     * that is available for this datetime).
     *
     * @return int
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function total_tickets_available_at_this_datetime()
    {
        return $this->spaces_remaining(true);
    }


    /**
     * This simply compares the internal dtt for the given string with NOW
     * and determines if the date is upcoming or not.
     *
     * @access public
     * @return boolean
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function is_upcoming()
    {
        return ($this->get_raw('DTT_EVT_start') > time());
    }


    /**
     * This simply compares the internal datetime for the given string with NOW
     * and returns if the date is active (i.e. start and end time)
     *
     * @return boolean
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function is_active()
    {
        return ($this->get_raw('DTT_EVT_start') < time() && $this->get_raw('DTT_EVT_end') > time());
    }


    /**
     * This simply compares the internal dtt for the given string with NOW
     * and determines if the date is expired or not.
     *
     * @return boolean
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function is_expired()
    {
        return ($this->get_raw('DTT_EVT_end') < time());
    }


    /**
     * This returns the active status for whether an event is active, upcoming, or expired
     *
     * @return int return value will be one of the EE_Datetime status constants.
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function get_active_status()
    {
        $total_tickets_for_this_dtt = $this->total_tickets_available_at_this_datetime();
        if ($total_tickets_for_this_dtt !== false && $total_tickets_for_this_dtt < 1) {
            return EE_Datetime::sold_out;
        }
        if ($this->is_expired()) {
            return EE_Datetime::expired;
        }
        if ($this->is_upcoming()) {
            return EE_Datetime::upcoming;
        }
        if ($this->is_active()) {
            return EE_Datetime::active;
        }
        return null;
    }


    /**
     * This returns a nice display name for the datetime that is contingent on the span between the dates and times.
     *
     * @param  boolean $use_dtt_name if TRUE then we'll use DTT->name() if its not empty.
     * @return string
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function get_dtt_display_name($use_dtt_name = false)
    {
        if ($use_dtt_name) {
            $dtt_name = $this->name();
            if (! empty($dtt_name)) {
                return $dtt_name;
            }
        }
        // first condition is to see if the months are different
        if (
            date('m', $this->get_raw('DTT_EVT_start')) !== date('m', $this->get_raw('DTT_EVT_end'))
        ) {
            $display_date = $this->start_date('M j\, Y g:i a') . ' - ' . $this->end_date('M j\, Y g:i a');
            // next condition is if its the same month but different day
        } else {
            if (
                date('m', $this->get_raw('DTT_EVT_start')) === date('m', $this->get_raw('DTT_EVT_end'))
                && date('d', $this->get_raw('DTT_EVT_start')) !== date('d', $this->get_raw('DTT_EVT_end'))
            ) {
                $display_date = $this->start_date('M j\, g:i a') . ' - ' . $this->end_date('M j\, g:i a Y');
            } else {
                $display_date = $this->start_date('F j\, Y')
                                . ' @ '
                                . $this->start_date('g:i a')
                                . ' - '
                                . $this->end_date('g:i a');
            }
        }
        return $display_date;
    }


    /**
     * Gets all the tickets for this datetime
     *
     * @param array $query_params @see https://github.com/eventespresso/event-espresso-core/tree/master/docs/G--Model-System/model-query-params.md
     * @return EE_Base_Class[]|EE_Ticket[]
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function tickets($query_params = array())
    {
        return $this->get_many_related('Ticket', $query_params);
    }


    /**
     * Gets all the ticket types currently available for purchase
     *
     * @param array $query_params @see https://github.com/eventespresso/event-espresso-core/tree/master/docs/G--Model-System/model-query-params.md
     * @return EE_Ticket[]
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function ticket_types_available_for_purchase($query_params = array())
    {
        // first check if datetime is valid
        if ($this->sold_out() || ! ($this->is_upcoming() || $this->is_active())) {
            return array();
        }
        if (empty($query_params)) {
            $query_params = array(
                array(
                    'TKT_start_date' => array('<=', EEM_Ticket::instance()->current_time_for_query('TKT_start_date')),
                    'TKT_end_date'   => array('>=', EEM_Ticket::instance()->current_time_for_query('TKT_end_date')),
                    'TKT_deleted'    => false,
                ),
            );
        }
        return $this->tickets($query_params);
    }


    /**
     * @return EE_Base_Class|EE_Event
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function event()
    {
        return $this->get_first_related('Event');
    }


    /**
     * Updates the DTT_sold attribute (and saves) based on the number of registrations for this datetime
     * (via the tickets).
     *
     * @return int
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function update_sold()
    {
        $count_regs_for_this_datetime = EEM_Registration::instance()->count(
            array(
                array(
                    'STS_ID'                 => EEM_Registration::status_id_approved,
                    'REG_deleted'            => 0,
                    'Ticket.Datetime.DTT_ID' => $this->ID(),
                ),
            )
        );
        $this->set_sold($count_regs_for_this_datetime);
        $this->save();
        return $count_regs_for_this_datetime;
    }


    /*******************************************************************
     ***********************  DEPRECATED METHODS  **********************
     *******************************************************************/


    /**
     * Increments sold by amount passed by $qty, and persists it immediately to the database.
     *
     * @deprecated 4.9.80.p
     * @param int $qty
     * @return boolean
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function increase_sold($qty = 1)
    {
        EE_Error::doing_it_wrong(
            __FUNCTION__,
            esc_html__('Please use EE_Datetime::increaseSold() instead', 'event_espresso'),
            '4.9.80.p',
            '5.0.0.p'
        );
        return $this->increaseSold($qty);
    }


    /**
     * Decrements (subtracts) sold amount passed by $qty directly in the DB and on the model object. (Ie, no need
     * to save afterwards.)
     *
     * @deprecated 4.9.80.p
     * @param int $qty
     * @return boolean
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function decrease_sold($qty = 1)
    {
        EE_Error::doing_it_wrong(
            __FUNCTION__,
            esc_html__('Please use EE_Datetime::decreaseSold() instead', 'event_espresso'),
            '4.9.80.p',
            '5.0.0.p'
        );
        return $this->decreaseSold($qty);
    }


    /**
     * Increments reserved by amount passed by $qty, and persists it immediately to the database.
     *
     * @deprecated 4.9.80.p
     * @param int $qty
     * @return boolean indicating success
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function increase_reserved($qty = 1)
    {
        EE_Error::doing_it_wrong(
            __FUNCTION__,
            esc_html__('Please use EE_Datetime::increaseReserved() instead', 'event_espresso'),
            '4.9.80.p',
            '5.0.0.p'
        );
        return $this->increaseReserved($qty);
    }


    /**
     * Decrements (subtracts) reserved by amount passed by $qty, and persists it immediately to the database.
     *
     * @deprecated 4.9.80.p
     * @param int $qty
     * @return boolean
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function decrease_reserved($qty = 1)
    {
        EE_Error::doing_it_wrong(
            __FUNCTION__,
            esc_html__('Please use EE_Datetime::decreaseReserved() instead', 'event_espresso'),
            '4.9.80.p',
            '5.0.0.p'
        );
        return $this->decreaseReserved($qty);
    }
}
