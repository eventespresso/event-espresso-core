<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EE_Line_Item__EE_Single_Registration_Line_Item_Filter__Integration_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EE_Line_Item__EE_Single_Registration_Line_Item_Filter__Integration_Test extends EE_UnitTestCase{
	/**
	 * creates a rather complex transaction, uses EEH_Line_Item::calculate_reg_final_prices_per_line_item
	 * and compares its results to what EE_Single_Registration_Line_Item_Filter() would return.
	 * Both of them should calculate the same REG_final_prices, except for a minor rounding
	 * differences
	 */
	function test_REG_final_price_matches_total_of_filtering_line_item_tree() {
		$transaction = $this->new_typical_transaction( array( 'ticket_types' => 2 ) );
		//add another ticket purchase for one of the same events
		$event1 = EEM_Event::instance()->get_one(
			array( array( 'Registration.TXN_ID' => $transaction->ID() ) )
		);
		$event_line_item = EEM_Line_Item::instance()->get_one(
			array(
				array(
					'TXN_ID'   => $transaction->ID(),
					'OBJ_type' => 'Event',
					'OBJ_ID'   => $event1->ID(),
				),
			)
		);
		$this->new_model_obj_with_dependencies(
			'Line_Item',
			array(
				'LIN_type' => EEM_Line_Item::type_line_item,
				'LIN_name' => 'event discount',
				'LIN_total' => -8,
				'LIN_unit_price' => -8,
				'LIN_quantity' => 1,
				'LIN_parent' => $event_line_item->ID(),
				'LIN_percent' => null,
				'LIN_order' => count( $event_line_item->children() )
			)
		);
		$total_line_item = $transaction->total_line_item();
		$total_line_item->recalculate_total_including_taxes();
		//and add an unrelated purchase
		EEH_Line_Item::add_unrelated_item( $total_line_item, 'Transaction-Wide Discount', -5 );
		$totals = EEH_Line_Item::calculate_reg_final_prices_per_line_item( $total_line_item );
		// honestly the easiest way to confirm the total was right is to visualize the tree
		// echo "\n\n " . __LINE__ . ') : visualize( $total_line_item )';
		// EEH_Line_Item::visualize( $total_line_item );
		// echo "\n\n " . __LINE__ . ') : $totals' . "\n";
		// var_dump( $totals );

		//for each registration on the transaction, verify the REG_final_price
		//indicated by EEH_Line_Item::calculate_reg_final_prices_per_line_item matches
		//what the line item filters would have returned
		EEH_Autoloader::register_line_item_filter_autoloaders();
		foreach( $transaction->registrations() as $registration ) {
			$ticket_line_item = EEM_Line_Item::instance()->get_line_item_for_registration( $registration );
			$reg_final_price_from_line_item_helper = $totals[ $ticket_line_item->ID() ];
			//now get the line item filter's final price
			$filters = new EE_Line_Item_Filter_Collection();
			$filters->add( new EE_Single_Registration_Line_Item_Filter( $registration ) );
			$line_item_filter_processor = new EE_Line_Item_Filter_Processor( $filters, $total_line_item  );
			$filtered_line_item_tree = $line_item_filter_processor->process();
			// echo "\n\n " . __LINE__ . ') : visualize( $filtered_line_item_tree )';
			// EEH_Line_Item::visualize( $filtered_line_item_tree );
			$reg_final_price_from_line_item_filter = $filtered_line_item_tree->total();
			$this->assertLessThan( 0.2, abs( $reg_final_price_from_line_item_filter - $reg_final_price_from_line_item_helper ) );
		}
	}

	/**
	 * like test_REG_final_price_matches_total_of_filtering_line_item_tree,
	 * but makes sure the tickets have sub-prices, because that has shown to have some
	 * bugs with calculations so far
	 */
	function test_REG_final_price_matches_total_of_filtering_line_item_tree__with_sub_line_items() {
		$transaction = $this->new_typical_transaction(
			array(
				'ticket_types' => 2,
			)
		);
		//add another ticket purchase for one of the same events
		$event1 = EEM_Event::instance()->get_one(
			array( array( 'Registration.TXN_ID' => $transaction->ID() ) )
		);
		$event_line_item = EEM_Line_Item::instance()->get_one(
			array(
				array(
					'TXN_ID' => $transaction->ID(),
					'OBJ_type' => 'Event',
					'OBJ_ID' => $event1->ID()
				)
			)
		);
		$this->new_model_obj_with_dependencies(
			'Line_Item',
			array(
				'LIN_type' => EEM_Line_Item::type_line_item,
				'LIN_name' => 'event discount',
				'LIN_total' => -8,
				'LIN_unit_price' => -8,
				'LIN_quantity' => 1,
				'LIN_parent' => $event_line_item->ID(),
				'LIN_percent' => null,
				'LIN_order' => count( $event_line_item->children() )
			)
		);
		$total_line_item = $transaction->total_line_item();
		$total_line_item->recalculate_total_including_taxes();
		//and add an unrelated purchase
		EEH_Line_Item::add_unrelated_item( $total_line_item, 'Transaction-Wide Discount', -5 );

		$totals = EEH_Line_Item::calculate_reg_final_prices_per_line_item( $total_line_item );

		//		honestly the easiest way to confirm the total was right is to visualize the tree
//		var_dump( $totals );
//		EEH_Line_Item::visualize( $total_line_item );

		//for each registration on the transaction, verify the REG_final_price
		//indicated by EEH_Line_Item::calculate_reg_final_prices_per_line_item matches
		//what the line item filters would have returned
		EEH_Autoloader::register_line_item_filter_autoloaders();
		foreach( $transaction->registrations() as $registration ) {
			$ticket_line_item = EEM_Line_Item::instance()->get_line_item_for_registration( $registration );
			$reg_final_price_from_line_item_helper = $totals[ $ticket_line_item->ID() ];

			//now get the line item filter's final price
			$filters = new EE_Line_Item_Filter_Collection();
			$filters->add( new EE_Single_Registration_Line_Item_Filter( $registration ) );
			$line_item_filter_processor = new EE_Line_Item_Filter_Processor( $filters, $total_line_item  );
			$filtered_line_item_tree = $line_item_filter_processor->process();
			$reg_final_price_from_line_item_filter = $filtered_line_item_tree->total();

			$this->assertLessThan( 0.2, abs( $reg_final_price_from_line_item_filter - $reg_final_price_from_line_item_helper ) );
		}
	}



}

// End of file EE_Line_Item__EE_Single_Registration_Line_Item_Filter__Integration_Test.php
// Location: testcases/integration/EE_Line_Item__EE_Single_Registration_Line_Item_Filter__Integration_Test.php