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
class EE_DMS_4_10_0_Event_Question_Group extends EE_Data_Migration_Script_Stage_Table
{



    /**
     * Just initializes the status of the migration
     *
     * @return EE_DMS_4_9_0_Email_System_Question
     */
    public function __construct()
    {
        global $wpdb;
        $this->_pretty_name = __('Event-Question Group Relations', 'event_espresso');
        $this->_old_table = $wpdb->prefix.'esp_event_question_group';
        $this->_extra_where_sql = "WHERE EQG_primary = 0";
        parent::__construct();
    }



    /**
     * updates the question with the new question type
     * @param array $event_question_group an associative array where keys are column names and values are their values.
     * @return null
     */
    protected function _migrate_old_row($event_question_group)
    {
        if (isset($event_question_group['EVT_ID'], $event_question_group['QSG_ID'])) {
            global $wpdb;
            $success = $wpdb->update(
                $this->_old_table,
                ['EQG_additional' => true],  // data
                [
                    'EVT_ID' => $event_question_group['EVT_ID'],
                    'QSG_ID' => $event_question_group['QSG_ID']
                ],  // where
                array( '%d' ),   // data format
                array( '%d', '%d' )  // where format
            );
            if (! $success) {
                $this->add_error(
                    sprintf(
                        __('Could not update event-question group relation for event "%1$s" and question group "%2$s" because "%3$s"', 'event_espresso'),
                        $event_question_group['EVT_ID'],
                        $event_question_group['QSG_ID'],
                        $wpdb->last_error
                    )
                );
            }
            // and delete the old row
            $successful_delete = $wpdb->delete(
                $this->_old_table,
                [
                    'EQG_ID' => $event_question_group['EQG_ID']
                ],
                ['%d']
            );
            if (! $successful_delete) {
                $this->add_error(
                    sprintf(
                        __('Could not delete old event-question group relation row "%1$s" because "%2$s"', 'event_espresso'),
                        wp_json_encode($event_question_group),
                        $wpdb->last_error
                    )
                );
            }
        }
    }
}
