<?php

use EventEspresso\core\domain\entities\custom_post_types\EspressoPostType;
use EventEspresso\core\domain\services\capabilities\FeatureFlag;
use EventEspresso\core\domain\services\capabilities\FeatureFlags;
use EventEspresso\core\domain\services\capabilities\PublicCapabilities;
use EventEspresso\core\domain\services\commands\registration\CreateRegistrationCommand;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\request\CurrentPage;
use EventEspresso\core\services\request\RequestInterface;
use EventEspresso\modules\single_page_checkout\form\LegacySpcoForm;
use EventEspresso\modules\single_page_checkout\form\SinglePageCheckoutForm;

/**
 * Single Page Checkout (SPCO)
 *
 * @package     Event Espresso
 * @subpackage  /modules/single_page_checkout/
 * @author      Brent Christensen
 * @method EED_Single_Page_Checkout get_instance($module_name)
 */
class EED_Single_Page_Checkout extends EED_Module
{
    /**
     * $_initialized - has the SPCO controller already been initialized ?
     */
    private static bool $_initialized = false;


    /**
     * $_checkout_verified - is the EE_Checkout verified as correct for this request ?
     */
    private static bool $_checkout_verified = true;

    /**
     * $_reg_steps_array - holds initial array of reg steps
     *
     * @var array $_reg_steps_array
     */
    private static array $_reg_steps_array = [];

    /**
     * $checkout - EE_Checkout object for handling the properties of the current checkout process
     */
    public ?EE_Checkout $checkout = null;

    protected ?RequestInterface $request = null;

    public ?EE_Session $session = null;

    private bool $debug = false;    //  true    false


    /**
     * @return EED_Single_Page_Checkout|EED_Module
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function instance()
    {
        add_filter('EED_Single_Page_Checkout__SPCO_active', '__return_true');
        return parent::get_instance(__CLASS__);
    }


    /**
     * @return EE_CART
     */
    public function cart(): EE_CART
    {
        return $this->checkout->cart;
    }


    /**
     * @return RequestInterface
     * @since   4.10.14.p
     */
    public static function getRequest(): RequestInterface
    {
        return LoaderFactory::getLoader()->getShared(RequestInterface::class);
    }


    /**
     * @return EE_Transaction
     */
    public function transaction(): EE_Transaction
    {
        return $this->checkout->transaction;
    }


    /**
     *    set_hooks - for hooking into EE Core, other modules, etc
     *
     * @return    void
     * @throws EE_Error
     */
    public static function set_hooks()
    {
        EED_Single_Page_Checkout::set_definitions();
    }


    /**
     *    set_hooks_admin - for hooking into EE Admin Core, other modules, etc
     *
     * @return    void
     * @throws EE_Error
     */
    public static function set_hooks_admin()
    {
        EED_Single_Page_Checkout::set_definitions();
        if (! (defined('DOING_AJAX') && DOING_AJAX)) {
            return;
        }
        // going to start an output buffer in case anything gets accidentally output
        // that might disrupt our JSON response
        ob_start();
        EED_Single_Page_Checkout::load_reg_steps();
        // set ajax hooks
        add_action('wp_ajax_process_reg_step', ['EED_Single_Page_Checkout', 'process_reg_step']);
        add_action('wp_ajax_nopriv_process_reg_step', ['EED_Single_Page_Checkout', 'process_reg_step']);
        add_action('wp_ajax_display_spco_reg_step', ['EED_Single_Page_Checkout', 'display_reg_step']);
        add_action('wp_ajax_nopriv_display_spco_reg_step', ['EED_Single_Page_Checkout', 'display_reg_step']);
        add_action('wp_ajax_update_reg_step', ['EED_Single_Page_Checkout', 'update_reg_step']);
        add_action('wp_ajax_nopriv_update_reg_step', ['EED_Single_Page_Checkout', 'update_reg_step']);
    }


    /**
     *    process ajax request
     *
     * @param string $ajax_action
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function process_ajax_request(string $ajax_action)
    {
        $request = EED_Single_Page_Checkout::getRequest();
        $request->setRequestParam('action', $ajax_action);
        EED_Single_Page_Checkout::instance()->_initialize();
    }


    /**
     * ajax display registration step
     *
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function display_reg_step()
    {
        EED_Single_Page_Checkout::process_ajax_request('display_spco_reg_step');
    }


    /**
     * ajax process registration step
     *
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function process_reg_step()
    {
        EED_Single_Page_Checkout::process_ajax_request('process_reg_step');
    }


    /**
     * ajax process registration step
     *
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function update_reg_step()
    {
        EED_Single_Page_Checkout::process_ajax_request('update_reg_step');
    }


    /**
     * update_checkout
     *
     * @return void
     * @throws ReflectionException
     * @throws EE_Error
     */
    public static function update_checkout()
    {
        EED_Single_Page_Checkout::process_ajax_request('update_checkout');
    }


    /**
     *    set_definitions
     *
     * @return    void
     * @throws EE_Error
     */
    public static function set_definitions()
    {
        if (defined('SPCO_BASE_PATH')) {
            return;
        }
        define(
            'SPCO_BASE_PATH',
            rtrim(str_replace(['\\', '/'], '/', plugin_dir_path(__FILE__)), '/') . '/'
        );
        define('SPCO_CSS_URL', plugin_dir_url(__FILE__) . 'css/');
        define('SPCO_IMG_URL', plugin_dir_url(__FILE__) . 'img/');
        define('SPCO_JS_URL', plugin_dir_url(__FILE__) . 'js/');
        define('SPCO_INC_PATH', SPCO_BASE_PATH . 'inc/');
        define('SPCO_REG_STEPS_PATH', SPCO_BASE_PATH . 'reg_steps/');
        define('SPCO_TEMPLATES_PATH', SPCO_BASE_PATH . 'templates/');
        EEH_Autoloader::register_autoloaders_for_each_file_in_folder(SPCO_BASE_PATH, true);
        EE_Registry::$i18n_js_strings['registration_expiration_notice'] =
            EED_Single_Page_Checkout::getRegistrationExpirationNotice();
    }


