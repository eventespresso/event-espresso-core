<?php if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Taxes class
 *
 * @package               Event Espresso
 * @subpackage            includes/classes/EE_Taxes.class.php
 * @author                Brent Christensen
 */
class EE_Taxes extends EE_Base {

	/**
	 * This is used for when EE_Taxes is used statically by the admin
	 *
	 * @var array
	 */
	private static $_subtotal = array();

	/**
	 * This holds an array of EE_Price objects that are of PRT_ID == 4 (tax price types)
	 *
	 * @var EE_Price[]
	 */
	private static $_default_taxes = array();



	/**
	 * This method simply calculates the total taxes for a given ticket (by pulling the prices attached to the ticket
	 * and applying default taxes to it). Note: this is just an intermediary helper method added to facilitate quick
	 * calc of taxes for tickets listed in the event editor.
	 *
	 * @param  EE_Ticket $ticket incoming EE_Ticket
	 * @return float             total taxes to apply to ticket.
	 * @throws \EE_Error
	 */
	public static function get_total_taxes_for_admin( EE_Ticket $ticket ) {
		$tax = 0;
		$total_tax = 0;
		//This first checks to see if the given ticket is taxable.
		if ( ! $ticket->get( 'TKT_taxable' ) ) {
			return $tax;
		}
		//get subtotal (notice we're only retrieving a subtotal if there isn't one given)
		$subtotal = self::get_subtotal_for_admin( $ticket );
		//get taxes
		$taxes = self::get_taxes_for_admin();
		//apply taxes to subtotal
		foreach ( $taxes as $tax ) {
			//assuming taxes are not cumulative
			$total_tax += $subtotal * $tax->get( 'PRC_amount' ) / 100;
		}
		return $total_tax;
	}



	/**
	 * Gets the total percentage of tax that should be applied to taxable line items
	 *
	 * @return float the percentage of tax that should be added to taxable items
	 * @throws \EE_Error
	 * eg 20 for %20 tax (NOT 0.20, which
	 */
	public static function get_total_taxes_percentage() {
		$total_tax_percent = 0;
		foreach ( self::get_taxes_for_admin() as $tax_price ) {
			$total_tax_percent += $tax_price->get( 'PRC_amount' );
		}
		return $total_tax_percent;
	}



	/**
	 * @param EE_Ticket $ticket
	 * @return float
	 * @throws \EE_Error
	 */
	public static function get_subtotal_for_admin( EE_Ticket $ticket ) {
		$TKT_ID = $ticket->ID();
		return isset( self::$_subtotal[ $TKT_ID ] )
			? self::$_subtotal[ $TKT_ID ]
			: self::_get_subtotal_for_admin( $ticket );
	}



	/**
	 * simply take an incoming ticket and calculate the subtotal for the ticket
	 *
	 * @param  EE_Ticket $ticket
	 * @return float     subtotal calculated from all EE_Price[] on Ticket.
	 * @throws \EE_Error
	 */
	private static function _get_subtotal_for_admin( EE_Ticket $ticket ) {
		$subtotal = 0;
		//get all prices
		$prices = $ticket->get_many_related(
			'Price',
			array(
				'default_where_conditions' => 'none',
				'order_by'                 => array( 'PRC_order' => 'ASC' ),
			)
		);
		//let's loop through them (base price is always the first item)
		foreach ( $prices as $price ) {
			if ( $price instanceof EE_Price ) {
				$price_type = $price->type_obj();
				if ( $price_type instanceof EE_Price_Type ) {
					switch ( $price->type_obj()->base_type() ) {
						case 1: // base price
						case 3: // surcharges
							$subtotal += $price->is_percent() ? $subtotal * $price->get( 'PRC_amount' ) / 100
								: $price->get( 'PRC_amount' );
							break;
						case 2: // discounts
							$subtotal -= $price->is_percent() ? $subtotal * $price->get( 'PRC_amount' ) / 100
								: $price->get( 'PRC_amount' );
							break;
					}
				}
			}
		}
		$TKT_ID = $ticket->ID();
		self::$_subtotal = array( $TKT_ID => $subtotal );
		return $subtotal;
	}



	/**
	 * get all default prices that are a Tax price type (PRT_ID = 4) and return
	 *
	 * @return EE_Price[] EE_Price objects that have PRT_ID == 4
	 * @throws \EE_Error
	 */
	public static function get_taxes_for_admin() {
		if ( empty( self::$_default_taxes ) ) {
			self::$_default_taxes = EE_Registry::instance()->load_model( 'Price' )->get_all(
				array( array( 'Price_Type.PBT_ID' => 4 ) )
			);
		}
		return self::$_default_taxes;
	}



}





// End of file EE_Taxes.class.php
// Location: /includes/classes/EE_Taxes.class.php