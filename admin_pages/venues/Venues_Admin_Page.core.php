<?php

/**
 * Venues_Admin_Page
 *
 * This contains the logic for setting up the Event Venue related admin pages.  Any methods without phpdoc comments
 * have inline docs with parent class.
 *
 *
 * @package         Venues_Admin_Page
 * @subpackage      caffeinated/admin/new/Venues_Admin_Page.core.php
 * @author          Darren Ethier
 */
class Venues_Admin_Page extends EE_Admin_Page_CPT
{

    /**
     * _venue
     * This will hold the venue object for venue_details screen.
     *
     * @access protected
     * @var object
     */
    protected $_venue;


    /**
     * This will hold the category object for category_details screen.
     *
     * @var object
     */
    protected $_category;


    /**
     * This property will hold the venue model instance
     *
     * @var object
     */
    protected $_venue_model;


    /**
     * @throws EE_Error
     */
    protected function _init_page_props()
    {
        require_once(EE_MODELS . 'EEM_Venue.model.php');
        $this->page_slug        = EE_VENUES_PG_SLUG;
        $this->_admin_base_url  = EE_VENUES_ADMIN_URL;
        $this->_admin_base_path = EE_ADMIN_PAGES . 'venues';
        $this->page_label       = esc_html__('Event Venues', 'event_espresso');
        $this->_cpt_model_names = [
            'create_new' => 'EEM_Venue',
            'edit'       => 'EEM_Venue',
        ];
        $this->_cpt_edit_routes = [
            'espresso_venues' => 'edit',
        ];
        $this->_venue_model     = EEM_Venue::instance();
    }


    protected function _ajax_hooks()
    {
        // todo: all hooks for ee_venues ajax goes in here.
    }


    protected function _define_page_props()
    {
        $this->_admin_page_title = $this->page_label;
        $this->_labels           = [
            'buttons'      => [
                'add'             => esc_html__('Add New Venue', 'event_espresso'),
                'edit'            => esc_html__('Edit Venue', 'event_espresso'),
                'delete'          => esc_html__('Delete Venue', 'event_espresso'),
                'add_category'    => esc_html__('Add New Category', 'event_espresso'),
                'edit_category'   => esc_html__('Edit Category', 'event_espresso'),
                'delete_category' => esc_html__('Delete Category', 'event_espresso'),
            ],
            'editor_title' => [
                'espresso_venues' => esc_html__('Enter Venue name here', 'event_espresso'),
            ],
            'publishbox'   => [
                'create_new'          => esc_html__('Save New Venue', 'event_espresso'),
                'edit'                => esc_html__('Update Venue', 'event_espresso'),
                'add_category'        => esc_html__('Save New Category', 'event_espresso'),
                'edit_category'       => esc_html__('Update Category', 'event_espresso'),
                'google_map_settings' => esc_html__('Update Settings', 'event_espresso'),
            ],
        ];
    }


    protected function _set_page_routes()
    {

        // load formatter helper
        // load field generator helper

        // is there a vnu_id in the request?
        $VNU_ID = $this->request->getRequestParam('VNU_ID', 0, 'int');
        $VNU_ID = $this->request->getRequestParam('post', $VNU_ID, 'int');

        $this->_page_routes = [
            'default'                    => [
                'func'       => '_overview_list_table',
                'capability' => 'ee_read_venues',
            ],
            'create_new'                 => [
                'func'       => '_create_new_cpt_item',
                'capability' => 'ee_edit_venues',
            ],
            'edit'                       => [
                'func'       => '_edit_cpt_item',
                'capability' => 'ee_edit_venue',
                'obj_id'     => $VNU_ID,
            ],
            'trash_venue'                => [
                'func'       => '_trash_or_restore_venue',
                'args'       => ['venue_status' => 'trash'],
                'noheader'   => true,
                'capability' => 'ee_delete_venue',
                'obj_id'     => $VNU_ID,
            ],
            'trash_venues'               => [
                'func'       => '_trash_or_restore_venues',
                'args'       => ['venue_status' => 'trash'],
                'noheader'   => true,
                'capability' => 'ee_delete_venues',
            ],
            'restore_venue'              => [
                'func'       => '_trash_or_restore_venue',
                'args'       => ['venue_status' => 'draft'],
                'noheader'   => true,
                'capability' => 'ee_delete_venue',
                'obj_id'     => $VNU_ID,
            ],
            'restore_venues'             => [
                'func'       => '_trash_or_restore_venues',
                'args'       => ['venue_status' => 'draft'],
                'noheader'   => true,
                'capability' => 'ee_delete_venues',
            ],
            'delete_venues'              => [
                'func'       => '_delete_venues',
                'noheader'   => true,
                'capability' => 'ee_delete_venues',
            ],
            'delete_venue'               => [
                'func'       => '_delete_venue',
                'noheader'   => true,
                'capability' => 'ee_delete_venue',
                'obj_id'     => $VNU_ID,
            ],
            // settings related
            'google_map_settings'        => [
                'func'       => '_google_map_settings',
                'capability' => 'manage_options',
            ],
            'update_google_map_settings' => [
                'func'       => '_update_google_map_settings',
                'capability' => 'manage_options',
                'noheader'   => true,
            ],
            // venue category tab related
            'add_category'               => [
                'func'       => '_category_details',
                'args'       => ['add'],
                'capability' => 'ee_edit_venue_category',
            ],
            'edit_category'              => [
                'func'       => '_category_details',
                'args'       => ['edit'],
                'capability' => 'ee_edit_venue_category',
            ],
            'delete_categories'          => [
                'func'       => '_delete_categories',
                'noheader'   => true,
                'capability' => 'ee_delete_venue_category',
            ],

            'delete_category' => [
                'func'       => '_delete_categories',
                'noheader'   => true,
                'capability' => 'ee_delete_venue_category',
            ],

            'insert_category' => [
                'func'       => '_insert_or_update_category',
                'args'       => ['new_category' => true],
                'noheader'   => true,
                'capability' => 'ee_edit_venue_category',
            ],

            'update_category'   => [
                'func'       => '_insert_or_update_category',
                'args'       => ['new_category' => false],
                'noheader'   => true,
                'capability' => 'ee_edit_venue_category',
            ],
            'export_categories' => [
                'func'       => '_categories_export',
                'noheader'   => true,
                'capability' => 'export',
            ],
            'import_categories' => [
                'func'       => '_import_categories',
                'capability' => 'import',
            ],
            'category_list'     => [
                'func'       => '_category_list_table',
                'capability' => 'ee_manage_venue_categories',
            ],
        ];
    }


