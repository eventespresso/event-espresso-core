<?php

/**
 * EE_DMS_4_6_0_state_system_question
 *
 * @package             Event Espresso
 * @subpackage
 * @author              Brent Christensen
 */
class EE_DMS_4_6_0_state_system_question extends EE_Data_Migration_Script_Stage_Table
{
    public function __construct()
    {
        global $wpdb;
        $this->_pretty_name     = esc_html__('State - System Question', 'event_espresso');
        $this->_old_table       = $wpdb->prefix . 'esp_question';
        $this->_extra_where_sql = "WHERE QST_system = 'state'";
        parent::__construct();
    }


    /**
     * updates the question with the new question type
     *
     * @param array $old_row an associative array where keys are column names and values are their values.
     * @return void
     */
    protected function _migrate_old_row($old_row)
    {
        if ($old_row['QST_ID'] && $old_row['QST_system'] == 'state') {
            global $wpdb;
            $success = $wpdb->update(
                $this->_old_table,
                ['QST_type' => 'STATE'],            // data
                ['QST_ID' => $old_row['QST_ID']],  // where
                ['%s'],                             // data format
                ['%d']                              // where format
            );
            if (! $success) {
                $this->add_error(
                    sprintf(
                        esc_html__(
                            'Could not update question system name "%1$s" for question ID=%2$d because "%3$s"',
                            'event_espresso'
                        ),
                        wp_json_encode($old_row['QST_system']),
                        $old_row['QST_ID'],
                        $wpdb->last_error
                    )
                );
            }
        }
    }
}
