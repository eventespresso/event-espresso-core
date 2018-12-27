<?php

namespace EventEspresso\core\libraries\rest_api\controllers\model;

use EE_Datetime;
use EE_Error;
use EE_REST_TestCase;
use EE_Ticket;
use EE_Venue;
use EED_Core_Rest_Api;
use EEM_Base;
use EEM_Event;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;
use ReflectionException;
use WP_REST_Request;

/**
 * Class ReadProtectedTest
 *
 * Description
 *
 * @package     Event Espresso
 * @author         Mike Nelson
 * @since         4.9.74.p
 * @group private-1
 *
 */
class ReadProtectedTest extends EE_REST_TestCase
{

    /**
     * Helper method for setting up password-protected event
     * @since 4.9.74.p
     * @return \EE_Event
     * @throws EE_Error
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

    /**
     * test get_all on a model with a password field, with no password provided.
     * @since 4.9.74.p
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
        $this->assertFalse(isset($response_data[0]['EVT_desc']['raw']));
    }

    /**
     * Asserts that _protected can be excluded using "include" parameter (if using that, you probably wanted
     * to cut down on the response size).
     * @since 4.9.74.p
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function testGetAllNoPasswordDontIncludeProtectedProperty()
    {
        $event = $this->setupPasswordProtectedEvent();

        $req = new WP_REST_Request('GET',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/events');
        $req->set_query_params(
            array(
                'include' => 'EVT_desc'
            )
        );
        $response = rest_do_request($req);
        $response_data = $response->get_data();
        $this->assertTrue(is_array($response_data));
        $this->assertEquals($event->ID(), $response_data[0]['EVT_ID']);
        // note that this event was password-protected
        $this->assertEquals('', $response_data[0]['EVT_desc']['rendered']);
        $this->assertArrayNotHasKey(
            '_protected',
            $response_data[0]
        );
    }

    /**
     * Asserts that _protected can be excluded using "include" parameter (if using that, you probably wanted
     * to cut down on the response size).
     * @since 4.9.74.p
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function testGetAllNoPasswordIncludeSpecificFieldsAndProtectedProperty()
    {
        $event = $this->setupPasswordProtectedEvent();

        $req = new WP_REST_Request('GET',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/events');
        $req->set_query_params(
            array(
                'include' => 'EVT_desc, _protected'
            )
        );
        $response = rest_do_request($req);
        $response_data = $response->get_data();
        $this->assertTrue(is_array($response_data));
        $this->assertEquals($event->ID(), $response_data[0]['EVT_ID']);
        // note that this event was password-protected
        $this->assertEquals('', $response_data[0]['EVT_desc']['rendered']);
        $this->assertArrayHasKey(
            '_protected',
            $response_data[0]
        );
        $this->assertEquals(
            array(
                'EVT_desc'
            ),
            $response_data[0]['_protected']
        );
    }

    /**
     * Slight variation on the previous test, just verifying password protected content is even protected from
     * admins because that's what the WP API does... although no guanratee this won't change.
     * @since 4.9.74.p
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     */
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

    /**
     * Get all events but provide the wrong password.
     * @since 4.9.74.p
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     */
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

    /**
     * Get all events, but with the correct password. There is only one password so it's fine.
     * @since 4.9.74.p
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     */
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
     * Get all events, using the correct password BUT multiple events are returned, some with a different password.
     * Seeing how we want to avoid brute force attack trying to guess a post password, this is denied.
     * @since 4.9.74.p
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     */
    public function testGetAllCorrectAndWrongPassword()
    {
        $event = $this->setupPasswordProtectedEvent();
        $event2 = $this->new_model_obj_with_dependencies(
            'Event',
            array(
                'password' => '',
                'status' => EEM_Event::post_status_publish,
            )
        );
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
        // the password was incorrect for one of the selected events, so they get an error...
        // if you provide a password, you need to also know which events you think its the password for.
        $this->assertEquals('rest_post_incorrect_password', $response_data['code']);
    }


    /**
     * Get one password-protected event, without providing the password.
     * @since 4.9.74.p
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
        $this->assertFalse(isset($response_data['EVT_desc']['raw']));
    }

    // Get one event with the wrong password.
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

    /**
     * Get one event with the correct password.
     * @since 4.9.74.p
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     */
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

