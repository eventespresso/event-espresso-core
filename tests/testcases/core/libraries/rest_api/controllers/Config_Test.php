<?php
namespace EventEspresso\core\libraries\rest_api\controllers\rpc;

use \WP_REST_Request;
use \EE_Config;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * @group rest_api
 */
class Config_Test extends \EE_REST_TestCase
{


	public function test_handle_request()
    {

        EE_Config::instance()->admin->affiliate_id = 'star_wars';

        global $current_user;
        $current_user = $this->wp_admin_with_ee_caps();

	    $req = new WP_REST_Request( 'GET', '/' . \EED_Core_Rest_Api::ee_api_namespace . '4.8.36/config');

		$response = rest_do_request($req);

		$data = json_decode(wp_json_encode($response->get_data()),true);
        $this->assertEquals(EE_Config::instance()->admin->affiliate_id, $data['admin']['affiliate_id'] );
	}

}

