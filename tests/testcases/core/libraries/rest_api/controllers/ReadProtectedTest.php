<?php

namespace EventEspresso\core\libraries\rest_api\controllers\model;

use EE_REST_TestCase;
use EED_Core_Rest_Api;
use EEM_Event;
use WP_REST_Request;

/**
 * Class ReadProtectedTest
 *
 * Description
 *
 * @package     Event Espresso
 * @author         Mike Nelson
 * @since         $VID:$
 * @group private-1
 *
 */
class ReadProtectedTest extends EE_REST_TestCase
{

    /**
     * @since $VID:$
     * @return \EE_Event
     * @throws \EE_Error
     */
    protected function setupPasswordProtectedEvent()
    {
        $password = 'correct_password';
        $post_body = 'post body';
        $event = $this->new_model_obj_with_dependencies(
            'Event',
            array(
                'password' => $password,
                'status' => EEM_Event::post_status_publish,
                'EVT_desc' => $post_body,
            )
        );
        return $event;
    }
    // test get_all on a model with a password field, with no password provided

    /**
     * @since $VID:$
     */
    public function testGetAllNoPassword()
    {
        $event = $this->setupPasswordProtectedEvent();

        $req = new WP_REST_Request('GET',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/events');
        $response = rest_do_request($req);
        $response_data = $response->get_data();
        $this->assertTrue(is_array($response_data));
        $this->assertEquals($event->ID(), $response_data[0]['EVT_ID']);
        // note that this event was password-protected
        $this->assertEquals('', $response_data[0]['EVT_desc']['rendered']);

    }

    public function getAllNoPasswordAsAdmin()
    {
        $event = $this->setupPasswordProtectedEvent();
        // now don't provide the password, but authenticate
        // WP core currently actually hides this content from admins too
        // in the REST API, and web front-end. So we do too.
        $this->authenticate_as_admin();
        $response = rest_do_request(
            new WP_REST_Request('GET', '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/events/' . $event->ID())
        );
        $this->assertInstanceOf('WP_REST_Response', $response);
        $data = $response->get_data();
        $this->assertEquals(
            '',
            $data['EVT_desc']['rendered']
        );
    }



    // ... with the wrong password
    public function testGetAllWrongPassword()
    {
        $event = $this->setupPasswordProtectedEvent();
        $req = new WP_REST_Request('GET',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/events');
        $req->set_query_params(
            array(
                'password' => $event->get('password') . ' made incorrect!'
            )
        );
        $response = rest_do_request($req);
        $response_data = $response->get_data();
        $this->assertTrue(is_array($response_data));
        $this->assertEquals('rest_post_incorrect_password', $response_data['code']);
    }

    // ... with the correct password
    public function testGetAllCorrectPassword()
    {
        $event = $this->setupPasswordProtectedEvent();
        $req = new WP_REST_Request('GET',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/events');
        $req->set_query_params(
            array(
                'password' => $event->get('password')
            )
        );
        $response = rest_do_request($req);
        $response_data = $response->get_data();
        $this->assertTrue(is_array($response_data));
        $this->assertEquals($event->ID(), $response_data[0]['EVT_ID']);
        // note that this event was password-protected
        $this->assertEquals($event->get_pretty('EVT_desc'), $response_data[0]['EVT_desc']['rendered']);
    }

    /**
     * @since $VID:$
     */
    public function testGetOneNoPassword()
    {
        $event = $this->setupPasswordProtectedEvent();

        $req = new WP_REST_Request('GET',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/events/' . $event->ID());
        $req->set_url_params(
            array(
                'id' => $event->ID(),
            )
        );
        $response = rest_do_request($req);
        $response_data = $response->get_data();
        $this->assertTrue(is_array($response_data));
        $this->assertEquals($event->ID(), $response_data['EVT_ID']);
        // note that this event was password-protected
        $this->assertEquals('', $response_data['EVT_desc']['rendered']);

    }

    // ... with the wrong password
    public function testGetOneWrongPassword()
    {
        $event = $this->setupPasswordProtectedEvent();
        $req = new WP_REST_Request('GET',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/events/' . $event->ID());
        $req->set_url_params(
            array(
                'id' => $event->ID(),
            )
        );
        $req->set_query_params(
            array(
                'password' => $event->get('password') . ' made incorrect!'
            )
        );
        $response = rest_do_request($req);
        $response_data = $response->get_data();
        $this->assertTrue(is_array($response_data));
        $this->assertEquals('rest_post_incorrect_password', $response_data['code']);
    }

    // ... with the correct password
    public function testGetOneCorrectPassword()
    {
        $event = $this->setupPasswordProtectedEvent();
        $req = new WP_REST_Request('GET',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/events/' . $event->ID());
        $req->set_url_params(
            array(
                'id' => $event->ID(),
            )
        );
        $req->set_query_params(
            array(
                'password' => $event->get('password')
            )
        );
        $response = rest_do_request($req);
        $response_data = $response->get_data();
        $this->assertTrue(is_array($response_data));
        $this->assertEquals($event->ID(), $response_data['EVT_ID']);
        // note that this event was password-protected
        $this->assertEquals($event->get_pretty('EVT_desc'), $response_data['EVT_desc']['rendered']);
    }

    // test get_all on a model protected by another model's password field, with no password provided


    /**
     * @since $VID:$
     * @return EE_Datetime[] first one is for a public event, the second is for a password-protected event
     * @throws \EE_Error
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     * @throws \InvalidArgumentException
     * @throws \ReflectionException
     */
    protected function setupPasswordProtectedDatetimes()
    {
        // create two events, one being password protected
        $e_no_password = $this->new_model_obj_with_dependencies(
            'Event',
            array(
                'password' => '',
                'status' => EEM_Event::post_status_publish,
                'EVT_desc' => 'no password needed to view this'
            ));
        $e_with_password = $this->setupPasswordProtectedEvent();

        // create datetimes for each
        $datetime_no_password = $this->new_model_obj_with_dependencies(
            'Datetime',
            array(
                'EVT_ID' => $e_no_password->ID()
            )
        );
        $datetime_password = $this->new_model_obj_with_dependencies(
            'Datetime',
            array(
                'EVT_ID' => $e_with_password->ID()
            )
        );
        return array($datetime_no_password, $datetime_password);
    }
    /**
     * @since $VID:$
     * @throws \EE_Error
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     * @throws \InvalidArgumentException
     * @throws \ReflectionException
     * @group private-1
     */
    public function testGetAllDatetimesForPasswordProtectedEvents()
    {
        list($datetime_no_password, $datetime) = $this->setupPasswordProtectedDatetimes();

        //send a request for the two datetimes
        $response = rest_do_request(
            new WP_REST_Request('GET', '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/datetimes')
        );
        $this->assertInstanceOf('WP_REST_Response', $response);
        $data = $response->get_data();

        // only the datetime for non-password protected events are visible
        $this->assertEquals(1, count($data));
        $this->assertEquals(
            $datetime_no_password->ID(),
            $data[0]['DTT_ID']
        );
    }

    /**
     * @since $VID:$
     * @return EE_Ticket[]. The first is for a event with no password, the second is for an event that has a password
     * @throws \EE_Error
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     * @throws \InvalidArgumentException
     * @throws \ReflectionException
     */
    protected function setupPasswordProtectedTickets()
    {
        list($datetime_no_password, $datetime_password) = $this->setupPasswordProtectedDatetimes();
        $ticket_no_password = $this->new_model_obj_with_dependencies('Ticket');
        $ticket_no_password->_add_relation_to($datetime_no_password->ID(), 'Datetime');
        $ticket_password = $this->new_model_obj_with_dependencies('Ticket');
        $ticket_password->_add_relation_to($datetime_password->ID(), 'Datetime');
        return array($ticket_no_password, $ticket_password);
    }

    /**
     * @since $VID:$
     * @group private-1
     * @throws \EE_Error
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     * @throws \InvalidArgumentException
     * @throws \ReflectionException
     */
    public function testGetAllTicketsForPasswordProtectedEvents()
    {
        list($ticket, $ticket_no_password) = $this->setupPasswordProtectedTickets();

        //send a request for the two datetimes
        $response = rest_do_request(
            new WP_REST_Request('GET', '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/tickets')
        );
        $this->assertInstanceOf('WP_REST_Response', $response);
        $data = $response->get_data();

        // only the datetime for non-password protected events are visible
        $this->assertEquals(1, count($data));
        $this->assertEquals(
            $ticket_no_password->ID(),
            $data[0]['TKT_ID']
        );
    }

    // ...with the wrong password

    // ...with the correct password

    // test get_one on a model with a password field, with no password provided

    // ...with the wrong password

    // ...with the correct password

    // test get_one on a model protected by another model's password, with no password provided

    //  ...with the wrong password

    // ...with the right password

    //test get_related with a model with a password field, with no password provided

    // ...with the wrong password

    // ...with the right password

    //test get_related with an UNPROTECTED model, but the related model is protected, and no password is provided

    // ...with the wrong password provided

    // ...with the right password provided

    //test including on a model with a password, and the related model is password protected (eg country to venue), and no password is provided

    // ...with the wrong password provided

    // ...with the right password provided

    //test including on a protected model, and the related model is also protected (event to datetime), and no password is provided

    // ...with the wrong password provided

    // ...with the right password provided

    //test including on a protected model, and the related model is NOT protected (eg venue to country), and no password is provided

    // ...with the wrong password

    // ...with the right password
}
// End of file ReadProtectedTest.php
// Location: EventEspresso\core\libraries\rest_api\controllers\model/ReadProtectedTest.php
