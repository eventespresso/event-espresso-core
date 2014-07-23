<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 *
 * EE_Registration_Test
 *
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 */
/**
 * @group core/db_classes
 */
class EE_Registration_Test extends EE_UnitTestCase{
	function test_finalize(){
		$t = EE_Transaction::new_instance(array('STS_ID'=>  EEM_Transaction::complete_status_code));
		$t->save();
		$e = EE_Event::new_instance();
		$e->save();
		$tkt = EE_Ticket::new_instance();
		$tkt->save();
		$d = EE_Datetime::new_instance(array('EVT_ID'=>$e->ID()));
		$d->save();
		$tkt->_add_relation_to($d, 'Datetime');
		$r = EE_REgistration::new_instance(array('EVT_ID'=>$e->ID(), 'TXN_ID'=>$t->ID(),'TKT_ID'=>$tkt->ID(), 'STS_ID'=>  EEM_Registration::status_id_pending_payment));
		$r->finalize();
		$this->assertNotNull($r->reg_code());
		$this->assertEquals(EEM_Registration::status_id_approved,$r->status_ID());
	}
}

// End of file EE_Registration_Test.php