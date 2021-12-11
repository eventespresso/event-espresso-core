<?php

/**
 * EE_DMS_4_12_0_Create_Default_Form_Sections
 *
 * @package     Event Espresso
 * @subpackage  core/data_migration_scripts/4_12_0_stages/
 * @author      Brent Christensen
 */
class EE_DMS_4_12_0_Create_Default_Form_Sections extends EE_Data_Migration_Script_Stage_Table
{

    // tables

    /**
     * @var string
     */
    protected $datetime_table;

    /**
     * @var string
     */
    protected $event_meta_table;

    /**
     * @var string
     */
    protected $event_question_group_table;

    /**
     * @var string
     */
    protected $question_group_table;

    // clauses

    /**
     * @var string
     */
    protected $event_datetime_join_clause;

    /**
     * @var string
     */
    protected $event_question_group_join_clause;

    /**
     * @var string
     */
    protected $group_by_clause;


    /**
     * Just initializes the status of the migration EE_DMS_4_12_0_Create_Default_Form_Sections
     */
    public function __construct()
    {
        $this->_pretty_name = esc_html__('Create Default Form Sections', 'event_espresso');
        // tables
        global $wpdb;
        $this->datetime_table             = $wpdb->prefix . 'esp_datetime';
        $this->event_meta_table           = $wpdb->prefix . 'esp_event_meta';
        $this->event_question_group_table = $wpdb->prefix . 'esp_event_question_group';
        $this->question_group_table       = $wpdb->prefix . 'esp_question_group';
        $this->_old_table                 = $this->event_question_group_table;
        // plus $wpdb->posts for events

        // join clauses
        $this->event_datetime_join_clause       = " JOIN {$this->datetime_table}";
        $this->event_datetime_join_clause       .= " ON {$wpdb->posts}.`ID` = {$this->datetime_table}.`EVT_ID`";
        $this->event_question_group_join_clause = " JOIN {$this->event_question_group_table}";
        $this->event_question_group_join_clause .= " ON {$wpdb->posts}.`ID` = {$this->event_question_group_table}.`EVT_ID`";

        // where clauses
        $this->_extra_where_sql = " WHERE {$this->datetime_table}.`DTT_EVT_start` > CURRENT_TIMESTAMP";
        $this->_extra_where_sql .= " AND {$wpdb->posts}.`post_type` = 'espresso_events'";
        $this->_extra_where_sql .= " AND {$wpdb->posts}.`post_status` = 'publish'";
        $this->_extra_where_sql .= " AND {$this->datetime_table}.`DTT_deleted` = 0";
        $this->group_by_clause  = " GROUP BY {$wpdb->posts}.`ID`";
        parent::__construct();
    }


    /**
     * SELECT `wp_posts`.`ID` FROM `wp_posts`
     * JOIN `wp_esp_datetime` ON `wp_posts`.`ID` = `wp_esp_datetime`.`EVT_ID`
     * WHERE `wp_esp_datetime`.`DTT_EVT_start` > CURRENT_TIMESTAMP
     * AND `wp_posts`.`post_type` = 'espresso_events'
     * AND `wp_posts`.`post_status` = 'publish'
     * AND `wp_esp_datetime`.`DTT_deleted` = 0
     * GROUP BY `wp_posts`.`ID`
     * LIMIT 50;
     *
     * @return array of arrays like $wpdb->get_results($sql, ARRAY_A)
     * @global wpdb $wpdb
     */
    protected function getUpcomingEvents(): array
    {
        global $wpdb;
        $SQL = <<<QUERY
SELECT {$wpdb->posts}.`ID` FROM {$wpdb->posts}
JOIN {$this->datetime_table} ON {$wpdb->posts}.`ID` = {$this->datetime_table}.`EVT_ID`
WHERE {$this->datetime_table}.`DTT_EVT_start` > CURRENT_TIMESTAMP
AND {$wpdb->posts}.`post_type` = 'espresso_events'
AND {$wpdb->posts}.`post_status` = 'publish'
AND {$this->datetime_table}.`DTT_deleted` = 0
GROUP BY {$wpdb->posts}.`ID`
QUERY;
        return $wpdb->get_results($SQL, ARRAY_A);
    }


