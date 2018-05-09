<?php

/**
 * Support_Admin_Page
 * This contains the logic for setting up the Help and Support related admin pages.  Any methods without phpdoc
 * comments have inline docs with parent class.
 *
 * @package         Support_Admin_Page
 * @subpackage      includes/core/admin/support/Support_Admin_Page.core.php
 * @author          Darren Ethier
 */
class Support_Admin_Page extends EE_Admin_Page
{


    protected function _init_page_props()
    {
        $this->page_slug = EE_SUPPORT_PG_SLUG;
        $this->page_label = esc_html__('Help & Support', 'event_espresso');
        $this->_admin_base_url = EE_SUPPORT_ADMIN_URL;
        $this->_admin_base_path = EE_SUPPORT_ADMIN;
    }


    protected function _ajax_hooks()
    {
    }


    protected function _define_page_props()
    {
        $this->_labels = array();
        $this->_admin_page_title = $this->page_label;
    }


    protected function _set_page_routes()
    {
        $this->_page_routes = array(
            'default'    => array(
                'func'       => '_contact_support',
                'capability' => 'ee_read_ee',
            ),
            'developers' => array(
                'func'       => '_developers',
                'capability' => 'ee_read_ee',
            ),
            'shortcodes' => array(
                'func'       => '_shortcodes',
                'capability' => 'ee_read_ee',
            ),
        );
    }


    protected function _set_page_config()
    {
        $this->_page_config = array(
            'default'    => array(
                'nav'           => array(
                    'label' => esc_html__('Support', 'event_espresso'),
                    'order' => 30,
                ),
                'metaboxes'     => array_merge($this->_default_espresso_metaboxes, array('_support_boxes')),
                'require_nonce' => false,
            ),
            'developers' => array(
                'nav'           => array(
                    'label' => esc_html__('Developers', 'event_espresso'),
                    'order' => 50,
                ),
                'metaboxes'     => $this->_default_espresso_metaboxes,
                'require_nonce' => false,
            ),
            'shortcodes' => array(
                'nav'           => array(
                    'label' => esc_html__('Shortcodes', 'event_espresso'),
                    'order' => 60,
                ),
                'metaboxes'     => array_merge($this->_default_espresso_metaboxes, array('_shortcodes_boxes')),
                'require_nonce' => false,
            ),
        );
    }


    // none of the below group are currently used for Support pages
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
    }


    protected function _installation()
    {
        $template_path = EE_SUPPORT_ADMIN_TEMPLATE_PATH . 'support_admin_details_installation.template.php';
        $this->_template_args['admin_page_content'] = EEH_Template::display_template(
            $template_path,
            '',
            true
        );
        $this->display_admin_page_with_sidebar();
    }


    protected function _resources()
    {
        $this->display_admin_page_with_sidebar();
    }


    protected function _add_settings_metabox($box, $label, array $args)
    {
        add_meta_box(
            "espresso_{$box}_settings",
            $label,
            function ($post, $metabox) {
                echo EEH_Template::display_template(
                    $metabox['args']['template_path'],
                    $metabox['args']['template_args'],
                    true
                );
            },
            $this->_current_screen->id,
            'normal',
            'high',
            apply_filters(
                "FHEE__Support_Admin_Page___add_settings_metabox__{$box}_args_array",
                $args
            )
        );
    }


    protected function _resources_boxes()
    {
        $boxes = apply_filters(
            'FHEE__Support_Admin_Page___resources_boxes__boxes_array',
            array(
                'favorite_theme_developers' => esc_html__('Favorite Theme Developers', 'event_espresso'),
                'highly_recommended_themes' => esc_html__('Highly Recommended Themes', 'event_espresso'),
                'hire_developer'            => esc_html__('Hire a Developer', 'event_espresso'),
                'partners'                  => esc_html__('Partners', 'event_espresso'),
                'recommended_plugins'       => esc_html__('Recommended Plugins', 'event_espresso'),
                'other_resources'           => esc_html__('Other Resources', 'event_espresso'),
            )
        );
        foreach ($boxes as $box => $label) {
            $this->_add_settings_metabox(
                $box,
                $label,
                array(
                    'template_path' => EE_SUPPORT_ADMIN_TEMPLATE_PATH . "support_admin_details_{$box}.template.php",
                    'template_args' => $this->_template_args,
                )
            );
        }
    }


    protected function _shortcodes()
    {
        $this->display_admin_page_with_sidebar();
    }


    protected function _shortcodes_boxes()
    {
        $boxes = apply_filters(
            'FHEE__Support_Admin_Page___shortcodes_boxes__boxes_array',
            array(
                'shortcodes_event_listings'  => esc_html__('Event Listings', 'event_espresso'),
                'shortcodes_ticket_selector' => esc_html__('Event Ticket Selector', 'event_espresso'),
                'shortcodes_category'        => esc_html__('Event Categories', 'event_espresso'),
                'shortcodes_attendee'        => esc_html__('Event Attendees', 'event_espresso')
                /*'shortcodes_single_events' => esc_html__('Single Events', 'event_espresso'),*/
                /*'shortcodes_attendee_listings' => esc_html__('Attendee Listings', 'event_espresso'),*/
            )
        );
        foreach ($boxes as $box => $label) {
            $this->_add_settings_metabox(
                $box,
                $label,
                array(
                    'template_path' => EE_SUPPORT_ADMIN_TEMPLATE_PATH . "support_admin_details_{$box}.template.php",
                    'template_args' => $this->_template_args,
                )
            );
        }
    }


    protected function _contact_support()
    {
        $this->display_admin_page_with_sidebar();
    }


    protected function _support_boxes()
    {
        $boxes = apply_filters(
            'FHEE__Support_Admin_Page___support_boxes__boxes_array',
            array(
                'contact_support'       => esc_html__('Contact Support', 'event_espresso'),
                'important_information' => esc_html__('Important Information', 'event_espresso'),
            )
        );
        foreach ($boxes as $box => $label) {
            $this->_add_settings_metabox(
                $box,
                $label,
                array(
                    'template_path' => EE_SUPPORT_ADMIN_TEMPLATE_PATH . "support_admin_details_{$box}.template.php",
                    'template_args' => $this->_template_args,
                )
            );
        }
    }


    protected function _developers()
    {
        $this->_template_args['admin_page_content'] = EEH_Template::display_template(
            EE_SUPPORT_ADMIN_TEMPLATE_PATH . 'developers_admin_details.template.php',
            array(),
            true
        );
        $this->display_admin_page_with_sidebar();
    }
}
