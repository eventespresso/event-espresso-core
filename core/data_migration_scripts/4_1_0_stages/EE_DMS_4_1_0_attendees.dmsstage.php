<?php
/**
 * migrates 3.1 attendee rows into 4.1 registrations, attendees, transactions, line items, payments
 *
 * 3.1 Attendee table definition:
 * delimiter $$

CREATE TABLE `wp_events_detail` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `event_code` varchar(26) DEFAULT '0',
  `event_name` varchar(100) DEFAULT NULL,
  `event_desc` text,
  `display_desc` varchar(1) DEFAULT 'Y',
  `display_reg_form` varchar(1) DEFAULT 'Y',
  `event_identifier` varchar(75) DEFAULT NULL,
  `start_date` varchar(15) DEFAULT NULL,
  `end_date` varchar(15) DEFAULT NULL,
  `registration_start` varchar(15) DEFAULT NULL,
  `registration_end` varchar(15) DEFAULT NULL,
  `registration_startT` varchar(15) DEFAULT NULL,
  `registration_endT` varchar(15) DEFAULT NULL,
  `visible_on` varchar(15) DEFAULT NULL,
  `address` text,
  `address2` text,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `zip` varchar(11) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `venue_title` varchar(250) DEFAULT NULL,
  `venue_url` varchar(250) DEFAULT NULL,
  `venue_image` text,
  `venue_phone` varchar(15) DEFAULT NULL,
  `virtual_url` varchar(250) DEFAULT NULL,
  `virtual_phone` varchar(15) DEFAULT NULL,
  `reg_limit` varchar(25) DEFAULT '999999',
  `allow_multiple` varchar(15) DEFAULT 'N',
  `additional_limit` int(10) DEFAULT '5',
  `send_mail` varchar(2) DEFAULT 'Y',
  `is_active` varchar(1) DEFAULT 'Y',
  `event_status` varchar(2) DEFAULT 'A',
  `conf_mail` text,
  `use_coupon_code` varchar(1) DEFAULT 'N',
  `use_groupon_code` varchar(1) DEFAULT 'N',
  `category_id` text,
  `coupon_id` text,
  `tax_percentage` float DEFAULT NULL,
  `tax_mode` int(11) DEFAULT NULL,
  `member_only` varchar(1) DEFAULT NULL,
  `post_id` int(11) DEFAULT NULL,
  `post_type` varchar(50) DEFAULT NULL,
  `country` varchar(200) DEFAULT NULL,
  `externalURL` varchar(255) DEFAULT NULL,
  `early_disc` varchar(10) DEFAULT NULL,
  `early_disc_date` varchar(15) DEFAULT NULL,
  `early_disc_percentage` varchar(1) DEFAULT 'N',
  `question_groups` longtext,
  `item_groups` longtext,
  `event_type` varchar(250) DEFAULT NULL,
  `allow_overflow` varchar(1) DEFAULT 'N',
  `overflow_event_id` int(10) DEFAULT '0',
  `recurrence_id` int(11) DEFAULT '0',
  `email_id` int(11) DEFAULT '0',
  `alt_email` text,
  `event_meta` longtext,
  `wp_user` int(22) DEFAULT '1',
  `require_pre_approval` int(11) DEFAULT '0',
  `timezone_string` varchar(250) DEFAULT NULL,
  `likes` int(22) DEFAULT NULL,
  `ticket_id` int(22) DEFAULT '0',
  `submitted` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `event_code` (`event_code`),
  KEY `wp_user` (`wp_user`),
  KEY `event_name` (`event_name`),
  KEY `city` (`city`),
  KEY `state` (`state`),
  KEY `start_date` (`start_date`),
  KEY `end_date` (`end_date`),
  KEY `registration_start` (`registration_start`),
  KEY `registration_end` (`registration_end`),
  KEY `reg_limit` (`reg_limit`),
  KEY `event_status` (`event_status`),
  KEY `recurrence_id` (`recurrence_id`),
  KEY `submitted` (`submitted`),
  KEY `likes` (`likes`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8$$



 * 4.1 Attendee tables and fields:
 * $this->_tables = array(
			'Attendee_CPT'=> new EE_Primary_Table('posts', 'ID'),
			'Attendee_Meta'=>new EE_Secondary_Table('esp_attendee_meta', 'ATTM_ID', 'ATT_ID')
		);
		$this->_fields = array(
			'Attendee_CPT'=>array(
				'ATT_ID'=>new EE_Primary_Key_Int_Field('ID', __("Attendee ID", "event_espresso")),
				'ATT_full_name'=>new EE_Plain_Text_Field('post_title', __("Attendee Full Name", "event_espresso"), false, __("Unknown", "event_espresso")),
				'ATT_bio'=>new EE_Simple_HTML_Field('post_content', __("Attendee Biography", "event_espresso"), false, __("No Biography Provided", "event_espresso")),
				'ATT_slug'=>new EE_Slug_Field('post_name', __("Attendee URL Slug", "event_espresso"), false),
				'ATT_created'=>new EE_Datetime_Field('post_date', __("Time Attendee Created", "event_espresso"), false, time()),
				'ATT_short_bio'=>new EE_Simple_HTML_Field('post_excerpt', __("Attendee Short Biography", "event_espresso"), true, __("No Biography Provided", "event_espresso")),
				'ATT_modified'=>new EE_Datetime_Field('post_modified', __("Time Attendee Last Modified", "event_espresso"), true, time()),
				'ATT_author'=>new EE_Integer_Field('post_author', __("WP User that Created Attendee", "event_espresso"), false,0),
				'ATT_parent'=>new EE_DB_Only_Int_Field('post_parent', __("Parent Attendee (unused)", "event_espresso"), true),
				'post_type'=>new EE_DB_Only_Text_Field('post_type', __("Post Type of Attendee", "event_espresso"), false,'espresso_attendees'),
				'status' => new EE_WP_Post_Status_Field('post_status', __('Attendee Status', 'event_espresso'), false, 'publish')
			),
			'Attendee_Meta'=>array(
				'ATTM_ID'=> new EE_DB_Only_Int_Field('ATTM_ID', __('Attendee Meta Row ID','event_espresso'), false),
				'ATT_ID_fk'=>new EE_DB_Only_Int_Field('ATT_ID', __("Foreign Key to Attendee in Post Table", "event_espresso"), false),
				'ATT_fname'=>new EE_Plain_Text_Field('ATT_fname', __('First Name','event_espresso'), true, ''),
				'ATT_lname'=>new EE_Plain_Text_Field('ATT_lname', __('Last Name','event_espresso'), true, ''),
				'ATT_address'=>new EE_Plain_Text_Field('ATT_address', __('Address Part 1','event_espresso'), true, ''),
				'ATT_address2'=>new EE_Plain_Text_Field('ATT_address2', __('Address Part 2','event_espresso'), true, ''),
				'ATT_city'=>new EE_Plain_Text_Field('ATT_city', __('City','event_espresso'), true, ''),
				'STA_ID'=>new EE_Foreign_Key_Int_Field('STA_ID', __('State','event_espresso'), true,0,'State'),
				'CNT_ISO'=>new EE_Foreign_Key_String_Field('CNT_ISO', __('Country','event_espresso'), true,'','Country'),
				'ATT_zip'=>new EE_Plain_Text_Field('ATT_zip', __('ZIP/Postal Code','event_espresso'), true, ''),
				'ATT_email'=>new EE_Email_Field('ATT_email', __('Email Address','event_espresso'), true, ''),
				'ATT_phone'=>new EE_Plain_Text_Field('ATT_phone', __('Phone','event_espresso'), true, ''),
			));
 *
 * 4.1 Registration tables and models:
 * $this->_tables = array(
			'Registration'=>new EE_Primary_Table('esp_registration','REG_ID')
		);
		$this->_fields = array(
			'Registration'=>array(
				'REG_ID'=>new EE_Primary_Key_Int_Field('REG_ID', __('Registration ID','event_espresso')),
				'EVT_ID'=>new EE_Foreign_Key_Int_Field('EVT_ID', __('Even tID','event_espresso'), false, 0, 'Event'),
				'ATT_ID'=>new EE_Foreign_Key_Int_Field('ATT_ID', __('Attendee ID','event_espresso'), false, 0, 'Attendee'),
				'TXN_ID'=>new EE_Foreign_Key_Int_Field('TXN_ID', __('Transaction ID','event_espresso'), false, 0, 'Transaction'),
				'TKT_ID'=>new EE_Foreign_Key_Int_Field('TKT_ID', __('Ticket ID','event_espresso'), false, 0, 'Ticket'),
				'STS_ID'=>new EE_Foreign_Key_String_Field('STS_ID', __('Status ID','event_espresso'), false, EEM_Registration::status_id_not_approved, 'Status'),
				'REG_date'=>new EE_Datetime_Field('REG_date', __('Time registration occurred','event_espresso'), false, time(), $timezone ),
				'REG_final_price'=>new EE_Money_Field('REG_final_price', __('Final Price of registration','event_espresso'), false, 0),
				'REG_session'=>new EE_Plain_Text_Field('REG_session', __('Session ID of registration','event_espresso'), false, ''),
				'REG_code'=>new EE_Plain_Text_Field('REG_code', __('Unique Code for this registration','event_espresso'), false, ''),
				'REG_url_link'=>new EE_Plain_Text_Field('REG_url_link', __('String to be used in URL for identifying registration','event_espresso'), false, ''),
				'REG_count'=>new EE_Integer_Field('REG_count', __('Count of this registration in the group registration ','event_espresso'), true, 1),
				'REG_group_size'=>new EE_Integer_Field('REG_group_size', __('Number of registrations on this group','event_espresso'), false, 1),
				'REG_att_is_going'=>new EE_Boolean_Field('REG_att_is_going', __('Flag indicating the registrant plans on attending','event_espresso'), false, false),
				'REG_deleted' => new EE_Trashed_Flag_Field('REG_deleted', __('Flag indicating if registration has been archived or not.', 'event_espresso'), false, false )
			)
		);
 *
 * 4.1 Transaction tables and models:
 * $this->_tables = array(
			'Transaction'=>new EE_Primary_Table('esp_transaction','TXN_ID')
		);
		$this->_fields = array(
			'Transaction'=>array(
				'TXN_ID'=>new EE_Primary_Key_Int_Field('TXN_ID', __('Transaction ID','event_espresso')),
				'TXN_timestamp'=>new EE_Datetime_Field('TXN_timestamp', __('date when transaction was created','event_espresso'), false, time(), $timezone ),
				'TXN_total'=>new EE_Money_Field('TXN_total', __('Total value of Transaction','event_espresso'), false, 0),
				'TXN_paid'=>new EE_Money_Field('TXN_paid', __('Amount paid towards transaction to date','event_espresso'), false, 0),
				'STS_ID'=>new EE_Foreign_Key_String_Field('STS_ID', __('Status ID','event_espresso'), false, EEM_Transaction::incomplete_status_code, 'Status'),
				'TXN_session_data'=>new EE_Serialized_Text_Field('TXN_session_data', __('Serialized mess of session data','event_espresso'), true, ''),
				'TXN_hash_salt'=>new EE_Plain_Text_Field('TXN_hash_salt', __('Transaction Hash Salt','event_espresso'), true, '')
			)
		);
 *
 * 4.1 Payment tables and models:
 * $this->_tables = array(
			'Payment'=>new EE_Primary_Table('esp_payment','PAY_ID')
		);
		$this->_fields = array(
			'Payment'=>array(
				'PAY_ID'=>new EE_Primary_Key_Int_Field('PAY_ID', __('Payment ID','event_espresso')),
				'TXN_ID'=>new EE_Foreign_Key_Int_Field('TXN_ID', __('Transaction ID','event_espresso'), false, 0, 'Transaction'),
				'STS_ID'=>new EE_Foreign_Key_String_Field('STS_ID', __('STatus ID','event_espresso'), false, EEM_Payment::status_id_cancelled, 'Status'),
				'PAY_timestamp'=> new EE_Datetime_Field('PAY_timestamp', __('Timestamp of when payment was attemped','event_espresso'), false, time(), $timezone ),
				'PAY_method'=>new EE_All_Caps_Text_Field('PAY_method', __('User-friendly description of payment','event_espresso'), false, 'CART'),
				'PAY_amount'=>new EE_Money_Field('PAY_amount', __('Amount Payment should be for','event_espresso'), false, 0),
				'PAY_gateway'=>new EE_Plain_Text_Field('PAY_gateway', __('Gateway name used for payment','event_espresso'), false, __('Unspecified','event_espresso')),
				'PAY_gateway_response'=>new EE_Plain_Text_Field('PAY_gateway_response', __('Response from Gateway about the payment','event_espresso'), false, ''),
				'PAY_txn_id_chq_nmbr'=>new EE_Plain_Text_Field('PAY_txn_id_chq_nmbr', __('Transaction ID or Cheque Number','event_espresso'), true, ''),
				'PAY_po_number'=>new EE_Plain_Text_Field('PAY_po_number', __('Purchase or Sales Number','event_espresso'), true, ''),
				'PAY_extra_accntng'=>new EE_Simple_HTML_Field('PAY_extra_accntng', __('Extra Account Info','event_espresso'), true, ''),
				'PAY_via_admin'=>new EE_Boolean_Field('PAY_via_admin', __('Whether payment made via admin','event_espresso'), false, false),
				'PAY_details'=>new EE_Serialized_Text_Field('PAY_details', __('Full Gateway response about payment','event_espresso'), true, '')
			)
		);
4.1 Line Item table fields
 * $this->_tables = array(
			'Line_Item'=>new EE_Primary_Table('esp_line_item','LIN_ID')
		);
		$line_items_can_be_for = array('Ticket','Price');
		$this->_fields = array(
			'Line_Item'=> array(
				'LIN_ID'=>new EE_Primary_Key_Int_Field('LIN_ID', __("ID", "event_espresso")),
				'LIN_code'=>new EE_Slug_Field('LIN_code', __("Code for index into Cart", "event_espresso"), true),
				'TXN_ID'=>new EE_Foreign_Key_Int_Field('TXN_ID', __("Transaction ID", "event_espresso"), true, null, 'Transaction'),
				'LIN_name'=>new EE_Full_HTML_Field('LIN_name', __("Line Item Name", "event_espresso"), false, ''),
				'LIN_desc'=>new EE_Full_HTML_Field('LIN_desc', __("Line Item Description", "event_espresso"), true),
				'LIN_unit_price'=>new EE_Money_Field('LIN_unit_price',  __("Unit Price", "event_espresso"),false,0),
				'LIN_percent'=>new EE_Float_Field('LIN_percent', __("Percent", "event_espresso"), false, false),
				'LIN_is_taxable'=>new EE_Boolean_Field('LIN_is_taxable', __("Taxable", "event_espresso"), false, false),
				'LIN_order'=>new EE_Integer_Field('LIN_order', __("Order of Application towards total of parent", "event_espresso"), false,1),
				'LIN_total'=>new EE_Money_Field('LIN_total', __("Total (unit price x quantity)", "event_espresso"), false, 0),
				'LIN_quantity'=>new EE_Integer_Field('LIN_quantity', __("Quantity", "event_espresso"), true, null),
				'LIN_parent'=>new EE_Integer_Field('LIN_parent', __("Parent ID (this item goes towards that Line Item's total)", "event_espresso"), true, null),
				'LIN_type'=>new EE_Enum_Text_Field('LIN_type', __("Type", "event_espresso"), false, 'line-item',
						array(
							self::type_line_item=>  __("Line Item", "event_espresso"),
							self::type_sub_line_item=>  __("Sub-Item", "event_espresso"),
							self::type_sub_total=>  __("Subtotal", "event_espresso"),
							self::type_tax_sub_total => __("Tax Subtotal", "event_espresso"),
							self::type_tax=>  __("Tax", "event_espresso"),
							self::type_total=>  __("Total", "event_espresso"))),
				'OBJ_ID'=>new EE_Foreign_Key_Int_Field('OBJ_ID', __("ID of Item purchased.", "event_espresso"), true,null,$line_items_can_be_for),
				'OBJ_type'=>new EE_Any_Foreign_Model_Name_Field('OBJ_type', __("Model Name this Line Item is for", "event_espresso"), true,null,$line_items_can_be_for),
			)
		);
 */
