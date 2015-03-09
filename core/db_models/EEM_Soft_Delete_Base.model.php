<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
require_once( EE_MODELS . 'EEM_Base.model.php');
/**
 * EEM_Soft_Delete_Base
 *
 * About this class: modifies parent EEM_Base's behaviour to make usage of soft-deletable models
 * (ie, models that have a flag indicated they've been "soft-deleted"/trashed).
 * Generally, by adding EE_Soft_Delete_where_conditions's conditions, most queries
 * will ignore soft-deleted items. For example, see EEM_Soft_Delete_base::get_all(),
 * which will only fetch non-deleted items from the DB, treating soft-deleted items
 * as if they didn't exist.
 * You may sometimes want to see the soft-deleted items, or pretend the model isn't a soft-deleted item.
 * There are functions with similar names that accomplish this (eg, get_all_deleted() and
 * get_all_deleted_and_undeleted()).
 * Also, when deleting soft-deletable models, their deleted flag is actually just switched.
 * Also notice that you can undo a soft-delete by using restore(), and you can permanently
 * delete an item (normal deletion) by using delete_permanently().
 * Also note: when querying related models that join to this model, this model's
 * default where conditions (ie, to only retrieve non-deleted items) will still apply. Eg
 * if querying EEM_Question::instance()->get_all(array(array('Question_Group.QSG_ID'=>3)),
 * will add WHERE conditions to the mysql query to only find rows that have a question group ID
 * of 3 AND THAT QUESTION GROUP IS NOT DELETED.
 *
 * @package			Event Espresso
 * @subpackage		includes/models/
 * @author				Michael Nelson
 */
abstract class EEM_Soft_Delete_Base extends EEM_Base{

	/**
	 * @param null $timezone
	 */
	protected function __construct($timezone = NULL) {
		require_once( EE_MODELS . 'strategies/EE_Soft_Delete_Where_Conditions.strategy.php');
		if( ! $this->_default_where_conditions_strategy){
			$this->_default_where_conditions_strategy = new EE_Soft_Delete_Where_Conditions();
		}
		parent::__construct($timezone);
	}
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
	 * Overrides parent's 'get_all' to only get undeleted ones. If you REALLY
	 * want to fetch both deleted and undeleted ones, call get_all_deleted_and_undeleted()
	 * For 'soft deletable' models, gets all whicha re not yet deleted.
	 * @param array $query_params like EEM_Base::get_all
	 * @return EE_Soft_Delete_Base_Class[]
	 */
	public function get_all($query_params = array()){
		return parent::get_all($query_params);
	}

	/**
	 *  Gets one item, so long as it's not soft-deleted. If you want to get soft-deleted
	 * items, consider using get_one_deleted() or get_one_deleted_or_undeleted()
	 * @param array $query_params like EEM_Base::get_all's $query_params
	 * @return EE_Soft_Delete_Base_Class
	 */
	public function get_one($query_params = array()){
		return parent::get_one($query_params);
	}
	/**
	 * Gets one item that's been deleted, according to $query_params
	 * @param array $query_params like EEM_Base::get_all's $query_params
	 * @return EE_Soft_Delete_Base_Class
	 */
	public function get_one_deleted($query_params = array()){
		$query_params = $this->_alter_query_params_so_only_trashed_items_included($query_params);
		return parent::get_one($query_params);
	}

	/**
	 * Gets one item from the DB, regardless of whether it's been soft-deleted or not
	 * @param array $query_params like EEM_base::get_all's $query_params
	 * @return EE_Soft_Delete_Base_Class
	 */
	public function get_one_deleted_or_undeleted($query_params = array()){
		$query_params = $this->_alter_query_params_so_deleted_and_undeleted_items_included($query_params);
		return parent::get_one($query_params);
	}

