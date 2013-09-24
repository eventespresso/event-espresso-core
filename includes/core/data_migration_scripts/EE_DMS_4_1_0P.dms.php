<?php
/**
 * meant to convert DBs between 3.1.26 and 4.0.0 to 4.1.0
 */
class EE_DMS_4_1_0P extends EE_Data_Migration_Script_Base{
	public function can_migrate_from_version($version_string) {
		if($version_string < '4.0.0' && $version_string > '3.1.26' ){
//			echo "$version_string can be mgirated fro";
			return true;
		}elseif( ! $version_string ){
//			echo "no version string provided: $version_string";
			//no version string provided... this must be pre 4.1
			//because since 4.1 we're 
			return false;//changed mind. dont want people thinking they should migrate yet because they cant
		}else{
//			echo "$version_string doesnt apply";
			return false;
		}
	}
	public function pretty_name() {
		return __("Core Data Migration to version 4.1.0", "event_espresso");
	}
	public function schema_changes_before_migration() {
		//relies on 4.1's EEH_Activation::create_table
		require_once( EE_HELPERS . 'EEH_Activation.helper.php' );
		
		$table_name='esp_answer';
		$sql=" ANS_ID INT UNSIGNED NOT NULL AUTO_INCREMENT ,
					REG_ID INT UNSIGNED NOT NULL ,
					QST_ID INT UNSIGNED NOT NULL ,
					ANS_value TEXT NOT NULL ,
					PRIMARY KEY  (ANS_ID)";
		EEH_Activation::create_table($table_name,$sql, 'ENGINE=InnoDB');
		
		$table_name = 'esp_attendee_meta';
		$sql = "ATTM_ID int(10) unsigned NOT	NULL AUTO_INCREMENT,
						ATT_ID int(10) unsigned NOT NULL,
						ATT_fname varchar(45) NOT NULL,
						ATT_lname varchar(45) NOT	NULL,
						ATT_address varchar(45) DEFAULT	NULL,
						ATT_address2 varchar(45) DEFAULT	NULL,
						ATT_city varchar(45) DEFAULT	NULL,
						STA_ID int(10) DEFAULT	NULL,
						CNT_ISO varchar(45) DEFAULT	NULL,
						ATT_zip varchar(12) DEFAULT	NULL,
						ATT_email varchar(100) NOT NULL,
						ATT_phone varchar(45) DEFAULT NULL,
						ATT_social text,
						ATT_comments mediumtext,
						ATT_notes mediumtext,
							PRIMARY KEY  (ATTM_ID),
								KEY ATT_fname (ATT_fname),
								KEY ATT_lname (ATT_lname),
								KEY ATT_email (ATT_email)";
		EEH_Activation::create_table($table_name, $sql, 'ENGINE=InnoDB ');



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
					  CNT_cur_dec_plc tinyint(3) unsigned NOT NULL DEFAULT '2',
					  CNT_cur_dec_mrk varchar(1) COLLATE utf8_bin NOT NULL DEFAULT '.',
					  CNT_cur_thsnds varchar(1) COLLATE utf8_bin NOT NULL DEFAULT ',',
					  CNT_tel_code varchar(12) COLLATE utf8_bin DEFAULT NULL,
					  CNT_is_EU tinyint(1) DEFAULT '0',
					  CNT_active tinyint(1) DEFAULT '0',
					  PRIMARY KEY  (CNT_ISO)";
		EEH_Activation::create_table($table_name, $sql, 'ENGINE=InnoDB' );



		$table_name = 'esp_datetime';
		$sql = "DTT_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
				  EVT_ID INT UNSIGNED NOT NULL ,
				  DTT_EVT_start datetime NOT NULL default '0000-00-00 00:00:00',
				  DTT_EVT_end datetime NOT NULL default '0000-00-00 00:00:00',
				  DTT_reg_limit mediumint(8) unsigned DEFAULT NULL,
				  DTT_sold mediumint(8) unsigned DEFAULT 0,
				  DTT_is_primary tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
				  DTT_order mediumint(3) unsigned DEFAULT 0,
				  DTT_parent int(10) unsigned DEFAULT 0,
				  DTT_deleted tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
						PRIMARY KEY  (DTT_ID),
						KEY EVT_ID (EVT_ID),
						KEY DTT_is_primary (DTT_is_primary)";
		
		
		
		EEH_Activation::create_table($table_name, $sql, 'ENGINE=InnoDB' );
		$table_name = 'esp_event_meta';
		$sql = "
			EVTM_ID INT NOT NULL AUTO_INCREMENT,
			EVT_ID int(11) unsigned NOT NULL,
			EVT_display_desc TINYINT(1) UNSIGNED NOT NULL DEFAULT 1 ,
			EVT_display_reg_form TINYINT(1) UNSIGNED NOT NULL DEFAULT 1 ,
			EVT_visible_on datetime NOT NULL default '0000-00-00 00:00:00',
			EVT_allow_multiple TINYINT(1) UNSIGNED NOT NULL DEFAULT 0 ,
			EVT_additional_attendee_reg_info TINYINT(2) UNSIGNED NOT NULL DEFAULT 0,
			EVT_default_registration_status VARCHAR(3),
			EVT_phone varchar(45) DEFAULT NULL,
			EVT_additional_limit TINYINT UNSIGNED NULL ,
			EVT_require_pre_approval TINYINT(1) UNSIGNED NOT NULL DEFAULT 0 ,
			EVT_member_only TINYINT(1) UNSIGNED NOT NULL DEFAULT 0 ,
			EVT_allow_overflow TINYINT(1) UNSIGNED NOT NULL DEFAULT 0 ,
			EVT_timezone_string VARCHAR(45) NULL ,
			EVT_external_URL VARCHAR(200) NULL ,
			EVT_donations TINYINT(1) NULL,
			PRIMARY KEY  (EVTM_ID)";
		EEH_Activation::create_table($table_name,$sql, 'ENGINE=InnoDB');


		
		$table_name='esp_event_question_group';
		$sql="EQG_ID INT UNSIGNED NOT NULL AUTO_INCREMENT ,
					EVT_ID INT UNSIGNED NOT NULL ,
					QSG_ID INT UNSIGNED NOT NULL ,
					EQG_primary TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
					PRIMARY KEY  (EQG_ID)";
		EEH_Activation::create_table($table_name,$sql, 'ENGINE=InnoDB');



		$table_name='esp_event_venue';
		$sql="EVV_ID INT(11) NOT NULL AUTO_INCREMENT ,
				EVT_ID INT(11) NOT NULL ,
				VNU_ID INT(11) NOT NULL ,
				EVV_primary TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
				PRIMARY KEY  (EVV_ID)";
		EEH_Activation::create_table($table_name,$sql, 'ENGINE=InnoDB');



		$table_name = 'esp_message_template';
		$sql = "MTP_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
					GRP_ID int(10) unsigned NOT NULL,
					MTP_context varchar(50) NOT NULL,
					MTP_template_field varchar(30) NOT NULL,
					MTP_content text NOT NULL,
					PRIMARY KEY  (MTP_ID),
					KEY GRP_ID (GRP_ID)";
		EEH_Activation::create_table($table_name, $sql, 'ENGINE=InnoDB');



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
		EEH_Activation::create_table( $table_name, $sql, 'ENGINE=InnoDB');



		$table_name = 'esp_payment';
		$sql = "PAY_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
					TXN_ID int(10) unsigned DEFAULT NULL,
					STS_ID varchar(3) COLLATE utf8_bin DEFAULT NULL,
					PAY_timestamp datetime NOT NULL default '0000-00-00 00:00:00',
					PAY_method varchar(45) COLLATE utf8_bin DEFAULT NULL,
					PAY_amount decimal(10,3) DEFAULT NULL,
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
		EEH_Activation::create_table($table_name, $sql, 'ENGINE=InnoDB ');

		$table_name = 'esp_promotion';
		$sql = "PRO_ID INT UNSIGNED NOT NULL AUTO_INCREMENT ,
					PRC_ID INT UNSIGNED NOT NULL ,
					PRO_scope VARCHAR(16) NOT NULL DEFAULT 'event' ,
					PRO_start DATETIME NULL DEFAULT NULL ,
					PRO_end DATETIME NULL DEFAULT NULL ,
					PRO_code VARCHAR(45) NULL DEFAULT NULL ,
					PRO_uses SMALLINT UNSIGNED NULL DEFAULT NULL ,
					PRO_global TINYINT(1) NOT NULL DEFAULT 0 ,
					PRO_global_uses SMALLINT UNSIGNED NOT NULL DEFAULT 0 ,
					PRO_exclusive TINYINT(1) NOT NULL DEFAULT 0 ,
					PRO_accept_msg TINYTEXT NULL DEFAULT NULL ,
					PRO_decline_msg TINYTEXT NULL DEFAULT NULL ,
					PRO_default TINYINT(1) NOT NULL DEFAULT 0 ,
					PRO_order TINYINT UNSIGNED NOT NULL DEFAULT 40 ,
					PRIMARY KEY  (PRO_ID) ,
					KEY PRC_ID (PRC_ID)";
		EEH_Activation::create_table($table_name, $sql, 'ENGINE=InnoDB ');
		
		$table_name = 'esp_promotion_object';
		$sql = "POB_ID INT UNSIGNED NOT NULL AUTO_INCREMENT,
			PRO_ID INT UNSIGNED NOT NULL,
			OBJ_ID INT UNSIGNED NOT NULL,
			POB_type VARCHAR(45) NULL,
			POB_used INT NULL,
			PRIMARY KEY  (POB_ID),
			KEY OBJ_ID (OBJ_ID),
			KEY PRO_ID (PRO_ID)";
		EEH_Activation::create_table($table_name, $sql, 'ENGINE=InnoDB ');
		
		$table_name = 'esp_promotion_rule';
		$sql = "PRR_ID INT UNSIGNED NOT NULL AUTO_INCREMENT ,
					PRO_ID INT UNSIGNED NOT NULL ,
					RUL_ID INT UNSIGNED NOT NULL ,
					PRR_order TINYINT UNSIGNED NOT NULL DEFAULT 1,
					PRR_add_rule_comparison ENUM('AND','OR') NULL DEFAULT 'AND',
					PRIMARY KEY  (PRR_ID) ,
					KEY PRO_ID (PRO_ID),
					KEY RUL_ID (RUL_ID) ";
		EEH_Activation::create_table($table_name, $sql, 'ENGINE=InnoDB ');
		
		
		
		$table_name = 'esp_rule';
		$sql = "RUL_ID INT UNSIGNED NOT NULL AUTO_INCREMENT ,
					RUL_name VARCHAR(45) NOT NULL ,
					RUL_desc TEXT NULL ,
					RUL_trigger VARCHAR(45) NOT NULL ,
					RUL_trigger_type VARCHAR(45) NULL DEFAULT NULL ,
					RUL_comparison ENUM('=','!=','<','>') NOT NULL DEFAULT '=' ,
					RUL_value VARCHAR(45) NOT NULL ,
					RUL_value_type VARCHAR(45) NULL DEFAULT NULL ,
					RUL_is_active TINYINT(1) NOT NULL DEFAULT 1 ,
					RUL_archived TINYINT(1) NOT NULL DEFAULT 0 ,
					PRIMARY KEY  (RUL_ID)";
		EEH_Activation::create_table($table_name, $sql, 'ENGINE=InnoDB ');
		


		$table_name = "esp_ticket";  
		$sql = "TKT_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
					  TTM_ID int(10) unsigned NOT NULL,
					  TKT_name varchar(100) NOT NULL DEFAULT '',
					  TKT_description TEXT NOT NULL DEFAULT '',
					  TKT_qty mediumint(8) DEFAULT NULL,
					  TKT_sold mediumint(8) NOT NULL DEFAULT 0,
					  TKT_uses tinyint NOT NULL DEFAULT '-1',
					  TKT_min tinyint unsigned NOT NULL DEFAULT '0',
					  TKT_max tinyint NOT NULL DEFAULT '-1',
					  TKT_price decimal(10,3) NOT NULL DEFAULT '0.00',
					  TKT_start_date datetime NOT NULL default '0000-00-00 00:00:00',
					  TKT_end_date datetime NOT NULL default '0000-00-00 00:00:00',
					  TKT_taxable tinyint(1) unsigned NOT NULL DEFAULT '0',
					  TKT_order tinyint(3) unsigned NOT NULL DEFAULT '0',
					  TKT_row tinyint(3) unsigned NOT NULL DEFAULT '0',
					  TKT_is_default tinyint(1) unsigned NOT NULL DEFAULT '0',
					  TKT_parent int(10) unsigned DEFAULT '0',
					  TKT_deleted tinyint(1) NOT NULL DEFAULT '0',
					  PRIMARY KEY  (TKT_ID)";
		EEH_Activation::create_table($table_name, $sql, 'ENGINE=InnoDB');




		$table_name = "esp_ticket_price";  
		$sql = "TKP_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
					  TKT_ID int(10) unsigned NOT NULL,
					  PRC_ID int(10) unsigned NOT NULL,
					  PRIMARY KEY  (TKP_ID)";
		EEH_Activation::create_table($table_name, $sql, 'ENGINE=InnoDB');




		$table_name = "esp_datetime_ticket";  
		$sql = "DTK_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
					  DTT_ID int(10) unsigned NOT NULL,
					  TKT_ID int(10) unsigned NOT NULL,
					  PRIMARY KEY  (DTK_ID)";
		EEH_Activation::create_table($table_name, $sql, 'ENGINE=InnoDB');





		$table_name = "esp_ticket_template";  
		$sql = "TTM_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
					  TTM_name varchar(45) NOT NULL,
					  TTM_description text,
					  TTM_file varchar(45),
					  PRIMARY KEY  (TTM_ID)";
		EEH_Activation::create_table($table_name, $sql, 'ENGINE=InnoDB');



		$table_name = "esp_price";  
		$sql = "PRC_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
					  PRT_ID tinyint(3) unsigned NOT NULL,
					  PRC_amount decimal(10,3) NOT NULL DEFAULT '0.00',
					  PRC_name varchar(45) NOT NULL,
					  PRC_desc text,
					  PRC_is_active tinyint(1) unsigned NOT NULL DEFAULT '1',
					  PRC_is_default tinyint(1) unsigned NOT NULL DEFAULT '1',
					  PRC_overrides int(10) unsigned DEFAULT NULL,
					  PRC_deleted tinyint(1) unsigned NOT NULL DEFAULT '0',
					  PRC_order tinyint(3) unsigned NOT NULL DEFAULT '0',
					  PRC_row tinyint(3) unsigned NOT NULL DEFAULT '0',
					  PRC_parent int(10) unsigned DEFAULT 0,
					  PRIMARY KEY  (PRC_ID)";
		EEH_Activation::create_table($table_name, $sql, 'ENGINE=InnoDB');



		$table_name = "esp_price_type";
		$sql = "PRT_ID tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
				  PRT_name VARCHAR(45) NOT NULL ,
				  PBT_ID tinyint(3) unsigned NOT NULL DEFAULT '1',
				  PRT_is_member tinyint(1) NOT NULL DEFAULT '0',
				  PRT_is_percent tinyint(1) NOT NULL DEFAULT '0',
				  PRT_order tinyint(1) UNSIGNED NULL,
				  PRT_deleted tinyint(1) NOT NULL DEFAULT '0',
				  UNIQUE KEY PRT_name_UNIQUE (PRT_name),
				  PRIMARY KEY  (PRT_ID)";
		EEH_Activation::create_table($table_name, $sql, 'ENGINE=InnoDB');


		
		$table_name='esp_question';
		$sql='QST_ID INT UNSIGNED NOT NULL AUTO_INCREMENT,
					QST_display_text VARCHAR(100) NOT NULL,
					QST_admin_label VARCHAR(100) NOT NULL,
					QST_system varchar(25) DEFAULT NULL,
					QST_type VARCHAR(25) NOT NULL DEFAULT "TEXT",
					QST_required TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
					QST_required_text VARCHAR(100) NULL,
					QST_order TINYINT UNSIGNED NOT NULL DEFAULT 0,
					QST_admin_only TINYINT(1) NOT NULL DEFAULT 0,
					QST_wp_user BIGINT UNSIGNED NULL,
					QST_deleted TINYINT UNSIGNED NOT NULL DEFAULT 0,
					PRIMARY KEY  (QST_ID)';
		EEH_Activation::create_table($table_name,$sql, 'ENGINE=InnoDB');
		
		EEH_Activation::drop_index( 'esp_question_group', 'QSG_identifier_UNIQUE' );
		
		$table_name = 'esp_question_group';
		$sql='QSG_ID INT UNSIGNED NOT NULL AUTO_INCREMENT,
					QSG_name VARCHAR(100) NOT NULL,
					QSG_identifier VARCHAR(100) NOT NULL,
					QSG_desc TEXT NULL,
					QSG_order TINYINT UNSIGNED NOT NULL DEFAULT 0,
					QSG_show_group_name TINYINT(1) NOT NULL,
					QSG_show_group_desc TINYINT(1) NOT NULL,
					QSG_system TINYINT NULL,
					QSG_deleted TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
					PRIMARY KEY  (QSG_ID),
					UNIQUE KEY QSG_identifier_UNIQUE (QSG_identifier ASC)';
		EEH_Activation::create_table($table_name,$sql, 'ENGINE=InnoDB');
		
		
		
		$table_name='esp_question_group_question';
		$sql="QGQ_ID INT UNSIGNED NOT NULL AUTO_INCREMENT ,
					QSG_ID INT UNSIGNED NOT NULL ,
					QST_ID INT UNSIGNED NOT NULL ,
					PRIMARY KEY  (QGQ_ID) ";
		EEH_Activation::create_table($table_name,$sql, 'ENGINE=InnoDB');


		
		$table_name='esp_question_option';
		$sql="QSO_ID INT UNSIGNED NOT NULL AUTO_INCREMENT ,
					QSO_name VARCHAR(100) NOT NULL ,
					QSO_value VARCHAR(100) NOT NULL ,
					QST_ID INT UNSIGNED NOT NULL ,
					QSO_deleted TINYINT(1) UNSIGNED NOT NULL DEFAULT 0 ,
					PRIMARY KEY  (QSO_ID)";
		EEH_Activation::create_table($table_name,$sql, 'ENGINE=InnoDB');



		$table_name = 'esp_registration';
		$sql = "REG_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
					  EVT_ID int(10) unsigned NOT NULL,
					  ATT_ID int(10) unsigned NOT NULL,
					  TXN_ID int(10) unsigned NOT NULL,
					  TKT_ID int(10) unsigned NOT NULL,
					  STS_ID varchar(3) COLLATE utf8_bin NOT NULL DEFAULT 'RPN',
					  REG_date datetime NOT NULL default '0000-00-00 00:00:00',
					  REG_final_price decimal(10,3) NOT NULL DEFAULT '0.00',
					  REG_session varchar(45) COLLATE utf8_bin NOT NULL,
					  REG_code varchar(45) COLLATE utf8_bin DEFAULT NULL,
					  REG_url_link varchar(64) COLLATE utf8_bin DEFAULT NULL,
					  REG_count tinyint(4) DEFAULT '1',
					  REG_group_size tinyint(4) DEFAULT '1',
					  REG_att_is_going tinyint(1) DEFAULT '0',
					  PRIMARY KEY  (REG_ID),
					  KEY EVT_ID (EVT_ID),
					  KEY ATT_ID (ATT_ID),
					  KEY TXN_ID (TXN_ID),
					  KEY TKT_ID (TKT_ID),
					  KEY STS_ID (STS_ID),
					  KEY REG_url_link (REG_url_link),
					  KEY REG_code (REG_code)";
		EEH_Activation::create_table($table_name, $sql, 'ENGINE=InnoDB ');




		$table_name='esp_checkin';
		$sql="CHK_ID INT(10) UNSIGNED NOT NULL AUTO_INCREMENT ,
					REG_ID INT(10) unsigned NOT NULL ,
					DTT_ID INT(10) unsigned NOT NULL ,
					CHK_in TINYINT(1) UNSIGNED NOT NULL DEFAULT 1 ,
					CHK_timestamp datetime NOT NULL default '0000-00-00 00:00:00' ,
					PRIMARY KEY  (CHK_ID)";
		EEH_Activation::create_table($table_name, $sql, 'ENGINE=InnoDB');



		$table_name = 'esp_state';
		$sql = "STA_ID smallint(5) unsigned NOT NULL AUTO_INCREMENT,
					  CNT_ISO varchar(2) COLLATE utf8_bin NOT NULL,
					  STA_abbrev varchar(6) COLLATE utf8_bin NOT NULL,
					  STA_name varchar(100) COLLATE utf8_bin NOT NULL,
					  STA_active tinyint(1) DEFAULT '1',
					  PRIMARY KEY  (STA_ID)";
		EEH_Activation::create_table($table_name, $sql, 'ENGINE=InnoDB' );



		$table_name = 'esp_status';
		$sql = "STS_ID varchar(3) COLLATE utf8_bin NOT NULL,
					  STS_code varchar(45) COLLATE utf8_bin NOT NULL,
					  STS_type set('event','registration','transaction','payment','email') COLLATE utf8_bin NOT NULL,
					  STS_can_edit tinyint(1) NOT NULL DEFAULT 0,
					  STS_desc tinytext COLLATE utf8_bin,
					  STS_open tinyint(1) NOT NULL DEFAULT 1,
					  UNIQUE KEY STS_ID_UNIQUE (STS_ID),
					  KEY STS_type (STS_type)";
		EEH_Activation::create_table($table_name, $sql, 'ENGINE=InnoDB' );



		$table_name = 'esp_transaction';
		$sql = "TXN_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
					  TXN_timestamp datetime NOT NULL default '0000-00-00 00:00:00',
					  TXN_total decimal(10,3) DEFAULT '0.00',
					  TXN_paid decimal(10,3) NOT NULL DEFAULT '0.00',
					  STS_ID varchar(3) NOT NULL DEFAULT 'TOP',
					  TXN_details text COLLATE utf8_bin,
					  TXN_tax_data text COLLATE utf8_bin,
					  TXN_session_data text COLLATE utf8_bin,
					  TXN_hash_salt varchar(250) COLLATE utf8_bin DEFAULT NULL,
					  PRIMARY KEY  (TXN_ID),
					  KEY TXN_timestamp (TXN_timestamp),
					  KEY STS_ID (STS_ID)";
		EEH_Activation::create_table($table_name, $sql, 'ENGINE=InnoDB');


		
		
		$table_name = 'esp_status';
		$sql = "STS_ID varchar(3) COLLATE utf8_bin NOT NULL,
					  STS_code varchar(45) COLLATE utf8_bin NOT NULL,
					  STS_type set('event','registration','transaction','payment','email') COLLATE utf8_bin NOT NULL,
					  STS_can_edit tinyint(1) NOT NULL DEFAULT 0,
					  STS_desc tinytext COLLATE utf8_bin,
					  STS_open tinyint(1) NOT NULL DEFAULT 1,
					  UNIQUE KEY STS_ID_UNIQUE (STS_ID),
					  KEY STS_type (STS_type)";
		EEH_Activation::create_table($table_name, $sql, 'ENGINE=InnoDB' );



		$table_name = 'esp_venue_meta';
		$sql = "VNUM_ID int(11) NOT NULL AUTO_INCREMENT,
			VNU_ID int(11) DEFAULT NULL,
			VNU_address varchar(100) DEFAULT NULL,
			VNU_address2 varchar(100) DEFAULT NULL,
			VNU_city varchar(100) DEFAULT NULL,
			STA_ID int(11) DEFAULT NULL,
			CNT_ISO varchar(2) DEFAULT NULL,
			VNU_zip varchar(45) DEFAULT NULL,
			VNU_phone varchar(45) DEFAULT NULL,
			VNU_capacity int(11) DEFAULT NULL,
			VNU_url varchar(255) DEFAULT NULL,
			VNU_virtual_phone varchar(45) DEFAULT NULL,
			VNU_virtual_url varchar(255) DEFAULT NULL,
			VNU_enable_for_gmap tinyint(1) DEFAULT '0',
			VNU_google_map_link varchar(255) DEFAULT NULL,
			PRIMARY KEY  (VNUM_ID),
			KEY STA_ID (STA_ID),
			KEY CNT_ISO (CNT_ISO)";
		EEH_Activation::create_table($table_name, $sql, 'ENGINE=InnoDB');		

		return true;
	}
	public function schema_changes_after_migration() {
		return true;
	}
	
	
	
	
	public function __construct() {
		$this->_migration_stages = array(
			10=>new EE_DMS_4_1_0P_attendees(),
			20=>new EE_DMS_4_1_0P_events(),
		);
		parent::__construct();
	}
}

