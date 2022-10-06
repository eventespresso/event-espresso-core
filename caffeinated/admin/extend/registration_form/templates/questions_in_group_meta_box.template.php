<?php

use EventEspresso\core\services\request\sanitizers\AllowedTags;

/**
 * @var EE_Question_Group $question_group
 * @var EE_Question[] $all_questions
*/
?>
<h4><?php esc_html_e('Check off all questions that you wish to appear in this group.', 'event_espresso'); ?></h4>
<ul>
    <?php
    foreach ($all_questions as $question_ID => $question) {
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