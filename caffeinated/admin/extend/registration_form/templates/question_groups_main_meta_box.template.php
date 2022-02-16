<?php

/**
 * Template: includes/core/admin/registration_form/templates/question_groups_main_meta_box.template.php
 * For displaying a question group for editing/creating within the EE Admin page
 *
 * @var int               $QSG_ID         the main question group's ID
 * @var EE_Question_Group $question_group the main question group we're displaying
 * @var EE_Question[]     $all_questions  list of unused questions
 * @var array             $values         array of arrays, where each sub-array contains 2 keys:
 *                                          'id' (internal value) and 'name' (label for displaying)
 */
assert($QSG_ID);
assert($question_group);
assert($question_group instanceof EE_Question_Group);
assert(isset($all_questions) && (empty($all_questions) || is_array($all_questions)));
assert(is_array($values));

foreach ($all_questions as $unused_question) {
    assert($unused_question);
    assert($unused_question instanceof EE_Question);
}

$question_order           = 0;
$QSG_system               = $question_group->system_group();
$question_group_questions = $question_group->questions();

$disabled = ! empty($QSG_system) ? 'disabled' : '';
$id = ! empty($QST_system) ? '_disabled' : '';
$required_question_group_questions = EEM_Question::instance()->required_system_questions_in_system_question_group(
    $QSG_system
);
$allowed_question_group_questions  = EEM_Question::instance()->allowed_system_questions_in_system_question_group(
    $QSG_system
);
?>

