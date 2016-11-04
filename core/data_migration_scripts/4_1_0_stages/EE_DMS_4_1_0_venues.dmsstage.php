<?php

/**
 * Converts old venues to Venue Custom Post Types.
 * Must be run after state and country default values have been added
 * Does NOT add relation to Events, but does ensure the state and countries
 * indicated on the venue exist
 * //		for reference, this is the 3.1 table we're expecting
//CREATE TABLE `wp_events_venue` (
//  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
//  `name` varchar(250) DEFAULT NULL,
//  `identifier` varchar(26) DEFAULT '0',
//  `address` varchar(250) DEFAULT NULL,
//  `address2` varchar(250) DEFAULT NULL,
//  `city` varchar(250) DEFAULT NULL,
//  `state` varchar(250) DEFAULT NULL,
//  `zip` varchar(250) DEFAULT NULL,
//  `country` varchar(250) DEFAULT NULL,
//  `meta` text,
//  `wp_user` int(22) DEFAULT '1',
//  PRIMARY KEY (`id`),
//  KEY `identifier` (`identifier`),
//  KEY `wp_user` (`wp_user`)
//) ENGINE=InnoDB DEFAULT CHARSET=utf8
		//For reference, this is what the tables and fields on the venue model in EE 4.1:
//		$this->_tables = array(
//			'Venue_CPT'=> new EE_Primary_Table('posts', 'ID'),
//			'Venue_Meta'=>new EE_Secondary_Table('esp_venue_meta', 'VNUM_ID', 'VNU_ID')
//		);
//		$this->_fields = array(
//			'Venue_CPT'=>array(
//				'VNU_ID'=>new EE_Primary_Key_Int_Field('ID', __("Venue ID", "event_espresso")),
//				'VNU_name'=>new EE_Plain_Text_Field('post_title', __("Venue Name", "event_espresso"), false, ''),
//				'VNU_desc'=>new EE_Simple_HTML_Field('post_content', __("Venue Description", "event_espresso"), true),
//				'VNU_identifier'=>new EE_Slug_Field('post_name', __("Venue Identifier", "event_espresso"), false,''),
//				'VNU_created'=>new EE_Datetime_Field('post_date', __("Date Venue Created", "event_espresso"), true,time()),
//				'VNU_short_desc'=>new EE_Plain_Text_Field('post_excerpt', __("Short Description of Venue", "event_espresso"), true),
//				'VNU_modified'=>new EE_Datetime_Field('post_modified', __("Venue Modified Date", "event_espresso"), true,time()),
//				'VNU_wp_user'=>new EE_Integer_Field('post_author', __("Venue Creator", "event_espresso"), false, 1),
//				'parent'=>new EE_Integer_Field('post_parent', __("Venue Parent ID", "event_espresso"), true),
//				'VNU_order'=>new EE_Integer_Field('menu_order', __("Venue order", "event_espresso"), false, 1),
//				'post_type'=>new EE_Plain_Text_Field('post_type', __("Venue post type", "event_espresso"), false, 'espresso_venues'),
//				),
//			'Venue_Meta'=>array(
//				'VNUM_ID'=>new EE_DB_Only_Int_Field('VNUM_ID', __("ID of Venue Meta Row", "event_espresso"), false),
//				'VNU_ID_fk'=>new EE_DB_Only_Int_Field('VNU_ID', __("Foreign Key to Venue Post ", "event_espresso"), false),
//				'VNU_address'=>new EE_Plain_Text_Field('VNU_address', __("Venue Address line 1", "event_espresso"), true, ''),
//				'VNU_address2'=>new EE_Plain_Text_Field('VNU_address2', __("Venue Address line 2", "event_espresso"), true,''),
//				'VNU_city'=>new EE_Plain_Text_Field('VNU_city', __("Venue City", "event_espresso"), true, ''),
//				'STA_ID'=>new EE_Foreign_Key_Int_Field('STA_ID', __("State ID", "event_espresso"), true, null, 'State'),
//				'CNT_ISO'=>new EE_Foreign_Key_String_Field('CNT_ISO', __("Country Code", "event_espresso"), true, null, 'Country'),
//				'VNU_zip'=>new EE_Plain_Text_Field('VNU_zip', __("Venue Zip/Postal Code", "event_espresso"), true),
//				'VNU_phone'=>new EE_Plain_Text_Field('VNU_phone', __("Venue Phone", "event_espresso"), true),
//				'VNU_capacity'=>new EE_Integer_Field('VNU_capacity', __("Venue Capacity", "event_espresso"), true),
//				'VNU_url'=>new EE_Plain_Text_Field('VNU_url', __('Venue Website', 'event_espresso'), true),
//				'VNU_virtual_phone'=>new EE_Plain_Text_Field('VNU_virtual_phone', __('Call in Number', 'event_espresso'), true),
//				'VNU_virtual_url'=>new EE_Plain_Text_Field('VNU_virtual_url', __('Virtual URL', 'event_espresso'), true ),
//				'VNU_google_map_link'=>new EE_Plain_Text_Field('VNU_google_map_link', __('Google Map Link', 'event_espresso'), true ),
//				'VNU_enable_for_gmap'=>new EE_Boolean_Field('VNU_enable_for_gmap', __('Show Google Map?', 'event_espresso'), false, false )
//
//			));
 *
 */
