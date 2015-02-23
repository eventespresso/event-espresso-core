<?php

if (!defined('EVENT_ESPRESSO_VERSION')) {
	exit('No direct script access allowed');
}

/**
 *
 * EE_Transaction_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
/**
 * @group core
 * @group core/db_classes
 */
class EE_Transaction_Test extends EE_UnitTestCase{

	public function test_primary_registration(){
		$t = $this->new_model_obj_with_dependencies( 'Transaction', NULL, FALSE );
		$this->assertEquals( 0, $t->ID() );
		$r = $this->new_model_obj_with_dependencies( 'Registration', array('REG_count'=>1 ), FALSE );
		$this->assertEquals( 0, $r->ID() );
		$t->_add_relation_to( $r, 'Registration' );
		$this->assertEquals( $r, $t->primary_registration() );
		$r->save();
		$this->assertNotEquals( 0, $r->ID() );
		$in_map = EE_Registry::instance()->load_model('Registration')->get_from_entity_map( $r->ID() );
		$this->assertEquals( $r, $in_map );
		$this->assertEquals( $r, $t->primary_registration() );
		$this->assertEquals( 1, $r->count() );
		$r_in_db = EE_Registry::instance()->load_model('Registration')->get_one_by_ID($r->ID() );
		$this->assertEquals( $r, $r_in_db );
		$t->save();
		$this->assertEquals( $r, $t->primary_registration() );
		//why does the above fail? because we forgot to set the registration's TXN_ID!
		//so it makes sense, but it sure would have been considerate of the trasnaction if,
		//when it was saved, it would have set the ID on all foreign keys pointing to it
		//on things it had cached on itself
	}
	public function test_payment_method(){
		$t = $this->new_model_obj_with_dependencies('Transaction');
		$this->assertNotEquals(0,$t->payment_method_ID());

		$pm = $t->payment_method();
		$this->assertInstanceOf('EE_Payment_Method', $pm);

		//now if there is no explicit payment mehtod on the transaction, use the first payment
		$t->set('PMD_ID',0);
		$p = $this->new_model_obj_with_dependencies( 'Payment' );
		$t->_add_relation_to( $p, 'Payment' );
		$pm = $t->payment_method();
		$this->assertInstanceOf('EE_Payment_Method', $pm);
	}


	/**
	 * This tests the datetime method on EE_Transaction
	 * @since 4.6
	 */
	public function test_datetime() {
		$now = new DateTime( "now", new DateTimeZone( 'America/Vancouver' ) );
		$format_to_use = get_option( 'date_format' ) . ' ' . 'H:i:s';
		$t = $this->factory->transaction->create();
		$t->set_timezone( 'America/Vancouver' );

		/**
		 * just to standardize the two times because unixtime is so precise, we'll use our expected
		 * time to set the time on the transaction.  This still verifies the functionality of the class.
		 * Because time comparisons will be based on seconds (unixtime), let's ensure we use a
		 * format with seconds as well
		 */
		$t->set_time_format( 'H:i:s' );
		$t->set( 'TXN_timestamp', $now->format( $t->get_format( $format_to_use ) ) );

		//test getting pretty (should return formatted item in the correct timezone)
		$this->assertEquals( $now->format( $format_to_use ) . '<span class="ee_dtt_timezone_string">(PST)</span>', $t->datetime( true ), 'datetime( true ) test' );

		//test getting raw unixtimestamp
		$this->assertEquals( $now->format( 'U' ), $t->datetime( false, true ), 'datetime( false, true) test' );

		//test get() (timestring with offset)
		$this->assertEquals( $now->format( $format_to_use ), $t->datetime(), 'datetime() test' );
	}
}

// End of file EE_Transaction_Test.php
