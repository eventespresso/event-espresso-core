<?php

namespace EventEspresso\core\libraries\rest_api\controllers\rpc;

use EE_Error;
use EE_UnitTestCase;
use EED_Core_Rest_Api;
use EEH_Debug_Tools;
use EEM_Checkin;
use EEM_Registration;
use EventEspresso\tests\mocks\core\domain\entities\routing\handlers\shared\RestApiRequestsMock;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * @group rest_api
 */

use EventEspresso\core\domain\entities\contexts\RequestTypeContext;
use ReflectionException;
use WP_REST_Request;
use WP_REST_Response;

class Checkin_Test extends EE_UnitTestCase
{

    /**
     * @since $VID:$
     */
    public function setUp()
    {
        parent::setUp();
        if (! class_exists('WP_Rest_Request')) {
            $this->markTestSkipped(
                'Test being run on a version of WP that does not have the REST framework installed'
            );
        }
        $this->setupRequest(RequestTypeContext::WP_API);
        RestApiRequestsMock::register();
        EED_Core_Rest_Api::set_hooks_both();
    }


    /**
     * we're doing stuff that we know will add error notices,
     * so we don't care if there are errors (that's part of these tests)
     *
     * @since $VID:$
     */
    public function tearDown()
    {
        EE_Error::reset_notices();
        parent::tearDown();
    }


    /**
     * @param int    $reg_id
     * @param int    $dtt_id
     * @param string $force
     * @return WP_REST_Response
     */
    protected function executeRestRequest($reg_id, $dtt_id, $force = "false")
    {
        $req = new WP_REST_Request(
            'POST',
            '/' . EED_Core_Rest_Api::ee_api_namespace . '4.8.33/registrations/' . $reg_id . '/toggle_checkin_for_datetime/' . $dtt_id
        );
        $req->set_url_params(
            array(
                'REG_ID' => $reg_id,
                'DTT_ID' => $dtt_id,
            )
        );
        $req->set_body_params(
            array(
                'force' => $force,
            )
        );
        return rest_do_request($req);;
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     * @since $VID:$
     */
    public function test_handle_checkin__success()
    {
        $checkins_before = EEM_Checkin::instance()->count();
        global $current_user;
        $current_user = $this->wp_admin_with_ee_caps();
        $reg = $this->new_model_obj_with_dependencies('Registration', array('STS_ID' => EEM_Registration::status_id_approved));
        $dtt = $this->new_model_obj_with_dependencies('Datetime');
        $dtt->_add_relation_to($reg->get('TKT_ID'), 'Ticket');
        $response = $this->executeRestRequest($reg->ID(), $dtt->ID());
        $data = $response->get_data();
        $this->assertEquals($checkins_before + 1, EEM_Checkin::instance()->count());

        $this->assertTrue(isset($data['CHK_ID']));
        $checkin_obj = EEM_Checkin::instance()->get_one_by_ID($data['CHK_ID']);
        $this->assertEquals($reg->ID(), $checkin_obj->get('REG_ID'));
        $this->assertEquals($dtt->ID(), $checkin_obj->get('DTT_ID'));
        $this->assertEquals(true, $data['CHK_in']);
        $this->assertDateWithinOneMinute(
            mysql_to_rfc3339(date('c')),
            $data['CHK_timestamp'],
            'Y-m-d\TH:m:i+'
        );
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     * @since $VID:$
     */
    public function test_handle_checkin__fail_not_approved()
    {
        $checkins_before = EEM_Checkin::instance()->count();
        global $current_user;
        $current_user = $this->wp_admin_with_ee_caps();
        $reg = $this->new_model_obj_with_dependencies('Registration', array('STS_ID' => EEM_Registration::status_id_incomplete));
        $dtt = $this->new_model_obj_with_dependencies('Datetime');
        $dtt->_add_relation_to($reg->get('TKT_ID'), 'Ticket');
        $response = $this->executeRestRequest($reg->ID(), $dtt->ID());
        $this->assertEquals($checkins_before, EEM_Checkin::instance()->count());
        $data = $response->get_data();
        $this->assertTrue(isset($data['code']));
        $this->assertEquals('rest_toggle_checkin_failed', $data['code']);
        $this->assertTrue(isset($data['additional_errors']));
        $this->assertNotEmpty($data['additional_errors'][0]['message']);
    }


    /**
     * doesnt have permission
     *
     * @throws EE_Error
     * @throws ReflectionException
     * @since $VID:$
     */
    public function test_handle_checkin__fail_no_permitted()
    {
        //notice that we have NOT logged in!
        $checkins_before = EEM_Checkin::instance()->count();
        $reg = $this->new_model_obj_with_dependencies('Registration', array('STS_ID' => EEM_Registration::status_id_incomplete));
        $dtt = $this->new_model_obj_with_dependencies('Datetime');
        $dtt->_add_relation_to($reg->get('TKT_ID'), 'Ticket');
        $response = $this->executeRestRequest($reg->ID(), $dtt->ID());
        $this->assertEquals($checkins_before, EEM_Checkin::instance()->count());
        $data = $response->get_data();
        $this->assertTrue(isset($data['code']));
        $this->assertEquals('rest_user_cannot_toggle_checkin', $data['code']);
    }


    /**
     * registered too many times
     *
     * @throws EE_Error
     * @throws ReflectionException
     * @since $VID:$
     */
    public function test_handle_checkin__fail_checked_in_too_many_times()
    {
        global $current_user;
        $current_user = $this->wp_admin_with_ee_caps();
        $tkt = $this->new_model_obj_with_dependencies('Ticket', array('TKT_uses' => 1));
        $reg = $this->new_model_obj_with_dependencies(
            'Registration',
            array(
                'STS_ID' => EEM_Registration::status_id_approved,
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
        $checkins_before = EEM_Checkin::instance()->count();
        $response = $this->executeRestRequest($reg->ID(), $dtt2->ID());
        $this->assertEquals($checkins_before, EEM_Checkin::instance()->count());
        $data = $response->get_data();
        $this->assertTrue(isset($data['code']));
        $this->assertEquals('rest_toggle_checkin_failed_not_forceable', $data['code']);
        $this->assertTrue(isset($data['additional_errors']));
        $this->assertNotEmpty($data['additional_errors'][0]['message']);
    }


    /**
     * registered too many times but force it
     *
     * @throws EE_Error
     * @throws ReflectionException
     * @since $VID:$
     */
    public function test_handle_checkin__success_only_because_forced()
    {
        global $current_user;
        $current_user = $this->wp_admin_with_ee_caps();
        $reg = $this->new_model_obj_with_dependencies(
            'Registration',
            array(
                'STS_ID' => EEM_Registration::status_id_cancelled,
            )
        );
        $dtt = $this->new_model_obj_with_dependencies('Datetime');
        $dtt->_add_relation_to($reg->get('TKT_ID'), 'Ticket');
        $checkins_before = EEM_Checkin::instance()->count();
        $this->executeRestRequest($reg->ID(), $dtt->ID(), "true");
        $this->assertEquals($checkins_before + 1, EEM_Checkin::instance()->count());
    }
}

