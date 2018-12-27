<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use ReCaptcha\ReCaptcha;
use ReCaptcha\RequestMethod\SocketPost;
use ReCaptcha\Response;

/**
 * EED_Recaptcha
 * PLZ NOTE: ALL ADMIN SETTINGS FUNCTIONALITY HAS BEEN MOVED TO
 * \EventEspresso\caffeinated\modules\recaptcha_invisible\RecaptchaAdminSettings
 *
 * @package        Event Espresso
 * @subpackage     /modules/recaptcha/
 * @author         Brent Christensen
 */
class EED_Recaptcha extends EED_Module
{

    /**
     * @var EE_Registration_Config $config
     */
    private static $config;

    /**
     * @type bool $_not_a_robot
     */
    private static $_not_a_robot;

    /**
     * @type string $_recaptcha_response
     */
    private static $_recaptcha_response;


    /**
     * @return EED_Module|EED_Recaptcha
     */
    public static function instance()
    {
        return parent::get_instance(__CLASS__);
    }


    /**
     * set_hooks - for hooking into EE Core, other modules, etc
     *
     * @return void
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     */
    public static function set_hooks()
    {
        EED_Recaptcha::$config = EE_Registry::instance()->CFG->registration;
        // use_captcha ?
        if (EED_Recaptcha::useRecaptcha()
            && EED_Recaptcha::notPaymentOptionsRevisit()
        ) {
            EED_Recaptcha::set_definitions();
            EED_Recaptcha::enqueue_styles_and_scripts();
            add_action('wp', array('EED_Recaptcha', 'set_late_hooks'), 1, 0);
            add_action(
                'AHEE__before_spco_whats_next_buttons',
                array('EED_Recaptcha', 'display_recaptcha'),
                10,
                0
            );
            add_filter(
                'FHEE__EED_Single_Page_Checkout__init___continue_reg',
                array('EED_Recaptcha', 'not_a_robot')
            );
            add_filter(
                'FHEE__EE_SPCO_Reg_Step__set_completed___completed',
                array('EED_Recaptcha', 'not_a_robot')
            );
            add_filter(
                'FHEE__EE_SPCO_JSON_Response___toString__JSON_response',
                array('EED_Recaptcha', 'recaptcha_response')
            );
            add_filter(
                'FHEE__EED_Recaptcha___bypass_recaptcha__bypass_request_params_array',
                array('EED_Recaptcha', 'bypass_recaptcha_for_spco_load_payment_method')
            );
        }
    }


    /**
     * set_hooks_admin - for hooking into EE Admin Core, other modules, etc
     *
     * @return void
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     */
    public static function set_hooks_admin()
    {
        EED_Recaptcha::$config = EE_Registry::instance()->CFG->registration;
        EED_Recaptcha::set_definitions();
        // use_captcha ?
        if (EED_Recaptcha::useRecaptcha()
            && EED_Recaptcha::notPaymentOptionsRevisit()
            && EE_Registry::instance()->REQ->get('step', '') !== ''
        ) {
            EED_Recaptcha::enqueue_styles_and_scripts();
            add_filter(
                'FHEE__EED_Single_Page_Checkout__init___continue_reg',
                array('EED_Recaptcha', 'not_a_robot')
            );
            add_filter(
                'FHEE__EE_SPCO_Reg_Step__set_completed___completed',
                array('EED_Recaptcha', 'not_a_robot')
            );
            add_filter(
                'FHEE__EE_SPCO_JSON_Response___toString__JSON_response',
                array('EED_Recaptcha', 'recaptcha_response')
            );
        }
    }


    /**
     * @return void
     */
    public static function set_definitions()
    {
        if (is_user_logged_in()) {
            EED_Recaptcha::$_not_a_robot = true;
        }
        define(
            'RECAPTCHA_BASE_PATH',
            rtrim(str_replace(array('\\', '/'), DS, plugin_dir_path(__FILE__)), DS) . DS
        );
        define('RECAPTCHA_BASE_URL', plugin_dir_url(__FILE__));
    }


    /**
     * @return void
     */
    public static function set_late_hooks()
    {
        add_filter(
            'FHEE__Single_Page_Checkout__translate_js_strings__ajax_submit',
            array('EED_Recaptcha', 'not_a_robot')
        );
    }


    /**
     * @return boolean
     */
    public static function useRecaptcha()
    {
        return EED_Recaptcha::$config->use_captcha
               && EED_Recaptcha::$config->recaptcha_theme !== 'invisible';
    }


    /**
     * @return boolean
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     */
    public static function notPaymentOptionsRevisit()
    {
        return ! (
            EE_Registry::instance()->REQ->get('step', '') === 'payment_options'
            && (boolean) EE_Registry::instance()->REQ->get('revisit', false) === true
        );
    }


    /**
     * @return void
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     */
    public static function enqueue_styles_and_scripts()
    {
        wp_register_script(
            'espresso_recaptcha',
            RECAPTCHA_BASE_URL . 'scripts' . DS . 'espresso_recaptcha.js',
            array('single_page_checkout'),
            EVENT_ESPRESSO_VERSION,
            true
        );
        wp_register_script(
            'google_recaptcha',
            'https://www.google.com/recaptcha/api.js?hl=' . EED_Recaptcha::$config->recaptcha_language,
            array('espresso_recaptcha'),
            EVENT_ESPRESSO_VERSION,
            true
        );
        EE_Registry::$i18n_js_strings['no_SPCO_error'] = __(
            'It appears the Single Page Checkout javascript was not loaded properly! Please refresh the page and try again or contact support.',
            'event_espresso'
        );
        EE_Registry::$i18n_js_strings['no_recaptcha_error'] = __(
            'There appears to be a problem with the reCAPTCHA configuration! Please check the admin settings or contact support.',
            'event_espresso'
        );
        EE_Registry::$i18n_js_strings['recaptcha_fail'] = __(
            'Please complete the anti-spam test before proceeding.',
            'event_espresso'
        );
    }