    /**
     * Creates two datetimes, the first for a public event, the second for a password-protected event.
     * @since 4.9.74.p
     * @return EE_Datetime[] first one is for a public event, the second is for a password-protected event.
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
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
     * Test get_all on a model protected by another model's password field, with no password provided.
     * @since 4.9.74.p
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
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
     * Helper method for setting up two tickets, the first for a datetime on a public event, the second for a datetime
     * on a password-protected event.
     * @since 4.9.74.p
     * @return EE_Ticket[]. The first is for a event with no password, the second is for an event that has a password
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
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
     * Test get_all on a model protected by another model's password field (that's not directly related),
     * with no password provided.
     * @since 4.9.74.p
     * @group private-1
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     */
    public function testGetAllTicketsForPasswordProtectedEvents()
    {
        list($ticket_no_password, $ticket) = $this->setupPasswordProtectedTickets();

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

    /**
     * Test get_all on a model protected by another model's password field, with the wrong password provided.
     * @since 4.9.74.p
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @group private-1
     */
    public function testGetAllDatetimesForPasswordProtectedEventsWrongPassword()
    {
        list($datetime_no_password, $datetime) = $this->setupPasswordProtectedDatetimes();

        //send a request for the two datetimes
        $request = new WP_REST_Request('GET', '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/datetimes');
        $request->set_query_params(
            array(
                'password' => $datetime->event()->get('password') . ' made incorrect'
            )
        );
        $response = rest_do_request($request);
        $response_data = $response->get_data();
        $this->assertTrue(is_array($response_data));
        $this->assertEquals('rest_post_incorrect_password', $response_data['code']);
    }

    /**
     * Test get_all on a model protected by another model's password field, with the correct password provided.
     * @since 4.9.74.p
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @group private-1
     */
    public function testGetAllDatetimesForPasswordProtectedEventsCorrectPassword()
    {
        list($datetime_no_password, $datetime) = $this->setupPasswordProtectedDatetimes();

        $request = new WP_REST_Request('GET', '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/datetimes');
        $request->set_query_params(
            array(
                'password' => $datetime->event()->get('password'),
                'where' => array(
                    'DTT_ID' => $datetime->ID()
                )
            )
        );
        //send a request for the two datetimes
        $response = rest_do_request($request);
        $this->assertInstanceOf('WP_REST_Response', $response);
        $data = $response->get_data();

        // only the datetime for non-password protected events are visible
        $this->assertEquals(1, count($data));
        $this->assertEquals(
            $datetime->ID(),
            $data[0]['DTT_ID']
        );
    }

    /**
     * Test get_all on a model protected by another model's password field, with the correct password provided.
     * @since 4.9.74.p
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @group private-1
     */
    public function testGetAllDatetimesForPasswordProtectedEventsCorrectAndWrongPassword()
    {
        list($datetime_no_password, $datetime) = $this->setupPasswordProtectedDatetimes();

        $request = new WP_REST_Request('GET', '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/datetimes');
        $request->set_query_params(
            array(
                'password' => $datetime->event()->get('password'),
            )
        );
        //send a request for the two datetimes, providing the correct password for only one.
        $response = rest_do_request($request);
        $response_data = $response->get_data();
        $this->assertTrue(is_array($response_data));
        $this->assertEquals('rest_post_incorrect_password', $response_data['code']);
    }

    /**
     * Test get_one on a model protected by another model's password field, with no password provided.
     * @since 4.9.74.p
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @group private-1
     */
    public function testGetOneDatetimesForPasswordProtectedEvents()
    {
        list($datetime_no_password, $datetime) = $this->setupPasswordProtectedDatetimes();

        //send a request for the two datetimes
        $request = new WP_REST_Request('GET', '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/datetimes/' . $datetime->ID());
        $request->set_url_params(
            array(
                'id' => $datetime->ID()
            )
        );
        $response = rest_do_request($request);
        $response_data = $response->get_data();
        $this->assertTrue(is_array($response_data));
        $this->assertEquals('rest_post_password_required', $response_data['code']);
    }

    /**
     * Test get_one on a model protected by another model's password field, with the wrong password provided.
     * @since 4.9.74.p
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @group private-1
     */
    public function testGetOneDatetimesForPasswordProtectedEventsWrongPassword()
    {
        list($datetime_no_password, $datetime) = $this->setupPasswordProtectedDatetimes();

        //send a request for the two datetimes
        $request = new WP_REST_Request('GET', '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/datetimes');
        $request->set_url_params(
            array(
                'id' => $datetime->ID()
            )
        );
        $request->set_query_params(
            array(
                'password' => $datetime->event()->get('password') . ' made incorrect'
            )
        );
        $response = rest_do_request($request);
        $response_data = $response->get_data();
        $this->assertTrue(is_array($response_data));
        $this->assertEquals('rest_post_incorrect_password', $response_data['code']);
    }

    /**
     * Test get_one on a model protected by another model's password field, with the correct password provided.
     * @since 4.9.74.p
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @group private-1
     */
    public function testGetOneDatetimesForPasswordProtectedEventsCorrectPassword()
    {
        list($datetime_no_password, $datetime) = $this->setupPasswordProtectedDatetimes();

        $request = new WP_REST_Request('GET', '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/datetimes/' . $datetime->ID());
        $request->set_url_params(
            array(
                'id' => $datetime->ID(),
            )
        );
        $request->set_query_params(
            array(
                'password' => $datetime->event()->get('password'),
            )
        );
        //send a request for the two datetimes
        $response = rest_do_request($request);
        $this->assertInstanceOf('WP_REST_Response', $response);
        $data = $response->get_data();

        $this->assertEquals(
            $datetime->ID(),
            $data['DTT_ID']
        );
    }

    /**
     * Test get_related with a model with a password field, with no password provided.
     * @since 4.9.74.p
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @group private-1
     */
    public function testGetRelatedDatetimesForPasswordProtectedEvents()
    {
        list($datetime_no_password, $datetime) = $this->setupPasswordProtectedDatetimes();

        //send a request for the two datetimes
        $request = new WP_REST_Request(
            'GET',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/events/' . $datetime->event()->ID() . '/datetimes'
        );
        $request->set_url_params(
            array(
                'id' => $datetime->ID()
            )
        );
        $response = rest_do_request($request);
        $response_data = $response->get_data();
        $this->assertTrue(is_array($response_data));
        $this->assertEquals('rest_post_password_required', $response_data['code']);
    }

    /**
     * Test get_related on a model protected by another model's password field, with the wrong password provided.
     * @since 4.9.74.p
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @group private-1
     */
    public function testGetRelatedDatetimesForPasswordProtectedEventsWrongPassword()
    {
        list($datetime_no_password, $datetime) = $this->setupPasswordProtectedDatetimes();

        //send a request for the two datetimes
        $request = new WP_REST_Request(
            'GET',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/events/' . $datetime->event()->ID() . '/datetimes'
        );
        $request->set_url_params(
            array(
                'id' => $datetime->ID()
            )
        );
        $request->set_query_params(
            array(
                'password' => $datetime->event()->get('password') . ' made incorrect'
            )
        );
        $response = rest_do_request($request);
        $response_data = $response->get_data();
        $this->assertTrue(is_array($response_data));
        $this->assertEquals('rest_post_incorrect_password', $response_data['code']);
    }

    /**
     * Test get_related on a model protected by another model's password field, with the correct password provided.
     * @since 4.9.74.p
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @group private-1
     */
    public function testGetRelatedDatetimesForPasswordProtectedEventsCorrectPassword()
    {
        list($datetime_no_password, $datetime) = $this->setupPasswordProtectedDatetimes();

        $request = new WP_REST_Request(
            'GET',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/events/' . $datetime->event()->ID() . '/datetimes'
        );
        $request->set_url_params(
            array(
                'id' => $datetime->ID()
            )
        );
        $request->set_query_params(
            array(
                'password' => $datetime->event()->get('password'),
            )
        );
        //send a request for the two datetimes
        $response = rest_do_request($request);
        $this->assertInstanceOf('WP_REST_Response', $response);
        $data = $response->get_data();
        $this->assertEquals(1, count($data));
        $this->assertEquals(
            $datetime->ID(),
            $data[0]['DTT_ID']
        );
    }

    /**
     * Creates a venue with a password whose country is Canada. Eh.
     * @since 4.9.74.p
     * @return EE_Venue
     * @throws EE_Error
     */
    protected function setupPasswordProtectedVenue()
    {
        return $this->new_model_obj_with_dependencies(
            'Venue',
            array(
                'status' => EEM_Event::post_status_publish,
                'password' => 'correct_password',
                'CNT_ISO' => 'CA',
                'VNU_desc' => 'post body'
            )
        );
    }

    /**
     * test get_related with an UNPROTECTED model, but the related model is protected, and no password is provided.
     * @since 4.9.74.p
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function testGetRelatedUnprotectedToProtectedNoPassword()
    {
        $venue = $this->setupPasswordProtectedVenue();
        $request = new WP_REST_Request(
            'GET',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/countries/CA/venues'
        );
        $request->set_url_params(
            array(
                'id' =>'CA'
            )
        );
        $response = rest_do_request($request);
        $this->assertInstanceOf('WP_REST_Response', $response);
        $data = $response->get_data();
        $this->assertEquals(1, count($data));
        $this->assertEquals(
            $venue->ID(),
            $data[0]['VNU_ID']
        );
        $this->assertEquals(
            '',
            $data[0]['VNU_desc']['rendered']
        );
    }

    /**
     * test get_related with an UNPROTECTED model, but the related model is protected, and WRONG password is provided.
     * @since 4.9.74.p
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function testGetRelatedUnprotectedToProtectedWrongPassword()
    {
        $venue = $this->setupPasswordProtectedVenue();
        $request = new WP_REST_Request(
            'GET',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/countries/CA/venues'
        );
        $request->set_url_params(
            array(
                'id' =>'CA'
            )
        );
        $request->set_query_params(
            array(
                'password' => $venue->get('password') . ' made incorrect',
            )
        );
        $response = rest_do_request($request);
        $response_data = $response->get_data();
        $this->assertTrue(is_array($response_data));
        $this->assertEquals('rest_post_incorrect_password', $response_data['code']);
    }

    /**
     * test get_related with an UNPROTECTED model, but the related model is protected, and the CORRECT password provided.
     * @since 4.9.74.p
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function testGetRelatedUnprotectedToProtectedCorrectPassword()
    {
        $venue = $this->setupPasswordProtectedVenue();
        $request = new WP_REST_Request(
            'GET',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/countries/CA/venues'
        );
        $request->set_url_params(
            array(
                'id' =>'CA'
            )
        );
        $request->set_query_params(
            array(
                'password' => $venue->get('password'),
            )
        );
        $response = rest_do_request($request);
        $this->assertInstanceOf('WP_REST_Response', $response);
        $data = $response->get_data();
        $this->assertEquals(1, count($data));
        $this->assertEquals(
            $venue->ID(),
            $data[0]['VNU_ID']
        );
        $this->assertEquals(
            $venue->get_pretty('VNU_desc'),
            $data[0]['VNU_desc']['rendered']
        );
    }

    /**
     * Test including on a model with a password, and the related model is password protected (eg country to venue),
     * and no password is provided.
     * @since 4.9.74.p
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function testGetRelatedProtectedToUnprotectedNoPassword()
    {
        $venue = $this->setupPasswordProtectedVenue();
        $request = new WP_REST_Request(
            'GET',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/venues/' . $venue->ID() . '/country'
        );
        $request->set_url_params(
            array(
                'id' => $venue->ID()
            )
        );
        $response = rest_do_request($request);
        $response_data = $response->get_data();
        $this->assertTrue(is_array($response_data));
        $this->assertEquals('rest_post_password_required', $response_data['code']);
    }

    /**
     * test get_related with an UNPROTECTED model, but the related model is protected, and WRONG password is provided.
     * @since 4.9.74.p
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function testGetRelatedProtectedToUnprotectedWRongPassword()
    {
        $venue = $this->setupPasswordProtectedVenue();
        $request = new WP_REST_Request(
            'GET',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/venues/' . $venue->ID() . '/country'
        );
        $request->set_url_params(
            array(
                'id' => $venue->ID()
            )
        );
        $request->set_query_params(
            array(
                'password' => $venue->get('password') . ' made incorrect',
            )
        );
        $response = rest_do_request($request);
        $response_data = $response->get_data();
        $this->assertTrue(is_array($response_data));
        $this->assertEquals('rest_post_incorrect_password', $response_data['code']);
    }

    /**
     * test get_related with an UNPROTECTED model, but the related model is protected, and the CORRECT password provided.
     * @since 4.9.74.p
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function testGetRelatedProtectedToUnprotectedCorrectPassword()
    {
        $venue = $this->setupPasswordProtectedVenue();
        $request = new WP_REST_Request(
            'GET',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/venues/' . $venue->ID() . '/country'
        );
        $request->set_url_params(
            array(
                'id' => $venue->ID()
            )
        );
        $request->set_query_params(
            array(
                'password' => $venue->get('password'),
            )
        );
        $response = rest_do_request($request);
        $this->assertInstanceOf('WP_REST_Response', $response);
        $data = $response->get_data();
        $this->assertEquals(
            'CA',
            $data['CNT_ISO']
        );
    }

    /**
     * Tests that we still get the correct error when trying to get tickets from a datetime for a draft event.
     * @since 4.9.75.p
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function testGetRelatedDatetimesToTicketsEventDraft()
    {
        // Create a datetime, and event, that's not password protected.
        $event = $this->new_model_obj_with_dependencies(
            'Event',
            array(
                'status' => EEM_Event::post_status_draft
            )
        );
        $dtt = $this->new_model_obj_with_dependencies(
            'Datetime',
            array(
                'EVT_ID' => $event->ID()
            )
        );
        // And create a ticket for it.
        $tkt = $this->new_model_obj_with_dependencies('Ticket');
        $dtt->_add_relation_to($tkt, 'Ticket');
        $request = new WP_REST_Request(
            'GET',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/datetimes/' . $dtt->ID() . '/tickets'
        );
        $response = rest_do_request($request);
        $this->assertInstanceOf('WP_REST_Response', $response);
        $data = $response->get_data();
        $this->assertEquals('rest_tickets_cannot_list',$data['code']);
    }

    /**
     * @since 4.9.75.p
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function testGetRelatedDatetimesToTickets()
    {
        // Create a datetime, and event, that's not password protected.
        $event = $this->new_model_obj_with_dependencies(
            'Event',
            array(
                'status' => EEM_Event::post_status_publish
            )
        );
        $dtt = $this->new_model_obj_with_dependencies(
            'Datetime',
            array(
                'EVT_ID' => $event->ID()
            )
        );
        // And create a ticket for it.
        $tkt = $this->new_model_obj_with_dependencies('Ticket');
        $dtt->_add_relation_to($tkt, 'Ticket');
        $request = new WP_REST_Request(
            'GET',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/datetimes/' . $dtt->ID() . '/tickets'
        );
        $response = rest_do_request($request);
        $this->assertInstanceOf('WP_REST_Response', $response);
        $data = $response->get_data();
        $this->assertEquals(1, count($data));
        $this->assertEquals($tkt->ID(),$data[0]['TKT_ID']);
    }

    /**
     * * Verifies that if a ticket is archived, there is no erroneous requirement for a password (this was a problem
     * at one point).
     * @since 4.9.75.p
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function testGetRelatedDatetimesToTicketsDeleted()
    {
        // Create a datetime, and event, that's not password protected.
        $event = $this->new_model_obj_with_dependencies(
            'Event',
            array(
                'status' => EEM_Event::post_status_publish
            )
        );
        $dtt = $this->new_model_obj_with_dependencies(
            'Datetime',
            array(
                'EVT_ID' => $event->ID()
            )
        );
        // And create a ticket for it.
        $tkt = $this->new_model_obj_with_dependencies(
            'Ticket',
            array(
                'TKT_deleted' => true
            )
        );
        $dtt->_add_relation_to($tkt, 'Ticket');
        $request = new WP_REST_Request(
            'GET',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/datetimes/' . $dtt->ID() . '/tickets'
        );
        $response = rest_do_request($request);
        $this->assertInstanceOf('WP_REST_Response', $response);
        $data = $response->get_data();
        $this->assertEquals(1, count($data));
        $this->assertEquals($tkt->ID(),$data[0]['TKT_ID']);
    }

    /**
     * Verifies that if a datetime is trashed, there is no erroneous requirement for a password (this was a problem
     * at one point).
     * @since 4.9.75.p
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function testGetRelatedDatetimesDeletedTo()
    {
        // Create a datetime, and event, that's not password protected.
        $event = $this->new_model_obj_with_dependencies(
            'Event',
            array(
                'status' => EEM_Event::post_status_publish
            )
        );
        $dtt = $this->new_model_obj_with_dependencies(
            'Datetime',
            array(
                'EVT_ID' => $event->ID(),
                'DTT_deleted' => true
            )
        );
        // And create a ticket for it.
        $tkt = $this->new_model_obj_with_dependencies('Ticket');
        $dtt->_add_relation_to($tkt, 'Ticket');
        $request = new WP_REST_Request(
            'GET',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/datetimes/' . $dtt->ID() . '/tickets'
        );
        $response = rest_do_request($request);
        $this->assertInstanceOf('WP_REST_Response', $response);
        $data = $response->get_data();
        $this->assertEquals(1, count($data));
        $this->assertEquals($tkt->ID(),$data[0]['TKT_ID']);
    }

    /**
     * Test fetching an protected model, and including an  UNprotected model (venue to country), and no password is provided.
     * @since 4.9.74.p
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function testIncludeProtectedToUnprotectedBelongsToWithNoPassword()
    {
        $venue = $this->setupPasswordProtectedVenue();
        $request = new WP_REST_Request(
            'GET',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/venues/' . $venue->ID()
        );
        $request->set_url_params(
            array(
                'id' => $venue->ID()
            )
        );
        $request->set_query_params(
            array(
                'include' => 'Country'
            )
        );
        $response = rest_do_request($request);
        $this->assertInstanceOf('WP_REST_Response', $response);
        $data = $response->get_data();
        // country data should not have been included, because which country the venue is in is protected
        $this->assertNull(
            $data['country']
        );
        $this->assertArrayContains(
            'country',
            $data['_protected']
        );
    }

    /**
     * Test fetching an protected model, and including an  UNprotected model (venue to country), and no password is provided.
     * @since 4.9.74.p
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function testIncludeProtectedToUnprotectedHasManyWithNoPassword()
    {
        $event = $this->setupPasswordProtectedEvent();
        $request = new WP_REST_Request(
            'GET',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/events/' . $event->ID()
        );
        $request->set_url_params(
            array(
                'id' => $event->ID()
            )
        );
        $request->set_query_params(
            array(
                'include' => 'Datetime'
            )
        );
        $response = rest_do_request($request);
        $this->assertInstanceOf('WP_REST_Response', $response);
        $data = $response->get_data();
        // country data should not have been included, because which country the venue is in is protected
        $this->assertEquals(
            array(),
            $data['datetimes']
        );
        $this->assertArrayContains(
            'datetimes',
            $data['_protected']
        );
    }

    /**
     * Test fetching an protected model, and including an  UNprotected model (venue to country), and the wrong
     * password is provided.
     * @since 4.9.74.p
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function testIncludeProtectedToUnprotectedWithWrongPassword()
    {
        $venue = $this->setupPasswordProtectedVenue();
        $request = new WP_REST_Request(
            'GET',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/venues/' . $venue->ID()
        );
        $request->set_url_params(
            array(
                'id' => $venue->ID()
            )
        );
        $request->set_query_params(
            array(
                'password' => $venue->get('password') . ' made incorrect',
                'include' => 'Country'
            )
        );
        $response = rest_do_request($request);
        $this->assertInstanceOf('WP_REST_Response', $response);
        $data = $response->get_data();
        $this->assertEquals('rest_post_incorrect_password', $data['code']);
    }

    /**
     * Test fetching an protected model, and including an  UNprotected model (venue to country), and the correct
     * password is provided.
     * @since 4.9.74.p
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function testIncludeProtectedToUnprotectedWithCorrectPassword()
    {
        $venue = $this->setupPasswordProtectedVenue();
        $request = new WP_REST_Request(
            'GET',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/venues/' . $venue->ID()
        );
        $request->set_url_params(
            array(
                'id' => $venue->ID()
            )
        );
        $request->set_query_params(
            array(
                'password' => $venue->get('password'),
                'include' => 'Country'
            )
        );
        $response = rest_do_request($request);
        $this->assertInstanceOf('WP_REST_Response', $response);
        $data = $response->get_data();
        // we should be able to see the country data just fine
        $this->assertEquals(
            $venue->country_name(),
            $data['country']['CNT_name']
        );
    }
    /**
     * test fetching an unprotected model, and including a protected model (eg country to venue), and no password is
     * provided
     * @since 4.9.74.p
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function testIncludeUnprotectedToProtectedWithNoPassword()
    {
        $venue = $this->setupPasswordProtectedVenue();
        $request = new WP_REST_Request(
            'GET',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/countries/CA'
        );
        $request->set_url_params(
            array(
                'id' => 'CA'
            )
        );
        $request->set_query_params(
            array(
                'include' => 'Venue'
            )
        );
        $response = rest_do_request($request);
        $this->assertInstanceOf('WP_REST_Response', $response);
        $data = $response->get_data();
        // we should be able to see the venue, but not its protected fields

        $this->assertEquals(
            $venue->ID(),
            $data['venues'][0]['VNU_ID']
        );
        $this->assertEquals(
            '',
            $data['venues'][0]['VNU_desc']['rendered']
        );
        $this->assertArrayContains(
            'VNU_desc',
            $data['venues'][0]['_protected']
        );
    }

    /**
     * Test fetching an protected model, and including an  UNprotected model (venue to country), and the wrong
     * password is provided.
     * @since 4.9.74.p
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function testIncludeUnprotectedToProtectedWithWrongPassword()
    {
        $venue = $this->setupPasswordProtectedVenue();
        $request = new WP_REST_Request(
            'GET',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/countries/CA'
        );
        $request->set_url_params(
            array(
                'id' => 'CA'
            )
        );
        $request->set_query_params(
            array(
                'password' => $venue->get('password') . ' made incorrect',
                'include' => 'Venue',
            )
        );
        $response = rest_do_request($request);
        $this->assertInstanceOf('WP_REST_Response', $response);
        $data = $response->get_data();
        $this->assertEquals('rest_post_incorrect_password', $data['code']);
    }

    /**
     * Test fetching an protected model, and including an  UNprotected model (venue to country), and the correct
     * password is provided.
     * @since 4.9.74.p
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function testIncludeUnprotectedToProtectedWithCorrectPassword()
    {
        $venue = $this->setupPasswordProtectedVenue();
        $request = new WP_REST_Request(
            'GET',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/countries/CA'
        );
        $request->set_url_params(
            array(
                'id' => 'CA'
            )
        );
        $request->set_query_params(
            array(
                'password' => $venue->get('password'),
                'include' => 'Venue'
            )
        );
        $response = rest_do_request($request);
        $this->assertInstanceOf('WP_REST_Response', $response);
        $data = $response->get_data();
        // we should be able to see the country data just fine
        $this->assertEquals(
            $venue->get_pretty('VNU_desc'),
            $data['venues'][0]['VNU_desc']['rendered']
        );
    }

    /**
     * Tests that calculated fields for protected events get replaced with their default too.
     * @throws \EE_Error
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     * @throws \InvalidArgumentException
     * @throws \ReflectionException
     * @group private-1
     */
    public function testGetAllPasswordProtectedCalculatedFields()
    {
        // create two events, one password-protected, the other not
        // and datetimes and tickets for them
        $e = $this->new_model_obj_with_dependencies(
            'Event',
            array(
                'status' => EEM_Event::post_status_publish
            )
        );
        $e_password = $this->new_model_obj_with_dependencies(
            'Event',
            array(
                'status' => EEM_Event::post_status_publish,
                'password' => 'passy'
            )
        );

        // add a featured image too eh
        $this->addFeaturedImage($e->ID());
        $this->addFeaturedImage($e_password->ID());
        $d = $this->new_model_obj_with_dependencies(
            'Datetime',
            array(
                'EVT_ID' => $e->ID(),
                'DTT_reg_limit' => 100,
            )
        );
        $d_password = $this->new_model_obj_with_dependencies(
            'Datetime',
            array(
                'EVT_ID' => $e_password->ID(),
                'DTT_reg_limit' => 100,
            )
        );
        $t_qty = 44;
        $t = $this->new_model_obj_with_dependencies(
            'Ticket',
            array(
                'TKT_qty' => $t_qty,
            )
        );
        $t_password_qty = 22;
        $t_password = $this->new_model_obj_with_dependencies(
            'Ticket',
            array(
                'TKT_qty' => $t_password_qty
            )
        );
        $t->_add_relation_to($d,'Datetime');
        $t_password->_add_relation_to($d_password, 'Datetime');

        // then request each, from the front-end, and a few calculated fields
        $request = new WP_REST_Request('GET', '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/events');
        $request->set_query_params(
            array(
                'calculate' => 'optimum_sales_at_start, image_full'
            )
        );
        $response = rest_do_request($request);
        $data = $response->get_data();
        $this->assertNotEmpty($data);

        // assert the data is in the expected structure, and the non-protected event worked as normal
        $this->assertEquals(2, count($data));
        $this->assertEquals($e->ID(),$data[0]['EVT_ID']);
        $this->assertEquals($t_qty, $data[0]['_calculated_fields']->optimum_sales_at_start);
        $this->assertNotEquals(null, $data[1]['_calculated_fields']->image_full);
        $this->assertEquals($e_password->ID(), $data[1]['EVT_ID']);

        // the protected calculated field should be replaced with their defaults
        $this->assertEquals(0,$data[1]['_calculated_fields']->optimum_sales_at_start);

        // featured image calculated fields aren't protected, so it should still be visible
        $this->assertNotEquals(null, $data[1]['_calculated_fields']->image_full);

        $this->assertArrayContains(
            'optimum_sales_at_start',
            $data[1]['_calculated_fields']->_protected
        );
        $this->assertArrayDoesNotContain(
            'image_full',
            $data[1]['_calculated_fields']->_protected
        );
    }

    /**
     * Adds some featured image to that post ID
     * @since 4.9.74.p
     * @param $post_id
     * @return int|\WP_Error
     */
    protected function addFeaturedImage($post_id)
    {
        $file = EE_ADMIN_PAGES . 'events/assets/images/caffeinated_template_features.jpg';
        $contents = file_get_contents($file);
        $upload = wp_upload_bits(basename($file), null, $contents);

        $type = '';
        if ( ! empty($upload['type']) ) {
            $type = $upload['type'];
        } else {
            $mime = wp_check_filetype( $upload['file'] );
            if ($mime)
                $type = $mime['type'];
        }

        $attachment = array(
            'post_title' => basename( $upload['file'] ),
            'post_content' => '',
            'post_type' => 'attachment',
            'post_parent' => $post_id,
            'post_mime_type' => $type,
            'guid' => $upload[ 'url' ],
        );

        // Save the data
        $id = wp_insert_attachment( $attachment, $upload[ 'file' ], $post_id );
        wp_update_attachment_metadata( $id, wp_generate_attachment_metadata( $id, $upload['file'] ) );
        add_post_meta($post_id, '_thumbnail_id', $id);
        return $id;
    }

    /**
     * Verify requests when caps=read_admin we don't protect any fields etc, even on password-protected events
     * @since 4.9.74.p
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function testGetAllAdminRequest()
    {
        $event = $this->setupPasswordProtectedEvent();
        $this->authenticate_as_admin();

        $req = new WP_REST_Request('GET',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/events');
        $req->set_query_params(
            array(
                'caps' => EEM_Base::caps_read_admin
            )
        );
        $response = rest_do_request($req);
        $response_data = $response->get_data();
        $this->assertTrue(is_array($response_data));
        $this->assertEquals($event->ID(), $response_data[0]['EVT_ID']);
        // note that this event was password-protected
        $this->assertNotEmpty($response_data[0]['EVT_desc']['rendered']);
        $this->assertEmpty($response_data[0]['_protected']);
    }

    /**
     * Verify requests when caps=read_admin all datetimes get returned (even those for password-protected events)
     * @since 4.9.74.p
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function testGetAllAdminRequestIndirectlyProtected()
    {
        list($datetime_no_password, $datetime) = $this->setupPasswordProtectedDatetimes();
        $this->authenticate_as_admin();

        $req = new WP_REST_Request('GET',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/datetimes');
        $req->set_query_params(
            array(
                'caps' => EEM_Base::caps_read_admin
            )
        );
        $response = rest_do_request($req);
        $response_data = $response->get_data();
        // both datetimes should have been returned
        $this->assertEquals(2, count($response_data));
    }


    /**
     * Verify requests when caps=read_admin we don't protect any fields etc, even on password-protected events
     * @since 4.9.74.p
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function testGetOneAdminRequest()
    {
        $event = $this->setupPasswordProtectedEvent();
        $this->authenticate_as_admin();

        $req = new WP_REST_Request('GET',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/events/' . $event->ID());
        $req->set_query_params(
            array(
                'caps' => EEM_Base::caps_read_admin
            )
        );
        $response = rest_do_request($req);
        $response_data = $response->get_data();
        $this->assertTrue(is_array($response_data));
        $this->assertEquals($event->ID(), $response_data['EVT_ID']);
        // note that this event was password-protected
        $this->assertNotEmpty($response_data['EVT_desc']['rendered']);
        $this->assertEmpty($response_data['_protected']);
    }

    /**
     * @since 4.9.74.p
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function testGetRelatedAdminRequest()
    {
        list($datetime_no_password, $datetime) = $this->setupPasswordProtectedDatetimes();
        $this->authenticate_as_admin();

        //send a request for the two datetimes
        $req = new WP_REST_Request('GET', '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/events/' . $datetime->event()->ID(). '/datetimes');
        $req->set_query_params(
            array(
                'caps' => EEM_Base::caps_read_admin
            )
        );
        $response = rest_do_request($req);
        $this->assertInstanceOf('WP_REST_Response', $response);
        $data = $response->get_data();

        // the datetime should have been returned
        $this->assertEquals(1, count($data));
        $this->assertEquals(
            $datetime->ID(),
            $data[0]['DTT_ID']
        );
    }

    /**
     * @since 4.9.74.p
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function testIncludeProtectedHasManyAdminRequest()
    {
        list($datetime_no_password, $datetime_password) = $this->setupPasswordProtectedDatetimes();
        $this->authenticate_as_admin();
        //send a request for the two datetimes
        $req = new WP_REST_Request('GET', '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/events/' . $datetime_password->event()->ID());
        $req->set_query_params(
            array(
                'caps' => EEM_Base::caps_read_admin,
                'include' => 'Datetime',
            )
        );
        $response = rest_do_request($req);
        $this->assertInstanceOf('WP_REST_Response', $response);
        $data = $response->get_data();
        // the event should include the datetime a-ok
        $this->assertEquals($datetime_password->ID(),$data['datetimes'][0]['DTT_ID']);
    }
}
// End of file ReadProtectedTest.php
// Location: EventEspresso\core\libraries\rest_api\controllers\model/ReadProtectedTest.php
