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
	 * the URL the form is submitted to
	 * @var string
	 */
	protected $_action;

	/**
	 * POST (default) or GET
	 * @var string
	 */
	protected $_method;

	/**
	 * html_id and html_name are derived from this by default
	 * @var string
	 */
	protected $_name;

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
	 * $_other_html_attributes
	 * @var string
	 */
	protected $_other_html_attributes;

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
		// used by display strategies
		EE_Registry::instance()->load_helper('HTML');
		// assign incoming values to properties
		foreach( $options_array as $key => $value ) {
			$key = '_' . $key;
			if ( property_exists( $this, $key ) && empty( $this->$key )) {
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
		$this->_set_default_html_id_if_empty();
	}



	/**
	 * @return string
	 */
	public function action() {
		return $this->_action;
	}



	/**
	 * @param string $action
	 */
	public function set_action( $action ) {
		$this->_action = $action;
	}



	/**
	 * @return string
	 */
	public function method() {
		return ! empty( $this->_method ) ? $this->_method : 'POST';
	}



	/**
	 * @param string $method
	 */
	public function set_method( $method ) {
		switch ( $method ) {
			case 'get' :
			case 'GET' :
				$this->_method = 'GET';
				break;
			default :
				$this->_method = 'POST';
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
				$this->_html_id = $this->_parent_section->html_id() . '-' . $this->_prep_name_for_html_id( $this->name() );
			}else{
				$this->_html_id = $this->_prep_name_for_html_id( $this->name() );
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
	 * @param bool $add_pound_sign
	 * @return string
	 */
	public function html_id( $add_pound_sign = FALSE ){
		return $add_pound_sign ? '#' . $this->_html_id : $this->_html_id;
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
	 * @param string $other_html_attributes
	 */
	public function set_other_html_attributes( $other_html_attributes ) {
		$this->_other_html_attributes = $other_html_attributes;
	}



	/**
	 * @return string
	 */
	public function other_html_attributes() {
		return $this->_other_html_attributes;
	}



	/**
	 * Gets the name of the form section. This is not the same as the HTML name.
	 * @throws EE_Error
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



	/**
	 * returns HTML for generating the opening form HTML tag (<form>)
	 * @param string $action the URL the form is submitted to
	 * @param string $method POST (default) or GET
	 * @param string $other_attributes anything else added to the form open tag, MUST BE VALID HTML
	 * @return string
	 */
	public function form_open( $action = '', $method = '', $other_attributes = '' ) {
		if ( ! empty( $action )) {
			$this->set_action( $action );
		}
		if ( ! empty( $method )) {
			$this->set_method( $method );
		}
		$html = EEH_HTML::nl( 1, 'form' ) . '<form';
		$html .= $this->html_id() !== '' ? ' id="' . $this->html_id() . '"' : '';
		$html .= ' action="' . $this->action() . '"';
		$html .= ' method="' . $this->method() . '"';
		$html .= $other_attributes . '>';
		return $html;
	}



	/**
	 * returns HTML for generating the closing form HTML tag (</form>)
	 * @return string
	 */
	public function form_close() {
		return EEH_HTML::nl( -1, 'form' ) . '</form>' . EEH_HTML::nl() . '<!-- end of ee-' . $this->html_id() . '-form -->' . EEH_HTML::nl();
	}



}
// End of file EE_Form_Section_Base.form.php