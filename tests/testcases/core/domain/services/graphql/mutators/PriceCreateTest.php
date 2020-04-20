<?php

namespace EventEspresso\tests\testcases\core\domain\services\graphql\mutators;

use EventEspresso\tests\testcases\core\domain\services\graphql\GraphQLUnitTestCase;
use GraphQLRelay\Relay;

class PriceCreateTest extends GraphQLUnitTestCase
{
    public $name;
    public $desc;
    public $client_mutation_id;
    public $admin;
    public $subscriber;
    public $priceType;

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
        $this->desc               = 'some desc';
        $this->client_mutation_id = 'someUniqueId';

        $this->admin = $this->factory()->user->create([
            'role' => 'administrator',
        ]);

        $this->subscriber = $this->factory()->user->create([
            'role' => 'subscriber',
        ]);
        $this->priceType = $this->new_model_obj_with_dependencies('Price_Type');
    }

    /**
     * This processes a mutation to create an entity
     *
     * @return array
     */
    public function createMutation($input)
    {
        $mutation = '
		mutation CreatePrice($input: CreateEspressoPriceInput!) {
			createEspressoPrice(input: $input) {
				clientMutationId
				espressoPrice {
					name
					desc
				}
			}
		}
        ';
        
        $input['clientMutationId'] = $this->client_mutation_id;

        $variables = wp_json_encode([
            'input' => $input
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

        $input = [
            'name' => $this->name,
            'desc' => $this->desc,
        ];

        /**
         * Run the mutation.
         */
        $actual = $this->createMutation($input);

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
    public function testCreateEntityByAdminWithNoPriceType()
    {

        /**
         * Set the current user as the admin role so we
         * can test the mutation
         */
        wp_set_current_user($this->admin);

        $input = [
            'name' => $this->name,
            'desc' => $this->desc,
        ];

        /**
         * Run the mutation
         */
        $actual = $this->createMutation($input);

        /**
         * Since we did not pass any price type
         */
        $this->assertNotEmpty($actual['errors']);
    }

    /**
     * This tests a createEntity mutation by an admin
     */
    public function testCreateEntityByAdminWithPriceType()
    {

        /**
         * Set the current user as the admin role so we
         * can test the mutation
         */
        wp_set_current_user($this->admin);

        $input = [
            'name'      => $this->name,
            'desc'      => $this->desc,
            'priceType' => Relay::toGlobalId('Price_Type', $this->priceType->ID()),
        ];

        /**
         * Run the mutation
         */
        $actual = $this->createMutation($input);

        /**
         * We're expecting to have createEntity returned with a nested clientMutationId matching the
         * clientMutationId we sent through, as well as the name and desc we passed through in the mutation
         */
        $expected = [
            'data' => [
                'createEspressoPrice' => [
                    'clientMutationId' => $this->client_mutation_id,
                    'espressoPrice' => [
                        'name' => $this->name,
                        'desc' => $this->desc,
                    ],
                ],
            ],
        ];

        $this->assertEquals($expected, $actual);
    }
}
