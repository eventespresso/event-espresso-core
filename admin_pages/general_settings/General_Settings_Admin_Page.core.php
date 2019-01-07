<?php

use EventEspresso\admin_pages\general_settings\AdminOptionsSettings;
use EventEspresso\admin_pages\general_settings\OrganizationSettings;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidFormSubmissionException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;

/**
 * General_Settings_Admin_Page
 * This contains the logic for setting up the Custom General_Settings related pages.  Any methods without phpdoc
 * comments have inline docs with parent class.
 *
 * @package           General_Settings_Admin_Page
 * @subpackage        includes/core/admin/general_settings/General_Settings_Admin_Page.core.php
 * @author            Brent Christensen
 * ------------------------------------------------------------------------
 */
class General_Settings_Admin_Page extends EE_Admin_Page
{

    /**
     * _question_group
     * holds the specific question group object for the question group details screen
     *
     * @var object
     */
    protected $_question_group;


    /**
     * Initialize basic properties.
     */
    protected function _init_page_props()
    {
        $this->page_slug = GEN_SET_PG_SLUG;
        $this->page_label = GEN_SET_LABEL;
        $this->_admin_base_url = GEN_SET_ADMIN_URL;
        $this->_admin_base_path = GEN_SET_ADMIN;
    }


    /**
     * Set ajax hooks
     */
    protected function _ajax_hooks()
    {
        add_action('wp_ajax_espresso_display_country_settings', array($this, 'display_country_settings'));
        add_action('wp_ajax_espresso_display_country_states', array($this, 'display_country_states'));
        add_action('wp_ajax_espresso_delete_state', array($this, 'delete_state'), 10, 3);
        add_action('wp_ajax_espresso_add_new_state', array($this, 'add_new_state'));
    }


    /**
     * More page properties initialization.
     */
    protected function _define_page_props()
    {
        $this->_admin_page_title = GEN_SET_LABEL;
        $this->_labels = array(
            'publishbox' => __('Update Settings', 'event_espresso'),
        );
    }


