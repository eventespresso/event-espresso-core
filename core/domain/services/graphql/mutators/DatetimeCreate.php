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
use InvalidArgumentException;
use OutOfBoundsException;
use ReflectionException;
use RuntimeException;
use WPGraphQL\AppContext;

class DatetimeCreate
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
                    throw new UserError(
                        esc_html__('Insufficient Permissions!', 'event_espresso')
                    );
                }

                $tickets = [];

                $args = DatetimeMutation::prepareFields($input);

                if (isset($args['tickets'])) {
                    $tickets = $args['tickets'];
                    unset($args['tickets']);
                }

                $entity = EE_Datetime::new_instance($args);
                $id = $entity->save();
                if (empty($id)) {
                    throw new OutOfBoundsException(
                        esc_html__(
                            'An unknown error occurred. Please check your server\'s error  logs for more information',
                            'event_espresso'
                        )
                    );
                }

                if (! empty($tickets)) {
                    DatetimeMutation::setRelatedTickets($entity, $tickets);
                }
            } catch (Exception $exception) {
                return FormattedError::createFromException(
                    new RuntimeException(
                        sprintf(
                            // translators: %1$s error message
                            esc_html__(
                                'The datetime could not be created because of the following error(s): %1$s',
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
