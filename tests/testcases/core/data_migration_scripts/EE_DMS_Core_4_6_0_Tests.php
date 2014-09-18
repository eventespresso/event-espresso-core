<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EE_DMS_Core_4_6_0_Tests
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EE_DMS_Core_4_6_0_Tests extends EE_UnitTestCase{

	public function test_migrate_old_billing_infos(){
		$postmeta_name = 'billing_info_Paypal_Pro';
		$billing_info = unserialize( 'a:13:{s:34:"_reg-page-billing-fname-Paypal_Pro";s:3:"few";s:34:"_reg-page-billing-lname-Paypal_Pro";s:3:"few";s:34:"_reg-page-billing-email-Paypal_Pro";s:9:"few@ew.ds";s:34:"_reg-page-billing-phone-Paypal_Pro";s:1:"f";s:36:"_reg-page-billing-address-Paypal_Pro";s:1:"f";s:33:"_reg-page-billing-city-Paypal_Pro";s:1:"f";s:34:"_reg-page-billing-state-Paypal_Pro";i:6;s:36:"_reg-page-billing-country-Paypal_Pro";s:2:"CA";s:32:"_reg-page-billing-zip-Paypal_Pro";s:1:"c";s:38:"_reg-page-billing-card-nmbr-Paypal_Pro";s:16:"XXXXXXXXXXXX7383";s:38:"_reg-page-billing-card-type-Paypal_Pro";s:10:"MasterCard";s:47:"_reg-page-billing-card-exp-date-mnth-Paypal_Pro";s:2:"01";s:47:"_reg-page-billing-card-exp-date-year-Paypal_Pro";s:2:"17";}' );
		$att1 = $this->new_model_obj_with_dependencies( 'Attendee' );
		$att1->update_post_meta( $postmeta_name,  $billing_info  );
		$att2 = $this->new_model_obj_with_dependencies( 'Attendee' );
		$att2->update_post_meta( $postmeta_name, $billing_info );

		//load teh dms, which should autoload the stage we want to test
		$script = EE_Registry::instance()->load_dms( 'EE_DMS_Core_4_6_0' );
		$stage = new EE_DMS_4_6_0_billing_info();
		$stage->_construct_finalize( $script );
		$this->assertEquals( 2, $stage->count_records_to_migrate() );
//		var_dump($stage);
		$stage->migration_step( 1 );
		$this->assertEquals( 1, $stage->count_records_migrated() );
		//get that updated postmeta
		$new_billing_info = $att1->get_post_meta( $postmeta_name, TRUE );
		$this->assertNotEquals( $billing_info, $new_billing_info );
		$this->assertArrayHasKey( 'first_name', $new_billing_info );
		//verify we only migrated what we said we would- the first item only
		$this->assertEquals( $billing_info, $att2->get_post_meta( $postmeta_name, TRUE ) );


		//now migrate the next one
		$stage->migration_step( 1 );
	}
}

// End of file EE_DMS_Core_4_6_0_Tests.php