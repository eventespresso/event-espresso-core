<?php
use EventEspresso\admin_pages\general_settings\AdminOptionsSettings;

if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('NO direct script access allowed');
}

/**
 * General_Settings_Admin_Page
 *
 * This contains the logic for setting up the Custom General_Settings related pages.  Any methods without phpdoc
 * comments have inline docs with parent class.
 *
 *
 * @package           General_Settings_Admin_Page
 * @subpackage        includes/core/admin/general_settings/General_Settings_Admin_Page.core.php
 * @author            Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class General_Settings_Admin_Page extends EE_Admin_Page
{
    
    
    /**
     * _question_group
     * holds the specific question group object for the question group details screen
     * @var object
     */
    protected $_question_group;
    
    
    public function __construct($routing = true)
    {
        parent::__construct($routing);
    }
    
    
    protected function _init_page_props()
    {
        $this->page_slug        = GEN_SET_PG_SLUG;
        $this->page_label       = GEN_SET_LABEL;
        $this->_admin_base_url  = GEN_SET_ADMIN_URL;
        $this->_admin_base_path = GEN_SET_ADMIN;
    }
    
    
    protected function _ajax_hooks()
    {
        add_action('wp_ajax_espresso_display_country_settings', array($this, 'display_country_settings'));
        add_action('wp_ajax_espresso_display_country_states', array($this, 'display_country_states'));
        add_action('wp_ajax_espresso_delete_state', array($this, 'delete_state'), 10, 3);
        add_action('wp_ajax_espresso_add_new_state', array($this, 'add_new_state'));
    }
    
    
    protected function _define_page_props()
    {
        $this->_admin_page_title = GEN_SET_LABEL;
        $this->_labels           = array(
            'publishbox' => __('Update Settings', 'event_espresso')
        );
    }
    
    
    protected function _set_page_routes()
    {
        $this->_page_routes = array(
            
            'critical_pages'                => array(
                'func'       => '_espresso_page_settings',
                'capability' => 'manage_options'
            ),
            'update_espresso_page_settings' => array(
                'func'       => '_update_espresso_page_settings',
                'capability' => 'manage_options',
                'noheader'   => true,
            ),
            'default'                       => array(
                'func'       => '_your_organization_settings',
                'capability' => 'manage_options',
            ),
            
            'update_your_organization_settings' => array(
                'func'       => '_update_your_organization_settings',
                'capability' => 'manage_options',
                'noheader'   => true,
            ),
            
            'admin_option_settings' => array(
                'func'       => '_admin_option_settings',
                'capability' => 'manage_options',
            ),
            
            'update_admin_option_settings' => array(
                'func'       => '_update_admin_option_settings',
                'capability' => 'manage_options',
                'noheader'   => true,
            ),
            
            'country_settings' => array(
                'func'       => '_country_settings',
                'capability' => 'manage_options'
            ),
            
            'update_country_settings' => array(
                'func'       => '_update_country_settings',
                'capability' => 'manage_options',
                'noheader'   => true,
            ),
            
            'display_country_settings' => array(
                'func'       => 'display_country_settings',
                'capability' => 'manage_options',
                'noheader'   => true,
            ),
            
            'add_new_state' => array(
                'func'       => 'add_new_state',
                'capability' => 'manage_options',
                'noheader'   => true,
            ),
            
            'delete_state' => array(
                'func'       => 'delete_state',
                'capability' => 'manage_options',
                'noheader'   => true,
            )
        );
    }
    
    
    protected function _set_page_config()
    {
        $this->_page_config = array(
            'critical_pages'        => array(
                'nav'           => array(
                    'label' => __('Critical Pages', 'event_espresso'),
                    'order' => 50
                ),
                'metaboxes'     => array_merge($this->_default_espresso_metaboxes, array('_publish_post_box')),
                'help_tabs'     => array(
                    'general_settings_critical_pages_help_tab' => array(
                        'title'    => __('Critical Pages', 'event_espresso'),
                        'filename' => 'general_settings_critical_pages'
                    )
                ),
                'help_tour'     => array('Critical_Pages_Help_Tour'),
                'require_nonce' => false
            ),
            'default'               => array(
                'nav'           => array(
                    'label' => __('Your Organization', 'event_espresso'),
                    'order' => 20
                ),
                'help_tabs'     => array(
                    'general_settings_your_organization_help_tab' => array(
                        'title'    => __('Your Organization', 'event_espresso'),
                        'filename' => 'general_settings_your_organization'
                    )
                ),
                'help_tour'     => array('Your_Organization_Help_Tour'),
                'metaboxes'     => array_merge($this->_default_espresso_metaboxes, array('_publish_post_box')),
                'require_nonce' => false
            ),
            'admin_option_settings' => array(
                'nav'           => array(
                    'label' => __('Admin Options', 'event_espresso'),
                    'order' => 60
                ),
                'metaboxes'     => array_merge($this->_default_espresso_metaboxes, array('_publish_post_box')),
                'help_tabs'     => array(
                    'general_settings_admin_options_help_tab' => array(
                        'title'    => __('Admin Options', 'event_espresso'),
                        'filename' => 'general_settings_admin_options'
                    )
                ),
                'help_tour'     => array('Admin_Options_Help_Tour'),
                'require_nonce' => false
            ),
            'country_settings'      => array(
                'nav'           => array(
                    'label' => __('Countries', 'event_espresso'),
                    'order' => 70
                ),
                'help_tabs'     => array(
                    'general_settings_countries_help_tab' => array(
                        'title'    => __('Countries', 'event_espresso'),
                        'filename' => 'general_settings_countries'
                    )
                ),
                'help_tour'     => array('Countries_Help_Tour'),
                'require_nonce' => false
            )
        );
    }
    
    
    protected function _add_screen_options()
    {
    }
    
    protected function _add_feature_pointers()
    {
    }
    
    public function load_scripts_styles()
    {
        //styles
        wp_enqueue_style('espresso-ui-theme');
        //scripts
        wp_enqueue_script('ee_admin_js');
    }
    
    public function admin_init()
    {
        EE_Registry::$i18n_js_strings['invalid_server_response'] = __('An error occurred! Your request may have been processed, but a valid response from the server was not received. Please refresh the page and try again.',
            'event_espresso');
        EE_Registry::$i18n_js_strings['error_occurred']          = __('An error occurred! Please refresh the page and try again.',
            'event_espresso');
        EE_Registry::$i18n_js_strings['confirm_delete_state']    = __('Are you sure you want to delete this State / Province?',
            'event_espresso');
        $protocol                                                = isset($_SERVER['HTTPS']) ? 'https://' : 'http://';
        EE_Registry::$i18n_js_strings['ajax_url']                = admin_url('admin-ajax.php?page=espresso_general_settings',
            $protocol);
    }
    
    public function admin_notices()
    {
    }
    
    public function admin_footer_scripts()
    {
    }
    
    
    public function load_scripts_styles_default()
    {
        //styles
        wp_enqueue_style('thickbox');
        //scripts
        wp_enqueue_script('media-upload');
        wp_enqueue_script('thickbox');
        wp_register_script('organization_settings', GEN_SET_ASSETS_URL . 'your_organization_settings.js',
            array('jquery', 'media-upload', 'thickbox'), EVENT_ESPRESSO_VERSION, true);
        wp_register_style('organization-css', GEN_SET_ASSETS_URL . 'organization.css', array(), EVENT_ESPRESSO_VERSION);
        wp_enqueue_script('organization_settings');
        wp_enqueue_style('organization-css');
        $confirm_image_delete = array(
            'text' => __('Do you really want to delete this image? Please remember to save your settings to complete the removal.',
                'event_espresso')
        );
        wp_localize_script('organization_settings', 'confirm_image_delete', $confirm_image_delete);
        
    }
    
    public function load_scripts_styles_country_settings()
    {
        //scripts
        wp_register_script('gen_settings_countries', GEN_SET_ASSETS_URL . 'gen_settings_countries.js',
            array('ee_admin_js'), EVENT_ESPRESSO_VERSION, true);
        wp_register_style('organization-css', GEN_SET_ASSETS_URL . 'organization.css', array(), EVENT_ESPRESSO_VERSION);
        wp_enqueue_script('gen_settings_countries');
        wp_enqueue_style('organization-css');
        
    }
    
    
    /*************        Espresso Pages        *************/
    /**
     * _espresso_page_settings
     *
     * @throws \EE_Error
     */
    protected function _espresso_page_settings()
    {
        // Check to make sure all of the main pages are setup properly,
        // if not create the default pages and display an admin notice
        EEH_Activation::verify_default_pages_exist();
        $this->_transient_garbage_collection();
        $this->_template_args['values']             = $this->_yes_no_values;
        $this->_template_args['reg_page_id']        = isset(EE_Registry::instance()->CFG->core->reg_page_id)
            ? EE_Registry::instance()->CFG->core->reg_page_id
            : null;
        $this->_template_args['reg_page_obj']       = isset(EE_Registry::instance()->CFG->core->reg_page_id)
            ? get_page(EE_Registry::instance()->CFG->core->reg_page_id)
            : false;
        $this->_template_args['txn_page_id']        = isset(EE_Registry::instance()->CFG->core->txn_page_id)
            ? EE_Registry::instance()->CFG->core->txn_page_id
            : null;
        $this->_template_args['txn_page_obj']       = isset(EE_Registry::instance()->CFG->core->txn_page_id)
            ? get_page(EE_Registry::instance()->CFG->core->txn_page_id)
            : false;
        $this->_template_args['thank_you_page_id']  = isset(EE_Registry::instance()->CFG->core->thank_you_page_id)
            ? EE_Registry::instance()->CFG->core->thank_you_page_id
            : null;
        $this->_template_args['thank_you_page_obj'] = isset(EE_Registry::instance()->CFG->core->thank_you_page_id)
            ? get_page(EE_Registry::instance()->CFG->core->thank_you_page_id)
            : false;
        $this->_template_args['cancel_page_id']     = isset(EE_Registry::instance()->CFG->core->cancel_page_id)
            ? EE_Registry::instance()->CFG->core->cancel_page_id
            : null;
        $this->_template_args['cancel_page_obj']    = isset(EE_Registry::instance()->CFG->core->cancel_page_id)
            ? get_page(EE_Registry::instance()->CFG->core->cancel_page_id)
            : false;
        $this->_set_add_edit_form_tags('update_espresso_page_settings');
        $this->_set_publish_post_box_vars(null, false, false, null, false);
        $this->_template_args['admin_page_content'] = EEH_Template::display_template(
            GEN_SET_TEMPLATE_PATH . 'espresso_page_settings.template.php',
            $this->_template_args,
            true
        );
        $this->display_admin_page_with_sidebar();
        
    }
    
    protected function _update_espresso_page_settings()
    {
        // capture incoming request data
        $reg_page_id       = isset($this->_req_data['reg_page_id']) ? absint($this->_req_data['reg_page_id']) : EE_Registry::instance()->CFG->core->reg_page_id;
        $txn_page_id       = isset($this->_req_data['txn_page_id']) ? absint($this->_req_data['txn_page_id']) : EE_Registry::instance()->CFG->core->txn_page_id;
        $thank_you_page_id = isset($this->_req_data['thank_you_page_id']) ? absint($this->_req_data['thank_you_page_id']) : EE_Registry::instance()->CFG->core->thank_you_page_id;
        $cancel_page_id    = isset($this->_req_data['cancel_page_id']) ? absint($this->_req_data['cancel_page_id']) : EE_Registry::instance()->CFG->core->cancel_page_id;
        // pack critical_pages into an array
        $critical_pages = array(
            'reg_page_id'       => $reg_page_id,
            'txn_page_id'       => $txn_page_id,
            'thank_you_page_id' => $thank_you_page_id,
            'cancel_page_id'    => $cancel_page_id
        );
        foreach ($critical_pages as $critical_page_name => $critical_page_id) {
            // has the page changed ?
            if (EE_Registry::instance()->CFG->core->{$critical_page_name} !== $critical_page_id) {
                // grab post object for old page
                $post = get_post(EE_Registry::instance()->CFG->core->{$critical_page_name});
                // update post shortcodes for old page
                EventEspresso\core\admin\PostShortcodeTracking::parse_post_content_on_save($critical_page_id, $post);
                // grab post object for new page
                $post = get_post($critical_page_id);
                // update post shortcodes for new page
                EventEspresso\core\admin\PostShortcodeTracking::parse_post_content_on_save($critical_page_id, $post);
            }
        }
        // set page IDs
        EE_Registry::instance()->CFG->core->reg_page_id       = $reg_page_id;
        EE_Registry::instance()->CFG->core->txn_page_id       = $txn_page_id;
        EE_Registry::instance()->CFG->core->thank_you_page_id = $thank_you_page_id;
        EE_Registry::instance()->CFG->core->cancel_page_id    = $cancel_page_id;
        
        EE_Registry::instance()->CFG->core = apply_filters('FHEE__General_Settings_Admin_Page___update_espresso_page_settings__CFG_core',
            EE_Registry::instance()->CFG->core, $this->_req_data);
        
        $what       = __('Critical Pages & Shortcodes', 'event_espresso');
        $success    = $this->_update_espresso_configuration($what, EE_Registry::instance()->CFG->core, __FILE__,
            __FUNCTION__, __LINE__);
        $query_args = array(
            'action' => 'critical_pages'
        );
        $this->_redirect_after_action(false, '', '', $query_args, true);
        
    }
    
    
    /*************        Your Organization        *************/
    
    
    protected function _your_organization_settings()
    {
        
        $this->_template_args['site_license_key']       = isset(EE_Registry::instance()->NET_CFG->core->site_license_key) ? EE_Registry::instance()->NET_CFG->core->get_pretty('site_license_key') : '';
        $this->_template_args['organization_name']      = isset(EE_Registry::instance()->CFG->organization->name) ? EE_Registry::instance()->CFG->organization->get_pretty('name') : '';
        $this->_template_args['organization_address_1'] = isset(EE_Registry::instance()->CFG->organization->address_1) ? EE_Registry::instance()->CFG->organization->get_pretty('address_1') : '';
        $this->_template_args['organization_address_2'] = isset(EE_Registry::instance()->CFG->organization->address_2) ? EE_Registry::instance()->CFG->organization->get_pretty('address_2') : '';
        $this->_template_args['organization_city']      = isset(EE_Registry::instance()->CFG->organization->city) ? EE_Registry::instance()->CFG->organization->get_pretty('city') : '';
        $this->_template_args['organization_zip']       = isset(EE_Registry::instance()->CFG->organization->zip) ? EE_Registry::instance()->CFG->organization->get_pretty('zip') : '';
        $this->_template_args['organization_email']     = isset(EE_Registry::instance()->CFG->organization->email) ? EE_Registry::instance()->CFG->organization->get_pretty('email') : '';
        $this->_template_args['organization_phone']     = isset(EE_Registry::instance()->CFG->organization->phone) ? EE_Registry::instance()->CFG->organization->get_pretty('phone') : '';
        $this->_template_args['organization_vat']       = isset(EE_Registry::instance()->CFG->organization->vat) ? EE_Registry::instance()->CFG->organization->get_pretty('vat') : '';
        $this->_template_args['currency_sign']          = isset(EE_Registry::instance()->CFG->currency->sign) ? EE_Registry::instance()->CFG->currency->get_pretty('sign') : '$';
        $this->_template_args['organization_logo_url']  = isset(EE_Registry::instance()->CFG->organization->logo_url) ? EE_Registry::instance()->CFG->organization->get_pretty('logo_url') : false;
        $this->_template_args['organization_facebook']  = isset(EE_Registry::instance()->CFG->organization->facebook) ? EE_Registry::instance()->CFG->organization->get_pretty('facebook') : '';
        $this->_template_args['organization_twitter']   = isset(EE_Registry::instance()->CFG->organization->twitter) ? EE_Registry::instance()->CFG->organization->get_pretty('twitter') : '';
        $this->_template_args['organization_linkedin']  = isset(EE_Registry::instance()->CFG->organization->linkedin) ? EE_Registry::instance()->CFG->organization->get_pretty('linkedin') : '';
        $this->_template_args['organization_pinterest'] = isset(EE_Registry::instance()->CFG->organization->pinterest) ? EE_Registry::instance()->CFG->organization->get_pretty('pinterest') : '';
        $this->_template_args['organization_google']    = isset(EE_Registry::instance()->CFG->organization->google) ? EE_Registry::instance()->CFG->organization->get_pretty('google') : '';
        $this->_template_args['organization_instagram'] = isset(EE_Registry::instance()->CFG->organization->instagram) ? EE_Registry::instance()->CFG->organization->get_pretty('instagram') : '';
        //UXIP settings
        $this->_template_args['ee_ueip_optin'] = isset(EE_Registry::instance()->CFG->core->ee_ueip_optin) ? EE_Registry::instance()->CFG->core->get_pretty('ee_ueip_optin') : true;
        
        $STA_ID                         = isset(EE_Registry::instance()->CFG->organization->STA_ID) ? EE_Registry::instance()->CFG->organization->STA_ID : 4;
        $this->_template_args['states'] = new EE_Question_Form_Input(
            EE_Question::new_instance(array(
                'QST_ID'           => 0,
                'QST_display_text' => __('State/Province', 'event_espresso'),
                'QST_system'       => 'admin-state'
            )),
            EE_Answer::new_instance(array(
                'ANS_ID'    => 0,
                'ANS_value' => $STA_ID
            )),
            array(
                'input_id'       => 'organization_state',
                'input_name'     => 'organization_state',
                'input_prefix'   => '',
                'append_qstn_id' => false
            )
        );
        
        $CNT_ISO                           = isset(EE_Registry::instance()->CFG->organization->CNT_ISO) ? EE_Registry::instance()->CFG->organization->CNT_ISO : 'US';
        $this->_template_args['countries'] = new EE_Question_Form_Input(
            EE_Question::new_instance(array(
                'QST_ID'           => 0,
                'QST_display_text' => __('Country', 'event_espresso'),
                'QST_system'       => 'admin-country'
            )),
            EE_Answer::new_instance(array(
                'ANS_ID'    => 0,
                'ANS_value' => $CNT_ISO
            )),
            array(
                'input_id'       => 'organization_country',
                'input_name'     => 'organization_country',
                'input_prefix'   => '',
                'append_qstn_id' => false
            )
        );
        
        add_filter('FHEE__EEH_Form_Fields__label_html', array($this, 'country_form_field_label_wrap'), 10, 2);
        add_filter('FHEE__EEH_Form_Fields__input_html', array($this, 'country_form_field_input__wrap'), 10, 2);
        
        //PUE verification stuff
        $ver_option_key                                    = 'puvererr_' . basename(EE_PLUGIN_BASENAME);
        $verify_fail                                       = get_option($ver_option_key);
        $this->_template_args['site_license_key_verified'] = $verify_fail || ! empty($verify_fail) || (empty($this->_template_args['site_license_key']) && empty($verify_fail)) ? '<span class="dashicons dashicons-admin-network ee-icon-color-ee-red ee-icon-size-20"></span>' : '<span class="dashicons dashicons-admin-network ee-icon-color-ee-green ee-icon-size-20"></span>';
        
        $this->_set_add_edit_form_tags('update_your_organization_settings');
        $this->_set_publish_post_box_vars(null, false, false, null, false);
        $this->_template_args['admin_page_content'] = EEH_Template::display_template(GEN_SET_TEMPLATE_PATH . 'your_organization_settings.template.php',
            $this->_template_args, true);
        
        $this->display_admin_page_with_sidebar();
    }
    
    protected function _update_your_organization_settings()
    {
        if (is_main_site()) {
            EE_Registry::instance()->NET_CFG->core->site_license_key = isset($this->_req_data['site_license_key']) ? sanitize_text_field($this->_req_data['site_license_key']) : EE_Registry::instance()->NET_CFG->core->site_license_key;
        }
        EE_Registry::instance()->CFG->organization->name      = isset($this->_req_data['organization_name']) ? sanitize_text_field($this->_req_data['organization_name']) : EE_Registry::instance()->CFG->organization->name;
        EE_Registry::instance()->CFG->organization->address_1 = isset($this->_req_data['organization_address_1']) ? sanitize_text_field($this->_req_data['organization_address_1']) : EE_Registry::instance()->CFG->organization->address_1;
        EE_Registry::instance()->CFG->organization->address_2 = isset($this->_req_data['organization_address_2']) ? sanitize_text_field($this->_req_data['organization_address_2']) : EE_Registry::instance()->CFG->organization->address_2;
        EE_Registry::instance()->CFG->organization->city      = isset($this->_req_data['organization_city']) ? sanitize_text_field($this->_req_data['organization_city']) : EE_Registry::instance()->CFG->organization->city;
        EE_Registry::instance()->CFG->organization->STA_ID    = isset($this->_req_data['organization_state']) ? absint($this->_req_data['organization_state']) : EE_Registry::instance()->CFG->organization->STA_ID;
        EE_Registry::instance()->CFG->organization->CNT_ISO   = isset($this->_req_data['organization_country']) ? sanitize_text_field($this->_req_data['organization_country']) : EE_Registry::instance()->CFG->organization->CNT_ISO;
        EE_Registry::instance()->CFG->organization->zip       = isset($this->_req_data['organization_zip']) ? sanitize_text_field($this->_req_data['organization_zip']) : EE_Registry::instance()->CFG->organization->zip;
        EE_Registry::instance()->CFG->organization->email     = isset($this->_req_data['organization_email']) ? sanitize_email($this->_req_data['organization_email']) : EE_Registry::instance()->CFG->organization->email;
        EE_Registry::instance()->CFG->organization->vat       = isset($this->_req_data['organization_vat']) ? sanitize_text_field($this->_req_data['organization_vat']) : EE_Registry::instance()->CFG->organization->vat;
        EE_Registry::instance()->CFG->organization->phone     = isset($this->_req_data['organization_phone']) ? sanitize_text_field($this->_req_data['organization_phone']) : EE_Registry::instance()->CFG->organization->phone;
        EE_Registry::instance()->CFG->organization->logo_url  = isset($this->_req_data['organization_logo_url']) ? esc_url_raw($this->_req_data['organization_logo_url']) : EE_Registry::instance()->CFG->organization->logo_url;
        EE_Registry::instance()->CFG->organization->facebook  = isset($this->_req_data['organization_facebook']) ? esc_url_raw($this->_req_data['organization_facebook']) : EE_Registry::instance()->CFG->organization->facebook;
        EE_Registry::instance()->CFG->organization->twitter   = isset($this->_req_data['organization_twitter']) ? esc_url_raw($this->_req_data['organization_twitter']) : EE_Registry::instance()->CFG->organization->twitter;
        EE_Registry::instance()->CFG->organization->linkedin  = isset($this->_req_data['organization_linkedin']) ? esc_url_raw($this->_req_data['organization_linkedin']) : EE_Registry::instance()->CFG->organization->linkedin;
        EE_Registry::instance()->CFG->organization->pinterest = isset($this->_req_data['organization_pinterest']) ? esc_url_raw($this->_req_data['organization_pinterest']) : EE_Registry::instance()->CFG->organization->pinterest;
        EE_Registry::instance()->CFG->organization->google    = isset($this->_req_data['organization_google']) ? esc_url_raw($this->_req_data['organization_google']) : EE_Registry::instance()->CFG->organization->google;
        EE_Registry::instance()->CFG->organization->instagram = isset($this->_req_data['organization_instagram']) ? esc_url_raw($this->_req_data['organization_instagram']) : EE_Registry::instance()->CFG->organization->instagram;
        EE_Registry::instance()->CFG->core->ee_ueip_optin     = isset($this->_req_data['ueip_optin']) && ! empty($this->_req_data['ueip_optin']) ? $this->_req_data['ueip_optin'] : EE_Registry::instance()->CFG->core->ee_ueip_optin;
        
        EE_Registry::instance()->CFG->currency = new EE_Currency_Config(EE_Registry::instance()->CFG->organization->CNT_ISO);
        
        EE_Registry::instance()->CFG = apply_filters('FHEE__General_Settings_Admin_Page___update_your_organization_settings__CFG',
            EE_Registry::instance()->CFG);
        
        $what    = 'Your Organization Settings';
        $success = $this->_update_espresso_configuration($what, EE_Registry::instance()->CFG, __FILE__, __FUNCTION__,
            __LINE__);
        
        $this->_redirect_after_action($success, $what, 'updated', array('action' => 'default'));
        
    }
    
    
    
    /*************        Admin Options        *************/
    
    
    /**
     * _admin_option_settings
     *
     * @throws \EE_Error
     * @throws \LogicException
     */
    protected function _admin_option_settings()
    {
        $this->_template_args['admin_page_content'] = '';
        try {
            $admin_options_settings_form = new AdminOptionsSettings(EE_Registry::instance());
            // still need this for the old school form in Extend_General_Settings_Admin_Page
            $this->_template_args['values'] = $this->_yes_no_values;
            // also need to account for the do_action that was in the old template
            $admin_options_settings_form->setTemplateArgs($this->_template_args);
            $this->_template_args['admin_page_content'] = $admin_options_settings_form->display();
        } catch (Exception $e) {
            EE_Error::add_error($e->getMessage(), __FILE__, __FUNCTION__, __LINE__);
        }
        $this->_set_add_edit_form_tags('update_admin_option_settings');
        $this->_set_publish_post_box_vars(null, false, false, null, false);
        $this->display_admin_page_with_sidebar();
    }
    
    
    /**
     * _update_admin_option_settings
     *
     * @throws \EE_Error
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidFormSubmissionException
     * @throws \InvalidArgumentException
     * @throws \LogicException
     */
    protected function _update_admin_option_settings()
    {
        try {
            $admin_options_settings_form = new AdminOptionsSettings(EE_Registry::instance());
            $admin_options_settings_form->process($this->_req_data[$admin_options_settings_form->slug()]);
            EE_Registry::instance()->CFG->admin = apply_filters(
                'FHEE__General_Settings_Admin_Page___update_admin_option_settings__CFG_admin',
                EE_Registry::instance()->CFG->admin
            );
        } catch (Exception $e) {
            EE_Error::add_error($e->getMessage(), __FILE__, __FUNCTION__, __LINE__);
        }
        $this->_redirect_after_action(
            apply_filters(
                'FHEE__General_Settings_Admin_Page___update_admin_option_settings__success',
                $this->_update_espresso_configuration(
                    'Admin Options',
                    EE_Registry::instance()->CFG->admin,
                    __FILE__, __FUNCTION__, __LINE__
                )
            ),
            'Admin Options',
            'updated',
            array('action' => 'admin_option_settings')
        );
        
    }
    
    
    /*************        Countries        *************/
    
    
    protected function _country_settings()
    {
        
        $CNT_ISO = isset(EE_Registry::instance()->CFG->organization->CNT_ISO) ? EE_Registry::instance()->CFG->organization->CNT_ISO : 'US';
        $CNT_ISO = isset($this->_req_data['country']) ? strtoupper(sanitize_text_field($this->_req_data['country'])) : $CNT_ISO;
        
        //load field generator helper
        
        $this->_template_args['values'] = $this->_yes_no_values;
        
        $this->_template_args['countries'] = new EE_Question_Form_Input(
            EE_Question::new_instance(array(
                'QST_ID'           => 0,
                'QST_display_text' => __('Select Country', 'event_espresso'),
                'QST_system'       => 'admin-country'
            )),
            EE_Answer::new_instance(array(
                'ANS_ID'    => 0,
                'ANS_value' => $CNT_ISO
            )),
            array(
                'input_id'       => 'country',
                'input_name'     => 'country',
                'input_prefix'   => '',
                'append_qstn_id' => false
            )
        );
//		EEH_Debug_Tools::printr( $this->_template_args['countries'], 'countries  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
        
        add_filter('FHEE__EEH_Form_Fields__label_html', array($this, 'country_form_field_label_wrap'), 10, 2);
        add_filter('FHEE__EEH_Form_Fields__input_html', array($this, 'country_form_field_input__wrap'), 10, 2);
        $this->_template_args['country_details_settings'] = $this->display_country_settings();
        $this->_template_args['country_states_settings']  = $this->display_country_states();
        
        $this->_set_add_edit_form_tags('update_country_settings');
        $this->_set_publish_post_box_vars(null, false, false, null, false);
        $this->_template_args['admin_page_content'] = EEH_Template::display_template(GEN_SET_TEMPLATE_PATH . 'countries_settings.template.php',
            $this->_template_args, true);
        $this->display_admin_page_with_no_sidebar();
    }
    
    
    /**
     *        display_country_settings
     *
     * @access    public
     *
     * @param    string $CNT_ISO
     *
     * @return        mixed        string | array
     */
    public function display_country_settings($CNT_ISO = '')
    {
        
        $CNT_ISO = isset($this->_req_data['country']) ? strtoupper(sanitize_text_field($this->_req_data['country'])) : $CNT_ISO;
        if ( ! $CNT_ISO) {
            return '';
        }
        
        // for ajax
        remove_all_filters('FHEE__EEH_Form_Fields__label_html');
        remove_all_filters('FHEE__EEH_Form_Fields__input_html');
        add_filter('FHEE__EEH_Form_Fields__label_html', array($this, 'country_form_field_label_wrap'), 10, 2);
        add_filter('FHEE__EEH_Form_Fields__input_html', array($this, 'country_form_field_input__wrap'), 10, 2);
        $country = EEM_Country::instance()->get_one_by_ID($CNT_ISO);
        //EEH_Debug_Tools::printr( $country, '$country  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
        $country_input_types            = array(
            'CNT_active'      => array(
                'type'             => 'RADIO_BTN',
                'input_name'       => 'cntry[' . $CNT_ISO . ']',
                'class'            => '',
                'options'          => $this->_yes_no_values,
                'use_desc_4_label' => true
            ),
            'CNT_ISO'         => array(
                'type'       => 'TEXT',
                'input_name' => 'cntry[' . $CNT_ISO . ']',
                'class'      => 'small-text'
            ),
            'CNT_ISO3'        => array(
                'type'       => 'TEXT',
                'input_name' => 'cntry[' . $CNT_ISO . ']',
                'class'      => 'small-text'
            ),
            'RGN_ID'          => array(
                'type'       => 'TEXT',
                'input_name' => 'cntry[' . $CNT_ISO . ']',
                'class'      => 'small-text'
            ),
            'CNT_name'        => array(
                'type'       => 'TEXT',
                'input_name' => 'cntry[' . $CNT_ISO . ']',
                'class'      => 'regular-text'
            ),
            'CNT_cur_code'    => array(
                'type'       => 'TEXT',
                'input_name' => 'cntry[' . $CNT_ISO . ']',
                'class'      => 'small-text'
            ),
            'CNT_cur_single'  => array(
                'type'       => 'TEXT',
                'input_name' => 'cntry[' . $CNT_ISO . ']',
                'class'      => 'medium-text'
            ),
            'CNT_cur_plural'  => array(
                'type'       => 'TEXT',
                'input_name' => 'cntry[' . $CNT_ISO . ']',
                'class'      => 'medium-text'
            ),
            'CNT_cur_sign'    => array(
                'type'         => 'TEXT',
                'input_name'   => 'cntry[' . $CNT_ISO . ']',
                'class'        => 'small-text',
                'htmlentities' => false
            ),
            'CNT_cur_sign_b4' => array(
                'type'             => 'RADIO_BTN',
                'input_name'       => 'cntry[' . $CNT_ISO . ']',
                'class'            => '',
                'options'          => $this->_yes_no_values,
                'use_desc_4_label' => true
            ),
            'CNT_cur_dec_plc' => array(
                'type'       => 'RADIO_BTN',
                'input_name' => 'cntry[' . $CNT_ISO . ']',
                'class'      => '',
                'options'    => array(
                    array('id' => 0, 'text' => ''),
                    array('id' => 1, 'text' => ''),
                    array('id' => 2, 'text' => ''),
                    array('id' => 3, 'text' => '')
                )
            ),
            'CNT_cur_dec_mrk' => array(
                'type'             => 'RADIO_BTN',
                'input_name'       => 'cntry[' . $CNT_ISO . ']',
                'class'            => '',
                'options'          => array(
                    array(
                        'id'   => ',',
                        'text' => __(', (comma)', 'event_espresso')
                    ),
                    array('id' => '.', 'text' => __('. (decimal)', 'event_espresso'))
                ),
                'use_desc_4_label' => true
            ),
            'CNT_cur_thsnds'  => array(
                'type'             => 'RADIO_BTN',
                'input_name'       => 'cntry[' . $CNT_ISO . ']',
                'class'            => '',
                'options'          => array(
                    array(
                        'id'   => ',',
                        'text' => __(', (comma)', 'event_espresso')
                    ),
                    array('id' => '.', 'text' => __('. (decimal)', 'event_espresso'))
                ),
                'use_desc_4_label' => true
            ),
            'CNT_tel_code'    => array(
                'type'       => 'TEXT',
                'input_name' => 'cntry[' . $CNT_ISO . ']',
                'class'      => 'small-text'
            ),
            'CNT_is_EU'       => array(
                'type'             => 'RADIO_BTN',
                'input_name'       => 'cntry[' . $CNT_ISO . ']',
                'class'            => '',
                'options'          => $this->_yes_no_values,
                'use_desc_4_label' => true
            )
        );
        $this->_template_args['inputs'] = EE_Question_Form_Input::generate_question_form_inputs_for_object($country,
            $country_input_types);
        $country_details_settings       = EEH_Template::display_template(GEN_SET_TEMPLATE_PATH . 'country_details_settings.template.php',
            $this->_template_args, true);
        
        if (defined('DOING_AJAX')) {
            $notices = EE_Error::get_notices(false, false, false);
            echo wp_json_encode(array(
                'return_data' => $country_details_settings,
                'success'     => $notices['success'],
                'errors'      => $notices['errors']
            ));
            die();
        } else {
            return $country_details_settings;
        }
        
    }
    
    
    /**
     *        display_country_states
     *
     * @access    public
     *
     * @param    string $CNT_ISO
     *
     * @return        string
     */
    public function display_country_states($CNT_ISO = '')
    {
        
        $CNT_ISO = isset($this->_req_data['country']) ? sanitize_text_field($this->_req_data['country']) : $CNT_ISO;
        
        if ( ! $CNT_ISO) {
            return '';
        }
        // for ajax
        remove_all_filters('FHEE__EEH_Form_Fields__label_html');
        remove_all_filters('FHEE__EEH_Form_Fields__input_html');
        add_filter('FHEE__EEH_Form_Fields__label_html', array($this, 'state_form_field_label_wrap'), 10, 2);
        add_filter('FHEE__EEH_Form_Fields__input_html', array($this, 'state_form_field_input__wrap'), 10, 2);
        $states = EEM_State::instance()->get_all_states_for_these_countries(array($CNT_ISO => $CNT_ISO));

//			echo '<h4>$CNT_ISO : ' . $CNT_ISO . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//			global $wpdb;
//			echo '<h4>' . $wpdb->last_query . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//			EEH_Debug_Tools::printr( $states, '$states  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
        if ($states) {
            foreach ($states as $STA_ID => $state) {
                if ($state instanceof EE_State) {
                    //STA_abbrev 	STA_name 	STA_active
                    $state_input_types                                           = array(
                        'STA_abbrev' => array(
                            'type'       => 'TEXT',
                            'input_name' => 'states[' . $STA_ID . ']',
                            'class'      => 'mid-text'
                        ),
                        'STA_name'   => array(
                            'type'       => 'TEXT',
                            'input_name' => 'states[' . $STA_ID . ']',
                            'class'      => 'regular-text'
                        ),
                        'STA_active' => array(
                            'type'             => 'RADIO_BTN',
                            'input_name'       => 'states[' . $STA_ID . ']',
                            'options'          => $this->_yes_no_values,
                            'use_desc_4_label' => true
                        )
                    );
                    $this->_template_args['states'][$STA_ID]['inputs']           = EE_Question_Form_Input::generate_question_form_inputs_for_object($state,
                        $state_input_types);
                    $query_args                                                  = array(
                        'action'     => 'delete_state',
                        'STA_ID'     => $STA_ID,
                        'CNT_ISO'    => $CNT_ISO,
                        'STA_abbrev' => $state->abbrev()
                    );
                    $this->_template_args['states'][$STA_ID]['delete_state_url'] = EE_Admin_Page::add_query_args_and_nonce($query_args,
                        GEN_SET_ADMIN_URL);
                }
            }
        } else {
            $this->_template_args['states'] = false;
        }
//		EEH_Debug_Tools::printr( $this->_template_args['states'], 'states  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
        $this->_template_args['add_new_state_url'] = EE_Admin_Page::add_query_args_and_nonce(array('action' => 'add_new_state'),
            GEN_SET_ADMIN_URL);
        
        $state_details_settings = EEH_Template::display_template(GEN_SET_TEMPLATE_PATH . 'state_details_settings.template.php',
            $this->_template_args, true);
        
        if (defined('DOING_AJAX')) {
            $notices = EE_Error::get_notices(false, false, false);
            echo wp_json_encode(array(
                'return_data' => $state_details_settings,
                'success'     => $notices['success'],
                'errors'      => $notices['errors']
            ));
            die();
        } else {
            return $state_details_settings;
        }
        
    }
    
    
    /**
     *        add_new_state
     *
     * @access    public
     * @return        void
     */
    public function add_new_state()
    {
        
        $success = true;
        
        $CNT_ISO = isset($this->_req_data['CNT_ISO']) ? strtoupper(sanitize_text_field($this->_req_data['CNT_ISO'])) : false;
        if ( ! $CNT_ISO) {
            EE_Error::add_error(__('No Country ISO code or an invalid Country ISO code was received.',
                'event_espresso'), __FILE__, __FUNCTION__, __LINE__);
            $success = false;
        }
        $STA_abbrev = isset($this->_req_data['STA_abbrev']) ? sanitize_text_field($this->_req_data['STA_abbrev']) : false;
        if ( ! $STA_abbrev) {
            EE_Error::add_error(__('No State ISO code or an invalid State ISO code was received.', 'event_espresso'),
                __FILE__, __FUNCTION__, __LINE__);
            $success = false;
        }
        $STA_name = isset($this->_req_data['STA_name']) ? sanitize_text_field($this->_req_data['STA_name']) :
            false;
        if ( ! $STA_name) {
            EE_Error::add_error(__('No State name or an invalid State name was received.', 'event_espresso'), __FILE__,
                __FUNCTION__, __LINE__);
            $success = false;
        }
        
        if ($success) {
            $cols_n_values = array(
                'CNT_ISO'    => $CNT_ISO,
                'STA_abbrev' => $STA_abbrev,
                'STA_name'   => $STA_name,
                'STA_active' => true
            );
            $success       = EEM_State::instance()->insert($cols_n_values);
            EE_Error::add_success(__('The State was added successfully.', 'event_espresso'));
        }
        
        if (defined('DOING_AJAX')) {
            $notices = EE_Error::get_notices(false, false, false);
            echo wp_json_encode(array_merge($notices, array('return_data' => $CNT_ISO)));
            die();
        } else {
            $this->_redirect_after_action($success, 'State', 'added', array('action' => 'country_settings'));
        }
    }
    
    
    /**
     *        delete_state
     *
     * @access    public
     * @return        boolean | void
     */
    public function delete_state()
    {
        $CNT_ISO    = isset($this->_req_data['CNT_ISO']) ? strtoupper(sanitize_text_field($this->_req_data['CNT_ISO'])) : false;
        $STA_ID     = isset($this->_req_data['STA_ID']) ? sanitize_text_field($this->_req_data['STA_ID']) : false;
        $STA_abbrev = isset($this->_req_data['STA_abbrev']) ? sanitize_text_field($this->_req_data['STA_abbrev']) : false;
        if ( ! $STA_ID) {
            EE_Error::add_error(__('No State ID or an invalid State ID was received.', 'event_espresso'), __FILE__,
                __FUNCTION__, __LINE__);
            
            return false;
        }
        $success = EEM_State::instance()->delete_by_ID($STA_ID);
        if ($success !== false) {
            do_action('AHEE__General_Settings_Admin_Page__delete_state__state_deleted', $CNT_ISO, $STA_ID,
                array('STA_abbrev' => $STA_abbrev));
            EE_Error::add_success(__('The State was deleted successfully.', 'event_espresso'));
        }
        if (defined('DOING_AJAX')) {
            $notices                = EE_Error::get_notices(false, false);
            $notices['return_data'] = true;
            echo wp_json_encode($notices);
            die();
        } else {
            $this->_redirect_after_action($success, 'State', 'deleted', array('action' => 'country_settings'));
        }
    }
    
    
    /**
     *        _update_country_settings
     *
     * @access    protected
     * @return        void
     */
    protected function _update_country_settings()
    {
//		EEH_Debug_Tools::printr( $this->_req_data, '$this->_req_data  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
        // grab the country ISO code
        $CNT_ISO = isset($this->_req_data['country']) ? strtoupper(sanitize_text_field($this->_req_data['country'])) : false;
        if ( ! $CNT_ISO) {
            EE_Error::add_error(__('No Country ISO code or an invalid Country ISO code was received.',
                'event_espresso'), __FILE__, __FUNCTION__, __LINE__);
            
            return;
        }
        $cols_n_values                    = array();
        $cols_n_values['CNT_ISO3']        = isset($this->_req_data['cntry'][$CNT_ISO]['CNT_ISO3']) ? strtoupper(sanitize_text_field($this->_req_data['cntry'][$CNT_ISO]['CNT_ISO3'])) : false;
        $cols_n_values['RGN_ID']          = isset($this->_req_data['cntry'][$CNT_ISO]['RGN_ID']) ? absint($this->_req_data['cntry'][$CNT_ISO]['RGN_ID']) : null;
        $cols_n_values['CNT_name']        = isset($this->_req_data['cntry'][$CNT_ISO]['CNT_name']) ? sanitize_text_field($this->_req_data['cntry'][$CNT_ISO]['CNT_name']) : null;
        $cols_n_values['CNT_cur_code']    = isset($this->_req_data['cntry'][$CNT_ISO]['CNT_cur_code']) ? strtoupper(sanitize_text_field($this->_req_data['cntry'][$CNT_ISO]['CNT_cur_code'])) : 'USD';
        $cols_n_values['CNT_cur_single']  = isset($this->_req_data['cntry'][$CNT_ISO]['CNT_cur_single']) ? sanitize_text_field($this->_req_data['cntry'][$CNT_ISO]['CNT_cur_single']) : 'dollar';
        $cols_n_values['CNT_cur_plural']  = isset($this->_req_data['cntry'][$CNT_ISO]['CNT_cur_plural']) ? sanitize_text_field($this->_req_data['cntry'][$CNT_ISO]['CNT_cur_plural']) : 'dollars';
        $cols_n_values['CNT_cur_sign']    = isset($this->_req_data['cntry'][$CNT_ISO]['CNT_cur_sign']) ? sanitize_text_field($this->_req_data['cntry'][$CNT_ISO]['CNT_cur_sign']) : '$';
        $cols_n_values['CNT_cur_sign_b4'] = isset($this->_req_data['cntry'][$CNT_ISO]['CNT_cur_sign_b4']) ? absint($this->_req_data['cntry'][$CNT_ISO]['CNT_cur_sign_b4']) : true;
        $cols_n_values['CNT_cur_dec_plc'] = isset($this->_req_data['cntry'][$CNT_ISO]['CNT_cur_dec_plc']) ? absint($this->_req_data['cntry'][$CNT_ISO]['CNT_cur_dec_plc']) : 2;
        $cols_n_values['CNT_cur_dec_mrk'] = isset($this->_req_data['cntry'][$CNT_ISO]['CNT_cur_dec_mrk']) ? sanitize_text_field($this->_req_data['cntry'][$CNT_ISO]['CNT_cur_dec_mrk']) : '.';
        $cols_n_values['CNT_cur_thsnds']  = isset($this->_req_data['cntry'][$CNT_ISO]['CNT_cur_thsnds']) ? sanitize_text_field($this->_req_data['cntry'][$CNT_ISO]['CNT_cur_thsnds']) : ',';
        $cols_n_values['CNT_tel_code']    = isset($this->_req_data['cntry'][$CNT_ISO]['CNT_tel_code']) ? sanitize_text_field($this->_req_data['cntry'][$CNT_ISO]['CNT_tel_code']) : null;
        $cols_n_values['CNT_is_EU']       = isset($this->_req_data['cntry'][$CNT_ISO]['CNT_is_EU']) ? absint($this->_req_data['cntry'][$CNT_ISO]['CNT_is_EU']) : false;
        $cols_n_values['CNT_active']      = isset($this->_req_data['cntry'][$CNT_ISO]['CNT_active']) ? absint($this->_req_data['cntry'][$CNT_ISO]['CNT_active']) : false;
        // allow filtering of country data
        $cols_n_values = apply_filters('FHEE__General_Settings_Admin_Page___update_country_settings__cols_n_values',
            $cols_n_values);
        //EEH_Debug_Tools::printr( $cols_n_values, '$cols_n_values  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
        // where values
        $where_cols_n_values = array(array('CNT_ISO' => $CNT_ISO));
        // run the update
        $success = EEM_Country::instance()->update($cols_n_values, $where_cols_n_values);
//		global $wpdb;
//		echo '<h4>' . $wpdb->last_query . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//		echo '<h4>$success : ' . $success . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
        if (isset($this->_req_data['states']) && is_array($this->_req_data['states']) && $success !== false) {
            // allow filtering of states data
            $states = apply_filters('FHEE__General_Settings_Admin_Page___update_country_settings__states',
                $this->_req_data['states']);
//			EEH_Debug_Tools::printr( $states, '$states  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
            // loop thru state data ( looks like : states[75][STA_name] )
            foreach ($states as $STA_ID => $state) {
                $cols_n_values = array(
                    'CNT_ISO'    => $CNT_ISO,
                    'STA_abbrev' => sanitize_text_field($state['STA_abbrev']),
                    'STA_name'   => sanitize_text_field($state['STA_name']),
                    'STA_active' => (bool)absint($state['STA_active'])
                );
                // where values
                $where_cols_n_values = array(array('STA_ID' => $STA_ID));
                // run the update
                $success = EEM_State::instance()->update($cols_n_values, $where_cols_n_values);
                if ($success !== false) {
                    do_action('AHEE__General_Settings_Admin_Page__update_country_settings__state_saved', $CNT_ISO,
                        $STA_ID, $cols_n_values);
                }
            }
        }
        // check if country being edited matches org option country, and if so, then  update EE_Config with new settings
        if (isset(EE_Registry::instance()->CFG->organization->CNT_ISO) && $CNT_ISO == EE_Registry::instance()->CFG->organization->CNT_ISO) {
            EE_Registry::instance()->CFG->currency = new EE_Currency_Config($CNT_ISO);
            EE_Registry::instance()->CFG->update_espresso_config();
        }
        $this->_redirect_after_action($success, 'Countries', 'updated',
            array('action' => 'country_settings', 'country' => $CNT_ISO));
    }
    
    
    /**
     *        form_form_field_label_wrap
     *
     * @access        public
     *
     * @param        string $label
     *
     * @return        string
     */
    public function country_form_field_label_wrap($label, $required_text)
    {
        return '
			<tr>
				<th>
					' . $label . '
				</th>';
    }
    
    
    /**
     *        form_form_field_input__wrap
     *
     * @access        public
     *
     * @param        string $label
     *
     * @return        string
     */
    public function country_form_field_input__wrap($input, $label)
    {
        return '
				<td class="general-settings-country-input-td">
					' . $input . '
				</td>
			</tr>';
    }
    
    
    /**
     *        form_form_field_label_wrap
     *
     * @access        public
     *
     * @param        string $label
     * @param        string $required_text
     *
     * @return        string
     */
    public function state_form_field_label_wrap($label, $required_text)
    {
        return $required_text;
    }
    
    
    /**
     *        form_form_field_input__wrap
     *
     * @access        public
     *
     * @param        string $label
     *
     * @return        string
     */
    public function state_form_field_input__wrap($input, $label)
    {
        return '
				<td class="general-settings-country-state-input-td">
					' . $input . '
				</td>';
        
    }
    
    
    
    
    
    
    /***********/
    
    
    /**
     * displays edit and view links for critical EE pages
     *
     * @access public
     *
     * @param int $ee_page_id
     *
     * @return string
     */
    public static function edit_view_links($ee_page_id)
    {
        $links = '<a href="' . add_query_arg(array('post' => $ee_page_id, 'action' => 'edit'),
                admin_url('post.php')) . '" >' . __('Edit', 'event_espresso') . '</a>';
        $links .= ' &nbsp;|&nbsp; ';
        $links .= '<a href="' . get_permalink($ee_page_id) . '" >' . __('View', 'event_espresso') . '</a>';
        
        return $links;
    }
    
    
    /**
     * displays page and shortcode status for critical EE pages
     *
     * @param WP page object $ee_page
     *
     * @return string
     */
    public static function page_and_shortcode_status($ee_page, $shortcode)
    {
        
        // page status
        if (isset($ee_page->post_status) && $ee_page->post_status == 'publish') {
            $pg_colour = 'green';
            $pg_status = sprintf(__('Page%sStatus%sOK', 'event_espresso'), '&nbsp;', '&nbsp;');
        } else {
            $pg_colour = 'red';
            $pg_status = sprintf(__('Page%sVisibility%sProblem', 'event_espresso'), '&nbsp;', '&nbsp;');
        }
        
        // shortcode status
        if (isset($ee_page->post_content) && strpos($ee_page->post_content, $shortcode) !== false) {
            $sc_colour = 'green';
            $sc_status = sprintf(__('Shortcode%sOK', 'event_espresso'), '&nbsp;');
        } else {
            $sc_colour = 'red';
            $sc_status = sprintf(__('Shortcode%sProblem', 'event_espresso'), '&nbsp;');
        }
        
        return '<span style="color:' . $pg_colour . '; margin-right:2em;"><strong>' . $pg_status . '</strong></span><span style="color:' . $sc_colour . '"><strong>' . $sc_status . '</strong></span>';
        
    }
    
    
    /**
     * generates a dropdown of all parent pages - copied from WP core
     *
     * @param unknown_type $default
     * @param unknown_type $parent
     * @param unknown_type $level
     *
     * @return unknown
     */
    public static function page_settings_dropdown($default = 0, $parent = 0, $level = 0)
    {
        global $wpdb;
        $items = $wpdb->get_results($wpdb->prepare("SELECT ID, post_parent, post_title FROM $wpdb->posts WHERE post_parent = %d AND post_type = 'page' AND post_status != 'trash' ORDER BY menu_order",
            $parent));
        
        if ($items) {
            foreach ($items as $item) {
                $pad = str_repeat('&nbsp;', $level * 3);
                if ($item->ID == $default) {
                    $current = ' selected="selected"';
                } else {
                    $current = '';
                }
                
                echo "\n\t<option class='level-$level' value='$item->ID'$current>$pad " . esc_html($item->post_title) . "</option>";
                parent_dropdown($default, $item->ID, $level + 1);
            }
        } else {
            return false;
        }
    }
    
    
} //ends Forms_Admin_Page class
