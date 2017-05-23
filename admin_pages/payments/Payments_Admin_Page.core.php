<?php
if (! defined('EVENT_ESPRESSO_VERSION')) {
    exit('NO direct script access allowed');
}



/**
 * Event Espresso
 * Event Registration and Management Plugin for Wordpress
 *
 * @package         Event Espresso
 * @author          Seth Shoultes
 * @copyright    (c)2009-2012 Event Espresso All Rights Reserved.
 * @license         http://eventespresso.com/support/terms-conditions/  ** see Plugin Licensing **
 * @link            http://www.eventespresso.com
 * @version         4.0
 *                  ------------------------------------------------------------------------
 *                  Payments_Admin_Page
 *                  This contains the logic for setting up the Event Payments related admin pages.  Any methods without
 *                  phpdoc comments have inline docs with parent class.
 * @package         Payments_Admin_Page
 * @subpackage      includes/core/admin/Payments_Admin_Page.core.php
 * @author          Darren Ethier
 *                  ------------------------------------------------------------------------
 */
class Payments_Admin_Page extends EE_Admin_Page
{

    /**
     * Variables used for when we're re-sorting the logs results, in case
     * we needed to do two queries and we need to resort
     *
     * @var string
     */
    private $_sort_logs_again_direction;



    /**
     * @Constructor
     * @access public
     * @param bool $routing indicate whether we want to just load the object and handle routing or just load the object.
     * @return \Payments_Admin_Page
     */
    public function __construct($routing = true)
    {
        parent::__construct($routing);
    }



    protected function _init_page_props()
    {
        $this->page_slug = EE_PAYMENTS_PG_SLUG;
        $this->page_label = __('Payment Methods', 'event_espresso');
        $this->_admin_base_url = EE_PAYMENTS_ADMIN_URL;
        $this->_admin_base_path = EE_PAYMENTS_ADMIN;
    }



    protected function _ajax_hooks()
    {
        //todo: all hooks for ajax goes here.
    }



    protected function _define_page_props()
    {
        $this->_admin_page_title = $this->page_label;
        $this->_labels = array(
            'publishbox' => __('Update Settings', 'event_espresso'),
        );
    }



    protected function _set_page_routes()
    {
        /**
         * note that with payment method capabilities, although we've implemented
         * capability mapping which will be used for accessing payment methods owned by
         * other users.  This is not fully implemented yet in the payment method ui.
         * Currently only the "plural" caps are in active use.
         * When cap mapping is implemented, some routes will need to use the singular form of
         * capability method and also include the $id of the payment method for the route.
         **/
        $this->_page_routes = array(
            'default'                   => array(
                'func'       => '_payment_methods_list',
                'capability' => 'ee_edit_payment_methods',
            ),
            'payment_settings'          => array(
                'func'       => '_payment_settings',
                'capability' => 'ee_manage_gateways',
            ),
            'activate_payment_method'   => array(
                'func'       => '_activate_payment_method',
                'noheader'   => true,
                'capability' => 'ee_edit_payment_methods',
            ),
            'deactivate_payment_method' => array(
                'func'       => '_deactivate_payment_method',
                'noheader'   => true,
                'capability' => 'ee_delete_payment_methods',
            ),
            'update_payment_method'     => array(
                'func'               => '_update_payment_method',
                'noheader'           => true,
                'headers_sent_route' => 'default',
                'capability'         => 'ee_edit_payment_methods',
            ),
            'update_payment_settings'   => array(
                'func'       => '_update_payment_settings',
                'noheader'   => true,
                'capability' => 'ee_manage_gateways',
            ),
            'payment_log'               => array(
                'func'       => '_payment_log_overview_list_table',
                'capability' => 'ee_read_payment_methods',
            ),
            'payment_log_details'       => array(
                'func'       => '_payment_log_details',
                'capability' => 'ee_read_payment_methods',
            ),
        );
    }



