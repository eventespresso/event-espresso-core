<?php

// required variables for template:
use EventEspresso\core\services\request\sanitizers\AllowedTags;

assert($question_group instanceof EE_Question_Group);
assert(isset($all_questions) && (empty($all_questions) || is_array($all_questions)));// list of unused questions
foreach ($all_questions as $question_option) {
    assert($question_option);
    assert($question_option instanceof EE_Question);
}
?>
<h4><?php esc_html_e('Check off all questions that you wish to appear in this group.', 'event_espresso'); ?></h4>
<ul>
    <?php
    foreach ($all_questions as $question_ID => $question) {
        /*@var $question EE_Question*/
        $checked = array_key_exists($question_ID, $question_group->questions()) ? 'checked' : '';
        ?>
        <li>
            <label for="question-<?php echo absint($question_ID); ?>">
                <input type="checkbox" name="questions[<?php echo absint($question_ID); ?>]"
                       id="question-<?php echo absint($question_ID); ?>"
                       value="<?php echo absint($question_ID); ?>" <?php echo esc_attr($checked); ?>>
                <?php echo wp_kses($question->display_text(), AllowedTags::getAllowedTags()); ?>
            </label>
        </li>
    <?php } ?>
</ul>