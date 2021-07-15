<?php

namespace EventEspresso\tests\testcases\core\domain\services\graphql\connections;

use EventEspresso\tests\testcases\core\domain\services\graphql\GraphQLUnitTestCase;
use WPGraphQL\AppContext;

class BaseQueriesTest extends GraphQLUnitTestCase
{

    /**
     * @var EEM_Base $model
     */
    protected $model;
    public $model_name;
    public $skip_create_entities;
    public $created_entities;
    public $admin;
    public $subscriber;

    public function setUp()
    {
        parent::setUp();
        if (!$this->model_name) {
            return;
        }
        $this->loadFactories();

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

        $this->created_entities = $this->skip_create_entities ? [] : $this->create_entities();

        $this->app_context = new AppContext();
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
