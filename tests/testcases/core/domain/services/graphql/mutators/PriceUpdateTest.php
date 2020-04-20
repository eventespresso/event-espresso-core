<?php

namespace EventEspresso\tests\testcases\core\domain\services\graphql\mutators;

use EventEspresso\tests\testcases\core\domain\services\graphql\GraphQLUnitTestCase;
use GraphQLRelay\Relay;

class PriceUpdateTest extends GraphQLUnitTestCase
{
    public $name;
    public $desc;
    public $client_mutation_id;
    public $admin;
    public $subscriber;
    public $entity;
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

        $this->entity = $this->new_model_obj_with_dependencies('Price');
        $this->priceType = $this->new_model_obj_with_dependencies('Price_Type');
    }

    /**
     * This processes a mutation to update an entity
     *
     * @return array
     */
    public function updateMutation($input)
    {
        $mutation = '
		mutation UpdatePrice($input: UpdateEspressoPriceInput!) {
            updateEspressoPrice(input: $input) {
                clientMutationId
                espressoPrice {
                    id
                    dbId
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

        return do_graphql_request($mutation, 'updateEntity', $variables);
    }

    /**
     * This tests to make sure a user without proper capabilities cannot update an entity
     */
    public function testUpdateWithoutProperCapabilities()
    {
        $dbId = $this->entity->ID();
        $guid = Relay::toGlobalId('Price', $dbId);

        $input = [
            'id'   => $guid,
            'name' => $this->name,
            'desc' => $this->desc,
        ];


        /**
         * Execute the request
         */
        $result = $this->updateMutation($input);

        /**
         * The deletion should fail because we're a subscriber
         */
        $this->assertArrayHasKey('errors', $result);
    }

    /**
     * This tests to make sure an admin can update an entity
     */
    public function testUpdateWithAdmin()
    {
        $dbId = $this->entity->ID();
        $guid = Relay::toGlobalId('Price', $dbId);

        /**
         * Set the user to an admin
         */
        wp_set_current_user($this->admin);

        $input = [
            'id'   => $guid,
            'name' => $this->name,
            'desc' => $this->desc,
        ];

        /**
         * Execute the request
         */
        $result = $this->updateMutation($input);

        $updated = $result['data']['updateEspressoPrice']['espressoPrice'];
        $this->assertNotEmpty($updated);
        $this->assertEquals($dbId, $updated['dbId']);
        $this->assertEquals($this->name, $updated['name']);
        $this->assertEquals($this->desc, $updated['desc']);
    }

    /**
     * This tests updating an invalid/non-existent entity
     */
    public function testUpdateWithInValidId()
    {
        /**
         * Set the user to an admin
         */
        wp_set_current_user($this->admin);

        $input = [
            'id'   => 'fake-entity-id',
            'name' => $this->name,
            'desc' => $this->desc,
        ];

        /**
         * Execute the request
         */
        $result = $this->updateMutation($input);

        /**
         * The request should fail
         */
        $this->assertArrayHasKey('errors', $result);
    }
}
