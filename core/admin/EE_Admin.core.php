<?php

use EventEspresso\core\domain\entities\custom_post_types\CustomPostTypeDefinitions;
use EventEspresso\core\domain\entities\notifications\PersistentAdminNotice;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\interfaces\InterminableInterface;
use EventEspresso\core\services\container\exceptions\ServiceNotFoundException;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\notifications\PersistentAdminNoticeManager;
use EventEspresso\core\services\loaders\LoaderInterface;
use EventEspresso\core\services\request\RequestInterface;

/**
 * EE_Admin
 *
 * @package               Event Espresso
 * @subpackage            /core/admin/
 * @author                Brent Christensen
 */
final class EE_Admin implements InterminableInterface
{

    /**
     * @var EE_Admin $_instance
     */
    private static $_instance;

    /**
     * @var PersistentAdminNoticeManager $persistent_admin_notice_manager
     */
    private $persistent_admin_notice_manager;

    /**
     * @var LoaderInterface
     */
    protected $loader;

    /**
     * @var RequestInterface
     */
    protected $request;


    /**
     * @param RequestInterface $request
     * @singleton method used to instantiate class object
     * @return EE_Admin
     * @throws EE_Error
     */
    public static function instance(RequestInterface $request = null)
    {
        // check if class object is instantiated
        if (! self::$_instance instanceof EE_Admin) {
            self::$_instance = new self($request);
        }
        return self::$_instance;
    }


    /**
     * @return EE_Admin
     * @throws EE_Error
     */
    public static function reset()
    {
        self::$_instance = null;
        $request         = LoaderFactory::getLoader()->getShared(RequestInterface::class);
        return self::instance($request);
    }


    /**
     * @param RequestInterface $request
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     */
    protected function __construct(RequestInterface $request)
    {
        $this->request = $request;
        $this->loader = LoaderFactory::getLoader();
        // define global EE_Admin constants
        $this->_define_all_constants();
        // set autoloaders for our admin page classes based on included path information
        EEH_Autoloader::instance()->register_autoloaders_for_each_file_in_folder(EE_ADMIN);
        // admin hooks
        add_filter('plugin_action_links', [$this, 'filter_plugin_actions'], 10, 2);
        add_action('AHEE__EE_System__initialize_last', [$this, 'init']);
        add_action('AHEE__EE_Admin_Page__route_admin_request', [$this, 'route_admin_request'], 100, 2);
        add_action('wp_loaded', [$this, 'wp_loaded'], 100);
        add_action('admin_init', [$this, 'admin_init'], 100);
        add_action('admin_enqueue_scripts', [$this, 'enqueue_admin_scripts'], 20);
        add_action('admin_notices', [$this, 'display_admin_notices'], 10);
        add_action('network_admin_notices', [$this, 'display_admin_notices'], 10);
        add_filter('pre_update_option', [$this, 'check_for_invalid_datetime_formats'], 100, 2);
        add_filter('admin_footer_text', [$this, 'espresso_admin_footer']);
        add_action('load-plugins.php', [$this, 'hookIntoWpPluginsPage']);
        add_action('display_post_states', [$this, 'displayStateForCriticalPages'], 10, 2);
        add_filter('plugin_row_meta', [$this, 'addLinksToPluginRowMeta'], 10, 2);
        // reset Environment config (we only do this on admin page loads);
        EE_Registry::instance()->CFG->environment->recheck_values();
        do_action('AHEE__EE_Admin__loaded');
    }


    /**
     * _define_all_constants
     * define constants that are set globally for all admin pages
     *
     * @return void
     */
    private function _define_all_constants()
    {
        if (! defined('EE_ADMIN_URL')) {
            define('EE_ADMIN_URL', EE_PLUGIN_DIR_URL . 'core/admin/');
            define('EE_ADMIN_PAGES_URL', EE_PLUGIN_DIR_URL . 'admin_pages/');
            define('EE_ADMIN_TEMPLATE', EE_ADMIN . 'templates/');
            define('WP_ADMIN_PATH', ABSPATH . 'wp-admin/');
            define('WP_AJAX_URL', admin_url('admin-ajax.php'));
        }
    }


