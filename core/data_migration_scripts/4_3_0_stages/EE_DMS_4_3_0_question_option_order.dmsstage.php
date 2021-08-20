<?php

/**
 * Populates the QSO_order  (introduced in this version, 4.3.0).
 * Order for now is just set to whatever the id of the question option is (because that will preserve existing order).
*/

class EE_DMS_4_3_0_question_option_order extends EE_Data_Migration_Script_Stage_Table
{
    public function __construct()
    {
        global $wpdb;
        $this->_pretty_name = esc_html__("Question Options", "event_espresso");
        $this->_old_table = $wpdb->prefix . "esp_question_option";
        parent::__construct();
    }
    protected function _migrate_old_row($old_row)
    {
        // foreach question_group_question entry with this QST_ID, we want to set its
        // QSG_order equal to this question's QST_order
        global $wpdb;
        $updated = $wpdb->update(
            $this->_old_table,
            array('QSO_order' => $old_row['QSO_ID']),
            array('QSO_ID' => $old_row['QSO_ID']),
            array('%d',// QSO_order
                    ),
            array('%d',// QSO_ID
                    )
        );
        if (false === $updated) {
            $this->add_error(
                sprintf(
                    esc_html__(
                        "Error in updating table %s setting QSO_order = %d where QSO_ID = %d",
                        'event_espresso'
                    ),
                    $this->_old_table,
                    $old_row['QSO_ID'],
                    $old_row['QSO_ID']
                )
            );
        }
    }
}
