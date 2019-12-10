<?php

namespace EventEspresso\core\domain\services\graphql\mutators;

use EEM_Price;
use EE_Price;
use EventEspresso\core\domain\services\graphql\types\Price;
use EventEspresso\core\domain\services\graphql\data\mutations\PriceMutation;

use EE_Error;
use EventEspresso\core\exceptions\ExceptionStackTraceDisplay;
use Exception;
use InvalidArgumentException;
use ReflectionException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;

use GraphQL\Type\Definition\ResolveInfo;
use RuntimeException;
use WPGraphQL\AppContext;
use GraphQL\Error\UserError;
use GraphQLRelay\Relay;

class PriceUpdate
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
         * Updates an entity.
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
                    sprintf(esc_html__('Sorry, you are not allowed to edit %1$s', 'event_espresso'), $type->name())
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
                    sprintf(esc_html__('No %1$s could be found to update', 'event_espresso'), $type->name())
                );
            }

            $args = PriceMutation::prepareFields($input);

            // Update the entity
            try {
                $entity->save($args);
            } catch (Exception $exception) {
                new ExceptionStackTraceDisplay(
                    new RuntimeException(
                        sprintf(
                            esc_html__(
                                'The Price failed to update because of the following error(s):%1$s%2$s',
                                'event_espresso'
                            ),
                            '<br/>',
                            $exception->getMessage()
                        )
                    )
                );
            }

            return [
                'id' => $id,
            ];
        };
    }
}