    /**
     * filter_plugin_actions - adds links to the Plugins page listing
     *
     * @param array  $links
     * @param string $plugin
     * @return    array
     */
    public function filter_plugin_actions($links, $plugin)
    {
        // set $main_file in stone
        static $main_file;
        // if $main_file is not set yet
        if (! $main_file) {
            $main_file = EE_PLUGIN_BASENAME;
        }
        if ($plugin === $main_file) {
            // compare current plugin to this one
            if (EE_Maintenance_Mode::instance()->level() === EE_Maintenance_Mode::level_2_complete_maintenance) {
                $maintenance_link = '<a href="admin.php?page=espresso_maintenance_settings"'
                                    . ' title="Event Espresso is in maintenance mode.  Click this link to learn why.">'
                                    . esc_html__('Maintenance Mode Active', 'event_espresso')
                                    . '</a>';
                array_unshift($links, $maintenance_link);
            } else {
                $org_settings_link = '<a href="admin.php?page=espresso_general_settings">'
                                     . esc_html__('Settings', 'event_espresso')
                                     . '</a>';
                $events_link       = '<a href="admin.php?page=espresso_events">'
                                     . esc_html__('Events', 'event_espresso')
                                     . '</a>';
                // add before other links
                array_unshift($links, $org_settings_link, $events_link);
            }
        }
        return $links;
    }


    /**
     * @deprecated 4.10.14.p
     */
    public function get_request()
    {
    }


    /**
     * hide_admin_pages_except_maintenance_mode
     *
     * @param array $admin_page_folder_names
     * @return array
     */
    public function hide_admin_pages_except_maintenance_mode($admin_page_folder_names = [])
    {
        return [
            'maintenance' => EE_ADMIN_PAGES . 'maintenance/',
            'about'       => EE_ADMIN_PAGES . 'about/',
            'support'     => EE_ADMIN_PAGES . 'support/',
        ];
    }


    /**
     * init- should fire after shortcode, module,  addon, other plugin (default priority), and even
     * EE_Front_Controller's init phases have run
     *
     * @return void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws ServiceNotFoundException
     */
    public function init()
    {
        // only enable most of the EE_Admin IF we're not in full maintenance mode
        if (EE_Maintenance_Mode::instance()->models_can_query()) {
            $this->initModelsReady();
        }
        // run the admin page factory but ONLY if:
        // - it is a regular non ajax admin request
        // - we are doing an ee admin ajax request
        if ($this->request->isAdmin() || $this->request->isAdminAjax()) {
            // this loads the controller for the admin pages which will setup routing etc
            $this->loader->getShared('EE_Admin_Page_Loader', [$this->loader]);
        }
        if ($this->request->isAdminAjax()) {
            return;
        }
        add_filter('content_save_pre', [$this, 'its_eSpresso'], 10, 1);
        // make sure our CPTs and custom taxonomy metaboxes get shown for first time users
        add_action('admin_head', [$this, 'enable_hidden_ee_nav_menu_metaboxes'], 10);
        add_action('admin_head', [$this, 'register_custom_nav_menu_boxes'], 10);
        // exclude EE critical pages from all nav menus and wp_list_pages
        add_filter('nav_menu_meta_box_object', [$this, 'remove_pages_from_nav_menu'], 10);
    }


    /**
     * Gets the loader (and if it wasn't previously set, sets it)
     *
     * @return LoaderInterface
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    protected function getLoader()
    {
        return $this->loader;
    }


    /**
     * Method that's fired on admin requests (including admin ajax) but only when the models are usable
     * (ie, the site isn't in maintenance mode)
     *
     * @return void
     * @throws EE_Error
     * @since 4.9.63.p
     */
    protected function initModelsReady()
    {
        // ok so we want to enable the entire admin
        $this->persistent_admin_notice_manager = $this->loader->getShared(
            'EventEspresso\core\services\notifications\PersistentAdminNoticeManager'
        );
        $this->persistent_admin_notice_manager->setReturnUrl(
            EE_Admin_Page::add_query_args_and_nonce(
                [
                    'page'   => $this->request->getRequestParam('page'),
                    'action' => $this->request->getRequestParam('action'),
                ],
                EE_ADMIN_URL
            )
        );
        $this->maybeSetDatetimeWarningNotice();
        // at a glance dashboard widget
        add_filter('dashboard_glance_items', [$this, 'dashboard_glance_items'], 10);
        // filter for get_edit_post_link used on comments for custom post types
        add_filter('get_edit_post_link', [$this, 'modify_edit_post_link'], 10, 2);
    }