    /**
     * load_reg_steps
     * loads and instantiates each reg step based on the EE_Registry::instance()->CFG->registration->reg_steps array
     *
     * @throws EE_Error
     */
    public static function load_reg_steps()
    {
        static $reg_steps_loaded = false;
        if ($reg_steps_loaded) {
            return;
        }
        // filter list of reg_steps
        $reg_steps_to_load = (array) apply_filters(
            'AHEE__SPCO__load_reg_steps__reg_steps_to_load',
            EED_Single_Page_Checkout::get_reg_steps()
        );
        // sort by key (order)
        ksort($reg_steps_to_load);
        // loop through folders
        foreach ($reg_steps_to_load as $order => $reg_step) {
            // we need a
            if (isset($reg_step['file_path'], $reg_step['class_name'], $reg_step['slug'])) {
                // copy over to the reg_steps_array
                EED_Single_Page_Checkout::$_reg_steps_array[ $order ] = $reg_step;
                // register custom key route for each reg step
                // ie: step=>"slug" - this is the entire reason we load the reg steps array now
                EED_Module::registerRoute(
                    $reg_step['slug'],
                    'EED_Single_Page_Checkout',
                    'run',
                    'step'
                );
                // add AJAX or other hooks
                if (isset($reg_step['has_hooks']) && $reg_step['has_hooks']) {
                    // setup autoloaders if necessary
                    if (! class_exists($reg_step['class_name'])) {
                        EEH_Autoloader::register_autoloaders_for_each_file_in_folder(
                            $reg_step['file_path'],
                            true
                        );
                    }
                    if (is_callable($reg_step['class_name'], 'set_hooks')) {
                        call_user_func([$reg_step['class_name'], 'set_hooks']);
                    }
                }
            }
        }
        $reg_steps_loaded = true;
    }


    /**
     *    get_reg_steps
     *
     * @return    array
     */
    public static function get_reg_steps(): array
    {
        $reg_steps = EE_Registry::instance()->CFG->registration->reg_steps;
        if (empty($reg_steps)) {
            $reg_steps = [
                10  => [
                    'file_path'  => SPCO_REG_STEPS_PATH . 'attendee_information',
                    'class_name' => 'EE_SPCO_Reg_Step_Attendee_Information',
                    'slug'       => 'attendee_information',
                    'has_hooks'  => false,
                ],
                30  => [
                    'file_path'  => SPCO_REG_STEPS_PATH . 'payment_options',
                    'class_name' => 'EE_SPCO_Reg_Step_Payment_Options',
                    'slug'       => 'payment_options',
                    'has_hooks'  => true,
                ],
                999 => [
                    'file_path'  => SPCO_REG_STEPS_PATH . 'finalize_registration',
                    'class_name' => 'EE_SPCO_Reg_Step_Finalize_Registration',
                    'slug'       => 'finalize_registration',
                    'has_hooks'  => false,
                ],
            ];
        }
        return $reg_steps;
    }


    /**
     * @return array|string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function registration_checkout_for_admin()
    {
        $request = EED_Single_Page_Checkout::getRequest();
        $request->setRequestParam('step', 'attendee_information');
        $request->setRequestParam('action', 'display_spco_reg_step');
        $request->setRequestParam('process_form_submission', false);
        EED_Single_Page_Checkout::instance()->_initialize();
        EED_Single_Page_Checkout::instance()->_display_spco_reg_form();
        return EED_Single_Page_Checkout::getResponse()->getOutput();
    }


    /**
     * @return EE_Transaction|null
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function process_registration_from_admin(): ?EE_Transaction
    {
        $request = EED_Single_Page_Checkout::getRequest();
        $request->setRequestParam('step', 'attendee_information');
        $request->setRequestParam('action', 'process_reg_step');
        $request->setRequestParam('process_form_submission', true);
        EED_Single_Page_Checkout::instance()->_initialize();
        if (EED_Single_Page_Checkout::instance()->checkout->current_step->completed()) {
            $final_reg_step = end(EED_Single_Page_Checkout::instance()->checkout->reg_steps);
            if ($final_reg_step instanceof EE_SPCO_Reg_Step_Finalize_Registration) {
                EED_Single_Page_Checkout::instance()->checkout->set_reg_step_initiated($final_reg_step);
                if ($final_reg_step->process_reg_step()) {
                    $final_reg_step->set_completed();
                    EED_Single_Page_Checkout::instance()->checkout->update_txn_reg_steps_array();
                    return EED_Single_Page_Checkout::instance()->checkout->transaction;
                }
            }
        }
        return null;
    }


    /**
     *    run
     *
     * @param WP_Query|null $WP_Query
     * @return    void
     */
    public function run($WP_Query)
    {
        if (
            $WP_Query instanceof WP_Query
            && $WP_Query->is_main_query()
            && apply_filters('FHEE__EED_Single_Page_Checkout__run', true)
            && $this->_is_reg_checkout()
        ) {
            $this->_initialize();
        }
    }


    /**
     * determines whether current url matches reg page url
     *
     * @return bool
     */
    protected function _is_reg_checkout(): bool
    {
        // get current permalink for reg page without any extra query args
        $reg_page_url = get_permalink(EE_Config::instance()->core->reg_page_id);
        // get request URI for current request, but without the scheme or host
        $current_request_uri = EEH_URL::filter_input_server_url();
        $current_request_uri = html_entity_decode($current_request_uri);
        // get array of query args from the current request URI
        $query_args = EEH_URL::get_query_string($current_request_uri);
        // grab page id if it is set
        $page_id = isset($query_args['page_id']) ? absint($query_args['page_id']) : 0;
        // and remove the page id from the query args (we will re-add it later)
        unset($query_args['page_id']);
        // now strip all query args from current request URI
        $current_request_uri = remove_query_arg(array_keys($query_args), $current_request_uri);
        // and re-add the page id if it was set
        if ($page_id) {
            $current_request_uri = add_query_arg('page_id', $page_id, $current_request_uri);
        }
        // remove slashes and ?
        $current_request_uri = trim($current_request_uri, '?/');
        // is current request URI part of the known full reg page URL ?
        return ! empty($current_request_uri) && strpos($reg_page_url, $current_request_uri) !== false;
    }


