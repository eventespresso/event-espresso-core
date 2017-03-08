<?php
use EventEspresso\core\services\database\TableAnalysis;
use EventEspresso\core\services\database\TableManager;

/**
 * Meant to add the new ee_message table to the database.
 */
//make sure we have all the stages loaded too
//unfortunately, this needs to be done upon INCLUSION of this file,
//instead of construction, because it only gets constructed on first page load
//(all other times it gets resurrected from a wordpress option)
$stages = glob(EE_CORE . 'data_migration_scripts/4_9_0_stages/*');
$class_to_filepath = array();
foreach ($stages as $filepath) {
    $matches = array();
    preg_match('~4_9_0_stages/(.*).dmsstage.php~', $filepath, $matches);
    $class_to_filepath[$matches[1]] = $filepath;
}
//give addons a chance to autoload their stages too
$class_to_filepath = apply_filters('FHEE__EE_DMS_4_9_0__autoloaded_stages', $class_to_filepath);
EEH_Autoloader::register_autoloader($class_to_filepath);



/**
 * Class EE_DMS_Core_4_9_0
 *
 * @package               Event Espresso
 * @subpackage            core
 * @author                Mike Nelson
 * @since                 4.6.0
 */
class EE_DMS_Core_4_9_0 extends EE_Data_Migration_Script_Base
{

    /**
     * return EE_DMS_Core_4_9_0
     *
     * @param TableManager  $table_manager
     * @param TableAnalysis $table_analysis
     */
    public function __construct(TableManager $table_manager = null, TableAnalysis $table_analysis = null)
    {
        $this->_pretty_name = esc_html__("Data Update to Event Espresso 4.9.0", "event_espresso");
        $this->_priority = 10;
        $this->_migration_stages = array(
            new EE_DMS_4_9_0_Email_System_Question(),
            new EE_DMS_4_9_0_Answers_With_No_Registration(),
        );
        parent::__construct($table_manager, $table_analysis);
    }



    /**
     * Whether to migrate or not.
     *
     * @param array $version_array
     * @return bool
     */
    public function can_migrate_from_version($version_array)
    {
        $version_string = $version_array['Core'];
        if (version_compare($version_string, '4.9.0', '<=') && version_compare($version_string, '4.8.0', '>=')) {
            //			echo "$version_string can be migrated from";
            return true;
        } elseif ( ! $version_string) {
            //			echo "no version string provided: $version_string";
            //no version string provided... this must be pre 4.3
            return false;//changed mind. dont want people thinking they should migrate yet because they cant
        } else {
            //			echo "$version_string doesnt apply";
            return false;
        }
    }



