<?php

namespace EventEspresso\core\libraries\rest_api\controllers\model;
use EE_REST_TestCase;
use EED_Core_Rest_Api;
use EEM_CPT_Base;
use WP_REST_Request;

/**
 * Class WriteAddRelationTest
 *
 * Write tests that relate to adding relations.
 *
 * @package     Event Espresso
 * @author         Mike Nelson
 * @since         $VID:$
 *
 */
class WriteRemoveRelationTest extends EE_REST_TestCase
{

    /**
     * Successful relation removal.
     * @since $VID:$
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     */
    public function testRemoveRelationGood()
    {
        $this->authenticate_as_admin();
        $event = $this->new_model_obj_with_dependencies(
            'Event',
            array(
                'status' => EEM_CPT_Base::post_status_publish
            )
        );
        $datetime = $this->new_model_obj_with_dependencies(
            'Datetime',
            array(
                'EVT_ID' => $event->ID()
            )
        );
        $this->assertEquals($event->ID(),$datetime->get('EVT_ID'));
        $req = new \WP_REST_Request(
            'DELETE',
            '/' . \EED_Core_Rest_Api::ee_api_namespace . '4.8.36/events/' . $event->ID() . '/datetimes/' . $datetime->ID()
        );
        $response = rest_do_request($req);
        $response_data = $response->get_data();
        $this->assertArrayHasKey(
            'event',
            $response_data
        );
        $this->assertArrayHasKey(
            'datetime',
            $response_data
        );
        $this->assertArrayNotHasKey(
            'join',
            $response_data
        );
        // The event is unaffected...
        $this->assertEquals($event->ID(),$response_data['event']['EVT_ID']);
        // But the event changed.
        $this->assertEquals($datetime->ID(), $response_data['datetime']['DTT_ID']);
        $this->assertEquals(0,$response_data['datetime']['EVT_ID']);
    }


    /**
     * Test HABTM removal relations.
     * @since $VID:$
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     */
    public function testRemoveRelationWithJoinTableGood()
    {
        $this->authenticate_as_admin();
        $question = $this->new_model_obj_with_dependencies('Question');
        $question_group = $this->new_model_obj_with_dependencies('Question_Group');
        $question->_add_relation_to($question_group, 'Question_Group', array('QGQ_order' => 123));
        $qgq_join = $question->get_first_related('Question_Group_Question');
        $req = new WP_REST_Request(
            'DELETE',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/questions/' . $question->ID() . '/question_groups/' . $question_group->ID()
        );
        $response = rest_do_request($req);
        $response_data = $response->get_data();
        $this->assertArrayHasKey(
            'question',
            $response_data
        );
        $this->assertArrayHasKey(
            'question_group',
            $response_data
        );
        $this->assertArrayHasKey(
            'join',
            $response_data
        );
        // The question group
        $this->assertEquals($question->ID(),$response_data['question']['QST_ID']);
        $this->assertEquals($question_group->ID(), $response_data['question_group']['QSG_ID']);
        $this->assertEquals($qgq_join->ID(),$response_data['join']['question_group_question']['QGQ_ID']);

        // Oh and we should double-check the relation was actually removed in the DB.
        $question->clear_cache('Question_Group_Question');
        $qgq_join = $question->get_first_related('Question_Group_Question');
        $this->assertNull($qgq_join);
    }

    /**
     * Test HABTM with wrong params
     * @since $VID:$
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     */
    public function testAddRelationWithJoinTableWrongParams()
    {
        $this->authenticate_as_admin();
        $question = $this->new_model_obj_with_dependencies('Question');
        $question_group = $this->new_model_obj_with_dependencies('Question_Group');
        $question->_add_relation_to($question_group, 'Question_Group', array('QGQ_order' => 123));
        $qgq_join = $question->get_first_related('Question_Group_Question');
        $req = new WP_REST_Request(
            'DELETE',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/questions/' . $question->ID() . '/question_groups/' . $question_group->ID()
        );
        $req->set_body_params(
            array(
                'non-existent-field' => 123,
                'QGQ_order' => 123
            )
        );
        $response = rest_do_request($req);
        $response_data = $response->get_data();
        $this->assertArrayHasKey(
            'question',
            $response_data
        );
        $this->assertArrayHasKey(
            'question_group',
            $response_data
        );
        $this->assertArrayHasKey(
            'join',
            $response_data
        );
        // The row should have still been removed.
        $this->assertEquals($question->ID(),$response_data['question']['QST_ID']);
        $this->assertEquals($question_group->ID(), $response_data['question_group']['QSG_ID']);
        $this->assertEquals($qgq_join->ID(),$response_data['join']['question_group_question']['QGQ_ID']);
        // Oh and we should double-check the relation was actually removed in the DB.
        $question->clear_cache('Question_Group_Question');
        $qgq_join = $question->get_first_related('Question_Group_Question');
        $this->assertNull($qgq_join);
    }

