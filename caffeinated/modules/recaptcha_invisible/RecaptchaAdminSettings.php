<?php

namespace EventEspresso\caffeinated\modules\recaptcha_invisible;

use EE_Admin_Two_Column_Layout;
use EE_Checkbox_Multi_Input;
use EE_Div_Per_Section_Layout;
use EE_Error;
use EE_Form_Section_HTML;
use EE_Form_Section_Proper;
use EE_Radio_Button_Input;
use EE_Registration_Config;
use EE_Select_Input;
use EE_Text_Input;
use EE_Yes_No_Input;
use EEH_HTML;
use EEH_Template;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;
use ReflectionException;

/**
 * Class RecaptchaAdminSettings
 * Generates and processes forms for administrating Event Espresso's Google's reCAPTCHA settings
 *
 * @package EventEspresso\caffeinated\modules\recaptcha_invisible
 * @author  Brent Christensen
 * @since   4.9.59.p
 */
class RecaptchaAdminSettings
{

    /**
     * @var EE_Registration_Config $config
     */
    private $config;


    /**
     * RecaptchaAdminSettings constructor.
     *
     * @param EE_Registration_Config $registration_config
     */
    public function __construct(EE_Registration_Config $registration_config)
    {
        $this->config = $registration_config;
    }


    /**
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function adminSettings()
    {
        echo $this->settingsForm()->get_html_and_js();
    }


    /**
     * @return EE_Form_Section_Proper
     * @throws EE_Error
     */
    protected function settingsForm()
    {
        return new EE_Form_Section_Proper(
            array(
                'name'            => 'recaptcha_settings_form',
                'html_id'         => 'recaptcha_settings_form',
                'layout_strategy' => new EE_Div_Per_Section_Layout(),
                'subsections'     => apply_filters(
                    'FHEE__EED_Recaptcha___recaptcha_settings_form__form_subsections',
                    array(
                        'main_settings_hdr'       => new EE_Form_Section_HTML(
                            EEH_HTML::h2(
                                esc_html__('reCAPTCHA Anti-spam Settings', 'event_espresso')
                                . EEH_Template::get_help_tab_link('recaptcha_info')
                            )
                        ),
                        'main_settings'           => $this->mainSettings(),
                        'appearance_settings_hdr' => new EE_Form_Section_HTML(
                            EEH_HTML::h2(esc_html__('reCAPTCHA Appearance', 'event_espresso'))
                        ),
                        'appearance_settings'     => $this->appearanceSettings(),
                        'required_fields_note'    => new EE_Form_Section_HTML(
                            EEH_HTML::p(
                                esc_html__('All fields marked with a * are required fields', 'event_espresso'),
                                '',
                                'grey-text'
                            )
                        ),
                    )
                ),
            )
        );
    }


