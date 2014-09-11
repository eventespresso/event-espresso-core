<?php
/**
 * meant to convert DBs between 4.2.x to 4.3.0
 * mostly just
 * -adds QSO_order to the Question_Option table;
 */
//make sure we have all the stages loaded too
//unfortunately, this needs to be done upon INCLUSION of this file,
//instead of construction, because it only gets constructed on first page load
//(all other times it gets resurrected from a wordpress option)
$stages = glob(EE_CORE.'data_migration_scripts/4_3_0_stages/*');
$class_to_filepath = array();
foreach($stages as $filepath){
	$matches = array();
	preg_match('~4_3_0_stages/(.*).dmsstage.php~',$filepath,$matches);
	$class_to_filepath[$matches[1]] = $filepath;
}
//give addons a chance to autoload their stages too
$class_to_filepath = apply_filters('FHEE__EE_DMS_4_3_0__autoloaded_stages',$class_to_filepath);
EEH_Autoloader::register_autoloader($class_to_filepath);

class EE_DMS_Core_4_3_0 extends EE_Data_Migration_Script_Base{



	public function __construct() {
		$this->_pretty_name = __("Data Migration to Event Espresso 4.3.0.P", "event_espresso");
		$this->_priority = 10;
		$this->_migration_stages = array(
			new EE_DMS_4_3_0_question_option_order(),
			new EE_DMS_4_3_0_event_message_templates(),
			new EE_DMS_4_3_0_critical_page_shortcode_tracking()
		);
		parent::__construct();
	}
	public function can_migrate_from_version($version_array) {
		$version_string = $version_array['Core'];
		if($version_string <= '4.3.0' && $version_string >= '4.2.0' ){
//			echo "$version_string can be migrated fro";
			return true;
		}elseif( ! $version_string ){
//			echo "no version string provided: $version_string";
			//no version string provided... this must be pre 4.2
			return false;//changed mind. dont want people thinking they should migrate yet because they cant
		}else{
//			echo "$version_string doesnt apply";
			return false;
		}
	}
	public function pretty_name() {
		return __("Core Data Migration to version 4.3.0", "event_espresso");
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
		$this->_table_should_exist_previously($table_name,$sql, 'ENGINE=InnoDB');

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
							PRIMARY KEY  (ATTM_ID),
								KEY ATT_fname (ATT_fname),
								KEY ATT_lname (ATT_lname),
								KEY ATT_email (ATT_email)";
		$this->_table_should_exist_previously($table_name, $sql, 'ENGINE=InnoDB ');


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
		$this->_table_should_exist_previously($table_name, $sql, 'ENGINE=InnoDB' );



		$table_name = 'esp_datetime';
		$sql = "DTT_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
				  EVT_ID INT UNSIGNED NOT NULL ,
				  DTT_name VARCHAR(255) NOT NULL default '',
				  DTT_description TEXT NOT NULL default '',
				  DTT_EVT_start datetime NOT NULL default '0000-00-00 00:00:00',
				  DTT_EVT_end datetime NOT NULL default '0000-00-00 00:00:00',
				  DTT_reg_limit mediumint(8) DEFAULT -1,
				  DTT_sold mediumint(8) unsigned DEFAULT 0,
				  DTT_is_primary tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
				  DTT_order mediumint(3) unsigned DEFAULT 0,
				  DTT_parent int(10) unsigned DEFAULT 0,
				  DTT_deleted tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
						PRIMARY KEY  (DTT_ID),
						KEY EVT_ID (EVT_ID),
						KEY DTT_is_primary (DTT_is_primary)";



		$this->_table_should_exist_previously($table_name, $sql, 'ENGINE=InnoDB' );
		$table_name = 'esp_event_meta';
		$sql = "
			EVTM_ID INT NOT NULL AUTO_INCREMENT,
			EVT_ID int(11) unsigned NOT NULL,
			EVT_display_desc TINYINT(1) UNSIGNED NOT NULL DEFAULT 1 ,
			EVT_display_ticket_selector TINYINT(1) UNSIGNED NOT NULL DEFAULT 1 ,
			EVT_visible_on datetime NOT NULL default '0000-00-00 00:00:00',
			EVT_default_registration_status VARCHAR(3),
			EVT_phone varchar(45) DEFAULT NULL,
			EVT_additional_limit TINYINT UNSIGNED NULL ,
			EVT_member_only TINYINT(1) UNSIGNED NOT NULL DEFAULT 0 ,
			EVT_allow_overflow TINYINT(1) UNSIGNED NOT NULL DEFAULT 0 ,
			EVT_timezone_string VARCHAR(45) NULL ,
			EVT_external_URL VARCHAR(200) NULL ,
			EVT_donations TINYINT(1) NULL,
			PRIMARY KEY  (EVTM_ID)";
		$this->_table_should_exist_previously($table_name,$sql, 'ENGINE=InnoDB');



		$table_name='esp_event_question_group';
		$sql="EQG_ID INT UNSIGNED NOT NULL AUTO_INCREMENT ,
					EVT_ID INT UNSIGNED NOT NULL ,
					QSG_ID INT UNSIGNED NOT NULL ,
					EQG_primary TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
					PRIMARY KEY  (EQG_ID)";
		$this->_table_should_exist_previously($table_name,$sql, 'ENGINE=InnoDB');



		$table_name='esp_event_venue';
		$sql="EVV_ID INT(11) NOT NULL AUTO_INCREMENT ,
				EVT_ID INT(11) NOT NULL ,
				VNU_ID INT(11) NOT NULL ,
				EVV_primary TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
				PRIMARY KEY  (EVV_ID)";
		$this->_table_should_exist_previously($table_name,$sql, 'ENGINE=InnoDB');



		$table_name='esp_extra_meta';
		$sql="EXM_ID int(11) NOT NULL AUTO_INCREMENT,
				OBJ_ID int(11) DEFAULT NULL,
				EXM_type varchar(45) DEFAULT NULL,
				EXM_key varchar(45) DEFAULT NULL,
				EXM_value text,
				PRIMARY KEY  (EXM_ID)";
		$this->_table_should_exist_previously($table_name,$sql, 'ENGINE=InnoDB');

		$table_name='esp_line_item';
		$sql="LIN_ID int(11) NOT NULL AUTO_INCREMENT,
				LIN_code varchar(245) NOT NULL DEFAULT '',
				TXN_ID int(11) DEFAULT NULL,
				LIN_name varchar(245) NOT NULL DEFAULT '',
				LIN_desc varchar(245) DEFAULT NULL,
				LIN_unit_price decimal(10,3) DEFAULT NULL,
				LIN_percent decimal(10,3) DEFAULT NULL,
				LIN_is_taxable tinyint(1) DEFAULT 0,
				LIN_order int DEFAULT 0,
				LIN_parent int DEFAULT 0,
				LIN_type varchar(25) NOT NULL,
				LIN_total decimal(10,3) DEFAULT NULL,
				LIN_quantity int(10) DEFAULT NULL,
				OBJ_ID int(11) DEFAULT NULL,
				OBJ_type varchar(45)DEFAULT NULL,
				PRIMARY KEY  (LIN_ID)";
		$this->_table_should_exist_previously($table_name,$sql, 'ENGINE=InnoDB' );

		$table_name = 'esp_message_template';
		$sql = "MTP_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
					GRP_ID int(10) unsigned NOT NULL,
					MTP_context varchar(50) NOT NULL,
					MTP_template_field varchar(30) NOT NULL,
					MTP_content text NOT NULL,
					PRIMARY KEY  (MTP_ID),
					KEY GRP_ID (GRP_ID)";
		$this->_table_should_exist_previously($table_name, $sql, 'ENGINE=InnoDB');

		EEH_Activation::drop_index( 'esp_message_template_group', 'EVT_ID' );

		$table_name = 'esp_message_template_group';
		$sql = "GRP_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
					MTP_user_id int(10) NOT NULL DEFAULT '1',
					MTP_name varchar(245) NOT NULL DEFAULT '',
					MTP_description varchar(245) NOT NULL DEFAULT '',
					MTP_messenger varchar(30) NOT NULL,
					MTP_message_type varchar(50) NOT NULL,
					MTP_is_global tinyint(1) NOT NULL DEFAULT '0',
					MTP_is_override tinyint(1) NOT NULL DEFAULT '0',
					MTP_deleted tinyint(1) NOT NULL DEFAULT '0',
					MTP_is_active tinyint(1) NOT NULL DEFAULT '1',
					PRIMARY KEY  (GRP_ID),
					KEY MTP_user_id (MTP_user_id)";
		$this->_table_should_exist_previously( $table_name, $sql, 'ENGINE=InnoDB');

		$table_name = 'esp_event_message_template';
		$sql = "EMT_ID BIGINT(20) unsigned NOT NULL AUTO_INCREMENT,
					EVT_ID BIGINT(20) unsigned NOT NULL DEFAULT 0,
					GRP_ID INT(10) unsigned NOT NULL DEFAULT 0,
					PRIMARY KEY  (EMT_ID),
					KEY EVT_ID (EVT_ID),
					KEY GRP_ID (GRP_ID)";
		$this->_table_is_new_in_this_version( $table_name, $sql, 'ENGINE=InnoDB');



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
		$this->_table_should_exist_previously($table_name, $sql, 'ENGINE=InnoDB ');

		$table_name = "esp_ticket";
		$sql = "TKT_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
					  TTM_ID int(10) unsigned NOT NULL,
					  TKT_name varchar(100) NOT NULL DEFAULT '',
					  TKT_description TEXT NOT NULL DEFAULT '',
					  TKT_qty mediumint(8) DEFAULT NULL,
					  TKT_sold mediumint(8) NOT NULL DEFAULT 0,
					  TKT_uses tinyint NOT NULL DEFAULT '-1',
					  TKT_required tinyint unsigned NOT NULL DEFAULT '0',
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
		$this->_table_should_exist_previously($table_name, $sql, 'ENGINE=InnoDB');




		$table_name = "esp_ticket_price";
		$sql = "TKP_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
					  TKT_ID int(10) unsigned NOT NULL,
					  PRC_ID int(10) unsigned NOT NULL,
					  PRIMARY KEY  (TKP_ID)";
		$this->_table_should_exist_previously($table_name, $sql, 'ENGINE=InnoDB');




		$table_name = "esp_datetime_ticket";
		$sql = "DTK_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
					  DTT_ID int(10) unsigned NOT NULL,
					  TKT_ID int(10) unsigned NOT NULL,
					  PRIMARY KEY  (DTK_ID)";
		$this->_table_should_exist_previously($table_name, $sql, 'ENGINE=InnoDB');





		$table_name = "esp_ticket_template";
		$sql = "TTM_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
					  TTM_name varchar(45) NOT NULL,
					  TTM_description text,
					  TTM_file varchar(45),
					  PRIMARY KEY  (TTM_ID)";
		$this->_table_should_exist_previously($table_name, $sql, 'ENGINE=InnoDB');



		$table_name = "esp_price";
		$sql = "PRC_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
					  PRT_ID tinyint(3) unsigned NOT NULL,
					  PRC_amount decimal(10,3) NOT NULL DEFAULT '0.00',
					  PRC_name varchar(45) NOT NULL,
					  PRC_desc text,
					  PRC_is_default tinyint(1) unsigned NOT NULL DEFAULT '1',
					  PRC_overrides int(10) unsigned DEFAULT NULL,
					  PRC_deleted tinyint(1) unsigned NOT NULL DEFAULT '0',
					  PRC_order tinyint(3) unsigned NOT NULL DEFAULT '0',
					  PRC_parent int(10) unsigned DEFAULT 0,
					  PRIMARY KEY  (PRC_ID)";
		$this->_table_should_exist_previously($table_name, $sql, 'ENGINE=InnoDB');



		$table_name = "esp_price_type";
		$sql = "PRT_ID tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
				  PRT_name VARCHAR(45) NOT NULL ,
				  PBT_ID tinyint(3) unsigned NOT NULL DEFAULT '1',
				  PRT_is_percent tinyint(1) NOT NULL DEFAULT '0',
				  PRT_order tinyint UNSIGNED NULL,
				  PRT_deleted tinyint(1) NOT NULL DEFAULT '0',
				  UNIQUE KEY PRT_name_UNIQUE (PRT_name),
				  PRIMARY KEY  (PRT_ID)";
		$this->_table_should_exist_previously($table_name, $sql, 'ENGINE=InnoDB');



		$table_name='esp_question';
		$sql='QST_ID INT UNSIGNED NOT NULL AUTO_INCREMENT,
					QST_display_text TEXT NOT NULL,
					QST_admin_label VARCHAR(255) NOT NULL,
					QST_system varchar(25) DEFAULT NULL,
					QST_type VARCHAR(25) NOT NULL DEFAULT "TEXT",
					QST_required TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
					QST_required_text VARCHAR(100) NULL,
					QST_order TINYINT UNSIGNED NOT NULL DEFAULT 0,
					QST_admin_only TINYINT(1) NOT NULL DEFAULT 0,
					QST_wp_user BIGINT UNSIGNED NULL,
					QST_deleted TINYINT UNSIGNED NOT NULL DEFAULT 0,
					PRIMARY KEY  (QST_ID)';
		$this->_table_should_exist_previously($table_name,$sql, 'ENGINE=InnoDB');

		EEH_Activation::drop_index( 'esp_question_group', 'QSG_identifier_UNIQUE' );

		$table_name = 'esp_question_group';
		$sql='QSG_ID INT UNSIGNED NOT NULL AUTO_INCREMENT,
					QSG_name VARCHAR(255) NOT NULL,
					QSG_identifier VARCHAR(100) NOT NULL,
					QSG_desc TEXT NULL,
					QSG_order TINYINT UNSIGNED NOT NULL DEFAULT 0,
					QSG_show_group_name TINYINT(1) NOT NULL,
					QSG_show_group_desc TINYINT(1) NOT NULL,
					QSG_system TINYINT NULL,
					QSG_deleted TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
					PRIMARY KEY  (QSG_ID),
					UNIQUE KEY QSG_identifier_UNIQUE (QSG_identifier ASC)';
		$this->_table_should_exist_previously($table_name,$sql, 'ENGINE=InnoDB');



		$table_name='esp_question_group_question';
		$sql="QGQ_ID INT UNSIGNED NOT NULL AUTO_INCREMENT ,
					QSG_ID INT UNSIGNED NOT NULL ,
					QST_ID INT UNSIGNED NOT NULL ,
					QGQ_order INT UNSIGNED NOT NULL DEFAULT 0 ,
					PRIMARY KEY  (QGQ_ID) ";
		$this->_table_should_exist_previously($table_name,$sql, 'ENGINE=InnoDB');



		$table_name='esp_question_option';
		$sql="QSO_ID INT UNSIGNED NOT NULL AUTO_INCREMENT ,
					QSO_value VARCHAR(255) NOT NULL ,
					QSO_desc TEXT NOT NULL ,
					QST_ID INT UNSIGNED NOT NULL ,
					QSO_order INT UNSIGNED NOT NULL DEFAULT 0,
					QSO_deleted TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
					PRIMARY KEY  (QSO_ID)";
		$this->_table_should_exist_previously($table_name,$sql, 'ENGINE=InnoDB');



		$table_name = 'esp_registration';
		$sql = "REG_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
					  EVT_ID int(10) unsigned NOT NULL,
					  ATT_ID int(10) unsigned NOT NULL,
					  TXN_ID int(10) unsigned NOT NULL,
					  TKT_ID int(10) unsigned NOT NULL,
					  STS_ID varchar(3) COLLATE utf8_bin NOT NULL DEFAULT 'RPP',
					  REG_date datetime NOT NULL default '0000-00-00 00:00:00',
					  REG_final_price decimal(10,3) NOT NULL DEFAULT '0.00',
					  REG_session varchar(45) COLLATE utf8_bin NOT NULL,
					  REG_code varchar(45) COLLATE utf8_bin DEFAULT NULL,
					  REG_url_link varchar(64) COLLATE utf8_bin DEFAULT NULL,
					  REG_count tinyint(4) DEFAULT '1',
					  REG_group_size tinyint(4) DEFAULT '1',
					  REG_att_is_going tinyint(1) DEFAULT '0',
					  REG_deleted tinyint(1) DEFAULT '0',
					  PRIMARY KEY  (REG_ID),
					  KEY EVT_ID (EVT_ID),
					  KEY ATT_ID (ATT_ID),
					  KEY TXN_ID (TXN_ID),
					  KEY TKT_ID (TKT_ID),
					  KEY STS_ID (STS_ID),
					  KEY REG_url_link (REG_url_link),
					  KEY REG_code (REG_code)";
		$this->_table_should_exist_previously($table_name, $sql, 'ENGINE=InnoDB ');




		$table_name='esp_checkin';
		$sql="CHK_ID INT(10) UNSIGNED NOT NULL AUTO_INCREMENT ,
					REG_ID INT(10) unsigned NOT NULL ,
					DTT_ID INT(10) unsigned NOT NULL ,
					CHK_in TINYINT(1) UNSIGNED NOT NULL DEFAULT 1 ,
					CHK_timestamp datetime NOT NULL default '0000-00-00 00:00:00' ,
					PRIMARY KEY  (CHK_ID)";
		$this->_table_should_exist_previously($table_name, $sql, 'ENGINE=InnoDB');



		$table_name = 'esp_state';
		$sql = "STA_ID smallint(5) unsigned NOT NULL AUTO_INCREMENT,
					  CNT_ISO varchar(2) COLLATE utf8_bin NOT NULL,
					  STA_abbrev varchar(6) COLLATE utf8_bin NOT NULL,
					  STA_name varchar(100) COLLATE utf8_bin NOT NULL,
					  STA_active tinyint(1) DEFAULT '1',
					  PRIMARY KEY  (STA_ID)";
		$this->_table_should_exist_previously($table_name, $sql, 'ENGINE=InnoDB');



		$table_name = 'esp_status';
		$sql = "STS_ID varchar(3) COLLATE utf8_bin NOT NULL,
					  STS_code varchar(45) COLLATE utf8_bin NOT NULL,
					  STS_type set('event','registration','transaction','payment','email') COLLATE utf8_bin NOT NULL,
					  STS_can_edit tinyint(1) NOT NULL DEFAULT 0,
					  STS_desc tinytext COLLATE utf8_bin,
					  STS_open tinyint(1) NOT NULL DEFAULT 1,
					  UNIQUE KEY STS_ID_UNIQUE (STS_ID),
					  KEY STS_type (STS_type)";
		$this->_table_should_exist_previously($table_name, $sql, 'ENGINE=InnoDB');



		$table_name = 'esp_transaction';
		$sql = "TXN_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
					  TXN_timestamp datetime NOT NULL default '0000-00-00 00:00:00',
					  TXN_total decimal(10,3) DEFAULT '0.00',
					  TXN_paid decimal(10,3) NOT NULL DEFAULT '0.00',
					  STS_ID varchar(3) NOT NULL DEFAULT 'TOP',
					  TXN_session_data text COLLATE utf8_bin,
					  TXN_hash_salt varchar(250) COLLATE utf8_bin DEFAULT NULL,
					  PRIMARY KEY  (TXN_ID),
					  KEY TXN_timestamp (TXN_timestamp),
					  KEY STS_ID (STS_ID)";
		$this->_table_should_exist_previously($table_name, $sql, 'ENGINE=InnoDB');






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
		$this->_table_should_exist_previously($table_name, $sql, 'ENGINE=InnoDB');


		$script_with_defaults = EE_Registry::instance()->load_dms( 'Core_4_1_0' );
		//setting up the default stats and countries is also essential for the data migrations to run
		//(because many need to convert old string states to foreign keys into the states table)
		$script_with_defaults->insert_default_states();
		$script_with_defaults->insert_default_countries();
		//setting up default prices, price types, and tickets is also essential for the price migrations
		$script_with_defaults->insert_default_price_types();
		$script_with_defaults->insert_default_prices();
		//but the schema on the tickets table has changed since 4.1, so use our default ticket method instead of 4.1's
		$this->insert_default_tickets();

		//setting up the config wp option pretty well counts as a 'schema change', or at least should happen ehre
		EE_Config::instance()->update_espresso_config(false, true);
		return true;
	}
	/**
	 * @return boolean
	 */
	public function schema_changes_after_migration() {
		return true;
	}

