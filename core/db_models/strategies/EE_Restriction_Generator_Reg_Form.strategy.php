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
	 * @return \EE_Default_Where_Conditions
	 */
	public static function generate_restrictions( $model, $action ) {

		switch( $model->get_this_model_name() ){
			case 'Question':
				$system_field_name = 'QST_system';
				break;
			case 'Question_Group':
				$system_field_name = 'QSG_system';
				break;
			case 'Question_Group_Question':
				$system_field_name = 'Question_Group.QSG_system';
				break;
			case 'Question_Option':
				$system_field_name = 'Question.QST_system';
				break;
			default:
				throw new EE_Error( sprintf( __( 'Model %s is not a known model to EE_Restriction_Generator_Reg_Form. Please add a switch case for it in EE_Restriction_Generator_Reg_Form::generate_restrictions', 'event_espresso' ), $model->get_this_model_name() ) );
		}
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
						'AND*allow-system-questions-so-far' => array(
							$system_field_name => array( 'NOT_IN', array( '', 0 ) ),
							$system_field_name . '*' => array( 'IS_NOT_NULL',)
						)
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