<?php

/**
 * EE_Attendee_Shortcodes
 *
 * this is a child class for the EE_Shortcodes library.  The EE_Attendee_Shortcodes lists all shortcodes related to
 * attendee specific info.
 *
 * NOTE: if a method doesn't have any phpdoc commenting the details can be found in the comments in EE_Shortcodes
 * parent class.
 *
 * @package        Event Espresso
 * @subpackage     libraries/shortcodes/EE_Attendee_Shortcodes.lib.php
 * @author         Darren Ethier
 */
class EE_Attendee_Shortcodes extends EE_Shortcodes
{
    /**
     * hold all extra data.
     *
     * @var array
     */
    protected $_extra;


    /**
     * EE_Attendee_Shortcodes constructor.
     */
    public function __construct()
    {
        parent::__construct();
    }


    protected function _init_props()
    {
        $this->label       = esc_html__('Attendee Shortcodes', 'event_espresso');
        $this->description = esc_html__('All shortcodes specific to attendee related data', 'event_espresso');
        $this->_shortcodes = [
            '[FNAME]'                          => esc_html__('First Name of an attendee.', 'event_espresso'),
            '[LNAME]'                          => esc_html__('Last Name of an attendee.', 'event_espresso'),
            '[ATTENDEE_EMAIL]'                 => esc_html__('Email address for the attendee.', 'event_espresso'),
            '[EDIT_ATTENDEE_LINK]'             => esc_html__(
                'Edit Registration Link (typically you\'d only use this for messages going to event administrators)',
                'event_espresso'
            ),
            '[REGISTRATION_ID]'                => esc_html__(
                'Unique Registration ID for the registration',
                'event_espresso'
            ),
            '[REGISTRATION_CODE]'              => esc_html__(
                'Unique Registration Code for the registration',
                'event_espresso'
            ),
            '[REGISTRATION_STATUS_ID]'         => esc_html__(
                'Parses to the registration status for the attendee',
                'event_espresso'
            ),
            '[REGISTRATION_STATUS_LABEL]'      => esc_html__(
                'Parses to the status label for the registrant',
                'event_espresso'
            ),
            '[REGISTRATION_TOTAL_AMOUNT_PAID]' => esc_html__(
                'Parses to the total amount paid for this registration.',
                'event_espresso'
            ),
            '[FRONTEND_EDIT_REG_LINK]'         => esc_html__(
                'Generates a link for the given registration to edit this registration details on the frontend.',
                'event_espresso'
            ),
            '[PHONE_NUMBER]'                   => esc_html__(
                'The Phone Number for the Registration.',
                'event_espresso'
            ),
            '[ADDRESS]'                        => esc_html__('The Address for the Registration', 'event_espresso'),
            '[ADDRESS2]'                       => esc_html__(
                'Whatever was in the address 2 field for the registration.',
                'event_espresso'
            ),
            '[CITY]'                           => esc_html__('The city for the registration.', 'event_espresso'),
            '[ZIP_PC]'                         => esc_html__(
                'The ZIP (or Postal) Code for the Registration.',
                'event_espresso'
            ),
            '[ADDRESS_STATE]'                  => esc_html__(
                'The state/province for the registration.',
                'event_espresso'
            ),
            '[COUNTRY]'                        => esc_html__('The country for the registration.', 'event_espresso'),
        ];
    }


    /**
     * handles shortcode parsing
     *
     * @access protected
     * @param string $shortcode the shortcode to be parsed.
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _parser($shortcode)
    {


        $this->_extra = ! empty($this->_extra_data) && $this->_extra_data['data'] instanceof EE_Messages_Addressee
            ? $this->_extra_data['data']
            : null;

        // incoming object should only be a registration object.
        $registration = ! $this->_data instanceof EE_Registration
            ? null
            : $this->_data;

        if (! $registration instanceof EE_Registration) {
            // let's attempt to get the txn_id for the error message.
            $txn_id  = isset($this->_extra->txn) && $this->_extra->txn instanceof EE_Transaction
                ? $this->_extra->txn->ID()
                : esc_html__('Unknown', 'event_espresso');
            $msg     = esc_html__(
                'There is no EE_Registration object in the data sent to the EE_Attendee Shortcode Parser for the messages system.',
                'event_espresso'
            );
            $dev_msg = sprintf(
                esc_html__('The transaction ID for this request is: %s', 'event_espresso'),
                $txn_id
            );
            throw new EE_Error("{$msg}||{$msg} {$dev_msg}");
        }

        // attendee obj for this registration
        $attendee = isset($this->_extra->registrations[ $registration->ID() ]['att_obj'])
            ? $this->_extra->registrations[ $registration->ID() ]['att_obj']
            : null;

        if (! $attendee instanceof EE_Attendee) {
            $msg     = esc_html__(
                'There is no EE_Attendee object in the data sent to the EE_Attendee_Shortcode parser for the messages system.',
                'event_espresso'
            );
            $dev_msg = sprintf(
                esc_html__('The registration ID for this request is: %s', 'event_espresso'),
                $registration->ID()
            );
            throw new EE_Error("{$msg}||{$msg} {$dev_msg}");
        }

        switch ($shortcode) {
            case '[FNAME]':
                return $attendee->fname();

            case '[LNAME]':
                return $attendee->lname();

            case '[ATTENDEE_EMAIL]':
                return $attendee->email();

            case '[EDIT_ATTENDEE_LINK]':
                return $registration->get_admin_edit_url();

            case '[REGISTRATION_CODE]':
                return $registration->reg_code();

            case '[REGISTRATION_ID]':
                return $registration->ID();

            case '[FRONTEND_EDIT_REG_LINK]':
                return $registration->edit_attendee_information_url();

            case '[PHONE_NUMBER]':
                return $attendee->phone();

            case '[ADDRESS]':
                return $attendee->address();

            case '[ADDRESS2]':
                return $attendee->address2();

            case '[CITY]':
                return $attendee->city();

            case '[ZIP_PC]':
                return $attendee->zip();

            case '[ADDRESS_STATE]':
                $state_obj = $attendee->state_obj();
                return $state_obj instanceof EE_State ? $state_obj->name() : '';

            case '[COUNTRY]':
                $country_obj = $attendee->country_obj();
                return $country_obj instanceof EE_Country ? $country_obj->name() : '';

            case '[REGISTRATION_STATUS_ID]':
                return $registration->status_ID();

            case '[REGISTRATION_STATUS_LABEL]':
                return $registration->pretty_status();

            case '[REGISTRATION_TOTAL_AMOUNT_PAID]':
                return $registration->pretty_paid();
        }

        return '';
    }
}
