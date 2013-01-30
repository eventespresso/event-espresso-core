<?php
/**
 * @author Mike Nelson
 * Class for handling soft-delete logic (ie, use a column in the DB to indicate deletion of the model, insetad
 * of actually deleting it) EE_{classes}. 
 */
require_once('EE_Base_Class.class.php');
abstract class EE_Soft_Delete_Base_Class extends EE_Base_Class{
	/**
	 * Performs a soft delete fo this object
	 * @return boolean success
	 */
	public function delete(){
		return $this->delete_or_restore(true);
	}
	/**
	 * Performs a restoration (undeletes) this object
	 * @return boolean success
	 */
	public function restore(){
		return $this->delete_or_restore(false);
	}
	/**
	 * Deletes or restores this object.
	 * @param type $delete true=>delete, false=>restore
	 * @return boolean success
	 */
	public function delete_or_restore($delete=true){
		$model=$this->_get_model();
		return $model->delete_or_restore_by_ID($delete,$this->ID());
	}
}