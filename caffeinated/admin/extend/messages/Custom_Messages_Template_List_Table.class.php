<?php

/**
 * Messages_Template_List_Table
 * extends EE_Admin_List_Table class
 *
 * @package         Event Espresso
 * @subpackage      /includes/core/admin/messages
 * @author          Darren Ethier
 */
class Custom_Messages_Template_List_Table extends Messages_Template_List_Table
{
    /**
     * Setup initial data.
     *
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _setup_data()
    {
        $this->_data           = $this->get_admin_page()->get_message_templates(
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
        $this->_wp_list_args = [
            'singular' => esc_html__('Message Template Group', 'event_espresso'),
            'plural'   => esc_html__('Message Template', 'event_espresso'),
            'ajax'     => true, // for now,
            'screen'   => $this->get_admin_page()->get_current_screen()->id,
        ];

        $this->_columns = array_merge(
            [
                'cb'   => '<input type="checkbox" />',
                'name' => esc_html__('Template Name', 'event_espresso'),
            ],
            $this->_columns,
            [
                'events'  => esc_html__('Events', 'event_espresso'),
                'actions' => $this->actionsColumnHeader(),
            ]
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
     * @throws EE_Error
     */
    public function column_cb($item)
    {
        return sprintf('<input type="checkbox" name="checkbox[%s]" value="1" />', $item->GRP_ID());
    }


    /**
     * @param EE_Message_Template_Group $item
     * @return string
     * @throws EE_Error
     */
    public function column_name(EE_Message_Template_Group $item): string
    {
        return '<p>' . $item->name() . '</p>';
    }


    /**
     * @param EE_Message_Template_Group $item
     * @return string
     * @throws EE_Error
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_actions(EE_Message_Template_Group $item): string
    {
        $actions = '';
        if (
            EE_Registry::instance()->CAP->current_user_can(
                'ee_edit_messages',
                'espresso_messages_add_new_message_template'
            )
        ) {
            $create_link = EE_Admin_Page::add_query_args_and_nonce(
                [
                    'GRP_ID'       => $item->ID(),
                    'messenger'    => $item->messenger(),
                    'message_type' => $item->message_type(),
                    'action'       => 'add_new_message_template',
                ],
                EE_MSG_ADMIN_URL
            );

            $actions .= "
            <a href='$create_link'
               aria-label='" . esc_html__('Create Custom Message Template', 'event_espresso') . "'
               class='ee-aria-tooltip button button--icon-only'
            >
                <span class='dashicons dashicons-admin-customizer'></span>
            </a>";
        }


        if (
            ! $item->get('MTP_deleted')
            && EE_Registry::instance()->CAP->current_user_can(
                'ee_delete_message',
                'espresso_messages_trash_message_template',
                $item->ID()
            )
        ) {
            // add additional actions for trash/restore etc.
            $trash_lnk_url = EE_Admin_Page::add_query_args_and_nonce(
                [
                    'action'   => 'trash_message_template',
                    'id'       => $item->GRP_ID(),
                    'noheader' => true,
                ],
                EE_MSG_ADMIN_URL
            );
            $actions .= '
                <a href="' . $trash_lnk_url . '"
                   aria-label="' . esc_attr__('Move Template Group to Trash', 'event_espresso') . '"
                   class="ee-aria-tooltip button button--icon-only"
                >
                   <span class="dashicons dashicons-trash"></span>
                </a>';
        } else {
            if (
                EE_Registry::instance()->CAP->current_user_can(
                    'ee_delete_message',
                    'espresso_messages_restore_message_template',
                    $item->ID()
                )
            ) {
                // restore link
                $restore_lnk_url = EE_Admin_Page::add_query_args_and_nonce(
                    [
                        'action'   => 'restore_message_template',
                        'id'       => $item->GRP_ID(),
                        'noheader' => true,
                    ],
                    EE_MSG_ADMIN_URL
                );
                $actions .= '
                    <a href="' . $restore_lnk_url . '"
                       aria-label="' . esc_attr__('Restore Message Template', 'event_espresso') . '"
                       class="ee-aria-tooltip button button--icon-only"
                    >
                        <span class="dashicons dashicons-undo"></span>
                    </a>';
            }

            if (
                $this->_view === 'trashed'
                && EE_Registry::instance()->CAP->current_user_can(
                    'ee_delete_message',
                    'espresso_messages_delete_message_template',
                    $item->ID()
                )
            ) {
                // delete price link
                $delete_lnk_url = EE_Admin_Page::add_query_args_and_nonce(
                    [
                        'action'   => 'delete_message_template',
                        'id'       => $item->GRP_ID(),
                        'noheader' => true,
                    ],
                    EE_MSG_ADMIN_URL
                );
                $actions .= '
                    <a href="' . $delete_lnk_url . '"
                       aria-label="' . esc_attr__('Delete Template Group Permanently', 'event_espresso') . '"
                       class="ee-aria-tooltip button button--icon-only"
                    >
                        <span class="dashicons dashicons-trash"></span>
                    </a>';
            }
        }

        return $this->actionsModalMenu(
            $this->_action_string(
                $actions,
                $item,
                'div',
                'custom-messages-overview-actions ee-list-table-actions'
            )
        );
    }


    /**
     * Set the view counts on the _views property
     *
     * @throws EE_Error
     * @throws ReflectionException
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
     * @param EE_Message_Template_Group $item message_template group data
     * @return string column output
     */
    public function column_events(EE_Message_Template_Group $item): string
    {
        return $item->count_events();
    }


    /**
     * Generate dropdown filter select input for messengers
     *
     * @param bool $global
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _get_messengers_dropdown_filter(bool $global = true): string
    {
        return parent::_get_messengers_dropdown_filter(false);
    }


    /**
     * Generate dropdown filter select input for message types
     *
     * @param bool $global
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _get_message_types_dropdown_filter(bool $global = true): string
    {
        return parent::_get_message_types_dropdown_filter(false);
    }
}
