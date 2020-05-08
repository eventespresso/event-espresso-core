<?php
if (! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}

/**
 * Class Transactions_Admin_Page_Test
 * Description
 *
 * @package               Event Espresso
 * @subpackage            core
 * @author                Brent Christensen
 * @since                 4.8
 * @group transactions_admin
 */
class Transactions_Admin_Page_Test extends EE_UnitTestCase
{


    /**
     * @var Transactions_Admin_Page_Mock $_admin_page
     */
    protected $_admin_page;

    /**
     * @var EE_Transaction $_transaction
     */
    protected $_transaction;

    /**
     * @var EE_Payment $_payment
     */
    protected $_payment;

    /**
     * @var EE_Payment_Method $_payment_method
     */
    protected $_payment_method = null;


    public function setUp()
    {
        parent::setUp();
        $this->delayedAdminPageMocks('transactions');
    }


    /**
     * _generate_transaction_and_registrations
     *
     * @since 4.8
     * @param float $txn_total
     * @param int   $reg_count
     * @return \EE_Transaction
     */
    protected function _generate_transaction_and_registrations($txn_total = 10.00, $reg_count = 0)
    {
        /** @type EE_Transaction $transaction */
        $transaction = $this->new_model_obj_with_dependencies(
            'Transaction',
            array(
                'STS_ID'    => EEM_Transaction::incomplete_status_code,
                'TXN_total' => $txn_total,
                'TXN_paid'  => 0,
            )
        );
        if ($reg_count) {
            $registrations = $this->factory->registration->create_many(
                $reg_count,
                array(
                    'STS_ID'          => EEM_Registration::status_id_pending_payment,
                    'REG_final_price' => $txn_total / $reg_count,
                )
            );
            foreach ($registrations as $registration) {
                if ($registration instanceof EE_Registration) {
                    $transaction->_add_relation_to($registration, 'Registration');
                    $registration->save();
                }
            }
        }
        $transaction->save();
        return $transaction;
    }


    /**
     * _get_registrations_from_transaction
     *
     * @since 4.8
     * @param \EE_Transaction $transaction
     * @param int             $reg_count
     * @return \EE_Registration[]
     */
    protected function _get_x_number_of_registrations_from_transaction(EE_Transaction $transaction, $reg_count = 0)
    {
        $registrations = $transaction->registrations();
        return array_slice($registrations, 0, $reg_count, true);
    }


    /**
     * _payment_method
     *
     * @since 4.8
     * @return EE_Payment_Method
     */
    protected function _payment_method()
    {
        if ($this->_payment_method === null) {
            switch (rand(1, 3)) {
                case 1 :
                    $type = 'Mock_Onsite';
                    break;
                case 2 :
                    $type = 'Mock_Offsite';
                    break;
                case 3 :
                default :
                    $type = 'Mock_Offline';
                    break;
            }
            $this->_payment_method = $this->new_model_obj_with_dependencies(
                'Payment_Method',
                array(
                    'PMD_type' => $type,
                )
            );
        }
        return $this->_payment_method;
    }


    /**
     * _generate_payment_details_array
     *
     * @since 4.8
     * @param EE_Transaction $transaction
     * @param float          $amount
     * @param int            $PAY_ID
     * @param bool           $refund
     * @return array
     */
    protected function _generate_details_array_for_payment_or_refund(
        EE_Transaction $transaction,
        $amount = 10.00,
        $PAY_ID = null,
        $refund = false
    ) {
        return array(
            'type'                 => $refund !== true ? 1 : -1,
            'PAY_ID'               => $PAY_ID,
            'TXN_ID'               => $transaction->ID(),
            'PMD_ID'               => $this->_payment_method()->ID(),
            'STS_ID'               => EEM_Payment::status_id_approved,
            'PAY_source'           => EEM_Payment_Method::scope_admin,
            'PAY_details'          => array(),
            'PAY_amount'           => $amount,
            'PAY_timestamp'        => time() - 86400,
            'PAY_po_number'        => rand(100, 1000),
            'PAY_extra_accntng'    => rand(100, 1000),
            'PAY_txn_id_chq_nmbr'  => rand(100, 1000),
            'PAY_gateway_response' => 'You are a true champion!',
        );
    }


