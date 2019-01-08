<?php
namespace tests\testcases\core\libraries\rest_api\controllers;

use EE_REST_TestCase;
use EED_Core_Rest_Api;
use EEM_Datetime;
use EEM_Event;
use EEM_Payment;
use WP_REST_Request;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class Write_Test
 * Description
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * 
 * @group          rest_api
 */
class WriteTest extends EE_REST_TestCase
{

    public function testNoInsertIfNoCaps()
    {
        $request = new WP_REST_Request('POST', '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/events');
        $request->set_body_params(
            array(
                'EVT_name' => 'Haha I didnt log in and I inserted an event',
            )
        );
        $response = rest_do_request($request);
        $data = $response->get_data();
        $this->assertEquals('rest_cannot_create_events', $data['code']);
    }



    /**
     * Verifies that even if the current user can edit events, they shouldn't be able
     * to insert until we've sorted that code out
     */
    public function testNoInsertLimitedUser()
    {
        $user = $this->factory->user->create_and_get(array('role' => 'subscriber'));
        $user->add_cap('ee_edit_events');
        $user->add_cap('ee_read_events');
        wp_set_current_user($user->ID);
        //ok now try to insert an event
        $request = new WP_REST_Request('POST', '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/events');
        $request->set_body_params(
            array(
                'EVT_name' => 'Haha I didnt log in and I inserted an event',
            )
        );
        $response = rest_do_request($request);
        $data = $response->get_data();
        $this->assertEquals('rest_cannot_create_events', $data['code']);
    }



    /**
     * @group 9222
     */
    public function testInsertUtcAndRelativeTimes()
    {
        //let's set a different WP timezone.
        update_option('gmt_offset', '-1');
        $this->authenticate_as_admin();
        $req = new WP_REST_Request(
            'POST',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/datetimes'
        );
        $req->set_body_params(
            array(
                'DTT_EVT_start_gmt' => '2016-01-02T00:00:00',
                'DTT_EVT_end'       => '2016-01-03T00:00:00',
            )
        );
        $response = rest_do_request($req);
        $response_data = $response->get_data();
        if (! isset($response_data['code'])) {
            $response_data['code'] = null;
        }
        $this->assertEmpty(
            $response_data['code'],
            '$response_data[\'code\'] was not empty and actually contained: ' . $response_data['code']
            . "\n" . ' The full response was: ' . var_export($response_data, true)
        );
        $this->assertEquals('2016-01-02T00:00:00', $response_data['DTT_EVT_start_gmt']);
        $this->assertEquals('2016-01-01T23:00:00', $response_data['DTT_EVT_start']);
        $this->assertEquals('2016-01-03T01:00:00', $response_data['DTT_EVT_end_gmt']);
        $this->assertEquals('2016-01-03T00:00:00', $response_data['DTT_EVT_end']);
    }



    /**
     *
     * Verify that we follow WP's current behaviour when both a gmt and non-gmt date are provided:
     * ignore the gmt datetime. See https://core.trac.wordpress.org/ticket/39954
     * @group 9222
     */
    public function testInsertUtcAndRelativeDuplicate()
    {
        //let's set a different WP timezone.
        update_option('gmt_offset', '-1');
        $this->authenticate_as_admin();
        $req = new WP_REST_Request(
            'POST',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/datetimes'
        );
        $req->set_body_params(
            array(
                'DTT_EVT_start'     => '2016-01-03T00:00:00',
                'DTT_EVT_start_gmt' => '2016-01-02T00:00:00',
            )
        );
        $response = rest_do_request($req);
        $response_data = $response->get_data();
        if (! isset($response_data['code'])) {
            $response_data['code'] = null;
        }
        $this->assertEmpty(
            $response_data['code'],
            '$response_data[\'code\'] was not empty and actually contained: ' . $response_data['code']
            . "\n" . ' The full response was: ' . var_export($response_data, true)
        );
        $this->assertEquals('2016-01-03T00:00:00', $response_data['DTT_EVT_start']);
    }

