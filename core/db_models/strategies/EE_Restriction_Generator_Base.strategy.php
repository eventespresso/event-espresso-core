<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EE_Restriction_Generator_Base
 * Create an array of restrictions (@see EEM_Base::_cap_restrictions)
 * based off the model
 *
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
abstract class EE_Restriction_Generator_Base {

	/**
	 * Provided with the model, and using global knowledge about what capabilities exist,
	 * generates an array for use in one of the sub-arrays in EEM_Base::_cap_restrictions,
	 * where keys are capability names, and values are children of EE_Default_Where_Conditions
	 * @param EEM_Base $model the model in question
	 * @param string $action the base action to be performed, eg 'read','edit' or 'delete'
	 * @return array @see EEM_Base::_cap_restrictions
	 */
	public static function generate_restrictions( $model, $action ){
		throw new EE_Error( 'generate_restrictions should be called on children, not the base EE_Restriction_Generator_Base');
	}

	/**
	 * Given an action like 'edit' generates the cap name based off
	 * the EEM_Base::_cap_slug, which for events would be 'events', to generate the
	 * cap name like 'ee_edit_events'.
	 * If a $qualifier is passed,
	 * @param EEM_Base $model
	 * @param string $action
	 * @return string
	 */
	public static function get_cap_name( $model, $action ) {
		return ( $model->is_wp_core_model() ? '' : 'ee_' ) . $action . '_' . $model->cap_slug();
	}

	/**
	 * Checks if there is a cap for this model and this action
	 * @param EEM_Base $model
	 * @param string $action
	 * @return boolean
	 */
	public static function is_cap( $model, $action ) {
		$caps_for_admin = EE_Registry::instance()->CAP->get_ee_capabilities( 'administrator' );
		if( in_array( self::get_cap_name( $model, $action ), $caps_for_admin ) ) {
			return true;
		}else{
			return false;
		}
	}

	/**
	 * Returns the default capability used to determine if the current user can
	 * access something.
	 * @return string
	 */
	public static function get_default_restrictions_cap() {
		return apply_filters( 'FHEE__EE_Restriction_Generator_Base__default_restrictions_cap', 'manage_options' );
	}
}

// End of file EE_Restriction_Generator_Base.strategy.php