<?php
use EventEspresso\core\services\database\TableAnalysis;
use EventEspresso\core\services\database\TableManager;

/**
 * converts DBs to 4.7
 * Adds the esp_registration_payment table (indicating which registrations payments are for),
 * adds fields esp_registration.REG_paid field,
 * and recalculates esp_registration.REG_final_price to actually be the final price
 * for that registration (before this it was just the ticket's price, NOT including
 * taxes or other price modifiers)

 */
// make sure we have all the stages loaded too
// unfortunately, this needs to be done upon INCLUSION of this file,
// instead of construction, because it only gets constructed on first page load
// (all other times it gets resurrected from a wordpress option)
$stages = glob(EE_CORE . 'data_migration_scripts/4_7_0_stages/*');
$class_to_filepath = array();
foreach ($stages as $filepath) {
    $matches = array();
    preg_match('~4_7_0_stages/(.*).dmsstage.php~', $filepath, $matches);
    $class_to_filepath[$matches[1]] = $filepath;
}
//give addons a chance to autoload their stages too
$class_to_filepath = apply_filters('FHEE__EE_DMS_4_7_0__autoloaded_stages', $class_to_filepath);
EEH_Autoloader::register_autoloader($class_to_filepath);



/**
 * Class EE_DMS_Core_4_7_0
 *
 * @package               Event Espresso
 * @subpackage            core
 * @author                Mike Nelson, Brent Christensen
 * @since                 4.7.0
 */
class EE_DMS_Core_4_7_0 extends EE_Data_Migration_Script_Base
{

    /**
     * return EE_DMS_Core_4_7_0
     *
     * @param TableManager  $table_manager
     * @param TableAnalysis $table_analysis
     */
    public function __construct(TableManager $table_manager = null, TableAnalysis $table_analysis = null)
    {
        $this->_pretty_name = __("Data Update to Event Espresso 4.7.0", "event_espresso");
        $this->_priority = 10;
        $this->_migration_stages = array(
            new EE_DMS_4_7_0_Add_Taxes_To_REG_Final_Price(),
            new EE_DMS_4_7_0_Registration_Payments(),
        );
        parent::__construct($table_manager, $table_analysis);
    }



    /**
     * @param array $version_array
     * @return bool
     */
    public function can_migrate_from_version($version_array)
    {
        $version_string = $version_array['Core'];
        if (
            (
                version_compare($version_string, '4.7.0', '<=')
                && version_compare($version_string, '4.6.0', '>=')
            )
            || (
                version_compare($version_string, '4.7.0', '>=')
                && ! $this->_get_table_analysis()->tableExists('esp_registration_payment')
                && $this->_get_table_analysis()->tableExists('esp_registration')
            )
        ) {
            return true;
        } elseif ( ! $version_string) {
            //no version string provided... this must be pre 4.3
            return false;//changed mind. dont want people thinking they should migrate yet because they cant
        } else {
            return false;
        }
    }



