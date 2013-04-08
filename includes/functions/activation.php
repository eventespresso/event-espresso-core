<?php

//Install/update data tables in the Wordpress database
//Attention!! The WP dbDelta function cannot modify unique keys
//Please note that when updating the plugin and WordPress is in debug mode, you may see the following warning/notice:
//The plugin generated 15089 characters of unexpected output during activation. If you notice "headers already sent" messages,
//problems with syndication feeds or other issues, try deactivating or removing this plugin.
//This fix for this problem:
//The short and simple solution is to simply check the table exists and then drop the index manually before calling the dbDelta function.

/* if ($wpdb->get_var("SHOW TABLES LIKE $table") == $table) {
  $wpdb->query("ALTER TABLE $table DROP INDEX date");
  } */ 

//Credit: http://flav36rs.com/2010/04/02/wp-dbdelta-function-cannot-modify-unique-keys/
//This fixes some tables that may have been named wrong in an earlier version of the plugin
function event_espresso_rename_tables($old_table_name, $new_table_name) {
	global $wpdb;

	$old_table_name = $wpdb->prefix . $old_table_name;
	$new_table_name = $wpdb->prefix . $new_table_name;

	if ($wpdb->get_var("SHOW TABLES LIKE '" . $old_table_name . "'") == $old_table_name) {
		$wpdb->query("ALTER TABLE " . $old_table_name . " RENAME TO " . $new_table_name);
	}
}

//This function updates the org_options from < EE 3.2
function espresso_fix_org_options() {
	global $org_options, $espresso_wp_user;
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	if (empty($org_options))
		return;

	//Retrive the existing $org_options, update, then unset the old one
	if (array_key_exists('display_description_on_multi_reg_page', $org_options)) {
		$org_options['template_settings']['display_description_on_multi_reg_page'] = empty($org_options['display_description_on_multi_reg_page']) ? false : $org_options['display_description_on_multi_reg_page'];
		unset($org_options['display_description_on_multi_reg_page']);
	}

	if (array_key_exists('display_short_description_in_event_list', $org_options)) {
		$org_options['template_settings']['display_short_description_in_event_list'] = empty($org_options['display_short_description_in_event_list']) ? false : $org_options['display_short_description_in_event_list'];
		unset($org_options['display_short_description_in_event_list']);
	}

	if (array_key_exists('display_address_in_event_list', $org_options)) {
		$org_options['template_settings']['display_address_in_event_list'] = empty($org_options['display_address_in_event_list']) ? false : $org_options['display_address_in_event_list'];
		unset($org_options['display_address_in_event_list']);
	}

	if (array_key_exists('display_address_in_regform', $org_options)) {
		$org_options['template_settings']['display_address_in_regform'] = empty($org_options['display_address_in_regform']) ? false : $org_options['display_address_in_regform'];
		unset($org_options['display_address_in_regform']);
	}

	if (array_key_exists('use_custom_post_types', $org_options)) {
		$org_options['template_settings']['use_custom_post_types'] = empty($org_options['use_custom_post_types']) ? false : true;
		unset($org_options['use_custom_post_types']);
	}

	if (array_key_exists('enable_default_style', $org_options)) {
		$org_options['style_settings']['enable_default_style'] = empty($org_options['enable_default_style']) ? false : $org_options['enable_default_style'];
		unset($org_options['enable_default_style']);
	}

	if (array_key_exists('selected_style', $org_options)) {
		$org_options['style_settings']['selected_style'] = empty($org_options['selected_style']) ? '' : $org_options['selected_style'];
		unset($org_options['selected_style']);
	}

	if (array_key_exists('style_color', $org_options)) {
		$org_options['style_settings']['style_color'] = empty($org_options['style_color']) ? '' : $org_options['style_color'];
		unset($org_options['style_color']);
	}

	$org_options['default_mail'] = $org_options['default_mail'] || $org_options['default_mail'] == 'Y' ? true : false;
	$org_options['expire_on_registration_end'] = $org_options['expire_on_registration_end'] || $org_options['expire_on_registration_end'] == 'Y' ? true : false;
	$org_options['enable_default_style'] = $org_options['enable_default_style'] || $org_options['enable_default_style'] == 'Y' ? true : false;
	$org_options['event_ssl_active'] = $org_options['event_ssl_active'] || $org_options['event_ssl_active'] == 'Y' ? true : false;
	$org_options['use_venue_manager'] = $org_options['use_venue_manager'] || $org_options['use_venue_manager'] == 'Y' ? true : false;
	$org_options['show_reg_footer'] = $org_options['show_reg_footer'] || $org_options['show_reg_footer'] == 'Y' ? true : false;
	$org_options['template_settings']['use_custom_post_types'] = $org_options['template_settings']['use_custom_post_types'] || $org_options['template_settings']['use_custom_post_types'] == 'Y' ? true : false;
	$org_options['template_settings']['display_address_in_regform'] = $org_options['template_settings']['display_address_in_regform'] || $org_options['template_settings']['display_address_in_regform'] == 'Y' ? true : false;
	$org_options['template_settings']['display_short_description_in_event_list'] = $org_options['template_settings']['display_short_description_in_event_list'] || $org_options['template_settings']['display_short_description_in_event_list'] == 'Y' ? true : false;
	$org_options['template_settings']['display_address_in_event_list'] = $org_options['template_settings']['display_address_in_event_list'] || $org_options['template_settings']['display_address_in_event_list'] == 'Y' ? true : false;
	$org_options['template_settings']['display_description_on_multi_reg_page'] = $org_options['template_settings']['display_description_on_multi_reg_page'] || $org_options['template_settings']['display_description_on_multi_reg_page'] == 'Y' ? true : false;
	$org_options['template_settings']['display_description_in_event_list'] = $org_options['template_settings']['display_description_in_event_list'] || $org_options['template_settings']['display_description_in_event_list'] == 'Y' ? true : false;
	$org_options['template_settings']['use_custom_templates'] = $org_options['template_settings']['use_custom_templates'] || $org_options['template_settings']['use_custom_templates'] == 'Y' ? true : false;
	$org_options['map_settings']['ee_map_nav_display_single'] = $org_options['map_settings']['ee_map_nav_display_single'] || $org_options['map_settings']['ee_map_nav_display_single'] == 'Y' ? true : false;
	$org_options['map_settings']['ee_map_nav_display'] = $org_options['map_settings']['ee_map_nav_display'] || $org_options['map_settings']['ee_map_nav_display'] == 'Y' ? true : false;

	update_user_meta($espresso_wp_user, 'events_organization_settings', $org_options);
}






