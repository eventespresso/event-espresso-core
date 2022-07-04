<?php

/**
 * EE_Event_List_Shortcodes
 *
 * this is a child class for the EE_Shortcodes library.  The EE_Event_List_Shortcodes lists all shortcodes related to
 * Event Lists.
 *
 * This is a special shortcode parser in that it will actually LOAD other parsers and receive a template to parse via
 * the Shortcode Parser.
 *
 * NOTE: if a method doesn't have any phpdoc commenting the details can be found in the comments in EE_Shortcodes
 * parent class.
 *
 * @package        Event Espresso
 * @subpackage     libraries/shortcodes/EE_Event_List_Shortcodes.lib.php
 * @author         Darren Ethier
 */
class EE_Event_List_Shortcodes extends EE_Shortcodes
{
    public function __construct()
    {
        parent::__construct();
    }


    protected function _init_props()
    {
        $this->label       = esc_html__('Event List Shortcodes', 'event_espresso');
        $this->description = esc_html__('All shortcodes specific to event lists', 'event_espresso');
        $this->_shortcodes = [
            '[EVENT_LIST]' => esc_html__('Will output a list of events', 'event_espresso'),
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
            case '[EVENT_LIST]':
                return $this->_get_event_list();
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
    private function _get_event_list()
    {
        $this->_validate_list_requirements();

        if ($this->_data['data'] instanceof EE_Messages_Addressee) {
            return $this->_get_event_list_for_main();
        }
        if ($this->_data['data'] instanceof EE_Registration) {
            return $this->_get_event_list_for_registration();
        }
        // prevent recursive loop
        return '';
    }


    /**
     * This returns the parsed event list for main template
     *
     * @return string
     */
    private function _get_event_list_for_main()
    {

        $valid_shortcodes = [
            'event',
            'attendee_list',
            'ticket_list',
            'datetime_list',
            'venue',
            'attendee',
            'recipient_list',
            'recipient_details',
            'primary_registration_list',
            'primary_registration_details',
            'event_author',
            'organization',
        ];
        $template         = $this->_data['template'];
        $data             = $this->_data['data'];
        $events           = '';

        // now we need to loop through the events array in EE_Messages_Addressee and send data to the EE_Parser helper.
        foreach ($data->events as $event) {
            $events .= $this->_shortcode_helper->parse_event_list_template(
                $template,
                $event['event'],
                $valid_shortcodes,
                $this->_extra_data
            );
        }
        return $events;
    }


    /**
     * This returns the parsed event list for an attendee
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function _get_event_list_for_registration()
    {
        $valid_shortcodes = [
            'event',
            'ticket_list',
            'datetime_list',
            'attendee',
            'event_author',
            'recipient_details',
            'recipient_list',
            'venue',
            'organization',
        ];
        $template         = is_array($this->_data['template']) && isset($this->_data['template']['event_list'])
            ? $this->_data['template']['event_list']
            : $this->_extra_data['template']['event_list'];
        $registration     = $this->_data['data'];

        // let's remove any existing [ATTENDEE_LIST] shortcode from the event list template so that we don't get recursion.
        $template = str_replace('[ATTENDEE_LIST]', '', $template);

        // here we're setting up the events for the event_list template for THIS registration.
        $all_events = $this->_get_events_from_registration($registration);

        // we're NOT going to prepare a list of attendees this time around
        $events = '';

        foreach ($all_events as $event) {
            $events .= $this->_shortcode_helper->parse_event_list_template(
                $template,
                $event,
                $valid_shortcodes,
                $this->_extra_data
            );
        }

        return $events;
    }


    /**
     * @param EE_Registration $registration
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function _get_events_from_registration(EE_Registration $registration)
    {
        return isset($this->_extra_data['data']->registrations)
            ? [$this->_extra_data['data']->registrations[ $registration->ID() ]['evt_obj']]
            : [];
    }
}
