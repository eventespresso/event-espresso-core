<?php
namespace Page;

/**
 * CoreAdmin
 * This is a set of page properties and helper methods for any generic EE Admin page stuff.  Typically,
 * specific EE Admin Page will extend this for their functionality.
 *
 * @package Page
 * @author  Darren Ethier
 * @since   1.0.0
 */
class CoreAdmin
{

    /**
     * @var string
     */
    const URL_PREFIX = 'admin.php?page=';


    /**
     * This is the selector for the next page button on list tables.
     * @var string
     */
    const ADMIN_LIST_TABLE_NEXT_PAGE_CLASS = '.next-page';


    /**
     * The selector for the search input submit button on list table pages
     * @var string
     */
    const LIST_TABLE_SEARCH_SUBMIT_SELECTOR = '#search-submit';


    /**
     * Selector for the screen options dropdown.
     * @var string
     */
    const WP_SCREEN_SETTINGS_LINK_SELECTOR = '#show-settings-link';


    /**
     * Selector for the per page field setting selector (found within screen options dropdown)
     * @var string
     */
    const WP_SCREEN_SETTINGS_PER_PAGE_FIELD_SELECTOR = '.screen-per-page';


    /**
     * Selector for apply screen options settings.
     * @var string
     */
    const WP_SCREEN_OPTIONS_APPLY_SETTINGS_BUTTON_SELECTOR = '#screen-options-apply';


    /**
     * Get the EE admin url for the given properties.
     * Note, this is JUST the endpoint for the admin route.  It is expected that the actor/test would be calling this
     * with `amOnAdminPage` action.
     *
     * @param string $page
     * @param string $action
     * @param string $additional_params
     * @return string
     */
    public static function adminUrl($page = 'espresso_events', $action = 'default', $additional_params = '')
    {
        $url = self::URL_PREFIX . $page;
        $url .= $action ? '&action=' . $action : '';
        $url .= $additional_params ? '&' . ltrim('&', ltrim('?', $additional_params)) : '';
        return $url;
    }


    /**
     * Returns the selector for the text tab switcher for a wp-editor instance.
     * @param $field_reference
     * @return string
     */
    public static function wpEditorTextTabSelector($field_reference)
    {
        return '#content-' . $field_reference . '-content-html';
    }


    /**
     * Returns the selector for the textarea exposed when clicing the text tab switcher for a wp-editor instance.
     * @param $field_reference
     * @return string
     */
    public static function wpEditorTextAreaSelector($field_reference)
    {
        return '#content-' . $field_reference . '-content';
    }
}
