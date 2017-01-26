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
				'EVT_created'=>new EE_Datetime_Field('post_date', __("Date/Time Event Created", "event_espresso"), false, time()),
				'EVT_short_desc'=>new EE_Simple_HTML_Field('post_excerpt', __("Event Short Description", "event_espresso"), false,''),
				'EVT_modified'=>new EE_Datetime_Field('post_modified', __("Date/Time Event Modified", "event_espresso"), true, time()),
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
				'EVT_display_ticket_selector'=>new EE_Boolean_Field('EVT_display_ticket_selector', __("Display Display Ticket Selector Flag", "event_espresso"), false, 1),
				'EVT_visible_on'=>new EE_Datetime_Field('EVT_visible_on', __("Event Visible Date", "event_espresso"), true, time()),
				'EVT_additional_limit'=>new EE_Integer_Field('EVT_additional_limit', __("Limit of Additional Registrations on Same Transaction", "event_espresso"), true),
				'EVT_default_registration_status'=>new EE_Enum_Text_Field('EVT_default_registration_status', __("Default Registration Status on this Event", "event_espresso"), false, EEM_Registration::status_id_pending_payment, EEM_Registration::reg_status_array()),
				'EVT_member_only'=>new EE_Boolean_Field('EVT_member_only', __("Member-Only Event Flag", "event_espresso"), false, false),
				'EVT_phone'=> new EE_Plain_Text_Field('EVT_phone', __('Event Phone Number', 'event_espresso'), false ),
				'EVT_allow_overflow'=>new EE_Boolean_Field('EVT_allow_overflow', __("Allow Overflow on Event", "event_espresso"), false, false),
				'EVT_timezone_string'=>new EE_Plain_Text_Field('EVT_timezone_string', __("Timezone (name) for Event times", "event_espresso"), false),
				'EVT_external_URL'=>new EE_Plain_Text_Field('EVT_external_URL', __("URL of Event Page if hosted elsewhere", "event_espresso"), true),
				'EVT_donations'=>new EE_Boolean_Field('EVT_donations', __("Accept Donations?", "event_espresso"), false, false)

			));

 *
 * 3.1's start end table
 *
