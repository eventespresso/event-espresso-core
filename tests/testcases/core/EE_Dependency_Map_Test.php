<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * Class EE_Dependency_Map_Test
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Darren Ethier
 * @since 				4.9.0
 * @group 				core
 *
 */
class EE_Dependency_Map_Test extends EE_UnitTestCase {

	/**
	 * @type EE_Dependency_Map
	 */
	protected $_dependency_map;


	public function setUp() {
		parent::setUp();
		$this->_dependency_map = EE_Dependency_Map::instance();
	}


	public function tearDown() {
		$this->_dependency_map->reset();
		parent::tearDown();
	}


	protected function _expected_core_dependencies() {
		return array(
			'EE_System'                         => array(
				'EE_Registry',
			),
			'EE_Session'                        => array(
				'EE_Encryption'
			),
			'EE_Cart'                           => array(
				null,
				'EE_Session',
			),
			'EE_Front_Controller'               => array(
				'EE_Registry',
				'EE_Request_Handler',
				'EE_Module_Request_Router',
			),
			'EE_Messenger_Collection_Loader'    => array(
				'EE_Messenger_Collection',
			),
			'EE_Message_Type_Collection_Loader' => array(
				'EE_Message_Type_Collection',
			),
			'EE_Message_Resource_Manager'       => array(
				'EE_Messenger_Collection_Loader',
				'EE_Message_Type_Collection_Loader',
				'EEM_Message_Template_Group',
			),
			'EE_Message_Factory'                => array(
				'EE_Message_Resource_Manager',
			),
			'EE_Messages'                       => array(
				'EE_Message_Resource_Manager',
			),
			'EE_messages'                       => array(
				'EE_Message_Resource_Manager',
			),
			'EE_Messages_Generator'             => array(
				'EE_Messages_Queue',
				null,
				'EE_Messages_Queue',
				'EE_Messages_Data_Handler_Collection',
				'EE_Message_Template_Group_Collection',
				'EEH_Parse_Shortcodes',
			),
			'EE_Messages_Queue'                 => array(
				'EE_Message_Repository',
				'EE_Message_Resource_Manager',
			),
		);
	}




	protected function _expected_core_class_loaders() {
		return array(
			//load_core
			'EE_Encryption'                        => 'load_core',
			'EE_Front_Controller'                  => 'load_core',
			'EE_Module_Request_Router'             => 'load_core',
			'EE_Registry'                          => 'load_core',
			'EE_Request_Handler'                   => 'load_core',
			'EE_Session'                           => 'load_core',
			'EE_System'                            => 'load_core',
			//load_lib
			'EE_Message_Resource_Manager'          => 'load_lib',
			'EE_Message_Type_Collection'           => 'load_lib',
			'EE_Message_Type_Collection_Loader'    => 'load_lib',
			'EE_Messenger_Collection'              => 'load_lib',
			'EE_Messenger_Collection_Loader'       => 'load_lib',
			'EE_Messages_Queue'                    => 'load_lib',
			'EE_Messages_Data_Handler_Collection'  => 'load_lib',
			'EE_Message_Template_Group_Collection' => 'load_lib',
			//load_model
			'EEM_Message_Template_Group'           => 'load_model',
			//load_helper
			'EEH_Parse_Shortcodes'                 => 'load_lib',
		);
	}


	public function test_core_dependencies() {
		$expected_core_dependencies = $this->_expected_core_dependencies();
		$actual_core_dependencies = EE_Dependency_Map::dependency_map();

		//test core_dependencies
		$this->assertEquals( count( $expected_core_dependencies ), count($actual_core_dependencies ) );
		$this->assertEquals( $expected_core_dependencies, $actual_core_dependencies );
	}




	public function test_core_class_loaders() {
		$expected_class_loaders = $this->_expected_core_class_loaders();

		//loop through and verify the class_loader_exists and its the expected type.
		foreach ( $expected_class_loaders as $class => $loader ) {
			$actual_class_loader = EE_Dependency_Map::class_loader( $class );
			$this->assertNotEmpty(
				$actual_class_loader,
				sprintf( 'The %s class loader should be set but is not.', $class )
			);
			$this->assertEquals(
				$loader,
				$actual_class_loader,
				sprintf(
					'The %s class should have %s set as its loader, but %s is returned instead',
					$class,
					$loader,
					$actual_class_loader
				)
			);
		}
	}


	public function test_register_class_loader() {
		EE_Dependency_Map::register_class_loader( 'Dummy_Class', 'load_lib' );
		$actual_class_loader = EE_Dependency_Map::class_loader( 'Dummy_Class' );
		$this->assertNotEmpty( $actual_class_loader );
		$this->assertEquals( 'load_lib', $actual_class_loader );

		$this->setExpectedException(
			'EE_Error',
			'"dummy_loader" is not a valid loader method on EE_Registry.'
		);

		EE_Dependency_Map::register_class_loader( 'Dummy_Class', 'dummy_loader' );
	}



	public function test_register_dependency() {
		//test a successful registration.
		$registered = EE_Dependency_Map::register_dependencies( 'Dummy_Class', array( 'EE_Something', 'EE_Something_Else' ) );
		$this->assertTrue( $registered );
		$actual_dependency_map = EE_Dependency_Map::dependency_map();
		$this->assertTrue( isset( $actual_dependency_map['Dummy_Class'] ) );
		$this->assertEquals( array( 'EE_Something', 'EE_Something_Else' ), $actual_dependency_map['Dummy_Class'] );

		//test a unsuccessful registration (cannot override an existing dependency.
		$registered = EE_Dependency_Map::register_dependencies( 'Dummy_Class', array() );
		$this->assertFalse( $registered );
	}
}