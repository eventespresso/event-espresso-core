<?php

namespace EventEspresso\core\domain\services\graphql\mutators;

use EEM_Price;
use EE_Price;
use EventEspresso\core\domain\services\graphql\types\Price;

use EE_Error;
use InvalidArgumentException;
use ReflectionException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;

use GraphQL\Type\Definition\ResolveInfo;
use WPGraphQL\AppContext;
use GraphQL\Error\UserError;
use GraphQLRelay\Relay;

class PriceDelete
{

    /**
     * Defines the mutation data modification closure.
     *
     * @param EEM_Price $model
     * @param Price     $type
     * @return callable
     */
    public static function mutateAndGetPayload(EEM_Price $model, Price $type)
    {
        /**
         * Deletes an entity.
         *
         * @param array       $input   The input for the mutation
         * @param AppContext  $context The AppContext passed down to all resolvers
         * @param ResolveInfo $info    The ResolveInfo passed down to all resolvers
         * @return array
         * @throws UserError
         * @throws ReflectionException
         * @throws InvalidArgumentException
         * @throws InvalidInterfaceException
         * @throws InvalidDataTypeException
         * @throws EE_Error
         */
        return static function ($input, AppContext $context, ResolveInfo $info) use ($model, $type) {
            /**
             * Stop now if a user isn't allowed to create an entity.
             */
            if (! current_user_can('ee_edit_events')) {
                // translators: the %1$s is the name of the object being mutated
                throw new UserError(
                    sprintf(
                        esc_html__('Sorry, you are not allowed to edit %1$s', 'event_espresso'),
                        $type->name()
                    )
                );
            }
            $id_parts = ! empty($input['id']) ? Relay::fromGlobalId($input['id']) : null;

            $id = ! empty($id_parts['id']) ? absint($id_parts['id']) : 0;
            $entity = null;

            if ($id) {
                $entity = $model->get_one_by_ID($id);
            }

            /**
             * If there's no existing entity, throw an exception
             */
            if (! $id || ! ($entity instanceof EE_Price)) {
                // translators: the placeholder is the name of the type being updated
                throw new UserError(
                    sprintf(
                        esc_html__('No %1$s could be found to delete', 'event_espresso'),
                        $type->name()
                    )
                );
            }

            // Delete the entity
            $result = ! empty($input['deletePermanently']) ? $entity->delete_permanently() : $entity->delete();

            if (empty($result)) {
                throw new UserError(esc_html__('The object failed to delete but no error was provided', 'event_espresso'));
            }

            return [
                'deleted' => $entity,
            ];
        };
    }
}
