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



    /**
     * @group 10851
     */
	function test_wp_post__saved_ee_model_obj()
    {
        $e = $this->new_model_obj_with_dependencies('Event');
        $post = $e->wp_post();
        $this->assertEquals(
            $e->ID(),
            $post->ID
        );
        $this->assertEquals(
            $e->description(),
            $post->post_content
        );
        $this->assertEquals(
            $e->get_datetime('EVT_created','Y-m-d', 'H:i:s'),
            $post->post_date
        );
    }


    /**
     * @group 10851
     */
    function testWpPostUnsavedModelObj()
    {
        $e = $this->new_model_obj_with_dependencies('Event',null,false);
        $post = $e->wp_post();
        $this->assertEquals(
            $e->ID(),
            $post->ID
        );
        $this->assertEquals(
            $e->description(),
            $post->post_content
        );
        $this->assertEquals(
            $e->get_datetime('EVT_created','Y-m-d', 'H:i:s'),
            $post->post_date
        );
    }
}

// End of file EE_CPT_Base_Test.php