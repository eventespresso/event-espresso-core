<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EE_Restriction_Generator_Reg_Form
 * For generating default where conditions relating to caps for questions, question groups,
 * and question-group-question models. These are distinct in that they have
 * "system" items which
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EE_Restriction_Generator_Reg_Form extends EE_Restriction_Generator_Base{

	/**
	 *
	 * @var string the name of the field that indicates whether or not this is a system thing
	 */
	protected $_system_field_name = null;

	/**
	 * Accepts the name of the field that indicates whether or not an object is a "system" one or not
	 * @param string $system_field_name
	 */
	public function __construct( $system_field_name ) {
		$this->_system_field_name = $system_field_name;
	}


	/**
	 *
	 * @return \EE_Default_Where_Conditions
	 * @throws EE_Error
	 */
	protected function _generate_restrictions() {
		//if there are no standard caps for this model, then for now all we know
		//if they need the default cap to access this
		if( ! $this->model()->cap_slug() ) {
			return array(
				EE_Restriction_Generator_Base::get_default_restrictions_cap() => new EE_Return_None_Where_Conditions()
			);
		}
		return array(
			EE_Restriction_Generator_Base::get_cap_name( $this->model(), $this->action() ) => new EE_Return_None_Where_Conditions(),
			EE_Restriction_Generator_Base::get_cap_name( $this->model(), $this->action() . '_system' ) => new EE_Default_Where_Conditions(
				array(
					'OR*no_' . EE_Restriction_Generator_Base::get_cap_name( $this->model(), $this->action() . '_system' ) => array(
						$this->_system_field_name       => array( 'IN', array( '', 0 ) ),
						$this->_system_field_name . '*' => array( 'IS_NULL' )
					)
				)
			)
		);
	}
}

// End of file EE_Restriction_Generator_Protected.strategy.php