    /**
     * @return EE_Form_Section_Proper
     * @throws EE_Error
     */
    protected function mainSettings()
    {
        return new EE_Form_Section_Proper(
            array(
                'name'            => 'recaptcha_settings_tbl',
                'html_id'         => 'recaptcha_settings_tbl',
                'html_class'      => 'form-table',
                'layout_strategy' => new EE_Admin_Two_Column_Layout(),
                'subsections'     => apply_filters(
                    'FHEE__EED_Recaptcha___recaptcha_main_settings__form_subsections',
                    array(
                        'use_captcha'          => new EE_Yes_No_Input(
                            array(
                                'html_label_text'         => esc_html__('Use reCAPTCHA', 'event_espresso'),
                                'html_help_text'          => sprintf(
                                    esc_html__(
                                        'reCAPTCHA is a free service that  protects your website from spam and abuse. It employs advanced risk analysis technology to separate humans from abusive actors. Sign up %1$shere%2$s to receive your Public and Private keys.',
                                        'event_espresso'
                                    ),
                                    '<a href="https://www.google.com/recaptcha/intro/index.html">',
                                    '</a>'
                                ),
                                'default'                 => $this->config->use_captcha !== null
                                    ? $this->config->use_captcha : false,
                                'display_html_label_text' => false,
                            )
                        ),
                        'recaptcha_publickey'  => new EE_Text_Input(
                            array(
                                'html_label_text' => esc_html__('Site Key', 'event_espresso'),
                                'html_help_text'  => esc_html__(
                                    'The site key is used to display the widget on your site.',
                                    'event_espresso'
                                ),
                                'default'         => $this->config->recaptcha_publickey !== null
                                    ? stripslashes($this->config->recaptcha_publickey) : '',
                            )
                        ),
                        'recaptcha_privatekey' => new EE_Text_Input(
                            array(
                                'html_label_text' => esc_html__('Secret Key', 'event_espresso'),
                                'html_help_text'  => esc_html__(
                                    'The secret key authorizes communication between your application backend and the reCAPTCHA server to verify the user\'s response. The secret key needs to be kept safe for security purposes.',
                                    'event_espresso'
                                ),
                                'default'         => $this->config->recaptcha_privatekey !== null
                                    ? stripslashes($this->config->recaptcha_privatekey)
                                    : '',
                            )
                        ),
                        'recaptcha_protected_forms' => new EE_Checkbox_Multi_Input(
                            array(
                                'ticket_selector'   => esc_html__('Ticket Selector', 'event_espresso'),
                                'registration_form' => esc_html__('Registration Form', 'event_espresso'),
                            ),
                            array(
                                'html_label_text'         => esc_html__(
                                    'Invisible reCAPTCHA Protection',
                                    'event_espresso'
                                ),
                                'html_help_text'          => esc_html__(
                                    'Select which Event Espresso forms you would like to enable Invisible reCAPTCHA on.',
                                    'event_espresso'
                                ),
                                'default'                 => is_array($this->config->recaptcha_protected_forms)
                                    ? $this->config->recaptcha_protected_forms
                                    : array(),
                                'display_html_label_text' => false,
                            )
                        ),
                    )
                ),
            )
        );
    }


