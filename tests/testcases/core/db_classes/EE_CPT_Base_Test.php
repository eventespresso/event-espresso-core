<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 *
 * EE_CPT_Base_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
/**
 * @group core/db_classes
 */
class EE_CPT_Base_Test extends EE_UnitTestCase{
	function test_post_type(){
		$e = EE_Event::new_instance(array('EVT_name'=>'e1'));
		$this->assertEquals('espresso_events',$e->post_type());
		$e->save();
		$this->assertEquals('espresso_events',$e->post_type());
		
		$a = EE_Attendee::new_instance( array( 'ATT_fname' => 'mr', 'ATT_lname' => 'perfect' ) );
		$this->assertEquals('espresso_attendees',$a->post_type());
		$a->save();
		$this->assertEquals('espresso_attendees',$a->post_type());
	}
	function test_parent(){
		$e = EE_Event::new_instance(array('parent'=>12));
		$this->assertEquals($e->parent(),12);
	}

}

// End of file EE_CPT_Base_Test.php