    /**
     * test_create_new_payment_or_refund_from_request_data
     * used for tests that just need an EE_Payment object
     *
     * @since 4.8
     * @param array $payment_details
     * @return EE_Payment
     */
    protected function _generate_payment($payment_details)
    {
        // make sure refunds have a negative amount
        $payment_details['PAY_amount'] = isset($payment_details['type']) && $payment_details['type'] < 0
            ? $payment_details['PAY_amount'] * -1
            : $payment_details['PAY_amount'];
        // then remove 'type' from the payment details since it's not an EEM_Payment field
        unset($payment_details['type']);
        return EE_Payment::new_instance($payment_details, '', array('Y-m-d', 'H:i a'));
    }


    /**
     * test_create_new_payment_or_refund_from_request_data
     * used for tests that need payment details passed via $_REQUEST data
     *
     * @since 4.8
     * @param EE_Transaction $transaction
     * @return array
     */
    protected function _generate_request_data_for_new_payment_or_refund(EE_Transaction $transaction)
    {
        $payment_details                   = $this->_generate_details_array_for_payment_or_refund($transaction);
        $request_data['txn_admin_payment'] = array(
            'type'            => $payment_details['type'],
            'TXN_ID'          => $payment_details['TXN_ID'],
            'PAY_ID'          => $payment_details['PAY_ID'],
            'PMD_ID'          => $payment_details['PMD_ID'],
            'status'          => $payment_details['STS_ID'],
            'date'            => $payment_details['PAY_timestamp'],
            'amount'          => $payment_details['PAY_amount'],
            'po_number'       => $payment_details['PAY_po_number'],
            'accounting'      => $payment_details['PAY_extra_accntng'],
            'txn_id_chq_nmbr' => $payment_details['PAY_txn_id_chq_nmbr'],
        );
        $this->_admin_page->set_request_data($request_data);
        return $request_data;
    }


    /**
     * _setup_standard_transaction_and_payment
     * uses the above methods to create a transaction with related registrations, and a payment
     *
     * @since 4.8
     * @param float $txn_total
     * @param int   $reg_count
     * @param float $payment_amount
     */
    protected function _setup_standard_transaction_and_payment(
        $txn_total = 10.00,
        $reg_count = 0,
        $payment_amount = 10.00
    ) {
        $this->_transaction = $this->_generate_transaction_and_registrations($txn_total, $reg_count);
        $this->_payment     = $this->_generate_payment(
            $this->_generate_details_array_for_payment_or_refund($this->_transaction, $payment_amount)
        );
    }


    /**
     * _apply_payment_to_registrations
     *
     * @since 4.8
     * @param \EE_Registration[] $registrations
     */
    protected function _apply_payment_to_registrations($registrations)
    {
        //echo "\n\n " . __METHOD__ . "() \n";
        // reset reg_payment_REG_IDs
        $this->_admin_page->set_existing_reg_payment_REG_IDs();
        $available_payment = $this->_payment->amount();
        foreach ($registrations as $registration) {
            if ($registration instanceof EE_Registration) {
                if ($available_payment > 0) {
                    $owing = $registration->final_price() - $registration->paid();
                    if ($owing > 0) {
                        // don't allow payment amount to exceed the available payment amount, OR the amount owing
                        $payment_amount = min($available_payment, $owing);
                        // update $available_payment_amount
                        $available_payment = $available_payment - $payment_amount;
                        //calculate and set new REG_paid
                        $registration->set_paid($registration->paid() + $payment_amount);
                        //$registration->set_paid( $available_payment );
                        $registration->_add_relation_to($this->_payment, 'Payment',
                            array('RPY_amount' => $this->_payment->amount()));
                        $registration->save();
                    }
                }
            }
        }
        /** @type EE_Payment $payment */
        $payment               = EEM_Payment::instance()->get_one_by_ID($this->_payment->ID());
        $registration_payments = $payment->registration_payments();
        $this->assertNotEmpty($registration_payments);
    }



    //public function test_apply_payments_or_refunds() {}


