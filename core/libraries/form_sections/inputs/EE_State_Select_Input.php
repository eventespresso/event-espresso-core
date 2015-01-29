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
 * @ version		 	4.6
 *
 * ------------------------------------------------------------------------
 *
 * EE_State_Select_Input
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
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