    /**
     * @return bool
     */
    public function schema_changes_before_migration()
    {
        require_once(EE_HELPERS . 'EEH_Activation.helper.php');
        $now_in_mysql = current_time('mysql', true);
        $table_name = 'esp_answer';
        $sql = " ANS_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
					REG_ID int(10) unsigned NOT NULL,
					QST_ID int(10) unsigned NOT NULL,
					ANS_value text NOT NULL,
					PRIMARY KEY  (ANS_ID),
					KEY REG_ID (REG_ID),
					KEY QST_ID (QST_ID)";
        $this->_table_has_not_changed_since_previous($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_attendee_meta';
        $this->_get_table_manager()->dropIndexIfSizeNot($table_name, 'ATT_email');
        $sql = "ATTM_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
				ATT_ID bigint(20) unsigned NOT NULL,
				ATT_fname varchar(45) NOT NULL,
				ATT_lname varchar(45) NOT NULL,
				ATT_address varchar(255) DEFAULT NULL,
				ATT_address2 varchar(255) DEFAULT NULL,
				ATT_city varchar(45) DEFAULT NULL,
				STA_ID int(10) DEFAULT NULL,
				CNT_ISO varchar(45) DEFAULT	NULL,
				ATT_zip varchar(12) DEFAULT	NULL,
				ATT_email varchar(255) NOT NULL,
				ATT_phone varchar(45) DEFAULT NULL,
				PRIMARY KEY  (ATTM_ID),
				KEY ATT_ID (ATT_ID),
				KEY ATT_email (ATT_email(191)),
				KEY ATT_lname (ATT_lname),
				KEY ATT_fname (ATT_fname)";
        $this->_table_is_changed_in_this_version($table_name, $sql, 'ENGINE=InnoDB ');
        $table_name = 'esp_checkin';
        $sql = "CHK_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
				REG_ID int(10) unsigned NOT NULL,
				DTT_ID int(10) unsigned NOT NULL,
				CHK_in tinyint(1) unsigned NOT NULL DEFAULT 1,
				CHK_timestamp datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
				PRIMARY KEY  (CHK_ID),
				KEY REG_ID (REG_ID),
				KEY DTT_ID (DTT_ID)";
        $this->_table_has_not_changed_since_previous($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_country';
        $sql = "CNT_ISO varchar(2) NOT NULL,
				CNT_ISO3 varchar(3) NOT NULL,
				RGN_ID tinyint(3) unsigned DEFAULT NULL,
				CNT_name varchar(45) NOT NULL,
				CNT_cur_code varchar(6) DEFAULT 'USD',
				CNT_cur_single varchar(45) DEFAULT 'dollar',
				CNT_cur_plural varchar(45) DEFAULT 'dollars',
				CNT_cur_sign varchar(45) DEFAULT '$',
				CNT_cur_sign_b4 tinyint(1) DEFAULT '1',
				CNT_cur_dec_plc tinyint(3) unsigned NOT NULL DEFAULT '2',
				CNT_cur_dec_mrk varchar(1) NOT NULL DEFAULT '.',
				CNT_cur_thsnds varchar(1) NOT NULL DEFAULT ',',
				CNT_tel_code varchar(12) DEFAULT NULL,
				CNT_is_EU tinyint(1) DEFAULT '0',
				CNT_active tinyint(1) DEFAULT '0',
				PRIMARY KEY  (CNT_ISO)";
        $this->_table_has_not_changed_since_previous($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_currency';
        $sql = "CUR_code varchar(6) NOT NULL,
				CUR_single varchar(45) DEFAULT 'dollar',
				CUR_plural varchar(45) DEFAULT 'dollars',
				CUR_sign varchar(45) DEFAULT '$',
				CUR_dec_plc varchar(1) NOT NULL DEFAULT '2',
				CUR_active tinyint(1) DEFAULT '0',
				PRIMARY KEY  (CUR_code)";
        $this->_table_has_not_changed_since_previous($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_currency_payment_method';
        $sql = "CPM_ID int(11) NOT NULL AUTO_INCREMENT,
				CUR_code varchar(6) NOT NULL,
				PMD_ID int(11) NOT NULL,
				PRIMARY KEY  (CPM_ID),
				KEY PMD_ID (PMD_ID)";
        $this->_table_has_not_changed_since_previous($table_name, $sql, 'ENGINE=InnoDB ');
        $table_name = 'esp_datetime';
        $sql = "DTT_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
				EVT_ID bigint(20) unsigned NOT NULL,
				DTT_name varchar(255) NOT NULL DEFAULT '',
				DTT_description text NOT NULL,
				DTT_EVT_start datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
				DTT_EVT_end datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
				DTT_reg_limit mediumint(8) DEFAULT -1,
				DTT_sold mediumint(8) unsigned DEFAULT 0,
 			    DTT_reserved smallint(6) unsigned NOT NULL DEFAULT 0,
				DTT_is_primary tinyint(1) unsigned NOT NULL DEFAULT 0,
				DTT_order mediumint(3) unsigned DEFAULT 0,
				DTT_parent int(10) unsigned DEFAULT 0,
				DTT_deleted tinyint(1) unsigned NOT NULL DEFAULT 0,
				PRIMARY KEY  (DTT_ID),
				KEY DTT_EVT_start (DTT_EVT_start),
				KEY EVT_ID (EVT_ID),
				KEY DTT_is_primary (DTT_is_primary)";
        $this->_table_is_changed_in_this_version($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = "esp_datetime_ticket";
        $sql = "DTK_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
				DTT_ID int(10) unsigned NOT NULL,
				TKT_ID int(10) unsigned NOT NULL,
				PRIMARY KEY  (DTK_ID),
				KEY DTT_ID (DTT_ID),
				KEY TKT_ID (TKT_ID)";
        $this->_table_has_not_changed_since_previous($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_event_message_template';
        $sql = "EMT_ID bigint(20) unsigned NOT NULL AUTO_INCREMENT,
				EVT_ID bigint(20) unsigned NOT NULL DEFAULT 0,
				GRP_ID int(10) unsigned NOT NULL DEFAULT 0,
				PRIMARY KEY  (EMT_ID),
				KEY EVT_ID (EVT_ID),
				KEY GRP_ID (GRP_ID)";
        $this->_table_has_not_changed_since_previous($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_event_meta';
        $sql = "EVTM_ID int(10) NOT NULL AUTO_INCREMENT,
				EVT_ID bigint(20) unsigned NOT NULL,
				EVT_display_desc tinyint(1) unsigned NOT NULL DEFAULT 1,
				EVT_display_ticket_selector tinyint(1) unsigned NOT NULL DEFAULT 1,
				EVT_visible_on datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
				EVT_default_registration_status varchar(3),
				EVT_phone varchar(45) DEFAULT NULL,
				EVT_additional_limit tinyint(2) unsigned NULL,
				EVT_member_only tinyint(1) unsigned NOT NULL DEFAULT 0,
				EVT_allow_overflow tinyint(1) unsigned NOT NULL DEFAULT 0,
				EVT_timezone_string varchar(45) NULL,
				EVT_external_URL varchar(200) NULL,
				EVT_donations tinyint(1) NULL,
				PRIMARY KEY  (EVTM_ID),
				KEY EVT_ID (EVT_ID)";
        $this->_table_has_not_changed_since_previous($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_event_question_group';
        $sql = "EQG_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
				EVT_ID bigint(20) unsigned NOT NULL,
				QSG_ID int(10) unsigned NOT NULL,
				EQG_primary tinyint(1) unsigned NOT NULL DEFAULT 0,
				PRIMARY KEY  (EQG_ID),
				KEY EVT_ID (EVT_ID),
				KEY QSG_ID (QSG_ID)";
        $this->_table_is_changed_in_this_version($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_event_venue';
        $sql = "EVV_ID int(11) NOT NULL AUTO_INCREMENT,
				EVT_ID bigint(20) unsigned NOT NULL,
				VNU_ID bigint(20) unsigned NOT NULL,
				EVV_primary tinyint(1) unsigned NOT NULL DEFAULT 0,
				PRIMARY KEY  (EVV_ID)";
        $this->_table_has_not_changed_since_previous($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_extra_meta';
        $sql = "EXM_ID int(11) NOT NULL AUTO_INCREMENT,
				OBJ_ID int(11) DEFAULT NULL,
				EXM_type varchar(45) DEFAULT NULL,
				EXM_key varchar(45) DEFAULT NULL,
				EXM_value text,
				PRIMARY KEY  (EXM_ID),
				KEY EXM_type (EXM_type,OBJ_ID,EXM_key)";
        $this->_table_has_not_changed_since_previous($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_extra_join';
        $sql = "EXJ_ID int(11) NOT NULL AUTO_INCREMENT,
				EXJ_first_model_id varchar(6) NOT NULL,
				EXJ_first_model_name varchar(20) NOT NULL,
				EXJ_second_model_id varchar(6) NOT NULL,
				EXJ_second_model_name varchar(20) NOT NULL,
				PRIMARY KEY  (EXJ_ID),
				KEY first_model (EXJ_first_model_name,EXJ_first_model_id),
				KEY second_model (EXJ_second_model_name,EXJ_second_model_id)";
        $this->_table_has_not_changed_since_previous($table_name, $sql, 'ENGINE=InnoDB ');
        $table_name = 'esp_line_item';
        $sql = "LIN_ID int(11) NOT NULL AUTO_INCREMENT,
				LIN_code varchar(245) NOT NULL DEFAULT '',
				TXN_ID int(11) DEFAULT NULL,
				LIN_name varchar(245) NOT NULL DEFAULT '',
				LIN_desc text DEFAULT NULL,
				LIN_unit_price decimal(10,3) DEFAULT NULL,
				LIN_percent decimal(10,3) DEFAULT NULL,
				LIN_is_taxable tinyint(1) DEFAULT 0,
				LIN_order int(10) DEFAULT 0,
				LIN_parent int(10) DEFAULT 0,
				LIN_type varchar(25) NOT NULL,
				LIN_total decimal(10,3) DEFAULT NULL,
				LIN_quantity int(10) DEFAULT NULL,
				OBJ_ID int(11) DEFAULT NULL,
				OBJ_type varchar(45) DEFAULT NULL,
				LIN_timestamp datetime NOT NULL DEFAULT '$now_in_mysql',
				PRIMARY KEY  (LIN_ID),
				KEY LIN_code (LIN_code(191)),
				KEY TXN_ID (TXN_ID)";
        $this->_table_has_not_changed_since_previous($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_log';
        $sql = "LOG_ID int(11) NOT NULL AUTO_INCREMENT,
				LOG_time datetime DEFAULT NULL,
				OBJ_ID varchar(45) DEFAULT NULL,
				OBJ_type varchar(45) DEFAULT NULL,
				LOG_type varchar(45) DEFAULT NULL,
				LOG_message text,
				LOG_wp_user int(11) DEFAULT NULL,
				PRIMARY KEY  (LOG_ID),
				KEY LOG_time (LOG_time),
				KEY OBJ (OBJ_type,OBJ_ID),
				KEY LOG_type (LOG_type)";
        $this->_table_has_not_changed_since_previous($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_message';
        $this->_get_table_manager()->dropIndexIfSizeNot($table_name, 'MSG_to');
        $this->_get_table_manager()->dropIndexIfSizeNot($table_name, 'MSG_from');
        $this->_get_table_manager()->dropIndexIfSizeNot($table_name, 'MSG_subject');
        $sql = "MSG_ID bigint(20) unsigned NOT NULL AUTO_INCREMENT,
				GRP_ID int(10) unsigned NULL,
				MSG_token varchar(255) NULL,
				TXN_ID int(10) unsigned NULL,
				MSG_messenger varchar(30) NOT NULL,
				MSG_message_type varchar(50) NOT NULL,
				MSG_context varchar(50),
				MSG_recipient_ID bigint(20) NULL,
				MSG_recipient_type varchar(45) NULL,
				MSG_content longtext NULL,
				MSG_to varchar(255) NULL,
				MSG_from varchar(255) NULL,
				MSG_subject varchar(255) NULL,
				MSG_priority tinyint(1) NOT NULL DEFAULT 3,
				STS_ID varchar(3) NOT NULL DEFAULT 'MIC',
				MSG_created datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
				MSG_modified datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
				PRIMARY KEY  (MSG_ID),
				KEY GRP_ID (GRP_ID),
				KEY TXN_ID (TXN_ID),
				KEY MSG_messenger (MSG_messenger),
				KEY MSG_message_type (MSG_message_type),
				KEY MSG_context (MSG_context),
				KEY MSG_recipient_ID (MSG_recipient_ID),
				KEY MSG_recipient_type (MSG_recipient_type),
				KEY MSG_to (MSG_to(191)),
				KEY MSG_from (MSG_from(191)),
				KEY MSG_subject (MSG_subject(191)),
				KEY MSG_priority (MSG_priority),
				KEY STS_ID (STS_ID),
				KEY MSG_created (MSG_created),
				KEY MSG_modified (MSG_modified)";
        $this->_table_is_new_in_this_version($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_message_template';
        $sql = "MTP_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
				GRP_ID int(10) unsigned NOT NULL,
				MTP_context varchar(50) NOT NULL,
				MTP_template_field varchar(30) NOT NULL,
				MTP_content text NOT NULL,
				PRIMARY KEY  (MTP_ID),
				KEY GRP_ID (GRP_ID)";
        $this->_table_has_not_changed_since_previous($table_name, $sql, 'ENGINE=InnoDB');
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
        $this->_table_has_not_changed_since_previous($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_payment';
        $sql = "PAY_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
				TXN_ID int(10) unsigned DEFAULT NULL,
				STS_ID varchar(3) DEFAULT NULL,
				PAY_timestamp datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
				PAY_source varchar(45) DEFAULT NULL,
				PAY_amount decimal(10,3) DEFAULT NULL,
				PMD_ID int(11) DEFAULT NULL,
				PAY_gateway_response text,
				PAY_txn_id_chq_nmbr varchar(100) DEFAULT NULL,
				PAY_po_number varchar(100) DEFAULT NULL,
				PAY_extra_accntng varchar(100) DEFAULT NULL,
				PAY_details text,
				PAY_redirect_url varchar(300),
				PAY_redirect_args text,
				PRIMARY KEY  (PAY_ID),
				KEY PAY_timestamp (PAY_timestamp),
				KEY TXN_ID (TXN_ID)";
        $this->_table_has_not_changed_since_previous($table_name, $sql, 'ENGINE=InnoDB ');
        $table_name = 'esp_payment_method';
        $sql = "PMD_ID int(11) NOT NULL AUTO_INCREMENT,
				PMD_type varchar(124) DEFAULT NULL,
				PMD_name varchar(255) DEFAULT NULL,
				PMD_desc text,
				PMD_admin_name varchar(255) DEFAULT NULL,
				PMD_admin_desc text,
				PMD_slug varchar(124) DEFAULT NULL,
				PMD_order int(11) DEFAULT NULL,
				PMD_debug_mode tinyint(1) NOT NULL DEFAULT '0',
				PMD_wp_user int(11) NOT NULL DEFAULT '0',
				PMD_open_by_default tinyint(1) NOT NULL DEFAULT '0',
				PMD_button_url varchar(1012) DEFAULT NULL,
				PMD_scope varchar(255) NULL DEFAULT 'frontend',
				PRIMARY KEY  (PMD_ID),
				UNIQUE KEY PMD_slug_UNIQUE (PMD_slug),
				KEY PMD_type (PMD_type)";
        $this->_table_has_not_changed_since_previous($table_name, $sql, 'ENGINE=InnoDB ');
        $table_name = "esp_ticket_price";
        $sql = "TKP_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
				TKT_ID int(10) unsigned NOT NULL,
				PRC_ID int(10) unsigned NOT NULL,
				PRIMARY KEY  (TKP_ID),
				KEY TKT_ID (TKT_ID),
				KEY PRC_ID (PRC_ID)";
        $this->_table_has_not_changed_since_previous($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = "esp_ticket_template";
        $sql = "TTM_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
				TTM_name varchar(45) NOT NULL,
				TTM_description text,
				TTM_file varchar(45),
				PRIMARY KEY  (TTM_ID)";
        $this->_table_has_not_changed_since_previous($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_question';
        $sql = 'QST_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
				QST_display_text text NOT NULL,
				QST_admin_label varchar(255) NOT NULL,
				QST_system varchar(25) DEFAULT NULL,
				QST_type varchar(25) NOT NULL DEFAULT "TEXT",
				QST_required tinyint(1) unsigned NOT NULL DEFAULT 0,
				QST_required_text varchar(100) NULL,
				QST_order tinyint(2) unsigned NOT NULL DEFAULT 0,
				QST_admin_only tinyint(1) NOT NULL DEFAULT 0,
				QST_max smallint(5) NOT NULL DEFAULT -1,
				QST_wp_user bigint(20) unsigned NULL,
				QST_deleted tinyint(2) unsigned NOT NULL DEFAULT 0,
				PRIMARY KEY  (QST_ID),
				KEY QST_order (QST_order)';
        $this->_table_has_not_changed_since_previous($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_question_group_question';
        $sql = "QGQ_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
				QSG_ID int(10) unsigned NOT NULL,
				QST_ID int(10) unsigned NOT NULL,
				QGQ_order int(10) unsigned NOT NULL DEFAULT 0,
				PRIMARY KEY  (QGQ_ID),
				KEY QST_ID (QST_ID),
				KEY QSG_ID_order (QSG_ID,QGQ_order)";
        $this->_table_has_not_changed_since_previous($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_question_option';
        $sql = "QSO_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
				QSO_value varchar(255) NOT NULL,
				QSO_desc text NOT NULL,
				QST_ID int(10) unsigned NOT NULL,
				QSO_order int(10) unsigned NOT NULL DEFAULT 0,
				QSO_system varchar(25) DEFAULT NULL,
				QSO_deleted tinyint(1) unsigned NOT NULL DEFAULT 0,
				PRIMARY KEY  (QSO_ID),
				KEY QST_ID (QST_ID),
				KEY QSO_order (QSO_order)";
        $this->_table_has_not_changed_since_previous($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_registration';
        $sql = "REG_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
				EVT_ID bigint(20) unsigned NOT NULL,
				ATT_ID bigint(20) unsigned NOT NULL,
				TXN_ID int(10) unsigned NOT NULL,
				TKT_ID int(10) unsigned NOT NULL,
				STS_ID varchar(3) NOT NULL DEFAULT 'RPP',
				REG_date datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
				REG_final_price decimal(10,3) NOT NULL DEFAULT '0.00',
				REG_paid decimal(10,3) NOT NULL DEFAULT '0.00',
				REG_session varchar(45) NOT NULL,
				REG_code varchar(45) DEFAULT NULL,
				REG_url_link varchar(64) DEFAULT NULL,
				REG_count tinyint(2) unsigned DEFAULT '1',
				REG_group_size tinyint(2) unsigned DEFAULT '1',
				REG_att_is_going tinyint(1) DEFAULT '0',
				REG_deleted tinyint(1) DEFAULT '0',
				PRIMARY KEY  (REG_ID),
				KEY REG_url_link (REG_url_link),
				KEY REG_code (REG_code),
				KEY TXN_ID (TXN_ID),
				KEY ATT_ID (ATT_ID),
				KEY TKT_ID (TKT_ID),
				KEY EVT_ID (EVT_ID),
				KEY STS_ID (STS_ID)";
        $this->_table_has_not_changed_since_previous($table_name, $sql, 'ENGINE=InnoDB ');
        $table_name = 'esp_registration_payment';
        $sql = "RPY_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
					  REG_ID int(10) unsigned NOT NULL,
					  PAY_ID int(10) unsigned NULL,
					  RPY_amount decimal(10,3) NOT NULL DEFAULT '0.00',
					  PRIMARY KEY  (RPY_ID),
					  KEY REG_ID (REG_ID),
					  KEY PAY_ID (PAY_ID)";
        $this->_table_has_not_changed_since_previous($table_name, $sql, 'ENGINE=InnoDB ');
        $table_name = 'esp_state';
        $sql = "STA_ID smallint(5) unsigned NOT NULL AUTO_INCREMENT,
				CNT_ISO varchar(2) NOT NULL,
				STA_abbrev varchar(24) NOT NULL,
				STA_name varchar(100) NOT NULL,
				STA_active tinyint(1) DEFAULT '1',
				PRIMARY KEY  (STA_ID),
				KEY STA_abbrev (STA_abbrev),
				KEY CNT_ISO (CNT_ISO)";
        $this->_table_has_not_changed_since_previous($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_status';
        $sql = "STS_ID varchar(3) NOT NULL,
				STS_code varchar(45) NOT NULL,
				STS_type varchar(45) NOT NULL,
				STS_can_edit tinyint(1) NOT NULL DEFAULT 0,
				STS_desc tinytext,
				STS_open tinyint(1) NOT NULL DEFAULT 1,
				UNIQUE KEY STS_ID_UNIQUE (STS_ID),
				KEY STS_type (STS_type)";
        $this->_table_has_not_changed_since_previous($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_transaction';
        $sql = "TXN_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
				TXN_timestamp datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
				TXN_total decimal(10,3) DEFAULT '0.00',
				TXN_paid decimal(10,3) NOT NULL DEFAULT '0.00',
				STS_ID varchar(3) NOT NULL DEFAULT 'TOP',
				TXN_session_data text,
				TXN_hash_salt varchar(250) DEFAULT NULL,
				PMD_ID int(11) DEFAULT NULL,
				TXN_reg_steps text,
				PRIMARY KEY  (TXN_ID),
				KEY TXN_timestamp (TXN_timestamp),
				KEY STS_ID (STS_ID)";
        $this->_table_has_not_changed_since_previous($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_venue_meta';
        $sql = "VNUM_ID int(11) NOT NULL AUTO_INCREMENT,
			VNU_ID bigint(20) unsigned NOT NULL DEFAULT 0,
			VNU_address varchar(255) DEFAULT NULL,
			VNU_address2 varchar(255) DEFAULT NULL,
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
			KEY VNU_ID (VNU_ID),
			KEY STA_ID (STA_ID),
			KEY CNT_ISO (CNT_ISO)";
        $this->_table_has_not_changed_since_previous($table_name, $sql, 'ENGINE=InnoDB');
        //modified tables
        $table_name = "esp_price";
        $sql = "PRC_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
				PRT_ID tinyint(3) unsigned NOT NULL,
				PRC_amount decimal(10,3) NOT NULL DEFAULT '0.00',
				PRC_name varchar(245) NOT NULL,
				PRC_desc text,
				PRC_is_default tinyint(1) unsigned NOT NULL DEFAULT '1',
				PRC_overrides int(10) unsigned DEFAULT NULL,
				PRC_deleted tinyint(1) unsigned NOT NULL DEFAULT '0',
				PRC_order tinyint(3) unsigned NOT NULL DEFAULT '0',
				PRC_wp_user bigint(20) unsigned NULL,
				PRC_parent int(10) unsigned DEFAULT 0,
				PRIMARY KEY  (PRC_ID),
				KEY PRT_ID (PRT_ID)";
        $this->_table_has_not_changed_since_previous($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = "esp_price_type";
        $sql = "PRT_ID tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
				PRT_name varchar(45) NOT NULL,
				PBT_ID tinyint(3) unsigned NOT NULL DEFAULT '1',
				PRT_is_percent tinyint(1) NOT NULL DEFAULT '0',
				PRT_order tinyint(2) unsigned NULL,
				PRT_wp_user bigint(20) unsigned NULL,
				PRT_deleted tinyint(1) NOT NULL DEFAULT '0',
				UNIQUE KEY PRT_name_UNIQUE (PRT_name),
				PRIMARY KEY  (PRT_ID)";
        $this->_table_has_not_changed_since_previous($table_name, $sql, 'ENGINE=InnoDB ');
        $table_name = "esp_ticket";
        $sql = "TKT_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
				TTM_ID int(10) unsigned NOT NULL,
				TKT_name varchar(245) NOT NULL DEFAULT '',
				TKT_description text NOT NULL,
				TKT_qty mediumint(8) DEFAULT NULL,
				TKT_sold mediumint(8) NOT NULL DEFAULT 0,
				TKT_reserved smallint(6) unsigned NOT NULL DEFAULT 0,
				TKT_uses tinyint(2) NOT NULL DEFAULT '-1',
				TKT_required tinyint(2) unsigned NOT NULL DEFAULT '0',
				TKT_min tinyint(2) unsigned NOT NULL DEFAULT '0',
				TKT_max tinyint(2) NOT NULL DEFAULT '-1',
				TKT_price decimal(10,3) NOT NULL DEFAULT '0.00',
				TKT_start_date datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
				TKT_end_date datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
				TKT_taxable tinyint(1) unsigned NOT NULL DEFAULT '0',
				TKT_order tinyint(3) unsigned NOT NULL DEFAULT '0',
				TKT_row tinyint(3) unsigned NOT NULL DEFAULT '0',
				TKT_is_default tinyint(1) unsigned NOT NULL DEFAULT '0',
				TKT_wp_user bigint(20) unsigned NULL,
				TKT_parent int(10) unsigned DEFAULT '0',
				TKT_deleted tinyint(1) NOT NULL DEFAULT '0',
				PRIMARY KEY  (TKT_ID),
				KEY TKT_start_date (TKT_start_date)";
        $this->_table_is_changed_in_this_version($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_question_group';
        $sql = 'QSG_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
				QSG_name varchar(255) NOT NULL,
				QSG_identifier varchar(100) NOT NULL,
				QSG_desc text NULL,
				QSG_order tinyint(2) unsigned NOT NULL DEFAULT 0,
				QSG_show_group_name tinyint(1) NOT NULL,
				QSG_show_group_desc tinyint(1) NOT NULL,
				QSG_system tinyint(2) NULL,
				QSG_deleted tinyint(1) unsigned NOT NULL DEFAULT 0,
				QSG_wp_user bigint(20) unsigned NULL,
				PRIMARY KEY  (QSG_ID),
				UNIQUE KEY QSG_identifier_UNIQUE (QSG_identifier),
				KEY QSG_order (QSG_order)';
        $this->_table_has_not_changed_since_previous($table_name, $sql, 'ENGINE=InnoDB');
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
        /** @var EE_DMS_Core_4_8_0 $script_4_8_defaults */
        $script_4_8_defaults = EE_Registry::instance()->load_dms('Core_4_8_0');
        $script_4_8_defaults->verify_new_countries();
        $script_4_8_defaults->verify_new_currencies();
        $this->verify_db_collations();
        $this->verify_db_collations_again();
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



    /**
     * Verify all EE4 models' tables use utf8mb4 collation
     *
     * @return void
     */
    public function verify_db_collations()
    {
        if (get_option('ee_verified_db_collations', false)) {
            return;
        }
        // grab tables from each model
        $tables_to_check = array();
        foreach (EE_Registry::instance()->non_abstract_db_models as $model_name) {
            if (method_exists($model_name, 'instance')) {
                $model_obj = call_user_func(array($model_name, 'instance'));
                if ($model_obj instanceof EEM_Base) {
                    foreach ($model_obj->get_tables() as $table) {
                        if (
                            strpos($table->get_table_name(), 'esp_')
                            && (is_main_site()//for main tables, verify global tables
                                || ! $table->is_global()//if not the main site, then only verify non-global tables (avoid doubling up)
                            )
                            && function_exists('maybe_convert_table_to_utf8mb4')
                        ) {
                            $tables_to_check[] = $table->get_table_name();
                        }
                    }
                }
            }
        }
        //and let's just be sure these addons' tables get migrated too. They already get handled if their addons are active
        //when this code is run, but not otherwise. Once we record what tables EE added, we'll be able to use that instead
        //of hard-coding this
        $addon_tables = array(
            //mailchimp
            'esp_event_mailchimp_list_group',
            'esp_event_question_mailchimp_field',
            //multisite
            'esp_blog_meta',
            //people
            'esp_people_to_post',
            //promotions
            'esp_promotion',
            'esp_promotion_object',
        );
        foreach ($addon_tables as $table_name) {
                $tables_to_check[] = $table_name;
        }
        $this->_verify_db_collations_for_tables(array_unique($tables_to_check));
        //ok and now let's remember this was done (without needing to check the db schemas all over again)
        add_option('ee_verified_db_collations', true, null, 'no');
        //seeing how this ran with the fix from 10435, no need to check again
        add_option('ee_verified_db_collations_again',true,null,'no');
    }



    /**
     * Verifies DB collations because a bug was discovered on https://events.codebasehq.com/projects/event-espresso/tickets/10435
     * which meant some DB collations might not have been updated
     * @return void
     */
    public function verify_db_collations_again(){
        if (get_option('ee_verified_db_collations_again', false)) {
            return;
        }
        $tables_to_check = array(
            'esp_attendee_meta',
            'esp_message'
        );
        $this->_verify_db_collations_for_tables(array_unique($tables_to_check));
        add_option('ee_verified_db_collations_again',true,null,'no');
    }



    /**
     * Runs maybe_convert_table_to_utf8mb4 on the specified tables
     * @param $tables_to_check
     * @return boolean true if logic ran, false if it didn't
     */
    protected function _verify_db_collations_for_tables($tables_to_check)
    {
        foreach ($tables_to_check as $table_name) {
            $table_name = $this->_table_analysis->ensureTableNameHasPrefix($table_name);
            if ( ! apply_filters('FHEE__EE_DMS_Core_4_9_0__verify_db_collations__check_overridden', false, $table_name )
                && $this->_get_table_analysis()->tableExists($table_name)
            ) {
                maybe_convert_table_to_utf8mb4($table_name);
            }
        }
    }
}