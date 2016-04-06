<?php

if (!defined('EVENT_ESPRESSO_VERSION')) {
	exit('No direct script access allowed');
}

/**
 *
 * EEH_Line_Item_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EEH_Line_Item_Test extends EE_UnitTestCase{

	static function setUpBeforeClass() {
		//EE_Registry::instance()->load_helper('Line_Item');
	}

	public function test_get_items_subtotal(){
		$transaction = $this->new_typical_transaction();
		$items_subtotals = EEM_Line_Item::instance()->get_all_of_type_for_transaction( EEM_Line_Item::type_sub_total, $transaction );
		$items_subtotal = array_shift( $items_subtotals );
		$eeh_found_items_subtotal = EEH_Line_Item::get_pre_tax_subtotal( $transaction->total_line_item() );
		$this->assertEquals( $items_subtotal, $eeh_found_items_subtotal );
	}

	public function test_create_default_total_line_item(){
		$total_line_item = EEH_Line_Item::create_total_line_item();
		$this->assertEquals( EEM_Line_Item::type_total, $total_line_item->type() );
		$pre_tax_subtotal = EEH_Line_Item::get_pre_tax_subtotal( $total_line_item );
		$this->assertEquals( EEM_Line_Item::type_sub_total, $pre_tax_subtotal->type() );
		$taxes_subtotal = EEH_Line_Item::get_taxes_subtotal( $total_line_item );
		$this->assertEquals( EEM_Line_Item::type_tax_sub_total, $taxes_subtotal->type() );
		$taxes = $taxes_subtotal->children();
		//by default there should be 1 tax at 15%
		$this->assertEquals( 1, count( $taxes ) );
		$tax = array_shift( $taxes );
		$this->assertEquals(EEM_Line_Item::type_tax, $tax->type() );
		$this->assertEquals( 15, $tax->percent() );
	}

	/**
	 * test_add_ticket_purchase
	 */
	public function test_add_ticket_purchase(){
		// create grand total
		$total_line_item = EEH_Line_Item::create_total_line_item();
		$this->assertEquals( 0, $total_line_item->total() );
		// create a ticket
		$ticket = $this->new_ticket( array(
			'dollar_surcharge'  		=> 5,
			'percent_surcharge' 	=> 10,
			'datetimes'         			=> 2
		) );
		// need to save ticket for other tests to work
		$ticket->save();
		// two tickets plz
		$ticket_line_item = EEH_Line_Item::add_ticket_purchase( $total_line_item, $ticket, 2 );
		// confirm tickets
		$this->assertEquals( 2, $ticket_line_item->quantity() );
		$this->assertEquals( 33, $ticket_line_item->total() );
		// confirm subtotal
		$pre_tax_subtotal = EEH_Line_Item::get_pre_tax_subtotal( $total_line_item );
		$this->assertEquals( 33, $pre_tax_subtotal->total() );
		// confirm taxes
		$taxes_subtotal = EEH_Line_Item::get_taxes_subtotal( $total_line_item );
		$this->assertEquals( 4.95, $taxes_subtotal->total() );
		// confirm totals
		$this->assertEquals( 37.95, $total_line_item->total() );
		// one moar ticket plz
		$ticket_line_item = EEH_Line_Item::add_ticket_purchase( $total_line_item, $ticket );
		// confirm tickets
		$this->assertEquals( 3, $ticket_line_item->quantity() );
		$this->assertEquals( 49.5, $ticket_line_item->total() );
		// confirm subtotal
		$this->assertEquals( 49.5, $pre_tax_subtotal->total() );
		// confirm taxes
		$this->assertEquals( 7.43, $taxes_subtotal->total() );
		// confirm totals
		$this->assertEquals( 56.93, $total_line_item->total() );
		// total ticket line items count? should just be one ticket line item
		$this->assertEquals( 1, count( EEH_Line_Item::get_ticket_line_items( $total_line_item ) ) );
		// now add a different ticket
		$new_ticket = $this->new_ticket( array(
			'ticket_price'  		=> 10,
			'ticket_taxable' 	=> false,
			'datetimes'         	=> 1
		) );
		$new_ticket->save();
		// add one
		$new_ticket_line_item = EEH_Line_Item::add_ticket_purchase( $total_line_item, $new_ticket );
		$this->assertEquals( 1, $new_ticket_line_item->quantity() );
		// add one moar
		$new_ticket_line_item = EEH_Line_Item::add_ticket_purchase( $total_line_item, $new_ticket );
		$this->assertEquals( 2, $new_ticket_line_item->quantity() );
		// confirm totals
		$this->assertEquals( 20, $new_ticket_line_item->total() );
		$this->assertEquals( 69.5, $pre_tax_subtotal->total() );
		// should be same taxes as before
		$this->assertEquals( 7.43, $taxes_subtotal->total() );
		$this->assertEquals( 76.93, $total_line_item->total() );
		// total ticket ticket line items?
		$this->assertEquals( 2, count( EEH_Line_Item::get_ticket_line_items( $total_line_item ) ) );

	}



	/**
	 * 	test_set_tax
	 */
	function test_set_tax(){
		//first create a line item
		$txn = $this->new_typical_transaction();
		$line_item = $txn->total_line_item();
		$old_tax_subtotal = EEH_Line_Item::get_nearest_descendant_of_type( $line_item, EEM_Line_Item::type_tax_sub_total );
		$this->assertInstanceOf( 'EE_Line_Item', $old_tax_subtotal );
		$old_tax = EEH_Line_Item::get_nearest_descendant_of_type( $old_tax_subtotal, EEM_Line_Item::type_tax );

		$new_tax = EEH_Line_Item::set_total_tax_to( $line_item, 1.5, 'Monkey Tax', 'Only monkey must pay' );
		$this->assertEquals( 1.5, $new_tax->total());
		$this->assertEquals( $new_tax->total(), $old_tax_subtotal->total() );
		$child_of_tax_subtotal = EEH_Line_Item::get_nearest_descendant_of_type( $old_tax_subtotal, EEM_Line_Item::type_tax );
		$this->assertEquals( $new_tax, $child_of_tax_subtotal );

		$tax_total_before_recalculation = $old_tax_subtotal->total();
		$tax_before_recalculations = $new_tax->total();
		$line_item->recalculate_taxes_and_tax_total();

		$this->assertEquals( $tax_before_recalculations, $new_tax->total() );
		$this->assertEquals( $tax_total_before_recalculation, $old_tax_subtotal->total() );
	}
	/**
	 * @group 8193
	 */
	public function test_calculate_reg_final_prices_per_line_item__1_nontaxable_ticket() {
		$transaction = $this->new_typical_transaction(
				array(
					'taxable_tickets' => 0
				));
		$totals = EEH_Line_Item::calculate_reg_final_prices_per_line_item( $transaction->total_line_item() );
		$this->assertEquals( $transaction->total(), $totals[ 'total' ] );
		$ticket_line_items = EEM_Line_Item::instance()->get_all(
				array(
					array(
						'TXN_ID' => $transaction->ID(),
						'LIN_type' => EEM_Line_Item::type_line_item
					)
				));
		$this->assertEquals( 1, count( $ticket_line_items ) );
		$ticket_line_item = reset( $ticket_line_items );
		$this->assertEquals( 1, $ticket_line_item->quantity() );
		$this->assertEquals( $ticket_line_item->total(), $totals[ $ticket_line_item->ID() ] );
	}

	/**
	 * @group 8193
	 */
	public function test_calculate_reg_final_prices_per_line_item__1_taxable_ticket() {
		$transaction = $this->new_typical_transaction();
		$totals = EEH_Line_Item::calculate_reg_final_prices_per_line_item( $transaction->total_line_item() );
		$this->assertEquals( $transaction->total(), $totals[ 'total' ] );
		$ticket_line_items = EEM_Line_Item::instance()->get_all(
				array(
					array(
						'TXN_ID' => $transaction->ID(),
						'LIN_type' => EEM_Line_Item::type_line_item
					)
				));
		$this->assertEquals( 1, count( $ticket_line_items ) );
		$ticket_line_item = reset( $ticket_line_items );
		$this->assertEquals( 1, $ticket_line_item->quantity() );
		$ticket = $ticket_line_item->ticket();
		$this->assertEquals( $ticket->get_ticket_total_with_taxes(), $totals[ $ticket_line_item->ID() ] );
	}

	/**
	 * @group 8193
	 */
	public function test_calculate_reg_final_prices_per_line_item__1_taxable_ticket_with_quantity_of_2() {
		$transaction = $this->new_typical_transaction();
		$ticket_line_items = EEM_Line_Item::instance()->get_all(
				array(
					array(
						'TXN_ID' => $transaction->ID(),
						'LIN_type' => EEM_Line_Item::type_line_item
					)
				));
		$this->assertEquals( 1, count( $ticket_line_items ) );
		$ticket_line_item = reset( $ticket_line_items );
		$ticket_line_item->set_quantity( 2 );
		$transaction->total_line_item()->recalculate_total_including_taxes();
		$this->assertEquals( 2, $ticket_line_item->quantity() );
		$ticket = $ticket_line_item->ticket();

		$totals = EEH_Line_Item::calculate_reg_final_prices_per_line_item( $transaction->total_line_item() );
		$this->assertEquals( $transaction->total(), $totals[ 'total' ] );
		$this->assertEquals( $ticket->get_ticket_total_with_taxes(), $totals[ $ticket_line_item->ID() ] );
	}

	/**
	 * @group 8193
	 */
	public function test_calculate_reg_final_prices_per_line_item__1_taxable_ticket_with_a_discount() {
		$transaction = $this->new_typical_transaction();
		EEH_Line_Item::add_unrelated_item( $transaction->total_line_item(), 'Some Discount', -5 );

		$totals = EEH_Line_Item::calculate_reg_final_prices_per_line_item( $transaction->total_line_item() );
		$this->assertEquals( $transaction->total(), $totals[ 'total' ] );
		$ticket_line_items = EEM_Line_Item::instance()->get_all(
				array(
					array(
						'TXN_ID' => $transaction->ID(),
						'LIN_type' => EEM_Line_Item::type_line_item,
						'OBJ_type' => 'Ticket'
					)
				));
		$this->assertEquals( 1, count( $ticket_line_items ) );
		$ticket_line_item = reset( $ticket_line_items );
		$this->assertEquals( 6.50, $totals[ $ticket_line_item->ID() ] );

//		honestly the easiest way to confirm the total was right is to visualize the tree
//		EEH_Line_Item::visualize( $transaction->total_line_item() );
	}

	/**
	 * @group 8193
	 */
	public function test_calculate_reg_final_prices_per_line_item__3_taxable_tickets_with_a_discount() {
		$transaction = $this->new_typical_transaction(
				array(
					'ticket_types' => 2
				));
		//add another ticket purchase for one of the same events
		$event1 = EEM_Event::instance()->get_one(
				array(
					array(
						'Registration.TXN_ID' => $transaction->ID()
					)
				));
		$dtt = $event1->get_first_related( 'Datetime' );
		$new_tkt = $this->new_model_obj_with_dependencies( 'Ticket', array( 'TKT_price' => 6 ) );
		$new_tkt->_add_relation_to( $dtt, 'Datetime' );
		$quantity_of_new_tks_purchased = 2;
		EEH_Line_Item::add_ticket_purchase( $transaction->total_line_item(), $new_tkt, $quantity_of_new_tks_purchased );
		for( $i = 0; $i < 2; $i++ ) {
			$this->new_model_obj_with_dependencies( 'Registration',
					array(
						'TXN_ID' => $transaction->ID(),
						'EVT_ID' => $dtt->get( 'EVT_ID' ),
						'TKT_ID' => $new_tkt->ID(),
					));
		}
		//and add an unrelated purchase
		EEH_Line_Item::add_unrelated_item( $transaction->total_line_item(), 'Transaction-Wide Discount', -5 );

		$totals = EEH_Line_Item::calculate_reg_final_prices_per_line_item( $transaction->total_line_item() );

		//		honestly the easiest way to confirm the total was right is to visualize the tree
//		var_dump( $totals );
//		EEH_Line_Item::visualize( $transaction->total_line_item() );

		//verify that if we added the REG_final_prices onto the regs as derived from $totals,
		//that it would equal the grand total
		$sum_of_regs_final_prices = 0;
		foreach( $transaction->registrations() as $reg ) {
			$ticket_line_item = EEM_Line_Item::instance()->get_line_item_for_registration( $reg );
			$sum_of_regs_final_prices += $totals[ $ticket_line_item->ID() ];
		}
		$this->assertEquals( $totals[ 'total' ], $sum_of_regs_final_prices );

		//ok now let's verify the 'REG_final_price' for each ticket's line item is what we expect it to be
		//so there should be 3 ticket line items right?
		$ticket_line_items = EEM_Line_Item::instance()->get_all(
				array(
					array(
						'TXN_ID' => $transaction->ID(),
						'OBJ_type' => 'Ticket'
					)
				));
		//one ticket should be 10 pre-tax
		$ten_dollar_ticket = EEM_Line_Item::instance()->get_one( array(
			array(
				'TXN_ID' => $transaction->ID(),
				'LIN_unit_price' => 10,
				'LIN_type' => EEM_Line_Item::type_line_item,
			)
		));
		$this->assertEquals( 10.31, round( $totals[ $ten_dollar_ticket->ID() ], 2 ) );
		//one ticket should be 20 pre-tax
		$twenty_dollar_ticket = EEM_Line_Item::instance()->get_one( array(
			array(
				'TXN_ID' => $transaction->ID(),
				'LIN_unit_price' => 20,
				'LIN_type' => EEM_Line_Item::type_line_item,
			)
		));
		$this->assertEquals( 20.62, round( $totals[ $twenty_dollar_ticket->ID() ], 2 ) );
		//one ticket should be for 6 pre-tax (although its non-taxable anyway)
		$six_dollar_ticket = EEM_Line_Item::instance()->get_one( array(
			array(
				'TXN_ID' => $transaction->ID(),
				'LIN_unit_price' => 6,
				'LIN_type' => EEM_Line_Item::type_line_item,
			)
		));
		$this->assertEquals( 5.29, round( $totals[ $six_dollar_ticket->ID() ], 2 ) );
	}

	/**
	 * @group 8193
	 */
	public function test_calculate_reg_final_prices_per_line_item__3_taxable_tickets_with_an_event_wide_discount() {
		$transaction = $this->new_typical_transaction(
				array(
					'ticket_types' => 2
				));
		//add another ticket purchase for one of the same events
		$event1 = EEM_Event::instance()->get_one(
				array(
					array(
						'Registration.TXN_ID' => $transaction->ID()
					)
				));
		$event_line_item = EEM_Line_Item::instance()->get_one(
						array(
							array(
								'TXN_ID' => $transaction->ID(),
								'OBJ_type' => 'Event',
								'OBJ_ID' => $event1->ID() )));
		$discount = $this->new_model_obj_with_dependencies( 'Line_Item',
				array(
					'LIN_type' => EEM_Line_Item::type_line_item,
					'LIN_name' => 'event discount',
					'LIN_total' => -8,
					'LIN_unit_price' => -8,
					'LIN_percent' => 0,
					'LIN_quantity' => 1,
					'LIN_parent' => $event_line_item->ID(),
					'LIN_percent' => null,
					'LIN_order' => count( $event_line_item->children() )
				));
		$transaction->total_line_item()->recalculate_pre_tax_total();
		//and add an unrelated purchase
		EEH_Line_Item::add_unrelated_item( $transaction->total_line_item(), 'Transaction-Wide Discount', -5 );

		$totals = EEH_Line_Item::calculate_reg_final_prices_per_line_item( $transaction->total_line_item() );

		//		honestly the easiest way to confirm the total was right is to visualize the tree
//		var_dump( $totals );
//		EEH_Line_Item::visualize( $transaction->total_line_item() );

		//verify that if we added the REG_final_prices onto the regs as derived from $totals,
		//that it would equal the grand total
		$sum_of_regs_final_prices = 0;
		foreach( $transaction->registrations() as $reg ) {
			$ticket_line_item = EEM_Line_Item::instance()->get_line_item_for_registration( $reg );
			$sum_of_regs_final_prices += $totals[ $ticket_line_item->ID() ];
		}
		$this->assertEquals( $totals[ 'total' ], $sum_of_regs_final_prices );

		//ok now let's verify the 'REG_final_price' for each ticket's line item is what we expect it to be
		//so there should be 3 ticket line items right?
		$ticket_line_items = EEM_Line_Item::instance()->get_all(
				array(
					array(
						'TXN_ID' => $transaction->ID(),
						'OBJ_type' => 'Ticket'
					)
				));
		//one ticket should be 10 pre-tax
		$ten_dollar_ticket = EEM_Line_Item::instance()->get_one( array(
			array(
				'TXN_ID' => $transaction->ID(),
				'LIN_unit_price' => 10,
				'LIN_type' => EEM_Line_Item::type_line_item,
			)
		));
		$this->assertEquals( 3.05, round( $totals[ $ten_dollar_ticket->ID() ], 2 ) );
		//one ticket should be 20 pre-tax
		$twenty_dollar_ticket = EEM_Line_Item::instance()->get_one( array(
			array(
				'TXN_ID' => $transaction->ID(),
				'LIN_unit_price' => 20,
				'LIN_type' => EEM_Line_Item::type_line_item,
			)
		));
		$this->assertEquals( 18.45, round( $totals[ $twenty_dollar_ticket->ID() ], 2 ) );
	}

	/**
	 * This tests the case where we buy 1 taxable $10 ticket and a nontaxable $10 ticket,
	 * and apply a 50% taxable discount (ie, taxes factor it in), and there is a 10% tax.
	 * After teh discount, each should cost $5, and the taxable one should add 10% onto it.
	 * So we shoudl end up with one costing $5.50 and one $5.
	 * @group 8193
	 */
	function test_calculate_reg_final_prices_per_line_item__percent_discount_partially_taxable() {
		$grand_total = $this->new_model_obj_with_dependencies( 'Line_Item',
				array(
					'LIN_name' => 'total',
					'LIN_type' => EEM_Line_Item::type_total,
					'LIN_total' => 0
				));
		$subtotal = $this->new_model_obj_with_dependencies( 'Line_Item',
				array(
					'LIN_name' => 'subtotal',
					'LIN_type' => EEM_Line_Item::type_sub_total,
					'LIN_total' => 0,
					'LIN_unit_price' => 0,
					'LIN_quantity' => 0,
					'LIN_parent' => $grand_total->ID(),
					'LIN_order' => 0,
				));
		$taxable = $this->new_model_obj_with_dependencies( 'Line_Item',
				array(
					'LIN_name' => 'taxable',
					'LIN_type' => EEM_Line_Item::type_line_item,
					'LIN_is_taxable' => true,
					'LIN_total' => 10,
					'LIN_unit_price' => 10,
					'LIN_quantity' => 1,
					'LIN_parent' => $subtotal->ID(),
					'LIN_order' => 1,
					'OBJ_type' => 'Ticket',
				));
		$nontaxable = $this->new_model_obj_with_dependencies( 'Line_Item',
				array(
					'LIN_name' => 'taxable',
					'LIN_type' => EEM_Line_Item::type_line_item,
					'LIN_is_taxable' => false,
					'LIN_total' => 10,
					'LIN_unit_price' => 10,
					'LIN_quantity' => 1,
					'LIN_parent' => $subtotal->ID(),
					'LIN_order' => 2,
					'OBJ_type' => 'Ticket',
				));
		$discount = $this->new_model_obj_with_dependencies( 'Line_Item',
				array(
					'LIN_name' => 'discount',
					'LIN_type' => EEM_Line_Item::type_line_item,
					'LIN_is_taxable' => true,
					'LIN_total' => -10,
					'LIN_unit_price' => 0,
					'LIN_percent' => -50,
					'LIN_quantity' => 1,
					'LIN_parent' => $subtotal->ID(),
					'LIN_order' => 3,
				));
		$taxes_subtotal = $this->new_model_obj_with_dependencies( 'Line_Item',
				array(
					'LIN_name' => 'taxes',
					'LIN_type' => EEM_Line_Item::type_tax_sub_total,
					'LIN_percent' => 10,
					'LIN_parent' => $grand_total->ID(),
					'LIN_order' => 1,
				));

		$totals = EEH_Line_Item::calculate_reg_final_prices_per_line_item( $grand_total );
		$this->assertEquals( 5.5, $totals[ $taxable->ID() ] );
		$this->assertEquals( 5, $totals[ $nontaxable->ID() ] );
//		var_dump($totals);
//		EEH_Line_Item::visualize( $subtotal );
	}

	/**
	 * Verifies discounts only apply to the their sibling ticket line item's REG_final_prices
	 * @group 8541
	 */
	function test_calculate_reg_final_prices_per_line_item__discount_only_for_one_event_subtotal() {
		$grand_total = $this->new_model_obj_with_dependencies( 'Line_Item',
				array(
					'LIN_name' => 'total',
					'LIN_type' => EEM_Line_Item::type_total,
					'LIN_total' => 0
				));
		$subtotal_a = $this->new_model_obj_with_dependencies( 'Line_Item',
				array(
					'LIN_name' => 'subtotal_a',
					'LIN_type' => EEM_Line_Item::type_sub_total,
					'LIN_total' => 0,
					'LIN_unit_price' => 0,
					'LIN_quantity' => 0,
					'LIN_parent' => $grand_total->ID(),
					'LIN_order' => 0,
				));
		$subtotal_b = $this->new_model_obj_with_dependencies( 'Line_Item',
				array(
					'LIN_name' => 'subtotal_b',
					'LIN_type' => EEM_Line_Item::type_sub_total,
					'LIN_total' => 0,
					'LIN_unit_price' => 0,
					'LIN_quantity' => 0,
					'LIN_parent' => $grand_total->ID(),
					'LIN_order' => 1,
				));
		$ticket_line_item_a = $this->new_model_obj_with_dependencies( 'Line_Item',
				array(
					'LIN_name' => 'ticket_line_item_a',
					'LIN_type' => EEM_Line_Item::type_line_item,
					'LIN_is_taxable' => false,
					'LIN_total' => 10,
					'LIN_unit_price' => 10,
					'LIN_quantity' => 1,
					'LIN_parent' => $subtotal_a->ID(),
					'LIN_order' => 1,
					'OBJ_type' => 'Ticket',
				));
		$ticket_line_item_b = $this->new_model_obj_with_dependencies( 'Line_Item',
				array(
					'LIN_name' => 'ticket_line_item_b',
					'LIN_type' => EEM_Line_Item::type_line_item,
					'LIN_is_taxable' => false,
					'LIN_total' => 10,
					'LIN_unit_price' => 10,
					'LIN_quantity' => 1,
					'LIN_parent' => $subtotal_b->ID(),
					'LIN_order' => 1,
					'OBJ_type' => 'Ticket',
				));
		$discount_for_b = $this->new_model_obj_with_dependencies( 'Line_Item',
				array(
					'LIN_name' => 'discount_for_b',
					'LIN_type' => EEM_Line_Item::type_line_item,
					'LIN_is_taxable' => false,
					'LIN_total' => -5,
					'LIN_unit_price' => 0,
					'LIN_percent' => -50,
					'LIN_quantity' => 1,
					'LIN_parent' => $subtotal_b->ID(),
					'LIN_order' => 100,
				));
		$taxes_subtotal = $this->new_model_obj_with_dependencies( 'Line_Item',
				array(
					'LIN_name' => 'taxes',
					'LIN_type' => EEM_Line_Item::type_tax_sub_total,
					'LIN_percent' => 0,
					'LIN_parent' => $grand_total->ID(),
					'LIN_order' => 1,
				));

		$totals = EEH_Line_Item::calculate_reg_final_prices_per_line_item( $grand_total );
//		var_dump($totals);
//		EEH_Line_Item::visualize( $grand_total );
		//now verify the discount only applied to event B's ticket, not event A's
		$this->assertEquals( 10, $totals[ $ticket_line_item_a->ID() ] );
		$this->assertEquals( 5, $totals[ $ticket_line_item_b->ID() ] );
	}
        
        /**
         * @group 4710
         */
        function test_set_line_items_taxable() {
            $t = $this->new_typical_transaction( array( 'taxable_tickets' => 0 ) );
            EEH_Line_Item::add_unrelated_item( $t->total_line_item(), 'Excempt Line Item', 1, 'Description', 1, false, 'exemptme');
            $reg_line_items = EEH_Line_Item::get_descendants_of_type( $t->total_line_item(), EEM_Line_Item::type_line_item );
            foreach( $reg_line_items as $line_item ) {
                $this->assertFalse( $line_item->is_taxable(), print_r( $line_item->model_field_array(), true ) );
            }
            EEH_Line_Item::set_line_items_taxable( $t->total_line_item(), true, 'exemptme' );
            foreach( $reg_line_items as $line_item ) {
                if( $line_item->code() == 'exemptme' ) {
                    $this->assertFalse( $line_item->is_taxable(), print_r( $line_item->model_field_array(), true ) );
                } else {
                    $this->assertTrue( $line_item->is_taxable(), print_r( $line_item->model_field_array(), true ) );
                }
            }
        }


}

// End of file EEH_Line_Item_Test.php
// Location: /tests/testcases/core/helpers/EEH_Line_Item_Test.php