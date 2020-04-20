<?php

namespace EventEspresso\tests\testcases\core\domain\services\graphql\mutators;

use EventEspresso\tests\testcases\core\domain\services\graphql\GraphQLUnitTestCase;
use GraphQLRelay\Relay;

class BaseMutationTest extends GraphQLUnitTestCase
{
    public $name;
    public $description;
    public $client_mutation_id;
    public $admin;
    public $subscriber;
    public $entity;
    public $model_name;

    public function setUp()
    {
        parent::setUp();
        if (!$this->model_name) {
            return;
        }

        $this->name               = 'some name';
        $this->description        = 'some description';
        $this->client_mutation_id = 'someUniqueId';

        $this->admin = $this->factory()->user->create([
            'role' => 'administrator',
        ]);

        $this->subscriber = $this->factory()->user->create([
            'role' => 'subscriber',
        ]);

        $this->entity = $this->new_model_obj_with_dependencies($this->model_name);
    }

    /**
     * This processes a mutation to create an entity
     *
     * @return array
     */
    public function runCreateMutation($mutation, $input)
    {
        $input['clientMutationId'] = $this->client_mutation_id;

        $variables = wp_json_encode([
            'input' => $input
        ]);

        return do_graphql_request($mutation, 'createEntity', $variables);
    }

    /**
     * This processes a mutation to update an entity
     *
     * @return array
     */
    public function runUpdateMutation($mutation, $input)
    {
        $input['clientMutationId'] = $this->client_mutation_id;

        $variables = wp_json_encode([
            'input' => $input
        ]);

        return do_graphql_request($mutation, 'updateEntity', $variables);
    }

    /**
     * This processes a mutation to delete an entity
     *
     * @return array
     */
    public function runDeleteMutation($mutation, $id, $deletePermanently = false)
    {
        $variables = wp_json_encode([
            'input' => [
                'clientMutationId'  => $this->client_mutation_id,
                'id'                => $id,
                'deletePermanently' => $deletePermanently,
            ]
        ]);

        return do_graphql_request($mutation, 'deleteEntity', $variables);
    }

    public function testFakeit()
    {
        $this->assertTrue(true);
    }
}