	public function migration_page_hooks(){

	}

	/**
	 * insert default ticket
	 * Almost identical to EE_DMS_Core_4_1_0::insert_default_tickets, except is aware of the TKT_required field
	 *
	 * @access public
	 * @static
	 * @return void
	 */
	public function insert_default_tickets() {

		global $wpdb;
		$ticket_table = $wpdb->prefix."esp_ticket";
		if ( $wpdb->get_var("SHOW TABLES LIKE'$ticket_table'") == $ticket_table ) {

			$SQL = 'SELECT COUNT(TKT_ID) FROM ' . $ticket_table;
			$tickets_exist = $wpdb->get_var($SQL);

			if ( ! $tickets_exist ) {
				$SQL = "INSERT INTO $ticket_table
					( TKT_ID, TTM_ID, TKT_name, TKT_description, TKT_qty, TKT_sold, TKT_uses, TKT_required, TKT_min, TKT_max, TKT_price, TKT_start_date, TKT_end_date, TKT_taxable, TKT_order, TKT_row, TKT_is_default, TKT_parent, TKT_deleted ) VALUES
					( 1, 0, '" . __("Free Ticket", "event_espresso") . "', '', 100, 0, -1, 0, 0, -1, 0.00, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0, 0, 1, 1, 0, 0);";
				$SQL = apply_filters( 'FHEE__EE_DMS_4_1_0__insert_default_tickets__SQL', $SQL );
				$wpdb->query($SQL);
			}
		}
		$ticket_price_table = $wpdb->prefix."esp_ticket_price";

		if ( $wpdb->get_var("SHOW TABLES LIKE'$ticket_price_table'") == $ticket_price_table ) {

			$SQL = 'SELECT COUNT(TKP_ID) FROM ' . $ticket_price_table;
			$ticket_prc_exist = $wpdb->get_var($SQL);

			if ( ! $ticket_prc_exist ) {

				$SQL = "INSERT INTO $ticket_price_table
				( TKP_ID, TKT_ID, PRC_ID ) VALUES
				( 1, 1, 1 )
				";

				$SQL = apply_filters( 'FHEE__EE_DMS_4_1_0__insert_default_tickets__SQL__ticket_price', $SQL );
				$wpdb->query($SQL);
			}
		}
	}

}










