<?php use EventEspresso\core\libraries\rest_api\ModelDataTranslator;

if (! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * Event Espresso
 * Event Registration and Ticketing Management Plugin for WordPress
 * @ package            Event Espresso
 * @ author                Event Espresso
 * @ copyright        (c) 2008-2014 Event Espresso  All Rights Reserved.
 * @ license            https://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link                    http://www.eventespresso.com
 * 
 * ------------------------------------------------------------------------
 */
class EEDCoreRestApiTest extends EE_REST_TestCase
{

    /**
     * @group 9222
     */
    public function testGetEeRouteData()
    {
        //assert that there are no write endpoints for wp-core models
        $ee_routes_for_each_version = EED_Core_Rest_Api::get_ee_route_data();
        foreach ($ee_routes_for_each_version as $version => $ee_routes) {
            foreach (EED_Core_Rest_Api::model_names_with_plural_routes('4.8.36') as $model_name => $model_classname) {
                $model = EE_Registry::instance()->load_model($model_name);
                $plural_model_route = EED_Core_Rest_Api::get_collection_route($model);
                $singular_model_route = EED_Core_Rest_Api::get_entity_route($model, '(?P<id>[^\/]+)');
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



    /**
     * @return array{
     * @type EEM_Base $model
     * }
     */
    public function dataProviderForTestGetAllCollectionRoutes()
    {
        $unit_test_data = array();
        foreach (array_keys(EED_Core_Rest_Api::model_names_with_plural_routes('4.8.36')) as $model_name) {
            $model = EE_Registry::instance()->load_model($model_name);
            //lets only verify requests for models with primary keys
            if ($model->has_primary_key_field()) {
                $unit_test_data[$model_name] = array($model);
            }
        }
        return $unit_test_data;
    }



    /**
     * Verifies that, for each model from the data provider, we can query its GET routes
     *
     * @dataProvider dataProviderForTestGetAllCollectionRoutes
     * @param EEM_Base $model
     * @group        big_rest_tests
     */
    public function testGetAllCollectionRoutes(EEM_Base $model)
    {
        $this->authenticate_as_admin();
        //make sure there's an entry for this model. We will use it in an assertion later
        $model_obj = $this->getAModelObjOfType($model);
        $route = EED_Core_Rest_Api::get_versioned_route_to(
            EED_Core_Rest_Api::get_collection_route($model),
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
            sprintf(
                'Got error response "%1$s" while querying route "%2$s"',
                wp_json_encode($response_data),
                $route
            )
        );
        //verify we find the item we identified using the models
        $contains_item = false;
        foreach ($response_data as $datum) {
            if ($datum[$model->primary_key_name()] == $model_obj->ID()) {
                $contains_item = true;
                break;
            }
        }
        $this->assertTrue($contains_item);
    }



    /**
     * Verifies that all our models' singular GET routes work
     *
     * @dataProvider dataProviderForTestGetAllCollectionRoutes
     * @param EEM_Base $model
     * @group        big_rest_tests
     */
    public function testGetAllEntityRoutes(EEM_Base $model)
    {
        $this->authenticate_as_admin();
        //make sure there's an entry for this model. We will use it in an assertion later
        $model_obj = $this->getAModelObjOfType($model);
        $route = EED_Core_Rest_Api::get_versioned_route_to(
            EED_Core_Rest_Api::get_entity_route($model, $model_obj->ID()),
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
            sprintf(
                'Got error response "%1$s" while querying route "%2$s"',
                wp_json_encode($response_data),
                $route
            )
        );
        //verify we find the item we identified using the models
        $this->assertEquals($model_obj->ID(), $response_data[$model->primary_key_name()]);
    }



    /**
     * @return array{
     * @type EEM_Base $model
     * @type EE_Model_Relation_Base $relation_obj
     * }
     */
    public function dataProviderForTestGetAllRelatedRoutes()
    {
        $unit_test_data = array();
        $models_with_plural_routes = array_keys(EED_Core_Rest_Api::model_names_with_plural_routes('4.8.36'));
        foreach ($models_with_plural_routes as $model_name) {
            $model = EE_Registry::instance()->load_model($model_name);
            foreach ($model->relation_settings() as $relation_name => $relation_obj) {
                //lets only verify requests for models with primary keys
                if ($model->has_primary_key_field()) {
                    $unit_test_data[$model_name] = array($model, $relation_obj);
                }
            }
        }
        return $unit_test_data;
    }



    /**
     * Verifies that all the existing related routes are queryable
     *
     * @dataProvider dataProviderForTestGetAllRelatedRoutes
     * @param EEM_Base $model
     * @param EE_Model_Relation_Base $relation_obj
     * @group        big_rest_tests
     */
    public function testGetAllRelatedRoutes(EEM_Base $model, EE_Model_Relation_Base $relation_obj)
    {
        $related_model = $relation_obj->get_other_model();
        $this->authenticate_as_admin();
        $model_obj = $this->getAModelObjOfType($model);
        $related_model_obj = $this->getAModelObjOfType($related_model);
        $model_obj->_add_relation_to($related_model_obj, $related_model->get_this_model_name());

        $route = EED_Core_Rest_Api::get_versioned_route_to(
            EED_Core_Rest_Api::get_relation_route_via(
                $model,
                $model_obj->ID(),
                $relation_obj
            ),
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
        $this->assertNotEmpty($response_data);
        $this->assertNotNull($response_data);
        $this->assertArrayNotHasKey(
            'code',
            $response_data,
            sprintf(
                'Got error response "%1$s" while querying route "%2$s"',
                wp_json_encode($response_data),
                $route
            )
        );
        if ($relation_obj instanceof EE_Belongs_To_Relation){
            //only expect one result
            $this->assertEquals($related_model_obj->ID(), $response_data[$related_model->primary_key_name()]);
        } else {
            //verify we find the item we identified using the models
            $contains_item = false;
            foreach ($response_data as $datum) {
                if ($datum[$related_model->primary_key_name()] == $related_model_obj->ID()) {
                    $contains_item = true;
                    break;
                }
            }
            $this->assertTrue($contains_item);
        }
    }



    /**
     * Returns an array of model names which an object of type $model
     * needs in order for queries for that model to return anything.
     * (Because there are default model conditions that always join to that model
     * when capabilities are being applied).
     *
     * @param string $model_name
     * @return array
     */
    protected function requiredRelationsInOrderToQuery($model_name)
    {
        $requirements = array(
            'Ticket_Template' => array('Ticket'),
        );
        if (isset($requirements[$model_name])) {
            return $requirements[$model_name];
        } else {
            return array();
        }
    }



    /**
     * Fetches a model object of the specified type, or if none exists creates one.
     * Also, verifies that model object has any related model objects which are
     * needed in order to find that method object when applying caps
     * (because capability conditions might join to that table)
     *
     * @param EEM_Base $model
     * @param boolean  $reuse_existing_objs whether to use existing model objects of this type,
     *                 or always create a new one
     * @return EE_Base_Class
     */
    protected function getAModelObjOfType(EEM_Base $model, $reuse_existing_objs = true)
    {
        $model_obj = null;
        if ($reuse_existing_objs) {
            $model_obj = $model->get_one(
                array(
                    'caps' => EEM_Base::caps_read,
                )
            );
        }
        if (! $model_obj instanceof EE_Base_Class) {
            $model_obj = $this->new_model_obj_with_dependencies($model->get_this_model_name());
        }
        //add any data they might require in order to be queried
        $required_relations = $this->requiredRelationsInOrderToQuery($model->get_this_model_name());
        foreach ($required_relations as $required_dependent_model_name) {
            $related_model_obj = $this->new_model_obj_with_dependencies($required_dependent_model_name);
            $model_obj->_add_relation_to($related_model_obj, $required_dependent_model_name);
        }
        return $model_obj;
    }



    /**
     * @return array{
     * @type EEM_Base $model
     * }
     */
    public function dataProviderForTestInsertsRoutes()
    {
        $unit_test_data = array();
        foreach (array_keys(EED_Core_Rest_Api::model_names_with_plural_routes('4.8.36')) as $model_name) {
            $model = EE_Registry::instance()->load_model($model_name);
            if (EED_Core_Rest_Api::should_have_write_endpoints($model)) {
                //lets only verify requests for models with primary keys
                if ($model->has_primary_key_field()) {
                    $unit_test_data[$model_name] = array($model);
                }
            }
        }
        return $unit_test_data;
    }



    /**
     * Verifies that, for each model from the data provider, we can use its INSERT routes
     *
     * @dataProvider dataProviderForTestInsertsRoutes
     * @param EEM_Base $model
     * @group big_rest_tests
     */
    public function testInsertsRoutes(EEM_Base $model)
    {
        $this->authenticate_as_admin();
        $unsaved_model_obj = $this->new_model_obj_with_dependencies(
            $model->get_this_model_name(),
            array(),
            false
        );

        $route = EED_Core_Rest_Api::get_versioned_route_to(
            EED_Core_Rest_Api::get_collection_route($model),
            '4.8.36'
        );
        $insert_values = array();
        foreach ($unsaved_model_obj->get_model()->field_settings() as $field_name => $field_obj) {
            $value_to_use = $field_obj instanceof EE_Datetime_Field
                ? $unsaved_model_obj->get_DateTime_object($field_name)
                : $unsaved_model_obj->get_raw($field_name);
            $insert_values[$field_name] = ModelDataTranslator::prepareFieldValuesForJson(
                $field_obj,
                $value_to_use,
                '4.8.36'
            );
        }
        $request = new WP_REST_Request(
            'POST',
            $route
        );
        $request->set_body_params($insert_values);
        $response = rest_do_request(
            $request
        );
        $response_data = $response->get_data();
        $this->assertNotFalse($response_data);
        $this->assertArrayNotHasKey(
            'code',
            $response_data,
            sprintf(
                'Got error response "%1$s" while POSTing to route "%2$s"',
                wp_json_encode($response_data),
                $route
            )
        );
    }



    /**
     * Verifies that, for each model from the data provider, we can use its DELETE routes
     *
     * @dataProvider dataProviderForTestInsertsRoutes
     * @param EEM_Base $model
     * @group big_rest_tests
     */
    public function testDeleteRoutes(EEM_Base $model)
    {
        $this->authenticate_as_admin();
        $model_obj = $this->getAModelObjOfType($model, false);
        $route = EED_Core_Rest_Api::get_versioned_route_to(
            EED_Core_Rest_Api::get_entity_route($model, $model_obj->ID()),
            '4.8.36'
        );

        $request = new WP_REST_Request(
            'DELETE',
            $route
        );
        $request->set_body_params(
            array(
                'force' => true,
                'allow_blocking' => false
            )
        );

        $response = rest_do_request(
            $request
        );
        $response_data = $response->get_data();
        $this->assertNotFalse($response_data);
        $this->assertArrayNotHasKey(
            'code',
            $response_data,
            sprintf(
                'Got error response "%1$s" while DELETEing on route "%2$s"',
                wp_json_encode($response_data),
                $route
            )
        );
        $this->assertEquals(true, $response_data['deleted']);
        $this->assertEquals($model_obj->ID(), $response_data['previous'][$model->primary_key_name()]);
    }


    /**
     * Verifies that, for each model from the data provider, we can use its DELETE routes
     *
     * @dataProvider dataProviderForTestInsertsRoutes
     * @param EEM_Base $model
     * @group big_rest_tests
     */
    public function testUpdateRoutes(EEM_Base $model)
    {
        $this->authenticate_as_admin();
        $model_obj = $this->getAModelObjOfType($model, false);
        $route = EED_Core_Rest_Api::get_versioned_route_to(
            EED_Core_Rest_Api::get_entity_route($model, $model_obj->ID()),
            '4.8.36'
        );

        $request = new WP_REST_Request(
            'PUT',
            $route
        );
        $field_to_update = null;
        foreach ($model->field_settings() as $field_obj) {
            if (! $field_obj instanceof EE_Primary_Key_Field_Base) {
                $field_to_update = $field_obj;
                break;
            }
        }
        if ($field_to_update instanceof EE_Boolean_Field) {
            $set_value = ! $model_obj->get($field_to_update->get_name());
        } elseif ($field_to_update instanceof EE_Integer_Field
            || $field_to_update instanceof EE_Float_Field
            || $field_to_update instanceof EE_Foreign_Key_Int_Field) {
            $set_value = $model_obj->get($field_to_update->get_name()) + 1;
        } elseif ($field_to_update instanceof EE_Datetime_Field) {
            $set_value = $model_obj->get_DateTime_object($field_to_update->get_name())->modify('+1 day');
        } elseif ($field_to_update instanceof EE_All_Caps_Text_Field
            || $field_to_update instanceof EE_Foreign_Key_String_Field) {
            $set_value = 'NEW';
        } else {
            $set_value = 'new';
        }
        //double check the new value won't be the same as the old one
        $this->assertNotEquals(
            $set_value,
            $model_obj->get($field_to_update->get_name()),
            $field_to_update->get_name()
        );
        $request->set_body_params(
            array(
                $field_to_update->get_name() => ModelDataTranslator::prepareFieldValuesForJson(
                    $field_to_update,
                    $set_value,
                    '4.8.36'
                )
            )
        );
        $response = rest_do_request(
            $request
        );
        $response_data = $response->get_data();
        $this->assertNotFalse($response_data);
        $this->assertArrayNotHasKey(
            'code',
            $response_data,
            sprintf(
                'Got error response "%1$s" while PUTing on route "%2$s"',
                wp_json_encode($response_data),
                $route
            )
        );
        if ($field_to_update instanceof EE_Datetime_Field) {
            $current_value = $model_obj->get_DateTime_object($field_to_update->get_name());
        } else {
            $current_value = $model_obj->get($field_to_update->get_name());
        }
        $this->assertEquals($set_value, $current_value);
        $this->assertEquals($model_obj->ID(), $response_data[$model->primary_key_name()]);
    }
}
// End of file EEDCoreRestApiTest.php
// Location: /EEDCoreRestApiTest.php
