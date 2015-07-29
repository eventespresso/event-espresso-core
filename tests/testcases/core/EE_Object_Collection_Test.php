<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * Class EE_Object_Collection_Test
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Brent Christensen
 * @since 				4.6.31
 * @group 				objectCollection
 * @group 				8565
 *
 */
class EE_Object_Collection_Test extends EE_UnitTestCase {

	/**
	 * @type \EE_Object_Collection_Mock $repository
	 */
	protected $repository;

	public function setUp() {
		require_once EE_TESTS_DIR . 'mocks/EE_Object_Collection_Mock.php';
		$this->repository = new EE_Object_Collection_Mock();
		parent::setUp();
	}

	public function test_addObject() {
		// add ticket 1
		$ticket_1 = $this->new_model_obj_with_dependencies( 'Ticket', array( 'TKT_price'   => '5' ) );
		$this->assertCount( 0, $this->repository );
		$this->repository->add_object( $ticket_1 );
		$this->assertCount( 1, $this->repository );
		$this->assertContains( $ticket_1, $this->repository );
		// add ticket 2
		$ticket_2 = $this->new_model_obj_with_dependencies( 'Ticket', array( 'TKT_price'   => '6' ) );
		$this->repository->add_object( $ticket_2 );
		$this->assertCount( 2, $this->repository );
		$this->assertContains( $ticket_2, $this->repository );
	}

	public function test_setObjectInfo() {
		// add ticket 1
		$ticket_1 = $this->new_model_obj_with_dependencies( 'Ticket', array( 'TKT_price' => '5' ) );
		$this->repository->add_object( $ticket_1 );
		$this->repository->set_object_info( $ticket_1, 'ticket_1' );
		$this->assertEquals( $this->repository[ $ticket_1 ], 'ticket_1' );
	}

	public function test_getObjectByInfo() {
		$ticket_1 = $this->new_model_obj_with_dependencies( 'Ticket', array( 'TKT_price'   => '5' ) );
		$this->repository->add_object( $ticket_1, 'ticket_1' );
		$T1 = $this->repository->get_object_by_info( 'ticket_1' );
		$this->assertEquals( $ticket_1, $T1 );
	}

	public function test_hasObject() {
		$ticket_1 = $this->new_model_obj_with_dependencies( 'Ticket', array( 'TKT_price'   => '5' ) );
		$this->repository->add_object( $ticket_1 );
		$exists = $this->repository->has_object( $ticket_1 );
		$this->assertEquals( $exists, true );
	}

	public function test_removeObject() {
		// add ticket 1
		$ticket_1 = $this->new_model_obj_with_dependencies( 'Ticket', array( 'TKT_price' => '5' ) );
		$this->repository->add_object( $ticket_1 );
		// add ticket 2
		$ticket_2 = $this->new_model_obj_with_dependencies( 'Ticket', array( 'TKT_price' => '6' ) );
		$this->repository->add_object( $ticket_2 );
		$this->assertCount( 2, $this->repository );
		// remove ticket 1
		$this->repository->remove_object( $ticket_1 );
		$this->assertNotContains( $ticket_1, $this->repository );
		$this->assertCount( 1, $this->repository );
		// remove ticket 2
		$this->repository->remove_object( $ticket_2 );
		$this->assertNotContains( $ticket_2, $this->repository );
		$this->assertCount( 0, $this->repository );
	}

}
// End of file EE_Object_Collection_Test.php
// Location: /tests/testcases/core/EE_Object_Collection_Test.php