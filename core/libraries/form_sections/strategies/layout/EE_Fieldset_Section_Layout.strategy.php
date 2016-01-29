<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
 /**
 *
 * Class EE_Fieldset_Section_Layout
 *
 * Description
 *
 * @package         Event Espresso
 * @subpackage    core
 * @author				Brent Christensen
 * @since		 	   $VID:$
 *
 */
class EE_Fieldset_Section_Layout extends EE_Div_Per_Section_Layout{

	/**
	 * legend_class
	 * @var string
	 */
	protected $_legend_class;

	/**
	 * legend_text
	 * @var string
	 */
	protected $_legend_text;



	/**
	 *    construct
	 *
	 * @param array $options
	 */
	function __construct( $options = array() ){
		foreach( $options as $key => $value ) {
			$key = '_' . $key;
			if ( property_exists( $this, $key )) {
				$this->{$key} = $value;
			}
		}
	}


	/**
	 * opening div tag for a form
	 * @return string
	 */
	public function layout_form_begin() {
		$html = EEH_HTML::nl(1) . '<fieldset id="' . $this->_form_section->html_id() . '" class="' . $this->_form_section->html_class() . '" style="' . $this->_form_section->html_style() . '">';
		$html .= '<legend class="' . $this->legend_class() . '">' . $this->legend_text() . '</legend>';
		return $html;
	}



	/**
	 * closing div tag for a form
	 * @return string
	 */
	public function layout_form_end(){
		return EEH_HTML::nl(-1) . '</fieldset>';
	}



	/**
	 * @param string $legend_class
	 */
	public function set_legend_class( $legend_class ) {
		$this->_legend_class = $legend_class;
	}



	/**
	 * @return string
	 */
	public function legend_class() {
		return $this->_legend_class;
	}



	/**
	 * @param string $legend_text
	 */
	public function set_legend_text( $legend_text ) {
		$this->_legend_text = $legend_text;
	}



	/**
	 * @return string
	 */
	public function legend_text() {
		return $this->_legend_text;
	}



}
// End of file EE_Fieldset_Section_Layout.strategy.php
// Location: /EE_Fieldset_Section_Layout.strategy.php