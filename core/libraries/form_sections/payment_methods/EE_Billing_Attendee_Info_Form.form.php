<?php

/**
 *
 * EE_Billing_Attendee_Info_Form
 * Extends EE_Billing_Info_Form to have methods pertaining specifically to the attendee
 * who's paying.
 *
 * @package             Event Espresso
 * @subpackage
 * @author              Mike Nelson
 *
 */
class EE_Billing_Attendee_Info_Form extends EE_Billing_Info_Form
{
    /**
     *
     * @param EE_Payment_Method $payment_method
     * @param array             $options_array @see EE_Form_Section_Proper::__construct()
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function __construct(EE_Payment_Method $payment_method, $options_array = [])
    {
        $options_array['subsections'] = array_merge(
            [
                'first_name' => new EE_Text_Input([
                        'required'        => true,
                        'html_class'      => 'ee-billing-qstn ee-billing-qstn-fname',
                        'html_label_text' => esc_html__('First Name', 'event_espresso'),
                    ]),
                'last_name'  => new EE_Text_Input([
                        'required'        => true,
                        'html_class'      => 'ee-billing-qstn ee-billing-qstn-lname',
                        'html_label_text' => esc_html__('Last Name', 'event_espresso'),
                    ]),
                'email'      => new EE_Email_Input([
                        'required'        => true,
                        'html_class'      => 'ee-billing-qstn ee-billing-qstn-email',
                        'html_label_text' => esc_html__('Email', 'event_espresso'),
                    ]),
                'address'    => new EE_Text_Input([
                        'html_label_text' => esc_html__('Address', 'event_espresso'),
                        'required'        => true,
                        'html_class'      => 'ee-billing-qstn ee-billing-qstn-address',
                    ]),
                'address2'   => new EE_Text_Input([
                        'html_label_text' => esc_html__('Address 2', 'event_espresso'),
                        'html_class'      => 'ee-billing-qstn ee-billing-qstn-address2',
                    ]),
                'city'       => new EE_Text_Input([
                        'required'        => true,
                        'html_class'      => 'ee-billing-qstn ee-billing-qstn-city',
                        'html_label_text' => esc_html__('City', 'event_espresso'),
                    ]),
                'state'      => apply_filters(
                    'FHEE__EE_Billing_Attendee_Info_Form__state_field',
                    new EE_State_Select_Input(null, [
                            'required'        => true,
                            'html_class'      => 'ee-billing-qstn ee-billing-qstn-state',
                            'html_label_text' => esc_html__('State', 'event_espresso'),
                        ])
                ),
                'country'    => apply_filters(
                    'FHEE__EE_Billing_Attendee_Info_Form__country_field',
                    new EE_Country_Select_Input(null, [
                            'required'        => true,
                            'html_class'      => 'ee-billing-qstn ee-billing-qstn-country',
                            'html_label_text' => esc_html__('Country', 'event_espresso'),
                        ])
                ),
                'zip'        => new EE_Text_Input([
                        'required'        => true,
                        'html_class'      => 'ee-billing-qstn ee-billing-qstn-zip',
                        'html_label_text' => esc_html__('Zip', 'event_espresso'),
                    ]),
                'phone'      => new EE_Text_Input([
                        'html_class'      => 'ee-billing-qstn ee-billing-qstn-phone',
                        'html_label_text' => esc_html__('Phone', 'event_espresso'),
                    ]),
            ],
            $options_array['subsections'] ?? []
        );

        parent::__construct($payment_method, $options_array);
    }


    /**
     * Sets the defaults for the billing form according to the attendee's details
     *
     * @param EE_Attendee $attendee
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function populate_from_attendee(EE_Attendee $attendee)
    {
        /** @var $attendee EE_Attendee */
        $attendee = EEM_Attendee::instance()->ensure_is_obj($attendee);
        $this->populate_defaults(
            apply_filters(
                'FHEE__EE_Billing_Attendee_Info_Form__populate_from_attendee',
                [
                    'first_name' => $attendee->fname(),
                    'last_name'  => $attendee->lname(),
                    'email'      => $attendee->email(),
                    'address'    => $attendee->address(),
                    'address2'   => $attendee->address2(),
                    'city'       => $attendee->city(),
                    'state'      => $this->getAttendeeStateValueForForm($attendee),
                    'country'    => $attendee->country_ID(),
                    'zip'        => $attendee->zip(),
                    'phone'      => $attendee->phone(),
                ],
                $attendee,
                $this
            )
        );
    }


    /**
     * Gets the default value to use for the billing form's state value.
     *
     * @param EE_Attendee $attendee
     * @return string
     * @throws EE_Error
     * @since 4.10.0.p
     */
    protected function getAttendeeStateValueForForm(EE_Attendee $attendee): string
    {
        // If the state input was removed, just return a blank string.
        if (! $this->has_subsection('state')) {
            return '';
        }
        $state_input = $this->get_input('state', false);
        if ($state_input instanceof EE_State_Select_Input) {
            $state_field_to_use = $state_input->valueFieldName();
        } else {
            $state_field_to_use = 'STA_ID';
        }
        switch ($state_field_to_use) {
            case 'STA_abbrev':
                $state_value = $attendee->state_abbrev();
                break;
            case 'STA_name':
                $state_value = $attendee->state_name();
                break;
            default:
                $state_value = $attendee->state_ID();
        }
        return $state_value;
    }


    /**
     * copy_billing_form_data_to_attendee
     * copies info from the billing form to the attendee's details
     *
     * @param EE_Attendee $attendee the attendee object to copy details to
     * @return EE_Attendee
     * @throws EE_Error
     */
    public function copy_billing_form_data_to_attendee(EE_Attendee $attendee): EE_Attendee
    {
        // grab billing form data
        $data = $this->valid_data();

        $fields_and_setters = [
            'first_name' => 'set_fname',
            'last_name'  => 'set_lname',
            'email'      => 'set_email',
            'address'    => 'set_address',
            'address2'   => 'set_address2',
            'city'       => 'set_city',
            'state'      => 'set_state',
            'country'    => 'set_country',
            'zip'        => 'set_zip',
            'phone'      => 'set_phone',
        ];
        foreach ($fields_and_setters as $field => $setter) {
            if (! empty($data[ $field ]) && method_exists($attendee, $setter)) {
                $attendee->{$setter}($data[ $field ]);
            }
        }
        return $attendee;
    }


    /**
     * create_attendee_from_billing_form_data
     * uses info from the billing form to create a new attendee
     *
     * @return EE_Attendee
     * @throws EE_Error
     */
    public function create_attendee_from_billing_form_data()
    {
        // grab billing form data
        $data = $this->valid_data();
        return EE_Attendee::new_instance([
            'ATT_fname'    => ! empty($data['first_name']) ? $data['first_name'] : '',
            'ATT_lname'    => ! empty($data['last_name']) ? $data['last_name'] : '',
            'ATT_email'    => ! empty($data['email']) ? $data['email'] : '',
            'ATT_address'  => ! empty($data['address']) ? $data['address'] : '',
            'ATT_address2' => ! empty($data['address2']) ? $data['address2'] : '',
            'ATT_city'     => ! empty($data['city']) ? $data['city'] : '',
            'STA_ID'       => ! empty($data['state']) ? $data['state'] : '',
            'CNT_ISO'      => ! empty($data['country']) ? $data['country'] : '',
            'ATT_zip'      => ! empty($data['zip']) ? $data['zip'] : '',
            'ATT_phone'    => ! empty($data['phone']) ? $data['phone'] : '',
        ]);
    }
}

// End of file EE_Billing_Attendee_Info_Form.form.php