    /**
     * @return EE_Form_Section_Proper
     * @throws EE_Error
     */
    protected function appearanceSettings()
    {
        return new EE_Form_Section_Proper(
            array(
                'name'            => 'recaptcha_appearance_settings_tbl',
                'html_id'         => 'recaptcha_appearance_settings_tbl',
                'html_class'      => 'form-table',
                'layout_strategy' => new EE_Admin_Two_Column_Layout(),
                'subsections'     => apply_filters(
                    'FHEE__EED_Recaptcha___recaptcha_appearance_settings__form_subsections',
                    array(
                        'recaptcha_theme'    => new EE_Radio_Button_Input(
                            array(
                                'invisible' => esc_html__('Invisible', 'event_espresso'),
                                'light'     => esc_html__('Light', 'event_espresso'),
                                'dark'      => esc_html__('Dark', 'event_espresso'),
                            ),
                            array(
                                'html_label_text'         => esc_html__('Theme', 'event_espresso'),
                                'html_help_text'          => esc_html__(
                                    'The color theme of the widget.',
                                    'event_espresso'
                                ),
                                'default'                 => $this->config->recaptcha_theme !== null
                                    ? $this->config->recaptcha_theme
                                    : 'invisible',
                                'display_html_label_text' => false,
                            )
                        ),
                        'recaptcha_badge'     => new EE_Radio_Button_Input(
                            array(
                                'bottomleft' => esc_html__('Bottom Left', 'event_espresso'),
                                'bottomright' => esc_html__('Bottom Right', 'event_espresso'),
                                'inline' => esc_html__('Inline', 'event_espresso'),
                            ),
                            array(
                                'html_label_text'         => esc_html__(
                                    'Invisible reCAPTCHA Badge Position',
                                    'event_espresso'
                                ),
                                'html_help_text'          => esc_html__(
                                    'If using Invisible reCAPTCHA, then this determines the position of the reCAPTCHA badge. "Bottom Left" and "Bottom Right" both will float at the bottom of the screen. "Inline" appears beside the submit button but allows you to control the CSS.',
                                    'event_espresso'
                                ),
                                'default'                 => $this->config->recaptcha_badge !== null
                                    ? $this->config->recaptcha_badge
                                    : 'bottomleft',
                                'display_html_label_text' => false,
                            )
                        ),
                        'recaptcha_type'     => new EE_Radio_Button_Input(
                            array(
                                'image' => esc_html__('Image', 'event_espresso'),
                                'audio' => esc_html__('Audio', 'event_espresso'),
                            ),
                            array(
                                'html_label_text'         => esc_html__('Type', 'event_espresso'),
                                'html_help_text'          => esc_html__(
                                    'The type of CAPTCHA to serve.',
                                    'event_espresso'
                                ),
                                'default'                 => $this->config->recaptcha_type !== null
                                    ? $this->config->recaptcha_type
                                    : 'image',
                                'display_html_label_text' => false,
                            )
                        ),
                        'recaptcha_language' => new EE_Select_Input(
                            array(
                                'ar'     => esc_html__('Arabic', 'event_espresso'),
                                'bg'     => esc_html__('Bulgarian', 'event_espresso'),
                                'ca'     => esc_html__('Catalan', 'event_espresso'),
                                'zh-CN'  => esc_html__('Chinese (Simplified)', 'event_espresso'),
                                'zh-TW'  => esc_html__('Chinese (Traditional)	', 'event_espresso'),
                                'hr'     => esc_html__('Croatian', 'event_espresso'),
                                'cs'     => esc_html__('Czech', 'event_espresso'),
                                'da'     => esc_html__('Danish', 'event_espresso'),
                                'nl'     => esc_html__('Dutch', 'event_espresso'),
                                'en-GB'  => esc_html__('English (UK)', 'event_espresso'),
                                'en'     => esc_html__('English (US)', 'event_espresso'),
                                'fil'    => esc_html__('Filipino', 'event_espresso'),
                                'fi'     => esc_html__('Finnish', 'event_espresso'),
                                'fr'     => esc_html__('French', 'event_espresso'),
                                'fr-CA'  => esc_html__('French (Canadian)', 'event_espresso'),
                                'de'     => esc_html__('German', 'event_espresso'),
                                'de-AT'  => esc_html__('German (Austria)', 'event_espresso'),
                                'de-CH'  => esc_html__('German (Switzerland)', 'event_espresso'),
                                'el'     => esc_html__('Greek', 'event_espresso'),
                                'iw'     => esc_html__('Hebrew', 'event_espresso'),
                                'hi'     => esc_html__('Hindi', 'event_espresso'),
                                'hu'     => esc_html__('Hungarian', 'event_espresso'),
                                'id'     => esc_html__('Indonesian', 'event_espresso'),
                                'it'     => esc_html__('Italian', 'event_espresso'),
                                'ja'     => esc_html__('Japanese', 'event_espresso'),
                                'ko'     => esc_html__('Korean', 'event_espresso'),
                                'lv'     => esc_html__('Latvian', 'event_espresso'),
                                'lt'     => esc_html__('Lithuanian', 'event_espresso'),
                                'no'     => esc_html__('Norwegian', 'event_espresso'),
                                'fa'     => esc_html__('Persian', 'event_espresso'),
                                'pl'     => esc_html__('Polish', 'event_espresso'),
                                'pt'     => esc_html__('Portuguese', 'event_espresso'),
                                'pt-BR'  => esc_html__('Portuguese (Brazil)', 'event_espresso'),
                                'pt-PT'  => esc_html__('Portuguese (Portugal)', 'event_espresso'),
                                'ro'     => esc_html__('Romanian', 'event_espresso'),
                                'ru'     => esc_html__('Russian', 'event_espresso'),
                                'sr'     => esc_html__('Serbian', 'event_espresso'),
                                'sk'     => esc_html__('Slovak', 'event_espresso'),
                                'sl'     => esc_html__('Slovenian', 'event_espresso'),
                                'es'     => esc_html__('Spanish', 'event_espresso'),
                                'es-419' => esc_html__('Spanish (Latin America)', 'event_espresso'),
                                'sv'     => esc_html__('Swedish', 'event_espresso'),
                                'th'     => esc_html__('Thai', 'event_espresso'),
                                'tr'     => esc_html__('Turkish', 'event_espresso'),
                                'uk'     => esc_html__('Ukrainian', 'event_espresso'),
                                'vi'     => esc_html__('Vietnamese', 'event_espresso'),
                            ),
                            array(
                                'html_label_text' => esc_html__('Language', 'event_espresso'),
                                'html_help_text'  => esc_html__(
                                    'Forces the widget to render in a specific language.',
                                    'event_espresso'
                                ),
                                'default'         => $this->config->recaptcha_language !== null
                                    ? $this->config->recaptcha_language : 'en',
                            )
                        ),
                    )
                ),
            )
        );
    }


