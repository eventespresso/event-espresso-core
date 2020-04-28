<?php

namespace EventEspresso\core\domain\services\graphql\mutators;

use EE_Ticket;
use EEM_Ticket;
use EventEspresso\core\domain\services\graphql\types\Ticket;
use EventEspresso\core\domain\services\graphql\data\mutations\TicketMutation;
use Exception;
use GraphQL\Type\Definition\ResolveInfo;
use WPGraphQL\AppContext;

class TicketCreate extends EntityMutator
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
         * Creates an entity.
         *
         * @param array       $input   The input for the mutation
         * @param AppContext  $context The AppContext passed down to all resolvers
         * @param ResolveInfo $info    The ResolveInfo passed down to all resolvers
         * @return array
         */
        return static function ($input, AppContext $context, ResolveInfo $info) use ($model, $type) {
            try {
                EntityMutator::checkPermissions($model);

                $datetimes = [];
                $prices = [];

                $args = TicketMutation::prepareFields($input);

                if (isset($args['datetimes'])) {
                    $datetimes = $args['datetimes'];
                    unset($args['datetimes']);
                }
                if (isset($args['prices'])) {
                    $prices = $args['prices'];
                    unset($args['prices']);
                }

                $entity = EE_Ticket::new_instance($args);
                $id = $entity->save();
                EntityMutator::validateResults($id);

                if (! empty($datetimes)) {
                    TicketMutation::setRelatedDatetimes($entity, $datetimes);
                }
                // if prices are passed.
                if (! empty($prices)) {
                    TicketMutation::setRelatedPrices($entity, $prices);
                } else {
                    TicketMutation::addDefaultPrices($entity, $model);
                }
            } catch (Exception $exception) {
                EntityMutator::handleExceptions(
                    $exception,
                    esc_html__(
                        'The ticket could not be created because of the following error(s)',
                        'event_espresso'
                    )
                );
            }

            return [
                'id' => $id,
            ];
        };
    }
}
