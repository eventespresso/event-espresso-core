<?php

namespace EventEspresso\core\services\orm;

use EE_Base_Class;
use EE_Change_Log;
use EE_Error;
use EE_Soft_Delete_Base_Class;
use EEM_Change_Log;
use ReflectionException;

/**
 * Class TrashLogger
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\services\orm
 * @since   4.10.38.p
 */
class TrashLogger
{
    /**
     * extra meta key for tracking when entities are trashed and by who
     *
     * @type string
     */
    const EXTRA_META_KEY_ENTITY_TRASHED = 'entity-trashed';

    /**
     * extra meta key for tracking when entities are restored and by who
     *
     * @type string
     */
    const EXTRA_META_KEY_ENTITY_RESTORED = 'entity-restored';

    /**
     * extra meta key for tracking when entities are deleted and by who
     *
     * @type string
     */
    const EXTRA_META_KEY_ENTITY_DELETED = 'entity-deleted';


    public function __construct()
    {
        add_action('AHEE__EE_Soft_Delete_Base_Class__delete_or_restore__after', [$this, 'logSoftDelete'], 10, 3);
        add_action('AHEE__EE_Base_Class__delete_permanently__end', [$this, 'logHardDelete'], 10, 2);
        add_action(
            'AHEE__Events_Admin_Page___permanently_delete_event__after_event_deleted',
            [$this, 'logBatchDelete'],
            10,
            2
        );
    }


    /**
     * @param EE_Soft_Delete_Base_Class $entity
     * @param bool                      $delete
     * @param bool                      $result
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function logSoftDelete(EE_Soft_Delete_Base_Class $entity, $delete, $result)
    {
        // which base meta key to use... trashed or restored?
        $action = $delete
            ? TrashLogger::EXTRA_META_KEY_ENTITY_TRASHED
            : TrashLogger::EXTRA_META_KEY_ENTITY_RESTORED;

        $entity_class = $this->getEntityClass($entity);
        $this->logDelete($entity->ID(), $entity_class, $action, $result);
    }


    /**
     * @param EE_Base_Class $entity
     * @param bool          $result
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function logHardDelete(EE_Base_Class $entity, $result)
    {
        $entity_class = $this->getEntityClass($entity);
        $this->logDelete($entity->ID(), $entity_class, TrashLogger::EXTRA_META_KEY_ENTITY_DELETED, $result);
    }


    /**
     * @param int|string $entity_ID
     * @param string     $entity_type
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function logBatchDelete($entity_ID, $entity_type)
    {
        $entity_type = str_replace(['EE_', 'EEM_'], '', $entity_type);
        $this->logDelete($entity_ID, $entity_type, TrashLogger::EXTRA_META_KEY_ENTITY_DELETED, true);
    }


    /**
     * converts entity class like 'EE_Registration' to 'registration'
     *
     * @param EE_Base_Class $entity
     * @return string
     */
    private function getEntityClass(EE_Base_Class $entity)
    {
        return str_replace('EE_', '', get_class($entity));
    }


    /**
     * @param string $entity_ID
     * @param string $entity_type
     * @param string $action
     * @param bool   $result
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function logDelete($entity_ID, $entity_type, $action, $result)
    {
        // if trash/restore/delete was not successful, then get out
        if (! $result) {
            return;
        }

        // convert 'entity-deleted' to just 'deleted'
        $action       = str_replace('entity-', '', $action);
        $current_user = wp_get_current_user();
        $user_name    = $current_user->ID ? $current_user->display_name : 'unknown user';
        $timestamp    = date("D M j, Y @ g:i:s a", current_time('timestamp'));

        $log = EE_Change_Log::new_instance(
            [
                'OBJ_ID'      => $entity_ID,
                'OBJ_type'    => $entity_type,
                'LOG_type'    => EEM_Change_Log::type_delete,
                'LOG_message' => "$action by $user_name on $timestamp",
            ]
        );
        $log->save();
    }
}
