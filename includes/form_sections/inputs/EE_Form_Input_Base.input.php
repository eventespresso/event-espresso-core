<?php

/**
 * For representing a single form input. Extends EE_Form_SEciton_Base because
 * it is a part of a form and shares a suprisingly large amount of functionality
 */
require_once('base/EE_Form_Section_Base.form.php');
abstract class EE_Form_Input_Base extends EE_Form_Section_Base{
	
	
	protected $_html_name;
	protected $_html_label_id;
	protected $_html_label_class;
	protected $_html_label_style;
	protected $_html_label_text;
	
	/**
	 * Original value as submitted in the form, or set as the default.
	 * Note: when initially setting from default, we still want to do some minimal sanitization. This is necessary
	 * because we want to avoid storing somethign unsafe, like SQL.
	 * @var string
	 */
	protected $_original_value;
	protected $_sanitized_value;
	protected $_normalized_value;
	
	
	
	/**
	 * Strategy used for displaying this field.
	 * Child classes must use _get_display_strategy to access it.
	 * @var EE_Display_Strategy_Base
	 */
	private $_display_strategy;
	
	public function __construct($options_array){
		
	}
	public function construct_finalize(EE_Form_Section_Proper $parent_form, $name){
		$this->_parent_section = $parent_form;
		$this->_name = $name;
		if( ! $this->_html_id ){
			$this->_html_id = $parent_form->html_id()."-".$name;
		}
		if( ! $this->_html_name ){
			$this->_html_name = $parent_form->html_name()."[$name]";
		}
	}
	 /**
	  * Returns the strategy for displaying this form input. If none is set, throws an exception.
	  * @return EE_Display_Strategy_Base
	  * @throws EE_Error
	  */
	protected function _get_display_strategy(){
		if( ! $this->_display_strategy || ! $this->_display_strategy instanceof EE_Display_Strategy_Base){
			throw new EE_Error(sprintf(__("Cannot get display strategy for form input with name %s and id %s, because it has not been set in the constructor", "event_espresso"),$this->html_name(),$this->html_id()));
		}else{
			return $this->_display_strategy;
		}
	}
	/**
	 * Sets the display strategy. 
	 * @param EE_Display_Strategy_Base $strategy
	 */
	protected function _set_display_strategy(EE_Display_Strategy_Base $strategy){
		$this->_display_strategy = $strategy;
	}
	public function display(){
		return $this->_get_display_strategy()->display();	
	}
	public function _validate($req_data) {
		return true;
	}
	public function _sanitize($req_data) {
		return true;
	}
	
	public function html_name(){
		return $this->_html_name;
	}
	
	function html_label_id(){
		return $this->_html_label_id;
	}
	function html_label_class(){
		return $this->_html_label_class;
	}
	function html_label_style(){
		return $this->_html_label_style;
	}
	function html_label_text(){
		return $this->_html_label_text;
	}
	/**
	 * returns the original value as submitted in the form, or set as the default.
	 * @return string
	 */
	function original_value(){
		return $this->_original_value;
	}
	/**
	 * returns the value after it's been cleaned, but it's still a string
	 * @return string
	 */
	function sanitized_value(){
		return $this->_sanitized_value;
	}
	/**
	 * returns the value after it's been sanitized, and then converted into it's proper type
	 * in PHP. Eg, a string, an int, an array, 
	 * @return mixed
	 */
	function normalized_value(){
		return $this->_normalized_value;
	}
}
