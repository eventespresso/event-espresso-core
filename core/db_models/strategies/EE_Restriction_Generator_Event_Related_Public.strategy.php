<?php

if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EE_Restriction_Generator_Event_Related_Public
 *
 * For generating capability restrictions for models whose access is actually
 * dictated by the events they are related to.
 * Limited access is given to users with no capabilities, but more access is given
 * to users with more capabilities.
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EE_Restriction_Generator_Event_Related_Public extends EE_Restriction_Generator_Base {

	/**
	 *
	 * @param EEM_CPT_Base $model
	 * @param type $action
	 * @return \EE_Default_Where_Conditions
	 */
	public static function generate_restrictions( $model, $action ) {

		switch ( $model->get_this_model_name() ) {
			case 'Ticket':
				$path_to_events = 'Datetime.Event.';
				break;
			case 'Price':
				$path_to_events = 'Ticket.Datetime.Event.';
				break;
			case 'Datetime':
				$path_to_events = 'Event.';
				break;
			default:
				throw new EE_Error( sprintf( __( 'Model %s is not a known model to EE_Restriction_Generator_Global. Please add a switch case for it in EE_Restriction_Generator_Global::generate_restrictions', 'event_espresso' ), $model->get_this_model_name() ) );
		}
		//if there are no standard caps for this model, then for now all we know
		//if they need the default cap to access this
		if ( !$model->cap_slug() ) {
			return array(
				self::get_default_restrictions_cap() => new EE_Return_None_Where_Conditions()
			);
		}

		$event_model = EEM_Event::instance();

		return array(
			//first: basically access to non-defaults is essentially controlled by which events are accessible
			//if they don't have the basic event cap, they can only read things for published events
			self::get_cap_name($event_model, $action) => new EE_Default_Where_Conditions( array( $path_to_events . 'status' => 'publish' ) ),
			//if they don't have the others event cap, they can't access others' non-default items
			self::get_cap_name($event_model, $action . '_others' ) => new EE_Default_Where_Conditions(
							array(
								'OR*' . self::get_cap_name($event_model, $action . '_others' ) => array(
									$path_to_events . 'EVT_wp_user' => EE_Default_Where_Conditions::current_user_placeholder,
									$path_to_events . 'status' => 'publish' ) ) ),
			//if they have basic and others, but not private, they can't access others' private non-default items
			self::get_cap_name($event_model, $action . '_private' ) => new EE_Default_Where_Conditions(array(
				'OR*no_' .self::get_cap_name($event_model, $action . '_private' ) => array(
				$path_to_events . 'EVT_wp_user' => EE_Default_Where_Conditions::current_user_placeholder,
				$path_to_events . 'status' => array( '!=', 'private' ) ) ) ),
			 );
	}

}

// End of file EE_Restriction_Generator_Protected.strategy.php