    /**
     * @return bool
     */
    public function schema_changes_before_migration()
    {
        //relies on 4.1's EEH_Activation::create_table
        require_once(EE_HELPERS . 'EEH_Activation.helper.php');
        $table_name = 'esp_answer';
        $sql = " ANS_ID INT UNSIGNED NOT NULL AUTO_INCREMENT,
					REG_ID INT UNSIGNED NOT NULL,
					QST_ID INT UNSIGNED NOT NULL,
					ANS_value TEXT NOT NULL,
					PRIMARY KEY  (ANS_ID),
					KEY REG_ID (REG_ID),
					KEY QST_ID (QST_ID)";
        $this->_table_is_changed_in_this_version($table_name, $sql, 'ENGINE=InnoDB');
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
        $this->_table_has_not_changed_since_previous($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_currency';
        $sql = "CUR_code VARCHAR(6) COLLATE utf8_bin NOT NULL,
				CUR_single VARCHAR(45) COLLATE utf8_bin DEFAULT 'dollar',
				CUR_plural VARCHAR(45) COLLATE utf8_bin DEFAULT 'dollars',
				CUR_sign VARCHAR(45) COLLATE utf8_bin DEFAULT '$',
				CUR_dec_plc VARCHAR(1) COLLATE utf8_bin NOT NULL DEFAULT '2',
				CUR_active TINYINT(1) DEFAULT '0',
				PRIMARY KEY  (CUR_code)";
        $this->_table_has_not_changed_since_previous($table_name, $sql, 'ENGINE=InnoDB');
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
        $this->_table_is_changed_in_this_version($table_name, $sql, 'ENGINE=InnoDB');
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
        $this->_table_is_changed_in_this_version($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_event_question_group';
        $sql = "EQG_ID INT UNSIGNED NOT NULL AUTO_INCREMENT,
					EVT_ID BIGINT(20) UNSIGNED NOT NULL,
					QSG_ID INT UNSIGNED NOT NULL,
					EQG_primary TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
					PRIMARY KEY  (EQG_ID),
					KEY EVT_ID (EVT_ID),
					KEY QSG_ID (QSG_ID)";
        $this->_table_is_changed_in_this_version($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_event_venue';
        $sql = "EVV_ID INT(11) NOT NULL AUTO_INCREMENT,
				EVT_ID BIGINT(20) UNSIGNED NOT NULL,
				VNU_ID BIGINT(20) UNSIGNED NOT NULL,
				EVV_primary TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
				PRIMARY KEY  (EVV_ID)";
        $this->_table_has_not_changed_since_previous($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_extra_meta';
        $sql = "EXM_ID INT(11) NOT NULL AUTO_INCREMENT,
				OBJ_ID INT(11) DEFAULT NULL,
				EXM_type VARCHAR(45) DEFAULT NULL,
				EXM_key VARCHAR(45) DEFAULT NULL,
				EXM_value TEXT,
				PRIMARY KEY  (EXM_ID),
				KEY EXM_type (EXM_type, OBJ_ID, EXM_key(45))";
        $this->_table_is_changed_in_this_version($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_line_item';
        $sql = "LIN_ID INT(11) NOT NULL AUTO_INCREMENT,
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
				PRIMARY KEY  (LIN_ID),
				KEY LIN_code (LIN_code(191)),
				KEY TXN_ID (TXN_ID)";
        $this->_table_is_changed_in_this_version($table_name, $sql, 'ENGINE=InnoDB');
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
        $this->_table_has_not_changed_since_previous($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_event_message_template';
        $sql = "EMT_ID BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
					EVT_ID BIGINT(20) UNSIGNED NOT NULL DEFAULT 0,
					GRP_ID INT(10) UNSIGNED NOT NULL DEFAULT 0,
					PRIMARY KEY  (EMT_ID),
					KEY EVT_ID (EVT_ID),
					KEY GRP_ID (GRP_ID)";
        $this->_table_has_not_changed_since_previous($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_payment';
        $sql = "PAY_ID INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
					TXN_ID INT(10) UNSIGNED DEFAULT NULL,
					STS_ID VARCHAR(3) COLLATE utf8_bin DEFAULT NULL,
					PAY_timestamp DATETIME NOT NULL DEFAULT '0000-00-00 00:00:00',
					PAY_source VARCHAR(45) COLLATE utf8_bin DEFAULT NULL,
					PAY_amount DECIMAL(10,3) DEFAULT NULL,
					PMD_ID INT(11) DEFAULT NULL,
					PAY_gateway_response TEXT COLLATE utf8_bin,
					PAY_txn_id_chq_nmbr VARCHAR(32) COLLATE utf8_bin DEFAULT NULL,
					PAY_po_number VARCHAR(32) COLLATE utf8_bin DEFAULT NULL,
					PAY_extra_accntng VARCHAR(45) COLLATE utf8_bin DEFAULT NULL,
					PAY_details TEXT COLLATE utf8_bin,
					PAY_redirect_url VARCHAR(300),
					PAY_redirect_args TEXT,
					PRIMARY KEY  (PAY_ID),
					KEY PAY_timestamp (PAY_timestamp),
					KEY TXN_ID (TXN_ID)";
        $this->_table_has_not_changed_since_previous($table_name, $sql, 'ENGINE=InnoDB ');
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
        $table_name = 'esp_question';
        $sql = 'QST_ID INT UNSIGNED NOT NULL AUTO_INCREMENT,
					QST_display_text TEXT NOT NULL,
					QST_admin_label VARCHAR(255) NOT NULL,
					QST_system VARCHAR(25) DEFAULT NULL,
					QST_type VARCHAR(25) NOT NULL DEFAULT "TEXT",
					QST_required TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
					QST_required_text VARCHAR(100) NULL,
					QST_order TINYINT UNSIGNED NOT NULL DEFAULT 0,
					QST_admin_only TINYINT(1) NOT NULL DEFAULT 0,
					QST_wp_user BIGINT UNSIGNED NULL,
					QST_deleted TINYINT UNSIGNED NOT NULL DEFAULT 0,
					PRIMARY KEY  (QST_ID),
					KEY QST_order (QST_order)';
        $this->_table_is_changed_in_this_version($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_question_group_question';
        $sql = "QGQ_ID INT UNSIGNED NOT NULL AUTO_INCREMENT,
					QSG_ID INT UNSIGNED NOT NULL,
					QST_ID INT UNSIGNED NOT NULL,
					QGQ_order INT UNSIGNED NOT NULL DEFAULT 0,
					PRIMARY KEY  (QGQ_ID),
					KEY QST_ID (QST_ID),
					KEY QSG_ID_order (QSG_ID, QGQ_order)";
        $this->_table_is_changed_in_this_version($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_question_option';
        $sql = "QSO_ID INT UNSIGNED NOT NULL AUTO_INCREMENT,
					QSO_value VARCHAR(255) NOT NULL,
					QSO_desc TEXT NOT NULL,
					QST_ID INT UNSIGNED NOT NULL,
					QSO_order INT UNSIGNED NOT NULL DEFAULT 0,
					QSO_deleted TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
					PRIMARY KEY  (QSO_ID),
					KEY QST_ID (QST_ID),
					KEY QSO_order (QSO_order)";
        $this->_table_is_changed_in_this_version($table_name, $sql, 'ENGINE=InnoDB');
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
        $this->_table_is_new_in_this_version($table_name, $sql, 'ENGINE=InnoDB ');
        $table_name = 'esp_checkin';
        $sql = "CHK_ID INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
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
        $this->_table_is_changed_in_this_version($table_name, $sql, 'ENGINE=InnoDB');
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
        $this->_table_is_changed_in_this_version($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_question_group';
        $sql = 'QSG_ID INT UNSIGNED NOT NULL AUTO_INCREMENT,
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
        $this->_table_is_changed_in_this_version($table_name, $sql, 'ENGINE=InnoDB');
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
        return true;
    }



    /**
     * @return boolean
     */
    public function schema_changes_after_migration()
    {
        return true;
    }



    public function migration_page_hooks()
    {
    }
}
// end of file: /core/data_migration_scripts/EE_DMS_Core_4_7_0.dms.php