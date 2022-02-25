<?php

use EventEspresso\core\domain\services\capabilities\user_caps\RegFormListTableUserCapabilities;

/**
 * Registration_Form_Questions_Admin_List_Table
 *
 * Class for preparing the table listing all the custom event questions
 *
 * note: anywhere there are no php docs it is because the docs are available in the parent class.
 *
 * @package         Registration_Form_Questions_Admin_List_Table
 * @subpackage      includes/core/admin/events/Registration_Form_Questions_Admin_List_Table.class.php
 * @author          Darren Ethier
 */
class Registration_Form_Questions_Admin_List_Table extends EE_Admin_List_Table
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
        if (isset($this->_req_data['status']) && $this->_req_data['status'] == 'trash') {
            $this->_data = $this->_admin_page->get_trashed_questions($this->_per_page, $this->_current_page, false);
        } else {
            $this->_data = $this->_admin_page->get_questions($this->_per_page, $this->_current_page, false);
        }
        $this->_all_data_count = $this->_admin_page->get_questions($this->_per_page, $this->_current_page, true);
    }


    protected function _set_properties()
    {
        $this->_wp_list_args = array(
            'singular' => esc_html__('question', 'event_espresso'),
            'plural'   => esc_html__('questions', 'event_espresso'),
            'ajax'     => true, // for now,
            'screen'   => $this->_admin_page->get_current_screen()->id,
        );

        $this->_columns = array(
            'cb'           => '<input type="checkbox" />',
            'id'           => esc_html__('ID', 'event_espresso'),
            'display_text' => esc_html__('Question', 'event_espresso'),
            'admin_label'  => esc_html__('Admin Label', 'event_espresso'),
            'type'         => esc_html__('Type', 'event_espresso'),
            'values'       => esc_html__('Values', 'event_espresso'),
            'required'     => esc_html__('Req', 'event_espresso'),
        );

        $this->_primary_column = 'id';

        $this->_sortable_columns = array(
            'id'           => array('QST_ID' => false),
            'display_text' => array('QST_display_text' => false),
        );

        $this->_hidden_columns = array();
    }


    // not needed
    protected function _get_table_filters()
    {
        return array();
    }


    protected function _add_view_counts()
    {
        $this->_views['all']['count'] = $this->_admin_page->get_questions($this->_per_page, $this->_current_page, true);
        if ($this->caps_handler->userCanTrashQuestions()) {
            $this->_views['trash']['count'] = $this->_admin_page->get_trashed_questions(-1, $this->_current_page, true);
        }
    }


    /**
     * @param EE_Question $item
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_cb($item)
    {
        $system_question = $item->is_system_question();
        $related_answer_count = $item->count_related('Answer');
        $has_answers = ! $system_question && $related_answer_count > 0 && $this->_view == 'trash';
        $notice = $has_answers
            ? esc_html__(
                'This question has answers attached to it from registrations that have the question.  It cannot be permanently deleted.',
                'event_espresso'
            )
            : esc_html__('This question is a system question and cannot be trashed', 'event_espresso');

        return $system_question || $has_answers
            ? '
            <span class="dashicons dashicons-lock ee-locked-entity ee-aria-tooltip" 
                    aria-label="' . $notice . '"></span>
            ' . sprintf('<input type="hidden" name="hdnchk[%1$d]" value="%1$d" />', $item->ID())
            : sprintf('<input type="checkbox" class="QST_ID" name="checkbox[%1$d]" value="%1$d" />', $item->ID());
    }


    /**
     * @param EE_Question $item
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_id($item)
    {
        $content = '
            <span class="ee-entity-id">' . $item->ID() . '</span>
            <span class="show-on-mobile-view-only">
                ' . $this->column_display_text($item, false) . '
            </span>';
        return $this->columnContent('id', $content, 'end');
    }


    /**
     * @param EE_Question $question
     * @param bool        $prep_content
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_display_text(EE_Question $question, bool $prep_content = true): string
    {
        if ($this->caps_handler->userCanEditQuestion($question)) {
            $content = $this->$this->getActionLink(
                $this->getActionUrl($question, self::ACTION_EDIT),
                $prep_content ? $question->display_text() : $question->admin_label(),
                esc_attr__('Edit Question', 'event_espresso'),
                'row-title'
            );
            $content .= $this->row_actions(
                [
                    'edit' => $this->getActionLink(
                        $this->getActionUrl($question, self::ACTION_EDIT),
                        esc_html__('Edit', 'event_espresso'),
                        esc_attr__('Edit Question', 'event_espresso')
                    )
                ]
            );
        } else {
            $content = $question->display_text();
        }

        return $prep_content ? $this->columnContent('display_text', $content) : $content;
    }


    /**
     * @param EE_Question $question
     * @param string      $action
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     * @since $VID:$
     */
    protected function getActionUrl(EE_Question $question, string $action): string
    {
        if (! in_array($action, self::$actions)) {
            throw new DomainException(esc_html__('Invalid Action', 'event_espresso'));
        }
        return EE_Admin_Page::add_query_args_and_nonce(
            [
                'action'   => $action === self::ACTION_DELETE ? "{$action}_questions" : "{$action}_question",
                'QST_ID'   => $question->ID(),
                'noheader' => $action !== self::ACTION_EDIT,
            ],
            EE_FORMS_ADMIN_URL
        );
    }


    public function column_admin_label(EE_Question $item): string
    {
        return $this->columnContent('admin_label', $item->admin_label());
    }


    public function column_values(EE_Question $item): string
    {
        $optionNames = array();
        $options = $item->options();
        if (empty($options)) {
            $content = "N/A";
        } else {
            foreach ($options as $option) {
                $optionNames[] = $option->value();
            }
            $content = implode(', ', $optionNames);
        }
        return $this->columnContent('values', $content);
    }


    public function column_type(EE_Question $item): string
    {
        return $this->columnContent('type', $item->type());
    }


    public function column_required(EE_Question $item): string
    {
        $content = $item->required() ? 'Yes' : '';
        return $this->columnContent('required', $content);
    }
}
