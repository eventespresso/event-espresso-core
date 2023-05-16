<?php

/**
 * EE_Message_List_Table
 * extends EE_Admin_List_Table class
 *
 * @package        Event Espresso
 * @subpackage     /includes/core/admin/messages
 * @author         Darren Ethier
 */
class EE_Message_List_Table extends EE_Admin_List_Table
{
    /**
     * @return EE_Admin_Page
     */
    public function get_admin_page(): EE_Admin_Page
    {
        return $this->_admin_page;
    }


    /**
     * @throws EE_Error|ReflectionException
     */
    protected function _setup_data()
    {
        $this->_data           = $this->_get_messages($this->_per_page, $this->_view);
        $this->_all_data_count = $this->_get_messages($this->_per_page, $this->_view, true);
    }


    protected function _set_properties()
    {
        $this->_wp_list_args = [
            'singular' => esc_html__('Message', 'event_espresso'),
            'plural'   => esc_html__('Messages', 'event_espresso'),
            'ajax'     => true,
            'screen'   => $this->get_admin_page()->get_current_screen()->id,
        ];

        $this->_columns = [
            'cb'             => '<input type="checkbox" />',
            'id'             => esc_html__('ID', 'event_espresso'),
            'to'             => esc_html__('To', 'event_espresso'),
            'recipient_name' => esc_html__('Name', 'event_espresso'),
            'context'        => esc_html__('Recipient', 'event_espresso'),
            'message_type'   => esc_html__('Message Type', 'event_espresso'),
            'messenger'      => esc_html__('Messenger', 'event_espresso'),
            'from'           => esc_html__('From', 'event_espresso'),
            'modified'       => esc_html__('Modified', 'event_espresso'),
            'actions'        => $this->actionsColumnHeader(),
        ];

        $this->_sortable_columns = [
            'modified'     => ['MSG_modified' => true],
            'message_type' => ['MSG_message_type' => false],
            'messenger'    => ['MSG_messenger' => false],
            'to'           => ['MSG_to' => false],
            'from'         => ['MSG_from' => false],
            'context'      => ['MSG_context' => false],
            'id'           => ['MSG_ID', false],
        ];

        $this->_primary_column = 'to';

        $this->_hidden_columns = [
            'id',
        ];
    }


    /**
     * This simply sets up the row class for the table rows.
     * Allows for easier overriding of child methods for setting up sorting.
     *
     * @param object $item the current item
     * @return string
     */
    protected function _get_row_class($item): string
    {
        $class = parent::_get_row_class($item);
        // add status class
        $class .= ' msg-status-' . $item->STS_ID();
        if ($this->_has_checkbox_column) {
            $class .= ' has-checkbox-column';
        }
        return $class;
    }


    /**
     * _get_table_filters
     * We use this to assemble and return any filters that are associated with this table that help further refine what
     * gets shown in the table.
     *
     * @abstract
     * @return array
     * @throws EE_Error|ReflectionException
     */
    protected function _get_table_filters(): array
    {
        $filters = [];

        // get select_inputs
        $select_inputs = [
            $this->_get_messengers_dropdown_filter(),
            $this->_get_message_types_dropdown_filter(),
            $this->_get_contexts_for_message_types_dropdown_filter(),
        ];

        // set filters to select inputs if they aren't empty
        foreach ($select_inputs as $select_input) {
            if ($select_input) {
                $filters[] = $select_input;
            }
        }
        return $filters;
    }


    /**
     * @throws ReflectionException
     * @throws EE_Error
     */
    protected function _add_view_counts()
    {
        foreach ($this->_views as $view => $args) {
            $this->_views[ $view ]['count'] = $this->_get_messages($this->_per_page, $view, true, true);
        }
    }


    /**
     * @param EE_Message $message
     * @return string   checkbox
     * @throws EE_Error|ReflectionException
     */
    public function column_cb($message): string
    {
        return sprintf('<input type="checkbox" name="MSG_ID[%s]" value="1" />', $message->ID());
    }


    /**
     * @param EE_Message $message
     * @return string
     * @throws EE_Error|ReflectionException
     */
    public function column_id(EE_Message $message): string
    {
        return $this->columnContent('id', $message->ID(), 'center');
    }


    /**
     * @param EE_Message $message
     * @return string    The recipient of the message
     * @throws EE_Error|ReflectionException
     */
    public function column_to(EE_Message $message): string
    {
        $delete_url    = EEH_URL::add_query_args_and_nonce(
            [
                'page'   => 'espresso_messages',
                'action' => 'delete_ee_message',
                'MSG_ID' => $message->ID(),
            ],
            admin_url('admin.php')
        );
        $actions       = [
            'delete' => '<a href="' . $delete_url . '">' . esc_html__('Delete', 'event_espresso') . '</a>',
        ];
        $status        = esc_attr($message->STS_ID());
        $pretty_status = EEH_Template::pretty_status($status, false, 'sentence');
        return '
        <div class="ee-layout-row">
            <span class="row-title ee-status-color--' . $status . ' ee-aria-tooltip" aria-label="' . $pretty_status . '">
                <span class="ee-status-dot ee-status-bg--' . $status . '"></span>
                ' . esc_html($message->to()) . '
            </span>
        </div>' . $this->row_actions($actions);
    }


