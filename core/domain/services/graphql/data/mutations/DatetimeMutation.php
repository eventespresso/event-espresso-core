<?php

namespace EventEspresso\core\domain\services\graphql\data\mutations;

use DateTime;
use EE_Datetime;
use EE_Error;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use Exception;
use GraphQLRelay\Relay;
use InvalidArgumentException;
use ReflectionException;

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
     * @throws Exception
     */
    public static function prepareFields(array $input)
    {
        $args = [];

        if (array_key_exists('capacity', $input)) {
            $args['DTT_reg_limit'] = (int) $input['capacity'];
        }

        if (! empty($input['description'])) {
            $args['DTT_description'] = sanitize_text_field($input['description']);
        }

        if (! empty($input['endDate'])) {
            $args['DTT_EVT_end'] = new DateTime(sanitize_text_field($input['endDate']));
        }

        if (! empty($input['eventId'])) {
            $args['EVT_ID'] = absint($input['eventId']);
        } elseif (! empty($input['event'])) {
            $parts = Relay::fromGlobalId(sanitize_text_field($input['event']));
            $args['EVT_ID'] = (! empty($parts['id']) && is_int($parts['id'])) ? $parts['id'] : null;
        }

        if (array_key_exists('isPrimary', $input)) {
            $args['DTT_is_primary'] = (bool) $input['isPrimary'];
        }

        if (array_key_exists('isTrashed', $input)) {
            $args['DTT_deleted'] = (bool) $input['isTrashed'];
        }

        if (! empty($input['name'])) {
            $args['DTT_name'] = sanitize_text_field($input['name']);
        }

        if (array_key_exists('order', $input)) {
            $args['DTT_order'] = (int) $input['order'];
        }

        if (! empty($input['parent'])) {
            $parts = Relay::fromGlobalId(sanitize_text_field($input['parent']));
            $args['DTT_parent'] = (! empty($parts['id']) && is_int($parts['id'])) ? $parts['id'] : null;
        }

        if (array_key_exists('reserved', $input)) {
            $args['DTT_reserved'] = (int) $input['reserved'];
        }

        if (array_key_exists('sold', $input)) {
            $args['DTT_sold'] = (int) $input['sold'];
        }

        if (! empty($input['startDate'])) {
            $args['DTT_EVT_start'] = new DateTime(sanitize_text_field($input['startDate']));
        }

        if (! empty($input['tickets'])) {
            $args['tickets'] = array_map('sanitize_text_field', (array) $input['tickets']);
        }

        return $args;
    }


    /**
     * Sets the related tickets for the given datetime.
     *
     * @param EE_Datetime $entity  The datetime instance.
     * @param array       $tickets Array of ticket IDs to relate.
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
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
