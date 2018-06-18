<?php

namespace EventEspresso\core\domain\services\admin\privacy\forms;

use EE_Config;
use EE_Form_Section_HTML;
use EE_Form_Section_Proper;
use EE_Full_HTML_Validation_Strategy;
use EE_Registration_Config;
use EE_Registry;
use EE_Select_Reveal_Input;
use EE_Text_Area_Input;
use EEH_HTML;
use EventEspresso\core\exceptions\InvalidFormSubmissionException;
use EventEspresso\core\libraries\form_sections\form_handlers\FormHandler;
use EventEspresso\core\services\loaders\LoaderFactory;

/**
 * Class PrivacySettingsFormHandler
 *
 * Class for displaying and processing the privacy settings form
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          4.9.63.p
 *
 */
class PrivacySettingsFormHandler extends FormHandler
{

    /**
     * @var EE_Config
     */
    protected $config;


    /**
     * PrivacySettingsFormHandler constructor.
     *
     * @param EE_Registry $registry
     * @param EE_Config   $config
     */
    public function __construct(EE_Registry $registry, EE_Config $config)
    {
        $this->config = $config;
        parent::__construct(
            esc_html__('Privacy Settings', 'event_espresso'),
            esc_html__('Privacy Settings', 'event_espresso'),
            'privacy-settings',
            '',
            FormHandler::DO_NOT_SETUP_FORM,
            $registry
        );
    }


    /**
     * creates and returns the actual form
     *
     * @return EE_Form_Section_Proper
     */
    public function generate()
    {
        // this form makes use of the session for passing around invalid form submission data, so make sure its enabled
        add_filter('FHEE__EE_Session___save_session_to_db__abort_session_save', '__return_false');
        /**
         * @var $reg_config EE_Registration_Config
         */
        $reg_config = $this->config->registration;
        return new EE_Form_Section_Proper(
            array(
                'name'        => 'privacy_consent_settings',
                'subsections' => array(
                    'privacy_consent_form_hdr' => new EE_Form_Section_HTML(
                        EEH_HTML::h2(esc_html__('Privacy Policy Consent Settings', 'event_espresso'))
                    ),
                    'enable'                   => new EE_Select_Reveal_Input(
                        array(
                            'enable-privacy-consent' => esc_html__('Enabled', 'event_espresso'),
                            'disable'                => esc_html__('Disabled', 'event_espresso'),
                        ),
                        array(
                            'default'         => $reg_config->isConsentCheckboxEnabled()
                                ? 'enable-privacy-consent'
                                : 'disable',
                            'html_label_text' => esc_html__('Privacy Consent Checkbox', 'event_espresso'),
                            'html_help_text'  => esc_html__(
                                'When enabled, a checkbox appears in the registration form requiring users to consent to your site\'s privacy policy.',
                                'event_espresso'
                            ),
                        )
                    ),
                    'enable-privacy-consent'   => new EE_Form_Section_Proper(
                        array(
                            'subsections' => array(
                                'consent_assertion' => new EE_Text_Area_Input(
                                    array(
                                        'default'               => $reg_config->getConsentCheckboxLabelText(),
                                        'html_label_text'       => esc_html__('Consent Text', 'event_espresso'),
                                        'html_help_text'        => esc_html__(
                                            'Text describing what the registrant is consenting to by submitting their personal data in the registration form. To reset to default value, remove all this text and save.',
                                            'event_espresso'
                                        ),
                                        'validation_strategies' => array(new EE_Full_HTML_Validation_Strategy()),
                                    )
                                ),
                            ),
                        )
                    ),
                ),
            )
        );
    }


    /**
     * After validating the form data, update the registration config
     *
     * @param array $submitted_form_data
     * @return bool
     */
    public function process($submitted_form_data = array())
    {
        try {
            $valid_data = parent::process($submitted_form_data);
            $reg_config = $this->config->registration;
            $reg_config->setConsentCheckboxEnabled($valid_data['enable'] === 'enable-privacy-consent');
            $reg_config->setConsentCheckboxLabelText(
                $valid_data['enable-privacy-consent']['consent_assertion']
            );
            return $this->config->update_espresso_config(false, false);
        } catch (InvalidFormSubmissionException $e) {
            // the form was invalid, it should be re-displayed with errors
            return false;
        }
    }
}
// End of file PrivacySettingsFormHandler.php
// Location: EventEspresso\core\domain\services\admin\privacy\forms/PrivacySettingsFormHandler.php
