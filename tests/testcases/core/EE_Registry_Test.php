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
		add_filter(
			'FHEE__EE_Registry____construct___class_abbreviations',
			array( $this, 'unit_test_registry_class_abbreviations' )
		);
		add_filter(
			'FHEE__EE_Registry__load_core__core_paths',
			array( $this, 'unit_test_registry_core_paths' )
		);
		EE_Dependency_Map::register_dependencies(
			'EE_Session_Mock',
			array( 'EE_Encryption' => EE_Dependency_Map::load_from_cache )
		);
		EE_Dependency_Map::register_dependencies(
			'EE_Injector_Tester_With_Array_Session_Int_Constructor_Params',
			array( 'EE_Session_Mock' => EE_Dependency_Map::load_from_cache )
		);
		EE_Dependency_Map::register_class_loader( 'EE_Session_Mock' );
		EE_Dependency_Map::register_class_loader( 'EE_Injector_Tester_With_Array_Session_Int_Constructor_Params' );
		require_once EE_TESTS_DIR . 'mocks' . DS . 'core' . DS . 'EE_Registry_Mock.core.php';
		parent::setUp();
	}



	public function unit_test_registry_class_abbreviations( $class_abbreviations = array() ) {
		$class_abbreviations[ 'EE_Session_Mock' ] = 'SSN';
		return $class_abbreviations;
	}



	public function unit_test_registry_core_paths( $core_paths = array() ) {
		$core_paths[] = EE_TESTS_DIR . 'mocks' . DS . 'core' . DS;
		return $core_paths;
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
	 * This tests that the _file_loaded_for_class property is retrieved/utilized properly when load_only flag is set to
	 * true on the EE_Registry instance.
	 * @author Darren Ethier
	 */
	public function test__load_with_load_only_flag() {
		// verify that we don't have an instance of file loaded for EE_Answer (and do NOT autoload)
		$this->assertFalse( class_exists( 'EE_Answer', false ) );
		// now do a object load request for EE_Answer
		$class_loaded = EE_Registry_Mock::instance()->load_class( 'EE_Answer' );
		$this->assertInstanceOf( 'EE_Answer', $class_loaded );
		// now verify that with the $load_only flag set to true, that boolean true is returned
		$file_loaded = EE_Registry_Mock::instance()->load(
			array( EE_CLASSES ),
			'EE_',
			'EE_Answer',
			'class',
			array(),
			false,
			true,
			true // LOAD ONLY FLAG SET TO TRUE
		);
		$this->assertTrue( $file_loaded );

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
			str_replace( array( '\\', '/' ), DS, EE_CORE . 'EE_Session.core.php' ),
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
		// first verify that EE_Class_For_Testing_Loading is not already loaded
		// (made sure to set the class_exists() autoload param to false)
		$this->assertEquals( false, class_exists( 'EE_Class_For_Testing_Loading', false ) );
		// let's attempt to load the EE_Cart
		EE_Registry_Mock::instance()->require_file(
			EE_MOCKS_DIR . 'core' . DS . 'EE_Class_For_Testing_Loading.core.php',
			'EE_Class_For_Testing_Loading',
			'core',
			array(
				EE_CORE,
				EE_ADMIN,
				EE_CORE . 'data_migration_scripts' . DS,
				EE_MOCKS_DIR,
				EE_MOCKS_DIR . 'core' . DS,
			)
		);
		$this->assertEquals( true, class_exists( 'EE_Class_For_Testing_Loading', false ) );
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
		$class_object = EE_Registry_Mock::instance()->create_object( 'EE_Addon' );
		// abstract classes only return true to denote that they have been loaded
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
			true // FROM DB FLAG SET TO TRUE
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
			'class'
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
		$class_object = EE_Registry_Mock::instance()->create_object( 'EE_Module_Request_Router' );
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
		$class_object = EE_Registry_Mock::instance()->create_object( 'EE_Capabilities' );
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
		/** @type EE_Front_Controller $class_object */
		$class_object = EE_Registry_Mock::instance()->create_object( 'EE_Front_Controller' );
		$this->assertInstanceOf( 'EE_Front_Controller', $class_object );
		//echo "\n Request_Handler: \n";
		//var_dump( $class_object->Request_Handler() );
		//echo "\n Module_Request_Router: \n";
		//var_dump( $class_object->Module_Request_Router() );
		$this->assertInstanceOf( 'EE_Request_Handler', $class_object->Request_Handler() );
		$this->assertInstanceOf( 'EE_Module_Request_Router', $class_object->Module_Request_Router() );
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
		$model_a = EE_Registry_Mock::instance()->load_model('Event');
		$model_a2 = EE_Registry_Mock::instance()->load_model('Event');
		$model_a3 = EEM_Event::instance();
		$this->assertEquals($model_a, $model_a2);
		$this->assertEquals($model_a2, $model_a3);
		$model_b1 = EEM_Event::reset();
		$this->assertNotSame( $model_a, $model_b1);
		$model_b2 = EE_Registry_Mock::instance()->reset_model('Event');
		$this->assertNotSame( $model_a, $model_b2);
	}



	/**
	 * test_array_is_numerically_and_sequentially_indexed
	 *
	 * @author    Brent Christensen
	 */
	public function test_array_is_numerically_and_sequentially_indexed() {
		// empty arrays should return true
		$this->assertTrue(
			EE_Registry_Mock::instance()->array_is_numerically_and_sequentially_indexed( array() )
		);
		// should also be fine
		$this->assertTrue(
			EE_Registry_Mock::instance()->array_is_numerically_and_sequentially_indexed(
				array( array() )
			)
		);
		// beauty eh?
		$this->assertTrue(
			EE_Registry_Mock::instance()->array_is_numerically_and_sequentially_indexed(
				array( 'a', 'b', 'c' )
			)
		);
		// numeric "string" keys will get typecast as integers
		$this->assertTrue(
			EE_Registry_Mock::instance()->array_is_numerically_and_sequentially_indexed(
				array( "0" => 'a', "1" => 'b', "2" => 'c' )
			)
		);
		// arrays that are not zero-indexed should return false
		$this->assertFalse(
			EE_Registry_Mock::instance()->array_is_numerically_and_sequentially_indexed(
				array( 1 => 'a', 2 => 'b', 3 => 'c' )
			)
		);
		// out of order
		$this->assertFalse(
			EE_Registry_Mock::instance()->array_is_numerically_and_sequentially_indexed(
				array( "1" => 'a', "0" => 'b', "2" => 'c' )
			)
		);
		// oh come on now!!! Not even close !
		$this->assertFalse(
			EE_Registry_Mock::instance()->array_is_numerically_and_sequentially_indexed(
				array( "a" => 'a', "b" => 'b', "c" => 'c' )
			)
		);
	}


	/**
	 * checks that type hinted classes in constructors are properly instantiated and passed
	 * without negatively affecting other constructor parameters
	 *
	 * @author    Brent Christensen
	 */
	public function test_dependency_injection() {
		// either need to set an autoloader for any dependency classes or just pre-load them
		EE_Registry_Mock::instance()->load_core('EE_Session_Mock');
		add_filter(
			'FHEE__EE_Registry__load_service__service_paths',
			function() {
				return array(
					EE_TESTS_DIR . 'mocks' . DS . 'core' . DS . 'services' . DS
				);
			}
		);
		// test EE_Injector_Tester_With_Array_Session_Int_Constructor_Params
		// with NO passed arguments
		/** @type EE_Injector_Tester_With_Array_Session_Int_Constructor_Params $class */
		$class = EE_Registry_Mock::instance()->load_service(
			'EE_Injector_Tester_With_Array_Session_Int_Constructor_Params'
		);
		$this->assertEquals( array(), $class->array_property() );
		$this->assertInstanceOf( 'EE_Session_Mock', $class->session_property() );
		$this->assertEquals( 0, $class->integer_property() );
		// reset
		EE_Registry_Mock::instance()->LIB->EE_Injector_Tester_With_Array_Session_Int_Constructor_Params = null;
		// test EE_Injector_Tester_With_Array_Session_Int_Constructor_Params
		// with numerically indexed array passed as argument 1
		$numerically_indexed_array = array(
			0 => 'zero',
			1 => 'one',
			2 => 'two',
			3 => 'three',
		);
		/** @type EE_Injector_Tester_With_Array_Session_Int_Constructor_Params $class */
		$class = EE_Registry_Mock::instance()->load_service(
			'EE_Injector_Tester_With_Array_Session_Int_Constructor_Params',
			array( $numerically_indexed_array )
		);
		$this->assertEquals( $numerically_indexed_array, $class->array_property() );
		$this->assertInstanceOf( 'EE_Session_Mock', $class->session_property() );
		$this->assertEquals( 0, $class->integer_property() );
		// reset
		EE_Registry_Mock::instance()->LIB->EE_Injector_Tester_With_Array_Session_Int_Constructor_Params = null;
		// test EE_Injector_Tester_With_Array_Session_Int_Constructor_Params
		// with string indexed array passed as argument 1
		// and the integer 2 passed as argument 3
		$string_indexed_array = array(
			'zero'  => 0,
			'one'   => 1,
			'two'   => 2,
			'three' => 3,
		);
		/** @type EE_Injector_Tester_With_Array_Session_Int_Constructor_Params $class */
		$class = EE_Registry_Mock::instance()->load_service(
			'EE_Injector_Tester_With_Array_Session_Int_Constructor_Params',
			array( $string_indexed_array, null, 2 )
		);
		$this->assertEquals( $string_indexed_array, $class->array_property() );
		$this->assertInstanceOf( 'EE_Session_Mock', $class->session_property() );
		$this->assertEquals( 2, $class->integer_property() );
	}



}
// End of file EE_Registry_Test.php
// Location: /tests/testcases/core/EE_Registry_Test.php