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

    public  function test_post_type(){
		$e = EE_Event::new_instance(array('EVT_name'=>'e1'));
		$this->assertEquals('espresso_events',$e->post_type());
		$e->save();
		$this->assertEquals('espresso_events',$e->post_type());

		$a = EE_Attendee::new_instance( array( 'ATT_fname' => 'mr', 'ATT_lname' => 'perfect' ) );
		$this->assertEquals('espresso_attendees',$a->post_type());
		$a->save();
		$this->assertEquals('espresso_attendees',$a->post_type());
	}


	public function test_parent(){
		$e = EE_Event::new_instance(array('parent'=>12));
		$this->assertEquals($e->parent(),12);
	}



    /**
     * @group 10851
     */
	public function testWpPostSavedModelObj()
    {
        /** @var EE_Event $e */
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
        /** @var EE_Event $e */
        $e    = $this->new_model_obj_with_dependencies('Event',null,false);
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
        $this->loadShortcodesManagerAndShortcodes();
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
        $event_with_reg_desc = $event_with_registrations->get_pretty('EVT_desc');
        $other_event_desc = $other_event->get_pretty('EVT_desc');

        //the shortcode for each event should be different when rendered
        $this->assertNotEquals(
            $event_with_reg_desc,
            $other_event_desc,
            "'{$event_with_reg_desc}' should not be the same as '{$other_event_desc}'"
        );
    }


    /**
     * @ticket 418 https://github.com/eventespresso/event-espresso-core/issues/418
     */
    public function testAddEventCategory()
    {
        $e = $this->new_model_obj_with_dependencies('Event');
        /**
         * @var $e EE_Event
         */
        $ee_term_taxonomy = $e->add_event_category(
            'Rebel Ships',
            'Events look at important Rebel Space Ships'
        );
        $this->assertTrue($ee_term_taxonomy instanceof EE_Term_Taxonomy);
        $this->assertNotEquals(0, $ee_term_taxonomy->get('term_count'));
        $this->assertEquals('espresso_event_categories', $ee_term_taxonomy->taxonomy());
    }


    /**
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     */
    public function testAddEventCategoryNoDuplicates()
    {
        $e = $this->new_model_obj_with_dependencies('Event');
        $wp_term = $this->factory()->term->create_and_get(
            array(
                'name' => 'cars',
                'taxonomy' => 'category',
                'description' => 'regardless of whether this is a valid taxonomy, its certainl not the EE event category'
            )
        );
        $this->assertNotInstanceOf('WP_Error', $wp_term);
        $ee_term = $this->new_model_obj_with_dependencies(
            'Term',
            array(
                'name' => 'cars',
                'slug' => 'cars',

            )
        );
        $ee_term_taxonomy = $this->new_model_obj_with_dependencies(
            'Term_Taxonomy',
            array(
                'term_id' => $ee_term->ID(),
                'taxonomy' => EEM_CPT_Base::EVENT_CATEGORY_TAXONOMY
            )
        );
        //when adding the term to this event, it shouldn't creating a new one
        $term_taxonomy_used_for_relation = $e->add_event_category(
            'cars',
            'an actual ee category'
        );
        $this->assertEquals($ee_term_taxonomy, $term_taxonomy_used_for_relation);
    }
}

// End of file EE_CPT_Base_Test.php