    /**
     * @param EE_Message $message
     * @return string
     * @throws EE_Error|ReflectionException
     */
    public function column_recipient_name(EE_Message $message): string
    {
        $recipient = $message->recipient_object();
        return $this->columnContent('recipient_name', $recipient ? $recipient->name() : '');
    }


    /**
     * @param EE_Message $message
     * @return string   The sender of the message
     */
    public function column_from(EE_Message $message): string
    {
        return esc_html($message->from());
    }


    /**
     * @param EE_Message $message
     * @return string  The messenger used to send the message.
     */
    public function column_messenger(EE_Message $message): string
    {
        return ucwords($message->messenger_label());
    }


    /**
     * @param EE_Message $message
     * @return string  The message type used to generate the message.
     */
    public function column_message_type(EE_Message $message): string
    {
        return ucwords($message->message_type_label());
    }


    /**
     * @param EE_Message $message
     * @return string  The context the message was generated for.
     */
    public function column_context(EE_Message $message): string
    {
        return $message->context_label();
    }


    /**
     * @param EE_Message $message
     * @return string    The timestamp when this message was last modified.
     */
    public function column_modified(EE_Message $message): string
    {
        return $message->modified();
    }


    /**
     * @param EE_Message $message
     * @throws EE_Error
     * @throws ReflectionException
     * @return string   Actions that can be done on the current message.
     */
    public function column_actions(EE_Message $message): string
    {
        $action_links = [
            'view'                => EEH_MSG_Template::get_message_action_link('view', $message),
            'error'               => EEH_MSG_Template::get_message_action_link('error', $message),
            'generate_now'        => EEH_MSG_Template::get_message_action_link('generate_now', $message),
            'send_now'            => EEH_MSG_Template::get_message_action_link('send_now', $message),
            'queue_for_resending' => EEH_MSG_Template::get_message_action_link('queue_for_resending', $message),
            'view_transaction'    => EEH_MSG_Template::get_message_action_link('view_transaction', $message),
        ];
        $content      = '';
        switch ($message->STS_ID()) {
            case EEM_Message::status_sent:
                $content =
                    $action_links['view'] . $action_links['queue_for_resending'] . $action_links['view_transaction'];
                break;
            case EEM_Message::status_idle:
            case EEM_Message::status_resend:
                $content = $action_links['view'] . $action_links['send_now'] . $action_links['view_transaction'];
                break;
            case EEM_Message::status_retry:
                $content = $action_links['view']
                           . $action_links['send_now']
                           . $action_links['error']
                           . $action_links['view_transaction'];
                break;
            case EEM_Message::status_failed:
            case EEM_Message::status_debug_only:
                $content = $action_links['error'] . $action_links['view_transaction'];
                break;
            case EEM_Message::status_incomplete:
                $content = $action_links['generate_now'] . $action_links['view_transaction'];
                break;
        }
        return $this->actionsModalMenu($content);
    }


