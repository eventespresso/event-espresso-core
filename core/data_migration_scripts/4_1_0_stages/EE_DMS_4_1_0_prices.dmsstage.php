<?php

/**
 * Converts 3.1 prices to 4.1 tickets, prices, and associates those tickets to prices,
 * to events, and to datetimes.
 * For reference,3.1 price's table:
CREATE TABLE `wp_events_prices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `event_id` int(11) DEFAULT NULL,
  `price_type` varchar(50) DEFAULT NULL,
  `event_cost` decimal(20,2) NOT NULL DEFAULT '0.00',
  `surcharge` decimal(10,2) NOT NULL DEFAULT '0.00',
  `surcharge_type` varchar(10) DEFAULT NULL,
  `member_price_type` varchar(50) DEFAULT NULL,
  `member_price` decimal(20,2) NOT NULL DEFAULT '0.00',
  `max_qty` int(7) DEFAULT '0',
  `max_qty_members` int(7) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `event_id` (`event_id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8$$


4.1 tickets model table and fields:
 * $this->_tables = array(
			'Ticket'=> new EE_Primary_Table('esp_ticket', 'TKT_ID')
		);
		$this->_fields = array(
			'Ticket'=>array(
				'TKT_ID'=> new EE_Primary_Key_Int_Field('TKT_ID', __('Ticket ID','event_espresso')),
				'TTM_ID'=>new EE_Foreign_Key_Int_Field('TTM_ID', __('Ticket Template ID','event_espresso'), false, 0, 'Ticket_Template'),
				'TKT_name'=>new EE_Plain_Text_Field('TKT_name', __('Ticket Name', 'event_espresso'), false, ''),
				'TKT_description'=>new EE_Plain_Text_Field('TKT_description', __('Description of Ticket', 'event_espresso'), false, '' ),
				'TKT_start_date'=>new EE_Datetime_Field('TKT_start_date', __('Start time/date of Ticket','event_espresso'), false, time(), $timezone ),
				'TKT_end_date'=>new EE_Datetime_Field('TKT_end_date', __('End time/date of Ticket','event_espresso'), false, time(), $timezone ),
				'TKT_min'=>new EE_Integer_Field('TKT_min', __('Minimum quantity of this ticket that must be purchased', 'event_espresso'), false, 0 ),
				'TKT_max'=>new EE_Integer_Field('TKT_max', __('Maximum quantity of this ticket that can be purchased in one transaction', 'event_espresso'), false, -1 ),
				'TKT_price'=> new EE_Money_Field('TKT_price', 'Final calculated price for ticket', false, 0),
				'TKT_sold' => new EE_Integer_Field('TKT_sold', __('Number of this ticket sold', 'event_espresso'), false, 0),
				'TKT_qty'=>new EE_Integer_Field('TKT_qty', __('Quantity of this ticket that is available','event_espresso'), true, 0),
				'TKT_uses'=>new EE_Integer_Field('TKT_uses', __('Number of times this ticket can be used (per registration ) to Check-in before expiring', 'event_espresso'), TRUE, NULL ),
				'TKT_taxable'=>new EE_Boolean_Field('TKT_taxable', __("Flag indicating whether there is tax applied on this ticket", "event_espresso"), false,false),
				'TKT_is_default'=>new EE_Boolean_Field('TKT_is_default', __('Flag indicating that this ticket is a default ticket', 'event_espresso'), false, false ),
				'TKT_order' => new EE_Integer_Field('TKT_order', __('The order in which the Ticket is displayed in the editor (used for autosaves when the form doesn\'t have the ticket ID yet)', 'event_espresso'), false, 0),
				'TKT_row' => new EE_Integer_Field('TKT_row', __('How tickets are displayed in the ui', 'event_espresso'), false, 0 ),
				'TKT_deleted' => new EE_Trashed_Flag_Field('TKT_deleted', __('Flag indicating if this has been archived or not', 'event_espresso'), false, false),
				'TKT_parent' => new EE_Integer_Field('TKT_parent', __('Indicates what TKT_ID is the parent of this TKT_ID (used in autosaves/revisions)'), true, 0 )
			));
 * 4.1 prices:
 * $this->_tables = array(
			'Price'=>new EE_Primary_Table('esp_price','PRC_ID')
		);
		$this->_fields = array(
			'Price'=> array(
				'PRC_ID'=>new EE_Primary_Key_Int_Field('PRC_ID', 'Price ID'),
				'PRT_ID'=>new EE_Foreign_Key_Int_Field('PRT_ID', 'Price type Id', false, 1, 'Price_Type'),
				'PRC_amount'=>new EE_Money_Field('PRC_amount', 'Price Amount', false, 0),
				'PRC_name'=>new EE_Plain_Text_Field('PRC_name', 'Name of Price', false, ''),
				'PRC_desc'=>new EE_Simple_HTML_Field('PRC_desc', 'Price Description', false, ''),
				'PRC_is_default'=>new EE_Boolean_Field('PRC_is_default', 'Flag indicating whether price is a default price', false, true),
				'PRC_overrides'=>new EE_Integer_Field('PRC_overrides', 'Price ID for a global Price that will be overridden by this Price  ( for replacing default prices )', true, 0),
				'PRC_order'=>new EE_Integer_Field('PRC_order', 'Order of Application of Price (lower numbers apply first?)', false, 1),
				'PRC_deleted'=>new EE_Trashed_Flag_Field('PRC_deleted', 'Flag Indicating if this has been deleted or not', false, false),
				'PRC_parent' => new EE_Integer_Field('PRC_parent', __('Indicates what PRC_ID is the parent of this PRC_ID'), true, 0 )
			)
		);
 * 4.1 ticket_prices
 * $this->_tables = array(
			'Ticket_Price'=>new EE_Primary_Table('esp_ticket_price','TKP_ID')
		);
		$this->_fields = array(
			'Ticket_Price'=> array(
				'TKP_ID'=>new EE_Primary_Key_Int_Field('TKP_ID', 'Ticket Price ID'),
				'TKT_ID'=>new EE_Foreign_Key_Int_Field('TKT_ID', 'Ticket Id', false, 0, 'Ticket'),
				'PRC_ID'=>new EE_Foreign_Key_Int_Field('PRC_ID', 'Price ID', false, 0, 'Price'),
			)
		);
 * 4.1 datetime_ticket:
 * $this->_tables = array(
			'Datetime_Ticket'=> new EE_Primary_Table('esp_datetime_ticket', 'DTK_ID')
		);
		$this->_fields = array(
			'Datetime_Ticket'=>array(
				'DTK_ID'=>new EE_Primary_Key_Int_Field('DTK_ID', __('Datetime Ticket ID','event_espresso')),
				'DTT_ID'=>new EE_Foreign_Key_Int_Field('DTT_ID', __('The ID to the Datetime','event_espresso'), false, 0, 'Datetime' ),
				'TKT_ID'=>new EE_Foreign_Key_Int_Field('TKT_ID', __('The ID to the Ticket','event_espresso'), false, 0, 'Ticket' )
			));
 */

