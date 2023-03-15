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
         * @throws InvalidArgumentException
         * @throws InvalidInterfaceException
         * @throws InvalidDataTypeException
         * @throws Exception
         */
        return static function (array $input, AppContext $context, ResolveInfo $info): array {
            /**
             * Stop now if a user isn't allowed to reorder.
             */
            if (! current_user_can('ee_edit_events')) {
                throw new UserError(
                    esc_html__('Sorry, you do not have the required permissions to reorder entities', 'event_espresso')
                );
            }
            $ok = true;
            // 'entities', 'entityGuids', 'entity_db_ids', 'entityType', 'keyPrefix'
            $details = EntityReorder::prepareEntityDetailsFromInput($input);
            $orderKey  = $details['keyPrefix'] . '_order'; // e.g. "TKT_order"

            // We do not want to continue reorder if one fails.
            // Thus wrap whole loop in try-catch
            try {
                foreach ($details['entity_db_ids'] as $order => $entityDbid) {
                    $args = [ $orderKey => $order + 1 ];
                    $ok = $details['entities'][ $entityDbid ]->save($args) ? $ok : false;
                }
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


    /**
     * Prepares entity details to use for mutations
     * input might look something like:
     *  {
     *      'clientMutationId' => 'REORDER_ENTITIES',
     *      'entityIds' => {
     *          'RGF0ZXRpbWU6Mg==',
     *          'RGF0ZXRpbWU6MQ==',
     *      },
     *      'entityType' => 'Datetime',
     *  }
     *
     * @param array $input The input for the mutation
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function prepareEntityDetailsFromInput(array $input): array
    {
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
            throw new UserError(
                esc_html__(
                    'A valid data model could not be obtained. Did you supply a valid entity type?',
                    'event_espresso'
                )
            );
        }

        // convert GUIDs to DB IDs
        $entity_db_ids = array_map(
            function ($entityGuid) {
                $id_parts = Relay::fromGlobalId($entityGuid);
                return ! empty($id_parts['id']) ? absint($id_parts['id']) : 0;
            },
            $entityGuids
        );
        // remove 0 values
        $entity_db_ids = array_filter($entity_db_ids);

        /**
         * If we could not get DB IDs for some GUIDs
         */
        if (count($entity_db_ids) !== count($entityGuids)) {
            throw new UserError(
                esc_html__('Sorry, operation cancelled due to missing or invalid entity IDs.', 'event_espresso')
            );
        }

        // e.g. DTT_ID, TKT_ID
        $primaryKey = $model->get_primary_key_field()->get_name();
        // e.g. "DTT_ID" will give us "DTT"
        $keyPrefix = explode('_', $primaryKey)[0];
        $deletedKey  = $keyPrefix . '_deleted'; // e.g. "TKT_deleted"

        $entities = $model::instance()->get_all([
            [
                $primaryKey => ['IN', $entity_db_ids],
                $deletedKey => ['IN', [true, false]],
            ],
        ]);

        /**
         * If we could not get exactly same number of entities for the given DB IDs
         */
        if (count($entity_db_ids) !== count($entities)) {
            throw new UserError(esc_html__('Sorry, operation cancelled due to missing entities.', 'event_espresso'));
        }

        // Make sure we have an instance for every ID.
        foreach ($entity_db_ids as $entity_db_id) {
            if (isset($entities[ $entity_db_id ]) && $entities[ $entity_db_id ] instanceof EE_Base_Class) {
                continue;
            }
            throw new UserError(esc_html__('Sorry, operation cancelled due to invalid entities.', 'event_espresso'));
        }

        return compact('entities', 'entityGuids', 'entity_db_ids', 'entityType', 'keyPrefix');
    }
}