    /**
     * Retrieve the EE_Message objects for the list table.
     *
     * @param int    $perpage The number of items per page
     * @param string $view    The view items are being retrieved for
     * @param bool   $count   Whether to just return a count or not.
     * @param bool   $all     Disregard any paging info (no limit on data returned).
     * @return int|EE_Message[]
     * @throws EE_Error|ReflectionException
     */
    protected function _get_messages($perpage = 10, $view = 'all', $count = false, $all = false)
    {
        $current_page = isset($this->_req_data['paged']) && ! empty($this->_req_data['paged'])
            ? $this->_req_data['paged']
            : 1;

        $per_page = isset($this->_req_data['perpage']) && ! empty($this->_req_data['perpage'])
            ? $this->_req_data['perpage']
            : $perpage;

        $offset       = ($current_page - 1) * $per_page;
        $limit        = $all || $count ? null : [$offset, $per_page];
        $query_params = [
            'order_by' => empty($this->_req_data['orderby']) ? 'MSG_modified' : $this->_req_data['orderby'],
            'order'    => empty($this->_req_data['order']) ? 'DESC' : $this->_req_data['order'],
            'limit'    => $limit,
        ];

        /**
         * Any filters coming in from other routes?
         */
        if (isset($this->_req_data['filterby'])) {
            $query_params = array_merge($query_params, EEM_Message::instance()->filter_by_query_params());
            if (! $count) {
                $query_params['group_by'] = 'MSG_ID';
            }
        }

        // view conditionals
        if ($view !== 'all' && $count && $all) {
            $query_params[0]['AND*view_conditional'] = [
                'STS_ID' => strtoupper($view),
            ];
        }

        if (! $all && ! empty($this->_req_data['status']) && $this->_req_data['status'] !== 'all') {
            $query_params[0]['AND*view_conditional'] = $this->_req_data === EEM_Message::status_failed
                ? [
                    'STS_ID' => [
                        'IN',
                        [EEM_Message::status_failed, EEM_Message::status_messenger_executing],
                    ],
                ]
                : ['STS_ID' => strtoupper($this->_req_data['status'])];
        }

        if (! $all && ! empty($this->_req_data['s'])) {
            $search_string         = '%' . $this->_req_data['s'] . '%';
            $query_params[0]['OR'] = [
                'MSG_to'      => ['LIKE', $search_string],
                'MSG_from'    => ['LIKE', $search_string],
                'MSG_subject' => ['LIKE', $search_string],
                'MSG_content' => ['LIKE', $search_string],
            ];
        }

        // account for debug only status.  We don't show Messages with the EEM_Message::status_debug_only to clients when
        // the messages system is in debug mode.
        // Note: for backward compat with previous iterations, this is necessary because there may be EEM_Message::status_debug_only
        // messages in the database.
        if (! EEM_Message::debug()) {
            $query_params[0]['AND*debug_only_conditional'] = [
                'STS_ID' => ['!=', EEM_Message::status_debug_only],
            ];
        }

        // account for filters
        if (
            ! $all
            && isset($this->_req_data['ee_messenger_filter_by'])
            && $this->_req_data['ee_messenger_filter_by'] !== 'none_selected'
        ) {
            $query_params[0]['AND*messenger_filter'] = [
                'MSG_messenger' => $this->_req_data['ee_messenger_filter_by'],
            ];
        }
        if (
            ! $all
            && ! empty($this->_req_data['ee_message_type_filter_by'])
            && $this->_req_data['ee_message_type_filter_by'] !== 'none_selected'
        ) {
            $query_params[0]['AND*message_type_filter'] = [
                'MSG_message_type' => $this->_req_data['ee_message_type_filter_by'],
            ];
        }

        if (
            ! $all
            && ! empty($this->_req_data['ee_context_filter_by'])
            && $this->_req_data['ee_context_filter_by'] !== 'none_selected'
        ) {
            $query_params[0]['AND*context_filter'] = [
                'MSG_context' => ['IN', explode(',', $this->_req_data['ee_context_filter_by'])],
            ];
        }

        return $count
            /** @type int */
            ? EEM_Message::instance()->count($query_params, null, true)
            /** @type EE_Message[] */
            : EEM_Message::instance()->get_all($query_params);
    }


    /**
     * Generate dropdown filter select input for messengers.
     *
     * @return string
     * @throws EE_Error|ReflectionException
     */
    protected function _get_messengers_dropdown_filter(): string
    {
        $messenger_options                    = [];
        $active_messages_grouped_by_messenger = EEM_Message::instance()->get_all(['group_by' => 'MSG_messenger']);

        // setup array of messenger options
        foreach ($active_messages_grouped_by_messenger as $active_message) {
            if ($active_message instanceof EE_Message) {
                $messenger_options[ $active_message->messenger() ] = ucwords($active_message->messenger_label());
            }
        }
        return $this->get_admin_page()->get_messengers_select_input($messenger_options);
    }


    /**
     * Generate dropdown filter select input for message types
     *
     * @return string
     * @throws EE_Error|ReflectionException
     */
    protected function _get_message_types_dropdown_filter(): string
    {
        $message_type_options                    = [];
        $active_messages_grouped_by_message_type = EEM_Message::instance()->get_all(
            ['group_by' => 'MSG_message_type']
        );

        // setup array of message type options
        foreach ($active_messages_grouped_by_message_type as $active_message) {
            if ($active_message instanceof EE_Message) {
                $message_type_options[ $active_message->message_type() ] = ucwords(
                    $active_message->message_type_label()
                );
            }
        }
        return $this->get_admin_page()->get_message_types_select_input($message_type_options);
    }


    /**
     * Generate dropdown filter select input for message type contexts
     *
     * @return string
     * @throws EE_Error|ReflectionException
     */
    protected function _get_contexts_for_message_types_dropdown_filter(): string
    {
        $context_options                    = [];
        $active_messages_grouped_by_context = EEM_Message::instance()->get_all(['group_by' => 'MSG_context']);

        // setup array of context options
        foreach ($active_messages_grouped_by_context as $active_message) {
            if ($active_message instanceof EE_Message) {
                $message_type = $active_message->message_type_object();
                if ($message_type instanceof EE_message_type) {
                    foreach ($message_type->get_contexts() as $context => $context_details) {
                        if (isset($context_details['label'])) {
                            $context_options[ $context ] = $context_details['label'];
                        }
                    }
                }
            }
        }
        return $this->get_admin_page()->get_contexts_for_message_types_select_input($context_options);
    }
}
