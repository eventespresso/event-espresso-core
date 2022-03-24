<?php

namespace EventEspresso\core\domain\services\graphql\mutators;

use EE_Base_Class;
use EE_Error;
use EEM_Base;
use Exception;
use GraphQL\Error\UserError;
use GraphQLRelay\Relay;
use OutOfBoundsException;
use RuntimeException;

/**
 * Class EntityMutator
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\mutators
 * @author  Manzoor Wani
 * @since   $VID:$
 */
abstract class EntityMutator
{
    /**
     * @param EEM_Base $model
     * @param integer  $ID
     * @param string   $capability
     * @return EE_Base_Class
     * @throws OutOfBoundsException
     * @throws UserError
     * @throws EE_Error
     */
    protected static function getEntityFromID(
        EEM_Base $model,
        int $ID,
        string $capability = 'ee_edit_events'
    ): EE_Base_Class {
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
     * @throws EE_Error
     */
    protected static function getEntityFromInputData(
        EEM_Base $model,
        array $input,
        string $capability = 'ee_edit_events'
    ): EE_Base_Class {
        EntityMutator::checkPermissions($model, $capability);

        $primaryKey = $model->get_primary_key_field()->get_name();
        // e.g. "FSC_UUID" will give us "FSC"
        [$keyPrefix] = explode('_', $primaryKey);
        $uuid_field  = $keyPrefix . '_UUID'; // e.g. "FSC_UUID"

        // If the model has UUID field, then we will use that in place of ID.
        $ID = $model->has_field($uuid_field) ? $input['id'] : EntityMutator::getEntityIDFromGlobalId($model, $input);
        return EntityMutator::getEntity($model, $ID);
    }


    /**
     * @param EEM_Base $model
     * @param string   $capability
     * @throws UserError
     */
    protected static function checkPermissions(EEM_Base $model, string $capability = 'ee_edit_events')
    {
        /**
         * Stop now if a user isn't allowed to execute mutation
         */
        if (! current_user_can($capability)) {
            $model_name = $model->get_this_model_name();
            $message    = sprintf(
                esc_html_x(
                    'We\'re sorry but you do not have the required permissions to execute %1$s mutations!',
                    'We\'re sorry but you do not have the required permissions to execute entity(datetime/ticket/etc) mutations!',
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
     */
    protected static function getEntityIDFromGlobalId(EEM_Base $model, array $input): int
    {
        $id_parts = ! empty($input['id']) ? Relay::fromGlobalId($input['id']) : null;
        $id       = ! empty($id_parts['id']) ? absint($id_parts['id']) : 0;
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
     * @param EEM_Base   $model
     * @param int|string $ID
     * @return EE_Base_Class
     * @throws OutOfBoundsException
     * @throws EE_Error
     */
    protected static function getEntity(EEM_Base $model, $ID = 0): EE_Base_Class
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
     */
    protected static function validateResults($results, string $message = '')
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
     * @throws RuntimeException
     */
    protected static function handleExceptions(Exception $exception, string $message_prefix = '')
    {
        $message_prefix = $message_prefix !== ''
            ? $message_prefix
            : esc_html__(
                'The mutation could not be executed because of the following error(s)',
                'event_espresso'
            );
        throw new RuntimeException(
            sprintf('%1$s: %2$s', $message_prefix, $exception->getMessage())
        );
    }
}