class EE_DMS_4_1_0_prices extends EE_Data_Migration_Script_Stage_Table{
	private $_new_price_table;
	private $_new_ticket_table;
	private $_new_ticket_price_table;
	private $_new_datetime_ticket_table;
	/**
	 * A count of all the different tickets created, used for setting the new ones' TKT_Order
	 * @var int
	 */
	private $_ticket_count = 0;
	const price_type_base = 1;
	const price_type_member_discount = 3;
	const price_type_percent_surcharge = 4;
	const price_type_flat_surcharge = 5;

	function __construct() {
		global $wpdb;
		$this->_pretty_name = __("Prices", "event_espresso");
		$this->_old_table = $wpdb->prefix."events_prices";
		$this->_new_price_table = $wpdb->prefix."esp_price";
		$this->_new_ticket_table = $wpdb->prefix."esp_ticket";
		$this->_new_ticket_price_table = $wpdb->prefix."esp_ticket_price";
		$this->_new_datetime_ticket_table = $wpdb->prefix."esp_datetime_ticket";
		parent::__construct();
	}
	protected function _migrate_old_row($old_row) {
		//create the base price
		$new_price_id = $this->_insert_new_price($old_row);
		//create the member discount if there is any
		//commented-out because we may actually NOT be supporting this in 4.1
//		if($old_row['event_cost'] != $old_row['member_price']){
//			$member_price_discount_id = $this->_insert_new_member_price($old_row);
//		}else{
//			$member_price_discount_id = 0;
//		}
		//create the surcharge if there is any
		if(floatval($old_row['surcharge']) >= 0.01){
			$surcharge_price_id = $this->_insert_new_surcharge_price($old_row);
			$this->get_migration_script()->set_mapping($this->_old_table, $old_row['id'], $this->_new_price_table, array($new_price_id,$surcharge_price_id));
		}else{
			$surcharge_price_id = 0;
			$this->get_migration_script()->set_mapping($this->_old_table, $old_row['id'], $this->_new_price_table, array($new_price_id));
		}
		//associate the ticket to all datetimes for event (ie, this ONE ticket grants access to ALL datetimes, not just one of the attendee's choice.
		//if the latter were the case, then we'd create a separate ticket for each datetime and ahve their association be one-to-one)
		//create ticket
//		$ticket_id = $this->_insert_new_ticket($old_row);
//		if($ticket_id){
//			$this->get_migration_script()->set_mapping($this->_old_table, $old_row['id'], $this->_new_ticket_table, $ticket_id);
//			//associate to the prices
//			$this->_insert_ticket_price_relation($ticket_id, $new_price_id);
//			$this->_insert_ticket_price_relation($ticket_id, $surcharge_price_id);
//			//associate to datetimes for the event
//			foreach($this->_get_datetime_ids_for_old_event_id($old_row['event_id']) as $new_datetime_id){
//				$this->_insert_datetime_ticket_relation($new_datetime_id, $ticket_id);
//			}
//		}
		//create a ticket for each old price -old datetime combo
		$tickets_for_old_price = array();
		foreach($this->_get_datetime_ids_for_old_event_id($old_row['event_id']) as $new_datetime_id){
			$ticket_id = $this->_insert_new_ticket($old_row);
			$tickets_for_old_price[] = $ticket_id;
			//associate to old prices
			$this->_insert_ticket_price_relation($ticket_id, $new_price_id);
			$this->_insert_ticket_price_relation($ticket_id, $surcharge_price_id);
			$this->_insert_datetime_ticket_relation($new_datetime_id, $ticket_id);
		}
		$this->get_migration_script()->set_mapping($this->_old_table, $old_row['id'], $this->_new_ticket_table, $tickets_for_old_price);

	}
	/**
	 * Creates a 4.1 price base type
	 * @global type $wpdb
	 * @param type $old_price
	 * @return int
	 */
	private function _insert_new_price($old_price){
		global $wpdb;
		$cols_n_values = array(
			'PRT_ID'=>self::price_type_base,
			'PRC_amount'=>floatval($old_price['event_cost']),
			'PRC_name'=>$old_price['price_type'],
			'PRC_is_default'=>false,
			'PRC_overrides'=>false,
			'PRC_order'=>0,
			'PRC_deleted'=>false,
			'PRC_parent'=>null

		);
		$datatypes = array(
			'%d',//PRT_ID
			'%f',//PRT_amount
			'%s',//PRC_name
			'%d',//PRC_is_default
			'%d',//PRC_overrides
			'%d',//PRC_order
			'%d',//PRC_deleted
			'%d',//PRC_parent
		);
		$success = $wpdb->insert($this->_new_price_table,$cols_n_values,$datatypes);
		if ( ! $success){
			$this->add_error($this->get_migration_script()->_create_error_message_for_db_insertion($this->_old_table, $old_price, $this->_new_price_table, $cols_n_values, $datatypes));
			return 0;
		}
		$new_id = $wpdb->insert_id;
		return $new_id;
	}
	/**
	 * Creates a 4.1 member price discount
	 * @global type $wpdb
	 * @param type $old_price
	 * @return int
	 */
//	private function _insert_new_member_price($old_price){
//		$discount_amount = floatval($old_price['event_cost']) - floatval($old_price['member_price']);
//		global $wpdb;
//		$cols_n_values = array(
//			'PRT_ID'=>self::price_type_member_discount,
//			'PRC_amount'=>$discount_amount,
//			'PRC_name'=>$old_price['member_price_type'],
//			'PRC_is_default'=>false,
//			'PRC_overrides'=>false,
//			'PRC_order'=>10,
//			'PRC_deleted'=>false,
//			'PRC_parent'=>null
//
//		);
//		$datatypes = array(
//			'%d',//PRT_ID
//			'%f',//PRT_amount
//			'%s',//PRC_name
//			'%d',//PRC_is_default
//			'%d',//PRC_overrides
//			'%d',//PRC_order
//			'%d',//PRC_deleted
//			'%d',//PRC_parent
//		);
//		$success = $wpdb->insert($this->_new_price_table,$cols_n_values,$datatypes);
//		if ( ! $success){
//			$this->add_error($this->get_migration_script()->_create_error_message_for_db_insertion($this->_old_table, $old_price, $this->_new_price_table, $cols_n_values, $datatypes));
//			return 0;
//		}
//		$new_id = $wpdb->insert_id;
//		return $new_id;
//	}
	/**
	 * Creates a 4.1 member price discount
	 * @global type $wpdb
	 * @param type $old_price
	 * @return int
	 */
	private function _insert_new_surcharge_price($old_price){

		if($old_price['surcharge_type'] == 'flat_rate'){
			$price_type = self::price_type_flat_surcharge;
		}else{
			$price_type = self::price_type_percent_surcharge;
		}
		global $wpdb;
		$cols_n_values = array(
			'PRT_ID'=>$price_type,
			'PRC_amount'=>floatval($old_price['surcharge']),
			'PRC_name'=>  __("Surcharge", "event_espresso"),
			'PRC_is_default'=>false,
			'PRC_overrides'=>false,
			'PRC_order'=>20,
			'PRC_deleted'=>false,
			'PRC_parent'=>null

		);
		$datatypes = array(
			'%d',//PRT_ID
			'%f',//PRT_amount
			'%s',//PRC_name
			'%d',//PRC_is_default
			'%d',//PRC_overrides
			'%d',//PRC_order
			'%d',//PRC_deleted
			'%d',//PRC_parent
		);
		$success = $wpdb->insert($this->_new_price_table,$cols_n_values,$datatypes);
		if ( ! $success){
			$this->add_error($this->get_migration_script()->_create_error_message_for_db_insertion($this->_old_table, $old_price, $this->_new_price_table, $cols_n_values, $datatypes));
			return 0;
		}
		$new_id = $wpdb->insert_id;
		return $new_id;
	}
	/**
	 * Inserts a 4.1 ticket based off the 3.1 price, and the price IDs we've already made from the 3.1 price
	 * @param $old_price_row array where keys are columns
	 * @param $new_base_price_id int
	 * @param $new_member_discount_id int
	 * @param $new_surcharge_id int
	 * @return int new ticket id
	 */
	private function _insert_new_ticket($old_price_row){
		global $wpdb;
		$event_row = $this->_get_event_row($old_price_row['event_id']);
		if($old_price_row['surcharge_type'] == 'flat_rate'){
			$final_ticket_price = floatval($old_price_row['event_cost']) + floatval($old_price_row['surcharge']);
		}else{//percent surcharge
			$final_ticket_price = floatval($old_price_row['event_cost']) * (1 + floatval($old_price_row['surcharge'])/100);
		}
		$start_date = $event_row['registration_start']." ".$this->get_migration_script()->convertTimeFromAMPM($event_row['registration_startT']);
		$start_date_utc = $this->get_migration_script()->convert_date_string_to_utc($this,$old_price_row,$start_date,$event_row['timezone_string']);
		$end_date = $event_row['registration_end']." ".$this->get_migration_script()->convertTimeFromAMPM($event_row['registration_endT']);
		$end_date_utc = $this->get_migration_script()->convert_date_string_to_utc($this,$old_price_row,$end_date,$event_row['timezone_string']);
		$cols_n_values = array(
			'TTM_ID'=>0,
			'TKT_name'=>$old_price_row['price_type'],
			'TKT_description'=>'',
			'TKT_start_date'=>$start_date_utc,
			'TKT_end_date'=>$end_date_utc,
			'TKT_min'=>0,
			'TKT_max'=>-1,
			'TKT_price'=>$final_ticket_price,
			'TKT_sold'=> 0,//note: this will get calculated as we actually add registrations during the migration
			'TKT_qty'=> -1,
			'TKT_uses'=> 1,
			'TKT_taxable'=>false,//so by default, old prices are NOT taxable. This way they don't suddenly have a sudden spike in prices
			'TKT_is_default'=>false,
			'TKT_order'=>$this->_get_ticket_count(),
			'TKT_row'=>0,//doesn't matter because UI reset this on first save anyways
			'TKT_deleted'=>false,
			'TKT_parent'=>0

		);
		$datatypes = array(
			'%d',//TTM_ID
			'%s',//TKT_name
			'%s',//TKT_description
			'%s',//TKT_start_date
			'%s',//TKT_end_date
			'%d',//TKT_min
			'%d',//TKT_max
			'%f',//TKT_price
			'%d',//TKT_sold
			'%d',//TKT_qty
			'%d',//TKT_uses
			'%d',//TKT_taxable
			'%d',//TKT_is_default
			'%d',//TKT_order
			'%d',//TKT_row
			'%d',//TKT_deleted
			'%d',//TKT_parent
		);
		$success = $wpdb->insert($this->_new_ticket_table,$cols_n_values,$datatypes);
		if ( ! $success){
			$this->add_error($this->get_migration_script()->_create_error_message_for_db_insertion($this->_old_table, $old_price_row, $this->_new_ticket_table, $cols_n_values, $datatypes));
			return 0;
		}
		$new_id = $wpdb->insert_id;
		return $new_id;
	}