    /**
     * test_create_new_payment_or_refund_from_request_data
     *
     * @since    4.8
     * @group    8620
     */
    public function test_create_new_payment_or_refund_from_request_data()
    {
        $this->_admin_page = new Transactions_Admin_Page_Mock();
        $transaction  = $this->_generate_transaction_and_registrations();
        $request_data = $this->_generate_request_data_for_new_payment_or_refund($transaction);
        $payment      = $this->_admin_page->create_payment_from_request_data($request_data['txn_admin_payment']);
        $this->assertInstanceOf('EE_Payment', $payment);
    }


    /**
     * test_get_REG_IDs_to_apply_payment_to_for_specific_registrations_and_new_payment
     *
     * @since    4.8
     * @group    8620
     */
    public function test_get_REG_IDs_to_apply_payment_to_for_specific_registrations_and_new_payment()
    {
        $this->_admin_page = new Transactions_Admin_Page_Mock();
        //echo "\n\n " . __METHOD__ . "() \n";
        $this->_setup_standard_transaction_and_payment(40.00, 4, 10.00);
        // get 2 out of the four registrations
        $registrations = $this->_get_x_number_of_registrations_from_transaction($this->_transaction, 2);
        // pass those REG IDs via the $_REQUEST data
        $this->_admin_page->set_request_data(
            array(
                'txn_admin_payment' => array(
                    'registrations' => array_keys($registrations),
                ),
            )
        );
        $REG_IDs = $this->_admin_page->get_REG_IDs_to_apply_payment_to($this->_payment);
        foreach ($registrations as $registration) {
            if ($registration instanceof EE_Registration) {
                $this->assertContains($registration->ID(), $REG_IDs);
            }
        }
    }


    /**
     * test_get_REG_IDs_to_apply_payment_to_for_all_registrations_and_new_payment
     *
     * @since    4.8
     * @group    8620
     */
    public function test_get_REG_IDs_to_apply_payment_to_for_all_registrations_and_new_payment()
    {
        $this->_admin_page = new Transactions_Admin_Page_Mock();
        //echo "\n\n " . __METHOD__ . "() \n";
        $this->_setup_standard_transaction_and_payment(40.00, 4, 10.00);
        $REG_IDs = $this->_admin_page->get_REG_IDs_to_apply_payment_to($this->_payment);
        foreach ($this->_transaction->registrations() as $registration) {
            if ($registration instanceof EE_Registration) {
                $this->assertContains($registration->ID(), $REG_IDs);
            }
        }
    }


    /**
     * test_get_existing_reg_payment_REG_IDs
     *
     * @since    4.8
     * @group    8620
     */
    public function test_get_existing_reg_payment_REG_IDs()
    {
        $this->_admin_page = new Transactions_Admin_Page_Mock();
        //echo "\n\n " . __METHOD__ . "() \n";
        $this->_setup_standard_transaction_and_payment(40.00, 4, 15.00);
        // get 2 out of the four registrations
        $registrations = $this->_get_x_number_of_registrations_from_transaction($this->_transaction, 2);
        $this->_apply_payment_to_registrations($registrations);
        $REG_IDs       = $this->_admin_page->get_existing_reg_payment_REG_IDs($this->_payment);
        $registrations = $this->_transaction->registrations();
        // $15 payment should have applied $10 to first reg and $5 to second reg
        $this->assertContains(reset($registrations)->ID(), $REG_IDs);
        $this->assertContains(next($registrations)->ID(), $REG_IDs);
        // and nothing to the last two registrations
        $this->assertNotContains(next($registrations)->ID(), $REG_IDs);
        $this->assertNotContains(next($registrations)->ID(), $REG_IDs);
    }


    /**
     * test_remove_existing_registration_payments
     *
     * @since    4.8
     * @group    8620
     */
    public function test_remove_existing_registration_payments()
    {
        $this->_admin_page = new Transactions_Admin_Page_Mock();
        //echo "\n\n " . __METHOD__ . "() \n";
        $this->_setup_standard_transaction_and_payment(40.00, 4, 10.00);
        $registrations = $this->_get_x_number_of_registrations_from_transaction($this->_transaction, 2);
        $this->_apply_payment_to_registrations($registrations);
        $removed = $this->_admin_page->remove_existing_registration_payments($this->_payment, $this->_payment->ID());
        $this->assertTrue($removed);
        // update payment from db
        /** @type EE_Payment $payment */
        $payment               = EEM_Payment::instance()->get_one_by_ID($this->_payment->ID());
        $registration_payments = $payment->registration_payments();
        $this->assertEmpty($registration_payments);

    }


