<?php

/**
 * EE_Attendee_List_Shortcodes
 *
 * this is a child class for the EE_Shortcodes library.  The EE_Attendee_List_Shortcodes lists all shortcodes related
 * to Attendee Lists.
 *
 * This is a special shortcode parser in that it will actually LOAD other parser and receive a template to parse via
 * the Shortcode Parser.
 *
 * NOTE: if a method doesn't have any phpdoc commenting the details can be found in the comments in EE_Shortcodes
 * parent class.
 *
 * @package        Event Espresso
 * @subpackage     libraries/shortcodes/EE_Attendee_List_Shortcodes.lib.php
 * @author         Darren Ethier
 */
class EE_Attendee_List_Shortcodes extends EE_Shortcodes
{
    public function __construct()
    {
        parent::__construct();
    }


    protected function _init_props()
    {
        $this->label       = esc_html__('Attendee List Shortcodes', 'event_espresso');
        $this->description = esc_html__('All shortcodes specific to attendee lists', 'event_espresso');
        $this->_shortcodes = [
            '[ATTENDEE_LIST]' => esc_html__('Will output a list of attendees', 'event_espresso'),
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
            case '[ATTENDEE_LIST]':
                return $this->_get_attendee_list();
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
    private function _get_attendee_list()
    {
        $this->_validate_list_requirements();

        if ($this->_data['data'] instanceof EE_Messages_Addressee) {
            return $this->_get_attendee_list_for_main();
        }
        if ($this->_data['data'] instanceof EE_Event) {
            return $this->_get_attendee_list_for_event();
        }
        if ($this->_data['data'] instanceof EE_Ticket) {
            return $this->_get_registration_list_for_ticket();
        }
        // prevent recursive loop
        return '';
    }


    /**
     * This returns the parsed attendee list for main template;
     */
    private function _get_attendee_list_for_main()
    {
        $valid_shortcodes = ['attendee', 'event_list', 'ticket_list', 'question_list', 'recipient_details'];
        $template         = $this->_data['template'];
        $data             = $this->_data['data'];
        $attendees        = '';


        // now we need to loop through the attendee list and send data to the EE_Parser helper.
        foreach ($data->reg_objs as $registration) {
            $attendees .= $this->_shortcode_helper->parse_attendee_list_template(
                $template,
                $registration,
                $valid_shortcodes,
                $this->_extra_data
            );
        }

        return $attendees;
    }


    /**
     * return parsed list of attendees for an event
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function _get_attendee_list_for_event()
    {
        $valid_shortcodes = ['attendee', 'ticket_list', 'question_list', 'recipient_details'];
        $template         = is_array($this->_data['template']) && isset($this->_data['template']['attendee_list'])
            ? $this->_data['template']['attendee_list']
            : $this->_extra_data['template']['attendee_list'];
        $event            = $this->_data['data'];

        // let's remove any existing [EVENT_LIST] shortcode from the attendee list template so that we don't get recursion.
        $template = str_replace('[EVENT_LIST]', '', $template);

        // here we're setting up the attendees for the attendee_list template for THIS event.
        $att_result    = '';
        $registrations = $this->_get_registrations_from_event($event);

        // each attendee in this case should be an attendee object.
        foreach ($registrations as $registration) {
            $att_result .= $this->_shortcode_helper->parse_attendee_list_template(
                $template,
                $registration,
                $valid_shortcodes,
                $this->_extra_data
            );
        }

        return $att_result;
    }


    /**
     * return parsed list of attendees for a ticket
     *
     * @return string
     */
    private function _get_registration_list_for_ticket()
    {
        $valid_shortcodes = ['attendee', 'event_list', 'question_list', 'recipient_details'];
        $template         = is_array($this->_data['template']) && isset($this->_data['template']['attendee_list'])
            ? $this->_data['template']['attendee_list']
            : $this->_extra_data['template']['attendee_list'];
        $ticket           = $this->_data['data'];

        // let's remove any existing [TICKET_LIST] (or related) shortcode from the attendee list template so that we don't get recursion.
        $template = str_replace('[TICKET_LIST]', '', $template);
        $template = str_replace('[RECIPIENT_TICKET_LIST]', '', $template);
        $template = str_replace('[PRIMARY_REGISTRANT_TICKET_LIST]', '', $template);

        // here we're setting up the attendees for the attendee_list template for THIS ticket.
        $att_result    = '';
        $registrations =
            isset($this->_extra_data['data']->tickets)
                ? $this->_extra_data['data']->tickets[ $ticket->ID() ]['reg_objs']
                : [];

        // each attendee in this case should be an attendee object.
        foreach ($registrations as $registration) {
            $att_result .= $this->_shortcode_helper->parse_attendee_list_template(
                $template,
                $registration,
                $valid_shortcodes,
                $this->_extra_data
            );
        }

        return $att_result;
    }


    /**
     * @param EE_Event $event
     * @return array|mixed
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function _get_registrations_from_event(EE_Event $event)
    {
        return isset($this->_extra_data['data']->events)
            ? $this->_extra_data['data']->events[ $event->ID() ]['reg_objs']
            : [];
    }
}
