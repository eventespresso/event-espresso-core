<?php

use EventEspresso\core\domain\services\capabilities\user_caps\RegFormListTableUserCapabilities;

/**
 * Registration_Form_Question_Groups_Admin_List_Table
 *
 * Class for preparing the table listing all the custom event Question_Groups
 *
 * note: anywhere there are no php docs it is because the docs are available in the parent class.
 *
 * @package         Registration_Form_Question_Groups_Admin_List_Table
 * @subpackage      includes/core/admin/events/Registration_Form_Question_Groups_Admin_List_Table.class.php
 * @author          Darren Ethier
 */
class Registration_Form_Question_Groups_Admin_List_Table extends EE_Admin_List_Table
{
    /**
     * @var RegFormListTableUserCapabilities
     */
    protected $caps_handler;


    public function __construct($admin_page)
    {
        $this->caps_handler = new RegFormListTableUserCapabilities(EE_Registry::instance()->CAP);
        parent::__construct($admin_page);

        if (! defined('REG_ADMIN_URL')) {
            define('REG_ADMIN_URL', EVENTS_ADMIN_URL);
        }
    }


    protected function _setup_data()
    {
        $this->_data = $this->_view != 'trash'
            ? $this->_admin_page->get_question_groups($this->_per_page, $this->_current_page, false)
            : $this->_admin_page->get_trashed_question_groups($this->_per_page, $this->_current_page, false);
        $this->_all_data_count = $this->_view != 'trash'
            ? $this->_admin_page->get_question_groups($this->_per_page, $this->_current_page, true)
            : $this->_admin_page->get_trashed_question_groups($this->_per_page, $this->_current_page, true);
    }


    protected function _set_properties()
    {
        $this->_wp_list_args = array(
            'singular' => esc_html__('question group', 'event_espresso'),
            'plural'   => esc_html__('question groups', 'event_espresso'),
            'ajax'     => true, // for now,
            'screen'   => $this->_admin_page->get_current_screen()->id,
        );

        $this->_columns = array(
            'cb'              => '<input type="checkbox" />',
            'id'              => esc_html__('ID', 'event_espresso'),
            'name'            => esc_html__('Group Name', 'event_espresso'),
            'description'     => esc_html__('Description', 'event_espresso'),
            'show_group_name' => esc_html__('Show Name', 'event_espresso'),
            'show_group_desc' => esc_html__('Show Desc', 'event_espresso'),
        );

        $this->_sortable_columns = array(
            'id'   => array('QSG_ID' => false),
            'name' => array('QSG_name' => false),
        );

        $this->_hidden_columns = array(
            'id',
        );

        $this->_ajax_sorting_callback = 'update_question_group_order';
    }


    // not needed
    protected function _get_table_filters(): array
    {
        return array();
    }


    protected function _add_view_counts()
    {
        $this->_views['all']['count'] = $this->_admin_page->get_question_groups(
            $this->_per_page,
            $this->_current_page,
            true
        );
        if ($this->caps_handler->userCanTrashQuestionGroups()) {
            $this->_views['trash']['count'] = $this->_admin_page->get_trashed_question_groups(
                $this->_per_page,
                $this->_current_page,
                true
            );
        }
    }


    /**
     * @throws ReflectionException
     * @throws EE_Error
     */
    public function column_cb($item)
    {
        $system_group = $item->get('QSG_system');
        $user_can_trash_it = $this->caps_handler->userCanTrashQuestionGroup($item);
        $has_questions_with_answers = ! $system_group && $this->_view == 'trash' && $item->has_questions_with_answers();
        $notice = ! $user_can_trash_it
            ? esc_html__('You do not have the required permissions to trash this question group', 'event_espresso')
            : '';
        $notice = $has_questions_with_answers
            ? esc_html__('This question group is a system group and cannot be trashed', 'event_espresso')
            : $notice;
        $notice = $has_questions_with_answers
            ? esc_html__(
                'This question group has questions that have answers attached to it from registrations that have the question. It cannot be permanently deleted.',
                'event_espresso'
            )
            : $notice;
        return $system_group || $has_questions_with_answers || ! $user_can_trash_it
            ? '<span class="dashicons dashicons-lock ee-locked-entity ee-aria-tooltip" aria-label="' . $notice . '"></span>'
              . sprintf(
                  '<input type="hidden" name="hdnchk[%1$d]" value="%1$d" />',
                  $item->ID()
              )
            : sprintf(
                '<input type="checkbox" id="QSG_ID[%1$d]" name="checkbox[%1$d]" value="%1$d" />',
                $item->ID()
            );
    }


