<?php

namespace EventEspresso\core\domain\services\graphql\mutators;

use EE_Base_Class;
use EEM_Base;
use Exception;
use GraphQL\Error\FormattedError;
use GraphQL\Error\UserError;
use GraphQLRelay\Relay;
use OutOfBoundsException;
use RuntimeException;
use Throwable;

/**
 * Class EntityMutator
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\mutators
 * @author  Brent Christensen
 * @since   $VID:$
 */
abstract class EntityMutator
{

    /**
     * @param EEM_Base $model
     * @param integer $ID
     * @param string   $capability
     * @return EE_Base_Class
     * @throws OutOfBoundsException
     * @throws UserError
     * @since $VID:$
     */
    protected static function getEntityFromID(EEM_Base $model, $ID, $capability = 'ee_edit_events')
    {
        EntityMutator::checkPermissions($model, $capability);
        return EntityMutator::getEntity($model, $ID);
    }

    /**
     * @param EEM_Base $model
     * @param array    $input
     * @param string   $capability
     * @return EE_Base_Class
     * @throws OutOfBoundsException
     * @throws UserError
     * @since $VID:$
     */
    protected static function getEntityFromInputData(EEM_Base $model, array $input, $capability = 'ee_edit_events')
    {
        EntityMutator::checkPermissions($model, $capability);
        $ID = EntityMutator::getEntityIDFromGlobalId($model, $input);
        return EntityMutator::getEntity($model, $ID);
    }


    /**
     * @param EEM_Base $model
     * @param string $capability
     * @throws UserError
     * @since $VID:$
     */
    protected static function checkPermissions(EEM_Base $model, $capability = 'ee_edit_events')
    {
        /**
         * Stop now if a user isn't allowed to execute mutation
         */
        if (! current_user_can($capability)) {
            $model_name = $model->get_this_model_name();
            $message = sprintf(
                esc_html_x(
                    'We\'re sorry but you do not have the required permissions to execute %1$s mutations!',
                    'A missing or invalid entity(datetime/ticket/etc) ID was received.',
                    'event_espresso'
                ),
                strtolower($model_name)
            );
            throw new UserError($message);
        }
    }

    /**
     * @param EEM_Base $model
     * @param array    $input
     * @return int
     * @throws OutOfBoundsException
     * @since $VID:$
     */
    protected static function getEntityIDFromGlobalId(EEM_Base $model, array $input) {
        $id_parts = ! empty($input['id']) ? Relay::fromGlobalId($input['id']) : null;
        $id = ! empty($id_parts['id']) ? absint($id_parts['id']) : 0;
        if ($id > 0) {
            return $id;
        }
        // no ID? throw an exception
        $model_name = $model->get_this_model_name();
        throw new OutOfBoundsException(
            sprintf(
                esc_html_x(
                    'A missing or invalid %1$s ID was received.',
                    'A missing or invalid entity(datetime/ticket/etc) ID was received.',
                    'event_espresso'
                ),
                strtolower($model_name)
            )
        );
    }


    /**
     * @param EEM_Base $model
     * @param int      $ID
     * @return EE_Base_Class
     * @throws OutOfBoundsException
     * @since $VID:$
     */
    protected static function getEntity(EEM_Base $model, $ID = 0)
    {
        $entity = $model->get_one_by_ID($ID);
        $model_name = $model->get_this_model_name();
        $class_name = 'EE_' . $model_name;
        if ($entity instanceof $class_name) {
            return $entity;
        }
        // OOPS!!! invalid entity
        throw new OutOfBoundsException(
            sprintf(
                esc_html_x(
                    'A valid %1$s could not be retrieved from the database.',
                    'A valid entity(datetime/ticket/etc) could not be found in the database.',
                    'event_espresso'
                ),
                strtolower($model_name)
            )
        );
    }


    /**
     * @param        $results
     * @param string $message
     * @throws RuntimeException
     * @since $VID:$
     */
    protected static function validateResults($results, $message = '')
    {
        if (empty($results)) {
            $message = $message !== ''
                ? $message
                : esc_html__(
                    'An unknown error occurred. Please check your server\'s error  logs for more information',
                    'event_espresso'
                );
            throw new RuntimeException($message);
        }
    }


    /**
     * @param Exception $exception
     * @param string    $message_prefix
     * @return array
     * @throws Throwable
     * @since $VID:$
     */
    protected static function FormatException(Exception $exception, $message_prefix = '')
    {
        $message_prefix = $message_prefix !== ''
            ? $message_prefix
            : esc_html__(
                'The mutation could not be executed because of the following error(s)',
                'event_espresso'
            );
        return FormattedError::createFromException(
            new RuntimeException(
                sprintf('%1$s: %2$s',$message_prefix, $exception->getMessage())
            )
        );
    }
}