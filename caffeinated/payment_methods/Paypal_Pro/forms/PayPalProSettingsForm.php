<?php
namespace EventEspresso\caffeinated\payment_methods\PayPal_Pro\forms;

use EE_Checkbox_Multi_Input;
use EE_PMT_Paypal_Pro;
use EventEspresso\core\services\payment_methods\forms\PayPalSettingsForm;

/**
 * Class PayPalProSettingsForm
 *
 * Settings form for PayPal Pro. It extends PayPalSettingsForm in order to validate API credentials upon save.
 *
 * @package     Event Espresso
 * @author         Mike Nelson
 * @since         4.9.76.p
 *
 */
class PayPalProSettingsForm extends PayPalSettingsForm
{
    /**
     * SettingsForm constructor.
     *
     * @param array $options_array
     * @param string $help_tab_link
     */
    public function __construct(array $options_array = array(), $help_tab_link = '')
    {
        $options_array = array_replace_recursive(
            array(
                'extra_meta_inputs' => array(
                    'credit_card_types' => new EE_Checkbox_Multi_Input(
                        EE_PMT_Paypal_Pro::card_types_supported(),
                        array(
                            'html_label_text' => __('Card Types Supported', 'event_espresso'),
                            'required' => true
                        )
                    ),
                )
            ),
            $options_array
        );
        parent::__construct($options_array, $help_tab_link);
    }
}
// End of file SettingsForm.php
// Location: EventEspresso/caffeinated/payment_methods/PayPal_Pro/forms/PayPalProSettingsForm.php
