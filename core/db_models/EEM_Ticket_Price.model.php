<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link				http://www.eventespresso.com
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * Ticket Price Model
 *
 * @package			Event Espresso
 * @subpackage		includes/models/EEM_Ticket_Price.model.php
 * @author			Darren Ethier
 *
 * ------------------------------------------------------------------------
 */

require_once ( EE_CLASSES . 'EE_Ticket_Price.class.php' );
require_once ( EE_MODELS . 'EEM_Base.model.php' );

class EEM_Ticket_Price extends EEM_Base {

	// private instance of the EEM_Ticket_Price object
	protected static $_instance = NULL;

	/**
	 * 		private constructor to prevent direct creation
	 * 		@Constructor
	 * 		@access protected
	 * 		@param string $timezone string representing the timezone we want to set for returned Date Time Strings (and any incoming timezone data that gets saved).  Note this just sends the timezone info to the date time model field objects.  Default is NULL (and will be assumed using the set timezone in the 'timezone_string' wp option)
	 * 		@return void
	 */
	protected function __construct( $timezone ) {
		$this->singular_item = __('Ticket Price','event_espresso');
		$this->plural_item = __('Ticket Prices','event_espresso');

		$this->_tables = array(
			'Ticket_Price'=>new EE_Primary_Table('esp_ticket_price','TKP_ID')
		);
		$this->_fields = array(
			'Ticket_Price'=> array(
				'TKP_ID'=>new EE_Primary_Key_Int_Field('TKP_ID', 'Ticket Price ID'),
				'TKT_ID'=>new EE_Foreign_Key_Int_Field('TKT_ID', 'Ticket Id', false, 0, 'Ticket'),
				'PRC_ID'=>new EE_Foreign_Key_Int_Field('PRC_ID', 'Price ID', false, 0, 'Price'),
			)
		);
		$this->_model_relations = array(
			'Ticket'=>new EE_Belongs_To_Relation(),
			'Price'=>new EE_Belongs_To_Relation()
		);
		$this->_model_chain_to_wp_user = 'Ticket';
		$this->_cap_restriction_generators[ EEM_Base::caps_read ] = new EE_Restriction_Generator_Default_Public('Ticket.TKT_is_default', 'Ticket.Datetime.Event' );
		//account for default tickets in the caps
		$this->_cap_restriction_generators[ EEM_Base::caps_read_admin ] = new EE_Restriction_Generator_Default_Protected( 'Ticket.TKT_is_default', 'Ticket.Datetime.Event');
		$this->_cap_restriction_generators[ EEM_Base::caps_edit ] = new EE_Restriction_Generator_Default_Protected( 'Ticket.TKT_is_default', 'Ticket.Datetime.Event');
		$this->_cap_restriction_generators[ EEM_Base::caps_delete ] = new EE_Restriction_Generator_Default_Protected( 'Ticket.TKT_is_default', 'Ticket.Datetime.Event');
		//follow the caps of the ticket
		$this->_caps_slug = 'tickets';
		parent::__construct( $timezone );

	}


}
//end EEM_Ticket_Price class