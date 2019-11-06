<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * Class EE_Dependency_Map_Test
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Darren Ethier
 * @since 				4.9.0
 * @group 				core
 * @group 				DepMap
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


    /**
     * @since 4.9.62.p
     * @throws PHPUnit_Framework_AssertionFailedError
     */
    public function test_core_dependencies() {
		$this->validate_core_dependency_map( $this->_dependency_map->dependency_map() );
	}



    /**
     * @param        $dependencies_or_load
     * @param string $classname
     * @throws PHPUnit_Framework_AssertionFailedError
     */
	public function validate_core_dependency_map( $dependencies_or_load, $classname = '' ) {
		if ( is_array( $dependencies_or_load ) ) {
			foreach ( $dependencies_or_load as $class_name => $dependency ) {
				if ( $dependency !== null ) {
					$this->validate_core_dependency_map( $dependency, $class_name );
				}
			}
		} else {
		    $classname = $this->_dependency_map->getFqnForAlias($classname);
			// verify that a valid class constant has been set for the value
            $this->assertTrue(
                in_array(
                    $dependencies_or_load,
                    [
                        EE_Dependency_Map::not_registered,
                        EE_Dependency_Map::load_new_object,
                        EE_Dependency_Map::load_from_cache,
                    ],
                    true
                ),
				sprintf( 'The %s class has an invalid value in the EE_Dependency_Map.', $classname )
			);
            // if class is not using PSR-4 compatible namespacing
            if (strpos($classname,'\\') === false) {
                // verify that a loader exists for the class
                $loader = $this->_dependency_map->class_loader($classname);
                $this->assertNotEmpty(
                    $loader,
                    sprintf('A class loader should be set for "%s" but appears to be missing.', $classname)
                );
            }
		}
	}


    /**
     * @since 4.9.62.p
     * @throws \PHPUnit\Framework\AssertionFailedError
     * @throws \PHPUnit\Framework\Exception
     */
    public function test_core_class_loaders() {
		$skip = array(
            'EE_Admin'                      => 'messes with other unit tests',
            'EE_Session'                    => 'session doesn\'t load during unit tests',
            'EE_Messages_Template_Defaults' => 'Closure has required arguments',
            'EE_CPT_Default_Strategy'       => 'has required arguments',
            'EE_CPT_Attendee_Strategy'      => 'has required arguments',
            'EE_CPT_Event_Strategy'         => 'has required arguments',
            'EE_CPT_Venue_Strategy'         => 'has required arguments',
		);
		//loop through and verify the class loader can successfully load the class it is set for
		foreach ( $this->_dependency_map->class_loaders() as $class => $loader ) {
			if ( isset( $skip[ $class ] ) || strpos( $class, 'Command' ) !== false ) {
				continue;
			}
			$dependency = $loader instanceof Closure ? $loader() : EE_Registry::instance()->$loader( $class );
			// helpers are simply loaded and do not return an instance
			if ( $loader === 'load_helper' ) {
				$this->assertTrue( $dependency );
			} else {
				$this->assertInstanceOf(
					$class,
					$dependency,
					sprintf(
						'The "%1$s" class has "%2$s" set as its loader, but instead of an object, we received "%3$s"',
						$class,
						$loader instanceof Closure ? print_r( $loader, true ) : $loader,
						print_r( $dependency, true )
					)
				);
			}
		}
	}


    /**
     * @since 4.9.62.p
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     * @throws \PHPUnit\Framework\Exception
     */
    public function test_core_class_loader_for_EE_Messages_Template_Defaults() {
		/** @type EE_Message_Resource_Manager $Message_Resource_Manager */
		$Message_Resource_Manager = EE_Registry::instance()->load_lib( 'Message_Resource_Manager' );
		$loader = $this->_dependency_map->class_loader('EE_Messages_Template_Defaults');
		$this->assertInstanceOf( 'Closure', $loader );
		$Messages_Template_Defaults = $loader(
			array(
				$Message_Resource_Manager->valid_messenger( 'html' ),
				$Message_Resource_Manager->valid_message_type( 'invoice' )
			)
		);
		$this->assertInstanceOf( 'EE_Messages_Template_Defaults', $Messages_Template_Defaults );
	}


    /**
     * @since 4.9.62.p
     * @throws DomainException
     * @throws \PHPUnit\Framework\AssertionFailedError
     */
    public function test_register_class_loader() {
        EE_Dependency_Map::register_class_loader( 'Dummy_Class', 'load_lib' );
		$actual_class_loader = $this->_dependency_map->class_loader( 'Dummy_Class' );
		$this->assertNotEmpty( $actual_class_loader );
		$this->assertEquals( 'load_lib', $actual_class_loader );

		$this->setExpectedException(
			'DomainException',
            esc_html__('"dummy_loader" is not a valid loader method on EE_Registry.', 'event_espresso')
		);
        EE_Dependency_Map::register_class_loader( 'Dummy_Class', 'dummy_loader' );
	}


    /**
     * @since 4.9.62.p
     * @throws \PHPUnit\Framework\AssertionFailedError
     */
    public function test_register_dependency() {
		//test a successful registration.
		$registered = EE_Dependency_Map::register_dependencies( 'Dummy_Class', array( 'EE_Something', 'EE_Something_Else' ) );
		$this->assertTrue( $registered );
		$actual_dependency_map = $this->_dependency_map->dependency_map();
		$this->assertTrue( isset( $actual_dependency_map['Dummy_Class'] ) );
		$this->assertEquals( array( 'EE_Something', 'EE_Something_Else' ), $actual_dependency_map['Dummy_Class'] );

		//test a unsuccessful registration (cannot override an existing dependency.
		$registered = EE_Dependency_Map::register_dependencies( 'Dummy_Class', array() );
		$this->assertFalse( $registered );
	}


    /**
     * can't easily extend EE_Dep_Map so
     * just going to test all three methods together
     *
     * @throws \PHPUnit\Framework\AssertionFailedError
     * @throws \PHPUnit\Framework\AssertionFailedError
     */
    public function test_add_has_get_alias()
    {
        $interface = 'Dummy_Interface';
        $class_name = 'Dummy_Class';
        $this->assertFalse($this->_dependency_map->isAlias($interface));
        $this->_dependency_map->add_alias($class_name, $interface);
        $this->assertTrue($this->_dependency_map->isAlias($interface));
        $this->assertEquals(
            $class_name,
            $this->_dependency_map->getFqnForAlias($interface)
        );
    }


    /**
     * can't easily extend EE_Dep_Map so
     * just going to test all three methods together
     *
     * @throws \PHPUnit\Framework\AssertionFailedError
     * @throws \PHPUnit\Framework\AssertionFailedError
     */
    public function test_add_has_get_alias_for_class()
    {
        $interface = 'Dummy_Interface_2';
        $class_name = 'Dummy_Class_2';
        $for_class = 'Other_Class';
        $this->assertFalse($this->_dependency_map->isAlias($interface, $for_class));
        $this->_dependency_map->add_alias($class_name, $interface, $for_class);
        $this->assertTrue($this->_dependency_map->isAlias($interface, $for_class));
        $this->assertEquals(
            $class_name,
            $this->_dependency_map->getFqnForAlias($interface, $for_class)
        );
    }



}
// Location: tests/testcases/core/EE_Dependency_Map_Test.php
