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
	 * @param $context - where/how the line items are being displayed
	 */
	public function __construct( $context ) {
		$context = strtolower( $context );
		switch ( $context ) {
			case 'spco':
				$this->strategy = new EE_SPCO_Line_Item_Display_Strategy();
				break;
			case 'invoice':
				$this->strategy = new EE_Invoice_Line_Item_Display_Strategy();
				break;
			case 'receipt':
				$this->strategy = new EE_Receipt_Line_Item_Display_Strategy();
				break;
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

}



/**
 * Interface EEI_Line_Item_Display
 */
interface EEI_Line_Item_Display {

	/**
	 * @param EE_Line_Item $line_item
	 * @param array        $options
	 * @return mixed
	 */
	public function display_line_item( EE_Line_Item $line_item, $options = array() );

}
// End of file EE_Line_Item_Display.class.php
// Location: /EE_Line_Item_Display.class.php