    /**
     * Test HABTM with wrong params
     * @since $VID:$
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @group current
     */
    public function testAddRelationWithJoinTableWrongValues()
    {
        $this->authenticate_as_admin();
        $question = $this->new_model_obj_with_dependencies('Question');
        $question_group = $this->new_model_obj_with_dependencies('Question_Group');
        $qgq_order = 123;
        $question->_add_relation_to($question_group, 'Question_Group', array('QGQ_order' => $qgq_order));
        $old_qgq_join = $question->get_first_related('Question_Group_Question');
        $req = new WP_REST_Request(
            'DELETE',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/questions/' . $question->ID() . '/question_groups/' . $question_group->ID()
        );
        $req->set_body_params(
            array(
                'QGQ_order' => $qgq_order + 1
            )
        );
        $response = rest_do_request($req);
        $response_data = $response->get_data();
        $this->assertFalse($response_data['success']);

        $this->assertArrayHasKey(
            'question',
            $response_data
        );
        $this->assertArrayHasKey(
            'question_group',
            $response_data
        );
        $this->assertArrayHasKey(
            'join',
            $response_data
        );
        $qgq_join = $question->get_first_related('Question_Group_Question');
        // The row should have NOT been removed.
        $this->assertEquals($question->ID(),$response_data['question']['QST_ID']);
        $this->assertEquals($question_group->ID(), $response_data['question_group']['QSG_ID']);
        $this->assertEmpty($response_data['join']['question_group_question']);
        // Oh and we should double-check the relation was actually removed in the DB.
        $question->clear_cache('Question_Group_Question');
        $qgq_join = $question->get_first_related('Question_Group_Question');
        $this->assertEquals($old_qgq_join->ID(), $qgq_join->ID());
    }

    /**
     * No related item
     * @since $VID:$
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @group current
     */
    public function testRemoveRelationNoRelatedItem()
    {
        $this->authenticate_as_admin();
        $event = $this->new_model_obj_with_dependencies(
            'Event',
            array(
                'status' => EEM_CPT_Base::post_status_publish
            )
        );
        $req = new WP_REST_Request(
            'DELETE',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/events/' . $event->ID() . '/datetimes/' . 9999
        );
        $response = rest_do_request($req);
        $response_data = $response->get_data();
        $this->assertEquals('rest_datetime_invalid_id', $response_data['code']);
    }

    /**
     * No primary item
     * @since $VID:$
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     */
    public function testRemoveRelationNoPrimaryModel()
    {
        $this->authenticate_as_admin();
        $datetime = $this->new_model_obj_with_dependencies(
            'Datetime',
            array(
                'EVT_ID' => 0
            )
        );
        $req = new WP_REST_Request(
            'DELETE',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/events/' . 99999 . '/datetimes/' . $datetime->ID()
        );
        $response = rest_do_request($req);
        $response_data = $response->get_data();
        $this->assertEquals('rest_event_invalid_id', $response_data['code']);
    }

    /**
     * Already related
     * @since $VID:$
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     */
    public function testAddRelationNotAlreadyRelated()
    {
        $this->authenticate_as_admin();
        $event = $this->new_model_obj_with_dependencies(
            'Event',
            array(
                'status' => EEM_CPT_Base::post_status_publish
            )
        );
        $datetime = $this->new_model_obj_with_dependencies('Datetime');
        $req = new WP_REST_Request(
            'DELETE',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/events/' . $event->ID() . '/datetimes/' . $datetime->ID()
        );
        $response = rest_do_request($req);
        $response_data = $response->get_data();
        $this->assertArrayHasKey(
            'event',
            $response_data
        );
        $this->assertArrayHasKey(
            'datetime',
            $response_data
        );
        $this->assertArrayNotHasKey(
            'join',
            $response_data
        );
        // Nothing is changed. They're still not related.
        $this->assertEquals($event->ID(), $response_data['event']['EVT_ID']);
        $this->assertEquals($datetime->ID(), $response_data['datetime']['DTT_ID']);
        $this->assertNotEquals($event->ID(), $response_data['datetime']['EVT_ID']);
    }


    /**
     * Valid request but not authenticated
     * @since $VID:$
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     */
    public function testAddRelationUnauthenticated()
    {
        $event = $this->new_model_obj_with_dependencies(
            'Event',
            array(
                'status' => EEM_CPT_Base::post_status_publish
            )
        );
        $datetime = $this->new_model_obj_with_dependencies(
            'Datetime',
            array(
                'EVT_ID' => $event->ID()
            )
        );
        $req = new WP_REST_Request(
            'DELETE',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/events/' . $event->ID() . '/datetimes/' . $datetime->ID()
        );
        $response = rest_do_request($req);
        $response_data = $response->get_data();
        $this->assertEquals('rest_cannot_edit_events', $response_data['code']);
        $datetime->refresh_from_db();
        $this->assertEquals($event->ID(), $datetime->get('EVT_ID'));
    }

    /**
     * Valid request but doesn't have sufficient privileges.
     * @since $VID:$
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     */
    public function testAddRelationInsufficientPrivileges()
    {
        global $current_user;
        //setup our user and set as current user.
        $current_user = $this->factory->user->create_and_get();
        $this->assertInstanceOf('WP_User', $current_user);
        $current_user->add_role('event_manager');
        $event = $this->new_model_obj_with_dependencies(
            'Event',
            array(
                'status' => EEM_CPT_Base::post_status_publish
            )
        );
        $datetime = $this->new_model_obj_with_dependencies(
            'Datetime',
            array(
                'EVT_ID' => $event->ID()
            )
        );
        $req = new WP_REST_Request(
            'POST',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/events/' . $event->ID() . '/datetimes/' . $datetime->ID()
        );
        $response = rest_do_request($req);
        $response_data = $response->get_data();
        $this->assertEquals('rest_cannot_edit_events', $response_data['code']);
        $datetime->refresh_from_db();
        $this->assertEquals($event->ID(), $datetime->get('EVT_ID'));
    }
}
// End of file WriteAddRelationTest.php
// Location: EventEspresso\core\libraries\rest_api\controllers\model/WriteAddRelationTest.php
