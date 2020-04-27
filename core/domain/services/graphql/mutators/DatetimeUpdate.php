<?php

namespace EventEspresso\core\domain\services\graphql\mutators;

use EE_Datetime;
use EEM_Datetime;
use EE_Error;
use EventEspresso\core\domain\services\graphql\types\Datetime;
use EventEspresso\core\domain\services\graphql\data\mutations\DatetimeMutation;
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

class DatetimeUpdate
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
         * @throws UserError
         * @throws ReflectionException
         * @throws InvalidArgumentException
         * @throws InvalidInterfaceException
         * @throws InvalidDataTypeException
         * @throws EE_Error
         */
        return static function ($input, AppContext $context, ResolveInfo $info) use ($model, $type) {

            try {
                /**
                 * Stop now if a user isn't allowed to create a datetime.
                 */
                if (! current_user_can('ee_edit_events')) {
                    // translators: the %1$s is the name of the object being mutated
                    throw new UserError(
                        sprintf(
                            esc_html__('Insufficient Permissions!', 'event_espresso'),
                            $type->name()
                        )
                    );
                }
                $id_parts = ! empty($input['id']) ? Relay::fromGlobalId($input['id']) : null;

                $id = ! empty($id_parts['id']) ? absint($id_parts['id']) : 0;
                $entity = null;

                if ($id) {
                    $entity = $model->get_one_by_ID($id);
                    $id = $entity->ID();
                }

                /**
                 * If there's no existing datetime, throw an exception
                 */
                if (! $id || ! ($entity instanceof EE_Datetime)) {
                    throw new OutOfBoundsException(
                        esc_html__('A valid datetime could not be found in the database.', 'event_espresso')
                    );
                }

                $tickets = [];
                $args = DatetimeMutation::prepareFields($input);

                if (isset($args['tickets'])) {
                    $tickets = $args['tickets'];
                    unset($args['tickets']);
                }

                // Update the entity
                $entity->save($args);

                if ($id && ! empty($tickets)) {
                    DatetimeMutation::setRelatedTickets($entity, $tickets);
                }
            } catch (Exception $exception) {

                return FormattedError::createFromException(
                    new RuntimeException(
                        sprintf(
                            // translators: %1$s error message
                            esc_html__(
                                'The Datetime failed to update because of the following error(s): %1$s',
                                'event_espresso'
                            ),
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
