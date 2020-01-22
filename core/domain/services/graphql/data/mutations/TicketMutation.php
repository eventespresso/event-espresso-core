<?php

namespace EventEspresso\core\domain\services\graphql\data\mutations;

use DomainException;
use EE_Error;
use Exception;
use GraphQLRelay\Relay;
use DateTime;
use EEM_Price;
use EEM_Ticket;
use EE_Ticket;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\exceptions\ModelConfigurationException;
use EventEspresso\core\exceptions\UnexpectedEntityException;
use EventEspresso\core\libraries\rest_api\RestException;
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
            $args['TKT_price'] = (float) $input['price'];
        }

        if (! empty($input['startDate'])) {
            $args['TKT_start_date'] = new DateTime(sanitize_text_field($input['startDate']));
        }

        if (! empty($input['endDate'])) {
            $args['TKT_end_date'] = new DateTime(sanitize_text_field($input['endDate']));
        }

        if (! empty($input['datetimes'])) {
            $args['datetimes'] = array_map('sanitize_text_field', (array) $input['datetimes']);
        }

        if (! empty($input['prices'])) {
            $args['prices'] = array_map('sanitize_text_field', (array) $input['prices']);
        }

        if (array_key_exists('isTrashed', $input)) {
            $args['TKT_deleted'] = (bool) $input['isTrashed'];
        }

        // Likewise the other fields...

        return $args;
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
    public static function setRelatedDatetimes($entity, array $datetimes)
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
    public static function setRelatedPrices($entity, array $prices)
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
     * @param EEM_Ticket $ticket_model
     * @throws DomainException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ModelConfigurationException
     * @throws ReflectionException
     * @throws RestException
     * @throws UnexpectedEntityException
     * @throws EE_Error
     * @since $VID:$
     */
    public static function addDefaultPrices(EE_Ticket $ticket_entity, EEM_Ticket $ticket_model)
    {
        $price_model = EEM_Price::instance();
        $default_prices = $price_model->get_all_default_prices();
        foreach ($default_prices as $default_price) {
            $default_price->save();
            $default_price->_add_relation_to($ticket_entity, 'Ticket');
        }
    }
}
