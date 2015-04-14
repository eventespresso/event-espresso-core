<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EE_Return_None_Where_Conditions_Test
 *
 * REturns where conditiosn to ensure only items the current user can access are returned
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 * @group default_where_conditions
 *
 */
class EE_Owner_Only_Where_Conditions_Test extends EE_UnitTestCase{
	function test_get_default_where_conditions(){
		$value1 = 12;
		global $current_user;
		$current_user = $this->factory->user->create_and_get();
		$current_user->add_role( 'administrator' );

		$default_where_conditions = new EE_Owner_Only_Where_Conditions();
		$default_where_conditions->_finalize_construct( EEM_Registration::instance() );
		$this->assertEquals(
				array(
					'Registration.Event.EVT_wp_user' => $current_user->ID
				)
			,
				$default_where_conditions->get_default_where_conditions( 'Registration' ));
	}
}

// End of file EE_Return_None_Where_Conditions_Test.php