function espresso_initialize_system_questions() {
	
	// QUESTION GROUPS
	global $wpdb;
	$SQL = 'SELECT QSG_system_ID FROM ' . $wpdb->prefix . 'esp_question_group WHERE QSG_system_ID != 0';
	// what we have
	$question_groups = $wpdb->get_col( $SQL );
	// check the reponse
	$question_groups = is_array( $question_groups ) ? $question_groups : array();
	// what we should have
	$QSG_system_IDs = array( 1, 2 );
	// loop thru what we should have and compare to what we have
	foreach ( $QSG_system_IDs as $QSG_system_ID ) {
		// if we don't have what we should have
		if ( ! in_array( $QSG_system_ID, $question_groups )) {
			// add it
			switch ( $QSG_system_ID ) {
				
				case 1:
						$QSG_values = array( 
								'QSG_name' => 'Personal Information',
								'QSG_identifier' => 'personal-information-' . time(),
								'QSG_desc' => '',
								'QSG_order' => 1,
								'QSG_show_group_name' => 1,
								'QSG_show_group_desc' => 1,
								'QSG_system_ID' => 1,
								'QSG_deleted' => 0
							);
					break;
					
				case 2:
						$QSG_values = array( 
								'QSG_name' => 'Address Information',
								'QSG_identifier' => 'address-information-' . time(),
								'QSG_desc' => '',
								'QSG_order' => 2,
								'QSG_show_group_name' => 1,
								'QSG_show_group_desc' => 1,
								'QSG_system_ID' => 2,
								'QSG_deleted' => 0
							);
					break;
					
			}
			// insert system question
			$wpdb->insert(
				$wpdb->prefix . 'esp_question_group', 
				$QSG_values, 
				array('%s', '%s', '%s', '%d', '%d', '%d', '%d', '%d' )
			);
			$QSG_IDs[ $QSG_system_ID ] = $wpdb->insert_id;		
		}
	}


	
	// QUESTIONS
	global $wpdb;
	$SQL = 'SELECT QST_system_ID FROM ' . $wpdb->prefix . 'esp_question WHERE QST_system_ID != 0';
	// what we have
	$questions = $wpdb->get_col( $SQL );
	// what we should have
	$QST_system_IDs = array( 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 );
	// loop thru what we should have and compare to what we have
	foreach ( $QST_system_IDs as $QST_system_ID ) {
		// if we don't have what we should have
		if ( ! in_array( $QST_system_ID, $questions )) {
			// add it
			switch ( $QST_system_ID ) {
				
				case 1:
						$QST_values = array( 
								'QST_display_text' => 'First Name',
								'QST_admin_label' => 'First Name - System Question',
								'QST_system_ID' => 1,
								'QST_type' => 'TEXT',
								'QST_required' => 1,
								'QST_required_text' => 'This field is required',
								'QST_order' => 1,
								'QST_admin_only' => 0,
								'QST_wp_user' => 1,
								'QST_deleted' => 0
							);
					break;
					
				case 2:
						$QST_values = array( 
								'QST_display_text' => 'Last Name',
								'QST_admin_label' => 'Last Name - System Question',
								'QST_system_ID' => 2,
								'QST_type' => 'TEXT',
								'QST_required' => 1,
								'QST_required_text' => 'This field is required',
								'QST_order' => 2,
								'QST_admin_only' => 0,
								'QST_wp_user' => 1,
								'QST_deleted' => 0
							);
					break;
					
				case 3:
						$QST_values = array( 
								'QST_display_text' => 'Email Address',
								'QST_admin_label' => 'Email Address - System Question',
								'QST_system_ID' => 3,
								'QST_type' => 'TEXT',
								'QST_required' => 1,
								'QST_required_text' => 'This field is required',
								'QST_order' => 3,
								'QST_admin_only' => 0,
								'QST_wp_user' => 1,
								'QST_deleted' => 0
							);
					break;
					
				case 4:
						$QST_values = array( 
								'QST_display_text' => 'Address',
								'QST_admin_label' => 'Address - System Question',
								'QST_system_ID' => 4,
								'QST_type' => 'TEXT',
								'QST_required' => 0,
								'QST_required_text' => 'This field is required',
								'QST_order' => 4,
								'QST_admin_only' => 0,
								'QST_wp_user' => 1,
								'QST_deleted' => 0
							);
					break;
					
				case 5:
						$QST_values = array( 
								'QST_display_text' => 'Address2',
								'QST_admin_label' => 'FirAddress2 - System Question',
								'QST_system_ID' => 5,
								'QST_type' => 'TEXT',
								'QST_required' => 0,
								'QST_required_text' => 'This field is required',
								'QST_order' => 5,
								'QST_admin_only' => 0,
								'QST_wp_user' => 1,
								'QST_deleted' => 0
							);
					break;
					
				case 6:
						$QST_values = array( 
								'QST_display_text' => 'City',
								'QST_admin_label' => 'City - System Question',
								'QST_system_ID' => 6,
								'QST_type' => 'TEXT',
								'QST_required' => 0,
								'QST_required_text' => 'This field is required',
								'QST_order' => 6,
								'QST_admin_only' => 0,
								'QST_wp_user' => 1,
								'QST_deleted' => 0
							);
					break;
					
				case 7:
						$QST_values = array( 
								'QST_display_text' => 'State / Province',
								'QST_admin_label' => 'State / Province - System Question',
								'QST_system_ID' => 7,
								'QST_type' => 'TEXT',
								'QST_required' => 0,
								'QST_required_text' => 'This field is required',
								'QST_order' => 7,
								'QST_admin_only' => 0,
								'QST_wp_user' => 1,
								'QST_deleted' => 0
							);
					break;
					
				case 8 : 
						$QST_values = array( 
								'QST_display_text' => 'Country',
								'QST_admin_label' => 'Country - System Question',
								'QST_system_ID' => 8,
								'QST_type' => 'TEXT',
								'QST_required' => 0,
								'QST_required_text' => 'This field is required',
								'QST_order' => 8,
								'QST_admin_only' => 0,
								'QST_wp_user' => 1,
								'QST_deleted' => 0
							);
					break;
					
				case 9:
						$QST_values = array( 
								'QST_display_text' => 'Zip / Postal Code',
								'QST_admin_label' => 'Zip / Postal Code - System Question',
								'QST_system_ID' => 9,
								'QST_type' => 'TEXT',
								'QST_required' => 0,
								'QST_required_text' => 'This field is required',
								'QST_order' => 9,
								'QST_admin_only' => 0,
								'QST_wp_user' => 1,
								'QST_deleted' => 0
							);
					break;
					
				case 10:
						$QST_values = array( 
								'QST_display_text' => 'Phone Number',
								'QST_admin_label' => 'Phone Number - System Question',
								'QST_system_ID' => 10,
								'QST_type' => 'TEXT',
								'QST_required' => 0,
								'QST_required_text' => 'This field is required',
								'QST_order' => 10,
								'QST_admin_only' => 0,
								'QST_wp_user' => 1,
								'QST_deleted' => 0
							);
					break;
					
			}
			// insert system question
			$wpdb->insert(
				$wpdb->prefix . 'esp_question', 
				$QST_values, 
				array( '%s', '%s', '%d', '%s', '%d', '%s', '%d', '%d', '%d', '%d' )
			);
			$QST_ID = $wpdb->insert_id;	
			
			// QUESTION GROUP QUESTIONS 
			
			// questions 1-3 go in group 1, the rest go in 2
			$QSG_ID = $QST_system_ID < 4 ? 1 : 2;			
			// add system questions to groups
			$wpdb->insert(
				$wpdb->prefix . 'esp_question_group_question', 
				array( 'QSG_ID' => $QSG_IDs[ $QSG_ID ], 'QST_ID' => $QST_ID ), 
				array( '%d', '%d' )
			);			
			
		}
	}

}






function espresso_org_option_initialization( $missing_options = FALSE ) {
	global $wpdb, $espresso_wp_user;

	$existing_org_options = get_user_meta( $espresso_wp_user, 'events_organization_settings', TRUE );
	$existing_org_options = is_array( $existing_org_options ) ? $existing_org_options : array();
	
	if ( empty( $existing_org_options ) || $missing_options ) {
		$default_org_options = array(
				'organization' => get_bloginfo('name'),
				'organization_street1' => '123 Onna Road',
				'organization_street2' => '',
				'organization_city' => 'Inna City',
				'organization_state' => 'AZ',
				'organization_country' => '64',
				'organization_zip' => '84128',
				'country_id' => '',
				'contact_email' => get_bloginfo('admin_email'),
				'default_mail' => true,
				'currency_symbol' => '$',
				'default_logo_url' => '',
				'default_reg_status' => 'RPN',
				'pending_counts_reg_limit' => TRUE,
				'surcharge' => '0.00',
				'surcharge_type' => 'flat_rate',
				'events_in_dasboard' => '30',
				'use_captcha' => false,
				'expire_on_registration_end' => true,
				'enable_default_style' => true,
				'event_ssl_active' => false,
				'use_venue_manager' => true,
				'use_personnel_manager' => false,
				'show_reg_footer' => true,
				'use_attendee_pre_approval' => false,
				'time_reg_limit' => false,
				'espresso_url_rewrite_activated' => false,
				'template_settings' => array(
						'use_custom_post_types' => false,
						'display_address_in_regform' => false,
						'display_short_description_in_event_list' => true,
						'display_address_in_event_list' => false,
						'display_description_on_multi_reg_page' => false,
						'display_description_in_event_list' => false,
						'use_custom_templates' => false
				),
				'map_settings' => array(
						'ee_map_width_single' => '300',
						'ee_map_height_single' => '300',
						'ee_map_zoom_single' => '12',
						'ee_map_nav_display_single' => false,
						'ee_map_nav_size_single' => 'default',
						'ee_map_type_control_single' => 'default',
						'ee_map_align_single' => '',
						'ee_map_width' => '200',
						'ee_map_height' => '200',
						'ee_map_zoom' => '12',
						'ee_map_nav_display' => false,
						'ee_map_nav_size' => 'default',
						'ee_map_type_control' => 'default',
						'ee_map_align' => ''
				),
		);
		
		$new_org_options = array_merge( $default_org_options, $existing_org_options );
		update_user_meta( $espresso_wp_user, 'events_organization_settings', $new_org_options );
	
	}

}

