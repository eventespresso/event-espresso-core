<?php

namespace EventEspresso\tests\testcases\core\domain\services\graphql\connections;

use EE_Error;
use EEM_Base;
use EventEspresso\tests\testcases\core\domain\services\graphql\GraphQLUnitTestCase;
use ReflectionException;
use WP_User;
use WPGraphQL;
use WPGraphQL\AppContext;

abstract class BaseQueriesTest extends GraphQLUnitTestCase
{
    /**
     * @var EEM_Base $model
     */
    protected $model;

    /**
     * @var AppContext
     */
    protected $app_context;

    /**
     * @var string
     */
    public $model_name;

    /**
     * @var bool
     */
    public $skip_create_entities;

    /**
     * @var array
     */
    public $created_entities = [];

    /**
     * @var WP_User
     */
    public $admin;

    /**
     * @var WP_User
     */
    public $subscriber;


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_up()
    {
        parent::set_up();
        if (! $this->model_name) {
            return;
        }
        WPGraphQL::clear_schema();

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
     * @param int $count Number of entities to create.
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function create_entities(int $count = 20): array
    {
        // Create entities
        $created_entities = [];
        for ($i = 1; $i <= $count; $i++) {
            $created_entities[ $i ] = $this->new_model_obj_with_dependencies($this->model_name);
        }

        return $created_entities;
    }
}
