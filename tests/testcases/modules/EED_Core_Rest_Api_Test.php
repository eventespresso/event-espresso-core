<?php if (! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * Event Espresso
 * Event Registration and Ticketing Management Plugin for WordPress
 * @ package            Event Espresso
 * @ author                Event Espresso
 * @ copyright        (c) 2008-2014 Event Espresso  All Rights Reserved.
 * @ license            http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link                    http://www.eventespresso.com
 * @ version            $VID:$
 * ------------------------------------------------------------------------
 */
class EED_Core_Rest_Api_Test extends EE_REST_TestCase
{

    /**
     * @group 9222
     * @group current
     */
    public function test_get_ee_route_data()
    {
        //assert that there are no write endpoints for wp-core models
        $ee_routes_for_each_version = EED_Core_Rest_Api::get_ee_route_data();
        foreach($ee_routes_for_each_version as $version => $ee_routes ) {
            foreach (EE_Registry::instance()->non_abstract_db_models as $model_name => $model_classname) {
                if( in_array(
                    $model_name,
                    array(
                        'Extra_Join',
                        'Extra_Meta'
                    )
                )){
                    //skip extra join and meta models, they're only accessible via their relations
                    continue;
                }
                $model = EE_Registry::instance()->load_model($model_name);
                $plural_model_route = EEH_Inflector::pluralize_and_lower($model_name);
                $singular_model_route = $plural_model_route . '/(?P<id>\d+)';
                //currently, we expose models even for wp core routes to reading (we have plans to change this though)
                //on https://events.codebasehq.com/projects/event-espresso/tickets/9583
                $this->assertArrayHasKey(
                    0,
                    $ee_routes[$plural_model_route],
                    $plural_model_route
                );
                //now let's double-check the singular routes too
                $this->assertArrayHasKey(
                    0,
                    $ee_routes[$singular_model_route],
                    $singular_model_route
                );
                //wp core models should NOT have write endpoints
                if ($model->is_wp_core_model()) {
                    //make sure there is no insert endpoint
                    $this->AssertArrayNotHasKey(
                        1,
                        $ee_routes[$plural_model_route]
                    );
                    //make sure there is no update or delete endpoints
                    $this->AssertArrayNotHasKey(
                        1,
                        $ee_routes[$singular_model_route]
                    );
                    $this->AssertArrayNotHasKey(
                        2,
                        $ee_routes[$singular_model_route]
                    );
                } else {
                    //make sure there is an insert endpoint
                    $this->AssertArrayHasKey(
                        1,
                        $ee_routes[$plural_model_route]
                    );
                    //make sure there is update and delete endpoints
                    $this->assertArrayHasKey(
                        1,
                        $ee_routes[$singular_model_route]
                    );
                    $this->assertArrayHasKey(
                        2,
                        $ee_routes[$singular_model_route]
                    );
                }
            }
        }
    }
}
// End of file EE_CheckoutTest.php
// Location: /EE_CheckoutTest.php