//This function installs all the required database tables
function events_data_tables_install() {
	
	$table_version = EVENT_ESPRESSO_VERSION;

	$table_name='esp_answer';
	$sql=" ANS_ID INT UNSIGNED NOT NULL AUTO_INCREMENT ,
				REG_ID INT UNSIGNED NOT NULL ,
				QST_ID INT UNSIGNED NOT NULL ,
				ANS_value TEXT NOT NULL ,
				PRIMARY KEY  (ANS_ID)";
	event_espresso_run_install($table_name,$table_version,$sql, 'ENGINE=InnoDB');
	
	$table_name = 'esp_attendee';
	$sql = "ATT_ID int(10) unsigned NOT	NULL AUTO_INCREMENT,
					ATT_fname varchar(45) NOT NULL,
					ATT_lname varchar(45) NOT	NULL,
					ATT_address varchar(45) DEFAULT	NULL,
					ATT_address2 varchar(45) DEFAULT	NULL,
					ATT_city varchar(45) DEFAULT	NULL,
					STA_ID varchar(45) DEFAULT	NULL,
					CNT_ISO varchar(45) DEFAULT	NULL,
					ATT_zip varchar(12) DEFAULT	NULL,
					ATT_email varchar(100) NOT NULL,
					ATT_phone varchar(45) DEFAULT NULL,
					ATT_social text,
					ATT_comments mediumtext,
					ATT_notes mediumtext,
					ATT_deleted tinyint(1) unsigned NOT NULL DEFAULT '0',
						PRIMARY KEY  (ATT_ID),
							KEY ATT_fname (ATT_fname),
							KEY ATT_lname (ATT_lname),
							KEY ATT_email (ATT_email)";
	event_espresso_run_install($table_name, $table_version, $sql, 'ENGINE=InnoDB ');



	$table_name = 'esp_datetime';
	$sql = "DTT_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
			  EVT_ID int(10) unsigned NOT NULL,
			  DTT_is_primary tinyint(1) unsigned NOT NULL DEFAULT '0',
			  DTT_EVT_start int(10) unsigned NOT NULL,
			  DTT_EVT_end int(10) unsigned NOT NULL,
			  DTT_REG_start int(10) unsigned NOT NULL,
			  DTT_REG_end int(10) unsigned NOT NULL,
			  DTT_reg_limit mediumint(8) unsigned DEFAULT NULL,
			  DTT_tckts_left mediumint(8) unsigned DEFAULT NULL,
					PRIMARY KEY  (DTT_ID),
						KEY EVT_ID (EVT_ID),
						KEY DTT_is_primary (DTT_is_primary)";
	event_espresso_run_install($table_name, $table_version, $sql );


	
	$table_name='esp_event_question_group';
	$sql="EQG_ID INT UNSIGNED NOT NULL AUTO_INCREMENT ,
				EVT_ID INT UNSIGNED NOT NULL ,
				QSG_ID INT UNSIGNED NOT NULL ,
				EQG_primary TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
				PRIMARY KEY  (EQG_ID)";
	event_espresso_run_install($table_name,$table_version,$sql, 'ENGINE=InnoDB');



	$table_name = 'esp_message_template';
	$sql = "MTP_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
				  EVT_ID int(10) unsigned DEFAULT NULL,
				  GRP_ID int(10) unsigned NOT NULL,
				  MTP_user_id int(10) NOT NULL DEFAULT '1',
				  MTP_messenger varchar(30) NOT NULL,
				  MTP_message_type varchar(50) NOT NULL,
				  MTP_template_field varchar(30) NOT NULL,
				  MTP_context varchar(50) NOT NULL,
				  MTP_content text NOT NULL,
				  MTP_is_global tinyint(1) NOT NULL DEFAULT '0',
				  MTP_is_override tinyint(1) NOT NULL DEFAULT '0',
				  MTP_deleted tinyint(1) NOT NULL DEFAULT '0',
				  MTP_is_active tinyint(1) NOT NULL DEFAULT '1',
				  PRIMARY KEY  (MTP_ID),
				  KEY GRP_ID (GRP_ID),
				  KEY EVT_ID (EVT_ID),
				  KEY MTP_user_id (MTP_user_id)";
	event_espresso_run_install($table_name, $table_version, $sql, 'ENGINE=InnoDB ');



	$table_name = 'esp_payment';
	$sql = "PAY_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
				TXN_ID int(10) unsigned DEFAULT NULL,
				STS_ID varchar(3) COLLATE utf8_bin DEFAULT NULL,
				PAY_timestamp int(11) NOT NULL,
				PAY_method varchar(45) COLLATE utf8_bin DEFAULT NULL,
				PAY_amount decimal(10,2) DEFAULT NULL,
				PAY_gateway varchar(32) COLLATE utf8_bin DEFAULT NULL,
				PAY_gateway_response text COLLATE utf8_bin,
				PAY_txn_id_chq_nmbr varchar(32) COLLATE utf8_bin DEFAULT NULL,
				PAY_po_number varchar(32) COLLATE utf8_bin DEFAULT NULL,
				PAY_extra_accntng varchar(45) COLLATE utf8_bin DEFAULT NULL,
				PAY_via_admin tinyint(1) NOT NULL DEFAULT '0',
				PAY_details text COLLATE utf8_bin,
				PRIMARY KEY  (PAY_ID),
				KEY TXN_ID (TXN_ID),
				KEY PAY_timestamp (PAY_timestamp)";
	event_espresso_run_install($table_name, $table_version, $sql, 'ENGINE=InnoDB ');



	$table_name = "esp_price";  
	$sql = "PRC_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
				  PRT_ID tinyint(3) unsigned NOT NULL,
				  EVT_ID int(10) unsigned NOT NULL,
				  PRC_amount decimal(10,2) NOT NULL DEFAULT '0.00',
				  PRC_name varchar(45) NOT NULL,
				  PRC_desc text,
				  PRC_reg_limit mediumint(8) unsigned DEFAULT NULL,
				  PRC_tckts_left mediumint(8) unsigned DEFAULT NULL,
				  PRC_use_dates tinyint(1) unsigned NOT NULL DEFAULT '0',
				  PRC_start_date int(10) unsigned DEFAULT NULL,
				  PRC_end_date int(10) unsigned DEFAULT NULL,
				  PRC_is_active tinyint(1) unsigned NOT NULL DEFAULT '1',
				  PRC_overrides int(10) unsigned DEFAULT NULL,
				  PRC_deleted tinyint(1) unsigned NOT NULL DEFAULT '0',
				  PRC_order tinyint(3) unsigned NOT NULL DEFAULT '0',
				  PRIMARY KEY  (PRC_ID)";
	event_espresso_run_install($table_name, $table_version, $sql);



	$table_name = "esp_price_type";
	$sql = "PRT_ID tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
			  PRT_name VARCHAR(45) NOT NULL ,
			  PBT_ID tinyint(3) unsigned NOT NULL DEFAULT '1',
			  PRT_is_member tinyint(1) NOT NULL DEFAULT '0',
			  PRT_is_percent tinyint(1) NOT NULL DEFAULT '0',
			  PRT_is_global tinyint(1) NOT NULL DEFAULT '0',
			  PRT_order tinyint(1) UNSIGNED NULL,
			  PRT_deleted tinyint(1) NOT NULL DEFAULT '0',
			  UNIQUE KEY PRT_name_UNIQUE (PRT_name),
			  PRIMARY KEY  (PRT_ID)";
	event_espresso_run_install($table_name, $table_version, $sql);


	
	$table_name='esp_question';
	$sql='QST_ID INT UNSIGNED NOT NULL AUTO_INCREMENT,
				QST_display_text VARCHAR(100) NOT NULL,
				QST_admin_label VARCHAR(100) NOT NULL,
				QST_system_ID TINYINT(3) UNSIGNED NOT NULL,
				QST_type VARCHAR(25) NOT NULL DEFAULT "TEXT",
				QST_required TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
				QST_required_text VARCHAR(100) NULL,
				QST_order TINYINT UNSIGNED NOT NULL DEFAULT 0,
				QST_admin_only TINYINT(1) NOT NULL DEFAULT 0,
				QST_wp_user BIGINT UNSIGNED NULL,
				QST_deleted TINYINT UNSIGNED NOT NULL DEFAULT 0,
				PRIMARY KEY  (QST_ID)';
	event_espresso_run_install($table_name,$table_version,$sql, 'ENGINE=InnoDB');
	

	
	$table_name = 'esp_question_group';
	$sql='QSG_ID INT UNSIGNED NOT NULL AUTO_INCREMENT,
				QSG_name VARCHAR(100) NOT NULL,
				QSG_identifier VARCHAR(100) NOT NULL,
				QSG_desc TEXT NULL,
				QSG_order TINYINT UNSIGNED NOT NULL DEFAULT 0,
				QSG_show_group_name TINYINT(1) NOT NULL,
				QSG_show_group_desc TINYINT(1) NOT NULL,
				QSG_system_ID TINYINT(3) UNSIGNED NOT NULL,
				QSG_deleted TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
				PRIMARY KEY  (QSG_ID),
				UNIQUE INDEX QSG_identifier_UNIQUE (QSG_identifier ASC)';
	event_espresso_run_install($table_name,$table_version,$sql, 'ENGINE=InnoDB');
	
	
	
	$table_name='esp_question_group_question';
	$sql="QGQ_ID INT UNSIGNED NOT NULL AUTO_INCREMENT ,
				QSG_ID INT UNSIGNED NOT NULL ,
				QST_ID INT UNSIGNED NOT NULL ,
				PRIMARY KEY  (QGQ_ID) ";
	event_espresso_run_install($table_name,$table_version,$sql, 'ENGINE=InnoDB');


	
	$table_name='esp_question_option';
	$sql="QSO_ID INT UNSIGNED NOT NULL AUTO_INCREMENT ,
				QSO_name VARCHAR(100) NOT NULL ,
				QSO_value VARCHAR(100) NOT NULL ,
				QST_ID INT UNSIGNED NOT NULL ,
				QSO_deleted TINYINT(1) UNSIGNED NOT NULL DEFAULT 0 ,
				PRIMARY KEY  (QSO_ID)";
	event_espresso_run_install($table_name,$table_version,$sql, 'ENGINE=InnoDB');



	$table_name = 'esp_registration';
	$sql = "REG_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
				  EVT_ID int(10) unsigned NOT NULL,
				  ATT_ID int(10) unsigned NOT NULL,
				  TXN_ID int(10) unsigned NOT NULL,
				  DTT_ID int(10) unsigned NOT NULL,
				  PRC_ID int(10) unsigned NOT NULL,
				  STS_ID varchar(3) COLLATE utf8_bin NOT NULL DEFAULT 'RPN',
				  REG_date int(11) NOT NULL,
				  REG_final_price decimal(10,2) NOT NULL DEFAULT '0.00',
				  REG_session varchar(45) COLLATE utf8_bin NOT NULL,
				  REG_code varchar(45) COLLATE utf8_bin DEFAULT NULL,
				  REG_url_link varchar(64) COLLATE utf8_bin DEFAULT NULL,
				  REG_count tinyint(4) DEFAULT '1',
				  REG_group_size tinyint(4) DEFAULT '1',
				  REG_att_is_going tinyint(1) DEFAULT '0',
				  REG_att_checked_in tinyint(1) DEFAULT '0',
				  PRIMARY KEY  (REG_ID),
				  KEY EVT_ID (EVT_ID),
				  KEY ATT_ID (ATT_ID),
				  KEY TXN_ID (TXN_ID),
				  KEY DTT_ID (DTT_ID),
				  KEY STS_ID (STS_ID),
				  KEY REG_url_link (REG_url_link),
				  KEY REG_code (REG_code)";
	event_espresso_run_install($table_name, $table_version, $sql, 'ENGINE=InnoDB ');



	$table_name = 'esp_status';
	$sql = "STS_ID varchar(3) COLLATE utf8_bin NOT NULL,
				  STS_code varchar(45) COLLATE utf8_bin NOT NULL,
				  STS_type set('event','registration','transaction','payment','email') COLLATE utf8_bin NOT NULL,
				  STS_can_edit tinyint(1) NOT NULL DEFAULT 0,
				  STS_desc tinytext COLLATE utf8_bin,
				  STS_open tinyint(1) NOT NULL DEFAULT 1,
				  UNIQUE KEY STS_ID_UNIQUE (STS_ID),
				  KEY STS_type (STS_type)";
	event_espresso_run_install($table_name, $table_version, $sql );



	$table_name = 'esp_transaction';
	$sql = "TXN_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
				  TXN_timestamp int(11) NOT NULL,
				  TXN_total decimal(10,2) DEFAULT '0.00',
				  TXN_paid decimal(10,2) NOT NULL DEFAULT '0.00',
				  STS_ID varchar(3) NOT NULL DEFAULT 'TOP',
				  TXN_details text COLLATE utf8_bin,
				  TXN_tax_data text COLLATE utf8_bin,
				  TXN_session_data text COLLATE utf8_bin,
				  TXN_hash_salt varchar(250) COLLATE utf8_bin DEFAULT NULL,
				  PRIMARY KEY  (TXN_ID),
				  KEY TXN_timestamp (TXN_timestamp),
				  KEY STS_ID (STS_ID)";
	event_espresso_run_install($table_name, $table_version, $sql, 'ENGINE=InnoDB ');





	$table_name = "events_detail";
	$sql = "id int(11) unsigned NOT NULL AUTO_INCREMENT,
				event_code VARCHAR(26) DEFAULT '0',
				event_name VARCHAR(100) DEFAULT NULL,
				slug VARCHAR(100) DEFAULT NULL,				
				is_active tinyint(1) NOT NULL DEFAULT '1',
				event_status VARCHAR(1) DEFAULT 'A',
				event_desc TEXT,
				display_desc tinyint(1) DEFAULT 1,
				display_reg_form tinyint(1) DEFAULT 1,
				event_identifier VARCHAR(75) DEFAULT NULL,
				visible_on VARCHAR(15) DEFAULT NULL,
				reg_limit VARCHAR(25) DEFAULT '999999',
				allow_multiple tinyint(1) NOT NULL DEFAULT '0',
				additional_limit INT(10) DEFAULT '5',
				category_id TEXT,
				member_only tinyint(1) NOT NULL DEFAULT '0',
				allow_overflow tinyint(1) NOT NULL DEFAULT '0',
				overflow_event_id INT(10) DEFAULT '0',
				require_pre_approval tinyint(1) NOT NULL DEFAULT '0',
				post_id INT(11) DEFAULT NULL,
				post_type VARCHAR(50) DEFAULT NULL,
				externalURL VARCHAR(255) DEFAULT NULL,
				item_groups LONGTEXT NULL DEFAULT NULL,
				event_type VARCHAR(250) DEFAULT NULL,
				event_meta LONGTEXT DEFAULT NULL,
				wp_user int(22) DEFAULT '1',
				timezone_string VARCHAR(250) DEFAULT NULL,
				address TEXT,
				address2 TEXT,
				city VARCHAR(100) DEFAULT NULL,
				state VARCHAR(100) DEFAULT NULL,
				country VARCHAR(200) DEFAULT NULL,
				zip VARCHAR(11) DEFAULT NULL,
				phone VARCHAR(15) DEFAULT NULL,
				venue_title VARCHAR(250) DEFAULT NULL,
				venue_url VARCHAR(250) DEFAULT NULL,
				venue_image TEXT,
				venue_phone VARCHAR(15) DEFAULT NULL,
				virtual_url VARCHAR(250) DEFAULT NULL,
				virtual_phone VARCHAR(15) DEFAULT NULL,
				likes int(22) DEFAULT NULL,
				submitted datetime NOT NULL,
				ticket_id int(22) DEFAULT '0',
				certificate_id int(22) DEFAULT '0',
				PRIMARY KEY  (id),
				KEY slug (slug),
				KEY event_code (event_code),
				KEY wp_user (wp_user),
				KEY event_name (event_name),
				KEY city (city),
				KEY state (state),
				KEY reg_limit (reg_limit),
				KEY event_status (event_status),
				KEY submitted (submitted),
				KEY likes (likes)";
	event_espresso_run_install($table_name, $table_version, $sql);



	$table_name = "events_category_detail";
	$sql = "id int(11) unsigned NOT NULL AUTO_INCREMENT,
				category_name VARCHAR(100) DEFAULT NULL,
				category_identifier VARCHAR(45) DEFAULT NULL,
				category_desc TEXT,
				display_desc VARCHAR(4) DEFAULT NULL,
				wp_user int(22) DEFAULT '1',
				UNIQUE KEY id (id),
				KEY category_identifier (category_identifier),
				KEY wp_user (wp_user)";
	event_espresso_run_install($table_name, $table_version, $sql);



	$table_name = "events_category_rel";
	$sql = "id int(11) NOT NULL AUTO_INCREMENT,
				event_id int(11) DEFAULT NULL,
				cat_id int(11) DEFAULT NULL,
				PRIMARY KEY  (id),
			  	KEY event_id (event_id)";
	event_espresso_run_install($table_name, $table_version, $sql);



	$table_name = "events_venue";
	$sql = "id int(11) unsigned NOT NULL AUTO_INCREMENT,
				name VARCHAR(250) DEFAULT NULL,
				identifier VARCHAR(26) DEFAULT '0',
				address VARCHAR(250) DEFAULT NULL,
				address2 VARCHAR(250) DEFAULT NULL,
				city VARCHAR(250) DEFAULT NULL,
				state VARCHAR(250) DEFAULT NULL,
				zip VARCHAR(250) DEFAULT NULL,
				country VARCHAR(250) DEFAULT NULL,
				phone VARCHAR(250) DEFAULT NULL,
				vnu_capacity mediumint(8) unsigned NOT NULL,
				meta TEXT,
				wp_user int(22) DEFAULT '1',
				UNIQUE KEY id (id),
			  	KEY identifier (identifier),
				KEY wp_user (wp_user)";
	event_espresso_run_install($table_name, $table_version, $sql);



	$table_name = "events_venue_rel";
	$sql = "id int(11) NOT NULL AUTO_INCREMENT,
				event_id int(11) DEFAULT NULL,
				venue_id int(11) DEFAULT NULL,
				PRIMARY KEY  (id),
			  	KEY event_id (event_id)";
	event_espresso_run_install($table_name, $table_version, $sql);



	$table_name = "events_locale";
	$sql = "id int(11) unsigned NOT NULL AUTO_INCREMENT,
			  name varchar(250) DEFAULT NULL,
			  identifier varchar(26) DEFAULT '0',
			  wp_user int(22) DEFAULT '1',
			  UNIQUE KEY id (id),
			  KEY identifier (identifier),
			  KEY wp_user (wp_user)";
	event_espresso_run_install($table_name, $table_version, $sql);



	$table_name = "events_locale_rel";
	$sql = "id int(11) NOT NULL AUTO_INCREMENT,
				venue_id int(11) DEFAULT NULL,
				locale_id int(11) DEFAULT NULL,
				PRIMARY KEY  (id),
			  	KEY venue_id (venue_id)";
	event_espresso_run_install($table_name, $table_version, $sql);



	$table_name = "events_personnel";
	$sql = "id int(11) NOT NULL AUTO_INCREMENT,
				name VARCHAR(250) DEFAULT NULL,
				role VARCHAR(250) DEFAULT NULL,
				identifier VARCHAR(26) DEFAULT '0',
				email TEXT,
				meta TEXT,
				wp_user int(22) DEFAULT '1',
				UNIQUE KEY id (id),
			  	KEY identifier (identifier),
			  	KEY wp_user (wp_user)";
	event_espresso_run_install($table_name, $table_version, $sql);



	$table_name = "events_personnel_rel";
	$sql = "id int(11) NOT NULL AUTO_INCREMENT,
				event_id int(11) DEFAULT NULL,
				person_id int(11) DEFAULT NULL,
				PRIMARY KEY  (id),
			  	KEY event_id (event_id),
			  	KEY person_id (person_id)";
	event_espresso_run_install($table_name, $table_version, $sql);

	

}






