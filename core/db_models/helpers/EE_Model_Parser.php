<?php if ( ! defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');
/**
 * EE_Model_Parser
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 */
class EE_Model_Parser {
	const table_alias_model_relation_chain_separator = '__';
	const table_alias_model_relation_chain_prefix_end = '___';
	/**
	 * Adds a period onto the front and end of the string. This often helps in searching.
	 * For example, if we want to find the model name "Event", it can be tricky when the following are possible
	 * "","Event.EVT_ID","Event","Event_Venue.Venue.VNU_ID",etc. It's easier to look for ".Event." in
	 * "..",".Event.EVT_ID.", ".Event.", and ".Event_Venue.Venue.VNU_ID", especially when the last example should NOT
	 * be found because the "Event" model isn't mentioned- it's just a string that has a model name that coincidentally
	 * has it as a substring
	 * @param string $string_to_pad
	 * @return string
	 */
	public static function pad_with_periods($string_to_pad){
		return ".".$string_to_pad.".";
	}
	/**
	 * Basically undoes _pad_with_periods
	 * @param string $string_to_trim
	 * @return string
	 */
	public static function trim_periods($string_to_trim){
		return trim($string_to_trim,'.');
	}



	/**
	 * Gets the calculated table's alias
	 * @param string $model_relation_chain or query param
	 * @param        $this_model_name
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
		$model_relation_chain = str_replace(".",self::table_alias_model_relation_chain_separator,$model_relation_chain);
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
	 * Gets the table alias model relation chain prefix (ie, what can be prepended onto
	 * EE_Model_Field::get_qualified_column() to get the proper column name for that field
	 * in a specific query) from teh query param (eg 'Registration.Event.EVT_ID').
	 *
	 * @param string $model_name of the model on which the related query param was found to be belong
	 * @param string $original_query_param
	 * @return string
	 */
	public static function extract_table_alias_model_relation_chain_from_query_param($model_name, $original_query_param){
		$relation_chain = self::extract_model_relation_chain($model_name, $original_query_param);
		$table_alias_with_model_relation_chain_prefix = EE_Model_Parser::extract_table_alias_model_relation_chain_prefix($relation_chain, $model_name);
		return $table_alias_with_model_relation_chain_prefix;
}
	/**
	 * Gets the model relation chain to $model_name from the $original_query_param.
	 * Eg, if $model_name were 'Payment', and $original_query_param were 'Registration.Transaction.Payment.PAY_ID',
	 * this would return 'Registration.Transaction.Payment'. Also if the query param were 'Registration.Transaction.Payment'
	 * and $model_name were 'Payment', it should return 'Registration.Transaction.Payment'
	 * @param string $model_name
	 * @param string $original_query_param
	 * @return string
	 */
	public static function extract_model_relation_chain($model_name,$original_query_param){
		//prefix and postfix both with a period, as this facilitates searching
		$model_name = EE_Model_Parser::pad_with_periods($model_name);
		$original_query_param = EE_Model_Parser::pad_with_periods($original_query_param);
		$pos_of_model_string = strpos($original_query_param, $model_name);
		//eg, if we're looking for the model relation chain from Event to Payment, the original query param is probably something like
		//"Registration.Transaction.Payment.PAY_ID", $pos_of_model_string points to the 'P' or Payment. We want the string
		//"Registration.Transaction.Payment"
		$model_relation_chain = substr($original_query_param, 0,$pos_of_model_string+strlen($model_name));
		return EE_Model_Parser::trim_periods($model_relation_chain);
	}

	/**
	 * Replaces the specified model in teh model relation chain with teh join model.
	 * Eg EE_Model_Parser::replace_model_name_with_join_model_name_in_model_relation_chain(
	 * "Ticket", "Datetime_Ticket", "Datetime.Ticket" ) will return
	 * "Datetime.Datetime_Ticket" which can be used to find the table alias model relation chain prefix
	 * using EE_Model_Parser::extract_table_alias_model_relation_chain_prefix
	 * @param string $model_name
	 * @param string $join_model_name
	 * @param string $model_relation_chain
	 * @return string
	 */
	public static function replace_model_name_with_join_model_name_in_model_relation_chain($model_name,$join_model_name,$model_relation_chain){
		$model_name = EE_Model_Parser::pad_with_periods($model_name);
		$join_model_name = EE_Model_Parser::pad_with_periods($join_model_name);
		$model_relation_chain = EE_Model_Parser::pad_with_periods($model_relation_chain);
		$replaced_with_periods = str_replace($model_name,$join_model_name,$model_relation_chain);
		return EE_Model_Parser::trim_periods($replaced_with_periods);
	}
}

// End of file EE_Model_Parser.php