class EE_DMS_4_1_0_venues extends EE_Data_Migration_Script_Stage{
	private $_old_table;
	private $_new_table;
	private $_new_meta_table;
function _migration_step($num_items=50){
	global $wpdb;
	$start_at_record = $this->count_records_migrated();
	$rows = $wpdb->get_results($wpdb->prepare("SELECT * FROM ".$this->_old_table." LIMIT %d,%d",$start_at_record,$num_items),ARRAY_A);
	$items_actually_migrated = 0;
	foreach($rows as $old_venue){
		if ( ! $new_id = $this->_insert_into_posts($old_venue)){
			$items_actually_migrated++;
			continue;
		}
		$this->get_migration_script()->set_mapping($this->_old_table, $old_venue['id'], $this->_new_table, $new_id);
		if( ! $new_meta_id = $this->_insert_into_meta_table($new_id,$old_venue)){
			$items_actually_migrated++;
			continue;
		}
		$this->get_migration_script()->set_mapping($this->_old_table, $old_venue['id'], $this->_new_meta_table, $new_meta_id);
		//lastly, save the 'contact' as post meta, because it doesn't exist anywhere else but someone may still want it
		$venue_meta = maybe_unserialize($old_venue['meta']);
		if(isset($venue_meta['contact']) && $venue_meta['contact']){
			add_post_meta($new_id,'contact',$venue_meta['contact']);
		}
		//is there an image on this venue?
		$guid = isset($venue_meta['image']) && $venue_meta['image'] ? $venue_meta['image'] : NULL;
		if($guid){
			$this->get_migration_script()->convert_image_url_to_attachment_and_attach_to_post($guid,$new_id,$this);
		}
		$items_actually_migrated++;
		if($guid){
			//if there was an image, we may have had to download it etc and it may have taken
			//longer, then let's not bother migrating anymore on this step
			break;
		}
	}
	if($this->count_records_migrated() + $items_actually_migrated >= $this->count_records_to_migrate()){
		$this->set_completed();
	}
	return $items_actually_migrated;
}
function _count_records_to_migrate() {
	global $wpdb;
	$count = $wpdb->get_var("SELECT COUNT(id) FROM ".$this->_old_table);
	return $count;
}
function __construct() {
	$this->_pretty_name = __("Venues", "event_espresso");
	global $wpdb;
	$this->_old_table = $wpdb->prefix."events_venue";
	$this->_new_table = $wpdb->posts;
	$this->_new_meta_table = $wpdb->prefix."esp_venue_meta";
	parent::__construct();
}

