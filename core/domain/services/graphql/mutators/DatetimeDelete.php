<?php

namespace EventEspresso\core\domain\services\graphql\mutators;

use EE_Datetime;
use EEM_Datetime;
use EE_Error;
use EventEspresso\core\domain\services\graphql\types\Datetime;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use Exception;
use GraphQL\Error\FormattedError;
use GraphQL\Error\UserError;
use GraphQL\Type\Definition\ResolveInfo;
use GraphQLRelay\Relay;
use InvalidArgumentException;
use OutOfBoundsException;
use ReflectionException;
use RuntimeException;
use WPGraphQL\AppContext;

class DatetimeDelete
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
            try {
                // Stop now if a user isn't allowed to create a datetime.
                if (! current_user_can('ee_edit_events')) {
                    throw new UserError(
                        esc_html__('Insufficient Permissions!', 'event_espresso')
                    );
                }
                $id_parts = ! empty($input['id']) ? Relay::fromGlobalId($input['id']) : null;

                $id = ! empty($id_parts['id']) ? absint($id_parts['id']) : 0;
                $entity = null;

                if ($id) {
                    $entity = $model->get_one_by_ID($id);
                }

                // If there's no existing datetime, throw an exception
                if (! $id || ! ($entity instanceof EE_Datetime)) {
                    throw new OutOfBoundsException(
                        esc_html__('A valid datetime could not be found in the database.', 'event_espresso')
                    );
                }

                // Delete the entity
                $result = ! empty($input['deletePermanently']) ? $entity->delete_permanently() : $entity->delete();

                if (empty($result)) {
                    throw new RuntimeException(
                        esc_html__(
                            'An unknown error occurred. Please check your server\'s error  logs for more information',
                            'event_espresso'
                        )
                    );
                }
            } catch (Exception $exception) {
                return FormattedError::createFromException(
                    new RuntimeException(
                        // translators: %1$s error message
                        sprintf(
                            esc_html__(
                                'The datetime could not be deleted because of the following error(s): %1$s',
                                'event_espresso'
                            ),
                            $exception->getMessage()
                        )
                    )
                );
            }

            return [
                'deleted' => $entity,
            ];
        };
    }
}
