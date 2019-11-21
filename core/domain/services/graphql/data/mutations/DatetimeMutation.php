<?php

namespace EventEspresso\core\domain\services\graphql\data\mutations;

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

        if (! empty($input['event'])) {
            $args['EVT_ID'] = absint($input['event']);
        }

        if (! empty($input['name'])) {
            $args['DTT_name'] = sanitize_text_field($input['name']);
        }

        if (! empty($input['description'])) {
            $args['DTT_description'] = sanitize_text_field($input['description']);
        }

        if (! empty($input['startDate'])) {
            $args['DTT_EVT_start'] = sanitize_text_field($input['startDate']);
        }

        if (! empty($input['endDate'])) {
            $args['DTT_EVT_end'] = sanitize_text_field($input['endDate']);
        }

        if (! empty($input['tickets'])) {
            $args['tickets'] = array_filter(array_map('absint', (array) $input['tickets']));
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
            $entity->_add_relation_to(
                $ID,
                $relationName
            );
        }
    }
}
