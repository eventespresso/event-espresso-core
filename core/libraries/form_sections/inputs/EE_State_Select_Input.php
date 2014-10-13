<?php  if ( ! defined( 'EVENT_ESPRESSO_VERSION' )) { exit( 'No direct script access allowed' ); }
/**
 * Class EE_State_Select_Input
 *
 * Generates an HTML <select> form input
 * and populates it with a list of States from the wp_esp_state table
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Brent Christensen
 * @since 				$VID:$
 *
 */
class EE_State_Select_Input extends EE_Select_Input{

	/**
	 * @param array $state_options
	 * @param array $input_settings
	 */
	function __construct( $state_options, $input_settings = array() ){
		$state_options = $this->get_state_answer_options( $state_options );
		parent::__construct( $state_options, $input_settings );
	}



	/**
	 * get_state_answer_options
	 *
	 * @param array $state_options
	 * @return array
	 */
	public function get_state_answer_options( $state_options = NULL ){
		// if passed something that is NOT an array
		if ( ! is_array( $state_options )) {
			// get possibly cached list of states
			$states = EEM_State::instance()->get_all_active_states();
			if ( ! empty( $states )) {
				foreach( $states as $state ){
					if ( $state instanceof EE_State ) {
						$state_options[ $state->country()->name() ][ $state->ID() ] = $state->name();
					}
				}
			} else {
				$state_options = array();
			}
		}
		return $state_options;
	}




}