class EE_DMS_4_1_0_attendees extends EE_Data_Migration_Script_Stage_Table{
	private $_new_attendee_cpt_table;
	private $_new_attendee_meta_table;
	private $_new_reg_table;
	private $_new_transaction_table;
	private $_new_payment_table;
	private $_new_line_table;
	private $_old_mer_table;
	private $_new_ticket_table;
	private $_new_ticket_datetime_table;
	private $_new_datetime_table;
	private $_new_datetime_ticket_table;
	private $_new_price_table;
	private $_new_ticket_price_table;
	/**
	 * Rememebrs whether or not the mer table exists
	 * @var boolean
	 */
	private $_mer_tables_exist = NULL;
	function __construct() {
		global $wpdb;
		$this->_pretty_name = __("Attendees", "event_espresso");
		$this->_old_table = $wpdb->prefix."events_attendee";
		$this->_old_mer_table = $wpdb->prefix."events_multi_event_registration_id_group";;
		$this->_new_attendee_cpt_table = $wpdb->posts;
		$this->_new_attendee_meta_table = $wpdb->prefix."esp_attendee_meta";
		$this->_new_reg_table = $wpdb->prefix."esp_registration";
		$this->_new_transaction_table = $wpdb->prefix."esp_transaction";
		$this->_new_payment_table = $wpdb->prefix."esp_payment";
		$this->_new_line_table = $wpdb->prefix."esp_line_item";
		$this->_new_ticket_table = $wpdb->prefix."esp_ticket";
		$this->_new_ticket_datetime_table = $wpdb->prefix."esp_datetime_ticket";
		$this->_new_datetime_table = $wpdb->prefix."esp_datetime";
		$this->_new_datetime_ticket_table = $wpdb->prefix."esp_datetime_ticket";
		$this->_new_price_table = $wpdb->prefix."esp_price";
		$this->_new_ticket_price_table = $wpdb->prefix."esp_ticket_price";
		parent::__construct();
	}

