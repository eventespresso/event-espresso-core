<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EE_Specific_Registrations_Line_Item_Filter_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 * @group 				Line_Item_Filter
 * @group                line-item-calculator
 */
class EE_Specific_Registrations_Line_Item_Filter_Test extends EE_UnitTestCase{
	function setUp(){
		parent::setUp();
		EEH_Autoloader::register_line_item_filter_autoloaders();
	}
	function test_process__1_taxless_ticket() {
		$grand_total = EE_Line_Item::new_instance( array(
			'LIN_type' => EEM_Line_Item::type_total,
			'LIN_name' => 'Total',
		));
		$pretax_total = EE_Line_Item::new_instance( array(
			'LIN_type' => EEM_Line_Item::type_sub_total,
			'LIN_code' => 'pretax',
			'LIN_name' => 'pretax',
			'LIN_order' => 1,
		));
		$grand_total->add_child_line_item( $pretax_total );

		$tax_total = EE_Line_Item::new_instance( array(
			'LIN_type' => EEM_Line_Item::type_tax_sub_total,
			'LIN_code' => 'tax-total',
			'LIN_name' => 'tax-total',
			'LIN_order' => 1000
		));
		$grand_total->add_child_line_item( $tax_total );
		$event_subtotal =  EE_Line_Item::new_instance( array(
			'LIN_type' => EEM_Line_Item::type_sub_total,
			'LIN_code' => 'event1',
			'LIN_name' => 'event1',
		) );
		$pretax_total->add_child_line_item( $event_subtotal );

		$ticket_quantities = array(
			1 => array(
				'included' => 2,
				'not' => 3
			)
		);
		$ticket_li = EE_Line_Item::new_instance( array(
			'LIN_type' => EEM_Line_Item::type_line_item,
			'LIN_code' => 'ticket1',
			'LIN_name' => 'ticket1',
			'OBJ_ID' => 1,
			'OBJ_type' => 'Ticket',
			'LIN_unit_price' => 10,
			'LIN_quantity' => 5
		));
		$event_subtotal->add_child_line_item( $ticket_li );
		$regs_to_include = $this->_create_regs( $ticket_quantities, $grand_total);
		//ok now let's use the filter
		$filter = new EE_Specific_Registrations_Line_Item_Filter( $regs_to_include );
		$filtered_total = $filter->process( $grand_total );
		//the filter doesn't recalculate totals, and it edits the inputted tree;
		//hat's ok, the processor does both of those. But we need to manually do it here
		$this->assertEquals( $grand_total, $filtered_total );
		$grand_total->recalculate_total_including_taxes();
		$this->assertEquals( 2, $ticket_li->quantity() );
		$this->assertEquals( 10, $ticket_li->unit_price() );
		$this->assertEquals( 20, $ticket_li->total() );
	}

	function test_process__1_taxless_ticket_and_percent_discount() {
		$grand_total = EE_Line_Item::new_instance( array(
			'LIN_type' => EEM_Line_Item::type_total,
			'LIN_name' => 'Total',
		));
		$pretax_total = EE_Line_Item::new_instance( array(
			'LIN_type' => EEM_Line_Item::type_sub_total,
			'LIN_code' => 'pretax',
			'LIN_name' => 'pretax',
			'LIN_order' => 1,
		));
		$grand_total->add_child_line_item( $pretax_total );

		$tax_total = EE_Line_Item::new_instance( array(
			'LIN_type' => EEM_Line_Item::type_tax_sub_total,
			'LIN_code' => 'tax-total',
			'LIN_name' => 'tax-total',
			'LIN_order' => 1000
		));
		$grand_total->add_child_line_item( $tax_total );
		$event_subtotal =  EE_Line_Item::new_instance( array(
			'LIN_type' => EEM_Line_Item::type_sub_total,
			'LIN_code' => 'event1',
			'LIN_name' => 'event1',
		) );
		$pretax_total->add_child_line_item( $event_subtotal );

		$ticket_quantities = array(
			1 => array(
				'included' => 4,
				'not' => 6
			)
		);
		$ticket_li = EE_Line_Item::new_instance( array(
			'LIN_type' => EEM_Line_Item::type_line_item,
			'LIN_code' => 'ticket1',
			'LIN_name' => 'ticket1',
			'OBJ_ID' => 1,
			'OBJ_type' => 'Ticket',
			'LIN_unit_price' => 10,
			'LIN_quantity' => 10,
			'LIN_total' => 100,
		));
		$event_subtotal->add_child_line_item( $ticket_li );

		$percent_discount_li = EE_Line_Item::new_instance( array(
			'LIN_type' => EEM_Line_Item::type_line_item,
			'LIN_code' => 'discount1',
			'LIN_name' => 'discount1',
			'LIN_unit_price' => 0,
			'LIN_percent' => -25,
			'LIN_total' => -25,
			'LIN_quantity' => 1
		));
		$event_subtotal->add_child_line_item( $percent_discount_li );
		//also need to make registrations
		$regs_to_include = $this->_create_regs( $ticket_quantities, $grand_total );
		//ok now let's use the filter
		$filter = new EE_Specific_Registrations_Line_Item_Filter( $regs_to_include );
		$filtered_total = $filter->process( $grand_total );
		//the filter doesn't recalculate totals, and it edits the inputted tree;
		//hat's ok, the processor does both of those. But we need to manually do it here
		$this->assertEquals( $grand_total, $filtered_total );
		$grand_total->recalculate_total_including_taxes();
		$this->assertEquals( 4, $ticket_li->quantity() );
		$this->assertEquals( 10, $ticket_li->unit_price() );
		$this->assertEquals( 40, $ticket_li->total() );
		//and verify the percent line item's total has changed, but not its percent
		$this->assertEquals( -25, $percent_discount_li->percent() );
		$this->assertEquals( -10, $percent_discount_li->total() );
	}


