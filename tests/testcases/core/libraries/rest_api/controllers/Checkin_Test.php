<?php
namespace EventEspresso\core\libraries\rest_api\controllers\rpc;

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
class Checkin_Test extends \EE_UnitTestCase {
	public function test_handle_checkin__success() {
		$checkins_before = \EEM_Checkin::instance()->count();
		global $current_user;
		$current_user = $this->wp_admin_with_ee_caps();
		$reg = $this->new_model_obj_with_dependencies( 'Registration' );
		$dtt = $this->new_model_obj_with_dependencies( 'Datetime' );
		$dtt->_add_relation_to($reg->get( 'TKT_ID'), 'Ticket' );
		$req = new \WP_REST_Request( 
			'GET', 
			\EED_Core_Rest_Api::ee_api_namespace . '4.8.32/registrations/' . $reg->ID() . '/datetimes/' . $dtt->ID() . '/checkin'
		);
		$req->set_url_params( 
			array(
				'REG_ID' => $reg->ID(),
				'DTT_ID' => $dtt->ID()
			)
		);
		$response = Checkin::handle_checkin( $req );
		
		$this->assertEquals( $checkins_before + 1, \EEM_Checkin::instance()->count() );
		$data = $response->get_data();
		$this->assertTrue( isset( $data[ 'CHK_ID' ] ) );
		$checkin_obj = \EEM_Checkin::instance()->get_one_by_ID( $data[ 'CHK_ID' ] );
		$this->assertEquals( $reg->ID(), $checkin_obj->get( 'REG_ID' ) );
		$this->assertEquals( $dtt->ID(), $checkin_obj->get( 'DTT_ID' ) );
		$this->assertEquals( true, $data[ 'CHK_in' ] );
		$this->assertDateWithinOneMinute( 
			mysql_to_rfc3339(date( 'c' ) ),
			$data[ 'CHK_timestamp' ],
			'Y-m-d\TH:m:i' 
		);
	}	
}