    /**
     * @param EE_Registration_Config $EE_Registration_Config
     * @return EE_Registration_Config
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function updateAdminSettings(EE_Registration_Config $EE_Registration_Config)
    {
        try {
            $recaptcha_settings_form = $this->settingsForm();
            // if not displaying a form, then check for form submission
            if ($recaptcha_settings_form->was_submitted()) {
                // capture form data
                $recaptcha_settings_form->receive_form_submission();
                // validate form data
                if ($recaptcha_settings_form->is_valid()) {
                    // grab validated data from form
                    $valid_data = $recaptcha_settings_form->valid_data();
                    // user proofing recaptcha:  If Use reCAPTCHA is set to yes but we dont' have site or secret keys then set Use reCAPTCHA to FALSE and give error message.
                    if ($valid_data['main_settings']['use_captcha']
                        && (
                            ! $EE_Registration_Config->use_captcha
                            && (
                                empty($valid_data['main_settings']['recaptcha_publickey'])
                                || empty($valid_data['main_settings']['recaptcha_privatekey'])
                            )
                        )
                        && apply_filters(
                            'FHEE__Extend_Registration_Form_Admin_Page__check_for_recaptcha_keys',
                            true,
                            $EE_Registration_Config
                        )
                    ) {
                        $valid_data['main_settings']['use_captcha'] = false;
                        EE_Error::add_error(
                            esc_html__(
                                'The use reCAPTCHA setting has been reset to "no". In order to enable the reCAPTCHA service, you must enter a Site Key and Secret Key.',
                                'event_espresso'
                            ),
                            __FILE__,
                            __FUNCTION__,
                            __LINE__
                        );
                    }
                    $EE_Registration_Config->use_captcha          = $valid_data['main_settings']['use_captcha'];
                    $EE_Registration_Config->recaptcha_publickey  = $valid_data['main_settings']['recaptcha_publickey'];
                    $EE_Registration_Config->recaptcha_protected_forms = $valid_data['main_settings']['recaptcha_protected_forms'];
                    $EE_Registration_Config->recaptcha_privatekey = $valid_data['main_settings']['recaptcha_privatekey'];
                    $EE_Registration_Config->recaptcha_type       = $valid_data['appearance_settings']['recaptcha_type'];
                    $EE_Registration_Config->recaptcha_theme      = $valid_data['appearance_settings']['recaptcha_theme'];
                    $EE_Registration_Config->recaptcha_badge      = $valid_data['appearance_settings']['recaptcha_badge'];
                    $EE_Registration_Config->recaptcha_language   = $valid_data['appearance_settings']['recaptcha_language'];
                } else {
                    if ($recaptcha_settings_form->submission_error_message() !== '') {
                        EE_Error::add_error(
                            $recaptcha_settings_form->submission_error_message(),
                            __FILE__,
                            __FUNCTION__,
                            __LINE__
                        );
                    }
                }
            }
        } catch (EE_Error $e) {
            $e->get_error();
        }
        return $EE_Registration_Config;
    }
}