    /**
     * test_update_registration_payments
     *
     * @since    4.8
     * @group    8620
     */
    public function test_update_registration_payments_one_reg_paid_in_full()
    {
        $this->_admin_page = new Transactions_Admin_Page_Mock();
        $this->_setup_standard_transaction_and_payment(40.00, 4, 10.00);
        $this->_admin_page->set_existing_reg_payment_REG_IDs();
        $registrations = $this->_get_x_number_of_registrations_from_transaction($this->_transaction, 2);
        $this->_admin_page->update_registration_payments($this->_transaction, $this->_payment,
            array_keys($registrations));
        $registrations = $this->_transaction->registrations();
        $this->assertEquals(10.00, reset($registrations)->paid());
        $this->assertEquals(0, next($registrations)->paid());
        $this->assertEquals(0, next($registrations)->paid());
        $this->assertEquals(0, next($registrations)->paid());
    }


    /**
     * test_update_registration_payments
     *
     * @since    4.8
     * @group    8620
     */
    public function test_update_registration_payments_one_reg_paid_in_full_one_partial()
    {
        $this->_admin_page = new Transactions_Admin_Page_Mock();
        $this->_setup_standard_transaction_and_payment(40.00, 4, 15.00);
        $this->_admin_page->set_existing_reg_payment_REG_IDs();
        $registrations = $this->_get_x_number_of_registrations_from_transaction($this->_transaction, 2);
        $this->_admin_page->update_registration_payments($this->_transaction, $this->_payment,
            array_keys($registrations));
        // now get ALL registrations
        $registrations = $this->_transaction->registrations();
        $this->assertEquals(10.00, reset($registrations)->paid());
        $this->assertEquals(5.00, next($registrations)->paid());
        $this->assertEquals(0, next($registrations)->paid());
        $this->assertEquals(0, next($registrations)->paid());
    }


    /**
     * test_update_registration_payments
     *
     * @since    4.8
     * @group    8620
     */
    public function test_update_registration_payments_last_reg_paid_in_full()
    {
        $this->_admin_page = new Transactions_Admin_Page_Mock();
        $this->_setup_standard_transaction_and_payment(40.00, 4, 10.00);
        $this->_admin_page->set_existing_reg_payment_REG_IDs();
        $registrations = $this->_transaction->registrations();
        $this->_admin_page->update_registration_payments($this->_transaction, $this->_payment,
            array(end($registrations)->ID()));
        // ref
        //$registrations = $this->_transaction->registrations();
        $this->assertEquals(0, reset($registrations)->paid());
        $this->assertEquals(0, next($registrations)->paid());
        $this->assertEquals(0, next($registrations)->paid());
        $this->assertEquals(10.00, next($registrations)->paid());
    }


    /**
     * test_update_registration_payments
     *
     * @since    4.8
     * @group    8620
     */
    public function test_update_registration_payments_all_paid_in_full()
    {
        $this->_admin_page = new Transactions_Admin_Page_Mock();
        $this->_setup_standard_transaction_and_payment(40.00, 4, 40.00);
        $this->_admin_page->set_existing_reg_payment_REG_IDs();
        $registrations = $this->_transaction->registrations();
        $this->_admin_page->update_registration_payments($this->_transaction, $this->_payment,
            array_keys($registrations));
        $this->assertEquals(10.00, reset($registrations)->paid());
        $this->assertEquals(10.00, next($registrations)->paid());
        $this->assertEquals(10.00, next($registrations)->paid());
        $this->assertEquals(10.00, next($registrations)->paid());
    }


