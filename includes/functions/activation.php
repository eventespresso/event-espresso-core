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
	$org_options['email_before_payment'] = $org_options['email_before_payment'] || $org_options['email_before_payment'] == 'Y' ? true : false;
	$org_options['email_fancy_headers'] = $org_options['email_fancy_headers'] || $org_options['email_fancy_headers'] == 'Y' ? true : false;
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
	global $wpdb;

	$system_name_data = "SELECT system_name FROM " . $wpdb->prefix . "events_question";

	$system_names = $wpdb->get_results($system_name_data);

	foreach ($system_names as $system_name) {
		switch ($system_name->system_name) {
			case 'fname':
				$fname = true;
				break;
			case 'lname':
				$lname = true;
				break;
			case 'email':
				$email = true;
				break;
			case 'address':
				$adress = true;
				break;
			case 'address2':
				$adress2 = true;
				break;
			case 'city':
				$city = true;
				break;
			case 'state':
				$state = true;
				break;
			case 'zip':
				$zip = true;
				break;
			case 'phone':
				$phone = true;
				break;
		}
	}

	if (empty($fname))
		$wpdb->insert($wpdb->prefix . "events_question", array('question' => 'First Name', 'question_type' => 'TEXT', 'system_name' => 'fname', 'required' => true, 'sequence' => '0'), array('%s', '%s', '%s', '%s', '%s'));

	if (empty($lname))
		$wpdb->insert($wpdb->prefix . "events_question", array('question' => 'Last Name', 'question_type' => 'TEXT', 'system_name' => 'lname', 'required' => true, 'sequence' => '1'), array('%s', '%s', '%s', '%s', '%s'));

	if (empty($email))
		$wpdb->insert($wpdb->prefix . "events_question", array('question' => 'Email', 'question_type' => 'TEXT', 'system_name' => 'email', 'required' => true, 'sequence' => '2'), array('%s', '%s', '%s', '%s', '%s'));

	if (empty($adress))
		$wpdb->insert($wpdb->prefix . "events_question", array('question' => 'Address', 'system_name' => 'address', 'sequence' => '3'), array('%s', '%s', '%s'));

	if (empty($adress2))
		$wpdb->insert($wpdb->prefix . "events_question", array('question' => 'Address 2', 'system_name' => 'address2', 'sequence' => '3'), array('%s', '%s', '%s'));

	if (empty($city))
		$wpdb->insert($wpdb->prefix . "events_question", array('question' => 'City', 'system_name' => 'city', 'sequence' => '4'), array('%s', '%s', '%s'));

	if (empty($state))
		$wpdb->insert($wpdb->prefix . "events_question", array('question' => 'State', 'system_name' => 'state', 'sequence' => '5'), array('%s', '%s', '%s'));

	if (empty($zip))
		$wpdb->insert($wpdb->prefix . "events_question", array('question' => 'Zip', 'system_name' => 'zip', 'sequence' => '6'), array('%s', '%s', '%s'));

	if (empty($country))
		$wpdb->insert($wpdb->prefix . "events_question", array('question' => 'Country', 'system_name' => 'country', 'sequence' => '6'), array('%s', '%s', '%s'));

	if (empty($phone))
		$wpdb->insert($wpdb->prefix . "events_question", array('question' => 'Phone', 'system_name' => 'phone', 'sequence' => '7'), array('%s', '%s', '%s'));

	$system_group = $wpdb->get_row("SELECT system_group FROM " . $wpdb->prefix . "events_qst_group" . " WHERE system_group = 1");

	if ($wpdb->num_rows == 0) {

		$wpdb->insert($wpdb->prefix . "events_qst_group", array('group_name' => 'Personal Information', 'group_identifier' => sanitize_title_with_dashes('personal_information-' . time()), 'system_group' => 1), array('%s', '%s', '%d'));

		$personal_group_id = $wpdb->insert_id;

		$wpdb->insert($wpdb->prefix . "events_qst_group", array('group_name' => 'Address Information', 'group_identifier' => sanitize_title_with_dashes('address_information-' . time()), 'system_group' => 0), array('%s', '%s', '%d'));

		$address_group_id = $wpdb->insert_id;

		$system_name_data = "SELECT id, system_name FROM " . $wpdb->prefix . "events_question" . " where system_name IN ('fname', 'lname', 'email')";
		$system_names = $wpdb->get_results($system_name_data);

		foreach ($system_names as $system_name) {

			$wpdb->insert($wpdb->prefix . "events_qst_group_rel", array('group_id' => $personal_group_id, 'question_id' => $system_name->id), array('%d', '%d'));
		}

		$system_name_data = "SELECT id, system_name FROM " . $wpdb->prefix . "events_question" . " where system_name IN ('address', 'city', 'state', 'zip' )";
		$system_names = $wpdb->get_results($system_name_data);

		foreach ($system_names as $system_name) {

			$wpdb->insert($wpdb->prefix . "events_qst_group_rel", array('group_id' => $address_group_id, 'question_id' => $system_name->id), array('%d', '%d'));
		}
	}
}

