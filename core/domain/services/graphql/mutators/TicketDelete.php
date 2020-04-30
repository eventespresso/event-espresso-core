<?php

namespace EventEspresso\core\domain\services\graphql\mutators;

use EE_Ticket;
use EEM_Ticket;
use EE_Error;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;
use ReflectionException;
use Exception;
use EventEspresso\core\domain\services\graphql\types\Ticket;
use GraphQL\Type\Definition\ResolveInfo;
use WPGraphQL\AppContext;

class TicketDelete extends EntityMutator
{

    /**
     * Defines the mutation data modification closure.
     *
     * @param EEM_Ticket $model
     * @param Ticket     $type
     * @return callable
     */
    public static function mutateAndGetPayload(EEM_Ticket $model, Ticket $type)
    {
        /**
         * Deletes an entity.
         *
         * @param array       $input   The input for the mutation
         * @param AppContext  $context The AppContext passed down to all resolvers
         * @param ResolveInfo $info    The ResolveInfo passed down to all resolvers
         * @return array
         */
        return static function ($input, AppContext $context, ResolveInfo $info) use ($model, $type) {
            try {
                /** @var EE_Ticket $entity */
                $entity = EntityMutator::getEntityFromInputData($model, $input);

                // Delete the entity
                if (! empty($input['deletePermanently'])) {
                    $result = TicketDelete::deleteTicketAndRelations($entity);
                } else {
                    // trash the ticket
                    $result = $entity->delete();
                }
                EntityMutator::validateResults($result);
            } catch (Exception $exception) {
                EntityMutator::handleExceptions(
                    $exception,
                    esc_html__(
                        'The ticket could not be deleted because of the following error(s)',
                        'event_espresso'
                    )
                );
            }

            return [
                'deleted' => $entity,
            ];
        };
    }

    /**
     * Deletes a ticket permanently along with its relations.
     *
     * @param EE_Ticket $entity
     * @return bool | int
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public static function deleteTicketAndRelations($entity)
    {
        // Remove related prices for the ticket
        $entity->delete_related_permanently('Price');
        // Remove relation with datetimes
        $entity->_remove_relations('Datetime');
        // Now delete the ticket permanently
        $result = $entity->delete_permanently();

        return $result;
    }
}