    protected function _set_page_config()
    {
        $payment_method_list_config = array(
            'nav'           => array(
                'label' => __('Payment Methods', 'event_espresso'),
                'order' => 10,
            ),
            'metaboxes'     => $this->_default_espresso_metaboxes,
            'help_tabs'     => array_merge(
                array(
                    'payment_methods_overview_help_tab' => array(
                        'title'    => __('Payment Methods Overview', 'event_espresso'),
                        'filename' => 'payment_methods_overview',
                    ),
                ),
                $this->_add_payment_method_help_tabs()),
            'help_tour'     => array('Payment_Methods_Selection_Help_Tour'),
            'require_nonce' => false,
        );
        $this->_page_config = array(
            'default'          => $payment_method_list_config,
            'payment_settings' => array(
                'nav'           => array(
                    'label' => __('Settings', 'event_espresso'),
                    'order' => 20,
                ),
                'help_tabs'     => array(
                    'payment_methods_settings_help_tab' => array(
                        'title'    => __('Payment Method Settings', 'event_espresso'),
                        'filename' => 'payment_methods_settings',
                    ),
                ),
                //'help_tour' => array( 'Payment_Methods_Settings_Help_Tour' ),
                'metaboxes'     => array_merge($this->_default_espresso_metaboxes, array('_publish_post_box')),
                'require_nonce' => false,
            ),
            'payment_log'      => array(
                'nav'           => array(
                    'label' => __("Logs", 'event_espresso'),
                    'order' => 30,
                ),
                'list_table'    => 'Payment_Log_Admin_List_Table',
                'metaboxes'     => $this->_default_espresso_metaboxes,
                'require_nonce' => false,
            ),
        );
    }



    /**
     * @return array
     */
    protected function _add_payment_method_help_tabs()
    {
        EE_Registry::instance()->load_lib('Payment_Method_Manager');
        $payment_method_types = EE_Payment_Method_Manager::instance()->payment_method_types();
        $all_pmt_help_tabs_config = array();
        foreach ($payment_method_types as $payment_method_type) {
            if (! EE_Registry::instance()->CAP->current_user_can($payment_method_type->cap_name(),
                'specific_payment_method_type_access')
            ) {
                continue;
            }
            foreach ($payment_method_type->help_tabs_config() as $help_tab_name => $config) {
                $template_args = isset($config['template_args']) ? $config['template_args'] : array();
                $template_args['admin_page_obj'] = $this;
                $all_pmt_help_tabs_config[$help_tab_name] = array(
                    'title'   => $config['title'],
                    'content' => EEH_Template::display_template(
                        $payment_method_type->file_folder() . 'help_tabs' . DS . $config['filename'] . '.help_tab.php',
                        $template_args,
                        true),
                );
            }
        }
        return $all_pmt_help_tabs_config;
    }



    //none of the below group are currently used for Gateway Settings
    protected function _add_screen_options()
    {
    }



    protected function _add_feature_pointers()
    {
    }



    public function admin_init()
    {
    }



    public function admin_notices()
    {
    }



    public function admin_footer_scripts()
    {
    }



    public function load_scripts_styles()
    {
        wp_enqueue_script('ee_admin_js');
        wp_enqueue_script('ee-text-links');
        wp_enqueue_script('espresso_payments', EE_PAYMENTS_ASSETS_URL . 'espresso_payments_admin.js',
            array('espresso-ui-theme', 'ee-datepicker'), EVENT_ESPRESSO_VERSION, true);
    }



    public function load_scripts_styles_default()
    {
        //styles
        wp_register_style('espresso_payments', EE_PAYMENTS_ASSETS_URL . 'ee-payments.css', array(),
            EVENT_ESPRESSO_VERSION);
        wp_enqueue_style('espresso_payments');
        wp_enqueue_style('ee-text-links');
        //scripts
    }