    /**
     * Originally I wanted to allow providing selection parameters on write requests, and this
     * test verified we could do that. However, Darren had some issues with that, and so
     * rather than discuss it further it was removed. So this test now verifies we DON'T
     * use selection parameters on write requests.
     * @group 9222
     */
    public function testInsertThenUseQuerystring()
    {
        $this->authenticate_as_admin();
        $event = $this->new_model_obj_with_dependencies('Event');
        $req = new WP_REST_Request(
            'POST',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/datetimes'
        );
        $req->set_body_params(
            array(
                'EVT_ID' => $event->ID(),
                'DTT_EVT_start_gmt' => '2016-01-02T00:00:00',
            )
        );
        //it's a free country, so you can provide a query string
        //with parameters for reading in it; but we will ignore it.
        $req->set_query_params(
            array(
                'include' => 'Event.EVT_ID'
            )
        );
        $response = rest_do_request($req);
        $response_data = $response->get_data();
        $this->assertTrue(empty($response_data['code']));
        $this->assertTrue(isset($response_data['DTT_ID']));
        //we should NOT include the datetime's related event, because we said we weren't going
        //to use READ parameters on WRITE queries like this
        $this->assertTrue(empty($response_data['event']['EVT_ID']));
    }



    /**
     * @group 9222
     */
    public function testUpdateOnlySomeFields()
    {
        $this->authenticate_as_admin();
        $original_reg_limit = 25;
        $original_sold = 100;
        $datetime = $this->new_model_obj_with_dependencies(
            'Datetime',
            array(
                'DTT_reg_limit' => $original_reg_limit,
                'DTT_sold'      => $original_sold,
            )
        );
        $req = new WP_REST_Request(
            'PUT',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/datetimes/' . $datetime->ID()
        );
        //just update the reg limit, not the number sold
        $req->set_body_params(
            array(
                'DTT_reg_limit' => $original_reg_limit * 2,
            )
        );
        $response = rest_do_request($req);
        $response_data = $response->get_data();
        //verify there was no error code
        $this->assertTrue(empty($response_data['code']));
        //assert the reg limit was updated properly
        $this->assertEquals($original_reg_limit * 2, (int)$response_data['DTT_reg_limit']);
        //but that teh sold count wasn't changed
        $this->assertEquals($original_sold, (int)$response_data['DTT_sold']);
    }



    /**
     * Verifies that if we pass an invalid ID for a PUT, there is a proper REST API error
     * (not just a model or PHP error)
     * @group 9222
     */
    public function testUpdateInvalidID()
    {
        $this->authenticate_as_admin();
        $req = new WP_REST_Request(
            'PUT',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/datetimes/9999999'
        );
        //just update the reg limit, not the number sold
        $req->set_body_params(
            array(
                'DTT_reg_limit' => 2,
            )
        );
        $response = rest_do_request($req);
        $response_data = $response->get_data();
        //verify there was no error code
        $this->assertEquals('rest_datetime_invalid_id', $response_data['code']);
    }



    /**
     * Verifies that if we pass an invalid ID for a DELETE, there is a proper REST API error
     * (not just a model or PHP error)
     * @group 9222
     */
    public function testDeleteInvalidID()
    {
        $this->authenticate_as_admin();
        $req = new WP_REST_Request(
            'DELETE',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/datetimes/9999999'
        );
        $response = rest_do_request($req);
        $response_data = $response->get_data();
        //verify there was no error code
        $this->assertEquals('rest_datetime_invalid_id', $response_data['code']);
    }



    /**
     * @group 9222
     */
    public function testNoDeleteIfNoCaps()
    {
        $datetime = $this->new_model_obj_with_dependencies(
            'Datetime',
            array(
                'DTT_deleted' => false,
            )
        );
        //double-check the datetime isn't trashed
        $this->assertFalse($datetime->get('DTT_deleted'));
        $request = new WP_REST_Request('DELETE', '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/datetimes/' . $datetime->ID());
        $response = rest_do_request($request);
        $data = $response->get_data();
        $this->assertEquals('rest_cannot_delete_datetimes', $data['code']);
    }



    /**
     * @group 9222
     */
    public function testDeleteTrashed()
    {
        $this->authenticate_as_admin();
        $datetime = $this->new_model_obj_with_dependencies(
            'Datetime',
            array(
                'DTT_deleted' => false,
            )
        );
        //double-check the datetime isn't trashed
        $this->assertFalse($datetime->get('DTT_deleted'));
        $req = new WP_REST_Request(
            'DELETE',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/datetimes/' . $datetime->ID()
        );
        $response = rest_do_request($req);
        $response_data = $response->get_data();
        //verify there was no error code
        $this->assertTrue(empty($response_data['code']));
        $this->assertTrue($response_data['DTT_deleted']);
    }



