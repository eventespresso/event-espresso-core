<?php
/**
 * @var int         $QST_ID
 * @var EE_Question $question
 * @var string[][]  $question_types
 * @var string      $question_type_descriptions
 * @var int|float   $max_max
 */
// PARAMS THAT MUST BE PASSED ARE:
assert(isset($QST_ID));
assert($question);
assert($question instanceof EE_Question);
assert($question_types);

// the following are already escaped
echo EEH_Form_Fields::hidden_input('QST_system', $question->system_ID());
echo EEH_Form_Fields::hidden_input('QST_wp_user', $question->wp_user());
echo EEH_Form_Fields::hidden_input('QST_deleted', $question->deleted());

$QST_system = $question->system_ID();
$fields     = $question->get_model()->field_settings();

do_action('AHEE__questions_main_meta_box__template__before_admin_page_content', $question);

// does question have any answers? cause if it does then we have to disable type
$has_answers = $question->has_answers();
global $allowedposttags;
$info_box = '';
if ($QST_system === 'country') {
    // already escaped
    $info_box = EEH_HTML::div(
        EEH_HTML::h3(
            '<span class="dashicons dashicons-info"></span> '
            . esc_html__('Did you know...', 'event_espresso'),
            '',
            'ee-status--info'
        ) .
        EEH_HTML::p(
            esc_html__(
                'If you add a State/Province Select input immediately after this Country Select input when building your registration form, then the State/Province Select input options will change to correspond with the choice made in this input. So for example, choosing "United States" in this Country Select input will populate the State/Province Select input with just the state options for the United States.',
                'event_espresso'
            )
        ),
        '',
        'ee-info-box'
    );
}
?>

