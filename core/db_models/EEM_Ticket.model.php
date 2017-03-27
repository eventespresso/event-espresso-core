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
 * @ link					http://www.eventespresso.com
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 *	Ticket Model
 *
 * @package			Event Espresso
 * @subpackage		includes/models/EEM_Ticket.model.php
 * @author			Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
require_once ( EE_MODELS . 'EEM_Soft_Delete_Base.model.php' );
require_once ( EE_CLASSES . 'EE_Ticket.class.php' );

class EEM_Ticket extends EEM_Soft_Delete_Base {

	// private instance of the EEM_Ticket object
	protected static $_instance = NULL;

	/**
	 *		private constructor to prevent direct creation
	 *		@Constructor
	 *		@access private
	 *		@param string $timezone string representing the timezone we want to set for returned Date Time Strings (and any incoming timezone data that gets saved).  Note this just sends the timezone info to the date time model field objects.  Default is NULL (and will be assumed using the set timezone in the 'timezone_string' wp option)
	 */
	protected function __construct( $timezone ) {
		$this->singular_item = __('Ticket','event_espresso');
		$this->plural_item = __('Tickets','event_espresso');

		$this->_tables = array(
			'Ticket'=> new EE_Primary_Table('esp_ticket', 'TKT_ID')
		);
		$this->_fields = array(
			'Ticket'=>array(
				'TKT_ID'=> new EE_Primary_Key_Int_Field('TKT_ID', __('Ticket ID','event_espresso')),
				'TTM_ID'=>new EE_Foreign_Key_Int_Field('TTM_ID', __('Ticket Template ID','event_espresso'), false, 0, 'Ticket_Template'),
				'TKT_name'=>new EE_Plain_Text_Field('TKT_name', __('Ticket Name', 'event_espresso'), false, ''),
				'TKT_description'=>new EE_Post_Content_Field('TKT_description', __('Description of Ticket', 'event_espresso'), false, '' ),
				'TKT_start_date'=>new EE_Datetime_Field('TKT_start_date', __('Start time/date of Ticket','event_espresso'), false, EE_Datetime_Field::now, $timezone ),
				'TKT_end_date'=>new EE_Datetime_Field('TKT_end_date', __('End time/date of Ticket','event_espresso'), false, EE_Datetime_Field::now, $timezone ),
				'TKT_min'=>new EE_Integer_Field('TKT_min', __('Minimum quantity of this ticket that must be purchased', 'event_espresso'), false, 0 ),
				'TKT_max'=>new EE_Infinite_Integer_Field('TKT_max', __('Maximum quantity of this ticket that can be purchased in one transaction', 'event_espresso'), false, EE_INF ),
				'TKT_price'=> new EE_Money_Field('TKT_price', 'Final calculated price for ticket', false, 0),
				'TKT_sold' => new EE_Integer_Field('TKT_sold', __('Number of this ticket sold', 'event_espresso'), false, 0),
				'TKT_qty'=>new EE_Infinite_Integer_Field('TKT_qty', __('Quantity of this ticket that is available','event_espresso'), false, EE_INF),
				'TKT_reserved'=>new EE_Integer_Field('TKT_reserved', __('Quantity of this ticket that is reserved, but not yet fully purchased','event_espresso'), false, 0 ),
				'TKT_uses'=>new EE_Infinite_Integer_Field('TKT_uses', __('Number of datetimes this ticket can be used at', 'event_espresso'), false, EE_INF ),
				'TKT_required'=>new EE_Boolean_Field('TKT_required', __("Flag indicating whether this ticket must be purchased with a transaction", "event_espresso"), false, false ),
				'TKT_taxable'=>new EE_Boolean_Field('TKT_taxable', __("Flag indicating whether there is tax applied on this ticket", "event_espresso"), false,false),
				'TKT_is_default'=>new EE_Boolean_Field('TKT_is_default', __('Flag indicating that this ticket is a default ticket', 'event_espresso'), false, false ),
				'TKT_order' => new EE_Integer_Field('TKT_order', __('The order in which the Ticket is displayed in the editor (used for autosaves when the form doesn\'t have the ticket ID yet)', 'event_espresso'), false, 0),
				'TKT_row' => new EE_Integer_Field('TKT_row', __('How tickets are displayed in the ui', 'event_espresso'), false, 0 ),
				'TKT_deleted' => new EE_Trashed_Flag_Field('TKT_deleted', __('Flag indicating if this has been archived or not', 'event_espresso'), false, false),
				'TKT_wp_user' => new EE_WP_User_Field('TKT_wp_user', __('Ticket Creator ID', 'event_espresso'), FALSE ),
				'TKT_parent' => new EE_Integer_Field('TKT_parent', __('Indicates what TKT_ID is the parent of this TKT_ID (used in autosaves/revisions)'), true, 0 )
			));
		$this->_model_relations = array(
			'Datetime'=>new EE_HABTM_Relation('Datetime_Ticket'),
			'Datetime_Ticket'=>new EE_Has_Many_Relation(),
			'Price'=>new EE_HABTM_Relation('Ticket_Price'),
			'Ticket_Template'=>new EE_Belongs_To_Relation(),
			'Registration' => new EE_Has_Many_Relation(),
			'WP_User' => new EE_Belongs_To_Relation(),
		);

		//this model is generally available for reading
		$this->_cap_restriction_generators[ EEM_Base::caps_read ] = new EE_Restriction_Generator_Default_Public('TKT_is_default', 'Datetime.Event');
		//account for default tickets in the caps
		$this->_cap_restriction_generators[ EEM_Base::caps_read_admin ] = new EE_Restriction_Generator_Default_Protected( 'TKT_is_default', 'Datetime.Event' );
		$this->_cap_restriction_generators[ EEM_Base::caps_edit ] = new EE_Restriction_Generator_Default_Protected( 'TKT_is_default', 'Datetime.Event' );
		$this->_cap_restriction_generators[ EEM_Base::caps_delete ] = new EE_Restriction_Generator_Default_Protected( 'TKT_is_default', 'Datetime.Event' );
		parent::__construct( $timezone );
	}



