<?php

if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EE_Restriction_Generator_Default_Public
 *
 * For generating capability restrictions for models which have a "default" qualifier,
 * and "others_default" qualifier; and where non-default model objects' access is
 * controlled by access to their related events.
 * The restrictions provide limited access to users with no capabilities, and
 * fuller access to users with more capabilities
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EE_Restriction_Generator_Default_Public extends EE_Restriction_Generator_Base {

	/**
	 *
	 * @return \EE_Default_Where_Conditions
	 */
	public function generate_restrictions() {

		switch ( $this->model()->get_this_model_name() ) {
			case 'Ticket':
				$default_field_name	 = 'TKT_is_default';
				$path_to_events = 'Datetime.Event.';
				break;
			case 'Price':
				$default_field_name	 = 'PRC_is_default';
				$path_to_events = 'Ticket.Datetime.Event.';
				break;

			default:
				throw new EE_Error( sprintf( __( 'Model %s is not a known model to EE_Restriction_Generator_Global. Please add a switch case for it in EE_Restriction_Generator_Global::generate_restrictions', 'event_espresso' ), $this->model()->get_this_model_name() ) );
		}
		//if there are no standard caps for this model, then for now all we know
		//if they need the default cap to access this
		if ( !$this->model()->cap_slug() ) {
			return array(
				self::get_default_restrictions_cap() => new EE_Return_None_Where_Conditions()
			);
		}

		$event_model = EEM_Event::instance();

		return array(
			//first: basically access to non-defaults is essentially controlled by which events are accessible
			//if they don't have the basic event cap, they can't access ANY non-default items
			self::get_cap_name($event_model, $this->action()) => new EE_Default_Where_Conditions( array( 'OR*no_' . self::get_cap_name($event_model, $this->action()) => array(
				$default_field_name => true,
				$path_to_events . 'status' => 'publish' ) ) ),
			//if they don't have the others event cap, they can only access their own, others' that are for published events, or defaults
			self::get_cap_name($event_model, $this->action() . '_others' ) => new EE_Default_Where_Conditions( array(
				'OR*no_' . self::get_cap_name($event_model, $this->action() . '_others' ) => array(
					$path_to_events . 'EVT_wp_user' => EE_Default_Where_Conditions::current_user_placeholder,
					$default_field_name => true,
					$path_to_events . 'status' => 'publish' ) ) ),
			//if they have basic and others, but not private, they acan access default, their own, and others' that aren't private
			self::get_cap_name($event_model, $this->action() . '_private' ) => new EE_Default_Where_Conditions(array(
				'OR*no_' .self::get_cap_name($event_model, $this->action() . '_private' ) => array(
					$path_to_events . 'EVT_wp_user' => EE_Default_Where_Conditions::current_user_placeholder,
					$path_to_events . 'status' => array( '!=', 'private' ),
					$default_field_name => true ) ) ),
			//second: access to defaults is controlled by the defaulty capabilities
			//if they don't have the basic default capability, restrict access to only non-default items
			EE_Restriction_Generator_Base::get_cap_name( $this->model(), $this->action() . '_default' )				 => new EE_Default_Where_Conditions( array( $default_field_name => false ) ),
			//if they don't have the "others" default capability, restrict access to only their default ones, and non-default ones
			EE_Restriction_Generator_Base::get_cap_name( $this->model(), $this->action() . '_others_default' )	 => new EE_Default_Where_Conditions( array(
				//if they don't have the others default cap, they can't access others default items (but they can access
				//their own default items, and non-default items)
				'OR*no_' . EE_Restriction_Generator_Base::get_cap_name( $this->model(), $this->action() . '_others_default' ) => array(
					'AND' => array(
					EE_Default_Where_Conditions::user_field_name_placeholder => EE_Default_Where_Conditions::current_user_placeholder,
						$default_field_name => true
						),
					$default_field_name => false
				) ) ) );
	}

}

// End of file EE_Restriction_Generator_Protected.strategy.php