<?php

namespace EventEspresso\caffeinated\payment_methods\Paypal_Smart_Buttons\forms;

use EE_Error;
use EE_Hidden_Input;
use EE_Payment_Method_Form;
use EE_Select_Input;
use EE_Text_Input;
use EEG_Paypal_Smart_Buttons;
use WP_Error;

/**
 * Class PayPalSmartButtonSettingsForm
 *
 * Form for the PayPal Smart Buttons payment method. One special bit of functionality: it validates
 * the user's client ID and secret, and if they work, stores the authorization token which will be used
 * for REST API requests.
 * See https://developer.paypal.com/docs/api/overview/#get-an-access-token for how we do this.
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          $VID:$
 *
 */
class PayPalSmartButtonSettingsForm extends EE_Payment_Method_Form
{

    public function __construct($help_tab_link, array $options_array = array())
    {
        $options_array = array_merge_recursive(
            $options_array,
            array(
                'extra_meta_inputs' => array(
                    'client_id'    => new EE_Text_Input(
                        array(
                            'html_label_text' => sprintf(
                                _x(
                                    'PayPal REST API App Client ID %s',
                                    'PayPal REST API App Client ID (help link)',
                                    'event_espresso'
                                ),
                                $help_tab_link
                            ),
                            'required'        => true,
                        )
                    ),
                    'secret'       => new EE_Text_Input(
                        array(
                            'html_label_text' => sprintf(
                                _x(
                                    'PayPal REST API App Secret %s',
                                    'PayPal REST API App Secret (help link)',
                                    'event_espresso'
                                ),
                                $help_tab_link
                            ),
                            'required'        => true,
                        )
                    ),
                    'button_color' => new EE_Select_Input(
                        array(
                            ''         => esc_html__('Default', 'event_espresso'),
                            'gold'     => esc_html__('Gold', 'event_espresso'),
                            'blue'     => esc_html__('Blue', 'event_espresso'),
                            'darkblue' => esc_html__('Dark Blue', 'event_espresso'),
                            'silver'   => esc_html__('Silver', 'event_espresso'),
                            'black'    => esc_html__('Black', 'event_espresso'),
                        ),
                        array(
                            'html_label_text' => esc_html__('Button Color', 'event_espresso'),
                            'default'         => '',
                        )
                    ),
                    'button_shape' => new EE_Select_Input(
                        array(
                            'pill' => esc_html__('Pill (Recommended)', 'event_espresso'),
                            'rect' => esc_html__('Rectangular', 'event_espresso'),
                        ),
                        array(
                            'html_label_text' => esc_html__('Button Shape', 'event_espresso'),
                            'default'         => 'pill',
                        )
                    ),
                    'button_size'  => new EE_Select_Input(
                        array(
                            'medium'     => esc_html__('Medium (250px by 35px)', 'event_espresso'),
                            'large'      => esc_html__('Large (350px by 40px)', 'event_espresso'),
                            'responsive' => esc_html__('Responsive (fills the page)', 'event_espresso'),
                        ),
                        array(
                            'html_label_text' => esc_html__('Button Size', 'event_espresso'),
                            'default'         => 'medium',
                        )
                    ),
                    // store the access token like other extra meta inputs
                    // except hide it, because we don't ask users for it directly. We will retrieve it from
                    // PayPal upon form submission
                    'access_token' => new EE_Hidden_Input()
                ),
                'exclude'           => array(
                    'PMD_button_url',
                ),
            )
        );
        parent::__construct($options_array);
    }


    /**
     * @return bool|void
     * @throws \EE_Error
     */
    public function _validate()
    {
        parent::_validate();
        //also, let's check the credentials are valid.
        $valid_data = $this->valid_data();
        if (isset($valid_data['debug_mode'], $valid_data['client_id'], $valid_data['secret'])) {
            try {
                $access_token = EEG_Paypal_Smart_Buttons::getAccessToken(
                    $valid_data['debug_mode'],
                    $valid_data['client_id'],
                    $valid_data['secret']
                );
                $this->populate_defaults(
                    array(
                        'access_token' => $access_token
                    )
                );
            } catch (EE_Error $e) {
                $this->add_validation_error(
                    esc_html(
                        sprintf(
                            _x(
                                'Error validating PayPal credentials. %1$s',
                                'Error validating PayPal credentials. Error description',
                                'event_espresso'
                            ),
                            $e->getMessage()
                        )
                    )
                );
            }
        }
    }
}
// End of file PayPalSmartButtonSettingsForm.php
// Location: EventEspresso\caffeinated\payment_methods\Paypal_Smart_Buttons\forms/PayPalSmartButtonSettingsForm.php
