<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 *
 * EE_Datetime_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
/**
 * @group core/db_classes
 */
class EE_Datetime_Test extends EE_UnitTestCase{

	function test_increase_sold(){
		$d = EE_Datetime::new_instance();
		$this->assertEquals($d->get('DTT_sold'),0);
		$d->increase_sold();
		$this->assertEquals($d->get('DTT_sold'),1);
		$d->increase_sold(2);
		$this->assertEquals($d->get('DTT_sold'),3);
	}
	function test_decrease_sold(){
		$d = EE_Datetime::new_instance(array('DTT_sold'=>5));
		$d->decrease_sold();
		$this->assertEquals(4,$d->get('DTT_sold'));
		$d->decrease_sold(2);
		$this->assertEquals(2,$d->get('DTT_sold'));
	}
	/**
	 * because at one point EE_Datetime overrode ID() from its parent
	 * (not really for any good reason at the time of writing)
	 */
	function test_id(){
		$d = EE_Datetime::new_instance();
		$id = $d->save();
		$this->assertEquals($id,$d->ID());
	}
	function test_start(){
		$start_time = 123456;//some random time
		$d = EE_Datetime::new_instance(array('DTT_EVT_start'=>$start_time));
		$this->assertEquals($start_time,$d->start());
	}
	function test_end(){
		$end_time = 234567;
		$d = EE_Datetime::new_instance(array('DTT_EVT_end'=>$end_time));
		$this->assertEquals($end_time,$d->end());
	}
	function test_reg_limit(){
		$d = EE_Datetime::new_instance(array('DTT_reg_limit'=>10));
		$this->assertEquals(10,$d->get('DTT_reg_limit'));
	}
	function test_sold(){
		$d = EE_Datetime::new_instance(array('DTT_sold'=>10));
		$this->assertEquals(10,$d->sold());
	}
	function test_sold_out(){
		$d = EE_Datetime::new_instance(array('DTT_reg_limit'=>10));
		$this->assertFalse($d->sold_out());
		$d->set_sold(10);
		$this->assertTrue($d->sold_out());
		$d->set('DTT_reg_limit',INF);
		$this->assertFalse($d->sold_out());
	}
	function test_spaces_remaining(){
		$d = EE_Datetime::new_instance(array('DTT_reg_limit'=>20,'DTT_sold'=>5));
		$this->assertEquals(15,$d->spaces_remaining());
	}
	function test_is_upcoming(){
		$d = EE_Datetime::new_instance(array('DTT_EVT_start'=>current_time('timestamp') + 1000 ));
		$this->assertTrue($d->is_upcoming());
		$d->set('DTT_EVT_start',current_time('timestamp') - 1000 );
		$this->assertFalse($d->is_upcoming());
	}
	function test_is_active(){
		$d = EE_Datetime::new_instance(array('DTT_EVT_start'=>current_time('timestamp') - 1000, 'DTT_EVT_end'=>current_time('timestamp') + 1000));
		$this->assertTrue($d->is_active());
		$d->set('DTT_EVT_start',current_time('timestamp') + 500);
		$this->assertFalse($d->is_active());
	}
	function test_is_expired(){
		$d = EE_Datetime::new_instance(array('DTT_EVT_end'=>current_time('timestamp') - 1000));
		$this->assertTrue($d->is_expired());
		$d->set('DTT_EVT_end',current_time('timestamp') + 1000);
		$this->assertFalse($d->is_expired());
	}
	function test_datetime_display(){
		$d = EE_Datetime::new_instance(array('DTT_name'=>'monkey time', 'DTT_EVT_start'=>1234567, 'DTT_EVT_end'=>23456781));
		$this->assertEquals('Jan 15, 1970 6:56 am - Sep 29, 1970 11:46 am',$d->get_dtt_display_name());
		$this->assertEquals('monkey time',$d->get_dtt_display_name(true));
	}

	/**
	 * @group 6744
	 */
	function test_new_instance__different_timezone(){
		//tests that if we save a datetime while in a different timezone
		//that the time is still saved as GMT
		//make sure WordPress Timezone is set
		//also important note: remember that a proper 'timestamp' is always in UTC.
		//But we use 'timestamps' from other timezones too (just UTC 'timestamp' plus time offset)
		update_option( 'timezone_string', 'America/Vancouver' );
		$gmt_timestamp = current_time( 'timestamp', TRUE );
		$gmt_mysql_date = date( 'Y-m-d H:i:s', $gmt_timestamp );
		$gmt_timestamp_offset_by_timezone = $gmt_timestamp + ( get_option( 'gmt_offset' ) * HOUR_IN_SECONDS );
		$end_time = $gmt_timestamp_offset_by_timezone + HOUR_IN_SECONDS;
		$dtt = EE_Datetime::new_instance( array( 'DTT_EVT_start' => $gmt_timestamp_offset_by_timezone, 'DTT_EVT_end' => $end_time ), get_option( 'timezone_string') );
		//the timestamp stored as the raw value should be the vancouver 'timestamp'
		$this->assertEquals( $gmt_timestamp_offset_by_timezone, $dtt->get_raw('DTT_EVT_start' ) );
		//because we supposedly never permannently change the default timezone in PHP, this should be equal
		$this->assertEquals( $gmt_mysql_date, gmdate('Y-m-d H:i:s', $gmt_timestamp ) );
		//check that when we request to see a particular time, it should be shown in vancouver timezone
		$this->assertEquals( date( 'Y-m-d H:i:s', $gmt_timestamp_offset_by_timezone), $dtt->get_date('DTT_EVT_start', 'Y-m-d H:i:s' ) );

		$dtt->save();
		//now get it as-is in the DB
		$start_times_for_datetime = EEM_Datetime::instance()->get_col( array( array( 'DTT_ID' => $dtt->ID() ) ), 'DTT_EVT_start' );

		//calculate what the current time should be in GMT
		$this->assertEquals( array( $gmt_mysql_date ), $start_times_for_datetime );
	}

	public function tearDown(){
		update_option( 'timezone_string', '');
		parent::tearDown();
	}


}

// End of file EE_Datetime_Test.php