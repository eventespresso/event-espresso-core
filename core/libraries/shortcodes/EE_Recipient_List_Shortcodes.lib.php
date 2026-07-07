<?php

/**
 * EE_Recipient_List_Shortcodes
 *
 * this is a child class for the EE_Shortcodes library.  The EE_Recipient_List_Shortcodes lists all list type
 * shortcodes related to recipient specific info.  Meaning, that when this is parsed, we're parsing for WHO is
 * receiving the message.
 *
 * NOTE: if a method doesn't have any phpdoc commenting the details can be found in the comments in EE_Shortcodes
 * parent class.
 *
 * @package     Event Espresso
 * @subpackage  libraries/shortcodes/EE_Recipient_List_Shortcodes.lib.php
 * @author      Darren Ethier
 */
class EE_Recipient_List_Shortcodes extends EE_Shortcodes
{
    protected function _init_props()
    {
        $this->label       = esc_html__('Recipient List Shortcodes', 'event_espresso');
        $this->description = esc_html__(
            'All shortcodes specific to registrant recipients list type data.',
            'event_espresso'
        );
        $this->_shortcodes = [
            '[RECIPIENT_TICKET_LIST]'   => esc_html__(
                'Will output a list of tickets for the recipient of the email. Note, if the recipient is the Event Author, then this is blank.',
                'event_espresso'
            ),
            '[RECIPIENT_DATETIME_LIST]' => esc_html__(
                'Will output a list of datetimes that the person receiving this message has been registered for.',
                'event_espresso'
            ),
        ];
    }


    /**
     * @param $shortcode
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _parser($shortcode)
    {
        switch ($shortcode) {
            case '[RECIPIENT_TICKET_LIST]':
                return $this->_get_recipient_ticket_list();

            case '[RECIPIENT_DATETIME_LIST]':
                return $this->_get_recipient_datetime_list();
        }
        return '';
    }


    /**
     * figure out what the incoming data is and then return the appropriate parsed value
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function _get_recipient_ticket_list(): string
    {
        $this->_validate_list_requirements();
        if ($this->_data['data'] instanceof EE_Messages_Addressee) {
            return $this->_get_recipient_ticket_list_parsed($this->_data['data']);
        }
        if ($this->_extra_data['data'] instanceof EE_Messages_Addressee) {
            return $this->_get_recipient_ticket_list_parsed($this->_extra_data['data']);
        }
        return '';
    }


    /**
     * @param EE_Messages_Addressee $data
     * @return array|EE_Registration[]
     * @throws EE_Error
     * @throws ReflectionException
     * @since 5.0.57
     */
    private function getRegistrationsOnAttendee(EE_Messages_Addressee $data): array
    {
        $attendee = $data->att_obj;
        // get registrations just for this attendee.
        $registrations_on_attendee = $attendee instanceof EE_Attendee
            ? $data->attendees[ $attendee->ID() ]['reg_objs']
            : [];
        return empty($registrations_on_attendee) && $data->reg_obj instanceof EE_Registration
            ? [ $data->reg_obj ]
            : $registrations_on_attendee;
    }


