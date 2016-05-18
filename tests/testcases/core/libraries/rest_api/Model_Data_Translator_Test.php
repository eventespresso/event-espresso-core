<?php

use EventEspresso\core\libraries\rest_api\Model_Data_Translator;
/**
 *
 * Class Model_Data_Translator_Test
 *
 * Description here
 *
 * @package         Event Espresso
 * @subpackage    
 * @author				Mike Nelson
 * @since		 	   $VID:$
 *
 */
if( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

class Model_Data_Translator_Test extends EE_UnitTestCase{
	public function test_prepare_query_params_for_rest_api() {
		$mysql_date = '2015-01-01 00:00:00';
		$statuses_in_query = array(
			EEM_Registration::status_id_cancelled,
			EEM_Registration::status_id_declined
		);
		$model_query = array(
			array(
				'STS_ID' => array( 
					'IN', 
					$statuses_in_query
				),
				'REG_date' => strtotime( $mysql_date ),
				'REG_deleted' => false
			),
			'limit' => 10
		);
		$rest_query = Model_Data_Translator::prepare_query_params_for_rest_api( $model_query, EEM_Registration::instance() );
		//assert the reg date matches and is in the right format
		$this->assertArrayHasKey( 'where', $rest_query );
		$this->assertArrayHasKey( 'REG_date', $rest_query[ 'where' ] );
		$this->assertEquals( strtotime( $mysql_date ), $rest_query[ 'where' ][ 'REG_date' ] );
		//assert statuses got translated
		$this->assertArrayHasKey( 'STS_ID', $rest_query[ 'where' ] );
		$this->assertEquals( $statuses_in_query, $rest_query[ 'where' ][ 'STS_ID' ][1]);
		//assert limit got translated
		$this->assertArrayHasKey( 'limit', $rest_query );
		$this->assertEquals( 10, (int)$rest_query[ 'limit' ] );
		//assert booleans correctly translated
		$this->assertArrayHasKey( 'REG_deleted', $rest_query[ 'where' ] );
		$this->assertEquals( false, $rest_query[ 'where' ][ 'REG_deleted' ] );
	}
}
