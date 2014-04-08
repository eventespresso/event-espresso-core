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
 * EE_Form_Section_Base
 * For shared functionality between form sections that are for display-only, and
 * sections for receiving form input etc.
 *
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
abstract class EE_Form_Section_Base {
	protected $_html_id;
	protected $_html_class;
	protected $_html_style;
	/**
	 * html_id and html_name are derived from this by default
	 * @var string
	 */
	protected $_name;
	
	/**
	 * The form section of which this form section is a part
	 * @var EE_Form_Section_Proper
	 */
	protected $_parent_section;
	/**
	 * flag indicating that _construct_finalize has been called.
	 * If it hasn't been called and we try to use functions which require it, we call it
	 * with no parameters. But normally, _construct_finalize should be called by the instantiating class
	 * @var boolean
	 */
	protected $_construction_finalized;
	/**
	 * 
	 * @param array $options_array {
	 *	@type $name string the name for this form section, if you want to explicitly define it
	 * }
	 */
	function __construct($options_array = array()){
		if(isset($options_array['name'])){
			$this->_name = $options_array['name'];
		}
	}
	protected function _construct_finalize( $parent_form_section, $name ){
		$this->_parent_section = $parent_form_section;
		$this->_name = $name;
		$this->_set_default_html_id_if_empty();
	}
	/**
	 * Sets the html_id to its default value, if none was specified in the constructor. 
	 * Calculation involves using the name and the parent's html id
	 * return void
	 */
	protected function _set_default_html_id_if_empty(){
		if( ! $this->_html_id ){
			if( $this->_parent_section && $this->_parent_section instanceof EE_Form_Section_Proper ){
				$this->_html_id = $this->_parent_section->html_id() . '-' . strtolower( str_replace( '_', '-', $this->_name ));
			}else{
				$this->_html_id = strtolower( str_replace( '_', '-', $this->_name ));
			}
		}
	}
	/**
	 * Returns the HTML, JS, and CSS necessary to display this form section on a page.
	 * @return string
	 */
	abstract public function get_html_and_js();
	public function html_id(){
		return $this->_html_id;
	}
	function html_class(){
		return $this->_html_class;
	}
	function html_style(){
		return $this->_html_style;
	}
	/**
	 * Gets the name of the form section. This is not the saem as the HTML name.
	 * @return string
	 */
	function name(){
		return $this->_name;
	}
}

// End of file EE_Form_Section_Base.form.php