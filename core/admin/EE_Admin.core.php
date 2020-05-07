<?php

use EventEspresso\core\domain\entities\notifications\PersistentAdminNotice;
use EventEspresso\core\domain\services\admin\ExitModal;
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
     * @var RequestInterface $request
     */
    protected $request;


    /**
     * @singleton method used to instantiate class object
     * @return EE_Admin
     */
    public static function instance()
    {
        // check if class object is instantiated
        if (! EE_Admin::$_instance instanceof EE_Admin) {
            EE_Admin::$_instance = new EE_Admin();
        }
        return EE_Admin::$_instance;
    }


    /**
     * @return EE_Admin
     */
    public static function reset()
    {
        EE_Admin::$_instance = null;
        return EE_Admin::instance();
    }


    /**
     * class constructor
     *
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     */
    protected function __construct()
    {
        /** @var EventEspresso\core\services\request\Request $request */
        $this->request = $this->getLoader()->getShared('EventEspresso\core\services\request\Request');
        // define global EE_Admin constants
        $this->_define_all_constants();
        // set autoloaders for our admin page classes based on included path information
        EEH_Autoloader::register_autoloaders_for_each_file_in_folder(EE_ADMIN);
        // reset Environment config (we only do this on admin page loads);
        EE_Registry::instance()->CFG->environment->recheck_values();
        // load EE_Request_Handler early
        add_action('AHEE__EE_System__initialize_last', array($this, 'init'));
        add_action('admin_init', array($this, 'admin_init'), 100);
        add_action('admin_notices', array($this, 'display_admin_notices'), 10);
        add_action('network_admin_notices', array($this, 'display_admin_notices'), 10);
        add_filter('pre_update_option', array($this, 'check_for_invalid_datetime_formats'), 100, 2);
        if (! $this->request->isAjax()) {
            // admin hooks
            add_filter('plugin_action_links', [$this, 'filter_plugin_actions'], 10, 2);
            add_filter('admin_footer_text', [$this, 'espresso_admin_footer']);
            add_action('load-plugins.php', [$this, 'hookIntoWpPluginsPage']);
            add_action('display_post_states', [$this, 'displayStateForCriticalPages'], 10, 2);
            add_filter('plugin_row_meta', [$this, 'addLinksToPluginRowMeta'], 10, 2);
        }
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
     * @param    array  $links
     * @param    string $plugin
     * @return    array
     */
    public function filter_plugin_actions($links, $plugin)
    {
        // set $main_file in stone
        static $main_file;
        // if $main_file is not set yet
        if (! $main_file) {
            $main_file = plugin_basename(EVENT_ESPRESSO_MAIN_FILE);
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
                $events_link = '<a href="admin.php?page=espresso_events">'
                               . esc_html__('Events', 'event_espresso')
                               . '</a>';
                // add before other links
                array_unshift($links, $org_settings_link, $events_link);
            }
        }
        return $links;
    }


    /**
     * hide_admin_pages_except_maintenance_mode
     *
     * @param array $admin_page_folder_names
     * @return array
     */
    public function hide_admin_pages_except_maintenance_mode($admin_page_folder_names = array())
    {
        return array(
            'maintenance' => EE_ADMIN_PAGES . 'maintenance/',
            'about'       => EE_ADMIN_PAGES . 'about/',
            'support'     => EE_ADMIN_PAGES . 'support/',
        );
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
        // run the admin page factory but ONLY if we are doing an ee admin ajax request
        if (! defined('DOING_AJAX') || EE_ADMIN_AJAX) {
            try {
                // this loads the controller for the admin pages which will setup routing etc
                $this->loader->getShared('EE_Admin_Page_Loader');
            } catch (EE_Error $e) {
                $e->get_error();
            }
        }
        add_filter('content_save_pre', array($this, 'its_eSpresso'), 10, 1);
        if (! $this->request->isAjax()) {
            // make sure our CPTs and custom taxonomy metaboxes get shown for first time users
            add_action('admin_head', [$this, 'enable_hidden_ee_nav_menu_metaboxes'], 10);
            add_action('admin_head', [$this, 'register_custom_nav_menu_boxes'], 10);
            // exclude EE critical pages from all nav menus and wp_list_pages
            add_filter('nav_menu_meta_box_object', [$this, 'remove_pages_from_nav_menu'], 10);
        }
    }


    /**
     * Gets the loader (and if it wasn't previously set, sets it)
     * @return LoaderInterface
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    protected function getLoader()
    {
        if (! $this->loader instanceof LoaderInterface) {
            $this->loader = LoaderFactory::getLoader();
        }
        return $this->loader;
    }


    /**
     * Method that's fired on admin requests (including admin ajax) but only when the models are usable
     * (ie, the site isn't in maintenance mode)
     *
     * @return void
     * @throws EE_Error
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
                array(
                    'page'   => $this->request->getRequestParam('page', ''),
                    'action' => $this->request->getRequestParam('action', ''),
                ),
                EE_ADMIN_URL
            )
        );
        $this->maybeSetDatetimeWarningNotice();
        // at a glance dashboard widget
        add_filter('dashboard_glance_items', array($this, 'dashboard_glance_items'), 10);
        // filter for get_edit_post_link used on comments for custom post types
        add_filter('get_edit_post_link', array($this, 'modify_edit_post_link'), 10, 2);
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
        // add dismissable notice for datetime changes.  Only valid if site does not have a timezone_string set.
        // @todo This needs to stay in core for a bit to catch anyone upgrading from a version without this to a version
        // with this.  But after enough time (indeterminate at this point) we can just remove this notice.
        // this was added with https://events.codebasehq.com/projects/event-espresso/tickets/10626
        if (apply_filters('FHEE__EE_Admin__maybeSetDatetimeWarningNotice', true)
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
                        array(
                            'page'   => 'espresso_maintenance_settings',
                            'action' => 'datetime_tools',
                        ),
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
        $critical_pages = EE_Registry::instance()->CFG->core->get_critical_pages_array();
        $post_type->_default_query = array(
            'post__not_in' => $critical_pages,
        );
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

        $hidden_meta_boxes = get_user_option('metaboxhidden_nav-menus', $user->ID);
        $initial_meta_boxes = apply_filters(
            'FHEE__EE_Admin__enable_hidden_ee_nav_menu_boxes__initial_meta_boxes',
            array(
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
            )
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
     * @todo   modify this so its more dynamic and automatic for all ee CPTs and setups and can also be hooked into by
     *         addons etc.
     * @return void
     */
    public function register_custom_nav_menu_boxes()
    {
        add_meta_box(
            'add-extra-nav-menu-pages',
            esc_html__('Event Espresso Pages', 'event_espresso'),
            array($this, 'ee_cpt_archive_pages'),
            'nav-menus',
            'side',
            'core'
        );
    }


    /**
     * Use this to edit the post link for our cpts so that the edit link points to the correct page.
     *
     * @since   4.3.0
     * @param string $link the original link generated by wp
     * @param int    $id   post id
     * @return string  the (maybe) modified link
     */
    public function modify_edit_post_link($link, $id)
    {
        if (! $post = get_post($id)) {
            return $link;
        }
        if ($post->post_type === 'espresso_attendees') {
            $query_args = array(
                'action' => 'edit_attendee',
                'post'   => $id,
            );
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
        $db_fields = false;
        $walker = new Walker_Nav_Menu_Checklist($db_fields);
        $current_tab = 'event-archives';
        $removed_args = array(
            'action',
            'customlink-tab',
            'edit-menu-item',
            'menu-item',
            'page-tab',
            '_wpnonce',
        );
        ?>
        <div id="posttype-extra-nav-menu-pages" class="posttypediv">
            <ul id="posttype-extra-nav-menu-pages-tabs" class="posttype-tabs add-menu-item-tabs">
                <li <?php echo('event-archives' === $current_tab ? ' class="tabs"' : ''); ?>>
                    <a class="nav-tab-link" data-type="tabs-panel-posttype-extra-nav-menu-pages-event-archives"
                       href="<?php
                        if ($nav_menu_selected_id) {
                            echo esc_url(
                                add_query_arg(
                                    'extra-nav-menu-pages-tab',
                                    'event-archives',
                                    remove_query_arg($removed_args)
                                )
                            );
                        }
                        ?>#tabs-panel-posttype-extra-nav-menu-pages-event-archives">
                        <?php esc_html_e('Event Archive Pages', 'event_espresso'); ?>
                    </a>
                </li>
            </ul><!-- .posttype-tabs -->

            <div id="tabs-panel-posttype-extra-nav-menu-pages-event-archives" class="tabs-panel <?php
            echo('event-archives' === $current_tab ? 'tabs-panel-active' : 'tabs-panel-inactive');
            ?>">
                <ul id="extra-nav-menu-pageschecklist-event-archives" class="categorychecklist form-no-clear">
                    <?php
                    $pages = $this->_get_extra_nav_menu_pages_items();
                    $args['walker'] = $walker;
                    echo walk_nav_menu_tree(
                        array_map(
                            array($this, '_setup_extra_nav_menu_pages_items'),
                            $pages
                        ),
                        0,
                        (object) $args
                    );
                    ?>
                </ul>
            </div><!-- /.tabs-panel -->

            <p class="button-controls">
                <span class="list-controls">
                    <a href="<?php
                             echo esc_url(
                                 add_query_arg(
                                     array(
                                         'extra-nav-menu-pages-tab' => 'event-archives',
                                         'selectall'                => 1,
                                     ),
                                     remove_query_arg($removed_args)
                                 )
                             );
                        ?>#posttype-extra-nav-menu-pages" class="select-all"><?php esc_html_e('Select All', 'event_espresso'); ?></a>
                </span>
                <span class="add-to-menu">
                    <input type="submit"<?php wp_nav_menu_disabled_check($nav_menu_selected_id); ?>
                           class="button-secondary submit-add-to-menu right"
                           value="<?php esc_attr_e('Add to Menu', 'event_espresso'); ?>" name="add-post-type-menu-item"
                           id="<?php echo esc_attr('submit-posttype-extra-nav-menu-pages'); ?>"/>
                    <span class="spinner"></span>
                </span>
            </p>

        </div><!-- /.posttypediv -->
        <?php
    }


    /**
     * Returns an array of event archive nav items.
     *
     * @todo  for now this method is just in place so when it gets abstracted further we can substitute in whatever
     *        method we use for getting the extra nav menu items
     * @return array
     */
    private function _get_extra_nav_menu_pages_items()
    {
        $menuitems[] = array(
            'title'       => esc_html__('Event List', 'event_espresso'),
            'url'         => get_post_type_archive_link('espresso_events'),
            'description' => esc_html__('Archive page for all events.', 'event_espresso'),
        );
        return apply_filters('FHEE__EE_Admin__get_extra_nav_menu_pages_items', $menuitems);
    }


    /**
     * Setup nav menu walker item for usage in the event archive nav menu metabox.  It receives a menu_item array with
     * the properties and converts it to the menu item object.
     *
     * @see wp_setup_nav_menu_item() in wp-includes/nav-menu.php
     * @param $menu_item_values
     * @return stdClass
     */
    private function _setup_extra_nav_menu_pages_items($menu_item_values)
    {
        $menu_item = new stdClass();
        $keys = array(
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
            'classes'          => array(),
            'xfn'              => '',
        );

        foreach ($keys as $key => $value) {
            $menu_item->{$key} = isset($menu_item_values[ $key ]) ? $menu_item_values[ $key ] : $value;
        }
        return $menu_item;
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
        if (isset($_POST['action'], $_POST['post_type']) && $_POST['action'] === 'editpost') {
            /** @var EventEspresso\core\domain\entities\custom_post_types\CustomPostTypeDefinitions $custom_post_types */
            $custom_post_types = $this->loader->getShared(
                'EventEspresso\core\domain\entities\custom_post_types\CustomPostTypeDefinitions'
            );
            $custom_post_types->getCustomPostTypeModels($_POST['post_type']);
        }

        if (! $this->request->isAjax()) {
            /**
             * This code excludes EE critical pages anywhere `wp_dropdown_pages` is used to create a dropdown for selecting
             * critical pages.  The only place critical pages need included in a generated dropdown is on the "Critical
             * Pages" tab in the EE General Settings Admin page.
             * This is for user-proofing.
             */
            add_filter('wp_dropdown_pages', array($this, 'modify_dropdown_pages'));
            if (EE_Maintenance_Mode::instance()->models_can_query()) {
                $this->adminInitModelsReady();
            }
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
     * display_admin_notices
     *
     * @return void
     */
    public function display_admin_notices()
    {
        echo EE_Error::get_notices();
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
        $elements = is_array($elements) ? $elements : array($elements);
        $events = EEM_Event::instance()->count();
        $items['events']['url'] = EE_Admin_Page::add_query_args_and_nonce(
            array('page' => 'espresso_events'),
            admin_url('admin.php')
        );
        $items['events']['text'] = sprintf(
            esc_html(
                _n('%s Event', '%s Events', $events, 'event_espresso')
            ),
            number_format_i18n($events)
        );
        $items['events']['title'] = esc_html__('Click to view all Events', 'event_espresso');
        $registrations = EEM_Registration::instance()->count(
            array(
                array(
                    'STS_ID' => array('!=', EEM_Registration::status_id_incomplete),
                ),
            )
        );
        $items['registrations']['url'] = EE_Admin_Page::add_query_args_and_nonce(
            array('page' => 'espresso_registrations'),
            admin_url('admin.php')
        );
        $items['registrations']['text'] = sprintf(
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
        return \EEH_Template::powered_by_event_espresso('aln-cntr', '', array('utm_content' => 'admin_footer'));
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
            $row_meta = array(
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
            );
            return array_merge($meta, $row_meta);
        }
        return (array) $meta;
    }

     /**************************************************************************************/
     /************************************* DEPRECATED *************************************/
     /**************************************************************************************/


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
     * @param int      $post_ID
     * @param \WP_Post $post
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
     * @return void
     * @deprecated $VID:$
     */
    public function enqueue_admin_scripts()
    {
    }



    /**
     * @deprecated $VID:$
     */
    public function get_request()
    {
        EE_Error::doing_it_wrong(
            __METHOD__,
            sprintf(
                esc_html__('Usage is deprecated. Use "%1$s" instead.', 'event_espresso'),
                'EventEspresso\core\services\request\Request'
            ),
            '$VID:$'
        );
        EE_Registry::instance()->load_core('Request_Handler');
    }

    /**
     * @deprecated $VID:$
     */
    public function hookIntoWpPluginsPage()
    {
    }
}
