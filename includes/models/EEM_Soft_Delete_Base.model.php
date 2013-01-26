<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of EEM_Soft_Delete_Base
 *
 * @author mnelson4
 */
require_once('EEM_TempBase.model.php');
class EEM_Soft_Delete_Base extends EEM_TempBase{
	/**
	 * Searches for field on this model of type 'deleted_flag'. if it is found,
	 * returns it's name.
	 * @return string
	 * @throws EE_Error
	 */
	public function deleted_field_name(){
		return $this->_get_field_of_types(array('deleted_flag'));
	}
	
	/**
	 * Overrides parent's 'get_all_where' to only got undeleted ones. If you REALLY
	 * want to fetch both deleted and undeleted ones, call get_all_where_deleted_and_undeleted()
	 * For 'soft deletable' models, gets all whicha re not yet deleted.
	 * NOTE get_all() calls get_all_where(), so get_all() is also filtered to only return undeleted model objects.
	 * If you want all deleted and undeleted model objects, call get_all_deleted_and_undeleted()
	 * @param array $where_cols_n_values keys are column names, values are column values
	 * @param string $orderby name of a column
	 * @param string $sort 'ASC' or 'DESC'
	 * @param mixed $operators string for a single operator, or an array of operators
	 * @param string $limit
	 * @return mixed EE_Base_Class is output='OBJECT_K', int is output='count'
	 */
	public function get_all_where($where_cols_n_values,$orderby=null,$sort='ASC',$operators='=',$limit=null,$output='OBJECT_K'){
		$deletedFlagFieldName=$this->deleted_field_name();
		$where_cols_n_values[$deletedFlagFieldName]=false;
		return parent::get_all_where($where_cols_n_values,$orderby,$sort,$operators,$limit,$output);
	}
	
	public function get_all($orderby=null,$sort='ASC',$limit=null,$output='OBJECT_K'){
		return $this->get_all_where(array(),$orderby,$sort,'=',$limit,$output);
	}
	/**
	 * Gets all deleted and undeleted mode objects from teh db taht meet the criteria.
	 * @param array $where_cols_n_values keys are column names, values are column values
	 * @param string $orderby name of a column
	 * @param string $sort 'ASC' or 'DESC'
	 * @param mixed $operators string for a single operator, or an array of operators
	 * @param string $limit
	 * @return mixed EE_Base_Class is output='OBJECT_K', int is output='count'
	 */
	public function get_all_where_deleted_and_undeleted($where_cols_n_values,$orderby=null,$sort='ASC',$operators='',$limit=null,$output='OBJECT_K'){
		return parent::get_all_where($where_cols_n_values,$orderby,$sort,$operators,$limit,$output);
	}
	
	/**
	*		retreive  ALL objects of this model from db, regardless of whether they've been deletd or not
	* 
	* 		@access		public
	*		@return mixed EE_Base_Class is output='OBJECT_K', int is output='count'
	*/	
	public function get_all_deleted_and_undeleted( $orderby = null, $order = 'ASC',$limit=array(0,10),$output='OBJECT_K' ) {
		return $this->get_all_where_deleted_and_undeleted ( 
				array(),
				$orderby, 
				$order, 
				'=', 
				$limit,
				$output
			);
	}
	
	/**
	 * For 'soft deletable' models, gets all which ARE deleted, according to some conditions.
	 * @param array $where_cols_n_values keys are column names, values are column values
	 * @param string $orderby name of a column
	 * @param string $sort 'ASC' or 'DESC'
	 * @param mixed $operators string for a single operator, or an array of operators
	 * @param string $limit
	 * @return mixed EE_Base_Class is output='OBJECT_K', int is output='count'
	 */
	public function get_all_where_deleted($where_cols_n_values,$orderby=null,$sort='ASC',$operators='=',$limit=null,$output='OBJECT_K'){
		$deletedFlagFieldName=$this->deleted_field_name();
		$where_cols_n_values[$deletedFlagFieldName]=true;	
		return parent::get_all_where($where_cols_n_values,$orderby,$sort,$operators,$limit,$output);
	}
	
	/**
	 * 
	 * For 'soft deletable' models, gets all which ARE deleted.
	 * @param array $where_cols_n_values keys are column names, values are column values
	 * @param string $orderby name of a column
	 * @param string $sort 'ASC' or 'DESC'
	 * @param mixed $operators string for a single operator, or an array of operators
	 * @param string $limit
	 * @return mixed EE_Base_Class is output='OBJECT_K', int is output='count'
	 */
	public function get_all_deleted($orderby=null,$sort='asc',$limit=null,$output='OBJECT_K'){
		return get_all_where_deleted(array(),$orderby,$sort,'=',$limit,$output);
	}
	
	/**
	 * Handles special logic for deleting a single item
	 * @param mixed $ID value of the primary_key or primary_text_key
	 * @return boolean success
	 */
	public function delete_by_ID($ID=FALSE){
		if ( ! $ID ) {
			return FALSE;
		}
		$primaryKeyName=$this->primary_key_name();
		$deletedFlagFieldName=$this->deleted_field_name();
		// retreive a particular transaction
		$where_cols_n_values = array( $primaryKeyName => $ID );
		if ( $this->update (array($deletedFlagFieldName=>true), $where_cols_n_values )) {
			return TRUE;
		} else {
			return FALSE;
		}
	}
	/**
	 * Overrides parent's 'delete' method to instead do a soft delete on all rows that 
	 * meet the criteria in $where_col_n_values
	 * @param array $where_col_n_values
	 * @param mixed $operator string or array of strings
	 * @return boolean success
	 */
	public function delete($where_col_n_values=FALSE,$operator='='){
		if ( ! $where_col_n_values ) {
			return FALSE;
		}
		$deletedFlagFieldName=$this->deleted_field_name();
		if ( $this->update (array($deletedFlagFieldName=>true), $where_cols_n_values )) {
			return TRUE;
		} else {
			return FALSE;
		}
	}
}

?>