//Creates folders in the uploads directory to facilitate addons and templates
function event_espresso_create_upload_directories() {
	// Create the required folders
	$folders = array(
			EVENT_ESPRESSO_UPLOAD_DIR,
			EVENT_ESPRESSO_TEMPLATE_DIR,
			EVENT_ESPRESSO_GATEWAY_DIR,
			EVENT_ESPRESSO_UPLOAD_DIR . '/logs/',
			EVENT_ESPRESSO_UPLOAD_DIR . '/css/',
			EVENT_ESPRESSO_UPLOAD_DIR . '/tickets/',
			EVENT_ESPRESSO_UPLOAD_DIR . '/themeroller/',
	);
	foreach ($folders as $folder) {
		wp_mkdir_p($folder);
		@ chmod($folder, 0755);
	}
}

function espresso_update_active_gateways() {
	//upgrade script for those updating from versions prior to 3.1.16.P
	//hooked to plugin activation
	//
	// Have to get a list of users already using the 3.2 system

	global $wpdb;
	$sql = "SELECT user_id FROM " . $wpdb->usermeta . " WHERE meta_key='events_organization_settings'";
	$users = $wpdb->get_col($sql);
	if (empty($users)) {
		$org_options = get_option('events_organization_settings');
		if (!empty($org_options)) {
			update_user_meta(1, 'events_organization_settings', $org_options);
		}
	}
	$sql = "SELECT user_id FROM " . $wpdb->usermeta . " WHERE meta_key='payment_settings'";
	$users = $wpdb->get_col($sql);

	// Payment settings prior to 3.2 have been independent wp_options in the db
	// This part takes the independent options and puts them into the payment
	// settings for the default ee_user, number 1.
	if (empty($users)) {
		$payment_settings = array();
		$twocheckout_settings = get_option('event_espresso_2checkout_settings');
		if (!empty($twocheckout_settings)) {
			$payment_settings['2checkout'] = $twocheckout_settings;
		}
		$authnet_aim_settings = get_option('event_espresso_authnet_aim_settings');
		if (!empty($authnet_aim_settings)) {
			$payment_settings['aim'] = $authnet_aim_settings;
		}
		$alipay_settings = get_option('event_espresso_alipay_settings');
		if (!empty($alipay_settings)) {
			$payment_settings['alipay'] = $alipay_settings;
		}
		$authnet_settings = get_option('event_espresso_authnet_settings');
		if (!empty($authnet_settings)) {
			$payment_settings['authnet'] = $authnet_settings;
		}
		$bank_settings = get_option('event_espresso_bank_settings');
		if (!empty($bank_settings)) {
			$payment_settings['bank'] = $bank_settings;
		}
		$check_settings = get_option('event_espresso_check_settings');
		if (!empty($check_settings)) {
			$payment_settings['check'] = $check_settings;
		}
		$eway_settings = get_option('event_espresso_eway_settings');
		if (!empty($eway_settings)) {
			$payment_settings['eway'] = $eway_settings;
		}
		$exact_settings = get_option('event_espresso_exact_settings');
		if (!empty($exact_settings)) {
			$payment_settings['exact'] = $exact_settings;
		}
		$firstdata_settings = get_option('event_espresso_firstdata_settings');
		if (!empty($firstdata_settings)) {
			$payment_settings['firstdata'] = $firstdata_settings;
		}
		$firstdata_connect_2_settings = get_option('event_espresso_firstdata_connect_2_settings');
		if (!empty($firstdata_connect_2_settings)) {
			$payment_settings['firstdata_connect_2'] = $firstdata_connect_2_settings;
		}
		$ideal_settings = get_option('event_espresso_ideal_settings');
		if (!empty($ideal_settings)) {
			$payment_settings['ideal'] = $ideal_settings;
		}
		$invoice_settings = get_option('event_espresso_invoice_settings');
		if (!empty($invoice_settings)) {
			$payment_settings['invoice'] = $invoice_settings;
		}
		$mwarrior_settings = get_option('event_espresso_mwarrior_settings');
		if (!empty($mwarrior_settings)) {
			$payment_settings['mwarrior'] = $mwarrior_settings;
		}
		$nab_settings = get_option('event_espresso_nab_settings');
		if (!empty($nab_settings)) {
			$payment_settings['nab'] = $nab_settings;
		}
		$paypal_settings = get_option('event_espresso_paypal_settings');
		if (!empty($paypal_settings)) {
			$payment_settings['paypal'] = $paypal_settings;
		}
		$paypal_pro_settings = get_option('event_espresso_paypal_pro_settings');
		if (!empty($paypal_pro_settings)) {
			$payment_settings['paypal_pro'] = $paypal_pro_settings;
		}
		$paytrace_settings = get_option('event_espresso_paytrace_settings');
		if (!empty($paytrace_settings)) {
			$payment_settings['paytrace'] = $paytrace_settings;
		}
		$quickpay_settings = get_option('event_espresso_quickpay_settings');
		if (!empty($quickpay_settings)) {
			$payment_settings['quickpay'] = $quickpay_settings;
		}
		$realauth_settings = get_option('event_espresso_realauth_settings');
		if (!empty($realauth_settings)) {
			$payment_settings['realauth'] = $realauth_settings;
		}
		$stripe_settings = get_option('event_espresso_stripe_settings');
		if (!empty($stripe_settings)) {
			$payment_settings['stripe'] = $stripe_settings;
		}
		$wepay_settings = get_option('event_espresso_wepay_settings');
		if (!empty($wepay_settings)) {
			$payment_settings['wepay'] = $wepay_settings;
		}
		$worldpay_settings = get_option('event_espresso_worldpay_settings');
		if (!empty($worldpay_settings)) {
			$payment_settings['worldpay'] = $worldpay_settings;
		}
		update_user_meta(1, 'payment_settings', $payment_settings);
		$users[0] = 1;
	}

	// This part updates any logos to the logos in the currently activated version of ee if they are the default
	// logos. If there have been custom logos uploaded, attempt to use them. If the admin used the media uploader button
	// then they should be fine. If they hand uploaded to the old ee folder, manually linked to it, and then
	// delete the old ee folder, advise them to use the media uploader.

	foreach ($users as $user) {
		$payment_settings = get_user_meta($user, 'payment_settings', true);
		if (!empty($payment_settings['2checkout']) && strpos($payment_settings['2checkout']['button_url'], "/2checkout/lib/logo.png")) {
			if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/2checkout/lib/logo.png")) {
				$payment_settings['2checkout']['button_url'] = EVENT_ESPRESSO_GATEWAY_URL . "/2checkout/lib/logo.png";
			} else {
				$payment_settings['2checkout']['button_url'] = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/2checkout/lib/logo.png";
			}
		}

		if (!empty($payment_settings['alipay']) && strpos($payment_settings['alipay']['button_url'], "/alipay/lib/new_logo.jpg")) {
			if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/alipay/lib/new_logo.jpg")) {
				$payment_settings['alipay']['button_url'] = EVENT_ESPRESSO_GATEWAY_URL . "/alipay/lib/new_logo.jpg";
			} else {
				$payment_settings['alipay']['button_url'] = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/alipay/lib/new_logo.jpg";
			}
		}

		if (!empty($payment_settings['authnet']) && strpos($payment_settings['authnet']['button_url'], "/authnet/lib/btn_cc_vmad.gif")) {
			if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/authnet/lib/btn_cc_vmad.gif")) {
				$payment_settings['authnet']['button_url'] = EVENT_ESPRESSO_GATEWAY_URL . "/authnet/lib/btn_cc_vmad.gif";
			} else {
				$payment_settings['authnet']['button_url'] = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/authnet/lib/btn_cc_vmad.gif";
			}
		}

		if (!empty($payment_settings['eway']) && strpos($payment_settings['eway']['button_url'], "/eway/lib/eway_logo.png")) {
			if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/eway/lib/eway_logo.png")) {
				$payment_settings['eway']['button_url'] = EVENT_ESPRESSO_GATEWAY_URL . "/eway/lib/eway_logo.png";
			} else {
				$payment_settings['eway']['button_url'] = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/eway/lib/eway_logo.png";
			}
		}

		if (!empty($payment_settings['exact']) && strpos($payment_settings['exact']['button_url'], "/exact/lib/btn_cc_vmad.gif")) {
			if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/exact/lib/btn_cc_vmad.gif")) {
				$payment_settings['exact']['button_url'] = EVENT_ESPRESSO_GATEWAY_URL . "/exact/lib/btn_cc_vmad.gif";
			} else {
				$payment_settings['exact']['button_url'] = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/exact/lib/btn_cc_vmad.gif";
			}
		}

		if (!empty($payment_settings['firstdata_connect_2']) && strpos($payment_settings['firstdata_connect_2']['button_url'], "/firstdata_connect_2/lib/standard_button.gif")) {
			if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/firstdata_connect_2/lib/standard_button.gif")) {
				$payment_settings['firstdata_connect_2']['button_url'] = EVENT_ESPRESSO_GATEWAY_URL . "/firstdata_connect_2/lib/standard_button.gif";
			} else {
				$payment_settings['firstdata_connect_2']['button_url'] = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/firstdata_connect_2/lib/standard_button.gif";
			}
		}

		if (!empty($payment_settings['mwarrior']) && strpos($payment_settings['mwarrior']['button_url'], "/mwarrior/lib/btn_checkout.png")) {
			if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/mwarrior/lib/btn_checkout.png")) {
				$payment_settings['mwarrior']['button_url'] = EVENT_ESPRESSO_GATEWAY_URL . "/mwarrior/lib/btn_checkout.png";
			} else {
				$payment_settings['mwarrior']['button_url'] = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/mwarrior/lib/btn_checkout.png";
			}
		}

		if (!empty($payment_settings['paypal']) && strpos($payment_settings['paypal']['button_url'], "/paypal/lib/btn_stdCheckout2.gif")) {
			if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/paypal/lib/btn_stdCheckout2.gif")) {
				$payment_settings['paypal']['button_url'] = EVENT_ESPRESSO_GATEWAY_URL . "/paypal/lib/btn_stdCheckout2.gif";
			} else {
				$payment_settings['paypal']['button_url'] = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/paypal/lib/btn_stdCheckout2.gif";
			}
		}

		if (!empty($payment_settings['realauth']) && strpos($payment_settings['realauth']['button_url'], "/realauth/lib/logo.gif")) {
			if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/realauth/lib/logo.gif")) {
				$payment_settings['realauth']['button_url'] = EVENT_ESPRESSO_GATEWAY_URL . "/realauth/lib/logo.gif";
			} else {
				$payment_settings['realauth']['button_url'] = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/realauth/lib/logo.gif";
			}
		}

		if (!empty($payment_settings['wepay']) && strpos($payment_settings['wepay']['button_url'], "/wepay/lib/logo.png")) {
			if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/wepay/lib/logo.png")) {
				$payment_settings['wepay']['button_url'] = EVENT_ESPRESSO_GATEWAY_URL . "/wepay/lib/logo.png";
			} else {
				$payment_settings['wepay']['button_url'] = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/wepay/lib/logo.png";
			}
		}

		if (!empty($payment_settings['worldpay']) && strpos($payment_settings['worldpay']['button_url'], "/worldpay/lib/WorldPaylogoBluetrans.png")) {
			if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/worldpay/lib/WorldPaylogoBluetrans.png")) {
				$payment_settings['worldpay']['button_url'] = EVENT_ESPRESSO_GATEWAY_URL . "/worldpay/lib/WorldPaylogoBluetrans.png";
			} else {
				$payment_settings['worldpay']['button_url'] = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/worldpay/lib/WorldPaylogoBluetrans.png";
			}
		}

		update_user_meta($user, 'payment_settings', $payment_settings);
	}
	// This one has to cover three senarios:
	// 1. If they are upgrading from 3.2 or later, just update the paths stored in the active gateways
	// 2. If they are upgrading from 3.1.17+, make the active gateways option the one for the admin
	// 3. If they are upgrading from prior to 3.1.16, take the individual active gateway settings and
	//    put them into an array and make it the active gateways option for the admin

	$dir = dirname(__FILE__);
	foreach ($users as $user) {
		$active_gateways = get_user_meta($user, 'active_gateways', true);
		if (empty($active_gateways)) {
			$active_gateways = get_option('event_espresso_active_gateways', array());
			if (empty($active_gateways)) {
				$active_gateways = array();
				if (get_option('events_2checkout_active') == true) {
					$active_gateways['2checkout'] = '';
				}
				if (get_option('events_authnet_aim_active') == true) {
					$active_gateways['aim'] = '';
				}
				if (get_option('events_alipay_active') == true) {
					$active_gateways['alipay'] = '';
				}
				if (get_option('events_authnet_active') == true) {
					$active_gateways['authnet'] = '';
				}
				if (get_option('events_bank_payment_active') == true) {
					$active_gateways['bank'] = '';
				}
				if (get_option('events_check_payment_active') == true) {
					$active_gateways['check'] = '';
				}
				if (get_option('events_eway_active') == true) {
					$active_gateways['eway'] = '';
				}
				if (get_option('events_exact_active') == true) {
					$active_gateways['exact'] = '';
				}
				if (get_option('events_firstdata_active') == true) {
					$active_gateways['firstdata'] = '';
				}
				if (get_option('events_firstdata_connect_2_active') == true) {
					$active_gateways['firstdata_connect_2'] = '';
				}
				if (get_option('events_ideal_active') == true) {
					$active_gateways['ideal'] = '';
				}
				if (get_option('events_invoice_payment_active') == true) {
					$active_gateways['invoice'] = '';
				}
				if (get_option('events_mwarrior_active') == true) {
					$active_gateways['mwarrior'] = '';
				}
				if (get_option('events_nab_active') == true) {
					$active_gateways['nab'] = '';
				}
				if (get_option('events_paypal_active') == true) {
					$active_gateways['paypal'] = '';
				}
				if (get_option('events_paypal_pro_active') == true) {
					$active_gateways['paypal_pro'] = '';
				}
				if (get_option('events_paytrace_active') == true) {
					$active_gateways['paytrace'] = '';
				}
				if (get_option('events_quickpay_active') == true) {
					$active_gateways['quickpay'] = '';
				}
				$payment_settings = get_option('event_espresso_realauth_settings');
				if (!empty($payment_settings['active'])) {
					$active_gateways['realauth'] = '';
				}
				if (get_option('events_stripe_active') == true) {
					$active_gateways['stripe'] = '';
				}
				if (get_option('events_worldpay_active') == true) {
					$active_gateways['worldpay'] = '';
				}
			}
			if (array_key_exists('2checkout', $active_gateways)) {
				$active_gateways['2checkout'] = $dir . "/2checkout";
			}
			if (array_key_exists('aim', $active_gateways)) {
				$active_gateways['aim'] = $dir . "/aim";
			}
			if (array_key_exists('alipay', $active_gateways)) {
				$active_gateways['alipay'] = $dir . "/alipay";
			}
			if (array_key_exists('authnet', $active_gateways)) {
				$active_gateways['authnet'] = $dir . "/authnet";
			}
			if (array_key_exists('bank', $active_gateways)) {
				$active_gateways['bank'] = $dir . "/bank";
			}
			if (array_key_exists('check', $active_gateways)) {
				$active_gateways['check'] = $dir . "/check";
			}
			if (array_key_exists('eway', $active_gateways)) {
				$active_gateways['eway'] = $dir . "/eway";
			}
			if (array_key_exists('exact', $active_gateways)) {
				$active_gateways['exact'] = $dir . "/exact";
			}
			if (array_key_exists('firstdata', $active_gateways)) {
				$active_gateways['firstdata'] = $dir . "/firstdata";
			}
			if (array_key_exists('firstdata_connect_2', $active_gateways)) {
				$active_gateways['firstdata_connect_2'] = $dir . "/firstdata_connect_2";
			}
			if (array_key_exists('ideal', $active_gateways)) {
				$active_gateways['ideal'] = $dir . "/ideal";
			}
			if (array_key_exists('invoice', $active_gateways)) {
				$active_gateways['invoice'] = $dir . "/invoice";
			}
			if (array_key_exists('mwarrior', $active_gateways)) {
				$active_gateways['mwarrior'] = $dir . "/mwarrior";
			}
			if (array_key_exists('nab', $active_gateways)) {
				$active_gateways['nab'] = $dir . "/nab";
			}
			if (array_key_exists('paypal', $active_gateways)) {
				$active_gateways['paypal'] = $dir . "/paypal";
			}
			if (array_key_exists('paypal_pro', $active_gateways)) {
				$active_gateways['paypal_pro'] = $dir . "/paypal_pro";
			}
			if (array_key_exists('paytrace', $active_gateways)) {
				$active_gateways['paytrace'] = $dir . "/paytrace";
			}
			if (array_key_exists('quickpay', $active_gateways)) {
				$active_gateways['quickpay'] = $dir . "/quickpay";
			}
			if (array_key_exists('realauth', $active_gateways)) {
				$active_gateways['realauth'] = $dir . "/realauth";
			}
			if (array_key_exists('stripe', $active_gateways)) {
				$active_gateways['stripe'] = $dir . "/stripe";
			}
			if (array_key_exists('worldpay', $active_gateways)) {
				$active_gateways['worldpay'] = $dir . "/worldpay";
			}
		}
		update_user_meta($user, 'active_gateways', $active_gateways);
	}
}



