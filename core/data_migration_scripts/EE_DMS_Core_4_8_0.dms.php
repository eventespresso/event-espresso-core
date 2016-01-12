<?php
/**
 * meant to convert DBs from 4.6 (OR 4.7, which basically supports MER and wasn't clear if it was
 * going to be released before this version) to 4.8 (which basically supports promotions)
 * mostly just
 * -refactors line item trees, so that there are subtotals for EACH event purchased,
 * which is especially convenient for applying event-wide promotions
 * -does NOT actually make any database schema changes
 */
//make sure we have all the stages loaded too
//unfortunately, this needs to be done upon INCLUSION of this file,
//instead of construction, because it only gets constructed on first page load
//(all other times it gets resurrected from a wordpress option)
$stages = glob(EE_CORE.'data_migration_scripts/4_8_0_stages/*');
$class_to_filepath = array();
foreach($stages as $filepath){
	$matches = array();
	preg_match('~4_8_0_stages/(.*).dmsstage.php~',$filepath,$matches);
	$class_to_filepath[$matches[1]] = $filepath;
}
//give addons a chance to autoload their stages too
$class_to_filepath = apply_filters('FHEE__EE_DMS_4_8_0__autoloaded_stages',$class_to_filepath);
EEH_Autoloader::register_autoloader($class_to_filepath);





/**
 * Class EE_DMS_Core_4_8_0
 *
 * @package            Event Espresso
 * @subpackage    core
 * @author                Mike Nelson
 * @since                4.6.0
 *
 */
class EE_DMS_Core_4_8_0 extends EE_Data_Migration_Script_Base{

	/**
	 * return EE_DMS_Core_4_8_0
	 */
	public function __construct() {
		$this->_pretty_name = __("Data Migration to Event Espresso 4.8.0.P (for promotions)", "event_espresso");
		$this->_priority = 10;
		$this->_migration_stages = array(
			new EE_DMS_4_8_0_pretax_totals(),
			new EE_DMS_4_8_0_event_subtotals(),
		);
		parent::__construct();
	}



	/**
	 * Because this is being done at basically the same time as the MER-ready branch
	 * of core, it's possible people might have installed MEr-ready branch first,
	 * and then this one, in which case we still want to perform this migration,
	 * even though the version might not have increased
	 * @param array $version_array
	 * @return bool
	 */
	public function can_migrate_from_version($version_array) {
		$version_string = $version_array['Core'];
		if( $version_string <= '4.8.0' && $version_string >= '4.7.0' ){
//			echo "$version_string can be migrated from";
			return true;
		}elseif( ! $version_string ){
//			echo "no version string provided: $version_string";
			//no version string provided... this must be pre 4.3
			return false;//changed mind. dont want people thinking they should migrate yet because they cant
		}else{
//			echo "$version_string doesnt apply";
			return false;
		}
	}



	/**
	 * @return string|void
	 */
	public function pretty_name() {
		return __("Core Data Migration to version 4.8.0", "event_espresso");
	}



