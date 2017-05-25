<?php namespace EventEspresso\core\libraries\rest_api\changes;

use EventEspresso\core\libraries\rest_api\controllers\Base;

/* 
 * The checkin and checkout endpoints were added in 4.8.34, 
 * where we just added a response headers
 */



class Changes_In_4_8_34 extends Changes_In_Base
{

    /**
     * Adds hooks so requests to 4.8.29 don't have the checkin endpoints
     */
    public function set_hooks()
    {
        //set a hook to remove the checkout/checkout endpoints if the request 
        //is for lower than 4.8.33
        add_filter(
            'FHEE__EventEspresso\core\libraries\rest_api\controllers\Base___get_response_headers',
            array($this, 'remove_response_headers'),
            10,
            3
        );
    }



    /**
     * Removes the checkin and checkout endpoints from the index for requests
     * to api versions lowers than 4.8.33
     *
     * @param array                                                  $routes_on_this_version
     * @param EventEspresso\core\libraries\rest_api\controllers\Base $controller
     * @return array like $routes_on_this_version
     */
    public function remove_response_headers($response_headers, $controller, $requested_version)
    {
        if ($controller instanceof Base
            && $this->applies_to_version($requested_version)
        ) {
            return array();
        }
        return $response_headers;
    }
}

