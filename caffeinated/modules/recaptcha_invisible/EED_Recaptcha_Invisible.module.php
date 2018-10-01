<?php

use EventEspresso\caffeinated\modules\recaptcha_invisible\RecaptchaFactory;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;

/**
 * EED_Recaptcha_Invisible
 * Integrates Google's Invisible reCAPTCHA into the form submission process
 * for both the Ticket Selector and Single Page Checkout
 *
 * @package        Event Espresso
 * @subpackage     /modules/recaptcha_invisible/
 * @author         Brent Christensen
 */
class EED_Recaptcha_Invisible extends EED_Module
{

    /**
     * @var EE_Registration_Config $config
     */
    private static $config;


    /**
     * @return EED_Module|EED_Recaptcha
     */
    public static function instance()
    {
        return parent::get_instance(__CLASS__);
    }


    /**
     * @return void
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws InvalidArgumentException
     */
    public static function set_hooks()
    {
        EED_Recaptcha_Invisible::setProperties();
        if (EED_Recaptcha_Invisible::useInvisibleRecaptcha()) {
            if (EED_Recaptcha_Invisible::protectForm('ticket_selector')) {
                // ticket selection
                add_filter(
                    'FHEE__EE_Ticket_Selector__after_ticket_selector_submit',
                    array('EED_Recaptcha_Invisible', 'ticketSelectorForm'),
                    10,
                    3
                );
                add_action(
                    'EED_Ticket_Selector__process_ticket_selections__before',
                    array('EED_Recaptcha_Invisible', 'processTicketSelectorForm')
                );
            }
            if (EED_Recaptcha_Invisible::protectForm('registration_form')) {
                // checkout
                add_action(
                    'AHEE__EE_SPCO_Reg_Step__display_reg_form__reg_form',
                    array('EED_Recaptcha_Invisible', 'spcoRegStepForm')
                );
                add_filter(
                    'FHEE__EE_Form_Section_Proper__receive_form_submission__req_data',
                    array('EED_Recaptcha_Invisible', 'receiveSpcoRegStepForm'),
                    10,
                    2
                );
            }
            add_action('loop_end', array('EED_Recaptcha_Invisible', 'localizeScriptVars'));
        }
    }


    /**
     * @return void
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws InvalidArgumentException
     */
    public static function set_hooks_admin()
    {
        EED_Recaptcha_Invisible::setProperties();
        if (EED_Recaptcha_Invisible::protectForm('ticket_selector')) {
            add_action(
                'EED_Ticket_Selector__process_ticket_selections__before',
                array('EED_Recaptcha_Invisible', 'processTicketSelectorForm')
            );
        }
        if (EED_Recaptcha_Invisible::protectForm('registration_form')) {
            add_filter(
                'FHEE__EE_Form_Section_Proper__receive_form_submission__req_data',
                array('EED_Recaptcha_Invisible', 'receiveSpcoRegStepForm'),
                10,
                2
            );
        }
        // admin settings
        add_action(
            'AHEE__Extend_Registration_Form_Admin_Page___reg_form_settings_template',
            array('EED_Recaptcha_Invisible', 'adminSettings')
        );
        add_filter(
            'FHEE__Extend_Registration_Form_Admin_Page___update_reg_form_settings__CFG_registration',
            array('EED_Recaptcha_Invisible', 'updateAdminSettings')
        );
    }


    /**
     * @return void
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws InvalidArgumentException
     */
    public static function setProperties()
    {

        EED_Recaptcha_Invisible::$config = EE_Registry::instance()->CFG->registration;
    }


    /**
     * @return boolean
     */
    public static function useInvisibleRecaptcha()
    {
        return EED_Recaptcha_Invisible::$config->use_captcha
               && EED_Recaptcha_Invisible::$config->recaptcha_theme === 'invisible';
    }


    /**
     * @param string $form
     * @return boolean
     */
    public static function protectForm($form)
    {
        return is_array(EED_Recaptcha_Invisible::$config->recaptcha_protected_forms)
               && in_array($form, EED_Recaptcha_Invisible::$config->recaptcha_protected_forms, true);
    }


    /**
     * @return void
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws InvalidArgumentException
     */
    public static function localizeScriptVars()
    {
        /** @var \EventEspresso\core\services\request\Request $request */
        $request = LoaderFactory::getLoader()->getShared('EventEspresso\core\services\request\Request');
        // Invisible Recaptcha is ONLY ever required for the frontend and admin
        // so we don't need to load any JS assets for other types of requests (like AJAX or API).
        if (! ($request->isAdmin() || $request->isFrontend())) {
            return;
        }
        wp_localize_script(
            EE_Invisible_Recaptcha_Input::SCRIPT_HANDLE_ESPRESSO_INVISIBLE_RECAPTCHA,
            'eeRecaptcha',
            RecaptchaFactory::create()->getLocalizedVars()
        );
    }