	protected function _migrate_old_row($old_row) {
		//first check if there's already a new attendee with similar characteristics
		$new_att_id = $this->_find_attendee_cpt_matching($old_row);
		if( ! $new_att_id ){
			$new_att_id = $this->_insert_new_attendee_cpt($old_row);
			if( ! $new_att_id){
				//if we couldnt even make an attendee, abandon all hope
				return false;
			}
			$new_att_meta_id = $this->_insert_attendee_meta_row($old_row, $new_att_id);
			if($new_att_meta_id){
				$this->get_migration_script()->set_mapping($this->_old_table, $old_row['id'], $this->_new_attendee_meta_table, $new_att_meta_id);
			}
		}
		$this->get_migration_script()->set_mapping($this->_old_table, $old_row['id'], $this->_new_attendee_cpt_table, $new_att_id);

		$txn_id = $this->_insert_new_transaction($old_row);
		if( ! $txn_id){
			//if we couldnt make the transaction, also abandon all hope
			return false;
		}
		$this->get_migration_script()->set_mapping($this->_old_table, $old_row['id'], $this->_new_transaction_table, $txn_id);$pay_id = $this->_insert_new_payment($old_row,$txn_id);
		if($pay_id){
			$this->get_migration_script()->set_mapping($this->_old_table,$old_row['id'],$this->_new_payment_table,$pay_id);
		}


		//even if there was no payment, we can go ahead with adding the reg
		$new_regs = $this->_insert_new_registrations($old_row,$new_att_id,$txn_id);
		if($new_regs){
			$this->get_migration_script()->set_mapping($this->_old_table,$old_row['id'],$this->_new_reg_table,$new_regs);
		}
	}
	/**
	 * Checks if there's already an attendee CPT in the db that has the same
	 * first and last name, and email. If so, returns its ID as an int.
	 * @global type $wpdb
	 * @param array $old_attendee
	 * @return int
	 */
	private function _find_attendee_cpt_matching($old_attendee){
		global $wpdb;
		$existing_attendee_id = $wpdb->get_var($wpdb->prepare("SELECT id FROM ".$this->_new_attendee_cpt_table." AS cpt INNER JOIN ".$this->_new_attendee_meta_table." AS meta ON cpt.ID = meta.ATT_ID WHERE meta.ATT_fname = %s AND meta.ATT_lname = %s AND meta.ATT_email = %s LIMIT 1",$old_attendee['fname'],$old_attendee['lname'],$old_attendee['email']));
		return intval($existing_attendee_id);
	}
	private function _insert_new_attendee_cpt($old_attendee){
		global $wpdb;
		$cols_n_values = array(
			'post_title'=>stripslashes($old_attendee['fname']." ".$old_attendee['lname']),//ATT_full_name
			'post_content'=>'',//ATT_bio
			'post_name'=>sanitize_title($old_attendee['fname']."-".$old_attendee['lname']),//ATT_slug
			'post_date'=>$this->get_migration_script()->convert_date_string_to_utc($this,$old_attendee,$old_attendee['date']),//ATT_created
			'post_excerpt'=>'',//ATT_short_bio
			'post_modified'=>$this->get_migration_script()->convert_date_string_to_utc($this,$old_attendee,$old_attendee['date']),//ATT_modified
			'post_author'=>0,//ATT_author
			'post_parent'=>0,//ATT_parent
			'post_type'=>'espresso_attendees',//post_type
			'post_status'=>'publish'//status
		);
		$datatypes = array(
			'%s',//ATT_full_name
			'%s',//ATT_bio
			'%s',//ATT_slug
			'%s',//ATT_created
			'%s',//ATT_short_bio
			'%s',//ATT_modified
			'%d',//ATT_author
			'%d',//ATT_parent
			'%s',//post_type
			'%s',//status
		);
		$success = $wpdb->insert($this->_new_attendee_cpt_table,$cols_n_values,$datatypes);
		if ( ! $success){
			$this->add_error($this->get_migration_script()->_create_error_message_for_db_insertion($this->_old_table, $old_attendee, $this->_new_attendee_cpt_table, $cols_n_values, $datatypes));
			return 0;
		}
		$new_id = $wpdb->insert_id;
		return $new_id;
	}

