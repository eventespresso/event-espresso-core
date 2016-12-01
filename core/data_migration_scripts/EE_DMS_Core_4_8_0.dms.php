<?php
use EventEspresso\core\services\database\TableAnalysis;
use EventEspresso\core\services\database\TableManager;

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
$stages = glob(EE_CORE . 'data_migration_scripts/4_8_0_stages/*');
$class_to_filepath = array();
foreach ($stages as $filepath) {
    $matches = array();
    preg_match('~4_8_0_stages/(.*).dmsstage.php~', $filepath, $matches);
    $class_to_filepath[$matches[1]] = $filepath;
}
//give addons a chance to autoload their stages too
$class_to_filepath = apply_filters('FHEE__EE_DMS_4_8_0__autoloaded_stages', $class_to_filepath);
EEH_Autoloader::register_autoloader($class_to_filepath);



/**
 * Class EE_DMS_Core_4_8_0
 *
 * @package               Event Espresso
 * @subpackage            core
 * @author                Mike Nelson
 * @since                 4.6.0
 */
class EE_DMS_Core_4_8_0 extends EE_Data_Migration_Script_Base
{

    /**
     * return EE_DMS_Core_4_8_0
     *
     * @param TableManager  $table_manager
     * @param TableAnalysis $table_analysis
     */
    public function __construct(TableManager $table_manager = null, TableAnalysis $table_analysis = null)
    {
        $this->_pretty_name = esc_html__("Data Update to Event Espresso 4.8.0", "event_espresso");
        $this->_priority = 10;
        $this->_migration_stages = array(
            new EE_DMS_4_8_0_pretax_totals(),
            new EE_DMS_4_8_0_event_subtotals(),
        );
        parent::__construct($table_manager, $table_analysis);
    }



