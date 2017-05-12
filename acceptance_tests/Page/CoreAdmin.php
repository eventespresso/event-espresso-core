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

    const URL_PREFIX = 'admin.php?page=';


    /**
     * Absolute url to admin for the testing site. eg. `http://www.example.com/wp-admin
     * This should be set by anything using this Page object by calling setAdminPath($admin_path) first.
     * @var string
     */
    private static $root_admin_url ='';

    /**
     * Set the root admin url for all admin pages.
     * @param $admin_url
     */
    public static function setRootAdminUrl($admin_url)
    {
        self::$root_admin_url = self::trailingSlashIt($admin_url);
    }


    /**
     * Get the EE admin url for the given properties.
     * @param string $page
     * @param string $action
     * @param string $additional_params
     * @return string
     */
    public static function adminUrl($page = 'espresso_events', $action = 'default', $additional_params = '')
    {
        $url = self::rootAdminUrl() . self::URL_PREFIX . $page;
        $url .= $action ? '&action=' . $action : '';
        $url .= $additional_params ? '&' . ltrim('&', ltrim('?', $additional_params)) : '';
        return $url;
    }


    /**
     * Get what is set for the root_admin_url property.
     * @return string
     */
    protected static function rootAdminUrl()
    {
        return self::$root_admin_url;
    }


    /**
     * Appends a trailing slash.
     *
     * Will remove trailing forward and backslashes if it exists already before adding
     * a trailing forward slash. This prevents double slashing a string or path.
     *
     * The primary use of this is for paths and thus should be used for paths. It is
     * not restricted to paths and offers no specific path support.
     *
     * @param string $string What to add the trailing slash to.
     * @return string String with trailing slash added.
     */
    public static function trailingSlashIt($string)
    {
        return self::unTrailingSlashIt($string) . '/';
    }

    /**
     * Removes trailing forward slashes and backslashes if they exist.
     *
     * The primary use of this is for paths and thus should be used for paths. It is
     * not restricted to paths and offers no specific path support.
     *
     * @param string $string What to remove the trailing slashes from.
     * @return string String without the trailing slashes.
     */
    public static function unTrailingSlashit($string)
    {
        return rtrim($string, '/\\');
    }

}