    /**
     * @group 9222
     */
    public function testDeletePermanent()
    {
        $this->authenticate_as_admin();
        $datetime_count_before_insertion = EEM_Datetime::instance()->count_deleted_and_undeleted();
        $datetime = $this->new_model_obj_with_dependencies('Datetime');
        $req = new WP_REST_Request(
            'DELETE',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/datetimes/' . $datetime->ID()
        );
        $req->set_query_params(
            array(
                'force' => true,
            )
        );
        $response = rest_do_request($req);
        $response_data = $response->get_data();
        //verify there was no error code
        $this->assertTrue(empty($response_data['code']));
        $this->assertTrue(isset($response_data['deleted'], $response_data['previous']));
        $this->assertEquals($datetime->ID(), $response_data['previous']['DTT_ID']);
        $this->assertEquals($datetime_count_before_insertion, EEM_Datetime::instance()->count_deleted_and_undeleted());
    }

    /**
     * @group 9222
     */
    public function testDeleteCPTPermanent()
    {
        $this->authenticate_as_admin();
        $event_count_before_insertion = EEM_Event::instance()->count_deleted_and_undeleted();
        $event = $this->new_model_obj_with_dependencies('Event');
        $req = new WP_REST_Request(
            'DELETE',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/events/' . $event->ID()
        );
        $req->set_query_params(
            array(
                'force' => true,
            )
        );
        $response = rest_do_request($req);
        $response_data = $response->get_data();
        //verify there was no error code
        $this->assertTrue(empty($response_data['code']));
        $this->assertTrue(isset($response_data['deleted'], $response_data['previous']));
        $this->assertEquals($event->ID(), $response_data['previous']['EVT_ID']);
        $this->assertEquals($event_count_before_insertion, EEM_Event::instance()->count_deleted_and_undeleted());
    }



    /**
     * Tests that when we delete a non-soft-deletable model object, it has an error
     *
     * @group 9222
     */
    public function testDeleteNotAllowedOnNonSoftDeleteModel()
    {
        $this->authenticate_as_admin();
        $payment = $this->new_model_obj_with_dependencies('Payment');
        $payment_count_before_deletion = EEM_Payment::instance()->count();
        $req = new WP_REST_Request(
            'DELETE',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/payments/' . $payment->ID()
        );
        $response = rest_do_request($req);
        $response_data = $response->get_data();
        $this->assertEquals('rest_trash_not_supported', $response_data['code']);
    }



    /**
     * Tests that when we delete a non-soft-deletable model object permanently, it works as normal
     *
     * @group 9222
     */
    public function testDeleteNonSoftDeleteModel()
    {
        $this->authenticate_as_admin();
        $payment = $this->new_model_obj_with_dependencies('Payment');
        $payment_count_before_deletion = EEM_Payment::instance()->count();
        $req = new WP_REST_Request(
            'DELETE',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/payments/' . $payment->ID()
        );
        $req->set_query_params(
            array(
                'force' => 'true',
            )
        );
        $response = rest_do_request($req);
        $response_data = $response->get_data();
        //verify there was no error code
        $this->assertTrue(empty($response_data['code']));
        $this->assertTrue(isset($response_data['deleted'], $response_data['previous']));
        $this->assertEquals($payment->ID(), $response_data['previous']['PAY_ID']);
        $this->assertEquals($payment_count_before_deletion - 1, EEM_Payment::instance()->count());
    }



    /**
     * Test that we tell API clients when they are using a bad parameter
     * @group 9222
     */
    public function testInsertInvalidParamProvided()
    {
        $this->authenticate_as_admin();
        $req = new WP_REST_Request(
            'POST',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/questions'
        );
        $req->set_body_params(
            array(
                'non-existent-field-name' => 'restorama',
            )
        );
        $response = rest_do_request($req);
        $response_data = $response->get_data();
        //verify there was no error code
        $this->assertTrue(isset($response_data['code']));
        $this->assertEquals('invalid_field', $response_data['code']);
    }

    /**
     * Test that we tell API clients when they are using a bad parameter
     * @group 9222
     */
    public function testInsertPostType()
    {
        $this->authenticate_as_admin();
        $req = new WP_REST_Request(
            'POST',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.36/events'
        );
        $req->set_body_params(
            array(
                'post_type' => 'not-event',
                'EVT_name' => 'foobar'
            )
        );
        $response = rest_do_request($req);
        $response_data = $response->get_data();
        //verify there was an error code; we're not allowed to pass in post_type
        $this->assertTrue(isset($response_data['code']));
        $this->assertEquals('invalid_field', $response_data['code']);
    }
}
// End of file Write_Test.php
// Location: tests\testcases\core\libraries\rest_api\controllers/Write_Test.php
