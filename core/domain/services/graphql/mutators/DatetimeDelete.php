<?php

namespace EventEspresso\core\domain\services\graphql\mutators;

use EE_Datetime;
use EEM_Datetime;
use EventEspresso\core\domain\services\graphql\types\Datetime;
use Exception;
use GraphQL\Type\Definition\ResolveInfo;
use WPGraphQL\AppContext;

class DatetimeDelete extends EntityMutator
{

    /**
     * Defines the mutation data modification closure.
     *
     * @param EEM_Datetime $model
     * @param Datetime     $type
     * @return callable
     */
    public static function mutateAndGetPayload(EEM_Datetime $model, Datetime $type)
    {
        /**
         * Deletes an entity.
         *
         * @param array       $input   The input for the mutation
         * @param AppContext  $context The AppContext passed down to all resolvers
         * @param ResolveInfo $info    The ResolveInfo passed down to all resolvers
         * @return array|void
         */
        return static function ($input, AppContext $context, ResolveInfo $info) use ($model, $type) {
            try {
                /** @var EE_Datetime $entity */
                $entity = EntityMutator::getEntityFromInputData($model, $input);

                // Delete the entity
                if (! empty($input['deletePermanently'])) {
                    // all related tickets
                    $tickets = $entity->tickets();
                    foreach ($tickets as $ticket) {
                        // if the ticket is related to only one datetime
                        if ($ticket->count_related('Datetime') === 1) {
                            // Remove related prices for the ticket
                            $ticket->delete_related_permanently('Price');
                            // Remove relation with datetimes
                            $ticket->_remove_relations('Datetime');
                            // delete the ticket permanently
                            $ticket->delete_permanently();
                        }
                    }

                    // Remove relations with tickets
                    $entity->_remove_relations('Ticket');
                    // Now delete the datetime permanently
                    $result = $entity->delete_permanently();
                } else {
                    // non trashed related tickets
                    $tickets = $entity->tickets([[
                        'TKT_deleted' => false,
                    ]]);
                    // loop though all tickets to check if we need to trash any
                    foreach ($tickets as $ticket) {
                        // if the ticket is related to a maximum of one datetime
                        if ($ticket->count_related('Datetime') <= 1) {
                            // trash the ticket
                            $ticket->delete();
                        }
                    }
                    // trash the datetime
                    $result = $entity->delete();
                }
                EntityMutator::validateResults($result);
            } catch (Exception $exception) {
                EntityMutator::handleExceptions(
                    $exception,
                    esc_html__(
                        'The datetime could not be deleted because of the following error(s)',
                        'event_espresso'
                    )
                );
            }

            return [
                'deleted' => $entity,
            ];
        };
    }
}