    /**
     * @param \WP $WP
     */
    public function run($WP)
    {
    }


    /**
     * @return boolean
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     */
    public static function not_a_robot()
    {
        $not_a_robot = is_bool(EED_Recaptcha::$_not_a_robot)
            ? EED_Recaptcha::$_not_a_robot
            : EED_Recaptcha::recaptcha_passed();
        return $not_a_robot;
    }


    /**
     * @return void
     * @throws DomainException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     */
    public static function display_recaptcha()
    {
        // logged in means you have already passed a turing test of sorts
        if (is_user_logged_in()) {
            return;
        }
        // don't display if not using recaptcha or user is logged in
        if (EED_Recaptcha::useRecaptcha() && ! EED_Recaptcha::$_not_a_robot) {
            // only display if they have NOT passed the test yet
            EEH_Template::display_template(
                RECAPTCHA_BASE_PATH . DS . 'templates' . DS . 'recaptcha.template.php',
                array(
                    'recaptcha_publickey' => EED_Recaptcha::$config->recaptcha_publickey,
                    'recaptcha_theme'     => EED_Recaptcha::$config->recaptcha_theme,
                    'recaptcha_type'      => EED_Recaptcha::$config->recaptcha_type,
                )
            );
            wp_enqueue_script('google_recaptcha');
        }
    }


    /**
     * @return array
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     */
    public static function bypass_recaptcha_for_spco_load_payment_method()
    {
        return array(
            'EESID'  => EE_Registry::instance()->SSN->id(),
            'step'   => 'payment_options',
            'action' => 'switch_spco_billing_form',
        );
    }


    /**
     * @return boolean
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     */
    public static function recaptcha_passed()
    {
        // logged in means you have already passed a turing test of sorts
        if (is_user_logged_in() || EED_Recaptcha::_bypass_recaptcha()) {
            return true;
        }
        // was test already passed?
        $recaptcha_passed = EE_Registry::instance()->SSN->get_session_data('recaptcha_passed');
        $recaptcha_passed = filter_var($recaptcha_passed, FILTER_VALIDATE_BOOLEAN);
        // verify recaptcha
        EED_Recaptcha::_get_recaptcha_response();
        if (! $recaptcha_passed && EED_Recaptcha::$_recaptcha_response) {
            $recaptcha_passed = EED_Recaptcha::_process_recaptcha_response();
            EE_Registry::instance()->SSN->set_session_data(array('recaptcha_passed' => $recaptcha_passed));
        }
        EED_Recaptcha::$_not_a_robot = $recaptcha_passed;
        return $recaptcha_passed;
    }


    /**
     * @param array $recaptcha_response
     * @return array
     */
    public static function recaptcha_response($recaptcha_response = array())
    {
        if (EED_Recaptcha::_bypass_recaptcha()) {
            $recaptcha_response['bypass_recaptcha'] = true;
            $recaptcha_response['recaptcha_passed'] = true;
        } else {
            $recaptcha_response['recaptcha_passed'] = EED_Recaptcha::$_not_a_robot;
        }
        return $recaptcha_response;
    }


    /**
     * @return boolean
     */
    private static function _bypass_recaptcha()
    {
        // an array of key value pairs that must match exactly with the incoming request,
        // in order to bypass recaptcha for the current request ONLY
        $bypass_request_params_array = (array) apply_filters(
            'FHEE__EED_Recaptcha___bypass_recaptcha__bypass_request_params_array',
            array()
        );
        // does $bypass_request_params_array have any values ?
        if (empty($bypass_request_params_array)) {
            return false;
        }
        // initially set bypass to TRUE
        $bypass_recaptcha = true;
        foreach ($bypass_request_params_array as $key => $value) {
            // if $key is not found or value doesn't match exactly, then toggle bypass to FALSE,
            // otherwise carry over it's value. This way, one missed setting results in no bypass
            $bypass_recaptcha = isset($_REQUEST[ $key ]) && $_REQUEST[ $key ] === $value
                ? $bypass_recaptcha
                : false;
        }
        return $bypass_recaptcha;
    }


    /**
     * @return void
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     */
    private static function _get_recaptcha_response()
    {
        EED_Recaptcha::$_recaptcha_response = EE_Registry::instance()->REQ->get(
            'g-recaptcha-response',
            false
        );
    }


    /**
     * @return boolean
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     */
    private static function _process_recaptcha_response()
    {
        // verify library is loaded
        if (! class_exists('\ReCaptcha\ReCaptcha')) {
            require_once RECAPTCHA_BASE_PATH . DS . 'autoload.php';
        }
        // The response from reCAPTCHA
        EED_Recaptcha::_get_recaptcha_response();
        $recaptcha_response = EED_Recaptcha::$_recaptcha_response;
        // Was there a reCAPTCHA response?
        if ($recaptcha_response) {
            // if allow_url_fopen is Off, then set a different request method
            $request_method = ! ini_get('allow_url_fopen') ? new SocketPost() : null;
            $recaptcha = new ReCaptcha(
                EED_Recaptcha::$config->recaptcha_privatekey,
                $request_method
            );
            $recaptcha_response = $recaptcha->verify(
                EED_Recaptcha::$_recaptcha_response,
                $_SERVER['REMOTE_ADDR']
            );
        }
        return $recaptcha_response instanceof Response && $recaptcha_response->isSuccess();
    }
}
