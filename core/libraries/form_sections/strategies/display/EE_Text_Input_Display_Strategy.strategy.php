<?php
/**
 * Class EE_Text_Input_Display_Strategy
 * Display strategy that handles how to display form inputs that represent basic
 * "text" type inputs, including "password", "email" and any other inputs that
 * are essentially the same as "text", except they just have a different "type" attribute
 *
 * @package 			Event Espresso
 * @subpackage    core
 * @author 				Mike Nelson
 * @since               	4.6
 *
 */
class EE_Text_Input_Display_Strategy extends EE_Display_Strategy_Base{
	/**
	 * The html "type" attribute value. default is "text"
	 * @var string
	 */
	protected $_type;



	/**
	 * @param string $type
	 */
	function __construct( $type = 'text' ) {
		$this->_type = $type;
		parent::__construct();
	}



	/**
	 * Gets the html "type" attribute's value
	 * @return string
	 */
	function get_type(){
		if (
			$this->_type == 'email'
			&& ! apply_filters( 'FHEE__EE_Text_Input_Display_Strategy__use_html5_email', false )
		) {
			return 'text';
		}
		return $this->_type;
	}



	/**
	 *
	 * @return string of html to display the field
	 */
	function display(){
		$input = '<input type="'. $this->get_type() .'"';
		$input .= ' name="' . $this->_input->html_name() . '"';
		$input .= ' id="' . $this->_input->html_id() . '"';
		$class = $this->_input->required() ? $this->_input->required_css_class() . ' ' . $this->_input->html_class() : $this->_input->html_class();
		$input .= ' class="' . $class . '"';
		// add html5 required
		$input .= $this->_input->required() ? ' required' : '';
		$input .= ' value="' . $this->_input->raw_value_in_form() . '"';
		$input .= ' style="' . $this->_input->html_style() . '"';
		$input .= $this->_input->other_html_attributes();
		$input .= '/>';
		return $input;
	}

}