    /**
     * Set page routes property.
     */
    protected function _set_page_routes()
    {
        $this->_page_routes = array(

            'critical_pages'                => array(
                'func'       => '_espresso_page_settings',
                'capability' => 'manage_options',
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
                'capability' => 'manage_options',
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

            'delete_state'            => array(
                'func'       => 'delete_state',
                'capability' => 'manage_options',
                'noheader'   => true,
            ),
            'privacy_settings'        => array(
                'func'       => 'privacySettings',
                'capability' => 'manage_options',
            ),
            'update_privacy_settings' => array(
                'func'               => 'updatePrivacySettings',
                'capability'         => 'manage_options',
                'noheader'           => true,
                'headers_sent_route' => 'privacy_settings',
            ),
        );
    }


    /**
     * Set page configuration property
     */
    protected function _set_page_config()
    {
        $this->_page_config = array(
            'critical_pages'        => array(
                'nav'           => array(
                    'label' => __('Critical Pages', 'event_espresso'),
                    'order' => 50,
                ),
                'metaboxes'     => array_merge($this->_default_espresso_metaboxes, array('_publish_post_box')),
                'help_tabs'     => array(
                    'general_settings_critical_pages_help_tab' => array(
                        'title'    => __('Critical Pages', 'event_espresso'),
                        'filename' => 'general_settings_critical_pages',
                    ),
                ),
                'help_tour'     => array('Critical_Pages_Help_Tour'),
                'require_nonce' => false,
            ),
            'default'               => array(
                'nav'           => array(
                    'label' => __('Your Organization', 'event_espresso'),
                    'order' => 20,
                ),
                'help_tabs'     => array(
                    'general_settings_your_organization_help_tab' => array(
                        'title'    => __('Your Organization', 'event_espresso'),
                        'filename' => 'general_settings_your_organization',
                    ),
                ),
                'help_tour'     => array('Your_Organization_Help_Tour'),
                'metaboxes'     => array_merge($this->_default_espresso_metaboxes, array('_publish_post_box')),
                'require_nonce' => false,
            ),
            'admin_option_settings' => array(
                'nav'           => array(
                    'label' => __('Admin Options', 'event_espresso'),
                    'order' => 60,
                ),
                'metaboxes'     => array_merge($this->_default_espresso_metaboxes, array('_publish_post_box')),
                'help_tabs'     => array(
                    'general_settings_admin_options_help_tab' => array(
                        'title'    => __('Admin Options', 'event_espresso'),
                        'filename' => 'general_settings_admin_options',
                    ),
                ),
                'help_tour'     => array('Admin_Options_Help_Tour'),
                'require_nonce' => false,
            ),
            'country_settings'      => array(
                'nav'           => array(
                    'label' => __('Countries', 'event_espresso'),
                    'order' => 70,
                ),
                'help_tabs'     => array(
                    'general_settings_countries_help_tab' => array(
                        'title'    => __('Countries', 'event_espresso'),
                        'filename' => 'general_settings_countries',
                    ),
                ),
                'help_tour'     => array('Countries_Help_Tour'),
                'require_nonce' => false,
            ),
            'privacy_settings'      => array(
                'nav'           => array(
                    'label' => esc_html__('Privacy', 'event_espresso'),
                    'order' => 80,
                ),
                'metaboxes'     => array_merge($this->_default_espresso_metaboxes, array('_publish_post_box')),
                'require_nonce' => false,
            ),
        );
    }


    protected function _add_screen_options()
    {
    }


    protected function _add_feature_pointers()
    {
    }


    /**
     * Enqueue global scripts and styles for all routes in the General Settings Admin Pages.
     */
    public function load_scripts_styles()
    {
        // styles
        wp_enqueue_style('espresso-ui-theme');
        // scripts
        wp_enqueue_script('ee_admin_js');
    }


    /**
     * Execute logic running on `admin_init`
     */
    public function admin_init()
    {
        EE_Registry::$i18n_js_strings['invalid_server_response'] = __(
            'An error occurred! Your request may have been processed, but a valid response from the server was not received. Please refresh the page and try again.',
            'event_espresso'
        );
        EE_Registry::$i18n_js_strings['error_occurred'] = __(
            'An error occurred! Please refresh the page and try again.',
            'event_espresso'
        );
        EE_Registry::$i18n_js_strings['confirm_delete_state'] = __(
            'Are you sure you want to delete this State / Province?',
            'event_espresso'
        );
        $protocol = isset($_SERVER['HTTPS']) ? 'https://' : 'http://';
        EE_Registry::$i18n_js_strings['ajax_url'] = admin_url(
            'admin-ajax.php?page=espresso_general_settings',
            $protocol
        );
    }


    public function admin_notices()
    {
    }


    public function admin_footer_scripts()
    {
    }


    /**
     * Enqueue scripts and styles for the default route.
     */
    public function load_scripts_styles_default()
    {
        // styles
        wp_enqueue_style('thickbox');
        // scripts
        wp_enqueue_script('media-upload');
        wp_enqueue_script('thickbox');
        wp_register_script(
            'organization_settings',
            GEN_SET_ASSETS_URL . 'your_organization_settings.js',
            array('jquery', 'media-upload', 'thickbox'),
            EVENT_ESPRESSO_VERSION,
            true
        );
        wp_register_style('organization-css', GEN_SET_ASSETS_URL . 'organization.css', array(), EVENT_ESPRESSO_VERSION);
        wp_enqueue_script('organization_settings');
        wp_enqueue_style('organization-css');
        $confirm_image_delete = array(
            'text' => __(
                'Do you really want to delete this image? Please remember to save your settings to complete the removal.',
                'event_espresso'
            ),
        );
        wp_localize_script('organization_settings', 'confirm_image_delete', $confirm_image_delete);
    }


    /**
     * Enqueue scripts and styles for the country settings route.
     */
    public function load_scripts_styles_country_settings()
    {
        // scripts
        wp_register_script(
            'gen_settings_countries',
            GEN_SET_ASSETS_URL . 'gen_settings_countries.js',
            array('ee_admin_js'),
            EVENT_ESPRESSO_VERSION,
            true
        );
        wp_register_style('organization-css', GEN_SET_ASSETS_URL . 'organization.css', array(), EVENT_ESPRESSO_VERSION);
        wp_enqueue_script('gen_settings_countries');
        wp_enqueue_style('organization-css');
    }


    /*************        Espresso Pages        *************/
    /**
     * _espresso_page_settings
     *
     * @throws \EE_Error
     * @throws DomainException
     * @throws DomainException
     * @throws InvalidDataTypeException
     * @throws InvalidArgumentException
     */
    protected function _espresso_page_settings()
    {
        // Check to make sure all of the main pages are setup properly,
        // if not create the default pages and display an admin notice
        EEH_Activation::verify_default_pages_exist();
        $this->_transient_garbage_collection();
        $this->_template_args['values'] = $this->_yes_no_values;
        $this->_template_args['reg_page_id'] = isset(EE_Registry::instance()->CFG->core->reg_page_id)
            ? EE_Registry::instance()->CFG->core->reg_page_id
            : null;
        $this->_template_args['reg_page_obj'] = isset(EE_Registry::instance()->CFG->core->reg_page_id)
            ? get_page(EE_Registry::instance()->CFG->core->reg_page_id)
            : false;
        $this->_template_args['txn_page_id'] = isset(EE_Registry::instance()->CFG->core->txn_page_id)
            ? EE_Registry::instance()->CFG->core->txn_page_id
            : null;
        $this->_template_args['txn_page_obj'] = isset(EE_Registry::instance()->CFG->core->txn_page_id)
            ? get_page(EE_Registry::instance()->CFG->core->txn_page_id)
            : false;
        $this->_template_args['thank_you_page_id'] = isset(EE_Registry::instance()->CFG->core->thank_you_page_id)
            ? EE_Registry::instance()->CFG->core->thank_you_page_id
            : null;
        $this->_template_args['thank_you_page_obj'] = isset(EE_Registry::instance()->CFG->core->thank_you_page_id)
            ? get_page(EE_Registry::instance()->CFG->core->thank_you_page_id)
            : false;
        $this->_template_args['cancel_page_id'] = isset(EE_Registry::instance()->CFG->core->cancel_page_id)
            ? EE_Registry::instance()->CFG->core->cancel_page_id
            : null;
        $this->_template_args['cancel_page_obj'] = isset(EE_Registry::instance()->CFG->core->cancel_page_id)
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


    /**
     * Handler for updating espresso page settings.
     *
     * @throws EE_Error
     */
    protected function _update_espresso_page_settings()
    {
        // capture incoming request data && set page IDs
        EE_Registry::instance()->CFG->core->reg_page_id = isset($this->_req_data['reg_page_id'])
            ? absint($this->_req_data['reg_page_id'])
            : EE_Registry::instance()->CFG->core->reg_page_id;
        EE_Registry::instance()->CFG->core->txn_page_id = isset($this->_req_data['txn_page_id'])
            ? absint($this->_req_data['txn_page_id'])
            : EE_Registry::instance()->CFG->core->txn_page_id;
        EE_Registry::instance()->CFG->core->thank_you_page_id = isset($this->_req_data['thank_you_page_id'])
            ? absint($this->_req_data['thank_you_page_id'])
            : EE_Registry::instance()->CFG->core->thank_you_page_id;
        EE_Registry::instance()->CFG->core->cancel_page_id = isset($this->_req_data['cancel_page_id'])
            ? absint($this->_req_data['cancel_page_id'])
            : EE_Registry::instance()->CFG->core->cancel_page_id;

        EE_Registry::instance()->CFG->core = apply_filters(
            'FHEE__General_Settings_Admin_Page___update_espresso_page_settings__CFG_core',
            EE_Registry::instance()->CFG->core,
            $this->_req_data
        );
        $what = __('Critical Pages & Shortcodes', 'event_espresso');
        $this->_redirect_after_action(
            $this->_update_espresso_configuration(
                $what,
                EE_Registry::instance()->CFG->core,
                __FILE__,
                __FUNCTION__,
                __LINE__
            ),
            $what,
            '',
            array(
                'action' => 'critical_pages',
            ),
            true
        );
    }


    /*************        Your Organization        *************/


    /**
     * @throws DomainException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    protected function _your_organization_settings()
    {
        $this->_template_args['admin_page_content'] = '';
        try {
            /** @var EventEspresso\admin_pages\general_settings\OrganizationSettings $organization_settings_form */
            $organization_settings_form = $this->loader->getShared(
                'EventEspresso\admin_pages\general_settings\OrganizationSettings'
            );
            $this->_template_args['admin_page_content'] = $organization_settings_form->display();
        } catch (Exception $e) {
            EE_Error::add_error($e->getMessage(), __FILE__, __FUNCTION__, __LINE__);
        }
        $this->_set_add_edit_form_tags('update_your_organization_settings');
        $this->_set_publish_post_box_vars(null, false, false, null, false);
        $this->display_admin_page_with_sidebar();
    }