	/**
	 * This returns all tickets that are defaults from the db
	 * @return EE_Ticket[]
	 */
	public function get_all_default_tickets() {
		/** @type EE_Ticket[] $tickets */
		$tickets = $this->get_all( array( array('TKT_is_default' => 1), 'order_by' => array('TKT_ID' => 'ASC')) );
		//we need to set the start date and end date to today's date and the start of the default dtt
		return $this->_set_default_dates( $tickets );
	}



	/**
	 * sets up relevant start and end date for EE_Ticket (s)
	 * @param EE_Ticket[] $tickets
	 * @return EE_Ticket[]
	 */
	private function _set_default_dates( $tickets ) {
		foreach ( $tickets as $ticket ) {
			$ticket->set('TKT_start_date', (int)$this->current_time_for_query('TKT_start_date', true) );
			$ticket->set('TKT_end_date', (int)$this->current_time_for_query( 'TKT_end_date', true ) + (60 * 60 * 24 * 30 ) );
			$ticket->set_end_time( $this->convert_datetime_for_query( 'TKT_end_date', '11:59 pm', 'g:i a', $this->_timezone ) );
		}

		return $tickets;
	}



	/**
	 * Gets the total number of tickets available at a particular datetime (does
	 * NOT take int account the datetime's spaces available)
	 * @param int   $DTT_ID
	 * @param array $query_params
	 * @return int
	 */
	public function sum_tickets_currently_available_at_datetime($DTT_ID, $query_params = array()){
		return EEM_Datetime::instance()->sum_tickets_currently_available_at_datetime( $DTT_ID, $query_params );
	}



    /**
     * Updates the TKT_sold quantity on all the tickets matching $query_params
     *
     * @param EE_Ticket[] $tickets
     * @return void
     * @throws \EE_Error
     */
	public function update_tickets_sold($tickets){
		foreach($tickets as $ticket){
			/* @var  $ticket EE_Ticket */
			$ticket->update_tickets_sold();
		}
	}



    /**
     * returns an array of EE_Ticket objects with a non-zero value for TKT_reserved
     *
     * @return EE_Base_Class[]|EE_Ticket[]
     * @throws \EE_Error
     */
    public function get_tickets_with_reservations()
    {
        return $this->get_all(
            array(
                array(
                    'TKT_reserved' => array( '>', 0 )
                )
            )
        );
	}



    /**
     * returns an array of EE_Ticket objects matching the supplied list of IDs
     *
     * @param array $ticket_IDs
     * @return EE_Base_Class[]|EE_Ticket[]
     * @throws \EE_Error
     */
    public function get_tickets_with_IDs(array $ticket_IDs)
    {
        return $this->get_all(
            array(
                array(
                    'TKT_ID' => array( 'IN', $ticket_IDs )
                )
            )
        );
	}



}
//end EEM_Ticket model
