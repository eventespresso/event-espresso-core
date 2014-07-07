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

	/**
	 * html_id and html_name are derived from this by default
	 * @var string
	 */
	protected $_name;

	/**
	 * a unique identifier for this form that can be called programmatically
	 * @var string
	 */
	protected $_ID;

	/**
	 * $_html_id
	 * @var string
	 */
	protected $_html_id;

	/**
	 * $_html_class
	 * @var string
	 */
	protected $_html_class;

	/**
	 * $_html_style
	 * @var string
	 */
	protected $_html_style;

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
	function __construct( $options_array = array() ) {
		foreach( $options_array as $key => $value ) {
			$key = '_' . $key;
			if ( property_exists( $this, $key )) {
				$this->$key = $value;
			}
		}
	}



	/**
	 * @param $parent_form_section
	 * @param $name
	 */
	protected function _construct_finalize( $parent_form_section, $name ){
		$this->_construction_finalized = TRUE;
		$this->_parent_section = $parent_form_section;
		$this->_name = $name;
		$this->_set_id_if_empty();
		$this->_set_default_html_id_if_empty();
	}



	/**
	 * Sets the id to its default value, if none was specified in the constructor.
	 * Calculation involves using the name
	 * return void
	 */
	protected function _set_id_if_empty(){
		if ( ! $this->_ID ) {
			if ( $this->_parent_section && $this->_parent_section instanceof EE_Form_Section_Proper ) {
				$this->_ID = $this->_parent_section->ID() . '-' . sanitize_key( str_replace( array( '&nbsp;', ' ', '-' ), '_', $this->_name ));
			} else {
				$this->_ID = sanitize_key( str_replace( array( '&nbsp;', ' ', '-' ), '_', $this->_name ));
			}
		}
	}



	/**
	 * Sets the html_id to its default value, if none was specified in the constructor.
	 * Calculation involves using the name and the parent's html id
	 * return void
	 */
	protected function _set_default_html_id_if_empty(){
		if( ! $this->_html_id ){
			if( $this->_parent_section && $this->_parent_section instanceof EE_Form_Section_Proper ){
				$this->_html_id = $this->_parent_section->html_id() . '-' . $this->_prep_name_for_html_id( $this->_name );
			}else{
				$this->_html_id = $this->_prep_name_for_html_id( $this->_name );
			}
		}
	}



	/**
	 * _prep_name_for_html_id
	 * @param $name
	 * @return string
	 */
	private function _prep_name_for_html_id( $name ) {
		return sanitize_key( str_replace( array( '&nbsp;', ' ', '_' ), '-', $name ));
	}



	/**
	 * Returns the HTML, JS, and CSS necessary to display this form section on a page.
	 * @return string
	 */
	abstract public function get_html_and_js();



	/**
	 * @return string
	 */
	public function ID(){
		return $this->_ID;
	}


	/**
	 * @return string
	 */
	public function html_id(){
		return $this->_html_id;
	}



	/**
	 * @return string
	 */
	public function html_class(){
		return $this->_html_class;
	}



	/**
	 * @return string
	 */
	public function html_style(){
		return $this->_html_style;
	}



	/**
	 * @param mixed $html_class
	 */
	public function set_html_class( $html_class ) {
		$this->_html_class = $html_class;
	}



	/**
	 * @param mixed $html_id
	 */
	public function set_html_id( $html_id ) {
		$this->_html_id = $html_id;
	}



	/**
	 * @param mixed $html_style
	 */
	public function set_html_style( $html_style ) {
		$this->_html_style = $html_style;
	}


	/**
	 * Gets the name of the form section. This is not the same as the HTML name.
	 * @return string
	 */
	function name(){
		if( ! $this->_construction_finalized ){
			throw new EE_Error(sprintf( __( 'You cannot use the form section\s name until _construct_finalize has been called on it (when we set the name). It was called on a form section of type \'s\'', 'event_espresso' ), get_class($this) ) );
		}
		return $this->_name;
	}



	/**
	 * Gets the parent section
	 * @return EE_Form_Section_Proper
	 */
	function parent_section(){
		return $this->_parent_section;
	}
}



	/**
	 * returns HTML for generating the opening form HTML tag (<form>)
	 * @param string $action the URL the form is submitted to
	 * @param string $method POST (default) or GET
	 * @param string $other_attributes anything else added to the form open tag, MUST BE VALID HTML
	 * @return string
	 */
	public function form_open( $action = NULL, $method = 'POST', $other_attributes = '' ) {
		return EEH_Formatter::nl(1) . '<form id="' . $this->html_id() . '" action="' . $action . '" method="' . $method . '"' . $other_attributes . '>';
	}



	/**
	 * returns HTML for generating the closing form HTML tag (</form>)
	 * @return string
	 */
	public function form_close() {
		return EEH_Formatter::nl(-1) . '</form>' . EEH_Formatter::nl() . '<!-- end of ee-' . $this->html_id() . '-form -->' . EEH_Formatter::nl();
	}



	/**
	 * returns HTML for generating an HTML form submit button
	 * @param string $value
	 * @param bool   $primary
	 * @param string $btn_size
	 * @param string $other_attributes
	 * @return string
	 */
	//	public function form_submit_button( $value = 'Update', $primary = TRUE, $btn_size = 'large', $other_attributes = '', $extra_class = '') {
	//		$primary = $primary === TRUE ? 'primary' : 'secondary';
	//		return EEH_Formatter::nl() . '<input id="ee-' . $this->html_id() . '-submit" class="button button-' . $primary . ' button-' . $btn_size . ' ' . $extra_class . '" type="submit" value="' . $value . '" name="ee_' . $this->html_id() . '_submit" ' . $other_attributes . '/>';
	//	}



}
// End of file EE_Form_Section_Base.form.php