function espresso_default_price_types() {

	global $wpdb, $caffeinated;

	if ($wpdb->get_var("SHOW TABLES LIKE '" . ESP_PRICE_TYPE . "'") == ESP_PRICE_TYPE) {

		$SQL = 'DELETE FROM ' . ESP_PRICE_TYPE . ' WHERE PRT_ID < 8';
		$wpdb->query( $SQL );
	
		$SQL = "INSERT INTO " . ESP_PRICE_TYPE . " ( PRT_ID, PRT_name, PBT_ID, PRT_is_member, PRT_is_percent, PRT_is_global, PRT_order, PRT_deleted ) VALUES";

		$SQL .= $caffeinated ? "
					(1, 'Default Event Price', 1, 0, 0, 1, 0, 0),
					(2, 'Event Price', 1, 0, 0, 0, 0, 0),
					(3, 'Default Member % Discount', 2, 1, 1, 1, 10, 0),
					(4, 'Default Early Bird % Discount', 2, 0, 1, 1, 20, 0),
					(5, 'Default Surcharge', 3, 0, 0, 1, 30, 0),
					(6, 'Regional Tax', 4, 0, 1, 1, 40, 0),
					(7, 'Federal Tax', 4, 0, 1, 1, 50, 0);"
					: "
					(1, 'Default Event Price', 1, 0, 0, 1, 0, 1),
					(2, 'Event Price', 1, 0, 0, 0, 0, 0),
					(3, 'Member % Discount', 2, 1, 1, 0, 10, 0),
					(4, 'Early Bird % Discount', 2, 0, 1, 0, 20, 0),
					(5, 'Surcharge', 3, 0, 0, 0, 30, 0),
					(6, 'Regional Tax', 4, 0, 1, 1, 40, 1),
					(7, 'Federal Tax', 4, 0, 1, 1, 50, 1);";

		$wpdb->query( $SQL );	
	}

}