    /**
     * @return string
     */
    public static function assetsUrl()
    {
        return plugin_dir_url(__FILE__) . 'assets' . DS;
    }


    /**
     * @param \WP $WP
     */
    public function run($WP)
    {
    }


    /**
     * @param EE_Request $request
     * @return bool
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws RuntimeException
     */
    public static function verifyToken(EE_Request $request)
    {
        return RecaptchaFactory::create()->verifyToken($request);
    }


    /**
     * @param EE_Form_Section_Proper $reg_form
     * @return void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws DomainException
     */
    public static function spcoRegStepForm(EE_Form_Section_Proper $reg_form)
    {
        // do nothing if form isn't for a reg step or test has already been passed
        if (! EED_Recaptcha_Invisible::processSpcoRegStepForm($reg_form)) {
            return;
        }
        $default_hidden_inputs = $reg_form->get_subsection('default_hidden_inputs');
        if ($default_hidden_inputs instanceof EE_Form_Section_Proper) {
            $invisible_recaptcha = RecaptchaFactory::create();
            $invisible_recaptcha->addToFormSection($default_hidden_inputs);
        }
    }


    /**
     * @param EE_Form_Section_Proper $reg_form
     * @return bool
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws EE_Error
     * @throws InvalidArgumentException
     */
    public static function processSpcoRegStepForm(EE_Form_Section_Proper $reg_form)
    {
        return strpos($reg_form->name(), 'reg-step-form') !== false
               && ! RecaptchaFactory::create()->recaptchaPassed();
    }


    /**
     * @param array|null             $req_data
     * @param EE_Form_Section_Proper $reg_form
     * @return array
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws RuntimeException
     */
    public static function receiveSpcoRegStepForm($req_data = array(), EE_Form_Section_Proper $reg_form)
    {
        // do nothing if form isn't for a reg step or test has already been passed
        if (! EED_Recaptcha_Invisible::processSpcoRegStepForm($reg_form)) {
            return $req_data;
        }
        /** @var EE_Request $request */
        $request = LoaderFactory::getLoader()->getShared('EE_Request');
        if (! EED_Recaptcha_Invisible::verifyToken($request)) {
            if ($request->isAjax()) {
                $json_response = new EE_SPCO_JSON_Response();
                $json_response->echoAndExit();
            }
            EEH_URL::safeRedirectAndExit(
                EE_Registry::instance()->CFG->core->reg_page_url()
            );
        }
        return $req_data;
    }


    /**
     * @param string   $html
     * @param EE_Event $event
     * @param bool     $iframe
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws DomainException
     */
    public static function ticketSelectorForm($html = '', EE_Event $event, $iframe = false)
    {
        $recaptcha = RecaptchaFactory::create();
        // do nothing if test has  already  been passed
        if ($recaptcha->recaptchaPassed()) {
            return $html;
        }
        $html .= $recaptcha->getInputHtml(
            array(
                'recaptcha_id'   => $event->ID(),
                'iframe'         => $iframe,
                'localized_vars' => $recaptcha->getLocalizedVars(),
            )
        );
        return $html;
    }


    /**
     * @return void
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws RuntimeException
     */
    public static function processTicketSelectorForm()
    {
        // do nothing if test has  already  been passed
        if (RecaptchaFactory::create()->recaptchaPassed()) {
            return;
        }
        /** @var EE_Request $request */
        $request = LoaderFactory::getLoader()->getShared('EE_Request');
        if (! EED_Recaptcha_Invisible::verifyToken($request)) {
            $event_id = $request->get('tkt-slctr-event-id');
            $return_url = $request->is_set("tkt-slctr-return-url-{$event_id}")
                ? $request->get("tkt-slctr-return-url-{$event_id}")
                : get_permalink($event_id);
            EEH_URL::safeRedirectAndExit($return_url);
        }
    }


    /**
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function adminSettings()
    {
        RecaptchaFactory::getAdminModule()->adminSettings();
    }


    /**
     * @param EE_Registration_Config $EE_Registration_Config
     * @return EE_Registration_Config
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public static function updateAdminSettings(EE_Registration_Config $EE_Registration_Config)
    {
        return RecaptchaFactory::getAdminModule()->updateAdminSettings($EE_Registration_Config);
    }
}