	private function _insert_attendee_meta_row($old_attendee,$new_attendee_cpt_id){
		global $wpdb;
		//get the state and country ids from the old row
		try{
			$new_country = $this->get_migration_script()->get_or_create_country(stripslashes($old_attendee['country_id']));
			$new_country_iso = $new_country['CNT_ISO'];
		}catch(EE_Error $exception){
			$new_country_iso = $this->get_migration_script()->get_default_country_iso();
		}
		try{
			$new_state = $this->get_migration_script()->get_or_create_state(stripslashes($old_attendee['state']),$new_country_iso);
			$new_state_id = $new_state['STA_ID'];
		}catch(EE_Error $exception){
			$new_state_id = 0;
		}
		$cols_n_values = array(
			'ATT_ID'=>$new_attendee_cpt_id,
			'ATT_fname'=>stripslashes($old_attendee['fname']),
			'ATT_lname'=>stripslashes($old_attendee['lname']),
			'ATT_address'=>stripslashes($old_attendee['address']),
			'ATT_address2'=>stripslashes($old_attendee['address2']),
			'ATT_city'=>stripslashes($old_attendee['city']),
			'STA_ID'=>$new_state_id,
			'CNT_ISO'=>$new_country_iso,
			'ATT_zip'=>stripslashes($old_attendee['zip']),
			'ATT_email'=>stripslashes($old_attendee['email']),
			'ATT_phone'=>stripslashes($old_attendee['phone']),
		);
		$datatypes = array(
			'%d',//ATT_ID
			'%s',//ATT_fname
			'%s',//ATT_lname
			'%s',//ATT_address
			'%s',//ATT_address2
			'%s',//ATT_city
			'%d',//STA_ID
			'%s',//CNT_ISO
			'%s',//ATT_zip
			'%s',//ATT_email
			'%s',//ATT_phone
		);
		$success = $wpdb->insert($this->_new_attendee_meta_table,$cols_n_values,$datatypes);
		if ( ! $success){
			$this->add_error($this->get_migration_script()->_create_error_message_for_db_insertion($this->_old_table, $old_attendee, $this->_new_attendee_meta_table, $cols_n_values, $datatypes));
			return 0;
		}
		$new_id = $wpdb->insert_id;
		return $new_id;
	}

