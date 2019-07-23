<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * Class EE_Base_Class_Repository_Test
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Brent Christensen
 * @since 				4.6.31
 * @group 				objectRepository
 * @group 				8280
 *
 */
class EE_Base_Class_Repository_Test extends EE_UnitTestCase {

	/**
	 * @type \EE_Base_Class_Repository_Mock $repository
	 */
	protected $repository;

	public function setUp() {
        parent::setUp();
		require_once EE_TESTS_DIR . 'mocks/core/EE_Base_Class_Repository_Mock.php';
		$this->repository = new EE_Base_Class_Repository_Mock();
	}

	public function test_save() {
		$ticket_1 = $this->new_model_obj_with_dependencies( 'Ticket', array( 'TKT_price' => '5' ), false );
		$this->repository->add( $ticket_1 );
		$this->assertEquals( $ticket_1->ID(), 0 );
		$saved = false;
		$this->repository->rewind();
		while ( $this->repository->valid() ) {
			if ( $this->repository->current() === $ticket_1 ) {
				$saved = $this->repository->save();
				$this->assertNotEquals( $this->repository->current()->ID(), 0 );
				$this->assertEquals( $this->repository->current()->ID(), $ticket_1->ID() );
				break;
			}
			$this->repository->next();
		}
		$this->assertNotEquals( $saved, false );
	}

	public function test_save_all() {
		$ticket_1 = $this->new_model_obj_with_dependencies( 'Ticket', array( 'TKT_price'   => '5' ), false );
		$ticket_2 = $this->new_model_obj_with_dependencies( 'Ticket', array( 'TKT_price'   => '6' ), false );
		$this->repository->add( $ticket_1 );
		$this->repository->add( $ticket_2 );
		$this->assertEquals( count( $this->repository ), 2 );
		$this->assertEquals( $ticket_1->ID(), 0 );
		$this->assertEquals( $ticket_2->ID(), 0 );
		$saved = $this->repository->save_all();
		$this->assertEquals( $saved, true );
		$this->assertNotEquals( $ticket_1->ID(), 0 );
		$this->assertNotEquals( $ticket_2->ID(), 0 );
	}

	public function test_delete() {
		$ticket_1 = $this->new_model_obj_with_dependencies( 'Ticket', array( 'TKT_price'   => '5' ), false );
		$this->repository->add( $ticket_1 );
		$this->assertTrue( $this->repository->has( $ticket_1 ) );
		$this->repository->rewind();
		while ( $this->repository->valid() ) {
			if ( $this->repository->current() === $ticket_1 ) {
				$this->repository->save();
				$this->assertEquals( $this->repository->current()->ID(), $ticket_1->ID() );
				break;
			}
			$this->repository->next();
		}
		$ticket_1_ID = $ticket_1->ID();
		$this->assertNotEquals( $ticket_1_ID, 0 );
		// now test that we can delete the ticket and remove it from the repo
		$this->repository->rewind();
		while ( $this->repository->valid() ) {
			if ( $this->repository->current() === $ticket_1 ) {
				$deleted = $this->repository->delete();
				$this->assertTrue( $deleted );
				break;
			}
			$this->repository->next();
		}
		$this->assertFalse( $this->repository->has( $ticket_1 ) );
		$this->assertEquals( count( $this->repository ), 0 );
		// because tickets are soft deletable
		$ticket1_from_db = EEM_Ticket::instance()->get_one_by_ID( $ticket_1_ID );
		$this->assertTrue( $ticket1_from_db->deleted() );
	}




	public function test_delete_all() {
		$ticket_1 = $this->new_model_obj_with_dependencies( 'Ticket', array( 'TKT_price' => '5' ), false );
		$ticket_2 = $this->new_model_obj_with_dependencies( 'Ticket', array( 'TKT_price' => '6' ), false );
		$this->repository->add( $ticket_1 );
		$this->repository->add( $ticket_2 );
		$this->assertTrue( $this->repository->has( $ticket_1 ) );
		$this->assertTrue( $this->repository->has( $ticket_2 ) );
		$this->assertEquals( count( $this->repository ), 2 );
		$this->assertEquals( $ticket_1->ID(), 0 );
		$this->assertEquals( $ticket_2->ID(), 0 );
		$saved = $this->repository->save_all();
		$this->assertEquals( $saved, true );
		$ticket_1_ID = $ticket_1->ID();
		$ticket_2_ID = $ticket_2->ID();
		$this->assertNotEquals( $ticket_1_ID, 0 );
		$this->assertNotEquals( $ticket_2_ID, 0 );
		// now test that we can delete the tickets and remove them from the repo
		$deleted = $this->repository->delete_all();
		$this->assertTrue( $deleted );
		$this->assertFalse( $this->repository->has( $ticket_1 ) );
		$this->assertFalse( $this->repository->has( $ticket_2 ) );
		// and the total count
		$this->assertEquals( count( $this->repository ), 0 );
		// because tickets are soft deletable
		$ticket1_from_db = EEM_Ticket::instance()->get_one_by_ID( $ticket_1_ID );
		$this->assertTrue( $ticket1_from_db->deleted() );
		$ticket2_from_db = EEM_Ticket::instance()->get_one_by_ID( $ticket_2_ID );
		$this->assertTrue( $ticket2_from_db->deleted() );
	}



}
// End of file EE_Base_Class_Repository_Test.php
// Location: /tests/testcases/core/EE_Base_Class_Repository_Test.php