<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * EE_Template_Layout
 *
 * For very customized layouts, where you provide this class with the location of
 * a template file to use for laying out the form section. Inherits from EE_Div_per_Section
 * in case you call layout_input() or layout_subsection(), or get_html_for_label(),
 * get_html_for_input(), or get_html_for_errors() on one if the form section's inputs.
 * When would you want to use this instead of just laying out the form's subsections manually
 * in a template file? When you want a very customized layout, but that layout is essential
 * to the form; so that if you were to use the same form on two different pages (eg a contact form,
 * one on the website's frontend for contacting the site admin, and then again on the backend for
 * contacting the plugin's developer), you would still use this exact same template layout strategy.
 * (Eg, if you wanted to add a button to that same form for automatically adding "@gmail.com" or "@yahoo.com"
 * onto the 'from' input. The input is important to the form section on either page, but isn't an input so it's best
 * added as a part of the template layout.)
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_Template_Layout extends EE_Div_Per_Section_Layout{

	protected $_layout_template_file = NULL;
	protected $_layout_begin_template_file = NULL;
	protected $_input_template_file = NULL;
	protected $_subsection_template_file = NULL;
	protected $_layout_end_template_file = NULL;
	protected $_template_args = array();



	/**
	 * @param array  $template_options {
	 * 		@type string 	$_layout_template_file
	 * 		@type string 	$_begin_template_file
	 * 		@type string 	$_input_template_file
	 * 		@type string 	$_subsection_template_file
	 * 		@type string 	$_end_template_file
	 * 		@type array 	$_template_args
	 * 	}
	 */
	public function __construct( $template_options = array() ) {
		// loop thru incoming options
		foreach( $template_options as $key => $value ) {
			// add underscore to $key to match property names
			$_key = '_' . $key;
			if ( property_exists( $this, $_key )) {
					$this->{$_key} = $value;
			}
		}
		parent::__construct();
	}



	/**
	 * Also has the side effect of enqueuing any needed JS and CSS for
	 * this form.
	 * Creates all the HTML necessary for displaying this form, its inputs, and
	 * proper subsections.
	 * Returns the HTML
	 * @return string
	 */
	public function layout_form() {
		if ( $this->_layout_template_file ) {
			return EEH_Template::locate_template( $this->_layout_template_file, $this->template_args(), TRUE, TRUE );
		} else {
			return parent::layout_form();
		}
	}



	/**
	 * opening div tag for a form
	 * @return string
	 */
	public function layout_form_begin() {
		if($this->_layout_begin_template_file){
			return EEH_Template::locate_template( $this->_layout_begin_template_file, $this->template_args(), TRUE, TRUE );
		}else{
			return parent::layout_form_begin();
		}
	}



	/**
	 * If an input_template_file was provided upon construction, uses that to layout the input. Otherwise uses parent.
	 * @see EE_DIv_Per_Section_Layout::layout_input() for documentation
	 * @param EE_Form_Input_Base $input
	 * @return string
	 */
	public function layout_input( $input ) {
		if($this->_input_template_file){
			return EEH_Template::locate_template( $this->_input_template_file, array( 'input' => $input ), TRUE, TRUE );
		}
		return parent::layout_input($input);
	}



	/**
	 * If a subsection_template_file was provided upon construction, uses that to layout the subsection. Otherwise uses parent.
	 * @see EE_Div_Per_Section_Layout::layout_subsection() for documentation
	 * @param EE_Form_Section_Proper $form_section
	 * @return string
	 */
	public function layout_subsection( $form_section ) {
		if($this->_subsection_template_file){
			return EEH_Template::locate_template( $this->_subsection_template_file, $this->template_args(), TRUE, TRUE );
		}
		return parent::layout_subsection( $form_section );
	}



	/**
	 * closing div tag for a form
	 * @return string
	 */
	public function layout_form_end() {
		if($this->_layout_end_template_file){
			return EEH_Template::locate_template( $this->_layout_end_template_file, $this->template_args(), TRUE, TRUE);
		}else{
			return parent::layout_form_end();
		}
	}



	/**
	 * @param array $template_args
	 */
	public function set_template_args( $template_args = array() ) {
		$this->_template_args = $template_args;
	}



	/**
	 * @param array $template_args
	 */
	public function add_template_args( $template_args = array() ) {
		$this->_template_args = array_merge_recursive( $this->_template_args, $template_args );
	}



	/**
	 * @return array
	 */
	public function template_args() {
		foreach ( $this->form_section()->subsections() as $subsection_name => $subsection ) {
			$subsection_name = self::prep_form_subsection_key_name( $subsection_name );
			if ( strpos( $subsection_name, '[' ) !== FALSE ) {
				$sub_name = explode( '[', $subsection_name );
				$this->_template_args[ $sub_name[0] ][ rtrim( $sub_name[1], ']' ) ] = $this->layout_subsection( $subsection );
			} else {
				$this->_template_args[ $subsection_name ] = $this->layout_subsection( $subsection );
			}
		}
//		d( $this->_template_args );
		return $this->_template_args;
	}



	/**
	 * prep_form_section_key_name
	 *
	 * @access public
	 * @param string $subsection_name
	 * @return string
	 */
	public static function prep_form_subsection_key_name( $subsection_name = '' ) {
		$subsection_name = str_replace( array( '-', ' ' ), array( '', '_' ), $subsection_name );
		return is_numeric( substr( $subsection_name, 0, 1 )) ? 'form_' . $subsection_name : $subsection_name;
	}



	/**
	 * get_subform - just a wrapper for the above method
	 *
	 * @access public
	 * @param string $subsection_name
	 * @return string
	 */
	public static function get_subform_name( $subsection_name = '' ) {
		return EE_Template_Layout::prep_form_subsection_key_name( $subsection_name );
	}




}
// End of file EE_Template_Layout.strategy.php