<?php

namespace EventEspresso\core\libraries\rest_api\controllers\rpc;

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * @group rest_api
 */
class Checkin_Test extends \EE_UnitTestCase
{


    public function setUp()
    {
        parent::setUp();
        if (! class_exists('WP_Rest_Request')) {
            $this->markTestSkipped(
                'Test being run on a version of WP that does not have the REST framework installed'
            );
        }
    }




    /*
     * we're doing stuff that we know will add error notices, so we don't care
     * if there are errors (that's part of these tests)
     */
    public function tearDown()
    {
        \EE_Error::reset_notices();
        parent::tearDown();
    }




    /**
     * @param int $reg_id
     * @param int $dtt_id
     * @return \WP_REST_Request
     */
    protected function _create_checkin_request($reg_id, $dtt_id)
    {
        $req = new \WP_REST_Request(
            'POST',
            '/' . \EED_Core_Rest_Api::ee_api_namespace . '4.8.33/registrations/' . $reg_id . '/toggle_checkin_for_datetime/' . $dtt_id
        );
        $req->set_url_params(
            array(
                'REG_ID' => $reg_id,
                'DTT_ID' => $dtt_id,
            )
        );
        $req->set_body_params(
            array(
                'force' => "false",
            )
        );
        return $req;
    }



    public function test_handle_checkin__success()
    {
        $checkins_before = \EEM_Checkin::instance()->count();
        global $current_user;
        $current_user = $this->wp_admin_with_ee_caps();
        $reg = $this->new_model_obj_with_dependencies('Registration', array('STS_ID' => \EEM_Registration::status_id_approved));
        $dtt = $this->new_model_obj_with_dependencies('Datetime');
        $dtt->_add_relation_to($reg->get('TKT_ID'), 'Ticket');
        $response = rest_do_request($this->_create_checkin_request($reg->ID(), $dtt->ID()));
        $data = $response->get_data();
        $this->assertEquals($checkins_before + 1, \EEM_Checkin::instance()->count());

        $this->assertTrue(isset($data['CHK_ID']));
        $checkin_obj = \EEM_Checkin::instance()->get_one_by_ID($data['CHK_ID']);
        $this->assertEquals($reg->ID(), $checkin_obj->get('REG_ID'));
        $this->assertEquals($dtt->ID(), $checkin_obj->get('DTT_ID'));
        $this->assertEquals(true, $data['CHK_in']);
        $this->assertDateWithinOneMinute(
            mysql_to_rfc3339(date('c')),
            $data['CHK_timestamp'],
            'Y-m-d\TH:m:i+'
        );
    }




    public function test_handle_checkin__fail_not_approved()
    {
        $checkins_before = \EEM_Checkin::instance()->count();
        global $current_user;
        $current_user = $this->wp_admin_with_ee_caps();
        $reg = $this->new_model_obj_with_dependencies('Registration', array('STS_ID' => \EEM_Registration::status_id_incomplete));
        $dtt = $this->new_model_obj_with_dependencies('Datetime');
        $dtt->_add_relation_to($reg->get('TKT_ID'), 'Ticket');
        $response = rest_do_request($this->_create_checkin_request($reg->ID(), $dtt->ID()));
        $this->assertEquals($checkins_before, \EEM_Checkin::instance()->count());
        $data = $response->get_data();
        $this->assertTrue(isset($data['code']));
        $this->assertEquals('rest_toggle_checkin_failed', $data['code']);
        $this->assertTrue(isset($data['additional_errors']));
        $this->assertFalse(empty($data['additional_errors'][0]['message']));
    }




    //doesnt have permission
    public function test_handle_checkin__fail_no_permitted()
    {
        //notice that we have NOT logged in!
        $checkins_before = \EEM_Checkin::instance()->count();
        $reg = $this->new_model_obj_with_dependencies('Registration', array('STS_ID' => \EEM_Registration::status_id_incomplete));
        $dtt = $this->new_model_obj_with_dependencies('Datetime');
        $dtt->_add_relation_to($reg->get('TKT_ID'), 'Ticket');
        $response = rest_do_request($this->_create_checkin_request($reg->ID(), $dtt->ID()));
        $this->assertEquals($checkins_before, \EEM_Checkin::instance()->count());
        $data = $response->get_data();
        $this->assertTrue(isset($data['code']));
        $this->assertEquals('rest_user_cannot_toggle_checkin', $data['code']);
    }




    //regsitered too many times
    public function test_handle_checkin__fail_checked_in_too_many_times()
    {
        global $current_user;
        $current_user = $this->wp_admin_with_ee_caps();
        $tkt = $this->new_model_obj_with_dependencies('Ticket', array('TKT_uses' => 1));
        $reg = $this->new_model_obj_with_dependencies(
            'Registration',
            array(
                'STS_ID' => \EEM_Registration::status_id_approved,
                'TKT_ID' => $tkt->ID(),
            )
        );
        $dtt = $this->new_model_obj_with_dependencies('Datetime');
        $dtt->_add_relation_to($reg->get('TKT_ID'), 'Ticket');
        $dtt2 = $this->new_model_obj_with_dependencies('Datetime');
        $dtt2->_add_relation_to($reg->get('TKT_ID'), 'Ticket');
        //create a previous checkin entry, so the reg shouldn't be allowed to checkin more
        $old_checkin = $this->new_model_obj_with_dependencies(
            'Checkin',
            array(
                'REG_ID' => $reg->ID(),
                'DTT_ID' => $dtt->ID(),
                'CHK_in' => true,
            )
        );
        $checkins_before = \EEM_Checkin::instance()->count();
        $response = rest_do_request($this->_create_checkin_request($reg->ID(), $dtt2->ID()));
        $this->assertEquals($checkins_before, \EEM_Checkin::instance()->count());
        $data = $response->get_data();
        $this->assertTrue(isset($data['code']));
        $this->assertEquals('rest_toggle_checkin_failed_not_forceable', $data['code']);
        $this->assertTrue(isset($data['additional_errors']));
        $this->assertFalse(empty($data['additional_errors'][0]['message']));
    }




    //registered too many times but force it
    public function test_handle_checkin__success_only_because_forced()
    {
        global $current_user;
        $current_user = $this->wp_admin_with_ee_caps();
        $reg = $this->new_model_obj_with_dependencies(
            'Registration',
            array(
                'STS_ID' => \EEM_Registration::status_id_cancelled,
            )
        );
        $dtt = $this->new_model_obj_with_dependencies('Datetime');
        $dtt->_add_relation_to($reg->get('TKT_ID'), 'Ticket');
        $checkins_before = \EEM_Checkin::instance()->count();
        $req = $this->_create_checkin_request($reg->ID(), $dtt->ID());
        $req->set_body_params(array('force' => "true"));
        $response = rest_do_request($req);
        $this->assertEquals($checkins_before + 1, \EEM_Checkin::instance()->count());
    }
}

