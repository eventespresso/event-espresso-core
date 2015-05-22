<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EE_Restriction_Generator_Public
 * Generates cap restrictions array that essentially makes this model public
 * (however, if there's a status it IS still dependent on that),
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EE_Restriction_Generator_Public extends EE_Restriction_Generator_Base{
	protected function _generate_restrictions() {
		//if there are no standard caps for this model, then for allow full access
		if( ! $this->model()->cap_slug() ) {
			return array(
			);
		}

		$restrictions = array();
		//does the basic cap exist? (eg 'ee_read_registrations')
		if ( EE_Restriction_Generator_Base::is_cap( $this->model(), $this->action() ) ) {
			if ( $this->model() instanceof EEM_CPT_Base ) {
				$restrictions[ EE_Restriction_Generator_Base::get_cap_name( $this->model(), $this->action() ) ] = new EE_Default_Where_Conditions(
					array( 'status' => 'publish' )
				);
			} elseif ( $this->model() instanceof EEM_Soft_Delete_Base ) {
				$restrictions[ EE_Restriction_Generator_Base::get_cap_name( $this->model(), $this->action() ) ] = new EE_Default_Where_Conditions(
					array( $this->model()->deleted_field_name() => false )
				);
			} else {
				//don't impose any restrictions if they don't have the basic reading cap
			}
			//does the others cap exist? (eg 'ee_read_others_registrations')
			if ( EE_Restriction_Generator_Base::is_cap( $this->model(), $this->action() . '_others' ) ) {//both caps exist
				if ( $this->model() instanceof EEM_CPT_Base ) {
					//then if they don't have the others cap, AT MOST show them their own and other published ones
					$restrictions[ EE_Restriction_Generator_Base::get_cap_name( $this->model(), $this->action() . '_others' ) ] = new EE_Default_Where_Conditions(
						array(
							'OR*' . EE_Restriction_Generator_Base::get_cap_name( $this->model(), $this->action() . '_others' ) => array(
								EE_Default_Where_Conditions::user_field_name_placeholder => EE_Default_Where_Conditions::current_user_placeholder,
								'status' => 'publish'
							)
						) );
				} elseif ( $this->model() instanceof EEM_Soft_Delete_Base ) {
					//then if they don't have the other cap, AT MOST show them their own or non deleted ones
					$restrictions[ EE_Restriction_Generator_Base::get_cap_name( $this->model(), $this->action() . '_others' ) ] = new EE_Default_Where_Conditions(
						array(
							'OR*' . EE_Restriction_Generator_Base::get_cap_name( $this->model(), $this->action() . '_others' ) => array(
								EE_Default_Where_Conditions::user_field_name_placeholder => EE_Default_Where_Conditions::current_user_placeholder,
								$this->model()->deleted_field_name() => false
							)
						) );
				} else {
					//again, if they don't have the others cap, continue showing all because there are no inherently hidden ones
				}
				//does the private cap exist (eg 'ee_read_others_private_events')
				if ( EE_Restriction_Generator_Base::is_cap( $this->model(), $this->action() . '_private' ) && $this->model() instanceof EEM_CPT_Base ) {
					//if they have basic and others, but not private, restrict them to see theirs and others' that aren't private
					$restrictions[ EE_Restriction_Generator_Base::get_cap_name( $this->model(), $this->action() . '_private' ) ] = new EE_Default_Where_Conditions(
						array(
							'OR*' . EE_Restriction_Generator_Base::get_cap_name( $this->model(), $this->action() . '_private' ) => array(
								EE_Default_Where_Conditions::user_field_name_placeholder => EE_Default_Where_Conditions::current_user_placeholder,
								'status' => array( '!=', 'private' )
							)
						)
					);
				}

			}
		} else {
			//there is no basic cap. So allow full access
			$restrictions = array();
		}
		return $restrictions;
	}
}

// End of file EE_Restriction_Generator_Public.strategy.php