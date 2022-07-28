<?php

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
 *
 * ------------------------------------------------------------------------
 */
class Registration_Form_Questions_Admin_List_Table extends EE_Admin_List_Table
{
    public function __construct($admin_page)
    {
        parent::__construct($admin_page);
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
        if (
            EE_Registry::instance()->CAP->current_user_can(
                'ee_delete_questions',
                'espresso_registration_form_trash_question'
            )
        ) {
            $this->_views['trash']['count'] = $this->_admin_page->get_trashed_questions(-1, $this->_current_page, true);
        }
    }


    public function column_cb($item)
    {
        $system_question = $item->is_system_question();
        $related_answer_count = $item->count_related('Answer');
        $lock_icon = (! $system_question && $related_answer_count > 0 && $this->_view == 'trash')
            ? 'ee-lock-icon ee-alternate-color' : 'ee-lock-icon ee-system-lock';
        return $system_question || (! $system_question && $related_answer_count > 0 && $this->_view == 'trash')
            ? '<span class="' . $lock_icon . '"></span>' . sprintf(
                '<input type="hidden" name="hdnchk[%1$d]" value="%1$d" />',
                $item->ID()
            ) : sprintf('<input type="checkbox" class="QST_ID" name="checkbox[%1$d]" value="%1$d" />', $item->ID());
    }


    public function column_id(EE_Question $item)
    {
        $content = $item->ID();
        $content .= '  <span class="show-on-mobile-view-only">' . $item->display_text() . '</span>';
        return $content;
    }


    public function column_display_text(EE_Question $item)
    {
        $system_question = $item->is_system_question();

        if (! defined('REG_ADMIN_URL')) {
            define('REG_ADMIN_URL', EVENTS_ADMIN_URL);
        }

        $edit_query_args = array(
            'action' => 'edit_question',
            'QST_ID' => $item->ID(),
        );

        if (
            EE_Registry::instance()->CAP->current_user_can(
                'ee_edit_question',
                'espresso_registration_form_edit_question',
                $item->ID()
            )
        ) {
            $edit_link = EE_Admin_Page::add_query_args_and_nonce($edit_query_args, EE_FORMS_ADMIN_URL);

            $actions = array(
                'edit' => '<a href="' . $edit_link . '" aria-label="' . esc_attr__(
                    'Edit Event',
                    'event_espresso'
                ) . '">' . esc_html__('Edit', 'event_espresso') . '</a>',
            );
        }


        $content = EE_Registry::instance()->CAP->current_user_can(
            'ee_edit_question',
            'espresso_registration_form_edit_question',
            $item->ID()
        ) ? '<strong><a class="row-title" href="' . $edit_link . '">' . $item->display_text() . '</a></strong>'
            : $item->display_text();
        $content .= $this->row_actions($actions);
        return $content;
    }


    public function column_admin_label(EE_Question $item)
    {
        return $item->admin_label();
    }


    public function column_values(EE_Question $item)
    {
        $optionNames = array();
        $options = $item->options();
        if (empty($options)) {
            return "N/A";
        } else {
            foreach ($options as $optionID => $option) {
                /* @var $option EE_Question_Option */
                $optionNames[] = $option->value();
            }
            return implode(', ', $optionNames);
        }
    }


    public function column_type(EE_Question $item)
    {
        return $item->type();
    }


    public function column_required(EE_Question $item)
    {
        return $item->required() ? 'Yes' : '';
    }
}
