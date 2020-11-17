<?php

namespace EventEspresso\tests\testcases\core\domain\services\graphql\mutators;

use GraphQLRelay\Relay;
use EEM_Price_Type;

/**
 * @group wpGraphQL
 */
class PriceCreateTest extends BaseMutationTest
{
    public function setUp()
    {
        $this->model_name = 'Price';
        // before
        parent::setUp();
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
                    description
                }
            }
        }
        ';

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

        $input = [
            'name' => $this->name,
            'description' => $this->description,
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
            'description' => $this->description,
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
        $priceTypes = EEM_Price_Type::instance()->get_all();

        $priceType = reset($priceTypes);
        /**
         * Set the current user as the admin role so we
         * can test the mutation
         */
        wp_set_current_user($this->admin);

        $input = [
            'name'      => $this->name,
            'description'      => $this->description,
            'priceType' => Relay::toGlobalId('Price_Type', $priceType->ID()),
        ];

        /**
         * Run the mutation
         */
        $actual = $this->createMutation($input);
        $this->assertNotEmpty($actual['data']);

        /**
         * We're expecting to have createEntity returned with a nested clientMutationId matching the
         * clientMutationId we sent through, as well as the name and description we passed through in the mutation
         */
        $expected = [
            'createEspressoPrice' => [
                'clientMutationId' => $this->client_mutation_id,
                'espressoPrice' => [
                    'name' => $this->name,
                    'description' => $this->description,
                ],
            ],
        ];

        $this->assertEquals($expected, $actual['data']);
    }
}
