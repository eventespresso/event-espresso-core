<?php

/**
 *
 * Class EEM_CPT_Base_Test
 *
 * Description here
 *
 * @package         Event Espresso
 * @subpackage    
 * @author				Mike Nelson
 * @since		 	   $VID:$
 *
 */
if( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

class EEM_CPT_Base_Test extends EE_UnitTestCase{
	
	/**
	 * Test that when we set the minimum where conditions, we DO find cpt items
	 * that are trashed, BUT DO NOT find CPT items of the wrong post_type (whcih might,
	 * by some hackery, have an entry in the meta table)
	 * @group 9179
	 */
	public function test_get_minimum_where_conditions_during_query() {
		$this->assertEquals( 0, EEM_Event::instance()->count( array( 'default_where_conditions' => 'none' ) ) );
		$e_normal = $this->new_model_obj_with_dependencies( 'Event', array( 'status' => EEM_CPT_Base::post_status_publish ) );
		$e_trashed = $this->new_model_obj_with_dependencies( 'Event', array( 'status' => EEM_CPT_Base::post_status_trashed ) );
		$monkey_post = $this->factory->post->create_and_get( array( 'post_type' => 'monkey' ) );
		
		//now verify we get what we wanted: the normal and trashed event, but not
		//the "monkey" post
		$events_found = EEM_Event::instance()->get_all( array( 'default_where_conditions' => 'minimum' ) );
		$this->assertArrayContains( $e_normal, $events_found );
		$this->assertArrayContains( $e_trashed, $events_found );
		$this->assertEquals( 2, count( $events_found ) );
		
		//incidentally, lets show the problem of using the 'default_where_conditions' => 'none'
		//it WOULD count the monkey post. Which is obviously NOT an event!
		$this->assertEquals( 3, EEM_Event::instance()->count( array( 'default_where_conditions' => 'none' ) ) );
	}
}
