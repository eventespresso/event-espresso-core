<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/*
Plugin Name: 	Event Espresso 
Plugin URI: 		http://eventespresso.com/
Description: 	Out-of-the-box Events Registration integrated with PayPal IPN for your Wordpress blog/website. <a href="admin.php?page=support" >Support</a> 
Version: 			3.2.P
Author: 			Seth Shoultes
Author URI:		http://eventespresso.com
License: 			GPLv2

  Copyright (c) 2011 Event Espresso  All Rights Reserved.

  This program is free software; you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation; either version 2 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program; if not, write to the Free Software
  Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
*/ 
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright			(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	3.2.P
 *
 * ------------------------------------------------------------------------
 *
 * CSV Import Export class
 *
 * @package				Event Espresso
 * @subpackage		includes/functions
 * @author					Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
 class EE_CSV {

  // instance of the EE_CSV object
	private static $_instance = NULL;
 
	
	// multidimensional array to store update & error messages
	var $_notices = array( 'updates' => array(), 'errors' => array() );


	var $_primary_keys = array(
																						EVENTS_ANSWER_TABLE	=> array( 'id' ),
																						EVENTS_ATTENDEE_TABLE	=> array( 'id' ),
																						EVENTS_ATTENDEE_COST_TABLE	=> array( 'attendee_id' ),
																						EVENTS_ATTENDEE_META_TABLE	=> array( 'ameta_id' ),
																						EVENTS_CATEGORY_TABLE	=> array( 'id' ),
																						EVENTS_CATEGORY_REL_TABLE	=> array( 'id' ),
																						'wp_events_certificate_templates' =>  array( 'emeta_id' ),
																						EVENTS_DETAIL_TABLE	=> array( 'id' ),
																						EVENTS_DISCOUNT_CODES_TABLE	=> array( 'id' ),
																						EVENTS_DISCOUNT_REL_TABLE	=> array( 'id' ),
																						EVENTS_EMAIL_TABLE	=> array( 'id' ),
																						'wp_events_groupon_codes' =>  array( 'emeta_id' ),
																						EVENTS_LOCALE_TABLE	=> array( 'id' ),
																						EVENTS_LOCALE_REL_TABLE	=> array( 'id' ),
																						'wp_events_mailchimp_attendee_rel' =>  array( 'id' ),
																						'wp_events_mailchimp_event_rel' =>  array( 'id' ),
																						'wp_events_member_rel' =>  array( 'id' ),
																						'wp_events_meta' =>  array( 'emeta_id' ),
																						EVENTS_MULTI_EVENT_REGISTRATION_ID_GROUP_TABLE	=> array( 'primary_registration_id', 'registration_id' ),
																						EVENTS_PERSONNEL_TABLE	=> array( 'id' ),
																						EVENTS_PERSONNEL_REL_TABLE	=> array( 'id' ),
																						EVENTS_PRICES_TABLE	=> array( 'id' ),
																						EVENTS_QST_GROUP_TABLE	=> array( 'id' ),
																						EVENTS_QST_GROUP_REL_TABLE	=> array( 'id' ),
																						EVENTS_QUESTION_TABLE	=> array( 'id' ),
																						'wp_events_recurrence' =>  array( 'recurrence_id ' ),
																						'wp_events_seating_chart' =>  array( 'id ' ),
																						'wp_events_seating_chart_event' =>  array( 'event_id', 'seating_chart_id' ),
																						'wp_events_seating_chart_event_seat' =>  array( 'id ' ),
																						'wp_events_seating_chart_level_section_alignment' =>  array( 'seating_chart_id ' ),
																						'wp_events_seating_chart_seat' =>  array( 'id ' ),
																						EVENTS_START_END_TABLE	=> array( 'id' ),
																						'wp_events_ticket_templates' =>  array( 'id ' ),
																						EVENTS_VENUE_TABLE	=> array( 'id' ),
																						EVENTS_VENUE_REL_TABLE	=> array( 'id' ),
																						'wp_fbevents_events' =>  array( 'id ' ),
																					);



	/**
	 *		private constructor to prevent direct creation
	 *		@Constructor
	 *		@access private
	 *		@return void
	 */	
  private function __construct() {
	}



	/**
	 *		@ singleton method used to instantiate class object
	 *		@ access public
	 *		@ return class instance
	 */	
	public  function &instance() {
		// check if class object is instantiated
		if ( self::$_instance === NULL  or ! is_object( self::$_instance ) or ! is_a( self::$_instance, __CLASS__ )) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}
	
	

	
	/**
	 *			@Import contents of csv file and store values in an array to be manipulated by other functions
	 *		  @access public
	 *			@param string $path_to_file - the csv file to be imported including the path to it's location
	 *			@param boolean $first_row_is_headers - whether the first row of data is headers or not - TRUE = headers, FALSE = data
	 *			@return mixed - array on success - multi dimensional with headers as keys (if headers exist) OR string on fail - error message
	 */	
	public function import_csv_to_array( $table_list, $path_to_file, $table = FALSE, $first_row_is_headers = TRUE ) {
		
		// first check to see if file exists
		if (file_exists($path_to_file)) { 
		
			// gotta start somewhere
			$row = 1;
			// array to store csv data in
			$csv_data = array();
			// array to store headers (column names)
			$headers = array();
			
			// no tables
			if ( ! $table_list ) {
				// get list of event espresso tables
				$table_list = self::list_db_tables();
			}
	
			// needed to deal with Mac line endings
			ini_set('auto_detect_line_endings',TRUE);

			// because fgetcsv does not correctly deal with backslashed quotes such as \"
			// we'll read the file into a string
			$file_contents = file_get_contents( $path_to_file );
			// replace backslashed quotes with CSV enclosures
			$file_contents = str_replace ( '\\"', '"""', $file_contents );
			// HEY YOU! PUT THAT FILE BACK!!!
			file_put_contents($path_to_file, $file_contents);
	
			// now try to open and read the corrected file
			if (($file_handle = fopen( $path_to_file, "r" )) !== FALSE) {

				// loop through each row of the file
				while (($data = fgetcsv($file_handle, 10000, ',', '"', '\\' )) !== FALSE) {
		
					// if first cell is TABLE, then second cell is the table name
					if ( $data[0]	== 'TABLE' ) {
						$table = $data[1];
						$row = 0;
					}
					
					// how many columns are there?
					$columns = count($data);
					
					// loop through each column
					for ( $i=0; $i < $columns; $i++ ) {
						//replace csv_enclosures with backslashed quotes 
						$data[$i] = str_replace ( '"""', '\\"', $data[$i] );
						// do we need to grab the column names?
						if ( $row === 1 && $first_row_is_headers ) {
							// store the column names to use for keys
							$headers[$i] = $data[$i];
						} else if ( $row === 1 && ! $first_row_is_headers ) {
							// no column names means our final array will just use counters for keys
							$csv_data[$table][$row][$headers[$i]] = $data[$i];
							$headers[$i] = $i;
							// and we need to store csv data
						} else if ( $row ) {
							// no headers just store csv data
							$csv_data[$table][$row][$headers[$i]] = $data[$i];
						}
						
					}
					// advance to next row
					$row++;
					
				}
				// close file connection
				fclose($file_handle);

			} else {
				$this->_notices['errors'][] = 'An error occured - the file: ' . $path_to_file . ' could not opened.';
				return FALSE;
			}
			
			// delete the uploaded file
			unlink($path_to_file);
	
//echo '<h4>csv_data</h4>';
//echo '<pre>';
//echo print_r($csv_data);
//echo '</pre>';
//die();

			// it's good to give back
			return $csv_data;
			
		} else {
			$this->_notices['errors'][] = 'An error occured - could not locate the file: ' . $path_to_file . '.';
			return FALSE;
		}
		
	}
	
	
	/**
	 *			@Save the import contents of a csv file to the db
	 *		  @access public
	 *			@param array $csv_data_array - the array containing the csv data
	 *			@param array $columns_to_save - an array containing the csv column names as keys with the corresponding db table fields they will be saved to
	 *			@return TRUE on success, FALSE on fail
	 */	
	public function save_csv_to_db( $table_list, $csv_data_array, $columns_to_save = FALSE, $table = FALSE ) {

		// somebody told me i might need this ???
		global $wpdb;
		
		// no tables
		if ( ! $table_list ) {
			// get list of event espresso tables
			$table_list = self::list_db_tables();
		}
	
		$total_inserts = 0;
		$total_updates = 0;
		$total_insert_errors = 0;
		$total_update_errors = 0;
		
		// loop through each row of data
		foreach ( $csv_data_array as $table_name => $table_data ) {		
				
			// check for and set table name ?
			if ( in_array( (string)$table_name, $table_list )) {
				// we have a table info in the array
				// our array is three levels deep and all is good
				$table = $table_name;
				// get columns for appropriate table directly from db
				$columns_to_save = $this->list_db_table_fields($table);
			} else if ( $table ) {
				// first level of array is not table information but a table name was passed to the function
				// array is only two levels deep, so let's fix that by adding a level, else the next steps will fail
				$table_data = array( $table_data );
				// if we haven't been passed specific table columns
				if ( ! $columns_to_save ) {
					$columns_to_save = $this->list_db_table_fields($table);
				}
			} else {
				// no table info in the array and no table name passed to the function?? FAIL
				$this->_notices['errors'][] = 'No table information was specified and/or found, therefore the import could not be completed';
				return FALSE;
			}
//echo '<h1>table : ' . $table . '</h1>';
	
			// flip the array so we can check against it's data
			$save_to_columns = array_flip($columns_to_save);
								
			$row_counter = 1;
		
			foreach ( $table_data as $table_row ) {		
		
				// arrays for storing data and data types required by WP insert function
				$data = array();
				$format = array();

				// array to store keys for determining whether to insert new data or update existing data
				$primary_keys = array();

				$col_counter = 1;

//echo '<h3>count(columns_to_save) = ' . count( $columns_to_save ) . '</h3>';
//echo '<h3>count(table_row) = ' . count( $table_row ) . '</h3>';
		
				// loop through each row to determine data types for each column
				foreach ( $table_row as $field_name => $cell_value ) {
	
//echo '<h3> field_name : ' . $field_name . '</h3>';
					// check for blank cells added onto the ends of columns
					if ( $field_name != '' && $field_name != NULL ) {
					
						// check if this csv column is to be saved to the database
						if ( in_array( $field_name, $columns_to_save ) ) {
				
							// test it data type is an int ( %d ) or a string ( %s )
							if (is_numeric($cell_value)) {
								$format[] = '%d';
							} else {
								$format[] = '%s';
							}
							
							// save to the multidimensional array
							$data[$field_name] = $cell_value;
							
	
							if ( isset ( $this->_primary_keys[$table] ) ) {
								// is this column a primary key?
								if ( in_array( $field_name, $this->_primary_keys[$table] )) {
									// store it for use below
									$primary_keys[] = array( $field_name => $cell_value );
								}
							}
			
						} else {
						
							if ( $field_name == '' ) {
								$this->_notices['errors'][] = 'Row ' . $row_counter . ' : Column ' . $col_counter . ' - A column with no title was found in the CSV data for the table ' . $table . ' and could not be saved to the database. Please check your CSV data.';
							} else {
								$this->_notices['errors'][] = 'Row ' . $row_counter . ' : Column ' . $col_counter . ' - The following unknown column ( <strong>'. $field_name .'</strong> ) was found in the CSV data for the table ' . $table . ' and could not be saved to the database. Please check your CSV data.';
							}
							
							$error = TRUE;
						}
						
					}

					$col_counter++;
					
				}

//echo '<h4>this->_primary_keys[$table]</h4>';
//echo '<pre>';
//echo print_r($this->_primary_keys[$table]);
//echo '</pre>';
//
//echo '<h4>primary_keys</h4>';
//echo '<pre>';
//echo print_r($primary_keys);
//echo '</pre>';

				$pkeys = '';
				$where = '';
				$where_array = array();
				$where_format = array();
				$x = 0;
			
				foreach ( $primary_keys as $pkey_values ) {
					foreach ( $pkey_values as $pkey => $val ) {
						$pkeys .= $pkey . ', ';
						$where .= $pkey . ' = ' . $val . ' AND ';
						$where_array[$pkey] = $val;
						$where_format[] = is_int( (int)$val ) ? '%d' : '%s';
						unset( $data[$pkey] );
						unset( $format[$x] );
						$x++;
					}
				}
				
//echo '<h4>data</h4>';
//echo '<pre>';
//echo print_r($data);
//echo '</pre>';
//
//echo '<h4>format</h4>';
//echo '<pre>';
//echo print_r($format);
//echo '</pre>';
//
//echo '<h4>where_array</h4>';
//echo '<pre>';
//echo print_r($where_array);
//echo '</pre>';
//
//echo '<h4>where_format</h4>';
//echo '<pre>';
//echo print_r($where_format);
//echo '</pre>';

//echo '<h3>count(data) = ' . count( $data ) . '</h3>';
//echo '<h3>count(format) = ' . count( $format ) . '</h3>';
//echo '<h3>count(where_array) = ' . count( $where_array ) . '</h3>';
//echo '<h3>count(where_format) = ' . count( $where_format ) . '</h3>';



				// remove last ',' from pkeys string
				$pkeys  = substr($pkeys, 0, -2);
				
				// remove last ' AND ' from where string
				$where  = substr($where, 0, -5);
				
				$query = 'SELECT ' . $pkeys . ' FROM ' . $table . ' WHERE ' . $where;
//echo '<h3> query : ' . $query . '</h3>';
				
				// check if primary key(s) exist in table
				$result = $wpdb->get_results( $wpdb->prepare( $query ));

				if ($wpdb->num_rows > 0) {
//echo '<h3>UPDATE</h3>';
								
					// primary key exists so we are going to do an UPDATE
					$update = $wpdb->update( $table, $data, $where_array, $format, $where_format ); 
//echo $wpdb->last_query;
					
					if ( $update !== FALSE ) {
						$total_updates++;
						$success = TRUE;
					} else {
						$total_update_errors++;
						$error = TRUE;
					}
//echo '<h3> update : ' . $update . '</h3>';
				
				} else {

//echo '<h3>INSERT</h3>';

					// NO primary key exists so INSERT new data
					// we'll use $wpdb->insert from now on, which automagically escapes and sanitizes data for us
					$wpdb->insert( $table, $data, $format );
//echo $wpdb->last_query;

					// if we can't retrieve the insert id then the query failed
					if ( $wpdb->insert_id ) {
						$total_inserts++;
						$success = TRUE;
					} else {
						$total_insert_errors++;
						$error = TRUE;
					}
		
				}
				$row_counter++;
			}
		}
	
//echo '<h3>success 1 - total_updates = '.$total_updates.'</h3>';
//echo '<h3>error 1 - total_update_errors = '.$total_update_errors.'</h3>';
//echo '<h3>success 2 - total_inserts = '.$total_inserts.'</h3>';
//echo '<h3>error 2 - total_insert_errors = '.$total_insert_errors.'</h3>';

			if ( $total_updates > 0 ) {
				$this->_notices['updates'][] = $total_updates . ' existing records in the database were updated.';
				//add_action('admin_notices', array( &$this, 'csv_admin_notices' ) );
			}
			if ( $total_inserts > 0 ) {
				$this->_notices['updates'][] = $total_inserts . ' new records were added to the database.';
				//add_action('admin_notices', array( &$this, 'csv_admin_notices' ) );
			}
			
			if ( $total_update_errors > 0 ) {
				$this->_notices['errors'][] = 'One or more errors occured, and a total of ' . $total_update_errors . ' existing records in the database were <strong>not</strong> updated.';
				//add_action('admin_notices', array( &$this, 'csv_admin_notices' ) );
			}
			if ( $total_insert_errors > 0 ) {
				$this->_notices['errors'][] = 'One or more errors occured, and a total of ' . $total_insert_errors . ' new records were <strong>not</strong> added to the database.';
				//add_action('admin_notices', array( &$this, 'csv_admin_notices' ) );
			}

		// if there was at least one success and absolutely no errors
		if ( $success && ! $error ) {
			return TRUE;
		} else {	
			return FALSE;
		}
			
	}
	
	
	/**
	 *			@Export contents of a database table to csv file
	 *		  @access public
	 *			@param array $table - the database table to be converted to csv and exported 
	 *			@param string $filename - name for newly created csv file
	 *			@param array $prev_export - an array from a previous table export to be merged with these results
	 *			@return TRUE on success, FALSE on fail
	 */	
	public function export_table_to_array ( $table = FALSE, $prev_export = FALSE, $query = FALSE ) {
		
		// no table ?? sorry but's it the law
		if ( ! $table ) {
			return FALSE;
		}
		
		// somebody told me i might need this ???
		global $wpdb;
		
		// create a nicer table name by removing the table prefix
		$prefix = $wpdb->prefix;
		$tablename = str_replace( $prefix, '', $table );
	
		$data = array();		
		// retreive list of field names for the table
		if ( ! $data[$tablename]['HEADINGS'] = self::list_db_table_fields($table) ) {
			return FALSE;
		}	
		
		// no query? then grab everything
		if ( ! $query ) {
			$query = "SELECT * FROM " . $table;
		}
		$result = $wpdb->get_results( $wpdb->prepare( $query ));
		
		if ($wpdb->num_rows > 0) {
			$i = 1;
			foreach ( $result as $row ) {
				foreach ( $row as $column ) {
					// create a multi dimensional array organized by table
					$data[$tablename][$i][] = $column;
				}
				$i++;
			}
		
		} else {
			// no results for you!!! - we do nothing!
		}
		
		// is there an array from a previous export?
		if ( $prev_export && is_array($prev_export) ) {
			$data = array_merge( $prev_export, $data );
		}
		
		return $data;
		
	}
	
	
	/**
	 *			@Export contents of an array to csv file
	 *		  @access public
	 *			@param array $data - the array of data to be converted to csv and exported 
	 *			@param string $filename - name for newly created csv file
	 *			@param boolean $download - whether csv is sent to browser for download or saved to file system - TRUE = download, FALSE = save to file
	 *			@return TRUE on success, FALSE on fail
	 */	
	public function export_array_to_csv( $table_list = FALSE, $data = FALSE, $filename = FALSE  ) {
	
		// no data file?? get outta here
		if ( ! $data or ! is_array( $data ) or empty( $data ) ) {
			return FALSE;
		}
		
		// no filename?? get outta here
		if ( ! $filename ) {
			return FALSE;
		}
		
		// grab file extension
		$ext = substr(strrchr($filename, '.'), 1);
		if ( $ext == '.csv' or  $ext == '.xls' ) {
			str_replace( $ext, '', $filename );
		}
		$filename .= '.csv';
	
		
		// no tables
		if ( ! $table_list ) {
			// get list of event espresso tables
			$table_list = self::list_db_tables();
		}
		
		// somebody told me i might need this ???
		global $wpdb;
		$prefix = $wpdb->prefix;
			
	
		if (ob_get_length()) {
			@ob_flush();
			@flush();
			@ob_end_flush();
		}
		@ob_start();
		header("Pragma: public");
		header("Expires: 0");
		header("Pragma: no-cache");
		header("Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0");
		header("Content-Type: application/force-download");
		header("Content-Type: application/octet-stream");
		header("Content-Type: application/download");
		header('Content-disposition: attachment; filename='.$filename);
		header("Content-Type: text/csv");
	$fh = fopen('php://output', 'w');		
		
		$no_table = TRUE;
	
		// loop through data and add each row to the file/stream as csv
		foreach ( $data as $table_name => $table_data ) {

			$table_name = $prefix . $table_name;
			// test first row to see if it is data or a table name
			if ( in_array( $table_name, $table_list ) ) {
			
				// we have a table name
				$no_table = FALSE;
	
				// put the tablename into an array cuz that's how fputcsv rolls
				$table_name = array( 'TABLE', $table_name );

				// add table name to csv output
				echo self::fputcsv2($fh, $table_name);
	
				// now get the rest of the data
				foreach ( $table_data as $row ) {
					// output the row
					echo self::fputcsv2($fh, $row);
				}
				
			}
				
			if ( $no_table ) {
				// no table so just put the data
				echo self::fputcsv2($fh, $table_data);
			}
		
		} 		//		END OF foreach ( $data )

		fclose($fh);
		exit(0);
	
	}
	
	
	/**
	 *			@Retreive the fieldnames from a database table
	 *		  @access public
	 *			@param array $table - the database table to be converted to csv and exported 
	 *			@param string $filename - name for newly created csv file
	 *			@param boolean $download - whether csv is sent to browser for download or saved to file system - TRUE = download, FALSE = save to file
	 *			@return TRUE on success, FALSE on fail
	 */	
	public function list_db_table_fields ( $table = FALSE ) {
		
		// no table name?? get outta here
		if ( ! $table ) {
			return FALSE;
		}
		
		// somebody told me i might need this ???
		global $wpdb;
		
		$headers = array();		
	
		$sql = "SHOW COLUMNS FROM " . $table;
		$result = $wpdb->get_results($sql);
		if ($wpdb->num_rows > 0) {
			foreach ( $result as $column ) {
				$headers[$column->Field] = $column->Field;
			}
		}
		
		return $headers;
	}
	
	
	/**
	 *			@Retreive a list of all event espresso tables from the database
	 *			@return array on success, FALSE on fail
	 */	
	public function list_db_tables() {
	
		// somebody told me i might need this ???
		global $wpdb;
		
		$prefix = $wpdb->prefix . 'events_%';
		$sql = "select TABLE_NAME from information_schema.tables WHERE TABLE_SCHEMA = '".DB_NAME."' AND TABLE_NAME LIKE '".$prefix."'";
	
		$result = $wpdb->get_col($sql);
		if ($wpdb->num_rows > 0) {
			return $result;
		} else {
			return FALSE;
		}
		
	}
	
	
	/**
	 *			@Determine the maximum upload file size based on php.ini settings
	 *		  @access public
	 *			@param int $percent_of_max - desired percentage of the max upload_mb
	 *			@return int
	 */	
	public function get_max_upload_size ( $percent_of_max = FALSE ) {
	
		$max_upload = (int)(ini_get('upload_max_filesize'));
		$max_post = (int)(ini_get('post_max_size'));
		$memory_limit = (int)(ini_get('memory_limit'));
		
		// determine the smallest of the three values from above
		$upload_mb = min($max_upload, $max_post, $memory_limit);
		
		//convert MB to KB
		$upload_mb = $upload_mb * 1024;
		
		// don't want the full monty? then reduce the max uplaod size
		if ( $percent_of_max ) {
			// is percent_of_max like this -> 50 or like this -> 0.50 ?
			if ( $percent_of_max > 1 ) {
				// chnages 50 to 0.50
				$percent_of_max = $percent_of_max / 100;
			}
			// make upload_mb a percentage of the max upload_mb
			$upload_mb = $upload_mb * $percent_of_max;
		}
		
		return $upload_mb;
	}


	/**
	 *			@Drop in replacement for PHP's fputcsv function - but this one works!!!
	 *		  @access private
	 *			@param resource $fh - file handle - what we are writing to
	 *			@param array $row - individual row of csv data
	 *			@param string $delimiter - csv delimiter
	 *			@param string $enclosure - csv enclosure
	 *			@param string $mysql_null - allows php NULL to be overridden with MySQl's insertable NULL value
	 *			@return void
	 */	
	private function fputcsv2 ($fh, array $row, $delimiter = ',', $enclosure = '"', $mysql_null = FALSE) {
	
		$delimiter_esc = preg_quote($delimiter, '/');
		$enclosure_esc = preg_quote($enclosure, '/');
		
		$output = array();
		foreach ($row as $field) {
			if ($field === null && $mysql_null) {
				$output[] = 'NULL';
				continue;
			}
			
			$output[] = preg_match("/(?:${delimiter_esc}|${enclosure_esc}|\s)/", $field) ?
				( $enclosure . str_replace($enclosure, $enclosure . $enclosure, $field) . $enclosure ) : $field;
		}
		
		fwrite($fh, join($delimiter, $output) . PHP_EOL);
	} 
	




	/**
	 *			@CSV Import / Export messages 
	 *		  @access public
	 *			@return void
	 */	
	public function csv_admin_notices () {
			
		// We play both kinds of music here! Country AND Western! - err... I mean, cycle through both types of notices
		foreach( array('updates', 'errors') as $type ) {
		
			// if particular notice type is not empty, then "You've got Mail"
			if( ! empty( $this->_notices[$type] )) {
			
				// is it an update or an error ?
				$msg_class = $type == 'updates' ? 'updated' : 'error';
				echo '<div id="message" class="'. $msg_class .'">';
				// display each notice, however many that may be
				foreach($this->_notices[$type] as $message) {
					echo '<p>'. $message .'</p>';
				}
				// wrap it up
				echo '</div>';
			}
		}
	}
	
	

}
/* End of file EE_CSV.class.php */
/* Location: //includes/classes/EE_CSV.class.php */
?>