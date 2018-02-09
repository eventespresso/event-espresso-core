<?php

use EventEspresso\caffeinated\modules\recaptcha_invisible\InvisibleRecaptcha;
use EventEspresso\caffeinated\modules\recaptcha_invisible\RecaptchaFactory;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;

defined('EVENT_ESPRESSO_VERSION') || exit('NO direct script access allowed');



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
     * @var boolean $use_captcha
     */
    private static $use_captcha;



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
        if(EED_Recaptcha_Invisible::useInvisibleRecaptcha()){
            // ticket selection
            add_filter(
                'FHEE__EE_Ticket_Selector__after_ticket_selector_submit',
                array('EED_Recaptcha_Invisible', 'ticketSelectorForm'),
                10, 2
            );
            add_action(
                'EED_Ticket_Selector__process_ticket_selections__before',
                array('EED_Recaptcha_Invisible', 'processTicketSelectorForm')
            );
            // checkout
            add_action(
                'AHEE__EE_SPCO_Reg_Step__display_reg_form__reg_form',
                array('EED_Recaptcha_Invisible', 'spcoRegStepForm')
            );
            add_filter(
                'FHEE__EE_Form_Section_Proper__receive_form_submission__req_data',
                array('EED_Recaptcha_Invisible', 'receiveSpcoRegStepForm')
            );
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
     * @return boolean
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws InvalidArgumentException
     */
    protected static function recaptchaPassed()
    {
        // logged in means you have already passed a turing test of sorts
        if (EED_Recaptcha_Invisible::useInvisibleRecaptcha() === false || is_user_logged_in()) {
            return true;
        }
        // was test already passed?
        return filter_var(
            EE_Registry::instance()->SSN->get_session_data(
                InvisibleRecaptcha::SESSION_DATA_KEY_RECAPTCHA_PASSED
            ),
            FILTER_VALIDATE_BOOLEAN
        );
    }


    /**
     * @param EE_Request $request
     * @return bool
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws RuntimeException
     */
    protected static function verifyToken(EE_Request $request)
    {
        try {
            $invisible_recaptcha = RecaptchaFactory::create();
            if($invisible_recaptcha->verifyToken($request)){
                add_action('shutdown', array('EED_Recaptcha_Invisible', 'setSessionData'));
                return true;
            }
        } catch (RuntimeException $e) {
            EE_Error::add_error($e->getMessage(), __FILE__, __FUNCTION__, __LINE__);
        }
        return false;
    }

    /**
     * @param EE_Form_Section_Proper $reg_form
     * @return void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function spcoRegStepForm(EE_Form_Section_Proper $reg_form)
    {
        if(EED_Recaptcha_Invisible::recaptchaPassed()){
            return;
        }
        $default_hidden_inputs = $reg_form->get_subsection('default_hidden_inputs');
        if($default_hidden_inputs instanceof EE_Form_Section_Proper){
            $invisible_recaptcha = RecaptchaFactory::create();
            $invisible_recaptcha->addToFormSection($default_hidden_inputs);
        }
    }


    /**
     * @param array|null $req_data
     * @return array
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws RuntimeException
     */
    public static function receiveSpcoRegStepForm($req_data = array())
    {
        // do nothing if test has  already  been passed
        if (EED_Recaptcha_Invisible::recaptchaPassed()) {
            return $req_data;
        }
        /** @var EE_Request $request */
        $request = LoaderFactory::getLoader()->getShared('EE_Request');
        if (! EED_Recaptcha_Invisible::verifyToken($request)) {
            if($request->isAjax()) {
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
     * @return string
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws EE_Error
     */
    public static function ticketSelectorForm( $html = '', EE_Event $event)
    {
        // do nothing if test has  already  been passed
        if (EED_Recaptcha_Invisible::recaptchaPassed()) {
            return $html;
        }
        $invisible_recaptcha = RecaptchaFactory::create();
        $html .= $invisible_recaptcha->getInputHtml(
            array('recaptcha_id' => $event->ID())
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
        if (EED_Recaptcha_Invisible::recaptchaPassed()) {
            return;
        }
        /** @var EE_Request $request */
        $request = LoaderFactory::getLoader()->getShared('EE_Request');
        if(! EED_Recaptcha_Invisible::verifyToken($request)) {
            $event_id = $request->get('tkt-slctr-event-id');
            $return_url = $request->is_set("tkt-slctr-return-url-{$event_id}")
                ? $request->get("tkt-slctr-return-url-{$event_id}")
                : get_permalink($event_id);
            EEH_URL::safeRedirectAndExit($return_url);
        }
    }


    /**
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function setSessionData()
    {
        EE_Registry::instance()->SSN->set_session_data(
            array(InvisibleRecaptcha::SESSION_DATA_KEY_RECAPTCHA_PASSED => true)
        );
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