function espresso_default_prices() {

	global $wpdb, $caffeinated;
	
	if ($wpdb->get_var("SHOW TABLES LIKE '" . ESP_PRICE_TABLE . "'") == ESP_PRICE_TABLE) {
	
		$SQL = 'DELETE FROM ' . ESP_PRICE_TABLE . ' WHERE PRC_ID < 7';
		$wpdb->query( $SQL );
	
		$SQL = "INSERT INTO " . ESP_PRICE_TABLE . "
					(PRC_ID, PRT_ID, EVT_ID, PRC_amount, PRC_name, PRC_desc, PRC_use_dates, PRC_start_date, PRC_end_date, PRC_is_active, PRC_overrides, PRC_order, PRC_deleted ) VALUES
					(1, 1, 0, '10.00', 'General Admission', 'Regular price for all Events. Example content - delete if you want to', 0, NULL, NULL, 1, NULL, 0, 0),
					(2, 3, 0, '20', 'Members Discount', 'Members receive a 20% discount off of the regular price. Example content - delete if you want to', 0, NULL, NULL, 1, NULL, 10, 0),
					(3, 4, 0, '10', 'Early Bird Discount', 'Sign up early and receive an additional 10% discount off of the regular price. Example content - delete if you want to',  1, NULL, NULL, 1, NULL, 20, 0),
					(4, 5, 0, '7.50', 'Service Fee', 'Covers administrative expenses. Example content - delete if you want to', 0, NULL, NULL, 1, NULL, 30, 0)";
		$SQL .= $caffeinated ? ",
					(5, 6, 0, '7.00', 'Local Sales Tax', 'Locally imposed tax. Example content - delete if you want to', 0, NULL, NULL, 1, NULL, 40, 0),
					(6, 7, 0, '15.00', 'Sales Tax', 'Federally imposed tax. Example content - delete if you want to', 0, NULL, NULL, 1, NULL, 50, 0);" 
					: ",
					(5, 6, 0, '7.00', 'Local Sales Tax', 'Locally imposed tax. Example content - delete if you want to', 0, NULL, NULL, 1, NULL, 40, 1),
					(6, 7, 0, '15.00', 'Sales Tax', 'Federally imposed tax. Example content - delete if you want to', 0, NULL, NULL, 1, NULL, 50, 1);";
		
		$wpdb->query($SQL);
	}
	
}