    protected function _payment_methods_list()
    {
        /**
         * first let's ensure payment methods have been setup. We do this here because when people activate a
         * payment method for the first time (as an addon), it may not setup its capabilities or get registered correctly due
         * to the loading process.  However, people MUST setup the details for the payment method so its safe to do a
         * recheck here.
         */
        EE_Registry::instance()->load_lib('Payment_Method_Manager');
        EEM_Payment_Method::instance()->verify_button_urls();
        //setup tabs, one for each payment method type
        $tabs = array();
        $payment_methods = array();
        foreach (EE_Payment_Method_Manager::instance()->payment_method_types() as $pmt_obj) {
            // we don't want to show admin-only PMTs for now
            if ($pmt_obj instanceof EE_PMT_Admin_Only) {
                continue;
            }
            //check access
            if (! EE_Registry::instance()->CAP->current_user_can($pmt_obj->cap_name(),
                'specific_payment_method_type_access')
            ) {
                continue;
            }
            //check for any active pms of that type
            $payment_method = EEM_Payment_Method::instance()->get_one_of_type($pmt_obj->system_name());
            if (! $payment_method instanceof EE_Payment_Method) {
                $payment_method = EE_Payment_Method::new_instance(
                    array(
                        'PMD_slug'       => sanitize_key($pmt_obj->system_name()),
                        'PMD_type'       => $pmt_obj->system_name(),
                        'PMD_name'       => $pmt_obj->pretty_name(),
                        'PMD_admin_name' => $pmt_obj->pretty_name(),
                    )
                );
            }
            $payment_methods[$payment_method->slug()] = $payment_method;
        }
        $payment_methods = apply_filters('FHEE__Payments_Admin_Page___payment_methods_list__payment_methods',
            $payment_methods);
        foreach ($payment_methods as $payment_method) {
            if ($payment_method instanceof EE_Payment_Method) {
                add_meta_box(
                //html id
                    'espresso_' . $payment_method->slug() . '_payment_settings',
                    //title
                    sprintf(__('%s Settings', 'event_espresso'), $payment_method->admin_name()),
                    //callback
                    array($this, 'payment_method_settings_meta_box'),
                    //post type
                    null,
                    //context
                    'normal',
                    //priority
                    'default',
                    //callback args
                    array('payment_method' => $payment_method)
                );
                //setup for tabbed content
                $tabs[$payment_method->slug()] = array(
                    'label' => $payment_method->admin_name(),
                    'class' => $payment_method->active() ? 'gateway-active' : '',
                    'href'  => 'espresso_' . $payment_method->slug() . '_payment_settings',
                    'title' => __('Modify this Payment Method', 'event_espresso'),
                    'slug'  => $payment_method->slug(),
                );
            }
        }
        $this->_template_args['admin_page_header'] = EEH_Tabbed_Content::tab_text_links($tabs, 'payment_method_links',
            '|', $this->_get_active_payment_method_slug());
        $this->display_admin_page_with_sidebar();
    }



    /**
     *   _get_active_payment_method_slug
     *
     * @return string
     */
    protected function _get_active_payment_method_slug()
    {
        $payment_method_slug = false;
        //decide which payment method tab to open first, as dictated by the request's 'payment_method'
        if (isset($this->_req_data['payment_method'])) {
            // if they provided the current payment method, use it
            $payment_method_slug = sanitize_key($this->_req_data['payment_method']);
        }
        $payment_method = EEM_Payment_Method::instance()->get_one(array(array('PMD_slug' => $payment_method_slug)));
        // if that didn't work or wasn't provided, find another way to select the current pm
        if (! $this->_verify_payment_method($payment_method)) {
            // like, looking for an active one
            $payment_method = EEM_Payment_Method::instance()->get_one_active('CART');
            // test that one as well
            if ($this->_verify_payment_method($payment_method)) {
                $payment_method_slug = $payment_method->slug();
            } else {
                $payment_method_slug = 'paypal_standard';
            }
        }
        return $payment_method_slug;
    }



    /**
     *    payment_method_settings_meta_box
     *    returns TRUE if the passed payment method is properly constructed and the logged in user has the correct
     *    capabilities to access it
     *
     * @param \EE_Payment_Method $payment_method
     * @return boolean
     */
    protected function _verify_payment_method($payment_method)
    {
        if (
            $payment_method instanceof EE_Payment_Method && $payment_method->type_obj() instanceof EE_PMT_Base
            && EE_Registry::instance()->CAP->current_user_can($payment_method->type_obj()->cap_name(),
                'specific_payment_method_type_access')
        ) {
            return true;
        }
        return false;
    }



    /**
     *    payment_method_settings_meta_box
     *
     * @param NULL  $post_obj_which_is_null is an object containing the current post (as a $post object)
     * @param array $metabox                is an array with metabox id, title, callback, and args elements. the value
     *                                      at 'args' has key 'payment_method', as set within _payment_methods_list
     * @return string
     * @throws EE_Error
     */
    public function payment_method_settings_meta_box($post_obj_which_is_null, $metabox)
    {
        $payment_method = isset($metabox['args'], $metabox['args']['payment_method'])
            ? $metabox['args']['payment_method'] : null;
        if (! $payment_method instanceof EE_Payment_Method) {
            throw new EE_Error(sprintf(__('Payment method metabox setup incorrectly. No Payment method object was supplied',
                'event_espresso')));
        }
        $payment_method_scopes = $payment_method->active();
        // if the payment method really exists show its form, otherwise the activation template
        if ($payment_method->ID() && ! empty($payment_method_scopes)) {
            $form = $this->_generate_payment_method_settings_form($payment_method);
            if ($form->form_data_present_in($this->_req_data)) {
                $form->receive_form_submission($this->_req_data);
            }
            echo $form->form_open() . $form->get_html_and_js() . $form->form_close();
        } else {
            echo $this->_activate_payment_method_button($payment_method)->get_html_and_js();
        }
    }