	function test_process__1_taxless_ticket_with_modifier_and_fixed_discount() {
		$grand_total = EE_Line_Item::new_instance( array(
			'LIN_type' => EEM_Line_Item::type_total,
			'LIN_name' => 'Total',
		));
		$pretax_total = EE_Line_Item::new_instance( array(
			'LIN_type' => EEM_Line_Item::type_sub_total,
			'LIN_code' => 'pretax',
			'LIN_name' => 'pretax',
			'LIN_order' => 1,
		));
		$grand_total->add_child_line_item( $pretax_total );

		$tax_total = EE_Line_Item::new_instance( array(
			'LIN_type' => EEM_Line_Item::type_tax_sub_total,
			'LIN_code' => 'tax-total',
			'LIN_name' => 'tax-total',
			'LIN_order' => 1000
		));
		$grand_total->add_child_line_item( $tax_total );
		$event_subtotal =  EE_Line_Item::new_instance( array(
			'LIN_type' => EEM_Line_Item::type_sub_total,
			'LIN_code' => 'event1',
			'LIN_name' => 'event1',
		) );
		$pretax_total->add_child_line_item( $event_subtotal );

		$ticket_quantities = array(
			1 => array(
				'included' => 5,
				'not' => 5
			)
		);
		$ticket_li = EE_Line_Item::new_instance( array(
			'LIN_type' => EEM_Line_Item::type_line_item,
			'LIN_code' => 'ticket1',
			'LIN_name' => 'ticket1',
			'OBJ_ID' => 1,
			'OBJ_type' => 'Ticket',
			'LIN_unit_price' => 10,
			'LIN_quantity' => 10,
			'LIN_total' => 100,
		));
		$event_subtotal->add_child_line_item( $ticket_li );

		$base_price_li = EE_Line_Item::new_instance( array(
			'LIN_type' => EEM_Line_Item::type_sub_line_item,
			'LIN_code' => 'price1',
			'LIN_name' => 'price1',
			'OBJ_ID' => 1,
			'OBJ_type' => 'Price',
			'LIN_unit_price' => 9,
			'LIN_quantity' => 10,
			'LIN_total' => 90,
		));
		$ticket_li->add_child_line_item( $base_price_li );

		$modifier_li = EE_Line_Item::new_instance( array(
			'LIN_type' => EEM_Line_Item::type_sub_line_item,
			'LIN_code' => 'price2',
			'LIN_name' => 'price2',
			'OBJ_ID' => 2,
			'OBJ_type' => 'Price',
			'LIN_unit_price' => 1,
			'LIN_quantity' => 10,
			'LIN_total' => 10,
		));
		$ticket_li->add_child_line_item( $modifier_li );

		$percent_discount_li = EE_Line_Item::new_instance( array(
			'LIN_type' => EEM_Line_Item::type_line_item,
			'LIN_code' => 'discount1',
			'LIN_name' => 'discount1',
			'LIN_unit_price' => -50,
			'LIN_percent' => 0,
			'LIN_total' => -50,
			'LIN_quantity' => 1
		));
		$event_subtotal->add_child_line_item( $percent_discount_li );
		//also need to make registrations
		$regs_to_include = $this->_create_regs( $ticket_quantities, $grand_total );
		//ok now let's use the filter
		$filter = new EE_Specific_Registrations_Line_Item_Filter( $regs_to_include );
		$filtered_total = $filter->process( $grand_total );
		//the filter doesn't recalculate totals, and it edits the inputted tree;
		//hat's ok, the processor does both of those. But we need to manually do it here
		$this->assertEquals( $grand_total, $filtered_total );
		$grand_total->recalculate_total_including_taxes();
		$this->assertEquals( 5, $ticket_li->quantity() );
		$this->assertEquals( 10, $ticket_li->unit_price() );
		$this->assertEquals( 50, $ticket_li->total() );
		//and verify the percent line item's total has changed, but not its percent
		$this->assertEquals( -25, $percent_discount_li->unit_price() );
		$this->assertEquals( -25, $percent_discount_li->total() );
	}


/**
 * @group 2_events_some_taxed_with_discounts
 */
function test_process__2_events_some_taxed_with_discounts() {
		$grand_total = EE_Line_Item::new_instance( array(
			'LIN_type' => EEM_Line_Item::type_total,
			'LIN_name' => 'Total',
		));
		$pretax_total = EE_Line_Item::new_instance( array(
			'LIN_type' => EEM_Line_Item::type_sub_total,
			'LIN_code' => 'pretax',
			'LIN_name' => 'pretax',
			'LIN_order' => 1,
		));
		$grand_total->add_child_line_item( $pretax_total );

		$tax_total = EE_Line_Item::new_instance( array(
			'LIN_type' => EEM_Line_Item::type_tax_sub_total,
			'LIN_code' => 'tax-total',
			'LIN_name' => 'tax-total',
			'LIN_order' => 1000
		));
		$grand_total->add_child_line_item( $tax_total );

		$a_tax = EE_Line_Item::new_instance( array(
			'LIN_type' => EEM_Line_Item::type_tax,
			'LIN_code' => 'tax',
			'LIN_name' => 'tax',
			'LIN_percent' => 10,
			'LIN_order' => 1000
		));
		$tax_total->add_child_line_item( $a_tax );

		$event_A_subtotal =  EE_Line_Item::new_instance( array(
			'LIN_type' => EEM_Line_Item::type_sub_total,
			'LIN_code' => 'eventA',
			'LIN_name' => 'eventA',
			'LIN_order' => 1,
		) );
		$pretax_total->add_child_line_item( $event_A_subtotal );

		$event_B_subtotal =  EE_Line_Item::new_instance( array(
			'LIN_type' => EEM_Line_Item::type_sub_total,
			'LIN_code' => 'eventB',
			'LIN_name' => 'eventB',
			'LIN_order' => 2,
		) );
		$pretax_total->add_child_line_item( $event_B_subtotal );

		$ticket_quantities = array(
			1 => array(
				'included' => 4,
				'not' => 6
			),
			2 => array(
				'included' => 0,
				'not' => 2,
			),
			3 => array(
				'included' => 1,
				'not' => 0
			)
		);
		$ticket_1_li = EE_Line_Item::new_instance( array(
			'LIN_type' => EEM_Line_Item::type_line_item,
			'LIN_code' => 'ticket1',
			'LIN_name' => 'ticket1',
			'OBJ_ID' => 1,
			'OBJ_type' => 'Ticket',
			'LIN_unit_price' => 10,
			'LIN_quantity' => $ticket_quantities[1]['included'] + $ticket_quantities[1]['not'],
			'LIN_total' => 100,
			'LIN_is_taxable' => false,
			'LIN_order' => 1,
		));
		$event_A_subtotal->add_child_line_item( $ticket_1_li );

		$ticket_2_li = EE_Line_Item::new_instance( array(
			'LIN_type' => EEM_Line_Item::type_line_item,
			'LIN_code' => 'ticket2',
			'LIN_name' => 'ticket2',
			'OBJ_ID' => 2,
			'OBJ_type' => 'Ticket',
			'LIN_unit_price' => 50,
			'LIN_quantity' =>  $ticket_quantities[2]['included'] + $ticket_quantities[2]['not'],
			'LIN_total' => 50,
			'LIN_is_taxable' => true,
			'LIN_order' => 2,
		));
		$event_A_subtotal->add_child_line_item( $ticket_2_li );

		$percent_discount_li = EE_Line_Item::new_instance( array(
			'LIN_type' => EEM_Line_Item::type_line_item,
			'LIN_code' => 'discount-percent',
			'LIN_name' => 'discount-percent',
			'LIN_unit_price' => 0,
			'LIN_percent' => -25,
			'LIN_total' => -50,
			'LIN_quantity' => 1,
			'LIN_order' => 3,
		));
		$event_A_subtotal->add_child_line_item( $percent_discount_li );

		$flat_discount_li = EE_Line_Item::new_instance( array(
			'LIN_type' => EEM_Line_Item::type_line_item,
			'LIN_code' => 'discount-flat',
			'LIN_name' => 'discount-flat',
			'LIN_unit_price' => 0,
			'LIN_percent' => 0,
			'LIN_unit_price' => -10,
			'LIN_total' => -10,
			'LIN_quantity' => 1,
			'LIN_order' => 4,
		));
		$event_A_subtotal->add_child_line_item( $flat_discount_li );

		//and add something to event B
		$ticket_3_li = EE_Line_Item::new_instance( array(
			'LIN_type' => EEM_Line_Item::type_line_item,
			'LIN_code' => 'ticket3',
			'LIN_name' => 'ticket3',
			'OBJ_ID' => 3,
			'OBJ_type' => 'Ticket',
			'LIN_unit_price' => 35,
			'LIN_quantity' => $ticket_quantities[3]['included'] + $ticket_quantities[3]['not'],
			'LIN_total' => 35,
			'LIN_is_taxable' => true,
		));
		$event_B_subtotal->add_child_line_item( $ticket_3_li );
        // echo "BEFORE tree:";
        // EEH_Line_Item::visualize($grand_total);

		//also need to make registrations
		$regs_to_include = $this->_create_regs( $ticket_quantities, $grand_total );

		//ok now let's use the filter
		$filter = new EE_Specific_Registrations_Line_Item_Filter( $regs_to_include );
		$filtered_total = $filter->process( $grand_total );
		// echo "AFTER tree:";
		// EEH_Line_Item::visualize($filtered_total );
		//the filter doesn't recalculate totals, and it edits the inputted tree;
		//hat's ok, the processor does both of those. But we need to manually do it here
		$this->assertEquals( $grand_total, $filtered_total );
		$grand_total->recalculate_total_including_taxes();
		//check ticket 1
		$this->assertEquals( 4, $ticket_1_li->quantity() );
		$this->assertEquals( 10, $ticket_1_li->unit_price() );
		$this->assertEquals( 40, $ticket_1_li->total() );
		//check ticket 2
		$this->assertEquals( 0, $ticket_2_li->quantity() );
		$this->assertEquals( 50, $ticket_2_li->unit_price() );
		$this->assertEquals( 0, $ticket_2_li->total() );
		//and verify the percent line item's total has changed, but not its percent
		$this->assertEquals( -25, $percent_discount_li->percent() );
		$this->assertEquals( -10, $percent_discount_li->total() );
		//flat discount is tricky. we only show the PART of the flat discount
		//that applied to the tickets shown. To determine that, we see what
		//percent of the original discount was of the original total, and then multiply
		//the new total by that percent.
		//the original total = ticket1's-total + ticket2's-total + percent-discount
		// = 100 + 100 - 50 = 150
		//flat discount's original percent of total = flat-discount / original total
		// = -10 / 150 = 0.0666666
		//new total = ticket1's-filtered-total + ticket2's-filtered-total + percent-discount-for-filtered-total
		// = 40 + 0 - 10 = 30
		//new flat total = flat discount's original percent of total x new total
		// = 0.0666666 x 30 = 1.9999999
		$this->assertEquals( 1, $flat_discount_li->quantity() );
		$this->assertEquals( -2, $flat_discount_li->unit_price() );
		$this->assertEquals( -2, $flat_discount_li->total() );
		//other event's ticket purchase
		$this->assertEquals( 1, $ticket_3_li->quantity() );
		$this->assertEquals( 35, $ticket_3_li->unit_price() );
		$this->assertEquals( 35, $ticket_3_li->total() );
	}


    /**
     * Creates a bunch of registrations and returns an array of all the "approved" ones
     *
     * @param array        $ticket_quantities top-level-keys are ticket IDs,
     *                                        next-level keys are either 'included' or 'not'.
     * @param EE_Line_Item $grand_total
     * @return array flat array of all the registrations that were for 'included'
     * @throws EE_Error
     * @throws ReflectionException
     */
	protected function _create_regs(array $ticket_quantities, EE_Line_Item $grand_total ): array {
        $txn = $this->new_model_obj_with_dependencies('Transaction');
        $regs_to_include = [];
        foreach ($ticket_quantities as $ticket_id => $approved_or_not_counts) {
            foreach ($approved_or_not_counts as $key => $count) {
                for ($i = 0; $i < $count; $i++) {
                    $r = $this->new_model_obj_with_dependencies(
                        'Registration',
                        ['TXN_ID' => $txn->ID(), 'TKT_ID' => $ticket_id]
                    );
                    if ($key == 'included') {
                        $regs_to_include[] = $r;
                    }
                }
            }
        }
        $grand_total->save_this_and_descendants_to_txn($txn->ID());
        return $regs_to_include;
    }

}

// End of file EE_Specific_Registrations_Line_Item_Filter_Test.php