CREATE TABLE `wp_events_start_end` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `event_id` int(11) DEFAULT NULL,
  `start_time` varchar(10) DEFAULT NULL,
  `end_time` varchar(10) DEFAULT NULL,
  `reg_limit` int(15) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `event_id` (`event_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8$$


 *
 * and 4.1 Datetime model's tables and fields:
 * $this->_tables = array(
			'Datetime'=> new EE_Primary_Table('esp_datetime', 'DTT_ID')
		);
		$this->_fields = array(
			'Datetime'=>array(
				'DTT_ID'=> new EE_Primary_Key_Int_Field('DTT_ID', __('Datetime ID','event_espresso')),
				'EVT_ID'=>new EE_Foreign_Key_Int_Field('EVT_ID', __('Event ID','event_espresso'), false, 0, 'Event'),
				'DTT_EVT_start'=>new EE_Datetime_Field('DTT_EVT_start', __('Start time/date of Event','event_espresso'), false, time(), $timezone ),
				'DTT_EVT_end'=>new EE_Datetime_Field('DTT_EVT_end', __('End time/date of Event','event_espresso'), false, time(), $timezone ),
				'DTT_reg_limit'=>new EE_Integer_Field('DTT_reg_limit', __('Registration Limit for this time','event_espresso'), true, 999999),
				'DTT_sold'=>new EE_Integer_Field('DTT_sold', __('How many sales for this Datetime that have occurred', 'event_espresso'), true, 0 ),
				'DTT_is_primary'=>new EE_Boolean_Field('DTT_is_primary', __("Flag indicating datetime is primary one for event", "event_espresso"), false,false),
				'DTT_order' => new EE_Integer_Field('DTT_order', __('The order in which the Datetime is displayed', 'event_espresso'), false, 0),
				'DTT_parent' => new EE_Integer_Field('DTT_parent', __('Indicates what DTT_ID is the parent of this DTT_ID'), true, 0 ),
				'DTT_deleted' => new EE_Trashed_Flag_Field('DTT_deleted', __('Flag indicating datetime is archived', 'event_espresso'), false, false ),
			));
 */
class EE_DMS_4_1_0_events extends EE_Data_Migration_Script_Stage{
	private $_old_table;
	private $_old_start_end_table;
	private $_new_table;
	private $_new_meta_table;
	private $_new_datetime_table;



	/**
	 * Just initializes the status of the migration
	 * @throws EE_Error
	 */
	function __construct() {
		global $wpdb;
		$this->_old_table = $wpdb->prefix."events_detail";
		$this->_old_start_end_table = $wpdb->prefix."events_start_end";
		$this->_new_table = $wpdb->prefix."posts";
		$this->_new_meta_table = $wpdb->prefix."esp_event_meta";
		$this->_new_datetime_table = $wpdb->prefix."esp_datetime";
		$this->_pretty_name = __("Events", "event_espresso");
		parent::__construct();
	}



	/**
	 * Counts the records to migrate; the public version may cache it
	 * @return int
	 */
	function _count_records_to_migrate() {
		global $wpdb;
		$count = $wpdb->get_var("SELECT COUNT(*) FROM ".$this->_old_table);
		return intval($count);
	}



	/**
	 * IMPORTANT: if an error is encountered, or everything is finished, this stage should update its status property accordingly.
	 * Note: it should not alter the count of items migrated. That is done in the public function that calls this.
	 * IMPORTANT: The count of items migrated should ONLY be less than $num_items_to_migrate when it's the last migration step, otherwise it
	 * should always return $num_items_to_migrate. (Eg, if we're migrating attendees rows from the database, and $num_items_to_migrate is set to 50,
	 * then we SHOULD actually migrate 50 rows,but at very least we MUST report/return 50 items migrated)
	 * @param int $num_items_to_migrate
	 * @return int number of items ACTUALLY migrated
	 */
	protected function _migration_step( $num_items_to_migrate = 50) {
		global $wpdb;
		//because the migration of each event can be a LOT more work, make each step smaller
		$num_items_to_migrate = max(1,$num_items_to_migrate/5);
		$events = $wpdb->get_results($wpdb->prepare("SELECT * FROM $this->_old_table LIMIT %d,%d",$this->count_records_migrated(),$num_items_to_migrate),ARRAY_A);
		$items_migrated_this_step = 0;

		foreach($events as $event_row){
			$guid = null;
			//insert new 4.1 Attendee object using $wpdb
			$post_id = $this->_insert_cpt($event_row);
			if($post_id){
				$this->get_migration_script()->set_mapping($this->_old_table, $event_row['id'], $this->_new_table, $post_id);
				$meta_id = $this->_insert_event_meta($event_row, $post_id);
				if($meta_id){
					$this->get_migration_script()->set_mapping($this->_old_table, $event_row['id'], $this->_new_meta_table, $meta_id);
				}
				$this->_convert_start_end_times($event_row,$post_id);
				$event_meta = maybe_unserialize($event_row['event_meta']);
				$guid = isset($event_meta['event_thumbnail_url']) ? $event_meta['event_thumbnail_url'] : null;
				$this->get_migration_script()->convert_image_url_to_attachment_and_attach_to_post($guid,$post_id,$this);

				//maybe create a venue from info on the event?
				$new_venue_id = $this->_maybe_create_venue($event_row);
				if($new_venue_id){
					$this->_insert_new_venue_to_event($post_id,$new_venue_id);
				}
				$this->_add_post_metas($event_row, $post_id);
			}
			$items_migrated_this_step++;
			if($guid){
				//if we had to check for an image attachment
				//then let's call it a day (avoid timing out, because this took a long time)
				break;
			}
		}
		if($this->count_records_migrated() + $items_migrated_this_step >= $this->count_records_to_migrate()){
			$this->set_status(EE_Data_Migration_Manager::status_completed);
		}
		return $items_migrated_this_step;
	}

	/**
	 * Stores any extra 3.1 "event_meta" column things as post meta
	 * @param array $old_event
	 * @param int $post_id
	 * @return void
	 */
	private function _add_post_metas($old_event,$post_id){
		$event_meta = maybe_unserialize($old_event['event_meta']);
		if( ! $event_meta || ! is_array( $event_meta ) ){
			return;
		}
		unset($event_meta['date_submitted']);//factored into CPT
		unset($event_meta['additional_attendee_reg_info']);//factored into event meta table
		unset($event_meta['default_payment_status']);//dido
		unset($event_meta['event_thumbnail_url']);//used to find post featured image
		foreach($event_meta as $meta_key => $meta_value){
			if ($meta_key){//if the meta key is just an empty string, ignore it
				$success = add_post_meta($post_id,$meta_key,$meta_value,true);
				if( ! $success ){
					$this->add_error(sprintf(__("Could not add post meta for CPT with ID #%d. Meta key: '%s',meta value:'%d' for 3.1 event: %s", "event_espresso"),$post_id,$meta_key,$meta_value,implode(",",$old_event)));
				}
			}
		}
		if($old_event['alt_email']){
			add_post_meta($post_id,'alt_email',$old_event['alt_email']);
		}
		if($old_event['recurrence_id']){
			add_post_meta($post_id,'recurrence_id',$old_event['recurrence_id']);
		}
	}



	/**
	 * Finds a unique slug for this event, given its name (we could have simply used
	 * the old unique_identifier column, but it added a long string of seemingly random characters onto the end
	 * and really wasn't that pretty for a slug, so we decided we'd make our own slug again)
	 * @param string $event_name (the name of the event for reading by humans)
	 * @param string $old_identifier the old EE3 identifier (a long unique string)
	 * @param string $new_post_status a post status
	 * @return string
	 */
	private function _find_unique_slug($event_name, $old_identifier = '', $new_post_status = 'publish'){
		$count = 0;
		$original_name = $event_name ? sanitize_title($event_name) : $old_identifier;
		return wp_unique_post_slug($original_name, 0, $new_post_status, 'espresso_events', 0 );
	}

	/**
	 * returns whether or not there is a post that has this same slug (post_title)
	 * @global wpdb $wpdb
	 * @param string $slug
	 * @return boolean
	 */
	private function _other_post_exists_with_that_slug($slug){
		global $wpdb;
		$query = $wpdb->prepare("SELECT COUNT(ID) FROM {$this->_new_table} WHERE post_name = %s",$slug);
		$count = $wpdb->get_var($query);
		return (boolean)intval($count);
	}



	/**
	 * @param $old_event
	 * @return int
	 */
	private function _insert_cpt( $old_event ){
		global $wpdb;
		//convert 3.1 event status to 4.1 CPT status
		//for reference, 3.1 event stati available for setting are:
//		$status = array(array('id' => 'A', 'text' => __('Public', 'event_espresso')), array('id' => 'S', 'text' => __('Waitlist', 'event_espresso')), array('id' => 'O', 'text' => __('Ongoing', 'event_espresso')), array('id' => 'R', 'text' => __('Draft', 'event_espresso')), array('id' => 'D', 'text' => __('Deleted', 'event_espresso')));
//		and the json api uses the following to convert from 3.1 to 4.0
//		'S'=>'secondary/waitlist',
//		'A'=>'active',
//		'X'=>'denied',
//		'IA'=>'inactive',
//		'O'=>'ongoing',
//		'P'=>'pending',
//		'R'=>'draft',
//		'D'=>'deleted');
//		4.1 Event Post stati are the normal post statis
//		(publish,future,draft,pending,private,trash,auto-draft,inherit)
//		and 3 custom ones: cancelled,postponed,sold_out
		$status_conversions = array(
			'R'=>'draft',
			'X'=>'draft',//4.1 doesn't have a "not approved for publishing" status. this is what posts are set to that aren't approved
			'P'=>'pending',
			'IA'=>'draft',//draft and in the past
//IA=inactive in 3.1: events were switched to this when they expired. in 4.1 that's just calculated
			'O'=>'publish',//@todo: will be an event type later; if this is the status, set the end date WAAAY later; and add term for 'ongoing'
			'A'=>'publish',
			'S'=>'draft',//@todo: is it ok to just mark secondary/waitlist events as DRAFTS?
			'D'=>'trash',
		);
		$post_status = $status_conversions[$old_event['event_status']];
		//check if we've sold out
		if (intval($old_event['reg_limit']) <= self::count_registrations($old_event['id'])){
			$post_status = 'sold_out';
		}
//		FYI postponed and cancelled don't exist in 3.1
		$cols_n_values = array(
			'post_title'=>stripslashes($old_event['event_name']),//EVT_name
			'post_content'=>stripslashes($old_event['event_desc']),//EVT_desc
			'post_name'=>$this->_find_unique_slug($old_event['event_name'], $old_event['event_identifier'], $post_status ),//EVT_slug
			'post_date'=>$old_event['submitted'],//EVT_created NOT
			'post_date_gmt'=>get_gmt_from_date($old_event['submitted']),
			'post_excerpt'=>'',//EVT_short_desc
			'post_modified'=>$old_event['submitted'],//EVT_modified
			'post_modified_gmt'=>get_gmt_from_date($old_event['submitted']),
			'post_author'=>$old_event['wp_user'],//EVT_wp_user
			'post_parent'=>0,//parent maybe get this from some REM field?
			'menu_order'=>0,//EVT_order
			'post_type'=>'espresso_events',//post_type
			'post_status'=>$post_status,//status
		);
		$cols_n_values_with_no_invalid_text = array();
		foreach( $cols_n_values as $col => $value ) {
			$value_sans_invalid_chars = $wpdb->strip_invalid_text_for_column( $this->_new_table, $col, $value );
			if( ! is_wp_error( $value_sans_invalid_chars ) ) {
				$cols_n_values_with_no_invalid_text[ $col ] = $value_sans_invalid_chars;
			} else {
				//otherwise leave it as-is. It will blow everything up and stop the migration
				$cols_n_values_with_no_invalid_text[ $col ] = $value;
			}
		}
		$cols_n_values = $cols_n_values_with_no_invalid_text;
		$datatypes = array(
			'%s',//EVT_name
			'%s',//EVT_desc
			'%s',//EVT_slug
			'%s',//EVT_created
			'%s',
			'%s',//EVT_short_desc
			'%s',//EVT_modified
			'%s',
			'%s',//EVT_wp_user
			'%d',//post_parent
			'%d',//EVT_order
			'%s',//post_type
			'%s',//status
		);
		$success = $wpdb->insert($this->_new_table,
				$cols_n_values,
				$datatypes);
		if( ! $success ){
			$this->add_error($this->get_migration_script()->_create_error_message_for_db_insertion($this->_old_table, $old_event, $this->_new_table, $cols_n_values, $datatypes));
			return 0;
		}
		return $wpdb->insert_id;
	}

	/**
	 * Counts all the registrations for the event in the 3.1 DB. (takes into account attendee rows which represent various registrations)
	 * @global wpdb $wpdb
	 * @param int $event_id
	 * @return int
	 */
	public static function count_registrations($event_id){
		global $wpdb;
		$count = $wpdb->get_var($wpdb->prepare("SELECT sum(quantity) FROM {$wpdb->prefix}events_attendee WHERE event_id=%d",$event_id));
		return intval($count);
	}



	/**
	 * @param $old_event
	 * @param $new_cpt_id
	 * @return int
	 */
	private function _insert_event_meta( $old_event, $new_cpt_id){
		global $wpdb;
		$event_meta = maybe_unserialize($old_event['event_meta']);
//		for reference, 3.1 'default_payment_status' are: $default_payment_status = array(
//	array('id' => "", 'text' => 'No Change'),
//	array('id' => 'Incomplete', 'text' => 'Incomplete'),
//	array('id' => 'Pending', 'text' => 'Pending'),
//	//array('id' => 'Completed', 'text' => 'Completed')
//);
		$default_reg_status = $this->get_migration_script()->convert_3_1_payment_status_to_4_1_STS_ID(isset($event_meta['default_payment_status']) ? $event_meta['default_payment_status'] : '', intval($old_event['require_pre_approval']));
		$cols_n_values = array(
			'EVT_ID'=>$new_cpt_id,//EVT_ID_fk
			'EVT_display_desc'=> 'Y' == $old_event['display_desc'],
			'EVT_display_ticket_selector'=> 'Y'== $old_event['display_reg_form'],
			'EVT_visible_on'=> $this->get_migration_script()->convert_date_string_to_utc($this,$old_event,current_time('mysql'),$old_event['timezone_string']),//don't use the old 'visible_on', as it wasn't ever used
			'EVT_additional_limit'=> $old_event['allow_multiple'] == 'N' ? 1 : $old_event['additional_limit'],
			'EVT_default_registration_status' => $default_reg_status,
			'EVT_member_only'=>$old_event['member_only'],
			'EVT_phone'=> $old_event['phone'],
			'EVT_allow_overflow' => 'Y' == $old_event['allow_overflow'],
			'EVT_timezone_string'=> $old_event['timezone_string'],
			'EVT_external_URL'=>$old_event['externalURL'],
			'EVT_donations'=>false//doesnt exist in 3.1

		);
		$datatypes = array(
			'%s',//EVT_ID
			'%d',//EVT_display_desc
			'%d',//EVT_display_ticket_selector
			'%s',//EVT_visible_on
			'%d',//EVT_additional_limit
			'%s',//EVT_default_registration_status
			'%d',//EVT_member_only
			'%s',//EVT_phone
			'%d',//EVT_allow_overflow
			'%s',//EVT_timezone_string
			'%s',//EVT_external_URL
			'%d',//EVT_donations
		);
		$success = $wpdb->insert($this->_new_meta_table,
				$cols_n_values,
				$datatypes);
		if( ! $success ){
			$this->add_error($this->get_migration_script()->_create_error_message_for_db_insertion($this->_old_table, $old_event, $this->_new_meta_table, $cols_n_values, $datatypes));
			return 0;
		}
		return $wpdb->insert_id;
	}



	/**
	 * @param $old_event
	 * @return int
	 */
	private function _maybe_create_venue( $old_event){
		if(		$old_event['address'] ||
				$old_event['address2'] ||
				$old_event['city'] ||
				$old_event['state'] ||
				$old_event['zip'] ||
				$old_event['venue_title'] ||
				$old_event['venue_url'] ||
				$old_event['venue_image'] ||
				$old_event['venue_phone'] ||
				$old_event['virtual_url'] ||
				$old_event['virtual_phone']
				){
			$old_id = $this->_duplicate_venue_exists( $old_event );
			if( $old_id ){
				return $old_id;
			}
			$new_id = $this->_insert_venue_into_posts($old_event);
			if( $new_id ){
				$this->_insert_venue_into_meta_table($new_id, $old_event);
				$guid = isset($old_event['venue_image']) ? $old_event['venue_image']  : null;
				$this->get_migration_script()->convert_image_url_to_attachment_and_attach_to_post($guid, $new_id,$this);
			}
			//we don't bother recording the conversion from old events to venues as that
			//will complicate finding the conversion from old venues to new events
			return $new_id;
		}else{
			return 0;
		}
	}

	/**
	 * Assuming there is venue data on this event, check if there is a duplicate venue already in the system for it.
	 * If so, return it. Otherwise return NULL.
	 * @param array $old_event
	 * @return int duplicate venue id
	 */
	private function _duplicate_venue_exists($old_event){
		global $wpdb;
		$conditions = array(
			'VNU_address' => $old_event [ 'address' ],
			'VNU_address2' => $old_event[ 'address2' ],
			'VNU_city' => $old_event[ 'city' ],
			'VNU_zip' => $old_event[ 'zip' ],
			'post_title'=> $this->_get_venue_title_for_event( $old_event ),
			'VNU_phone'=>$old_event['venue_phone'],//VNU_phone
			'VNU_url'=>$old_event['venue_url'],//VNU_url
			'VNU_virtual_phone'=>$old_event['virtual_phone'],//VNU_virtual_phone
			'VNU_virtual_url'=>$old_event['virtual_url'],//VNU_virtual_url
		);
		$sql_conditions = array();
		foreach($conditions as $column => $value){
			$sql_conditions [] = $wpdb->prepare("$column = %s", $value );
		}
		$query = "SELECT VNU_ID
					FROM
		{$wpdb->posts} as p INNER JOIN
		{$wpdb->prefix}esp_venue_meta as v ON p.ID = v.VNU_ID
			WHERE " . implode( " AND ",$sql_conditions ) . " LIMIT 1";
		$id = $wpdb->get_var( $query );
		return $id;
	}

	/**
	 * Gets teh venue's title or makes one up if there is none
	 * @param array $event_data_array keys are events_details columns and values are their values
	 * @return string
	 */
	protected function _get_venue_title_for_event( $event_data_array ) {
		return $event_data_array['venue_title'] ? stripslashes($event_data_array['venue_title']) : stripslashes( sprintf( __( 'Venue of %s', 'event_espresso' ), $event_data_array['event_name']));
	}

	/**
	 * Inserts the CPT
	 *
	 * @param array $old_event keys are cols, values are col values
	 * @return int
	 */
	private function _insert_venue_into_posts($old_event){
		global $wpdb;
		$insertion_array = array(
					'post_title'=> $this->_get_venue_title_for_event( $old_event ),//VNU_name
					'post_content'=>'',//VNU_desc
					'post_name'=> $this->_find_unique_slug( $old_event['venue_title'], sanitize_title( 'venue-of-' . $old_event['event_name'] ) ),//VNU_identifier
					'post_date'=>current_time('mysql'),//VNU_created
					'post_date_gmt'=>get_gmt_from_date(current_time('mysql')),
					'post_excerpt'=>'',//VNU_short_desc arbitrary only 50 characters
					'post_modified'=>current_time('mysql'),//VNU_modified
					'post_modified_gmt'=>get_gmt_from_date(current_time('mysql')),
					'post_author'=>$old_event['wp_user'],//VNU_wp_user
					'post_parent'=>0,//parent
					'menu_order'=>0,//VNU_order
					'post_type'=>'espresso_venues'//post_type
				);
		$datatypes_array = array(
					'%s',//VNU_name
					'%s',//VNU_desc
					'%s',//VNU_identifier
					'%s',//VNU_created
					'%s',
					'%s',//VNU_short_desc
					'%s',//VNU_modified
					'%s',
					'%d',//VNU_wp_user
					'%d',//parent
					'%d',//VNU_order
					'%s',//post_type
				);
		$success = $wpdb->insert($wpdb->posts,
				$insertion_array,
				$datatypes_array);
		if( ! $success ){
			$this->add_error(
				$this->get_migration_script()->_create_error_message_for_db_insertion(
					$this->_old_table,
					$old_event,
					$this->_new_table,
					$insertion_array,
					$datatypes_array
				)
			);
			return 0;
		}
		return $wpdb->insert_id;
	}

	/**
	 * Inserts into the venue_meta table
	 * @param int $cpt_id
	 * @param array $old_event
	 * @return int
	 */
	private function _insert_venue_into_meta_table($cpt_id,$old_event){
		global $wpdb;

		//assume the country is the same as the organization's old settings
		$country_iso = $this->get_migration_script()->get_default_country_iso();
		//find the state from the venue, or the organization, or just guess california
		if( ! $old_event['state']){
			$old_org_options = get_option('events_organization_settings');
			$state_name = stripslashes($old_org_options['organization_state']);
		}else{
			$state_name = $old_event['state'];
		}
		if ( ! $state_name ){
			$state_name = 'CA';
		}
		//get a state ID with the same name, if possible
		try{
			$state = $this->get_migration_script()->get_or_create_state($state_name,$country_iso);
			$state_id = $state['STA_ID'];
		}catch(EE_Error $e){
			$this->add_error($e->getMessage());
			$state_id = 0;
		}
		//now insert into meta table
		$insertion_array = array(
			'VNU_ID'=>$cpt_id,//VNU_ID_fk
			'VNU_address'=>stripslashes($old_event['address']),//VNU_address
			'VNU_address2'=>stripslashes($old_event['address2']),//VNU_address2
			'VNU_city'=>stripslashes($old_event['city']),//VNU_city
			'STA_ID'=>$state_id,//STA_ID
			'CNT_ISO'=>$country_iso,//CNT_ISO
			'VNU_zip'=>$old_event['zip'],//VNU_zip
			'VNU_phone'=>$old_event['venue_phone'],//VNU_phone
			'VNU_capacity'=>-1,//VNU_capacity
			'VNU_url'=>$old_event['venue_url'],//VNU_url
			'VNU_virtual_phone'=>$old_event['virtual_phone'],//VNU_virtual_phone
			'VNU_virtual_url'=>$old_event['virtual_url'],//VNU_virtual_url
			'VNU_google_map_link'=>'',//VNU_google_map_link
			'VNU_enable_for_gmap'=>true	//VNU_enable_for_gmap
		);
		$datatypes = array(
			'%d',//VNU_ID_fk
			'%s',//VNU_address
			'%s',//VNU_address2
			'%s',//VNU_city
			'%d',//STA_ID
			'%s',//CNT_ISO
			'%s',//VNU_zip
			'%s',//VNU_phone
			'%d',//VNU_capacity
			'%s',//VNU_url
			'%s',//VNU_virtual_phone
			'%s',//VNU_virtual_url
			'%s',//VNU_google_map_link
			'%d',//VNU_enable_for_gmap
		);
		$success = $wpdb->insert($wpdb->prefix."esp_venue_meta",$insertion_array,$datatypes);
		if( ! $success ){
			$this->add_error($this->get_migration_script()->_create_error_message_for_db_insertion($this->_old_table, $old_event, $this->_new_meta_table, $insertion_array, $datatypes));
			return 0;
		}
		return $wpdb->insert_id;
	}



	/**
	 * @param $new_event_id
	 * @param $new_venue_id
	 * @return int
	 */
	private function _insert_new_venue_to_event( $new_event_id, $new_venue_id){
		global $wpdb;
		if( ! $new_event_id){
			$this->add_error(sprintf(__("Could not find 4.1 event id for 3.1 event #%d.", "event_espresso"),$new_event_id));
			return 0;
		}
		if( ! $new_venue_id){
			$this->add_error(sprintf(__("Could not find 4.1 venue id for 3.1 venue #%d.", "event_espresso"),$new_venue_id));
			return 0;
		}
		$cols_n_values = array(
			'EVT_ID'=>$new_event_id,
			'VNU_ID'=>$new_venue_id,
			'EVV_primary'=>true
		);
		$datatypes = array(
			'%d',//EVT_ID
			'%d',//VNU_ID
			'%d',//EVT_primary
		);
		$success = $wpdb->insert($wpdb->prefix."esp_event_venue",$cols_n_values,$datatypes);
		if ( ! $success){
			$this->add_error(
				$this->get_migration_script()->_create_error_message_for_db_insertion(
					$this->_old_table,
					array(),
					$this->_new_table,
					$cols_n_values,
					$datatypes
				)
			);
			return 0;
		}
		return $wpdb->insert_id;

	}
	/**
	 * Converts all the 3.1 start-end times for the event to 4.1 datetimes
	 * @global wpdb $wpdb
	 * @param array $old_event results of get_results(...,ARRAY_A)
	 * @param int $new_cpt_id new post ID
	 * @return void (if there are errors though, adds them to the stage's error list
	 */
	private function _convert_start_end_times($old_event,$new_cpt_id){
		$start_end_times = $this->_get_old_start_end_times($old_event['id']);
		foreach($start_end_times as $start_end_time){
			$datetime_id = $this->_insert_new_datetime($start_end_time,$old_event,$new_cpt_id);
			if($datetime_id){
				$this->get_migration_script()->set_mapping($this->_old_start_end_table, $start_end_time['id'], $this->_new_datetime_table, $datetime_id);
			}
		}
	}
	/**
	 * Queries the 3.1 wp_events_start_end table to get all the start and end times for the event
	 * @global wpdb $wpdb
	 * @param int $old_event_id
	 * @return array
	 */
	private function _get_old_start_end_times($old_event_id){
		global $wpdb;
		return $wpdb->get_results($wpdb->prepare("SELECT * FROM $this->_old_start_end_table WHERE event_id=%d",$old_event_id),ARRAY_A);
	}
	/**
	 * Inserts a 4.1 datetime given the 3.1 start_end db row and event_details row
	 * @param array $start_end_time_row
	 * @param array $old_event_row
	 * @param int $new_cpt_id
	 * @return int ID of new datetime
	 */
	private function _insert_new_datetime($start_end_time_row,$old_event_row,$new_cpt_id){
		global $wpdb;
		$start_date = $old_event_row['start_date'];
		$start_time = $this->get_migration_script()->convertTimeFromAMPM($start_end_time_row['start_time']);
		$end_date = $old_event_row['end_date'];
		$end_time = $this->get_migration_script()->convertTimeFromAMPM($start_end_time_row['end_time']);
		$existing_datetimes = $this->_count_other_datetimes_exist_for_new_event($new_cpt_id);
		$start_datetime_utc = $this->get_migration_script()->convert_date_string_to_utc($this,$start_end_time_row,"$start_date $start_time:00",$old_event_row['timezone_string']);
		$end_datetime_utc = $this->get_migration_script()->convert_date_string_to_utc($this,$start_end_time_row,"$end_date $end_time:00",$old_event_row['timezone_string']);
		$cols_n_values = array(
			'EVT_ID'=>$new_cpt_id,//EVT_ID
			'DTT_EVT_start'=>$start_datetime_utc,//DTT_EVT_start
			'DTT_EVT_end'=> $end_datetime_utc,//DTT_EVT_end
			'DTT_reg_limit'=>intval($start_end_time_row['reg_limit']) ? $start_end_time_row['reg_limit'] : $old_event_row['reg_limit'],//DTT_reg_limit
			'DTT_sold'=>0,//note: we will increment this as registrations are added during the migration
//			'DTT_is_primary'=> 0 == $existing_datetimes ,//DTT_is_primary... if count==0, then we'll call it the 'primary'
			'DTT_order'=> $existing_datetimes,//DTT_order, just give it the same order as the count of how many datetimes already exist
			'DTT_parent'=>0,
			'DTT_deleted'=>false
		);
		$datatypes = array(
			'%d',//EVT_Id
			'%s',//DTT_EVT_start
			'%s',//DTT_EVT_end
			'%d',//DTT_reg_limit
			'%d',//DTT_sold
//			'%d',//DTT_is_primary
			'%d',//DTT_order
			'%d',//DTT_parent
			'%d',//DTT_deleted
		);
		$success = $wpdb->insert($this->_new_datetime_table,$cols_n_values,$datatypes);
		if ( ! $success){
			$this->add_error($this->get_migration_script()->_create_error_message_for_db_insertion($this->_old_start_end_table, array_merge($old_event_row,$start_end_time_row), $this->_new_datetime_table, $cols_n_values, $datatypes));
			return 0;
		}
		return $wpdb->insert_id;
	}

	/**
	 * Checks if there's a 4.1 datetime for this event already. This is mostly only handy
	 * when deciding whether a datetime we're about ot insert should be the 'primary' or not
	 * @global wpdb $wpdb
	 * @param int $cpt_event_id
	 * @return int
	 */
	private function _count_other_datetimes_exist_for_new_event($cpt_event_id){
		global $wpdb;
		$count = $wpdb->get_var($wpdb->prepare("SELECT COUNT(*) FROM $this->_new_datetime_table WHERE EVT_ID=%d",$cpt_event_id));
		return intval($count);
	}







}