function espresso_default_status_codes() {

	global $wpdb;

	if ($wpdb->get_var("SHOW TABLES LIKE '" . ESP_STATUS_TABLE . "'") == ESP_STATUS_TABLE) {
		$SQL = "DELETE FROM " . ESP_STATUS_TABLE . " WHERE STS_ID IN ( 'ACT', 'NAC', 'NOP', 'OPN', 'CLS', 'PND', 'ONG', 'SEC', 'DRF', 'DEL', 'DEN', 'EXP', 'RPN', 'RCN', 'RAP', 'RNA', 'TIN', 'TPN', 'TCM', 'TOP', 'PAP', 'PCN', 'PFL', 'PDC', 'EDR', 'ESN', 'PPN' );";
		$wpdb->query($SQL);
		
		$SQL = "INSERT INTO " . ESP_STATUS_TABLE . " 
				(STS_ID, STS_code, STS_type, STS_can_edit, STS_desc, STS_open) VALUES
				('ACT', 'ACTIVE', 'event', 0, NULL, 1),
				('NAC', 'NOT_ACTIVE', 'event', 0, NULL, 0),
				('NOP', 'REGISTRATION_NOT_OPEN', 'event', 0, NULL, 1),
				('OPN', 'REGISTRATION_OPEN', 'event', 0, NULL, 1),
				('CLS', 'REGISTRATION_CLOSED', 'event', 0, NULL, 0),
				('PND', 'PENDING', 'event', 0, NULL, 1),
				('ONG', 'ONGOING', 'event', 0, NULL, 1),
				('SEC', 'SECONDARY', 'event', 0, NULL, 1),
				('DRF', 'DRAFT', 'event', 0, NULL, 0),
				('DEL', 'DELETED', 'event', 0, NULL, 0),
				('DEN', 'DENIED', 'event', 0, NULL, 0),
				('EXP', 'EXPIRED', 'event', 0, NULL, 0),
				('RPN', 'PENDING', 'registration', 0, NULL, 1),
				('RCN', 'CANCELLED', 'registration', 0, NULL, 0),
				('RAP', 'APPROVED', 'registration', 0, NULL, 1),
				('RNA', 'NOT_APPROVED', 'registration', 0, NULL, 0),
				('TIN', 'INCOMPLETE', 'transaction', 0, NULL, 0),
				('TPN', 'PENDING', 'transaction', 0, NULL, 1),
				('TCM', 'COMPLETE', 'transaction', 0, NULL, 1),
				('TOP',	'OVERPAID', 'transaction', 0, NULL, 1),
				('PAP', 'APPROVED', 'payment', 0, NULL, 1),
				('PCN', 'CANCELLED', 'payment', 0, NULL, 0),
				('PFL', 'FAILED', 'payment', 0, NULL, 0),
				('PDC', 'DECLINED', 'payment', 0, NULL, 0),
				('PPN', 'PENDING', 'payment', 0, NULL, 1),
				('EDR', 'DRAFT', 'email', 0, NULL, 0),
				('ESN', 'SENT', 'email', 0, NULL, 1);";
		$wpdb->query($SQL);
		
		
	}
	
}





