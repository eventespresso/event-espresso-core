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
	public function testWpPostSavedModelObj()
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
    public function testWpPostUnsavedModelObj()
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


    /**
     * Creates two events: one with registrations, the other without.
     * Verify that if we loop over them and render their pretty content (which renders shortcodes)
     * we don't accidentally cache the shortcode from one event to the other
     * @group 10851
     */
    public function testGetPrettyCurrentPostRemainingTheSame()
    {
        $transaction = $this->new_typical_transaction();
        $event_with_registrations = $transaction->primary_registration()->event();
        $event_with_registrations->set_description('[ESPRESSO_EVENT_ATTENDEES]');

        $other_event = $this->new_model_obj_with_dependencies(
            'Event',
            array(
                'EVT_desc' => '[ESPRESSO_EVENT_ATTENDEES]'
            )
        );
        $dtt = $this->new_model_obj_with_dependencies('Datetime');
        $other_event->_add_relation_to( $dtt, 'Datetime' );
        $dtt->_add_relation_to(
            $this->new_model_obj_with_dependencies('Ticket'),
            'Ticket'
        );

        //the shortcode for each event should be different when rendered
        $this->assertNotEquals(
            $event_with_registrations->get_pretty('EVT_desc'),
            $other_event->get_pretty('EVT_desc')
        );
    }
}

// End of file EE_CPT_Base_Test.php