<?php

namespace EventEspresso\tests\testcases\core\domain\services\graphql\mutators;

use EventEspresso\tests\testcases\core\domain\services\graphql\GraphQLUnitTestCase;

class TicketCreateTest extends GraphQLUnitTestCase
{
    public $name;
    public $description;
    public $client_mutation_id;
    public $admin;
    public $subscriber;

    public function setUp()
    {
        // before
        parent::setUp();
        if (PHP_VERSION_ID < 70000) {
            $this->markTestSkipped(
                'WP GraphQL compatible with PHP 7+ only'
            );
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
    }

    /**
     * This processes a mutation to create an entity
     *
     * @return array
     */
    public function createEntityMutation()
    {
        $mutation = '
		mutation CreateTicket($input: CreateEspressoTicketInput!) {
			createEspressoTicket(input: $input) {
				clientMutationId
				espressoTicket {
					name
					description
				}
			}
		}
		';

        $variables = wp_json_encode([
            'input' => [
                'clientMutationId' => $this->client_mutation_id,
                'name'             => $this->name,
                'description'      => $this->description,
            ]
        ]);

        $actual = do_graphql_request($mutation, 'createEntity', $variables);

        return $actual;
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
                'createEspressoTicket' => [
                    'clientMutationId' => $this->client_mutation_id,
                    'espressoTicket' => [
                        'name'        => $this->name,
                        'description' => $this->description,
                    ],
                ],
            ],
        ];

        $this->assertEquals($expected, $actual);
    }
}
