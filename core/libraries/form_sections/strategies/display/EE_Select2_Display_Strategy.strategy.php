<?php
/**
 *
 * Class EE_Select_Display_Strategy
 *
 * Extends the EE_Select_Display_Strategy to also enqueue the select2.js and js to
 * convert this input into a select2
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Mike Nelson
 * @since 				$VID:$
 *
 */
class EE_Select2_Display_Strategy extends EE_Select_Display_Strategy{

	/**
	 * Arguments that will be passed into the select2 javascript constructor
	 * @var array
	 */
	protected $_select2_js_args = array();

	/**
	 *
	 * @param array $select2_js_args pass in the EXACT array of JS arguments you want
	 * to pass into the select2 js/html input. See https://select2.github.io
	 */
	public function __construct( $select2_js_args = array() ) {
		$this->_select2_js_args = $select2_js_args;
		parent::__construct();
	}

	/**
	 * enqueues the select2 initializing js (which depends on the select2 js) and
	 * the select2 css
	 */
	public function enqueue_js() {
		// need to first deregister the select2 script in case some other plugin **cough cough Toolset Types cough**
		// is carelessly registering an older version of Select2 on admin pages that don't even belong to them
		wp_deregister_script( 'select2' );
		wp_deregister_style( 'select2' );
		wp_register_script( 'select2', EE_GLOBAL_ASSETS_URL . 'scripts/select2.min.js', array(), '4.0.2', true );
		wp_register_style( 'select2', EE_GLOBAL_ASSETS_URL . 'css/select2.min.css', array(), '4.0.2', 'all' );
		wp_enqueue_script( 'form_section_select2_init', EE_GLOBAL_ASSETS_URL . 'scripts/form_section_select2_init.js', array( 'select2' ), '1.0.0', true );
		wp_enqueue_style( 'select2', EE_GLOBAL_ASSETS_URL . 'css/select2.min.css', array(), '4.0.2', 'all' );
	}

	/**
	 * Gets the javascript args which will be localized and passed into the select2 js/html input
	 * @return array
	 */
	public function get_js_args() {
		return $this->_select2_js_args;
	}

	/**
	 * Sets the exact js args which will be passed into the select2 js/html input
	 * @param array $js_args
	 */
	public function set_js_args( $js_args ) {
		$this->_select2_js_args = $js_args;
	}

	/**
	 * Adds select2 data for localization
	 * @param array $other_js_data
	 * @return array
	 */
	public function get_other_js_data( $other_js_data = array() ) {
		$other_js_data = parent::get_other_js_data( $other_js_data );
		if( ! isset( $other_js_data[ 'select2s' ] ) ) {
			$other_js_data['select2s'] = array();
		}
		$other_js_data[ 'select2s' ][ $this->_input->html_id() ] = $this->get_js_args();
		return $other_js_data;
	}
}