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
class WriteAddRelationTest extends EE_REST_TestCase
{

    /**
     * @since $VID:$
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     */
    public function testAddRelationGood()
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
                'EVT_ID' => 0
            )
        );
        $this->assertNotEquals($event->ID(),$datetime->get('EVT_ID'));
        $req = new WP_REST_Request(
            'POST',
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
        // The datetime should be updated now
        $this->assertEquals($event->ID(),$response_data['event']['EVT_ID']);
        $this->assertEquals($datetime->ID(), $response_data['datetime']['DTT_ID']);
        $this->assertEquals($event->ID(),$response_data['datetime']['EVT_ID']);
    }


    /**
     *  test HABTM add
     * @since $VID:$
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     */
    public function testAddRelationWithJoinTableGood()
    {
        $this->authenticate_as_admin();
        $question = $this->new_model_obj_with_dependencies('Question');
        $question_group = $this->new_model_obj_with_dependencies('Question_Group');
        $req = new WP_REST_Request(
            'POST',
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
        $qgq_join = $question->get_first_related('Question_Group_Question');
        $this->assertEquals($question->ID(),$response_data['question']['QST_ID']);
        $this->assertEquals($question_group->ID(), $response_data['question_group']['QSG_ID']);
        // The join row should have been returned and have an ID.
        $this->assertEquals($qgq_join->ID(),$response_data['join']['question_group_question']['QGQ_ID']);
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
        $req = new WP_REST_Request(
            'POST',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/questions/' . $question->ID() . '/question_groups/' . $question_group->ID()
        );
        $req->set_body_params(
            array(
                'non-existent-field' => 123,
                'QGQ_order' => 234
            )
        );
        $response = rest_do_request($req);
        $response_data = $response->get_data();
        $this->assertEquals('invalid_field', $response_data['code']);
        // The data should be unchanged.
        $question->clear_cache('Question_Group_Question');
        $this->assertNull($question->get_first_related('Question_Group_Question'));
    }

    /**
     * No related item
     * @since $VID:$
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     */
    public function testAddRelationNoRelatedItem()
    {
        $this->authenticate_as_admin();
        $event = $this->new_model_obj_with_dependencies(
            'Event',
            array(
                'status' => EEM_CPT_Base::post_status_publish
            )
        );
        $req = new WP_REST_Request(
            'POST',
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
    public function testAddRelationNoPrimaryModel()
    {
        $this->authenticate_as_admin();
        $datetime = $this->new_model_obj_with_dependencies(
            'Datetime',
            array(
                'EVT_ID' => 0
            )
        );
        $req = new WP_REST_Request(
            'POST',
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
    public function testAddRelationAlreadyRelated()
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
        $req = new WP_REST_Request(
            'POST',
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
        // Nothing is changed. It's all a-ok still.
        $this->assertEquals($event->ID(),$response_data['event']['EVT_ID']);
        $this->assertEquals($datetime->ID(), $response_data['datetime']['DTT_ID']);
        $this->assertEquals($event->ID(),$response_data['datetime']['EVT_ID']);
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
                'EVT_ID' => 0
            )
        );
        $this->assertNotEquals($event->ID(),$datetime->get('EVT_ID'));
        $req = new WP_REST_Request(
            'POST',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/events/' . $event->ID() . '/datetimes/' . $datetime->ID()
        );
        $response = rest_do_request($req);
        $response_data = $response->get_data();
        $this->assertEquals('rest_cannot_edit_events', $response_data['code']);
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
                'EVT_ID' => 0
            )
        );
        $this->assertNotEquals($event->ID(),$datetime->get('EVT_ID'));
        $req = new WP_REST_Request(
            'POST',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/events/' . $event->ID() . '/datetimes/' . $datetime->ID()
        );
        $response = rest_do_request($req);
        $response_data = $response->get_data();
        $this->assertEquals('rest_cannot_edit_events', $response_data['code']);
    }

}
// End of file WriteAddRelationTest.php
// Location: EventEspresso\core\libraries\rest_api\controllers\model/WriteAddRelationTest.php
