<?php
/**
 * EE_Admin_Page_CPT_Init
 * This is utilized by all child EE_Admin_Init classes who use core WordPress Custom Post Type views for adding/editing
 * new items.
 *
 * @package            Event Espresso
 * @abstract
 * @subpackage         includes/core/admin/EE_Admin_Page_CPT_Init.core.php
 * @author             Darren Ethier
 * ------------------------------------------------------------------------
 */
abstract class EE_Admin_Page_CPT_Init extends EE_Admin_Page_Init
{


    public function do_initial_loads()
    {
        // we want to use the corresponding admin page object (but not route it!).  To do this we just set _routing to false.  That way this page object is being loaded on all pages to make sure we hook into admin properly.  But note... we are ONLY doing this if the given page is NOT pages we WANT to load ;)
        // This is important because we have hooks that help redirect custom post type saves
        if (! isset($_REQUEST['page'])
            || (isset($_REQUEST['page'])
                && $_REQUEST['page']
                   != $this->_menu_map->menu_slug)) {
            $this->_routing = false;
            $this->_initialize_admin_page();
        } else {
            // normal init loads
            $this->_initialize_admin_page();
            // added for 4.1 to completely disable autosave for our pages. This can be removed once we fully enable autosave functionality
            remove_filter('wp_print_scripts', 'wp_just_in_time_script_localization');
            add_filter('wp_print_scripts', array($this, 'wp_just_in_time_script_localization'), 100);
            // end removal of autosave functionality.
        }
    }


    public function wp_just_in_time_script_localization()
    {
        wp_localize_script(
            'autosave',
            'autosaveL10n',
            array(
                'autosaveInterval' => 172800,
                'savingText'       => __('Saving Draft&#8230;', 'event_espresso'),
                'saveAlert'        => __('The changes you made will be lost if you navigate away from this page.', 'event_espresso'),
            )
        );
    }


    public function adjust_post_lock_window($interval)
    {
        return 172800;
    }
}
