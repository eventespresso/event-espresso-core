<?php

namespace EventEspresso\core\domain\services\graphql\mutators;

use EE_Event;
use EEM_Event;
use Exception;
use WP_Post_Type;
use EventEspresso\core\domain\services\graphql\types\Event;
use EventEspresso\core\domain\services\graphql\data\mutations\EventMutation;
use GraphQL\Type\Definition\ResolveInfo;
use WPGraphQL\AppContext;

class EventUpdate extends EntityMutator
{

    /**
     * Defines the mutation data modification closure.
     *
     * @param EEM_Event $model
     * @param Event     $type
     * @return callable
     */
    public static function mutateFields(EEM_Event $model, Event $type)
    {
        /**
         * Update additional data related to the entity.
         *
         * @param int          $id               The ID of the postObject being mutated
         * @param array        $input            The input for the mutation
         * @param WP_Post_Type $post_type_object The Post Type Object for the type of post being mutated
         * @param string       $mutation_name    The name of the mutation (ex: create, update, delete)
         * @param AppContext   $context          The AppContext passed down to all resolvers
         * @param ResolveInfo  $info             The ResolveInfo passed down to all resolvers
         * @return array|void
         */
        return static function (
            $id,
            array $input,
            WP_Post_Type $post_type_object,
            $mutation_name,
            AppContext $context,
            ResolveInfo $info
        ) use (
            $model,
            $type
        ) {
            try {
                // Make sure we are dealing with the right entity.
                if (! property_exists($post_type_object, 'graphql_single_name')
                    || $post_type_object->graphql_single_name !== $type->name()) {
                    return;
                }

                /** @var EE_Event $entity */
                $entity = EntityMutator::getEntityFromID($model, $id);
                $args = EventMutation::prepareFields($input, $mutation_name);

                // Update the entity
                $entity->save($args);
            } catch (Exception $exception) {
                EntityMutator::handleExceptions(
                    $exception,
                    esc_html__(
                        'The datetime could not be updated because of the following error(s)',
                        'event_espresso'
                    )
                );
            }
        };
    }
}
