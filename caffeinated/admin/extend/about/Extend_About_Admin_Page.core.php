<?php

use EventEspresso\core\domain\services\database\MaintenanceStatus;

/**
 * Extend_About_Admin_Page
 *
 * This contains the logic for setting up the caffeinated EE About related pages.  Any methods without phpdoc comments
 * have inline docs with parent class.
 *
 * This is the extended (caf) general settings class
 *
 * @package         Extend_About_Admin_Page
 * @subpackage      caffeinated/admin/extend/about/Extend_About_Admin_Page.core.php
 * @author          Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Extend_About_Admin_Page extends About_Admin_Page
{
    public function __construct($routing = true)
    {
        parent::__construct($routing);
        define('EE_ABOUT_CAF_TEMPLATE_PATH', EE_CORE_CAF_ADMIN_EXTEND . 'about/templates/');
    }


    protected function _set_page_routes()
    {
        $this->_page_routes = [
            'default'  => [
                'func'       => [$this, '_whats_new'],
                'capability' => 'manage_options',
            ],
            'overview' => [
                'func'       => [$this, '_overview'],
                'capability' => 'manage_options',
            ],
            'credits'  => [
                'func'       => [$this, '_credits'],
                'capability' => 'manage_options',
            ],
            /*'decafvpro' => array(
                'func'       => [$this, '_decafvpro'],
                'capability' => 'manage_options'
                ),*/
            'reviews'  => [
                'func'       => [$this, '_reviews'],
                'capability' => 'manage_options',
            ],


        ];
    }


    protected function _set_page_config()
    {
        parent::_set_page_config();

        $this->_admin_base_path = EE_CORE_CAF_ADMIN_EXTEND . 'about';
        $this->_page_config     = [
            'default'  => [
                'nav'           => [
                    'label' => esc_html__('What\'s New', 'event_espresso'),
                    'icon'  => 'dashicons-bell',
                    'order' => 10,
                ],
                'require_nonce' => false,
            ],
            'overview' => [
                'nav'           => [
                    'label' => esc_html__('About', 'event_espresso'),
                    'icon'  => 'dashicons-info',
                    'order' => 20,
                ],
                'require_nonce' => false,
            ],
            'credits'  => [
                'nav'           => [
                    'label' => esc_html__('Credits', 'event_espresso'),
                    'icon'  => 'dashicons-thumbs-up',
                    'order' => 30,
                ],
                'require_nonce' => false,
            ],
            /*'decafvpro' => array(
                'nav' => array(
                    'label' => esc_html__('Decaf vs Regular', 'event_espresso'),
                    'order' => 40),
                'require_nonce' => FALSE
                ),*/
            'reviews'  => [
                'nav'           => [
                    'label' => esc_html__('Reviews', 'event_espresso'),
                    'icon'  => 'dashicons-star-filled',
                    'order' => 50,
                ],
                'require_nonce' => false,
            ],

        ];
    }


    protected function _whats_new()
    {
        $steps = MaintenanceStatus::isNotDisabled() ? $this->_get_started_steps() : '';
        $this->_admin_page_title                          = sprintf(
            esc_html__('Welcome to Event Espresso %s', 'event_espresso'),
            EVENT_ESPRESSO_VERSION
        );
        $settings_message                                 = $steps;
        $this->_template_args['admin_page_subtitle']      = esc_html__(
            'Thank you for choosing Event Espresso, the most powerful Event Management plugin for WordPress.',
            'event_espresso'
        ) . $settings_message;
        $template                                         =
            is_readable(EE_ABOUT_CAF_TEMPLATE_PATH . 'whats_new.template.php')
                ? EE_ABOUT_CAF_TEMPLATE_PATH . 'whats_new.template.php'
                : EE_ABOUT_TEMPLATE_PATH
                  . 'whats_new.template.php';
        $this->_template_args['about_admin_page_content'] = EEH_Template::display_template(
            $template,
            $this->_template_args,
            true
        );
        $this->display_about_admin_page();
    }


    protected function _overview()
    {
        $this->_admin_page_title                          = esc_html__('About Event Espresso', 'event_espresso');
        $this->_template_args['admin_page_subtitle']      = esc_html__(
            'Thank you for choosing Event Espresso, the most powerful Event Management plugin for WordPress.',
            'event_espresso'
        );
        $template                                         =
            is_readable(EE_ABOUT_CAF_TEMPLATE_PATH . 'ee4-overview.template.php')
                ? EE_ABOUT_CAF_TEMPLATE_PATH . 'ee4-overview.template.php'
                : EE_ABOUT_TEMPLATE_PATH . 'ee4-overview.template.php';
        $this->_template_args['about_admin_page_content'] = EEH_Template::display_template(
            $template,
            $this->_template_args,
            true
        );
        $this->display_about_admin_page();
    }


    protected function _credits()
    {
        // $this->_template_args['admin_page_title'] = sprintf(
        //     esc_html__('Welcome to Event Espresso %s', 'event_espresso'),
        //     EVENT_ESPRESSO_VERSION
        // );
        $this->_template_args['admin_page_subtitle']      = esc_html__(
            'Thank you for choosing Event Espresso, the most powerful Event Management plugin for WordPress.',
            'event_espresso'
        );
        $template                                         = EE_ABOUT_TEMPLATE_PATH . 'credits.template.php';
        $this->_template_args['about_admin_page_content'] = EEH_Template::display_template(
            $template,
            $this->_template_args,
            true
        );
        $this->display_about_admin_page();
    }


    protected function _decafvpro()
    {
        $this->_template_args['admin_page_title']         = sprintf(
            esc_html__('Welcome to Event Espresso %s', 'event_espresso'),
            EVENT_ESPRESSO_VERSION
        );
        $this->_template_args['admin_page_subtitle']      = sprintf(
            esc_html__(
                'Event Espresso lets you focus on doing %swhat you love%s — %sorganizing your events%s',
                'event_espresso'
            ),
            '<em>',
            '</em>',
            '<strong>',
            '</strong>'
        );
        $template                                         = EE_ABOUT_TEMPLATE_PATH . 'decafvpro.template.php';
        $this->_template_args['about_admin_page_content'] = EEH_Template::display_template(
            $template,
            $this->_template_args,
            true
        );
        $this->display_about_admin_page();
    }


    protected function _reviews()
    {
        $this->_template_args['admin_page_title']         =
            esc_html__('Rave Reviews About Event Espresso 4', 'event_espresso');
        $this->_template_args['admin_page_subtitle']      = esc_html__(
            'At Event Espresso, customer satisfaction is our ultimate goal.',
            'event_espresso'
        );
        $template                                         = EE_ABOUT_TEMPLATE_PATH . 'reviews.template.php';
        $this->_template_args['about_admin_page_content'] = EEH_Template::display_template(
            $template,
            $this->_template_args,
            true
        );
        $this->display_about_admin_page();
    }
}