	/**
	 * Adds a join between a ticket and a price
	 * @global type $wpdb
	 * @param type $new_ticket_id
	 * @param type $new_price_id
	 * @return int
	 */
	private function _insert_ticket_price_relation($new_ticket_id,$new_price_id){
		global $wpdb;
		$cols_n_values = array(
			'TKT_ID'=>$new_ticket_id,
			'PRC_ID'=>$new_price_id,
		);
		$datatypes = array(
			'%d',//TKT_ID
			'%d',//PRC_ID
		);
		$success = $wpdb->insert($this->_new_ticket_price_table,$cols_n_values,$datatypes);
		if ( ! $success){
			$this->add_error($this->get_migration_script()->_create_error_message_for_db_insertion($this->_old_table, array('ticket id'=>$new_ticket_id,'price id'=>$new_price_id), $this->_new_ticket_price_table, $cols_n_values, $datatypes));
			return 0;
		}
		$new_id = $wpdb->insert_id;
		return $new_id;
	}

	/**
	 * Adds a join between a ticket and a datetime
	 * @global type $wpdb
	 * @param type $new_ticket_id
	 * @param type $new_price_id
	 * @return int
	 */
	private function _insert_datetime_ticket_relation($new_datetime_id,$new_ticket_id){
		global $wpdb;
		$cols_n_values = array(
			'TKT_ID'=>$new_ticket_id,
			'DTT_ID'=>$new_datetime_id,
		);
		$datatypes = array(
			'%d',//TKT_ID
			'%d',//DTT_ID
		);
		$success = $wpdb->insert($this->_new_datetime_ticket_table,$cols_n_values,$datatypes);
		if ( ! $success){
			$this->add_error($this->get_migration_script()->_create_error_message_for_db_insertion($this->_old_table, array('ticket id'=>$new_ticket_id,'datetime id'=>$new_datetime_id), $this->_new_datetime_ticket_table, $cols_n_values, $datatypes));
			return 0;
		}
		$new_id = $wpdb->insert_id;
		return $new_id;
	}

