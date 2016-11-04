<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * CSV Import Export class
 *
 * For dealing with CSV files directly. For exports/reports, it would generally
 * be preferred to use EventEspressoBatchRequest\BatchRequestProcessor and
 * EEH_Export to create csv files on the server and then direct the user to download them
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
//	var $_notices = array( 'updates' => array(), 'errors' => array() );


	private $_primary_keys;

	/**
	 *
	 * @var EE_Registry
	 */
	private $EE;
	/**
	 * string used for 1st cell in exports, which indicates that the following 2 rows will be metadata keys and values
	 */
	const metadata_header = 'Event Espresso Export Meta Data';
	/**
	 *		private constructor to prevent direct creation
	 *		@Constructor
	 *		@access private
	 *		@return void
	 */
 	private function __construct() {


		global $wpdb;

		$this->_primary_keys = array(
				$wpdb->prefix . 'esp_answer' => array( 'ANS_ID' ),
				$wpdb->prefix . 'esp_attendee' => array( 'ATT_ID' ),
				$wpdb->prefix . 'esp_datetime'	=> array( 'DTT_ID' ),
				$wpdb->prefix . 'esp_event_question_group'	=> array( 'EQG_ID' ),
				$wpdb->prefix . 'esp_message_template'	=> array( 'MTP_ID' ),
				$wpdb->prefix . 'esp_payment'	=> array( 'PAY_ID' ),
				$wpdb->prefix . 'esp_price'	=> array( 'PRC_ID' ),
				$wpdb->prefix . 'esp_price_type'	=> array( 'PRT_ID' ),
				$wpdb->prefix . 'esp_question'	=> array( 'QST_ID' ),
				$wpdb->prefix . 'esp_question_group'	=> array( 'QSG_ID' ),
				$wpdb->prefix . 'esp_question_group_question'	=> array( 'QGQ_ID' ),
				$wpdb->prefix . 'esp_question_option'	=> array( 'QSO_ID' ),
				$wpdb->prefix . 'esp_registration'	=> array( 'REG_ID' ),
				$wpdb->prefix . 'esp_status'	=> array( 'STS_ID' ),
				$wpdb->prefix . 'esp_transaction'	=> array( 'TXN_ID' ),
				$wpdb->prefix . 'esp_transaction'	=> array( 'TXN_ID' ),
				$wpdb->prefix . 'events_detail'	=> array( 'id' ),
				$wpdb->prefix . 'events_category_detail'	=> array( 'id' ),
				$wpdb->prefix . 'events_category_rel'	=> array( 'id' ),
				$wpdb->prefix . 'events_venue'	=> array( 'id' ),
				$wpdb->prefix . 'events_venue_rel' =>  array( 'emeta_id' ),
				$wpdb->prefix . 'events_locale'	=> array( 'id' ),
				$wpdb->prefix . 'events_locale_rel'	=> array( 'id' ),
				$wpdb->prefix . 'events_personnel' =>  array( 'id' ),
				$wpdb->prefix . 'events_personnel_rel' =>  array( 'id' ),
			);

	}



	/**
	 *		@ singleton method used to instantiate class object
	 *		@ access public
	 *		@return EE_CSV
	 */
	public static function instance ( ) {
		// check if class object is instantiated
		if ( self::$_instance === NULL  or ! is_object( self::$_instance ) or ! ( self::$_instance instanceof EE_CSV )) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	/**
	 * Opens a unicode or utf file (normal file_get_contents has difficulty readin ga unicode file. @see http://stackoverflow.com/questions/15092764/how-to-read-unicode-text-file-in-php
	 * @param string $file_path
	 * @return string
	 * @throws EE_Error
	 */
	private function read_unicode_file($file_path){
		$fc = "";
		$fh = fopen($file_path,"rb");
		if( ! $fh ){
			throw new EE_Error( sprintf( __("Cannot open file for read: %s<br>\n", 'event_espresso'), $file_path ) );
		}
		$flen = filesize($file_path);
		$bc = fread($fh, $flen);
		for ($i=0; $i<$flen; $i++){
			$c = substr($bc,$i,1);
			if ((ord($c) != 0) && (ord($c) != 13)){
			  $fc = $fc . $c;
			}
		}
		if ((ord(substr($fc,0,1)) == 255) && (ord(substr($fc,1,1)) == 254))
		$fc = substr($fc,2);
		return ($fc);
}


	/**
	 * Generic CSV-functionality to turn an entire CSV file into a single array that's
	 * NOT in a specific format to EE. It's just a 2-level array, with top-level arrays
	 * representing each row in the CSV file, and the second-level arrays being each column in that row
	 * @param string $path_to_file
	 * @return array of arrays. Top-level array has rows, second-level array has each item
	 */
	public function import_csv_to_multi_dimensional_array($path_to_file){
		// needed to deal with Mac line endings
		ini_set('auto_detect_line_endings',TRUE);

		// because fgetcsv does not correctly deal with backslashed quotes such as \"
		// we'll read the file into a string
		$file_contents = $this->read_unicode_file( $path_to_file );
		// replace backslashed quotes with CSV enclosures
		$file_contents = str_replace ( '\\"', '"""', $file_contents );
		// HEY YOU! PUT THAT FILE BACK!!!
		file_put_contents($path_to_file, $file_contents);

		if (($file_handle = fopen($path_to_file, "r")) !== FALSE) {
			# Set the parent multidimensional array key to 0.
			$nn = 0;
			$csvarray = array();

			// in PHP 5.3 fgetcsv accepts a 5th parameter, but the pre 5.3 versions of fgetcsv choke if passed more than 4 - is that crazy or what?
			if ( version_compare( PHP_VERSION, '5.3.0' ) < 0 ) {

				//  PHP 5.2- version

				// loop through each row of the file
				while(($data = fgetcsv($file_handle, 0, ',', '"' )) !== FALSE){
					$csvarray[]= $data;
				}
			}else{
				// loop through each row of the file
				while (( $data = fgetcsv( $file_handle, 0, ',', '"', '\\' )) !== FALSE ) {
					$csvarray[]=$data;
				}
			}
			# Close the File.
			fclose($file_handle);
			return $csvarray;
		}else{
			EE_Error::add_error( sprintf(__("An error occurred - the file: %s could not opened.", "event_espresso"),$path_to_file), __FILE__, __FUNCTION__, __LINE__ );
			return false;
		}
	}


	/**
	 *			@Import contents of csv file and store values in an array to be manipulated by other functions
	 *		  @access public
	 *			@param string $path_to_file - the csv file to be imported including the path to it's location.
	 *			If $model_name is provided, assumes that each row in the CSV represents a model object for that model
	 *			If $model_name ISN'T provided, assumes that before model object data, there is a row where the first entry is simply
	 *			'MODEL', and next entry is the model's name, (untranslated) like Event, and then maybe a row of headers, and then the model data.
	 *			Eg. '<br>MODEL,Event,<br>EVT_ID,EVT_name,...<br>1,Monkey Party,...<br>2,Llamarama,...<br>MODEL,Venue,<br>VNU_ID,VNU_name<br>1,The Forest
	 *			@param string $model_name model name if we know what model we're importing
	 *			@param boolean $first_row_is_headers - whether the first row of data is headers or not - TRUE = headers, FALSE = data
	 *			@return mixed - array on success - multi dimensional with headers as keys (if headers exist) OR string on fail - error message
	 * like the following array('Event'=>array(
	 *								array('EVT_ID'=>1,'EVT_name'=>'bob party',...),
	 *								array('EVT_ID'=>2,'EVT_name'=>'llamarama',...),
	 *								...
	 *							)
	 *							'Venue'=>array(
	 *								array('VNU_ID'=>1,'VNU_name'=>'the shack',...),
	 *								array('VNU_ID'=>2,'VNU_name'=>'tree house',...),
	 *								...
	 *							)
	 *						...
	 *						)
	 */
	public function import_csv_to_model_data_array( $path_to_file, $model_name = FALSE, $first_row_is_headers = TRUE ) {
		$multi_dimensional_array = $this->import_csv_to_multi_dimensional_array($path_to_file);
		if( ! $multi_dimensional_array ){
			return false;
		}
		// gotta start somewhere
		$row = 1;
		// array to store csv data in
		$ee_formatted_data = array();
		// array to store headers (column names)
		$headers = array();
		foreach($multi_dimensional_array as $data){
			// if first cell is MODEL, then second cell is the MODEL name
			if ( $data[0]	== 'MODEL' ) {
				$model_name = $data[1];
				//don't bother looking for model data in this row. The rest of this
				//row should be blank
				//AND pretend this is the first row again
				$row = 1;
				//reset headers
				$headers = array();
				continue;
			}
			if( strpos( $data[0], EE_CSV::metadata_header ) !==FALSE ){
				$model_name = EE_CSV::metadata_header;
				//store like model data, we just won't try importing it etc.
				$row = 1;
				continue;
			}


			// how many columns are there?
			$columns = count($data);

			$model_entry = array();
			// loop through each column
			for ( $i=0; $i < $columns; $i++ ) {

				//replace csv_enclosures with backslashed quotes
				$data[$i] = str_replace ( '"""', '\\"', $data[$i] );
				// do we need to grab the column names?
				if ( $row === 1){
					if( $first_row_is_headers ) {
						// store the column names to use for keys
						$column_name = $data[$i];
						//check it's not blank... sometimes CSV editign programs adda bunch of empty columns onto the end...
						if(!$column_name){continue;}
						$matches = array();
						if($model_name == EE_CSV::metadata_header){
							$headers[$i] = $column_name;
						}else{
							//now get the db table name from it (the part between square brackets)
							$success = preg_match('~(.*)\[(.*)\]~', $column_name,$matches);
							if (!$success){
								EE_Error::add_error( sprintf(__("The column titled %s is invalid for importing. It must be be in the format of 'Nice Name[model_field_name]' in row %s", "event_espresso"),$column_name,implode(",",$data)), __FILE__, __FUNCTION__, __LINE__ );
								return false;
							}
							$headers[$i] = $matches[2];
						}

					}else{
						// no column names means our final array will just use counters for keys
						$model_entry[$headers[$i]] = $data[$i];
						$headers[$i] = $i;
					}
					// and we need to store csv data
				} else {
					// this column isn' ta header, store it if there is a header for it
					if(isset($headers[$i])){
						$model_entry[$headers[$i]] = $data[$i];
					}
				}

			}
			//save the row's data IF it's a non-header-row
			if( ! $first_row_is_headers || ($first_row_is_headers && $row > 1)){
				$ee_formatted_data[$model_name][] = $model_entry;
			}
			// advance to next row
			$row++;

		}

		// delete the uploaded file
		unlink($path_to_file);
//echo '<pre style="height:auto;border:2px solid lightblue;">' . print_r( $ee_formatted_data, TRUE ) . '</pre><br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>';
//die();

		// it's good to give back
		return $ee_formatted_data;

	}


	public function save_csv_to_db( $csv_data_array, $model_name = FALSE ) {
		EE_Error::doing_it_wrong('save_csv_to_db', __( 'Function moved to EE_Import and renamed to save_csv_data_array_to_db', 'event_espresso' ), '4.6.7' );
		return EE_Import::instance()->save_csv_data_array_to_db( $csv_data_array, $model_name );
	}

	/**
	 * Sends HTTP headers to indicate that the browser should download a file,
	 * and starts writing the file to PHP's output. Returns the file handle so other functions can
	 * also write to it
	 * @param string $new_filename the name of the file that the user will download
	 * @return resource, like the results of fopen(), which can be used for fwrite, fputcsv2, etc.
	 */
	public function begin_sending_csv($filename){
		// grab file extension
		$ext = substr(strrchr($filename, '.'), 1);
		if ( $ext == '.csv' or  $ext == '.xls' ) {
			str_replace( $ext, '', $filename );
		}
		$filename .= '.csv';

		//if somebody's been naughty and already started outputting stuff, trash it
		//and start writing our stuff.
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
//		header("Content-Type: application/force-download");
//		header("Content-Type: application/octet-stream");
//		header("Content-Type: application/download");
		header('Content-disposition: attachment; filename='.$filename);
		header("Content-Type: text/csv; charset=utf-8");
                do_action( 'AHEE__EE_CSV__begin_sending_csv__headers' );
		echo apply_filters('FHEE__EE_CSV__begin_sending_csv__start_writing', "\xEF\xBB\xBF" ); // makes excel open it as UTF-8. UTF-8 BOM, see http://stackoverflow.com/a/4440143/2773835
		$fh = fopen('php://output', 'w');
		return $fh;
	}

	/**
	 * Writes some meta data to the CSV as a bunch of columns. Initially we're only
	 * mentioning the version and timezone
	 * @param resource $filehandle
	 */
	public function write_metadata_to_csv($filehandle){
		$data_row = array(EE_CSV::metadata_header);//do NOT translate because this exact string is used when importing
		$this->fputcsv2($filehandle, $data_row);
		$meta_data = array( 0=> array(
			'version'=>espresso_version(),
			'timezone'=>  EEH_DTT_Helper::get_timezone(),
			'time_of_export'=>current_time('mysql'),
			'site_url'=>site_url()));
		$this->write_data_array_to_csv($filehandle, $meta_data);
	}



	/**
	 * Writes $data to the csv file open in $filehandle. uses the array indices of $data for column headers
	 * @param array $data 2D array, first numerically-indexed, and next-level-down preferably indexed by string
	 * @param boolean $add_csv_column_names whether or not we should add the keys in the bottom-most array as a row for headers in the CSV.
	 * Eg, if $data looked like array(0=>array('EVT_ID'=>1,'EVT_name'=>'monkey'...), 1=>array(...),...))
	 * then the first row we'd write to the CSV would be "EVT_ID,EVT_name,..."
	 * @return boolean if we successfully wrote to the CSV or not. If there's no $data, we consider that a success (because we wrote everything there was...nothing)
	 */
	public function write_data_array_to_csv($filehandle, $data){


		//determine if $data is actually a 2d array
		if ( $data && is_array($data) && is_array(EEH_Array::get_one_item_from_array($data))){
			//make sure top level is numerically indexed,

			if( EEH_Array::is_associative_array($data)){
				throw new EE_Error(sprintf(__("top-level array must be numerically indexed. Does these look like numbers to you? %s","event_espresso"),implode(",",array_keys($data))));
			}
			$item_in_top_level_array = EEH_Array::get_one_item_from_array($data);
			//now, is the last item in the top-level array of $data an associative or numeric array?
			if(EEH_Array::is_associative_array($item_in_top_level_array)){
				//its associative, so we want to output its keys as column headers
				$keys = array_keys($item_in_top_level_array);
				echo $this->fputcsv2($filehandle, $keys);
			}
			//start writing data
			foreach($data as $data_row){
				echo $this->fputcsv2($filehandle, $data_row);
			}
			return true;
		}else{
			//no data TO write... so we can assume that's a success
			return true;
		}
//		//if 2nd level is indexed by strings, use those as csv column headers (ie, the first row)
//
//
//		$no_table = TRUE;
//
//		// loop through data and add each row to the file/stream as csv
//		foreach ( $data as $model_name => $model_data ) {
//			// test first row to see if it is data or a model name
//			$model = 	EE_Registry::instance();->load_model($model_name);
//			//if the model really exists,
//			if ( $model ) {
//
//				// we have a table name
//				$no_table = FALSE;
//
//				// put the tablename into an array cuz that's how fputcsv rolls
//				$model_name_row = array( 'MODEL', $model_name );
//
//				// add table name to csv output
//				echo self::fputcsv2($filehandle, $model_name_row);
//
//				// now get the rest of the data
//				foreach ( $model_data as $row ) {
//					// output the row
//					echo self::fputcsv2($filehandle, $row);
//				}
//
//			}
//
//			if ( $no_table ) {
//				// no table so just put the data
//				echo self::fputcsv2($filehandle, $model_data);
//			}

//		} 		//		END OF foreach ( $data )
	}
	/**
	 * Should be called after begin_sending_csv(), and one or more write_data_array_to_csv()s.
	 * Calls exit to prevent polluting the CSV file with other junk
	 * @param resource $fh filehandle where we're writing the CSV to
	 */
	public function end_sending_csv($fh){
		fclose($fh);
		exit(0);
	}
	/**
	 * Given an open file, writes all the model data to it in the format the importer expects.
	 * Usually preceded by begin_sending_csv($filename), and followed by end_sending_csv($filehandle).
	 * @param resource $filehandle
	 * @param array $model_data_array is assumed to be a 3d array: 1st layer has keys of model names (eg 'Event'),
	 * next layer is numerically indexed to represent each model object (eg, each individual event), and the last layer
	 * has all the attributes o fthat model object (eg, the event's id, name, etc)
	 * @return boolean success
	 */
	public function write_model_data_to_csv($filehandle,$model_data_array){
		$this->write_metadata_to_csv($filehandle);
		foreach($model_data_array as $model_name => $model_instance_arrays){
			//first: output a special row stating the model
			echo $this->fputcsv2($filehandle,array('MODEL',$model_name));
			//if we have items to put in the CSV, do it normally

			if( ! empty($model_instance_arrays) ){
				$this->write_data_array_to_csv($filehandle, $model_instance_arrays);
			}else{
//				echo "no data to write... so just write the headers";
				//so there's actually NO model objects for that model.
				//probably still want to show the columns
				$model = EE_Registry::instance()->load_model($model_name);
				$column_names = array();
				foreach($model->field_settings() as $field){
					$column_names[$field->get_nicename()."[".$field->get_name()."]"] = null ;
				}
				$this->write_data_array_to_csv($filehandle, array($column_names));
			}
		}
	}

	/**
	 * Writes the CSV file to the output buffer, with rows corresponding to $model_data_array,
	 * and dies (in order to avoid other plugins from messing up the csv output)
	 * @param string $filename the filename you want to give the file
	 * @param array $model_data_array 3d array, as described in EE_CSV::write_model_data_to_csv()
	 * @return bool | void writes CSV file to output and dies
	 */
	public function export_multiple_model_data_to_csv($filename,$model_data_array){
		$filehandle = $this->begin_sending_csv($filename);
		$this->write_model_data_to_csv($filehandle, $model_data_array);
		$this->end_sending_csv($filehandle);
	}
	/**
	 *			@Export contents of an array to csv file
	 *		  @access public
	 *			@param array $data - the array of data to be converted to csv and exported
	 *			@param string $filename - name for newly created csv file
	 *			@return TRUE on success, FALSE on fail
	 */
	public function export_array_to_csv( $data = FALSE, $filename = FALSE  ) {

		// no data file?? get outta here
		if ( ! $data or ! is_array( $data ) or empty( $data ) ) {
			return FALSE;
		}

		// no filename?? get outta here
		if ( ! $filename ) {
			return FALSE;
		}



		// somebody told me i might need this ???
		global $wpdb;
		$prefix = $wpdb->prefix;


		$fh = $this->begin_sending_csv($filename);


		$this->end_sending_csv($fh);


	}


	/**
	 *			@Determine the maximum upload file size based on php.ini settings
	 *		  @access public
	 *			@param int $percent_of_max - desired percentage of the max upload_mb
	 *			@return int KB
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
		//Allow user to filter the csv delimiter and enclosure for other countries csv standards
		$delimiter = apply_filters( 'FHEE__EE_CSV__fputcsv2__delimiter', $delimiter );
		$enclosure = apply_filters( 'FHEE__EE_CSV__fputcsv2__enclosure', $enclosure );

		$delimiter_esc = preg_quote($delimiter, '/');
		$enclosure_esc = preg_quote($enclosure, '/');

		$output = array();
		foreach ($row as $field_value) {
			if(is_object($field_value) || is_array($field_value)){
				$field_value = serialize($field_value);
			}
			if ($field_value === null && $mysql_null) {
				$output[] = 'NULL';
				continue;
			}

			$output[] = preg_match("/(?:${delimiter_esc}|${enclosure_esc}|\s)/", $field_value) ?
				( $enclosure . str_replace($enclosure, $enclosure . $enclosure, $field_value) . $enclosure ) : $field_value;
		}

		fwrite($fh, join($delimiter, $output) . PHP_EOL);
	}





//	/**
//	 *			@CSV Import / Export messages
//	 *		  @access public
//	 *			@return void
//	 */
//	public function csv_admin_notices () {
//
//		// We play both kinds of music here! Country AND Western! - err... I mean, cycle through both types of notices
//		foreach( array('updates', 'errors') as $type ) {
//
//			// if particular notice type is not empty, then "You've got Mail"
//			if( ! empty( $this->_notices[$type] )) {
//
//				// is it an update or an error ?
//				$msg_class = $type == 'updates' ? 'updated' : 'error';
//				echo '<div id="message" class="'. $msg_class .'">';
//				// display each notice, however many that may be
//				foreach($this->_notices[$type] as $message) {
//					echo '<p>'. $message .'</p>';
//				}
//				// wrap it up
//				echo '</div>';
//			}
//		}
//	}

	/**
	 * Gets the date format to use in teh csv. filterable
	 * @param string $current_format
	 * @return string
	 */
	public function get_date_format_for_csv( $current_format = null ) {
		return apply_filters( 'FHEE__EE_CSV__get_date_format_for_csv__format', 'Y-m-d', $current_format );
	}

	/**
	 * Gets the time format we want to use in CSV reports. Filterable
	 * @param string $current_format
	 * @return string
	 */
	public function get_time_format_for_csv( $current_format = null ) {
		return apply_filters( 'FHEE__EE_CSV__get_time_format_for_csv__format', 'H:i:s', $current_format );
	}


}
/* End of file EE_CSV.class.php */
/* Location: //includes/classes/EE_CSV.class.php */
?>