<?php  if ( ! defined( 'EVENT_ESPRESSO_VERSION' )) { exit( 'No direct script access allowed' ); }
/**
 * Class EE_Select_Input
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
	 * @param array $answer_options. Array keys which match a sibling subsection's name
	 * will show/unhide that sibling subsection. Otherwise, siblings whose names
	 * match array keys of $answer_options are hidden
	 * @param array $input_settings
	 */
	function __construct( $answer_options, $input_settings = array() ){
		parent::__construct( $answer_options, $input_settings );
	}

}