<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 *
 * EE_Attendee_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
/**
 * @group core/db_classes
 */
class EE_Attendee_Test extends EE_UnitTestCase{

	public function test_events(){
		$a = EE_Attendee::new_instance();
		$a->save();
		$this->assertNotEquals($a->ID(),0);
		$e1 = EE_Event::new_instance(array('EVT_name'=>'1'));
		$e1->save();
		$this->assertNotEquals($e1->ID(),0);
		$e2 = EE_Event::new_instance(array('EVT_name'=>'2'));
		$e2->save();
		$this->assertNotEquals($e2->ID(),0);
		$e3 = EE_Event::new_instance(array('EVT_name'=>'3'));
		$e3->save();
		$this->assertNotEquals($e3->ID(),0);
		$r1 = EE_Registration::new_instance(array('EVT_ID'=>$e1->ID(),'ATT_ID'=>$a->ID()));
		$r1->save();
		$this->assertNotEquals($r1->ID(),0);
		$r2 = EE_Registration::new_instance(array('EVT_ID'=>$e2->ID(),'ATT_ID'=>$a->ID()));
		$r2->save();
		$this->assertNotEquals($r2->ID(),0);
		$events = $a->events();
		$this->assertArrayContains($e1,$events);
		$this->assertArrayContains($e2,$events);
		$this->assertArrayDoesNotContain($e3,$events);
	}

	public function test_get_billing_info_postmeta_name(){
		/*
		 * @var $reg EE_Registration
		 */
		$reg = $this->new_model_obj_with_dependencies('Registration');

		$att = $reg->attendee();
		$payment_method = $reg->transaction()->payment_method();
		$key = $att->get_billing_info_postmeta_name( $payment_method );
		$this->assertEquals('billing_info_Admin_Only', $key );
	}
	public function test_save_and_clean_billing_info_for_payment_method(){
		$pm = EE_Payment_Method::new_instance(array( 'PMD_type'=>'Aim' ) );
		$pm->save();
		//reset the country model because it caches its list of countries which is used when
		//making most billing forms
		EEM_Country::reset();
		$form = $pm->type_obj()->billing_form();
		$form_name = $form->name();
        $form_values = [
            'first_name'  => 'e',
            'last_name'   => 'e',
            'email'       => 'developers@eventespresso.com',
            'address'     => '123',
            'address2'    => '',
            'city'        => 'someville',
            'state'       => 12,
            'country'     => 'US',
            'zip'         => '1235',
            'phone'       => '9991231234',
            'credit_card' => '4007000000027',
            'exp_month'   => '12',
            'exp_year'    => new date('Y', strtotime('+5 years')),
            'cvv'         => '123',
        ];
        $form->receive_form_submission( array( $form_name => $form_values  ) );
		$this->assertTrue( $form->is_valid(), 'error was: ' . $form->get_validation_error_string()  );
		$p = $this->new_model_obj_with_dependencies('Payment', array( 'PMD_ID'=>$pm->ID() ) );
		$reg = $this->new_model_obj_with_dependencies('Registration',array( 'TXN_ID' => $p->TXN_ID() ) );
		$att = $reg->attendee();
		$att->save_and_clean_billing_info_for_payment_method( $form, $pm );
		//ok so now it should ahve been saved. Let's verify that
		$billing_info_form = $att->billing_info_for_payment_method( $pm );
		$this->assertInstanceOf( 'EE_Billing_Attendee_Info_Form', $billing_info_form );
		//it should ahve been cleaned too, so lets tweak teh form values ot what they should be
		$form_values[ 'credit_card' ] = 'XXXXXXXXX0027';
		$form_values[ 'cvv' ] = 'XXX';
		$form_values[ 'exp_month' ] = '';
		$form_values[ 'exp_year' ] = 0;
		foreach($form_values as $input_name => $value){
			$input = $billing_info_form->get_input( $input_name);
			$this->assertInstanceOf( 'EE_Form_Input_Base', $input );
			$this->assertEquals( $value, $input->raw_value(), $input_name );
		}
	}
}

// End of file tests/testcases/core/db_classes/EE_Attendee_Test.php