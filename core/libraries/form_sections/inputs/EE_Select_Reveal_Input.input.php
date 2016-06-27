<?php  if ( ! defined( 'EVENT_ESPRESSO_VERSION' )) { exit( 'No direct script access allowed' ); }
/**
 * Class EE_Select_Reveal_Input
 *
 * Generates an HTML <select> form input, which, when selected, will reveal
 * a sibling subsections whose names match the array keys of the $answer_options
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Mike Nelson
 * @since 				4.6
 *
 */
class EE_Select_Reveal_Input extends EE_Select_Input{

	/**
	 * @param array $answer_options Array keys which match a sibling section's name
	 *              will show/unhide that sibling subsection. Otherwise, siblings whose names
	 *              match array keys of $answer_options are hidden.
	 *              Note: internally each array key is considered a relative form input path
	 *              (see EE_Form_Section_Base::find_section_from_path) but relative
	 *              to THIS INPUT's PARENT section, not this input itself. ie,
	 *              a '../' is automatically added onto each each array key, to produce
	 *              the relative form input path.
	 *				Note however: array keys which are an EMPTY STRING are left as-is
	 *
	 * @param array $input_settings
	 */
	public function __construct( $answer_options, $input_settings = array() ){
		parent::__construct( $answer_options, $input_settings );
	}

	/**
	 * Gets all the sibling sections controlled by this reveal select input
	 * @return \EE_Form_Section_Base[] keys are their form section paths
	 */
	public function sibling_sections_controlled() {
		$sibling_sections = array();
		foreach( $this->options() as $sibling_section_name => $sibling_section ) {
			//if it's an empty string just leave it alone
			if( empty( $sibling_section_name ) ) {
				continue;
			}
			$sibling_section = $this->find_section_from_path( '../' . $sibling_section_name );
			if(
				$sibling_section instanceof EE_Form_Section_Base
				&& ! empty( $sibling_section_name ) 
			) {
				$sibling_sections[ $sibling_section_name ] = $sibling_section;
			}
		}
		return $sibling_sections;
	}

	/**
	 * Adds an entry of 'select_reveal_inputs' to the js data, which is an array
	 * whose top-level keys are select reveal input html ids; values are arrays
	 * whose keys are select option values and values are the sections they reveal
	 * @param array $form_other_js_data
	 * @return array
	 */
	public function get_other_js_data( $form_other_js_data = array() ) {
		$form_other_js_data = parent::get_other_js_data( $form_other_js_data );
		if( ! isset($form_other_js_data[ 'select_reveal_inputs' ] ) ) {
			$form_other_js_data[ 'select_reveal_inputs' ] = array();
		}
		$sibling_input_to_html_id_map = array();
		foreach( $this->sibling_sections_controlled() as $sibling_section_path => $sibling_section ) {
			$sibling_input_to_html_id_map[ $sibling_section_path ] = $sibling_section->html_id();
		}
		$form_other_js_data[ 'select_reveal_inputs' ][ $this->html_id() ] = $sibling_input_to_html_id_map;
		return $form_other_js_data;
	}

}