<?php

/**
 * Links up 4.1 questions and question groups according to how they were linked in 3.1
 * For references,
 * old question group rel table looked like
 * CREATE TABLE `wp_events_qst_group_rel` (
 * `id` int(11) NOT NULL AUTO_INCREMENT,
 * `group_id` int(11) NOT NULL,
 * `question_id` int(11) NOT NULL,
 * PRIMARY KEY (`id`),
 * KEY `group_id` (`group_id`),
 * KEY `question_id` (`question_id`)
 * ) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8$$
 * 4.1 question group question model's tables and fields:
 * $this->_tables = array(
 * 'Question_Group_Question'=>new EE_Primary_Table('esp_question_group_question','QGQ_ID')
 * );
 * $this->_fields = array(
 * 'Question_Group_Question'=>array(
 * 'QGQ_ID'=>new EE_Primary_Key_Int_Field('QGQ_ID', esc_html__('Question Group to Question Link ID','event_espresso')),
 * 'QSG_ID'=>new EE_Foreign_Key_Int_Field('QSG_ID', esc_html__('Question Group ID','event_espresso'), false, 0,
 * 'Question_Group'),
 * 'QST_ID'=>new EE_Foreign_Key_Int_Field('QST_ID', esc_html__('Question Id','event_espresso'), false, 0, 'Question')
 * )
 * );
 */
class EE_DMS_4_1_0_question_group_question extends EE_Data_Migration_Script_Stage
{
    public function __construct()
    {
        global $wpdb;
        $this->_old_table   = $wpdb->prefix . "events_qst_group_rel";
        $this->_new_table   = $wpdb->prefix . "esp_question_group_question";
        $this->_pretty_name = esc_html__("Question Group to Question Relations", "event_espresso");
        parent::__construct();
    }


    /**
     * @throws EE_Error
     */
    public function _migration_step($num_items_to_migrate = 50)
    {
        global $wpdb;
        $start_at_record         = $this->count_records_migrated();
        $rows                    = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT * FROM $this->_old_table LIMIT %d,%d",
                $start_at_record,
                $num_items_to_migrate
            ),
            ARRAY_A
        );
        $items_actually_migrated = 0;
        foreach ($rows as $question_group_question) {
            $this->_insert_new_question_group_question($question_group_question);
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
        return $wpdb->get_var("SELECT COUNT(id) FROM " . $this->_old_table);
    }


    /**
     * Attempts to insert a new question group in the new format given an old one
     *
     * @param array $old_question_group_question
     * @return void
     * @throws EE_Error
     * @global wpdb $wpdb
     */
    private function _insert_new_question_group_question(array $old_question_group_question): void
    {
        global $wpdb;
        $new_question_id       = $this->get_migration_script()->get_mapping_new_pk(
            $wpdb->prefix . "events_question",
            $old_question_group_question['question_id'],
            $wpdb->prefix . "esp_question"
        );
        $new_question_group_id = $this->get_migration_script()->get_mapping_new_pk(
            $wpdb->prefix . "events_qst_group",
            $old_question_group_question['group_id'],
            $wpdb->prefix . "esp_question_group"
        );
        if (! $new_question_id) {
            $this->add_error(
                sprintf(
                    esc_html__("Could not find 4.1 question id for 3.1 question #%d.", "event_espresso"),
                    $old_question_group_question['question_id']
                )
            );
            return;
        }
        if (! $new_question_group_id) {
            $this->add_error(
                sprintf(
                    esc_html__("Could not find 4.1 question group id for 3.1 question group #%d.", "event_espresso"),
                    $old_question_group_question['group_id']
                )
            );
            return;
        }
        // if it's a system question, it needs to be in the right system group. otherwise no dice!
        if (
            ($this->_is_system_question_group($new_question_group_id) ==
             $this->_is_system_question_for_question_group($new_question_id)) ||
            ! $this->_is_system_question_for_question_group($new_question_id)
        ) {
            $cols_n_values = [
                'QSG_ID' => $new_question_group_id,
                'QST_ID' => $new_question_id,
            ];
            $data_types    = [
                '%d',// QSG_ID
                '%d',// QST_ID
            ];
            $success       = $wpdb->insert($this->_new_table, $cols_n_values, $data_types);
            if (! $success) {
                $this->add_error(
                    $this->get_migration_script()->_create_error_message_for_db_insertion(
                        $this->_old_table,
                        $old_question_group_question,
                        $this->_new_table,
                        $cols_n_values,
                        $data_types
                    )
                );
            }
        }
    }


    /**
     * If this question is a system question, returns the QSG_system number that
     * indicates the question group its permitted in.
     *
     * @param int   $new_question_id
     * @return int
     * @global wpdb $wpdb
     */
    private function _is_system_question_for_question_group(int $new_question_id): int
    {
        global $wpdb;
        $system_id = $wpdb->get_var(
            $wpdb->prepare(
                "SELECT QST_system FROM " . $wpdb->prefix . "esp_question WHERE QST_ID=%d",
                $new_question_id
            )
        );
        if (in_array($system_id, ['fname', 'lname', 'email'])) {
            return 1;
        }
        if ($system_id != '' && $system_id) {
            return 2;
        }
        return 0;
    }


    /**
     * Returns the question group's QSG_system value (1 meaning personal info, 2
     * being address info, and 0 being neither)
     *
     * @param int   $new_question_group_id
     * @return int
     * @global wpdb $wpdb
     */
    private function _is_system_question_group(int $new_question_group_id): int
    {
        global $wpdb;
        return (int) $wpdb->get_var(
            $wpdb->prepare(
                "SELECT QSG_system FROM " . $wpdb->prefix . "esp_question_group WHERE QSG_ID=%d",
                $new_question_group_id
            )
        );
    }
}