    /**
     * @param WP_Query $wp_query
     * @return    void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function init(WP_Query $wp_query)
    {
        EED_Single_Page_Checkout::instance()->run($wp_query);
    }


    /**
     * @return void
     */
    private function _initialize()
    {
        // ensure SPCO doesn't run twice
        if (EED_Single_Page_Checkout::$_initialized) {
            return;
        }
        try {
            $this->request = EED_Single_Page_Checkout::getRequest();
            EED_Single_Page_Checkout::load_reg_steps();
            $this->_verify_session();
            // set up the EE_Checkout object
            $this->checkout = $this->_initialize_checkout();
            // filter checkout
            $this->checkout = apply_filters('FHEE__EED_Single_Page_Checkout___initialize__checkout', $this->checkout);
            // get the $_GET
            $this->_get_request_vars();
            if ($this->_block_bots()) {
                return;
            }
            // filter continue_reg
            $this->checkout->continue_reg = apply_filters(
                'FHEE__EED_Single_Page_Checkout__init___continue_reg',
                true,
                $this->checkout
            );
            // load the reg steps array
            if (! $this->_load_and_instantiate_reg_steps()) {
                EED_Single_Page_Checkout::$_initialized = true;
                return;
            }
            // set the current step
            $this->checkout->set_current_step($this->checkout->step);
            // and the next step
            $this->checkout->set_next_step();
            // verify that everything has been set up correctly
            if (! ($this->_verify_transaction_and_get_registrations() && $this->_final_verifications())) {
                EED_Single_Page_Checkout::$_initialized = true;
                return;
            }
            do_action('AHEE__Single_Page_Checkout___initialize__after_final_verifications', $this->checkout);
            // lock the transaction
            $this->checkout->transaction->lock();
            // make sure all of our cached objects are added to their respective model entity mappers
            $this->checkout->refresh_all_entities();
            // set amount owing
            $this->checkout->amount_owing = $this->checkout->transaction->remaining();
            // initialize each reg step, which gives them the chance to potentially alter the process
            $this->_initialize_reg_steps();
            // DEBUG LOG
            // $this->checkout->log( __CLASS__, __FUNCTION__, __LINE__ );
            // get reg form
            if (! $this->_check_form_submission()) {
                EED_Single_Page_Checkout::$_initialized = true;
                return;
            }
            // checkout the action!!!
            $this->_process_form_action();
            // add some style and make it dance
            $this->add_styles_and_scripts($this);
            // kk... SPCO has successfully run
            EED_Single_Page_Checkout::$_initialized = true;
            // set no cache headers and constants
            EE_System::do_not_cache();
            // add anchor
            add_action('loop_start', [$this, 'set_checkout_anchor'], 1);
            // remove transaction lock
            add_action('shutdown', [$this, 'unlock_transaction'], 1);
        } catch (Exception $e) {
            EE_Error::add_error($e->getMessage(), __FILE__, __FUNCTION__, __LINE__);
        }
    }


