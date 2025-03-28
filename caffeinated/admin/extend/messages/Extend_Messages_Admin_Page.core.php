<?php

/**
 * Extend_Messages_Admin_Page
 *
 * This is the Messages Caffeinated admin page.  //for now this is fairly bare, most functionality is contained in the
 * parent class, however, it is likely that at some point in the future this will change so having this extended class
 * will be handy.  We also need this if we're going to have an extended "hooks" file.
 *
 * @package         Extend_Messages_Admin_Page
 * @subpackage      caffeinated/admin/extend/messages/Extend_Messages_Admin_Page.core.php
 * @author          Darren Ethier
 */
class Extend_Messages_Admin_Page extends Messages_Admin_Page
{
    public function __construct($routing = true)
    {
        parent::__construct($routing);
        if (! defined('EE_MSG_CAF_ASSETS_PATH')) {
            define('EE_MSG_CAF_ASSETS_PATH', EE_CORE_CAF_ADMIN_EXTEND . 'messages/assets/');
            define('EE_MSG_CAF_ASSETS_URL', EE_CORE_CAF_ADMIN_EXTEND_URL . 'messages/assets/');
            define('EE_MSG_CAF_TEMPLATE_PATH', EE_CORE_CAF_ADMIN_EXTEND . 'messages/templates/');
            define('EE_MSG_CAF_TEMPLATE_URL', EE_CORE_CAF_ADMIN_EXTEND_URL . 'messages/templates/');
        }
    }


    protected function _set_page_config()
    {
        parent::_set_page_config();

        $this->_admin_base_path            = EE_CORE_CAF_ADMIN_EXTEND . 'messages';
        $this->_page_routes['custom_mtps'] = [
            'func'       => [$this, '_ee_custom_messages_overview_list_table'],
            'capability' => 'ee_read_messages',
        ];
        $this->_page_config['custom_mtps'] = [
            'nav'           => [
                'label' => esc_html__('Custom Message Templates', 'event_espresso'),
                'icon'  => 'dashicons-art',
                'order' => 30,
            ],
            'list_table'    => 'Custom_Messages_Template_List_Table',
            'help_tabs'     => [
                'message_overview_message_types_help_tab' => [
                    'title'    => esc_html__('Message Types', 'event_espresso'),
                    'filename' => 'messages_overview_types',
                ],
                'messages_overview_messengers_help_tab'   => [
                    'title'    => esc_html__('Messengers', 'event_espresso'),
                    'filename' => 'messages_overview_messengers',
                ],
                'messages_overview_other_help_tab'        => [
                    'title'    => esc_html__('Messages Other', 'event_espresso'),
                    'filename' => 'messages_overview_other',
                ],
            ],
            'require_nonce' => false,
        ];

        add_action('current_screen', [$this, 'dynamic_screen_hooks']);
    }


    /**
     * Callback for current_screen action
     * This is used for any filters and/or actions that require the dynamic screen hook_prefix to be correct.
     *
     * @return void
     * @since 4.5.0
     *
     */
    public function dynamic_screen_hooks()
    {
        global $admin_page_hooks;

        if (! empty($admin_page_hooks['espresso_events'])) {
            // we're on a EE specific page... good stuff!
            $hook_prefix = $admin_page_hooks['espresso_events'];
            $filter_ref  = "{$hook_prefix}_page_$this->page_slug";
            add_filter("FHEE_manage_{$filter_ref}_columns", [$this, 'add_custom_mtps_columns'], 10, 3);
            add_action(
                'AHEE__EE_Admin_List_Table__column_actions__' . $filter_ref,
                [$this, 'custom_mtp_create_button_column'],
                10,
                2
            );
        }
    }


    /**
     * This is the callback for the FHEE__manage_event-espresso_page_espresso_messages_columns to register the
     * caffeinated columns for the global message templates list table.
     *
     * @param array  $columns   Original defined list of columns
     * @param string $screen_id The unique screen id for the page.
     * @return array
     * @since 4.3.2
     *
     */
    public function add_custom_mtps_columns($columns, $screen_id, EE_Admin_List_Table $list_table)
    {
        if ($screen_id !== 'espresso_messages_global_mtps') {
            return $columns;
        }
        $columns['actions'] = $list_table->actionsColumnHeader();
        return $columns;
    }


    /**
     * Callback for FHEE__EE_Admin_List_Table__column_actions__event-espresso_page_espresso_messages action that allows
     * for adding the content for the registered "action" column.
     *
     * @param EE_Base_Class
     * @param string $screen_id Unique screen id for the page
     *
     * @return string html content for the page.
     * @throws EE_Error
     * @throws ReflectionException
     * @since 4.3.2
     */
    public function custom_mtp_create_button_column(EE_Base_Class $item, string $screen_id)
    {
        if (
            $screen_id !== 'espresso_messages_global_mtps'
            || ! EE_Registry::instance()->CAP->current_user_can(
                'ee_edit_messages',
                'espresso_messages_add_new_message_template'
            )
        ) {
            return '';
        }

        // first we consider whether this template has override set.  If it does then that means no custom templates can be created from this template as a base.  So let's just skip the button creation.
        if ($item->get('MTP_is_override')) {
            return '';
        }

        $create_link = EE_Admin_Page::add_query_args_and_nonce(
            [
                'GRP_ID'       => $item->ID(),
                'messenger'    => $item->messenger(),
                'message_type' => $item->message_type(),
                'action'       => 'add_new_message_template',
            ],
            EE_MSG_ADMIN_URL
        );
        $aria_label  = esc_html__('Create Custom Message Template', 'event_espresso');
        echo "
        <a href='$create_link' class='ee-aria-tooltip button button--icon-only' aria-label='$aria_label'>
            <span class='dashicons dashicons-admin-customizer'></span>
        </a>";
        return '';
    }


    protected function _add_screen_options_custom_mtps()
    {
        $page_title              = $this->_admin_page_title;
        $this->_admin_page_title = esc_html__('Custom Message Templates', 'event_espresso');
        $this->_per_page_screen_option();
        $this->_admin_page_title = $page_title;
    }


    /**
     * set views array for Custom Templates list table
     *
     * @access public
     * @return void
     */
    public function _set_list_table_views_custom_mtps()
    {
        $this->_views = [
            'in_use' => [
                'slug'        => 'in_use',
                'label'       => esc_html__('In Use', 'event_espresso'),
                'count'       => 0,
                'bulk_action' => [
                    'trash_message_template' => esc_html__('Move to Trash', 'event_espresso'),
                ],
            ],
        ];
        if (
            EE_Registry::instance()->CAP->current_user_can(
                'ee_delete_messages',
                'espresso_messages_trash_message_template'
            )
        ) {
            $this->_views['trashed'] = [
                'slug'        => 'trashed',
                'label'       => esc_html__('Trash', 'event_espresso'),
                'count'       => 0,
                'bulk_action' => [
                    'restore_message_template' => esc_html__('Restore From Trash', 'event_espresso'),
                    'delete_message_template'  => esc_html__('Delete Permanently', 'event_espresso'),
                ],
            ];
        }
    }


    /**
     * @throws EE_Error
     */
    protected function _ee_custom_messages_overview_list_table()
    {
        $this->_admin_page_title = esc_html__('Custom Message Templates', 'event_espresso');
        $this->display_admin_list_table_page_with_no_sidebar();
    }
}
