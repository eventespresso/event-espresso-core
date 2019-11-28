<?php

namespace EventEspresso\core\domain\services\graphql\data\mutations;

use GraphQLRelay\Relay;

/**
 * Class DatetimeMutation
 *
 * @package       Event Espresso
 * @author        Manzoor Wani
 */
class DatetimeMutation
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

        if (! empty($input['eventId'])) {
            $args['EVT_ID'] = absint($input['eventId']);
        } elseif (! empty($input['event'])) {
            $parts = Relay::fromGlobalId($input['event']);
            $args['EVT_ID'] = (! empty($parts['id']) && is_int($parts['id'])) ? $parts['id'] : null;
        }

        if (! empty($input['name'])) {
            $args['DTT_name'] = sanitize_text_field($input['name']);
        }

        if (! empty($input['description'])) {
            $args['DTT_description'] = sanitize_text_field($input['description']);
        }

        if (! empty($input['startDate'])) {
            $args['DTT_EVT_start'] = new \DateTime(sanitize_text_field($input['startDate']));
        }

        if (! empty($input['endDate'])) {
            $args['DTT_EVT_end'] = new \DateTime(sanitize_text_field($input['endDate']));
        }

        if (! empty($input['tickets'])) {
            $args['tickets'] = array_map('sanitize_text_field', (array) $input['tickets']);
        }

        // Likewise the other fields...

        return $args;
    }

    /**
     * Sets the related tickets for the given datetime.
     *
     * @param EE_Datetime $entity  The datetime instance.
     * @param array       $tickets Array of ticket IDs to relate.
     */
    public static function setRelatedTickets($entity, array $tickets)
    {
        $relationName = 'Ticket';
        // Remove all the existing related tickets
        $entity->_remove_relations($relationName);

        foreach ($tickets as $ID) {
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
