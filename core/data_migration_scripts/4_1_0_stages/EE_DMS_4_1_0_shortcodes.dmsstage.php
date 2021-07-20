<?php

/**
 * Goes through all the posts and pages, and converts old shortcodes to new ones

*/

class EE_DMS_4_1_0_shortcodes extends EE_Data_Migration_Script_Stage
{
    public function __construct()
    {
        global $wpdb;
        $this->_pretty_name = esc_html__("Shortcodes", "event_espresso");
        $this->_old_table = $wpdb->posts;
        parent::__construct();
    }
    protected function _migrate_old_row($old_row)
    {
        $new_post_content = $this->_change_event_list_shortcode($old_row['post_content']);
        global $wpdb;
        $wpdb->query($wpdb->prepare("UPDATE " . $this->_old_table . " SET post_content=%s WHERE ID=%d", $new_post_content, $old_row['ID']));
    }

    /**
     * replaces [EVENT_LIST... with [ESPRESSO_EVENTS...]
     * @param string $old_content
     */
    private function _change_event_list_shortcode($old_content)
    {
        return str_replace("[EVENT_LIST", "[ESPRESSO_EVENTS", $old_content);
    }

    public function _migration_step($num_items = 50)
    {
        global $wpdb;
        $start_at_record = $this->count_records_migrated();
        $rows = $wpdb->get_results($wpdb->prepare("SELECT * FROM $this->_old_table {$this->_sql_to_only_select_non_drafts()} LIMIT %d,%d", $start_at_record, $num_items), ARRAY_A);
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
    public function _count_records_to_migrate()
    {
        global $wpdb;
        $count = $wpdb->get_var("SELECT COUNT(id) FROM " . $this->_old_table . $this->_sql_to_only_select_non_drafts());
        return $count;
    }

    private function _sql_to_only_select_non_drafts()
    {
        return " WHERE post_type NOT IN ('revision','auto-draft','attachment','nav_menu_item') ";
    }
}
