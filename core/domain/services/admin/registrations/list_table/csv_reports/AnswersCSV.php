<?php

namespace EventEspresso\core\domain\services\admin\registrations\list_table\csv_reports;

use EE_Error;
use EEH_Export;
use EEM_Answer;
use EEM_Question;
use EEM_State;
use ReflectionException;

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
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function addAnswerColumns(array $reg_row, array $data, array $question_labels): array
    {
        $answer_model = EEM_Answer::instance();
        $qst_model = EEM_Question::instance();
        $state_model = EEM_State::instance();
        // make sure each registration has the same questions in the same order
        foreach ($question_labels as $question_label) {
            if (! isset($data[ $question_label ])) {
                $data[ $question_label ] = null;
            }
        }
        $answers = $answer_model->get_all_wpdb_results([
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

            $question_label = $answer_row['Question.QST_ID']
                ? EEH_Export::prepare_value_from_db_for_display(
                    $qst_model,
                    'QST_admin_label',
                    $answer_row['Question.QST_admin_label']
                )
                : sprintf(esc_html__('Question $s', 'event_espresso'), $answer_row['Answer.QST_ID']);

            if (! array_key_exists($question_label, $data)) {
                // We don't need an answer for this specific question in the current dataset
                // so skip adding this value to $data.
                continue;
            }

            $data[ $question_label ] = isset($answer_row['Question.QST_type'])
                                       && $answer_row['Question.QST_type'] === EEM_Question::QST_type_state
                ? $state_model->get_state_name_by_ID((int) $answer_row['Answer.ANS_value'])
                // this isn't for html, so don't show html entities
                : html_entity_decode(
                    EEH_Export::prepare_value_from_db_for_display(
                        $answer_model,
                        'ANS_value',
                        $answer_row['Answer.ANS_value']
                    )
                );
        }
        return $data;
    }
}