	/**
	 * @return bool
	 */
	public function schema_changes_before_migration() {
		$now_in_mysql = current_time( 'mysql', true );

		require_once( EE_HELPERS . 'EEH_Activation.helper.php' );
		$table_name='esp_answer';
		$sql=" ANS_ID INT UNSIGNED NOT NULL AUTO_INCREMENT,
					REG_ID INT UNSIGNED NOT NULL,
					QST_ID INT UNSIGNED NOT NULL,
					ANS_value TEXT NOT NULL,
					PRIMARY KEY  (ANS_ID),
					KEY REG_ID (REG_ID),
					KEY QST_ID (QST_ID)";
		$this->_table_is_changed_in_this_version($table_name,$sql, 'ENGINE=InnoDB');

		$table_name = 'esp_attendee_meta';
		$sql = "ATTM_ID INT(10) UNSIGNED NOT	NULL AUTO_INCREMENT,
						ATT_ID BIGINT(20) UNSIGNED NOT NULL,
						ATT_fname VARCHAR(45) NOT NULL,
						ATT_lname VARCHAR(45) NOT	NULL,
						ATT_address VARCHAR(255) DEFAULT	NULL,
						ATT_address2 VARCHAR(255) DEFAULT	NULL,
						ATT_city VARCHAR(45) DEFAULT	NULL,
						STA_ID INT(10) DEFAULT	NULL,
						CNT_ISO VARCHAR(45) DEFAULT	NULL,
						ATT_zip VARCHAR(12) DEFAULT	NULL,
						ATT_email VARCHAR(255) NOT NULL,
						ATT_phone VARCHAR(45) DEFAULT NULL,
							PRIMARY KEY  (ATTM_ID),
								KEY ATT_ID (ATT_ID),
								KEY ATT_email (ATT_email),
								KEY ATT_lname (ATT_lname),
								KEY ATT_fname (ATT_fname)";
		$this->_table_is_changed_in_this_version($table_name, $sql, 'ENGINE=InnoDB ');


		$table_name = 'esp_country';
		$sql = "CNT_ISO VARCHAR(2) COLLATE utf8_bin NOT NULL,
					  CNT_ISO3 VARCHAR(3) COLLATE utf8_bin NOT NULL,
					  RGN_ID TINYINT(3) UNSIGNED DEFAULT NULL,
					  CNT_name VARCHAR(45) COLLATE utf8_bin NOT NULL,
					  CNT_cur_code VARCHAR(6) COLLATE utf8_bin DEFAULT 'USD',
					  CNT_cur_single VARCHAR(45) COLLATE utf8_bin DEFAULT 'dollar',
					  CNT_cur_plural VARCHAR(45) COLLATE utf8_bin DEFAULT 'dollars',
					  CNT_cur_sign VARCHAR(45) COLLATE utf8_bin DEFAULT '$',
					  CNT_cur_sign_b4 TINYINT(1) DEFAULT '1',
					  CNT_cur_dec_plc TINYINT(3) UNSIGNED NOT NULL DEFAULT '2',
					  CNT_cur_dec_mrk VARCHAR(1) COLLATE utf8_bin NOT NULL DEFAULT '.',
					  CNT_cur_thsnds VARCHAR(1) COLLATE utf8_bin NOT NULL DEFAULT ',',
					  CNT_tel_code VARCHAR(12) COLLATE utf8_bin DEFAULT NULL,
					  CNT_is_EU TINYINT(1) DEFAULT '0',
					  CNT_active TINYINT(1) DEFAULT '0',
					  PRIMARY KEY  (CNT_ISO)";
		$this->_table_has_not_changed_since_previous($table_name, $sql, 'ENGINE=InnoDB' );

		$table_name = 'esp_currency';
		$sql = "CUR_code VARCHAR(6) COLLATE utf8_bin NOT NULL,
				CUR_single VARCHAR(45) COLLATE utf8_bin DEFAULT 'dollar',
				CUR_plural VARCHAR(45) COLLATE utf8_bin DEFAULT 'dollars',
				CUR_sign VARCHAR(45) COLLATE utf8_bin DEFAULT '$',
				CUR_dec_plc VARCHAR(1) COLLATE utf8_bin NOT NULL DEFAULT '2',
				CUR_active TINYINT(1) DEFAULT '0',
				PRIMARY KEY  (CUR_code)";
		$this->_table_has_not_changed_since_previous($table_name, $sql, 'ENGINE=InnoDB' );


		$table_name = 'esp_currency_payment_method';
		$sql = "CPM_ID INT(11) NOT NULL AUTO_INCREMENT,
				CUR_code  VARCHAR(6) COLLATE utf8_bin NOT NULL,
				PMD_ID INT(11) NOT NULL,
				PRIMARY KEY  (CPM_ID),
				KEY PMD_ID (PMD_ID)";
		$this->_table_is_changed_in_this_version($table_name, $sql, 'ENGINE=InnoDB ');


		$table_name = 'esp_datetime';
		$sql = "DTT_ID INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
				  EVT_ID BIGINT(20) UNSIGNED NOT NULL,
				  DTT_name VARCHAR(255) NOT NULL DEFAULT '',
				  DTT_description TEXT NOT NULL,
				  DTT_EVT_start DATETIME NOT NULL DEFAULT '0000-00-00 00:00:00',
				  DTT_EVT_end DATETIME NOT NULL DEFAULT '0000-00-00 00:00:00',
				  DTT_reg_limit MEDIUMINT(8) DEFAULT -1,
				  DTT_sold MEDIUMINT(8) UNSIGNED DEFAULT 0,
				  DTT_is_primary TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
				  DTT_order MEDIUMINT(3) UNSIGNED DEFAULT 0,
				  DTT_parent INT(10) UNSIGNED DEFAULT 0,
				  DTT_deleted TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
						PRIMARY KEY  (DTT_ID),
						KEY DTT_EVT_start (DTT_EVT_start),
						KEY EVT_ID (EVT_ID),
						KEY DTT_is_primary (DTT_is_primary)";

		$this->_table_is_changed_in_this_version($table_name, $sql, 'ENGINE=InnoDB' );

		$table_name = 'esp_event_meta';
		$sql = "
			EVTM_ID INT NOT NULL AUTO_INCREMENT,
			EVT_ID BIGINT(20) UNSIGNED NOT NULL,
			EVT_display_desc TINYINT(1) UNSIGNED NOT NULL DEFAULT 1,
			EVT_display_ticket_selector TINYINT(1) UNSIGNED NOT NULL DEFAULT 1,
			EVT_visible_on DATETIME NOT NULL DEFAULT '0000-00-00 00:00:00',
			EVT_default_registration_status VARCHAR(3),
			EVT_phone VARCHAR(45) DEFAULT NULL,
			EVT_additional_limit TINYINT UNSIGNED NULL,
			EVT_member_only TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
			EVT_allow_overflow TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
			EVT_timezone_string VARCHAR(45) NULL,
			EVT_external_URL VARCHAR(200) NULL,
			EVT_donations TINYINT(1) NULL,
			PRIMARY KEY  (EVTM_ID),
			KEY EVT_ID (EVT_ID)";
		$this->_table_is_changed_in_this_version($table_name,$sql, 'ENGINE=InnoDB');



		$table_name='esp_event_question_group';
		$sql="EQG_ID INT UNSIGNED NOT NULL AUTO_INCREMENT,
					EVT_ID BIGINT(20) UNSIGNED NOT NULL,
					QSG_ID INT UNSIGNED NOT NULL,
					EQG_primary TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
					PRIMARY KEY  (EQG_ID),
					KEY EVT_ID (EVT_ID),
					KEY QSG_ID (QSG_ID)";
		$this->_table_is_changed_in_this_version($table_name,$sql, 'ENGINE=InnoDB');



		$table_name='esp_event_venue';
		$sql="EVV_ID INT(11) NOT NULL AUTO_INCREMENT,
				EVT_ID BIGINT(20) UNSIGNED NOT NULL,
				VNU_ID BIGINT(20) UNSIGNED NOT NULL,
				EVV_primary TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
				PRIMARY KEY  (EVV_ID)";
		$this->_table_has_not_changed_since_previous($table_name,$sql, 'ENGINE=InnoDB');



		$table_name='esp_extra_meta';
		$sql="EXM_ID INT(11) NOT NULL AUTO_INCREMENT,
				OBJ_ID INT(11) DEFAULT NULL,
				EXM_type VARCHAR(45) DEFAULT NULL,
				EXM_key VARCHAR(45) DEFAULT NULL,
				EXM_value TEXT,
				PRIMARY KEY  (EXM_ID),
				KEY EXM_type (EXM_type,OBJ_ID,EXM_key)";
		$this->_table_is_changed_in_this_version($table_name,$sql, 'ENGINE=InnoDB');

		$table_name = 'esp_extra_join';
		$sql = "EXJ_ID INT(11) NOT NULL AUTO_INCREMENT,
				EXJ_first_model_id  VARCHAR(6) NOT NULL,
				EXJ_first_model_name VARCHAR(20) NOT NULL,
				EXJ_second_model_id  VARCHAR(6) NOT NULL,
				EXJ_second_model_name VARCHAR(20) NOT NULL,
				PRIMARY KEY  (EXJ_ID),
				KEY first_model (EXJ_first_model_name,EXJ_first_model_id),
				KEY second_model (EXJ_second_model_name,EXJ_second_model_id)";
		$this->_table_is_new_in_this_version($table_name, $sql, 'ENGINE=InnoDB ');

		$table_name='esp_line_item';
		$sql="LIN_ID INT(11) NOT NULL AUTO_INCREMENT,
				LIN_code VARCHAR(245) NOT NULL DEFAULT '',
				TXN_ID INT(11) DEFAULT NULL,
				LIN_name VARCHAR(245) NOT NULL DEFAULT '',
				LIN_desc TEXT DEFAULT NULL,
				LIN_unit_price DECIMAL(10,3) DEFAULT NULL,
				LIN_percent DECIMAL(10,3) DEFAULT NULL,
				LIN_is_taxable TINYINT(1) DEFAULT 0,
				LIN_order int DEFAULT 0,
				LIN_parent int DEFAULT 0,
				LIN_type VARCHAR(25) NOT NULL,
				LIN_total DECIMAL(10,3) DEFAULT NULL,
				LIN_quantity INT(10) DEFAULT NULL,
				OBJ_ID INT(11) DEFAULT NULL,
				OBJ_type VARCHAR(45) DEFAULT NULL,
				LIN_timestamp DATETIME NOT NULL DEFAULT '$now_in_mysql',
				PRIMARY KEY  (LIN_ID),
				KEY LIN_code (LIN_code(191)),
				KEY TXN_ID (TXN_ID)";
		$this->_table_is_changed_in_this_version($table_name,$sql, 'ENGINE=InnoDB' );

		$table_name = 'esp_log';
		$sql = "LOG_ID INT(11) NOT NULL AUTO_INCREMENT,
				LOG_time DATETIME DEFAULT NULL,
				OBJ_ID VARCHAR(45) DEFAULT NULL,
				OBJ_type VARCHAR(45) DEFAULT NULL,
				LOG_type VARCHAR(45) DEFAULT NULL,
				LOG_message TEXT,
				LOG_wp_user INT(11) DEFAULT NULL,
				PRIMARY KEY  (LOG_ID),
				KEY LOG_time (LOG_time),
				KEY OBJ (OBJ_type,OBJ_ID),
				KEY LOG_type (LOG_type)";
		$this->_table_is_changed_in_this_version($table_name, $sql, 'ENGINE=InnoDB');

		$table_name = 'esp_message_template';
		$sql = "MTP_ID INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
					GRP_ID INT(10) UNSIGNED NOT NULL,
					MTP_context VARCHAR(50) NOT NULL,
					MTP_template_field VARCHAR(30) NOT NULL,
					MTP_content TEXT NOT NULL,
					PRIMARY KEY  (MTP_ID),
					KEY GRP_ID (GRP_ID)";
		$this->_table_has_not_changed_since_previous($table_name, $sql, 'ENGINE=InnoDB');

		$table_name = 'esp_message_template_group';
		$sql = "GRP_ID INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
					MTP_user_id INT(10) NOT NULL DEFAULT '1',
					MTP_name VARCHAR(245) NOT NULL DEFAULT '',
					MTP_description VARCHAR(245) NOT NULL DEFAULT '',
					MTP_messenger VARCHAR(30) NOT NULL,
					MTP_message_type VARCHAR(50) NOT NULL,
					MTP_is_global TINYINT(1) NOT NULL DEFAULT '0',
					MTP_is_override TINYINT(1) NOT NULL DEFAULT '0',
					MTP_deleted TINYINT(1) NOT NULL DEFAULT '0',
					MTP_is_active TINYINT(1) NOT NULL DEFAULT '1',
					PRIMARY KEY  (GRP_ID),
					KEY MTP_user_id (MTP_user_id)";
		$this->_table_has_not_changed_since_previous( $table_name, $sql, 'ENGINE=InnoDB');

		$table_name = 'esp_event_message_template';
		$sql = "EMT_ID BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
					EVT_ID BIGINT(20) UNSIGNED NOT NULL DEFAULT 0,
					GRP_ID INT(10) UNSIGNED NOT NULL DEFAULT 0,
					PRIMARY KEY  (EMT_ID),
					KEY EVT_ID (EVT_ID),
					KEY GRP_ID (GRP_ID)";
		$this->_table_has_not_changed_since_previous( $table_name, $sql, 'ENGINE=InnoDB');


		$table_name = 'esp_payment';
		$sql = "PAY_ID INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
					TXN_ID INT(10) UNSIGNED DEFAULT NULL,
					STS_ID VARCHAR(3) COLLATE utf8_bin DEFAULT NULL,
					PAY_timestamp DATETIME NOT NULL DEFAULT '0000-00-00 00:00:00',
					PAY_source VARCHAR(45) COLLATE utf8_bin DEFAULT NULL,
					PAY_amount DECIMAL(10,3) DEFAULT NULL,
					PMD_ID INT(11) DEFAULT NULL,
					PAY_gateway_response TEXT COLLATE utf8_bin,
					PAY_txn_id_chq_nmbr VARCHAR(100) COLLATE utf8_bin DEFAULT NULL,
					PAY_po_number VARCHAR(100) COLLATE utf8_bin DEFAULT NULL,
					PAY_extra_accntng VARCHAR(100) COLLATE utf8_bin DEFAULT NULL,
					PAY_details TEXT COLLATE utf8_bin,
					PAY_redirect_url VARCHAR(300),
					PAY_redirect_args TEXT,
					PRIMARY KEY  (PAY_ID),
					KEY PAY_timestamp (PAY_timestamp),
					KEY TXN_ID (TXN_ID)";
		$this->_table_is_changed_in_this_version($table_name, $sql, 'ENGINE=InnoDB ');

		$table_name = 'esp_payment_method';
		$sql = "PMD_ID INT(11) NOT NULL AUTO_INCREMENT,
				PMD_type VARCHAR(124) DEFAULT NULL,
				PMD_name VARCHAR(255) DEFAULT NULL,
				PMD_desc TEXT,
				PMD_admin_name VARCHAR(255) DEFAULT NULL,
				PMD_admin_desc TEXT,
				PMD_slug VARCHAR(124) DEFAULT NULL,
				PMD_order INT(11) DEFAULT NULL,
				PMD_debug_mode TINYINT(1) NOT NULL DEFAULT '0',
				PMD_wp_user INT(11) NOT NULL DEFAULT '0',
				PMD_open_by_default TINYINT(1) NOT NULL DEFAULT '0',
				PMD_button_url VARCHAR(1012) DEFAULT NULL,
				PMD_scope VARCHAR(255) NULL DEFAULT 'frontend',
				PRIMARY KEY  (PMD_ID),
				UNIQUE KEY PMD_slug_UNIQUE (PMD_slug),
				KEY PMD_type (PMD_type)";
		$this->_table_is_changed_in_this_version($table_name, $sql, 'ENGINE=InnoDB ');


		$table_name = "esp_ticket_price";
		$sql = "TKP_ID INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
					  TKT_ID INT(10) UNSIGNED NOT NULL,
					  PRC_ID INT(10) UNSIGNED NOT NULL,
					  PRIMARY KEY  (TKP_ID),
					  KEY TKT_ID (TKT_ID),
					  KEY PRC_ID (PRC_ID)";
		$this->_table_is_changed_in_this_version($table_name, $sql, 'ENGINE=InnoDB');




		$table_name = "esp_datetime_ticket";
		$sql = "DTK_ID INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
					  DTT_ID INT(10) UNSIGNED NOT NULL,
					  TKT_ID INT(10) UNSIGNED NOT NULL,
					  PRIMARY KEY  (DTK_ID),
					  KEY DTT_ID (DTT_ID),
					  KEY TKT_ID (TKT_ID)";
		$this->_table_is_changed_in_this_version($table_name, $sql, 'ENGINE=InnoDB');


		$table_name = "esp_ticket_template";
		$sql = "TTM_ID INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
					  TTM_name VARCHAR(45) NOT NULL,
					  TTM_description TEXT,
					  TTM_file VARCHAR(45),
					  PRIMARY KEY  (TTM_ID)";
		$this->_table_has_not_changed_since_previous($table_name, $sql, 'ENGINE=InnoDB');

		$table_name='esp_question';
		$sql='QST_ID INT UNSIGNED NOT NULL AUTO_INCREMENT,
					QST_display_text TEXT NOT NULL,
					QST_admin_label VARCHAR(255) NOT NULL,
					QST_system VARCHAR(25) DEFAULT NULL,
					QST_type VARCHAR(25) NOT NULL DEFAULT "TEXT",
					QST_required TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
					QST_required_text VARCHAR(100) NULL,
					QST_order TINYINT UNSIGNED NOT NULL DEFAULT 0,
					QST_admin_only TINYINT(1) NOT NULL DEFAULT 0,
					QST_max SMALLINT NOT NULL DEFAULT -1,
					QST_wp_user BIGINT UNSIGNED NULL,
					QST_deleted TINYINT UNSIGNED NOT NULL DEFAULT 0,
					PRIMARY KEY  (QST_ID),
					KEY QST_order (QST_order)';
		$this->_table_is_changed_in_this_version($table_name,$sql, 'ENGINE=InnoDB');

		$table_name='esp_question_group_question';
		$sql="QGQ_ID INT UNSIGNED NOT NULL AUTO_INCREMENT,
					QSG_ID INT UNSIGNED NOT NULL,
					QST_ID INT UNSIGNED NOT NULL,
					QGQ_order INT UNSIGNED NOT NULL DEFAULT 0,
					PRIMARY KEY  (QGQ_ID),
					KEY QST_ID (QST_ID),
					KEY QSG_ID_order (QSG_ID,QGQ_order)";
		$this->_table_is_changed_in_this_version($table_name,$sql, 'ENGINE=InnoDB');



		$table_name='esp_question_option';
		$sql="QSO_ID INT UNSIGNED NOT NULL AUTO_INCREMENT,
					QSO_value VARCHAR(255) NOT NULL,
					QSO_desc TEXT NOT NULL,
					QST_ID INT UNSIGNED NOT NULL,
					QSO_order INT UNSIGNED NOT NULL DEFAULT 0,
					QSO_system VARCHAR(25) DEFAULT NULL,
					QSO_deleted TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
					PRIMARY KEY  (QSO_ID),
					KEY QST_ID (QST_ID),
					KEY QSO_order (QSO_order)";
		$this->_table_is_changed_in_this_version($table_name,$sql, 'ENGINE=InnoDB');



		$table_name = 'esp_registration';
		$sql = "REG_ID INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
					  EVT_ID BIGINT(20) UNSIGNED NOT NULL,
					  ATT_ID BIGINT(20) UNSIGNED NOT NULL,
					  TXN_ID INT(10) UNSIGNED NOT NULL,
					  TKT_ID INT(10) UNSIGNED NOT NULL,
					  STS_ID VARCHAR(3) COLLATE utf8_bin NOT NULL DEFAULT 'RPP',
					  REG_date DATETIME NOT NULL DEFAULT '0000-00-00 00:00:00',
					  REG_final_price DECIMAL(10,3) NOT NULL DEFAULT '0.00',
					  REG_paid DECIMAL(10,3) NOT NULL DEFAULT '0.00',
					  REG_session VARCHAR(45) COLLATE utf8_bin NOT NULL,
					  REG_code VARCHAR(45) COLLATE utf8_bin DEFAULT NULL,
					  REG_url_link VARCHAR(64) COLLATE utf8_bin DEFAULT NULL,
					  REG_count TINYINT UNSIGNED DEFAULT '1',
					  REG_group_size TINYINT UNSIGNED DEFAULT '1',
					  REG_att_is_going TINYINT(1) DEFAULT '0',
					  REG_deleted TINYINT(1) DEFAULT '0',
					  PRIMARY KEY  (REG_ID),
					  KEY REG_url_link (REG_url_link),
					  KEY REG_code (REG_code),
					  KEY TXN_ID (TXN_ID),
					  KEY ATT_ID (ATT_ID),
					  KEY TKT_ID (TKT_ID),
					  KEY EVT_ID (EVT_ID),
					  KEY STS_ID (STS_ID)";
		$this->_table_is_changed_in_this_version($table_name, $sql, 'ENGINE=InnoDB ');



		$table_name = 'esp_registration_payment';
		$sql = "RPY_ID INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
					  REG_ID INT(10) UNSIGNED NOT NULL,
					  PAY_ID INT(10) UNSIGNED NULL,
					  RPY_amount DECIMAL(10,3) NOT NULL DEFAULT '0.00',
					  PRIMARY KEY  (RPY_ID),
					  KEY REG_ID (REG_ID),
					  KEY PAY_ID (PAY_ID)";
		$this->_table_is_changed_in_this_version($table_name, $sql, 'ENGINE=InnoDB ');




		$table_name='esp_checkin';
		$sql="CHK_ID INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
					REG_ID INT(10) UNSIGNED NOT NULL,
					DTT_ID INT(10) UNSIGNED NOT NULL,
					CHK_in TINYINT(1) UNSIGNED NOT NULL DEFAULT 1,
					CHK_timestamp DATETIME NOT NULL DEFAULT '0000-00-00 00:00:00',
					PRIMARY KEY  (CHK_ID),
					KEY REG_ID (REG_ID),
					KEY DTT_ID (DTT_ID)";
		$this->_table_is_changed_in_this_version($table_name, $sql, 'ENGINE=InnoDB');



		$table_name = 'esp_state';
		$sql = "STA_ID smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT,
					  CNT_ISO VARCHAR(2) COLLATE utf8_bin NOT NULL,
					  STA_abbrev VARCHAR(24) COLLATE utf8_bin NOT NULL,
					  STA_name VARCHAR(100) COLLATE utf8_bin NOT NULL,
					  STA_active TINYINT(1) DEFAULT '1',
					  PRIMARY KEY  (STA_ID),
					  KEY STA_abbrev (STA_abbrev),
					  KEY CNT_ISO (CNT_ISO)";
		$this->_table_is_changed_in_this_version($table_name, $sql, 'ENGINE=InnoDB');



		$table_name = 'esp_status';
		$sql = "STS_ID VARCHAR(3) COLLATE utf8_bin NOT NULL,
					  STS_code VARCHAR(45) COLLATE utf8_bin NOT NULL,
					  STS_type set('event','registration','transaction','payment','email') COLLATE utf8_bin NOT NULL,
					  STS_can_edit TINYINT(1) NOT NULL DEFAULT 0,
					  STS_desc TINYTEXT COLLATE utf8_bin,
					  STS_open TINYINT(1) NOT NULL DEFAULT 1,
					  UNIQUE KEY STS_ID_UNIQUE (STS_ID),
					  KEY STS_type (STS_type)";
		$this->_table_has_not_changed_since_previous($table_name, $sql, 'ENGINE=InnoDB');



		$table_name = 'esp_transaction';
		$sql = "TXN_ID INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
					  TXN_timestamp DATETIME NOT NULL DEFAULT '0000-00-00 00:00:00',
					  TXN_total DECIMAL(10,3) DEFAULT '0.00',
					  TXN_paid DECIMAL(10,3) NOT NULL DEFAULT '0.00',
					  STS_ID VARCHAR(3) NOT NULL DEFAULT 'TOP',
					  TXN_session_data TEXT COLLATE utf8_bin,
					  TXN_hash_salt VARCHAR(250) COLLATE utf8_bin DEFAULT NULL,
					  PMD_ID INT(11) DEFAULT NULL,
					  TXN_reg_steps TEXT,
					  PRIMARY KEY  (TXN_ID),
					  KEY TXN_timestamp (TXN_timestamp),
					  KEY STS_ID (STS_ID)";
		$this->_table_has_not_changed_since_previous($table_name, $sql, 'ENGINE=InnoDB');






		$table_name = 'esp_venue_meta';
		$sql = "VNUM_ID INT(11) NOT NULL AUTO_INCREMENT,
			VNU_ID BIGINT(20) UNSIGNED NOT NULL DEFAULT 0,
			VNU_address VARCHAR(255) DEFAULT NULL,
			VNU_address2 VARCHAR(255) DEFAULT NULL,
			VNU_city VARCHAR(100) DEFAULT NULL,
			STA_ID INT(11) DEFAULT NULL,
			CNT_ISO VARCHAR(2) DEFAULT NULL,
			VNU_zip VARCHAR(45) DEFAULT NULL,
			VNU_phone VARCHAR(45) DEFAULT NULL,
			VNU_capacity INT(11) DEFAULT NULL,
			VNU_url VARCHAR(255) DEFAULT NULL,
			VNU_virtual_phone VARCHAR(45) DEFAULT NULL,
			VNU_virtual_url VARCHAR(255) DEFAULT NULL,
			VNU_enable_for_gmap TINYINT(1) DEFAULT '0',
			VNU_google_map_link VARCHAR(255) DEFAULT NULL,
			PRIMARY KEY  (VNUM_ID),
			KEY VNU_ID (VNU_ID),
			KEY STA_ID (STA_ID),
			KEY CNT_ISO (CNT_ISO)";
		$this->_table_is_changed_in_this_version($table_name, $sql, 'ENGINE=InnoDB');

		//modified tables
		$table_name = "esp_price";
		$sql = "PRC_ID INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
					  PRT_ID TINYINT(3) UNSIGNED NOT NULL,
					  PRC_amount DECIMAL(10,3) NOT NULL DEFAULT '0.00',
					  PRC_name VARCHAR(245) NOT NULL,
					  PRC_desc TEXT,
					  PRC_is_default TINYINT(1) UNSIGNED NOT NULL DEFAULT '1',
					  PRC_overrides INT(10) UNSIGNED DEFAULT NULL,
					  PRC_deleted TINYINT(1) UNSIGNED NOT NULL DEFAULT '0',
					  PRC_order TINYINT(3) UNSIGNED NOT NULL DEFAULT '0',
					  PRC_wp_user BIGINT UNSIGNED NULL,
					  PRC_parent INT(10) UNSIGNED DEFAULT 0,
					  PRIMARY KEY  (PRC_ID),
					  KEY PRT_ID (PRT_ID)";
		$this->_table_is_changed_in_this_version($table_name,$sql, 'ENGINE=InnoDB');

		$table_name = "esp_price_type";
		$sql = "PRT_ID TINYINT(3) UNSIGNED NOT NULL AUTO_INCREMENT,
				  PRT_name VARCHAR(45) NOT NULL,
				  PBT_ID TINYINT(3) UNSIGNED NOT NULL DEFAULT '1',
				  PRT_is_percent TINYINT(1) NOT NULL DEFAULT '0',
				  PRT_order TINYINT UNSIGNED NULL,
				  PRT_wp_user BIGINT UNSIGNED NULL,
				  PRT_deleted TINYINT(1) NOT NULL DEFAULT '0',
				  UNIQUE KEY PRT_name_UNIQUE (PRT_name),
				  PRIMARY KEY  (PRT_ID)";
		$this->_table_has_not_changed_since_previous($table_name, $sql, 'ENGINE=InnoDB ');


		$table_name = "esp_ticket";
		$sql = "TKT_ID INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
					  TTM_ID INT(10) UNSIGNED NOT NULL,
					  TKT_name VARCHAR(245) NOT NULL DEFAULT '',
					  TKT_description TEXT NOT NULL,
					  TKT_qty MEDIUMINT(8) DEFAULT NULL,
					  TKT_sold MEDIUMINT(8) NOT NULL DEFAULT 0,
					  TKT_uses TINYINT NOT NULL DEFAULT '-1',
					  TKT_required TINYINT UNSIGNED NOT NULL DEFAULT '0',
					  TKT_min TINYINT UNSIGNED NOT NULL DEFAULT '0',
					  TKT_max TINYINT NOT NULL DEFAULT '-1',
					  TKT_price DECIMAL(10,3) NOT NULL DEFAULT '0.00',
					  TKT_start_date DATETIME NOT NULL DEFAULT '0000-00-00 00:00:00',
					  TKT_end_date DATETIME NOT NULL DEFAULT '0000-00-00 00:00:00',
					  TKT_taxable TINYINT(1) UNSIGNED NOT NULL DEFAULT '0',
					  TKT_order TINYINT(3) UNSIGNED NOT NULL DEFAULT '0',
					  TKT_row TINYINT(3) UNSIGNED NOT NULL DEFAULT '0',
					  TKT_is_default TINYINT(1) UNSIGNED NOT NULL DEFAULT '0',
					  TKT_wp_user BIGINT UNSIGNED NULL,
					  TKT_parent INT(10) UNSIGNED DEFAULT '0',
					  TKT_deleted TINYINT(1) NOT NULL DEFAULT '0',
					  PRIMARY KEY  (TKT_ID),
					  KEY TKT_start_date (TKT_start_date)";
		$this->_table_is_changed_in_this_version($table_name, $sql, 'ENGINE=InnoDB' );

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
					QSG_wp_user BIGINT UNSIGNED NULL,
					PRIMARY KEY  (QSG_ID),
					UNIQUE KEY QSG_identifier_UNIQUE (QSG_identifier),
					KEY QSG_order (QSG_order)';
		$this->_table_is_changed_in_this_version($table_name, $sql, 'ENGINE=InnoDB' );

		/** @var EE_DMS_Core_4_1_0 $script_4_1_defaults */
		$script_4_1_defaults = EE_Registry::instance()->load_dms('Core_4_1_0');

		//(because many need to convert old string states to foreign keys into the states table)
		$script_4_1_defaults->insert_default_states();
		$script_4_1_defaults->insert_default_countries();

		/** @var EE_DMS_Core_4_5_0 $script_4_5_defaults */
		$script_4_5_defaults = EE_Registry::instance()->load_dms('Core_4_5_0');
		$script_4_5_defaults->insert_default_price_types();
		$script_4_5_defaults->insert_default_prices();
		$script_4_5_defaults->insert_default_tickets();

		/** @var EE_DMS_Core_4_6_0 $script_4_6_defaults */
		$script_4_6_defaults = EE_Registry::instance()->load_dms('Core_4_6_0');
		$script_4_6_defaults->add_default_admin_only_payments();
		$script_4_6_defaults->insert_default_currencies();

		$this->verify_new_countries();
		$this->verify_new_currencies();

		return true;
	}
	/**
	 * @return boolean
	 */
	public function schema_changes_after_migration() {
		$this->fix_non_default_taxes();
		//this is actually the same as the last DMS
		/** @var EE_DMS_Core_4_7_0 $script_4_7_defaults */
		$script_4_7_defaults = EE_Registry::instance()->load_dms('Core_4_7_0');
		return $script_4_7_defaults->schema_changes_after_migration();
	}