    /**
     * Gets the form for all the settings related to this payment method type
     *
     * @access protected
     * @param \EE_Payment_Method $payment_method
     * @return \EE_Form_Section_Proper
     */
    protected function _generate_payment_method_settings_form(EE_Payment_Method $payment_method)
    {
        if (! $payment_method instanceof EE_Payment_Method) {
            return new EE_Form_Section_Proper();
        }
        return new EE_Form_Section_Proper(
            array(
                'name'            => $payment_method->slug() . '_settings_form',
                'html_id'         => $payment_method->slug() . '_settings_form',
                'action'          => EE_Admin_Page::add_query_args_and_nonce(
                    array(
                        'action'         => 'update_payment_method',
                        'payment_method' => $payment_method->slug(),
                    ),
                    EE_PAYMENTS_ADMIN_URL
                ),
                'layout_strategy' => new EE_Admin_Two_Column_Layout(),
                'subsections'     => apply_filters(
                    'FHEE__Payments_Admin_Page___generate_payment_method_settings_form__form_subsections',
                    array(
                        'pci_dss_compliance'      => $this->_pci_dss_compliance($payment_method),
                        'currency_support'        => $this->_currency_support($payment_method),
                        'payment_method_settings' => $this->_payment_method_settings($payment_method),
                        'update'                  => $this->_update_payment_method_button($payment_method),
                        'deactivate'              => $this->_deactivate_payment_method_button($payment_method),
                        'fine_print'              => $this->_fine_print(),
                    ),
                    $payment_method
                ),
            )
        );
    }



    /**
     * _pci_dss_compliance
     *
     * @access protected
     * @param \EE_Payment_Method $payment_method
     * @return \EE_Form_Section_Proper
     */
    protected function _pci_dss_compliance(EE_Payment_Method $payment_method)
    {
        if ($payment_method->type_obj()->requires_https()) {
            return new EE_Form_Section_HTML(
                EEH_HTML::tr(
                    EEH_HTML::th(
                        EEH_HTML::label(
                            EEH_HTML::strong(__('IMPORTANT', 'event_espresso'), '', 'important-notice')
                        )
                    ) .
                    EEH_HTML::td(
                        EEH_HTML::strong(__('You are responsible for your own website security and Payment Card Industry Data Security Standards (PCI DSS) compliance.',
                            'event_espresso'))
                        .
                        EEH_HTML::br()
                        .
                        __('Learn more about ', 'event_espresso')
                        . EEH_HTML::link('https://www.pcisecuritystandards.org/merchants/index.php',
                            __('PCI DSS compliance', 'event_espresso'))
                    )
                )
            );
        } else {
            return new EE_Form_Section_HTML('');
        }
    }



    /**
     * _currency_support
     *
     * @access protected
     * @param \EE_Payment_Method $payment_method
     * @return \EE_Form_Section_Proper
     */
    protected function _currency_support(EE_Payment_Method $payment_method)
    {
        if (! $payment_method->usable_for_currency(EE_Config::instance()->currency->code)) {
            return new EE_Form_Section_HTML(
                EEH_HTML::tr(
                    EEH_HTML::th(
                        EEH_HTML::label(
                            EEH_HTML::strong(__('IMPORTANT', 'event_espresso'), '', 'important-notice')
                        )
                    ) .
                    EEH_HTML::td(
                        EEH_HTML::strong(
                            sprintf(
                                __('This payment method does not support the currency set on your site (%1$s). Please activate a different payment method or change your site\'s country and associated currency.',
                                    'event_espresso'),
                                EE_Config::instance()->currency->code
                            )
                        )
                    )
                )
            );
        } else {
            return new EE_Form_Section_HTML('');
        }
    }



    /**
     * _update_payment_method_button
     *
     * @access protected
     * @param \EE_Payment_Method $payment_method
     * @return \EE_Form_Section_HTML
     */
    protected function _payment_method_settings(EE_Payment_Method $payment_method)
    {
        //modify the form so we only have/show fields that will be implemented for this version
        return $this->_simplify_form($payment_method->type_obj()->settings_form(), $payment_method->name());
    }



    /**
     * Simplifies the form to merely reproduce 4.1's gateway settings functionality
     *
     * @param EE_Form_Section_Proper $form_section
     * @param string                 $payment_method_name
     * @return \EE_Payment_Method_Form
     * @throws \EE_Error
     */
    protected function _simplify_form($form_section, $payment_method_name = '')
    {
        if ($form_section instanceof EE_Payment_Method_Form) {
            $form_section->exclude(
                array(
                    'PMD_type', //dont want them changing the type
                    'PMD_slug', //or the slug (probably never)
                    'PMD_wp_user', //or the user's ID
                    'Currency' //or the currency, until the rest of EE supports simultaneous currencies
                )
            );
            return $form_section;
        } else {
            throw new EE_Error(sprintf(__('The EE_Payment_Method_Form for the "%1$s" payment method is missing or invalid.',
                'event_espresso'), $payment_method_name));
        }
    }