    /**
     * test_update_registration_payments
     *
     * @since    4.8
     * @group    8620
     */
    public function test_update_registration_payments_two_payments()
    {
        $this->_admin_page = new Transactions_Admin_Page_Mock();
        $this->_setup_standard_transaction_and_payment(40.00, 4, 10.00);
        $this->_admin_page->set_existing_reg_payment_REG_IDs();
        $registrations = $this->_transaction->registrations();
        $reg_IDs       = array_keys($registrations);
        $this->_admin_page->update_registration_payments($this->_transaction, $this->_payment, $reg_IDs);
        $this->assertEquals(10.00, reset($registrations)->paid());
        $this->assertEquals(0, next($registrations)->paid());
        $this->assertEquals(0, next($registrations)->paid());
        $this->assertEquals(0, next($registrations)->paid());
        // second payment
        $this->_payment = $this->_generate_payment(
            $this->_generate_details_array_for_payment_or_refund($this->_transaction, 15.00)
        );
        // reset reg IDs
        $this->_admin_page->set_existing_reg_payment_REG_IDs();
        $this->_admin_page->update_registration_payments($this->_transaction, $this->_payment, $reg_IDs);
        $this->assertEquals(10.00, reset($registrations)->paid());
        $this->assertEquals(10.00, next($registrations)->paid());
        $this->assertEquals(5.00, next($registrations)->paid());
        $this->assertEquals(0, next($registrations)->paid());
    }


    /**
     * test_update_registration_payments
     *
     * @since    4.8
     * @group    8620
     */
    public function test_update_registration_payments_three_payments_all_paid()
    {
        $this->_admin_page = new Transactions_Admin_Page_Mock();
        $this->_setup_standard_transaction_and_payment(40.00, 4, 10.00);
        $this->_admin_page->set_existing_reg_payment_REG_IDs();
        $registrations = $this->_transaction->registrations();
        $reg_IDs       = array_keys($registrations);
        $this->_admin_page->update_registration_payments($this->_transaction, $this->_payment, $reg_IDs);
        $this->assertEquals(10.00, reset($registrations)->paid());
        $this->assertEquals(0, next($registrations)->paid());
        $this->assertEquals(0, next($registrations)->paid());
        $this->assertEquals(0, next($registrations)->paid());
        // second payment
        $this->_payment = $this->_generate_payment(
            $this->_generate_details_array_for_payment_or_refund($this->_transaction, 15.00)
        );
        // reset reg IDs
        $this->_admin_page->set_existing_reg_payment_REG_IDs();
        $this->_admin_page->update_registration_payments($this->_transaction, $this->_payment, $reg_IDs);
        $this->assertEquals(10.00, reset($registrations)->paid());
        $this->assertEquals(10.00, next($registrations)->paid());
        $this->assertEquals(5.00, next($registrations)->paid());
        $this->assertEquals(0, next($registrations)->paid());
        // third and final payment
        $this->_payment = $this->_generate_payment(
            $this->_generate_details_array_for_payment_or_refund($this->_transaction, 15.00)
        );
        // reset reg IDs
        $this->_admin_page->set_existing_reg_payment_REG_IDs();
        $this->_admin_page->update_registration_payments($this->_transaction, $this->_payment, $reg_IDs);
        $this->assertEquals(10.00, reset($registrations)->paid());
        $this->assertEquals(10.00, next($registrations)->paid());
        $this->assertEquals(10.00, next($registrations)->paid());
        $this->assertEquals(10.00, next($registrations)->paid());
    }


    /**
     * test_process_registration_status_change_set_all_registrations_approved
     *
     * @since    4.8
     * @group    8620
     */
    public function test_process_registration_status_change_set_all_registrations_approved()
    {
        $this->_admin_page = new Transactions_Admin_Page_Mock();
        // first we need to setup an admin with EE caps
        global $current_user;
        $current_user = $this->wp_admin_with_ee_caps();
        $this->_setup_standard_transaction_and_payment(40.00, 4, 40.00);
        $this->_admin_page->set_existing_reg_payment_REG_IDs();
        // going to need the registration to have an EE_Ticket for this test
        $ticket        = $this->new_ticket(
            array(
                'ticket_price'   => 10.00,
                'ticket_taxable' => false,
            )
        );
        $registrations = $this->_transaction->registrations();
        foreach ($registrations as $registration) {
            if ($registration instanceof EE_Registration) {
                $registration->_add_relation_to($ticket, 'Ticket');
                $registration->_add_relation_to($ticket->get_related_event(), 'Event');
                $registration->save();
                $this->assertEquals(EEM_Registration::status_id_pending_payment, $registration->status_ID());
            }
        }
        // set $_REQUEST data
        $this->_admin_page->set_request_data(
            array(
                'txn_reg_status_change' => array(
                    'reg_status' => EEM_Registration::status_id_approved,
                ),
            )
        );
        $status_updates = $this->_admin_page->process_registration_status_change($this->_transaction,
            array_keys($registrations));
        $this->assertTrue($status_updates);
        foreach ($registrations as $registration) {
            if ($registration instanceof EE_Registration) {
                $this->assertEquals(EEM_Registration::status_id_approved, $registration->status_ID());
            }
        }
    }


