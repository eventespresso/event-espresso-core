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
	 * @type \EE_Object_Collection_Mock $collection
	 */
	protected $collection;

	public function setUp() {
		require_once EE_TESTS_DIR . 'mocks/EE_Object_Collection_Mock.php';
		$this->collection = new EE_Object_Collection_Mock();
		parent::setUp();
	}

	public function test_add() {
		// add ticket 1
		$ticket_1 = $this->new_model_obj_with_dependencies( 'Ticket', array( 'TKT_price'   => '5' ) );
		$this->assertCount( 0, $this->collection );
		$this->collection->add( $ticket_1 );
		$this->assertCount( 1, $this->collection );
		$this->assertContains( $ticket_1, $this->collection );
		// add ticket 2
		$ticket_2 = $this->new_model_obj_with_dependencies( 'Ticket', array( 'TKT_price'   => '6' ) );
		$this->collection->add( $ticket_2 );
		$this->assertCount( 2, $this->collection );
		$this->assertContains( $ticket_2, $this->collection );
	}

	public function test_set_info() {
		// add ticket 1
		$ticket_1 = $this->new_model_obj_with_dependencies( 'Ticket', array( 'TKT_price' => '5' ) );
		$this->collection->add( $ticket_1 );
		$this->collection->set_info( $ticket_1, 'ticket_1' );
		$this->assertEquals( $this->collection[ $ticket_1 ], 'ticket_1' );
	}

	public function test_get_by_info() {
		$ticket_1 = $this->new_model_obj_with_dependencies( 'Ticket', array( 'TKT_price'   => '5' ) );
		$this->collection->add( $ticket_1, 'ticket_1' );
		$T1 = $this->collection->get_by_info( 'ticket_1' );
		$this->assertEquals( $ticket_1, $T1 );
	}

	public function test_has() {
		$ticket_1 = $this->new_model_obj_with_dependencies( 'Ticket', array( 'TKT_price'   => '5' ) );
		$this->collection->add( $ticket_1 );
		$exists = $this->collection->has( $ticket_1 );
		$this->assertEquals( $exists, true );
	}

	public function test_remove() {
		// add ticket 1
		$ticket_1 = $this->new_model_obj_with_dependencies( 'Ticket', array( 'TKT_price' => '5' ) );
		$this->collection->add( $ticket_1 );
		// add ticket 2
		$ticket_2 = $this->new_model_obj_with_dependencies( 'Ticket', array( 'TKT_price' => '6' ) );
		$this->collection->add( $ticket_2 );
		$this->assertCount( 2, $this->collection );
		// remove ticket 1
		$this->collection->remove( $ticket_1 );
		$this->assertNotContains( $ticket_1, $this->collection );
		$this->assertCount( 1, $this->collection );
		// remove ticket 2
		$this->collection->remove( $ticket_2 );
		$this->assertNotContains( $ticket_2, $this->collection );
		$this->assertCount( 0, $this->collection );
	}

}
// End of file EE_Object_Collection_Test.php
// Location: /tests/testcases/core/EE_Object_Collection_Test.php