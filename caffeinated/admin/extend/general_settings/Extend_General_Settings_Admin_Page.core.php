<?php

use EventEspresso\core\services\request\DataType;

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

        // filters and action hooks here
        add_action('AHEE__admin_option_settings__template__before', [$this, 'debug_logging_options'], 9);
        add_filter(
            'FHEE__General_Settings_Admin_Page___update_admin_option_settings__CFG_admin',
            [$this, 'update_debug_logging_options']
        );
    }



    /*************        Logging Settings        *************/

    /**
     * debug_logging_options
     *
     * @param array $template_args
     *
     * @return void
     */
    public function debug_logging_options(array $template_args = [])
    {
        $admin_config = EE_Registry::instance()->CFG->admin;
        $template_args['use_remote_logging'] = isset($admin_config->use_remote_logging)
            ? absint($admin_config->use_remote_logging)
            : false;

        $template_args['remote_logging_url'] = isset($admin_config->remote_logging_url)
                                               && ! empty($admin_config->remote_logging_url)
            ? stripslashes($admin_config->remote_logging_url)
            : '';

        $template = GEN_SET_CAF_TEMPLATE_PATH . 'debug_log_settings.template.php';
        EEH_Template::display_template($template, $template_args);
    }


    /**
     * update_debug_logging_options
     *
     * @param EE_Admin_Config $admin_options
     *
     * @return EE_Admin_Config
     */
    public function update_debug_logging_options(EE_Admin_Config $admin_options): EE_Admin_Config
    {
        $admin_options->use_remote_logging = $this->request->getRequestParam(
            'use_remote_logging',
            $admin_options->use_remote_logging,
            DataType::BOOL
        );
        $admin_options->remote_logging_url = $this->request->getRequestParam(
            'remote_logging_url',
            $admin_options->remote_logging_url,
            DataType::URL
        );
        return $admin_options;
    }
}
