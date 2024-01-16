<?php

use EventEspresso\core\services\database\TableAnalysis;
use EventEspresso\core\services\database\TableManager;
use EventEspresso\core\services\i18n\LegacyTextDomainOptions;

// make sure we have all the stages loaded too
// unfortunately, this needs to be done upon INCLUSION of this file,
// instead of construction, because it only gets constructed on first page load
// (all other times it gets resurrected from a WordPress option)
$stages            = glob(EE_CORE . 'data_migration_scripts/5_0_0_stages/*');
$class_to_filepath = [];
foreach ($stages as $filepath) {
    $matches = [];
    preg_match('~5_0_0_stages/(.*).dmsstage.php~', $filepath, $matches);
    $class_to_filepath[ $matches[1] ] = $filepath;
}
// give addons a chance to autoload their stages too
$class_to_filepath = apply_filters('FHEE__EE_DMS_5_0_0__autoloaded_stages', $class_to_filepath);
EEH_Autoloader::register_autoloader($class_to_filepath);

/**
 * Class EE_DMS_Core_5_0_0
 *
 * @package     Event Espresso
 * @subpackage  core
 * @author      Brent Christensen
 * @since       5.0.0.p
 */
class EE_DMS_Core_5_0_0 extends EE_Data_Migration_Script_Base
{
    /**
     * @param EE_DMS_Core_4_10_0 $dms_4_10
     * @param TableManager|null  $table_manager
     * @param TableAnalysis|null $table_analysis
     */
    public function __construct(
        EE_DMS_Core_4_10_0 $dms_4_10,
        TableManager $table_manager = null,
        TableAnalysis $table_analysis = null
    ) {
        $this->previous_dms      = $dms_4_10;
        $this->_pretty_name      = esc_html__("Data Update to Event Espresso 5.0.0", "event_espresso");
        $this->_priority         = 10;
        $this->_migration_stages = [
            new EE_DMS_5_0_0_Event_Venues(),
        ];
        parent::__construct($table_manager, $table_analysis);
    }


    /**
     * Whether to migrate or not.
     *
     * @param array $version_array
     * @return bool
     */
    public function can_migrate_from_version($version_array): bool
    {
        $version_string = $version_array['Core'];
        return $version_string &&
            version_compare($version_string, '5.0.0.decaf', '<') &&
            version_compare($version_string, '4.10.0.decaf', '>=');
    }