    /**
     *    get_persistent_admin_notices
     *
     * @access    public
     * @return void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function maybeSetDatetimeWarningNotice()
    {
        // add dismissible notice for datetime changes.  Only valid if site does not have a timezone_string set.
        // @todo This needs to stay in core for a bit to catch anyone upgrading from a version without this to a version
        // with this.  But after enough time (indeterminate at this point) we can just remove this notice.
        // this was added with https://events.codebasehq.com/projects/event-espresso/tickets/10626
        if (
            apply_filters('FHEE__EE_Admin__maybeSetDatetimeWarningNotice', true)
            && ! get_option('timezone_string')
            && EEM_Event::instance()->count() > 0
        ) {
            new PersistentAdminNotice(
                'datetime_fix_notice',
                sprintf(
                    esc_html__(
                        '%1$sImportant announcement related to your install of Event Espresso%2$s: There are some changes made to your site that could affect how dates display for your events and other related items with dates and times.  Read more about it %3$shere%4$s. If your dates and times are displaying incorrectly (incorrect offset), you can fix it using the tool on %5$sthis page%4$s.',
                        'event_espresso'
                    ),
                    '<strong>',
                    '</strong>',
                    '<a href="https://eventespresso.com/2017/08/important-upcoming-changes-dates-times">',
                    '</a>',
                    '<a href="' . EE_Admin_Page::add_query_args_and_nonce(
                        [
                            'page'   => 'espresso_maintenance_settings',
                            'action' => 'datetime_tools',
                        ],
                        admin_url('admin.php')
                    ) . '">'
                ),
                false,
                'manage_options',
                'datetime_fix_persistent_notice'
            );
        }
    }


    /**
     * this simply hooks into the nav menu setup of pages metabox and makes sure that we remove EE critical pages from
     * the list of options. the wp function "wp_nav_menu_item_post_type_meta_box" found in
     * wp-admin/includes/nav-menu.php looks for the "_default_query" property on the post_type object and it uses that
     * to override any queries found in the existing query for the given post type.  Note that _default_query is not a
     * normal property on the post_type object.  It's found ONLY in this particular context.
     *
     * @param WP_Post $post_type WP post type object
     * @return WP_Post
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function remove_pages_from_nav_menu($post_type)
    {
        // if this isn't the "pages" post type let's get out
        if ($post_type->name !== 'page') {
            return $post_type;
        }
        $critical_pages            = EE_Registry::instance()->CFG->core->get_critical_pages_array();
        $post_type->_default_query = [
            'post__not_in' => $critical_pages,
        ];
        return $post_type;
    }


    /**
     * WP by default only shows three metaboxes in "nav-menus.php" for first times users.  We want to make sure our
     * metaboxes get shown as well
     *
     * @return void
     */
    public function enable_hidden_ee_nav_menu_metaboxes()
    {
        global $wp_meta_boxes, $pagenow;
        if (! is_array($wp_meta_boxes) || $pagenow !== 'nav-menus.php') {
            return;
        }
        $user = wp_get_current_user();
        // has this been done yet?
        if (get_user_option('ee_nav_menu_initialized', $user->ID)) {
            return;
        }

        $hidden_meta_boxes  = get_user_option('metaboxhidden_nav-menus', $user->ID);
        $initial_meta_boxes = apply_filters(
            'FHEE__EE_Admin__enable_hidden_ee_nav_menu_boxes__initial_meta_boxes',
            [
                'nav-menu-theme-locations',
                'add-page',
                'add-custom-links',
                'add-category',
                'add-espresso_events',
                'add-espresso_venues',
                'add-espresso_event_categories',
                'add-espresso_venue_categories',
                'add-post-type-post',
                'add-post-type-page',
            ]
        );

        if (is_array($hidden_meta_boxes)) {
            foreach ($hidden_meta_boxes as $key => $meta_box_id) {
                if (in_array($meta_box_id, $initial_meta_boxes, true)) {
                    unset($hidden_meta_boxes[ $key ]);
                }
            }
        }
        update_user_option($user->ID, 'metaboxhidden_nav-menus', $hidden_meta_boxes, true);
        update_user_option($user->ID, 'ee_nav_menu_initialized', 1, true);
    }


