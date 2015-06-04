<?php
if (!defined('EVENT_ESPRESSO_VERSION')) {
	exit('No direct script access allowed');
}
/**
 *
 * EE_Registry_Test
 *
 * @package            Event Espresso
 * @subpackage    core
 * @author                Mike Nelson, Brent Christensen
 *
 */
class EE_Registry_Test extends EE_UnitTestCase{



	public function setUp() {
		require_once EE_TESTS_DIR . 'mocks/EE_Registry_Mock.php';
		parent::setUp();
	}



	/**
	 * this tests that objects cached using the EE_Registry class abbreviations can be retrieved
	 * @group                8284
	 * @author                Brent Christensen
	 */
	public function test_get_cached_class_abbreviations() {
		// verify that Session has not already been loaded
		$cached_class = EE_Registry_Mock::instance()->get_cached_class( 'EE_Session' );
		$this->assertEquals( null, $cached_class );
		// create a stdClass object will use to mock the session
		$session = new stdClass();
		$session->name = 'EE_Session';
		// and manually cache it at EE_Registry_Mock::instance()->SSN
		EE_Registry_Mock::instance()->SSN = $session;
		// now attempt to retrieve it
		$cached_class = EE_Registry_Mock::instance()->get_cached_class( 'EE_Session' );
		$this->assertEquals( $session->name, $cached_class->name );
	}



	/**
	 * this tests that objects cached directly as EE_Registry_Mock properties can be retrieved
	 * @group                8284
	 * @author                Brent Christensen
	 */
	public function test_get_cached_class_property() {
		// verify that "Some_Class" has not already been loaded
		$cached_class = EE_Registry_Mock::instance()->get_cached_class( 'Some_Class' );
		$this->assertEquals( null, $cached_class );
		// create a stdClass object will use to mock the class
		$orig_class = new stdClass();
		$orig_class->name = 'Some_Class';
		// and manually cache it at EE_Registry_Mock::instance()->Some_Class
		EE_Registry_Mock::instance()->Some_Class = $orig_class;
		//echo "\n EE_Registry_Mock::instance()->{Some_Class} \n";
		//if ( isset( EE_Registry_Mock::instance()->Some_Class ) ) {
		//	var_dump( EE_Registry_Mock::instance()->Some_Class );
		//}
		// now attempt to retrieve it
		$cached_class = EE_Registry_Mock::instance()->get_cached_class( 'Some_Class' );
		$this->assertEquals( $orig_class->name, $cached_class->name );
	}



	/**
	 * this tests that objects cached on EE_Registry->LIB can be retrieved
	 * @group                8284
	 * @author                Brent Christensen
	 */
	public function test_get_cached_class_library() {
		// verify that "Library_Class" has not already been loaded
		$cached_class = EE_Registry_Mock::instance()->get_cached_class( 'Library_Class' );
		$this->assertEquals( null, $cached_class );
		// create a stdClass object will use to mock the class
		$orig_class = new stdClass();
		$orig_class->name = 'Library_Class';
		// and manually cache it at EE_Registry_Mock::instance()->Some_Class
		EE_Registry_Mock::instance()->LIB->Library_Class = $orig_class;
		//echo "\n EE_Registry_Mock::instance()->LIB->{Library_Class} \n";
		//if ( isset( EE_Registry_Mock::instance()->LIB->Library_Class ) ) {
		//	var_dump( EE_Registry_Mock::instance()->LIB->Library_Class );
		//}
		// now attempt to retrieve it
		$cached_class = EE_Registry_Mock::instance()->get_cached_class( 'Library_Class' );
		$this->assertEquals( $orig_class->name, $cached_class->name );
	}



	/**
	 * this tests that objects cached on EE_Registry->addons can be retrieved
	 * @group                8284
	 * @author                Brent Christensen
	 */
	public function test_get_cached_class_addon() {
		// verify that "Addon_Class" has not already been loaded
		$cached_class = EE_Registry_Mock::instance()->get_cached_class( 'Addon_Class', 'addon' );
		$this->assertEquals( null, $cached_class );
		// create a stdClass object will use to mock the class
		$orig_class = new stdClass();
		$orig_class->name = 'Addon_Class';
		// and manually cache it at EE_Registry_Mock::instance()->addons->Addon_Class
		EE_Registry_Mock::instance()->addons->Addon_Class = $orig_class;
		//echo "\n EE_Registry_Mock::instance()->addons->{Addon_Class} \n";
		//if ( isset( EE_Registry_Mock::instance()->addons->Addon_Class ) ) {
		//	var_dump( EE_Registry_Mock::instance()->addons->Addon_Class );
		//}
		// now attempt to retrieve it
		$cached_class = EE_Registry_Mock::instance()->get_cached_class( 'Addon_Class', 'addon' );
		$this->assertEquals( $orig_class->name, $cached_class->name );
	}




	/**
	 * this tests that paths to EE class files can be resolved correctly
	 */
	public function test_resolve_path(){
		// try to find the path to the EE_Session class
		$this->assertEquals(
			// expected
			EE_CORE . 'EE_Session.core.php',
			// actual
			EE_Registry_Mock::instance()->resolve_path(
				'EE_Session',
				'core',
				array(
					EE_CORE,
					EE_ADMIN,
					EE_CPTS,
					EE_CORE . 'data_migration_scripts' . DS
				)
			)
		);
	}




	/**
	 * this tests that EE class files can be loaded correctly
	 */
	public function test_require_file(){
		// first verify that Cart is not already loaded
		// (made sure to set the class_exists() autoload param to false)
		$this->assertEquals(
			// expected
			false,
			// actual
			class_exists( 'EE_Cart', false )
		);
		// let's attempt to load the EE_Cart
		EE_Registry_Mock::instance()->require_file(
			EE_CORE . 'EE_Cart.core.php',
			'EE_Cart',
			'core',
			array(
				EE_CORE,
				EE_ADMIN,
				EE_CPTS,
				EE_CORE . 'data_migration_scripts' . DS
			)
		);
		$this->assertEquals( true, class_exists( 'EE_Cart', false ) );
	}




	/**
	 * this tests that EE class files can be instantiated correctly
	 */
	public function test_create_object(){
		// now let's attempt to actually load the EE_Cart class file
		// despite the fact that we just tested requiring the file,
		// let's just double check that the class exists
		require_once( EE_CORE . 'EE_Cart.core.php' );
		$this->assertEquals( true, class_exists( 'EE_Cart' ) );
		// now attempt instantiation
		$class_object = EE_Registry_Mock::instance()->create_object(
			'EE_Cart',
			array(),
			'core',
			false,
			false,
			false
		);
		$this->assertEquals(
			// expected
			'EE_Cart',
			// actual
			get_class( $class_object )
		);
	}




	/**
	 * checks that when we reset a model, that it does so properly and
	 * also returns the NEW model
	 */
	public function test_reset_model(){
		$model_a = EE_Registry::instance()->load_model('Event');
		$model_a2 = EE_Registry::instance()->load_model('Event');
		$model_a3 = EEM_Event::instance();
		$this->assertEquals($model_a, $model_a2);
		$this->assertEquals($model_a2, $model_a3);
		$model_b1 = EEM_Event::reset();
		$this->assertNotSame( $model_a, $model_b1);
		$model_b2 = EE_Registry::instance()->reset_model('Event');
		$this->assertNotSame( $model_a, $model_b2);
	}
}

// End of file EE_Registry_Test.php
// Location: /tests/testcases/core/EE_Registry_Test.php