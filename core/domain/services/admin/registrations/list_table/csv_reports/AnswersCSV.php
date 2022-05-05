<?php

namespace EventEspresso\core\domain\services\admin\registrations\list_table\csv_reports;

use EE_Error;
use EEH_Export;
use EEM_Answer;
use EEM_Question;
use EEM_State;

/**
 * Class Answers
 * Add question / answer columns to the CSV row
 *
 * @author  Hossein Rafiei
 * @package EventEspresso\core\domain\services\admin\registrations\list_table\csv_reports
 */
class AnswersCSV
{

    /**
     * Add question / answer columns to the CSV row
     *
     * @param array $reg_row
     * @param array $data
     * @param array $question_labels
     * @return mixed
     * @throws EE_Error
     */
    public static function addAnswerColumns(array $reg_row, $data, $question_labels)
    {
        // make sure each registration has the same questions in the same order
        foreach ($question_labels as $question_label) {
            if (! isset($data[ $question_label ])) {
                $data[ $question_label ] = null;
            }
        }
        $answers = EEM_Answer::instance()->get_all_wpdb_results([
            ['REG_ID' => $reg_row['Registration.REG_ID']],
            'force_join' => ['Question'],
        ]);
        // now fill out the questions THEY answered
        foreach ($answers as $answer_row) {
            if ($answer_row['Question.QST_system']) {
                // it's an answer to a system question. That was already displayed as part of the attendee
                // fields, so don't write it out again thanks.
                continue;
            }
            if ($answer_row['Question.QST_ID']) {
                $question_label = EEH_Export::prepare_value_from_db_for_display(
                    EEM_Question::instance(),
                    'QST_admin_label',
                    $answer_row['Question.QST_admin_label']
                );
            } else {
                $question_label = sprintf(esc_html__('Question $s', 'event_espresso'), $answer_row['Answer.QST_ID']);
            }
            if (
                isset($answer_row['Question.QST_type'])
                && $answer_row['Question.QST_type'] == EEM_Question::QST_type_state
            ) {
                $data[ $question_label ] = EEM_State::instance()->get_state_name_by_ID(
                    $answer_row['Answer.ANS_value']
                );
            } else {
                // this isn't for html, so don't show html entities
                $data[ $question_label ] = html_entity_decode(
                    EEH_Export::prepare_value_from_db_for_display(
                        EEM_Answer::instance(),
                        'ANS_value',
                        $answer_row['Answer.ANS_value']
                    )
                );
            }
        }
        return $data;
    }
}
