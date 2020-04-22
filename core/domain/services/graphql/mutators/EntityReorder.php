<?php

namespace EventEspresso\core\domain\services\graphql\mutators;

use EE_Registry;
use EEM_Base;
use EE_Base_Class;

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

            $entityGuids = ! empty($input['entityIds']) ? array_map('sanitize_text_field', (array) $input['entityIds']) : [];
            $entityType  = ! empty($input['entityType']) ? sanitize_text_field($input['entityType']) : null;

            /**
             * Make sure we have the IDs and entity type
             */
            if (empty($entityGuids) || empty($entityType)) {
                throw new UserError(
                    // translators: the placeholders are the names of the fields
                    sprintf(esc_html__('%1$s and %2$s are required.', 'event_espresso'), 'entityIds', 'entityType')
                );
            }

            $model = EE_Registry::instance()->load_model($entityType);

            if (!($model instanceof EEM_Base)) {
                throw new UserError(esc_html__('Some error occured. Did you supply a valid entity type?', 'event_espresso'));
            }

            // convert GUIDs to DB IDs
            $entityDbids = array_map(function ($entityGuid) {
                $id_parts = Relay::fromGlobalId($entityGuid);
                return ! empty($id_parts['id']) ? absint($id_parts['id']) : 0;
            }, (array) $entityGuids);
            // remove 0 values
            $entityDbids = array_filter($entityDbids);

            /**
             * If we could not get DB IDs for some GUIDs
             */
            if (count($entityDbids) !== count($entityGuids)) {
                throw new UserError(esc_html__('No entities found to update.', 'event_espresso'));
            }

            // e.g. DTT_ID, TKT_ID
            $primaryKey = $model->get_primary_key_field()->get_name();
            // e.g. "DTT_ID" will give us "DTT"
            $keyPrefix = explode('_', $primaryKey)[0];
            $deletedKey  = $keyPrefix . '_deleted'; // e.g. "TKT_deleted"

            $entities = $model::instance()->get_all([
                [
                    $primaryKey => ['IN', $entityDbids],
                    $deletedKey => ['IN', [true, false]],
                ],
            ]);

            /**
             * If we could not get exactly same number of entities for the given DB IDs
             */
            if (count($entityDbids) !== count($entities)) {
                throw new UserError(esc_html__('No entities found to update..', 'event_espresso'));
            }

            // Make sure we have an instance for every ID.
            foreach ($entityDbids as $entityDbid) {
                if (isset($entities[ $entityDbid ]) && $entities[ $entityDbid ] instanceof EE_Base_Class) {
                    continue;
                }
                throw new UserError(esc_html__('No entities found to update...', 'event_espresso'));
            }

            $orderKey  = $keyPrefix . '_order'; // e.g. "TKT_order"

            $ok = false;

            // We do not want to continue reorder if one fails.
            // Thus wrap whole loop in try-catch
            try {
                foreach ($entityDbids as $order => $entityDbid) {
                    $args = [
                        $orderKey => $order + 1,
                    ];
                    $entities[ $entityDbid ]->save($args);
                }
                $ok = true;
            } catch (Exception $exception) {
                new ExceptionStackTraceDisplay(
                    new RuntimeException(
                        sprintf(
                            esc_html__(
                                'Failed to update order because of the following error(s): %1$s',
                                'event_espresso'
                            ),
                            $exception->getMessage()
                        )
                    )
                );
            }

            return compact('ok');
        };
    }
}
