<?php

/**
 * Extend_Registration_Form_Questions_Admin_List_Table
 *
 * Class for preparing the table listing all the custom event questions
 *
 * note: anywhere there are no php docs it is because the docs are available in the parent class.
 *
 * @package         Extend_Registration_Form_Questions_Admin_List_Table
 * @subpackage      caffeinated/admin/extend/registration_form/Extend_Registration_Form_Questions_Admin_List_Table.class.php
 * @author          Darren Ethier
 */
class Extend_Registration_Form_Questions_Admin_List_Table extends Registration_Form_Questions_Admin_List_Table
{

    /**
     * @param EE_Question $question
     * @param bool        $prep_content
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_display_text(EE_Question $question, bool $prep_content = true): string
    {
        $actions         = [];

        if ($this->caps_handler->userCanEditQuestion($question)) {
            $actions['edit'] = $this->getActionLink(
                $this->getActionUrl($question, self::ACTION_EDIT),
                esc_html__('Edit', 'event_espresso'),
                esc_attr__('Edit Question', 'event_espresso')
            );
        }

        if (
            $this->_view != 'trash'
            && ! $question->is_system_question()
            && $this->caps_handler->userCanTrashQuestion($question)
        ) {
            $actions['delete'] = $this->getActionLink(
                $this->getActionUrl($question, self::ACTION_TRASH),
                esc_html__('Trash', 'event_espresso'),
                esc_attr__('Trash Question', 'event_espresso')
            );
        }

        if ($this->_view == 'trash') {
            if ($this->caps_handler->userCanRestoreQuestion($question)) {
                $actions['restore'] = $this->getActionLink(
                    $this->getActionUrl($question, self::ACTION_RESTORE),
                    esc_html__('Restore', 'event_espresso'),
                    esc_attr__('Restore Question', 'event_espresso')
                );
            }
            if (
                $question->count_related('Answer') === 0
                && $this->caps_handler->userCanDeleteQuestion($question)
            ) {
                $actions['delete'] = $this->getActionLink(
                    $this->getActionUrl($question, self::ACTION_DELETE),
                    esc_html__('Delete Permanently', 'event_espresso'),
                    esc_attr__('Delete Question Permanently', 'event_espresso')
                );
            }
        }
        if ($this->caps_handler->userCanEditQuestion($question)) {
            $actions['duplicate'] = $this->getActionLink(
                $this->getActionUrl($question, self::ACTION_COPY),
                esc_html__('Duplicate', 'event_espresso'),
                esc_attr__('Duplicate Question', 'event_espresso')
            );
        }

        $content = $this->caps_handler->userCanEditQuestion($question)
            ? $this->getActionLink(
                $this->getActionUrl($question, self::ACTION_EDIT),
                $prep_content ? $question->display_text() : $question->admin_label(),
                esc_attr__('Edit Question', 'event_espresso'),
                'row-title'
            )
            : $question->display_text();
        $content .= $this->row_actions($actions);

        return $prep_content ? $this->columnContent('display_text', $content) : $content;
    }
}