	/**
	 * Inserts the CPT
	 * @param array $old_venue keys are cols, values are col values
	 * @return int
	 */
	private function _insert_into_posts($old_venue){
		global $wpdb;
		$meta = maybe_unserialize($old_venue['meta']);
		$slug = $this->_find_unique_slug( $old_venue[ 'name' ], $old_venue[ 'identifier' ] );
		$insertion_array = array(
					'post_title'=>stripslashes($old_venue['name']),//VNU_name
					'post_content'=>isset($meta['description']) ? stripslashes(strip_tags($meta['description'])) : '',//VNU_desc
					'post_name'=> $slug,//VNU_identifier
					'post_date'=>current_time('mysql'),//VNU_created
					'post_date_gmt'=>  current_time('mysql',true),
					'post_excerpt'=>'',//wp_trim_words($meta['description'] ? $meta['description'] : '',50),//VNU_short_desc arbitraty only 50 characters
					'post_modified'=>current_time('mysql'),//VNU_modified
					'post_modified_gmt'=>current_time('mysql',true),
					'post_author'=>$old_venue['wp_user'],//VNU_wp_user
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
		$success = $wpdb->insert($this->_new_table,
				$insertion_array,
				$datatypes_array);
		if( ! $success ){
			$this->add_error($this->get_migration_script()->_create_error_message_for_db_insertion($this->_old_table, $old_venue, $this->_new_table, $insertion_array, $datatypes_array));
			return 0;
		}
		return $wpdb->insert_id;
	}

	/**
	 * Finds a unique slug for this venue, given its name (we could have simply used
	 * the old unique_identifier column, but it added a long string of seemingly random characters onto the end
	 * and really wasn't that pretty for a slug, so we decided we'd make our own slug again)
	 * @param string $post_name
	 * @return string
	 */
	private function _find_unique_slug($post_name, $old_identifier = '' ){
		$count = 0;
		$original_name = $post_name ? sanitize_title( $post_name ) : $old_identifier;
		$event_slug = $original_name;
		while( $this->_other_post_exists_with_that_slug($event_slug) && $count<50){
			$event_slug = sanitize_title($original_name."-".++$count);
		}
		return $event_slug;
	}

	/**
	 * returns whether or not there is a post that has this same slug (post_title)
	 * @global type $wpdb
	 * @param type $slug
	 * @return boolean
	 */
	private function _other_post_exists_with_that_slug($slug){
		global $wpdb;
		$query = $wpdb->prepare("SELECT COUNT(ID) FROM ".$this->_new_table." WHERE post_name = %s",$slug);
		$count = $wpdb->get_var($query);
		return (boolean)intval($count);
	}

	/**
	 * Inserts into the venue_meta table
	 * @param type $cpt_id
	 * @param type $old_venue
	 * @return int
	 */
	private function _insert_into_meta_table($cpt_id,$old_venue){
		global $wpdb;
		//get a country with the same name, or insert one
		try{
			$country = $this->get_migration_script()->get_or_create_country(stripslashes($old_venue['country']));
			$country_iso = $country['CNT_ISO'];
		}catch(EE_Error $e){
			$this->add_error(sprintf(__("%s for venue %s", "event_espresso"),$e->getMessage(),$this->_json_encode($old_venue)));
			$country_iso = null;
		}
		//get a state with the same name, if possible
		try{
			$state = $this->get_migration_script()->get_or_create_state(stripslashes($old_venue['state']),isset($country['CNT_name']) ? $country['CNT_name'] : strip_tags($old_venue['country']));
			$state_id = $state['STA_ID'];
		}catch(EE_Error $e){
			$this->add_error(sprintf(__("%s for venue %s", "event_espresso"),$e->getMessage(),$this->_json_encode($old_venue)));
			$state_id = 0;
		}
		$meta = maybe_unserialize($old_venue['meta']);
		//now insert into meta table
		$insertion_array = array(
			'VNU_ID'=>$cpt_id,//VNU_ID_fk
			'VNU_address'=>stripslashes($old_venue['address']),//VNU_address
			'VNU_address2'=>stripslashes($old_venue['address2']),//VNU_address2
			'VNU_city'=>stripslashes($old_venue['city']),//VNU_city
			'STA_ID'=>$state_id,//STA_ID
			'CNT_ISO'=>$country_iso,//CNT_ISO
			'VNU_zip'=>stripslashes($old_venue['zip']),//VNU_zip
			'VNU_phone'=>isset($meta['phone']) ? stripslashes($meta['phone']) : '',//VNU_phone
			'VNU_capacity'=>-1,//VNU_capacity
			'VNU_url'=>isset($meta['website']) ? stripslashes($meta['website']) : '',//VNU_url
			'VNU_virtual_phone'=>'',//VNU_virtual_phone
			'VNU_virtual_url'=>'',//VNU_virtual_url
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
		$success = $wpdb->insert($this->_new_meta_table,$insertion_array,$datatypes);
		if( ! $success ){
			$this->add_error($this->get_migration_script()->_create_error_message_for_db_insertion($this->_old_table, $old_venue, $this->_new_meta_table, $insertion_array, $datatypes));
			return 0;
		}
		return $wpdb->insert_id;
	}
}
