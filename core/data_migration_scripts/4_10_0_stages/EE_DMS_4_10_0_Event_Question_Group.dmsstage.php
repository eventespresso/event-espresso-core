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
            // If the question group was also for primary attendees, we should just update that row.
            // And we delete this row.
            $success = $wpdb->update(
                $this->_old_table,
                ['EQG_additional' => true],  // data
                [
                    'EQG_primary' => true,
                    'EVT_ID' => $event_question_group['EVT_ID'],
                    'QSG_ID' => $event_question_group['QSG_ID']
                ],  // where
                array( '%d' ),   // data format
                array( '%d', '%d', '%d' )  // where format
            );
            if ($success) {
                // Ok it's confirmed: the question group WAS for the primary attendee group too. So
                // now we just need to delete this row.
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
            } else {
                // Oh, the question group actually was NOT for the primary attendee. So we just need to update this row
                $wpdb->update(
                    $this->_old_table,
                    ['EQG_additional' => true],  // data
                    [
                        'EVT_ID' => $event_question_group['EVT_ID'],
                        'QSG_ID' => $event_question_group['QSG_ID']
                    ],  // where
                    array( '%d' ),   // data format
                    array( '%d', '%d', '%d' )  // where format
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
     * Slight departure from the normal procedure here: because this removes rows from the DB, we need to ensure
     * we count the records first, then do the migration.
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
