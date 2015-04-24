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
class EE_Restriction_Generator_Global extends EE_Restriction_Generator_Base {

	/**
	 * name of the model field that indicates whether or not
	 * @var string
	 */
	protected $_global_field_name;
	/**
	 *
	 * @param string $global_field_name name of the model field that indicates whether or not
	 * a model object is "global"
	 */
	public function __construct( $global_field_name ) {
		$this->_global_field_name = $global_field_name;
	}

	/**
	 * @return \EE_Default_Where_Conditions
	 */
	public function generate_restrictions() {

		//if there are no standard caps for this model, then for now all we know
		//if they need the default cap to access this
		if ( !$this->model()->cap_slug() ) {
			return array(
				self::get_default_restrictions_cap() => new EE_Return_None_Where_Conditions()
			);
		}

		return array(
			EE_Restriction_Generator_Base::get_cap_name( $this->model(), $this->action() )				 => new EE_Return_None_Where_Conditions(),
			EE_Restriction_Generator_Base::get_cap_name( $this->model(), $this->action() . '_others' )	 => new EE_Default_Where_Conditions( array(
				//I need to be the owner, or it must be a global item
				'OR*no_' . EE_Restriction_Generator_Base::get_cap_name( $this->model(), $this->action() . '_others' ) => array(
					EE_Default_Where_Conditions::user_field_name_placeholder => EE_Default_Where_Conditions::current_user_placeholder,
					$this->_global_field_name => true
				) ) ),
			EE_Restriction_Generator_Base::get_cap_name( $this->model(), $this->action() . '_global' ) => new EE_Default_Where_Conditions( array(
				//it mustn't be global
				$this->_global_field_name => false )
			) );
	}

}

// End of file EE_Restriction_Generator_Protected.strategy.php