    /**
     * _update_payment_method_button
     *
     * @access protected
     * @param \EE_Payment_Method $payment_method
     * @return \EE_Form_Section_HTML
     */
    protected function _update_payment_method_button(EE_Payment_Method $payment_method)
    {
        $update_button = new EE_Submit_Input(
            array(
                'name'       => 'submit',
                'html_id'    => 'save_' . $payment_method->slug() . '_settings',
                'default'    => sprintf(__('Update %s Payment Settings', 'event_espresso'),
                    $payment_method->admin_name()),
                'html_label' => EEH_HTML::nbsp(),
            )
        );
        return new EE_Form_Section_HTML(
            EEH_HTML::no_row(EEH_HTML::br(2)) .
            EEH_HTML::tr(
                EEH_HTML::th(__('Update Settings', 'event_espresso')) .
                EEH_HTML::td(
                    $update_button->get_html_for_input()
                )
            )
        );
    }



    /**
     * _deactivate_payment_method_button
     *
     * @access protected
     * @param \EE_Payment_Method $payment_method
     * @return \EE_Form_Section_Proper
     */
    protected function _deactivate_payment_method_button(EE_Payment_Method $payment_method)
    {
        $link_text_and_title = sprintf(__('Deactivate %1$s Payments?', 'event_espresso'),
            $payment_method->admin_name());
        return new EE_Form_Section_HTML(
            EEH_HTML::tr(
                EEH_HTML::th(__('Deactivate Payment Method', 'event_espresso')) .
                EEH_HTML::td(
                    EEH_HTML::link(
                        EE_Admin_Page::add_query_args_and_nonce(
                            array(
                                'action'         => 'deactivate_payment_method',
                                'payment_method' => $payment_method->slug(),
                            ),
                            EE_PAYMENTS_ADMIN_URL
                        ),
                        $link_text_and_title,
                        $link_text_and_title,
                        'deactivate_' . $payment_method->slug(),
                        'espresso-button button-secondary'
                    )
                )
            )
        );
    }



    /**
     * _activate_payment_method_button
     *
     * @access protected
     * @param \EE_Payment_Method $payment_method
     * @return \EE_Form_Section_Proper
     */
    protected function _activate_payment_method_button(EE_Payment_Method $payment_method)
    {
        $link_text_and_title = sprintf(__('Activate %1$s Payment Method?', 'event_espresso'),
            $payment_method->admin_name());
        return new EE_Form_Section_Proper(
            array(
                'name'            => 'activate_' . $payment_method->slug() . '_settings_form',
                'html_id'         => 'activate_' . $payment_method->slug() . '_settings_form',
                'action'          => '#',
                'layout_strategy' => new EE_Admin_Two_Column_Layout(),
                'subsections'     => apply_filters(
                    'FHEE__Payments_Admin_Page___activate_payment_method_button__form_subsections',
                    array(
                        new EE_Form_Section_HTML(
                            EEH_HTML::tr(
                                EEH_HTML::td($payment_method->type_obj()->introductory_html(),
                                    '',
                                    '',
                                    '',
                                    'colspan="2"'
                                )
                            ) .
                            EEH_HTML::tr(
                                EEH_HTML::th(
                                    EEH_HTML::label(__('Click to Activate ', 'event_espresso'))
                                ) .
                                EEH_HTML::td(
                                    EEH_HTML::link(
                                        EE_Admin_Page::add_query_args_and_nonce(
                                            array(
                                                'action'              => 'activate_payment_method',
                                                'payment_method_type' => $payment_method->type(),
                                            ),
                                            EE_PAYMENTS_ADMIN_URL
                                        ),
                                        $link_text_and_title,
                                        $link_text_and_title,
                                        'activate_' . $payment_method->slug(),
                                        'espresso-button-green button-primary'
                                    )
                                )
                            )
                        ),
                    ),
                    $payment_method
                ),
            )
        );
    }



    /**
     * _fine_print
     *
     * @access protected
     * @return \EE_Form_Section_HTML
     */
    protected function _fine_print()
    {
        return new EE_Form_Section_HTML(
            EEH_HTML::tr(
                EEH_HTML::th() .
                EEH_HTML::td(
                    EEH_HTML::p(__('All fields marked with a * are required fields', 'event_espresso'), '', 'grey-text')
                )
            )
        );
    }