class EE_DMS_4_1_0P_attendees extends EE_Data_Migration_Script_Stage{
	function _count_records_to_migrate() {
		global $wpdb;
		$count = $wpdb->get_var("SELECT COUNT(*) FROM ".$wpdb->prefix."events_attendee");
		return intval($count);
	}
	protected function _migration_step($num_items_to_migrate = 50) {
		global $wpdb;
		$attendees = $wpdb->get_results($wpdb->prepare("SELECT * FROM ".$wpdb->prefix."events_attendee LIMIT %d,%d",$this->count_records_migrated(),$num_items_to_migrate));
		if($attendees){
			foreach($attendees as $attendee_row){
				//insert new 4.1 Attendee object using $wpdb
				
			}
			$this->set_status(EE_Data_Migration_Manager::status_continue);
		}else{
			$this->set_status(EE_Data_Migration_Manager::status_completed);
		}
		return count($attendees);
		
	}
	function pretty_name(){
		return "Attendee Stage";
	}
}

class EE_DMS_4_1_0P_events extends EE_Data_Migration_Script_Stage{
	function _count_records_to_migrate() {
		global $wpdb;
		$count = $wpdb->get_var("SELECT COUNT(*) FROM ".$wpdb->prefix."events_detail");
		return intval($count);
	}
	protected function _migration_step($num_items_to_migrate = 50) {
		global $wpdb;
		$events = $wpdb->get_results($wpdb->prepare("SELECT * FROM ".$wpdb->prefix."events_detail LIMIT %d,%d",$this->count_records_migrated(),$num_items_to_migrate));
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
	function pretty_name() {
		return "events stage";
	}
}




function espresso_update_active_gateways() {
	//upgrade script for those updating from versions prior to 3.1.16.P
	//hooked to plugin activation
	//
	// Have to get a list of users already using the 4.0 system

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

	// Payment settings prior to 4.0 have been independent wp_options in the db
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
	// 1. If they are upgrading from 4.0 or later, just update the paths stored in the active gateways
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
