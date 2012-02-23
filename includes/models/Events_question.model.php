<?php 
if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/* 
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license				http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link						http://www.eventespresso.com
 * @ version		 	3.1.P.7
 *
 * ------------------------------------------------------------------------
 *
 * Events Question Model
 * 
 *
 * @package				Event Espresso
 * @subpackage		mvc-models
 * @author					Brent Christensen 
 * @table 						wp_events_question
 *
 * ------------------------------------------------------------------------
 */
class Events_question extends espresso_model {
	
	protected $table_name = EVENTS_QUESTION_TABLE;

	// array representation of wp_events_question table and the data types for each field 
	protected $table_data_types = array (	
			'id' 										=> '%d', 	
			'event_id' 					=> '%d', 	
			'sequence' 					=> '%d', 	
			'question_type' 	=> '%s', 	 	
			'question' 					=> '%s', 	 	
			'system_name'		=> '%s', 	 
			'response' 					=> '%s',
			'required' 					=> '%s',
			'required_text' 		=> '%s',
			'admin_only' 			=> '%s', 
			'wp_user' 					=> '%d'
		);

						
						
/**
 *		@Constructor
 *		@public private
 *		@return void
 */	
  public function __construct() {	
// uncomment these for example code samples of how to use them
//			self::how_to_use_insert();
//			self::how_to_use_update();
	}
		








	
/**
 *		This function returns list of event relevant questions from the wp_events_question table
 *
 *		example: 
 *
 *		Used within the following files: edit_attendee_record.php
 *		
 *		@access public
 *		@param array - $question_group_id_list - list of question group ids
 *		@return array
 */	
	public function get_questions_with_group_names ( $question_group_ids = FALSE, $extra_where = FALSE ) {
		global $wpdb;
		$wpdb->show_errors();
		$wpdb->flush();
		if ( $question_group_ids ) {
			$question_group_id_list = parent::array_to_csv( $question_group_ids );
			// if an array was returned that means there was an error !!!
			if ( is_array($question_group_id_list) ) {
				return $question_group_id_list; 
			}
		} else {
			// no question group ids?? 
			$question_group_id_list = FALSE;
		}
		
		$SQL = 'SELECT q.*, q.id q_id';

		if ( $question_group_id_list ) {
			$SQL .= ', qg.group_name, qg.show_group_description, qg.show_group_name';
		}

		if ( $extra_where ) {
			$SQL .= ', at.*';
		}

		$SQL .= ' FROM '.$this->table_name.' AS q ';
		
		$data_types = '';
		$VALS = '';
		
		if ( $extra_where ) {
			$SQL .= 'LEFT JOIN ' .  EVENTS_ANSWER_TABLE . ' AS at ON q.id = at.question_id ';
		}
		
		if ( $question_group_id_list ) {
			$SQL .= 'JOIN ' . EVENTS_QST_GROUP_REL_TABLE . ' AS qgr ON q.id = qgr.question_id ';
			$SQL .= 'JOIN ' . EVENTS_QST_GROUP_TABLE . ' AS qg ON qg.id = qgr.group_id ';
			
			// to find the number of $question group ids, we'll explode the list and count the items
			$q_groups = explode( ',', $question_group_id_list );
			$q_group_nmbr = count($q_groups);
			
			for ( $x = 0; $x < $q_group_nmbr; $x++ ) {
				// add to the data type
				$data_types .= '%d, ';
			}
			$data_types = substr( $data_types, 0, -2 );
			
			$SQL .= 'WHERE qgr.group_id IN (' . $data_types. ') ';
			$VALS .= $question_group_id_list . ', ';
			
		}
		
		if ( $extra_where ) {
			foreach ( $extra_where as $extra => $value ) {
				$SQL .= 'AND ' . $extra . ' ';
				$VALS .= $value. ', ';
			}
		}
		
		$SQL .= 'ORDER BY ';
		if ( $question_group_id_list ) {
			$SQL .= 'qg.id, ';
		}
		$SQL .= 'q.sequence ASC';
		
		$VALS = substr( $VALS, 0, -2 );
		
		echo 'SQL : ' . $SQL . '<br />';
		echo 'VALS : ' . $VALS . '<br />';

		$SQL = 'SELECT q.*, q.id q_id, at.*, qg.group_name, qg.show_group_description, qg.show_group_name FROM wp_events_question q LEFT JOIN wp_events_answer at on q.id = at.question_id JOIN wp_events_qst_group_rel qgr on q.id = qgr.question_id JOIN wp_events_qst_group qg on qg.id = qgr.group_id WHERE qgr.group_id in (1, 2) AND (at.attendee_id IS NULL OR at.attendee_id = 1) ORDER BY qg.id, q.id ASC';
		$result = $wpdb->get_results( $wpdb->prepare( $SQL, $VALS ));
		
		echo  __CLASS__.'->'.__FUNCTION__ .' = ' . $wpdb->last_query . '<br />';
		echo '<h4>result</h4>';
echo '<pre>';
echo print_r($result);
echo '</pre>';
die();


		return $result;
	}




//SELECT q.*, qg.* 
//
//FROM wp_events_question AS q 
//
//JOIN wp_events_qst_group_rel AS qgr ON q.id = qgr.question_id 
//JOIN wp_events_qst_group AS qg ON qg.id = qgr.group_id 
//
//WHERE qgr.group_id IN (%d, %d) 
//AND at.attendee_id IS NULL 
//OR at.attendee_id = %d 
//
//ORDER BY qg.id, q.sequence ASC
//
//SELECT q.*, q.id q_id, at.*, qg.group_name, qg.show_group_description, qg.show_group_name FROM wp_events_question q LEFT JOIN wp_events_answer at on q.id = at.question_id JOIN wp_events_qst_group_rel qgr on q.id = qgr.question_id JOIN wp_events_qst_group qg on qg.id = qgr.group_id WHERE qgr.group_id in (1, 2) AND (at.attendee_id IS NULL OR at.attendee_id = 1) ORDER BY qg.id, q.id ASC
//
//
//SELECT q.*, q.id q_id, at.*, qg.group_name, qg.show_group_description, qg.show_group_name FROM wp_events_question q JOIN wp_events_qst_group_rel qgr on q.id = qgr.question_id JOIN wp_events_qst_group qg on qg.id = qgr.group_id WHERE qgr.group_id in (%d, %d) AND (at.attendee_id IS NULL OR at.attendee_id = %d) ORDER BY qg.id, q.id ASC







/*
 *		This function returns multiple rows from a table
 * 		SELECT * FROM table_name ORDER BY column_name(s) ASC|DESC
 *		
 *		@access public
 *		@param mixed (string, array) - $orderby - cloumn names to be used for sorting 
 *		@param mixed (string, array) - $sort - ASC or DESC
 *		@param string - $output - WP output types - OBJECT, OBJECT_K, ARRAY_A, ARRAY_N 
 *		@return mixed (object, array)
 */
	public function select_all ( $orderby=FALSE, $sort=FALSE, $output='OBJECT_K' ) {
		$results = parent::eedb_select_all ( $this->table_name, $orderby, $sort, $output );
		return $results;
}





/**
 *		This function returns multiple rows from a table
 * 		SELECT * FROM table_name WHERE column_name operator value ORDER BY column_name(s) ASC|DESC
 *		
 *		@access public
 *		@param mixed (string, array) - $where - cloumn names to be used for WHERE clause 
 *		@param mixed (string, array) - $where_value - values to be used for WHERE clause  
 *		@param mixed (string, array) - $orderby - cloumn names to be used for sorting 
 *		@param string - $sort - ASC or DESC
 *		@param mixed (string, array) - $operator -  operator to be used for WHERE clause  > = < 
 *		@param string - $output - WP output types - OBJECT, OBJECT_K, ARRAY_A, ARRAY_N 
 *		@return mixed (object, array)
 */	
	public function select_all_where ( $where=FALSE, $where_value=FALSE, $orderby = FALSE, $sort = 'ASC', $operator = '=', $output = 'OBJECT_K' ) {
		$results = parent::eedb_select_all_where ( $this->table_name, $this->table_data_types, $where, $where_value, $orderby, $sort, $operator, $output );
		return $results;
}





/**
 *		This function returns one row from from a table
 * 		SELECT * FROM table_name WHERE column_name operator value
 *		
 *		@access public
 *		@param mixed (string, array) - $where - cloumn names to be used for WHERE clause 
 *		@param mixed (string, array) - $where_value - values to be used for WHERE clause  
 *		@param mixed (string, array) - $operator -  operator to be used for WHERE clause  > = < 
 *		@param string - $output - WP output types - OBJECT, OBJECT_K, ARRAY_A, ARRAY_N 
 *		@return mixed (object, array)
 */	
	public function select_row_where ( $where=FALSE, $where_value=FALSE, $operator = '=', $output = 'OBJECT_K' ) {
		$results = parent::eedb_select_row_where ( $this->table_name, $this->table_data_types, $where, $where_value, $operator, $output );
		return $results;
}





/**
 *		This function returns one value from from a table
 * 		SELECT column_name(s) FROM table_name WHERE column_name = value
 *		
 *		@access public
 *		@param string - $select - column name to be used for SELECT clause 
 *		@param mixed (string, array) - $where - column names to be used for WHERE clause 
 *		@param mixed (string, array) - $where_value - values to be used for WHERE clause  
 *		@param mixed (string, array) - $operator -  operator to be used for WHERE clause  > = < 
 *		@return mixed (object, array)
 */	
	public function select_value_where ( $select=FALSE, $where=FALSE, $where_value=FALSE, $operator = '=' ) {
		$results = parent::eedb_select_value_where ( $this->table_name, $this->table_data_types, $select, $where, $where_value, $operator );
		return $results;
}





/**
 *		This function returns an array of key => value pairs from from a table
 * 		SELECT * FROM table_name ORDER BY column_name(s) ASC|DESC
 *		
 *		@access public
 *		@param string - $key - column name to be used as the key for the returned array 
 *		@param string - $value - column name to be used as the value for the returned array 
 *		@param mixed (string, array) - $orderby - cloumn names to be used for sorting 
 *		@param string - $sort - ASC or DESC
 *		@return array - key => value 
 */	
	public function get_key_value_array ( $key=FALSE, $value=FALSE, $orderby = FALSE, $sort = 'ASC', $output = 'OBJECT_K' ) {
		$results = parent::eedb_get_key_value_array ( $this->table_name, $this->table_data_types, $key, $value, $orderby, $sort, $output );
		return $results;
}





/**
 *		This function returns an array of key => value pairs from from a table
 * 		SELECT * FROM table_name WHERE column_name operator value ORDER BY column_name(s) ASC|DESC
 *		
 *		@access public
 *		@param string - $key - column name to be used as the key for the returned array 
 *		@param string - $value - column name to be used as the value for the returned array 
 *		@param mixed (string, array) - $where - column names to be used for WHERE clause 
 *		@param mixed (string, array) - $where_value - values to be used for WHERE clause  
 *		@param mixed (string, array) - $orderby - cloumn names to be used for sorting 
 *		@param string - $sort - ASC or DESC
 *		@param mixed (string, array) - $operator -  operator to be used for WHERE clause  > = < 
 *		@return array - key => value 
 */	
	public function get_key_value_array_where( $key=FALSE, $value=FALSE, $where=FALSE, $where_value=FALSE, $orderby=FALSE, $sort='ASC', $operator='=' ) {
		$results = parent::eedb_get_key_value_array_where ( $this->table_name, $this->table_data_types, $key, $value, $where, $where_value, $orderby, $sort, $operator );
		return $results;
}










/**
 *		This function inserts table data
 *		
 *		@access public
 *		@param array $set_column_values - array of column names and values for the SQL INSERT 
 *		@return array
 */	
	public function insert ($set_column_values) {
		
		//$this->display_vars( __FUNCTION__, array( 'set_column_values' => $set_column_values ) );
			
		// grab data types from above and pass everything to espresso_model (parent model) to perform the update
		$results = parent::eedb_update( $this->table_name, $this->table_data_types, $set_column_values );
	
		// set some table specific success messages
		if ( $results['rows'] == 1 ) {
			// one row was successfully updated
			$results['msg'] = 'Question details have been successfully saved to the database.';
		} elseif ( $results['rows'] > 1 ) {
			// multiple rows were successfully updated
			$results['msg'] = 'Details for '.$results.' questions have been successfully saved to the database.';
		} else {
			// error message 
			$results['msg'] = 'An error occured and the question details have not been saved to the database.';
		}
	
		return $results;
	
	}










/**
 *		This function updates table data
 *		
 *		@access public
 *		@param array $set_column_values - array of column names and values for the SQL SET clause
 *		@param array $where - column names and values for the SQL WHERE clause
 *		@return array
 */	
	public function update ($set_column_values, $where) {
	
		//$this->display_vars( __FUNCTION__, array( 'set_column_values' => $set_column_values, 'where' => $where ) );
			
		// grab data types from above and pass everything to espresso_model (parent model) to perform the update
		$results = parent::eedb_update( $this->table_name, $this->table_data_types, $set_column_values, $where );
	
		// set some table specific success messages
		if ( $results['rows'] == 1 ) {
			// one row was successfully updated
			$results['msg'] = 'Question details have been successfully updated.';
		} elseif ( $results['rows'] > 1 ) {
			// multiple rows were successfully updated
			$results['msg'] = 'Details for '.$results.' questions have been successfully updated.';
		} else {
			// error message 
			$results['msg'] = 'An error occured and the question details have not been updated.';
		}
	
		return $results;
	
	}
	
	
	
	
	
	
	
	
	
/**
 *		This function will delete a row from a table 
 *		
 *		@access protected
 *		@param string - $table_name - 
 *		@param array - $em_table_data_types
 *		@param mixed (string, array) - $where - cloumn names to be used for WHERE clause 
 *		@param mixed (string, array) - $where_value - values to be used for WHERE clause  
 *		@param mixed (string, array) - $operator -  operator to be used for WHERE clause  > = < 
 *		@return mixed (object, array)
 */	
	protected function eedb_delete ( $where=FALSE, $where_value=FALSE, $operator = '=' ) {
		// grab data types from above and pass everything to espresso_model (parent model) to perform the update
		$results = parent::eedb_update( $this->table_name, $this->table_data_types, $where, $where_value, $operator );
		return $results;
	}
	
	
	
	
	
	
	
	
	
	
/**
 *		@ create error code from filepath, function name, 
 *		@ and line number where exception was thrown
 *		@ param string $file
 *		@ param string $func
 *		@ param string $line
 *		@ return string
 */	
	public function check_results_for_errors ( $results, $file, $func, $line ) {

		if ( is_array( $results )) {
			$results['line_no'] = parent::eedb_get_error_code (  $file, $func, $line );
			return $results;
		} else {
			return FALSE;
		}
		
	}










