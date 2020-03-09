<?php

/**
 *
 * EE_DMS_4_10_0_Confirm_Email
 *
 * @package         Event Espresso
 * @subpackage
 * @author              Brent Christensen
 *
 */
class EE_DMS_4_10_0_Confirm_Email extends EE_Data_Migration_Script_Stage_Table
{


    /**
     * Just initializes the status of the migration
     */
    public function __construct()
    {
        $this->_pretty_name = __('Confirm Email', 'event_espresso');
        parent::__construct();
    }


    /**
     * Add the new system field to be available for end users
     * 
     * @param int $num_items
     * @return int number of items ACTUALLY migrated
     */
    public function _migration_step($num_items = 50)
    {
        $this->insert_confirm_email_system_field();
        return 1;
    }


    /**
     * insert_confirm_email_system_field
     *
     * @access public
     * @static
     * @return void
     */
    public function insert_confirm_email_system_field()
    {
        global $wpdb;
        $question_table = $wpdb->prefix . "esp_question";
        if ($this->_get_table_analysis()->tableExists($question_table)) {

            // First checks if the field already exists
            $SQL_exists = "SELECT COUNT(*) FROM " . $question_table;
            $exists = $wpdb->get_var($$SQL_exists);

            if ($exists == 0) {
                // It doesn't exist
                // Get the max QST_order
                $SQL_max = "SELECT MAX(QST_order) FROM " . $question_table;
                $max_order = $wpdb->get_var($SQL_max);

                // Insert using next order available
                $SQL_insert = "INSERT INTO " . $question_table . " (
                    QST_display_text, QST_admin_label, QST_system, QST_type, QST_required, QST_required_text, QST_order, QST_admin_only, QST_max, QST_wp_user, QST_deleted) VALUES
                    ('Confirm Email Address',	'Confirm Email Address',	'emailc',	'EMAIL_CONFIRM',	1,	'This field is required',	" . ($max_order + 1) . ",	0,	-1,	1,	0);";
                $wpdb->query($SQL_insert);
            }
        }
    }

}
