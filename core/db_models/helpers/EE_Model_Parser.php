<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

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
 * @ version		 	4.3
 *
 * ------------------------------------------------------------------------
 *
 * EE_Model_Parser
 *
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_Model_Parser {
	const table_alias_model_relation_chain_seperator = '__';
	const table_alias_model_relation_chain_prefix_end = '___';
	/**
	 * Adds a period onto the front and end of the string. This often helps in searching.
	 * For example, if we want to find the model name "Event", it can be tricky when the following are possible
	 * "","Event.EVT_ID","Event","Event_Venue.Venue.VNU_ID",etc. It's easier to look for ".Event." in 
	 * "..",".Event.EVT_ID.", ".Event.", and ".Event_Venue.Venue.VNU_ID", especially when the last example should NOT
	 * be found because the "Event" model isn't mentioned- it's just a string that has a model name that conicidentally
	 * has it as a substring
	 * @param string $string_to_pad
	 * @return string
	 */
	public static function pad_with_periods($string_to_pad){
		return ".".$string_to_pad.".";
	}
	/**
	 * Bsaically undoes _pad_with_periods
	 * @param string $string_to_trim
	 * @return string
	 */
	public static function trim_periods($string_to_trim){
		return trim($string_to_trim,'.');
	}
	
	/**
	 * Gets the calculatd table's alias 
	 * @param string $model_relation_chain or query param
	 * @return string which can be added onto table aliases to make them unique
	 */
	public static function extract_table_alias_model_relation_chain_prefix($model_relation_chain,$this_model_name){
		//eg $model_relation_chain = 'Venue.Event_Venue.Event.Registration", and $this_model_name = 'Event'
		$model_relation_chain = self::pad_with_periods($model_relation_chain);
		$this_model_name = self::pad_with_periods($this_model_name);
		//eg '.Venue.Event_Venue.Event.Registration." and '.Event.'
		//remove this model name and everything afterwards
		$pos_of_model_name = strpos($model_relation_chain,$this_model_name);
		$model_relation_chain = substr($model_relation_chain,0,$pos_of_model_name);
		//eg '.Venue.Event_Venue.'
		//trim periods
		$model_relation_chain = self::trim_periods($model_relation_chain);
		//eg 'Venue.Event_Venue'
		//replace periods with double-underscores
		$model_relation_chain = str_replace(".",self::table_alias_model_relation_chain_seperator,$model_relation_chain);
		//eg 'Venue__Event_Venue'
		if($model_relation_chain !=''){
			$model_relation_chain = $model_relation_chain.self::table_alias_model_relation_chain_prefix_end;
		}
		//eg 'Venue_Event_Venue___'
		return $model_relation_chain;
	}
	/**
	 * Gets the table's alias (without prefix or anything)
	 * @param string $table_alias_with_model_relation_chain_prefix which CAN have a table alias model relation chain prefix (or not)
	 * @return string
	 */
	public static function remove_table_alias_model_relation_chain_prefix($table_alias_with_model_relation_chain_prefix){
		//does this actually have a table alias model relation chain prefix?
		$pos = strpos($table_alias_with_model_relation_chain_prefix,self::table_alias_model_relation_chain_prefix_end);
		if(  $pos !== FALSE){
			//yes
			//find that triple underscore and remove it and everything before it
			$table_alias = substr($table_alias_with_model_relation_chain_prefix, $pos + strlen(self::table_alias_model_relation_chain_prefix_end));
		}else{
			$table_alias = $table_alias_with_model_relation_chain_prefix;
		}
		return $table_alias;
	}
	/**
	 * Gets the table alias model relation chain prefix from the table alias already containing it
	 * @param string $table_alias_with_model_relation_chain_prefix
	 * @return string
	 */
	public static function get_prefix_from_table_alias_with_model_relation_chain_prefix($table_alias_with_model_relation_chain_prefix){
		//does this actually have a table alias model relation chain prefix?
		$pos = strpos($table_alias_with_model_relation_chain_prefix,self::table_alias_model_relation_chain_prefix_end);
		if(  $pos !== FALSE){
			//yes
			//find that triple underscore and remove it and everything before it
			$prefix = substr($table_alias_with_model_relation_chain_prefix, 0, $pos + strlen(self::table_alias_model_relation_chain_prefix_end));
		}else{
			$prefix = '';
		}
		return $prefix;
	}
	/**
	 * Gets the table alias model relation chain prefix from teh query param
	 * @param type $query_param
	 * @param type $table_alias_sans_prefix
	 * @return string
	 */
	public static function extract_table_alias_model_relation_chain_from_query_param($query_param,$table_alias_sans_prefix){
		$pos = strpos($query_param,$table_alias_sans_prefix);
		if($pos == 0){
			return '';
		}
		$prefix = substr($query_param,0,$pos-1);
		//turn last . indicates the end of the prefix
		if($prefix){
			return str_replace(".",self::table_alias_model_relation_chain_seperator,$prefix).self::table_alias_model_relation_chain_prefix_end;
		}
		
	}
}

// End of file EE_Model_Parser.php