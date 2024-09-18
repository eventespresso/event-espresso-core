<?php

/**
 * EE_DMS_4_6_0_question_types
 *
 * @package             Event Espresso
 * @subpackage
 * @author              Brent Christensen
 */
class EE_DMS_4_6_0_question_types extends EE_Data_Migration_Script_Stage_Table
{
    protected array $_question_type_conversions = [];


    public function __construct()
    {
        global $wpdb;
        $this->_pretty_name               = esc_html__('Question Types', 'event_espresso');
        $this->_old_table                 = $wpdb->prefix . 'esp_question';
        $this->_question_type_conversions = [
            'MULTIPLE' => 'CHECKBOX',
            'SINGLE'   => 'RADIO_BTN',
        ];
        // when fetching rows, because we automatically use a limit and offset
        // rows counted before migrating any rows, need to ALSO be counted after a bunch of rows were counted
        // so we need to include both the migrated rows as well as the non-migrated rows
        $QST_types_to_count     = array_merge(
            array_keys($this->_question_type_conversions),
            $this->_question_type_conversions
        );
        $this->_extra_where_sql = "WHERE QST_type IN ('" . implode("', '", $QST_types_to_count) . "')";
        parent::__construct();
    }


    /**
     * @param array $old_row an associative array where keys are column names and values are their values.
     * @return void
     */
    protected function _migrate_old_row($old_row)
    {
        global $wpdb;
        if ($old_row['QST_ID'] && isset($this->_question_type_conversions[ $old_row['QST_type'] ])) {
            $success = $wpdb->update(
                $this->_old_table,
                ['QST_type' => $this->_question_type_conversions[ $old_row['QST_type'] ]],   // data
                ['QST_ID' => $old_row['QST_ID']],                                            // where
                ['%s'],                                                                      // data format
                ['%d']                                                                       // where format
            );
            if (! $success) {
                $this->add_error(
                    sprintf(
                        esc_html__(
                            'Could not update question type %1$s for question ID=%2$d because "%3$s"',
                            'event_espresso'
                        ),
                        wp_json_encode($old_row['QST_type']),
                        $old_row['QST_ID'],
                        $wpdb->last_error
                    )
                );
            }
        }
    }
}
