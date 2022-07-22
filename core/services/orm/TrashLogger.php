<?php

namespace EventEspresso\core\services\orm;

use EE_Base_Class;
use EE_Error;
use EE_Soft_Delete_Base_Class;
use ReflectionException;

/**
 * Class TrashLogger
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\services\orm
 * @since   $VID:$
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
    }


    /**
     * @param EE_Soft_Delete_Base_Class $entity
     * @param bool                      $delete
     * @param bool                      $result
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function logSoftDelete(EE_Soft_Delete_Base_Class $entity, bool $delete, bool $result)
    {
        // which base meta key to use... trashed or restored?
        $action = $delete
            ? TrashLogger::EXTRA_META_KEY_ENTITY_TRASHED
            : TrashLogger::EXTRA_META_KEY_ENTITY_RESTORED;
        $this->logDelete($entity, $action, $result);
    }


    /**
     * @param EE_Base_Class $entity
     * @param bool          $result
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function logHardDelete(EE_Base_Class $entity, bool $result)
    {
        $this->logDelete($entity, TrashLogger::EXTRA_META_KEY_ENTITY_DELETED, $result);
    }


    /**
     * converts entity class like 'EE_Registration' to 'registration'
     *
     * @param EE_Base_Class $entity
     * @return string
     */
    private function getEntityClass(EE_Base_Class $entity): string
    {
        return strtolower(str_replace('EE_', '', get_class($entity)));
    }


    /**
     * @param EE_Base_Class $entity
     * @param string        $action
     * @param bool          $result
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function logDelete(EE_Base_Class $entity, string $action, bool $result)
    {
        // if trash/restore/delete was not successful, then get out
        if (! $result) {
            return;
        }

        // convert 'entity-deleted' to  'registration-deleted'
        $key = str_replace('entity', $this->getEntityClass($entity), $action);

        $current_user = wp_get_current_user();
        $user_name    = $current_user->ID ? $current_user->display_name : 'unknown user';
        $timestamp    = date("D M j, Y @ g:i:s a", current_time('timestamp'));

        $entity->add_extra_meta($key, "by $user_name on $timestamp");
    }
}
