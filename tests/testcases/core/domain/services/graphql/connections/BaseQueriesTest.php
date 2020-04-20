<?php

namespace EventEspresso\tests\testcases\core\domain\services\graphql\connections;

use EE_Dependency_Map;
use EE_Error;
use EEM_Event;
use EventEspresso\tests\testcases\core\domain\services\graphql\GraphQLUnitTestCase;

class BaseQueriesTest extends GraphQLUnitTestCase
{

    /**
     * @var EEM_Base $model
     */
    protected $model;
    public $model_name;

    public $created_entities;
    public $admin;
    public $subscriber;

    public function setUp()
    {
        parent::setUp();
        if (!$this->model_name) {
            return;
        }

        $this->admin      = $this->factory()->user->create(
            [
                'role' => 'administrator',
            ]
        );
        $this->subscriber = $this->factory()->user->create(
            [
                'role' => 'subscriber',
            ]
        );

        $this->created_entities = $this->create_entities();

        $this->app_context = new \WPGraphQL\AppContext();

        $this->app_info = new \GraphQL\Type\Definition\ResolveInfo(array());
    }

    /**
     * Creates several entities for use in cursor query tests
     *
     * @param  int $count Number of entities to create.
     *
     * @return array
     */
    public function create_entities($count = 20)
    {

        // Create entities
        $created_entities = [];
        for ($i = 1; $i <= $count; $i ++) {
            $created_entities[ $i ] = $this->new_model_obj_with_dependencies($this->model_name);
        }

        return $created_entities;
    }
}
