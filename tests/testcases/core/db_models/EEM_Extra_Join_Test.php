<?php

/**
 *
 * Class EEM_Extra_Join_Test
 *
 * Description here
 *
 * @package         Event Espresso
 * @subpackage
 * @author				Mike Nelson
 * @since		 	   $VID:$
 *
 */
class EEM_Extra_Join_Test extends EE_UnitTestCase{

	public function setUp() {
		parent::setUp();
		//for the testing's sake, we want events to be related to payment methods via a HABTM_Any relation
		add_filter( 'FHEE__EEM_Event__construct__model_relations', array( $this, 'relate_events_to_payment_methods' ) );
		add_filter( 'FHEE__EEM_Payment_Method__construct__model_relations', array( $this, 'relate_payment_methods_to_events' ) );
		// do another soft reset on the registry now so those filters take effect
		EE_Registry::reset();
	}



	/**
	 * @param $event_relations
	 * @return mixed
	 */
	public function relate_events_to_payment_methods( $event_relations ) {
		$event_relations[ 'Payment_Method' ] = new EE_HABTM_Any_Relation();
		return $event_relations;
	}



	/**
	 * @param $pm_relations
	 * @return mixed
	 */
	public function relate_payment_methods_to_events( $pm_relations ) {
		$pm_relations[ 'Event' ] = new EE_HABTM_Any_Relation();
		return $pm_relations;
	}

	/**
	 * @group 9113
	 */
	public function test_get_related() {
		$e = $this->new_model_obj_with_dependencies( 'Event' );
		$pm = $this->new_model_obj_with_dependencies( 'Payment_Method', array( 'PMD_type' => 'Invoice' ) );
		//add a few extra events and payment methods, just to make sure we are
		//only relating the things we intended
		$other_e = $this->new_model_obj_with_dependencies( 'Event' );
		$other_pm = $this->new_model_obj_with_dependencies( 'Payment_Method', array( 'PMD_type' => 'Invoice' ) );

		$rel = $this->new_model_obj_with_dependencies( 'Extra_Join',
				array(
					'EXJ_first_model_ID' => $e->ID(),
					'EXJ_first_model_name' => 'Event',
					'EXJ_second_model_ID' => $pm->ID(),
					'EXJ_second_model_name' => 'Payment_Method'
				));
		$this->assertEquals( array( $pm->ID() => $pm ), $e->get_many_related( 'Payment_Method' ) );
		$this->assertEquals( array( $e->ID() => $e ), $pm->get_many_related( 'Event' ) );
	}

	/**
	 * @group 9113
	 */
	public function test_add(){
		$e = $this->new_model_obj_with_dependencies( 'Event' );
		$pm = $this->new_model_obj_with_dependencies( 'Payment_Method', array( 'PMD_type' => 'Invoice' ) );
		$e->_add_relation_to( $pm, 'Payment_Method' );
		$this->assertEquals( array( $pm->ID() => $pm ), $e->get_many_related( 'Payment_Method' ) );
	}
	/**
	 * @group 9113
	 */
	public function test_delete() {
		$e = $this->new_model_obj_with_dependencies( 'Event' );
		$pm = $this->new_model_obj_with_dependencies( 'Payment_Method', array( 'PMD_type' => 'Invoice' ) );
		$e->_add_relation_to( $pm, 'Payment_Method' );
		$this->assertEquals( array( $pm->ID() => $pm ), $e->get_many_related( 'Payment_Method' ) );
		$e->_remove_relation_to( $pm, 'Payment_Method' );
		$this->assertEquals( array(), $e->get_many_related( 'Payment_Method' ) );
	}

}
