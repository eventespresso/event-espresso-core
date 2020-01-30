<?php

namespace EventEspresso\core\libraries\rest_api\controllers\model;
use EE_Error;
use EE_REST_TestCase;
use EED_Core_Rest_Api;
use EEM_CPT_Base;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;
use ReflectionException;
use WP_REST_Request;

/**
 * Class WriteRemoveRelationTest
 *
 * Write tests that relate to adding relations.
 *
 * @package     Event Espresso
 * @author         Mike Nelson
 * @since         4.9.76.p
 *
 */
class WriteRemoveRelationTest extends EE_REST_TestCase
{

    /**
     * Successful relation removal.
     * @since 4.9.76.p
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
     * @since 4.9.76.p
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
        // add another row, just for good measure. It should get deleted too.
        $question->_add_relation_to($question_group, 'Question_Group', array('QGQ_order' => 456));
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
     * @since 4.9.76.p
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     */
    public function testRemoveRelationWithJoinTableWrongParams()
    {
        $this->authenticate_as_admin();
        $question = $this->new_model_obj_with_dependencies('Question');
        $question_group = $this->new_model_obj_with_dependencies('Question_Group');
        $question->_add_relation_to($question_group, 'Question_Group', array('QGQ_order' => 123));
        $qgq_join_original = $question->get_first_related('Question_Group_Question');
        $req = new WP_REST_Request(
            'DELETE',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/questions/' . $question->ID() . '/question_groups/' . $question_group->ID()
        );
        $req->set_body_params(
            array(
                // You would think `QGQ_order` is correct, but this endpoint obliterates all relations, regardless
                // of whether you provide this extra parameter. So we actually want this to be an error.
                'QGQ_order' => 123
            )
        );
        $response = rest_do_request($req);
        $response_data = $response->get_data();
        $this->assertEquals('invalid_field', $response_data['code']);
        // Oh and we should double-check the relation was not actually removed in the DB.
        $question->clear_cache('Question_Group_Question');
        $qgq_join = $question->get_first_related('Question_Group_Question');
        $this->assertEquals($qgq_join_original, $qgq_join);
    }

    /**
     * No related item
     * @since 4.9.76.p
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
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
     * @since 4.9.76.p
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
     * @since 4.9.76.p
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     */
    public function testRemoveRelationNotAlreadyRelated()
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
     * @since 4.9.76.p
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     */
    public function testRemoveRelationUnauthenticated()
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
     * @since 4.9.76.p
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     */
    public function testRemoveRelationInsufficientPrivileges()
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
            'DELETE',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/events/' . $event->ID() . '/datetimes/' . $datetime->ID()
        );
        $response = rest_do_request($req);
        $response_data = $response->get_data();
        $this->assertEquals('rest_cannot_edit_events', $response_data['code']);
        $datetime->refresh_from_db();
        $this->assertEquals($event->ID(), $datetime->get('EVT_ID'));
    }
}
// End of file WriteRemoveRelationTest.php
// Location: EventEspresso\core\libraries\rest_api\controllers\model/WriteRemoveRelationTest.php