		public function how_to_use_insert() {
			echo '
<h2>Cut and paste the following into your code:</h2>
<pre>
	// array of column names and values for the SQL INSERT... VALUES clause
	$set_column_values = array(
					\'key\' => \'value\',
					\'key\' => $value,
				);
	// model function to perform error checking and then run update
	$action_results = $question_model->insert ($set_column_values);
</pre>
';
			die();
		}





		public function how_to_use_update() {
			echo '
<h2>Cut and paste the following into your code:</h2>
<pre>
	// array of column names and values for the SQL SET clause
	$set_column_values = array(
					\'key\' => \'value\',
					\'key\' => $value,
				);
	// array of column names and values for the SQL WHERE clause
	$where = array(
					\'key\' => \'value\',
					\'key\' => $value,
				);
	// model function to perform error checking and then run update
	$action_results = $question_model->update ($set_column_values, $where);
</pre>
';
			die();
		}





	private function display_vars( $method, $vars_array ) {
	
		echo '<h1>Class: '.get_class($this).'</h1>';
		echo '<h2>Method: '.$method.'</h2>';
		echo '<h3>TABLE : ' . $this->table_name . '</h3>';
		
		foreach ( $vars_array as $var => $var_array ) {
			echo '<h4> ' . $this->table_name . ' '.$var.'</h4>';
			echo '<pre>';
			echo print_r($var_array);
			echo '</pre>';
		}
		die();
	}


}
// End of file Events_question.model.php
// Location: /ee-mvc/models/Events_question.model.php