<div class="questions-group-wrap ee-layout-row">
    <div id="group-details" class="edit-group">
        <h2><?php esc_html_e('Question Group Details', 'event_espresso'); ?></h2>
        <table class="form-table">
            <tbody>

                <tr>
                    <th>
                        <label for="QSG_name">
                            <?php esc_html_e('Group Name', 'event_espresso'); ?>
                            <?php echo EEH_Template::get_help_tab_link('group_name_info'); ?>
                        </label>
                    </th>
                    <td>
                        <input class='regular-text'
                               id="QSG_name"
                               name="QSG_name"
                               type="text"
                               value="<?php echo esc_attr($question_group->get_f('QSG_name')); ?>"
                        >

                    </td>
                </tr>

                <tr>
                    <th>
                        <label for="QSG_identifier">
                            <?php esc_html_e('Group Identifier', 'event_espresso'); ?>
                            <?php echo EEH_Template::get_help_tab_link('group_identifier_info'); ?>
                        </label>
                    </th>
                    <td>
                        <input class='regular-text'
                            <?php echo $disabled; ?>
                               id="QSG_identifier"
                               name="QSG_identifier<?php echo esc_attr($id); ?>"
                               type="text"
                               value="<?php echo esc_attr($question_group->get_f('QSG_identifier')); ?>"
                        >
                        <?php if (! empty($QSG_system)) { ?>
                            <p>
                                <span class="description" style="color:#D54E21;">
                                <?php esc_html_e(
                                    'System question group! This field cannot be changed.',
                                    'event_espresso'
                                ) ?>
                                </span><br />
                            </p>
                        <?php } ?>
                    </td>
                </tr>
                <tr>
                    <th>
                        <label for="QSG_desc">
                            <?php esc_html_e('Description', 'event_espresso'); ?>
                            <?php echo EEH_Template::get_help_tab_link('group_description_info'); ?>
                        </label>
                    </th>
                    <td>
                        <textarea id="QSG_desc" name="QSG_desc" class="regular-text" rows="2" cols="40">
                            <?php echo esc_textarea($question_group->get_f('QSG_desc')); ?>
                        </textarea>
                    </td>
                </tr>

                <tr>
                    <th>
                        <label for="QSG_order">
                            <?php esc_html_e('Question Group Order', 'event_espresso'); ?>
                            <?php echo EEH_Template::get_help_tab_link('group_order_info'); ?>
                        </label>
                    </th>
                    <td>
                        <input class='ee-input--small'
                               id="QSG_order"
                               name="QSG_order"
                               value="<?php echo esc_attr($question_group->order()); ?>"
                        />
                    </td>
                </tr>

                <tr>
                    <th>
                        <label for="QSG_show_group_name">
                            <?php esc_html_e('Show Name', 'event_espresso'); ?>
                            <?php echo EEH_Template::get_help_tab_link('show_group_name_info'); ?>
                        </label>
                    </th>
                    <td>
                        <?php echo EEH_Form_Fields::select_input(
                            'QSG_show_group_name',
                            $values,
                            $question_group->show_group_name(),
                            '',
                            'ee-input--small'
                        ); ?>
                        <p class="description">
                            <?php esc_html_e('Show Group Name on Registration Page?', 'event_espresso'); ?>
                        </p>
                    </td>
                </tr>

                <tr>
                    <th>
                        <label for="QSG_show_group_order">
                            <?php esc_html_e('Show Description', 'event_espresso'); ?>
                            <?php echo EEH_Template::get_help_tab_link('show_group_description_info'); ?>
                        </label>
                    </th>
                    <td>
                        <?php echo EEH_Form_Fields::select_input(
                            'QSG_show_group_desc',
                            $values,
                            $question_group->show_group_desc(),
                            '',
                            'ee-input--small'
                        ); ?>
                        <p class="description"><?php
                            esc_html_e(' Show Group Description on Registration Page?', 'event_espresso');
                            ?></p>
                        <input type="hidden" name="QSG_system" value="<?php echo esc_attr($question_group->system_group()); ?>">
                    </td>
                </tr>

            </tbody>
        </table>
    </div>

    <div id="group-questions" class="edit-group question-group-questions-container">
        <h2><?php esc_html_e('Questions', 'event_espresso'); ?></h2>
        <div class="question-group-questions">
            <p class='ee-status-outline ee-status-bg--info'>
                <?php
                esc_html_e(
                    'Select which questions should be shown in this group by checking or unchecking boxes. You can drag and drop questions to reorder them. Your changes will be updated when you save.',
                    'event_espresso'
                ); ?>
            </p>
            <div>
                <ul class="question-list-sortable">
                    <?php
                    foreach ($all_questions as $question_ID => $question) {
                        if (! $question instanceof EE_Question) {
                            continue;
                        }
                        $checked = isset($question_group_questions[ $question_ID ])
                            ? ' checked'
                            : '';
                        // disable questions from the personal information question group
                        // is it required in the current question group? if so don't allow admins to remove it
                        $disabled = in_array($question->system_ID(), $required_question_group_questions)
                            ? ' disabled'
                            : '';
                        // limit where system questions can appear
                        if (
                            $question->system_ID()
                            && ! in_array($question->system_ID(), $allowed_question_group_questions)
                        ) {
                            // skip over system question not assigned to this group
                            // except for the address system group cause we want the address questions to display
                            // even if they aren't selected (but still not show the personal system questions).
                            // The third condition checks if we're displaying a non system question group
                            // and the question is a system question, then we skip
                            // because for non-system question groups we only want to show non-system questions.
                            continue;
                        }
                        ?>
                        <li class="ee-question-sortable">
                            <label for="question-<?php echo absint($question_ID); ?>">
                                <input id="question-<?php echo absint($question_ID); ?>"
                                       name="questions[<?php echo absint($question_ID); ?>]"
                                       type="checkbox"
                                       value="<?php echo absint($question_ID); ?>"
                                    <?php echo esc_attr($disabled); ?>
                                    <?php echo esc_attr($checked); ?>
                                />
                                <span class="question-text">
                                    <?php
                                        $trimmed_text = trim($question->display_text());
                                        $trimmed_text .= strlen($trimmed_text) >= 95 ? "&hellip;" : '';
                                        echo esc_html($trimmed_text);
                                    ?>
                                </span>
                                <input class="question-group-QGQ_order"
                                       name="question_orders[<?php echo absint($question_ID); ?>]"
                                       type="hidden"
                                       value="<?php echo esc_attr($question_order); ?>"
                                >
                            </label>
                            <?php
                            if (
                                EE_Registry::instance()->CAP->current_user_can(
                                    'ee_edit_question',
                                    'espresso_registration_form_edit_question',
                                    $question->ID()
                                )
                            ) {
                                $edit_link = EE_Admin_Page::add_query_args_and_nonce(
                                    [
                                        'action' => 'edit_question',
                                        'QST_ID' => $question->ID(),
                                    ],
                                    EE_FORMS_ADMIN_URL
                                );

                                echo '
                                    <a href="' . esc_url_raw($edit_link) . '"
                                         class="button button--small button--icon-only"
                                         target="_blank"
                                         title="' .
                                    sprintf(
                                        esc_attr__('Edit %s', 'event_espresso'),
                                        $question->admin_label()
                                    ) . '"
                                    >
                                        <span class="dashicons dashicons-edit"></span>
                                    </a>';
                            }
                            ?>
                        </li>
                        <?php
                        $question_order++;
                    }
                    ?>
                </ul>
            </div>
        </div>
    </div>
</div>
