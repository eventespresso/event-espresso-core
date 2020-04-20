<?php

namespace EventEspresso\tests\testcases\core\domain\services\graphql\mutators;

class DatetimeCreateTest extends BaseMutationTest
{
    public function setUp()
    {
        $this->model_name = 'Datetime';
        // before
        parent::setUp();
    }

    /**
     * This processes a mutation to create an entity
     *
     * @return array
     */
    public function createEntityMutation()
    {
        $mutation = '
		mutation CreateDatetime($input: CreateEspressoDatetimeInput!) {
            createEspressoDatetime(input: $input) {
                clientMutationId
                espressoDatetime {
                    name
                    description
                }
            }
        }
        ';

        $input = [
            'name'             => $this->name,
            'description'      => $this->description,
        ];
        
        return $this->runCreateMutation($mutation, $input);
    }

    /**
     * This tests to make sure a user without proper capabilities cannot create an entity
     */
    public function testCreateEntityWithoutProperCapabilities()
    {

        /**
         * Set the current user as the subscriber role so we
         * can test the mutation and make sure they cannot create an entity
         * since they don't have proper permissions
         */
        wp_set_current_user($this->subscriber);

        /**
         * Run the mutation.
         */
        $actual = $this->createEntityMutation();

        /**
         * We're asserting that this will properly return an error
         * because this user doesn't have permissions to create an entity as a
         * subscriber
         */
        $this->assertNotEmpty($actual['errors']);
    }

    /**
     * This tests a createEntity mutation by an admin
     */
    public function testCreateEntityByAdmin()
    {

        /**
         * Set the current user as the admin role so we
         * can test the mutation
         */
        wp_set_current_user($this->admin);

        /**
         * Run the mutation
         */
        $actual = $this->createEntityMutation();

        /**
         * We're expecting to have createEntity returned with a nested clientMutationId matching the
         * clientMutationId we sent through, as well as the name and description we passed through in the mutation
         */
        $expected = [
            'data' => [
                'createEspressoDatetime' => [
                    'clientMutationId' => $this->client_mutation_id,
                    'espressoDatetime' => [
                        'name'        => $this->name,
                        'description' => $this->description,
                    ],
                ],
            ],
        ];

        $this->assertEquals($expected, $actual);
    }
}
