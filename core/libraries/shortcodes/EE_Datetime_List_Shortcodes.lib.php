<?php

/**
 * EE_Datetime_List_Shortcodes
 *
 * this is a child class for the EE_Shortcodes library.  The EE_Datetime_List_Shortcodes lists all shortcodes related
 * to Ticket Lists.
 *
 * This is a special shortcode parser in that it will actually LOAD other parsers and receive a template to parse via
 * the Shortcode Parser.
 *
 * NOTE: if a method doesn't have any phpdoc commenting the details can be found in the comments in EE_Shortcodes
 * parent class.
 *
 * @package        Event Espresso
 * @subpackage     libraries/shortcodes/EE_Datetime_List_Shortcodes.lib.php
 * @author         Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Datetime_List_Shortcodes extends EE_Shortcodes
{


    protected function _init_props()
    {
        $this->label = esc_html__('Datetime List Shortcodes', 'event_espresso');
        $this->description = esc_html__('All shortcodes specific to datetime lists', 'event_espresso');
        $this->_shortcodes = array(
            '[DATETIME_LIST]' => esc_html__(
                'Will output a list of datetimes according to the layout specified in the datetime list field.',
                'event_espresso'
            ),
        );
    }


    /**
     * @param string $shortcode
     * @return string
     * @throws EE_Error
     */
    protected function _parser($shortcode)
    {
        switch ($shortcode) {
            case '[DATETIME_LIST]':
                return $this->_get_datetime_list();
        }
        return '';
    }


    /**
     * figure out what the incoming data is and then return the appropriate parsed value.
     *
     * @return string
     * @throws EE_Error
     */
    private function _get_datetime_list()
    {
        $this->_validate_list_requirements();

        if ($this->_data['data'] instanceof EE_Ticket) {
            return $this->_get_datetime_list_for_ticket();
        } elseif ($this->_data['data'] instanceof EE_Event) {
            return $this->_get_datetime_list_for_event();
        } elseif ($this->_data['data'] instanceof EE_Messages_Addressee && $this->_data['data']->reg_obj instanceof EE_Registration) {
            return $this->_get_datetime_list_for_registration();
        }
        // prevent recursive loop
        return '';
    }


    /**
     * return parsed list of datetimes for an event
     *
     * @return string
     */
    private function _get_datetime_list_for_event()
    {
        $valid_shortcodes = array('datetime', 'attendee');
        $template = is_array($this->_data['template']) && isset($this->_data['template']['datetime_list'])
            ? $this->_data['template']['datetime_list'] : $this->_extra_data['template']['datetime_list'];
        $event = $this->_data['data'];

        // here we're setting up the datetimes for the datetime list template for THIS event.
        $dtt_parsed = '';
        $datetimes = $this->_get_datetimes_from_event($event);

        // each datetime in this case should be an datetime object.
        foreach ($datetimes as $datetime) {
            $dtt_parsed .= $this->_shortcode_helper->parse_datetime_list_template(
                $template,
                $datetime,
                $valid_shortcodes,
                $this->_extra_data
            );
        }

        return $dtt_parsed;
    }


    /**
     * return parsed list of datetimes for an ticket
     *
     * @return string
     */
    private function _get_datetime_list_for_ticket()
    {
        $valid_shortcodes = array('datetime', 'attendee');

        $template = is_array($this->_data['template']) && isset($this->_data['template']['datetime_list'])
            ? $this->_data['template']['datetime_list'] : $this->_extra_data['template']['datetime_list'];
        $ticket = $this->_data['data'];

        // here we're setting up the datetimes for the datetime list template for THIS ticket.
        $dtt_parsed = '';
        $datetimes = $this->_get_datetimes_from_ticket($ticket);

        // each datetime in this case should be an datetime object.
        foreach ($datetimes as $datetime) {
            $dtt_parsed .= $this->_shortcode_helper->parse_datetime_list_template(
                $template,
                $datetime,
                $valid_shortcodes,
                $this->_extra_data
            );
        }

        return $dtt_parsed;
    }


    /**
     * return parsed list of datetimes from a given registration.
     *
     * @return string
     */
    private function _get_datetime_list_for_registration()
    {
        $registration = $this->_data['data']->reg_obj;

        // now let's just get the ticket, set $this->_data['data'] to the ticket and then call _get_datetime_list_for__ticket();
        $this->_data['data'] = $registration->ticket();
        return $this->_get_datetime_list_for_ticket();
    }


    private function _get_datetimes_from_event(EE_Event $event, $att = null)
    {
        return isset($this->_extra_data['data']->events) ? $this->_extra_data['data']->events[ $event->ID(
        ) ]['dtt_objs'] : array();
    }

    private function _get_datetimes_from_ticket(EE_Ticket $ticket, $att = null)
    {
        return isset($this->_extra_data['data']->tickets) ? $this->_extra_data['data']->tickets[ $ticket->ID(
        ) ]['dtt_objs'] : array();
    }
}