    /**
     * Activates a payment method of that type. Mostly assuming there is only 1 of that type (or none so far)
     *
     * @global WP_User $current_user
     */
    protected function _activate_payment_method()
    {
        if (isset($this->_req_data['payment_method_type'])) {
            $payment_method_type = sanitize_text_field($this->_req_data['payment_method_type']);
            //see if one exists
            EE_Registry::instance()->load_lib('Payment_Method_Manager');
            $payment_method = EE_Payment_Method_Manager::instance()
                                                       ->activate_a_payment_method_of_type($payment_method_type);
            $this->_redirect_after_action(1, 'Payment Method', 'activated',
                array('action' => 'default', 'payment_method' => $payment_method->slug()));
        } else {
            $this->_redirect_after_action(false, 'Payment Method', 'activated', array('action' => 'default'));
        }
    }



    /**
     * Deactivates the payment method with the specified slug, and redirects.
     */
    protected function _deactivate_payment_method()
    {
        if (isset($this->_req_data['payment_method'])) {
            $payment_method_slug = sanitize_key($this->_req_data['payment_method']);
            //deactivate it
            EE_Registry::instance()->load_lib('Payment_Method_Manager');
            $count_updated = EE_Payment_Method_Manager::instance()->deactivate_payment_method($payment_method_slug);
            $this->_redirect_after_action($count_updated, 'Payment Method', 'deactivated',
                array('action' => 'default', 'payment_method' => $payment_method_slug));
        } else {
            $this->_redirect_after_action(false, 'Payment Method', 'deactivated', array('action' => 'default'));
        }
    }



