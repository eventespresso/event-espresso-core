<?php

namespace EventEspresso\core\domain\services\graphql\mutators;

use EE_Datetime;
use EEM_Datetime;
use EventEspresso\core\domain\services\graphql\types\Datetime;
use EventEspresso\core\domain\services\graphql\data\mutations\DatetimeMutation;
use Exception;
use GraphQL\Type\Definition\ResolveInfo;
use WPGraphQL\AppContext;

class DatetimeCreate extends EntityMutator
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
         * Creates an entity.
         *
         * @param array       $input   The input for the mutation
         * @param AppContext  $context The AppContext passed down to all resolvers
         * @param ResolveInfo $info    The ResolveInfo passed down to all resolvers
         * @return array
         */
        return static function (array $input, AppContext $context, ResolveInfo $info) use ($model, $type): array {
            $id = null;
            try {
                EntityMutator::checkPermissions($model);

                $tickets = [];
                $args = DatetimeMutation::prepareFields($input);

                if (isset($args['tickets'])) {
                    $tickets = $args['tickets'];
                    unset($args['tickets']);
                }


                $venue = 'NO_VENUE_SET';
                if (array_key_exists('venue', $args)) {
                    $venue = $args['venue'];
                    unset($args['venue']);
                }

                $entity = EE_Datetime::new_instance($args);
                $id = $entity->save();
                EntityMutator::validateResults($id);

                if (! empty($tickets)) {
                    DatetimeMutation::setRelatedTickets($entity, $tickets);
                }

                if ($venue !== 'NO_VENUE_SET') {
                    DatetimeMutation::setVenue($entity, $venue);
                }

                do_action('AHEE__EventEspresso_core_domain_services_graphql_mutators_datetime_create', $entity, $input);
            } catch (Exception $exception) {
                EntityMutator::handleExceptions(
                    $exception,
                    esc_html__(
                        'The datetime could not be created because of the following error(s)',
                        'event_espresso'
                    )
                );
            }

            return $id ? [ 'id' => $id ] : [];
        };
    }
}