function espresso_initialize_email() {
	global $wpdb;
	$test = $wpdb->get_row("SELECT * FROM " . $wpdb->prefix . "events_email WHERE id=1");
	if (empty($test)) {
		$text = "***This Is An Automated Response***\nThank You [fname] [lname]\n";
		$text .= "We have just received a payment in the amount of [event_price] for your registration to [event_name].\n";
		$text .= "Transaction ID: [txn_id]";
		$wpdb->insert($wpdb->prefix . "events_email", array('email_type' => 'payment', 'email_name' => 'default payment email', 'email_subject' => 'Payment Received for [event_name]', 'email_text' => $text, 'wp_user' => 1), array('%s', '%s', '%s', '%s', '%d'));

		$text = "***This is an automated response - Do Not Reply***\n";
		$text .= "Thank you [fname] [lname] for registering for [event].\n";
		$text .= "This event starts at [start_time] on [start_date] and runs until [end_time] on [end_date].\n";
		$text .= "Location:\n";
		$text .= "[location]\n";
		$text .= "Phone: [location_phone]\n";
		$text .= "Google Map: [google_map_link]\n";
		$text .= "We hope that you will find this event both informative and enjoyable. Should you have any questions, please contact [contact].\n";
		$text .= "If you have not done so already, please submit your payment in the amount of [cost].\n";
		$text .= "Click here to review your payment information [payment_url].\n";
		$text .= "Thank You.\n";
		$wpdb->insert($wpdb->prefix . "events_email", array('email_type' => 'confirmation', 'email_name' => 'default confirmation email', 'email_subject' => 'Registration confirmation for [event_name]', 'email_text' => $text, 'wp_user' => 1), array('%s', '%s', '%s', '%s', '%d'));
	}
}

function espresso_update_event_ids() {
	global $wpdb;
	$event_data = "SELECT id FROM " . $wpdb->prefix . "events_detail WHERE event_code='0' ";
	if ($wpdb->num_rows == 0) {
		$wpdb->update($wpdb->prefix . "events_detail", array('group_name' => 'Personal Information', 'group_identifier' => sanitize_title_with_dashes('personal_information-' . time()), 'system_group' => 1), array('%s', '%s', '%d'));
	}
}

function event_espresso_update_shortcodes() {
	global $wpdb;
	$wpdb->query("SELECT id FROM " . $wpdb->prefix . "posts " . " WHERE (post_content LIKE '%{ESPRESSO_EVENTS}%' AND post_type = 'page') OR (post_content LIKE '%{ESPRESSO_PAYMENTS}%'  AND post_type = 'page') OR (post_content LIKE '%{ESPRESSO_TXN_PAGE}%'  AND post_type = 'page') ");

	if ($wpdb->num_rows > 0) {
		$wpdb->query("UPDATE " . $wpdb->prefix . "posts SET post_content = REPLACE(post_content,'{ESPRESSO_EVENTS}','[ESPRESSO_EVENTS]')");
		$wpdb->query("UPDATE " . $wpdb->prefix . "posts SET post_content = REPLACE(post_content,'{ESPRESSO_PAYMENTS}','[ESPRESSO_PAYMENTS]')");
		$wpdb->query("UPDATE " . $wpdb->prefix . "posts SET post_content = REPLACE(post_content,'{ESPRESSO_TXN_PAGE}','[ESPRESSO_TXN_PAGE]')");
	}

	$wpdb->query("SELECT id FROM " . $wpdb->prefix . "posts " . " WHERE (post_content LIKE '%{EVENTREGIS}%' AND post_type = 'page') OR (post_content LIKE '%{EVENTREGPAY}%' AND post_type = 'page') OR (post_content LIKE '%{EVENTPAYPALTXN}%' AND post_type = 'page') ");

	if ($wpdb->num_rows > 0) {
		$wpdb->query("UPDATE " . $wpdb->prefix . "posts SET post_content = REPLACE(post_content,'{EVENTREGIS}','[ESPRESSO_EVENTS]')");
		$wpdb->query("UPDATE " . $wpdb->prefix . "posts SET post_content = REPLACE(post_content,'{EVENTREGPAY}','[ESPRESSO_PAYMENTS]')");
		$wpdb->query("UPDATE " . $wpdb->prefix . "posts SET post_content = REPLACE(post_content,'{EVENTPAYPALTXN}','[ESPRESSO_TXN_PAGE]')");
	}
}

function espresso_update_attendee_qty() {
	global $wpdb;
	$sql = "SELECT id FROM " . $wpdb->prefix . "events_attendee WHERE quantity = 0 ";
	$results = $wpdb->get_results($sql);
	if ($wpdb->num_rows > 0) {
		$update_attendee_qty = $wpdb->query("UPDATE " . $wpdb->prefix . "events_attendee SET quantity = 1 OR quantity = '' WHERE quantity = 0");
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, " sqldump = " . var_export($results, true) . " ] [ rows affected = " . var_export($update_attendee_qty, true));
	}
}

