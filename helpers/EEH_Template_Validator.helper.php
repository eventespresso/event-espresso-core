<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for Wordpress
 *
 * @package		Event Espresso
 * @author		Seth Shoultes
 * @copyright	(c)2009-2012 Event Espresso All Rights Reserved.
 * @license		http://eventespresso.com/support/terms-conditions/  ** see Plugin Licensing **
 * @link		http://www.eventespresso.com
 * @version		4.0
 *
 * ------------------------------------------------------------------------
 *
 * EEH_Template_Validator
 *
 * This is a helper static class for helping to validate templates. It should be
 * used to verify all the variabels required by a template file are present
 * and of the correct type. When WP_DEBUG is disabled, each of its static methods
 * should ignore any potential problems, but with WP_DEBUG enabled it will throw
 * EE_Errors when problems are found.
 * An example of how to use this class at the top of an EE template file:
 * 
 * //@var EE_Group_Type[] $group_types 
	EEH_Template_Validator::verify_is_array_of($group_types,'group_types','EE_Group_Type');
	EEH_Template_Validator::verify_is_array($attending_options, 'attending_options');
	EEH_Template_Validator::verify_is_array($yes_no_values, 'yes_no_values');
?>
 *
 * @package		Event Espresso
 * @subpackage	/helper/EEH_Template_Validator.helper.php
 * @author		Michael Nelson
 *
 * ------------------------------------------------------------------------
 */
class EEH_Template_Validator {
	
	
	
	
	
	/**
	 * Throws an EE_Error if $variabel_to_test isn't an array of objects of class $class_name
	 * @param mixed $variable_to_test
	 * @param string $name_of_variable helpful in throwing intelligent errors
	 * @param string $class_name eg EE_Answer, EE_Transaction, etc.
	 * @param string $allow_null one of 'allow_null', or 'do_not_allow_null'
	 * @return void
	 * @throws EE_Error (indirectly)
	 */
	static function verify_is_array_of($variable_to_test,$name_of_variable,$class_name,$allow_null='allow_null'){
		if(!WP_DEBUG)return;
		self::verify_argument_is_one_of($allow_null, 'allow_null', array('allow_null','do_not_allow_null'));
		if('allow_null' == $allow_null && is_null($variable_to_test)){
			return;
		}
		self::verify_is_array($variable_to_test, $name_of_variable);
		foreach($variable_to_test as $key=>$array_element){
			self::verify_instanceof($array_element, $key, $class_name);
		}
	}
	
	
	
	
	
	/**
	 * throws an EE_Error if $variable_to_test is null
	 * @param mixed $variable_to_test
	 * @param string $name_of_variable helpful for throwing intelligent errors
	 * @return void
	 * @throws EE_Error
	 */
	static function verify_isnt_null($variable_to_test,$name_of_variable){
		if(!WP_DEBUG)return;
		if($variable_to_test==null && $variable_to_test!=0 && $variable_to_test!=FALSE){
			$error[]=__('Variable named %s is null.','event_espresso');
			$error[]=__("Consider looking at the stack trace to see why it wasn't set.",'event_espresso');
			throw new EE_Error(sprintf(implode(",",$error),$name_of_variable,$name_of_variable));
		}
	}
	
	/**
	 * When WP_DEBUG is activted, throws an error if $expression_to_test is false.
	 * @param boolean $expression_to_test
	 * @param string $expression_string_representation a string representation of your expression
	 * for example, if your expression were $var1==23, then this should be '$var1==23'
	 * @return void
	 * @throws EE_Error
	 */
	static function verify_is_true($expression_to_test,$expression_string_representation){
		if(!WP_DEBUG)return;
		if(!$expression_to_test){
			$error[]=__('Template error.','event_espresso');
			$error[]=__("%s evaluated to false, but it must be true!",'event_espresso');
			throw new EE_Error(sprintf(implode(",",$error),$expression_string_representation));
		}
	}
	
	
	
	
	
	/**
	 * For verifying that a variable is indeed an object of class $class_name
	 * @param mixed $variable_to_test
	 * @param string $name_of_variable helpful when throwing errors
	 * @param string $class_name eg, EE_Answer, 
	 * @return void
	 * @throws EE_Error
	 */
	static function verify_instanceof($variable_to_test,$name_of_variable,$class_name, $allow_null = 'do_not_allow_null'){
		if(!WP_DEBUG)return;
		self::verify_argument_is_one_of($allow_null, 'allow_null', array('allow_null','do_not_allow_null'));
		if($allow_null == 'allow_null' && is_null($variable_to_test)){
			return;
		}
		if( $variable_to_test == NULL ||  ! ( $variable_to_test instanceof $class_name )){
			$msg[]=__('Variable %s is not of the correct type.','event_espresso');
			$msg[]=__("It should be of type %s",'event_espresso');
			throw new EE_Error(sprintf(implode(",",$msg),$name_of_variable,$name_of_variable,$class_name));
		}
	}
	
	
	
	
	
	/**
	 * For verifying that a variable is indeed an array, else throw an EE_Error
	 * @param type $variable_to_test
	 * @param type $variable_name
	 * @param type $allow_empty one of 'allow_empty' or 'do_not_allow_empty'
	 * @return void
	 * @throws EE_Error
	 */
	static function verify_is_array($variable_to_test,$variable_name,$allow_empty='allow_empty'){
		if(!WP_DEBUG)return;
		self::verify_argument_is_one_of($allow_empty, $variable_name, array('allow_empty','do_not_allow_empty'));
		if(empty($variable_to_test) && 'allow_empty'==$allow_empty){
			return;
		}
		if(!is_array($variable_to_test)){
			$error[]=__('Variable %s should be an array, but it is not.');
			$error[]=__("Its value is, instead '%s'",'event_espresso');
			throw new EE_Error(sprintf(implode(",",$error),$variable_name,$variable_name,$variable_to_test));
		}
	}
	
	
	
	
	
	
	
	/**
	 * for verifying that a variable is one of the string optiosn supplied
	 * @param mixed $variable_to_test
	 * @param mixed $variable_name the name you've given the variable. Eg, '$foo'. THis helps in producing better error messages
	 * @param array $string_options an array of acceptable values
	 * @return void
	 * @throws EE_Error
	 */
	static function verify_argument_is_one_of($variable_to_test,$variable_name,$string_options){
		if(!WP_DEBUG)return;
		if(!in_array($variable_to_test,$string_options)){
			$msg[0]=__('Malconfigured template.','event_espresso');
			$msg[1]=__("Variable named '%s' was set to '%s'. It can only be one of '%s'",'event_espresso');
			throw new EE_Error(sprintf(implode("||",$msg),$variable_name,$variable_to_test, implode("', '",$string_options)));
		}
	}


}