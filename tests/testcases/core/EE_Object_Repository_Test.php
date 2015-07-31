<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * Class EE_Object_Repository_Test
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Brent Christensen
 * @since 				4.6.31
 * @group 				objectRepository
 * @group 				8280
 *
 */
class EE_Object_Repository_Test extends EE_UnitTestCase {

	/**
	 * @type \EE_Object_Repository_Mock $repository
	 */
	protected $repository;

	public function setUp() {
		require_once EE_TESTS_DIR . 'mocks/EE_Object_Repository_Mock.php';
		$this->repository = new EE_Object_Repository_Mock();
		parent::setUp();
	}

	public function test_persist() {
		$ticket_1 = $this->new_model_obj_with_dependencies( 'Ticket', array( 'TKT_price'   => '5' ), false );
		$this->repository->add( $ticket_1 );
		$this->assertEquals( $ticket_1->ID(), 0 );
		$saved = false;
		$this->repository->rewind();
		while ( $this->repository->valid() ) {
			if ( $this->repository->current() === $ticket_1 ) {
				$saved = $this->repository->persist();
				break;
			}
			$this->repository->next();
		}
		$this->assertNotEquals( $saved, false );
		$this->assertNotEquals( $ticket_1->ID(), 0 );
	}




	public function test_persist_all() {
		$ticket_1 = $this->new_model_obj_with_dependencies( 'Ticket', array( 'TKT_price'   => '5' ), false );
		$ticket_2 = $this->new_model_obj_with_dependencies( 'Ticket', array( 'TKT_price'   => '6' ), false );
		$this->repository->add( $ticket_1 );
		$this->repository->add( $ticket_2 );
		$this->assertEquals( $ticket_1->ID(), 0 );
		$this->assertEquals( $ticket_2->ID(), 0 );
		$saved = $this->repository->persist_all();
		$this->assertEquals( $saved, true );
		$this->assertNotEquals( $ticket_1->ID(), 0 );
		$this->assertNotEquals( $ticket_2->ID(), 0 );
	}



}
// End of file EE_Object_Repository_Test.php
// Location: /tests/testcases/core/EE_Object_Repository_Test.php