	public function migration_page_hooks(){

	}
	
	/**
	 * verifies each of the new countries exists that somehow we missed in 4.1
	 */
	public function verify_new_countries() {
		//a list of countries (and specifically some which were missed in another list):https://gist.github.com/adhipg/1600028
		//how many decimal places? https://en.wikipedia.org/wiki/ISO_4217
		//currency symbols: http://www.xe.com/symbols.php
		//CNT_ISO, CNT_ISO3, RGN_ID, CNT_name, CNT_cur_code, CNT_cur_single, CNT_cur_plural, CNT_cur_sign, CNT_cur_sign_b4, CNT_cur_dec_plc, CNT_tel_code, CNT_is_EU, CNT_active
		//('AD', 'AND', 0, 'Andorra', 'EUR', 'Euro', 'Euros', '€', 1, 2, '+376', 0, 0),
		$newer_countries = array(
			array( 'AX', 'ALA', 0, 'Alan Islands', 'EUR', 'Euro', 'Euros', '€', 1, 2, '+358', 1, 0 ),
			array( 'BL', 'BLM', 0, 'Saint Barthelemy', 'EUR', 'Euro', 'Euros', '€', 1, 2, '+590', 1, 0 ),
			array( 'CW', 'CUW', 0, 'Curacao', 'ANG', 'Guilder', 'Guilders', 'ƒ', 1, 2, '+599', 1, 0 ),
			array( 'GG', 'GGY', 0, 'Guernsey', 'EUR', 'Euro', 'Euros', '€', 1, 2, '+44', 0, 0 ),
			array( 'IM', 'IMN', 0, 'Isle of Man', 'GBP', 'Pound', 'Pounds', '£', 1, 2,  '+44', 0, 0  ),
			array( 'JE', 'JEY', 0, 'Jersey', 'GBP', 'Pound', 'Pounds', '£', 1, 2, '+44', 0, 0 ),
			array( 'MF', 'MAF', 0, 'Saint Martin', 'EUR', 'Euro', 'Euros', '€', 1, 2, '+590', 1, 0 ),
			array( 'MN', 'MNE', 0, 'Montenegro', 'EUR', 'Euro', 'Euros', '€', 1,  2, '+382', 0, 0 ),
			array( 'RS', 'SRB', 0, 'Serbia', 'RSD', 'Dinar', 'Dinars', '', 0, 2, '+941', 1, 0 ),
			array( 'SS', 'SSD', 0, 'South Sudan', 'SSP', 'Pound', 'Pounds', '£', 1, 2, '+211', 0, 0 ),
			array( 'SX', 'SXM', 0, 'Sint Maarten', 'ANG', 'Guilder', 'Guilders', 'ƒ', 1, 2, '+1', 1, 0 ),
			array( 'XK', 'XKX', 0, 'Kosovo', 'EUR', 'Euro', 'Euros', '€', 1, 2, '+381', 0, 0 ),
			array( 'YT', 'MYT', 0, 'Mayotte', 'EUR', 'Euro', 'Euros', '€', 0, 2, '+262', 1, 0 ),
		);
		global $wpdb;
		$country_table = $wpdb->prefix."esp_country";
		$country_format = array(
							"CNT_ISO" => '%s',
							"CNT_ISO3" => '%s',
							"RGN_ID" => '%d',
							"CNT_name" => '%s',
							"CNT_cur_code" => '%s',
							"CNT_cur_single" => '%s',
							"CNT_cur_plural" => '%s',
							"CNT_cur_sign" => '%s',
							"CNT_cur_sign_b4" => '%d',
							"CNT_cur_dec_plc" => '%d',
							"CNT_tel_code" => '%s',
							"CNT_is_EU" => '%d',
							"CNT_active" => '%d',
						);
		if ( $wpdb->get_var( "SHOW TABLES LIKE '" . $country_table . "'") == $country_table ) {
			foreach( $newer_countries as $country ) {
				$SQL = "SELECT COUNT('CNT_ISO') FROM {$country_table} WHERE CNT_ISO='{$country[0]}' LIMIT 1" ;
				$countries = $wpdb->get_var($SQL);
				if ( ! $countries ) {

					$wpdb->insert( $country_table,
							array_combine( array_keys( $country_format), $country ),
							$country_format
							);
				}
			}
		}
	}