	/**
	 * Note: we don't necessarily create a new transaction for each attendee row.
	 * Only if the old attendee 'is_primary' is true; otherwise we find the old attendee row that
	 * 'is_primary' and has the same 'txn_id', then we return ITS new transaction id
	 * @global type $wpdb
	 * @param type $old_attendee
	 * @return int new transaction id
	 */
	private function _insert_new_transaction($old_attendee){
		global $wpdb;

		//first: let's check for an existing transaction for this old attendee
		if( intval( $old_attendee[ 'is_primary' ] ) ) {//primary attendee, so create txn
			$txn_id = $this->get_migration_script()->get_mapping_new_pk( $this->_old_table, intval($old_attendee['id']), $this->_new_transaction_table );
		} else { //non-primary attendee, so find its primary attendee's transaction
			$primary_attendee_old_id = $wpdb->get_var($wpdb->prepare("SELECT id FROM ".$this->_old_table." WHERE is_primary=1 and registration_id=%s",$old_attendee['registration_id']));
			if( ! $primary_attendee_old_id){
				$primary_attendee = $this->_find_mer_primary_attendee_using_mer_tables($old_attendee['registration_id']);
				$primary_attendee_old_id = is_array($primary_attendee) ? $primary_attendee['id'] : NULL;
			}
			$txn_id = $this->get_migration_script()->get_mapping_new_pk($this->_old_table, intval($primary_attendee_old_id), $this->_new_transaction_table);
			if( ! $txn_id){
				$this->add_error(sprintf(__("Could not find primary attendee's new transaction. Current attendee is: %s, we think the 3.1 primary attendee for it has id %d, but there's no 4.1 transaction for that primary attendee id.", "event_espresso"),  $this->_json_encode($old_attendee),$primary_attendee_old_id));
				$txn_id = 0;
			}
		}
		//if there isn't yet a transaction row for this, create one
		//(so even if it was a non-primary attendee with no EE3 primary attendee,
		// it ought to have SOME transaction, so we'll make one)
		if( ! $txn_id ) {
			//maps 3.1 payment stati onto 4.1 transaction stati
			$txn_status_mapping = array(
				'Completed'=>'TCM',
				'Pending'=>'TIN',
				'Payment Declined'=>'TIN',
				'Incomplete'=>'TIN',
				'Not Completed'=>'TIN',
				'Cancelled'=>'TIN',
				'Declined'=>'TIN'
			);
			$STS_ID = isset($txn_status_mapping[$old_attendee['payment_status']]) ? $txn_status_mapping[$old_attendee['payment_status']] : 'TIN';
			$cols_n_values = array(
				'TXN_timestamp'=>$this->get_migration_script()->convert_date_string_to_utc($this,$old_attendee,$old_attendee['date']),
				'TXN_total'=>floatval($old_attendee['total_cost']),
				'TXN_paid'=>floatval($old_attendee['amount_pd']),
				'STS_ID'=>$STS_ID,
				'TXN_hash_salt'=>$old_attendee['hashSalt']
			);
			$datatypes = array(
				'%s',//TXN_timestamp
				'%f',//TXN_total
				'%f',//TXN_paid
				'%s',//STS_ID
				'%s',//TXN_hash_salt
			);
			$success = $wpdb->insert($this->_new_transaction_table,$cols_n_values,$datatypes);
			if ( ! $success){
				$this->add_error($this->get_migration_script()->_create_error_message_for_db_insertion($this->_old_table, $old_attendee, $this->_new_transaction_table, $cols_n_values, $datatypes));
				return 0;
			}
			$txn_id = $wpdb->insert_id;
		}

		return $txn_id;
	}
	/**
	 * Detects if the MER tables exist
	 * @global type $wpdb
	 * @return boolean
	 */
	private function _mer_tables_exist(){
		if( $this->_mer_tables_exist === NULL){
			global $wpdb;

			if( $wpdb->get_var("SHOW TABLES LIKE '{$this->_old_mer_table}'") != $this->_old_mer_table){
				$this->_mer_tables_exist = false;
			}else{
				$this->_mer_tables_exist = true;
			}
		}
		return $this->_mer_tables_exist;
	}

