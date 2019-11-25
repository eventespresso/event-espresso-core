<?php

namespace EventEspresso\core\domain\services\graphql\data\mutations;

use GraphQLRelay\Relay;

/**
 * Class TicketMutation
 *
 * @package       Event Espresso
 * @author        Manzoor Wani
 */
class TicketMutation
{

    /**
     * Maps the GraphQL input to a format that the model functions can use
     *
     * @param array $input Data coming from the GraphQL mutation query input
     * @return array
     */
    public static function prepareFields(array $input)
    {

        $args = [];

        if (! empty($input['name'])) {
            $args['TKT_name'] = sanitize_text_field($input['name']);
        }

        if (! empty($input['description'])) {
            $args['TKT_description'] = sanitize_text_field($input['description']);
        }

        if (! empty($input['price'])) {
            $args['TKT_price'] = floatval($input['price']);
        }

        if (! empty($input['datetimes'])) {
            $args['datetimes'] = array_map('sanitize_text_field', (array) $input['datetimes']);
        }

        // Likewise the other fields...

        return $args;
    }

    /**
     * Sets the related tickets for the given datetime.
     *
     * @param EE_Ticket $entity    The Ticket instance.
     * @param array     $datetimes Array of datetime IDs to relate.
     */
    public static function setRelatedDatetimes($entity, array $datetimes)
    {
        $relationName = 'Datetime';
        // Remove all the existing related datetimes
        $entity->_remove_relations($relationName);

        foreach ($datetimes as $ID) {
            $parts = Relay::fromGlobalId($ID);
            if (! empty($parts['id']) && absint($parts['id'])) {
                $entity->_add_relation_to(
                    $parts['id'],
                    $relationName
                );
            }
        }
    }
}
