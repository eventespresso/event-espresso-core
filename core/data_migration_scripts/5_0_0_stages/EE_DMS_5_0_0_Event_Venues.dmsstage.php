<?php

/**
 *
 * EE_DMS_4_12_0_Event_Venues
 * Copies Venue IDs from `wp_esp_event_venue` to `wp_esp_event_meta` for each Event
 *
 * @package     Event Espresso
 * @subpackage
 * @author      Brent Christensen
 *
 */
class EE_DMS_4_12_0_Event_Venues extends EE_Data_Migration_Script_Stage_Table
{
    /**
     * @var string
     */
    private $_event_meta;


    /**
     * Just initializes the status of the migration
     */
    public function __construct()
    {
        global $wpdb;
        $this->_pretty_name = esc_html__('Event Venue Relations', 'event_espresso');
        $this->_old_table   = $wpdb->prefix . 'esp_event_venue';
        $this->_event_meta  = $wpdb->prefix . 'esp_event_meta';
        parent::__construct();
    }


    /**
     * Copies Venue IDs from `wp_esp_event_venue` to `wp_esp_event_meta` for each Event
     *
     * @param array $old_row an associative array where keys are column names and values are their values.
     * @return null
     */
    protected function _migrate_old_row($old_row): ?bool
    {
        $EVT_ID =
            isset($old_row['EVT_ID'])
                ? absint($old_row['EVT_ID'])
                : 0;
        $VNU_ID =
            isset($old_row['VNU_ID'])
                ? absint($old_row['VNU_ID'])
                : 0;
        if ($EVT_ID && $VNU_ID) {
            global $wpdb;
            // If the question group was also for primary attendees, we should just update that row.
            // And we delete this row.
            $result = $wpdb->update(
                $this->_event_meta,
                ['VNU_ID' => $VNU_ID],  // data
                ['EVT_ID' => $EVT_ID],  // where
                ['%d'],                 // data format
                ['%d']                  // where format
            );
            return filter_var($result, FILTER_VALIDATE_BOOLEAN);
        }
        return false;
    }
}