	/**
	 * Gets the 4.1 registration's status given the 3.1 attendee row. We consider
	 * whether the event required pre-approval or not,a dn the 4.1 payment status.
	 * @global type $wpdb
	 * @param type $old_attendee_row
	 * @return string
	 */
	private function _get_reg_status_for_old_payment_status($old_attendee_row){
		//need event default reg status and if pre_approval was required
		global $wpdb;
		$event_required_pre_approval = $wpdb->get_var($wpdb->prepare("SELECT require_pre_approval FROM ".$wpdb->prefix."events_detail WHERE id = %d",$old_attendee_row['event_id']));
		return $this->get_migration_script()->convert_3_1_payment_status_to_4_1_STS_ID($old_attendee_row['payment_status'],
				intval($event_required_pre_approval) && intval($old_attendee_row['pre_approve']));
	}
	/**
	 * Adds however many rgistrations are indicated by the old attendee's QUANTITY field,
	 * and returns an array of their IDs
	 * @global type $wpdb
	 * @param array $old_attendee
	 * @param int $new_attendee_id
	 * @param int $new_txn_id
	 * @return array of new registratio ids
	 */
	private function _insert_new_registrations($old_attendee,$new_attendee_id,$new_txn_id){
		global $wpdb;

		$STS_ID = $this->_get_reg_status_for_old_payment_status($old_attendee);
		$new_event_id = $this->get_migration_script()->get_mapping_new_pk($wpdb->prefix.'events_detail', $old_attendee['event_id'], $wpdb->posts);
		if( ! $new_event_id){
			$this->add_error(sprintf(__("Could not find NEW event CPT ID for old event '%d' on old attendee %s", "event_espresso"),$old_attendee['event_id'],$this->_json_encode($old_attendee)));
		}

		$ticket_id = $this->_try_to_find_new_ticket_id($old_attendee,$new_event_id);
		if( ! $ticket_id){
			$ticket_id = $this->_insert_new_ticket_because_none_found( $old_attendee, $new_event_id );
			$this->add_error( sprintf( __( 'Could not find a ticket for old attendee with id %d for new event %d, so created a new ticket with id %d', 'event_espresso' ), $old_attendee['id'], $new_event_id, $ticket_id ) );
		}
		$regs_on_this_row = intval($old_attendee['quantity']);
		$new_regs = array();
		//4 cases we need to account for:
		//1 old attendee_details row with a quantity of X (no mer)
		//Y old attendee_details rows with a quantity of 1 (no mer) joined by their common registration_id
		//Y old attendee_details rows with a quantity of x (because of mer)
		//Y old attendee_details rows with a quantity of 1 (because of mer) joined by wp_events_multi_event_registration_id_group
		for($count = 1; $count <= $regs_on_this_row; $count++){
			//sum regs on older rows
			$regs_on_this_event_and_txn = $this->_sum_old_attendees_on_old_txn($old_attendee,true);
			$cols_n_values = array(
				'EVT_ID'=>$new_event_id,
				'ATT_ID'=>$new_attendee_id,
				'TXN_ID'=>$new_txn_id,
				'TKT_ID'=>$ticket_id,
				'STS_ID'=>$STS_ID,
				'REG_date'=>$this->get_migration_script()->convert_date_string_to_utc($this,$old_attendee,$old_attendee['date']),
				'REG_final_price'=>$old_attendee['final_price'],
				'REG_session'=> substr( $old_attendee['attendee_session'], 0, 44 ),
				'REG_code'=>sanitize_key($old_attendee['registration_id']),
				'REG_url_link'=>  sanitize_key($old_attendee['registration_id'].'-'.$count),
				'REG_count'=>$regs_on_this_event_and_txn + $count,
				'REG_group_size'=>$this->_sum_old_attendees_on_old_txn($old_attendee,false),
				'REG_att_is_going'=>true,
				'REG_deleted'=>false
			);
			$datatypes = array(
				'%d',//EVT_ID
				'%d',//ATT_ID
				'%d',//TXN_ID
				'%d',//TKT_ID
				'%s',//STS_ID
				'%s',//REG_date
				'%f',//REG_final_price
				'%s',//REG_session
				'%s',//REG_code
				'%s',//REG_url_link
				'%d',//REG_count
				'%d',//REG_group_size
				'%d',//REG_att_is_going
				'%d',//REG_deleted
			);
			$success = $wpdb->insert($this->_new_reg_table,$cols_n_values,$datatypes);
			if ( ! $success){
				$this->add_error($this->get_migration_script()->_create_error_message_for_db_insertion($this->_old_table, $old_attendee, $this->_new_reg_table, $cols_n_values, $datatypes));
				return 0;
			}
			$cols_n_values['REG_ID'] = $wpdb->insert_id;
			$new_regs[] = $wpdb->insert_id;
		}
		$this->_add_regs_to_ticket_and_datetimes($ticket_id,count($new_regs),$STS_ID);
		return $new_regs;
	}

