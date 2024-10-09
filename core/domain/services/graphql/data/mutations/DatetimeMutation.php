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
    public static function prepareFields(array $input): array
    {
        $args = [];

        if (array_key_exists('capacity', $input)) {
            $args['DTT_reg_limit'] = (int) $input['capacity'];
        }

        if (isset($input['description'])) {
            $args['DTT_description'] = wp_kses_post($input['description']);
        }

        if (! empty($input['endDate'])) {
            $args['DTT_EVT_end'] = new DateTime(sanitize_text_field($input['endDate']));
        }

        if (! empty($input['eventId'])) {
            $args['EVT_ID'] = absint($input['eventId']);
        } elseif (! empty($input['event'])) {
            $parts = Relay::fromGlobalId(sanitize_text_field($input['event']));
            $args['EVT_ID'] = ! empty($parts['id']) ? $parts['id'] : null;
        }

        if (array_key_exists('isPrimary', $input)) {
            $args['DTT_is_primary'] = (bool) $input['isPrimary'];
        }

        if (array_key_exists('isTrashed', $input)) {
            $args['DTT_deleted'] = (bool) $input['isTrashed'];
        }

        if (isset($input['name'])) {
            $args['DTT_name'] = sanitize_text_field($input['name']);
        }

        if (array_key_exists('order', $input)) {
            $args['DTT_order'] = (int) $input['order'];
        }

        if (! empty($input['parent'])) {
            $parts = Relay::fromGlobalId(sanitize_text_field($input['parent']));
            $args['DTT_parent'] = ! empty($parts['id']) ? $parts['id'] : null;
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

        if (array_key_exists('venue', $input)) {
            $venue_id = sanitize_text_field($input['venue']);
            $parts = Relay::fromGlobalId($venue_id);
            $venue_id = ! empty($parts['id']) ? $parts['id'] : $venue_id;
            $args['venue'] = absint($venue_id);
        }

        return apply_filters(
            'FHEE__EventEspresso_core_domain_services_graphql_data_mutations__datetime_args',
            $args,
            $input
        );
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
    public static function setRelatedTickets(EE_Datetime $entity, array $tickets)
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


    /**
     * Sets the venue for the datetime.
     *
     * @param EE_Datetime $entity The datetime instance.
     * @param int      $venue  The venue ID
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     */
    public static function setVenue(EE_Datetime $entity, int $venue)
    {
        if (empty($venue)) {
            if (! is_null($entity->venue())) {
                $entity->remove_venue($venue);
            }
        } else {
            $entity->add_venue($venue);
        }
    }
}
