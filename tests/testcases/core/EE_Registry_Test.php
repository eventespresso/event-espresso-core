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
	 *
	 * @group                8284
	 * @author                Brent Christensen
	 */
	public function test_get_cached_class_abbreviations() {
		// verify that EE_Capabilities has not already been loaded
		$cached_class = EE_Registry_Mock::instance()->get_cached_class( 'EE_Capabilities' );
		$this->assertEquals( null, $cached_class );
		// create a stdClass object will use to mock the EE_Capabilities class
		$orig_class = new stdClass();
		$orig_class->name = 'EE_Capabilities';
		// and manually cache it at EE_Registry_Mock::instance()->CAP
		EE_Registry_Mock::instance()->CAP = $orig_class;
		// now attempt to retrieve it
		$cached_class = EE_Registry_Mock::instance()->get_cached_class( 'EE_Capabilities' );
		$this->assertEquals( $orig_class->name, $cached_class->name );
	}



	/**
	 * this tests that objects cached directly as EE_Registry_Mock properties can be retrieved
	 *
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
		// now attempt to retrieve it
		$cached_class = EE_Registry_Mock::instance()->get_cached_class( 'Some_Class' );
		$this->assertEquals( $orig_class->name, $cached_class->name );
	}



	/**
	 * this tests that objects cached on EE_Registry->LIB can be retrieved
	 *
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
		// now attempt to retrieve it
		$cached_class = EE_Registry_Mock::instance()->get_cached_class( 'Library_Class' );
		$this->assertEquals( $orig_class->name, $cached_class->name );
	}



	/**
	 * this tests that objects cached on EE_Registry->addons can be retrieved
	 *
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
		// now attempt to retrieve it
		$cached_class = EE_Registry_Mock::instance()->get_cached_class( 'Addon_Class', 'addon' );
		$this->assertEquals( $orig_class->name, $cached_class->name );
	}




	/**
	 * this tests that paths to EE class files can be resolved correctly
	 *
	 * @group                8284
	 * @author                Brent Christensen
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
	 *
	 * @group                8284
	 * @author                Brent Christensen
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
	 * this tests that abstract EE class files are loaded but not instantiated
	 *
	 * @group                8284
	 * @author                Brent Christensen
	 */
	public function test_create_object_abstract(){
		// let's attempt to load the abstract EE_Addon class file
		require_once( EE_CORE . 'EE_Addon.core.php' );
		$this->assertEquals( true, class_exists( 'EE_Addon' ) );
		// now attempt instantiation
		$class_object = EE_Registry_Mock::instance()->create_object(
			'EE_Addon',
			array(),
			'core',
			false,
			false,
			false
		);
		// abstract classes only return true to denote that they have been loaded
		$this->assertEquals( true, $class_object );
	}



	/**
	 * this tests that EE class files can be loaded but not instantiated
	 *
	 * @group                8284
	 * @author                Brent Christensen
	 */
	public function test_create_object_load_only(){
		// let's attempt to just load the EE_Cron_Tasks class file
		require_once( EE_CORE . 'EE_Cron_Tasks.core.php' );
		$this->assertEquals( true, class_exists( 'EE_Cron_Tasks' ) );
		// now attempt instantiation
		$class_object = EE_Registry_Mock::instance()->create_object(
			'EE_Cron_Tasks',
			array(),
			'core',
			false,
			true, // LOAD ONLY FLAG SET TO TRUE
			false
		);
		// using load only returns true to denote that class has been loaded
		$this->assertEquals( true, $class_object );
	}



	/**
	 * this tests that EE model object classes can be instantiated correctly
	 *
	 * @group                8284
	 * @author                Brent Christensen
	 */
	public function test_create_object_new_instance_from_db() {
		// let's attempt to load an instantiate an EE_Question object with ID=1
		require_once( EE_CLASSES . 'EE_Question.class.php' );
		$this->assertEquals( true, class_exists( 'EE_Question' ) );
		// now attempt instantiation
		$class_object = EE_Registry_Mock::instance()->create_object(
			'EE_Question',
			array( array( 'QST_ID' => 1 ) ),
			'class',
			true, // FROM DB FLAG SET TO TRUE
			false,
			false
		);
		$this->assertEquals( true, $class_object instanceof EE_Question );
		$this->assertEquals( 1, $class_object->ID() );
	}



	/**
	 * this tests that EE model object classes can be instantiated correctly
	 *
	 * @group                8284
	 * @author                Brent Christensen
	 */
	public function test_create_object_new_instance() {
		// let's attempt to load an instantiate an EE_Question object with ID=1
		// despite the fact that we just loaded the file in a previous test,
		// let's just double check that the class exists
		require_once( EE_CLASSES . 'EE_Question.class.php' );
		$this->assertEquals( true, class_exists( 'EE_Question' ) );
		// now attempt instantiation
		$class_object = EE_Registry_Mock::instance()->create_object(
			'EE_Question',
			array(),
			'class',
			false, // FROM DB FLAG SET BACK TO FALSE
			false,
			false
		);
		$this->assertEquals( true, $class_object instanceof EE_Question );
		$this->assertEquals( 0, $class_object->ID() );
	}



	/**
	 * this tests that EE class files can be instantiated correctly
	 *
	 * @group                8284
	 * @author                Brent Christensen
	 */
	public function test_create_object_isInstantiable(){
		// let's attempt to load the EE_Module_Request_Router class file
		require_once( EE_CORE . 'EE_Module_Request_Router.core.php' );
		$this->assertEquals( true, class_exists( 'EE_Module_Request_Router' ) );
		// now attempt instantiation
		$class_object = EE_Registry_Mock::instance()->create_object(
			'EE_Module_Request_Router',
			array(),
			'core',
			false,
			false,
			false
		);
		$this->assertEquals( true, $class_object instanceof EE_Module_Request_Router );
	}



	/**
	 * this tests that EE singleton classes can be instantiated correctly
	 *
	 * @group                8284
	 * @author                Brent Christensen
	 */
	public function test_create_object_singleton(){
		// let's attempt to load the EE_Capabilities class file
		require_once( EE_CORE . 'EE_Capabilities.core.php' );
		$this->assertEquals( true, class_exists( 'EE_Capabilities' ) );
		// now attempt instantiation
		$class_object = EE_Registry_Mock::instance()->create_object(
			'EE_Capabilities',
			array(),
			'core',
			false,
			false,
			false
		);
		$this->assertEquals( true, $class_object instanceof EE_Capabilities );
	}



	/**
	 * this tests that EE classes with core dependencies can be instantiated correctly
	 *
	 * @group                8284
	 * @author                Brent Christensen
	 */
	public function test_create_object_and_resolve_dependencies(){
		// let's attempt to load the EE_Front_Controller class file
		require_once( EE_CORE . 'EE_Front_Controller.core.php' );
		$this->assertEquals( true, class_exists( 'EE_Front_Controller' ) );
		// now attempt instantiation knowing that the EE_Front_Controller class
		// injects the EE_Module_Request_Router class in the constructor
		$class_object = EE_Registry_Mock::instance()->create_object(
			'EE_Front_Controller',
			array(),
			'core',
			false,
			false,
			true // RESOLVE DEPENDENCIES FLAG SET TO TRUE
		);
		//echo "\n\n EE_Front_Controller\n";
		//var_dump( $class_object );
		$this->assertEquals( true, $class_object instanceof EE_Front_Controller );
		//echo "\n class_object->Module_Request_Router()\n";
		//var_dump( $class_object->Module_Request_Router() );
		$this->assertEquals( true, $class_object->Module_Request_Router() instanceof EE_Module_Request_Router );
	}



	/**
	 * this tests that objects cached using the EE_Registry class abbreviations can be retrieved
	 *
	 * @group                8284
	 * @author                Brent Christensen
	 */
	public function test_set_cached_class_abbreviations() {
		// create a stdClass object we'll use for a mock
		$orig_class = new stdClass();
		$orig_class->name = 'If_This_Is_An_Abbreviated_Class_Name_Then_Why_Is_It_So_Long';
		// cache it at EE_Registry_Mock::instance()->CAP
		EE_Registry_Mock::instance()->set_cached_class( $orig_class, 'EE_Capabilities' );
		// now attempt to retrieve it
		$cached_class = EE_Registry_Mock::instance()->CAP;
		$this->assertEquals( $orig_class, $cached_class );
	}



	/**
	 * this tests that objects cached directly as EE_Registry_Mock properties can be retrieved
	 *
	 * @group                8284
	 * @author                Brent Christensen
	 */
	public function test_set_cached_class_property() {
		// create a stdClass object we'll use for a mock
		$orig_class = new stdClass();
		$orig_class->name = 'Some_Class';
		// cache it at EE_Registry_Mock::instance()->CAP
		EE_Registry_Mock::instance()->set_cached_class( $orig_class, 'Some_Class' );
		// now attempt to retrieve it
		$cached_class = EE_Registry_Mock::instance()->Some_Class;
		$this->assertEquals( $orig_class, $cached_class );
	}



	/**
	 * this tests that objects cached on EE_Registry->LIB can be retrieved
	 *
	 * @group                8284
	 * @author                Brent Christensen
	 */
	public function test_set_cached_class_library() {
		// create a stdClass object we'll use for a mock
		$orig_class = new stdClass();
		$orig_class->name = 'Library_Class';
		// cache it at EE_Registry_Mock::instance()->CAP
		EE_Registry_Mock::instance()->set_cached_class( $orig_class, 'Library_Class' );
		// now attempt to retrieve it
		$cached_class = EE_Registry_Mock::instance()->LIB->Library_Class;
		$this->assertEquals( $orig_class, $cached_class );
	}



	/**
	 * this tests that objects cached on EE_Registry->addons can be retrieved
	 *
	 * @group                8284
	 * @author                Brent Christensen
	 */
	public function test_set_cached_class_addon() {
		// create a stdClass object we'll use for a mock
		$orig_class = new stdClass();
		$orig_class->name = 'Addon_Class';
		// cache it at EE_Registry_Mock::instance()->CAP
		EE_Registry_Mock::instance()->set_cached_class( $orig_class, 'Addon_Class', 'addon' );
		// now attempt to retrieve it
		$cached_class = EE_Registry_Mock::instance()->addons->Addon_Class;
		$this->assertEquals( $orig_class, $cached_class );
	}



	/**
	 * checks that when we reset a model, that it does so properly and
	 * also returns the NEW model
	 *
	 * @author    Mike Nelson
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