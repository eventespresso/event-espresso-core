<?php

/**
 *
 * EE_DMS_4_9_0_Email_System_Question
 *
 * @package         Event Espresso
 * @subpackage
 * @author              Brent Christensen
 *
 */
class EE_DMS_4_9_0_Email_System_Question extends EE_Data_Migration_Script_Stage_Table
{
    /**
     * Just initializes the status of the migration
     *
     * @return EE_DMS_4_9_0_Email_System_Question
     */
    public function __construct()
    {
        global $wpdb;
        $this->_pretty_name = esc_html__('Email - System Question', 'event_espresso');
        $this->_old_table = $wpdb->prefix . 'esp_question';
        $this->_extra_where_sql = "WHERE QST_system = 'email'";
        parent::__construct();
    }



    /**
     * updates the question with the new question type
     * @param array $question an associative array where keys are column names and values are their values.
     * @return null
     */
    protected function _migrate_old_row($question)
    {
        if ($question['QST_ID'] && $question['QST_system'] == 'email') {
            global $wpdb;
            $success = $wpdb->update(
                $this->_old_table,
                array( 'QST_type' => 'EMAIL' ),  // data
                array( 'QST_ID' => $question['QST_ID'] ),  // where
                array( '%s' ),   // data format
                array( '%d' )  // where format
            );
            if (! $success) {
                $this->add_error(
                    sprintf(
                        esc_html__('Could not update question system name "%1$s" for question ID=%2$d because "%3$s"', 'event_espresso'),
                        wp_json_encode($question['QST_system']),
                        $question['QST_ID'],
                        $wpdb->last_error
                    )
                );
            }
        }
    }
}