    /**
     * This method simply registers custom nav menu boxes for "nav_menus.php route"
     * Currently EE is using this to make sure there are menu options for our CPT archive page routes.
     *
     * @return void
     * @todo   modify this so its more dynamic and automatic for all ee CPTs and setups and can also be hooked into by
     *         addons etc.
     */
    public function register_custom_nav_menu_boxes()
    {
        add_meta_box(
            'add-extra-nav-menu-pages',
            esc_html__('Event Espresso Pages', 'event_espresso'),
            [$this, 'ee_cpt_archive_pages'],
            'nav-menus',
            'side',
            'core'
        );
    }


    /**
     * Use this to edit the post link for our cpts so that the edit link points to the correct page.
     *
     * @param string $link the original link generated by wp
     * @param int    $id   post id
     * @return string  the (maybe) modified link
     * @since   4.3.0
     */
    public function modify_edit_post_link($link, $id)
    {
        if (! $post = get_post($id)) {
            return $link;
        }
        if ($post->post_type === 'espresso_attendees') {
            $query_args = [
                'action' => 'edit_attendee',
                'post'   => $id,
            ];
            return EEH_URL::add_query_args_and_nonce(
                $query_args,
                admin_url('admin.php?page=espresso_registrations')
            );
        }
        return $link;
    }


    public function ee_cpt_archive_pages()
    {
        global $nav_menu_selected_id;
        $removed_args = [
            'action',
            'customlink-tab',
            'edit-menu-item',
            'menu-item',
            'page-tab',
            '_wpnonce',
        ];
        $nav_tab_link = $nav_menu_selected_id
            ? esc_url(
                add_query_arg(
                    'extra-nav-menu-pages-tab',
                    'event-archives',
                    remove_query_arg($removed_args)
                )
            )
            : '';
        $select_all_link = esc_url(
            add_query_arg(
                [
                    'extra-nav-menu-pages-tab' => 'event-archives',
                    'selectall'                => 1,
                ],
                remove_query_arg($removed_args)
            )
        );
        $pages = $this->_get_extra_nav_menu_pages_items();
        $args['walker'] = new Walker_Nav_Menu_Checklist(false);
        ;
        $nav_menu_pages_items = walk_nav_menu_tree(
            array_map(
                [$this, '_setup_extra_nav_menu_pages_items'],
                $pages
            ),
            0,
            (object) $args
        );

        EEH_Template::display_template(
            EE_ADMIN_TEMPLATE . 'cpt_archive_page.template.php',
            [
                $nav_menu_pages_items,
                $nav_tab_link,
                $select_all_link,
            ]
        );
    }


    /**
     * Returns an array of event archive nav items.
     *
     * @return array
     * @todo  for now this method is just in place so when it gets abstracted further we can substitute in whatever
     *        method we use for getting the extra nav menu items
     */
    private function _get_extra_nav_menu_pages_items()
    {
        $menuitems[] = [
            'title'       => esc_html__('Event List', 'event_espresso'),
            'url'         => get_post_type_archive_link('espresso_events'),
            'description' => esc_html__('Archive page for all events.', 'event_espresso'),
        ];
        return apply_filters('FHEE__EE_Admin__get_extra_nav_menu_pages_items', $menuitems);
    }


    /**
     * Setup nav menu walker item for usage in the event archive nav menu metabox.  It receives a menu_item array with
     * the properties and converts it to the menu item object.
     *
     * @param $menu_item_values
     * @return stdClass
     * @see wp_setup_nav_menu_item() in wp-includes/nav-menu.php
     */
    private function _setup_extra_nav_menu_pages_items($menu_item_values)
    {
        $menu_item = new stdClass();
        $keys      = [
            'ID'               => 0,
            'db_id'            => 0,
            'menu_item_parent' => 0,
            'object_id'        => -1,
            'post_parent'      => 0,
            'type'             => 'custom',
            'object'           => '',
            'type_label'       => esc_html__('Extra Nav Menu Item', 'event_espresso'),
            'title'            => '',
            'url'              => '',
            'target'           => '',
            'attr_title'       => '',
            'description'      => '',
            'classes'          => [],
            'xfn'              => '',
        ];

        foreach ($keys as $key => $value) {
            $menu_item->{$key} = isset($menu_item_values[ $key ]) ? $menu_item_values[ $key ] : $value;
        }
        return $menu_item;
    }