    protected function _set_page_config()
    {
        $VNU_ID     = $this->request->getRequestParam('post', 0, 'int');
        $EVT_CAT_ID = $this->request->getRequestParam('EVT_CAT_ID', 0, 'int');

        $this->_page_config = [
            'default'             => [
                'nav'           => [
                    'label' => esc_html__('Overview', 'event_espresso'),
                    'order' => 10,
                ],
                'list_table'    => 'Venues_Admin_List_Table',
                'help_tabs'     => [
                    'venues_overview_help_tab'                           => [
                        'title'    => esc_html__('Venues Overview', 'event_espresso'),
                        'filename' => 'venues_overview',
                    ],
                    'venues_overview_table_column_headings_help_tab'     => [
                        'title'    => esc_html__('Venues Overview Table Column Headings', 'event_espresso'),
                        'filename' => 'venues_overview_table_column_headings',
                    ],
                    'venues_overview_views_bulk_actions_search_help_tab' => [
                        'title'    => esc_html__('Venues Overview Views & Bulk Actions & Search', 'event_espresso'),
                        'filename' => 'venues_overview_views_bulk_actions_search',
                    ],
                ],
                // disabled temporarily. see: https://github.com/eventespresso/eventsmart.com-website/issues/836
                // 'help_tour'     => array('Venues_Overview_Help_Tour'),
                'metaboxes'     => ['_espresso_news_post_box', '_espresso_links_post_box'],
                'require_nonce' => false,
            ],
            'create_new'          => [
                'nav'           => [
                    'label'      => esc_html__('Add Venue', 'event_espresso'),
                    'order'      => 5,
                    'persistent' => false,
                ],
                'help_tabs'     => [
                    'venues_editor_help_tab'                                               => [
                        'title'    => esc_html__('Venue Editor', 'event_espresso'),
                        'filename' => 'venues_editor',
                    ],
                    'venues_editor_title_richtexteditor_help_tab'                          => [
                        'title'    => esc_html__('Venue Title & Rich Text Editor', 'event_espresso'),
                        'filename' => 'venues_editor_title_richtexteditor',
                    ],
                    'venues_editor_tags_categories_help_tab'                               => [
                        'title'    => esc_html__('Venue Tags & Categories', 'event_espresso'),
                        'filename' => 'venues_editor_tags_categories',
                    ],
                    'venues_editor_physical_location_google_map_virtual_location_help_tab' => [
                        'title'    => esc_html__(
                            'Venue Editor Physical Location & Google Map & Virtual Location',
                            'event_espresso'
                        ),
                        'filename' => 'venues_editor_physical_location_google_map_virtual_location',
                    ],
                    'venues_editor_save_new_venue_help_tab'                                => [
                        'title'    => esc_html__('Save New Venue', 'event_espresso'),
                        'filename' => 'venues_editor_save_new_venue',
                    ],
                    'venues_editor_other_help_tab'                                         => [
                        'title'    => esc_html__('Venue Editor Other', 'event_espresso'),
                        'filename' => 'venues_editor_other',
                    ],
                ],
                // disabled temporarily. see: https://github.com/eventespresso/eventsmart.com-website/issues/836
                // 'help_tour'     => array('Venues_Add_Venue_Help_Tour'),
                'metaboxes'     => ['_venue_editor_metaboxes'],
                'require_nonce' => false,
            ],
            'edit'                => [
                'nav'           => [
                    'label'      => esc_html__('Edit Venue', 'event_espresso'),
                    'order'      => 5,
                    'persistent' => false,
                    'url'        => $VNU_ID
                        ? add_query_arg(['post' => $VNU_ID], $this->_current_page_view_url)
                        : $this->_admin_base_url,
                ],
                'help_tabs'     => [
                    'venues_editor_help_tab'                                               => [
                        'title'    => esc_html__('Venue Editor', 'event_espresso'),
                        'filename' => 'venues_editor',
                    ],
                    'venues_editor_title_richtexteditor_help_tab'                          => [
                        'title'    => esc_html__('Venue Title & Rich Text Editor', 'event_espresso'),
                        'filename' => 'venues_editor_title_richtexteditor',
                    ],
                    'venues_editor_tags_categories_help_tab'                               => [
                        'title'    => esc_html__('Venue Tags & Categories', 'event_espresso'),
                        'filename' => 'venues_editor_tags_categories',
                    ],
                    'venues_editor_physical_location_google_map_virtual_location_help_tab' => [
                        'title'    => esc_html__(
                            'Venue Editor Physical Location & Google Map & Virtual Location',
                            'event_espresso'
                        ),
                        'filename' => 'venues_editor_physical_location_google_map_virtual_location',
                    ],
                    'venues_editor_save_new_venue_help_tab'                                => [
                        'title'    => esc_html__('Save New Venue', 'event_espresso'),
                        'filename' => 'venues_editor_save_new_venue',
                    ],
                    'venues_editor_other_help_tab'                                         => [
                        'title'    => esc_html__('Venue Editor Other', 'event_espresso'),
                        'filename' => 'venues_editor_other',
                    ],
                ],
                /*'help_tour' => array( 'Venues_Edit_Venue_Help_Tour' ),*/
                'metaboxes'     => ['_venue_editor_metaboxes'],
                'require_nonce' => false,
            ],
            'google_map_settings' => [
                'nav'           => [
                    'label' => esc_html__('Google Maps', 'event_espresso'),
                    'order' => 40,
                ],
                'metaboxes'     => array_merge($this->_default_espresso_metaboxes, ['_publish_post_box']),
                'help_tabs'     => [
                    'general_settings_google_maps_help_tab' => [
                        'title'    => esc_html__('Google Maps', 'event_espresso'),
                        'filename' => 'general_settings_google_maps',
                    ],
                ],
                // disabled temporarily. see: https://github.com/eventespresso/eventsmart.com-website/issues/836
                // 'help_tour'     => array('Google_Maps_Help_Tour'),
                'require_nonce' => false,
            ],
            // venue category stuff
            'add_category'        => [
                'nav'           => [
                    'label'      => esc_html__('Add Category', 'event_espresso'),
                    'order'      => 15,
                    'persistent' => false,
                ],
                'metaboxes'     => ['_publish_post_box'],
                'help_tabs'     => [
                    'venues_add_category_help_tab' => [
                        'title'    => esc_html__('Add New Venue Category', 'event_espresso'),
                        'filename' => 'venues_add_category',
                    ],
                ],
                // disabled temporarily. see: https://github.com/eventespresso/eventsmart.com-website/issues/836
                // 'help_tour'     => array('Venues_Add_Category_Help_Tour'),
                'require_nonce' => false,
            ],
            'edit_category'       => [
                'nav'           => [
                    'label'      => esc_html__('Edit Category', 'event_espresso'),
                    'order'      => 15,
                    'persistent' => false,
                    'url'        => $EVT_CAT_ID
                        ? add_query_arg(['EVT_CAT_ID' => $EVT_CAT_ID], $this->_current_page_view_url)
                        : $this->_admin_base_url,
                ],
                'metaboxes'     => ['_publish_post_box'],
                'help_tabs'     => [
                    'venues_edit_category_help_tab' => [
                        'title'    => esc_html__('Edit Venue Category', 'event_espresso'),
                        'filename' => 'venues_edit_category',
                    ],
                ],
                /*'help_tour' => array( 'Venues_Edit_Category_Help_Tour' ),*/
                'require_nonce' => false,
            ],
            'category_list'       => [
                'nav'           => [
                    'label' => esc_html__('Categories', 'event_espresso'),
                    'order' => 20,
                ],
                'list_table'    => 'Venue_Categories_Admin_List_Table',
                'help_tabs'     => [
                    'venues_categories_help_tab'                       => [
                        'title'    => esc_html__('Venue Categories', 'event_espresso'),
                        'filename' => 'venues_categories',
                    ],
                    'venues_categories_table_column_headings_help_tab' => [
                        'title'    => esc_html__('Venue Categories Table Column Headings', 'event_espresso'),
                        'filename' => 'venues_categories_table_column_headings',
                    ],
                    'venues_categories_views_help_tab'                 => [
                        'title'    => esc_html__('Venue Categories Views', 'event_espresso'),
                        'filename' => 'venues_categories_views',
                    ],
                    'venues_categories_other_help_tab'                 => [
                        'title'    => esc_html__('Venue Categories Other', 'event_espresso'),
                        'filename' => 'venues_categories_other',
                    ],
                ],
                // disabled temporarily. see: https://github.com/eventespresso/eventsmart.com-website/issues/836
                // 'help_tour'     => array('Venues_Categories_Help_Tour'),
                'metaboxes'     => $this->_default_espresso_metaboxes,
                'require_nonce' => false,
            ],
        ];
    }


