<?php

namespace EventEspresso\payment_methods\Paypal_Express\forms;

use EE_Admin_File_Uploader_Input;
use EE_Yes_No_Input;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\payment_methods\forms\PayPalSettingsForm;
use InvalidArgumentException;

/**
 * Class PayPal Express SettingsForm
 * Has some custom validation that verifies the credentials work ok.
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          4.9.59.p
 */
class SettingsForm extends PayPalSettingsForm
{
    /**
     * SettingsForm constructor.
     *
     * @param array $options_array
     * @param string $help_tab_link
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     */
    public function __construct(array $options_array = array(), $help_tab_link = '')
    {
        $options_array = array_replace_recursive(
            array(
                'extra_meta_inputs' => array(
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
        parent::__construct($options_array, $help_tab_link);
    }
}