    /**
     * Processes the payment method form that was submitted. This is slightly trickier than usual form
     * processing because we first need to identify WHICH form was processed and which payment method
     * it corresponds to. Once we have done that, we see if the form is valid. If it is, the
     * form's data is saved and we redirect to the default payment methods page, setting the updated payment method
     * as the currently-selected one. If it DOESN'T validate, we render the page with the form's errors (in the
     * subsequently called 'headers_sent_func' which is _payment_methods_list)
     *
     * @return void
     */
    protected function _update_payment_method()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            //ok let's find which gateway form to use based on the form input
            EE_Registry::instance()->load_lib('Payment_Method_Manager');
            /** @var $correct_pmt_form_to_use EE_Payment_Method_Form */
            $correct_pmt_form_to_use = null;
            $payment_method = null;
            foreach (EEM_Payment_Method::instance()->get_all() as $payment_method) {
                //get the form and simplify it, like what we do when we display it
                $pmt_form = $this->_generate_payment_method_settings_form($payment_method);
                if ($pmt_form->form_data_present_in($this->_req_data)) {
                    $correct_pmt_form_to_use = $pmt_form;
                    break;
                }
            }
            //if we couldn't find the correct payment method type...
            if (! $correct_pmt_form_to_use) {
                EE_Error::add_error(__("We could not find which payment method type your form submission related to. Please contact support",
                    'event_espresso'), __FILE__, __FUNCTION__, __LINE__);
                $this->_redirect_after_action(false, 'Payment Method', 'activated', array('action' => 'default'));
            }
            $correct_pmt_form_to_use->receive_form_submission($this->_req_data);
            if ($correct_pmt_form_to_use->is_valid()) {
                $payment_settings_subform = $correct_pmt_form_to_use->get_subsection('payment_method_settings');
                if (! $payment_settings_subform instanceof EE_Payment_Method_Form) {
                    throw new EE_Error(
                        sprintf(
                            __('The payment method could not be saved because the form sections were misnamed. We expected to find %1$s, but did not.',
                                'event_espresso'),
                            'payment_method_settings'
                        )
                    );
                }
                $payment_settings_subform->save();
                /** @var $pm EE_Payment_Method */
                $this->_redirect_after_action(true, 'Payment Method', 'updated',
                    array('action' => 'default', 'payment_method' => $payment_method->slug()));
            } else {
                EE_Error::add_error(
                    sprintf(
                        __('Payment method of type %s was not saved because there were validation errors. They have been marked in the form',
                            'event_espresso'),
                        $payment_method instanceof EE_PMT_Base ? $payment_method->pretty_name()
                            : __('"(unknown)"', 'event_espresso')
                    ),
                    __FILE__,
                    __FUNCTION__,
                    __LINE__
                );
            }
        }
        return;
    }



    protected function _payment_settings()
    {
        $this->_template_args['values'] = $this->_yes_no_values;
        $this->_template_args['show_pending_payment_options'] = isset(EE_Registry::instance()->CFG->registration->show_pending_payment_options)
            ? absint(EE_Registry::instance()->CFG->registration->show_pending_payment_options) : false;
        $this->_set_add_edit_form_tags('update_payment_settings');
        $this->_set_publish_post_box_vars(null, false, false, null, false);
        $this->_template_args['admin_page_content'] = EEH_Template::display_template(EE_PAYMENTS_TEMPLATE_PATH
                                                                                     . 'payment_settings.template.php',
            $this->_template_args, true);
        $this->display_admin_page_with_sidebar();
    }



    /**
     *        _update_payment_settings
     *
     * @access protected
     * @return array
     */
    protected function _update_payment_settings()
    {
        EE_Registry::instance()->CFG->registration->show_pending_payment_options = isset($this->_req_data['show_pending_payment_options'])
            ? $this->_req_data['show_pending_payment_options'] : false;
        EE_Registry::instance()->CFG = apply_filters('FHEE__Payments_Admin_Page___update_payment_settings__CFG',
            EE_Registry::instance()->CFG);
//		 $superform = new EE_Form_Section_Proper(
//		 	array(
//		 		'subsections' => array(
//		 			'phony' => new EE_Phone_Input()
//		 		)
//		 	)
//		 );
//		 $superform->receive_form_submission( $_POST );
//		 if ( ! $superform->is_valid() ) {
//		 	EE_Error::add_error(
//		 		__( "Super Form is invalid... but where are the inline error messages?", 'event_espresso' ),
//		 		__FILE__,
//		 		__FUNCTION__,
//		 		__LINE__
//		 	);
//		 	$this->_redirect_after_action( 0, 'settings', 'updated', array( 'action' => 'payment_settings' ) );
//		 }
        $what = __('Payment Settings', 'event_espresso');
        $success = $this->_update_espresso_configuration($what, EE_Registry::instance()->CFG, __FILE__, __FUNCTION__,
            __LINE__);
        $this->_redirect_after_action($success, $what, __('updated', 'event_espresso'),
            array('action' => 'payment_settings'));
    }



    protected function _payment_log_overview_list_table()
    {
//		$this->_search_btn_label = __('Payment Log', 'event_espresso');
        $this->display_admin_list_table_page_with_sidebar();
    }



    protected function _set_list_table_views_payment_log()
    {
        $this->_views = array(
            'all' => array(
                'slug'  => 'all',
                'label' => __('View All Logs', 'event_espresso'),
                'count' => 0,
            ),
        );
    }



    /**
     * @param int  $per_page
     * @param int  $current_page
     * @param bool $count
     * @return array
     */
    public function get_payment_logs($per_page = 50, $current_page = 0, $count = false)
    {
        EE_Registry::instance()->load_model('Change_Log');
        //we may need to do multiple queries (joining differently), so we actually wan tan array of query params
        $query_params = array(array('LOG_type' => EEM_Change_Log::type_gateway));
        //check if they've selected a specific payment method
        if (isset($this->_req_data['_payment_method']) && $this->_req_data['_payment_method'] !== 'all') {
            $query_params[0]['OR*pm_or_pay_pm'] = array(
                'Payment.Payment_Method.PMD_ID' => $this->_req_data['_payment_method'],
                'Payment_Method.PMD_ID'         => $this->_req_data['_payment_method'],
            );
        }
        //take into account search
        if (isset($this->_req_data['s']) && $this->_req_data['s']) {
            $similarity_string = array('LIKE', '%' . str_replace("", "%", $this->_req_data['s']) . '%');
            $query_params[0]['OR*s']['Payment.Transaction.Registration.Attendee.ATT_fname'] = $similarity_string;
            $query_params[0]['OR*s']['Payment.Transaction.Registration.Attendee.ATT_lname'] = $similarity_string;
            $query_params[0]['OR*s']['Payment.Transaction.Registration.Attendee.ATT_email'] = $similarity_string;
            $query_params[0]['OR*s']['Payment.Payment_Method.PMD_name'] = $similarity_string;
            $query_params[0]['OR*s']['Payment.Payment_Method.PMD_admin_name'] = $similarity_string;
            $query_params[0]['OR*s']['Payment.Payment_Method.PMD_type'] = $similarity_string;
            $query_params[0]['OR*s']['LOG_message'] = $similarity_string;
            $query_params[0]['OR*s']['Payment_Method.PMD_name'] = $similarity_string;
            $query_params[0]['OR*s']['Payment_Method.PMD_admin_name'] = $similarity_string;
            $query_params[0]['OR*s']['Payment_Method.PMD_type'] = $similarity_string;
            $query_params[0]['OR*s']['LOG_message'] = $similarity_string;
        }
        if (isset($this->_req_data['payment-filter-start-date'])
            && isset($this->_req_data['payment-filter-end-date'])
        ) {
            //add date
            $start_date = wp_strip_all_tags($this->_req_data['payment-filter-start-date']);
            $end_date = wp_strip_all_tags($this->_req_data['payment-filter-end-date']);
            //make sure our timestamps start and end right at the boundaries for each day
            $start_date = date('Y-m-d', strtotime($start_date)) . ' 00:00:00';
            $end_date = date('Y-m-d', strtotime($end_date)) . ' 23:59:59';
            //convert to timestamps
            $start_date = strtotime($start_date);
            $end_date = strtotime($end_date);
            //makes sure start date is the lowest value and vice versa
            $start_date = min($start_date, $end_date);
            $end_date = max($start_date, $end_date);
            //convert for query
            $start_date = EEM_Change_Log::instance()
                                        ->convert_datetime_for_query('LOG_time', date('Y-m-d H:i:s', $start_date),
                                            'Y-m-d H:i:s');
            $end_date = EEM_Change_Log::instance()
                                      ->convert_datetime_for_query('LOG_time', date('Y-m-d H:i:s', $end_date),
                                          'Y-m-d H:i:s');
            $query_params[0]['LOG_time'] = array('BETWEEN', array($start_date, $end_date));
        }
        if ($count) {
            return EEM_Change_Log::instance()->count($query_params);
        }
        if (isset($this->_req_data['order'])) {
            $sort = (isset($this->_req_data['order']) && ! empty($this->_req_data['order'])) ? $this->_req_data['order']
                : 'DESC';
            $query_params['order_by'] = array('LOG_time' => $sort);
        } else {
            $query_params['order_by'] = array('LOG_time' => 'DESC');
        }
        $offset = ($current_page - 1) * $per_page;
        if (! isset($this->_req_data['download_results'])) {
            $query_params['limit'] = array($offset, $per_page);
        }
        //now they've requested to instead just download the file instead of viewing it.
        if (isset($this->_req_data['download_results'])) {
            $wpdb_results = EEM_Change_Log::instance()->get_all_efficiently($query_params);
            header('Content-Disposition: attachment');
            header("Content-Disposition: attachment; filename=ee_payment_logs_for_" . sanitize_key(site_url()));
            echo "<h1>Payment Logs for " . site_url() . "</h1>";
            echo "<h3>Query:</h3>";
            var_dump($query_params);
            echo "<h3>Results:</h3>";
            var_dump($wpdb_results);
            die;
        }
        $results = EEM_Change_Log::instance()->get_all($query_params);
        return $results;
    }



    /**
     * Used by usort to RE-sort log query results, because we lose the ordering
     * because we're possibly combining the results from two queries
     *
     * @param EE_Change_Log $logA
     * @param EE_Change_Log $logB
     * @return int
     */
    protected function _sort_logs_again($logA, $logB)
    {
        $timeA = $logA->get_raw('LOG_time');
        $timeB = $logB->get_raw('LOG_time');
        if ($timeA == $timeB) {
            return 0;
        }
        $comparison = $timeA < $timeB ? -1 : 1;
        if (strtoupper($this->_sort_logs_again_direction) == 'DESC') {
            return $comparison * -1;
        } else {
            return $comparison;
        }
    }



    protected function _payment_log_details()
    {
        EE_Registry::instance()->load_model('Change_Log');
        /** @var $payment_log EE_Change_Log */
        $payment_log = EEM_Change_Log::instance()->get_one_by_ID($this->_req_data['ID']);
        $payment_method = null;
        $transaction = null;
        if ($payment_log instanceof EE_Change_Log) {
            if ($payment_log->object() instanceof EE_Payment) {
                $payment_method = $payment_log->object()->payment_method();
                $transaction = $payment_log->object()->transaction();
            } elseif ($payment_log->object() instanceof EE_Payment_Method) {
                $payment_method = $payment_log->object();
            }
        }
        $this->_template_args['admin_page_content'] = EEH_Template::display_template(
            EE_PAYMENTS_TEMPLATE_PATH . 'payment_log_details.template.php',
            array(
                'payment_log'    => $payment_log,
                'payment_method' => $payment_method,
                'transaction'    => $transaction,
            ),
            true
        );
        $this->display_admin_page_with_sidebar();
    }


} //end Payments_Admin_Page class