	/**
	 * Unlike many other soft delete functions, get_one_by_ID returns the one item requested, regardless
	 * of whether it's been flagged as deleted or not.
	 * @param mixed $id int/string
	 * @return EE_Soft_Delete_Base_Class
	 */
	public function get_one_by_ID($id) {
		$query_params[0] = array($this->get_primary_key_field()->get_name() => $id);
		return $this->get_one_deleted_or_undeleted($query_params);
	}

	/**
	 * Gets the item indicated by its ID. But if it's soft-deleted, pretends it doesn't exist.
	 * @param int|string $id
	 * @return EE_Soft_Delete_Base_Class
	 */
	public function get_one_by_ID_but_ignore_deleted($id){
		return parent::get_one_by_ID($id);
	}
	/**
	 * counts all NON-SOFT-DELETED items. If you want to include all soft-deleted
	 * items too, consider count_deleted or count_deleted_and_undeleted
	 * @param array $query_params like EEM_Base::get_all's $query_params
	 * @param string $field_to_count
	 * @param boolean $distinct
	 * @return int count
	 */
	public function count($query_params = array(), $field_to_count = null, $distinct = false){
		//just calls parent, but changes PHP docs for this function
		return parent::count($query_params, $field_to_count, $distinct);
	}

	/**
	 * Counts all the deleted/trashed items
	 * @param array $query_params like EEM_Base::get_all
	 * @param string $field_to_count
	 * @param bool 	 $distinct if we want to only count the distinct values for the column then you can trigger that by the setting $distinct to TRUE;
	 * @return int
	 */
	public function count_deleted($query_params = null, $field_to_count = null, $distinct = FALSE){
		$query_params = $this->_alter_query_params_so_only_trashed_items_included($query_params);
		return parent::count($query_params, $field_to_count, $distinct);
	}

	/**
	 * Alters the query params so that only trashed/soft-deleted items are considered
	 * @param array $query_params like EEM_Base::get_all's $query_params
	 * @return array like EEM_Base::get_all's $query_params
	 */
	protected function _alter_query_params_so_only_trashed_items_included($query_params){
		$deletedFlagFieldName=$this->deleted_field_name();
		$query_params[0][$deletedFlagFieldName]=true;
		return $query_params;
	}

	/**
	 * Alters the query params so each item's deleted status is ignored.
	 * @param array $query_params
	 * @return array
	 */
	protected function _alter_query_params_so_deleted_and_undeleted_items_included($query_params){
		$query_params['default_where_conditions'] = 'other_models_only';
		return $query_params;
	}

	/**
	 * Counts all deleeted and undeleted items
	 * @param array $query_params like EEM_Base::get_all
	 * @param string $field_to_count
	 * @param bool 	 $distinct if we want to only count the distinct values for the column then you can trigger that by the setting $distinct to TRUE;
	 * @return int
	 */
	public function count_deleted_and_undeleted($query_params = null, $field_to_count = null, $distinct = FALSE){
		$query_params = $this->_alter_query_params_so_deleted_and_undeleted_items_included($query_params);
		return parent::count($query_params,$field_to_count, $distinct);
	}

	/**
	 * Sums all NON-SOFT-DELETED objects that meet the criteria in $query_params.
	 * @param array $query_params like EEM_Base::get_all's $query_params
	 * @param string $field_to_sum name of field
	 * @return int count
	 */
	public function sum($query_params =null,$field_to_sum= null){
		//just calls parent, but changes PHP doc
		return parent::sum($query_params,$field_to_sum);
	}


	/**
	 * Sum all the deleted items.
	 * @param array $query_params like EEM_Base::get_all
	 * @param string $field_to_sum
	 * @return int
	 */
	public function sum_deleted($query_params = null, $field_to_sum = null){
		$query_params = $this->_alter_query_params_so_only_trashed_items_included($query_params);
		return parent::sum($query_params, $field_to_sum);
	}