    /**
     * @param EE_Messages_Addressee $data
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function _get_recipient_ticket_list_parsed(EE_Messages_Addressee $data): string
    {
        $registrations_on_attendee = $this->getRegistrationsOnAttendee($data);

        $template         = '';
        $tickets          = [];
        $valid_shortcodes = [];

        // if we're coming in from the main content then $this->_data['data'] is instanceof EE_Messages_Addressee.
        // which means we want to get tickets for all events this addressee is a part of.
        if ($this->_data['data'] instanceof EE_Messages_Addressee) {
            $valid_shortcodes = [
                'ticket',
                'event_list',
                'attendee_list',
                'datetime_list',
                'registration_details',
                'attendee',
                'recipient_details',
            ];

            $template = $this->_data['template'];
            // tickets will be tickets for all registrations on this attendee.
            foreach ($registrations_on_attendee as $reg) {
                if ($reg instanceof EE_Registration) {
                    $ticket = $data->registrations[ $reg->ID() ]['tkt_obj'] ?? null;
                    if ($ticket instanceof EE_Ticket) {
                        $tickets[ $ticket->ID() ] = $ticket;
                    }
                }
            }
        }

        // if coming from the context of the event list parser, then let's return just the tickets for that event.
        $event = $this->_data['data'];
        if ($event instanceof EE_Event) {
            $valid_shortcodes = ['ticket', 'attendee_list', 'datetime_list', 'attendee', 'recipient_details'];
            $template         = is_array($this->_data['template']) && isset($this->_data['template']['ticket_list'])
                ? $this->_data['template']['ticket_list']
                : $this->_extra_data['template']['ticket_list'];
            // let's remove any existing [EVENT_LIST] shortcode from the ticket list template so that we don't get recursion.
            $template = str_replace('[EVENT_LIST]', '', $template);
            // data will be tickets for this event for this recipient.
            foreach ($registrations_on_attendee as $reg) {
                if ($reg instanceof EE_Registration && $reg->event_ID() === $event->ID()) {
                    $ticket = $data->registrations[ $reg->ID() ]['tkt_obj'] ?? null;
                    if ($ticket instanceof EE_Ticket) {
                        $tickets[ $ticket->ID() ] = $ticket;
                    }
                }
            }
        }

        $tkt_parsed = '';
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
     * figure out what the incoming data is and then return the appropriate parsed value
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function _get_recipient_datetime_list(): string
    {
        $this->_validate_list_requirements();

        if ($this->_data['data'] instanceof EE_Messages_Addressee) {
            return $this->_get_recipient_datetime_list_parsed($this->_data['data']);
        }
        if ($this->_extra_data['data'] instanceof EE_Messages_Addressee) {
            return $this->_get_recipient_datetime_list_parsed($this->_extra_data['data']);
        }
        return '';
    }


    /**
     * @param EE_Messages_Addressee $data
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function _get_recipient_datetime_list_parsed(EE_Messages_Addressee $data): string
    {
        $registrations_on_attendee = $this->getRegistrationsOnAttendee($data);

        $template         = '';
        $datetimes        = [];
        $valid_shortcodes = ['datetime', 'attendee', 'recipient_details'];

        // setup valid shortcodes depending on what the status of the $this->_data property is
        if ($this->_data['data'] instanceof EE_Messages_Addressee) {
            $template = $this->_data['template'];

            // $datetimes will be datetimes for all registrations on this attendee
            foreach ($registrations_on_attendee as $reg) {
                if ($reg instanceof EE_Registration) {
                    $dtt_objs = $data->registrations[ $reg->ID() ]['dtt_objs'] ?? [];
                    foreach ((array) $dtt_objs as $dtt_obj) {
                        if ($dtt_obj instanceof EE_Datetime) {
                            $datetimes[ $dtt_obj->ID() ] = $dtt_obj;
                        }
                    }
                }
            }
        }

        // if coming from the context of the event list parser, then let's just return the datetimes for the specific event.
        $event = $this->_data['data'];
        if ($event instanceof EE_Event) {
            $template = is_array($this->_data['template']) && isset($this->_data['template']['datetime_list'])
                ? $this->_data['template']['datetime_list']
                : $this->_extra_data['template']['datetime_list'];

            // data will be datetimes for this event for this recipient
            foreach ($registrations_on_attendee as $reg) {
                if ($reg instanceof EE_Registration && $reg->event_ID() === $event->ID()) {
                    $ticket = $data->registrations[ $reg->ID() ]['tkt_obj'] ?? null;
                    if ($ticket instanceof EE_Ticket) {
                        $dtt_objs = $data->tickets[ $ticket->ID() ]['dtt_objs'] ?? [];
                        foreach ((array) $dtt_objs as $dtt_obj) {
                            if ($dtt_obj instanceof EE_Datetime) {
                                $datetimes[ $dtt_obj->ID() ] = $dtt_obj;
                            }
                        }
                    }
                }
            }
        }

        $dtt_parsed = '';
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
}