	/**
	 * verifies each of the new currencies exists that somehow we missed in 4.6
	 */
	public function verify_new_currencies() {
		//a list of countries (and specifically some which were missed in another list):https://gist.github.com/adhipg/1600028
		//how many decimal places? https://en.wikipedia.org/wiki/ISO_4217
		//currency symbols: http://www.xe.com/symbols.php
		// CUR_code, CUR_single, CUR_plural, CUR_sign, CUR_dec_plc, CUR_active
		//( 'EUR',  'Euro',  'Euros',  '€',  2,1),
		$newer_currencies = array(
			array( 'RSD', 'Dinar', 'Dinars', '', 3, 1 ),
		);
		global $wpdb;
		$currency_table = $wpdb->prefix."esp_currency";
		$currency_format = array(
							"CUR_code" => '%s',
							"CUR_single" => '%s',
							"CUR_plural" => '%s',
							"CUR_sign" => '%s',
							"CUR_dec_plc" => '%d',
							"CUR_active" => '%d',
						);
		if ( $wpdb->get_var( "SHOW TABLES LIKE '" . $currency_table . "'") == $currency_table ) {
			foreach( $newer_currencies as $currency ) {
				$SQL = "SELECT COUNT('CUR_code') FROM {$currency_table} WHERE CUR_code='{$currency[0]}' LIMIT 1" ;
				$countries = $wpdb->get_var($SQL);
				if ( ! $countries ) {

					$wpdb->insert( $currency_table,
							array_combine( array_keys( $currency_format), $currency ),
							$currency_format
							);
				}
			}
		}
        }
	/**
	 * addresses https://events.codebasehq.com/projects/event-espresso/tickets/8731
	 * which should just be a temporary issue for folks who installed 4.8.0-4.8.5;
	 * we should be able to stop doing this in 4.9
	 */
	public function fix_non_default_taxes(){
		global $wpdb;
		$query = $wpdb->prepare( "UPDATE
				{$wpdb->prefix}esp_price p INNER JOIN
				{$wpdb->prefix}esp_price_type pt ON p.PRT_ID = pt.PRT_ID
			SET
				p.PRC_is_default = 1
			WHERE
				p.PRC_is_default = 0 AND
				pt.PBT_ID = %d
					", EEM_Price_Type::base_type_tax );
		$wpdb->query( $query );
	}
}










