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
	 * Model for which restrictions are generated
	 * @var EEM_Base
	 */
	protected $_model;

	/**
	 * One of the consts on EEM_Base::caps_*
	 * @var string
	 */
	protected $_action;
	/**
	 * Puts the last necessary info onto the restriction genetor class. This is usually
	 * called by EEM_Base during its constructor, so child classes don't have to
	 * always provide this info.
	 * @param EEM_Base $model
	 * @param string $action
	 */
	public function _construct_finalize( EEM_Base $model, $action ){
		$this->_model = $model;
		$this->_action = $action;
	}

	/**
	 * Returns the model set for this restriction generator
	 * @return EEM_Base
	 */
	public function model() {
		if( ! $this->_model instanceof EEM_Base ) {
			throw new EE_Error( sprintf( __( 'Cannot generate capability restrictions because model has not yet been set on the %s. Please ensure _construct_finalize() was called', 'event_espresso' ), get_class( $this ) ) );
		}
		return $this->_model;
	}

	/**
	 * Returns the action this restriction generator will generate restrictions for.
	 * It should be one of EEM_Base::caps_* consts
	 * @return string
	 */
	public function action() {
		if( ! $this->_action ) {
			throw new EE_Error( sprintf( __( 'Cannot generate capability restrictions because model has not yet been set on the %s. Please ensure _construct_finalize() was called', 'event_espresso' ), get_class( $this ) ) );
		}
		return $this->_action;
	}

	/**
	 * Returns whether or not _construct_finalize() has been called on this restriction generator object
	 * @return boolean
	 */
	public function construction_finalized(){
		if( $this->_model instanceof EEM_Base  && $this->_action ){
			return true;
		}else{
			return false;
		}
	}

	/**
	 * Provided with the model, and using global knowledge about what capabilities exist,
	 * generates an array for use in one of the sub-arrays in EEM_Base::_cap_restrictions,
	 * where keys are capability names, and values are children of EE_Default_Where_Conditions
	 * @param EEM_Base $model the model in question
	 * @param string $action the base action to be performed, eg 'read','edit' or 'delete'
	 * @return array @see EEM_Base::_cap_restrictions
	 */
	public abstract function generate_restrictions();

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