<?php

/**
 * EE_Ticket_List_Shortcodes
 *
 * this is a child class for the EE_Shortcodes library.  The EE_Ticket_List_Shortcodes lists all shortcodes related to
 * Ticket Lists.
 *
 * This is a special shortcode parser in that it will actually LOAD other parsers and receive a template to parse via
 * the Shortcode Parser.
 *
 * NOTE: if a method doesn't have any phpdoc commenting the details can be found in the comments in EE_Shortcodes
 * parent class.
 *
 * @package        Event Espresso
 * @subpackage     libraries/shortcodes/EE_Ticket_List_Shortcodes.lib.php
 * @author         Darren Ethier
 */
class EE_Ticket_List_Shortcodes extends EE_Shortcodes
{
    public function __construct()
    {
        parent::__construct();
    }


    protected function _init_props()
    {
        $this->label       = esc_html__('Ticket List Shortcodes', 'event_espresso');
        $this->description = esc_html__('All shortcodes specific to ticket lists', 'event_espresso');
        $this->_shortcodes = [
            '[TICKET_LIST]' => esc_html__('Will output a list of tickets', 'event_espresso'),
        ];
    }


    /**
     * @param string $shortcode
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _parser($shortcode)
    {
        switch ($shortcode) {
            case '[TICKET_LIST]':
                return $this->_get_ticket_list();
        }
        return '';
    }


    /**
     * figure out what the incoming data is and then return the appropriate parsed value.
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function _get_ticket_list()
    {
        $this->_validate_list_requirements();

        if ($this->_data['data'] instanceof EE_Messages_Addressee) {
            return $this->_get_ticket_list_for_main();
        }
        if ($this->_data['data'] instanceof EE_Registration) {
            return $this->_get_ticket_list_for_attendee();
        }
        if ($this->_data['data'] instanceof EE_Event) {
            return $this->_get_ticket_list_for_event();
        }
        // prevent recursive loop
        return '';
    }


    /**
     * This returns the parsed ticket list for main template;
     */
    private function _get_ticket_list_for_main()
    {
        $valid_shortcodes = [
            'ticket',
            'event_list',
            'attendee_list',
            'datetime_list',
            'attendee',
            'line_item_list',
            'primary_registration_details',
            'recipient_details',
        ];
        $template         = $this->_data['template'];
        $data             = $this->_data['data'];
        $ticket_list      = '';


        // now we need to loop through the ticket list and send data to the EE_Parser helper.
        foreach ($data->tickets as $ticket) {
            $ticket_list .= $this->_shortcode_helper->parse_ticket_list_template(
                $template,
                $ticket['ticket'],
                $valid_shortcodes,
                $this->_extra_data
            );
        }

        return $ticket_list;
    }


    /**
     * return parsed list of tickets for an event
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function _get_ticket_list_for_event()
    {
        $valid_shortcodes = [
            'ticket',
            'attendee_list',
            'datetime_list',
            'attendee',
            'venue',
            'line_item_list',
            'primary_registration_details',
            'recipient_details',
        ];
        $template         = is_array($this->_data['template']) && isset($this->_data['template']['ticket_list'])
            ? $this->_data['template']['ticket_list']
            : $this->_extra_data['template']['ticket_list'];
        $event            = $this->_data['data'];

        // let's remove any existing [EVENT_LIST] shortcodes from the ticket list template so that we don't get recursion.
        $template = str_replace('[EVENT_LIST]', '', $template);

        // here we're setting up the tickets for the ticket list template for THIS event.
        $tkt_parsed = '';
        $tickets    = $this->_get_tickets_from_event($event);

        // each ticket in this case should be an ticket object.
        foreach ($tickets as $ticket) {
            $tkt_parsed .= $this->_shortcode_helper->parse_ticket_list_template(
                $template,
                $ticket,
                $valid_shortcodes,
                $this->_extra_data
            );
        }

        return $tkt_parsed;
    }


    /**
     * return parsed list of tickets for an attendee
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function _get_ticket_list_for_attendee()
    {
        $valid_shortcodes = [
            'ticket',
            'event_list',
            'datetime_list',
            'attendee',
            'primary_registration_details',
            'recipient_details',
        ];

        $template     = is_array($this->_data['template']) && isset($this->_data['template']['ticket_list'])
            ? $this->_data['template']['ticket_list']
            : $this->_extra_data['template']['ticket_list'];
        $registration = $this->_data['data'];

        // let's remove any existing [ATTENDEE_LIST] shortcode from the ticket list template so that we don't get recursion.
        $template = str_replace('[ATTENDEE_LIST]', '', $template);

        // here we're setting up the tickets for the ticket list template for THIS attendee.
        $tkt_parsed = '';
        $tickets    = $this->_get_ticket_list_from_registration($registration);

        // each ticket in this case should be an ticket object.
        foreach ($tickets as $ticket) {
            $tkt_parsed .= $this->_shortcode_helper->parse_ticket_list_template(
                $template,
                $ticket,
                $valid_shortcodes,
                $this->_extra_data
            );
        }

        return $tkt_parsed;
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function _get_tickets_from_event(EE_Event $event)
    {
        return isset($this->_extra_data['data']->events)
            ? $this->_extra_data['data']->events[ $event->ID() ]['tkt_objs']
            : [];
    }


    /**
     * @param EE_Registration $registration
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function _get_ticket_list_from_registration(EE_Registration $registration)
    {
        return isset($this->_extra_data['data']->registrations)
            ? [$this->_extra_data['data']->registrations[ $registration->ID() ]['tkt_obj']]
            : [];
    }
}