    /**
     * Handler for updating organization settings.
     *
     * @throws EE_Error
     */
    protected function _update_your_organization_settings()
    {
        try {
            /** @var EventEspresso\admin_pages\general_settings\OrganizationSettings $organization_settings_form */
            $organization_settings_form = $this->loader->getShared(
                'EventEspresso\admin_pages\general_settings\OrganizationSettings'
            );
            $success = $organization_settings_form->process($this->_req_data);
            EE_Registry::instance()->CFG = apply_filters(
                'FHEE__General_Settings_Admin_Page___update_your_organization_settings__CFG',
                EE_Registry::instance()->CFG
            );
        } catch (Exception $e) {
            EE_Error::add_error($e->getMessage(), __FILE__, __FUNCTION__, __LINE__);
            $success = false;
        }

        if ($success) {
            $success = $this->_update_espresso_configuration(
                esc_html__('Your Organization Settings', 'event_espresso'),
                EE_Registry::instance()->CFG,
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        }

        $this->_redirect_after_action($success, '', '', array('action' => 'default'), true);
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
     * @throws InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidFormSubmissionException
     * @throws \InvalidArgumentException
     * @throws \LogicException
     */
    protected function _update_admin_option_settings()
    {
        try {
            $admin_options_settings_form = new AdminOptionsSettings(EE_Registry::instance());
            $admin_options_settings_form->process($this->_req_data[ $admin_options_settings_form->slug() ]);
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
                    __FILE__,
                    __FUNCTION__,
                    __LINE__
                )
            ),
            'Admin Options',
            'updated',
            array('action' => 'admin_option_settings')
        );
    }


    /*************        Countries        *************/


    /**
     * @return string
     */
    protected function getCountryIsoForSite()
    {
        return ! empty(EE_Registry::instance()->CFG->organization->CNT_ISO)
            ? EE_Registry::instance()->CFG->organization->CNT_ISO
            : 'US';
    }


