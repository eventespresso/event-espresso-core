<?php

namespace EventEspresso\payment_methods\Paypal_Express\forms;

use EE_Admin_File_Uploader_Input;
use EE_Error;
use EE_Payment_Method_Form;
use EE_Text_Input;
use EE_Yes_No_Input;
use EventEspresso\core\exceptions\EntityNotFoundException;

/**
 * Class PayPal Express SettingsForm
 * Has some custom validation that verifies the credentials work ok.
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          4.9.59.p
 */
class SettingsForm extends EE_Payment_Method_Form
{

    /**
     * @var string of HTML being the help tab link
     */
    protected $helpTabLink;

    /**
     * SettingsForm constructor.
     *
     * @param array $options_array
     * @param string     $help_tab_link
     */
    public function __construct(array $options_array = array(), $help_tab_link)
    {
        $this->helpTabLink = $help_tab_link;
        $options_array = array_replace_recursive(
            array(
                'extra_meta_inputs' => array(
                    'api_username' => new EE_Text_Input(
                        array(
                            'html_label_text' => sprintf(
                                esc_html__('API Username %s', 'event_espresso'),
                                $help_tab_link
                            ),
                            'required'        => true,
                        )
                    ),
                    'api_password' => new EE_Text_Input(
                        array(
                            'html_label_text' => sprintf(
                                esc_html__('API Password %s', 'event_espresso'),
                                $help_tab_link
                            ),
                            'required'        => true,
                        )
                    ),
                    'api_signature' => new EE_Text_Input(
                        array(
                            'html_label_text' => sprintf(
                                esc_html__('API Signature %s', 'event_espresso'),
                                $help_tab_link
                            ),
                            'required'        => true,
                        )
                    ),
                    'request_shipping_addr' => new EE_Yes_No_Input(
                        array(
                            'html_label_text' => sprintf(
                                esc_html__('Request Shipping Address %s', 'event_espresso'),
                                $help_tab_link
                            ),
                            'html_help_text'  => esc_html__(
                            // @codingStandardsIgnoreStart
                                'If set to "Yes", then a shipping address will be requested on the PayPal checkout page.',
                                // @codingStandardsIgnoreEnd
                                'event_espresso'
                            ),
                            'required'        => true,
                            'default'         => false,
                        )
                    ),
                    'image_url' => new EE_Admin_File_Uploader_Input(
                        array(
                            'html_label_text' => sprintf(
                                esc_html__('Image URL %s', 'event_espresso'),
                                $help_tab_link
                            ),
                            'html_help_text'  => esc_html__(
                                'Used for your business/personal logo on the PayPal page',
                                'event_espresso'
                            ),
                            'required'        => false,
                        )
                    ),
                )
            ),
            $options_array
        );
        parent::__construct($options_array);
    }



    /**
     * Does the normal validation, but also verifies the PayPal API credentials work.
     * If they don't, sets a validation error on the entire form, and adds validation errors (which are really more tips)
     * on each of the inputs that could be the cause of the problem.
     * @throws EntityNotFoundException
     */
    public function _validate()
    {
        parent::_validate();
        if (! $this->_payment_method_type instanceof \EE_PMT_Paypal_Express) {
            throw new EntityNotFoundException('EE_PMT_Paypal_Express', '$this->_payment_method_type');
        }
        if (! $this->_payment_method_type->get_gateway() instanceof \EEG_Paypal_Express) {
            throw new EntityNotFoundException('EEG_Paypal_Express', '$this->_payment_method_type->get_gateway()');
        }
        $credentials_message = $this->checkForCredentialsErrors();
        if ($credentials_message !== '') {
            $this->add_validation_error($credentials_message);
            $this->get_input('PMD_debug_mode')->add_validation_error(
                esc_html__('If you are using PayPal Sandbox (test) credentials, Debug mode should be set to "Yes". Otherwise, if you are using live PayPal credentials, set this to "No".', 'event_espresso')
            );
            $this->get_input('api_username')->add_validation_error(
                sprintf(
                    esc_html__('Are you sure this is your API username, not your login username?%1$s', 'event_espresso'),
                    $this->helpTabLink()
                )
            );
            $this->get_input('api_password')->add_validation_error(
                sprintf(
                    esc_html__('Are you sure this is your API password, not your login password.%1$s', 'event_espresso'),
                    $this->helpTabLink()
                )
            );
            $this->get_input('api_signature')->add_validation_error(
                sprintf(
                    esc_html__('Please verify your API signature is correct.%1$s', 'event_espresso'),
                    $this->helpTabLink()
                )
            );
        }
    }



    /**
     * Gets the HTML to show the link to the help tab
     * @return string
     */
    protected function helpTabLink()
    {
        return $this->helpTabLink;
    }
    /**
     * Tests the the PayPal API credentials work ok
     * @return string of an error using the credentials, otherwise, if the credentials work, returns a blank string
     */
    protected function checkForCredentialsErrors()
    {
        $request_params = array(
            'METHOD'    => 'GetBalance',
            'VERSION'   => '204.0',
            'USER'      => urlencode($this->get_input_value('api_username')),
            'PWD'       => urlencode($this->get_input_value('api_password')),
            'SIGNATURE' => urlencode($this->get_input_value('api_signature')),
        );
        $gateway_url = $this->get_input_value('PMD_debug_mode')
            ? 'https://api-3t.sandbox.paypal.com/nvp'
            : 'https://api-3t.paypal.com/nvp';
        // Request Customer Details.
        $response = wp_remote_post(
            $gateway_url,
            array(
                'method'      => 'POST',
                'timeout'     => 45,
                'httpversion' => '1.1',
                'cookies'     => array(),
                'headers'     => array(),
                'body'        => http_build_query($request_params, '', '&'),
            )
        );
        if (is_wp_error($response) || empty($response['body'])) {
            // If we got here then there was an error in this request.
            // maybe is turned off. We don't know the credentials are invalid
            EE_Error::add_error(
                sprintf(
                    esc_html__('Your PayPal credentials could not be verified. There was an error communicating with PayPal, it was %1$s', 'event_espresso'),
                    $response->get_error_message()
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        }
        $response_args = array();
        parse_str(urldecode($response['body']), $response_args);

        if (empty($response_args['ACK'])) {
            EE_Error::add_error(
                esc_html__('Your PayPal credentials could not be verified. Part of their response was missing.', 'event_espresso'),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        }
        if (in_array(
            $response_args['ACK'],
            array(
                'Success',
                'SuccessWithWarning'
            ),
            true
        )
        ) {
            return '';
        } else {
            return sprintf(
                esc_html__('Your PayPal API credentials appear to be invalid. PayPal said "%1$s (%2$s)". Please see tips below.', 'event_espresso'),
                isset($response_args['L_LONGMESSAGE0']) ? $response_args['L_LONGMESSAGE0'] : esc_html__('No error message received from PayPal', 'event_espresso'),
                isset($response_args['L_ERRORCODE0']) ? $response_args['L_ERRORCODE0'] : 0
            );
        }
    }
}
