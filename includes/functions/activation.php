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

	global $wpdb;

	$table_name='esp_answer';
	$sql=" ANS_ID INT UNSIGNED NOT NULL AUTO_INCREMENT ,
				REG_ID INT UNSIGNED NOT NULL ,
				QST_ID INT UNSIGNED NOT NULL ,
				ANS_value TEXT NOT NULL ,
				PRIMARY KEY  (ANS_ID)";
	event_espresso_run_install($table_name,$sql, 'ENGINE=InnoDB');
	
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
	event_espresso_run_install($table_name, $sql, 'ENGINE=InnoDB ');



	$table_name = 'esp_country';
	$sql = "CNT_ISO varchar(2) COLLATE utf8_bin NOT NULL,
				  CNT_ISO3 varchar(3) COLLATE utf8_bin NOT NULL,
				  RGN_ID tinyint(3) unsigned DEFAULT NULL,
				  CNT_name varchar(45) COLLATE utf8_bin NOT NULL,
				  CNT_cur_code varchar(6) COLLATE utf8_bin DEFAULT 'USD',
				  CNT_cur_single varchar(45) COLLATE utf8_bin DEFAULT 'dollar',
				  CNT_cur_plural varchar(45) COLLATE utf8_bin DEFAULT 'dollars',
				  CNT_cur_sign varchar(45) COLLATE utf8_bin DEFAULT '$',
				  CNT_cur_sign_b4 tinyint(1) DEFAULT '1',
				  CNT_cur_dec tinyint(3) unsigned NOT NULL DEFAULT '2',
				  CNT_tel_code varchar(12) COLLATE utf8_bin DEFAULT NULL,
				  CNT_is_EU tinyint(1) DEFAULT '0',
				  CNT_active tinyint(1) DEFAULT '0',
				  PRIMARY KEY  (CNT_ISO)";
	event_espresso_run_install($table_name, $sql );



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
	event_espresso_run_install($table_name, $sql );


	
	$table_name='esp_event_question_group';
	$sql="EQG_ID INT UNSIGNED NOT NULL AUTO_INCREMENT ,
				EVT_ID INT UNSIGNED NOT NULL ,
				QSG_ID INT UNSIGNED NOT NULL ,
				EQG_primary TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
				PRIMARY KEY  (EQG_ID)";
	event_espresso_run_install($table_name,$sql, 'ENGINE=InnoDB');



	$table_name = 'esp_message_template';
	$sql = "MTP_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
				GRP_ID int(10) unsigned NOT NULL,
				MTP_context varchar(50) NOT NULL,
				MTP_template_field varchar(30) NOT NULL,
				MTP_content text NOT NULL,
				PRIMARY KEY  (MTP_ID),
				KEY (GRP_ID)";
	event_espresso_run_install($table_name, $table_version, $sql, 'ENGINE=InnoDB ');



	$table_name = 'esp_message_template_group';
	$sql = "GRP_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
				EVT_ID int(10) unsigned DEFAULT NULL,
				MTP_user_id int(10) NOT NULL DEFAULT '1',
				MTP_messenger varchar(30) NOT NULL,
				MTP_message_type varchar(50) NOT NULL,
				MTP_is_global tinyint(1) NOT NULL DEFAULT '0',
				MTP_is_override tinyint(1) NOT NULL DEFAULT '0',
				MTP_deleted tinyint(1) NOT NULL DEFAULT '0',
				MTP_is_active tinyint(1) NOT NULL DEFAULT '1',
				PRIMARY KEY  (GRP_ID),
				KEY EVT_ID (EVT_ID),
				KEY MTP_user_id (MTP_user_id)";
	event_espresso_run_install( $table_name, $table_version, $sql, 'ENGINE=InnoDB ');



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
	event_espresso_run_install($table_name, $sql, 'ENGINE=InnoDB ');



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
	event_espresso_run_install($table_name, $sql);



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
	event_espresso_run_install($table_name, $sql);


	
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
	event_espresso_run_install($table_name,$sql, 'ENGINE=InnoDB');
	

	if ( $wpdb->get_var( "SHOW TABLES LIKE '" . $wpdb->prefix . "esp_question_group'" ) == $wpdb->prefix.'esp_question_group' ) {
		$wpdb->query( 'ALTER TABLE '.$wpdb->prefix.'esp_question_group DROP INDEX QSG_identifier_UNIQUE' );
	}
	
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
				UNIQUE KEY QSG_identifier_UNIQUE (QSG_identifier ASC)';
	event_espresso_run_install($table_name,$sql, 'ENGINE=InnoDB');
	
	
	
	$table_name='esp_question_group_question';
	$sql="QGQ_ID INT UNSIGNED NOT NULL AUTO_INCREMENT ,
				QSG_ID INT UNSIGNED NOT NULL ,
				QST_ID INT UNSIGNED NOT NULL ,
				PRIMARY KEY  (QGQ_ID) ";
	event_espresso_run_install($table_name,$sql, 'ENGINE=InnoDB');


	
	$table_name='esp_question_option';
	$sql="QSO_ID INT UNSIGNED NOT NULL AUTO_INCREMENT ,
				QSO_name VARCHAR(100) NOT NULL ,
				QSO_value VARCHAR(100) NOT NULL ,
				QST_ID INT UNSIGNED NOT NULL ,
				QSO_deleted TINYINT(1) UNSIGNED NOT NULL DEFAULT 0 ,
				PRIMARY KEY  (QSO_ID)";
	event_espresso_run_install($table_name,$sql, 'ENGINE=InnoDB');



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
	event_espresso_run_install($table_name, $sql, 'ENGINE=InnoDB ');



	$table_name = 'esp_state';
	$sql = "STA_ID smallint(5) unsigned NOT NULL AUTO_INCREMENT,
				  CNT_ISO varchar(2) COLLATE utf8_bin NOT NULL,
				  STA_abbrev varchar(6) COLLATE utf8_bin NOT NULL,
				  STA_name varchar(100) COLLATE utf8_bin NOT NULL,
				  STA_active tinyint(1) DEFAULT '1',
				  PRIMARY KEY  (STA_ID)";
	event_espresso_run_install($table_name, $sql );



	$table_name = 'esp_status';
	$sql = "STS_ID varchar(3) COLLATE utf8_bin NOT NULL,
				  STS_code varchar(45) COLLATE utf8_bin NOT NULL,
				  STS_type set('event','registration','transaction','payment','email') COLLATE utf8_bin NOT NULL,
				  STS_can_edit tinyint(1) NOT NULL DEFAULT 0,
				  STS_desc tinytext COLLATE utf8_bin,
				  STS_open tinyint(1) NOT NULL DEFAULT 1,
				  UNIQUE KEY STS_ID_UNIQUE (STS_ID),
				  KEY STS_type (STS_type)";
	event_espresso_run_install($table_name, $sql );



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
	event_espresso_run_install($table_name, $sql, 'ENGINE=InnoDB ');





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
	event_espresso_run_install($table_name, $sql);



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
	event_espresso_run_install($table_name, $sql);



	$table_name = "events_category_rel";
	$sql = "id int(11) NOT NULL AUTO_INCREMENT,
				event_id int(11) DEFAULT NULL,
				cat_id int(11) DEFAULT NULL,
				PRIMARY KEY  (id),
			  	KEY event_id (event_id)";
	event_espresso_run_install($table_name, $sql);



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
	event_espresso_run_install($table_name, $sql);



	$table_name = "events_venue_rel";
	$sql = "id int(11) NOT NULL AUTO_INCREMENT,
				event_id int(11) DEFAULT NULL,
				venue_id int(11) DEFAULT NULL,
				PRIMARY KEY  (id),
			  	KEY event_id (event_id)";
	event_espresso_run_install($table_name, $sql);



	$table_name = "events_locale";
	$sql = "id int(11) unsigned NOT NULL AUTO_INCREMENT,
			  name varchar(250) DEFAULT NULL,
			  identifier varchar(26) DEFAULT '0',
			  wp_user int(22) DEFAULT '1',
			  UNIQUE KEY id (id),
			  KEY identifier (identifier),
			  KEY wp_user (wp_user)";
	event_espresso_run_install($table_name, $sql);



	$table_name = "events_locale_rel";
	$sql = "id int(11) NOT NULL AUTO_INCREMENT,
				venue_id int(11) DEFAULT NULL,
				locale_id int(11) DEFAULT NULL,
				PRIMARY KEY  (id),
			  	KEY venue_id (venue_id)";
	event_espresso_run_install($table_name, $sql);



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
	event_espresso_run_install($table_name, $sql);



	$table_name = "events_personnel_rel";
	$sql = "id int(11) NOT NULL AUTO_INCREMENT,
				event_id int(11) DEFAULT NULL,
				person_id int(11) DEFAULT NULL,
				PRIMARY KEY  (id),
			  	KEY event_id (event_id),
			  	KEY person_id (person_id)";
	event_espresso_run_install($table_name, $sql);

	
	
	// grab espresso_db_update option
	$espresso_db_update = get_option( 'espresso_db_update', array() );
	// make sure it's an array
	$espresso_db_update = is_array( $espresso_db_update ) ? $espresso_db_update : array( $espresso_db_update );
	// add current EE version to list
	$espresso_db_update[] = EVENT_ESPRESSO_VERSION;
	// resave
	update_option( 'espresso_db_update', $espresso_db_update );
	
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