    /**
     * test_process_registration_status_change_set_two_registrations_approved
     *
     * @since    4.8
     * @group    8620
     */
    public function test_process_registration_status_change_set_two_registrations_approved()
    {
        $this->_admin_page = new Transactions_Admin_Page_Mock();
        // first we need to setup an admin with EE caps
        global $current_user;
        $current_user = $this->wp_admin_with_ee_caps();
        $this->_setup_standard_transaction_and_payment(40.00, 4, 20.00);
        $reg_IDs       = array_keys($this->_transaction->registrations());
        $registrations = $this->_get_x_number_of_registrations_from_transaction($this->_transaction, 2);
        $this->_apply_payment_to_registrations($registrations);
        //$this->_admin_page->set_existing_reg_payment_REG_IDs();
        // going to need the registration to have an EE_Ticket for this test
        $ticket = $this->new_ticket(
            array(
                'ticket_price'   => 10.00,
                'ticket_taxable' => false,
            )
        );
        //$registrations = $this->_transaction->registrations();
        foreach ($registrations as $registration) {
            if ($registration instanceof EE_Registration) {
                $registration->_add_relation_to($ticket, 'Ticket');
                $registration->_add_relation_to($ticket->get_related_event(), 'Event');
                $registration->save();
                $this->assertEquals(EEM_Registration::status_id_pending_payment, $registration->status_ID());
            }
        }
        // set $_REQUEST data
        $this->_admin_page->set_request_data(
            array(
                'txn_reg_status_change' => array(
                    'reg_status' => EEM_Registration::status_id_approved,
                ),
            )
        );
        $status_updates = $this->_admin_page->process_registration_status_change($this->_transaction,
            array_keys($registrations));
        $this->assertTrue($status_updates);
        // re-query for ALL of the registrations
        $registrations = $this->_transaction->registrations(array(array('REG_ID' => array('IN', $reg_IDs))));
        $this->assertEquals(EEM_Registration::status_id_approved, reset($registrations)->status_ID());
        $this->assertEquals(EEM_Registration::status_id_approved, next($registrations)->status_ID());
        $this->assertEquals(EEM_Registration::status_id_pending_payment, next($registrations)->status_ID());
        $this->assertEquals(EEM_Registration::status_id_pending_payment, next($registrations)->status_ID());
    }


    /**
     * test_build_payment_json_response_for_payment
     *
     * @since    4.8
     * @group    8620
     */
    public function test_build_payment_json_response_for_payment()
    {
        $this->_admin_page = new Transactions_Admin_Page_Mock();
        $this->_setup_standard_transaction_and_payment(40.00, 4, 15.00);
        // need to make sure relation is set between payment and payment method
        $this->_payment->_add_relation_to($this->_payment_method(), 'Payment_Method');
        $registrations = $this->_get_x_number_of_registrations_from_transaction($this->_transaction, 1);
        $this->_apply_payment_to_registrations($registrations);
        $json_response_data = $this->_admin_page->build_payment_json_response($this->_payment);
        $pay_status         = EEM_Payment::instance()->status_array(true);
        $this->assertEquals(15.00, $json_response_data['amount']);
        // total paid is still zero, because we haven't actually updated the TXN with the payment info
        $this->assertEquals(0, $json_response_data['total_paid']);
        $this->assertEquals(EEM_Transaction::incomplete_status_code, $json_response_data['txn_status']);
        $this->assertEquals(EEM_Payment::status_id_approved, $json_response_data['pay_status']);
        $this->assertEquals(EEM_Payment::status_id_approved, $json_response_data['STS_ID']);
        $this->assertEquals($pay_status[EEM_Payment::status_id_approved], $json_response_data['status']);
        $this->assertEquals($this->_payment->ID(), $json_response_data['PAY_ID']);
        $this->assertEquals($this->_payment->timestamp('Y-m-d', 'h:i a'), $json_response_data['date']);
        $this->assertEquals(strtoupper($this->_payment->source()), $json_response_data['method']);
        $this->assertEquals($this->_payment_method()->ID(), $json_response_data['PM_ID']);
        $this->assertEquals($this->_payment_method()->admin_name(), $json_response_data['gateway']);
        $this->assertEquals($this->_payment->gateway_response(), $json_response_data['gateway_response']);
        $this->assertEquals($this->_payment->txn_id_chq_nmbr(), $json_response_data['txn_id_chq_nmbr']);
        $this->assertEquals($this->_payment->po_number(), $json_response_data['po_number']);
        $this->assertEquals($this->_payment->extra_accntng(), $json_response_data['extra_accntng']);
        $this->assertEquals($this->_payment->extra_accntng(), $json_response_data['extra_accntng']);
        // will validate $json_response_data[ 'registrations' ] in test_registration_payment_data_array()
    }


