<?php
/**
 * Class EEM_CPT_Base_Test
 * Description here
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 * 
 */
if (! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



class EEM_CPT_Base_Test extends EE_UnitTestCase
{

    /**
     * Test that when we set the minimum where conditions, we DO find cpt items
     * that are trashed, BUT DO NOT find CPT items of the wrong post_type (which might,
     * by some mistake, have an entry in the meta table)
     *
     * @group 9179
     */
    public function test_get_minimum_where_conditions_during_query()
    {
        $this->loadFactories();
        $this->assertEquals(0, EEM_Event::instance()->count(array('default_where_conditions' => 'none')));
        $e_normal = $this->new_model_obj_with_dependencies('Event',
            array('status' => EEM_CPT_Base::post_status_publish));
        $e_trashed = $this->new_model_obj_with_dependencies('Event',
            array('status' => EEM_CPT_Base::post_status_trashed));
        $normal_post = $this->factory->post->create_and_get(array('post_type' => 'monkey'));
        //verify the regular post got added correctly
        $this->assertNotEquals( 0, $normal_post->ID );
        //now verify we get what we wanted: the normal and trashed event, but not
        //the normal  post
        $events_found = EEM_Event::instance()->get_all(array('default_where_conditions' => 'minimum'));
        $this->assertArrayContains($e_normal, $events_found);
        $this->assertArrayContains($e_trashed, $events_found);
        $this->assertCount(2, $events_found);
        //incidentally, lets show the problem of using the 'default_where_conditions' => 'none'
        //it WOULD count the normal post. Which is obviously NOT an event!
        $this->assertEquals(3, EEM_Event::instance()->count(array('default_where_conditions' => 'none')));
    }

    /**
     * Test that when we set the minimum_others where conditions, we don't find trashed cpt items
     * for the current model (because we use normal default where conditions for main model), but not for related
     * trashed models (because they only use their minimum where conditions)
     *
*@group 10260
     */
    public function test_get_minimum_others_where_conditions_during_query()
    {
        $this->assertEquals(0, EEM_Event::instance()->count(array('default_where_conditions' => 'none')));
        $e_normal = $this->new_model_obj_with_dependencies('Event',
            array('status' => EEM_CPT_Base::post_status_publish));
        $e_normal_but_with_trashed_v = $this->new_model_obj_with_dependencies('Event',
            array('status' => EEM_CPT_Base::post_status_publish));
        $e_trashed = $this->new_model_obj_with_dependencies('Event',
            array('status' => EEM_CPT_Base::post_status_trashed));
        $v_normal = $this->new_model_obj_with_dependencies('Venue',
            array('status' => EEM_CPT_Base::post_status_publish));
        $v_trashed = $this->new_model_obj_with_dependencies('Venue',
            array('status' => EEM_CPT_Base::post_status_trashed));
        //associate them
        $e_normal->_add_relation_to($v_normal, 'Venue');
        $e_normal_but_with_trashed_v->_add_relation_to($v_trashed, 'Venue');
        $e_trashed->_add_relation_to($v_normal, 'Venue');
        //now verify we get what we wanted...
        $events_found = EEM_Event::instance()->get_all(
            array(
                'force_join' => array( 'Venue' ),
                'default_where_conditions' => \EEM_Base::default_where_conditions_minimum_others
            )
        );
        //we should find the normal one because it's not trashed, nor is its venue
        $this->assertArrayContains($e_normal, $events_found);
        //we should NOT find the trashed event
        $this->assertArrayDoesNotContain($e_trashed, $events_found);
        //we should find the event that's related to a trashed venue, because
        //we should only be applying the MINIMUM where conditions for venues, which don't include their status
        $this->assertArrayContains($e_normal_but_with_trashed_v, $events_found);
        //and that's it
        $this->assertCount(2, $events_found);
    }
}