function espresso_delete_unused_db_tables() {
	global $wpdb;
	$wpdb->query( 'DROP TABLE IF EXISTS '. $wpdb->prefix . 'events_meta' );
	$wpdb->query( 'DROP TABLE IF EXISTS '. $wpdb->prefix . 'events_status' );
}



function espresso_default_message_templates() {
	$templates = FALSE;
	$settings = $installed_messengers = array();

	//let's first setup an array of what we consider to be the default messengers.
	$default_messengers = array( 'email' );

	//let's determine if we've already got an active messengers option
	$active_messengers = get_option('ee_active_messengers');

	//do an initial loop to determine if we need to continue
	$def_ms = array();
	foreach ( $default_messengers as $msgr ) {
		if ( isset($active_messengers[$msgr] ) ) continue;
		$def_ms[] = $msgr;
	}

	//continue?
	if ( empty( $def_ms ) ) return false;

	//include our helper
	require_once( EVENT_ESPRESSO_PLUGINFULLPATH . 'helpers/EE_MSG_Template.helper.php');

	//get all installed messenger objects
	$installed = EE_MSG_Template::get_installed_message_objects();

	$inst_msgrs = $installed['messengers'];
	$inst_mts = $installed['message_types'];

	//let's setup the $installed messengers in an array
	foreach ( $inst_msgrs as $msgr ) {
		$installed_messengers[$msgr->name] = $msgr;
	}

	//setup the $installed_mts in an array
	foreach ( $inst_mts as $imt ) {
		$installed_mts[$imt->name] = $imt;
	}

	//loop through default array
	foreach ( $def_ms as $messenger ) {
		//all is good so let's setup the default stuff. We need to use the given messenger object (if exists) to get the default message type for the messenger.
		if ( !isset( $installed_messengers[$messenger] ) ) continue;

		$default_mts = $installed_messengers[$messenger]->get_default_message_types();

		$active_messengers[$messenger]['obj'] = $installed_messengers[$messenger];
		foreach ( $default_mts as $mt ) {
			//we need to setup any initial settings for message types
			$settings_fields = $installed_mts[$mt]->get_admin_settings_fields();
			if ( !empty( $settings_fields ) ) {
				foreach ( $settings_fields as $field => $values ) {
					$settings[$field] = $values['default'];
				}
			} else {
				$settings = array();
			}

			$active_messengers[$messenger]['settings'][$messenger . '-message_types'][$mt]['settings'] = $settings;
		}

		//setup any initial settings for the messenger
		$msgr_settings = $installed_messengers[$messenger]->get_admin_settings_fields();

		if ( !empty( $msgr_settings ) ) {
			foreach ( $msgr_settings as $field => $value ) {
				$active_messengers[$messenger]['settings'][$field] = $value;
			}
		}

		//now let's save the settings for this messenger!
		update_option( 'ee_active_messengers', $active_messengers );


		//let's generate all the templates
		$templates = EE_MSG_Template::generate_new_templates( $messenger, $default_mts, '', TRUE );

	}

	//that's it!  //maybe we'll return $templates for possible display of error or help message later?
	return $templates;
}