	/**
	 * Increments the sold values on the ticket and its related datetimes by the amount sold,
	 * which should be done directly after adding the rows. Yes this means we're constantly incrementing
	 * the sold amounts as we go, and is less efficient than a single big query,
	 * but its safer because we KNOW these regs have been added, rather than inferring
	 * that they WILL be added (because the attendees stage runs nearly last during
	 * the migration script)
	 * @param type $new_ticket_id
	 * @param type $sold
	 * @param type $STS_ID
	 * @return boolean whether they were successfully updated or not
	 */
	protected function _add_regs_to_ticket_and_datetimes($new_ticket_id,$quantity_sold,$STS_ID){
		if($STS_ID != 'RAP'){
			return true;
		}
		global $wpdb;
		$success = $wpdb->query($wpdb->prepare("UPDATE {$this->_new_ticket_table} SET TKT_sold=TKT_sold+%d WHERE TKT_ID=%d",$quantity_sold,$new_ticket_id));
		if($success){
			//get the ticket's datetimes, and increment them too
			$success_update_dateimtes =  $wpdb->query($wpdb->prepare("UPDATE {$this->_new_ticket_table} TKT
				INNER JOIN {$this->_new_ticket_datetime_table} as DTK ON TKT.TKT_ID = DTK.TKT_ID
				INNER JOIN {$this->_new_datetime_table} as DTT ON DTK.DTT_ID = DTT.DTT_ID
				SET DTT.DTT_sold = DTT.DTT_sold + %d WHERE TKT.TKT_ID = %d",$quantity_sold,$new_ticket_id));
			if( ! $success_update_dateimtes){
				$this->add_error(sprintf(__("Could not update datetimes related to ticket with ID %d's TKT_sold by %d because %s", "event_espresso"),$new_ticket_id,$quantity_sold,$wpdb->last_error));
			}
		}else{
			$this->add_error(sprintf(__("Could not update ticket with ID %d's TKT_sold by %d because %s", "event_espresso"),$new_ticket_id,$quantity_sold,$wpdb->last_error));
		}
		return true;
	}
	/**
	 * Makes a best guess at which ticket is the one the attendee purchased.
	 * Obviously, the old attendee's event_id narrows it down quite a bit;
	 * then the old attendee's orig_price and event_time, and price_option can uniquely identify the ticket
	 * however, if we don't find an exact match, see if any of those conditions match;
	 * and lastly if none of that works, just use the first ticket for the event we find
	 * @param array $old_attendee
	 */
	private function _try_to_find_new_ticket_id($old_attendee,$new_event_id){
		global $wpdb;
		$tickets_table = $this->_new_ticket_table;
		$datetime_tickets_table = $this->_new_ticket_datetime_table;
		$datetime_table = $this->_new_datetime_table;

		$old_att_price_option = $old_attendee['price_option'];
		$old_att_price = floatval($old_attendee['orig_price']);

		$old_att_start_date = $old_attendee['start_date'];
		$old_att_start_time = $this->get_migration_script()->convertTimeFromAMPM($old_attendee['event_time']);
		$old_att_datetime = $this->get_migration_script()->convert_date_string_to_utc($this,$old_attendee,"$old_att_start_date $old_att_start_time:00");
		//add all conditions to an array from which we can SHIFT conditions off in order to widen our search
		//the most important condition should be last, as it will be array_shift'ed off last
		$conditions = array(
			$wpdb->prepare("$datetime_table.DTT_EVT_start = %s",$old_att_datetime),//times match?
			$wpdb->prepare("$tickets_table.TKT_price = %f",$old_att_price),//prices match?
			$wpdb->prepare("$tickets_table.TKT_name = %s",$old_att_price_option),//names match?
			$wpdb->prepare("$datetime_table.EVT_ID = %d",$new_event_id),//events match?
		);
		$select_and_join_part = "SELECT $tickets_table.TKT_ID FROM $tickets_table INNER JOIN
			$datetime_tickets_table ON $tickets_table.TKT_ID = $datetime_tickets_table.TKT_ID INNER JOIN
			$datetime_table ON $datetime_tickets_table.DTT_ID = $datetime_table.DTT_ID";
		//start running queries, widening search each time by removing a condition
		do{
			$full_query = $select_and_join_part." WHERE ".implode(" AND ",$conditions)." LIMIT 1";
			$ticket_id_found = $wpdb->get_var($full_query);
			array_shift($conditions);
		}while( ! $ticket_id_found && $conditions);
		return $ticket_id_found;

	}

	/**
	 * If we couldn't find a 4.1 ticket for a 3.1 attendee row, this function creates one;
	 * and it also tries to find a datetime that works, and a inserts a price, and associates
	 * the new ticket to that datetime and price.
	 * @return int ticket id
	 */
	private function _insert_new_ticket_because_none_found( $old_attendee, $new_event_id ) {
		global $wpdb;
		$old_att_price_option = $old_attendee['price_option'];
		$old_att_price = floatval($old_attendee['orig_price']);

		$old_att_start_date = $old_attendee['start_date'];
		$old_att_start_time = $this->get_migration_script()->convertTimeFromAMPM($old_attendee['event_time']);
		$old_att_start_datetime = $this->get_migration_script()->convert_date_string_to_utc($this,$old_attendee,"$old_att_start_date $old_att_start_time:00");


		//insert new datetime unless we find one
		$datetime_id = $wpdb->get_var( $wpdb->prepare( "SELECT DTT_ID FROM " . $this->_new_datetime_table . " WHERE DTT_EVT_start=%s AND EVT_ID=%d LIMIT 1", $old_att_start_datetime, $new_event_id ), ARRAY_A );
		if( ! $datetime_id ) {
			$old_att_end_date = $old_attendee['start_date'];
			$old_att_end_time = $this->get_migration_script()->convertTimeFromAMPM($old_attendee['event_time']);
			$old_att_end_datetime = $this->get_migration_script()->convert_date_string_to_utc($this,$old_attendee,"$old_att_end_date $old_att_end_time:00");
			$wpdb->insert( $this->_new_datetime_table,
					array(
						'EVT_ID' => $new_event_id,
						'DTT_EVT_start' => $old_att_start_datetime,
						'DTT_EVT_end' => $old_att_end_datetime,
						'DTT_deleted' => TRUE
					),
					array(
						'%d',//EVT_ID
						'%s',//DTT_EVT_start
						'%s',//DTT_EVT_end
						'%d',//DTT_deleted
					));
			$datetime_id = $wpdb->insert_id;
		}

		//insert new ticket
		$success = $wpdb->insert( $wpdb->prefix . 'esp_ticket',
				array(
					'TKT_name' => $old_att_price_option,
					'TKT_qty' => -1,
					'TKT_price' => $old_att_price,
					'TKT_start_date' => $old_att_start_datetime,//we really have no clue what the time should be, but at least it was available when they attended
					'TKT_end_date' => $old_att_end_datetime,

				),
				array(
					'%s',//name
					'%d',//qty
					'%d',//price
					'%s',//start_date
					'%s',//end_date
				));
		$ticket_id = $wpdb->insert_id;
		//associate the ticket with the datetime we found earlier
		$wpdb->insert( $this->_new_datetime_ticket_table,
				array(
					'DTT_ID' => $datetime_id,
					'TKT_ID' => $ticket_id
				),
				array(
					'%d',//DTT_ID
					'%d',//TKT_ID
				));
		//insert new price
		$wpdb->insert( $this->_new_price_table,
				array(
					'PRC_amount' => $old_att_price,
					'PRT_ID' => EE_DMS_4_1_0_prices::price_type_base,
					'PRC_name' => $old_att_price_option,
					'PRC_deleted' => TRUE
				),
				array(
					'%d',//PRC_amount
					'%d',//PRT_ID
					'%s',//PRC_name
					'%d',//PRC_deleted
				));
		$price_id = $wpdb->insert_id;
		//associate the price to the ticket
		$wpdb->insert( $this->_new_ticket_price_table,
				array(
					'TKT_ID' => $ticket_id,
					'PRC_ID' => $price_id
				),
				array(
					'%d',//TKT_ID
					'%d',//PRC_ID
				) );
		return $ticket_id;
	}
	/**
	 * Counts all the registrations on this transaction. If $count_only_older is TRUE then returns the number added SO FAR (ie,
	 * only considers attendee rows with an ID less than this one's), but if $count_only_older is FALSe returns ALL
	 * @global type $wpdb
	 * @param array $old_attendee_row
	 * @param boolean $count_only_older true if you want the running count (ie, the total up to this row), and false if you want ALL
	 * @return int
	 */
	private function _sum_old_attendees_on_old_txn($old_attendee_row,$count_only_older = false){
		global $wpdb;
		$count_only_older_sql = $count_only_older ? $wpdb->prepare(" AND id<%d",$old_attendee_row['id']) : '';
		$count = intval($wpdb->get_var($wpdb->prepare("SELECT SUM(quantity) FROM ".$this->_old_table." WHERE registration_id=%s $count_only_older_sql",$old_attendee_row['registration_id'])));

		if( $this->_mer_tables_exist()){
			//if MER exists, then its a little tricky.
			//when users registered by adding items to the cart, and it was a
			//group registration requiring additional attendee INFO, then the attendee rows
			//DO NOT have the same registration_id (although they probably should have)
			//they are related just like MER attendee rows are related, through the MER group table
			//BUT we want to count all the MER attendee rows for the same registration
			$primary_attendee = $this->_find_mer_primary_attendee_using_mer_tables($old_attendee_row['registration_id']);

			$count_using_mer_table = $wpdb->get_var($wpdb->prepare("SELECT SUM(quantity) FROM {$this->_old_table} att INNER JOIN {$this->_old_mer_table} mer ON att.registration_id = mer.registration_id WHERE att.event_id=%d AND mer.primary_registration_id = %s $count_only_older_sql",$old_attendee_row['event_id'],$primary_attendee['registration_id']));
			$count = max($count_using_mer_table,$count);
		}
		return $count;
	}
	private function _insert_new_payment($old_attendee,$new_txn_id){
		global $wpdb;
		//only add a payment for primary attendees
		$old_pay_stati_indicating_no_payment = array('Pending','Incomplete','Not Completed');
		//if this is for a primary 3.1 attendee which WASN'T free and has a completed, cancelled, or declined payment...
		if(intval($old_attendee['is_primary']) && floatval($old_attendee['total_cost']) && ! in_array($old_attendee['payment_status'], $old_pay_stati_indicating_no_payment)){
			$pay_status_mapping = array(
				'Completed'=>'PAP',
				'Payment Declined'=>'PDC',
				'Cancelled'=>'PCN',
				'Declined'=>'PDC'
			);
			$by_admin = $old_attendee['payment'] == 'Admin';
			$STS_ID = isset($pay_status_mapping[$old_attendee['payment_status']]) ? $pay_status_mapping[$old_attendee['payment_status']] : 'PFL';//IE, if we don't recognize the status, assume payment failed
			$cols_n_values = array(
				'TXN_ID'=>$new_txn_id,
				'STS_ID'=>$STS_ID,
				'PAY_timestamp'=>$this->get_migration_script()->convert_date_string_to_utc($this,$old_attendee,$old_attendee['date']),
				'PAY_method'=>'CART',
				'PAY_amount'=>$old_attendee['amount_pd'],
				'PAY_gateway'=>$old_attendee['txn_type'],
				'PAY_gateway_response'=>'',
				'PAY_txn_id_chq_nmbr'=>substr( $old_attendee['txn_id'], 0, 32 ),
				'PAY_via_admin'=>$by_admin,
				'PAY_details'=>$old_attendee['transaction_details']

			);
			$datatypes = array(
				'%d',//TXN_Id
				'%s',//STS_ID
				'%s',//PAY_timestamp
				'%s',//PAY_method
				'%f',//PAY_amount
				'%s',//PAY_gateway
				'%s',//PAY_gateway_response
				'%s',//PAY_txn_id_chq_nmbr
				'%d',//PAY_via_admin
				'%s',//PAY_details
			);
			$success = $wpdb->insert($this->_new_payment_table,$cols_n_values,$datatypes);
			if ( ! $success){
				$this->add_error($this->get_migration_script()->_create_error_message_for_db_insertion($this->_old_table, $old_attendee, $this->_new_attendee_cpt_table, $cols_n_values, $datatypes));
				return 0;
			}
			$new_id = $wpdb->insert_id;
			return $new_id;

		}else{
			return 0;
		}


	}

	/**
	 * If MER is active, if you want ot fin dthe other registrations on that attendee row
	 * @global type $wpdb
	 * @param type $old_registration_id
	 * @return array
	 */
	private function _find_mer_primary_attendee_using_mer_tables($old_registration_id){
		if (! $this->_mer_tables_exist()){
			return false;
		}
		global $wpdb;
		$old_att_for_primary_reg = $wpdb->get_row($wpdb->prepare("SELECT * FROM {$this->_old_mer_table} AS mer INNER JOIN {$this->_old_table} AS att ON mer.primary_registration_id = att.registration_id WHERE mer.registration_id=%s LIMIT 1",$old_registration_id),ARRAY_A);
return $old_att_for_primary_reg;
	}

}
