<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EE_Restriciton_Generator_Protected_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EE_Restriciton_Generator_Protected_Test extends EE_UnitTestCase{
	function test_generate_restrictions__basic_only() {
		//currently transactions only have the basic cap
		//if they get an 'ee_edit_others_transactions' cap, this test will need updating
		$restrictions = EE_Restriction_Generator_Protected::generate_restrictions(EEM_Transaction::instance(), 'read' );
		$this->assertArrayHasKey( 'ee_read_transactions', $restrictions );
		$this->assertInstanceOf( 'EE_Return_None_Where_Conditions', $restrictions['ee_read_transactions' ] );
		$this->assertEquals( 1, count( $restrictions ) );
	}

	function test_generate_restrictions__basic_and_others() {
		//currently registrations have the 'ee_read_registrations' and 'ee_read_others_registrations' permissions
		//if that changes, this will need to be updated
		$restrictions = EE_Restriction_Generator_Protected::generate_restrictions(  EEM_Registration::instance(), 'read' );
		$this->assertArrayHasKey( 'ee_read_registrations', $restrictions );
		$this->assertInstanceOf( 'EE_Return_None_Where_Conditions', $restrictions['ee_read_registrations' ] );
		$this->assertArrayHasKey( 'ee_read_others_registrations', $restrictions );
		$this->assertInstanceOf( 'EE_Owner_Only_Where_Conditions', $restrictions['ee_read_others_registrations' ] );
		$this->assertEquals( 2, count( $restrictions ) );
	}

	function test_generate_restrictions__basic_and_others_and_private() {
		//currently events have the 'ee_read_events', 'ee_read_others_events', and 'ee_read_others_private_events' caps
		//if that changes, this will need to be updated
		$restrictions = EE_Restriction_Generator_Protected::generate_restrictions(  EEM_Event::instance(), 'read' );
		$this->assertArrayHasKey( 'ee_read_events', $restrictions );
		$this->assertInstanceOf( 'EE_Return_None_Where_Conditions', $restrictions['ee_read_events' ] );
		$this->assertArrayHasKey( 'ee_read_others_events', $restrictions );
		$this->assertInstanceOf( 'EE_Owner_Only_Where_Conditions', $restrictions['ee_read_others_events' ] );
		$this->assertArrayHasKey( 'ee_read_private_events', $restrictions );
		$this->assertInstanceOf( 'EE_Default_Where_Conditions', $restrictions['ee_read_private_events' ] );
		$this->assertEquals( 3, count( $restrictions ) );
	}
}

// End of file EE_Restriciton_Generator_Protected_Test.php