<?php
use EventEspresso\core\services\database\TableAnalysis;
use EventEspresso\core\services\database\TableManager;

/**
 * meant to convert DBs between 4.3 and 4.5
 * mostly just
 * -adds QGQ_order to teh question-group_question table;
 * -adds DTT_name and DTT_description to the datetime table;
 * -adds users onto prices, price types, question groups, and tickets
 */
// make sure we have all the stages loaded too
// unfortunately, this needs to be done upon INCLUSION of this file,
// instead of construction, because it only gets constructed on first page load
// (all other times it gets resurrected from a wordpress option)
$stages = glob(EE_CORE . 'data_migration_scripts/4_5_0_stages/*');
$class_to_filepath = array();
foreach ($stages as $filepath) {
    $matches = array();
    preg_match('~4_5_0_stages/(.*).dmsstage.php~', $filepath, $matches);
    $class_to_filepath[ $matches[1] ] = $filepath;
}
// give addons a chance to autoload their stages too
$class_to_filepath = apply_filters('FHEE__EE_DMS_4_5_0__autoloaded_stages', $class_to_filepath);
EEH_Autoloader::register_autoloader($class_to_filepath);



class EE_DMS_Core_4_5_0 extends EE_Data_Migration_Script_Base
{



    /**
     * EE_DMS_Core_4_5_0 constructor.
     *
     * @param TableManager  $table_manager
     * @param TableAnalysis $table_analysis
     */
    public function __construct(TableManager $table_manager = null, TableAnalysis $table_analysis = null)
    {
        $this->_pretty_name = __("Data Update to Event Espresso 4.5.0", "event_espresso");
        $this->_priority = 10;
        $this->_migration_stages = array(
            new EE_DMS_4_5_0_update_wp_user_for_tickets(),
            new EE_DMS_4_5_0_update_wp_user_for_prices(),
            new EE_DMS_4_5_0_update_wp_user_for_price_types(),
            new EE_DMS_4_5_0_update_wp_user_for_question_groups(),
            new EE_DMS_4_5_0_invoice_settings(),
        );
        parent::__construct($table_manager, $table_analysis);
    }



    public function can_migrate_from_version($version_array)
    {
        $version_string = $version_array['Core'];
        if (version_compare($version_string, '4.5.0', '<=') && version_compare($version_string, '4.3.0', '>=')) {
//          echo "$version_string can be migrated from";
            return true;
        } elseif (! $version_string) {
//          echo "no version string provided: $version_string";
            // no version string provided... this must be pre 4.3
            return false;// changed mind. dont want people thinking they should migrate yet because they cant
        } else {
//          echo "$version_string doesnt apply";
            return false;
        }
    }



