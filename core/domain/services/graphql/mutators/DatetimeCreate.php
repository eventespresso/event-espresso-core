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
                $args = DatetimeMutation::prepareFields($input);

                // extract tickets and venue from args then unset them
                $tickets = $args['tickets'] ?? null;
                $venue   = $args['venue'] ?? null;
                unset($args['tickets'], $args['venue']);

                $entity = EE_Datetime::new_instance($args);
                $id = $entity->save();
                EntityMutator::validateResults($id);

                if ($tickets) {
                    DatetimeMutation::setRelatedTickets($entity, $tickets);
                }

                if (isset($venue)) {
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