	/**
	 * Sums all the deleted and undeleted items.
	 * @param array $query_params lik eEEM_Base::get_all
	 * @param string $field_to_sum
	 * @reutrn int
	 */
	public function sum_deleted_and_undeleted($query_params = null, $field_to_sum = null){
		$query_params = $this->_alter_query_params_so_deleted_and_undeleted_items_included($query_params);
		parent::sum($query_params, $field_to_sum);
	}
	/**
	 * Gets all deleted and undeleted mode objects from the db that meet the criteria, regardless of
	 * whether they've been soft-deleted or not
	 * @param array $query_params like EEM_Base::get_all
	 * @return EE_Soft_Delete_Base_Class[]
	 */
	public function get_all_deleted_and_undeleted($query_params = array()){
		$query_params = $this->_alter_query_params_so_deleted_and_undeleted_items_included($query_params);
		return parent::get_all($query_params);
	}

	/**
	 * For 'soft deletable' models, gets all which ARE deleted, according to conditions specified in $query_params.
	 * @param array $query_params like EEM_Base::get_all
	 * @return EE_Soft_Delete_Base_Class[]
	 */
	public function get_all_deleted($query_params = array()){
		$query_params = $this->_alter_query_params_so_only_trashed_items_included($query_params);
		return parent::get_all($query_params);
	}


	/**
	 * Permanently deletes the selected rows. When selecting rows for deletion, ignores
	 * whether they've been soft-deleted or not. (ie, you don't have to soft-delete objects
	 * before you can permanently delete them).
	 * Because this will cause a real deletion, related models may block this deletion (ie, add an error
	 * and abort the delete)
	 * @param array $query_params like EEM_Base::get_all
	 * @param boolean $allow_blocking if TRUE, matched objects will only be deleted if there is no related model info
	 * that blocks it (ie, there' sno other data that depends on this data); if false, deletes regardless of other objects
	 * which may depend on it. Its generally advisable to always leave this as TRUE, otherwise you could easily corrupt your DB
	 * @return boolean success
	 */
	public function delete_permanently($query_params = array(), $allow_blocking = true){
		$query_params = $this->_alter_query_params_so_deleted_and_undeleted_items_included($query_params);
		return parent::delete($query_params, $allow_blocking);
	}

	/**
	 * Permanently deletes the object given its ID. Ignores whether the item has been soft-deleted or not
	 * @param mixed $ID int or string, depending on the table's primary key type. Because this will
	 * cause a real deletion, related models may block this deletion (ie, add an error
	 * and abort the delete)
	 * @param boolean $allow_blocking if TRUE, matched objects will only be deleted if there is no related model info
	 * that blocks it (ie, there' sno other data that depends on this data); if false, deletes regardless of other objects
	 * which may depend on it. Its generally advisable to always leave this as TRUE, otherwise you could easily corrupt your DB
	 * @return boolean success
	 */
	public function delete_permanently_by_ID($ID=FALSE, $allow_blocking = true){
		$query_params = array();
		$query_params[0] = array($this->get_primary_key_field()->get_name() => $ID);
		$query_params['limit'] = 1;
		return $this->delete_permanently($query_params, $allow_blocking);
	}

