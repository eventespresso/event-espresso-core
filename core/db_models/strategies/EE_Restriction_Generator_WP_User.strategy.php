<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EE_Restriction_Generator_Protected
 *
 * Special restrictions for WP Users. Basically users can always access themselves,
 * but their access to other users is controlled by conditions
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EE_Restriction_Generator_WP_User extends EE_Restriction_Generator_Base{

	/**
	 * @return \EE_Default_Where_Conditions
	 */
	protected function _generate_restrictions() {

		return array(
			//if they can't access users, they can still access themselves
			EE_Restriction_Generator_Base::get_cap_name( $this->model(), $this->action() ) => new EE_Default_Where_Conditions( array(
				EE_Default_Where_Conditions::user_field_name_placeholder => EE_Default_Where_Conditions::current_user_placeholder
			)),

		);
	}
}

// End of file EE_Restriction_Generator_Protected.strategy.php