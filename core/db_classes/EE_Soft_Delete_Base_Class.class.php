<?php

/**
 * EE_Soft_Delete_Base_Class
 * Class for handling soft-delete logic (ie, use a column in the DB to indicate deletion of the model, instead of
 * actually deleting it) EE_{classes}.
 *
 * @package               Event Espresso
 * @subpackage            includes/classes/EE_Answer.class.php
 * @author                Mike Nelson
 */
abstract class EE_Soft_Delete_Base_Class extends EE_Base_Class
{
    /**
     * Overrides parent _delete() so that we do soft deletes.
     *
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _delete()
    {
        return $this->delete_or_restore();
    }


    /**
     * Deletes or restores this object.
     *
     * @param bool $delete true=>delete, false=>restore
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function delete_or_restore($delete = true)
    {
        /**
         * Called just before trashing (soft delete) or restoring a trashed item.
         *
         * @param EE_Base_Class $model_object about to be trashed or restored
         * @param bool          $delete       true the item is being trashed, false the item is being restored.
         */
        do_action('AHEE__EE_Soft_Delete_Base_Class__delete_or_restore__before', $this, $delete);
        $model = $this->get_model();
        $result = $model->delete_or_restore_by_ID($delete, $this->ID());
        /**
         * Called just after trashing (soft delete) or restoring a trashed item.
         *
         * @param EE_Base_Class $model_object that was just trashed or restored.
         * @param bool          $delete       true the item is being trashed, false the item is being restored.
         * @param bool|int      $result
         */
        do_action('AHEE__EE_Soft_Delete_Base_Class__delete_or_restore__after', $this, $delete, $result);
        return $result;
    }


    /**
     * Performs a restoration (un-deletes) this object
     *
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function restore()
    {
        return $this->delete_or_restore(false);
    }
}
