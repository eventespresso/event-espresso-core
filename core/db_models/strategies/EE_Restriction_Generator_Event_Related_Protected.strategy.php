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
 * With no capabilities, no access is given; but with certain capabilities more
 * access is given.
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EE_Restriction_Generator_Event_Related_Protected extends EE_Restriction_Generator_Base {

	/**
	 * Path to the event model from the model this restriction generator will be applied to;
	 * including the event model itself. Eg "Ticket.Datetime.Event"
	 * @var string
	 */
	protected $_path_to_event_model = null;

	/**
	 * Capability context on event model when creating restrictions.
	 * Eg, although we may want capability restrictions relating to deleting datetimes,
	 * they don't need to be able to DELETE EVENTS, they just need to be able to
	 * EDIT EVENTS in order to DELETE DATETIMES.
	 * @var string one of EEM_Base::valid_cap_contexts()
	 */
	protected $_cap_context_on_event_model = null;
	/**
	 *
	 * @param string $path_to_event_model
	 * @param string $cap_context_on_event_model  capability context on event model when creating restrictions.
	 * Eg, although we may want capability restrictions relating to deleting datetimes,
	 * they don't need to be able to DELETE EVENTS, they just need to be able to
	 * EDIT EVENTS in order to DELETE DATETIMES. If none if provided, assumed to be the same
	 * as on the primary model.
	 */
	public function __construct( $path_to_event_model, $cap_context_on_event_model = null ) {
		if( substr( $path_to_event_model, -1, 1 ) != '.' ) {
			$path_to_event_model .= '.';
		}
		$this->_path_to_event_model = $path_to_event_model;
		$this->_cap_context_on_event_model = $cap_context_on_event_model;
	}

	/**
	 * Returns `$this->_cap_context_on_event_model`, the relevant action ("read",
	 * "read_admin", "edit" or "delete") for the EVENT related to this model.
	 * @see EE_Restriction_Generator_Event_Related_Protected::__construct()
	 * @return string one of EEM_Base::valid_cap_contexts()
	 */
	protected function action_for_event() {
		if( $this->_cap_context_on_event_model ) {
			return $this->_cap_context_on_event_model;
		}else{
			return $this->action();
		}
	}

	/**
	 *
	 * @return \EE_Default_Where_Conditions
	 */
	protected function _generate_restrictions() {
		//if there are no standard caps for this model, then for now all we know
		//if they need the default cap to access this
		if ( ! $this->model()->cap_slug() ) {
			return array(
				self::get_default_restrictions_cap() => new EE_Return_None_Where_Conditions()
			);
		}

		$event_model = EEM_Event::instance();
		return array(
			//first: basically access to non-defaults is essentially controlled by which events are accessible
			//if they don't have the basic event cap, they can't access ANY non-default items
			EE_Restriction_Generator_Base::get_cap_name( $event_model, $this->action_for_event() )              => new EE_Return_None_Where_Conditions(),
			//if they don't have the others event cap, they can't access others' non-default items
			EE_Restriction_Generator_Base::get_cap_name( $event_model, $this->action_for_event() . '_others' )  => new EE_Default_Where_Conditions(
				array( $this->_path_to_event_model . 'EVT_wp_user' => EE_Default_Where_Conditions::current_user_placeholder )
			),
			//if they have basic and others, but not private, they can't access others' private non-default items
			EE_Restriction_Generator_Base::get_cap_name( $event_model, $this->action_for_event() . '_private' ) => new EE_Default_Where_Conditions(
				array(
					'OR*no_' . EE_Restriction_Generator_Base::get_cap_name( $event_model, $this->action_for_event() . '_private' ) => array(
						$this->_path_to_event_model . 'EVT_wp_user' => EE_Default_Where_Conditions::current_user_placeholder,
						$this->_path_to_event_model . 'status'      => array( '!=', 'private' )
					)
				)
			),
		);
	}

}

// End of file EE_Restriction_Generator_Protected.strategy.php