    public function schema_changes_before_migration()
    {
        // relies on 4.1's EEH_Activation::create_table
        require_once(EE_HELPERS . 'EEH_Activation.helper.php');
        $table_name = 'esp_answer';
        $sql = "ANS_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
					REG_ID int(10) unsigned NOT NULL,
					QST_ID int(10) unsigned NOT NULL,
					ANS_value text NOT NULL,
					PRIMARY KEY  (ANS_ID)";
        $this->_table_should_exist_previously($table_name, $sql, 'ENGINE=InnoDB');
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
								KEY ATT_fname (ATT_fname),
								KEY ATT_lname (ATT_lname),
								KEY ATT_email (ATT_email(191))";
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
        $this->_table_should_exist_previously($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_datetime';
        $sql = "DTT_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
				  EVT_ID bigint(20) unsigned NOT NULL,
				  DTT_name varchar(255) NOT NULL DEFAULT '',
				  DTT_description text NOT NULL,
				  DTT_EVT_start datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
				  DTT_EVT_end datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
				  DTT_reg_limit mediumint(8) DEFAULT -1,
				  DTT_sold mediumint(8) unsigned DEFAULT 0,
				  DTT_is_primary tinyint(1) unsigned NOT NULL DEFAULT 0,
				  DTT_order mediumint(3) unsigned DEFAULT 0,
				  DTT_parent int(10) unsigned DEFAULT 0,
				  DTT_deleted tinyint(1) unsigned NOT NULL DEFAULT 0,
						PRIMARY KEY  (DTT_ID),
						KEY EVT_ID (EVT_ID),
						KEY DTT_is_primary (DTT_is_primary)";
        $this->_table_should_exist_previously($table_name, $sql, 'ENGINE=InnoDB');
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
			PRIMARY KEY  (EVTM_ID)";
        $this->_table_should_exist_previously($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_event_question_group';
        $sql = "EQG_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
					EVT_ID bigint(20) unsigned NOT NULL,
					QSG_ID int(10) unsigned NOT NULL,
					EQG_primary tinyint(1) unsigned NOT NULL DEFAULT 0,
					PRIMARY KEY  (EQG_ID)";
        $this->_table_should_exist_previously($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_event_venue';
        $sql = "EVV_ID int(11) NOT NULL AUTO_INCREMENT,
				EVT_ID bigint(20) unsigned NOT NULL,
				VNU_ID bigint(20) unsigned NOT NULL,
				EVV_primary tinyint(1) unsigned NOT NULL DEFAULT 0,
				PRIMARY KEY  (EVV_ID)";
        $this->_table_should_exist_previously($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_extra_meta';
        $sql = "EXM_ID int(11) NOT NULL AUTO_INCREMENT,
				OBJ_ID int(11) DEFAULT NULL,
				EXM_type varchar(45) DEFAULT NULL,
				EXM_key varchar(45) DEFAULT NULL,
				EXM_value text,
				PRIMARY KEY  (EXM_ID)";
        $this->_table_should_exist_previously($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_line_item';
        $sql = "LIN_ID int(11) NOT NULL AUTO_INCREMENT,
				LIN_code varchar(245) NOT NULL DEFAULT '',
				TXN_ID int(11) DEFAULT NULL,
				LIN_name varchar(245) NOT NULL DEFAULT '',
				LIN_desc varchar(245) DEFAULT NULL,
				LIN_unit_price decimal(10,3) DEFAULT NULL,
				LIN_percent decimal(10,3) DEFAULT NULL,
				LIN_is_taxable tinyint(1) DEFAULT 0,
				LIN_order int(10) DEFAULT 0,
				LIN_parent int(10) DEFAULT 0,
				LIN_type varchar(25) NOT NULL,
				LIN_total decimal(10,3) DEFAULT NULL,
				LIN_quantity int(10) DEFAULT NULL,
				OBJ_ID int(11) DEFAULT NULL,
				OBJ_type varchar(45)DEFAULT NULL,
				PRIMARY KEY  (LIN_ID)";
        $this->_table_should_exist_previously($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_message_template';
        $sql = "MTP_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
					GRP_ID int(10) unsigned NOT NULL,
					MTP_context varchar(50) NOT NULL,
					MTP_template_field varchar(30) NOT NULL,
					MTP_content text NOT NULL,
					PRIMARY KEY  (MTP_ID),
					KEY GRP_ID (GRP_ID)";
        $this->_table_should_exist_previously($table_name, $sql, 'ENGINE=InnoDB');
        $this->_get_table_manager()->dropIndex('esp_message_template_group', 'EVT_ID');
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
        $this->_table_should_exist_previously($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_event_message_template';
        $sql = "EMT_ID bigint(20) unsigned NOT NULL AUTO_INCREMENT,
					EVT_ID bigint(20) unsigned NOT NULL DEFAULT 0,
					GRP_ID int(10) unsigned NOT NULL DEFAULT 0,
					PRIMARY KEY  (EMT_ID),
					KEY EVT_ID (EVT_ID),
					KEY GRP_ID (GRP_ID)";
        $this->_table_should_exist_previously($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_payment';
        $sql = "PAY_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
					TXN_ID int(10) unsigned DEFAULT NULL,
					STS_ID varchar(3) COLLATE utf8_bin DEFAULT NULL,
					PAY_timestamp datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
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
        $table_name = 'esp_question';
        $sql = 'QST_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
					QST_display_text text NOT NULL,
					QST_admin_label varchar(255) NOT NULL,
					QST_system varchar(25) DEFAULT NULL,
					QST_type varchar(25) NOT NULL DEFAULT "text",
					QST_required tinyint(1) unsigned NOT NULL DEFAULT 0,
					QST_required_text varchar(100) NULL,
					QST_order tinyint(2) unsigned NOT NULL DEFAULT 0,
					QST_admin_only tinyint(1) NOT NULL DEFAULT 0,
					QST_wp_user bigint unsigned NULL,
					QST_deleted tinyint(1) unsigned NOT NULL DEFAULT 0,
					PRIMARY KEY  (QST_ID)';
        $this->_table_should_exist_previously($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_question_group_question';
        $sql = "QGQ_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
					QSG_ID int(10) unsigned NOT NULL,
					QST_ID int(10) unsigned NOT NULL,
					QGQ_order int(10) unsigned NOT NULL DEFAULT 0,
					PRIMARY KEY  (QGQ_ID) ";
        $this->_table_should_exist_previously($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_question_option';
        $sql = "QSO_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
					QSO_value varchar(255) NOT NULL,
					QSO_desc text NOT NULL,
					QST_ID int(10) unsigned NOT NULL,
					QSO_order int(10) unsigned NOT NULL DEFAULT 0,
					QSO_deleted tinyint(1) unsigned NOT NULL DEFAULT 0,
					PRIMARY KEY  (QSO_ID)";
        $this->_table_should_exist_previously($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_registration';
        $sql = "REG_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
					  EVT_ID bigint(20) unsigned NOT NULL,
					  ATT_ID bigint(20) unsigned NOT NULL,
					  TXN_ID int(10) unsigned NOT NULL,
					  TKT_ID int(10) unsigned NOT NULL,
					  STS_ID varchar(3) COLLATE utf8_bin NOT NULL DEFAULT 'RPP',
					  REG_date datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
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
        $table_name = 'esp_checkin';
        $sql = "CHK_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
					REG_ID int(10) unsigned NOT NULL,
					DTT_ID int(10) unsigned NOT NULL,
					CHK_in tinyint(1) unsigned NOT NULL DEFAULT 1,
					CHK_timestamp datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
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
					  STS_desc TINYtext COLLATE utf8_bin,
					  STS_open tinyint(1) NOT NULL DEFAULT 1,
					  UNIQUE KEY STS_ID_UNIQUE (STS_ID),
					  KEY STS_type (STS_type)";
        $this->_table_should_exist_previously($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = 'esp_transaction';
        $sql = "TXN_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
					  TXN_timestamp datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
					  TXN_total decimal(10,3) DEFAULT '0.00',
					  TXN_paid decimal(10,3) NOT NULL DEFAULT '0.00',
					  STS_ID varchar(3) NOT NULL DEFAULT 'TOP',
					  TXN_session_data text COLLATE utf8_bin,
					  TXN_hash_salt varchar(250) COLLATE utf8_bin DEFAULT NULL,
					  PMD_ID int(11) DEFAULT NULL,
					  PRIMARY KEY  (TXN_ID),
					  KEY TXN_timestamp (TXN_timestamp),
					  KEY STS_ID (STS_ID)";
        $this->_table_should_exist_previously($table_name, $sql, 'ENGINE=InnoDB');
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
			KEY STA_ID (STA_ID),
			KEY CNT_ISO (CNT_ISO)";
        $this->_table_should_exist_previously($table_name, $sql, 'ENGINE=InnoDB');
        // modified tables
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
					  PRC_wp_user bigint unsigned NULL,
					  PRC_parent int(10) unsigned DEFAULT 0,
					  PRIMARY KEY  (PRC_ID)";
        $this->_table_should_exist_previously($table_name, $sql, 'ENGINE=InnoDB');
        $table_name = "esp_price_type";
        $sql = "PRT_ID tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
				  PRT_name varchar(45) NOT NULL,
				  PBT_ID tinyint(3) unsigned NOT NULL DEFAULT '1',
				  PRT_is_percent tinyint(1) NOT NULL DEFAULT '0',
				  PRT_order tinyint(2) unsigned NULL,
				  PRT_wp_user bigint unsigned NULL,
				  PRT_deleted tinyint(1) NOT NULL DEFAULT '0',
				  UNIQUE KEY PRT_name_UNIQUE (PRT_name),
				  PRIMARY KEY  (PRT_ID)";
        $this->_table_should_exist_previously($table_name, $sql, 'ENGINE=InnoDB ');
        $table_name = "esp_ticket";
        $sql = "TKT_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
					  TTM_ID int(10) unsigned NOT NULL,
					  TKT_name varchar(245) NOT NULL DEFAULT '',
					  TKT_description text NOT NULL,
					  TKT_qty mediumint(8) DEFAULT NULL,
					  TKT_sold mediumint(8) NOT NULL DEFAULT 0,
					  TKT_uses tinyint(2) NOT NULL DEFAULT '-1',
					  TKT_required tinyint(1) unsigned NOT NULL DEFAULT '0',
					  TKT_min tinyint(2) unsigned NOT NULL DEFAULT '0',
					  TKT_max tinyint(1) NOT NULL DEFAULT '-1',
					  TKT_price decimal(10,3) NOT NULL DEFAULT '0.00',
					  TKT_start_date datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
					  TKT_end_date datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
					  TKT_taxable tinyint(1) unsigned NOT NULL DEFAULT '0',
					  TKT_order tinyint(3) unsigned NOT NULL DEFAULT '0',
					  TKT_row tinyint(3) unsigned NOT NULL DEFAULT '0',
					  TKT_is_default tinyint(1) unsigned NOT NULL DEFAULT '0',
					  TKT_wp_user bigint unsigned NULL,
					  TKT_parent int(10) unsigned DEFAULT '0',
					  TKT_deleted tinyint(1) NOT NULL DEFAULT '0',
					  PRIMARY KEY  (TKT_ID)";
        $this->_table_should_exist_previously($table_name, $sql, 'ENGINE=InnoDB');
        $this->_get_table_manager()->dropIndex('esp_question_group', 'QSG_identifier_UNIQUE');
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
					QSG_wp_user bigint unsigned NULL,
					PRIMARY KEY  (QSG_ID),
					UNIQUE KEY QSG_identifier_UNIQUE (QSG_identifier ASC)';
        $this->_table_should_exist_previously($table_name, $sql, 'ENGINE=InnoDB');
        $script_4_1_defaults = EE_Registry::instance()->load_dms('Core_4_1_0');
        // (because many need to convert old string states to foreign keys into the states table)
        $script_4_1_defaults->insert_default_states();
        $script_4_1_defaults->insert_default_countries();
        // schema on price, price_types and tickets has changed so use the DEFAULT method in here instead of 4.1's and later.
        $this->insert_default_price_types();
        $this->insert_default_prices();
        $this->insert_default_tickets();
        // setting up the config wp option pretty well counts as a 'schema change', or at least should happen ehre
        EE_Config::instance()->update_espresso_config(false, true);
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
     * insert_default_price_types
     *
     * @since 4.5.0
     * @return void
     */
    public function insert_default_price_types()
    {
        global $wpdb;
        $price_type_table = $wpdb->prefix . "esp_price_type";
        if ($this->_get_table_analysis()->tableExists($price_type_table)) {
            $SQL = 'SELECT COUNT(PRT_ID) FROM ' . $price_type_table;
            $price_types_exist = $wpdb->get_var($SQL);
            if (! $price_types_exist) {
                $user_id = EEH_Activation::get_default_creator_id();
                $SQL = "INSERT INTO $price_type_table ( PRT_ID, PRT_name, PBT_ID, PRT_is_percent, PRT_order, PRT_wp_user, PRT_deleted ) VALUES
							(1, '" . __('Base Price', 'event_espresso') . "', 1,  0, 0, $user_id, 0),
							(2, '" . __('Percent Discount', 'event_espresso') . "', 2,  1, 20, $user_id, 0),
							(3, '" . __('Dollar Discount', 'event_espresso') . "', 2,  0, 30, $user_id, 0),
							(4, '" . __('Percent Surcharge', 'event_espresso') . "', 3,  1, 40, $user_id,  0),
							(5, '" . __('Dollar Surcharge', 'event_espresso') . "', 3,  0, 50, $user_id, 0);";
                $SQL = apply_filters('FHEE__EE_DMS_4_5_0__insert_default_price_types__SQL', $SQL);
                $wpdb->query($SQL);
            }
        }
    }



    /**
     * insert DEFAULT prices.
     *  If we're INSTALLING 4.x CAF, then we add a few extra DEFAULT prices
     * when EEH_Activaion's initialize_db_content is called via  ahook in
     * EE_Brewing_regular
     *
     * @since 4.5.0
     * @return void
     */
    public function insert_default_prices()
    {
        global $wpdb;
        $price_table = $wpdb->prefix . "esp_price";
        if ($this->_get_table_analysis()->tableExists($price_table)) {
            $SQL = 'SELECT COUNT(PRC_ID) FROM ' . $price_table;
            $prices_exist = $wpdb->get_var($SQL);
            if (! $prices_exist) {
                $user_id = EEH_Activation::get_default_creator_id();
                $SQL = "INSERT INTO $price_table
							(PRC_ID, PRT_ID, PRC_amount, PRC_name, PRC_desc,  PRC_is_default, PRC_overrides, PRC_wp_user, PRC_order, PRC_deleted, PRC_parent ) VALUES
							(1, 1, '0.00', 'Free Admission', '', 1, NULL, $user_id, 0, 0, 0);";
                $SQL = apply_filters('FHEE__EE_DMS_4_5_0__insert_default_prices__SQL', $SQL);
                $wpdb->query($SQL);
            }
        }
    }



    /**
     * insert DEFAULT ticket
     * Almost identical to EE_DMS_Core_4_3_0::insert_default_tickets, except is aware of the TKT_wp_user field
     *
     * @since 4.5.0
     * @return void
     */
    public function insert_default_tickets()
    {
        global $wpdb;
        $ticket_table = $wpdb->prefix . "esp_ticket";
        if ($this->_get_table_analysis()->tableExists($ticket_table)) {
            $SQL = 'SELECT COUNT(TKT_ID) FROM ' . $ticket_table;
            $tickets_exist = $wpdb->get_var($SQL);
            if (! $tickets_exist) {
                $user_id = EEH_Activation::get_default_creator_id();
                $SQL = "INSERT INTO $ticket_table
					( TKT_ID, TTM_ID, TKT_name, TKT_description, TKT_qty, TKT_sold, TKT_uses, TKT_required, TKT_min, TKT_max, TKT_price, TKT_start_date, TKT_end_date, TKT_taxable, TKT_order, TKT_row, TKT_is_default, TKT_parent, TKT_wp_user, TKT_deleted ) VALUES
					( 1, 0, '"
                       . __("Free Ticket", "event_espresso")
                       . "', '', 100, 0, -1, 0, 0, -1, 0.00, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0, 0, 1, 1, 0, $user_id, 0);";
                $SQL = apply_filters('FHEE__EE_DMS_4_5_0__insert_default_tickets__SQL', $SQL);
                $wpdb->query($SQL);
            }
        }
        $ticket_price_table = $wpdb->prefix . "esp_ticket_price";
        if ($this->_get_table_analysis()->tableExists($ticket_price_table)) {
            $SQL = 'SELECT COUNT(TKP_ID) FROM ' . $ticket_price_table;
            $ticket_prc_exist = $wpdb->get_var($SQL);
            if (! $ticket_prc_exist) {
                $SQL = "INSERT INTO $ticket_price_table
				( TKP_ID, TKT_ID, PRC_ID ) VALUES
				( 1, 1, 1 )
				";
                $SQL = apply_filters('FHEE__EE_DMS_4_5_0__insert_default_tickets__SQL__ticket_price', $SQL);
                $wpdb->query($SQL);
            }
        }
    }
}
