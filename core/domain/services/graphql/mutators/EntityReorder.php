<?php

namespace EventEspresso\core\domain\services\graphql\mutators;

use EEM_Datetime;
use EE_Datetime;
use EventEspresso\core\domain\services\graphql\types\Datetime;
use EventEspresso\core\domain\services\graphql\data\mutations\DatetimeMutation;

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

class EntityReorder
{
    /**
     * Defines the mutation data modification closure.
     *
     * @param EEM_Datetime $model
     * @param Datetime     $type
     * @return callable
     */
    public static function mutateAndGetPayload()
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
        return static function ($input, AppContext $context, ResolveInfo $info) {
            /**
         * Stop now if a user isn't allowed to reorder.
         */
            if (! current_user_can('ee_edit_events')) {
                throw new UserError(
                    esc_html__('Sorry, you are not allowed to reorder entities', 'event_espresso')
                );
            }
            // $id_parts = ! empty($input['id']) ? Relay::fromGlobalId($input['id']) : null;

            return [
                'ok' => true,
            ];
        };
    }
}
