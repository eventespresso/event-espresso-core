<?php

/**
 * EE_Primary_Registration_Details_Shortcodes
 *
 * this is a child class for the EE_Shortcodes library.  The EE_Primary_Registration_Details_Shortcodes lists all
 * shortcodes related to primary registration specific info. This only parses for Primary Registrants.
 *
 * NOTE: if a method doesn't have any phpdoc commenting the details can be found in the comments in EE_Shortcodes
 * parent class.
 *
 * @package        Event Espresso
 * @subpackage     libraries/shortcodes/EE_Primary_Registration_Details_Shortcodes.lib.php
 * @author         Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Primary_Registration_Details_Shortcodes extends EE_Shortcodes
{
    protected function _init_props()
    {
        $this->label = esc_html__('Primary_Registration Details Shortcodes', 'event_espresso');
        $this->description = esc_html__('All shortcodes specific primary registrant data', 'event_espresso');
        $this->_shortcodes = array(
            '[PRIMARY_REGISTRANT_FNAME]'                  => esc_html__(
                'Parses to the first name of the primary registration for the transaction.',
                'event_espresso'
            ),
            '[PRIMARY_REGISTRANT_LNAME]'                  => esc_html__(
                'Parses to the last name of the primary registration for the transaction.',
                'event_espresso'
            ),
            '[PRIMARY_REGISTRANT_EMAIL]'                  => esc_html__(
                'Parses to the email address of the primary registration for the transaction.',
                'event_espresso'
            ),
            '[PRIMARY_REGISTRANT_REGISTRATION_ID]'        => esc_html__(
                'Parses to the registration ID of the primary registrant for the transaction.',
                'event_espresso'
            ),
            '[PRIMARY_REGISTRANT_REGISTRATION_CODE]'      => esc_html__(
                'Parses to the registration code of the primary registrant for the transaction.',
                'event_espresso'
            ),
            '[PRIMARY_REGISTRANT_PHONE_NUMBER]'           => esc_html__(
                'The Phone Number for the primary registrant for the transaction.',
                'event_espresso'
            ),
            '[PRIMARY_REGISTRANT_ADDRESS]'                => esc_html__(
                'The Address for the primary registrant for the transaction.',
                'event_espresso'
            ),
            '[PRIMARY_REGISTRANT_ADDRESS2]'               => esc_html__(
                'Whatever was in the address 2 field for the primary registrant for the transaction.',
                'event_espresso'
            ),
            '[PRIMARY_REGISTRANT_CITY]'                   => esc_html__(
                'The city for the primary registrant for the transaction.',
                'event_espresso'
            ),
            '[PRIMARY_REGISTRANT_ZIP_PC]'                 => esc_html__(
                'The ZIP (or Postal) Code for the primary registrant for the transaction.',
                'event_espresso'
            ),
            '[PRIMARY_REGISTRANT_ADDRESS_STATE]'          => esc_html__(
                'The state/province for the primary registrant for the transaction.',
                'event_espresso'
            ),
            '[PRIMARY_REGISTRANT_COUNTRY]'                => esc_html__(
                'The country for the primary registrant for the transaction.',
                'event_espresso'
            ),
            '[PRIMARY_REGISTRANT_REGISTRATION_DATE]'      => esc_html__(
                'The date the registration occured for the primary registration.',
                'event_espresso'
            ),
            '[PRIMARY_REGISTRANT_FRONTEND_EDIT_REG_LINK]' => esc_html__(
                'Generates a link for the given registration to edit this registration details on the frontend.',
                'event_espresso'
            ),
            '[PRIMARY_REGISTRANT_ANSWER_*]'               => esc_html__(
                'This is a special dynamic shortcode.  After the "*", add the exact text of an existing question, and if there is an answer for that question for this primary registrant, then it will be output in place of this shortcode.',
                'event_espresso'
            ),
        );
    }


    protected function _parser($shortcode)
    {
        // make sure we end up with a copy of the EE_Messages_Addressee object
        $primary_registration = $this->_data instanceof EE_Messages_Addressee ? $this->_data : null;
        $primary_registration = ! $primary_registration instanceof EE_Messages_Addressee && is_array(
            $this->_data
        ) && isset($this->_data['data']) && $this->_data['data'] instanceof EE_Messages_Addressee ? $this->_data['data']
            : $primary_registration;
        $primary_registration = ! $primary_registration instanceof EE_Messages_Addressee && ! empty($this->_extra_data['data']) && $this->_extra_data['data'] instanceof EE_Messages_Addressee
            ? $this->_extra_data['data'] : $primary_registration;

        if (! $primary_registration instanceof EE_Messages_Addressee) {
            return '';
        }

        $attendee = $primary_registration->primary_att_obj;
        $primary_reg = $primary_registration->primary_reg_obj;

        if (! $attendee instanceof EE_Attendee || ! $primary_reg instanceof EE_Registration) {
            return '';
        }

        switch ($shortcode) {
            case '[PRIMARY_REGISTRANT_FNAME]':
                return $attendee->fname();
                break;

            case '[PRIMARY_REGISTRANT_LNAME]':
                return $attendee->lname();
                break;

            case '[PRIMARY_REGISTRANT_EMAIL]':
                return $attendee->email();
                break;

            case '[PRIMARY_REGISTRANT_REGISTRATION_ID]':
                return $primary_reg->ID();
                break;

            case '[PRIMARY_REGISTRANT_REGISTRATION_CODE]':
                return $primary_reg->reg_code();
                break;

            case '[PRIMARY_REGISTRANT_PHONE_NUMBER]':
                return $attendee->phone();
                break;

            case '[PRIMARY_REGISTRANT_ADDRESS]':
                return $attendee->address();
                break;

            case '[PRIMARY_REGISTRANT_ADDRESS2]':
                return $attendee->address2();
                break;

            case '[PRIMARY_REGISTRANT_CITY]':
                return $attendee->city();
                break;

            case '[PRIMARY_REGISTRANT_ZIP_PC]':
                return $attendee->zip();
                break;

            case '[PRIMARY_REGISTRANT_ADDRESS_STATE]':
                $state_obj = $attendee->state_obj();
                return $state_obj instanceof EE_State ? $state_obj->name() : '';
                break;

            case '[PRIMARY_REGISTRANT_COUNTRY]':
                $country_obj = $attendee->country_obj();
                return $country_obj instanceof EE_Country ? $country_obj->name() : '';
                break;

            case '[PRIMARY_REGISTRANT_REGISTRATION_DATE]':
                if (! $primary_registration->primary_reg_obj instanceof EE_Registration) {
                    return '';
                }
                return $primary_registration->primary_reg_obj->get_i18n_datetime('REG_date', get_option('date_format'));
                break;

            case '[PRIMARY_REGISTRANT_FRONTEND_EDIT_REG_LINK]':
                return $primary_reg->edit_attendee_information_url();
                break;
        }

        if (strpos($shortcode, '[PRIMARY_REGISTRANT_ANSWER_*') !== false) {
            $shortcode = str_replace('[PRIMARY_REGISTRANT_ANSWER_*', '', $shortcode);
            $shortcode = trim(str_replace(']', '', $shortcode));


            // now let's figure out what question has this text
            if (empty($primary_registration->questions)) {
                return '';
            }

            foreach ($primary_registration->questions as $ansid => $question) {
                if (
                    $question instanceof EE_Question
                    && trim($question->get('QST_display_text')) === trim($shortcode)
                    && isset($primary_registration->registrations[ $primary_reg->ID() ]['ans_objs'][ $ansid ])
                ) {
                    $primary_reg_ansid = $primary_registration->registrations[ $primary_reg->ID() ]['ans_objs'][ $ansid ];

                    // what we show for the answer depends on the question type!
                    switch ($question->get('QST_type')) {
                        case EEM_Question::QST_type_state:
                            $state = EEM_State::instance()->get_one_by_ID($primary_reg_ansid->get('ANS_value'));
                            $answer = $state instanceof EE_State ? $state->name() : '';
                            break;

                        case EEM_Question::QST_type_country:
                            $country = EEM_Country::instance()->get_one_by_ID($primary_reg_ansid->get('ANS_value'));
                            $answer = $country instanceof EE_Country ? $country->name() : '';
                            break;

                        default:
                            $answer = $primary_reg_ansid->get_pretty('ANS_value', 'no_wpautop');
                            break;
                    }

                    return $answer;
                    break;
                }
            }
        }

        return '';
    }
}
