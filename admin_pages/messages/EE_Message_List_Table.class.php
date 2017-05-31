<?php
if (! defined('EVENT_ESPRESSO_VERSION')) {
    exit('NO direct script access allowed');
}

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
     * @return Messages_Admin_Page
     */
    public function get_admin_page()
    {
        return $this->_admin_page;
    }


    protected function _setup_data()
    {
        $this->_data           = $this->_get_messages($this->_per_page, $this->_view);
        $this->_all_data_count = $this->_get_messages($this->_per_page, $this->_view, true);
    }


    protected function _set_properties()
    {
        $this->_wp_list_args = array(
            'singular' => __('Message', 'event_espresso'),
            'plural'   => __('Messages', 'event_espresso'),
            'ajax'     => true,
            'screen'   => $this->get_admin_page()->get_current_screen()->id,
        );

        $this->_columns = array(
            'cb'           => '<input type="checkbox" />',
            'to'           => __('To', 'event_espresso'),
            'from'         => __('From', 'event_espresso'),
            'messenger'    => __('Messenger', 'event_espresso'),
            'message_type' => __('Message Type', 'event_espresso'),
            'context'      => __('Context', 'event_espresso'),
            'modified'     => __('Modified', 'event_espresso'),
            'action'       => __('Actions', 'event_espresso'),
            'msg_id'       => __('ID', 'event_espresso'),
        );

        $this->_sortable_columns = array(
            'modified'     => array('MSG_modified' => true),
            'message_type' => array('MSG_message_type' => false),
            'messenger'    => array('MSG_messenger' => false),
            'to'           => array('MSG_to' => false),
            'from'         => array('MSG_from' => false),
            'context'      => array('MSG_context' => false),
            'msg_id'       => array('MSG_ID', false),
        );

        $this->_primary_column = 'to';

        $this->_hidden_columns = array(
            'msg_id',
        );
    }


    /**
     * This simply sets up the row class for the table rows.
     * Allows for easier overriding of child methods for setting up sorting.
     *
     * @param  object $item the current item
     * @return string
     */
    protected function _get_row_class($item)
    {
        $class = parent::_get_row_class($item);
        //add status class
        $class .= ' ee-status-strip msg-status-' . $item->STS_ID();
        if ($this->_has_checkbox_column) {
            $class .= ' has-checkbox-column';
        }
        return $class;
    }


    /**
     * _get_table_filters
     * We use this to assemble and return any filters that are associated with this table that help further refine what
     * get's shown in the table.
     *
     * @abstract
     * @access protected
     * @return string
     * @throws \EE_Error
     */
    protected function _get_table_filters()
    {
        $filters = array();

        //get select_inputs
        $select_inputs = array(
            $this->_get_messengers_dropdown_filter(),
            $this->_get_message_types_dropdown_filter(),
            $this->_get_contexts_for_message_types_dropdown_filter(),
        );

        //set filters to select inputs if they aren't empty
        foreach ($select_inputs as $select_input) {
            if ($select_input) {
                $filters[] = $select_input;
            }
        }
        return $filters;
    }


    protected function _add_view_counts()
    {
        foreach ($this->_views as $view => $args) {
            $this->_views[$view]['count'] = $this->_get_messages($this->_per_page, $view, true, true);
        }
    }


    /**
     * @param EE_Message $message
     * @return string   checkbox
     * @throws \EE_Error
     */
    public function column_cb($message)
    {
        return sprintf('<input type="checkbox" name="MSG_ID[%s]" value="1" />', $message->ID());
    }


    /**
     * @param EE_Message $message
     * @return string
     * @throws \EE_Error
     */
    public function column_msg_id(EE_Message $message)
    {
        return $message->ID();
    }


    /**
     * @param EE_Message $message
     * @return string    The recipient of the message
     * @throws \EE_Error
     */
    public function column_to(EE_Message $message)
    {
        EE_Registry::instance()->load_helper('URL');
        $actions           = array();
        $actions['delete'] = '<a href="'
                             . EEH_URL::add_query_args_and_nonce(
                array(
                    'page'   => 'espresso_messages',
                    'action' => 'delete_ee_message',
                    'MSG_ID' => $message->ID(),
                ),
                admin_url('admin.php')
            )
                             . '">' . __('Delete', 'event_espresso') . '</a>';
        return esc_html($message->to()) . $this->row_actions($actions);
    }


    /**
     * @param EE_Message $message
     * @return string   The sender of the message
     */
    public function column_from(EE_Message $message)
    {
        return esc_html($message->from());
    }


    /**
     * @param EE_Message $message
     * @return string  The messenger used to send the message.
     */
    public function column_messenger(EE_Message $message)
    {
        return ucwords($message->messenger_label());
    }


    /**
     * @param EE_Message $message
     * @return string  The message type used to generate the message.
     */
    public function column_message_type(EE_Message $message)
    {
        return ucwords($message->message_type_label());
    }


    /**
     * @param EE_Message $message
     * @return string  The context the message was generated for.
     */
    public function column_context(EE_Message $message)
    {
        return $message->context_label();
    }


    /**
     * @param EE_Message $message
     * @return string    The timestamp when this message was last modified.
     */
    public function column_modified(EE_Message $message)
    {
        return $message->modified();
    }


    /**
     * @param EE_Message $message
     * @return string   Actions that can be done on the current message.
     */
    public function column_action(EE_Message $message)
    {
        EE_Registry::instance()->load_helper('MSG_Template');
        $action_links = array(
            'view'                => EEH_MSG_Template::get_message_action_link('view', $message),
            'error'               => EEH_MSG_Template::get_message_action_link('error', $message),
            'generate_now'        => EEH_MSG_Template::get_message_action_link('generate_now', $message),
            'send_now'            => EEH_MSG_Template::get_message_action_link('send_now', $message),
            'queue_for_resending' => EEH_MSG_Template::get_message_action_link('queue_for_resending', $message),
            'view_transaction'    => EEH_MSG_Template::get_message_action_link('view_transaction', $message),
        );
        $content      = '';
        switch ($message->STS_ID()) {
            case EEM_Message::status_sent :
                $content = $action_links['view'] . $action_links['queue_for_resending'] . $action_links['view_transaction'];
                break;
            case EEM_Message::status_resend :
                $content = $action_links['view'] . $action_links['send_now'] . $action_links['view_transaction'];
                break;
            case EEM_Message::status_retry :
                $content = $action_links['view'] . $action_links['send_now'] . $action_links['error'] . $action_links['view_transaction'];
                break;
            case EEM_Message::status_failed :
            case EEM_Message::status_debug_only :
                $content = $action_links['error'] . $action_links['view_transaction'];
                break;
            case EEM_Message::status_idle :
                $content = $action_links['view'] . $action_links['send_now'] . $action_links['view_transaction'];
                break;
            case EEM_Message::status_incomplete;
                $content = $action_links['generate_now'] . $action_links['view_transaction'];
                break;
        }
        return $content;
    }


    /**
     * Retrieve the EE_Message objects for the list table.
     *
     * @param int    $perpage The number of items per page
     * @param string $view    The view items are being retrieved for
     * @param bool   $count   Whether to just return a count or not.
     * @param bool   $all     Disregard any paging info (no limit on data returned).
     * @return int|EE_Message[]
     * @throws \EE_Error
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
        $limit        = $all || $count ? null : array($offset, $per_page);
        $query_params = array(
            'order_by' => empty($this->_req_data['orderby']) ? 'MSG_modified' : $this->_req_data['orderby'],
            'order'    => empty($this->_req_data['order']) ? 'DESC' : $this->_req_data['order'],
            'limit'    => $limit,
        );

        /**
         * Any filters coming in from other routes?
         */
        if (isset($this->_req_data['filterby'])) {
            $query_params = array_merge($query_params, EEM_Message::instance()->filter_by_query_params());
            if ( ! $count) {
                $query_params['group_by'] = 'MSG_ID';
            }
        }

        //view conditionals
        if ($view !== 'all' && $count && $all) {
            $query_params[0]['AND*view_conditional'] = array(
                'STS_ID' => strtoupper($view),
            );
        }

        if (! $all && ! empty($this->_req_data['status']) && $this->_req_data['status'] !== 'all') {
            $query_params[0]['AND*view_conditional'] = $this->_req_data === EEM_Message::status_failed
                ? array(
                    'STS_ID' => array(
                        'IN',
                        array(EEM_Message::status_failed, EEM_Message::status_messenger_executing)
                    )
                )
                : array( 'STS_ID' => strtoupper($this->_req_data['status']) );
        }

        if (! $all && ! empty($this->_req_data['s'])) {
            $search_string         = '%' . $this->_req_data['s'] . '%';
            $query_params[0]['OR'] = array(
                'MSG_to'      => array('LIKE', $search_string),
                'MSG_from'    => array('LIKE', $search_string),
                'MSG_subject' => array('LIKE', $search_string),
                'MSG_content' => array('LIKE', $search_string),
            );
        }

        //account for debug only status.  We don't show Messages with the EEM_Message::status_debug_only to clients when
        //the messages system is in debug mode.
        //Note: for backward compat with previous iterations, this is necessary because there may be EEM_Message::status_debug_only
        //messages in the database.
        if (! EEM_Message::debug()) {
            $query_params[0]['AND*debug_only_conditional'] = array(
                'STS_ID' => array('!=', EEM_Message::status_debug_only),
            );
        }

        //account for filters
        if (! $all
            && isset($this->_req_data['ee_messenger_filter_by'])
            && $this->_req_data['ee_messenger_filter_by'] !== 'none_selected'
        ) {
            $query_params[0]['AND*messenger_filter'] = array(
                'MSG_messenger' => $this->_req_data['ee_messenger_filter_by'],
            );
        }
        if (! $all
            && ! empty($this->_req_data['ee_message_type_filter_by'])
            && $this->_req_data['ee_message_type_filter_by'] !== 'none_selected'
        ) {
            $query_params[0]['AND*message_type_filter'] = array(
                'MSG_message_type' => $this->_req_data['ee_message_type_filter_by'],
            );
        }

        if (! $all
            && ! empty($this->_req_data['ee_context_filter_by'])
            && $this->_req_data['ee_context_filter_by'] !== 'none_selected'
        ) {
            $query_params[0]['AND*context_filter'] = array(
                'MSG_context' => array('IN', explode(',', $this->_req_data['ee_context_filter_by'])),
            );
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
     */
    protected function _get_messengers_dropdown_filter()
    {
        $messenger_options                    = array();
        $active_messages_grouped_by_messenger = EEM_Message::instance()->get_all(array('group_by' => 'MSG_messenger'));

        //setup array of messenger options
        foreach ($active_messages_grouped_by_messenger as $active_message) {
            if ($active_message instanceof EE_Message) {
                $messenger_options[$active_message->messenger()] = ucwords($active_message->messenger_label());
            }
        }
        return $this->get_admin_page()->get_messengers_select_input($messenger_options);
    }


    /**
     * Generate dropdown filter select input for message types
     *
     * @return string
     */
    protected function _get_message_types_dropdown_filter()
    {
        $message_type_options                    = array();
        $active_messages_grouped_by_message_type = EEM_Message::instance()->get_all(array('group_by' => 'MSG_message_type'));

        //setup array of message type options
        foreach ($active_messages_grouped_by_message_type as $active_message) {
            if ($active_message instanceof EE_Message) {
                $message_type_options[$active_message->message_type()] = ucwords($active_message->message_type_label());
            }
        }
        return $this->get_admin_page()->get_message_types_select_input($message_type_options);
    }


    /**
     * Generate dropdown filter select input for message type contexts
     *
     * @return string
     */
    protected function _get_contexts_for_message_types_dropdown_filter()
    {
        $context_options                    = array();
        $active_messages_grouped_by_context = EEM_Message::instance()->get_all(array('group_by' => 'MSG_context'));

        //setup array of context options
        foreach ($active_messages_grouped_by_context as $active_message) {
            if ($active_message instanceof EE_Message) {
                $message_type = $active_message->message_type_object();
                if ($message_type instanceof EE_message_type) {
                    foreach ($message_type->get_contexts() as $context => $context_details) {
                        if (isset($context_details['label'])) {
                            $context_options[$context] = $context_details['label'];
                        }
                    }
                }
            }
        }
        return $this->get_admin_page()->get_contexts_for_message_types_select_input($context_options);
    }
} //end EE_Message_List_Table class