    /**
     * checks that the session is valid and not expired
     *
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function _verify_session()
    {
        if (! $this->session instanceof EE_Session) {
            $this->session = LoaderFactory::getShared(EE_Session::class);
            if (! $this->session instanceof EE_Session) {
                throw new EE_Error(esc_html__('The EE_Session class could not be loaded.', 'event_espresso'));
            }
        }
        $clear_session_requested = $this->request->getRequestParam('clear_session', false, 'bool');
        // is session still valid ?
        if (
            $clear_session_requested
            || (
                $this->session->expired()
                && $this->request->getRequestParam('e_reg_url_link') === ''
            )
        ) {
            $this->checkout = new EE_Checkout();
            $this->session->clear_session(__CLASS__, __FUNCTION__);
            if (! $clear_session_requested) {
                EE_Error::add_attention(
                    EE_Registry::$i18n_js_strings['registration_expiration_notice'],
                    __FILE__,
                    __FUNCTION__,
                    __LINE__
                );
            }
        }
    }


    /**
     * loads and instantiates EE_Checkout
     *
     * @return EE_Checkout
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function _initialize_checkout(): EE_Checkout
    {
        // look in session for existing checkout
        /** @type EE_Checkout $checkout */
        $checkout = $this->session->checkout();
        // verify
        if (! $checkout instanceof EE_Checkout) {
            // instantiate EE_Checkout object for handling the properties of the current checkout process
            $checkout = EE_Registry::instance()->load_file(
                SPCO_INC_PATH,
                'EE_Checkout',
                'class',
                [],
                false
            );
        } else {
            if ($checkout->current_step->is_final_step() && $checkout->exit_spco() === true) {
                $this->unlock_transaction();
                wp_safe_redirect($checkout->redirect_url);
                exit();
            }
        }
        $checkout = apply_filters('FHEE__EED_Single_Page_Checkout___initialize_checkout__checkout', $checkout);
        // verify again
        if (! $checkout instanceof EE_Checkout) {
            throw new EE_Error(esc_html__('The EE_Checkout class could not be loaded.', 'event_espresso'));
        }
        // reset anything that needs a clean slate for each request
        $checkout->reset_for_current_request();
        return $checkout;
    }


    /**
     * @return void
     */
    private function _get_request_vars()
    {
        // make sure this request is marked as belonging to EE
        /** @var CurrentPage $current_page */
        $current_page = LoaderFactory::getLoader()->getShared(CurrentPage::class);
        $current_page->setEspressoPage(true);
        // which step is being requested ?
        $this->checkout->step = $this->request->getRequestParam('step', $this->_get_first_step());
        // which step is being edited ?
        $this->checkout->edit_step = $this->request->getRequestParam('edit_step');
        // and what we're doing on the current step
        $this->checkout->action = $this->request->getRequestParam('action', 'display_spco_reg_step');
        // timestamp
        $this->checkout->uts = $this->request->getRequestParam('uts', 0, 'int');
        // returning to edit ?
        $this->checkout->reg_url_link = $this->request->getRequestParam('e_reg_url_link');
        // add reg url link to registration query params
        if ($this->checkout->reg_url_link && strpos($this->checkout->reg_url_link, '1-') !== 0) {
            $this->checkout->reg_cache_where_params[0]['REG_url_link'] = $this->checkout->reg_url_link;
        }
        // or some other kind of revisit ?
        $this->checkout->revisit = $this->request->getRequestParam('revisit', false, 'bool');
        // and whether to generate a reg form for this request
        $this->checkout->generate_reg_form = $this->request->getRequestParam('generate_reg_form', true, 'bool');
        // and whether to process a reg form submission for this request
        $this->checkout->process_form_submission = $this->request->getRequestParam(
            'process_form_submission',
            $this->checkout->action === 'process_reg_step',
            'bool'
        );
        $this->checkout->process_form_submission = filter_var(
            $this->checkout->action !== 'display_spco_reg_step'
                ? $this->checkout->process_form_submission
                : false,
            FILTER_VALIDATE_BOOLEAN
        );
        $this->_display_request_vars();
    }


    /**
     * @return void
     */
    protected function _display_request_vars()
    {
        if (! ($this->debug && defined('WP_DEBUG') && WP_DEBUG)) {
            return;
        }
        EEH_Debug_Tools::printr($this->request->requestParams(), 'requestParams', __FILE__, __LINE__);
        EEH_Debug_Tools::printr($this->checkout->step, '$this->checkout->step', __FILE__, __LINE__);
        EEH_Debug_Tools::printr($this->checkout->edit_step, '$this->checkout->edit_step', __FILE__, __LINE__);
        EEH_Debug_Tools::printr($this->checkout->action, '$this->checkout->action', __FILE__, __LINE__);
        EEH_Debug_Tools::printr($this->checkout->reg_url_link, '$this->checkout->reg_url_link', __FILE__, __LINE__);
        EEH_Debug_Tools::printr($this->checkout->revisit, '$this->checkout->revisit', __FILE__, __LINE__);
        EEH_Debug_Tools::printr(
            $this->checkout->generate_reg_form,
            '$this->checkout->generate_reg_form',
            __FILE__,
            __LINE__
        );
        EEH_Debug_Tools::printr(
            $this->checkout->process_form_submission,
            '$this->checkout->process_form_submission',
            __FILE__,
            __LINE__
        );
    }


    /**
     * _block_bots
     * checks that the incoming request has either of the following set:
     *  a UTS (unix timestamp) which indicates that the request was redirected from the Ticket Selector
     *  a REG URL Link, which indicates that the request is a return visit to SPCO for a valid TXN
     * so if you're not coming from the Ticket Selector nor returning for a valid IP...
     * then where you coming from man?
     *
     * @return boolean
     */
    private function _block_bots(): bool
    {
        return EED_Invalid_Checkout_Access::getInvalidCheckoutAccess()->checkoutAccessIsInvalid($this->checkout);
    }


    /**
     *  gets slug for first step in $_reg_steps_array
     *
     * @return string
     */
    private function _get_first_step(): string
    {
        $first_step = reset(EED_Single_Page_Checkout::$_reg_steps_array);
        return $first_step['slug'] ?? 'attendee_information';
    }


    /**
     * instantiates each reg step based on the loaded reg_steps array
     *
     * @return bool
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    private function _load_and_instantiate_reg_steps(): bool
    {
        do_action('AHEE__Single_Page_Checkout___load_and_instantiate_reg_steps__start', $this->checkout);
        // have reg_steps already been instantiated ?
        if (
            empty($this->checkout->reg_steps)
            || apply_filters('FHEE__Single_Page_Checkout__load_reg_steps__reload_reg_steps', false, $this->checkout)
        ) {
            // if not, then loop through raw reg steps array
            foreach (EED_Single_Page_Checkout::$_reg_steps_array as $order => $reg_step) {
                if (! $this->_load_and_instantiate_reg_step($reg_step, $order)) {
                    return false;
                }
            }
            if (isset($this->checkout->reg_steps['registration_confirmation'])) {
                // skip the registration_confirmation page ?
                // just remove it from the reg steps array
                $this->checkout->remove_reg_step('registration_confirmation', false);
            }
            // filter the array for good luck
            $this->checkout->reg_steps = apply_filters(
                'FHEE__Single_Page_Checkout__load_reg_steps__reg_steps',
                $this->checkout->reg_steps
            );
            // finally re-sort based on the reg step class order properties
            $this->checkout->sort_reg_steps();
        } else {
            foreach ($this->checkout->reg_steps as $reg_step) {
                // set all current step stati to FALSE
                $reg_step->set_is_current_step(false);
            }
        }
        if (empty($this->checkout->reg_steps)) {
            EE_Error::add_error(
                esc_html__('No Reg Steps were loaded..', 'event_espresso'),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            return false;
        }
        // make reg step details available to JS
        $this->checkout->set_reg_step_JSON_info();
        return true;
    }


    /**
     * @param array $reg_step
     * @param int   $order
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function _load_and_instantiate_reg_step(array $reg_step = [], int $order = 0): bool
    {
        // we need a file_path, class_name, and slug to add a reg step
        if (isset($reg_step['file_path'], $reg_step['class_name'], $reg_step['slug'])) {
            // if editing a specific step, but this is NOT that step... (and it's not the 'finalize_registration' step)
            if (
                $this->checkout->reg_url_link
                && $this->checkout->step !== $reg_step['slug']
                && $reg_step['slug'] !== 'finalize_registration'
                // normally at this point we would NOT load the reg step, but this filter can change that
                && apply_filters(
                    'FHEE__Single_Page_Checkout___load_and_instantiate_reg_step__bypass_reg_step',
                    true,
                    $reg_step,
                    $this->checkout
                )
            ) {
                return true;
            }

            // instantiate step class using file path and class name
            $reg_step_obj = EE_Registry::instance()->load_file(
                $reg_step['file_path'],
                $reg_step['class_name'],
                'class',
                [$this->checkout],
                false
            );
            // did we get the goods ?
            if ($reg_step_obj instanceof EE_SPCO_Reg_Step) {
                // set reg step order based on config
                $reg_step_obj->set_order($order);
                // add instantiated reg step object to the master reg steps array
                $this->checkout->add_reg_step($reg_step_obj);
            } else {
                EE_Error::add_error(
                    esc_html__('The current step could not be set.', 'event_espresso'),
                    __FILE__,
                    __FUNCTION__,
                    __LINE__
                );
                return false;
            }
        } else {
            if (WP_DEBUG) {
                EE_Error::add_error(
                    sprintf(
                        esc_html__(
                            'A registration step could not be loaded. One or more of the following data points is invalid:%4$s%5$sFile Path: %1$s%6$s%5$sClass Name: %2$s%6$s%5$sSlug: %3$s%6$s%7$s',
                            'event_espresso'
                        ),
                        $reg_step['file_path'] ?? '',
                        $reg_step['class_name'] ?? '',
                        $reg_step['slug'] ?? '',
                        '<ul>',
                        '<li>',
                        '</li>',
                        '</ul>'
                    ),
                    __FILE__,
                    __FUNCTION__,
                    __LINE__
                );
            }
            return false;
        }
        return true;
    }


    /**
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function _verify_transaction_and_get_registrations(): bool
    {
        // was there already a valid transaction in the checkout from the session ?
        if (! $this->checkout->transaction instanceof EE_Transaction) {
            // get transaction from db or session
            $this->checkout->transaction = $this->checkout->reg_url_link && ! is_admin()
                ? $this->_get_transaction_and_cart_for_previous_visit()
                : $this->_get_cart_for_current_session_and_setup_new_transaction();
            if (! $this->checkout->transaction instanceof EE_Transaction) {
                EE_Error::add_error(
                    esc_html__(
                        'Your Registration and Transaction information could not be retrieved from the db.',
                        'event_espresso'
                    ),
                    __FILE__,
                    __FUNCTION__,
                    __LINE__
                );
                $this->checkout->transaction = EE_Transaction::new_instance();
                // add some style and make it dance
                $this->add_styles_and_scripts($this);
                EED_Single_Page_Checkout::$_initialized = true;
                return false;
            }
            // and the registrations for the transaction
            $this->_get_registrations($this->checkout->transaction);
        }
        return true;
    }


    /**
     * @return EE_Transaction|null
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function _get_transaction_and_cart_for_previous_visit(): ?EE_Transaction
    {
        /** @var $TXN_model EEM_Transaction */
        $TXN_model = EE_Registry::instance()->load_model('Transaction');
        // because the reg_url_link is present in the request,
        // this is a return visit to SPCO, so we'll get the transaction data from the db
        $transaction = $TXN_model->get_transaction_from_reg_url_link($this->checkout->reg_url_link);
        // verify transaction
        if ($transaction instanceof EE_Transaction) {
            // and get the cart that was used for that transaction
            $this->checkout->cart = $this->_get_cart_for_transaction($transaction);
            return $transaction;
        }
        EE_Error::add_error(
            esc_html__(
                'Your Registration and Transaction information could not be retrieved from the db.',
                'event_espresso'
            ),
            __FILE__,
            __FUNCTION__,
            __LINE__
        );
        return null;
    }


    /**
     * @param EE_Transaction|null $transaction
     * @return EE_Cart
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function _get_cart_for_transaction(?EE_Transaction $transaction): EE_Cart
    {
        return $this->checkout->get_cart_for_transaction($transaction);
    }


    /**
     * @param EE_Transaction|null $transaction
     * @return EE_Cart
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_cart_for_transaction(?EE_Transaction $transaction): EE_Cart
    {
        return $this->checkout->get_cart_for_transaction($transaction);
    }


    /**
     * generates a new EE_Transaction object and adds it to the $_transaction property.
     *
     * @return EE_Transaction|null
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function _get_cart_for_current_session_and_setup_new_transaction(): ?EE_Transaction
    {
        //  if there's no transaction, then this is the FIRST visit to SPCO
        // so load up the cart ( passing nothing for the TXN because it doesn't exist yet )
        $this->checkout->cart = $this->_get_cart_for_transaction(null);
        // and then create a new transaction
        $transaction = $this->_initialize_transaction();
        // verify transaction
        if ($transaction instanceof EE_Transaction) {
            // and save TXN data to the cart
            $this->checkout->cart->get_grand_total()->save_this_and_descendants_to_txn($transaction->ID());
        } else {
            EE_Error::add_error(
                esc_html__('A Valid Transaction could not be initialized.', 'event_espresso'),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        }
        return $transaction;
    }


    /**
     * generates a new EE_Transaction object and adds it to the $_transaction property.
     *
     * @return EE_Transaction|null
     */
    private function _initialize_transaction(): ?EE_Transaction
    {
        try {
            // ensure cart totals have been calculated
            $this->checkout->cart->get_grand_total()->recalculate_total_including_taxes();
            // grab the cart grand total
            $cart_total = $this->checkout->cart->get_cart_grand_total();
            // create new TXN
            $transaction = EE_Transaction::new_instance(
                [
                    'TXN_reg_steps' => $this->checkout->initialize_txn_reg_steps_array(),
                    'TXN_total'     => max($cart_total, 0),
                    'TXN_paid'      => 0,
                    'STS_ID'        => EEM_Transaction::failed_status_code,
                ]
            );
            // save it so that we have an ID for other objects to use
            $transaction->save();
            // set cron job for following up on TXNs after their session has expired
            EE_Cron_Tasks::schedule_expired_transaction_check(
                $this->session->expiration() + 1,
                $transaction->ID()
            );
            return $transaction;
        } catch (Exception $e) {
            EE_Error::add_error($e->getMessage(), __FILE__, __FUNCTION__, __LINE__);
        }
        return null;
    }


    /**
     * _get_registrations
     *
     * @param EE_Transaction $transaction
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function _get_registrations(EE_Transaction $transaction)
    {
        // first step: grab the registrants  { : o
        $registrations                      = $transaction->registrations($this->checkout->reg_cache_where_params);
        $this->checkout->total_ticket_count = count($registrations);
        // verify registrations have been set
        if (empty($registrations)) {
            // if no cached registrations, then check the db
            $registrations = $transaction->registrations($this->checkout->reg_cache_where_params);
            // still nothing ? well as long as this isn't a revisit
            if (empty($registrations) && ! $this->checkout->revisit) {
                // generate new registrations from scratch
                $registrations = $this->_initialize_registrations($transaction);
            }
        }
        // sort by their original registration order
        usort($registrations, ['EED_Single_Page_Checkout', 'sort_registrations_by_REG_count']);
        // then loop thru the array
        foreach ($registrations as $registration) {
            // verify each registration
            if ($registration instanceof EE_Registration) {
                // we display all attendee info for the primary registrant
                if (
                    $this->checkout->reg_url_link === $registration->reg_url_link()
                    && $registration->is_primary_registrant()
                ) {
                    $this->checkout->primary_revisit = true;
                    break;
                }
                if ($this->checkout->revisit && $this->checkout->reg_url_link !== $registration->reg_url_link()) {
                    // but hide info if it doesn't belong to you
                    $transaction->clear_cache('Registration', $registration->ID());
                    $this->checkout->total_ticket_count--;
                }
                $this->checkout->set_reg_status_updated($registration->ID(), false);
            }
        }
    }


    /**
     * adds related EE_Registration objects for each ticket in the cart to the current EE_Transaction object
     *
     * @param EE_Transaction $transaction
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function _initialize_registrations(EE_Transaction $transaction): array
    {
        $att_nmbr      = 0;
        $registrations = [];
        /** @type EE_Registration_Processor $registration_processor */
        $registration_processor             = EE_Registry::instance()->load_class('Registration_Processor');
        $this->checkout->total_ticket_count = $this->checkout->cart->all_ticket_quantity_count();
        // now let's add the cart items to the $transaction
        foreach ($this->checkout->cart->get_tickets() as $line_item) {
            // do the following for each ticket of this type they selected
            for ($x = 1; $x <= $line_item->quantity(); $x++) {
                $att_nmbr++;
                /** @var CreateRegistrationCommand $CreateRegistrationCommand */
                $CreateRegistrationCommand = EE_Registry::instance()->create(
                    CreateRegistrationCommand::class,
                    [
                        $transaction,
                        $line_item,
                        $att_nmbr,
                        $this->checkout->total_ticket_count,
                    ]
                );
                // override capabilities for frontend registrations
                if ($this->request->isFrontend()) {
                    $CreateRegistrationCommand->setCapCheck(
                        new PublicCapabilities('', 'create_new_registration')
                    );
                }
                $registration = EE_Registry::instance()->BUS->execute($CreateRegistrationCommand);
                if (! $registration instanceof EE_Registration) {
                    throw new InvalidEntityException($registration, 'EE_Registration');
                }
                $registrations[ $registration->ID() ] = $registration;
            }
        }
        $registration_processor->fix_reg_final_price_rounding_issue($transaction);
        return $registrations;
    }


    /**
     * @param EE_Registration $reg_A
     * @param EE_Registration $reg_B
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function sort_registrations_by_REG_count(EE_Registration $reg_A, EE_Registration $reg_B): int
    {
        // this shouldn't ever happen within the same TXN, but oh well
        if ($reg_A->count() === $reg_B->count()) {
            return 0;
        }
        return ($reg_A->count() > $reg_B->count()) ? 1 : -1;
    }


    /**
     * just makes sure that everything is set up correctly before proceeding
     *
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function _final_verifications(): bool
    {
        // filter checkout
        $this->checkout = apply_filters(
            'FHEE__EED_Single_Page_Checkout___final_verifications__checkout',
            $this->checkout
        );
        // verify that current step is still set correctly
        if (! $this->checkout->current_step instanceof EE_SPCO_Reg_Step) {
            EE_Error::add_error(
                esc_html__(
                    'We\'re sorry but the registration process can not proceed because one or more registration steps were not setup correctly. Please refresh the page and try again or contact support.',
                    'event_espresso'
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            return false;
        }
        // if returning to SPCO, then verify that primary registrant is set
        if (! empty($this->checkout->reg_url_link)) {
            $valid_registrant = $this->checkout->transaction->primary_registration();
            if (! $valid_registrant instanceof EE_Registration) {
                EE_Error::add_error(
                    esc_html__(
                        'We\'re sorry but there appears to be an error with the "reg_url_link" or the primary registrant for this transaction. Please refresh the page and try again or contact support.',
                        'event_espresso'
                    ),
                    __FILE__,
                    __FUNCTION__,
                    __LINE__
                );
                return false;
            }
            $valid_registrant = null;
            foreach (
                $this->checkout->transaction->registrations(
                    $this->checkout->reg_cache_where_params
                ) as $registration
            ) {
                if (
                    $registration instanceof EE_Registration
                    && $registration->reg_url_link() === $this->checkout->reg_url_link
                ) {
                    $valid_registrant = $registration;
                }
            }
            if (! $valid_registrant instanceof EE_Registration) {
                // hmmm... maybe we have the wrong session because the user is opening multiple tabs ?
                if (EED_Single_Page_Checkout::$_checkout_verified) {
                    // clear the session, mark the checkout as unverified, and try again
                    $this->session->clear_session(__CLASS__, __FUNCTION__);
                    EED_Single_Page_Checkout::$_initialized       = false;
                    EED_Single_Page_Checkout::$_checkout_verified = false;
                    $this->_initialize();
                    EE_Error::reset_notices();
                    return false;
                }
                EE_Error::add_error(
                    esc_html__(
                        'We\'re sorry but there appears to be an error with the "reg_url_link" or the transaction itself. Please refresh the page and try again or contact support.',
                        'event_espresso'
                    ),
                    __FILE__,
                    __FUNCTION__,
                    __LINE__
                );
                return false;
            }
        }
        // now that things have been kinda sufficiently verified,
        // let's add the checkout to the session so that it's available to other systems
        $this->session->set_checkout($this->checkout);
        return true;
    }


    /**
     * first makes sure that EE_Transaction_Processor::set_reg_step_initiated() is called as required
     * then loops thru all the active reg steps and calls the initialize_reg_step() method
     *
     * @param bool $reinitializing
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function _initialize_reg_steps(bool $reinitializing = false)
    {
        $this->checkout->set_reg_step_initiated($this->checkout->current_step);
        // loop thru all steps to call their individual "initialize" methods and set i18n strings for JS
        foreach ($this->checkout->reg_steps as $reg_step) {
            if (! $reg_step->initialize_reg_step()) {
                // if not initialized then maybe this step is being removed...
                if (! $reinitializing && $reg_step->is_current_step()) {
                    // if it was the current step, then we need to start over here
                    $this->_initialize_reg_steps(true);
                    return;
                }
                continue;
            }
            // add css and JS for current step
            $this->add_styles_and_scripts($reg_step);
            if ($reg_step->is_current_step()) {
                // the text that appears on the reg step form submit button
                $reg_step->set_submit_button_text();
            }
        }
        // dynamically creates hook point like: AHEE__Single_Page_Checkout___initialize_reg_step__attendee_information
        do_action(
            "AHEE__Single_Page_Checkout___initialize_reg_step__{$this->checkout->current_step->slug()}",
            $this->checkout->current_step
        );
        $this->checkout->json_response->set_return_data(
            [
                'action'        => $this->checkout->action,
                'admin_request' => $this->checkout->admin_request,
                'current_step'  => $this->checkout->current_step->slug(),
                'revisit'       => $this->checkout->revisit,
            ]
        );
    }


    /**
     * @return boolean
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function _check_form_submission(): bool
    {
        // does this request require the reg form to be generated ?
        if ($this->checkout->generate_reg_form) {
            // ever heard that song by Blue Rodeo ?
            try {
                $this->checkout->current_step->reg_form = $this->checkout->current_step->generate_reg_form();
                // if not displaying a form, then check for form submission
                if (
                    $this->checkout->process_form_submission
                    && $this->checkout->current_step->reg_form->was_submitted()
                ) {
                    // clear out any old data in case this step is being run again
                    $this->checkout->current_step->set_valid_data([]);
                    // capture submitted form data
                    $request_data = $this->request->requestParams();
                    $this->checkout->current_step->reg_form->receive_form_submission(
                        (array) apply_filters(
                            'FHEE__Single_Page_Checkout___check_form_submission__request_params',
                            $request_data,
                            $this->checkout
                        )
                    );
                    // validate submitted form data
                    if (! $this->checkout->continue_reg || ! $this->checkout->current_step->reg_form->is_valid()) {
                        // thou shall not pass !!!
                        $this->checkout->continue_reg = false;
                        // any form validation errors?
                        if ($this->checkout->current_step->reg_form->submission_error_message() !== '') {
                            EE_Error::add_error(
                                $this->checkout->current_step->reg_form->submission_error_message(),
                                __FILE__,
                                __FUNCTION__,
                                __LINE__
                            );
                        }
                        // well not really... what will happen is
                        // we'll just get redirected back to redo the current step
                        $this->go_to_next_step();
                        return false;
                    }
                }
            } catch (EE_Error $e) {
                $e->get_error();
            }
        }
        return true;
    }


    /**
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function _process_form_action()
    {
        // what cha wanna do?
        switch ($this->checkout->action) {
            // AJAX next step reg form
            case 'display_spco_reg_step':
                $this->checkout->redirect = false;
                if ($this->request->isAjax()) {
                    $this->checkout->json_response->set_reg_step_html(
                        $this->checkout->current_step->display_reg_form()
                    );
                }
                break;
            default:
                // meh... do one of those other steps first
                if (
                    ! empty($this->checkout->action)
                    && is_callable([$this->checkout->current_step, $this->checkout->action])
                ) {
                    // dynamically creates hook point like:
                    //   AHEE__Single_Page_Checkout__before_attendee_information__process_reg_step
                    do_action(
                        "AHEE__Single_Page_Checkout__before_{$this->checkout->current_step->slug()}__{$this->checkout->action}",
                        $this->checkout->current_step
                    );
                    $process_reg_step = apply_filters(
                        "AHEE__Single_Page_Checkout__process_reg_step__{$this->checkout->current_step->slug()}__{$this->checkout->action}",
                        true,
                        $this->checkout->current_step,
                        $this
                    );
                    // call action on current step
                    if ($process_reg_step && call_user_func([$this->checkout->current_step, $this->checkout->action])) {
                        // good registrant, you get to proceed
                        if (
                            $this->checkout->current_step->success_message() !== ''
                            && apply_filters(
                                'FHEE__Single_Page_Checkout___process_form_action__display_success',
                                false
                            )
                        ) {
                            EE_Error::add_success(
                                $this->checkout->current_step->success_message()
                                . '<br />' . $this->checkout->next_step->_instructions()
                            );
                        }
                        // pack it up, pack it in...
                        $this->_setup_redirect();
                    }
                    // dynamically creates hook point like:
                    //  AHEE__Single_Page_Checkout__after_payment_options__process_reg_step
                    do_action(
                        "AHEE__Single_Page_Checkout__after_{$this->checkout->current_step->slug()}__{$this->checkout->action}",
                        $this->checkout->current_step
                    );
                } else {
                    EE_Error::add_error(
                        sprintf(
                            esc_html__(
                                'The requested form action "%s" does not exist for the current "%s" registration step.',
                                'event_espresso'
                            ),
                            $this->checkout->action,
                            $this->checkout->current_step->name()
                        ),
                        __FILE__,
                        __FUNCTION__,
                        __LINE__
                    );
                }
            // end default
        }
        // store our progress so far
        $this->checkout->stash_transaction_and_checkout();
        // advance to the next step! If you pass GO, collect $200
        $this->go_to_next_step();
    }


    /**
     * @param EED_Single_Page_Checkout|EE_SPCO_Reg_Step $target an object with the method `translate_js_strings` and
     *                                                          `enqueue_styles_and_scripts`.
     * @return void
     */
    public function add_styles_and_scripts($target)
    {
        // i18n
        $target->translate_js_strings();
        if ($this->checkout->admin_request) {
            add_action('admin_enqueue_scripts', [$target, 'enqueue_styles_and_scripts']);
        } else {
            add_action('wp_enqueue_scripts', [$target, 'enqueue_styles_and_scripts']);
        }
    }


    /**
     * @return void
     */
    public function translate_js_strings()
    {
        EE_Registry::$i18n_js_strings['revisit']                        = $this->checkout->revisit;
        EE_Registry::$i18n_js_strings['e_reg_url_link']                 = $this->checkout->reg_url_link;
        EE_Registry::$i18n_js_strings['server_error']                   = esc_html__(
            'An unknown error occurred on the server while attempting to process your request. Please refresh the page and try again or contact support.',
            'event_espresso'
        );
        EE_Registry::$i18n_js_strings['invalid_json_response']          = esc_html__(
            'An invalid response was returned from the server while attempting to process your request. Please refresh the page and try again or contact support.',
            'event_espresso'
        );
        EE_Registry::$i18n_js_strings['validation_error']               = esc_html__(
            'There appears to be a problem with the form validation configuration! Please check the admin settings or contact support.',
            'event_espresso'
        );
        EE_Registry::$i18n_js_strings['invalid_payment_method']         = esc_html__(
            'There appears to be a problem with the payment method configuration! Please refresh the page and try again or contact support.',
            'event_espresso'
        );
        EE_Registry::$i18n_js_strings['reg_step_error']                 = esc_html__(
            'This registration step could not be completed. Please refresh the page and try again.',
            'event_espresso'
        );
        EE_Registry::$i18n_js_strings['invalid_coupon']                 = esc_html__(
            'We\'re sorry but that coupon code does not appear to be valid. If this is incorrect, please contact the site administrator.',
            'event_espresso'
        );
        EE_Registry::$i18n_js_strings['process_registration']           = sprintf(
            esc_html__(
                'Please wait while we process your registration.%sDo not refresh the page or navigate away while this is happening.%sThank you for your patience.',
                'event_espresso'
            ),
            '<br/>',
            '<br/>'
        );
        EE_Registry::$i18n_js_strings['language']                       = get_bloginfo('language');
        EE_Registry::$i18n_js_strings['EESID']                          = $this->session->id();
        EE_Registry::$i18n_js_strings['currency']                       = EE_Registry::instance()->CFG->currency;
        EE_Registry::$i18n_js_strings['datepicker_yearRange']           = '-150:+20';
        EE_Registry::$i18n_js_strings['timer_years']                    = esc_html__('years', 'event_espresso');
        EE_Registry::$i18n_js_strings['timer_months']                   = esc_html__('months', 'event_espresso');
        EE_Registry::$i18n_js_strings['timer_weeks']                    = esc_html__('weeks', 'event_espresso');
        EE_Registry::$i18n_js_strings['timer_days']                     = esc_html__('days', 'event_espresso');
        EE_Registry::$i18n_js_strings['timer_hours']                    = esc_html__('hours', 'event_espresso');
        EE_Registry::$i18n_js_strings['timer_minutes']                  = esc_html__('minutes', 'event_espresso');
        EE_Registry::$i18n_js_strings['timer_seconds']                  = esc_html__('seconds', 'event_espresso');
        EE_Registry::$i18n_js_strings['timer_year']                     = esc_html__('year', 'event_espresso');
        EE_Registry::$i18n_js_strings['timer_month']                    = esc_html__('month', 'event_espresso');
        EE_Registry::$i18n_js_strings['timer_week']                     = esc_html__('week', 'event_espresso');
        EE_Registry::$i18n_js_strings['timer_day']                      = esc_html__('day', 'event_espresso');
        EE_Registry::$i18n_js_strings['timer_hour']                     = esc_html__('hour', 'event_espresso');
        EE_Registry::$i18n_js_strings['timer_minute']                   = esc_html__('minute', 'event_espresso');
        EE_Registry::$i18n_js_strings['timer_second']                   = esc_html__('second', 'event_espresso');
        EE_Registry::$i18n_js_strings['registration_expiration_notice'] =
            EED_Single_Page_Checkout::getRegistrationExpirationNotice();
        EE_Registry::$i18n_js_strings['ajax_submit']                    = apply_filters(
            'FHEE__Single_Page_Checkout__translate_js_strings__ajax_submit',
            true
        );
        EE_Registry::$i18n_js_strings['session_extension']              = absint(
            apply_filters('FHEE__EE_Session__extend_expiration__seconds_added', 10 * MINUTE_IN_SECONDS)
        );
        EE_Registry::$i18n_js_strings['session_expiration']    = $this->session->expiration();
        EE_Registry::$i18n_js_strings['use_session_countdown'] = EE_Registry::instance()->CFG->registration->useSessionCountdown();
        EE_Registry::$i18n_js_strings['no_copy_paste_email_confirm'] = esc_html__("We're sorry but copy and paste is disabled for email confirmation inputs. Please enter the email address manually.", 'event_espresso');
    }


    /**
     * @return void
     * @throws EE_Error
     */
    public function enqueue_styles_and_scripts()
    {
        // load css
        wp_register_style(
            'single_page_checkout',
            SPCO_CSS_URL . 'single_page_checkout.css',
            ['espresso_default'],
            EVENT_ESPRESSO_VERSION
        );
        wp_enqueue_style('single_page_checkout');
        // load JS
        wp_register_script(
            'single_page_checkout',
            SPCO_JS_URL . 'single_page_checkout.js',
            ['espresso_core', 'underscore', 'ee_form_section_validation'],
            EVENT_ESPRESSO_VERSION,
            true
        );
        if ($this->checkout->registration_form instanceof EE_Form_Section_Proper) {
            $this->checkout->registration_form->enqueue_js();
        }
        if ($this->checkout->current_step->reg_form instanceof EE_Form_Section_Proper) {
            $this->checkout->current_step->reg_form->enqueue_js();
        }
        wp_enqueue_script('single_page_checkout');
        /**
         * global action hook for enqueueing styles and scripts with
         * spco calls.
         */
        do_action('AHEE__EED_Single_Page_Checkout__enqueue_styles_and_scripts', $this);
        /**
         * dynamic action hook for enqueueing styles and scripts with spco calls.
         * The hook will end up being something like:
         *      AHEE__EED_Single_Page_Checkout__enqueue_styles_and_scripts__attendee_information
         */
        do_action(
            'AHEE__EED_Single_Page_Checkout__enqueue_styles_and_scripts__' . $this->checkout->current_step->slug(),
            $this
        );
    }


    /**
     * display the Registration Single Page Checkout Form
     *
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function _display_spco_reg_form()
    {
        // if registering via the admin, just display the reg form for the current step
        if ($this->checkout->admin_request) {
            EED_Single_Page_Checkout::getResponse()->addOutput($this->checkout->current_step->display_reg_form());
            return;
        }

        // add powered by EE msg
        add_action('AHEE__SPCO__reg_form_footer', ['EED_Single_Page_Checkout', 'display_registration_footer']);
        $empty_cart = count(
                $this->checkout->transaction->registrations($this->checkout->reg_cache_where_params)
            ) < 1;
        EE_Registry::$i18n_js_strings['empty_cart'] = $empty_cart;

        /** @var FeatureFlags $feature */
        $feature = LoaderFactory::getShared(FeatureFlags::class);

        $this->checkout->registration_form = $feature->allowed(FeatureFlag::USE_SPCO_FORM_REFACTOR)
            ? new SinglePageCheckoutForm($this->checkout, $empty_cart)
            : new LegacySpcoForm($this->checkout, $empty_cart, $this->session->expiration());

        // load template and add to output sent that gets filtered into the_content()
        EED_Single_Page_Checkout::getResponse()->addOutput($this->checkout->registration_form->get_html());

    }


    /**
     * @param $next_step
     * @return void
     */
    public function add_extra_finalize_registration_inputs($next_step)
    {
        if ($next_step === 'finalize_registration') {
            echo '<div id="spco-extra-finalize_registration-inputs-dv"></div>';
        }
    }


    /**
     * @return void
     */
    public static function display_registration_footer()
    {
        if (
            apply_filters(
                'FHEE__EE_Front__Controller__show_reg_footer',
                EE_Registry::instance()->CFG->admin->show_reg_footer
            )
        ) {
            add_filter(
                'FHEE__EEH_Template__powered_by_event_espresso__url',
                function ($url) {
                    return apply_filters('FHEE__EE_Front_Controller__registration_footer__url', $url);
                }
            );
            echo apply_filters(
                'FHEE__EE_Front_Controller__display_registration_footer',
                EEH_Template::powered_by_event_espresso(
                    '',
                    'espresso-registration-footer-dv',
                    ['utm_content' => 'registration_checkout']
                )
            );
        }
    }


    /**
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function unlock_transaction()
    {
        if ($this->checkout instanceof EE_Checkout && $this->checkout->transaction instanceof EE_Transaction) {
            $this->checkout->transaction->unlock();
        }
    }


    /**
     * @return void
     */
    private function _setup_redirect()
    {
        if ($this->checkout->continue_reg && $this->checkout->next_step instanceof EE_SPCO_Reg_Step) {
            $this->checkout->redirect = true;
            if (empty($this->checkout->redirect_url)) {
                $this->checkout->redirect_url = $this->checkout->next_step->reg_step_url();
            }
            $this->checkout->redirect_url = apply_filters(
                'FHEE__EED_Single_Page_Checkout___setup_redirect__checkout_redirect_url',
                $this->checkout->redirect_url,
                $this->checkout
            );
        }
    }


    /**
     * handle ajax message responses and redirects
     *
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function go_to_next_step()
    {
        if ($this->request->isAjax()) {
            // capture contents of output buffer we started earlier in the request, and insert into JSON response
            $this->checkout->json_response->set_unexpected_errors(ob_get_clean());
        }
        $this->unlock_transaction();
        // just return for these conditions
        if (
            $this->checkout->admin_request
            || $this->checkout->action === 'redirect_form'
            || $this->checkout->action === 'update_checkout'
        ) {
            return;
        }
        // AJAX response
        $this->_handle_json_response();
        // redirect to next step or the Thank-You page
        $this->_handle_html_redirects();
        // hmmm... must be something wrong, so let's just display the form again !
        $this->_display_spco_reg_form();
    }


    /**
     * @return void
     */
    protected function _handle_json_response()
    {
        // if this is an ajax request
        if ($this->request->isAjax()) {
            $this->checkout->json_response->set_registration_time_limit(
                $this->checkout->get_registration_time_limit()
            );
            $this->checkout->json_response->set_payment_amount($this->checkout->amount_owing);
            /** @var EE_SPCO_JSON_Response $json_response */
            $json_response = apply_filters(
                'FHEE__EE_Single_Page_Checkout__JSON_response',
                $this->checkout->json_response
            );
            // just send the ajax
            $json_response->sendResponse();
        }
    }


    /**
     * @return void
     */
    protected function _handle_html_redirects()
    {
        // going somewhere ?
        if ($this->checkout->redirect && ! empty($this->checkout->redirect_url)) {
            // store notices in a transient
            EE_Error::get_notices(false, true);
            wp_safe_redirect($this->checkout->redirect_url);
            exit();
        }
    }


    /**
     * @return void
     */
    public function set_checkout_anchor()
    {
        echo '<a id="checkout" style="float: left; margin-left: -999em;"></a>';
    }


    /**
     * @return string
     * @since 4.9.59.p
     */
    public static function getRegistrationExpirationNotice(): string
    {
        return sprintf(
            esc_html__(
                '%1$sWe\'re sorry, but your registration time has expired.%2$s%3$s%4$sIf you still wish to complete your registration, please return to the %5$sEvent List%6$sEvent List%7$s and reselect your tickets if available. Please accept our apologies for any inconvenience this may have caused.%8$s',
                'event_espresso'
            ),
            '<h4 class="important-notice">',
            '</h4>',
            '<br />',
            '<p>',
            '<a href="' . get_post_type_archive_link(EspressoPostType::EVENTS) . '" title="',
            '">',
            '</a>',
            '</p>'
        );
    }
}
