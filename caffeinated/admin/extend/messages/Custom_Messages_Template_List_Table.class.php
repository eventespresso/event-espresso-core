<?php

/**
 * Messages_Template_List_Table
 * extends EE_Admin_List_Table class
 *
 * @package         Event Espresso
 * @subpackage      /includes/core/admin/messages
 * @author          Darren Ethier
 * ------------------------------------------------------------------------
 */
class Custom_Messages_Template_List_Table extends Messages_Template_List_Table
{

    /**
     * Setup initial data.
     */
    protected function _setup_data()
    {
        $this->_data = $this->get_admin_page()->get_message_templates(
            $this->_per_page,
            $this->_view,
            false,
            false,
            false
        );
        $this->_all_data_count = $this->get_admin_page()->get_message_templates(
            $this->_per_page,
            $this->_view,
            true,
            true,
            false
        );
    }


    /**
     * Set initial properties
     */
    protected function _set_properties()
    {
        parent::_set_properties();
        $this->_wp_list_args = array(
            'singular' => esc_html__('Message Template Group', 'event_espresso'),
            'plural'   => esc_html__('Message Template', 'event_espresso'),
            'ajax'     => true, // for now,
            'screen'   => $this->get_admin_page()->get_current_screen()->id,
        );

        $this->_columns = array_merge(
            array(
                'cb'   => '<input type="checkbox" />',
                'name' => esc_html__('Template Name', 'event_espresso'),
            ),
            $this->_columns,
            array(
                'events'  => esc_html__('Events', 'event_espresso'),
                'actions' => '',
            )
        );
    }


    /**
     * Custom message for when there are no items found.
     *
     * @since 4.3.0
     */
    public function no_items()
    {
        if ($this->_view !== 'trashed') {
            printf(
                esc_html__(
                    '%sNo Custom Templates found.%s To create your first custom message template, go to the "Default Message Templates" tab and click the "Create Custom" button next to the template you want to use as a base for the new one.',
                    'event_espresso'
                ),
                '<strong>',
                '</strong>'
            );
        } else {
            parent::no_items();
        }
    }


    /**
     * @param EE_Message_Template_Group $item
     * @return string
     */
    public function column_cb($item)
    {
        return sprintf('<input type="checkbox" name="checkbox[%s]" value="1" />', $item->GRP_ID());
    }


    /**
     * @param EE_Message_Template_Group $item
     * @return string
     */
    public function column_name($item)
    {
        return '<p>' . $item->name() . '</p>';
    }


    /**
     * @param EE_Message_Template_Group $item
     * @return string
     */
    public function column_actions($item)
    {
        if (EE_Registry::instance()->CAP->current_user_can(
            'ee_edit_messages',
            'espresso_messages_add_new_message_template'
        )) {
            $create_args = array(
                'GRP_ID'       => $item->ID(),
                'messenger'    => $item->messenger(),
                'message_type' => $item->message_type(),
                'action'       => 'add_new_message_template',
            );
            $create_link = EE_Admin_Page::add_query_args_and_nonce($create_args, EE_MSG_ADMIN_URL);
            return sprintf(
                '<p><a href="%s" class="button button-small">%s</a></p>',
                $create_link,
                esc_html__('Create Custom', 'event_espresso')
            );
        }
        return '';
    }

    /**
     * Set the view counts on the _views property
     */
    protected function _add_view_counts()
    {
        foreach ($this->_views as $view => $args) {
            $this->_views[ $view ]['count'] = $this->get_admin_page()->get_message_templates(
                $this->_per_page,
                $view,
                true,
                true,
                false
            );
        }
    }


    /**
     * column_events
     * This provides a count of events using this custom template
     *
     * @param  EE_Message_Template_Group $item message_template group data
     * @return string column output
     */
    public function column_events($item)
    {
        return $item->count_events();
    }


    /**
     * Add additional actions for custom message template list view.
     *
     * @param EE_Message_Template_Group $item
     * @return array
     * @throws EE_Error
     */
    protected function _get_actions_for_messenger_column(EE_Message_Template_Group $item)
    {
        $actions = parent::_get_actions_for_messenger_column($item);

        // add additional actions for trash/restore etc.
        $trash_lnk_url = EE_Admin_Page::add_query_args_and_nonce(array(
            'action'   => 'trash_message_template',
            'id'       => $item->GRP_ID(),
            'noheader' => true,
        ), EE_MSG_ADMIN_URL);
        // restore link
        $restore_lnk_url = EE_Admin_Page::add_query_args_and_nonce(array(
            'action'   => 'restore_message_template',
            'id'       => $item->GRP_ID(),
            'noheader' => true,
        ), EE_MSG_ADMIN_URL);
        // delete price link
        $delete_lnk_url = EE_Admin_Page::add_query_args_and_nonce(array(
            'action'   => 'delete_message_template',
            'id'       => $item->GRP_ID(),
            'noheader' => true,
        ), EE_MSG_ADMIN_URL);

        if (! $item->get('MTP_deleted')
            && EE_Registry::instance()->CAP->current_user_can(
                'ee_delete_message',
                'espresso_messages_trash_message_template',
                $item->ID()
            )
        ) {
            $actions['trash'] = '<a href="'
                                . $trash_lnk_url
                                . '" title="'
                                . esc_attr__('Move Template Group to Trash', 'event_espresso')
                                . '">'
                                . esc_html__('Move to Trash', 'event_espresso')
                                . '</a>';
        } else {
            if (EE_Registry::instance()->CAP->current_user_can(
                'ee_delete_message',
                'espresso_messages_restore_message_template',
                $item->ID()
            )) {
                $actions['restore'] = '<a href="'
                                      . $restore_lnk_url
                                      . '" title="'
                                      . esc_attr__('Restore Message Template', 'event_espresso')
                                      . '">'
                                      . esc_html__('Restore', 'event_espresso') . '</a>';
            }

            if ($this->_view === 'trashed'
                && EE_Registry::instance()->CAP->current_user_can(
                    'ee_delete_message',
                    'espresso_messages_delete_message_template',
                    $item->ID()
                )) {
                $actions['delete'] = '<a href="'
                                     . $delete_lnk_url
                                     . '" title="'
                                     . esc_attr__('Delete Template Group Permanently', 'event_espresso')
                                     . '">'
                                     . esc_html__('Delete Permanently', 'event_espresso')
                                     . '</a>';
            }
        }
        return $actions;
    }


    /**
     * Generate dropdown filter select input for messengers
     *
     * @param bool $global
     * @return string
     * @throws EE_Error
     */
    protected function _get_messengers_dropdown_filter($global = true)
    {
        return parent::_get_messengers_dropdown_filter(false);
    }


    /**
     * Generate dropdown filter select input for message types
     *
     * @param bool $global
     * @return string
     * @throws EE_Error
     */
    protected function _get_message_types_dropdown_filter($global = true)
    {
        return parent::_get_message_types_dropdown_filter(false);
    }
}
