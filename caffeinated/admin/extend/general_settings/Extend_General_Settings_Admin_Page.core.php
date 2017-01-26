<?php
if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('NO direct script access allowed');
}

/**
 * Extend_General_Settings_Admin_Page
 *
 * This contains the logic for setting up the Custom General_Settings related pages.  Any methods without phpdoc
 * comments have inline docs with parent class.
 *
 * This is the extended (caf) general settings class
 *
 * @package           Extend_General_Settings_Admin_Page
 * @subpackage        caffeinated/admin/extend/general_settings/Extend_General_Settings_Admin_Page.core.php
 * @author            Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class Extend_General_Settings_Admin_Page extends General_Settings_Admin_Page
{
    
    
    public function __construct($routing = true)
    {
        parent::__construct($routing);
        define('GEN_SET_CAF_TEMPLATE_PATH', EE_CORE_CAF_ADMIN_EXTEND . 'general_settings/templates/');
    }
    
    
    protected function _extend_page_config()
    {
        
        $this->_admin_base_path = EE_CORE_CAF_ADMIN_EXTEND . 'general_settings';
        
        //filters and action hooks here
        add_action('AHEE__admin_option_settings__template__before', array($this, 'debug_logging_options'), 9);
        add_filter('FHEE__General_Settings_Admin_Page___update_admin_option_settings__CFG_admin',
            array($this, 'update_debug_logging_options'), 10, 1);
        
    }
    
    
    
    /*************        Logging Settings        *************/
    
    /**
     * debug_logging_options
     *
     * @param array $template_args
     *
     * @return void
     */
    public function debug_logging_options($template_args = array())
    {
        $template_args['use_full_logging']   = EE_Registry::instance()->CFG->admin->use_full_logging;
        $template_args['use_remote_logging'] = isset(EE_Registry::instance()->CFG->admin->use_remote_logging) ? absint(EE_Registry::instance()->CFG->admin->use_remote_logging) : false;
        $template_args['remote_logging_url'] = isset(EE_Registry::instance()->CFG->admin->remote_logging_url) && ! empty(EE_Registry::instance()->CFG->admin->remote_logging_url) ? stripslashes(EE_Registry::instance()->CFG->admin->remote_logging_url) : '';
        $template                            = GEN_SET_CAF_TEMPLATE_PATH . 'debug_log_settings.template.php';
        EEH_Template::display_template($template, $template_args);
    }
    
    
    /**
     * update_debug_logging_options
     *
     * @param array $admin_options
     *
     * @return array
     */
    public function update_debug_logging_options($admin_options = array())
    {
        $use_full_logging                = isset($this->_req_data['use_full_logging']) ? (bool)absint($this->_req_data['use_full_logging']) : $admin_options->use_full_logging;
        $admin_options->use_full_logging = $use_full_logging;
        
        if ($use_full_logging === false) {
            EE_Error::get_notices(false);
            EE_Error::reset_notices();
        }
        
        $admin_options->use_remote_logging = isset($this->_req_data['use_remote_logging']) ? absint($this->_req_data['use_remote_logging']) : $admin_options->use_remote_logging;
        $admin_options->remote_logging_url = isset($this->_req_data['remote_logging_url']) ? esc_url_raw($this->_req_data['remote_logging_url']) : $admin_options->remote_logging_url;
        
        return $admin_options;
    }
    
    
}