	/**
	 * Simply gets the 3.1 event row data
	 * @global type $wpdb
	 * @param type $event_id
	 * @return array
	 */
	private function _get_event_row($event_id){
		global $wpdb;
		$old_event_table = $wpdb->prefix."events_detail";
		return $wpdb->get_row($wpdb->prepare("SELECT * FROM $old_event_table WHERE id=%d",$event_id),ARRAY_A);
	}
	/**
	 * Gets a higher ticket count than last time it was called (and is persisted between HTTP requests).
	 * Yes we COULD run a query joining events->datetimes->ticket_datetimes->tickets, but this should work fine too
	 * @return int
	 */
	private function _get_ticket_count(){
		return $this->_ticket_count++;
	}

	/**
	 * Using the 3.1 event id, gets the 4.1 datetimes for it
	 * @param int $old_event_id
	 * @return array where values are datetime ids
	 */
	private function _get_datetime_ids_for_old_event_id($old_event_id){
		global $wpdb;
		$new_cpt_id = $this->get_migration_script()->get_mapping_new_pk($wpdb->prefix."events_detail", $old_event_id, $wpdb->posts);
		$datetime_ids = $wpdb->get_col($wpdb->prepare("SELECT DTT_ID FROM {$wpdb->prefix}esp_datetime WHERE EVT_ID=%d",$new_cpt_id));
		return $datetime_ids;
	}
}
//@todo: tell users that in 3.1 the limit was on registration PER event,in 4.1 it's limit PER TICKET... SO, if they sell 2 different types of tickets
//
