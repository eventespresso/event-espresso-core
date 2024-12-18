<?php

use EventEspresso\core\services\request\sanitizers\AllowedTags;

/**
 * template args
 *
 * @var int         $QST_ID
 * @var EE_Question $question
 * @var string[][]  $question_types
 * @var string      $question_type_descriptions
 * @var int|float   $max_max
 */

try {
    // the following are already escaped
    echo wp_kses(
        EEH_Form_Fields::hidden_input('QST_system', $question->system_ID()),
        AllowedTags::getWithFormTags()
    );
    echo wp_kses(
        EEH_Form_Fields::hidden_input('QST_wp_user', $question->wp_user()),
        AllowedTags::getWithFormTags()
    );
    echo wp_kses(
        EEH_Form_Fields::hidden_input('QST_deleted', $question->deleted()),
        AllowedTags::getWithFormTags()
    );

    $QST_system = $question->system_ID();
    $fields     = $question->get_model()->field_settings();

    do_action('AHEE__questions_main_meta_box__template__before_admin_page_content', $question);

    // does question have any answers? cause if it does then we have to disable type
    $has_answers = $question->has_answers();
    global $allowedposttags;
    $info_box = '';
    if ($QST_system === 'country') {
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
    do_action('AHEE__questions_main_meta_box__template__inner_admin_page_content', $question);
?>

<div class="padding">
    <?php echo wp_kses($info_box, $allowedposttags); ?>
    <table class="ee-reg-form-questions ee-admin-two-column-layout form-table">
        <tbody>
            <?php do_action('AHEE__questions_main_meta_box__template__before_table_form_table', $question); ?>
            <tr>
                <th>
                    <label for="QST_display_text">
                        <?php echo wp_kses($fields['QST_display_text']->get_nicename(), AllowedTags::getAllowedTags()); ?>
                        <?php echo wp_kses(
                            EEH_Template::get_help_tab_link('question_text_info'), AllowedTags::getAllowedTags()
                        ); ?>
                            <span class="ee-required-text">*</span>
                    </label>
                </th>
                <td>
                    <input class="ee-input-width--reg"
                           id="QST_display_text"
                           name="QST_display_text"
                           type="text"
                           value="<?php esc_attr_e($question->get_f('QST_display_text')); ?>"
                           required
                    />
                </td>
            </tr>

            <?php
            $id            = ! empty($QST_system) ? '_disabled' : '';
            $disabled_attr = ! empty($QST_system) ? 'disabled' : '';
            ?>
            <tr>
                <th>
                    <label for="QST_admin_label<?php esc_attr_e($id); ?>">
                        <?php echo wp_kses($fields['QST_admin_label']->get_nicename(), AllowedTags::getAllowedTags()); ?>
                        <?php echo wp_kses(
                            EEH_Template::get_help_tab_link('question_label_info'), AllowedTags::getAllowedTags()
                        ); ?>
                    </label>
                </th>
                <td>
                    <input class="ee-input-width--reg"
                           id="QST_admin_label<?php esc_attr_e($id); ?>"
                           name="QST_admin_label<?php esc_attr_e($id); ?>"
                           type="text"
                           value="<?php esc_attr_e($question->get_f('QST_admin_label')); ?>"
                           <?php esc_attr_e($disabled_attr); ?>
                    />
                    <?php if (! empty($QST_system)) { ?>
                        <input class="ee-input-width--reg"
                               id='QST_admin_label'
                               name="QST_admin_label"
                               type="hidden"
                               value="<?php esc_attr_e($question->admin_label()); ?>"
                        />
                    <?php } ?>
                    <br>
                    <?php if (! empty($QST_system)) { ?>
                        <p class="description ee-system-question" >
                            <?php esc_html_e('System question! This field cannot be changed.', 'event_espresso') ?>
                        </p>
                    <?php } ?>
                    <input class="QST_order"
                           id="QST_order<?php esc_attr_e($id); ?>"
                           name="QST_order<?php esc_attr_e($id); ?>"
                           type="hidden"
                           value="<?php esc_attr_e($question->get('QST_order')); ?>"
                    />
                </td>
            </tr>

            <?php
            $id            = ! empty($QST_system) ? '_disabled' : '';
            $disabled_attr = ! empty($QST_system) ? 'disabled' : '';
            $admin_only    = $question->get('QST_admin_only');
            $checked       = ! empty($admin_only) ? ' checked' : '';
            ?>
            <tr>
                <th>
                    <label for="QST_admin_only<?php esc_attr_e($id); ?>">
                        <?php echo esc_html($fields['QST_admin_only']->get_nicename()); ?>
                        <?php echo EEH_Template::get_help_tab_link('question_admin_only_info'); ?>
                    </label>
                </th>
                <td>
                    <input class="QST_admin_only"
                           id="QST_admin_only<?php esc_attr_e($id); ?>"
                           name="QST_admin_only<?php esc_attr_e($id); ?>"
                           type="checkbox"
                           value="1"
                        <?php
                        esc_attr_e($disabled_attr);
                        esc_attr_e($checked);
                        ?>
                    />
                    <br>
                        <?php
                        if (! empty($QST_system)) { ?>
                            <p class="description ee-system-question" >
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
                    <label for="QST_type<?php esc_attr_e($id); ?>">
                        <?php echo esc_html($fields['QST_type']->get_nicename()); ?>
                        <?php echo EEH_Template::get_help_tab_link('question_type_info'); ?>
                    </label>
                </th>
                <td>
                    <?php
                    $disabled = ! empty($QST_system) && $QST_system !== EEM_Attendee::system_question_phone;
                    $id       = $disabled ? '_disabled' : '';

                    if (empty($QST_system) || $QST_system !== EEM_Attendee::system_question_email_confirm) {
                        unset($question_types[ EEM_Question::QST_type_email_confirm ]);
                    }

                    echo wp_kses(
                        EEH_Form_Fields::select_input(
                            'QST_type' . $id,
                            $question_types,
                            $question->type(),
                            'id="QST_type' . $id . '" ' . $disabled_attr
                        ),
                        AllowedTags::getWithFormTags()
                    );
                    if ($disabled) { ?>
                        <input id='QST_type'
                               name="QST_type"
                               type="hidden"
                               value="<?php esc_attr_e($question->type()); ?>"
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
                        <p class="description ee-system-question" >
                                <?php echo esc_html($explanatory_text); ?>
                        </p>
                    <?php } ?>

                    <?php echo wp_kses($question_type_descriptions, AllowedTags::getAllowedTags()); ?>

                </td>
            </tr>
            <tr id="text_input_question_options">
                <th>
                    <label for="QST_max<?php esc_attr_e($id); ?>">
                        <?php esc_html_e('Maximum Allowed Response Size', 'event_espresso'); ?>
                    </label>
                </th>
                <td>
                    <input id="QST_max<?php esc_attr_e($id); ?>"
                        class="ee-input-width--tiny"
                    <?php if ($max_max !== EE_INF) :?>
                        max="<?php esc_attr_e($max_max);?>"
                    <?php  endif; ?>
                        min="1"
                        name="QST_max"
                        type="number"
                        value="<?php esc_attr_e($question->get_f('QST_max')); ?>"
                        <?php esc_attr_e($disabled_attr); ?>
                    />
                    <p class="description">
                        <?php esc_html_e(
                            'Maximum number of characters allowed when answering this question',
                            'event_espresso'
                        ); ?>
                    </p>
                    <?php if ($QST_system) { ?>
                    <p class="description ee-system-question" >
                        <?php printf(
                            esc_html__(
                                'System question! The maximum number of characters that can be used for this question is %1$s',
                                'event_espresso'
                            ),
                            $max_max
                        ); ?>
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
                                        <?php esc_html_e('Description', 'event_espresso') ?>
                                        </label>
                                        <span class="tiny-text"><?php esc_html_e(
                                                '(optional, only shown on registration form)',
                                                'event_espresso'
                                            ) ?></span>
                                    </th>
                                    <th class="option-default-header">
                                        <label>
                                            <?php esc_html_e('Default', 'event_espresso') ?>
                                        </label>
                                    </th>
                                    <th class="option-actions-header">
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
                                               class="option-value ee-input-width--reg"
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
                                               class="option-desc ee-input-width--big"
                                        />
                                    </td>
                                    <td class="option-default-cell">
                                        <label class='screen-reader-text' for='question_options-xxcountxx-QSO_default'>
                                            <?php esc_html_e('Check if this is the default value', 'event_espresso') ?>
                                        </label>
                                        <input type="radio"
                                               class="option-default"
                                               id="question_options-xxcountxx-QSO_default"
                                               name="QSO_default"
                                               value="xxcountxx"
                                        />
                                    </td>
                                    <td class="option-actions-cell">
                                        <a class="button button--icon-only remove-option remove-item ee-aria-tooltip"
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
                                $hasDefault       = false;
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
                                                       for='question_options-<?php esc_attr_e($count); ?>-QSO_value'
                                                >
                                                    <?php esc_html_e('Value', 'event_espresso') ?>
                                                </label>
                                                <input type="text"
                                                       class="option-value ee-input-width--reg"
                                                       id="question_options-<?php esc_attr_e($count); ?>-QSO_value"
                                                       name="question_options[<?php esc_attr_e($count); ?>][QSO_value]"
                                                       value="<?php esc_attr_e($option->get_f('QSO_value')); ?>"
                                                    <?php esc_attr_e($disabled_attr); ?>
                                                />
                                                <input type="hidden"
                                                       class="QSO_order"
                                                       name="question_options[<?php esc_attr_e($count); ?>][QSO_order]"
                                                       value="<?php esc_attr_e($count); ?>"
                                                />
                                                <?php if ($has_answers) : ?>
                                                    <input type="hidden"
                                                           name="question_options[<?php esc_attr_e($count); ?>][QSO_value]"
                                                           value="<?php esc_attr_e($option->get_f('QSO_value')); ?>"
                                                    />
                                                <?php endif; ?>
                                            </td>
                                            <td class="option-desc-cell">
                                                <label class='screen-reader-text'
                                                       for='question_options-<?php esc_attr_e($count); ?>-QSO_desc'
                                                >
                                                    <?php esc_html_e('Description', 'event_espresso') ?>
                                                </label>
                                                <input type="text"
                                                       class="option-desc ee-input-width--big"
                                                       id="question_options-<?php esc_attr_e($count); ?>-QSO_desc"
                                                       name="question_options[<?php esc_attr_e($count); ?>][QSO_desc]"
                                                       value="<?php esc_attr_e($option->get_f('QSO_desc')); ?>"
                                                />
                                            </td>
                                            <td class="option-default-cell">
                                                <label class='screen-reader-text' for='question_options-<?php esc_attr_e($count); ?>-QSO_default'>
                                                    <?php esc_html_e('Check if this is the default value', 'event_espresso') ?>
                                                </label>
                                                <?php
                                                $isDefault = $option->isDefault() ? ' checked' : '';
                                                $hasDefault = $isDefault ? true : $hasDefault;
                                                ?>
                                                <input type="radio"
                                                       class="option-default"
                                                       id="question_options-<?php esc_attr_e($count); ?>-QSO_default"
                                                       name="QSO_default"
                                                       value="<?php esc_attr_e($count); ?>"
                                                    <?php esc_attr_e($isDefault); ?>
                                                />
                                            </td>
                                            <td class="option-actions-cell">
                                            <?php if (! $option->system()) { ?>
                                                <a class='button button--icon-only remove-option remove-item ee-aria-tooltip'
                                                   aria-label="<?php esc_html_e(
                                                       'click to delete this option',
                                                       'event_espresso'
                                                   ) ?>"
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
                                                echo wp_kses(
                                                    EEH_Form_Fields::hidden_input(
                                                        "question_options[$count][QST_ID])",
                                                        $option->question_ID()
                                                    ),
                                                    AllowedTags::getWithFormTags()
                                                );
                                                echo wp_kses(
                                                    EEH_Form_Fields::hidden_input(
                                                        "question_options[$count][QSO_ID])",
                                                        $option->ID()
                                                    ),
                                                    AllowedTags::getWithFormTags()
                                                );
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
                                            <label class='screen-reader-text' for='question_options[0][QSO_value]'
                                            >
                                                <?php esc_html_e('Question Option Value', 'event_espresso') ?>
                                            </label>
                                            <input type="text"
                                                   id="question_options[0][QSO_value]"
                                                   name="question_options[0][QSO_value]"
                                                   class="option-value ee-input-width--reg"
                                            />
                                            <input type='hidden'
                                                   class='QSO_order'
                                                   name='question_options[0][QSO_order]'
                                                   value='0'
                                            />
                                        </td>
                                        <td class="option-desc-cell">
                                            <label class='screen-reader-text' for='question_options[0][QSO_desc]'
                                            >
                                                <?php esc_html_e('Question Option Description', 'event_espresso') ?>
                                            </label>
                                            <input type="text"
                                                   id="question_options[0][QSO_desc]"
                                                   name="question_options[0][QSO_desc]"
                                                   class="option-desc ee-input-width--big"
                                            />
                                        </td>
                                        <td class="option-default-cell">
                                            <label class='screen-reader-text' for='question_options-0-QSO_default'>
                                                <?php esc_html_e('Check if this is the default value', 'event_espresso') ?>
                                            </label>
                                            <input type="radio"
                                                   class="option-default"
                                                   id="question_options-0-QSO_default"
                                                   name="QSO_default"
                                                   value="0"
                                                   checked
                                            />
                                        </td>
                                        <td class="option-actions-cell">
                                            <?php echo wp_kses(
                                                EEH_Form_Fields::hidden_input(
                                                    "question_options_count",
                                                    $count
                                                ),
                                                AllowedTags::getWithFormTags()
                                            ); ?>
                                        </td>
                                    </tr>
                                    <?php
                                }
                                if (
                                    $question->type() === EEM_Question::QST_type_checkbox
                                    || $question->type() === EEM_Question::QST_type_radio
                                ) :
                                ?>
                                <tr class="question-option">
                                    <td class="option-value-cell">
                                    </td>
                                    <td class="option-desc-cell no-default-label">
                                        <label for='question_options-999999-QSO_default'>
                                            <?php esc_html_e('no default value', 'event_espresso') ?>
                                        </label>
                                    </td>
                                    <?php $no_default = $hasDefault ? '' : ' checked'; ?>
                                    <td class="option-default-cell">
                                        <input type="radio"
                                               class="option-default"
                                               id="question_options-999999-QSO_default"
                                               name="QSO_default"
                                               value="999999"
                                            <?php esc_attr_e($no_default); ?>
                                        />
                                    </td>
                                    <td class="option-actions-cell"></td>
                                </tr>
                                <?php endif; ?>
                            </tbody>
                        </table>
                        <div class="ee-admin-button-row">
                            <a id='new-question-option' class='button button--secondary'>
                                <?php esc_html_e('Add Another Answer Option', 'event_espresso'); ?>
                            </a>
                            <?php echo wp_kses(
                                EEH_Form_Fields::hidden_input(
                                    "question_options_count",
                                    $count
                                ),
                                AllowedTags::getWithFormTags()
                            ); ?>
                        </div>
                        <br/>

                        <p class="description">
                            <?php esc_html_e(
                                'Answer Options are the choices that you give people to select from for RADIO_BTN, CHECKBOX or DROPDOWN questions. The Value is a simple key that will be saved to the database and the description is optional. Note that values CANNOT contain any HTML, but descriptions can.',
                                'event_espresso'
                            ) ?>
                            <br />
                            <strong>
                                <?php esc_html_e(
                                    'The Default Answer Option will be automatically selected when the registration form is initially displayed, unless "no default value" is selected.',
                                    'event_espresso'
                                ) ?>
                            </strong>
                        </p>
                        <?php if ($has_answers) : ?>
                            <p class="description ee-system-question">
                                <?php esc_html_e(
                                    'Answer values that are not editable are this way because there are registrations in the database that have answers for this question.  If you need to correct a mistake, or edit an existing option value, then trash the existing one and create a new option with the changes.  This will ensure that the existing registrations that chose the original answer will preserve that answer.',
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
                        <?php echo EEH_Template::get_help_tab_link('required_question_info'); ?>
                    </label>
                </th>
                <td>
                    <?php
                    $system_required   = ['fname', 'email'];
                    $disabled_attr     = in_array($QST_system, $system_required) ? ' disabled' : '';
                    $required_on       = $question->get('QST_admin_only');
                    $show_required_class = $admin_only && $required_on ? '' : ' hidden';
                    $disabled_attr     = $required_on || ! empty($disabled_attr) ? ' disabled' : '';
                    $id                =
                        ! empty($disabled_attr) && in_array($QST_system, $system_required) ? '_disabled' : '';
                    $requiredOptions   = [
                        ['text' => esc_html__('Optional', 'event_espresso'), 'id' => 0],
                        ['text' => esc_html__('Required', 'event_espresso'), 'id' => 1],
                    ];
                    echo wp_kses(
                        EEH_Form_Fields::select_input(
                            'QST_required' . $id,
                            $requiredOptions,
                            $question->required(),
                            'id="QST_required' . $id . '"' . $disabled_attr,
                            'ee-input-width--small'
                        ),
                        AllowedTags::getWithFormTags()
                    );
                    ?>
                    <p id="required_toggled_on"
                       class="description<?php esc_attr_e($show_required_class); ?>"
                    >
                        <?php esc_html_e(
                            'Required is set to optional, and this field is disabled, because the question is Admin-Only.',
                            'event_espresso'
                        ) ?>
                    </p>
                    <p id="required_toggled_off"
                       class="description ee-system-question"
                       style="color:#D54E21; display: none;"
                    >
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
                        <p class="description ee-system-question" >
                            <?php esc_html_e('System question! This field cannot be changed.', 'event_espresso') ?>
                        </p>
                    <?php } ?>
                </td>
            </tr>

            <tr>
                <th>
                    <label for="QST_required_text">
                        <?php esc_html_e('Required Text', 'event_espresso'); ?>
                        <?php echo EEH_Template::get_help_tab_link('required_text_info'); ?>
                    </label>
                </th>
                <td>
                    <input type="text"
                           maxlength="100"
                           class=""
                           id="QST_required_text"
                           name="QST_required_text"
                           value="<?php esc_attr_e($question->get_f('QST_required_text')); ?>"
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
} catch (Exception $e) {
    EE_Error::add_error($e->getMessage(), __FILE__, __LINE__, __METHOD__);
}
