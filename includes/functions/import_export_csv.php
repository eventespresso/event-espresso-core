<?php
/**
 *			@Import contents of csv file and store values in an array to be manipulated by other functions
 *			@param string $path_to_file - the csv file to be imported including the path to it's location
 *			@param boolean $first_row_is_headers - whether the first row of data is headers or not - TRUE = headers, FALSE = data
 *			@return array - multi dimensional with headers as keys (if headers exist)
 */	
function espresso_import_csv_to_array( $path_to_file, $first_row_is_headers = TRUE ) {
	
	// first check to see if file exists
	if (file_exists($path_to_file)) { 
	
		// gotta start somewhere
		$row = 1;
		// array to store csv data in
		$csv_data = array();
		// array to store headers (column names)
		$headers = array();
		
		// try to open and read file
		if (($handle = fopen( $path_to_file, "r" )) !== FALSE) {
		
			// loop through each row of the file
			while (($data = fgetcsv($handle, 1000000, ",")) !== FALSE) {
			
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
						$csv_data[$row][$headers[$i]] = $data[$i];
					} else {
						// no headers just store csv data
						$csv_data[$row][$headers[$i]] = $data[$i];
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
 *			@param array $csv_data_array - the array containing the csv data
 *			@param array $columns_to_save - an array containing the csv column names as keys with the corresponding db table fields they will be saved to
 *			@return TRUE on success, FALSE on epic fails
 */	
function espresso_save_csv_to_db( $csv_data_array, $columns_to_save, $table ) {

	// somebody told me i might need this ???
	global $wpdb;
	
	$error = FALSE;
	// flip the array so we can check against it's data
	$save_to_columns = array_flip($columns_to_save);
							
	// loop through each row of data
	foreach ( $csv_data_array as $outerkey => $innerdata ) {		
	
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
				
				$data[$save_to_columns[$innerkey]] = $value;

			}
		}

		// if $data exists for row insert it into the database separately
		// we'll use $wpdb->insert from now on, which automagically escapes and sanitizes data for us
		$wpdb->insert( $table, $data, $format );

		// if we can't retrieve the insert id then the query failed
		if ( ! $wpdb->insert_id ) {
			$error = TRUE;
		}
		
	}
		
	if ( $error ) {
		return FALSE;
	} else {	
		return TRUE;
	}
		
}

function espresso_get_max_upload_size ( $divisor = FALSE ) {
 
 $max_upload = (int)(ini_get('upload_max_filesize'));
 $max_post = (int)(ini_get('post_max_size'));
 $memory_limit = (int)(ini_get('memory_limit'));
 $upload_mb = min($max_upload, $max_post, $memory_limit);
 
 if ( $divisor ) {
  $upload_mb = $upload_mb / $divisor;
 }
 
 return $upload_mb;
}