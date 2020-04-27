<?php

namespace EventEspresso\core\domain\services\graphql\mutators;

use EE_Ticket;
use EEM_Ticket;
use EventEspresso\core\domain\services\graphql\types\Ticket;
use EventEspresso\core\domain\services\graphql\data\mutations\TicketMutation;
use Exception;
use GraphQL\Type\Definition\ResolveInfo;
use WPGraphQL\AppContext;

class TicketUpdate extends EntityMutator
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
         * Updates an entity.
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

                $entity->save($args);

                if (! empty($datetimes)) {
                    TicketMutation::setRelatedDatetimes($entity, $datetimes);
                }
                if (! empty($prices)) {
                    TicketMutation::setRelatedPrices($entity, $prices);
                }
            } catch (Exception $exception) {
                return EntityMutator::CompileExceptions(
                    $exception,
                    esc_html__(
                        'The ticket could not be deleted because of the following error(s)',
                        'event_espresso'
                    )
                );
            }

            return [
                'id' => $entity->ID(),
            ];
        };
    }
}
