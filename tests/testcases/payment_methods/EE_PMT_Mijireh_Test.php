<?php

if (!defined('EVENT_ESPRESSO_VERSION')) {
	exit('No direct script access allowed');
}

/**
 *
 * EE_PMT_Mijireh_Test
 * Uses a filter to intercept HTTP requests that WOULD be sent to mijireh's server,
 * and instead handle them locally. If you want to run the live tests, run the group "live",
 * which will also run a test method on this testcase that will check some of our simulated responeses
 * match mijireh's authentic ones
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EE_PMT_Mijireh_Test extends EE_UnitTestCase{
/**
	 * default settings for AIM for testing
	 * @var array
	 */
	private $_test_settings = array();
	const mijireh_url = 'https://secure.mijireh.com/api/1/orders';
	const return_url = 'http://mysite.com/return';
	const notify_url = 'http://mysite.com/notify';
	const cancel_url = 'http://mysite.com/cancel';
	const mijireh_checkout_url_start = 'https://secure.mijireh.com/checkout/';
	const access_key = '789a0b32d3d20d20514791a4';
	public function __construct($name = NULL, array $data = array(), $dataName = '') {
		parent::__construct($name, $data, $dataName);
		$this->_test_settings = array(
			'access_key' => self::access_key,
		);
		add_filter( 'pre_http_request', array( $this, 'pre_http_request' ), 10, 3 );
	}

	/**
	 * Verifies our fake responses actually match mijireh's live ones
	 * @group live
	 */
	public function test_pre_http_request(){

		$not_found_result = wp_remote_post( 'https://secure.mijireh.com/non-existent-url', array() );
		$no_auth_result = wp_remote_post('https://secure.mijireh.com/api/1/orders',array());
		remove_filter( 'pre_http_request', array( $this, 'pre_http_request' ) );

		$not_found_live_result = wp_remote_post( 'https://secure.mijireh.com/non-existent-url', array() );
		$no_auth_live_result = wp_remote_post('https://secure.mijireh.com/api/1/orders',array());

		$this->assertHttpResponsesBasicallyEqual( $not_found_live_result, $not_found_result );
		$this->assertHttpResponsesBasicallyEqual( $no_auth_live_result, $no_auth_result );
	}

	protected function assertHttpResponsesBasicallyEqual( $live_response, $fake_response ) {
		$this->assertEquals( gettype( $live_response ), gettype( $fake_response ) );
		if( is_array( $live_response ) && is_array( $fake_response ) ) {
			//compare their bodies
			if( isset( $live_response[ 'body' ] ) ) {
				$live_body_sans_whitespace = preg_replace('/\s+/', '', $live_response[ 'body' ]);
				$fake_body_sans_whitespace = preg_replace('/\s+/', '', $fake_response[ 'body' ]);
				$this->assertEquals( $live_body_sans_whitespace, $fake_body_sans_whitespace );
			}
			$this->assertEquals( $live_response[ 'response' ][ 'code' ], $fake_response[ 'response' ][ 'code' ] );
			$this->assertEquals( $live_response[ 'response' ][ 'message' ], $fake_response[ 'response' ][ 'message' ] );
		}
	}
	/**
	 * Prevents EEG_MIjireh from sending a real request to mijireh's server, and
	 * instead returns our own response
	 * @param boolean $response indicates we have overridden the normal wp_remote_request
	 * @param array $request_args exactly like wp_remote_request's 2nd arg
	 * @param string $url exactly like wp_remote_request's 1st arg
	 * @return array|WP_Error Array containing 'headers', 'body', 'response', 'cookies', 'filename'.
	 *                        A WP_Error instance upon error.
	 */
	public function pre_http_request( $response = FALSE, $request_args = array(), $url = '' ){
		if( strpos( $url, 'https://secure.mijireh.com/api/' ) !== FALSE &&
				 $this->_authenticated( $request_args ) !== TRUE ){
			return $this->_authenticated( $request_args );
		}
		switch( $url ){
			case 'https://secure.mijireh.com/api/1/orders':
				return $this->_pre_http_request_orders( $request_args );
			default:
				return array (
					'headers' =>
					array (
					  'server' => 'nginx/1.6.2',
					  'date' => 'Mon, 13 Oct 2014 20:28:11 GMT',
					  'content-type' => 'text/html; charset=utf-8',
					  'content-length' => '1140',
					  'connection' => 'close',
					  'status' => '404 Not Found',
					  'x-request-id' => '37fdfb21e61db056b3a2fe8a123fb6ed',
					  'x-runtime' => '0.002438',
					  'x-rack-cache' => 'invalidate, pass',
					),
					'body' => '<!DOCTYPE html>
					  <html>
					  <head>
						<title>The page you were looking for doesn\'t exist (404)</title>
						<style type="text/css">
						  body { background-color: #fff; background: url("assets/textured-bg.gif"); text-align: center;}
						</style>
						<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript" charset="utf-8"></script>
						<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js" type="text/javascript" charset="utf-8"></script>

						<script type="text/javascript" charset="utf-8">
						$(function() {
						  jQuery.fn.center = function () {
							  this.css("position","absolute");
							  this.css("left", (($(window).width() - this.outerWidth()) / 2) + $(window).scrollLeft() + "px");
							  return this;
						  }
						  var bottomPosition = $(document).height();
						  $("#fly-on-home").center().animate({top: bottomPosition-=122}, 2000, "swing").delay(2000).animate({top: bottomPosition-368}, 2000, "easeOutBounce"
					  );
						});

						</script>
					  </head>
					  <body>
						<a id="fly-on-home" href="/" style="top:2000px;width:220px"><img src="assets/404-logo.png" alt="404 Logo"></a>
					  </body>
					  </html>
					  ',
					'response' =>
					array (
					  'code' => 404,
					  'message' => 'Not Found',
					),
					'cookies' =>  array (),
					'filename' => NULL,
				  );
		}
	}

	protected function _authenticated( $request_args ){
		if( isset( $request_args[ 'headers' ][ 'Authorization' ] ) &&
				$request_args[ 'headers' ][ 'Authorization' ] == 'Basic ' . base64_encode( self::access_key . ':' )){
			return TRUE;
		}else{
			return array (
			'headers' =>
				array (
				  'server' => 'nginx/1.6.2',
				  'date' => 'Mon, 13 Oct 2014 20:30:25 GMT',
				  'content-type' => 'text/plain',
				  'content-length' => '0',
				  'connection' => 'close',
				  'status' => '401 Unauthorized',
				  'www-authenticate' => 'Basic realm="API Authorization"',
				  'x-ua-compatible' => 'IE=Edge,chrome=1',
				  'cache-control' => 'no-cache',
				  'x-request-id' => '5a4b32e35e548381243d478c344b9894',
				  'x-runtime' => '0.001448',
				  'x-rack-cache' => 'invalidate, pass',
				),
				'body' => '',
				'response' =>
				array (
				  'code' => 401,
				  'message' => 'Unauthorized',
				),
				'cookies' => array(),
				'filename' => NULL,
			);
		}
	}
	/**
	 * Validste the /orders request. If valid return TRUE, if invalid return an entire
	 * response like wp_remote_request()
	 * @param array $req_args like 2nd arg to wp_remote_request()
	 * @return boolean or array
	 */
	protected function _valid_orders_request( $req_args ) {
		$req_body = (array) json_decode( $req_args[ 'body' ], TRUE );
		//required parameters:
		$required_keys = array(
			'total','return_url','items','email','first_name','last_name','tax','partner_id',
		);
		$address_fields = array(
			'first_name',
			'last_name',
			'street',
			'city',
			'state_province',
			'zip_code',
			'country'
		);
		$missing_keys = array();
		foreach( $required_keys as $key ){
			if( ! isset( $req_body[ $key ] ) ){
				$missing_keys[ $key ] = array( 'This field is required' );
			}
		}
		if( isset($req_args['billing_address'] ) ){
			foreach( $address_fields as $field){
				if( ! isset( $req_body[ 'billing_address' ][ $field ] ) ){
					$missing_keys[ $key ] = array( 'This field is required' );
				}
			}
		}
		if( isset($req_body['shipping_address'] ) ){
			foreach( $address_fields as $field){
				if( ! isset( $req_body[ 'shipping_address' ][ $field ] ) ){
					$missing_keys[ $key ] = array( 'This field is required' );
				}
			}
		}
		if( empty( $missing_keys ) ){
			return TRUE;
		}else{
			return array( 'headers' => array (
				  'server' => 'nginx/1.6.2',
				  'date' => 'Tue, 14 Oct 2014 22:19:37 GMT',
				  'content-type' => 'application/json',
				  'content-length' => '54',
				  'connection' => 'close',
				  'status' => '400 Bad Request',
				  'x-ua-compatible' => 'IE=Edge,chrome=1',
				  'cache-control' => 'no-cache',
				  'x-request-id' => '1b777de9a7ff95091a3833574815ddae',
				  'x-runtime' => '0.008036',
				  'x-rack-cache' => 'invalidate, pass',
				),
				'body' => json_encode( $missing_keys ),
				'response' => array (
				  'code' => 400,
				  'message' => 'Bad Request',
				),
				'cookies' => array (),
				'filename' => NULL
);
		}
	}

	/**
	 * Handles a request to the /orders endpoint
	 * @param array $request_args exactly like 2nda rg of wp_remote_request
	 */
	protected function _pre_http_request_orders( $request_args = array() ){
		$valid_request_response = $this->_valid_orders_request( $request_args );
		if( $valid_request_response !== TRUE ){
			return $valid_request_response;
		}
		$req_body = (array) json_decode( $request_args[ 'body' ] );
		//directly take: email, first name, lastname, total, tax, discount (optional), shipping(optional)
		//return_url, items, meta_data(optional),shipping_address,billing_address,

		$response_body = array(
			'order_number' => '1C107D792D2BACDE25F0FB77',
			'mode' => 'test',
			'status' => 'pending',
			'subtotal' => $req_body[ 'total' ], //- tax - discount
			'order_date' => current_time('Y-m-dTh:i:sP'),
			'ip_address' => NULL,
			'checkout_url' => 'https://secure.mijireh.com/checkout/1C107D792D2BACDE25F0FB77',
			'authorization' => NULL,
			'reference' => NULL,
			'discount' => "0.0",
			'shipping' => "0.0",
			'meta_data' => array(),
		);
		$response_body = array_merge( $response_body, $req_body );
		$response_body_encoded = json_encode( $response_body );
		return array (
			'headers' => array (
			  'server' => 'nginx/1.6.2',
			  'date' => 'Tue, 14 Oct 2014 18:32:49 GMT',
			  'content-type' => 'application/json',
			  'content-length' => '1062',
			  'connection' => 'close',
			  'status' => '201 Created',
			  'x-ua-compatible' => 'IE=Edge,chrome=1',
			  'etag' => '"d873a8aed59ee0f209eabab8a091a99b"',
			  'cache-control' => 'max-age=0, private, must-revalidate',
			  'x-request-id' => '44d6e48973e2e3a9fb69487b4db3505d',
			  'x-runtime' => '0.009811',
			  'x-rack-cache' => 'invalidate, pass',
			),
			'body' => $response_body_encoded,//'{"order_number":"1C107D792D2BACDE25F0FB77","email":"","first_name":"8_ATT_fname","last_name":"8_ATT_lname","mode":"test","status":"pending","subtotal":"10.0","tax":"1.5","shipping":"0.0","discount":"0.0","total":"11.5","return_url":"http://mysite.com/return","meta_data":{},"order_date":"2014-10-14T11:32:49-07:00","ip_address":null,"items":[{"name":"5_TKT_name","quantity":1,"price":"10.0","total":"10.0","sku":"640cbbe01b571fd036d3a7e4d5abcb07"}],"checkout_url":"https://secure.mijireh.com/checkout/1C107D792D2BACDE25F0FB77","authorization":null,"reference":null,"shipping_address":{"first_name":"8_ATT_fname","last_name":"8_ATT_lname","street":"8_ATT_address","apt_suite":"8_ATT_address2","city":"8_ATT_city","state_province":"7_STA_name","zip_code":"8_ATT_zip","country":"United States","phone":"8_ATT_phone"},"billing_address":{"first_name":"8_ATT_fname","last_name":"8_ATT_lname","street":"8_ATT_address","apt_suite":"8_ATT_address2","city":"8_ATT_city","state_province":"7_STA_name","zip_code":"8_ATT_zip","country":"United States","phone":"8_ATT_phone"}}',
			'response' => array (
			  'code' => 201,
			  'message' => 'Created',
			),
			'cookies' => array (),
			'filename' => NULL,
			);


	}
	public function test_set_redirect_info__success(){
		$ppm = $this->new_model_obj_with_dependencies( 'Payment_Method', array( 'PMD_type' => 'Mijireh' ) );
		$ppg = $ppm->type_obj()->get_gateway();
		$ppg->set_settings( $this->_test_settings );
		$t = $this->new_typical_transaction();
		$p = $this->new_model_obj_with_dependencies( 'Payment', array('TXN_ID'=>$t->ID(), 'PMD_ID' => $ppm->ID(), 'PAY_amount' => $t->total() ) );
		$this->assertEmpty( $p->redirect_url() );


		$p = $ppg->set_redirection_info( $p, NULL, self::return_url, self::notify_url, self::cancel_url );

		$this->assertNotEmpty( $p->redirect_url() );
		$this->assertEquals( 0, strpos( $p->redirect_url(),self::mijireh_checkout_url_start) );
		$rargs =  json_decode( $p->details() );
		$mijireh_items = $rargs->items;
		$first_mijireh_item = array_shift( $mijireh_items );
		$this->assertEquals( $t->primary_registration()->ticket()->name(), $first_mijireh_item->name );
		$this->assertEquals( $t->primary_registration()->ticket()->price(), $first_mijireh_item->price );
		$this->assertEquals( 1, $first_mijireh_item->quantity );
		$this->assertEquals( $t->tax_total(), $rargs->tax );
		$this->assertEquals( self::return_url, $rargs->return_url );

	}
	public function test_set_redirect_info__fail(){
		$ppm = $this->new_model_obj_with_dependencies( 'Payment_Method', array( 'PMD_type' => 'Mijireh' ) );
		$ppg = $ppm->type_obj()->get_gateway();
		$ppg->set_settings( array( 'access_key' => 'bogus_one') );
		$t = $this->new_typical_transaction();
		$p = $this->new_model_obj_with_dependencies( 'Payment', array('TXN_ID'=>$t->ID(), 'PMD_ID' => $ppm->ID(), 'PAY_amount' => $t->total() ) );
		$this->assertEmpty( $p->redirect_url() );

		try{
			$p = $ppg->set_redirection_info( $p, NULL, self::return_url, self::notify_url, self::cancel_url );
			//that should have thrown an error because the access key is bogus
			$this->assertTrue( FALSE );
		}catch( EE_Error $e ){
			$this->assertTrue( TRUE );
			$this->assertEmpty( $p->redirect_url() );
		}
	}
	public function test_set_redirect_info__partial_payment(){
		$ppm = $this->new_model_obj_with_dependencies( 'Payment_Method', array( 'PMD_type' => 'Mijireh' ) );
		$ppg = $ppm->type_obj()->get_gateway();
		$ppg->set_settings( $this->_test_settings );
		$paid_so_far = 1.00;
		$t = $this->new_typical_transaction();
		$t->set_paid( $paid_so_far );
		$previous_payment = $this->new_model_obj_with_dependencies( 'Payment', array('TXN_ID'=>$t->ID(), 'PMD_ID' => $ppm->ID(), 'PAY_amount' => $paid_so_far  ) );
		$p = $this->new_model_obj_with_dependencies( 'Payment', array('TXN_ID'=>$t->ID(), 'PMD_ID' => $ppm->ID(), 'PAY_amount' => $t->total() - $paid_so_far ) );
		$this->assertNotEquals( EEM_Payment::status_id_approved, $p->status() );

		$p = $ppg->set_redirection_info( $p, NULL, self::return_url, self::notify_url, self::cancel_url );

		$this->assertNotEmpty( $p->redirect_url() );
		$this->assertEquals( 0, strpos( $p->redirect_url(),self::mijireh_checkout_url_start) );
	}
////	/**
////	 * tests that even if the line items are too complicated for the gateway to handle,
////	 * it can at least send the total payable
////	 */
	public function test_do_direct_payment__total_mismatch(){
		$ppm = $this->new_model_obj_with_dependencies( 'Payment_Method', array( 'PMD_type' => 'Mijireh' ) );
		$ppg = $ppm->type_obj()->get_gateway();
		$ppg->set_settings( $this->_test_settings );
		$t = $this->new_typical_transaction();
		$t->set_total( $t->total() / 2 );
		$t->total_line_item()->set_total ( $t->total() );
		$t->save();
		$t->total_line_item()->save();
		$p = $this->new_model_obj_with_dependencies( 'Payment', array('TXN_ID'=>$t->ID(), 'PMD_ID' => $ppm->ID(), 'PAY_amount' => $t->total()  ) );
		$this->assertNotEquals( EEM_Payment::status_id_approved, $p->status() );

		$p = $ppg->set_redirection_info( $p, NULL, self::return_url, self::notify_url, self::cancel_url );

		$this->assertNotEmpty( $p->redirect_url() );
		$this->assertEquals( 0, strpos( $p->redirect_url(),self::mijireh_checkout_url_start) );
	}
}

// End of file EE_PMT_Mijireh_Test.php