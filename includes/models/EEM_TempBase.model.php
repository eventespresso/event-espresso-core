<?php
require_once('EEM_Base.model.php');
abstract class EEM_TempBase extends EEM_Base{
	protected function __construct() {
		$className=$this->_getClassName();
		require_once($className.".class.php");
		$this->class=new $className;

		$this->table_name=$this->class->getTableName();
		$this->table_data_types=$this->class->getTableDataTypes();
	}
	
	/**
	 * Gets the EE class that corresponds to this model. Eg, for EEM_Answer that
	 * would be EE_Answer.To import that class, you'd just add ".class.php" to the name, like so
	 * require_once($this->_getClassName().".class.php");
	 * @return string
	 */
	private function _getClassName(){
		$modelName=get_class($this);
		$className=str_replace("EEM_","EE_",$modelName);
		return $className;
	}
	
	/**
	*		cycle though array of attendees and create objects out of each item
	* 
	* 		@access		private
	* 		@param		array		$attendees		
	*		@return 		mixed		array on success, FALSE on fail
	*/	
	protected function _create_objects( $attendees = FALSE ) {

		if ( ! $attendees ) {
			return FALSE;
		} 		

		foreach ( $attendees as $attendee ) {
				$array_of_objects[ $attendee->ATT_ID ] = 
						call_user_func(array($this,'__construct'),get_object_vars($attendee));
						/*new EE_Attendee(
						$attendee->ATT_fname,
						$attendee->ATT_lname,
						$attendee->ATT_address,
						$attendee->ATT_address2,
						$attendee->ATT_city,
						$attendee->STA_ID,
						$attendee->CNT_ISO,
						$attendee->ATT_zip,
						$attendee->ATT_email,
						$attendee->ATT_phone,
						$attendee->ATT_social,
						$attendee->ATT_comments,
						$attendee->ATT_notes,
						$attendee->ATT_deleted,
						$attendee->ATT_ID
				 	);*/
		}	
		return $array_of_objects;	
	}
	
	
	/**
	 *		This function inserts table data
	 *		
	 *		@access public
	 *		@param array $set_column_values - array of column names and values for the SQL INSERT 
	 *		@return array
	 */	
	public function insert ($set_column_values) {
		// grab data types from above and pass everything to espresso_model (parent model) to perform the update
		return $this->_insert( $this->table_name, $this->table_data_types, $set_column_values );
	}
	
	/**
	 *		This function updates table data
	 *		
	 *		@access public
	 *		@param array $set_column_values - array of column names and values for the SQL SET clause
	 *		@param array $where_cols_n_values - column names and values for the SQL WHERE clause
	 *		@return array
	 */	
	public function update ($set_column_values, $where_cols_n_values) {
		// grab data types from above and pass everything to espresso_model (parent model) to perform the update
		return $this->_update( $this->table_name, $this->table_data_types, $set_column_values, $where_cols_n_values );	
	}
}