    /**
     * @param string          $CNT_ISO
     * @param EE_Country|null $country
     * @return EE_Base_Class|EE_Country
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    protected function verifyOrGetCountryFromIso($CNT_ISO, EE_Country $country = null)
    {
        /** @var EE_Country $country */
        return $country instanceof EE_Country && $country->ID() === $CNT_ISO
            ? $country
            : EEM_Country::instance()->get_one_by_ID($CNT_ISO);
    }


    /**
     * Output Country Settings view.
     *
     * @throws DomainException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    protected function _country_settings()
    {
        $CNT_ISO_for_site = $this->getCountryIsoForSite();
        $CNT_ISO = isset($this->_req_data['country'])
            ? strtoupper(sanitize_text_field($this->_req_data['country']))
            : $CNT_ISO_for_site;

        // load field generator helper

        $this->_template_args['values'] = $this->_yes_no_values;

        $this->_template_args['countries'] = new EE_Question_Form_Input(
            EE_Question::new_instance(
                array(
                    'QST_ID'           => 0,
                    'QST_display_text' => __('Select Country', 'event_espresso'),
                    'QST_system'       => 'admin-country',
                )
            ),
            EE_Answer::new_instance(
                array(
                    'ANS_ID'    => 0,
                    'ANS_value' => $CNT_ISO,
                )
            ),
            array(
                'input_id'       => 'country',
                'input_name'     => 'country',
                'input_prefix'   => '',
                'append_qstn_id' => false,
            )
        );
        $country = $this->verifyOrGetCountryFromIso($CNT_ISO_for_site);
        add_filter('FHEE__EEH_Form_Fields__label_html', array($this, 'country_form_field_label_wrap'), 10, 2);
        add_filter('FHEE__EEH_Form_Fields__input_html', array($this, 'country_form_field_input__wrap'), 10, 2);
        $this->_template_args['country_details_settings'] = $this->display_country_settings(
            $country->ID(),
            $country
        );
        $this->_template_args['country_states_settings'] = $this->display_country_states(
            $country->ID(),
            $country
        );
        $this->_template_args['CNT_name_for_site'] = $country->name();

        $this->_set_add_edit_form_tags('update_country_settings');
        $this->_set_publish_post_box_vars(null, false, false, null, false);
        $this->_template_args['admin_page_content'] = EEH_Template::display_template(
            GEN_SET_TEMPLATE_PATH . 'countries_settings.template.php',
            $this->_template_args,
            true
        );
        $this->display_admin_page_with_no_sidebar();
    }


    /**
     *        display_country_settings
     *
     * @param string          $CNT_ISO
     * @param EE_Country|null $country
     * @return mixed string | array$country
     * @throws DomainException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function display_country_settings($CNT_ISO = '', EE_Country $country = null)
    {
        $CNT_ISO_for_site = $this->getCountryIsoForSite();

        $CNT_ISO = isset($this->_req_data['country'])
            ? strtoupper(sanitize_text_field($this->_req_data['country']))
            : $CNT_ISO;
        if (! $CNT_ISO) {
            return '';
        }

        // for ajax
        remove_all_filters('FHEE__EEH_Form_Fields__label_html');
        remove_all_filters('FHEE__EEH_Form_Fields__input_html');
        add_filter('FHEE__EEH_Form_Fields__label_html', array($this, 'country_form_field_label_wrap'), 10, 2);
        add_filter('FHEE__EEH_Form_Fields__input_html', array($this, 'country_form_field_input__wrap'), 10, 2);
        $country = $this->verifyOrGetCountryFromIso($CNT_ISO, $country);
        $CNT_cur_disabled = $CNT_ISO !== $CNT_ISO_for_site;
        $this->_template_args['CNT_cur_disabled'] = $CNT_cur_disabled;

        $country_input_types = array(
            'CNT_active'      => array(
                'type'             => 'RADIO_BTN',
                'input_name'       => 'cntry[' . $CNT_ISO . ']',
                'class'            => '',
                'options'          => $this->_yes_no_values,
                'use_desc_4_label' => true,
            ),
            'CNT_ISO'         => array(
                'type'       => 'TEXT',
                'input_name' => 'cntry[' . $CNT_ISO . ']',
                'class'      => 'small-text',
            ),
            'CNT_ISO3'        => array(
                'type'       => 'TEXT',
                'input_name' => 'cntry[' . $CNT_ISO . ']',
                'class'      => 'small-text',
            ),
            'RGN_ID'          => array(
                'type'       => 'TEXT',
                'input_name' => 'cntry[' . $CNT_ISO . ']',
                'class'      => 'small-text',
            ),
            'CNT_name'        => array(
                'type'       => 'TEXT',
                'input_name' => 'cntry[' . $CNT_ISO . ']',
                'class'      => 'regular-text',
            ),
            'CNT_cur_code'    => array(
                'type'       => 'TEXT',
                'input_name' => 'cntry[' . $CNT_ISO . ']',
                'class'      => 'small-text',
                'disabled'   => $CNT_cur_disabled,
            ),
            'CNT_cur_single'  => array(
                'type'       => 'TEXT',
                'input_name' => 'cntry[' . $CNT_ISO . ']',
                'class'      => 'medium-text',
                'disabled'   => $CNT_cur_disabled,
            ),
            'CNT_cur_plural'  => array(
                'type'       => 'TEXT',
                'input_name' => 'cntry[' . $CNT_ISO . ']',
                'class'      => 'medium-text',
                'disabled'   => $CNT_cur_disabled,
            ),
            'CNT_cur_sign'    => array(
                'type'         => 'TEXT',
                'input_name'   => 'cntry[' . $CNT_ISO . ']',
                'class'        => 'small-text',
                'htmlentities' => false,
                'disabled'     => $CNT_cur_disabled,
            ),
            'CNT_cur_sign_b4' => array(
                'type'             => 'RADIO_BTN',
                'input_name'       => 'cntry[' . $CNT_ISO . ']',
                'class'            => '',
                'options'          => $this->_yes_no_values,
                'use_desc_4_label' => true,
                'disabled'         => $CNT_cur_disabled,
            ),
            'CNT_cur_dec_plc' => array(
                'type'       => 'RADIO_BTN',
                'input_name' => 'cntry[' . $CNT_ISO . ']',
                'class'      => '',
                'options'    => array(
                    array('id' => 0, 'text' => ''),
                    array('id' => 1, 'text' => ''),
                    array('id' => 2, 'text' => ''),
                    array('id' => 3, 'text' => ''),
                ),
                'disabled'   => $CNT_cur_disabled,
            ),
            'CNT_cur_dec_mrk' => array(
                'type'             => 'RADIO_BTN',
                'input_name'       => 'cntry[' . $CNT_ISO . ']',
                'class'            => '',
                'options'          => array(
                    array(
                        'id'   => ',',
                        'text' => __(', (comma)', 'event_espresso'),
                    ),
                    array('id' => '.', 'text' => __('. (decimal)', 'event_espresso')),
                ),
                'use_desc_4_label' => true,
                'disabled'         => $CNT_cur_disabled,
            ),
            'CNT_cur_thsnds'  => array(
                'type'             => 'RADIO_BTN',
                'input_name'       => 'cntry[' . $CNT_ISO . ']',
                'class'            => '',
                'options'          => array(
                    array(
                        'id'   => ',',
                        'text' => __(', (comma)', 'event_espresso'),
                    ),
                    array('id' => '.', 'text' => __('. (decimal)', 'event_espresso')),
                ),
                'use_desc_4_label' => true,
                'disabled'         => $CNT_cur_disabled,
            ),
            'CNT_tel_code'    => array(
                'type'       => 'TEXT',
                'input_name' => 'cntry[' . $CNT_ISO . ']',
                'class'      => 'small-text',
            ),
            'CNT_is_EU'       => array(
                'type'             => 'RADIO_BTN',
                'input_name'       => 'cntry[' . $CNT_ISO . ']',
                'class'            => '',
                'options'          => $this->_yes_no_values,
                'use_desc_4_label' => true,
            ),
        );
        $this->_template_args['inputs'] = EE_Question_Form_Input::generate_question_form_inputs_for_object(
            $country,
            $country_input_types
        );
        $country_details_settings = EEH_Template::display_template(
            GEN_SET_TEMPLATE_PATH . 'country_details_settings.template.php',
            $this->_template_args,
            true
        );

        if (defined('DOING_AJAX')) {
            $notices = EE_Error::get_notices(false, false, false);
            echo wp_json_encode(
                array(
                    'return_data' => $country_details_settings,
                    'success'     => $notices['success'],
                    'errors'      => $notices['errors'],
                )
            );
            die();
        } else {
            return $country_details_settings;
        }
    }


    /**
     * @param string          $CNT_ISO
     * @param EE_Country|null $country
     * @return string
     * @throws DomainException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function display_country_states($CNT_ISO = '', EE_Country $country = null)
    {

        $CNT_ISO = isset($this->_req_data['country'])
            ? sanitize_text_field($this->_req_data['country'])
            : $CNT_ISO;
        if (! $CNT_ISO) {
            return '';
        }
        // for ajax
        remove_all_filters('FHEE__EEH_Form_Fields__label_html');
        remove_all_filters('FHEE__EEH_Form_Fields__input_html');
        add_filter('FHEE__EEH_Form_Fields__label_html', array($this, 'state_form_field_label_wrap'), 10, 2);
        add_filter('FHEE__EEH_Form_Fields__input_html', array($this, 'state_form_field_input__wrap'), 10, 2);
        $states = EEM_State::instance()->get_all_states_for_these_countries(array($CNT_ISO => $CNT_ISO));
        if (empty($states)) {
            /** @var EventEspresso\core\services\address\CountrySubRegionDao $countrySubRegionDao */
            $countrySubRegionDao = $this->loader->getShared(
                'EventEspresso\core\services\address\CountrySubRegionDao'
            );
            if ($countrySubRegionDao instanceof EventEspresso\core\services\address\CountrySubRegionDao) {
                $country = $this->verifyOrGetCountryFromIso($CNT_ISO, $country);
                if ($countrySubRegionDao->saveCountrySubRegions($country)) {
                    $states = EEM_State::instance()->get_all_states_for_these_countries(
                        array($CNT_ISO => $CNT_ISO)
                    );
                }
            }
        }
        if (is_array($states)) {
            foreach ($states as $STA_ID => $state) {
                if ($state instanceof EE_State) {
                    // STA_abbrev    STA_name    STA_active
                    $state_input_types = array(
                        'STA_abbrev' => array(
                            'type'       => 'TEXT',
                            'input_name' => 'states[' . $STA_ID . ']',
                            'class'      => 'mid-text',
                        ),
                        'STA_name'   => array(
                            'type'       => 'TEXT',
                            'input_name' => 'states[' . $STA_ID . ']',
                            'class'      => 'regular-text',
                        ),
                        'STA_active' => array(
                            'type'             => 'RADIO_BTN',
                            'input_name'       => 'states[' . $STA_ID . ']',
                            'options'          => $this->_yes_no_values,
                            'use_desc_4_label' => true,
                        ),
                    );
                    $this->_template_args['states'][ $STA_ID ]['inputs'] =
                        EE_Question_Form_Input::generate_question_form_inputs_for_object(
                            $state,
                            $state_input_types
                        );
                    $query_args = array(
                        'action'     => 'delete_state',
                        'STA_ID'     => $STA_ID,
                        'CNT_ISO'    => $CNT_ISO,
                        'STA_abbrev' => $state->abbrev(),
                    );
                    $this->_template_args['states'][ $STA_ID ]['delete_state_url'] =
                        EE_Admin_Page::add_query_args_and_nonce(
                            $query_args,
                            GEN_SET_ADMIN_URL
                        );
                }
            }
        } else {
            $this->_template_args['states'] = false;
        }

        $this->_template_args['add_new_state_url'] = EE_Admin_Page::add_query_args_and_nonce(
            array('action' => 'add_new_state'),
            GEN_SET_ADMIN_URL
        );

        $state_details_settings = EEH_Template::display_template(
            GEN_SET_TEMPLATE_PATH . 'state_details_settings.template.php',
            $this->_template_args,
            true
        );

        if (defined('DOING_AJAX')) {
            $notices = EE_Error::get_notices(false, false, false);
            echo wp_json_encode(
                array(
                    'return_data' => $state_details_settings,
                    'success'     => $notices['success'],
                    'errors'      => $notices['errors'],
                )
            );
            die();
        } else {
            return $state_details_settings;
        }
    }


    /**
     *        add_new_state
     *
     * @access    public
     * @return void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function add_new_state()
    {

        $success = true;

        $CNT_ISO = isset($this->_req_data['CNT_ISO'])
            ? strtoupper(sanitize_text_field($this->_req_data['CNT_ISO']))
            : false;
        if (! $CNT_ISO) {
            EE_Error::add_error(
                __('No Country ISO code or an invalid Country ISO code was received.', 'event_espresso'),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            $success = false;
        }
        $STA_abbrev = isset($this->_req_data['STA_abbrev'])
            ? sanitize_text_field($this->_req_data['STA_abbrev'])
            : false;
        if (! $STA_abbrev) {
            EE_Error::add_error(
                __('No State ISO code or an invalid State ISO code was received.', 'event_espresso'),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            $success = false;
        }
        $STA_name = isset($this->_req_data['STA_name'])
            ? sanitize_text_field($this->_req_data['STA_name'])
            : false;
        if (! $STA_name) {
            EE_Error::add_error(
                __('No State name or an invalid State name was received.', 'event_espresso'),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            $success = false;
        }

        if ($success) {
            $cols_n_values = array(
                'CNT_ISO'    => $CNT_ISO,
                'STA_abbrev' => $STA_abbrev,
                'STA_name'   => $STA_name,
                'STA_active' => true,
            );
            $success = EEM_State::instance()->insert($cols_n_values);
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
     * @return        boolean
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function delete_state()
    {
        $CNT_ISO = isset($this->_req_data['CNT_ISO'])
            ? strtoupper(sanitize_text_field($this->_req_data['CNT_ISO']))
            : false;
        $STA_ID = isset($this->_req_data['STA_ID'])
            ? sanitize_text_field($this->_req_data['STA_ID'])
            : false;
        $STA_abbrev = isset($this->_req_data['STA_abbrev'])
            ? sanitize_text_field($this->_req_data['STA_abbrev'])
            : false;
        if (! $STA_ID) {
            EE_Error::add_error(
                __('No State ID or an invalid State ID was received.', 'event_espresso'),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            return false;
        }

        $success = EEM_State::instance()->delete_by_ID($STA_ID);
        if ($success !== false) {
            do_action(
                'AHEE__General_Settings_Admin_Page__delete_state__state_deleted',
                $CNT_ISO,
                $STA_ID,
                array('STA_abbrev' => $STA_abbrev)
            );
            EE_Error::add_success(__('The State was deleted successfully.', 'event_espresso'));
        }
        if (defined('DOING_AJAX')) {
            $notices = EE_Error::get_notices(false, false);
            $notices['return_data'] = true;
            echo wp_json_encode($notices);
            die();
        } else {
            $this->_redirect_after_action(
                $success,
                'State',
                'deleted',
                array('action' => 'country_settings')
            );
        }
    }


    /**
     *        _update_country_settings
     *
     * @access    protected
     * @return void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    protected function _update_country_settings()
    {
        // grab the country ISO code
        $CNT_ISO = isset($this->_req_data['country'])
            ? strtoupper(sanitize_text_field($this->_req_data['country']))
            : false;
        if (! $CNT_ISO) {
            EE_Error::add_error(
                __('No Country ISO code or an invalid Country ISO code was received.', 'event_espresso'),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );

            return;
        }
        $cols_n_values = array();
        $cols_n_values['CNT_ISO3'] = isset($this->_req_data['cntry'][ $CNT_ISO ]['CNT_ISO3'])
            ? strtoupper(sanitize_text_field($this->_req_data['cntry'][ $CNT_ISO ]['CNT_ISO3']))
            : false;
        $cols_n_values['RGN_ID'] = isset($this->_req_data['cntry'][ $CNT_ISO ]['RGN_ID'])
            ? absint($this->_req_data['cntry'][ $CNT_ISO ]['RGN_ID'])
            : null;
        $cols_n_values['CNT_name'] = isset($this->_req_data['cntry'][ $CNT_ISO ]['CNT_name'])
            ? sanitize_text_field($this->_req_data['cntry'][ $CNT_ISO ]['CNT_name'])
            : null;
        if (isset($this->_req_data['cntry'][ $CNT_ISO ]['CNT_cur_code'])) {
            $cols_n_values['CNT_cur_code'] = strtoupper(
                sanitize_text_field($this->_req_data['cntry'][ $CNT_ISO ]['CNT_cur_code'])
            );
        }
        if (isset($this->_req_data['cntry'][ $CNT_ISO ]['CNT_cur_single'])) {
            $cols_n_values['CNT_cur_single'] = sanitize_text_field(
                $this->_req_data['cntry'][ $CNT_ISO ]['CNT_cur_single']
            );
        }
        if (isset($this->_req_data['cntry'][ $CNT_ISO ]['CNT_cur_plural'])) {
            $cols_n_values['CNT_cur_plural'] = sanitize_text_field(
                $this->_req_data['cntry'][ $CNT_ISO ]['CNT_cur_plural']
            );
        }
        if (isset($this->_req_data['cntry'][ $CNT_ISO ]['CNT_cur_sign'])) {
            $cols_n_values['CNT_cur_sign'] = sanitize_text_field(
                $this->_req_data['cntry'][ $CNT_ISO ]['CNT_cur_sign']
            );
        }
        if (isset($this->_req_data['cntry'][ $CNT_ISO ]['CNT_cur_sign_b4'])) {
            $cols_n_values['CNT_cur_sign_b4'] = absint(
                $this->_req_data['cntry'][ $CNT_ISO ]['CNT_cur_sign_b4']
            );
        }
        if (isset($this->_req_data['cntry'][ $CNT_ISO ]['CNT_cur_dec_plc'])) {
            $cols_n_values['CNT_cur_dec_plc'] = absint(
                $this->_req_data['cntry'][ $CNT_ISO ]['CNT_cur_dec_plc']
            );
        }
        if (isset($this->_req_data['cntry'][ $CNT_ISO ]['CNT_cur_dec_mrk'])) {
            $cols_n_values['CNT_cur_dec_mrk'] = sanitize_text_field(
                $this->_req_data['cntry'][ $CNT_ISO ]['CNT_cur_dec_mrk']
            );
        }
        if (isset($this->_req_data['cntry'][ $CNT_ISO ]['CNT_cur_thsnds'])) {
            $cols_n_values['CNT_cur_thsnds'] = sanitize_text_field(
                $this->_req_data['cntry'][ $CNT_ISO ]['CNT_cur_thsnds']
            );
        }
        $cols_n_values['CNT_tel_code'] = isset($this->_req_data['cntry'][ $CNT_ISO ]['CNT_tel_code'])
            ? sanitize_text_field($this->_req_data['cntry'][ $CNT_ISO ]['CNT_tel_code'])
            : null;
        $cols_n_values['CNT_is_EU'] = isset($this->_req_data['cntry'][ $CNT_ISO ]['CNT_is_EU'])
            ? absint($this->_req_data['cntry'][ $CNT_ISO ]['CNT_is_EU'])
            : false;
        $cols_n_values['CNT_active'] = isset($this->_req_data['cntry'][ $CNT_ISO ]['CNT_active'])
            ? absint($this->_req_data['cntry'][ $CNT_ISO ]['CNT_active'])
            : false;
        // allow filtering of country data
        $cols_n_values = apply_filters(
            'FHEE__General_Settings_Admin_Page___update_country_settings__cols_n_values',
            $cols_n_values
        );

        // where values
        $where_cols_n_values = array(array('CNT_ISO' => $CNT_ISO));
        // run the update
        $success = EEM_Country::instance()->update($cols_n_values, $where_cols_n_values);

        if (isset($this->_req_data['states']) && is_array($this->_req_data['states']) && $success !== false) {
            // allow filtering of states data
            $states = apply_filters(
                'FHEE__General_Settings_Admin_Page___update_country_settings__states',
                $this->_req_data['states']
            );

            // loop thru state data ( looks like : states[75][STA_name] )
            foreach ($states as $STA_ID => $state) {
                $cols_n_values = array(
                    'CNT_ISO'    => $CNT_ISO,
                    'STA_abbrev' => sanitize_text_field($state['STA_abbrev']),
                    'STA_name'   => sanitize_text_field($state['STA_name']),
                    'STA_active' => (bool) absint($state['STA_active']),
                );
                // where values
                $where_cols_n_values = array(array('STA_ID' => $STA_ID));
                // run the update
                $success = EEM_State::instance()->update($cols_n_values, $where_cols_n_values);
                if ($success !== false) {
                    do_action(
                        'AHEE__General_Settings_Admin_Page__update_country_settings__state_saved',
                        $CNT_ISO,
                        $STA_ID,
                        $cols_n_values
                    );
                }
            }
        }
        // check if country being edited matches org option country, and if so, then  update EE_Config with new settings
        if (isset(EE_Registry::instance()->CFG->organization->CNT_ISO)
            && $CNT_ISO == EE_Registry::instance()->CFG->organization->CNT_ISO
        ) {
            EE_Registry::instance()->CFG->currency = new EE_Currency_Config($CNT_ISO);
            EE_Registry::instance()->CFG->update_espresso_config();
        }

        if ($success !== false) {
            EE_Error::add_success(
                esc_html__('Country Settings updated successfully.', 'event_espresso')
            );
        }
        $this->_redirect_after_action(
            $success,
            '',
            '',
            array('action' => 'country_settings', 'country' => $CNT_ISO),
            true
        );
    }


    /**
     *        form_form_field_label_wrap
     *
     * @access        public
     * @param        string $label
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
     * @param        string $label
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
     * @param        string $label
     * @param        string $required_text
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
     * @param        string $label
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
     * @param int $ee_page_id
     * @return string
     */
    public static function edit_view_links($ee_page_id)
    {
        $links = '<a href="'
                 . add_query_arg(
                     array('post' => $ee_page_id, 'action' => 'edit'),
                     admin_url('post.php')
                 )
                 . '" >'
                 . __('Edit', 'event_espresso')
                 . '</a>';
        $links .= ' &nbsp;|&nbsp; ';
        $links .= '<a href="' . get_permalink($ee_page_id) . '" >' . __('View', 'event_espresso') . '</a>';

        return $links;
    }


    /**
     * displays page and shortcode status for critical EE pages
     *
     * @param WP page object $ee_page
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

        return '<span style="color:' . $pg_colour . '; margin-right:2em;"><strong>'
               . $pg_status
               . '</strong></span><span style="color:' . $sc_colour . '"><strong>' . $sc_status . '</strong></span>';
    }


    /**
     * generates a dropdown of all parent pages - copied from WP core
     *
     * @param int $default
     * @param int $parent
     * @param int $level
     */
    public static function page_settings_dropdown($default = 0, $parent = 0, $level = 0)
    {
        global $wpdb;
        $items = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT ID, post_parent, post_title FROM $wpdb->posts WHERE post_parent = %d AND post_type = 'page' AND post_status != 'trash' ORDER BY menu_order",
                $parent
            )
        );

        if ($items) {
            foreach ($items as $item) {
                $pad = str_repeat('&nbsp;', $level * 3);
                if ($item->ID == $default) {
                    $current = ' selected="selected"';
                } else {
                    $current = '';
                }

                echo "\n\t<option class='level-$level' value='$item->ID'$current>$pad "
                     . esc_html($item->post_title)
                     . "</option>";
                parent_dropdown($default, $item->ID, $level + 1);
            }
        }
    }


    /**
     * Loads the scripts for the privacy settings form
     */
    public function load_scripts_styles_privacy_settings()
    {
        $form_handler = $this->loader->getShared('EventEspresso\core\domain\services\admin\privacy\forms\PrivacySettingsFormHandler');
        $form_handler->enqueueStylesAndScripts();
    }


    /**
     * display the privacy settings form
     */
    public function privacySettings()
    {
        $this->_set_add_edit_form_tags('update_privacy_settings');
        $this->_set_publish_post_box_vars(null, false, false, null, false);
        $form_handler = $this->loader->getShared('EventEspresso\core\domain\services\admin\privacy\forms\PrivacySettingsFormHandler');
        $this->_template_args['admin_page_content'] = $form_handler->display();
        $this->display_admin_page_with_sidebar();
    }


    /**
     * Update the privacy settings from form data
     *
     * @throws EE_Error
     */
    public function updatePrivacySettings()
    {
        $form_handler = $this->loader->getShared('EventEspresso\core\domain\services\admin\privacy\forms\PrivacySettingsFormHandler');
        $success = $form_handler->process($this->get_request_data());
        $this->_redirect_after_action(
            $success,
            esc_html__('Registration Form Options', 'event_espresso'),
            'updated',
            array('action' => 'privacy_settings')
        );
    }
}