function espresso_default_states() {

	global $wpdb;
	if ( $wpdb->get_var( "SHOW TABLES LIKE '" . ESP_STATE . "'") == ESP_STATE ) {
		
		$SQL = "SELECT COUNT('STA_ID') FROM " . ESP_STATE;
		$states = $wpdb->get_var($SQL);
		if ( ! $states ) {
			$SQL = "INSERT INTO " . ESP_STATE . " 
			(STA_ID, CNT_ISO, STA_abbrev, STA_name, STA_active) VALUES
			(1, 'US', 'AK', 'Alaska', 1),
			(2, 'US', 'AL', 'Alabama', 1),
			(3, 'US', 'AS', 'American Samoa', 1),
			(4, 'US', 'AZ', 'Arizona', 1),
			(5, 'US', 'AR', 'Arkansas', 1),
			(6, 'US', 'CA', 'California', 1),
			(7, 'US', 'CO', 'Colorado', 1),
			(8, 'US', 'CT', 'Connecticut', 1),
			(9, 'US', 'DE', 'Delaware', 1),
			(10, 'US', 'DC', 'District of Columbia', 1),
			(11, 'US', 'FM', 'Federated States of Micronesia', 1),
			(12, 'US', 'FL', 'Florida', 1),
			(13, 'US', 'GA', 'Georgia', 1),
			(14, 'US', 'GU', 'Guam', 1),
			(15, 'US', 'HI', 'Hawaii', 1),
			(16, 'US', 'ID', 'Idaho', 1),
			(17, 'US', 'IL', 'Illinois', 1),
			(18, 'US', 'IN', 'Indiana', 1),
			(19, 'US', 'IA', 'Iowa', 1),
			(20, 'US', 'KS', 'Kansas', 1),
			(21, 'US', 'KY', 'Kentucky', 1),
			(22, 'US', 'LA', 'Louisiana', 1),
			(23, 'US', 'ME', 'Maine', 1),
			(24, 'US', 'MH', 'Marshall Islands', 1),
			(25, 'US', 'MD', 'Maryland', 1),
			(26, 'US', 'MA', 'Massachusetts', 1),
			(27, 'US', 'MI', 'Michigan', 1),
			(28, 'US', 'MN', 'Minnesota', 1),
			(29, 'US', 'MS', 'Mississippi', 1),
			(30, 'US', 'MO', 'Missouri', 1),
			(31, 'US', 'MT', 'Montana', 1),
			(32, 'US', 'NE', 'Nebraska', 1),
			(33, 'US', 'NV', 'Nevada', 1),
			(34, 'US', 'NH', 'New Hampshire', 1),
			(35, 'US', 'NJ', 'New Jersey', 1),
			(36, 'US', 'NM', 'New Mexico', 1),
			(37, 'US', 'NY', 'New York', 1),
			(38, 'US', 'NC', 'North Carolina', 1),
			(39, 'US', 'ND', 'North Dakota', 1),
			(40, 'US', 'MP', 'Northern Mariana Islands', 1),
			(41, 'US', 'OH', 'Ohio', 1),
			(42, 'US', 'OK', 'Oklahoma', 1),
			(43, 'US', 'OR', 'Oregon', 1),
			(44, 'US', 'PW', 'Palau', 1),
			(45, 'US', 'PA', 'Pennsylvania', 1),
			(46, 'US', 'PR', 'Puerto Rico', 1),
			(47, 'US', 'RI', 'Rhode Island', 1),
			(48, 'US', 'SC', 'South Carolina', 1),
			(49, 'US', 'SD', 'South Dakota', 1),
			(50, 'US', 'TN', 'Tennessee', 1),
			(51, 'US', 'TX', 'Texas', 1),
			(52, 'US', 'UT', 'Utah', 1),
			(53, 'US', 'VT', 'Vermont', 1),
			(54, 'US', 'VI', 'Virgin Islands', 1),
			(55, 'US', 'VA', 'Virginia', 1),
			(56, 'US', 'WA', 'Washington', 1),
			(57, 'US', 'WV', 'West Virginia', 1),
			(58, 'US', 'WI', 'Wisconsin', 1),
			(59, 'US', 'WY', 'Wyoming', 1),
			(60, 'CA', 'AB', 'Alberta', 1),
			(61, 'CA', 'BC', 'British Columbia', 1),
			(62, 'CA', 'MB', 'Manitoba', 1),
			(63, 'CA', 'NB', 'New Brunswick', 1),
			(64, 'CA', 'NL', 'Newfoundland and Labrador', 1),
			(65, 'CA', 'NS', 'Nova Scotia', 1),
			(66, 'CA', 'ON', 'Ontario', 1),
			(67, 'CA', 'PE', 'Prince Edward Island', 1),
			(68, 'CA', 'QC', 'Quebec', 1),
			(69, 'CA', 'SK', 'Saskatchewan', 1);";
			$wpdb->query($SQL);		
		}
	}
	
}



