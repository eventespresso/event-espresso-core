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
	public static function generate_restrictions( $model, $action ) {
		//if there are no standard caps for this model, then for allow full access
		if( ! $model->cap_slug() ) {
			return array(
			);
		}

		$restrictions = array();

		//does the basic cap exist? (eg 'ee_read_registrations')
		if( self::is_cap($model, $action) ) {
			if( $model instanceof EEM_CPT_Base ){
				$restrictions[ self::get_cap_name($model, $action) ] = new EE_Default_Where_Conditions( array( 'status' => 'publish' ) );
			}elseif( $model instanceof EEM_Soft_Delete_Base ) {
				$restrictions[ self::get_cap_name($model, $action) ] = new EE_Default_Where_Conditions( array( $model->deleted_field_name() => false ) );
			}else{
				//dont impose any restrictions if they don't have the basic reading cap
			}
			//does the others cap exist? (eg 'ee_read_others_registrations')
			if( self::is_cap($model, $action . '_others' ) ) {//both caps exist
				if( $model instanceof EEM_CPT_Base ) {
					//then if they don't have the others cap, AT MOST show them their own and other published ones
					$restrictions[ self::get_cap_name($model, $action . '_others' ) ] = new EE_Default_Where_Conditions(
							array(
								'OR*' . self::get_cap_name($model, $action . '_others' ) => array(
									EE_Default_Where_Conditions::user_field_name_placeholder => EE_Default_Where_Conditions::current_user_placeholder,
									'status' => 'publish' ) ) );
				}elseif( $model instanceof EEM_Soft_Delete_Base ){
					//then if they don't have the othehr cap, AT MOST show them their own or undeleted ones
					$restrictions[ self::get_cap_name($model, $action . '_others' ) ] = new EE_Default_Where_Conditions(
							array(
								'OR*' . self::get_cap_name($model, $action . '_others' ) => array(
									EE_Default_Where_Conditions::user_field_name_placeholder => EE_Default_Where_Conditions::current_user_placeholder,
									$model->deleted_field_name() => false ) ) );
				}else{
					//again, if they don't have the others cap, continue showing all because there are no inherently hidden ones
				}
				//does the private cap exist (eg 'ee_read_others_private_events')
				if( self::is_cap( $model, $action . '_private' ) && $model instanceof EEM_CPT_Base ){
					//if they have basic and others, but not private, restrict them to see theirs and others' that aren't private
					$restrictions[ self::get_cap_name($model, $action . '_private' ) ] = new EE_Default_Where_Conditions(
							array(
								'OR*' . self::get_cap_name($model, $action . '_private' ) => array(
									EE_Default_Where_Conditions::user_field_name_placeholder => EE_Default_Where_Conditions::current_user_placeholder,
									'status' => array( '!=', 'private' ) ) ) );
					;
				}

			}
		}else{
			//there is no basic cap. So allow fulla ccess
			$restrictions = array();
		}
		return $restrictions;
	}
}

// End of file EE_Restriction_Generator_Public.strategy.php