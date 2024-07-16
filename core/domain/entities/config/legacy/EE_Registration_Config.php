<?php

use EventEspresso\core\domain\services\registration\RegStatus;
use EventEspresso\core\services\loaders\LoaderFactory;

/**
 * Class for defining what's in the EE_Config relating to registration settings
 */
class EE_Registration_Config extends EE_Config_Base
{
    /**
     * Default registration status
     *
     * @var string $default_STS_ID
     * eg 'RPP'
     */
    public $default_STS_ID = RegStatus::PENDING_PAYMENT;

    /**
     * For new events, this will be the default value for the maximum number of tickets (equivalent to maximum number of
     * registrations)
     *
     * @var int
     */
    public $default_maximum_number_of_tickets = 10;

    /**
     * level of validation to apply to email addresses
     *
     * @var string $email_validation_level
     * options: 'basic', 'wp_default', 'i18n', 'i18n_dns'
     */
    public $email_validation_level = 'wp_default';

    /**
     * whether to show alternate payment options during the reg process if payment status is pending
     *
     * @var bool $show_pending_payment_options
     */
    public $show_pending_payment_options = true;

    /**
     * an array of SPCO reg steps where:
     *        the keys denotes the reg step order
     *        each element consists of an array with the following elements:
     *            "file_path" => the file path to the EE_SPCO_Reg_Step class
     *            "class_name" => the specific EE_SPCO_Reg_Step child class name
     *            "slug" => the URL param used to trigger the reg step
     *
     * @var array $reg_steps
     */
    public $reg_steps = [];

    /**
     * Whether registration confirmation should be the last page of SPCO
     *
     * @var bool $reg_confirmation_last
     */
    public $reg_confirmation_last = false;

    /**
     * Whether to enable the EE Bot Trap
     *
     * @var bool $use_bot_trap
     */
    public $use_bot_trap = true;

    /**
     * Whether to encrypt some data sent by the EE Bot Trap
     *
     * @var bool $use_encryption
     */
    public $use_encryption = true;

    /**
     * Whether to use ReCaptcha
     *
     * @var bool $use_captcha
     */
    public $use_captcha = false;

    /**
     * ReCaptcha Theme
     *
     * @var string $recaptcha_theme
     *    options: 'dark', 'light', 'invisible'
     */
    public $recaptcha_theme = 'light';

    /**
     * ReCaptcha Badge - determines the position of the reCAPTCHA badge if using Invisible ReCaptcha.
     *
     * @var string $recaptcha_badge
     *    options: 'bottomright', 'bottomleft', 'inline'
     */
    public $recaptcha_badge = 'bottomleft';

    /**
     * ReCaptcha Type
     *
     * @var string $recaptcha_type
     *    options: 'audio', 'image'
     */
    public $recaptcha_type = 'image';

    /**
     * ReCaptcha language
     *
     * @var string $recaptcha_language
     * eg 'en'
     */
    public $recaptcha_language = 'en';

    /**
     * ReCaptcha public key
     *
     * @var string|null $recaptcha_publickey
     */
    public $recaptcha_publickey = null;

    /**
     * ReCaptcha private key
     *
     * @var string|null $recaptcha_privatekey
     */
    public $recaptcha_privatekey = null;

    /**
     * array of form names protected by ReCaptcha
     *
     * @var array $recaptcha_protected_forms
     */
    public $recaptcha_protected_forms = [];

    /**
     * ReCaptcha width
     *
     * @var int $recaptcha_width
     * @deprecated
     */
    public $recaptcha_width = 500;

    /**
     * Whether invalid attempts to directly access the registration checkout page should be tracked.
     *
     * @var bool $track_invalid_checkout_access
     */
    protected $track_invalid_checkout_access = true;

    /**
     * Whether to show the privacy policy consent checkbox
     *
     * @var bool
     */
    public $consent_checkbox_enabled = false;

    /**
     * Label text to show on the checkbox
     *
     * @var string
     */
    public $consent_checkbox_label_text = '';

    /*
     * String describing how long to keep payment logs. Passed into DateTime constructor
     * @var string
     */
    public $gateway_log_lifespan = '7 days';

    /**
     * Enable copy attendee info at form
     *
     * @var bool $enable_copy_attendee
     */
    protected $copy_attendee_info = true;

    /**
     * @var bool|int|string|null $skip_reg_confirmation
     * @deprecated
     */
    public $skip_reg_confirmation;

    private bool $use_session_countdown = false;


    public function __construct()
    {
    }


    /**
     * This is called by the config loader and hooks are initialized AFTER the config has been populated.
     *
     * @since 4.8.8.rc.019
     */
    public function do_hooks()
    {
        add_action('AHEE__EE_Config___load_core_config__end', [$this, 'set_default_reg_status_on_EEM_Event']);
        add_action('AHEE__EE_Config___load_core_config__end', [$this, 'set_default_max_ticket_on_EEM_Event']);
        add_action('setup_theme', [$this, 'setDefaultCheckboxLabelText']);
    }


