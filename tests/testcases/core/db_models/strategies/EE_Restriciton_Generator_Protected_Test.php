<?php

if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 * EE_Restriction_Generator_Protected_Test
 *
 * @package     Event Espresso
 * @subpackage  tests
 * @author      Mike Nelson
 * @group       core/db_models
 * @group       restriction-generators
 */
class EE_Restriction_Generator_Protected_Test extends EE_UnitTestCase {

	function test_generate_restrictions__basic_only() {
		//currently transactions only have the basic cap
		//if they get an 'ee_edit_others_transactions' cap, this test will need updating
		$generator = new EE_Restriction_Generator_Protected();
		$generator->_construct_finalize( EEM_Transaction::instance(), EEM_Base::caps_read );
		$restrictions = $generator->generate_restrictions();
		foreach ( $restrictions as $default_where_conditions ) {
			$default_where_conditions->_finalize_construct( EEM_Registration::instance() );
		}
		$this->assertArrayHasKey( 'ee_read_transactions', $restrictions );
		$this->assertInstanceOf( 'EE_Return_None_Where_Conditions', $restrictions[ 'ee_read_transactions' ] );
		$this->assertEquals( 1, count( $restrictions ) );
	}

	function test_generate_restrictions__basic_and_others() {
        $this->loadFactories();
		global $current_user;
		$current_user = $this->factory->user->create_and_get();
		//currently registrations have the 'ee_read_registrations' and 'ee_read_others_registrations' permissions
		//if that changes, this will need to be updated
		$generator = new EE_Restriction_Generator_Protected();
		$generator->_construct_finalize( EEM_Registration::instance(), EEM_Base::caps_read );
		$restrictions = $generator->generate_restrictions();
		foreach ( $restrictions as $default_where_conditions ) {
			$default_where_conditions->_finalize_construct( EEM_Registration::instance() );
		}
		$this->assertArrayHasKey( 'ee_read_registrations', $restrictions );
		$this->assertInstanceOf( 'EE_Return_None_Where_Conditions', $restrictions[ 'ee_read_registrations' ] );
		$this->assertArrayHasKey( 'ee_read_others_registrations', $restrictions );
		$this->assertInstanceOf( 'EE_Default_Where_Conditions', $restrictions[ 'ee_read_others_registrations' ] );
		$this->assertEquals( array( EEM_Registration::instance()->wp_user_field_name() => get_current_user_id() ), $restrictions[ 'ee_read_others_registrations' ]->get_default_where_conditions() );
		$this->assertEquals( 2, count( $restrictions ) );
	}

	function test_generate_restrictions__basic_and_others_and_private() {
		//currently events have the 'ee_read_events', 'ee_read_others_events', and 'ee_read_others_private_events' caps
		//if that changes, this will need to be updated
		$generator = new EE_Restriction_Generator_Protected();
		$generator->_construct_finalize( EEM_Event::instance(), EEM_Base::caps_read );
		$restrictions = $generator->generate_restrictions();
		foreach ( $restrictions as $default_where_conditions ) {
			$default_where_conditions->_finalize_construct( EEM_Event::instance() );
		}
		$this->assertArrayHasKey( 'ee_read_events', $restrictions );
		$this->assertInstanceOf( 'EE_Return_None_Where_Conditions', $restrictions[ 'ee_read_events' ] );

		$this->assertArrayHasKey( 'ee_read_others_events', $restrictions );
		$this->assertInstanceOf( 'EE_Default_Where_Conditions', $restrictions[ 'ee_read_others_events' ] );
		$this->assertEquals(
		array( EEM_Event::instance()->wp_user_field_name() => get_current_user_id() ), $restrictions[ 'ee_read_others_events' ]->get_default_where_conditions() );

		$this->assertArrayHasKey( 'ee_read_private_events', $restrictions );
		$this->assertInstanceOf( 'EE_Default_Where_Conditions', $restrictions[ 'ee_read_private_events' ] );
		$this->assertEquals( array(
			'OR*no_' . EE_Restriction_Generator_Base::get_cap_name( EEM_Event::instance(), 'read_private' ) => array(
				EEM_Event::instance()->wp_user_field_name()	 => get_current_user_id(),
				'status'									 => array( '!=', 'private' ) ) ), $restrictions[ 'ee_read_private_events' ]->get_default_where_conditions() );
		$this->assertEquals( 3, count( $restrictions ) );
	}

}

// End of file EE_Restriciton_Generator_Protected_Test.php