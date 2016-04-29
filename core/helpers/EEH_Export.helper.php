<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * EEH_Export Helper
 *
 * Static class for helping in creating exports
 *
 * @package			Event Espresso
 * @subpackage	/helpers/
 * @author				Brent Christensen
 *
 * ------------------------------------------------------------------------
 */

class EEH_Export {
	/**
	 * Gets the 'normal' column named for fields
	 * @param EE_Model_Field_Base $field
	 * @return string
	 */
	public static function get_column_name_for_field(EE_Model_Field_Base $field){
		return $field->get_nicename()."[".$field->get_name()."]";
	}

	/**
	 * Writes $data to the csv file open in $filehandle. uses the array indices of $data for column headers
	 *
	 * @param string 	$filepath
	 * @param array 	$data 2D array, 		first numerically-indexed,
	 *                    						and next-level-down preferably indexed by string
	 * @param boolean 	$write_column_headers 	whether or not we should add the keys in the bottom-most array
	 * 											as a row for headers in the CSV.
	 *                                            Eg, if $data looked like:
	 *                                            array(
	 *                                              	0=>array('EVT_ID'=>1,'EVT_name'=>'monkey'...),
	 * 													1=>array(...,...)
	 *                                            )
	 *
	 * @return boolean 		if we successfully wrote to the CSV or not. If there's no $data,
	 * 						we consider that a success (because we wrote everything there was...nothing)
	 * @throws EE_Error
	 */
	public static function write_data_array_to_csv( $filepath, $data, $write_column_headers = true ){

		$new_file_contents = '';
		//determine if $data is actually a 2d array
		if ( $data && is_array($data) && is_array(EEH_Array::get_one_item_from_array($data))){
			//make sure top level is numerically indexed,

			if( EEH_Array::is_associative_array($data)){
				throw new EE_Error(sprintf(__("top-level array must be numerically indexed. Does these look like numbers to you? %s","event_espresso"),implode(",",array_keys($data))));
			}
			$item_in_top_level_array = EEH_Array::get_one_item_from_array($data);
			//now, is the last item in the top-level array of $data an associative or numeric array?
			if( $write_column_headers &&
					EEH_Array::is_associative_array($item_in_top_level_array)){
				//its associative, so we want to output its keys as column headers
				$keys = array_keys($item_in_top_level_array);
				$new_file_contents .=  EEH_Export::get_csv_row( $keys );

			}
			//start writing data
			foreach($data as $data_row){
				$new_file_contents .= EEH_Export::get_csv_row( $data_row);
			}
			return EEH_File::write_to_file( $filepath, EEH_File::get_file_contents( $filepath ) . $new_file_contents );
		}else{
			//no data TO write... so we can assume that's a success
			return true;
		}
	}



	 /**
	  *
	 *	Writes a row to the csv file
	 *	@param array $row - individual row of csv data
	 *	@param string $delimiter - csv delimiter
	 *	@param string $enclosure - csv enclosure
	 *	@param bool $mysql_null - allows php NULL to be overridden with MySQl's insertable NULL value
	 *	@return string of text for teh csv file
	 */
	public static function get_csv_row ( array $row, $delimiter = ',', $enclosure = '"', $mysql_null = false ) {
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
			if ($field_value === null && $mysql_null ) {
				$output[] = 'NULL';
				continue;
			}

			$output[] = preg_match("/(?:${delimiter_esc}|${enclosure_esc}|\s)/", $field_value) ?
				( $enclosure . str_replace($enclosure, $enclosure . $enclosure, $field_value) . $enclosure ) : $field_value;
		}

		return  implode($delimiter, $output) . PHP_EOL;
	}



	/**
	 * Shortcut for preparing a database result for display
	 * @param EEM_Base $model
	 * @param string $field_name
	 * @param string $raw_db_value
	 * @param boolean|string $pretty_schema true to display pretty, a string to use a specific "Schema", or false to NOT display pretty
	 * @return string
	 */
	public static function prepare_value_from_db_for_display( $model, $field_name,  $raw_db_value, $pretty_schema = true ) {
		$field_obj = $model->field_settings_for( $field_name );
		$value_on_model_obj = $field_obj->prepare_for_set_from_db( $raw_db_value );
		if( $field_obj instanceof EE_Datetime_Field ) {
			$field_obj->set_date_format( EEH_Export::get_date_format_for_export( $field_obj->get_date_format( $pretty_schema ) ), $pretty_schema );
			$field_obj->set_time_format( EEH_Export::get_time_format_for_export( $field_obj->get_time_format( $pretty_schema ) ), $pretty_schema );
		}
		if( $pretty_schema === true){
			return $field_obj->prepare_for_pretty_echoing( $value_on_model_obj );
		}elseif( is_string( $pretty_schema ) ) {
			return $field_obj->prepare_for_pretty_echoing($value_on_model_obj, $pretty_schema );
		}else{
			return $field_obj->prepare_for_get( $value_on_model_obj );
		}
	}



	/**
	 * Gets the date format to use in exports. filterable
	 * @param string $current_format
	 * @return string
	 */
	public static function get_date_format_for_export( $current_format = null ) {
		return apply_filters( 'FHEE__EE_CSV__get_date_format_for_csv__format', 'Y-m-d', $current_format );
	}



	/**
	 * Gets the time format we want to use in exports. Filterable
	 * @param string $current_format
	 * @return string
	 */
	public static function get_time_format_for_export( $current_format = null ) {
		return apply_filters( 'FHEE__EE_CSV__get_time_format_for_csv__format', 'H:i:s', $current_format );
	}



}
