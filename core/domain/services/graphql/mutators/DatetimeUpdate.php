<?php

namespace EventEspresso\core\domain\services\graphql\mutators;

use EE_Datetime;
use EEM_Datetime;
use EventEspresso\core\domain\services\graphql\types\Datetime;
use EventEspresso\core\domain\services\graphql\data\mutations\DatetimeMutation;
use Exception;
use GraphQL\Type\Definition\ResolveInfo;
use WPGraphQL\AppContext;

class DatetimeUpdate extends EntityMutator
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
         * Updates an entity.
         *
         * @param array       $input   The input for the mutation
         * @param AppContext  $context The AppContext passed down to all resolvers
         * @param ResolveInfo $info    The ResolveInfo passed down to all resolvers
         * @return array
         */
        return static function ($input, AppContext $context, ResolveInfo $info) use ($model, $type) {
            try {
                /** @var EE_Datetime $entity */
                $entity = EntityMutator::getEntityFromInputData($model, $input);

                $tickets = [];
                $args = DatetimeMutation::prepareFields($input);

                if (isset($args['tickets'])) {
                    $tickets = $args['tickets'];
                    unset($args['tickets']);
                }

                // Update the entity
                $entity->save($args);

                if (! empty($tickets)) {
                    DatetimeMutation::setRelatedTickets($entity, $tickets);
                }
            } catch (Exception $exception) {
                return EntityMutator::FormatException(
                    $exception,
                    esc_html__(
                        'The datetime could not be updated because of the following error(s)',
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
