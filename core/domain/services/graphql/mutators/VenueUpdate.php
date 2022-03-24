<?php

namespace EventEspresso\core\domain\services\graphql\mutators;

use EEM_Venue;
use EE_Venue;
use Exception;
use WP_Post_Type;
use EventEspresso\core\domain\services\graphql\types\Venue;
use EventEspresso\core\domain\services\graphql\data\mutations\VenueMutation;
use GraphQL\Type\Definition\ResolveInfo;
use WPGraphQL\AppContext;

class VenueUpdate extends EntityMutator
{
    /**
     * Defines the mutation data modification closure.
     *
     * @param EEM_Venue $model
     * @param Venue     $type
     * @return callable
     */
    public static function mutateFields(EEM_Venue $model, Venue $type)
    {
        /**
         * Update additional data related to the entity.
         *
         * @param int           $id                 The ID of the postObject being mutated
         * @param array         $input              The input for the mutation
         * @param WP_Post_Type  $post_type_object   The Post Type Object for the type of post being mutated
         * @param string        $mutation_name      The name of the mutation (ex: create, update, delete)
         * @param AppContext    $context            The AppContext passed down to all resolvers
         * @param ResolveInfo   $info               The ResolveInfo passed down to all resolvers
         * @return void
         */
        return static function (
            int $id,
            array $input,
            WP_Post_Type $post_type_object,
            string $mutation_name,
            AppContext $context,
            ResolveInfo $info
        ) use (
            $model,
            $type
        ) {
            try {
                // Make sure we are dealing with the right entity.
                if (
                    ! property_exists($post_type_object, 'graphql_single_name')
                    || $post_type_object->graphql_single_name !== $type->name()
                ) {
                    return;
                }

                /** @var EE_Venue $entity */
                $entity = EntityMutator::getEntityFromID($model, $id);
                $args = VenueMutation::prepareFields($input);

                // Update the entity
                $entity->save($args);

                do_action('AHEE__EventEspresso_core_domain_services_graphql_mutators_venue_update', $entity, $input);
            } catch (Exception $exception) {
                EntityMutator::handleExceptions(
                    $exception,
                    esc_html__(
                        'The venue could not be updated because of the following error(s)',
                        'event_espresso'
                    )
                );
            }
        };
    }
}