    /**
     * SELECT * FROM `wp_esp_event_question_group`
     * JOIN `wp_esp_question_group` ON `wp_esp_event_question_group`.`QSG_ID` = `wp_esp_question_group`.`QSG_ID`
     * WHERE `wp_esp_event_question_group`.`EVT_ID` IN (1, 2, 3, ...);
     *
     * @param array $EVT_IDs
     * @param int   $limit
     * @return array of arrays like $wpdb->get_results($sql, ARRAY_A)
     * @global wpdb $wpdb
     */
    protected function getEventQuestionGroups(array $EVT_IDs, int $limit): array
    {
        // remove invalid event ids
        $EVT_IDs = array_filter($EVT_IDs, 'absint');
        // generate array of same length but filled with placeholders
        $placeholders = array_fill(0, count($EVT_IDs), '%d');
        // convert to string
        $placeholders = implode(', ', $placeholders);
        global $wpdb;
        $SQL  = <<<QUERY
SELECT * FROM {$this->event_question_group_table}
JOIN {$this->question_group_table} ON {$this->event_question_group_table}.`QSG_ID` = {$this->question_group_table}.`QSG_ID`
WHERE {$this->event_question_group_table}.`EVT_ID` IN ({$placeholders})
LIMIT %d;
QUERY;
        $args = $EVT_IDs;
        array_push($args, $limit);
        return $wpdb->get_results($wpdb->prepare($SQL, $args), ARRAY_A);
    }


    /**
     * SELECT `wp_posts`.`ID`, `wp_esp_event_question_group`.`EQG_primary`, `wp_esp_event_question_group`.`EQG_additional`
     * FROM `wp_posts`,
     * JOIN `wp_esp_event_question_group` ON `wp_posts`.`ID` = `wp_esp_event_question_group`.`EVT_ID`
     * JOIN `wp_esp_datetime` ON `wp_posts`.`ID` = `wp_esp_datetime`.`EVT_ID`
     * WHERE `wp_esp_datetime`.`DTT_EVT_start` > CURRENT_TIMESTAMP
     * AND `wp_posts`.`post_type` = 'espresso_events'
     * AND `wp_posts`.`post_status` = 'publish'
     * AND `wp_esp_datetime`.`DTT_deleted` = 0
     * GROUP BY `wp_posts`.`ID`;
     *
     * @param int   $limit
     * @return array of arrays like $wpdb->get_results($sql, ARRAY_A)
     * @global wpdb $wpdb
     */
    protected function _get_rows($limit)
    {
        global $wpdb;
        $query = "SELECT {$wpdb->posts}.`ID`";
        $query .= ", {$wpdb->event_question_group_table}.`EQG_primary`";
        $query .= ", {$wpdb->event_question_group_table}.`EQG_additional`";
        $query .= " FROM {$wpdb->posts}";
        $query .= $this->event_datetime_join_clause;
        $query .= $this->event_question_group_join_clause;
        $query .= $this->_extra_where_sql;
        $query .= $this->group_by_clause;
        $query .= ' LIMIT %d';
        return $wpdb->get_results($wpdb->prepare($query, $limit), ARRAY_A);
    }


    /**
     * Removes the duplicate event_question_group rows that only had EQG_primary=0. Now we just have one row
     * joining event-to-question-groups with two columns: EQG_primary and EQG_additional, indicating which question
     * groups apply to which category of registrant.
     *
     * @param array $old_row an associative array where keys are column names and values are their values.
     * @return void
     */
    protected function _migrate_old_row($old_row)
    {
        \EEH_Debug_Tools::printr($old_row, '$old_row', __FILE__, __LINE__);
    }
}
