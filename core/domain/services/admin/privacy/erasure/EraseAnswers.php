<?php

namespace EventEspresso\core\domain\services\admin\privacy\erasure;

use EEM_Answer;
use EEM_Question;
use EventEspresso\core\services\privacy\erasure\PersonalDataEraserInterface;

/**
 * Class EraseAnswers
 * Erases answers for registrations with the specified email address
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          $VID:$
 */
class EraseAnswers implements PersonalDataEraserInterface
{
    /**
     * @var EEM_Answer
     */
    protected $answer_model;

    /**
     * @var EEM_Question
     */
    protected $question_model;

    /**
     * EraseAnswers constructor.
     *
     * @param EEM_Answer   $answer_model
     * @param EEM_Question $question_model
     */
    public function __construct(EEM_Answer $answer_model, EEM_Question $question_model)
    {
        $this->answer_model = $answer_model;
        $this->question_model = $question_model;
    }


    /**
     * Gets a translated string name for the data eraser
     *
     * @return string
     */
    public function name()
    {
        return esc_html__('Event Espresso Registration Answers', 'event_espresso');
    }

    /**
     * Erases a "page" of personal user data
     *
     * @return array {
     * @type boolean $items_removed  whether items were removed successfully or not
     * @type boolean $items_retained whether any items were skipped or not
     * @type array   $messages       values are messages to show
     * @type boolean $done           whether this eraser is done or has more pages
     *               }
     */
    public function erase($email_address, $page = 1)
    {
        $normal_questions_updated = $this->answer_model->update(
            array(
                'ANS_value' => '',
            ),
            array(
                array(
                    'Registration.Attendee.ATT_email' => $email_address,
                    'Question.QST_type'               => array(
                        'NOT_IN',
                        $this->question_model->question_types_in_category('multi-answer-enum'),
                    ),
                ),
            )
        );
        $multi_value_questions_updated = $this->answer_model->update(
            array(
                'ANS_value' => array(),
            ),
            array(
                array(
                    'Registration.Attendee.ATT_email' => $email_address,
                    'Question.QST_type'               => array(
                        'IN',
                        $this->question_model->question_types_in_category('multi-answer-enum'),
                    ),
                ),
            )
        );

        return array(
            'items_removed'  => (bool) $normal_questions_updated || (bool) $multi_value_questions_updated,
            'items_retained' => false, // always false in this example
            'messages'       => array(), // no messages in this example
            'done'           => true,
        );
    }
}
// End of file EraseAnswers.php
// Location: EventEspresso\core\domain\services\privacy\erasure/EraseAnswers.php
