<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EE_Default_Where_Conditions_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 * @group default_where_conditions
 */
class EE_Default_Where_Conditions_Test extends EE_UnitTestCase{
	function test_add_model_relation_chain_onto_where_conditions(){
		$value1 = 12;
		$value2 = 23;
		$value3= array( 1,2,3);
		$value4 = 'eee';
		$default_where_conditions = new EE_Default_Where_Conditions( array( 'OR*' => array( 'EVT_ID' => $value1, 'Datetime.DTT_ID' => $value2 ), 'AND' => array( 'EVT_name' => array( 'IN', $value3 ) ) ) );
		$default_where_conditions->_finalize_construct( EEM_Event::instance() );
		$this->assertEquals(
				array( 'OR*' => array( 'Event.EVT_ID' => $value1, 'Event.Datetime.DTT_ID' => $value2 ), 'AND' => array( 'Event.EVT_name' => array( 'IN', $value3 ), 'Event.Datetime.DTT_name' => $value4 ) ),
				$default_where_conditions->add_model_relation_chain_onto_where_conditions(
						array( 'OR*' => array( 'EVT_ID' => $value1, 'Datetime.DTT_ID' => $value2 ), 'AND' => array( 'EVT_name' => array( 'IN', $value3 ), 'Datetime.DTT_name' => $value4 ) ), 'Event.' ));
	}

	/**
	 * tests teh odd case where we want to add a model relation chain that goes back on itself
	 */
//	function test_add_model_relation_chain_onto_where_conditions__reciprocal_relation(){
//		$value1 = 12;
//		$default_where_conditions = new EE_Default_Where_Conditions( array( 'Event.EVT_wp_user' => $value1 ) );
//		$default_where_conditions->_finalize_construct( EEM_Registration::instance() );
//		//pretend we were querying events, and we joined to the registrations model, and so the
//		//registration's model added a default where condition to only return registrations for events owned
//		//by teh current user. eg EEM_Event::instance()->get_all( array( array( 'Registration.REG_ID' => 12 ) );
//		$this->assertEquals(
//				array(
//					'EVT_wp_user' => $value1
//					//NOT Event.Event.EVT_wp_user
//				)
//			,
//				$default_where_conditions->add_model_relation_chain_onto_where_conditions( array( 'Event.EVT_wp_user' => $value1 ), 'Registration.' ));
//	}
}

// End of file EE_Default_Where_Conditions_Test.php