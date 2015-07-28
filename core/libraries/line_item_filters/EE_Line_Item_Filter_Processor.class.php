<?php
if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * Class EE_Line_Item_Filter_Processor
 *
 * Description
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
	 * @param \EEI_Line_Item         $grand_total_line_item
	 */
	public function __construct( EE_Line_Item_Filter_Collection $line_item_filters, EEI_Line_Item $grand_total_line_item ) {
		$this->line_item_filters = $line_item_filters;
		$this->grand_total_line_item = clone( $grand_total_line_item );
	}



	/**
	 * process
	 *
	 * @return EEI_Line_Item
	 */
	public function process() {
		$this->line_item_filters->rewind();
		while ( $this->line_item_filters->valid() ) {
			$this->line_item_filters->current()->process( $this->grand_total_line_item );
			$this->line_item_filters->next();
		}
		return $this->grand_total_line_item;
	}


}
// End of file EE_Line_Item_Filter_Processor.class.php
// Location: /core/libraries/line_item_filters/EE_Line_Item_Filter_Processor.class.php