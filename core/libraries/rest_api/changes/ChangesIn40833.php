<?php

namespace EventEspresso\core\libraries\rest_api\changes;

/**
 * The checkin and checkout endpoints were added in 4.8.33,
 * so remove them from any requests for 4.8.29 etc.
 */
class ChangesIn40833 extends ChangesInBase
{
    /**
     * Adds hooks so requests to 4.8.29 don't have the checkin endpoints
     */
    public function setHooks()
    {
        // set a hook to remove the checkout/checkout endpoints if the request
        // is for lower than 4.8.33
        add_filter(
            'FHEE__EED_Core_Rest_Api___register_rpc_routes__this_versions_routes',
            array($this, 'removeCheckinRoutesEarlierThan4833'),
            10,
            2
        );
        add_filter(
            'FHEE__EventEspresso\core\libraries\rest_api\controllers\Base___get_headers_from_ee_notices__return',
            array($this, 'dontAddHeadersFromEeNotices'),
            10,
            2
        );
    }


    /**
     * Removes the checkin and checkout endpoints from the index for requests
     * to api versions lowers than 4.8.33
     *
     * @param array  $routes_on_this_version
     * @param string $version
     * @return array like $routes_on_this_version
     */
    public function removeCheckinRoutesEarlierThan4833($routes_on_this_version, $version)
    {
        if ($this->appliesToVersion($version)) {
            unset($routes_on_this_version['registrations/(?P<REG_ID>\d+)/toggle_checkin_for_datetime/(?P<DTT_ID>\d+)']);
        }
        return $routes_on_this_version;
    }


    /**
     * We just added headers for notices in this version
     *
     * @param array  $headers_from_ee_notices
     * @param string $requested_version
     * @return array
     */
    public function dontAddHeadersFromEeNotices($headers_from_ee_notices, $requested_version)
    {
        if ($this->appliesToVersion($requested_version)) {
            return array();
        }
        return $headers_from_ee_notices;
    }
}