    /**
     * test_build_payment_json_response_for_deleted_payment
     *
     * @since    4.8
     * @group    8620
     */
    public function test_build_payment_json_response_for_deleted_payment()
    {
        $this->_admin_page = new Transactions_Admin_Page_Mock();
        $this->_setup_standard_transaction_and_payment(40.00, 4, 15.00);
        // need to make sure relation is set between payment and payment method
        $this->_payment->_add_relation_to($this->_payment_method(), 'Payment_Method');
        $registrations = $this->_get_x_number_of_registrations_from_transaction($this->_transaction, 1);
        $this->_apply_payment_to_registrations($registrations);
        $json_response_data = $this->_admin_page->build_payment_json_response($this->_payment, array(), true);
        $this->assertEquals($this->_payment->ID(), $json_response_data['PAY_ID']);
        $this->assertEquals(15.00, $json_response_data['amount']);
        // total paid is still zero, because we haven't actually updated the TXN with the payment info
        $this->assertEquals(0, $json_response_data['total_paid']);
        $this->assertEquals(EEM_Transaction::incomplete_status_code, $json_response_data['txn_status']);
        $this->assertEquals(EEM_Payment::status_id_approved, $json_response_data['pay_status']);
        $this->assertTrue($json_response_data['delete_txn_reg_status_change']);
        // will validate $json_response_data[ 'registrations' ] in test_registration_payment_data_array()
    }


    /**
     * test_registration_payment_data_array
     *
     * @since    4.8
     * @group    8620
     */
    public function test_registration_payment_data_array()
    {
        $this->_admin_page = new Transactions_Admin_Page_Mock();
        $this->_setup_standard_transaction_and_payment(40.00, 4, 25.00);
        $registrations = $this->_transaction->registrations();
        $this->_apply_payment_to_registrations($registrations);
        $registration_payment_data_array = $this->_admin_page->registration_payment_data_array(array_keys($registrations));
        // format the payment values
        $ten_dollars  = EEH_Template::format_currency(10.00);
        $five_dollars = EEH_Template::format_currency(5.00);
        $no_dollars   = EEH_Template::format_currency(0.00);
        // reg # 1 paid $10, owes 0
        $registration_payment_data = reset($registration_payment_data_array);
        $this->assertEquals($ten_dollars, $registration_payment_data['paid']);
        $this->assertEquals($no_dollars, $registration_payment_data['owing']);
        // reg # 2 paid $10, owes 0
        $registration_payment_data = next($registration_payment_data_array);
        $this->assertEquals($ten_dollars, $registration_payment_data['paid']);
        $this->assertEquals($no_dollars, $registration_payment_data['owing']);
        // reg # 3 paid $5, owes $5
        $registration_payment_data = next($registration_payment_data_array);
        $this->assertEquals($five_dollars, $registration_payment_data['paid']);
        $this->assertEquals($five_dollars, $registration_payment_data['owing']);
        // reg # 4 paid $0, owes $10
        $registration_payment_data = next($registration_payment_data_array);
        $this->assertEquals($no_dollars, $registration_payment_data['paid']);
        $this->assertEquals($ten_dollars, $registration_payment_data['owing']);
    }


}
// End of file Transactions_Admin_Page_Test.php
// Location: /tests/testcases/admin_pages/transactions/Transactions_Admin_Page_Test.php