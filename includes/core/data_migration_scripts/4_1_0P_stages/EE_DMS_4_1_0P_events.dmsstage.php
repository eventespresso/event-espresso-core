<?php 
/**
 * migrates old 3.1 events, and start_end entries to 4.1 event CPTs, tickets (although doesn't assign them any prices, only datetimes; also
 * this is run BEFORE migrating prices), and datetimes.
 * 3.1 events table:
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
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8$$


 * 
 * 4.1 Event model:
 * $this->_tables = array(
			'Event_CPT'=>new EE_Primary_Table('posts','ID'),
			'Event_Meta'=> new EE_Secondary_Table('esp_event_meta', 'EVTM_ID','EVT_ID')
		);
		
		$this->_fields = array(
			'Event_CPT'=>array(
				'EVT_ID'=>new EE_Primary_Key_Int_Field('ID', __('Post ID for Event','event_espresso')),
				'EVT_name'=>new EE_Plain_Text_Field('post_title', __('Event Name','event_espresso'), false, ''),
				'EVT_desc'=>new EE_Simple_HTML_Field('post_content', __("Event Description", "event_espresso"), false, ''),
				'EVT_slug'=>new EE_Slug_Field('post_name', __("Event Slug", "event_espresso"), false, ''),
				'EVT_created'=>new EE_Datetime_Field('post_date', __("Date/Time Event Created", "event_espresso"), false, current_time('timestamp')),
				'EVT_short_desc'=>new EE_Simple_HTML_Field('post_excerpt', __("Event Short Descripiton", "event_espresso"), false,''),
				'EVT_modified'=>new EE_Datetime_Field('post_modified', __("Dateim/Time Event Modified", "event_espresso"), true, current_time('timestamp')),
				'EVT_wp_user'=>new EE_Integer_Field('post_author', __("Wordpress User ID", "event_espresso"), false,1),
				'parent'=>new EE_Integer_Field('post_parent', __("Event Parent ID", "event_espresso"), true),
				'EVT_order'=>new EE_Integer_Field('menu_order', __("Event Menu Order", "event_espresso"), false, 1),
				'post_type'=>new EE_Plain_Text_Field('post_type', __("Event Post Type", "event_espresso"), false, 'espresso_events'),
				'status' => new EE_WP_Post_Status_Field('post_status', __("Event Status", "event_espresso"), false, 'draft', $custom_stati)
			),
			'Event_Meta'=>array(
				'EVTM_ID'=> new EE_DB_Only_Float_Field('EVTM_ID', __('Event Meta Row ID','event_espresso'), false),
				'EVT_ID_fk'=>new EE_DB_Only_Int_Field('EVT_ID', __("Foreign key to Event ID from Event Meta table", "event_espresso"), false),
				'EVT_display_desc'=>new EE_Boolean_Field('EVT_display_desc', __("Display Description Flag", "event_espresso"), false, 1),
				'EVT_display_reg_form'=>new EE_Boolean_Field('EVT_display_reg_form', __("Display Registration Form Flag", "event_espresso"), false, 1),
				'EVT_visible_on'=>new EE_Datetime_Field('EVT_visible_on', __("Event Visible Date", "event_espresso"), true, current_time('timestamp')),
				'EVT_allow_multiple'=>new EE_Boolean_Field('EVT_allow_multiple', __("Allow Multiple Registrations on Same Transaction Flag", "event_espresso"), false, false),
				'EVT_additional_limit'=>new EE_Integer_Field('EVT_additional_limit', __("Limit of Additional Registrations on Same Transaction", "event_espresso"), true),
				'EVT_additional_attendee_reg_info'=>new EE_Enum_Integer_Field('EVT_additional_attendee_reg_info', __("Info Requested for Additional Attendees?", "event_espresso"), true, EEM_Event::additional_attendee_reg_info_none, self::$_additional_attendee_reg_info_enum),
				'EVT_default_registration_status'=>new EE_Enum_Text_Field('EVT_default_registration_status', __("Default Registration Status on this Event", "event_espresso"), false, EEM_Registration::status_id_pending, EEM_Registration::reg_status_array()),
				'EVT_require_pre_approval'=>new EE_Boolean_Field('EVT_require_pre_approval', __("Event Requires Pre-Approval before Registration Complete", "event_espresso"), false, false),
				'EVT_member_only'=>new EE_Boolean_Field('EVT_member_only', __("Member-Only Event Flag", "event_espresso"), false, false),
				'EVT_phone'=> new EE_Plain_Text_Field('EVT_phone', __('Event Phone Number', 'event_espresso'), false ),
				'EVT_allow_overflow'=>new EE_Boolean_Field('EVT_allow_overflow', __("Allow Overflow on Event", "event_espresso"), false, false),
				'EVT_timezone_string'=>new EE_Plain_Text_Field('EVT_timezone_string', __("Timezone (name) for Event times", "event_espresso"), false),
				'EVT_external_URL'=>new EE_Plain_Text_Field('EVT_external_URL', __("URL of Event Page if hosted elsewhere", "event_espresso"), true),
				'EVT_donations'=>new EE_Boolean_Field('EVT_donations', __("Accept Donations?", "event_espresso"), false, false)
				
			));
 */
class EE_DMS_4_1_0P_events extends EE_Data_Migration_Script_Stage{
	private $_old_table;
	private $_new_table;
	private $_new_meta_table;
	function __construct() {
		global $wpdb;
		$this->_old_table = $wpdb->prefix."events_detail";
		$this->_new_table = $wpdb->prefix."posts";
		$this->_new_meta_table = $wpdb->prefix."esp_event_meta";
		$this->_pretty_name = __("Events", "event_espresso");
		parent::__construct();
	}
	function _count_records_to_migrate() {
		global $wpdb;
		$count = $wpdb->get_var("SELECT COUNT(*) FROM ".$this->_old_table);
		return intval($count);
	}
	protected function _migration_step($num_items_to_migrate = 50) {
		global $wpdb;
		$events = $wpdb->get_results($wpdb->prepare("SELECT * FROM $this->_old_table LIMIT %d,%d",$this->count_records_migrated(),$num_items_to_migrate),ARRAY_A);
		if($events){
			foreach($events as $event_row){
				//insert new 4.1 Attendee object using $wpdb
			}
			$this->set_status(EE_Data_Migration_Manager::status_continue);
		}else{
			$this->set_status(EE_Data_Migration_Manager::status_completed);
		}
		return count($events);
	}
	
	private function _insert_cpt($old_event){
		$post_status = 'draft';//calculating this can be complicated
		$cols_n_values = array(
			'post_title'=>$old_event['event_name'],//EVT_name
			'post_content'=>$old_event['event_desc'],//EVT_desc
			'post_name'=>$old_event['event_identifier'],//EVT_slug
			'post_date'=>$old_event['submitted'],//EVT_created
			'post_excerpt'=>wp_trim_words($old_event['event_desc'],50),//EVT_short_desc
			'post_modified'=>$old_event['submitted'],//EVT_modified
			'post_author'=>$old_event['wp_user'],//EVT_wp_user
			'post_parent'=>null,//parent maybe get this from some REM field?
			'menu_order'=>null,//EVT_order
			'post_type'=>'espresso_events',//post_type
			'post_status'=>null,//status
		);
		$datatypes = array(
			'%s',//EVT_name
			'%s',//EVT_desc
			'%s',//EVT_slug
			'%s',//EVT_created
			'%s',//EVT_short_desc
			'%s',//EVT_modified
			'%s',//EVT_wp_user
			'%d',//post_parent
			'%d',//EVT_order
			'%s',//post_type
			'%s',//status
		);		
	}
}