<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 *
 * EEE_Base_Class
 * Class for dynamically adding functions onto model objects (EE_Base_Class children).
 * Example usage: create a child of EEE_Base_Class like so:
 * class EEE_Sample_Attendee extends EEE_Base_Class{
	public function __construct() {
		$this->_model_name_extended = 'Attendee';
		parent::__construct();
	}
	function ext_foobar($txn_id){
		echo "you have called foobar $txn_id on ".$this->_->fname()";
	}
}
 * Early during the request (before the models are used) include the file containing it and
 * create a new instance of the class using: new EEE_Sample_Attendee().
 * For every function you want to be magically added onto EE_Attendee (eg "foobar")
 * add a function named ext_{function_name} (eg "ext_foobar")onto your EEE_Base_Class child, accepting the same
 * arguments and returning the same value as you would if it were on EE_Attendee.
 * Every time EE_Attendee::foobar() is called, it will call your EEE_Sample_Attendee::ext_foobar() function.
 * To access the originally model object on which the method was called, using $this->_.
 * (Eg you can use $this->_->fname(); $this->_->save(); But note that you CANNOT access protected functions
 * or properties because this is not true inheritance)
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EEE_Base_Class {

	const extending_method_prefix = 'ext_';
	const dynamic_callback_method_prefix = 'dynamic_callback_method_';
	/**
	 * The model name that is extended (not classname)
	 * @var string
	 */
	protected $_model_name_extended = NULL;
	/**
	 * The model this extends
	 * @var EE_Base_Class
	 */
	protected $_ = NULL;

	public function __construct(){
		if( ! $this->_model_name_extended){
			throw new EE_Error(sprintf(__("When declaring a class extension, you must define its _model_name_extended property. It should be a model name like 'Attendee' or 'Event'", "event_espresso")));
		}
		if(did_action('AHEE__EE_'.$this->_model_name_extended.'__construct__end')){
			throw new EE_Error(sprintf(__("Hooked in model object extension '%s' too late! The model object %s has already been used!", "event_espresso"),get_class($this),$this->_model_name_extended));
		}
		$this->_register_extending_methods();
	}

	/**
	 * scans the child of EEME_Base for functions starting with ext_, and magically makes them functions on the
	 * model extended. (Internally uses filters, and the __call magic method)
	 */
	protected function _register_extending_methods(){
		$all_methods = get_class_methods(get_class($this));
		foreach($all_methods as $method_name){
			if(strpos($method_name, self::extending_method_prefix) === 0){
				$method_name_on_model = str_replace(self::extending_method_prefix, '', $method_name);
				$callback_name = "FHEE__EE_{$this->_model_name_extended}__$method_name_on_model";
				add_filter($callback_name,array($this,self::dynamic_callback_method_prefix.$method_name_on_model),10,10);
			}
		}
	}
	/**
	 * scans the child of EEME_Base for functions starting with ext_, and magically REMOVES them as functions on the
	 * model extended. (Internally uses filters, and the __call magic method)
	 */
	public function deregister(){
		$all_methods = get_class_methods(get_class($this));
		foreach($all_methods as $method_name){
			if(strpos($method_name, self::extending_method_prefix) === 0){
				$method_name_on_model = str_replace(self::extending_method_prefix, '', $method_name);
				$callback_name = "FHEE__EE_{$this->_model_name_extended}__$method_name_on_model";
				remove_filter($callback_name,array($this,self::dynamic_callback_method_prefix.$method_name_on_model),10);
			}
		}
	}


	public function __call($callback_method_name,$args){
		if(strpos($callback_method_name, self::dynamic_callback_method_prefix) === 0){
			//it's a dynamic callback for a method name
			$method_called_on_model = str_replace(self::dynamic_callback_method_prefix, '', $callback_method_name);
			$original_return_val = $args[0];
			$model_called = $args[1];
			$this->_ = $model_called;
			$args_provided_to_method_on_model = $args[2];
			$extending_method = self::extending_method_prefix.$method_called_on_model;
			if(method_exists($this, $extending_method)){
				return call_user_func_array(array($this,$extending_method), $args_provided_to_method_on_model);
			}else{
				throw new EE_Error(sprintf(__("An odd error occurred. Model '%s' had a method called on it that it didn't recognize. So it passed it onto the model extension '%s' (because it had a function named '%s' which should be able to handle it), but the function '%s' doesnt exist!)", "event_espresso"),$this->_model_name_extended,get_class($this),$extending_method,$extending_method));
			}

		}else{
			throw new EE_Error(sprintf(__("There is no method named '%s' on '%s'", "event_espresso"),$callback_method_name,get_class($this)));
		}
	}

}
// End of file EEE_Base_Class.lib.php