<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * Description of EEM_Soft_Delete_Base
 *
 * @package			Event Espresso
 * @subpackage		includes/models/
 * @author				Michael Nelson
 *
 * ------------------------------------------------------------------------
 */
require_once('EEM_Base.model.php');
class EEM_Soft_Delete_Base extends EEM_Base{
	/**
	 * Searches for field on this model of type 'deleted_flag'. if it is found,
	 * returns it's name.
	 * @return string
	 * @throws EE_Error
	 */
	public function deleted_field_name(){
		$field = $this->get_a_field_of_type('EE_Trashed_Flag_Field');
		if($field){
			return $field->get_name();
		}else{
			throw new EE_Error(sprintf(__('We are trying to find the deleted flag field on %s, but none was found. Are you sure there is a field of type EE_Trashed_Flag_Field in %s constructor?','event_espresso'),get_class($this),get_class($this)));
		}
	}
	
	/**
	 * Overrides parent's 'get_all_where' to only got undeleted ones. If you REALLY
	 * want to fetch both deleted and undeleted ones, call get_all_where_deleted_and_undeleted()
	 * For 'soft deletable' models, gets all whicha re not yet deleted.
	 * NOTE get_all() calls get_all_where(), so get_all() is also filtered to only return undeleted model objects.
	 * If you want all deleted and undeleted model objects, call get_all_deleted_and_undeleted()
	 * @param array $query_params like EEM_Base::get_all
	 * @return EE_Base_Class
	 */	
	public function get_all($query_params = array()){
		$deletedFlagFieldName=$this->deleted_field_name();
		$query_params[0][$deletedFlagFieldName]=false;
		return parent::get_all($query_params);
	}
	
	/**
	 * Count all the undeleted items.
	 * @param array $query_params like EEM_Base::get_all
	 * @param string $field_to_count
	 * @return int
	 */
	public function count($query_params = null, $field_to_count = null){
		$deletedFlagFieldName=$this->deleted_field_name();
		$query_params[0][$deletedFlagFieldName]=false;
		return parent::count($query_params, $field_to_count);
	}
	/**
	 * Counts all the deleted/trashed items
	 * @param array $query_params like EEM_Base::get_all
	 * @param string $field_to_count
	 * @return int
	 */
	public function count_deleted($query_params = null, $field_to_count = null){
		$deletedFlagFieldName=$this->deleted_field_name();
		$query_params[0][$deletedFlagFieldName]=true;
		return parent::count($query_params, $field_to_count);
	}
	
	/**
	 * Counts all deleeted and undeleted items
	 * @param array $query_params like EEM_Base::get_all
	 * @param string $field_to_count
	 * @return int
	 */
	public function count_deleted_and_undeleted($query_params = null, $field_to_count = null){
		return parent::count($query_params,$field_to_count);
	}
	
	
	/**
	 * Sum all the undeleted items.
	 * @param array $query_params like EEM_Base::get_all
	 * @param string $field_to_sum
	 * @return int
	 */
	public function sum($query_params = null, $field_to_sum = null){
		$deletedFlagFieldName=$this->deleted_field_name();
		$query_params[0][$deletedFlagFieldName]=false;
		return parent::sum($query_params, $field_to_sum);
	}
	
	
	/**
	 * Sum all the deleted items.
	 * @param array $query_params like EEM_Base::get_all
	 * @param string $field_to_sum
	 * @return int
	 */
	public function sum_deleted($query_params = null, $field_to_sum = null){
		$deletedFlagFieldName=$this->deleted_field_name();
		$query_params[0][$deletedFlagFieldName]=true;
		return parent::sum($query_params, $field_to_sum);
	}
	
	/**
	 * Sums all the deleted and undeleted items.
	 * @param array $query_params lik eEEM_Base::get_all
	 * @param string $field_to_sum
	 * @reutrn int
	 */
	public function sum_deleted_and_undeleted($query_params = null, $field_to_sum = null){
		parent::sum($query_params, $field_to_sum);
	}
	/**
	 * Gets all deleted and undeleted mode objects from teh db taht meet the criteria.
	 * @param array $query_params like EEM_Base::get_all
	 * @return EE_Base_Class
	 */
	public function get_all_deleted_and_undeleted($query_params = array()){
		return parent::get_all($query_params);
	}
	
	/**
	 * For 'soft deletable' models, gets all which ARE deleted, according to some conditions.
	 * @param array $query_params like EEM_Base::get_all
	 * @return EE_Base_Class
	 */
	public function get_all_deleted($query_params = array()){
		$deletedFlagFieldName=$this->deleted_field_name();
		$query_params[0][$deletedFlagFieldName]=true;
		return parent::get_all($query_params);
	}
	
	
	/**
	 * Permanently deletes teh selected rows
	 * @param array $query_params like EEM_Base::get_all
	 * @return boolean success
	 */
	public function delete_permanently($query_params = array()){
		return parent::delete($query_params);
	}
	
	/**
	 * Permanently deletes the object given its ID
	 * @param mixed $ID int or string, depending on the table's primary key type
	 * @return boolean success
	 */
	public function delete_permanently_by_ID($ID=FALSE){
		if ( ! $ID ) {
			return FALSE;
		}
		return parent::delete_by_ID($ID);
	}
	
	/**
	 * Handles special logic for deleting a single item
	 * @param mixed $ID value of the primary_key or primary_text_key
	 * @return boolean success
	 */
	public function delete_by_ID($ID=FALSE){
		return $this->delete_or_restore_by_ID(true,$ID);
	}
	/**
	 * Restores a particular item by its ID (primary key)
	 * @param mixed $ID int if primary key is an int, string otherwise
	 * @return boolean success
	 */
	public function restore_by_ID($ID=FALSE){
		return $this->delete_or_restore_by_ID(false,$ID);
	}
	/**
	 * For deleting or restoring a particular item.
	 * @param boolean $delete true for deletem, false for restore
	 * @param mixed $ID int if primary key is an int, string otherwise
	 * @return boolean success
	 */
	public function delete_or_restore_by_ID($delete=true,$ID=FALSE){
		if ( ! $ID ) {
			return FALSE;
		}
		$primaryKeyName=$this->primary_key_name();
		// retreive a particular transaction
		$query_params = array();
		$query_params[0] = array( $primaryKeyName => $ID );
		if ( $this->delete_or_restore ($delete, $query_params )) {
			return TRUE;
		} else {
			return FALSE;
		}
	}
	/**
	 * Overrides parent's 'delete' method to instead do a soft delete on all rows that 
	 * meet the criteria in $where_col_n_values
	 * @param array $query_params like EEM_Base::get_all
	 * @return boolean success
	 */
	public function delete($query_params = array()){
		return $this->delete_or_restore(true, $query_params);
	}
	
	/**
	 * 'Undeletes' the chosen items.
	 * @param array $query_params like EEM_Base::get_all
	 * @return type
	 */
	public function restore($query_params = array()){
		return $this->delete_or_restore(false, $query_params);
	}
	/**
	 * Performs deletes or restores on items.
	 * @param boolean $delete true to indicate deletion, false to indicate restoration
	 * @param array $query_params like EEM_Base::get_all
	 * @return boolean success
	 */
	function delete_or_restore($delete=true,$query_params = array()){
		if ( ! $query_params ) {
			return FALSE;
		}
		$deletedFlagFieldName=$this->deleted_field_name();
		if ( $this->update (array($deletedFlagFieldName=>$delete), $query_params )) {
			return TRUE;
		} else {
			return FALSE;
		}
	}
}