    /**
     * Because this is being done at basically the same time as the MER-ready branch
     * of core, it's possible people might have installed MEr-ready branch first,
     * and then this one, in which case we still want to perform this migration,
     * even though the version might not have increased
     *
     * @param array $version_array
     * @return bool
     */
    public function can_migrate_from_version($version_array)
    {
        $version_string = $version_array['Core'];
        if (version_compare($version_string, '4.8.0', '<=') && version_compare($version_string, '4.7.0', '>=')) {
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
        require_once(EE_HELPERS . 'EEH_Activation.helper.php');
        $table_name = 'esp_answer';
        $sql = " ANS_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
					REG_ID int(10) unsigned NOT NULL,
					QST_ID int(10) unsigned NOT NULL,
					ANS_value text NOT NULL,
					PRIMARY KEY  (ANS_ID),
					KEY REG_ID (REG_ID),
					KEY QST_ID (QST_ID)";
        $this->_table_is_changed_in_this_version($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_attendee_meta';
        $sql = "ATTM_ID int(10) unsigned NOT	NULL AUTO_INCREMENT,
						ATT_ID bigint(20) unsigned NOT NULL,
						ATT_fname varchar(45) NOT NULL,
						ATT_lname varchar(45) NOT	NULL,
						ATT_address varchar(255) DEFAULT	NULL,
						ATT_address2 varchar(255) DEFAULT	NULL,
						ATT_city varchar(45) DEFAULT	NULL,
						STA_ID int(10) DEFAULT	NULL,
						CNT_ISO varchar(45) DEFAULT	NULL,
						ATT_zip varchar(12) DEFAULT	NULL,
						ATT_email varchar(255) NOT NULL,
						ATT_phone varchar(45) DEFAULT NULL,
							PRIMARY KEY  (ATTM_ID),
								KEY ATT_ID (ATT_ID),
								KEY ATT_email (ATT_email),
								KEY ATT_lname (ATT_lname),
								KEY ATT_fname (ATT_fname)";
        $this->_table_is_changed_in_this_version($table_name, $sql, 'ENGINE=InnoDB ');
        $table_name = 'esp_country';
        $sql = "CNT_ISO varchar(2) collate utf8_bin NOT NULL,
					  CNT_ISO3 varchar(3) collate utf8_bin NOT NULL,
					  RGN_ID tinyint(3) unsigned DEFAULT NULL,
					  CNT_name varchar(45) collate utf8_bin NOT NULL,
					  CNT_cur_code varchar(6) collate utf8_bin DEFAULT 'USD',
					  CNT_cur_single varchar(45) collate utf8_bin DEFAULT 'dollar',
					  CNT_cur_plural varchar(45) collate utf8_bin DEFAULT 'dollars',
					  CNT_cur_sign varchar(45) collate utf8_bin DEFAULT '$',
					  CNT_cur_sign_b4 tinyint(1) DEFAULT '1',
					  CNT_cur_dec_plc tinyint(3) unsigned NOT NULL DEFAULT '2',
					  CNT_cur_dec_mrk varchar(1) collate utf8_bin NOT NULL DEFAULT '.',
					  CNT_cur_thsnds varchar(1) collate utf8_bin NOT NULL DEFAULT ',',
					  CNT_tel_code varchar(12) collate utf8_bin DEFAULT NULL,
					  CNT_is_EU tinyint(1) DEFAULT '0',
					  CNT_active tinyint(1) DEFAULT '0',
					  PRIMARY KEY  (CNT_ISO)";
        $this->_table_has_not_changed_since_previous($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_currency';
        $sql = "CUR_code varchar(6) collate utf8_bin NOT NULL,
				CUR_single varchar(45) collate utf8_bin DEFAULT 'dollar',
				CUR_plural varchar(45) collate utf8_bin DEFAULT 'dollars',
				CUR_sign varchar(45) collate utf8_bin DEFAULT '$',
				CUR_dec_plc varchar(1) collate utf8_bin NOT NULL DEFAULT '2',
				CUR_active tinyint(1) DEFAULT '0',
				PRIMARY KEY  (CUR_code)";
        $this->_table_has_not_changed_since_previous($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_currency_payment_method';
        $sql = "CPM_ID int(11) NOT NULL AUTO_INCREMENT,
				CUR_code varchar(6) collate utf8_bin NOT NULL,
				PMD_ID int(11) NOT NULL,
				PRIMARY KEY  (CPM_ID),
				KEY PMD_ID (PMD_ID)";
        $this->_table_is_changed_in_this_version($table_name, $sql, 'ENGINE=InnoDB ');
        $table_name = 'esp_datetime';
        $sql = "DTT_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
				  EVT_ID bigint(20) unsigned NOT NULL,
				  DTT_name varchar(255) NOT NULL DEFAULT '',
				  DTT_description text NOT NULL,
				  DTT_EVT_start datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
				  DTT_EVT_end datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
				  DTT_reg_limit mediumint(8) DEFAULT -1,
				  DTT_sold mediumint(8) unsigned NOT NULL DEFAULT 0,
				  DTT_is_primary tinyint(1) unsigned NOT NULL DEFAULT 0,
				  DTT_order mediumint(3) unsigned DEFAULT 0,
				  DTT_parent int(10) unsigned DEFAULT 0,
				  DTT_deleted tinyint(1) unsigned NOT NULL DEFAULT 0,
						PRIMARY KEY  (DTT_ID),
						KEY DTT_EVT_start (DTT_EVT_start),
						KEY EVT_ID (EVT_ID),
						KEY DTT_is_primary (DTT_is_primary)";
        $this->_table_is_changed_in_this_version($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_event_meta';
        $sql = "
			EVTM_ID int(10) NOT NULL AUTO_INCREMENT,
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
        $this->_table_is_changed_in_this_version($table_name, $sql, 'ENGINE=InnoDB');
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
        $this->_table_is_changed_in_this_version($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_extra_join';
        $sql = "EXJ_ID int(11) NOT NULL AUTO_INCREMENT,
				EXJ_first_model_id varchar(6) NOT NULL,
				EXJ_first_model_name varchar(20) NOT NULL,
				EXJ_second_model_id varchar(6) NOT NULL,
				EXJ_second_model_name varchar(20) NOT NULL,
				PRIMARY KEY  (EXJ_ID),
				KEY first_model (EXJ_first_model_name,EXJ_first_model_id),
				KEY second_model (EXJ_second_model_name,EXJ_second_model_id)";
        $this->_table_is_new_in_this_version($table_name, $sql, 'ENGINE=InnoDB ');
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
        $this->_table_is_changed_in_this_version($table_name, $sql, 'ENGINE=InnoDB');
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
        $this->_table_is_changed_in_this_version($table_name, $sql, 'ENGINE=InnoDB');
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
        $table_name = 'esp_event_message_template';
        $sql = "EMT_ID bigint(20) unsigned NOT NULL AUTO_INCREMENT,
					EVT_ID bigint(20) unsigned NOT NULL DEFAULT 0,
					GRP_ID int(10) unsigned NOT NULL DEFAULT 0,
					PRIMARY KEY  (EMT_ID),
					KEY EVT_ID (EVT_ID),
					KEY GRP_ID (GRP_ID)";
        $this->_table_has_not_changed_since_previous($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_payment';
        $sql = "PAY_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
					TXN_ID int(10) unsigned DEFAULT NULL,
					STS_ID varchar(3) collate utf8_bin DEFAULT NULL,
					PAY_timestamp datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
					PAY_source varchar(45) collate utf8_bin DEFAULT NULL,
					PAY_amount decimal(10,3) DEFAULT NULL,
					PMD_ID int(11) DEFAULT NULL,
					PAY_gateway_response text collate utf8_bin,
					PAY_txn_id_chq_nmbr varchar(100) collate utf8_bin DEFAULT NULL,
					PAY_po_number varchar(100) collate utf8_bin DEFAULT NULL,
					PAY_extra_accntng varchar(100) collate utf8_bin DEFAULT NULL,
					PAY_details text collate utf8_bin,
					PAY_redirect_url varchar(300),
					PAY_redirect_args text,
					PRIMARY KEY  (PAY_ID),
					KEY PAY_timestamp (PAY_timestamp),
					KEY TXN_ID (TXN_ID)";
        $this->_table_is_changed_in_this_version($table_name, $sql, 'ENGINE=InnoDB ');
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
        $this->_table_is_changed_in_this_version($table_name, $sql, 'ENGINE=InnoDB ');
        $table_name = "esp_ticket_price";
        $sql = "TKP_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
					  TKT_ID int(10) unsigned NOT NULL,
					  PRC_ID int(10) unsigned NOT NULL,
					  PRIMARY KEY  (TKP_ID),
					  KEY TKT_ID (TKT_ID),
					  KEY PRC_ID (PRC_ID)";
        $this->_table_is_changed_in_this_version($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = "esp_datetime_ticket";
        $sql = "DTK_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
					  DTT_ID int(10) unsigned NOT NULL,
					  TKT_ID int(10) unsigned NOT NULL,
					  PRIMARY KEY  (DTK_ID),
					  KEY DTT_ID (DTT_ID),
					  KEY TKT_ID (TKT_ID)";
        $this->_table_is_changed_in_this_version($table_name, $sql, 'ENGINE=InnoDB');
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
					QST_system varchar(25) NOT NULL DEFAULT "",
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
        $this->_table_is_changed_in_this_version($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_question_group_question';
        $sql = "QGQ_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
					QSG_ID int(10) unsigned NOT NULL,
					QST_ID int(10) unsigned NOT NULL,
					QGQ_order int(10) unsigned NOT NULL DEFAULT 0,
					PRIMARY KEY  (QGQ_ID),
					KEY QST_ID (QST_ID),
					KEY QSG_ID_order (QSG_ID,QGQ_order)";
        $this->_table_is_changed_in_this_version($table_name, $sql, 'ENGINE=InnoDB');
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
        $this->_table_is_changed_in_this_version($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_registration';
        $sql = "REG_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
					  EVT_ID bigint(20) unsigned NOT NULL,
					  ATT_ID bigint(20) unsigned NOT NULL,
					  TXN_ID int(10) unsigned NOT NULL,
					  TKT_ID int(10) unsigned NOT NULL,
					  STS_ID varchar(3) collate utf8_bin NOT NULL DEFAULT 'RPP',
					  REG_date datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
					  REG_final_price decimal(10,3) NOT NULL DEFAULT '0.00',
					  REG_paid decimal(10,3) NOT NULL DEFAULT '0.00',
					  REG_session varchar(45) collate utf8_bin NOT NULL,
					  REG_code varchar(45) collate utf8_bin DEFAULT NULL,
					  REG_url_link varchar(64) collate utf8_bin DEFAULT NULL,
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
        $this->_table_is_changed_in_this_version($table_name, $sql, 'ENGINE=InnoDB ');
        $table_name = 'esp_registration_payment';
        $sql = "RPY_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
					  REG_ID int(10) unsigned NOT NULL,
					  PAY_ID int(10) unsigned NULL,
					  RPY_amount decimal(10,3) NOT NULL DEFAULT '0.00',
					  PRIMARY KEY  (RPY_ID),
					  KEY REG_ID (REG_ID),
					  KEY PAY_ID (PAY_ID)";
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
        $this->_table_is_changed_in_this_version($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_state';
        $sql = "STA_ID smallint(5) unsigned NOT NULL AUTO_INCREMENT,
					  CNT_ISO varchar(2) collate utf8_bin NOT NULL,
					  STA_abbrev varchar(24) collate utf8_bin NOT NULL,
					  STA_name varchar(100) collate utf8_bin NOT NULL,
					  STA_active tinyint(1) DEFAULT '1',
					  PRIMARY KEY  (STA_ID),
					  KEY STA_abbrev (STA_abbrev),
					  KEY CNT_ISO (CNT_ISO)";
        $this->_table_is_changed_in_this_version($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_status';
        $sql = "STS_ID varchar(3) NOT NULL,
					  STS_code varchar(45) NOT NULL,
					  STS_type varchar(45) NOT NULL,
					  STS_can_edit tinyint(1) NOT NULL DEFAULT 0,
					  STS_desc tinytext,
					  STS_open tinyint(1) NOT NULL DEFAULT 1,
					  UNIQUE KEY STS_ID_UNIQUE (STS_ID),
					  KEY STS_type (STS_type)";
        $this->_table_is_changed_in_this_version($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_transaction';
        $sql = "TXN_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
					  TXN_timestamp datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
					  TXN_total decimal(10,3) DEFAULT '0.00',
					  TXN_paid decimal(10,3) NOT NULL DEFAULT '0.00',
					  STS_ID varchar(3) NOT NULL DEFAULT 'TOP',
					  TXN_session_data text collate utf8_bin,
					  TXN_hash_salt varchar(250) collate utf8_bin DEFAULT NULL,
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
        $this->_table_is_changed_in_this_version($table_name, $sql, 'ENGINE=InnoDB');
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
        $this->_table_is_changed_in_this_version($table_name, $sql, 'ENGINE=InnoDB');
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
					  TKT_sold mediumint(8) unsigned NOT NULL DEFAULT 0,
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
        $this->verify_new_countries();
        $this->verify_new_currencies();
        return true;
    }



    /**
     * @return boolean
     */
    public function schema_changes_after_migration()
    {
        $this->fix_non_default_taxes();
        //this is actually the same as the last DMS
        /** @var EE_DMS_Core_4_7_0 $script_4_7_defaults */
        $script_4_7_defaults = EE_Registry::instance()->load_dms('Core_4_7_0');
        return $script_4_7_defaults->schema_changes_after_migration();
    }



    public function migration_page_hooks()
    {
    }



    /**
     * verifies each of the new countries exists that somehow we missed in 4.1
     */
    public function verify_new_countries()
    {
        //a list of countries (and specifically some which were missed in another list):https://gist.github.com/adhipg/1600028
        //how many decimal places? https://en.wikipedia.org/wiki/ISO_4217
        //currency symbols: http://www.xe.com/symbols.php
        //CNT_ISO, CNT_ISO3, RGN_ID, CNT_name, CNT_cur_code, CNT_cur_single, CNT_cur_plural, CNT_cur_sign, CNT_cur_sign_b4, CNT_cur_dec_plc, CNT_tel_code, CNT_is_EU, CNT_active
        //('AD', 'AND', 0, 'Andorra', 'EUR', 'Euro', 'Euros', '€', 1, 2, '+376', 0, 0),
        $newer_countries = array(
            array('AX', 'ALA', 0, '&#197;land Islands', 'EUR', 'Euro', 'Euros', '€', 1, 2, '+358', 1, 0),
            array('BL', 'BLM', 0, 'Saint Barthelemy', 'EUR', 'Euro', 'Euros', '€', 1, 2, '+590', 1, 0),
            array('CW', 'CUW', 0, 'Curacao', 'ANG', 'Guilder', 'Guilders', 'ƒ', 1, 2, '+599', 1, 0),
            array('GG', 'GGY', 0, 'Guernsey', 'EUR', 'Euro', 'Euros', '€', 1, 2, '+44', 0, 0),
            array('IM', 'IMN', 0, 'Isle of Man', 'GBP', 'Pound', 'Pounds', '£', 1, 2, '+44', 0, 0),
            array('JE', 'JEY', 0, 'Jersey', 'GBP', 'Pound', 'Pounds', '£', 1, 2, '+44', 0, 0),
            array('MF', 'MAF', 0, 'Saint Martin', 'EUR', 'Euro', 'Euros', '€', 1, 2, '+590', 1, 0),
            array('ME', 'MNE', 0, 'Montenegro', 'EUR', 'Euro', 'Euros', '€', 1, 2, '+382', 0, 0),
            array('RS', 'SRB', 0, 'Serbia', 'RSD', 'Dinar', 'Dinars', '', 0, 2, '+381', 1, 0),
            array('SS', 'SSD', 0, 'South Sudan', 'SSP', 'Pound', 'Pounds', '£', 1, 2, '+211', 0, 0),
            array('SX', 'SXM', 0, 'Sint Maarten', 'ANG', 'Guilder', 'Guilders', 'ƒ', 1, 2, '+1', 1, 0),
            array('XK', 'XKX', 0, 'Kosovo', 'EUR', 'Euro', 'Euros', '€', 1, 2, '+383', 0, 0),
            array('YT', 'MYT', 0, 'Mayotte', 'EUR', 'Euro', 'Euros', '€', 0, 2, '+262', 1, 0),
            array(
                'BQ',
                'BES',
                0,
                'Bonaire, Saint Eustatius and Saba',
                'USD',
                'Dollar',
                'Dollars',
                '$',
                1,
                2,
                '+599',
                0,
                0,
            ),
            array('BV', 'BVT', 0, 'Bouvet Island', 'NOK', 'Krone', 'Krones', 'kr', 1, 2, '+47', 0, 0),
            array('IO', 'IOT', 0, 'British Indian Ocean Territory', 'GBP', 'Pound', 'Pounds', '£', 1, 2, '+246', 0, 0),
            array('CX', 'CXR', 0, 'Christmas Island', 'AUD', 'Dollar', 'Dollars', '$', 1, 2, '+61', 0, 0),
            array('CC', 'CCK', 0, 'Cocos (Keeling) Islands', 'AUD', 'Dollar', 'Dollars', '$', 1, 2, '+891', 0, 0),
            array(
                'HM',
                'HMD',
                0,
                'Heard Island and McDonald Islands',
                'AUD',
                'Dollar',
                'Dollars',
                '$',
                1,
                2,
                '+891',
                0,
                0,
            ),
            array('PS', 'PSE', 0, 'Palestinian Territory', 'ILS', 'Shekel', 'Shekels', '₪', 1, 2, '+970', 0, 0),
            array(
                'GS',
                'SGS',
                0,
                'South Georgia and the South Sandwich Islands',
                'GBP',
                'Pound',
                'Pounds',
                '£',
                1,
                2,
                '+500',
                0,
                0,
            ),
            array('TL', 'TLS', 0, 'Timor-Leste', 'USD', 'Dollar', 'Dollars', '$', 1, 2, '+670', 0, 0),
            array('TF', 'ATF', 0, 'French Southern Territories', 'EUR', 'Euro', 'Euros', '€', 1, 2, '+262', 0, 0),
            array(
                'UM',
                'UMI',
                0,
                'United States Minor Outlying Islands',
                'USD',
                'Dollar',
                'Dollars',
                '$',
                1,
                2,
                '+1',
                0,
                0,
            ),
        );
        global $wpdb;
        $country_table = $wpdb->prefix . "esp_country";
        $country_format = array(
            "CNT_ISO"         => '%s',
            "CNT_ISO3"        => '%s',
            "RGN_ID"          => '%d',
            "CNT_name"        => '%s',
            "CNT_cur_code"    => '%s',
            "CNT_cur_single"  => '%s',
            "CNT_cur_plural"  => '%s',
            "CNT_cur_sign"    => '%s',
            "CNT_cur_sign_b4" => '%d',
            "CNT_cur_dec_plc" => '%d',
            "CNT_tel_code"    => '%s',
            "CNT_is_EU"       => '%d',
            "CNT_active"      => '%d',
        );
        if ($this->_get_table_analysis()->tableExists($country_table)) {
            foreach ($newer_countries as $country) {
                $SQL = "SELECT COUNT('CNT_ISO') FROM {$country_table} WHERE CNT_ISO='{$country[0]}' LIMIT 1";
                $countries = $wpdb->get_var($SQL);
                if ( ! $countries) {
                    $wpdb->insert($country_table,
                        array_combine(array_keys($country_format), $country),
                        $country_format
                    );
                }
            }
        }
    }



    /**
     * verifies each of the new currencies exists that somehow we missed in 4.6
     */
    public function verify_new_currencies()
    {
        //a list of countries (and specifically some which were missed in another list):https://gist.github.com/adhipg/1600028
        //how many decimal places? https://en.wikipedia.org/wiki/ISO_4217
        //currency symbols: http://www.xe.com/symbols.php
        // CUR_code, CUR_single, CUR_plural, CUR_sign, CUR_dec_plc, CUR_active
        //( 'EUR',  'Euro',  'Euros',  '€',  2,1),
        $newer_currencies = array(
            array('RSD', 'Dinar', 'Dinars', '', 3, 1),
        );
        global $wpdb;
        $currency_table = $wpdb->prefix . "esp_currency";
        $currency_format = array(
            "CUR_code"    => '%s',
            "CUR_single"  => '%s',
            "CUR_plural"  => '%s',
            "CUR_sign"    => '%s',
            "CUR_dec_plc" => '%d',
            "CUR_active"  => '%d',
        );
        if ($this->_get_table_analysis()->tableExists($currency_table)) {
            foreach ($newer_currencies as $currency) {
                $SQL = "SELECT COUNT('CUR_code') FROM {$currency_table} WHERE CUR_code='{$currency[0]}' LIMIT 1";
                $countries = $wpdb->get_var($SQL);
                if ( ! $countries) {
                    $wpdb->insert($currency_table,
                        array_combine(array_keys($currency_format), $currency),
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
    public function fix_non_default_taxes()
    {
        global $wpdb;
        $query = $wpdb->prepare("UPDATE
				{$wpdb->prefix}esp_price p INNER JOIN
				{$wpdb->prefix}esp_price_type pt ON p.PRT_ID = pt.PRT_ID
			SET
				p.PRC_is_default = 1
			WHERE
				p.PRC_is_default = 0 AND
				pt.PBT_ID = %d
					", EEM_Price_Type::base_type_tax);
        $wpdb->query($query);
    }
}