    protected function _add_screen_options()
    {
        // todo
    }


    protected function _add_screen_options_default()
    {
        $this->_per_page_screen_option();
    }


    protected function _add_screen_options_category_list()
    {
        $page_title              = $this->_admin_page_title;
        $this->_admin_page_title = esc_html__('Venue Categories', 'event_espresso');
        $this->_per_page_screen_option();
        $this->_admin_page_title = $page_title;
    }


    // none of the below group are currently used for Event Venues
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


    public function load_scripts_styles_create_new()
    {
        $this->load_scripts_styles_edit();
    }


    public function load_scripts_styles()
    {
        wp_register_style('ee-cat-admin', EVENTS_ASSETS_URL . 'ee-cat-admin.css', [], EVENT_ESPRESSO_VERSION);
        wp_enqueue_style('ee-cat-admin');
    }


    public function load_scripts_styles_add_category()
    {
        $this->load_scripts_styles_edit_category();
    }


    public function load_scripts_styles_edit_category()
    {
    }


    public function load_scripts_styles_edit()
    {
        // styles
        wp_enqueue_style('espresso-ui-theme');
        wp_register_style(
            'espresso_venues',
            EE_VENUES_ASSETS_URL . 'ee-venues-admin.css',
            [],
            EVENT_ESPRESSO_VERSION
        );
        wp_enqueue_style('espresso_venues');
    }


    protected function _set_list_table_views_default()
    {
        $this->_views = [
            'all' => [
                'slug'        => 'all',
                'label'       => esc_html__('View All Venues', 'event_espresso'),
                'count'       => 0,
                'bulk_action' => [],
            ],
        ];

        if (EE_Registry::instance()->CAP->current_user_can('ee_delete_venues', 'espresso_venues_trash_venues')) {
            $this->_views['all']['bulk_action'] = [
                'trash_venues' => esc_html__('Move to Trash', 'event_espresso'),
            ];
            $this->_views['trash']              = [
                'slug'        => 'trash',
                'label'       => esc_html__('Trash', 'event_espresso'),
                'count'       => 0,
                'bulk_action' => [
                    'restore_venues' => esc_html__('Restore from Trash', 'event_espresso'),
                    'delete_venues'  => esc_html__('Delete', 'event_espresso'),
                ],
            ];
        }
    }


    protected function _set_list_table_views_category_list()
    {
        $this->_views = [
            'all' => [
                'slug'        => 'all',
                'label'       => esc_html__('All', 'event_espresso'),
                'count'       => 0,
                'bulk_action' => [
                    'delete_categories' => esc_html__('Delete Permanently', 'event_espresso'),
                ],
            ],
        ];
    }


