<?php

namespace EventEspresso\core\domain\services\graphql\data\mutations;

use EE_Error;
use EventEspresso\core\domain\services\admin\entities\DefaultPrices;
use EventEspresso\core\services\loaders\LoaderFactory;
use Exception;
use GraphQLRelay\Relay;
use DateTime;
use EE_Ticket;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;
use ReflectionException;

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
     * @throws Exception
     */
    public static function prepareFields(array $input): array
    {
        $args = [];

        if (! empty($input['datetimes'])) {
            $args['datetimes'] = array_map('sanitize_text_field', (array) $input['datetimes']);
        }

        if (isset($input['description'])) {
            $args['TKT_description'] = wp_kses_post($input['description']);
        }

        if (! empty($input['endDate'])) {
            $args['TKT_end_date'] = new DateTime(sanitize_text_field($input['endDate']));
        }

        if (array_key_exists('isDefault', $input)) {
            $args['TKT_is_default'] = (bool) $input['isDefault'];
        }

        if (array_key_exists('isRequired', $input)) {
            $args['TKT_required'] = (bool) $input['isRequired'];
        }

        if (array_key_exists('isTaxable', $input)) {
            $args['TKT_taxable'] = (bool) $input['isTaxable'];
        }

        if (array_key_exists('isTrashed', $input)) {
            $args['TKT_deleted'] = (bool) $input['isTrashed'];
        }

        if (array_key_exists('max', $input)) {
            $args['TKT_max'] = (int) $input['max'];
        }

        if (array_key_exists('min', $input)) {
            $args['TKT_min'] = (int) $input['min'];
        }

        if (isset($input['name'])) {
            $args['TKT_name'] = sanitize_text_field($input['name']);
        }

        if (array_key_exists('order', $input)) {
            $args['TKT_order'] = (int) $input['order'];
        }

        if (! empty($input['parent'])) {
            $parts = Relay::fromGlobalId(sanitize_text_field($input['parent']));
            $args['TKT_parent'] = (! empty($parts['id']) && is_int($parts['id'])) ? $parts['id'] : null;
        }

        // price can be 0
        if (array_key_exists('price', $input)) {
            $args['TKT_price'] = (float) $input['price'];
        }

        // prices can be an empty array when all prices are deleted
        if (array_key_exists('prices', $input) && is_array($input['prices'])) {
            $args['prices'] = array_map('sanitize_text_field', $input['prices']);
        }

        if (array_key_exists('quantity', $input)) {
            $args['TKT_qty'] = (int) $input['quantity'];
        }

        if (array_key_exists('reserved', $input)) {
            $args['TKT_reserved'] = (int) $input['reserved'];
        }

        if (array_key_exists('reverseCalculate', $input)) {
            $args['TKT_reverse_calculate'] = (bool) $input['reverseCalculate'];
        }

        if (array_key_exists('row', $input)) {
            $args['TKT_row'] = (int) $input['row'];
        }

        if (array_key_exists('sold', $input)) {
            $args['TKT_sold'] = (int) $input['sold'];
        }

        if (! empty($input['startDate'])) {
            $args['TKT_start_date'] = new DateTime(sanitize_text_field($input['startDate']));
        }

        if (array_key_exists('uses', $input)) {
            $args['TKT_uses'] = (int) $input['uses'];
        }

        if (! empty($input['wpUser'])) {
            $parts = Relay::fromGlobalId(sanitize_text_field($input['wpUser']));
            $args['TKT_wp_user'] = (! empty($parts['id']) && is_int($parts['id'])) ? $parts['id'] : null;
        }

        if (array_key_exists('visibility', $input)) {
            $args['TKT_visibility'] = (int) $input['visibility'];
        }

        return apply_filters(
            'FHEE__EventEspresso_core_domain_services_graphql_data_mutations__ticket_args',
            $args,
            $input
        );
    }


    /**
     * Sets the related datetimes for the given ticket.
     *
     * @param EE_Ticket $entity    The Ticket instance.
     * @param array     $datetimes Array of datetime IDs to relate.
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public static function setRelatedDatetimes(EE_Ticket $entity, array $datetimes)
    {
        $relationName = 'Datetime';
        // Remove all the existing related datetimes

        $entity->_remove_relations($relationName);
        // @todo replace loop with single query
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


    /**
     * Sets the related prices for the given ticket.
     *
     * @param EE_Ticket $entity The Ticket instance.
     * @param array     $prices Array of entity IDs to relate.
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public static function setRelatedPrices(EE_Ticket $entity, array $prices)
    {
        $relationName = 'Price';
        // Remove all the existing related entities
        $entity->_remove_relations($relationName);

        // @todo replace loop with single query
        foreach ($prices as $ID) {
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
     * @param EE_Ticket  $ticket_entity
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public static function addDefaultPrices(EE_Ticket $ticket_entity)
    {
        /** @var DefaultPrices $default_prices */
        $default_prices = LoaderFactory::getLoader()->getShared(
            'EventEspresso\core\domain\services\admin\entities\DefaultPrices'
        );
        $default_prices->create($ticket_entity);
    }
}