	/**
	 * Handles special logic for deleting a single item. Ignores whether the item
	 * has been soft-deletd or not. Note: because this item will be soft-deleted only,
	 * doesn't block because of model dependencies
	 * @param mixed $ID value of the primary_key or primary_text_key
	 * @return boolean success
	 */
	public function delete_by_ID($ID){
		return $this->delete_or_restore_by_ID(true,$ID);
	}
	/**
	 * Restores a particular item by its ID (primary key). Ignores the fact whether the item
	 * has been soft-deleted or not.
	 * @param mixed $ID int if primary key is an int, string otherwise
	 * @return boolean success
	 */
	public function restore_by_ID($ID=FALSE){
		return $this->delete_or_restore_by_ID(false,$ID);
	}
	/**
	 * For deleting or restoring a particular item. Note that this model is a SOFT-DELETABLE model! However,
	 * this function will ignore whether the items have been soft-deleted or not.
	 * @param boolean $delete true for deletem, false for restore
	 * @param mixed $ID int if primary key is an int, string otherwise
	 * @return boolean
	 */
	public function delete_or_restore_by_ID($delete=true,$ID=FALSE){
		if ( ! $ID ) {
			return FALSE;
		}
		$primaryKeyName=$this->primary_key_name();
		// retrieve a particular transaction
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
	 * meet the criteria in $where_col_n_values. This particular function ignores whether the items have been soft-deleted or not.
	 * Note: because this item will be soft-deleted only,
	 * doesn't block because of model dependencies
	 * @param array $query_params like EEM_Base::get_all
	 * @param bool  $block_deletes
	 * @return boolean
	 */
	public function delete($query_params = array(), $block_deletes = false){
		//no matter what, we WON'T block soft deletes.
		return $this->delete_or_restore(true, $query_params);
	}

	/**
	 * 'Undeletes' the chosen items. Note that this model is a SOFT-DELETABLE model! That means that, by default, trashed/soft-deleted
	 * items are ignored in queries. However, this particular function ignores whether the items have been soft-deleted or not.
	 * @param array $query_params like EEM_Base::get_all
	 * @return boolean
	 */
	public function restore($query_params = array()){
		return $this->delete_or_restore(false, $query_params);
	}
	/**
	 * Performs deletes or restores on items. Both soft-deleted and non-soft-deleted items considered.
	 * @param boolean $delete true to indicate deletion, false to indicate restoration
	 * @param array $query_params like EEM_Base::get_all
	 * @return boolean
	 */
	function delete_or_restore($delete=true,$query_params = array()){
		$deletedFlagFieldName=$this->deleted_field_name();
		$query_params = $this->_alter_query_params_so_deleted_and_undeleted_items_included($query_params);
		if ( $this->update (array($deletedFlagFieldName=>$delete), $query_params )) {
			return TRUE;
		} else {
			return FALSE;
		}
	}

	/**
	 * Updates all the items of this model which match the $query params, regardless of whether
	 * they've been soft-deleted or not
	 * @param array $field_n_values like EEM_Base::update's $fields_n_value
	 * @param array $query_params like EEM_base::get_all's $query_params
	 * @param boolean $keep_model_objs_in_sync if TRUE, makes sure we ALSO update model objects
	 * in this model's entity map according to $fields_n_values that match $query_params. This
	 * obviously has some overhead, so you can disable it by setting this to FALSE, but
	 * be aware that model objects being used could get out-of-sync with the database
	 * @return int number of items updated
	 */
	public function update_deleted_and_undeleted($fields_n_values, $query_params, $keep_model_objs_in_sync = TRUE ){
		$query_params = $this->_alter_query_params_so_deleted_and_undeleted_items_included($query_params);
		return $this->update($fields_n_values, $query_params, $keep_model_objs_in_sync );
	}

	/**
	 * Note that this model is a SOFT-DELETABLE model! That means that, by default, trashed/soft-deleted
	 * items are ignored in queries. So for this update, soft-deleted items will be ignroed.
	 * If you want to update soft-deleted items also, use update_deleted_and_undeleted instead.
	 * @param array $fields_n_values like EEM_base::update's $fields_n_values
	 * @param array $query_params like EEM_base::get_all's $query_params
	 * @param boolean $keep_model_objs_in_sync if TRUE, makes sure we ALSO update model objects
	 * in this model's entity map according to $fields_n_values that match $query_params. This
	 * obviously has some overhead, so you can disable it by setting this to FALSE, but
	 * be aware that model objects being used could get out-of-sync with the database
	 * @return int how many items were updated
	 */
	public function update($fields_n_values, $query_params, $keep_model_objs_in_sync = TRUE ){
		return parent::update($fields_n_values,$query_params, $keep_model_objs_in_sync );
	}



}