    /**
     * @throws EE_Error
     */
    protected function _overview_list_table()
    {
        do_action('AHEE_log', __FILE__, __FUNCTION__, '');
        $this->_template_args['after_list_table'] = EEH_Template::get_button_or_link(
            get_post_type_archive_link('espresso_venues'),
            esc_html__("View Venue Archive Page", "event_espresso"),
            'button'
        );

        $this->_admin_page_title .= ' ' . $this->get_action_link_or_button(
            'create_new',
            'add',
            [],
            'add-new-h2'
        );

        $this->_search_btn_label  = esc_html__('Venues', 'event_espresso');
        $this->display_admin_list_table_page_with_sidebar();
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function extra_misc_actions_publish_box()
    {
        $extra_rows = [
            'vnu_capacity' => $this->_cpt_model_obj->get_f('VNU_capacity'),
            'vnu_url'      => $this->_cpt_model_obj->get_f('VNU_url'),
            'vnu_phone'    => $this->_cpt_model_obj->get_f('VNU_phone'),
        ];
        $template   = EE_VENUES_TEMPLATE_PATH . 'venue_publish_box_extras.template.php';
        EEH_Template::display_template($template, $extra_rows);
    }


    /*************        Google Maps        *************
     *
     * @throws EE_Error
     * @throws EE_Error
     */


    protected function _google_map_settings()
    {


        $this->_template_args['values']           = $this->_yes_no_values;
        $default_map_settings                     = new stdClass();
        $default_map_settings->use_google_maps    = true;
        $default_map_settings->google_map_api_key = '';
        // for event details pages (reg page)
        $default_map_settings->event_details_map_width    =
            585;                                                                                          // ee_map_width_single
        $default_map_settings->event_details_map_height   =
            362;                                                                                          // ee_map_height_single
        $default_map_settings->event_details_map_zoom     =
            14;                                                                                           // ee_map_zoom_single
        $default_map_settings->event_details_display_nav  =
            true;                                                                                         // ee_map_nav_display_single
        $default_map_settings->event_details_nav_size     =
            false;                                                                                        // ee_map_nav_size_single
        $default_map_settings->event_details_control_type =
            'default';                                                                                    // ee_map_type_control_single
        $default_map_settings->event_details_map_align    =
            'center';                                                                                     // ee_map_align_single
        // for event list pages
        $default_map_settings->event_list_map_width    =
            300;                                                                                          // ee_map_width
        $default_map_settings->event_list_map_height   =
            185;                                                                                          // ee_map_height
        $default_map_settings->event_list_map_zoom     =
            12;                                                                                           // ee_map_zoom
        $default_map_settings->event_list_display_nav  =
            false;                                                                                        // ee_map_nav_display
        $default_map_settings->event_list_nav_size     =
            true;                                                                                         // ee_map_nav_size
        $default_map_settings->event_list_control_type =
            'dropdown';                                                                                   // ee_map_type_control
        $default_map_settings->event_list_map_align    =
            'center';                                                                                     // ee_map_align

        $this->_template_args['map_settings'] =
            isset(EE_Registry::instance()->CFG->map_settings)
            && ! empty(EE_Registry::instance()->CFG->map_settings)
                ? (object) array_merge(
                    (array) $default_map_settings,
                    (array) EE_Registry::instance()->CFG->map_settings
                )
                : $default_map_settings;

        $this->_set_add_edit_form_tags('update_google_map_settings');
        $this->_set_publish_post_box_vars(null, false, false, null, false);
        $this->_template_args['admin_page_content'] = EEH_Template::display_template(
            EE_VENUES_TEMPLATE_PATH . 'google_map.template.php',
            $this->_template_args,
            true
        );
        $this->display_admin_page_with_sidebar();
    }


    /**
     * @throws EE_Error
     */
    protected function _update_google_map_settings()
    {
        $map_settings = EE_Registry::instance()->CFG->map_settings;

        $settings = [
            'use_google_maps'            => 'int',
            'google_map_api_key'         => 'string',
            'event_details_map_width'    => 'int',
            'event_details_map_zoom'     => 'int',
            'event_details_display_nav'  => 'int',
            'event_details_nav_size'     => 'int',
            'event_details_control_type' => 'string',
            'event_details_map_align'    => 'string',
            'event_list_map_width'       => 'int',
            'event_list_map_height'      => 'int',
            'event_list_map_zoom'        => 'int',
            'event_list_display_nav'     => 'int',
            'event_list_nav_size'        => 'int',
            'event_list_control_type'    => 'string',
            'event_list_map_align'       => 'string',
        ];

        foreach ($settings as $setting => $type) {
            $map_settings->{$setting} = $this->request->getRequestParam($setting, $map_settings->{$setting}, $type);
        }

        EE_Registry::instance()->CFG->map_settings = apply_filters(
            'FHEE__Extend_General_Settings_Admin_Page___update_google_map_settings__CFG_map_settings',
            $map_settings
        );

        $what    = 'Google Map Settings';
        $success = $this->_update_espresso_configuration(
            $what,
            EE_Registry::instance()->CFG->map_settings,
            __FILE__,
            __FUNCTION__,
            __LINE__
        );
        $this->_redirect_after_action($success, $what, 'updated', ['action' => 'google_map_settings']);
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _venue_editor_metaboxes()
    {
        $this->verify_cpt_object();

        add_meta_box(
            'espresso_venue_address_options',
            esc_html__('Physical Location', 'event_espresso'),
            [$this, 'venue_address_metabox'],
            $this->page_slug,
            'side'
        );
        add_meta_box(
            'espresso_venue_gmap_options',
            esc_html__('Google Map', 'event_espresso'),
            [$this, 'venue_gmap_metabox'],
            $this->page_slug,
            'side'
        );
        add_meta_box(
            'espresso_venue_virtual_loc_options',
            esc_html__('Virtual Location', 'event_espresso'),
            [$this, 'venue_virtual_loc_metabox'],
            $this->page_slug,
            'side'
        );
    }


    public function venue_gmap_metabox()
    {
        $template_args = [
            'vnu_enable_for_gmap' => EEH_Form_Fields::select_input(
                'vnu_enable_for_gmap',
                $this->get_yes_no_values(),
                $this->_cpt_model_obj instanceof EE_Venue ? $this->_cpt_model_obj->enable_for_gmap() : false
            ),
            'vnu_google_map_link' => $this->_cpt_model_obj->google_map_link(),
        ];
        $template      = EE_VENUES_TEMPLATE_PATH . 'venue_gmap_metabox_content.template.php';
        EEH_Template::display_template($template, $template_args);
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function venue_address_metabox()
    {
        $template_args['_venue'] = $this->_cpt_model_obj;

        $template_args['states_dropdown']    = EEH_Form_Fields::generate_form_input(
            new EE_Question_Form_Input(
                EE_Question::new_instance(
                    ['QST_display_text' => esc_html__('State', 'event_espresso'), 'QST_system' => 'state']
                ),
                EE_Answer::new_instance(
                    [
                        'ANS_value' => $this->_cpt_model_obj instanceof EE_Venue
                            ? $this->_cpt_model_obj->state_ID()
                            : 0,
                    ]
                ),
                [
                    'input_name'     => 'sta_id',
                    'input_id'       => 'sta_id',
                    'input_class'    => '',
                    'input_prefix'   => '',
                    'append_qstn_id' => false,
                ]
            )
        );
        $template_args['countries_dropdown'] = EEH_Form_Fields::generate_form_input(
            new EE_Question_Form_Input(
                EE_Question::new_instance(
                    ['QST_display_text' => esc_html__('Country', 'event_espresso'), 'QST_system' => 'country']
                ),
                EE_Answer::new_instance(
                    [
                        'ANS_value' => $this->_cpt_model_obj instanceof EE_Venue
                            ? $this->_cpt_model_obj->country_ID()
                            : 0,
                    ]
                ),
                [
                    'input_name'     => 'cnt_iso',
                    'input_id'       => 'cnt_iso',
                    'input_class'    => '',
                    'input_prefix'   => '',
                    'append_qstn_id' => false,
                ]
            )
        );

        $template = EE_VENUES_TEMPLATE_PATH . 'venue_address_metabox_content.template.php';
        EEH_Template::display_template($template, $template_args);
    }


    public function venue_virtual_loc_metabox()
    {
        $template_args = [
            '_venue' => $this->_cpt_model_obj,
        ];
        $template      = EE_VENUES_TEMPLATE_PATH . 'venue_virtual_location_metabox_content.template.php';
        EEH_Template::display_template($template, $template_args);
    }


    protected function _restore_cpt_item($post_id, $revision_id)
    {
        $venue_obj = $this->_venue_model->get_one_by_ID($post_id);

        // meta revision restore
        $venue_obj->restore_revision($revision_id);
    }


    /**
     * Handles updates for venue cpts
     *
     * @param int    $post_id ID of Venue CPT
     * @param object $post    Post object (with "blessed" WP properties)
     * @return void
     */
    protected function _insert_update_cpt_item($post_id, $post)
    {

        if ($post instanceof WP_Post && $post->post_type !== 'espresso_venues') {
            return;// get out we're not processing the saving of venues.
        }

        $wheres = [$this->_venue_model->primary_key_name() => $post_id];

        $venue_values = [
            'VNU_address'         => $this->request->getRequestParam('vnu_address'),
            'VNU_address2'        => $this->request->getRequestParam('vnu_address2'),
            'VNU_city'            => $this->request->getRequestParam('vnu_city'),
            'STA_ID'              => $this->request->getRequestParam('sta_id'),
            'CNT_ISO'             => $this->request->getRequestParam('cnt_iso'),
            'VNU_zip'             => $this->request->getRequestParam('vnu_zip'),
            'VNU_phone'           => $this->request->getRequestParam('vnu_phone'),
            'VNU_capacity'        => $this->request->requestParamIsSet('vnu_capacity')
                ? str_replace(',', '', $this->request->getRequestParam('vnu_capacity'))
                : EE_INF,
            'VNU_url'             => $this->request->getRequestParam('vnu_url'),
            'VNU_virtual_phone'   => $this->request->getRequestParam('vnu_virtual_phone'),
            'VNU_virtual_url'     => $this->request->getRequestParam('vnu_virtual_url'),
            'VNU_enable_for_gmap' => $this->request->getRequestParam('vnu_enable_for_gmap', false, 'bool'),
            'VNU_google_map_link' => $this->request->getRequestParam('vnu_google_map_link'),
        ];

        // update venue
        $success = $this->_venue_model->update($venue_values, [$wheres]);

        // get venue_object for other metaboxes that might be added via the filter... though it would seem to make sense to just use $this->_venue_model->get_one_by_ID( $post_id ).. i have to setup where conditions to override the filters in the model that filter out autodraft and inherit statuses so we GET the inherit id!
        $get_one_where = [$this->_venue_model->primary_key_name() => $post_id, 'status' => $post->post_status];
        $venue         = $this->_venue_model->get_one([$get_one_where]);

        // notice we've applied a filter for venue metabox callbacks but we don't actually have any default venue metaboxes in use.  So this is just here for addons to more easily hook into venue saves.
        $venue_update_callbacks = apply_filters(
            'FHEE__Venues_Admin_Page___insert_update_cpt_item__venue_update_callbacks',
            []
        );
        $att_success            = true;
        foreach ($venue_update_callbacks as $v_callback) {
            // if ANY of these updates fail then we want the appropriate global error message
            $att_success = call_user_func_array($v_callback, [$venue, $this->request->requestParams()])
                ? $att_success
                : false;
        }

        // any errors?
        if ($success && ! $att_success) {
            EE_Error::add_error(
                esc_html__(
                    'Venue Details saved successfully but something went wrong with saving attachments.',
                    'event_espresso'
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        } elseif ($success === false) {
            EE_Error::add_error(
                esc_html__('Venue Details did not save successfully.', 'event_espresso'),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        }
    }


    /**
     * @param int $post_id
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function trash_cpt_item($post_id)
    {
        $this->request->setRequestParam('VNU_ID', $post_id);
        $this->_trash_or_restore_venue('trash', false);
    }


    /**
     * @param int $post_id
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function restore_cpt_item($post_id)
    {
        $this->request->setRequestParam('VNU_ID', $post_id);
        $this->_trash_or_restore_venue('draft', false);
    }


    /**
     * @param int $post_id
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function delete_cpt_item($post_id)
    {
        $this->request->setRequestParam('VNU_ID', $post_id);
        $this->_delete_venue(false);
    }


    public function get_venue_object()
    {
        return $this->_cpt_model_obj;
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _trash_or_restore_venue($venue_status = 'trash', $redirect_after = true)
    {
        $VNU_ID = $this->request->getRequestParam('VNU_ID', 0, 'int');

        // loop thru venues
        if ($VNU_ID) {
            // clean status
            $venue_status = sanitize_key($venue_status);
            // grab status
            if (! empty($venue_status)) {
                $success = $this->_change_venue_status($VNU_ID, $venue_status);
            } else {
                $success = false;
                $msg     = esc_html__(
                    'An error occurred. The venue could not be moved to the trash because a valid venue status was not not supplied.',
                    'event_espresso'
                );
                EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
            }
        } else {
            $success = false;
            $msg     = esc_html__(
                'An error occurred. The venue could not be moved to the trash because a valid venue ID was not not supplied.',
                'event_espresso'
            );
            EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
        }
        $action = $venue_status == 'trash' ? 'moved to the trash' : 'restored from the trash';

        if ($redirect_after) {
            $this->_redirect_after_action($success, 'Venue', $action, ['action' => 'default']);
        }
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _trash_or_restore_venues($venue_status = 'trash')
    {
        // clean status
        $venue_status = sanitize_key($venue_status);
        // grab status
        if (! empty($venue_status)) {
            $success = true;
            // determine the event id and set to array.
            $VNU_IDs = $this->request->getRequestParam('venue_id', [], 'int', true);
            // loop thru events
            foreach ($VNU_IDs as $VNU_ID) {
                if ($VNU_ID = absint($VNU_ID)) {
                    $results = $this->_change_venue_status($VNU_ID, $venue_status);
                    $success = $results !== false ? $success : false;
                } else {
                    $msg = sprintf(
                        esc_html__(
                            'An error occurred. Venue #%d could not be moved to the trash because a valid venue ID was not not supplied.',
                            'event_espresso'
                        ),
                        $VNU_ID
                    );
                    EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
                    $success = false;
                }
            }
        } else {
            $success = false;
            $msg     = esc_html__(
                'An error occurred. The venue could not be moved to the trash because a valid venue status was not not supplied.',
                'event_espresso'
            );
            EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
        }
        // in order to force a pluralized result message we need to send back a success status greater than 1
        $success = $success ? 2 : false;
        $action  = $venue_status == 'trash' ? 'moved to the trash' : 'restored from the trash';
        $this->_redirect_after_action($success, 'Venues', $action, ['action' => 'default']);
    }


    /**
     * _trash_or_restore_venues
     *
     * //todo this is pretty much the same as the corresponding change_event_status method in Events_Admin_Page.  We
     * should probably abstract this up to the EE_Admin_Page_CPT (or even EE_Admin_Page) and make this a common method
     * accepting a certain number of params.
     *
     * @access  private
     * @param int    $VNU_ID
     * @param string $venue_status
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function _change_venue_status($VNU_ID = 0, $venue_status = '')
    {
        // grab venue id
        if (! $VNU_ID) {
            $msg = esc_html__('An error occurred. No Venue ID or an invalid Venue ID was received.', 'event_espresso');
            EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
            return false;
        }

        $this->_cpt_model_obj = EEM_Venue::instance()->get_one_by_ID($VNU_ID);

        // clean status
        $venue_status = sanitize_key($venue_status);
        // grab status
        if (! $venue_status) {
            $msg = esc_html__(
                'An error occurred. No Venue Status or an invalid Venue Status was received.',
                'event_espresso'
            );
            EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
            return false;
        }

        // was event trashed or restored ?
        switch ($venue_status) {
            case 'draft':
                $action = 'restored from the trash';
                $hook   = 'AHEE_venue_restored_from_trash';
                break;
            case 'trash':
                $action = 'moved to the trash';
                $hook   = 'AHEE_venue_moved_to_trash';
                break;
            default:
                $action = 'updated';
                $hook   = false;
        }
        // use class to change status
        $this->_cpt_model_obj->set_status($venue_status);
        $success = $this->_cpt_model_obj->save();

        if ($success === false) {
            $msg = sprintf(esc_html__('An error occurred. The venue could not be %s.', 'event_espresso'), $action);
            EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
            return false;
        }
        if ($hook) {
            do_action($hook);
        }
        return true;
    }


    /**
     * @param bool $redirect_after
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _delete_venue($redirect_after = true)
    {
        // determine the venue id and set to array.
        $VNU_ID = $this->request->getRequestParam('VNU_ID', 0, 'int');
        $VNU_ID = $this->request->getRequestParam('post', $VNU_ID, 'int');

        // loop thru venues
        if ($VNU_ID) {
            $success = $this->_delete_or_trash_venue($VNU_ID);
        } else {
            $success = false;
            $msg     = esc_html__(
                'An error occurred. An venue could not be deleted because a valid venue ID was not not supplied.',
                'event_espresso'
            );
            EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
        }
        if ($redirect_after) {
            $this->_redirect_after_action($success, 'Venue', 'deleted', ['action' => 'default']);
        }
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _delete_venues()
    {
        $success = true;
        // determine the event id and set to array.
        $VNU_IDs = $this->request->getRequestParam('venue_id', [], 'int', true);
        // loop thru events
        foreach ($VNU_IDs as $VNU_ID) {
            if ($VNU_ID = absint($VNU_ID)) {
                $results = $this->_delete_or_trash_venue($VNU_ID);
                $success = $results !== false ? $success : false;
            } else {
                $success = false;
                $msg     = esc_html__(
                    'An error occurred. An venue could not be deleted because a valid venue ID was not not supplied.',
                    'event_espresso'
                );
                EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
            }
        }
        // in order to force a pluralized result message we need to send back a success status greater than 1
        $success = $success ? 2 : false;
        $this->_redirect_after_action(
            $success,
            esc_html__('Venues', 'event_espresso'),
            esc_html__('deleted', 'event_espresso'),
            ['action' => 'default']
        );
    }


    // todo: put in parent


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function _delete_or_trash_venue($VNU_ID = false)
    {
        // grab event id
        if (! $VNU_ID = absint($VNU_ID)) {
            $msg = esc_html__('An error occurred. No Venue ID or an invalid Venue ID was received.', 'event_espresso');
            EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
            return false;
        }


        $venue = EEM_Venue::instance()->get_one_by_ID($VNU_ID);
        // first need to remove all term relationships
        $venue->_remove_relations('Term_Taxonomy');
        $success = $venue->delete_permanently();
        // did it all go as planned ?
        if ($success) {
            $msg = sprintf(esc_html__('Venue ID # %d has been deleted.', 'event_espresso'), $VNU_ID);
            EE_Error::add_success($msg);
        } else {
            $msg =
                sprintf(
                    esc_html__('An error occurred. Venue ID # %d could not be deleted.', 'event_espresso'),
                    $VNU_ID
                );
            EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
            return false;
        }
        do_action('AHEE__Venues_Admin_Page___delete_or_trash_venue__after_venue_deleted');
        return true;
    }




    /***********/
    /* QUERIES */


    public function get_venues($per_page = 10, $count = false)
    {

        $orderby = $this->request->getRequestParam('orderby', '');

        switch ($orderby) {
            case 'id':
                $orderby = 'VNU_ID';
                break;

            case 'capacity':
                $orderby = 'VNU_capacity';
                break;

            case 'city':
                $orderby = 'VNU_city';
                break;

            default:
                $orderby = 'VNU_name';
        }

        $sort         = $this->request->getRequestParam('order', 'ASC');
        $current_page = $this->request->getRequestParam('paged', 1, 'int');
        $per_page     = ! empty($per_page) ? $per_page : 10;
        $per_page     = $this->request->getRequestParam('perpage', $per_page, 'int');

        $offset = ($current_page - 1) * $per_page;
        $limit  = [$offset, $per_page];

        $category = $this->request->getRequestParam('category');
        $category = $category > 0 ? $category : null;

        $where = [];

        // only set initial status if it is in the incoming request.  Otherwise the "all" view display's all statuses.
        $status = $this->request->getRequestParam('status');
        if ($status && $status !== 'all') {
            $where['status'] = $status;
        }

        $venue_status = $this->request->getRequestParam('venue_status');
        if ($venue_status) {
            $where['status'] = $venue_status;
        }


        if ($category) {
            $where['Term_Taxonomy.taxonomy'] = 'espresso_venue_categories';
            $where['Term_Taxonomy.term_id']  = $category;
        }


        if (! EE_Registry::instance()->CAP->current_user_can('ee_read_others_venues', 'get_venues')) {
            $where['VNU_wp_user'] = get_current_user_id();
        } else {
            if (! EE_Registry::instance()->CAP->current_user_can('ee_read_private_venues', 'get_venues')) {
                $where['OR'] = [
                    'status*restrict_private' => ['!=', 'private'],
                    'AND'                     => [
                        'status*inclusive' => ['=', 'private'],
                        'VNU_wp_user'      => get_current_user_id(),
                    ],
                ];
            }
        }

        $search_term = $this->request->getRequestParam('s');
        if ($search_term) {
            $search_term = '%' . $search_term . '%';
            $where['OR'] = [
                'VNU_name'               => ['LIKE', $search_term],
                'VNU_desc'               => ['LIKE', $search_term],
                'VNU_short_desc'         => ['LIKE', $search_term],
                'VNU_address'            => ['LIKE', $search_term],
                'VNU_address2'           => ['LIKE', $search_term],
                'VNU_city'               => ['LIKE', $search_term],
                'VNU_zip'                => ['LIKE', $search_term],
                'VNU_phone'              => ['LIKE', $search_term],
                'VNU_url'                => ['LIKE', $search_term],
                'VNU_virtual_phone'      => ['LIKE', $search_term],
                'VNU_virtual_url'        => ['LIKE', $search_term],
                'VNU_google_map_link'    => ['LIKE', $search_term],
                'Event.EVT_name'         => ['LIKE', $search_term],
                'Event.EVT_desc'         => ['LIKE', $search_term],
                'Event.EVT_phone'        => ['LIKE', $search_term],
                'Event.EVT_external_URL' => ['LIKE', $search_term],
            ];
        }


        return $count
            ? $this->_venue_model->count([$where], 'VNU_ID')
            : $this->_venue_model->get_all(
                [$where, 'limit' => $limit, 'order_by' => $orderby, 'order' => $sort]
            );
    }




    /** Venue Category Stuff **/

    /**
     * set the _category property with the category object for the loaded page.
     *
     * @access private
     * @return void
     */
    private function _set_category_object()
    {
        if (isset($this->_category->id) && ! empty($this->_category->id)) {
            return;
        } // already have the category object so get out.

        // set default category object
        $this->_set_empty_category_object();

        // only set if we've got an id
        $category_ID = $this->request->getRequestParam('VEN_CAT_ID', 0, 'int');
        if (! $category_ID) {
            return;
        }

        $term = get_term($category_ID, 'espresso_venue_categories');


        if (! empty($term)) {
            $this->_category->category_name       = $term->name;
            $this->_category->category_identifier = $term->slug;
            $this->_category->category_desc       = $term->description;
            $this->_category->id                  = $term->term_id;
            $this->_category->parent              = $term->parent;
        }
    }


    private function _set_empty_category_object()
    {
        $this->_category                = new stdClass();
        $this->_category->category_name = $this->_category->category_identifier = $this->_category->category_desc = '';
        $this->_category->id            = $this->_category->parent = 0;
    }


    /**
     * @throws EE_Error
     */
    protected function _category_list_table()
    {
        do_action('AHEE_log', __FILE__, __FUNCTION__, '');
        $this->_admin_page_title .= ' ' . $this->get_action_link_or_button(
            'add_category',
            'add_category',
            [],
            'add-new-h2'
        );
        $this->_search_btn_label = esc_html__('Venue Categories', 'event_espresso');
        $this->display_admin_list_table_page_with_sidebar();
    }


    /**
     * @throws EE_Error
     */
    protected function _category_details($view)
    {

        // load formatter helper
        // load field generator helper

        $route = $view == 'edit' ? 'update_category' : 'insert_category';
        $this->_set_add_edit_form_tags($route);

        $this->_set_category_object();
        $id = ! empty($this->_category->id) ? $this->_category->id : '';

        $delete_action = 'delete_category';

        $redirect = EE_Admin_Page::add_query_args_and_nonce(['action' => 'category_list'], $this->_admin_base_url);

        $this->_set_publish_post_box_vars('VEN_CAT_ID', $id, $delete_action, $redirect);

        // take care of contents
        $this->_template_args['admin_page_content'] = $this->_category_details_content();
        $this->display_admin_page_with_sidebar();
    }


    protected function _category_details_content()
    {
        $editor_args['category_desc'] = [
            'type'          => 'wp_editor',
            'value'         => EEH_Formatter::admin_format_content($this->_category->category_desc),
            'class'         => 'my_editor_custom',
            'wpeditor_args' => ['media_buttons' => false],
        ];
        $_wp_editor                   = $this->_generate_admin_form_fields($editor_args, 'array');

        $all_terms = get_terms(
            ['espresso_venue_categories'],
            ['hide_empty' => 0, 'exclude' => [$this->_category->id]]
        );

        // setup category select for term parents.
        $category_select_values[] = [
            'text' => esc_html__('No Parent', 'event_espresso'),
            'id'   => 0,
        ];
        foreach ($all_terms as $term) {
            $category_select_values[] = [
                'text' => $term->name,
                'id'   => $term->term_id,
            ];
        }

        $category_select = EEH_Form_Fields::select_input(
            'category_parent',
            $category_select_values,
            $this->_category->parent
        );
        $template_args   = [
            'category'                 => $this->_category,
            'category_select'          => $category_select,
            'unique_id_info_help_link' => $this->_get_help_tab_link('unique_id_info'),
            'category_desc_editor'     => $_wp_editor['category_desc']['field'],
            'disable'                  => '',
            'disabled_message'         => false,
        ];
        $template        = EVENTS_TEMPLATE_PATH . 'event_category_details.template.php';
        return EEH_Template::display_template($template, $template_args, true);
    }


    /**
     * @throws EE_Error
     */
    protected function _delete_categories()
    {
        $category_ID  = $this->request->getRequestParam('category_id', 0, 'int');
        $category_IDs = $this->request->getRequestParam('VEN_CAT_ID', [$category_ID], 'int', true);

        foreach ($category_IDs as $cat_id) {
            $this->_delete_category($cat_id);
        }

        // doesn't matter what page we're coming from... we're going to the same place after delete.
        $query_args = [
            'action' => 'category_list',
        ];
        $this->_redirect_after_action(0, '', '', $query_args);
    }


    protected function _delete_category($cat_id)
    {
        $cat_id = absint($cat_id);
        wp_delete_term($cat_id, 'espresso_venue_categories');
    }


    /**
     * @throws EE_Error
     */
    protected function _insert_or_update_category($new_category)
    {

        $cat_id  = $new_category ? $this->_insert_category() : $this->_insert_category(true);
        $success = 0; // we already have a success message so lets not send another.
        if ($cat_id) {
            $query_args = [
                'action'     => 'edit_category',
                'VEN_CAT_ID' => $cat_id,
            ];
        } else {
            $query_args = ['action' => 'add_category'];
        }
        $this->_redirect_after_action($success, '', '', $query_args, true);
    }


    private function _insert_category($update = false)
    {
        $category_ID     = $update ? $this->request->getRequestParam('VEN_CAT_ID', '', 'int') : '';
        $category_name   = $this->request->getRequestParam('category_name', '');
        $category_desc   = $this->request->getRequestParam('category_desc', '', 'html');
        $category_parent = $this->request->getRequestParam('category_parent', 0, 'int');

        if (empty($category_name)) {
            $msg = esc_html__('You must add a name for the category.', 'event_espresso');
            EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
            return false;
        }


        $term_args = [
            'name'        => $category_name,
            'description' => $category_desc,
            'parent'      => $category_parent,
        ];

        $insert_ids = $update
            ? wp_update_term($category_ID, 'espresso_venue_categories', $term_args)
            : wp_insert_term(
                $category_name,
                'espresso_venue_categories',
                $term_args
            );

        if (! is_array($insert_ids)) {
            EE_Error::add_error(
                esc_html__('An error occurred and the category has not been saved to the database.', 'event_espresso'),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        } else {
            $category_ID = $insert_ids['term_id'];
            EE_Error::add_success(
                sprintf(
                    esc_html__('The category %s was successfully created', 'event_espresso'),
                    $category_name
                )
            );
        }

        return $category_ID;
    }


    /**
     * TODO handle category exports()
     *
     * @return void
     */
    protected function _categories_export()
    {
        // todo: I don't like doing this but it'll do until we modify EE_Export Class.
        $this->request->mergeRequestParams(
            [
                'export'       => 'report',
                'action'       => 'categories',
                'category_ids' => $this->request->getRequestParam('VEN_CAT_ID', 0, 'int'),
            ]
        );

        if (is_readable(EE_CLASSES . 'EE_Export.class.php')) {
            require_once(EE_CLASSES . 'EE_Export.class.php');
            $EE_Export = EE_Export::instance($this->request->requestParams());
            $EE_Export->export();
        }
    }


    protected function _import_categories()
    {

        require_once(EE_CLASSES . 'EE_Import.class.php');
        EE_Import::instance()->import();
    }


    /**
     * @throws EE_Error
     */
    public function get_categories($per_page = 10, $current_page = 1, $count = false)
    {

        // testing term stuff
        $orderby     = $this->request->getRequestParam('orderby', 'Term.term_id');
        $order       = $this->request->getRequestParam('order', 'DESC');
        $limit       = ($current_page - 1) * $per_page;
        $where       = ['taxonomy' => 'espresso_venue_categories'];
        $search_term = $this->request->getRequestParam('s');
        if ($search_term) {
            $search_term = '%' . $search_term . '%';
            $where['OR'] = [
                'Term.name'   => ['LIKE', $search_term],
                'description' => ['LIKE', $search_term],
            ];
        }

        $query_params = [
            $where,
            'order_by'   => [$orderby => $order],
            'limit'      => $limit . ',' . $per_page,
            'force_join' => ['Term'],
        ];

        return $count
            ? EEM_Term_Taxonomy::instance()->count($query_params, 'term_id')
            : EEM_Term_Taxonomy::instance()->get_all($query_params);
    }


    /* end category stuff */
    /**************/
}
