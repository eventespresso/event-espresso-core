<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;

/**
 * Class EE_Invisible_Recaptcha_Input
 * Although technically not an actual form input,
 * this class allows Google's Invisible reCAPTCHA
 * to be added to Event Espresso's form system
 *
 * @author  Brent Christensen
 * @since   4.9.59.p
 */
class EE_Invisible_Recaptcha_Input extends EE_Form_Input_Base
{

    const SCRIPT_HANDLE_GOOGLE_INVISIBLE_RECAPTCHA   = 'google_invisible_recaptcha';

    const SCRIPT_HANDLE_ESPRESSO_INVISIBLE_RECAPTCHA = 'espresso_invisible_recaptcha';

    /**
     * @var EE_Registration_Config $config
     */
    private $config;

    /**
     * @var string $recaptcha_id
     */
    private $recaptcha_id;

    /**
     * @var string $submit_button_id
     */
    private $submit_button_id;


    /**
     * @param array                  $input_settings
     * @param EE_Registration_Config $registration_config
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws DomainException
     */
    public function __construct(array $input_settings = array(), EE_Registration_Config $registration_config = null)
    {
        $this->_set_display_strategy(new EE_Invisible_Recaptcha_Display_Strategy());
        parent::__construct($input_settings);
        $registration_config    = $registration_config instanceof EE_Registration_Config
            ? $registration_config
            : EE_Registry::instance()->CFG->registration;
        $this->config           = $registration_config;
        $this->recaptcha_id     = isset($input_settings['recaptcha_id'])
            ? $input_settings['recaptcha_id']
            : substr(spl_object_hash($this), 8, 8);
        $this->submit_button_id = isset($input_settings['submit_button_id'])
            ? $input_settings['submit_button_id']
            : '';
        if (isset($input_settings['localized_vars'])
            && filter_var($input_settings['iframe'], FILTER_VALIDATE_BOOLEAN)
        ) {
            $this->addIframeAssets($input_settings['localized_vars']);
        } else {
            $this->registerScripts();
        }
    }


    /**
     * @return bool
     */
    public function useCaptcha()
    {
        return $this->config->use_captcha && $this->config->recaptcha_theme === 'invisible';
    }


    /**
     * @return string
     */
    public function badge()
    {
        return $this->config->recaptcha_badge;
    }


    /**
     * @return string
     */
    public function language()
    {
        return $this->config->recaptcha_language;
    }


    /**
     * @return string
     */
    public function siteKey()
    {
        return $this->config->recaptcha_publickey;
    }


    /**
     * @return string
     */
    public function secretKey()
    {
        return $this->config->recaptcha_privatekey;
    }


    /**
     * @return string
     */
    public function recaptchaId()
    {
        return $this->recaptcha_id;
    }


    /**
     * @return string
     */
    public function submitButtonId()
    {
        return $this->submit_button_id;
    }


    /**
     * @param array $localized_vars
     * @throws DomainException
     */
    private function addIframeAssets(array $localized_vars)
    {
        if (! $this->useCaptcha()) {
            return;
        }
        add_filter(
            'FHEE__EED_Ticket_Selector__ticket_selector_iframe__js',
            function (array $iframe_assets) {
                $iframe_assets[ EE_Invisible_Recaptcha_Input::SCRIPT_HANDLE_ESPRESSO_INVISIBLE_RECAPTCHA ] =
                    EED_Recaptcha_Invisible::assetsUrl()
                    . 'espresso_invisible_recaptcha.js?ver='
                    . EVENT_ESPRESSO_VERSION;
                $iframe_assets[ EE_Invisible_Recaptcha_Input::SCRIPT_HANDLE_GOOGLE_INVISIBLE_RECAPTCHA ] =
                    add_query_arg(
                        array(
                            'onload' => 'espressoLoadRecaptcha',
                            'render' => 'explicit',
                            'hl'     => $this->language(),
                        ),
                        'https://www.google.com/recaptcha/api.js?'
                    );
                return $iframe_assets;
            }
        );
        add_filter(
            'FHEE__EventEspresso_modules_ticket_selector_TicketSelectorIframe__construct__js_attributes',
            function (array $iframe_asset_attributes) {
                $iframe_asset_attributes[ EE_Invisible_Recaptcha_Input::SCRIPT_HANDLE_GOOGLE_INVISIBLE_RECAPTCHA ]
                    = ' async="async" defer="defer"';
                return $iframe_asset_attributes;
            }
        );
        add_action(
            'AHEE__EventEspresso_modules_ticket_selector_TicketSelectorIframe__construct__complete',
            function (EventEspresso\modules\ticket_selector\TicketSelectorIframe $ticket_selector_iframe) use ($localized_vars) {
                $ticket_selector_iframe->addLocalizedVars($localized_vars, 'eeRecaptcha');
            }
        );
    }


    /**
     * @return void
     */
    private function registerScripts()
    {
        if (! $this->useCaptcha()) {
            return;
        }
        add_filter('script_loader_tag', array($this, 'addScriptAttributes'), 10, 2);
        wp_register_script(
            EE_Invisible_Recaptcha_Input::SCRIPT_HANDLE_ESPRESSO_INVISIBLE_RECAPTCHA,
            EED_Recaptcha_Invisible::assetsUrl() . 'espresso_invisible_recaptcha.js',
            array('espresso_core'),
            EVENT_ESPRESSO_VERSION,
            true
        );
        wp_register_script(
            EE_Invisible_Recaptcha_Input::SCRIPT_HANDLE_GOOGLE_INVISIBLE_RECAPTCHA,
            add_query_arg(
                array(
                    'onload' => 'espressoLoadRecaptcha',
                    'render' => 'explicit',
                    'hl'     => $this->language(),
                ),
                'https://www.google.com/recaptcha/api.js?'
            ),
            array(EE_Invisible_Recaptcha_Input::SCRIPT_HANDLE_ESPRESSO_INVISIBLE_RECAPTCHA),
            false,
            true
        );
    }


    /**
     * @param string $tag
     * @param string $handle
     * @return string
     */
    public function addScriptAttributes($tag, $handle)
    {
        if ($handle === EE_Invisible_Recaptcha_Input::SCRIPT_HANDLE_GOOGLE_INVISIBLE_RECAPTCHA) {
            $tag = str_replace('></script>', ' async="async" defer="defer"></script>', $tag);
        }
        return $tag;
    }


    /**
     * Gets the HTML for displaying the label for this form input
     * according to the form section's layout strategy
     *
     * @return string
     */
    public function get_html_for_label()
    {
        return '';
    }
}
