<?php

/**
 *
 * EE_PMT_Onsite
 *
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 *
 */
class EE_PMT_Mock_Offsite extends EE_PMT_Base
{

    const help_tab_link = 'ee_mock_onsite_help';


    /**
     *
     * @param EE_Payment_Method|null $pm_instance
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function __construct(EE_Payment_Method $pm_instance = null)
    {
        require_once($this->file_folder() . 'EEG_Mock_Offsite.gateway.php');
        $this->_gateway = new EEG_Mock_Offsite();
        $this->_pretty_name = esc_html__("Mock Offsite", 'event_espresso');
        parent::__construct($pm_instance);
    }


    /**
     * Creates the billing form for this payment method type
     *
     * @param EE_Transaction|null $transaction
     * @return NULL
     */
    public function generate_new_billing_form(EE_Transaction $transaction = null)
    {
        return null;
    }


    /**
     * Gets the form for all the settings related to this payment method type
     *
     * @return EE_Payment_Method_Form
     */
    public function generate_new_settings_form()
    {
        return new EE_Payment_Method_Form(
            [
                'extra_meta_inputs' => [
                    'login_id' => new EE_Text_Input(
                        [
                            'html_label_text' => sprintf(
                                esc_html__("Login ID %s", "event_espresso"),
                                EEH_Template::get_help_tab_link(self::help_tab_link)
                            ),
                        ]
                    ),
                ],
            ]
        );
    }
}
