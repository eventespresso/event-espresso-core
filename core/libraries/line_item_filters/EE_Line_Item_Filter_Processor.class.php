<?php
if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * Class EE_Line_Item_Filter_Processor
 *
 * Receives an EE_Collection of EE_Line_Item_Filter objects
 * and an EEI_Line_Item grand total object upon construction
 * clones the entire grand total line item tree so that the original will not be affected
 * then process() applies each filter to the cloned grand total line item tree
 *
 * example:
 *
 * 		// make sure to setup autoloaders
 * 		EEH_Autoloader::register_line_item_filter_autoloaders();
 * 		// create a collection to hold our filters
 * 		$line_item_filter_collection = new EE_Line_Item_Filter_Collection();
 * 		$line_item_filter_collection->add( new EE_Billable_Line_Item_Filter( $array_of_EE_Registrations() ) );
 * 		$line_item_filter_collection->add( new EE_Non_Zero_Line_Item_Filter() );
 * 		// create the main processor, and pass it our filter collection, and a grand total line item
 * 		// which will be used to construct a clone of the entire line item tree
 * 		$line_item_filter_processor = new EE_Line_Item_Filter_Processor(
 * 			$line_item_filter_collection,
 * 			$EE_Cart->get_grand_total()
 * 		);
 * 		// then apply filters to the line item tree by calling process()
 * 		$filtered_line_item_tree = $line_item_filter_processor->process();
 * 		// the resultant filtered line item tree can then be passed along
 * 		// to other classes to do what they need to do, such as display
 *
 * @package               Event Espresso
 * @subpackage            core
 * @author                Brent Christensen
 * @since                 4.8.0
 *
 */
class EE_Line_Item_Filter_Processor {

	/**
	 * @type EE_Line_Item_Filter_Collection $line_item_filters
	 */
	protected $line_item_filters;

	/**
	 * @type EEI_Line_Item $grand_total_line_item
	 */
	protected $grand_total_line_item;



	/**
	 * EE_Line_Item_Filter_Processor constructor.
	 * @param \EE_Line_Item_Filter_Collection $line_item_filters
	 * @param \EEI_Line_Item                  $grand_total_line_item
	 * @throws \EE_Error
	 */
	public function __construct( EE_Line_Item_Filter_Collection $line_item_filters, EEI_Line_Item $grand_total_line_item ) {
		$this->line_item_filters = $line_item_filters;
		if ( $grand_total_line_item->type() !== EEM_Line_Item::type_total ) {
			throw new EE_Error( __( 'A Line Item of the type total is required', 'event_espresso' ) );
		}
		$this->grand_total_line_item = $this->clone_and_reset_line_item_tree( $grand_total_line_item );
	}



	/**
	 * clone_and_reset_line_item_tree
	 *
	 * @param \EEI_Line_Item $line_item
	 * @return \EEI_Line_Item
	 */
	protected function clone_and_reset_line_item_tree( EEI_Line_Item $line_item ) {
		$cloned_line_item = $this->clone_and_reset_line_item( $line_item );
		foreach ( $line_item->children() as $child_line_item ) {
			$cloned_line_item->add_child_line_item( $this->clone_and_reset_line_item_tree( $child_line_item ) );
		}
		return $cloned_line_item;
	}



	/**
	 * clone_and_reset_line_item
	 *
	 * clones the incoming object
	 * resets any fields that represent database primary keys
	 * resets total
	 *
	 * @param \EEI_Line_Item $line_item
	 * @return \EEI_Line_Item
	 */
	protected function clone_and_reset_line_item( EEI_Line_Item $line_item ) {
		// we don't actually want to work with the original line item, so clone it
		$cloned_line_item = clone $line_item;
		$cloned_line_item->set( 'LIN_ID', null );
		$cloned_line_item->set( 'LIN_parent', null );
		$cloned_line_item->clear_related_line_item_cache();
		foreach( array_keys( EEM_Line_Item::instance()->relation_settings() ) as $relation_name) {
			$cloned_line_item->clear_cache( $relation_name, null, true );
		}
		$cloned_line_item->set_allow_persist( false );
		return $cloned_line_item;
	}



	/**
	 * process
	 *
	 * @return EEI_Line_Item
	 */
	public function process() {
		$this->line_item_filters->rewind();
		while ( $this->line_item_filters->valid() ) {
			$this->grand_total_line_item = $this->line_item_filters->current()->process( $this->grand_total_line_item );
			$this->line_item_filters->next();
		}
		$this->grand_total_line_item->recalculate_total_including_taxes();
		return $this->grand_total_line_item;
	}



}
// End of file EE_Line_Item_Filter_Processor.class.php
// Location: /core/libraries/line_item_filters/EE_Line_Item_Filter_Processor.class.php