    public function column_id(EE_Question_Group $item)
    {
        $content = '
            <span class="ee-entity-id">' . $item->ID() . '</span>
            <span class="show-on-mobile-view-only">
                ' . $item->name() . '
            </span>';
        return $this->columnContent('id', $content, 'end');
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_name(EE_Question_Group $question_group, bool $prep_content = true): string
    {
        $actions = [];

        if ($this->caps_handler->userCanEditQuestionGroup($question_group)) {
            $actions['edit'] = $this->getActionLink(
                $this->getActionUrl($question_group, self::ACTION_EDIT),
                esc_html__('Edit', 'event_espresso'),
                esc_attr__('Edit Question Group', 'event_espresso')
            );
        }
        if (
            $question_group->get('QSG_system') < 1
            && $this->_view != 'trash'
            && $this->caps_handler->userCanEditQuestionGroup($question_group)
        ) {
            $actions['delete'] = $this->getActionLink(
                $this->getActionUrl($question_group, self::ACTION_TRASH),
                esc_html__('Trash', 'event_espresso'),
                esc_attr__('Trash Question Group', 'event_espresso')
            );
        }

        if ($this->_view == 'trash') {
            if ($this->caps_handler->userCanRestoreQuestionGroup($question_group)) {
                $actions['restore'] = $this->getActionLink(
                    $this->getActionUrl($question_group, self::ACTION_RESTORE),
                    esc_html__('Restore', 'event_espresso'),
                    esc_attr__('Restore Question Group', 'event_espresso')
                );
            }

            if (
                ! $question_group->has_questions_with_answers()
                && $this->caps_handler->userCanDeleteQuestionGroup($question_group)
            ) {
                $actions['delete'] = $this->getActionLink(
                    $this->getActionUrl($question_group, self::ACTION_DELETE),
                    esc_html__('Delete Permanently', 'event_espresso'),
                    esc_attr__('Delete Question Group Permanently', 'event_espresso')
                );
            }
        }

        $content = $this->caps_handler->userCanEditQuestionGroup($question_group)
            ? $this->getActionLink(
                $this->getActionUrl($question_group, self::ACTION_EDIT),
                $question_group->name(),
                esc_attr__('Edit Question Group', 'event_espresso'),
                'row-title'
            )
            : $question_group->name();
        $content .= $this->row_actions($actions);

        return $prep_content ? $this->columnContent('name', $content) : $content;
    }


    /**
     * @param EE_Question_Group $question_group
     * @param                   $action
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     * @since $VID:$
     */
    protected function getActionUrl(EE_Question_Group $question_group, $action): string
    {
        if (! in_array($action, self::$actions)) {
            throw new DomainException(esc_html__('Invalid Action', 'event_espresso'));
        }
        return EE_Admin_Page::add_query_args_and_nonce(
            [
                'action'   => "{$action}_question_group",
                'QSG_ID'   => $question_group->ID(),
                'noheader' => $action !== self::ACTION_EDIT,
            ],
            EE_FORMS_ADMIN_URL
        );
    }


    public function column_identifier(EE_Question_Group $question_group): string
    {
        return $this->columnContent('identifier', $question_group->identifier());
    }


    public function column_description(EE_Question_Group $question_group): string
    {
        return $this->columnContent('description', $question_group->desc());
    }


    public function column_show_group_name(EE_Question_Group $question_group): string
    {
        return $this->columnContent('show_group_name', $this->_yes_no[ $question_group->show_group_name() ]);
    }


    public function column_show_group_desc(EE_Question_Group $question_group): string
    {
        return $this->columnContent('show_group_desc', $this->_yes_no[ $question_group->show_group_desc() ]);
    }
}
