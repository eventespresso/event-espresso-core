<?php

use EventEspresso\core\services\loaders\LoaderFactory;

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

    /**
     * @throws DomainException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     */
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
            array(
                'EventEspresso\core\services\cache\TransientCacheStorage' => EE_Dependency_Map::load_from_cache,
                'EE_Encryption'                                           => EE_Dependency_Map::load_from_cache
            )
        );
		EE_Dependency_Map::register_dependencies(
			'EE_Injector_Tester_With_Array_Session_Int_Constructor_Params',
			array( 'EE_Session_Mock' => EE_Dependency_Map::load_from_cache )
		);
		EE_Dependency_Map::register_class_loader( 'EE_Session_Mock' );
		EE_Dependency_Map::register_class_loader( 'EE_Injector_Tester_With_Array_Session_Int_Constructor_Params' );
		require_once EE_TESTS_DIR . 'mocks/core/EE_Registry_Mock.core.php';
		$loader = LoaderFactory::getLoader();
		EE_Registry_Mock::instance(
		    EE_Dependency_Map::instance(),
            $loader->getShared('EventEspresso\core\services\container\Mirror'),
            $loader->getShared('EventEspresso\core\services\loaders\ClassInterfaceCache'),
            $loader->getShared('EventEspresso\core\services\loaders\ObjectIdentifier')
        );
		EE_Registry_Mock::instance()->initialize();
		parent::setUp();
	}



	/**
	 * @param array $class_abbreviations
	 * @return array
	 */
	public function unit_test_registry_class_abbreviations( $class_abbreviations = array() ) {
		$class_abbreviations[ 'EE_Session_Mock' ] = 'SSN';
		return $class_abbreviations;
	}



	/**
	 * @param array $core_paths
	 * @return array
	 */
	public function unit_test_registry_core_paths( $core_paths = array() ) {
		$core_paths[] = EE_TESTS_DIR . 'mocks/core/';
		return $core_paths;
	}




	/**
	 * this tests that objects cached using the EE_Registry class abbreviations can be retrieved
	 *
	 * @group                8284
	 * @author                Brent Christensen
	 */
	public function test_get_cached_class_abbreviations() {
		// verify that EE_Network_Config has not already been loaded
		$cached_class = EE_Registry_Mock::instance()->get_cached_class( 'EE_Network_Config' );
		$this->assertEquals( null, $cached_class );
		// create a stdClass object will use to mock the EE_Network_Config class
		$orig_class = new stdClass();
		$orig_class->name = 'EE_Network_Config';
		// and manually cache it at EE_Registry_Mock::instance()->NET_CFG
		EE_Registry_Mock::instance()->NET_CFG = $orig_class;
		// now attempt to retrieve it
		$cached_class = EE_Registry_Mock::instance()->get_cached_class( 'EE_Network_Config' );
		$this->assertEquals( $orig_class->name, $cached_class->name );
		// remove what we added
		EE_Registry_Mock::instance()->NET_CFG = null;
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
	 * Same as previous test except we do a load only call first.  The second call should return the cached object
	 * and NOT true.
	 * @author Darren Ethier
	 * @group 9326
	 */
	public function test__load_with_load_only_flag_set_true_on_first_load() {
		//do load only
		$loaded = EE_Registry_Mock::instance()->load_class(
			'EE_Answer',
			array(),
			false,
			true,
			true //load only set to true.
		);

		//should return true
		$this->assertTrue( $loaded );
		//should be able to access the class now
		$this->assertTrue( class_exists( 'EE_Answer', false ) );

		//now try to grab an instance of EE_Answer
		$class_instance = EE_Registry_Mock::instance()->load_class( 'EE_Answer' );
		$this->assertInstanceOf( 'EE_Answer', $class_instance );
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
			str_replace( array( '\\', '/' ), '/', EE_CORE . 'EE_Session.core.php' ),
			// actual
			EE_Registry_Mock::instance()->resolve_path(
				'EE_Session',
				'core',
				array(
					EE_CORE,
					EE_ADMIN,
					EE_CPTS,
					EE_CORE . 'data_migration_scripts/'
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
			EE_MOCKS_DIR . 'core/EE_Class_For_Testing_Loading.core.php',
			'EE_Class_For_Testing_Loading',
			'core',
			array(
				EE_CORE,
				EE_ADMIN,
				EE_CORE . 'data_migration_scripts/',
				EE_MOCKS_DIR,
				EE_MOCKS_DIR . 'core/',
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
		require_once(EE_CORE . 'EE_Capabilities.core.php' );
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
		// cache it at EE_Registry_Mock::instance()->NET_CFG
		EE_Registry_Mock::instance()->set_cached_class( $orig_class, 'EE_Network_Config' );
		// now attempt to retrieve it
		$cached_class = EE_Registry_Mock::instance()->NET_CFG;
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
	 * Checks to ensure that when we reset the registry with reset models to true, that the models are actually reset.
	 * @group 10109
	 */
	public function test_reset_with_reset_models() {
		$testing_model = EE_Registry_Mock::instance()->load_model( 'Event' );

		//put something in the entity map
		$e = $this->new_model_obj_with_dependencies( 'Event' );
		$this->assertNotNull( $testing_model->get_from_entity_map( $e->ID() ) );

		//now let's do the full Registry reset including resetting the models.
		EE_Registry_Mock::instance()->reset( false, true, true );

		//after the reset, the entity map on the model SHOULD be empty.
		$this->assertNull( EEM_Registration::instance()->get_from_entity_map( $e->ID() ) );
		$this->assertNull( $testing_model->get_from_entity_map( $e->ID() ) );
	}



	/**
	 * checks model resets happen properly: the model instance should NOT change
	 * (in case code anywhere has a direct reference to it) but its properties
	 * should be reset to their original settings
	 * @group 10107
	 * @author    Mike Nelson
	 */
	public function test_reset_model(){
		$model_a = EE_Registry_Mock::instance()->load_model('Event');
		$model_a2 = EE_Registry_Mock::instance()->load_model('Event');
		$model_a3 = EEM_Event::instance();
		//and put something in its entity map
		$e = $this->new_model_obj_with_dependencies( 'Event' );
		$this->assertNotNull( $model_a->get_from_entity_map( $e->ID() ) );
		$this->assertEquals($model_a, $model_a2);
		$this->assertEquals($model_a2, $model_a3);
		//let's set a differnet WP timezone. When the model is reset, it
		//should automatically use this new timezone
		$new_timezone_string = 'America/Detroit';
		update_option( 'timezone_string', $new_timezone_string );
		$model_b1 = EEM_Event::reset();
		$this->assertEquals( $model_a, $model_b1);
		$model_b2 = EE_Registry_Mock::instance()->reset_model('Event');
		$this->assertEquals( $model_a, $model_b2);
		//verify the model now has the new wp timezone
		$this->assertEquals( $new_timezone_string, $model_b1->get_timezone() );
		//and that the model's entity map has been reset
		$this->assertNull( $model_b1->get_from_entity_map( $e->ID() ) );
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
					EE_TESTS_DIR . 'mocks/core/services/'
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


	/**
	 * This test verifies that if a dependency map entry has more than one type of class listed as dependencies and they
	 * are both set as `load_new_object`, then they are actually two distinct objects when the parent object
	 * is instantiated.
	 *
	 * For this test we'll use EE_Messages_Generator because it expects two distinct EE_Message_Queue objects sent into its
	 * constructor via the dependency map.
	 *
	 * @group 9325
	 * @author Darren Ethier
	 */
	public function test_multiple_duplicate_class_different_instance_on_construct_using_dependency_map() {
		//first register our mock in the dependency map
		$dependencies = array(
			'EE_Messages_Queue'                    => EE_Dependency_Map::load_new_object,
			'EE_Messages_Data_Handler_Collection'  => EE_Dependency_Map::load_new_object,
			'EE_Message_Template_Group_Collection' => EE_Dependency_Map::load_new_object,
			'EEH_Parse_Shortcodes'                 => EE_Dependency_Map::load_from_cache,
		);
		$registered = EE_Dependency_Map::register_dependencies( 'EE_Messages_Generator_Mock', $dependencies );
		$this->assertTrue( $registered );

		$mock_paths[] = EE_TESTS_DIR . 'mocks/core/libraries/messages';

		//load the mock generator
		/** @var EE_Messages_Generator_Mock $generator */
		$generator = EE_Registry_Mock::instance()->load( $mock_paths, 'EE_', 'Messages_Generator_Mock', '' );

		//verify both queues are distinct
		$this->assertNotEquals(
			spl_object_hash( $generator->generation_queue() ),
			spl_object_hash( $generator->ready_queue() )
		);
	}



	/**
	 * This test verifies that any new dependencies registered
	 * on EE_Dependency_Map are immediately visible to EE_Registry.
	 * It may seem wrong because it appears to be testing methods that actually exist on EE_Dependency_Map,
	 * but they are all methods that are called via the \EE_Registry::$_dependency_map property.
	 * So this test is just verifying that EE_Registry and EE_Dependency_Map are in sync.
	 *
	 * Uses EE_Registry_Mock::dependency_map_has(),
	 * EE_Registry_Mock::has_dependency_for_class(),
	 * and EE_Registry_Mock::loading_strategy_for_class_dependency(),
	 * which all call methods via the EE_Dependency_Map property on EE_Registry
	 *
	 * @author Brent Christensen
	 */
	public function test_registry_can_see_newly_registered_dependencies() {
		// first verify that dependency doesn't already exist
		$this->assertFalse(
			EE_Registry_Mock::instance()->dependency_map_has( 'Some_New_Class_Name' )
		);
		// then register it
		EE_Dependency_Map::register_dependencies(
			'Some_New_Class_Name',
			array( 'DependencyOne' => EE_Dependency_Map::load_new_object )
		);
		// and verify that it's now available
		$this->assertTrue(
			EE_Registry_Mock::instance()->dependency_map_has( 'Some_New_Class_Name' )
		);
		// verify loading strategy
		$this->assertEquals(
			EE_Dependency_Map::load_new_object,
			EE_Registry_Mock::instance()->loading_strategy_for_class_dependency( 'Some_New_Class_Name', 'DependencyOne' )
		);
	}



	/**
	 * This test verifies that any new class loaders registered
	 * on EE_Dependency_Map are immediately visible to EE_Registry.
	 * It may seem wrong because it appears to be testing methods that actually exist on EE_Dependency_Map,
	 * but they are all methods that are called via the \EE_Registry::$_dependency_map property.
	 * So this test is just verifying that EE_Registry and EE_Dependency_Map are in sync.
	 *
	 * Uses EE_Registry_Mock::loading_strategy_for_class_dependency()
	 * which calls EE_Dependency_Map::loading_strategy_for_class_dependency() via the property on EE_Registry
	 *
	 * @author Brent Christensen
	 */
	public function test_registry_can_see_newly_registered_class_loaders() {
		// first verify that class loader doesn't already exist
		$this->assertEmpty(
			EE_Registry_Mock::instance()->dependency_map_class_loader( 'DependencyOne' )
		);
		// then register it
		EE_Dependency_Map::register_class_loader( 'DependencyOne', 'load_core' );
		// and verify that it's now available
		$this->assertEquals(
			'load_core',
			EE_Registry_Mock::instance()->dependency_map_class_loader( 'DependencyOne' )
		);
	}


    /**
     * Corresponds to https://github.com/eventespresso/eventsmart.com-website/issues/36
     * where fetching an add-on that isn't yet registered causes an error
     */
	public function testGetAddonThatDoesntExist()
    {
        EE_Registry_Mock::instance()->getAddon('foobar');
        $this->assertTrue(true);
    }


    /**
     * Corresponds to https://github.com/eventespresso/eventsmart.com-website/issues/36
     * where fetching an add-on that isn't yet registered causes an error
     */
    public function testremoveAddonThatDoesntExist()
    {
        EE_Registry_Mock::instance()->removeAddon('foobar');
        $this->assertTrue(true);
    }

}
// End of file EE_Registry_Test.php
// Location: /tests/testcases/core/EE_Registry_Test.php