function espresso_default_countries() {

	global $wpdb;
	if ( $wpdb->get_var( "SHOW TABLES LIKE '" . ESP_COUNTRY . "'") == ESP_COUNTRY ) {
		
		$SQL = "SELECT COUNT('CNT_ISO') FROM " . ESP_COUNTRY;
		$countries = $wpdb->get_var($SQL);
		if ( ! $countries ) {
			$SQL = "INSERT INTO " . ESP_COUNTRY . " 
			(CNT_ISO, CNT_ISO3, RGN_ID, CNT_name, CNT_cur_code, CNT_cur_single, CNT_cur_plural, CNT_cur_sign, CNT_cur_sign_b4, CNT_cur_dec, CNT_tel_code, CNT_is_EU, CNT_active) VALUES
			('AD', 'AND', 0, 'Andorra', 'EUR', 'Euro', 'Euros', '&#8364;', 1, 2, '+376', 0, 0),
			('AE', 'ARE', 0, 'United Arab Emirates', 'AED', 'Dirham', 'Dirhams', '&#1583;.&#1573;', 1, 2, '+971', 0, 0),
			('AF', 'AFG', 0, 'Afghanistan', 'AFN', 'Afghani', 'Afghanis', '&#1547;', 1, 2, '+93', 0, 0),
			('AG', 'ATG', 0, 'Antigua and Barbuda', 'XCD', 'Dollar', 'Dollars', '&#36;', 1, 2, '+1-268', 0, 0),
			('AI', 'AIA', 0, 'Anguilla', 'XCD', 'Dollar', 'Dollars', '&#36;', 1, 2, '+1-264', 0, 0),
			('AL', 'ALB', 0, 'Albania', 'ALL', 'Lek', 'Leks', '&#76;&#101;&#107;', 1, 2, '+355', 0, 0),
			('AM', 'ARM', 0, 'Armenia', 'AMD', 'Dram', 'Dram', '&#1332;&#1408;&#1377;&#1396;', 1, 2, '+374', 0, 0),
			('AN', 'ANT', 0, 'Netherlands Antilles', 'ANG', 'Guilder', 'Guilders', '&#402;', 1, 2, '+599', 0, 0),
			('AO', 'AGO', 0, 'Angola', 'AOA', 'Kwanza', 'Kwanzas', '', 1, 2, '+244', 0, 0),
			('AR', 'ARG', 0, 'Argentina', 'ARS', 'Peso', 'Pesos', '&#36;', 1, 2, '+54', 0, 0),
			('AS', 'ASM', 0, 'American Samoa', 'USD', 'Dollar', 'Dollars', '&#36;', 1, 2, '+1-684', 0, 0),
			('AT', 'AUT', 0, 'Austria', 'EUR', 'Euro', 'Euros', '&#8364;', 1, 2, '+43', 1, 0),
			('AU', 'AUS', 0, 'Australia', 'AUD', 'Dollar', 'Dollars', '&#36;', 1, 2, '+61', 0, 0),
			('AW', 'ABW', 0, 'Aruba', 'AWG', 'Guilder', 'Guilders', '&#402;', 1, 2, '+297', 0, 0),
			('AZ', 'AZE', 0, 'Azerbaijan', 'AMD', 'Dram', 'Dram', '&#1332;&#1408;&#1377;&#1396;', 1, 2, '+374-97', 0, 0),
			('BA', 'BIH', 0, 'Bosnia and Herzegovina', 'BAM', 'Marka', 'Markas', '&#75;&#77;', 1, 2, '+387', 0, 0),
			('BB', 'BRB', 0, 'Barbados', 'BBD', 'Dollar', 'Dollars', '&#36;', 1, 2, '+1-246', 0, 0),
			('BD', 'BGD', 0, 'Bangladesh', 'BDT', 'Taka', 'Takas', '&#2547;', 1, 2, '+880', 0, 0),
			('BE', 'BEL', 0, 'Belgium', 'EUR', 'Euro', 'Euros', '&#8364;', 1, 2, '+32', 1, 0),
			('BF', 'BFA', 0, 'Burkina Faso', 'XOF', 'Franc', 'Francs', '&#8355;', 1, 0, '+226', 0, 0),
			('BG', 'BGR', 0, 'Bulgaria', 'BGN', 'Lev', 'Levs', '&#1083;&#1074;', 1, 2, '+359', 1, 0),
			('BH', 'BHR', 0, 'Bahrain', 'BHD', 'Dinar', 'Dinars', '', 1, 3, '+973', 0, 0),
			('BI', 'BDI', 0, 'Burundi', 'BIF', 'Franc', 'Francs', '&#8355;', 1, 0, '+257', 0, 0),
			('BJ', 'BEN', 0, 'Benin', 'XOF', 'Franc', 'Francs', '&#8355;', 1, 0, '+229', 0, 0),
			('BM', 'BMU', 0, 'Bermuda', 'BMD', 'Dollar', 'Dollars', '&#36;', 1, 2, '+1-441', 0, 0),
			('BN', 'BRN', 0, 'Brunei Darussalam', 'BND', 'Dollar', 'Dollars', '&#36;', 1, 2, '+673', 0, 0),
			('BO', 'BOL', 0, 'Bolivia', 'BOB', 'Boliviano', 'Bolivianos', '&#36;&#98;', 1, 2, '+591', 0, 0),
			('BR', 'BRA', 0, 'Brazil', 'BRL', 'Real', 'Reals', '&#82;&#36;', 1, 2, '+55', 0, 0),
			('BS', 'BHS', 0, 'Bahamas', 'BSD', 'Dollar', 'Dollars', '&#36;', 1, 2, '+1-242', 0, 0),
			('BT', 'BTN', 0, 'Bhutan', 'BTN', 'Ngultrum', 'Ngultrums', '', 1, 2, '+975', 0, 0),
			('BW', 'BWA', 0, 'Botswana', 'BWP', 'Pula', 'Pulas', '&#80;', 1, 2, '+267', 0, 0),
			('BY', 'BLR', 0, 'Belarus', 'BYR', 'Ruble', 'Rubles', '&#112;&#46;', 1, 0, '+375', 0, 0),
			('BZ', 'BLZ', 0, 'Belize', 'BZD', 'Dollar', 'Dollars', '&#66;&#90;&#36;', 1, 2, '+501', 0, 0),
			('CA', 'CAN', 0, 'Canada', 'CAD', 'Dollar', 'Dollars', '&#36;', 1, 2, '+1', 0, 1),
			('CD', 'COD', 0, 'Congo, the Democratic Republic of the', 'CDF', 'Franc', 'Francs', '&#8355;', 1, 2, '+243', 0, 0),
			('CF', 'CAF', 0, 'Central African Republic', 'XAF', 'Franc', 'Francs', '&#8355;', 1, 0, '+236', 0, 0),
			('CG', 'COG', 0, 'Congo', 'XAF', 'Franc', 'Francs', '&#8355;', 1, 0, '+242', 0, 0),
			('CH', 'CHE', 0, 'Switzerland', 'CHF', 'Franc', 'Francs', '&#8355;', 1, 2, '+41', 0, 0),
			('CI', 'CIV', 0, 'Cote D''Ivoire', 'XOF', 'Franc', 'Francs', '&#8355;', 1, 0, '+225', 0, 0),
			('CK', 'COK', 0, 'Cook Islands', 'NZD', 'Dollar', 'Dollars', '&#36;', 1, 2, '+682', 0, 0),
			('CL', 'CHL', 0, 'Chile', 'CLP', 'Peso', 'Pesos', '&#36;', 1, 0, '+56', 0, 0),
			('CM', 'CMR', 0, 'Cameroon', 'XAF', 'Franc', 'Francs', '&#8355;', 1, 0, '+237', 0, 0),
			('CN', 'CHN', 0, 'China', 'CNY', 'Yuan Renminbi', 'Yuan Renminbis', '&#165;', 1, 2, '+86', 0, 0),
			('CO', 'COL', 0, 'Colombia', 'COP', 'Peso', 'Pesos', '&#36;', 1, 2, '+57', 0, 0),
			('CR', 'CRI', 0, 'Costa Rica', 'CRC', 'Colon', 'Colons', '&#8353;', 1, 2, '+506', 0, 0),
			('CU', 'CUB', 0, 'Cuba', 'CUP', 'Peso', 'Pesos', '&#8369;', 1, 2, '+53', 0, 0),
			('CV', 'CPV', 0, 'Cape Verde', 'CVE', 'Escudo', 'Escudos', '', 1, 2, '+238', 0, 0),
			('CY', 'CYP', 0, 'Cyprus', 'CYP', 'Pound', 'Pounds', '&#163;', 1, 2, '+357', 1, 0),
			('CZ', 'CZE', 0, 'Czech Republic', 'CZK', 'Koruna', 'Korunas', '&#75;&#269;', 1, 2, '+420', 1, 0),
			('DE', 'DEU', 0, 'Germany', 'EUR', 'Euro', 'Euros', '&#8364;', 1, 2, '+49', 1, 0),
			('DJ', 'DJI', 0, 'Djibouti', 'DJF', 'Franc', 'Francs', '&#8355;', 1, 0, '+253', 0, 0),
			('DK', 'DNK', 0, 'Denmark', 'DKK', 'Krone', 'Kroner', '&#107;&#114;', 1, 2, '+45', 1, 0),
			('DM', 'DMA', 0, 'Dominica', 'XCD', 'Dollar', 'Dollars', '&#36;', 1, 2, '+1-767', 0, 0),
			('DO', 'DOM', 0, 'Dominican Republic', 'DOP', 'Peso', 'Pesos', '&#82;&#68;&#36;', 1, 2, '+849', 0, 0),
			('DZ', 'DZA', 0, 'Algeria', 'DZD', 'Dinar', 'Dinars', '', 1, 3, '+213', 0, 0),
			('EC', 'ECU', 0, 'Ecuador', 'USD', 'Dollar', 'Dollars', '&#36;', 1, 2, '+593', 0, 0),
			('EE', 'EST', 0, 'Estonia', 'EEK', 'Kroon', 'Kroons', '&#107;&#114;', 1, 2, '+372', 1, 0),
			('EG', 'EGY', 0, 'Egypt', 'EGP', 'Pound', 'Pounds', '&#163;', 1, 2, '+20', 0, 0),
			('EH', 'ESH', 0, 'Western Sahara', 'MAD', 'Dirham', 'Dirhams', '', 1, 2, '+212', 0, 0),
			('ER', 'ERI', 0, 'Eritrea', 'ERN', 'Nakfa', 'Nakfas', '', 1, 2, '+291', 0, 0),
			('ES', 'ESP', 0, 'Spain', 'EUR', 'Euro', 'Euros', '&#8364;', 1, 2, '+34', 1, 0),
			('ET', 'ETH', 0, 'Ethiopia', 'ETB', 'Birr', 'Birrs', '', 1, 2, '+251', 0, 0),
			('FI', 'FIN', 0, 'Finland', 'EUR', 'Euro', 'Euros', '&#8364;', 1, 2, '+358', 1, 0),
			('FJ', 'FJI', 0, 'Fiji', 'FJD', 'Dollar', 'Dollars', '&#36;', 1, 2, '+679', 0, 0),
			('FK', 'FLK', 0, 'Falkland Islands (Malvinas)', 'FKP', 'Pound', 'Pounds', '&#163;', 1, 2, '+500', 0, 0),
			('FM', 'FSM', 0, 'Micronesia, Federated States of', 'USD', 'Dollar', 'Dollars', '&#36;', 1, 2, '+691', 0, 0),
			('FO', 'FRO', 0, 'Faroe Islands', 'DKK', 'Krone', 'Krones', '&#107;&#114;', 1, 2, '+298', 0, 0),
			('FR', 'FRA', 0, 'France', 'EUR', 'Euro', 'Euros', '&#8364;', 1, 2, '+33', 1, 0),
			('GA', 'GAB', 0, 'Gabon', 'XAF', 'Franc', 'Francs', '&#8355;', 1, 0, '+241', 0, 0),
			('GB', 'GBR', 0, 'United Kingdom', 'GBP', 'Pound', 'Pounds', '&#163;', 1, 2, '+44', 1, 0),
			('GD', 'GRD', 0, 'Grenada', 'XCD', 'Dollar', 'Dollars', '&#36;', 1, 2, '+1-473', 0, 0),
			('GE', 'GEO', 0, 'Georgia', 'RUB', 'Ruble', 'Rubles', '&#1088;&#1091;&#1073;', 1, 2, '+995', 0, 0),
			('GF', 'GUF', 0, 'French Guiana', 'EUR', 'Euro', 'Euros', '&#8364;', 1, 2, '+594', 0, 0),
			('GH', 'GHA', 0, 'Ghana', 'GHS', 'Cedi', 'Cedis', '', 1, 2, '+233', 0, 0),
			('GI', 'GIB', 0, 'Gibraltar', 'GIP', 'Pound', 'Pounds', '&#163;', 1, 2, '+350', 0, 0),
			('GL', 'GRL', 0, 'Greenland', 'DKK', 'Krone', 'Krones', '&#107;&#114;', 1, 2, '+299', 0, 0),
			('GM', 'GMB', 0, 'Gambia', 'GMD', 'Dalasi', 'Dalasis', '', 1, 2, '+220', 0, 0),
			('GN', 'GIN', 0, 'Guinea', 'GNF', 'Franc', 'Francs', '&#8355;', 1, 0, '+224', 0, 0),
			('GP', 'GLP', 0, 'Guadeloupe', 'EUR', 'Euro', 'Euros', '&#8364;', 1, 2, '+590', 0, 0),
			('GQ', 'GNQ', 0, 'Equatorial Guinea', 'XAF', 'Franc', 'Francs', '&#8355;', 1, 0, '+240', 0, 0),
			('GR', 'GRC', 0, 'Greece', 'EUR', 'Euro', 'Euros', '&#8364;', 1, 2, '+30', 1, 0),
			('GT', 'GTM', 0, 'Guatemala', 'GTQ', 'Quetzal', 'Quetzals', '&#81;', 1, 2, '+502', 0, 0),
			('GU', 'GUM', 0, 'Guam', 'USD', 'Dollar', 'Dollars', '&#36;', 1, 2, '+1-671', 0, 0),
			('GW', 'GNB', 0, 'Guinea-Bissau', 'XOF', 'Franc', 'Francs', '&#8355;', 1, 0, '+245', 0, 0),
			('GY', 'GUY', 0, 'Guyana', 'GYD', 'Dollar', 'Dollars', '&#36;', 1, 2, '+592', 0, 0),
			('HK', 'HKG', 0, 'Hong Kong', 'HKD', 'Dollar', 'Dollars', '&#36;', 1, 2, '+852', 0, 0),
			('HN', 'HND', 0, 'Honduras', 'HNL', 'Lempira', 'Lempiras', '&#76;', 1, 2, '+504', 0, 0),
			('HR', 'HRV', 0, 'Croatia', 'HRK', 'Kuna', 'Kunas', '&#107;&#110;', 1, 2, '+385', 0, 0),
			('HT', 'HTI', 0, 'Haiti', 'HTG', 'Gourde', 'Gourdes', '', 1, 2, '+509', 0, 0),
			('HU', 'HUN', 0, 'Hungary', 'HUF', 'Forint', 'Forints', '&#70;&#116;', 1, 2, '+36', 1, 0),
			('ID', 'IDN', 0, 'Indonesia', 'IDR', 'Rupiah', 'Rupiahs', '&#82;&#112;', 1, 2, '+62', 0, 0),
			('IE', 'IRL', 0, 'Ireland', 'EUR', 'Euro', 'Euros', '&#8364;', 1, 2, '+353', 1, 0),
			('IL', 'ISR', 0, 'Israel', 'ILS', 'Shekel', 'Shekels', '&#8362;', 1, 2, '+972', 0, 0),
			('IN', 'IND', 0, 'India', 'INR', 'Rupee', 'Rupees', '&#36;', 1, 2, '+91', 0, 0),
			('IQ', 'IRQ', 0, 'Iraq', 'IQD', 'Dinar', 'Dinars', '&#1583;.&#1593;', 1, 3, '+964', 0, 0),
			('IR', 'IRN', 0, 'Iran, Islamic Republic of', 'IRR', 'Rial', 'Rials', '&#65020;', 1, 2, '+98', 0, 0),
			('IS', 'ISL', 0, 'Iceland', 'ISK', 'Króna', 'krónur', '&#107;&#114;', 1, 0, '+354', 0, 0),
			('IT', 'ITA', 0, 'Italy', 'EUR', 'Euro', 'Euros', '&#8364;', 1, 2, '+39', 1, 0),
			('JM', 'JAM', 0, 'Jamaica', 'JMD', 'Dollar', 'Dollars', '&#74;&#36;', 1, 2, '+1-876', 0, 0),
			('JO', 'JOR', 0, 'Jordan', 'JOD', 'Dinar', 'Dinars', '', 1, 3, '+962', 0, 0),
			('JP', 'JPN', 0, 'Japan', 'JPY', 'Yen', 'Yens', '&#165;', 1, 0, '+81', 0, 0),
			('KE', 'KEN', 0, 'Kenya', 'KES', 'Shilling', 'Shillings', '&#83;', 1, 2, '+254', 0, 0),
			('KG', 'KGZ', 0, 'Kyrgyzstan', 'KGS', 'Som', 'Soms', '&#1083;&#1074;', 1, 2, '+996', 0, 0),
			('KH', 'KHM', 0, 'Cambodia', 'KHR', 'Riels', 'Rielss', '&#6107;', 1, 2, '+855', 0, 0),
			('KI', 'KIR', 0, 'Kiribati', 'AUD', 'Dollar', 'Dollars', '&#36;', 1, 2, '+686', 0, 0),
			('KM', 'COM', 0, 'Comoros', 'KMF', 'Franc', 'Francs', '&#8355;', 1, 0, '+269', 0, 0),
			('KN', 'KNA', 0, 'Saint Kitts and Nevis', 'XCD', 'Dollar', 'Dollars', '&#36;', 1, 2, '+1-869', 0, 0),
			('KP', 'PRK', 0, 'Korea, Democratic People''s Republic of', 'KPW', 'Won', 'Wons', '&#8361;', 1, 2, '+850', 0, 0),
			('KR', 'KOR', 0, 'Korea, Republic of', 'KRW', 'Won', 'Wons', '&#8361;', 1, 0, '+82', 0, 0),
			('KW', 'KWT', 0, 'Kuwait', 'KWD', 'Dinar', 'Dinars', '', 1, 3, '+965', 0, 0),
			('KY', 'CYM', 0, 'Cayman Islands', 'KYD', 'Dollar', 'Dollars', '&#36;', 1, 2, '+1-345', 0, 0),
			('KZ', 'KAZ', 0, 'Kazakhstan', 'KZT', 'Tenge', 'Tenges', '&#1083;&#1074;', 1, 2, '+7', 0, 0),
			('LA', 'LAO', 0, 'Lao People''s Democratic Republic', 'LAK', 'Kip', 'Kips', '&#8365;', 1, 2, '+856', 0, 0),
			('LB', 'LBN', 0, 'Lebanon', 'LBP', 'Pound', 'Pounds', '&#163;', 1, 2, '+961', 0, 0),
			('LC', 'LCA', 0, 'Saint Lucia', 'XCD', 'Dollar', 'Dollars', '&#36;', 1, 2, '+1-758', 0, 0),
			('LI', 'LIE', 0, 'Liechtenstein', 'CHF', 'Franc', 'Francs', '&#8355;', 1, 2, '+423', 0, 0),
			('LK', 'LKA', 0, 'Sri Lanka', 'LKR', 'Rupee', 'Rupees', '&#8360;', 1, 2, '+94', 0, 0),
			('LR', 'LBR', 0, 'Liberia', 'LRD', 'Dollar', 'Dollars', '&#36;', 1, 2, '+231', 0, 0),
			('LS', 'LSO', 0, 'Lesotho', 'LSL', 'Loti', 'Lotis', '', 1, 2, '+266', 0, 0),
			('LT', 'LTU', 0, 'Lithuania', 'LTL', 'Litas', 'Litass', '&#76;&#116;', 1, 2, '+370', 1, 0),
			('LU', 'LUX', 0, 'Luxembourg', 'EUR', 'Euro', 'Euros', '&#8364;', 1, 2, '+352', 1, 0),
			('LV', 'LVA', 0, 'Latvia', 'LVL', 'Lat', 'Lats', '&#76;&#115;', 1, 2, '+371', 1, 0),
			('LY', 'LBY', 0, 'Libyan Arab Jamahiriya', 'LYD', 'Dinar', 'Dinars', '', 1, 3, '+218', 0, 0),
			('MA', 'MAR', 0, 'Morocco', 'MAD', 'Dirham', 'Dirhams', '', 1, 2, '+212', 0, 0),
			('MC', 'MCO', 0, 'Monaco', 'EUR', 'Euro', 'Euros', '&#8364;', 1, 2, '+377', 0, 0),
			('MD', 'MDA', 0, 'Moldova, Republic of', 'MDL', 'Leu', 'Leus', '', 1, 2, '+373', 0, 0),
			('MG', 'MDG', 0, 'Madagascar', 'MGA', 'Ariary', 'Ariarys', '', 1, 2, '+261', 0, 0),
			('MH', 'MHL', 0, 'Marshall Islands', 'USD', 'Dollar', 'Dollars', '&#36;', 1, 2, '+692', 0, 0),
			('MK', 'MKD', 0, 'Macedonia, the Former Yugoslav Republic of', 'MKD', 'Denar', 'Denars', '&#1076;&#1077;&#1085;', 1, 2, '+389', 0, 0),
			('ML', 'MLI', 0, 'Mali', 'XOF', 'Franc', 'Francs', '&#8355;', 1, 0, '+223', 0, 0),
			('MM', 'MMR', 0, 'Myanmar', 'MMK', 'Kyat', 'Kyats', '', 1, 2, '+95', 0, 0),
			('MN', 'MNG', 0, 'Mongolia', 'MNT', 'Tugrik', 'Tugriks', '&#8366;', 1, 2, '+976', 0, 0),
			('MO', 'MAC', 0, 'Macao', 'MOP', 'Pataca', 'Patacas', '', 1, 2, '+853', 0, 0),
			('MP', 'MNP', 0, 'Northern Mariana Islands', 'USD', 'Dollar', 'Dollars', '&#36;', 1, 2, '+1-670', 0, 0),
			('MQ', 'MTQ', 0, 'Martinique', 'EUR', 'Euro', 'Euros', '&#8364;', 1, 2, '+596', 0, 0),
			('MR', 'MRT', 0, 'Mauritania', 'MRO', 'Ouguiya', 'Ouguiyas', '', 1, 2, '+222', 0, 0),
			('MS', 'MSR', 0, 'Montserrat', 'XCD', 'Dollar', 'Dollars', '&#36;', 1, 2, '+1-664', 0, 0),
			('MT', 'MLT', 0, 'Malta', 'MTL', 'Lira', 'Liras', '', 1, 2, '+356', 1, 0),
			('MU', 'MUS', 0, 'Mauritius', 'MUR', 'Rupee', 'Rupees', '&#8360;', 1, 2, '+230', 0, 0),
			('MV', 'MDV', 0, 'Maldives', 'MVR', 'Rufiyaa', 'Rufiyaas', '', 1, 2, '+960', 0, 0),
			('MW', 'MWI', 0, 'Malawi', 'MWK', 'Kwacha', 'Kwachas', '', 1, 2, '+265', 0, 0),
			('MX', 'MEX', 0, 'Mexico', 'MXN', 'Peso', 'Pesos', '&#36;', 1, 2, '+52', 0, 0),
			('MY', 'MYS', 0, 'Malaysia', 'MYR', 'Ringgit', 'Ringgits', '&#82;&#77;', 1, 2, '+60', 0, 0),
			('MZ', 'MOZ', 0, 'Mozambique', 'MZM', 'Meticail', 'Meticails', '', 1, 2, '+258', 0, 0),
			('NA', 'NAM', 0, 'Namibia', 'NAD', 'Dollar', 'Dollars', '&#36;', 1, 2, '+264', 0, 0),
			('NC', 'NCL', 0, 'New Caledonia', 'XPF', 'Franc', 'Francs', '&#8355;', 1, 0, '+687', 0, 0),
			('NE', 'NER', 0, 'Niger', 'XOF', 'Franc', 'Francs', '&#8355;', 1, 0, '+227', 0, 0),
			('NF', 'NFK', 0, 'Norfolk Island', 'AUD', 'Dollar', 'Dollars', '&#36;', 1, 2, '+672', 0, 0),
			('NG', 'NGA', 0, 'Nigeria', 'NGN', 'Naira', 'Nairas', '&#8358;', 1, 2, '+234', 0, 0),
			('NI', 'NIC', 0, 'Nicaragua', 'NIO', 'Cordoba', 'Cordobas', '&#67;&#36;', 1, 2, '+505', 0, 0),
			('NL', 'NLD', 0, 'Netherlands', 'EUR', 'Euro', 'Euros', '&#8364;', 1, 2, '+31', 1, 0),
			('NO', 'NOR', 0, 'Norway', 'NOK', 'Krone', 'Krones', '&#107;&#114;', 1, 2, '+47', 0, 0),
			('NP', 'NPL', 0, 'Nepal', 'NPR', 'Rupee', 'Rupees', '&#8360;', 1, 2, '+977', 0, 0),
			('NR', 'NRU', 0, 'Nauru', 'AUD', 'Dollar', 'Dollars', '&#36;', 1, 2, '+674', 0, 0),
			('NU', 'NIU', 0, 'Niue', 'NZD', 'Dollar', 'Dollars', '&#36;', 1, 2, '+683', 0, 0),
			('NZ', 'NZL', 0, 'New Zealand', 'NZD', 'Dollar', 'Dollars', '&#36;', 1, 2, '+64', 0, 0),
			('OM', 'OMN', 0, 'Oman', 'OMR', 'Rial', 'Rials', '&#65020;', 1, 3, '+968', 0, 0),
			('PA', 'PAN', 0, 'Panama', 'PAB', 'Balboa', 'Balboas', '&#66;&#47;&#46;', 1, 2, '+507', 0, 0),
			('PE', 'PER', 0, 'Peru', 'PEN', 'Sol', 'Sols', '&#83;&#47;&#46;', 1, 2, '+51', 0, 0),
			('PF', 'PYF', 0, 'French Polynesia', 'XPF', 'Franc', 'Francs', '&#8355;', 1, 0, '+689', 0, 0),
			('PG', 'PNG', 0, 'Papua New Guinea', 'PGK', 'Kina', 'Kinas', '', 1, 2, '+675', 0, 0),
			('PH', 'PHL', 0, 'Philippines', 'PHP', 'Peso', 'Pesos', '&#8369;', 1, 2, '+63', 0, 0),
			('PK', 'PAK', 0, 'Pakistan', 'PKR', 'Rupee', 'Rupees', '&#8360;', 1, 2, '+92', 0, 0),
			('PL', 'POL', 0, 'Poland', 'PLN', 'Zloty', 'Zlotys', '&#122;&#322;', 1, 2, '+48', 1, 0),
			('PM', 'SPM', 0, 'Saint Pierre and Miquelon', 'EUR', 'Euro', 'Euros', '&#8364;', 1, 2, '+508', 0, 0),
			('PN', 'PCN', 0, 'Pitcairn', 'NZD', 'Dollar', 'Dollars', '&#36;', 1, 2, '', 0, 0),
			('PR', 'PRI', 0, 'Puerto Rico', 'USD', 'Dollar', 'Dollars', '&#36;', 1, 2, '+1', 0, 0),
			('PT', 'PRT', 0, 'Portugal', 'EUR', 'Euro', 'Euros', '&#8364;', 1, 2, '+351', 1, 0),
			('PW', 'PLW', 0, 'Palau', 'USD', 'Dollar', 'Dollars', '&#36;', 1, 2, '+680', 0, 0),
			('PY', 'PRY', 0, 'Paraguay', 'PYG', 'Guarani', 'Guaranis', '&#71;&#115;', 1, 0, '+595', 0, 0),
			('QA', 'QAT', 0, 'Qatar', 'QAR', 'Rial', 'Rials', '&#65020;', 1, 2, '+974', 0, 0),
			('RE', 'REU', 0, 'Reunion', 'EUR', 'Euro', 'Euros', '&#8364;', 1, 2, '+262', 0, 0),
			('RO', 'ROM', 0, 'Romania', 'RON', 'Leu', 'Leus', '&#108;&#101;&#105;', 1, 2, '+40', 1, 0),
			('RU', 'RUS', 0, 'Russian Federation', 'RUB', 'Ruble', 'Rubles', '&#1088;&#1091;&#1073;', 1, 2, '+7', 0, 0),
			('RW', 'RWA', 0, 'Rwanda', 'RWF', 'Franc', 'Francs', '&#8355;', 1, 0, '+250', 0, 0),
			('SA', 'SAU', 0, 'Saudi Arabia', 'SAR', 'Rial', 'Rials', '&#65020;', 1, 2, '+966', 0, 0),
			('SB', 'SLB', 0, 'Solomon Islands', 'SBD', 'Dollar', 'Dollars', '&#36;', 1, 2, '+677', 0, 0),
			('SC', 'SYC', 0, 'Seychelles', 'SCR', 'Rupee', 'Rupees', '&#8360;', 1, 2, '+248', 0, 0),
			('SD', 'SDN', 0, 'Sudan', 'SDG', 'Pound', 'Pounds', '', 1, 2, '+249', 0, 0),
			('SE', 'SWE', 0, 'Sweden', 'SEK', 'Krona', 'Kronor', '&#107;&#114;', 1, 2, '+46', 1, 0),
			('SG', 'SGP', 0, 'Singapore', 'SGD', 'Dollar', 'Dollars', '&#36;', 1, 2, '+65', 0, 0),
			('SH', 'SHN', 0, 'Saint Helena', 'SHP', 'Pound', 'Pounds', '&#163;', 1, 2, '+290', 0, 0),
			('SI', 'SVN', 0, 'Slovenia', 'EUR', 'Euro', 'Euros', '&#8364;', 1, 2, '+386', 1, 0),
			('SJ', 'SJM', 0, 'Svalbard and Jan Mayen', 'NOK', 'Krone', 'Krones', '&#107;&#114;', 1, 2, '+47', 0, 0),
			('SK', 'SVK', 0, 'Slovakia', 'SKK', 'Koruna', 'Korunas', '', 1, 2, '+421', 1, 0),
			('SL', 'SLE', 0, 'Sierra Leone', 'SLL', 'Leone', 'Leones', '', 1, 2, '+232', 0, 0),
			('SM', 'SMR', 0, 'San Marino', 'EUR', 'Euro', 'Euros', '&#8364;', 1, 2, '+378', 0, 0),
			('SN', 'SEN', 0, 'Senegal', 'XOF', 'Franc', 'Francs', '&#8355;', 1, 0, '+221', 0, 0),
			('SO', 'SOM', 0, 'Somalia', 'SOS', 'Shilling', 'Shillings', '&#83;', 1, 2, '+252', 0, 0),
			('SR', 'SUR', 0, 'Suriname', 'SRD', 'Dollar', 'Dollars', '&#36;', 1, 2, '+597', 0, 0),
			('ST', 'STP', 0, 'Sao Tome and Principe', 'STD', 'Dobra', 'Dobras', '', 1, 2, '+239', 0, 0),
			('SV', 'SLV', 0, 'El Salvador', 'USD', 'Dollar', 'Dollars', '&#36;', 1, 2, '+503', 0, 0),
			('SY', 'SYR', 0, 'Syrian Arab Republic', 'SYP', 'Pound', 'Pounds', '&#163;', 1, 2, '+963', 0, 0),
			('SZ', 'SWZ', 0, 'Swaziland', 'SZL', 'Lilangeni', 'Lilangenis', '', 1, 2, '+268', 0, 0),
			('TC', 'TCA', 0, 'Turks and Caicos Islands', 'USD', 'Dollar', 'Dollars', '&#36;', 1, 2, '+1-649', 0, 0),
			('TD', 'TCD', 0, 'Chad', 'XAF', 'Franc', 'Francs', '&#8355;', 1, 0, '+235', 0, 0),
			('TG', 'TGO', 0, 'Togo', 'XOF', 'Franc', 'Francs', '&#8355;', 1, 0, '+228', 0, 0),
			('TH', 'THA', 0, 'Thailand', 'THB', 'Baht', 'Bahts', '&#3647;', 1, 2, '+66', 0, 0),
			('TJ', 'TJK', 0, 'Tajikistan', 'TJS', 'Somoni', 'Somonis', '', 1, 2, '+992', 0, 0),
			('TK', 'TKL', 0, 'Tokelau', 'NZD', 'Dollar', 'Dollars', '&#36;', 1, 2, '+690', 0, 0),
			('TM', 'TKM', 0, 'Turkmenistan', 'TMM', 'Manat', 'Manats', '', 1, 2, '+993', 0, 0),
			('TN', 'TUN', 0, 'Tunisia', 'TND', 'Dinar', 'Dinars', '', 1, 3, '+216', 0, 0),
			('TO', 'TON', 0, 'Tonga', 'TOP', 'Pa''anga', 'Pa''angas', '', 1, 2, '+676', 0, 0),
			('TR', 'TUR', 0, 'Turkey', 'TRY', 'Lira', 'Liras', '&#36;', 1, 2, '+90', 0, 0),
			('TT', 'TTO', 0, 'Trinidad and Tobago', 'TTD', 'Dollar', 'Dollars', '&#84;&#84;&#36;', 1, 2, '+1-868', 0, 0),
			('TV', 'TUV', 0, 'Tuvalu', 'AUD', 'Dollar', 'Dollars', '&#36;', 1, 2, '+688', 0, 0),
			('TW', 'TWN', 0, 'Taiwan, Province of China', 'TWD', 'Dollar', 'Dollars', '&#78;&#84;&#36;', 1, 2, '+886', 0, 0),
			('TZ', 'TZA', 0, 'Tanzania, United Republic of', 'TZS', 'Shilling', 'Shillings', '&#83;', 1, 2, '+255', 0, 0),
			('UA', 'UKR', 0, 'Ukraine', 'UAH', 'Hryvnia', 'Hryvnias', '&#8372;', 1, 2, '+380', 0, 0),
			('UG', 'UGA', 0, 'Uganda', 'UGX', 'Shilling', 'Shillings', '&#83;', 1, 2, '+256', 0, 0),
			('US', 'USA', 0, 'United States', 'USD', 'Dollar', 'Dollars', '&#36;', 1, 2, '+1', 0, 1),
			('UY', 'URY', 0, 'Uruguay', 'UYU', 'Peso', 'Pesos', '&#36;&#85;', 1, 2, '+598', 0, 0),
			('UZ', 'UZB', 0, 'Uzbekistan', 'UZS', 'Som', 'Soms', '&#1083;&#1074;', 1, 2, '+998', 0, 0),
			('VA', 'VAT', 0, 'Holy See (Vatican City State)', 'EUR', 'Euro', 'Euros', '&#8364;', 1, 2, '+379', 0, 0),
			('VC', 'VCT', 0, 'Saint Vincent and the Grenadines', 'XCD', 'Dollar', 'Dollars', '&#36;', 1, 2, '+1-784', 0, 0),
			('VE', 'VEN', 0, 'Venezuela', 'VEB', 'Bolivar', 'Bolivars', '', 1, 2, '+58', 0, 0),
			('VG', 'VGB', 0, 'Virgin Islands, British', 'USD', 'Dollar', 'Dollars', '&#36;', 1, 2, '+1-284', 0, 0),
			('VI', 'VIR', 0, 'Virgin Islands, US', 'USD', 'Dollar', 'Dollars', '&#36;', 1, 2, '+1-340', 0, 0),
			('VN', 'VNM', 0, 'Viet Nam', 'VND', 'Dong', 'Dongs', '&#8363;', 1, 2, '+84', 0, 0),
			('VU', 'VUT', 0, 'Vanuatu', 'VUV', 'Vatu', 'Vatus', '', 1, 0, '+678', 0, 0),
			('WF', 'WLF', 0, 'Wallis and Futuna', 'XPF', 'Franc', 'Francs', '&#8355;', 1, 0, '+681', 0, 0),
			('WS', 'WSM', 0, 'Samoa', 'WST', 'Tala', 'Talas', '', 1, 2, '+685', 0, 0),
			('YE', 'YEM', 0, 'Yemen', 'YER', 'Rial', 'Rials', '&#65020;', 1, 2, '+967', 0, 0),
			('ZA', 'ZAF', 0, 'South Africa', 'ZAR', 'Rand', 'Rands', '&#82;', 1, 2, '+27', 0, 0),
			('ZM', 'ZMB', 0, 'Zambia', 'ZMK', 'Kwacha', 'Kwachas', '', 1, 2, '+260', 0, 0),
			('ZW', 'ZWE', 0, 'Zimbabwe', 'ZWD', 'Dollar', 'Dollars', '&#90;&#36;', 1, 2, '+263', 0, 0);";		
			$wpdb->query($SQL);			
		}
	
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

