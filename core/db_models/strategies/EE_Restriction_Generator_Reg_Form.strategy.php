<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EE_Restriction_Generator_Protected
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EE_Restriction_Generator_Reg_Form extends EE_Restriction_Generator_Base{

	/**
	 *
	 * @param EEM_CPT_Base $model
	 * @param type $action
	 * @param string $system_field_name the name of the field used to indicate system-ness. (You can specify the field on a related model too eh,
	 * eg "QST_system" is valid, but so is "Question.QST_system".)
	 * @return \EE_Default_Where_Conditions
	 */
	public static function generate_restrictions( $model, $action, $system_field_name ) {

		//if there are no standard caps for this model, then for now all we know
		//if they need the default cap to access this
		if( ! $model->cap_slug() ) {
			return array(
				self::get_default_restrictions_cap() => new EE_Return_None_Where_Conditions()
			);
		}

		return array(
			EE_Restriction_Generator_Base::get_cap_name(  $model, $action ) => new EE_Return_None_Where_Conditions(),
				EE_Restriction_Generator_Base::get_cap_name(  $model, $action . '_others' ) => new EE_Default_Where_Conditions( array(
					//I need to be the owner, or it must be a system question
					'OR*no_' . EE_Restriction_Generator_Base::get_cap_name( $model, $action . '_others' ) => array(
						EE_Default_Where_Conditions::user_field_name_placeholder => EE_Default_Where_Conditions::current_user_placeholder,
						$system_field_name => array( 'NOT_IN', array( '', 0 ) ),
						$system_field_name . '*' => array( 'IS_NOT_NULL',)
				) ) ),
				EE_Restriction_Generator_Base::get_cap_name(  $model, $action . '_system' ) => new EE_Default_Where_Conditions( array(
					'OR*no_' . EE_Restriction_Generator_Base::get_cap_name(  $model, $action . '_system' ) => array(
						$system_field_name => array( 'IN', array( '', 0 ) ),
						$system_field_name . '*' => array('IS_NULL'))
				)
			) );
	}
}

// End of file EE_Restriction_Generator_Protected.strategy.php