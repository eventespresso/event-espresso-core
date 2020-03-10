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
     * @todo This needs more research
     * @param string $version_array
     * @return boolean
     */
    public function can_migrate_from_version($version_array)
    {
        // $version_string = $version_array['Core'];
        // if (version_compare($version_string, '4.0.0.decaf', '>')) {
        //     return true;
        // }
        // return false;
    }

    /**
     * takes care of migrating this particular row from the OLD table to whatever its
     * representation is in the new database. If there are errors, use $this->add_error to log them. If there is a
     * fatal error which prevents all future migrations, throw an exception describing it
     *
     * @param array $old_row an associative array where keys are column names and values are their values.
     * @return null
     */
    protected function _migrate_old_row($old_row)
    {
        return null;
    }


    /**
     * Insert the new Confirm Email system field
     *
     * @access public
     * @static
     * @return void
     */
    public function schema_changes_after_migration()
    {
        global $wpdb;
        $question_table = $wpdb->prefix . "esp_question";
        if ($this->_get_table_analysis()->tableExists($question_table)) {
            // First checks if the field already exists
            $SQL_exists = "SELECT COUNT(*) FROM " . $question_table;
            $exists = $wpdb->get_var($SQL_exists);

            if ($exists == 0) {
                // It doesn't exist
                // Get the max QST_order
                $SQL_max = "SELECT MAX(QST_order) FROM " . $question_table;
                $max_order = $wpdb->get_var($SQL_max);

                // Insert using next order available
                $SQL_insert = "INSERT INTO " . $question_table . " (
                    QST_display_text, QST_admin_label, QST_system, QST_type,
                    QST_required, QST_required_text, QST_order, QST_admin_only,
                    QST_max, QST_wp_user, QST_deleted) VALUES
                    ('Confirm Email Address', 'Confirm Email Address', 'email_confirm',
                    'EMAIL_CONFIRM', 1, 'This field is required', 
                    " . ($max_order + 1) . ",	0,	-1,	1,	0);";
                $wpdb->query($SQL_insert);
            }
        }
    }
}
