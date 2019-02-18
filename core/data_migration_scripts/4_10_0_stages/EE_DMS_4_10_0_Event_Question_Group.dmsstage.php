<?php

/**
 *
 * EE_DMS_4_10_0_Event_Question_Group
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
     */
    public function __construct()
    {
        global $wpdb;
        $this->_pretty_name = __('Event-Question Group Relations', 'event_espresso');
        $this->_old_table = $wpdb->prefix.'esp_event_question_group';
        $this->_extra_where_sql = "WHERE EQG_primary = 0 AND EQG_additional=0";
        parent::__construct();
    }


    /**
     * Removes the duplicate event_question_group rows that only had EQG_primary=0. Now we just have one row
     * joining event-to-question-groups with two columns: EQG_primary and EQG_additional, indicating which question
     * groups apply to which category of registrant.
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

    /**
     * Gets the rows for the existing table that shouldn't exist in 4.10.
     * Specifically the rows where EQG_primary=false and EQG_additional=false.
     * Gotcha: because the migration is REMOVING rows as it goes, we shouldn't use the offset.
     *
     * @global wpdb $wpdb
     * @param int   $limit
     * @return array of arrays like $wpdb->get_results($sql, ARRAY_A)
     */
    protected function _get_rows($limit)
    {
        global $wpdb;
        $query = "SELECT * FROM {$this->_old_table} {$this->_extra_where_sql} " . $wpdb->prepare(
            "LIMIT %d",
            $limit
        );
        return $wpdb->get_results($query, ARRAY_A);
    }

    /**
     * IMPORTANT: if an error is encountered, or everything is finished, this stage should update its status property
     * accordingly. Note: it should not alter the count of items migrated. That is done in the public function that
     * calls this. IMPORTANT: The count of items migrated should ONLY be less than $num_items_to_migrate when it's the
     * last migration step, otherwise it should always return $num_items_to_migrate. (Eg, if we're migrating attendees
     * rows from the database, and $num_items_to_migrate is set to 50, then we SHOULD actually migrate 50 rows,but at
     * very least we MUST report/return 50 items migrated)
     *
     * @param int $num_items
     * @return int number of items ACTUALLY migrated
     */
    public function _migration_step($num_items = 50)
    {
        // Count the items right away. This migration step will be removing those rows, so we need to count them
        // right away to get an accurate count.
        $this->count_records_to_migrate();
        $rows = $this->_get_rows($num_items);
        $items_actually_migrated = 0;
        foreach ($rows as $old_row) {
            $this->_migrate_old_row($old_row);
            $items_actually_migrated++;
        }
        if ($this->count_records_migrated() + $items_actually_migrated >= $this->count_records_to_migrate()) {
            $this->set_completed();
        }
        return $items_actually_migrated;
    }
}
