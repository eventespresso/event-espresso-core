<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
 /**
 *
 * Class EE_Line_Item_Display
 *
 * Description
 *
 * @package         Event Espresso
 * @subpackage    core
 * @author				Brent Christensen
 * @since		 	   $VID:$
 *
 */
class EE_Line_Item_Display {

	private $strategy = NULL;



	/**
	 * @param string $context - where/how the line items are being displayed
	 * @param string $other_line_item_display_strategy
	 */
	public function __construct( $context = '', $other_line_item_display_strategy = '' ) {
		$context = strtolower( $context );
		switch ( $context ) {
			case 'invoice' :
				$this->strategy = new EE_Invoice_Line_Item_Display_Strategy();
				break;
			case 'receipt' :
				$this->strategy = new EE_Receipt_Line_Item_Display_Strategy();
				break;
			case 'spco' :
				$this->strategy = new EE_SPCO_Line_Item_Display_Strategy();
				break;
			default :
				if (
					! empty( $other_line_item_display_strategy ) &&
					class_exists( $other_line_item_display_strategy )
				) {
					$this->strategy = new  $other_line_item_display_strategy();
				} else {
					$this->strategy = new EE_Default_Line_Item_Display_Strategy();
				}
		}
	}

	/**
	 * @param EE_Line_Item $line_item
	 * @param array        $options
	 * @return mixed
	 */
	public function display_line_item( EE_Line_Item $line_item, $options = array() ) {
		return $this->strategy->display_line_item( $line_item, $options );
	}



	/**
	 * @return float
	 */
	public function grand_total() {
		return $this->strategy->grand_total();
	}



	/**
	 * @return float
	 */
	public function total_items() {
		return $this->strategy->total_items();
	}

}



// End of file EE_Line_Item_Display.class.php
// Location: /EE_Line_Item_Display.class.php