    /**
     * This is the action hook for the AHEE__EE_Admin_Page__route_admin_request hook that fires off right before an
     * EE_Admin_Page route is called.
     *
     * @return void
     */
    public function route_admin_request()
    {
    }


    /**
     * wp_loaded should fire on the WordPress wp_loaded hook.  This fires on a VERY late priority.
     *
     * @return void
     */
    public function wp_loaded()
    {
    }


    /**
     * admin_init
     *
     * @return void
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function admin_init()
    {
        /**
         * our cpt models must be instantiated on WordPress post processing routes (wp-admin/post.php),
         * so any hooking into core WP routes is taken care of.  So in this next few lines of code:
         * - check if doing post processing.
         * - check if doing post processing of one of EE CPTs
         * - instantiate the corresponding EE CPT model for the post_type being processed.
         */
        $action    = $this->request->getRequestParam('action');
        $post_type = $this->request->getRequestParam('post_type');
        if ($post_type && $action === 'editpost') {
            /** @var CustomPostTypeDefinitions $custom_post_types */
            $custom_post_types = $this->loader->getShared(CustomPostTypeDefinitions::class);
            $custom_post_types->getCustomPostTypeModels($post_type);
        }


        /**
         * This code excludes EE critical pages anywhere `wp_dropdown_pages` is used to create a dropdown for selecting
         * critical pages.  The only place critical pages need included in a generated dropdown is on the "Critical
         * Pages" tab in the EE General Settings Admin page.
         * This is for user-proofing.
         */
        add_filter('wp_dropdown_pages', [$this, 'modify_dropdown_pages']);
        if (EE_Maintenance_Mode::instance()->models_can_query()) {
            $this->adminInitModelsReady();
        }
    }


    /**
     * Runs on admin_init but only if models are usable (ie, we're not in maintenance mode)
     */
    protected function adminInitModelsReady()
    {
        if (function_exists('wp_add_privacy_policy_content')) {
            $this->loader->getShared('EventEspresso\core\services\privacy\policy\PrivacyPolicyManager');
        }
    }


    /**
     * Callback for wp_dropdown_pages hook to remove ee critical pages from the dropdown selection.
     *
     * @param string $output Current output.
     * @return string
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function modify_dropdown_pages($output)
    {
        // get critical pages
        $critical_pages = EE_Registry::instance()->CFG->core->get_critical_pages_array();

        // split current output by line break for easier parsing.
        $split_output = explode("\n", $output);

        // loop through to remove any critical pages from the array.
        foreach ($critical_pages as $page_id) {
            $needle = 'value="' . $page_id . '"';
            foreach ($split_output as $key => $haystack) {
                if (strpos($haystack, $needle) !== false) {
                    unset($split_output[ $key ]);
                }
            }
        }
        // replace output with the new contents
        return implode("\n", $split_output);
    }


    /**
     * enqueue all admin scripts that need loaded for admin pages
     *
     * @return void
     */
    public function enqueue_admin_scripts()
    {
        // this javascript is loaded on every admin page to catch any injections ee needs to add to wp run js.
        // Note: the intention of this script is to only do TARGETED injections.  I.E, only injecting on certain script
        // calls.
        wp_enqueue_script(
            'ee-inject-wp',
            EE_ADMIN_URL . 'assets/ee-cpt-wp-injects.js',
            ['jquery'],
            EVENT_ESPRESSO_VERSION,
            true
        );
        // register cookie script for future dependencies
        wp_register_script(
            'jquery-cookie',
            EE_THIRD_PARTY_URL . 'joyride/jquery.cookie.js',
            ['jquery'],
            '2.1',
            true
        );
    }


    /**
     * display_admin_notices
     *
     * @return void
     */
    public function display_admin_notices()
    {
        echo EE_Error::get_notices(); // already escaped
    }


    /**
     * @param array $elements
     * @return array
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function dashboard_glance_items($elements)
    {
        $elements                        = is_array($elements) ? $elements : [$elements];
        $events                          = EEM_Event::instance()->count();
        $items['events']['url']          = EE_Admin_Page::add_query_args_and_nonce(
            ['page' => 'espresso_events'],
            admin_url('admin.php')
        );
        $items['events']['text']         = sprintf(
            esc_html(
                _n('%s Event', '%s Events', $events, 'event_espresso')
            ),
            number_format_i18n($events)
        );
        $items['events']['title']        = esc_html__('Click to view all Events', 'event_espresso');
        $registrations                   = EEM_Registration::instance()->count(
            [
                [
                    'STS_ID' => ['!=', EEM_Registration::status_id_incomplete],
                ],
            ]
        );
        $items['registrations']['url']   = EE_Admin_Page::add_query_args_and_nonce(
            ['page' => 'espresso_registrations'],
            admin_url('admin.php')
        );
        $items['registrations']['text']  = sprintf(
            esc_html(
                _n('%s Registration', '%s Registrations', $registrations, 'event_espresso')
            ),
            number_format_i18n($registrations)
        );
        $items['registrations']['title'] = esc_html__('Click to view all registrations', 'event_espresso');

        $items = (array) apply_filters('FHEE__EE_Admin__dashboard_glance_items__items', $items);

        foreach ($items as $type => $item_properties) {
            $elements[] = sprintf(
                '<a class="ee-dashboard-link-' . $type . '" href="%s" title="%s">%s</a>',
                $item_properties['url'],
                $item_properties['title'],
                $item_properties['text']
            );
        }
        return $elements;
    }


    /**
     * check_for_invalid_datetime_formats
     * if an admin changes their date or time format settings on the WP General Settings admin page, verify that
     * their selected format can be parsed by PHP
     *
     * @param    $value
     * @param    $option
     * @return    string
     */
    public function check_for_invalid_datetime_formats($value, $option)
    {
        // check for date_format or time_format
        switch ($option) {
            case 'date_format':
                $date_time_format = $value . ' ' . get_option('time_format');
                break;
            case 'time_format':
                $date_time_format = get_option('date_format') . ' ' . $value;
                break;
            default:
                $date_time_format = false;
        }
        // do we have a date_time format to check ?
        if ($date_time_format) {
            $error_msg = EEH_DTT_Helper::validate_format_string($date_time_format);

            if (is_array($error_msg)) {
                $msg = '<p>'
                       . sprintf(
                           esc_html__(
                               'The following date time "%s" ( %s ) is difficult to be properly parsed by PHP for the following reasons:',
                               'event_espresso'
                           ),
                           date($date_time_format),
                           $date_time_format
                       )
                       . '</p><p><ul>';


                foreach ($error_msg as $error) {
                    $msg .= '<li>' . $error . '</li>';
                }

                $msg .= '</ul></p><p>'
                        . sprintf(
                            esc_html__(
                                '%sPlease note that your date and time formats have been reset to "F j, Y" and "g:i a" respectively.%s',
                                'event_espresso'
                            ),
                            '<span style="color:#D54E21;">',
                            '</span>'
                        )
                        . '</p>';

                // trigger WP settings error
                add_settings_error(
                    'date_format',
                    'date_format',
                    $msg
                );

                // set format to something valid
                switch ($option) {
                    case 'date_format':
                        $value = 'F j, Y';
                        break;
                    case 'time_format':
                        $value = 'g:i a';
                        break;
                }
            }
        }
        return $value;
    }


    /**
     * its_eSpresso - converts the less commonly used spelling of "Expresso" to "Espresso"
     *
     * @param $content
     * @return    string
     */
    public function its_eSpresso($content)
    {
        return str_replace('[EXPRESSO_', '[ESPRESSO_', $content);
    }


    /**
     * espresso_admin_footer
     *
     * @return    string
     */
    public function espresso_admin_footer()
    {
        return EEH_Template::powered_by_event_espresso('aln-cntr', '', ['utm_content' => 'admin_footer']);
    }


    /**
     * static method for registering ee admin page.
     * This method is deprecated in favor of the new location in EE_Register_Admin_Page::register.
     *
     * @param       $page_basename
     * @param       $page_path
     * @param array $config
     * @return void
     * @throws EE_Error
     * @see        EE_Register_Admin_Page::register()
     * @since      4.3.0
     * @deprecated 4.3.0    Use EE_Register_Admin_Page::register() instead
     */
    public static function register_ee_admin_page($page_basename, $page_path, $config = [])
    {
        EE_Error::doing_it_wrong(
            __METHOD__,
            sprintf(
                esc_html__(
                    'Usage is deprecated.  Use EE_Register_Admin_Page::register() for registering the %s admin page.',
                    'event_espresso'
                ),
                $page_basename
            ),
            '4.3'
        );
        if (class_exists('EE_Register_Admin_Page')) {
            $config['page_path'] = $page_path;
        }
        EE_Register_Admin_Page::register($page_basename, $config);
    }


    /**
     * @param int     $post_ID
     * @param WP_Post $post
     * @return void
     * @deprecated 4.8.41
     */
    public static function parse_post_content_on_save($post_ID, $post)
    {
        EE_Error::doing_it_wrong(
            __METHOD__,
            esc_html__('Usage is deprecated', 'event_espresso'),
            '4.8.41'
        );
    }


    /**
     * @param  $option
     * @param  $old_value
     * @param  $value
     * @return void
     * @deprecated 4.8.41
     */
    public function reset_page_for_posts_on_change($option, $old_value, $value)
    {
        EE_Error::doing_it_wrong(
            __METHOD__,
            esc_html__('Usage is deprecated', 'event_espresso'),
            '4.8.41'
        );
    }


    /**
     * @return void
     * @deprecated 4.9.27
     */
    public function get_persistent_admin_notices()
    {
        EE_Error::doing_it_wrong(
            __METHOD__,
            sprintf(
                esc_html__('Usage is deprecated. Use "%1$s" instead.', 'event_espresso'),
                '\EventEspresso\core\services\notifications\PersistentAdminNoticeManager'
            ),
            '4.9.27'
        );
    }


    /**
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws DomainException
     * @deprecated 4.9.27
     */
    public function dismiss_ee_nag_notice_callback()
    {
        EE_Error::doing_it_wrong(
            __METHOD__,
            sprintf(
                esc_html__('Usage is deprecated. Use "%1$s" instead.', 'event_espresso'),
                '\EventEspresso\core\services\notifications\PersistentAdminNoticeManager'
            ),
            '4.9.27'
        );
        $this->persistent_admin_notice_manager->dismissNotice();
    }


    /**
     * Callback on load-plugins.php hook for setting up anything hooking into the wp plugins page.
     *
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function hookIntoWpPluginsPage()
    {
        $this->loader->getShared('EventEspresso\core\domain\services\admin\ExitModal');
        $this->loader
             ->getShared('EventEspresso\core\domain\services\admin\PluginUpsells')
             ->decafUpsells();
    }


    /**
     * Hooks into the "post states" filter in a wp post type list table.
     *
     * @param array   $post_states
     * @param WP_Post $post
     * @return array
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function displayStateForCriticalPages($post_states, $post)
    {
        $post_states = (array) $post_states;
        if (! $post instanceof WP_Post || $post->post_type !== 'page') {
            return $post_states;
        }
        /** @var EE_Core_Config $config */
        $config = $this->loader->getShared('EE_Config')->core;
        if (in_array($post->ID, $config->get_critical_pages_array(), true)) {
            $post_states[] = sprintf(
            /* Translators: Using company name - Event Espresso Critical Page */
                esc_html__('%s Critical Page', 'event_espresso'),
                'Event Espresso'
            );
        }
        return $post_states;
    }


    /**
     * Show documentation links on the plugins page
     *
     * @param mixed $meta Plugin Row Meta
     * @param mixed $file Plugin Base file
     * @return array
     */
    public function addLinksToPluginRowMeta($meta, $file)
    {
        if (EE_PLUGIN_BASENAME === $file) {
            $row_meta = [
                'docs' => '<a href="https://eventespresso.com/support/documentation/versioned-docs/?doc_ver=ee4"'
                          . ' aria-label="'
                          . esc_attr__('View Event Espresso documentation', 'event_espresso')
                          . '">'
                          . esc_html__('Docs', 'event_espresso')
                          . '</a>',
                'api'  => '<a href="https://github.com/eventespresso/event-espresso-core/tree/master/docs/C--REST-API"'
                          . ' aria-label="'
                          . esc_attr__('View Event Espresso API docs', 'event_espresso')
                          . '">'
                          . esc_html__('API docs', 'event_espresso')
                          . '</a>',
            ];
            return array_merge($meta, $row_meta);
        }
        return (array) $meta;
    }
}
