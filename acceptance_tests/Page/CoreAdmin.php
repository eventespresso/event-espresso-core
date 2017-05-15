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
}