    /**
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function schema_changes_before_migration(): bool
    {
        require_once EE_HELPERS . 'EEH_Activation.helper.php';

        $this->_table_has_not_changed_since_previous(
            'esp_answer',
            ' ANS_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
            REG_ID int(10) unsigned NOT NULL,
            QST_ID int(10) unsigned NOT NULL,
            ANS_value text NOT NULL,
            PRIMARY KEY  (ANS_ID)'
        );
        $this->_get_table_manager()->addIndex('esp_answer', 'REG_ID', 'REG_ID');
        $this->_get_table_manager()->addIndex('esp_answer', 'QST_ID', 'QST_ID');


        $this->_table_has_not_changed_since_previous(
            'esp_attendee_meta',
            "ATTM_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
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
				PRIMARY KEY  (ATTM_ID)"
        );
        $this->_get_table_manager()->addIndex('esp_attendee_meta', 'ATT_ID', 'ATT_ID');
        $this->_get_table_manager()->addIndex(
            'esp_attendee_meta',
            'ATT_email',
            'ATT_email',
            TableAnalysis::INDEX_TYPE_INDEX,
            TableAnalysis::INDEX_COLUMN_SIZE
        );
        $this->_get_table_manager()->addIndex('esp_attendee_meta', 'ATT_lname', 'ATT_lname');
        $this->_get_table_manager()->addIndex('esp_attendee_meta', 'ATT_fname', 'ATT_fname');


        $this->_table_has_not_changed_since_previous(
            'esp_checkin',
            "CHK_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
				REG_ID int(10) unsigned NOT NULL,
				DTT_ID int(10) unsigned NOT NULL,
				CHK_in tinyint(1) unsigned NOT NULL DEFAULT 1,
				CHK_timestamp datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
				PRIMARY KEY  (CHK_ID)"
        );
        $this->_get_table_manager()->addIndex('esp_checkin', 'REG_ID', 'REG_ID');
        $this->_get_table_manager()->addIndex('esp_checkin', 'DTT_ID', 'DTT_ID');
        $this->_get_table_manager()->addIndex(
            'esp_checkin',
            'CHK_timestamp',
            'CHK_timestamp',
            TableAnalysis::INDEX_TYPE_INDEX,
            null,
            true
        );


        $this->_table_has_not_changed_since_previous(
            'esp_country',
            "CNT_ISO varchar(2) NOT NULL,
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
				PRIMARY KEY  (CNT_ISO)"
        );


        $this->_table_has_not_changed_since_previous(
            'esp_currency',
            "CUR_code varchar(6) NOT NULL,
				CUR_single varchar(45) DEFAULT 'dollar',
				CUR_plural varchar(45) DEFAULT 'dollars',
				CUR_sign varchar(45) DEFAULT '$',
				CUR_dec_plc varchar(1) NOT NULL DEFAULT '2',
				CUR_active tinyint(1) DEFAULT '0',
				PRIMARY KEY  (CUR_code)"
        );


        // note: although this table is no longer in use,
        // it hasn't been removed because then queries to the model will have errors.
        // but you should expect this table and its corresponding model to be removed in
        // the next few months
        $this->_table_is_new_in_this_version(
            'esp_currency_payment_method',
            "CPM_ID int(11) NOT NULL AUTO_INCREMENT,
				CUR_code varchar(6) NOT NULL,
				PMD_ID int(11) NOT NULL,
				PRIMARY KEY  (CPM_ID)"
        );
        $this->_get_table_manager()->addIndex('esp_currency_payment_method', 'PMD_ID', 'PMD_ID');


        $this->_table_is_changed_in_this_version(
            'esp_datetime',
            "DTT_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
				EVT_ID bigint(20) unsigned NOT NULL,
			    VNU_ID bigint(20) unsigned NOT NULL DEFAULT 0,
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
				PRIMARY KEY  (DTT_ID)"
        );
        $this->_get_table_manager()->addIndex('esp_datetime', 'EVT_ID', 'EVT_ID');
        // $this->_get_table_manager()->addIndex('esp_datetime', 'VNU_ID', 'VNU_ID');
        $this->_get_table_manager()->addIndex('esp_datetime', 'DTT_EVT_start', 'DTT_EVT_start');
        // $this->_get_table_manager()->addIndex('esp_datetime', 'DTT_EVT_end', 'DTT_EVT_end');
        // $this->_get_table_manager()->dropIndex('esp_datetime', 'DTT_is_primary');


        $this->_table_has_not_changed_since_previous(
            'esp_datetime_ticket',
            "DTK_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
				DTT_ID int(10) unsigned NOT NULL,
				TKT_ID int(10) unsigned NOT NULL,
				PRIMARY KEY  (DTK_ID)"
        );
        $this->_get_table_manager()->addIndex('esp_datetime_ticket', 'DTT_ID', 'DTT_ID');
        $this->_get_table_manager()->addIndex('esp_datetime_ticket', 'TKT_ID', 'TKT_ID');


        $this->_table_has_not_changed_since_previous(
            'esp_event_message_template',
            "EMT_ID bigint(20) unsigned NOT NULL AUTO_INCREMENT,
				EVT_ID bigint(20) unsigned NOT NULL DEFAULT 0,
				GRP_ID int(10) unsigned NOT NULL DEFAULT 0,
				PRIMARY KEY  (EMT_ID)"
        );
        $this->_get_table_manager()->addIndex('esp_event_message_template', 'EVT_ID', 'EVT_ID');
        $this->_get_table_manager()->addIndex('esp_event_message_template', 'GRP_ID', 'GRP_ID');


        $this->_table_is_changed_in_this_version(
            'esp_event_meta',
            "EVTM_ID int(10) NOT NULL AUTO_INCREMENT,
				EVT_ID bigint(20) unsigned NOT NULL,
			    VNU_ID bigint(20) unsigned NOT NULL DEFAULT 0,
				EVT_display_desc tinyint(1) unsigned NOT NULL DEFAULT 1,
				EVT_display_ticket_selector tinyint(1) unsigned NOT NULL DEFAULT 1,
				EVT_visible_on datetime NULL DEFAULT NULL,
				EVT_default_registration_status varchar(3),
				EVT_phone varchar(45) DEFAULT NULL,
				EVT_additional_limit tinyint(2) unsigned NOT NULL DEFAULT 10,
				EVT_member_only tinyint(1) unsigned NOT NULL DEFAULT 0,
				EVT_allow_overflow tinyint(1) unsigned NOT NULL DEFAULT 0,
				EVT_timezone_string varchar(45) NULL,
				EVT_external_URL varchar(200) NULL,
				EVT_donations tinyint(1) NULL,
				FSC_UUID varchar(25) DEFAULT NULL,
				PRIMARY KEY  (EVTM_ID)"
        );
        $this->_get_table_manager()->addIndex(
            'esp_event_meta',
            'EVT_ID',
            'EVT_ID',
            TableAnalysis::INDEX_TYPE_INDEX,
            null,
            true
        );
        // $this->_get_table_manager()->addIndex('esp_event_meta', 'VNU_ID', 'VNU_ID');


        $this->_table_has_not_changed_since_previous(
            'esp_event_question_group',
            "EQG_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
				EVT_ID bigint(20) unsigned NOT NULL,
				QSG_ID int(10) unsigned NOT NULL,
				EQG_primary tinyint(1) unsigned NOT NULL DEFAULT 0,
				EQG_additional tinyint(1) unsigned NOT NULL DEFAULT 0,
				PRIMARY KEY  (EQG_ID)"
        );
        $this->_get_table_manager()->addIndex('esp_event_question_group', 'EVT_ID', 'EVT_ID');
        $this->_get_table_manager()->addIndex('esp_event_question_group', 'QSG_ID', 'QSG_ID');


        $this->_table_has_not_changed_since_previous(
            'esp_event_venue',
            "EVV_ID int(11) NOT NULL AUTO_INCREMENT,
				EVT_ID bigint(20) unsigned NOT NULL,
				VNU_ID bigint(20) unsigned NOT NULL,
				EVV_primary tinyint(1) unsigned NOT NULL DEFAULT 0,
				PRIMARY KEY  (EVV_ID)"
        );


        $this->_table_has_not_changed_since_previous(
            'esp_extra_meta',
            "EXM_ID int(11) NOT NULL AUTO_INCREMENT,
				OBJ_ID int(11) DEFAULT NULL,
				EXM_type varchar(45) DEFAULT NULL,
				EXM_key varchar(45) DEFAULT NULL,
				EXM_value text,
				PRIMARY KEY  (EXM_ID)"
        );
        $this->_get_table_manager()->addIndex('esp_extra_meta', 'EXM_type', 'EXM_type,OBJ_ID,EXM_key');


        $this->_table_has_not_changed_since_previous(
            'esp_extra_join',
            "EXJ_ID int(11) NOT NULL AUTO_INCREMENT,
				EXJ_first_model_id varchar(12) NOT NULL,
				EXJ_first_model_name varchar(20) NOT NULL,
				EXJ_second_model_id varchar(12) NOT NULL,
				EXJ_second_model_name varchar(20) NOT NULL,
				PRIMARY KEY  (EXJ_ID)"
        );
        $this->_get_table_manager()->addIndex(
            'esp_extra_join',
            'first_model',
            'EXJ_first_model_name,EXJ_first_model_id'
        );
        $this->_get_table_manager()->addIndex(
            'esp_extra_join',
            'second_model',
            'EXJ_second_model_name,EXJ_second_model_id'
        );


        $this->_table_is_new_in_this_version(
            'esp_form_element',
            "FIN_UUID varchar(25) NOT NULL,
				FSC_UUID varchar(25) NOT NULL,
				FIN_adminOnly tinyint(1) unsigned NOT NULL DEFAULT 0,
				FIN_attributes text DEFAULT NULL,
				FIN_helpText text DEFAULT NULL,
				FIN_label text DEFAULT NULL,
				FIN_mapsTo varchar(45) DEFAULT NULL,
				FIN_options text DEFAULT NULL,
				FIN_order tinyint(2) unsigned NOT NULL DEFAULT 0,
				FIN_required text DEFAULT NULL,
				FIN_status varchar(32) NOT NULL DEFAULT 'active',
				FIN_type tinytext DEFAULT NULL,
				FIN_wpUser bigint(20) unsigned DEFAULT NULL,
				PRIMARY KEY  (FIN_UUID)"
        );
        $this->_get_table_manager()->addIndex('esp_form_element', 'FSC_UUID', 'FSC_UUID');
        // $this->_get_table_manager()->dropIndex('esp_form_element', 'FIN_order');
        // $this->_get_table_manager()->dropIndex('esp_form_element', 'FIN_status');


        $this->_table_is_new_in_this_version(
            'esp_form_section',
            "FSC_UUID varchar(25) NOT NULL,
				FSC_appliesTo tinytext NOT NULL,
				FSC_attributes text DEFAULT NULL,
				FSC_belongsTo varchar(25) DEFAULT NULL,
				FSC_label text DEFAULT NULL,
				FSC_order tinyint(2) unsigned NOT NULL DEFAULT 0,
				FSC_status varchar(32) NOT NULL DEFAULT 'active',
				FSC_wpUser bigint(20) unsigned DEFAULT NULL,
				PRIMARY KEY  (FSC_UUID)"
        );
        $this->_get_table_manager()->addIndex('esp_form_section', 'FSC_belongsTo', 'FSC_belongsTo');
        // $this->_get_table_manager()->dropIndex('esp_form_section', 'FSC_order');
        // $this->_get_table_manager()->dropIndex('esp_form_section', 'FSC_status');


        $this->_table_is_new_in_this_version(
            'esp_form_submission',
            "FSB_UUID varchar(25) NOT NULL,
                FSC_UUID varchar(25) NOT NULL,
				TXN_ID int(10) DEFAULT NULL,
				FSB_data mediumtext DEFAULT NULL,
				FSB_submitted datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
				PRIMARY KEY  (FSB_UUID)"
        );
        $this->_get_table_manager()->addIndex('esp_form_submission', 'FSC_UUID', 'FSC_UUID');
        $this->_get_table_manager()->addIndex('esp_form_submission', 'TXN_ID', 'TXN_ID');
        $this->_get_table_manager()->addIndex(
            'esp_form_submission',
            'FSB_submitted',
            'FSB_submitted',
            TableAnalysis::INDEX_TYPE_INDEX,
            null,
            true
        );


        $this->_table_is_changed_in_this_version(
            'esp_line_item',
            "LIN_ID int(11) NOT NULL AUTO_INCREMENT,
				LIN_code varchar(245) NOT NULL DEFAULT '',
				TXN_ID int(10) DEFAULT NULL,
				LIN_name varchar(245) NOT NULL DEFAULT '',
				LIN_desc text DEFAULT NULL,
				LIN_unit_price decimal(12,6) DEFAULT NULL,
				LIN_percent decimal(12,6) DEFAULT NULL,
				LIN_is_taxable tinyint(1) DEFAULT 0,
				LIN_order int(10) DEFAULT 0,
				LIN_parent int(10) DEFAULT 0,
				LIN_type varchar(25) NOT NULL,
				LIN_total decimal(12,6) DEFAULT NULL,
				LIN_pretax decimal(12,6) DEFAULT NULL,
				LIN_quantity int(10) DEFAULT NULL,
				OBJ_ID int(11) DEFAULT NULL,
				OBJ_type varchar(45) DEFAULT NULL,
				LIN_timestamp datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
				PRIMARY KEY  (LIN_ID)"
        );
        $this->_get_table_manager()->addIndex('esp_line_item', 'parent_order', 'LIN_parent,LIN_order');
        $this->_get_table_manager()->addIndex('esp_line_item', 'txn_type_timestamp', 'TXN_ID,LIN_type,LIN_timestamp');
        $this->_get_table_manager()->addIndex('esp_line_item', 'txn_obj_id_obj_type', 'TXN_ID,OBJ_ID,OBJ_type');
        $this->_get_table_manager()->addIndex('esp_line_item', 'obj_id_obj_type', 'OBJ_ID,OBJ_type');
        $this->_get_table_manager()->addIndex(
            'esp_line_item',
            'LIN_timestamp',
            'LIN_timestamp',
            TableAnalysis::INDEX_TYPE_INDEX,
            null,
            true
        );


        $this->_table_has_not_changed_since_previous(
            'esp_log',
            "LOG_ID int(11) NOT NULL AUTO_INCREMENT,
				LOG_time datetime DEFAULT NULL,
				OBJ_ID varchar(45) DEFAULT NULL,
				OBJ_type varchar(45) DEFAULT NULL,
				LOG_type varchar(45) DEFAULT NULL,
				LOG_message text,
				LOG_wp_user int(11) DEFAULT NULL,
				PRIMARY KEY  (LOG_ID)"
        );
        $this->_get_table_manager()->addIndex('esp_log', 'LOG_time', 'LOG_time');
        $this->_get_table_manager()->addIndex('esp_log', 'LOG_type', 'LOG_type');
        $this->_get_table_manager()->addIndex('esp_log', 'OBJ', 'OBJ_type,OBJ_ID');


        $this->_table_has_not_changed_since_previous(
            'esp_message',
            "MSG_ID bigint(20) unsigned NOT NULL AUTO_INCREMENT,
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
				MSG_created datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
				MSG_modified datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
				PRIMARY KEY  (MSG_ID)"
        );
        $this->_get_table_manager()->addIndex('esp_message', 'GRP_ID', 'GRP_ID');
        $this->_get_table_manager()->addIndex('esp_message', 'TXN_ID', 'TXN_ID');
        $this->_get_table_manager()->addIndex('esp_message', 'MSG_recipient_ID', 'MSG_recipient_ID');
        $this->_get_table_manager()->addIndex(
            'esp_message',
            'MSG_to',
            'MSG_to',
            TableAnalysis::INDEX_TYPE_INDEX,
            TableAnalysis::INDEX_COLUMN_SIZE
        );
        $this->_get_table_manager()->addIndex(
            'esp_message',
            'MSG_from',
            'MSG_from',
            TableAnalysis::INDEX_TYPE_INDEX,
            TableAnalysis::INDEX_COLUMN_SIZE
        );
        $this->_get_table_manager()->addIndex('esp_message', 'MSG_modified', 'MSG_modified');
        // $this->_get_table_manager()->dropIndex('esp_message', 'MSG_messenger');
        // $this->_get_table_manager()->dropIndex('esp_message', 'MSG_message_type');
        // $this->_get_table_manager()->dropIndex('esp_message', 'MSG_context');
        // $this->_get_table_manager()->dropIndex('esp_message', 'MSG_recipient_type');
        // $this->_get_table_manager()->dropIndex('esp_message', 'MSG_subject');
        // $this->_get_table_manager()->dropIndex('esp_message', 'MSG_created');
        // $this->_get_table_manager()->dropIndex('esp_message', 'MSG_priority');
        // $this->_get_table_manager()->dropIndex('esp_message', 'STS_ID');


        $this->_table_has_not_changed_since_previous(
            'esp_message_template',
            "MTP_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
				GRP_ID int(10) unsigned NOT NULL,
				MTP_context varchar(50) NOT NULL,
				MTP_template_field varchar(30) NOT NULL,
				MTP_content text NOT NULL,
				PRIMARY KEY  (MTP_ID)"
        );
        $this->_get_table_manager()->addIndex('esp_message_template', 'GRP_ID', 'GRP_ID');


        $this->_table_has_not_changed_since_previous(
            'esp_message_template_group',
            "GRP_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
				MTP_user_id int(10) NOT NULL DEFAULT '1',
				MTP_name varchar(245) NOT NULL DEFAULT '',
				MTP_description varchar(245) NOT NULL DEFAULT '',
				MTP_messenger varchar(30) NOT NULL,
				MTP_message_type varchar(50) NOT NULL,
				MTP_is_global tinyint(1) NOT NULL DEFAULT '0',
				MTP_is_override tinyint(1) NOT NULL DEFAULT '0',
				MTP_deleted tinyint(1) NOT NULL DEFAULT '0',
				MTP_is_active tinyint(1) NOT NULL DEFAULT '1',
				PRIMARY KEY  (GRP_ID)"
        );
        $this->_get_table_manager()->addIndex('esp_message_template_group', 'MTP_user_id', 'MTP_user_id');


        $this->_table_has_not_changed_since_previous(
            'esp_payment',
            "PAY_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
				TXN_ID int(10) unsigned DEFAULT NULL,
				STS_ID varchar(3) DEFAULT NULL,
				PAY_timestamp datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
				PAY_source varchar(45) DEFAULT NULL,
				PAY_amount decimal(12,3) DEFAULT NULL,
				PMD_ID int(11) DEFAULT NULL,
				PAY_gateway_response text,
				PAY_txn_id_chq_nmbr varchar(100) DEFAULT NULL,
				PAY_po_number varchar(100) DEFAULT NULL,
				PAY_extra_accntng varchar(100) DEFAULT NULL,
				PAY_details text,
				PAY_redirect_url varchar(300),
				PAY_redirect_args text,
				PRIMARY KEY  (PAY_ID)"
        );
        $this->_get_table_manager()->addIndex(
            'esp_payment',
            'PAY_timestamp',
            'PAY_timestamp',
            TableAnalysis::INDEX_TYPE_INDEX,
            null,
            true
        );
        $this->_get_table_manager()->addIndex('esp_payment', 'TXN_ID', 'TXN_ID');


        $this->_table_has_not_changed_since_previous(
            'esp_payment_method',
            "PMD_ID int(11) NOT NULL AUTO_INCREMENT,
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
				PRIMARY KEY  (PMD_ID)"
        );
        $this->_get_table_manager()->addIndex(
            'esp_payment_method',
            'PMD_slug_UNIQUE',
            'PMD_slug',
            TableAnalysis::INDEX_TYPE_UNIQUE
        );
        // $this->_get_table_manager()->dropIndex('esp_payment_method', 'PMD_type');


        $this->_table_is_changed_in_this_version(
            'esp_price',
            "PRC_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
				PRT_ID tinyint(3) unsigned NOT NULL,
				PRC_amount decimal(12,6) NOT NULL DEFAULT '0.00',
				PRC_name varchar(245) NOT NULL,
				PRC_desc text,
				PRC_is_default tinyint(1) unsigned NOT NULL DEFAULT '1',
				PRC_overrides int(10) unsigned DEFAULT NULL,
				PRC_deleted tinyint(1) unsigned NOT NULL DEFAULT '0',
				PRC_order tinyint(3) unsigned NOT NULL DEFAULT '0',
				PRC_wp_user bigint(20) unsigned NULL,
				PRC_parent int(10) unsigned DEFAULT 0,
				PRIMARY KEY  (PRC_ID)"
        );
        $this->_get_table_manager()->addIndex('esp_price', 'PRT_ID', 'PRT_ID');


        $this->_table_has_not_changed_since_previous(
            'esp_price_type',
            "PRT_ID tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
				PRT_name varchar(45) NOT NULL,
				PBT_ID tinyint(3) unsigned NOT NULL DEFAULT '1',
				PRT_is_percent tinyint(1) NOT NULL DEFAULT '0',
				PRT_order tinyint(2) unsigned NULL,
				PRT_wp_user bigint(20) unsigned NULL,
				PRT_deleted tinyint(1) NOT NULL DEFAULT '0',
				UNIQUE KEY PRT_name_UNIQUE (PRT_name),
				PRIMARY KEY  (PRT_ID)"
        );


        $this->_table_has_not_changed_since_previous(
            'esp_ticket_price',
            "TKP_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
				TKT_ID int(10) unsigned NOT NULL,
				PRC_ID int(10) unsigned NOT NULL,
				PRIMARY KEY  (TKP_ID)"
        );
        $this->_get_table_manager()->addIndex('esp_ticket_price', 'TKT_ID', 'TKT_ID');
        $this->_get_table_manager()->addIndex('esp_ticket_price', 'PRC_ID', 'PRC_ID');


        $this->_table_has_not_changed_since_previous(
            'esp_ticket_template',
            "TTM_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
				TTM_name varchar(45) NOT NULL,
				TTM_description text,
				TTM_file varchar(45),
				PRIMARY KEY  (TTM_ID)"
        );


        $this->_table_has_not_changed_since_previous(
            'esp_question',
            "QST_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
				QST_display_text text NOT NULL,
				QST_admin_label varchar(255) NOT NULL,
				QST_system varchar(25) DEFAULT NULL,
				QST_type varchar(25) NOT NULL DEFAULT 'TEXT',
				QST_required tinyint(1) unsigned NOT NULL DEFAULT 0,
				QST_required_text text NULL,
				QST_order tinyint(2) unsigned NOT NULL DEFAULT 0,
				QST_admin_only tinyint(1) NOT NULL DEFAULT 0,
				QST_max smallint(5) NOT NULL DEFAULT -1,
				QST_wp_user bigint(20) unsigned NULL,
				QST_deleted tinyint(2) unsigned NOT NULL DEFAULT 0,
				PRIMARY KEY  (QST_ID)"
        );
        // $this->_get_table_manager()->dropIndex('esp_question', 'QST_order');


        $this->_table_has_not_changed_since_previous(
            'esp_question_group',
            "QSG_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
				QSG_name varchar(255) NOT NULL,
				QSG_identifier varchar(100) NOT NULL,
				QSG_desc text NULL,
				QSG_order tinyint(2) unsigned NOT NULL DEFAULT 0,
				QSG_show_group_name tinyint(1) NOT NULL,
				QSG_show_group_desc tinyint(1) NOT NULL,
				QSG_system tinyint(2) NULL,
				QSG_deleted tinyint(1) unsigned NOT NULL DEFAULT 0,
				QSG_wp_user bigint(20) unsigned NULL,
				PRIMARY KEY  (QSG_ID)"
        );
        $this->_get_table_manager()->addIndex(
            'esp_question_group',
            'QSG_identifier_UNIQUE',
            'QSG_identifier',
            TableAnalysis::INDEX_TYPE_UNIQUE
        );
        // $this->_get_table_manager()->dropIndex('esp_question_group', 'QSG_order');


        $this->_table_has_not_changed_since_previous(
            'esp_question_group_question',
            "QGQ_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
				QSG_ID int(10) unsigned NOT NULL,
				QST_ID int(10) unsigned NOT NULL,
				QGQ_order int(10) unsigned NOT NULL DEFAULT 0,
				PRIMARY KEY  (QGQ_ID)"
        );
        $this->_get_table_manager()->addIndex('esp_question_group_question', 'QST_ID', 'QST_ID');
        // $this->_get_table_manager()->dropIndex('esp_question_group_question', 'QSG_ID_order');


        $this->_table_has_not_changed_since_previous(
            'esp_question_option',
            "QSO_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
				QSO_value varchar(255) NOT NULL,
				QSO_desc text NOT NULL,
				QST_ID int(10) unsigned NOT NULL,
				QSO_order int(10) unsigned NOT NULL DEFAULT 0,
				QSO_system varchar(25) DEFAULT NULL,
				QSO_deleted tinyint(1) unsigned NOT NULL DEFAULT 0,
				PRIMARY KEY  (QSO_ID)"
        );
        $this->_get_table_manager()->addIndex('esp_question_option', 'QST_ID', 'QST_ID');
        $this->_get_table_manager()->dropIndex('esp_question_option', 'QSO_order');


        $this->_table_has_not_changed_since_previous(
            'esp_registration',
            "REG_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
				EVT_ID bigint(20) unsigned NOT NULL,
				ATT_ID bigint(20) unsigned NOT NULL,
				TXN_ID int(10) unsigned NOT NULL,
				TKT_ID int(10) unsigned NOT NULL,
				STS_ID varchar(3) NOT NULL DEFAULT 'RPP',
				REG_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
				REG_final_price decimal(12,3) NOT NULL DEFAULT '0.00',
				REG_paid decimal(12,3) NOT NULL DEFAULT '0.00',
				REG_session varchar(45) NOT NULL,
				REG_code varchar(45) DEFAULT NULL,
				REG_url_link varchar(64) DEFAULT NULL,
				REG_count tinyint(2) unsigned DEFAULT '1',
				REG_group_size tinyint(2) unsigned DEFAULT '1',
				REG_att_is_going tinyint(1) DEFAULT '0',
				REG_deleted tinyint(1) DEFAULT '0',
				PRIMARY KEY  (REG_ID)"
        );
        $this->_get_table_manager()->addIndex('esp_registration', 'REG_url_link', 'REG_url_link');
        $this->_get_table_manager()->addIndex('esp_registration', 'REG_code', 'REG_code');
        // $this->_get_table_manager()->addIndex(
        //     'esp_registration',
        //     'REG_date',
        //     'REG_date',
        //     TableAnalysis::INDEX_TYPE_INDEX,
        //     null,
        //     true
        // );
        $this->_get_table_manager()->addIndex('esp_registration', 'TXN_ID', 'TXN_ID');
        $this->_get_table_manager()->addIndex('esp_registration', 'ATT_ID', 'ATT_ID');
        $this->_get_table_manager()->addIndex('esp_registration', 'TKT_ID', 'TKT_ID');
        $this->_get_table_manager()->addIndex('esp_registration', 'EVT_ID', 'EVT_ID');
        $this->_get_table_manager()->dropIndex('esp_registration', 'REG_deleted');
        // $this->_get_table_manager()->dropIndex('esp_registration', 'STS_ID');


        $this->_table_has_not_changed_since_previous(
            'esp_registration_payment',
            "RPY_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
					  REG_ID int(10) unsigned NOT NULL,
					  PAY_ID int(10) unsigned NULL,
					  RPY_amount decimal(12,3) NOT NULL DEFAULT '0.00',
					  PRIMARY KEY  (RPY_ID)"
        );
        $this->_get_table_manager()->addIndex('esp_registration_payment', 'REG_ID', 'REG_ID');
        $this->_get_table_manager()->addIndex('esp_registration_payment', 'PAY_ID', 'PAY_ID');


        $this->_table_has_not_changed_since_previous(
            'esp_state',
            "STA_ID smallint(5) unsigned NOT NULL AUTO_INCREMENT,
				CNT_ISO varchar(2) NOT NULL,
				STA_abbrev varchar(24) NOT NULL,
				STA_name varchar(100) NOT NULL,
				STA_active tinyint(1) DEFAULT '1',
				PRIMARY KEY  (STA_ID)"
        );
        $this->_get_table_manager()->addIndex('esp_state', 'STA_abbrev', 'STA_abbrev');
        $this->_get_table_manager()->addIndex('esp_state', 'CNT_ISO', 'CNT_ISO');


        $this->_table_has_not_changed_since_previous(
            'esp_status',
            "STS_ID varchar(3) NOT NULL,
				STS_code varchar(45) NOT NULL,
				STS_type varchar(45) NOT NULL,
				STS_can_edit tinyint(1) NOT NULL DEFAULT 0,
				STS_desc tinytext,
				STS_open tinyint(1) NOT NULL DEFAULT 1,
				PRIMARY KEY  (STS_ID)"
        );
        $this->_get_table_manager()->addIndex('esp_status', 'STS_type', 'STS_type');
        $this->_get_table_manager()->dropIndex('esp_status', 'STS_ID_UNIQUE');


        $this->_table_is_changed_in_this_version(
            'esp_ticket',
            "TKT_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
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
				TKT_price decimal(12,3) NOT NULL DEFAULT '0.00',
				TKT_start_date datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
				TKT_end_date datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
				TKT_taxable tinyint(1) unsigned NOT NULL DEFAULT '0',
				TKT_order tinyint(3) unsigned NOT NULL DEFAULT '0',
				TKT_row tinyint(3) unsigned NOT NULL DEFAULT '0',
				TKT_is_default tinyint(1) unsigned NOT NULL DEFAULT '0',
				TKT_reverse_calculate tinyint(1) unsigned NOT NULL DEFAULT '0',
				TKT_wp_user bigint(20) unsigned NULL,
				TKT_parent int(10) unsigned DEFAULT '0',
				TKT_deleted tinyint(1) NOT NULL DEFAULT '0',
				TKT_visibility smallint(6) unsigned NOT NULL DEFAULT 100,
				PRIMARY KEY  (TKT_ID)"
        );
        $this->_get_table_manager()->addIndex('esp_ticket', 'TKT_start_date', 'TKT_start_date');
        // $this->_get_table_manager()->addIndex('esp_ticket', 'TKT_end_date', 'TKT_end_date');


        $this->_table_has_not_changed_since_previous(
            'esp_transaction',
            "TXN_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
				TXN_timestamp datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
				TXN_total decimal(12,3) DEFAULT '0.00',
				TXN_paid decimal(12,3) NOT NULL DEFAULT '0.00',
				STS_ID varchar(3) NOT NULL DEFAULT 'TOP',
				TXN_session_data text,
				TXN_hash_salt varchar(250) DEFAULT NULL,
				PMD_ID int(11) DEFAULT NULL,
				TXN_reg_steps text,
				PRIMARY KEY  (TXN_ID)"
        );
        $this->_get_table_manager()->addIndex(
            'esp_transaction',
            'TXN_timestamp',
            'TXN_timestamp',
            TableAnalysis::INDEX_TYPE_INDEX,
            null,
            true
        );
        // $this->_get_table_manager()->dropIndex('esp_transaction', 'STS_ID');


        $this->_table_has_not_changed_since_previous(
            'esp_venue_meta',
            'VNUM_ID int(11) NOT NULL AUTO_INCREMENT,
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
			VNU_enable_for_gmap tinyint(1) DEFAULT 0,
			VNU_google_map_link varchar(255) DEFAULT NULL,
			PRIMARY KEY  (VNUM_ID)'
        );
        $this->_get_table_manager()->addIndex('esp_venue_meta', 'VNU_ID', 'VNU_ID');
        $this->_get_table_manager()->addIndex('esp_venue_meta', 'STA_ID', 'STA_ID');
        $this->_get_table_manager()->addIndex('esp_venue_meta', 'CNT_ISO', 'CNT_ISO');


        $this->previous_dms->insert_default_data();
        $LegacyTextDomainOptions = new LegacyTextDomainOptions();
        $LegacyTextDomainOptions->convertToConsolidatedFormat();
        return true;
    }


    /**
     * @return bool
     */
    public function schema_changes_after_migration(): bool
    {
        return true;
    }


    public function migration_page_hooks()
    {
    }
}