<?php do_action('AHEE__questions_main_meta_box__template__inner_admin_page_content', $question); ?>

    <div class="padding">
        <?php echo wp_kses($info_box, $allowedposttags); ?>
        <table class="form-table">
            <tbody>
                <?php do_action('AHEE__questions_main_meta_box__template__before_table_form_table', $question); ?>
                <tr>
                    <th>
                        <label for="QST_display_text">
                            <?php echo $fields['QST_display_text']->get_nicename(); // already escaped ?>
                            <?php echo EEH_Template::get_help_tab_link('question_text_info'); // already escaped ?>
                        </label>
                    </th>
                    <td>
                        <input id="QST_display_text"
                               name="QST_display_text"
                               type="text"
                               value="<?php echo esc_attr($question->get_f('QST_display_text')); ?>"
                        />
                    </td>
                </tr>

                <tr>
                    <th>
                        <label for="QST_admin_label">
                            <?php echo $fields['QST_admin_label']->get_nicename(); ?>
                            <?php echo EEH_Template::get_help_tab_link('question_label_info'); // already escaped ?>
                        </label>
                    </th>
                    <td>
                        <?php
                        $id            = ! empty($QST_system) ? '_disabled' : '';
                        $disabled_attr = ! empty($QST_system) ? 'disabled' : '';
                        ?>
                        <input id="QST_admin_label<?php echo absint($id); ?>"
                               name="QST_admin_label<?php echo absint($id); ?>"
                               type="text"
                               value="<?php echo esc_attr($question->get_f('QST_admin_label')); ?>"
                               <?php echo esc_attr($disabled_attr); ?>
                        />
                        <?php if (! empty($QST_system)) { ?>
                            <input id='QST_admin_label'
                                   name="QST_admin_label"
                                   type="hidden"
                                   value="<?php echo esc_attr($question->admin_label()); ?>"
                            />
                        <?php } ?>
                        <br />
                        <?php if (! empty($QST_system)) { ?>
                            <p class="description" style="color:#D54E21;">
                                <?php esc_html_e('System question! This field cannot be changed.', 'event_espresso') ?>
                            </p>
                        <?php } ?>
                        <input class="QST_order"
                               id="QST_order<?php echo absint($id); ?>"
                               name="QST_order<?php echo absint($id); ?>"
                               type="hidden"
                               value="<?php echo esc_attr($question->get('QST_order')); ?>"
                        />
                    </td>
                </tr>

                <tr>
                    <th>
                        <label for="QST_admin_only">
                            <?php echo esc_html($fields['QST_admin_only']->get_nicename()); ?>
                            <?php echo EEH_Template::get_help_tab_link('question_admin_only_info'); // already escaped ?>
                        </label>
                    </th>
                    <td>
                        <?php
                        $id            = ! empty($QST_system) ? '_disabled' : '';
                        $disabled_attr = ! empty($QST_system) ? 'disabled' : '';
                        $admin_only    = $question->get('QST_admin_only');
                        $checked       = ! empty($admin_only) ? ' checked' : '';
                        ?>
                        <input class="QST_admin_only"
                               id="QST_admin_only<?php echo absint($id); ?>"
                               name="QST_admin_only<?php echo absint($id); ?>"
                               type="checkbox"
                               value="1"
                            <?php
                            echo esc_attr($disabled_attr);
                            echo esc_attr($checked);
                            ?>
                        />
                        <br />
                            <?php
                            if (! empty($QST_system)) { ?>
                                <p class="description" style="color:#D54E21;">
                                    <?php esc_html_e(
                                        'System question! This field cannot be changed.',
                                        'event_espresso'
                                    ); ?>
                                </p>
                            <?php } ?>
                    </td>
                </tr>

                <tr>
                    <th>
                        <label for="QST_type">
                            <?php echo esc_html($fields['QST_type']->get_nicename()); ?>
                            <?php echo EEH_Template::get_help_tab_link('question_type_info'); // already escaped ?>
                        </label>
                    </th>
                    <td>
                        <?php
                        $disabled = ! empty($QST_system) && $QST_system !== EEM_Attendee::system_question_phone;
                        if ($disabled) {
                            $disabled_attr = 'disabled="disabled"';
                            $id            = '_disabled';
                        } else {
                            $disabled_attr = '';
                            $id            = '';
                        }

                        // Only display Confirm email for
                        if (empty($QST_system) || $QST_system !== EEM_Attendee::system_question_email_confirm) {
                            unset($question_types[ EEM_Question::QST_type_email_confirm ]);
                        }

                        echo EEH_Form_Fields::select_input(
                            'QST_type' . $id,
                            $question_types,
                            $question->type(),
                            'id="QST_type' . $id . '"' . $disabled_attr
                        ); // already escaped
                        if ($disabled) { ?>
                            <input id='QST_type'
                                   name="QST_type"
                                   type="hidden"
                                   value="<?php echo esc_attr($question->type()); ?>"
                            />
                            <?php
                            $explanatory_text = esc_html__(
                                'System question! This field cannot be changed.',
                                'event_espresso'
                            );
                        } else {
                            $explanatory_text = esc_html__(
                                'Because there are currently answers for this question in the database, your options to change the question type have been limited to similar question-types.',
                                'event_espresso'
                            );
                        }
                        if ($disabled || $has_answers) { ?>
                            <p class="description" style="color:#D54E21;">
                                    <?php echo esc_html($explanatory_text); ?>
                            </p>
                        <?php } ?>

                        <?php echo $question_type_descriptions; ?>

                    </td>
                </tr>
                <tr id="text_input_question_options">
                    <th>
                        <label>
                            <?php esc_html_e('Maximum Allowed Response Size', 'event_espresso'); ?>
                        </label>
                    </th>
                    <td>
                        <input id="QST_max"
                            <?php echo $max_max === EE_INF ? '' : 'max="' . esc_attr($max_max) . '"'; ?>
                               min="1"
                               name="QST_max"
                               type="number"
                               value="<?php echo esc_attr($question->get_f('QST_max')); ?>"
                               class="ee-input-width--small"
                        />
                        <p>
                            <span class="description">
                                <?php esc_html_e(
                                    'Maximum number of characters allowed when answering this question',
                                    'event_espresso'
                                ); ?>
                            </span>
                        </p>
                        <?php if ($QST_system) { ?>
                        <p>
                            <span class="description" style="color:#D54E21;">
                                <?php printf(
                                    esc_html__(
                                        'System question! The maximum number of characters that can be used for this question is %1$s',
                                        'event_espresso'
                                    ),
                                    $max_max
                                ); ?>
                            </span>
                        </p>
                        <?php } ?>
                    </td>
                </tr>
                <tr id="question_options">
                    <th>
                        <label>
                            <?php esc_html_e('Answer Options', 'event_espresso') ?>
                        </label>
                    </th>
                    <td>

                        <table class="question-options-table">
                            <thead>
                                <tr>
                                    <th class="option-value-header">
                                        <label>
                                            <?php esc_html_e('Value', 'event_espresso') ?>
                                        </label>
                                    </th>
                                    <th class="option-desc-header">
                                        <label>
                                        <?php esc_html_e(
                                            'Description (optional, only shown on registration form)',
                                            'event_espresso'
                                        ) ?>
                                        </label>
                                    </th>
                                    <th>
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr class="question-option sample">
                                    <td class="option-value-cell">
                                        <label class='screen-reader-text' for='question_options-xxcountxx-QSO_value'>
                                            <?php esc_html_e('Value', 'event_espresso') ?>
                                        </label>
                                        <input type="text"
                                               id="question_options-xxcountxx-QSO_value"
                                               name="question_options[xxcountxx][QSO_value]"
                                               class="option-value "
                                        />
                                        <input type='hidden'
                                               class='QSO_order'
                                               name='question_options[xxcountxx][QSO_order]'
                                               value='0'
                                        />
                                    </td>
                                    <td class="option-desc-cell">
                                        <label class='screen-reader-text' for='question_options-xxcountxx-QSO_desc'>
                                            <?php esc_html_e('Description', 'event_espresso') ?>
                                        </label>
                                        <input type="text"
                                               id='question_options-xxcountxx-QSO_desc'
                                               name="question_options[xxcountxx][QSO_desc]"
                                               class="option-desc "
                                        />
                                    </td>
                                    <td>
                                        <a  class="button button--icon-only remove-option remove-item ee-aria-tooltip"
                                            aria-label="<?php esc_html_e('click to delete this option', 'event_espresso') ?>"
                                        >
                                            <span class='dashicons clickable dashicons-post-trash'></span>
                                        </a>
                                        <a class="button button--icon-only sortable-drag-handle ee-aria-tooltip"
                                            aria-label="<?php esc_html_e(
                                                'click and drag to change the order of this option',
                                                'event_espresso'
                                            ) ?>"
                                        >
                                            <span class='dashicons dashicons-image-flip-vertical '></span>
                                        </a>
                                    </td>
                                </tr>

                                <?php
                                $count            = 0;
                                $question_options = $question->options();
                                if (! empty($question_options)) {
                                    foreach ($question_options as $option_id => $option) {
                                        $disabled_attr = $has_answers || $option->get('QSO_system')
                                            ? 'disabled'
                                            : '';
                                        ?>
                                        <tr class="question-option ee-options-sortable">
                                            <td class="option-value-cell">
                                                <label class='screen-reader-text'
                                                       for='question_options-<?php echo $count ?>-QSO_value'
                                                >
                                                    <?php esc_html_e('Value', 'event_espresso') ?>
                                                </label>
                                                <input type="text"
                                                       class="option-value "
                                                       id="question_options-<?php echo $count ?>-QSO_value"
                                                       name="question_options[<?php echo $count ?>][QSO_value]"
                                                       value="<?php echo esc_attr($option->get_f('QSO_value')); ?>"
                                                    <?php echo esc_attr($disabled_attr); ?>
                                                />
                                                <input type="hidden"
                                                       class="QSO_order"
                                                       name="question_options[<?php echo absint($count); ?>][QSO_order]"
                                                       value="<?php echo absint($count); ?>"
                                                />
                                                <?php if ($has_answers) : ?>
                                                    <input type="hidden"
                                                           name="question_options[<?php echo absint($count); ?>][QSO_value]"
                                                           value="<?php echo esc_attr($option->get_f('QSO_value')); ?>"
                                                    />
                                                <?php endif; ?>
                                            </td>
                                            <td class="option-desc-cell">
                                                <label class='screen-reader-text'
                                                       for='question_options-<?php echo $count ?>-QSO_desc'
                                                >
                                                    <?php esc_html_e('Description', 'event_espresso') ?>
                                                </label>
                                                <input type="text"
                                                       class="option-desc "
                                                       id="question_options-<?php echo $count ?>-QSO_desc"
                                                       name="question_options[<?php echo absint($count); ?>][QSO_desc]"
                                                       value="<?php echo esc_attr($option->get_f('QSO_desc')); ?>"
                                                />
                                            </td>
                                            <td>
                                            <?php if (! $option->system()) { ?>
                                                <a class='button button--icon-only remove-option remove-item ee-aria-tooltip'
                                                   aria-label="<?php esc_html_e('click to delete this option', 'event_espresso') ?>"
                                                >
                                                    <span class='dashicons clickable dashicons-post-trash'></span>
                                                </a>
                                            <?php } ?>
                                                <a class='button button--icon-only sortable-drag-handle ee-aria-tooltip'
                                                   aria-label="<?php esc_html_e(
                                                       'click and drag to change the order of this option',
                                                       'event_espresso'
                                                   ) ?>"
                                                >
                                                    <span class='dashicons dashicons-image-flip-vertical '></span>
                                                </a>
                                            <?php
                                            echo EEH_Form_Fields::hidden_input(
                                                "question_options[{$count}][QST_ID])",
                                                $option->question_ID()
                                            ); // already escaped
                                            echo EEH_Form_Fields::hidden_input(
                                                "question_options[{$count}][QSO_ID])",
                                                $option->ID()
                                            ); // already escaped
                                            $count++;
                                            ?>
                                            </td>
                                        </tr>
                                        <?php
                                    }
                                } else {
                                    ?>
                                    <tr class="question-option ee-options-sortable">
                                        <td class="option-value-cell">
                                            <input type="text"
                                                   name="question_options[0][QSO_value]"
                                                   class="option-value "
                                            />
                                            <input type='hidden'
                                                   class='QSO_order'
                                                   name='question_options[0][QSO_order]'
                                                   value='0'
                                            />
                                        </td>
                                        <td class="option-desc-cell">
                                            <input type="text"
                                                   name="question_options[0][QSO_desc]"
                                                   class="option-desc "
                                            />
                                        </td>
                                        <td>
                                            <?php echo EEH_Form_Fields::hidden_input("question_options_count", $count); // already escaped ?>
                                        </td>
                                    </tr>
                                    <?php
                                }
                                ?>
                            </tbody>
                        </table>
                        <div class="ee-admin-button-row">
                            <a id='new-question-option' class='button button--secondary'>
                                <?php esc_html_e('Add Another Answer Option', 'event_espresso') ?>
                            </a>
                            <?php echo EEH_Form_Fields::hidden_input(
                                'question_options_count',
                                $count
                            ); // already escaped ?>
                        </div>
                        <br />

                        <p class="description">
                            <?php esc_html_e(
                                'Answer Options are the choices that you give people to select from for RADIO_BTN, CHECKBOX or DROPDOWN questions. The Value is a simple key that will be saved to the database and the description is optional. Note that values CANNOT contain any HTML, but descriptions can.',
                                'event_espresso'
                            ) ?>
                        </p>
                        <?php if ($has_answers) : ?>
                            <p class="description" style="color:#D54E21;">
                                <?php esc_html_e(
                                    'Answer values that are uneditable are this way because there are registrations in the database that have answers for this question.  If you need to correct a mistake, or edit an existing option value, then trash the existing one and create a new option with the changes.  This will ensure that the existing registrations that chose the original answer will preserve that answer.',
                                    'event_espresso'
                                ); ?>
                            </p>
                        <?php endif; ?>
                    </td>
                </tr>

                <tr>
                    <th>
                        <label for="QST_required">
                            <?php echo esc_html($fields['QST_required']->get_nicename()); ?>
                            <?php echo EEH_Template::get_help_tab_link('required_question_info'); // already escaped ?>
                        </label>
                    </th>
                    <td>
                        <?php
                        $system_required   = ['fname', 'email'];
                        $disabled_attr     = in_array($QST_system, $system_required) ? ' disabled="disabled"' : '';
                        $required_on       = $question->get('QST_admin_only');
                        $show_required_msg = $required_on ? '' : ' display:none;';
                        $disabled_attr     = $required_on || ! empty($disabled_attr) ? ' disabled="disabled"' : '';
                        $id                =
                            ! empty($disabled_attr) && in_array($QST_system, $system_required) ? '_disabled' : '';
                        $requiredOptions   = [
                            ['text' => esc_html__('Optional', 'event_espresso'), 'id' => 0],
                            ['text' => esc_html__('Required', 'event_espresso'), 'id' => 1],
                        ];
                        echo EEH_Form_Fields::select_input(
                            'QST_required' . $id,
                            $requiredOptions,
                            $question->required(),
                            'id="QST_required' . $id . '"' . $disabled_attr,
                            'ee-input-width--small'
                        ); // already escaped
                        ?>
                        <p id="required_toggled_on" class="description"
                                  style="color:#D54E21;<?php echo esc_attr($show_required_msg); ?>"
                            >
                                <?php esc_html_e(
                                    'Required is set to optional, and this field is disabled, because the question is Admin-Only.',
                                    'event_espresso'
                                ) ?>
                        </p>
                        <p id="required_toggled_off" class="description" style="color:#D54E21; display: none;">
                                <?php esc_html_e(
                                    'Required option field is no longer disabled because the question is not Admin-Only',
                                    'event_espresso'
                                ) ?>
                        </p>
                        <?php if (! empty($disabled_attr) && in_array($QST_system, $system_required)) { ?>
                            <input id="QST_required"
                                   name="QST_required"
                                   type='hidden'
                                   value="1"
                            />
                            <p class="description" style="color:#D54E21;">
                                <?php esc_html_e('System question! This field cannot be changed.', 'event_espresso') ?>
                            </p>
                        <?php } ?>
                    </td>
                </tr>

                <tr>
                    <th>
                        <label for="QST_required_text">
                            <?php esc_html_e('Required Text', 'event_espresso'); ?>
                            <?php echo EEH_Template::get_help_tab_link('required_text_info'); // already escaped ?>
                        </label>
                    </th>
                    <td>
                        <input type="text"
                               maxlength="100"
                               class=""
                               id="QST_required_text"
                               name="QST_required_text"
                               value="<?php echo esc_attr($question->get_f('QST_required_text')); ?>"
                        />

                    </td>
                </tr>
                <?php
                do_action('AHEE__questions_main_meta_box__template__after_table_form_table', $question);
                ?>
            </tbody>
        </table>

        <div class="clear"></div>
    </div>

<?php
do_action('AHEE__questions_main_meta_box__template__after_admin_page_content', $question);