function espresso_org_option_initialization() {
	global $wpdb, $espresso_wp_user;

	$table_name = $wpdb->prefix . "events_organization";
	//Check to see if upgrading from an earlier version.
	$test = get_user_meta($espresso_wp_user, 'events_organization_settings', true);
	if (empty($test)) {
		if ($wpdb->get_var("SHOW TABLES LIKE '$table_name'") != $table_name) {

			$new_org_options = array(
					'organization' => get_bloginfo('name'),
					'organization_street1' => '123 West Somewhere',
					'organization_street2' => '',
					'organization_city' => 'Some City',
					'organization_state' => 'AZ',
					'organization_zip' => '84128',
					'contact_email' => get_bloginfo('admin_email'),
					'default_mail' => true,
					'country_id' => '',
					'organization_country' => '64',
					'currency_symbol' => '$',
					'default_logo_url' => '',
					'default_payment_status' => '',
					'surcharge' => '0.00',
					'surcharge_type' => 'flat_rate',
					'events_in_dasboard' => '30',
					'use_captcha' => false,
					'expire_on_registration_end' => true,
					'email_before_payment' => false,
					'email_fancy_headers' => false,
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

			update_user_meta($espresso_wp_user, 'events_organization_settings', $new_org_options);

			//If an earlier version of Event Espresso is found, then we need to create the organization options.
		} else if ($wpdb->get_var("SHOW TABLES LIKE '$table_name'") == $table_name) {
			$results = $wpdb->get_results("SELECT * FROM " . EVENTS_ORGANIZATION_TABLE . " WHERE id='1'");
			foreach ($results as $result) {
				$org_id = $result->id;
				$Organization = $result->organization;
				$Organization_street1 = $result->organization_street1;
				$Organization_street2 = $result->organization_street2;
				$Organization_city = $result->organization_city;
				$Organization_state = $result->organization_state;
				$Organization_zip = $result->organization_zip;
				$contact = $result->contact_email;
				$registrar = $result->contact_email;
				$paypal_id = $result->paypal_id;
				$paypal_cur = $result->currency_format;
				$event_page_id = $result->event_page_id;
				$return_url = $result->return_url;
				$cancel_return = $result->cancel_return;
				$notify_url = $result->notify_url;
				$use_sandbox = $result->use_sandbox;
				$image_url = $result->image_url;
				$default_mail = $result->default_mail;
				$payment_subject = $result->payment_subject;
				$payment_message = $result->payment_message;
				$message = $result->message;
			}

			switch ($paypal_cur) {
				case 'USD':
				case 'HKD':
				case 'NZD':
				case 'SGD':
					$currency_symbol = '$';
					break;

				case 'AUD':
					$currency_symbol = 'A $';
					break;

				case 'GBP':
					$currency_symbol = '&pound;';
					break;

				case 'CAD':
					$currency_symbol = 'C $';
					break;

				case 'EUR':
					$currency_symbol = '&#8364;';
					break;

				case 'JPY':
					$currency_symbol = '&yen;';
					break;

				default:
					$currency_symbol = '$';
					break;
			}

			//DO NOT Create new settings here
			$org_options = array(
					'organization' => $Organization,
					'organization_street1' => $Organization_street1,
					'organization_street2' => $Organization_street2,
					'organization_city' => $Organization_city,
					'organization_state' => $Organization_state,
					'organization_zip' => $Organization_zip,
					'contact_email' => $contact,
					'paypal_id' => $paypal_id,
					'currency_format' => $paypal_cur,
					'currency_symbol' => $currency_symbol,
					'event_page_id' => $event_page_id,
					'return_url' => $return_url,
					'cancel_return' => $cancel_return,
					'notify_url' => $notify_url,
					'use_sandbox' => $use_sandbox,
					'image_url' => $image_url,
					'default_mail' => $default_mail,
					'payment_subject' => $payment_subject,
					'payment_message' => $payment_message,
					'message' => $message,
							//DO NOT Create new settings here
			);

			update_user_meta($espresso_wp_user, 'events_organization_settings', $org_options);

			//Delete the table
			$wpdb->query("DROP TABLE IF EXISTS $table_name");
		}
	}
}

//This function installs all the required database tables
function events_data_tables_install() {

	$table_version = EVENT_ESPRESSO_VERSION;


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
						PRIMARY KEY  (ATT_ID),
							KEY ATT_fname (ATT_fname),
							KEY ATT_lname (ATT_lname),
							KEY ATT_email (ATT_email)";
	event_espresso_run_install($table_name, $table_version, $sql, 'ENGINE=InnoDB ');



	$table_name = 'esp_payment';
	$sql = "PAY_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
				  TXN_ID int(10) unsigned	DEFAULT NULL,
				  PAY_timestamp int(11) NOT NULL,
				  PAY_method varchar(45) DEFAULT NULL,
				  PAY_amount decimal(10,2) DEFAULT NULL,
				  PAY_details text,
						PRIMARY KEY  (PAY_ID),
							KEY TXN_ID (TXN_ID),
							KEY PAY_timestamp (PAY_timestamp)";
	event_espresso_run_install($table_name, $table_version, $sql, 'ENGINE=InnoDB ');
	
	

/*	$table_name = 'esp_datetime';
	$sql = "DTT_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
			  EVT_ID int(10) unsigned NOT NULL,
			  DTT_is_primary tinyint(1) DEFAULT '1',
			  DTT_EVT_start int(10) unsigned NOT NULL,
			  DTT_EVT_end int(10) unsigned NOT NULL,
			  DTT_REG_start int(10) unsigned NOT NULL,
			  DTT_REG_end int(10) unsigned NOT NULL,
			  DTT_reg_limit mediumint(8) unsigned DEFAULT NULL,
			  DTT_tckts_left mediumint(8) unsigned DEFAULT NULL,
			  PRIMARY KEY (DTT_ID),
			  KEY EVT_ID (EVT_ID)";
	event_espresso_run_install($table_name, $table_version, $sql );*/




	$table_name = 'esp_datetime';
	$sql = "DTT_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
			  EVT_ID int(10) unsigned NOT NULL,
			  DTT_is_primary tinyint(1) DEFAULT '1',
			  DTT_EVT_start int(10) unsigned NOT NULL,
			  DTT_EVT_end int(10) unsigned NOT NULL,
			  DTT_REG_start int(10) unsigned NOT NULL,
			  DTT_REG_end int(10) unsigned NOT NULL,
			  PRIMARY KEY (DTT_ID),
			  KEY EVT_ID (EVT_ID)";
	event_espresso_run_install($table_name, $table_version, $sql );




	$table_name = 'esp_registration';
	$sql = "REG_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
				  EVT_ID int(10) unsigned NOT NULL,
				  ATT_ID int(10) unsigned NOT NULL,
				  TXN_ID int(10) unsigned NOT NULL,
				  REG_session varchar(45) COLLATE utf8_bin NOT NULL,
				  REG_code varchar(45) COLLATE utf8_bin DEFAULT NULL,
				  REG_is_primary tinyint(1) DEFAULT '0',
				  REG_is_group_reg tinyint(1) DEFAULT '0',
				  STS_ID varchar(3) NOT NULL DEFAULT 'PND',
				  REG_date int(11) NOT NULL,
				  PRC_ID varchar(45) DEFAULT NULL,
				  REG_att_is_going tinyint(1) DEFAULT '0',
				  REG_att_checked_in tinyint(1) DEFAULT '0',
				  PRIMARY KEY  (REG_ID),
				  KEY EVT_ID (EVT_ID),
				  KEY ATT_ID (ATT_ID),
				  KEY TXN_ID (TXN_ID),
				  KEY STS_ID (STS_ID),
				  KEY REG_is_primary (REG_is_primary),
				  KEY REG_code (REG_code),
				  KEY REG_code_2 (REG_code)";
	event_espresso_run_install($table_name, $table_version, $sql, 'ENGINE=InnoDB ');




	$table_name = 'esp_transaction';
	$sql = "TXN_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
				  TXN_timestamp int(11) NOT NULL,
				  TXN_total decimal(10,2) DEFAULT NULL,
				  STS_ID varchar(3) NOT NULL DEFAULT 'TPN',
				  TXN_details text COLLATE utf8_bin,
				  TXN_tax_data text COLLATE utf8_bin,
				  TXN_session_data text COLLATE utf8_bin,
				  TXN_hash_salt varchar(250) COLLATE utf8_bin DEFAULT NULL,
				  PRIMARY KEY  (TXN_ID),
				  KEY TXN_timestamp (TXN_timestamp),
				  KEY STS_ID (STS_ID)";
	event_espresso_run_install($table_name, $table_version, $sql, 'ENGINE=InnoDB ');





	$table_name = 'esp_status';
	$sql = "STS_ID varchar(3) COLLATE utf8_bin NOT NULL,
				  STS_code varchar(45) COLLATE utf8_bin NOT NULL,
				  STS_type set('event','registration','transaction','email') COLLATE utf8_bin NOT NULL,
				  STS_can_edit tinyint(1) NOT NULL DEFAULT '0',
				  STS_desc tinytext COLLATE utf8_bin,
				  UNIQUE KEY STS_ID_UNIQUE (STS_ID),
				  KEY STS_type (STS_type)";
	event_espresso_run_install($table_name, $table_version, $sql );



	$table_name = "events_attendee";
	$sql = " id int(11) unsigned NOT NULL AUTO_INCREMENT,
					  registration_id VARCHAR(23) DEFAULT '0',
					  is_primary tinyint(1) NOT NULL DEFAULT '0',
					  lname VARCHAR(45) DEFAULT NULL,
					  fname VARCHAR(45) DEFAULT NULL,
					  address VARCHAR(45) DEFAULT NULL,
					  address2 VARCHAR(45) DEFAULT NULL,
					  city VARCHAR(45) DEFAULT NULL,
					  state VARCHAR(45) DEFAULT NULL,
					  zip VARCHAR(45) DEFAULT NULL,
					  country_id VARCHAR(128) DEFAULT NULL,
					  organization_name VARCHAR(50) DEFAULT NULL,
					  vat_number VARCHAR(20) DEFAULT NULL,
					  email VARCHAR(45) DEFAULT NULL,
					  phone VARCHAR(45) DEFAULT NULL,
					  date timestamp NOT NULL default CURRENT_TIMESTAMP,
					  payment VARCHAR(45) DEFAULT NULL,
					  payment_status VARCHAR(45) DEFAULT 'Incomplete',
					  txn_type VARCHAR(45) DEFAULT NULL,
					  txn_id VARCHAR(45) DEFAULT NULL,
					  amount_pd decimal(20,2) DEFAULT '0.00',
					  total_cost decimal(20,2) DEFAULT '0.00',
					  price_option VARCHAR(100) DEFAULT NULL,
					  coupon_code VARCHAR(45) DEFAULT NULL,
					  quantity VARCHAR(5) DEFAULT '0',
					  payment_date VARCHAR(45) DEFAULT NULL,
					  event_id VARCHAR(45) DEFAULT NULL,
						venue_id VARCHAR(45) DEFAULT NULL,
					  event_time VARCHAR(15) DEFAULT NULL,
					  end_time VARCHAR(15) DEFAULT NULL,
					  start_date VARCHAR(45) DEFAULT NULL,
					  end_date VARCHAR(45) DEFAULT NULL,
					  attendee_session VARCHAR(250) DEFAULT NULL,
					  transaction_details TEXT,
					  pre_approve tinyint(1) NOT NULL DEFAULT '1',
					  checked_in tinyint(1) NOT NULL DEFAULT '0',
					  checked_in_quantity INT(11) DEFAULT '0',
					  hashSalt VARCHAR(250) DEFAULT NULL,
					PRIMARY KEY  (id),
					KEY registration_id (registration_id),
					KEY event_id (event_id)";
	event_espresso_run_install($table_name, $table_version, $sql);

	$table_name = "events_status";
	$sql = "id int(3) unsigned NOT NULL AUTO_INCREMENT,
					  code VARCHAR(45) DEFAULT NULL,
					  type INT(11) DEFAULT '0',
					  can_edit BOOLEAN DEFAULT '0',
					PRIMARY KEY  (id)";
	event_espresso_run_install($table_name, $table_version, $sql);

	$table_name = "events_detail";
	$sql = "id int(11) unsigned NOT NULL AUTO_INCREMENT,
				  event_code VARCHAR(26) DEFAULT '0',
				  event_name VARCHAR(100) DEFAULT NULL,
				  slug VARCHAR(100) DEFAULT NULL,
				  event_desc TEXT,
				  display_desc tinyint(1) DEFAULT 1,
				  display_reg_form tinyint(1) DEFAULT 1,
				  event_identifier VARCHAR(75) DEFAULT NULL,
				  start_date VARCHAR(15) DEFAULT NULL,
				  end_date VARCHAR(15) DEFAULT NULL,
				  registration_start VARCHAR(15) DEFAULT NULL,
				  registration_end VARCHAR(15) DEFAULT NULL,
				  registration_startT VARCHAR(15) DEFAULT NULL,
					registration_endT VARCHAR(15) DEFAULT NULL,
				  visible_on VARCHAR(15) DEFAULT NULL,
				  address TEXT,
				  address2 TEXT,
				  city VARCHAR(100) DEFAULT NULL,
				  state VARCHAR(100) DEFAULT NULL,
				  zip VARCHAR(11) DEFAULT NULL,
				  phone VARCHAR(15) DEFAULT NULL,
				  venue_title VARCHAR(250) DEFAULT NULL,
				  venue_url VARCHAR(250) DEFAULT NULL,
				  venue_image TEXT,
				  venue_phone VARCHAR(15) DEFAULT NULL,
				  virtual_url VARCHAR(250) DEFAULT NULL,
				  virtual_phone VARCHAR(15) DEFAULT NULL,
				  reg_limit VARCHAR(25) DEFAULT '999999',
				  allow_multiple tinyint(1) NOT NULL DEFAULT '0',
				  additional_limit INT(10) DEFAULT '5',
				  is_active tinyint(1) NOT NULL DEFAULT '1',
				  event_status VARCHAR(1) DEFAULT 'A',
				  use_coupon_code tinyint(1) NOT NULL DEFAULT '0',
				  use_groupon_code tinyint(1) NOT NULL DEFAULT '0',
				  category_id TEXT,
				  coupon_id TEXT,
				  tax_percentage FLOAT,
				  tax_mode INT(11),
				  member_only tinyint(1) NOT NULL DEFAULT '0',
					post_id INT(11) DEFAULT NULL,
					post_type VARCHAR(50) DEFAULT NULL,
					country VARCHAR(200) DEFAULT NULL,
					externalURL VARCHAR(255) DEFAULT NULL,
					early_disc VARCHAR(10) DEFAULT NULL,
					early_disc_date VARCHAR(15) DEFAULT NULL,
					early_disc_percentage VARCHAR(1) DEFAULT false,
					question_groups LONGTEXT NULL DEFAULT NULL,
					item_groups LONGTEXT NULL DEFAULT NULL,
					event_type VARCHAR(250) DEFAULT NULL,
					allow_overflow tinyint(1) NOT NULL DEFAULT '0',
					overflow_event_id INT(10) DEFAULT '0',
					recurrence_id int(11) DEFAULT '0',
					alt_email TEXT,
					event_meta LONGTEXT DEFAULT NULL,
					wp_user int(22) DEFAULT '1',
					require_pre_approval tinyint(1) NOT NULL DEFAULT '0',
					timezone_string VARCHAR(250) DEFAULT NULL,
					likes int(22) DEFAULT NULL,
					submitted datetime NOT NULL,
					ticket_id int(22) DEFAULT '0',
					certificate_id int(22) DEFAULT '0',
					confirmation_email_id int(22) DEFAULT '0',
					payment_email_id int(22) DEFAULT '0',
				PRIMARY KEY  (id),
				KEY slug (slug),
				KEY event_code (event_code),
				KEY wp_user (wp_user),
				KEY event_name (event_name),
				KEY city (city),
				KEY state (state),
				KEY start_date (start_date),
				KEY end_date (end_date),
				KEY registration_start (registration_start),
				KEY registration_end (registration_end),
				KEY reg_limit (reg_limit),
				KEY event_status (event_status),
				KEY recurrence_id (recurrence_id),
				KEY submitted (submitted),
				KEY likes (likes)";
	event_espresso_run_install($table_name, $table_version, $sql);

	$table_name = "events_meta";
	$sql = "emeta_id bigint(20) NOT NULL AUTO_INCREMENT,
			  event_id int(11) DEFAULT NULL,
			  meta_key varchar(255) DEFAULT NULL,
			  meta_value longtext,
			  date_added datetime DEFAULT NULL,
  			  PRIMARY KEY  (emeta_id),
			  KEY event_id (event_id),
			  KEY meta_key (meta_key)";
	event_espresso_run_install($table_name, $table_version, $sql);

	$table_name = "events_email";
	$sql = "id int(11) unsigned NOT NULL AUTO_INCREMENT,
				email_type VARCHAR(25) DEFAULT NULL,
				email_name VARCHAR(100) DEFAULT NULL,
				email_subject VARCHAR(250) DEFAULT NULL,
				email_text TEXT,
				wp_user int(22) DEFAULT '1',
				UNIQUE KEY id (id),
				KEY wp_user (wp_user)";
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

	$table_name = "events_discount_rel";
	$sql = "id int(11) NOT NULL AUTO_INCREMENT,
				event_id int(11) DEFAULT NULL,
				discount_id int(11) DEFAULT NULL,
				PRIMARY KEY  (id),
			  	KEY event_id (event_id)";
	event_espresso_run_install($table_name, $table_version, $sql);

/*	$table_name = "esp_price";
	$sql = "PRC_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
			  PRT_ID tinyint(3) unsigned NOT NULL,
			  EVT_ID int(10) unsigned NOT NULL,
			  PRC_amount decimal(10,2) NOT NULL DEFAULT 0.00,
			  PRC_name varchar(45) NOT NULL,
			  PRC_desc text,
			  PRC_reg_limit smallint(5) unsigned DEFAULT NULL,
			  PRC_use_dates tinyint(1) DEFAULT 0,
			  PRC_start_date int(10) unsigned DEFAULT NULL,
			  PRC_end_date int(10) unsigned DEFAULT NULL,
			  PRC_disc_code varchar(100) DEFAULT NULL,
			  PRC_disc_limit_qty tinyint(1) DEFAULT 0,
			  PRC_disc_qty smallint(6) DEFAULT 0,
			  PRC_disc_apply_all tinyint(1) DEFAULT 0,
			  PRC_disc_wp_user bigint(20) DEFAULT NULL,
			  PRC_is_active tinyint(1) DEFAULT 1,
			  PRC_overrides int(10) unsigned DEFAULT NULL,
			  PRC_order tinyint(3) unsigned DEFAULT NULL,
			  PRC_deleted tinyint(1) DEFAULT 0,
			  PRIMARY KEY  (PRC_ID)";
	event_espresso_run_install($table_name, $table_version, $sql);*/

	$table_name = "esp_price";
	$sql = "PRC_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
			  PRT_ID tinyint(3) unsigned NOT NULL,
			  EVT_ID int(10) unsigned NOT NULL,
			  PRC_amount decimal(10,2) NOT NULL DEFAULT 0.00,
			  PRC_name varchar(45) NOT NULL,
			  PRC_desc text,
			  PRC_use_dates tinyint(1) DEFAULT 0,
			  PRC_start_date int(10) unsigned DEFAULT NULL,
			  PRC_end_date int(10) unsigned DEFAULT NULL,
			  PRC_disc_code varchar(100) DEFAULT NULL,
			  PRC_disc_limit_qty tinyint(1) DEFAULT 0,
			  PRC_disc_qty smallint(6) DEFAULT 0,
			  PRC_disc_apply_all tinyint(1) DEFAULT 0,
			  PRC_disc_wp_user bigint(20) DEFAULT NULL,
			  PRC_is_active tinyint(1) DEFAULT 1,
			  PRC_overrides int(10) unsigned DEFAULT NULL,
			  PRC_order tinyint(3) unsigned DEFAULT NULL,
			  PRC_deleted tinyint(1) DEFAULT 0,
			  PRIMARY KEY  (PRC_ID)";
	event_espresso_run_install($table_name, $table_version, $sql);



	$table_name = "esp_price_type";
	$sql = 'PRT_ID tinyint(1) UNSIGNED NOT NULL AUTO_INCREMENT ,
			  PRT_name VARCHAR(45) NOT NULL ,
			  PRT_is_member tinyint(1) NULL DEFAULT 0 ,
			  PRT_is_discount tinyint(1) NULL DEFAULT 0 ,
			  PRT_is_tax tinyint(1) NULL DEFAULT 0 ,
			  PRT_is_percent tinyint(1) NULL DEFAULT 0 ,
			  PRT_is_global tinyint(1) NULL DEFAULT 0 ,
			  PRT_order tinyint(1) UNSIGNED NULL ,
				PRT_deleted tinyint(1) DEFAULT 0,
			  UNIQUE KEY PRT_name_UNIQUE (PRT_name),
			  PRIMARY KEY  (PRT_ID)';
	event_espresso_run_install($table_name, $table_version, $sql);




	$table_name = "events_discount_codes";
	$sql = "id int(11) NOT NULL AUTO_INCREMENT,
				coupon_code varchar(50) DEFAULT NULL,
				coupon_code_price decimal(20,2) DEFAULT NULL,
				use_percentage tinyint(1) NOT NULL DEFAULT '0',
				coupon_code_description TEXT,
				each_attendee tinyint(1) NOT NULL DEFAULT '0',
				quantity int(7) NOT NULL DEFAULT '0',
				use_limit tinyint(1) NOT NULL DEFAULT '0',
				use_exp_date tinyint(1) NOT NULL DEFAULT '0',
				exp_date varchar(15) DEFAULT NULL,
				wp_user int(22) DEFAULT '1',
				PRIMARY KEY  (id),
			  	KEY coupon_code (coupon_code),
			  	KEY wp_user (wp_user)";
	event_espresso_run_install($table_name, $table_version, $sql);

	$table_name = "events_multi_event_registration_id_group";
	$sql = "primary_registration_id varchar(255) DEFAULT NULL,
			registration_id varchar(255) DEFAULT NULL  ";
	event_espresso_run_install($table_name, $table_version, $sql);

	$table_name = "events_attendee_cost";
	$sql = "attendee_id int(11) DEFAULT NULL,
			cost decimal(20,2) DEFAULT '0.00',
			quantity int(11) DEFAULT NULL,
			KEY attendee_id (attendee_id)";
	event_espresso_run_install($table_name, $table_version, $sql);

	$table_name = "events_question";
	$sql = "id int(11) unsigned NOT NULL auto_increment,
			sequence INT(11) NOT NULL default '0',
			question_type enum('TEXT','TEXTAREA','MULTIPLE','SINGLE','DROPDOWN','DATE') NOT NULL default 'TEXT',
			question text NOT NULL,
			system_name varchar(15) DEFAULT NULL,
			response text NULL,
			required tinyint(1) NOT NULL DEFAULT '0',
			required_text text NULL,
			admin_only tinyint(1) NOT NULL DEFAULT '0',
			wp_user int(22) DEFAULT '1',
			PRIMARY KEY  (id),
			KEY wp_user (wp_user),
			KEY system_name (system_name),
			KEY admin_only (admin_only)";
	event_espresso_run_install($table_name, $table_version, $sql);

	$table_name = "events_qst_group";
	$sql = "id int(11) NOT NULL AUTO_INCREMENT,
				group_name VARCHAR(100) NOT NULL default 'NULL',
				group_identifier VARCHAR(45) NOT NULL default 'NULL',
				group_description TEXT,
				group_order int(11) DEFAULT '0',
				show_group_name tinyint(1) NOT NULL DEFAULT '1',
				show_group_description tinyint(1) NOT NULL DEFAULT '1',
				system_group tinyint(1) NOT NULL DEFAULT '0',
				wp_user int(22) DEFAULT '1',
				PRIMARY KEY  (id),
			  	KEY system_group (system_group),
			  	KEY wp_user (wp_user)";
	event_espresso_run_install($table_name, $table_version, $sql);

	$table_name = "events_qst_group_rel";
	$sql = "id int(11) NOT NULL AUTO_INCREMENT,
				group_id int(11)  NOT NULL,
				question_id int(11) NOT NULL,
				PRIMARY KEY  (id),
			  	KEY group_id (group_id),
			  	KEY question_id (question_id)";
	event_espresso_run_install($table_name, $table_version, $sql);

	$table_name = "events_answer";
	$sql = "id int(11) NOT NULL AUTO_INCREMENT,
			registration_id varchar(23) NOT NULL,
			attendee_id int(11) NOT NULL default '0',
			question_id int(11) NOT NULL default '0',
			answer text NOT NULL,
			PRIMARY KEY  (id),
			KEY registration_id (registration_id),
			KEY attendee_id (attendee_id)";
	event_espresso_run_install($table_name, $table_version, $sql);
}

function event_espresso_run_install($table_name, $table_version, $sql, $engine = '') {

	global $wpdb;

	$wp_table_name = $wpdb->prefix . $table_name;

	if ($wpdb->get_var("SHOW TABLES LIKE '" . $wp_table_name . "'") != $wp_table_name) {

		$sql_create_table = "CREATE TABLE " . $wp_table_name . " ( " . $sql . " ) " . $engine . " DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;";

		require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
		dbDelta($sql_create_table);

		//create option for table version
		$option_name = $table_name . '_tbl_version';
		$newvalue = $table_version;
		if (get_option($option_name)) {
			update_option($option_name, $newvalue);
		} else {
			$deprecated = '';
			$autoload = 'no';
			add_option($option_name, $newvalue, $deprecated, $autoload);
		}
		//create option for table name
		$option_name = $table_name . '_tbl';
		$newvalue = $wp_table_name;
		if (get_option($option_name)) {
			update_option($option_name, $newvalue);
		} else {
			$deprecated = '';
			$autoload = 'no';
			add_option($option_name, $newvalue, $deprecated, $autoload);
		}
	}

	// Code here with new database upgrade info/table Must change version number to work.

	$installed_ver = get_option($table_name . '_tbl_version');
	if ($installed_ver != $table_version) {
		$sql_create_table = "CREATE TABLE " . $wp_table_name . " ( " . $sql . " ) ;";
		require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
		dbDelta($sql_create_table);
		update_option($table_name . '_tbl_version', $table_version);
	}
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

function espresso_default_prices() {

	global $wpdb;

	$sql = 'DELETE FROM ' . ESP_PRICE_TYPE . ' WHERE PRT_ID < 9';
	$wpdb->query($sql);

	$sql = "INSERT INTO " . ESP_PRICE_TYPE . " (PRT_ID, PRT_name, PRT_is_member, PRT_is_discount, PRT_is_tax, PRT_is_percent, PRT_is_global, PRT_order) VALUES
	(1, 'Default Event Price', 0, 0, 0, 0, 1, 0),
	(2, 'Event Price', 0, 0, 0, 0, 0, 0),
	(3, 'Default Member % Discount', 1, 1, 0, 1, 1, 10),
	(4, 'Default Early Bird % Discount', 0, 1, 0, 1, 1, 20),
	(5, 'Promo Code Discount', 0, 1, 0, 0, 1, 10),
	(6, 'Default Surcharge', 0, 0, 0, 0, 1, 30),
	(7, 'Regional Tax', 0, 0, 1, 1, 1, 40),
	(8, 'Federal Tax', 0, 0, 1, 1, 1, 50);";
	$wpdb->query($sql);

	$sql = 'DELETE FROM ' . ESP_PRICE_TABLE . ' WHERE PRC_ID < 8';
	$wpdb->query($sql);

	$sql = "INSERT INTO " . ESP_PRICE_TABLE . "
	(PRC_ID, PRT_ID, EVT_ID, PRC_amount, PRC_name, PRC_desc, PRC_use_dates, PRC_start_date, PRC_end_date, PRC_disc_code, PRC_disc_limit_qty, PRC_disc_qty, PRC_disc_apply_all, PRC_disc_wp_user, PRC_is_active, PRC_overrides, PRC_order, PRC_deleted ) VALUES
	(1, 1, 0, '100.00', 'General Admission', 'Regular price for all Events.', 0, NULL, NULL, NULL, 0, 0, 0, 0, 1, NULL, 0, 0),
	(2, 3, 0, '20', 'Members Discount', 'Members receive a 20% discount off of the regular price.', 0, NULL, NULL, NULL, 0, 0, 0, 0, 1, NULL, 10, 0),
	(3, 4, 0, '10', 'Early Bird Discount', 'Sign up early and receive an additional 10% discount off of the regular price.',  1, NULL, NULL, NULL, 0, 0, 0, 0, 1, NULL, 20, 0),
	(4, 5, 0, '25', 'Super Promo 25', 'The first 50 to enter this Promo Code will receive $25 off of the regular price.', 0, NULL, NULL, 'Sup3rPr0m025', 1, 50, 0, 1, 1, NULL, 10, 0),
	(5, 6, 0, '7.50', 'Service Fee', 'Covers administrative expenses.', 0, NULL, NULL, NULL, 0, 0, 0, 0, 1, NULL, 30, 0),
	(6, 7, 0, '7.00', 'Sales Tax', 'Locally imposed tax.', 0, NULL, NULL, NULL, 0, 0, 0, 0, 1, NULL, 40, 0),
	(7, 8, 0, '15.00', 'VAT', 'Value Added Tax.', 0, NULL, NULL, NULL, 0, 0, 0, 0, 1, NULL, 50, 0);";
	$wpdb->query($sql);
}

if (!function_exists('save_error')) {

	function save_error() {
		update_option('plugin_error', ob_get_contents());
	}

}

//add_action('activated_plugin', 'save_error');