<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');  
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
 class CSVIO {

  // instance of the CSVIO object
	private static $_instance = NULL;
 
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
	
			// try to open and read file
			if (($handle = fopen( $path_to_file, "r" )) !== FALSE) {
			
				// loop through each row of the file
				while (($data = fgetcsv($handle, 10000, ",")) !== FALSE) {
		
					if ( $data[0]	== 'TABLE' ) {
						$table = $data[1];
						$row = 0;
					}
					
					// how many columns are there?
					$columns = count($data);
					
					// loop through each column
					for ( $i=0; $i < $columns; $i++ ) {
					
						// do we need to grab the column names?
						if ( $row === 1 && $first_row_is_headers ) {
							// store the column names to use for keys
							$headers[$i] = $data[$i];
						} else if ( $row === 1 && ! $first_row_is_headers ) {
							// no column names means our final array will just use counters for keys
							$headers[$i] = $i;
							// and we need to store csv data
							$csv_data[$table][$row][$headers[$i]] = $data[$i];
						} else if ( $row ) {
							// no headers just store csv data
							$csv_data[$table][$row][$headers[$i]] = $data[$i];
						}
						
					}
					// advance to next row
					$row++;
					
				}
				// close file connection
				fclose($handle);
				
			} else {
				$error = "error - could not open the file : $path_to_file";
				return $error;
			}
			
			// delete the uploaded file
			unlink($path_to_file);
	
			// it's good to give back
			return $csv_data;
			
		} else {
			$error = "error - could not locate the file : $path_to_file";
			return $error;
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
	
		$success = FALSE;
		$error = FALSE;
		
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
				return FALSE;
			}
	
			// flip the array so we can check against it's data
			$save_to_columns = array_flip($columns_to_save);
								
			foreach ( $table_data as $outerkey => $innerdata ) {		
		
				// array for storing data and data types required by WP insert function
				$data = array();
				$format = array();
				
				// loop through each row to determine data types for each column
				foreach ( $innerdata as $innerkey => $value ) {
	
					// check if this csv column is to be saved to the database
					if ( in_array( $innerkey, $columns_to_save ) ) {
			
						// test it data type is an int ( %d ) or a string ( %s )
						if (is_numeric($value)) {
							$format[] = '%d';
						} else {
							$format[] = '%s';
						}
						
						// save to the multidimensional array
						$data[$innerkey] = $value;
		
					} else {
						$error = TRUE;
					}
					
				}

				// if $data exists for row insert it into the database separately
				// we'll use $wpdb->insert from now on, which automagically escapes and sanitizes data for us
				$wpdb->insert( $table, $data, $format );
		
				// if we can't retrieve the insert id then the query failed
				if ( $wpdb->insert_id ) {
					$success = TRUE;
				} else {
					$error = TRUE;
				}
				
			}
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
		// retreive list of fieldnames for the table
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
    $fp = fopen('php://output', 'w');		
		
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
				echo self::fputcsv2($fp, $table_name);
	
				// now get the rest of the data
				foreach ( $table_data as $row ) {
					// output the row
					echo self::fputcsv2($fp, $row);
				}
				
			}
				
			if ( $no_table ) {
				// no table so just put the data
				echo self::fputcsv2($fp, $table_data);
			}
		
		} 		//		END OF foreach ( $data )

		fclose($fp);
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
	

}
/* End of file csv_io.class.php */
/* Location: /includes/functions/csv_io.class.php */
?>