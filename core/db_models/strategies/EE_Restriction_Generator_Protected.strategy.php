<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EE_Restriction_Generator_Protected
 *
 * This generates restrictions (EE_Default_Where_Conditions[]) for a model. It dynamically
 * detects if there are basic capabilities (eg "read_things"), "others" capabilities (eg "read_others_things"),
 * and "private" capabilities.
 * If there are only basic capabilities, it controls access to all items.
 * If there are basic and "others" capabilities, the basic capabilities control access to one own's objects,
 * and the "others" capabilities control all access to others.
 * If there are all three, the basic capabilities control access to one's own objects,
 * the "others" capabilities control access to others' non-private objects, and
 * the "private" capabilities control access to others' private objects.
 * If there are no capabilities at all, the default capability in EE_Restriction_Generator_Base
 * controls all access to objects.
 *
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EE_Restriction_Generator_Protected extends EE_Restriction_Generator_Base{

	/**
	 * @return \EE_Default_Where_Conditions
	 */
	protected function _generate_restrictions() {

		//if there are no standard caps for this model, then for now all we know
		//if they need the default cap to access this
		if( ! $this->model()->cap_slug() ) {
			return array(
				EE_Restriction_Generator_Base::get_default_restrictions_cap() => new EE_Return_None_Where_Conditions()
			);
		}

		$restrictions = array();
		//does the basic cap exist? (eg 'ee_read_registrations')
		if ( EE_Restriction_Generator_Base::is_cap( $this->model(), $this->action() ) ) {
			$restrictions[ EE_Restriction_Generator_Base::get_cap_name( $this->model(), $this->action() ) ] = new EE_Return_None_Where_Conditions();
			//does the others cap exist? (eg 'ee_read_others_registrations')
			if ( EE_Restriction_Generator_Base::is_cap( $this->model(), $this->action() . '_others' ) ) {//both caps exist
				$restrictions[ EE_Restriction_Generator_Base::get_cap_name( $this->model(), $this->action() . '_others' ) ] = new EE_Default_Where_Conditions(
					array(
						EE_Default_Where_Conditions::user_field_name_placeholder => EE_Default_Where_Conditions::current_user_placeholder
					)
				);
				//does the private cap exist (eg 'ee_read_others_private_events')
				if ( EE_Restriction_Generator_Base::is_cap( $this->model(), $this->action() . '_private' ) && $this->model() instanceof EEM_CPT_Base ) {
					//if they have basic and others, but not private, restrict them to see theirs and others' that aren't private
					$restrictions[ EE_Restriction_Generator_Base::get_cap_name( $this->model(), $this->action() . '_private' ) ] = new EE_Default_Where_Conditions(
						array(
							'OR*no_' . EE_Restriction_Generator_Base::get_cap_name( $this->model(), $this->action() . '_private' ) => array(
								EE_Default_Where_Conditions::user_field_name_placeholder => EE_Default_Where_Conditions::current_user_placeholder,
								'status' => array( '!=', 'private' )
							)
						)
					);
				}
			}
		}else{
			//there is no basic cap. So they can only access this if they have the default admin cap
			$restrictions[ EE_Restriction_Generator_Base::get_default_restrictions_cap() ] = new EE_Return_None_Where_Conditions();
		}
		return $restrictions;
	}
}

// End of file EE_Restriction_Generator_Protected.strategy.php