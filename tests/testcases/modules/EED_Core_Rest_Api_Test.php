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
                        'Extra_Meta',
                        'Post_Meta'
                    )
                )){
                    //skip extra join and meta models, they're only accessible via their relations
                    continue;
                }
                $model = EE_Registry::instance()->load_model($model_name);
                $plural_model_route = EED_Core_Rest_Api::get_plural_route_to($model_name);
                $singular_model_route = EED_Core_Rest_Api::get_singular_route_to($model_name, '/(?P<id>\d+)');
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

    public function dataProviderForTestGetAllPluralRoutes(){
        $non_abstract_db_models = array_keys(EE_Registry::instance()->non_abstract_db_models);
        $models_with_plural_routes = array_diff($non_abstract_db_models, array('Extra_Meta','Extra_Join','Post_Meta'));
        $unit_test_data = array();
        foreach($models_with_plural_routes as $model_name){
            $model = EE_Registry::instance()->load_model($model_name);
            //lets only verify requests for models with primary keus.
            if($model->has_primary_key_field()) {
                $unit_test_data[] = array($model);
            }
        }
        return $unit_test_data;
    }


    /**
     * Verifies that, for each model from the data provider, we can query its GET routes
     * @dataProvider dataProviderForTestGetAllPluralRoutes
     * @group big_rest_tests
     */
    public function testGetAllPluralRoutes(EEM_Base $model){
        $this->authenticate_as_admin();
        //make sure there's an entry for this model. We will use it in an assertion later
        $model_obj = $model->get_one();
        if(! $model_obj instanceof EE_Base_Class){
            $model_obj = $this->new_model_obj_with_dependencies($model->get_this_model_name());
            //ticket templates are a special exception
            if($model instanceof EEM_Ticket_Template){
                $ticket = $this->new_model_obj_with_dependencies('Ticket');
                $model_obj->_add_relation_to($ticket,'Ticket');
            }
        }
        $route = EED_Core_Rest_Api::get_versioned_route_to(
            EED_Core_Rest_Api::get_plural_route_to($model->get_this_model_name()),
            '4.8.36'
        );
        $response = rest_do_request(
            new WP_REST_Request(
                'GET',
                $route
            )
        );
        $response_data = $response->get_data();
        $this->assertNotFalse($response_data);
        $this->assertArrayNotHasKey(
            'code',
            $response_data,
            sprintf('Got error response "%1$s" while querying route "%2$s"',
                wp_json_encode($response_data),
                $route
            )
        );
        //verify we find the item we identified using the models
        $contains_item = false;
        foreach($response_data as $datum){
            if( $datum[$model->primary_key_name()] == $model_obj->ID()){
                $contains_item = true;
                break;
            }
        }
        $this->assertTrue($contains_item);
    }
}
// End of file EE_CheckoutTest.php
// Location: /EE_CheckoutTest.php