    /**
     * Hooked into `AHEE__EE_Config___load_core_config__end` to ensure the default for the
     * EVT_default_registration_status field matches the config setting for default_STS_ID.
     *
     * @throws EE_Error
     */
    public function set_default_reg_status_on_EEM_Event()
    {
        EEM_Event::set_default_reg_status($this->default_STS_ID);
    }


    /**
     * Hooked into `AHEE__EE_Config___load_core_config__end` to ensure the default for the EVT_additional_limit field
     * for Events matches the config setting for default_maximum_number_of_tickets
     */
    public function set_default_max_ticket_on_EEM_Event()
    {
        EEM_Event::set_default_additional_limit($this->default_maximum_number_of_tickets);
    }


    /**
     * Sets the default consent checkbox text. This needs to be done a bit later than when EE_Registration_Config is
     * constructed because that happens before we can get the privacy policy page's permalink.
     */
    public function setDefaultCheckboxLabelText()
    {
        if (
            $this->getConsentCheckboxLabelText() === null
            || $this->getConsentCheckboxLabelText() === ''
        ) {
            $opening_a_tag = '';
            $closing_a_tag = '';
            if (function_exists('get_privacy_policy_url')) {
                $privacy_page_url = get_privacy_policy_url();
                if (! empty($privacy_page_url)) {
                    $opening_a_tag = '<a href="' . $privacy_page_url . '" target="_blank">';
                    $closing_a_tag = '</a>';
                }
            }

            $loader     = LoaderFactory::getLoader();
            /** @var EE_Organization_Config $org_config */
            $org_config = $loader->getShared('EE_Organization_Config');

            $this->setConsentCheckboxLabelText(
                sprintf(
                    esc_html__(
                        'I consent to %1$s storing and using my personal information, according to their %2$sprivacy policy%3$s.',
                        'event_espresso'
                    ),
                    $org_config->name,
                    $opening_a_tag,
                    $closing_a_tag
                )
            );
        }
    }


    /**
     * @return bool
     */
    public function track_invalid_checkout_access(): bool
    {
        return (bool) $this->track_invalid_checkout_access;
    }


    /**
     * @param bool $track_invalid_checkout_access
     */
    public function set_track_invalid_checkout_access($track_invalid_checkout_access)
    {
        $this->track_invalid_checkout_access = (bool) filter_var($track_invalid_checkout_access, FILTER_VALIDATE_BOOL);
    }


    /**
     * @return bool
     */
    public function copyAttendeeInfo(): bool
    {
        return (bool) $this->copy_attendee_info;
    }


    /**
     * @param bool $copy_attendee_info
     */
    public function setCopyAttendeeInfo($copy_attendee_info)
    {
        $this->copy_attendee_info = (bool) filter_var($copy_attendee_info, FILTER_VALIDATE_BOOL);
    }


    /**
     * Gets the options to make available for the gateway log lifespan
     *
     * @return array
     */
    public function gatewayLogLifespanOptions(): array
    {
        return (array) apply_filters(
            'FHEE_EE_Admin_Config__gatewayLogLifespanOptions',
            [
                '1 second' => esc_html__('Don\'t Log At All', 'event_espresso'),
                '1 day'    => esc_html__('1 Day', 'event_espresso'),
                '7 days'   => esc_html__('7 Days', 'event_espresso'),
                '14 days'  => esc_html__('14 Days', 'event_espresso'),
                '30 days'  => esc_html__('30 Days', 'event_espresso'),
            ]
        );
    }


    /**
     * @return bool
     */
    public function isConsentCheckboxEnabled(): bool
    {
        return (bool) $this->consent_checkbox_enabled;
    }


    /**
     * @param bool $consent_checkbox_enabled
     */
    public function setConsentCheckboxEnabled($consent_checkbox_enabled)
    {
        $this->consent_checkbox_enabled = (bool) filter_var($consent_checkbox_enabled, FILTER_VALIDATE_BOOL);
    }


    /**
     * @return string
     */
    public function getConsentCheckboxLabelText(): string
    {
        return (string) $this->consent_checkbox_label_text;
    }


    /**
     * @param string $consent_checkbox_label_text
     */
    public function setConsentCheckboxLabelText($consent_checkbox_label_text)
    {
        $this->consent_checkbox_label_text = (string) $consent_checkbox_label_text;
    }


    public function useSessionCountdown(): bool
    {
        return $this->use_session_countdown;
    }


    public function setUseSessionCountdown(bool $use_session_countdown): void
    {
        $this->use_session_countdown = $use_session_countdown;
    }
}
