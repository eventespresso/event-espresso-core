<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * Event Espresso
 * Event Registration and Management Plugin for WordPress
 * @ package        Event Espresso
 * @ author            Seth Shoultes
 * @ copyright        (c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license            {@link http://eventespresso.com/support/terms-conditions/}   * see Plugin Licensing *
 * @ link            {@link http://www.eventespresso.com}
 * @ since            4.0
 * ------------------------------------------------------------------------
 * Registrations Table class
 *
 * @package               Event Espresso
 * @subpackage            includes/admin_screens/Registrations_List_Table.class.php
 * @author                Brent Christensen
 *                        ------------------------------------------------------------------------
 */
class EE_Registrations_List_Table extends EE_Admin_List_Table
{



    private $_status;



    /**
     * An array of transaction details for the related transaction to the registration being processed.
     * This is set via the _set_related_details method.
     *
     * @var array
     */
    protected $_transaction_details = array();



    /**
     * An array of event details for the related event to the registration being processed.
     * This is set via the _set_related_details method.
     *
     * @var array
     */
    protected $_event_details = array();



    /**
     * @param \Registrations_Admin_Page $admin_page
     */
    public function __construct(Registrations_Admin_Page $admin_page)
    {
        if ( ! empty($_GET['event_id'])) {
            $extra_query_args = array();
            foreach ($admin_page->get_views() as $key => $view_details) {
                $extra_query_args[$view_details['slug']] = array('event_id' => $_GET['event_id']);
            }
            $this->_views = $admin_page->get_list_table_view_RLs($extra_query_args);
        }
        parent::__construct($admin_page);
        $this->_status = $this->_admin_page->get_registration_status_array();
    }



    /**
     *    _setup_data
     *
     * @access protected
     * @return void
     */
    protected function _setup_data()
    {
        $this->_data = $this->_admin_page->get_registrations($this->_per_page);
        $this->_all_data_count = $this->_admin_page->get_registrations($this->_per_page, true, false, false);
    }



    /**
     *    _set_properties
     *
     * @access protected
     * @return void
     */
    protected function _set_properties()
    {
        $this->_wp_list_args = array(
            'singular' => __('registration', 'event_espresso'),
            'plural'   => __('registrations', 'event_espresso'),
            'ajax'     => true,
            'screen'   => $this->_admin_page->get_current_screen()->id,
        );
        $ID_column_name = __('ID', 'event_espresso');
        $ID_column_name .= ' : <span class="show-on-mobile-view-only" style="float:none">';
        $ID_column_name .= __('Registrant Name', 'event_espresso');
        $ID_column_name .= '</span> ';
        if (isset($_GET['event_id'])) {
            $this->_columns = array(
                'cb'               => '<input type="checkbox" />', //Render a checkbox instead of text
                '_REG_ID'          => $ID_column_name,
                'ATT_fname'        => __('Name', 'event_espresso'),
                'ATT_email'        => __('Email', 'event_espresso'),
                '_REG_date'        => __('Reg Date', 'event_espresso'),
                'PRC_amount'       => __('TKT Price', 'event_espresso'),
                '_REG_final_price' => __('Final Price', 'event_espresso'),
                'TXN_total'        => __('Total Txn', 'event_espresso'),
                'TXN_paid'         => __('Paid', 'event_espresso'),
                'actions'          => __('Actions', 'event_espresso'),
            );
            $this->_bottom_buttons = array(
                'report' => array(
                    'route'         => 'registrations_report',
                    'extra_request' => array(
                        'EVT_ID'     => isset($this->_req_data['event_id']) ? $this->_req_data['event_id'] : null,
                        'return_url' => urlencode("//{$_SERVER['HTTP_HOST']}{$_SERVER['REQUEST_URI']}"),
                    ),
                ),
            );
        } else {
            $this->_columns = array(
                'cb'               => '<input type="checkbox" />', //Render a checkbox instead of text
                '_REG_ID'          => $ID_column_name,
                'ATT_fname'        => __('Name', 'event_espresso'),
                '_REG_date'        => __('TXN Date', 'event_espresso'),
                'event_name'       => __('Event', 'event_espresso'),
                'DTT_EVT_start'    => __('Event Date', 'event_espresso'),
                '_REG_final_price' => __('Price', 'event_espresso'),
                '_REG_paid'        => __('Paid', 'event_espresso'),
                'actions'          => __('Actions', 'event_espresso'),
            );
            $this->_bottom_buttons = array(
                'report_all' => array(
                    'route'         => 'registrations_report',
                    'extra_request' => array(
                        'return_url' => urlencode("//{$_SERVER['HTTP_HOST']}{$_SERVER['REQUEST_URI']}"),
                    ),
                ),
            );
        }
        $this->_bottom_buttons['report_filtered'] = array(
            'route'         => 'registrations_report',
            'extra_request' => array(
                'use_filters' => true,
                'filters'     => array_diff_key($this->_req_data, array_flip(array(
                            'page',
                            'action',
                            'default_nonce',
                        ))),
                'return_url'  => urlencode("//{$_SERVER['HTTP_HOST']}{$_SERVER['REQUEST_URI']}"),
            ),
        );
        $this->_primary_column = '_REG_ID';
        $this->_sortable_columns = array(
            '_REG_date'     => array('_REG_date' => true),   //true means its already sorted
            /**
             * Allows users to change the default sort if they wish.
             * Returning a falsey on this filter will result in the default sort to be by firstname rather than last name.
             */
            'ATT_fname'     => array(
                    'FHEE__EE_Registrations_List_Table___set_properties__default_sort_by_registration_last_name',
                    true,
                    $this
                )
                ? array('ATT_lname' => false)
                : array('ATT_fname' => false),
            'event_name'    => array('event_name' => false),
            'DTT_EVT_start' => array('DTT_EVT_start' => false),
            '_REG_ID'       => array('_REG_ID' => false),
        );
        $this->_hidden_columns = array();
    }



    /**
     * This simply sets up the row class for the table rows.
     * Allows for easier overriding of child methods for setting up sorting.
     *
     * @param  EE_Registration $item the current item
     * @return string
     */
    protected function _get_row_class($item)
    {
        $class = parent::_get_row_class($item);
        //add status class
        $class .= ' ee-status-strip reg-status-' . $item->status_ID();
        if ($this->_has_checkbox_column) {
            $class .= ' has-checkbox-column';
        }
        return $class;
    }



    /**
     * Set the $_transaction_details property if not set yet.
     *
     * @param EE_Registration $registration
     * @throws \EE_Error
     */
    protected function _set_related_details(EE_Registration $registration)
    {
        $transaction = $registration->get_first_related('Transaction');
        $status = $transaction instanceof EE_Transaction ? $transaction->status_ID()
            : EEM_Transaction::failed_status_code;
        $this->_transaction_details = array(
            'transaction' => $transaction,
            'status'      => $status,
            'id'          => $transaction instanceof EE_Transaction ? $transaction->ID() : 0,
            'title_attr'  => sprintf(__('View Transaction Details (%s)', 'event_espresso'),
                EEH_Template::pretty_status($status, false, 'sentence')),
        );
        try {
            $event = $registration->event();
        } catch (\EventEspresso\core\exceptions\EntityNotFoundException $e) {
            $event = null;
        }
        $status = $event instanceof EE_Event ? $event->get_active_status() : EE_Datetime::inactive;
        $this->_event_details = array(
            'event'      => $event,
            'status'     => $status,
            'id'         => $event instanceof EE_Event ? $event->ID() : 0,
            'title_attr' => sprintf(__('Edit Event (%s)', 'event_espresso'),
                EEH_Template::pretty_status($status, false, 'sentence')),
        );
    }



    /**
     *    _get_table_filters
     *
     * @access protected
     * @return array
     */
    protected function _get_table_filters()
    {
        $filters = array();
        //todo we're currently using old functions here. We need to move things into the Events_Admin_Page() class as methods.
        $cur_date = isset($this->_req_data['month_range']) ? $this->_req_data['month_range'] : '';
        $cur_category = isset($this->_req_data['EVT_CAT']) ? $this->_req_data['EVT_CAT'] : -1;
        $reg_status = isset($this->_req_data['_reg_status']) ? $this->_req_data['_reg_status'] : '';
        $filters[] = EEH_Form_Fields::generate_registration_months_dropdown($cur_date, $reg_status, $cur_category);
        $filters[] = EEH_Form_Fields::generate_event_category_dropdown($cur_category);
        $status = array();
        $status[] = array('id' => 0, 'text' => __('Select Status', 'event_espresso'));
        foreach ($this->_status as $key => $value) {
            $status[] = array('id' => $key, 'text' => $value);
        }
        if ($this->_view !== 'incomplete') {
            $filters[] = EEH_Form_Fields::select_input('_reg_status', $status,
                isset($this->_req_data['_reg_status']) ? strtoupper(sanitize_key($this->_req_data['_reg_status']))
                    : '');
        }
        if (isset($this->_req_data['event_id'])) {
            $filters[] = EEH_Form_Fields::hidden_input('event_id', $this->_req_data['event_id'], 'reg_event_id');
        }
        return $filters;
    }



    /**
     *    _add_view_counts
     *
     * @access protected
     * @return void
     * @throws \EE_Error
     */
    protected function _add_view_counts()
    {
        $this->_views['all']['count'] = $this->_total_registrations();
        $this->_views['month']['count'] = $this->_total_registrations_this_month();
        $this->_views['today']['count'] = $this->_total_registrations_today();
        if (EE_Registry::instance()->CAP->current_user_can('ee_delete_registrations',
            'espresso_registrations_trash_registrations')
        ) {
            $this->_views['incomplete']['count'] = $this->_total_registrations('incomplete');
            $this->_views['trash']['count'] = $this->_total_registrations('trash');
        }
    }



    /**
     * _total_registrations
     *
     * @access protected
     * @param string $view
     * @return int
     * @throws \EE_Error
     */
    protected function _total_registrations($view = '')
    {
        $_where = array();
        $EVT_ID = isset($this->_req_data['event_id']) ? absint($this->_req_data['event_id']) : false;
        if ($EVT_ID) {
            $_where['EVT_ID'] = $EVT_ID;
        }
        switch ($view) {
            case 'trash' :
                return EEM_Registration::instance()->count_deleted(array($_where));
                break;
            case 'incomplete' :
                $_where['STS_ID'] = EEM_Registration::status_id_incomplete;
                break;
            default :
                $_where['STS_ID'] = array('!=', EEM_Registration::status_id_incomplete);
        }
        return EEM_Registration::instance()->count(array($_where));
    }



    /**
     * _total_registrations_this_month
     *
     * @access protected
     * @return int
     * @throws \EE_Error
     */
    protected function _total_registrations_this_month()
    {
        $EVT_ID = isset($this->_req_data['event_id']) ? absint($this->_req_data['event_id']) : false;
        $_where = $EVT_ID ? array('EVT_ID' => $EVT_ID) : array();
        $this_year_r = date('Y', current_time('timestamp'));
        $time_start = ' 00:00:00';
        $time_end = ' 23:59:59';
        $this_month_r = date('m', current_time('timestamp'));
        $days_this_month = date('t', current_time('timestamp'));
        //setup date query.
        $beginning_string = EEM_Registration::instance()
                                            ->convert_datetime_for_query('REG_date',
                                                $this_year_r . '-' . $this_month_r . '-01' . ' ' . $time_start,
                                                'Y-m-d H:i:s');
        $end_string = EEM_Registration::instance()
                                      ->convert_datetime_for_query('REG_date',
                                          $this_year_r . '-' . $this_month_r . '-' . $days_this_month . ' ' . $time_end,
                                          'Y-m-d H:i:s');
        $_where['REG_date'] = array(
            'BETWEEN',
            array(
                $beginning_string,
                $end_string,
            ),
        );
        $_where['STS_ID'] = array('!=', EEM_Registration::status_id_incomplete);
        return EEM_Registration::instance()->count(array($_where));
    }



    /**
     * _total_registrations_today
     *
     * @access protected
     * @return int
     * @throws \EE_Error
     */
    protected function _total_registrations_today()
    {
        $EVT_ID = isset($this->_req_data['event_id']) ? absint($this->_req_data['event_id']) : false;
        $_where = $EVT_ID ? array('EVT_ID' => $EVT_ID) : array();
        $current_date = date('Y-m-d', current_time('timestamp'));
        $time_start = ' 00:00:00';
        $time_end = ' 23:59:59';
        $_where['REG_date'] = array(
            'BETWEEN',
            array(
                EEM_Registration::instance()
                                ->convert_datetime_for_query('REG_date', $current_date . $time_start, 'Y-m-d H:i:s'),
                EEM_Registration::instance()
                                ->convert_datetime_for_query('REG_date', $current_date . $time_end, 'Y-m-d H:i:s'),
            ),
        );
        $_where['STS_ID'] = array('!=', EEM_Registration::status_id_incomplete);
        return EEM_Registration::instance()->count(array($_where));
    }



    /**
     * column_cb
     *
     * @access public
     * @param \EE_Registration $item
     * @return string
     * @throws \EE_Error
     */
    public function column_cb($item)
    {
        /** checkbox/lock **/
        $transaction = $item->get_first_related('Transaction');
        $payment_count = $transaction instanceof EE_Transaction ? $transaction->count_related('Payment') : 0;
        return $payment_count > 0 ? sprintf('<input type="checkbox" name="_REG_ID[]" value="%1$s" />', $item->ID())
                                    . '<span class="ee-lock-icon"></span>'
            : sprintf('<input type="checkbox" name="_REG_ID[]" value="%1$s" />', $item->ID());
    }



    /**
     * column__REG_ID
     *
     * @access public
     * @param \EE_Registration $item
     * @return string
     * @throws \EE_Error
     */
    public function column__REG_ID(EE_Registration $item)
    {
        $attendee = $item->attendee();
        $content = $item->ID();
        $content .= '<div class="show-on-mobile-view-only">';
        $content .= '<br>';
        $content .= $attendee instanceof EE_Attendee ? $attendee->full_name() : '';
        $content .= '&nbsp;' . sprintf(__('(%1$s / %2$s)', 'event_espresso'), $item->count(), $item->group_size());
        $content .= '<br>' . sprintf(__('Reg Code: %s', 'event_espresso'), $item->get('REG_code'));
        $content .= '</div>';
        return $content;
    }



    /**
     * column__REG_date
     *
     * @access public
     * @param \EE_Registration $item
     * @return string
     * @throws \EE_Error
     */
    public function column__REG_date(EE_Registration $item)
    {
        $this->_set_related_details($item);
        //Build row actions
        $view_lnk_url = EE_Admin_Page::add_query_args_and_nonce(array(
            'action' => 'view_transaction',
            'TXN_ID' => $this->_transaction_details['id'],
        ), TXN_ADMIN_URL);
        $view_link = EE_Registry::instance()->CAP->current_user_can('ee_read_transaction',
            'espresso_transactions_view_transaction') ? '<a class="ee-status-color-'
                                                        . $this->_transaction_details['status']
                                                        . '" href="'
                                                        . $view_lnk_url
                                                        . '" title="'
                                                        . esc_attr($this->_transaction_details['title_attr'])
                                                        . '">'
                                                        . $item->get_i18n_datetime('REG_date')
                                                        . '</a>' : $item->get_i18n_datetime('REG_date');
        $view_link .= '<br><span class="ee-status-text-small">'
                      . EEH_Template::pretty_status($this->_transaction_details['status'], false, 'sentence')
                      . '</span>';
        return $view_link;
    }



    /**
     * column_event_name
     *
     * @access public
     * @param \EE_Registration $item
     * @return string
     * @throws \EE_Error
     */
    public function column_event_name(EE_Registration $item)
    {
        $this->_set_related_details($item);
        // page=espresso_events&action=edit_event&EVT_ID=2&edit_event_nonce=cf3a7e5b62
        $EVT_ID = $item->event_ID();
        $event_name = $item->event_name();
        $event_name = $event_name ? $event_name : __("No Associated Event", 'event_espresso');
        $event_name = wp_trim_words($event_name, 30, '...');
        if ($EVT_ID) {
            $edit_event_url = EE_Admin_Page::add_query_args_and_nonce(array('action' => 'edit', 'post' => $EVT_ID),
                EVENTS_ADMIN_URL);
            $edit_event = EE_Registry::instance()->CAP->current_user_can('ee_edit_event', 'edit_event', $EVT_ID)
                ? '<a class="ee-status-color-'
                  . $this->_event_details['status']
                  . '" href="'
                  . $edit_event_url
                  . '" title="'
                  . esc_attr($this->_event_details['title_attr'])
                  . '">'
                  . $event_name
                  . '</a>' : $event_name;
            $edit_event_url = EE_Admin_Page::add_query_args_and_nonce(array('event_id' => $EVT_ID), REG_ADMIN_URL);
            $actions['event_filter'] = '<a href="' . $edit_event_url . '" title="';
            $actions['event_filter'] .= sprintf(esc_attr__('Filter this list to only show registrations for %s',
                'event_espresso'), $event_name);
            $actions['event_filter'] .= '">' . __('View Registrations', 'event_espresso') . '</a>';
        } else {
            $edit_event = $event_name;
            $actions['event_filter'] = '';
        }
        return sprintf('%1$s %2$s', $edit_event, $this->row_actions($actions));
    }



    /**
     * column_DTT_EVT_start
     *
     * @access public
     * @param \EE_Registration $item
     * @return string
     * @throws \EE_Error
     */
    public function column_DTT_EVT_start(EE_Registration $item)
    {
        $datetime_strings = array();
        $ticket = $item->ticket(true);
        if ($ticket instanceof EE_Ticket) {
            $remove_defaults = array('default_where_conditions' => 'none');
            $datetimes = $ticket->datetimes($remove_defaults);
            foreach ($datetimes as $datetime) {
                $datetime_strings[] = $datetime->get_i18n_datetime('DTT_EVT_start');
            }
            return implode("<br />", $datetime_strings);
        } else {
            return __('There is no ticket on this registration', 'event_espresso');
        }
    }



    /**
     * column_ATT_fname
     *
     * @access public
     * @param \EE_Registration $item
     * @return string
     * @throws \EE_Error
     */
    public function column_ATT_fname(EE_Registration $item)
    {
        $attendee = $item->attendee();
        $edit_lnk_url = EE_Admin_Page::add_query_args_and_nonce(array(
            'action'  => 'view_registration',
            '_REG_ID' => $item->ID(),
        ), REG_ADMIN_URL);
        $attendee_name = $attendee instanceof EE_Attendee ? $attendee->full_name() : '';
        $link = EE_Registry::instance()->CAP->current_user_can('ee_read_registration',
            'espresso_registrations_view_registration', $item->ID()) ? '<a href="'
                                                                       . $edit_lnk_url
                                                                       . '" title="'
                                                                       . esc_attr__('View Registration Details',
                'event_espresso')
                                                                       . '">'
                                                                       . $attendee_name
                                                                       . '</a>' : $attendee_name;
        $link .= $item->count() === 1
            ? '&nbsp;<sup><div class="dashicons dashicons-star-filled lt-blue-icon ee-icon-size-8"></div></sup>' : '';
        $t = $item->get_first_related('Transaction');
        $payment_count = $t instanceof EE_Transaction ? $t->count_related('Payment') : 0;
        //append group count to name
        $link .= '&nbsp;' . sprintf(__('(%1$s / %2$s)', 'event_espresso'), $item->count(), $item->group_size());
        //append reg_code
        $link .= '<br>' . sprintf(__('Reg Code: %s', 'event_espresso'), $item->get('REG_code'));
        //reg status text for accessibility
        $link .= '<br><span class="ee-status-text-small">' . EEH_Template::pretty_status($item->status_ID(), false,
                'sentence') . '</span>';
        //trash/restore/delete actions
        $actions = array();
        if ($this->_view !== 'trash'
            && $payment_count === 0
            && EE_Registry::instance()->CAP->current_user_can('ee_delete_registration',
                'espresso_registrations_trash_registrations', $item->ID())
        ) {
            $trash_lnk_url = EE_Admin_Page::add_query_args_and_nonce(array(
                'action'  => 'trash_registrations',
                '_REG_ID' => $item->ID(),
            ), REG_ADMIN_URL);
            $actions['trash'] = '<a href="' . $trash_lnk_url . '" title="' . esc_attr__('Trash Registration',
                    'event_espresso') . '">' . __('Trash', 'event_espresso') . '</a>';
        } elseif ($this->_view === 'trash') {
            // restore registration link
            if (EE_Registry::instance()->CAP->current_user_can('ee_delete_registration',
                'espresso_registrations_restore_registrations', $item->ID())
            ) {
                $restore_lnk_url = EE_Admin_Page::add_query_args_and_nonce(array(
                    'action'  => 'restore_registrations',
                    '_REG_ID' => $item->ID(),
                ), REG_ADMIN_URL);
                $actions['restore'] = '<a href="' . $restore_lnk_url . '" title="' . esc_attr__('Restore Registration',
                        'event_espresso') . '">' . __('Restore', 'event_espresso') . '</a>';
            }
            if (EE_Registry::instance()->CAP->current_user_can('ee_delete_registration',
                'espresso_registrations_ee_delete_registrations', $item->ID())
            ) {
                $delete_lnk_url = EE_Admin_Page::add_query_args_and_nonce(array(
                    'action'  => 'delete_registrations',
                    '_REG_ID' => $item->ID(),
                ), REG_ADMIN_URL);
                $actions['delete'] = '<a href="'
                                     . $delete_lnk_url
                                     . '" title="'
                                     . esc_attr__('Delete Registration Permanently', 'event_espresso')
                                     . '">'
                                     . __('Delete', 'event_espresso')
                                     . '</a>';
            }
        }
        return sprintf('%1$s %2$s', $link, $this->row_actions($actions));
    }



    /**
     * column_ATT_email
     *
     * @access public
     * @param \EE_Registration $item
     * @return string
     * @throws \EE_Error
     */
    public function column_ATT_email(EE_Registration $item)
    {
        $attendee = $item->get_first_related('Attendee');
        return ! $attendee instanceof EE_Attendee ? __('No attached contact record.', 'event_espresso')
            : $attendee->email();
    }



    /**
     * column__REG_count
     *
     * @access public
     * @param \EE_Registration $item
     * @return string
     */
    public function column__REG_count(EE_Registration $item)
    {
        return sprintf(__('%1$s / %2$s', 'event_espresso'), $item->count(), $item->group_size());
    }



    /**
     * column_PRC_amount
     *
     * @access public
     * @param \EE_Registration $item
     * @return string
     */
    public function column_PRC_amount(EE_Registration $item)
    {
        $ticket = $item->ticket();
        $content = isset($_GET['event_id']) && $ticket instanceof EE_Ticket ? '<span class="TKT_name">'
                                                                              . $ticket->name()
                                                                              . '</span><br />' : '';
        if ($item->final_price() > 0) {
            $content .= '<span class="reg-pad-rght">' . $item->pretty_final_price() . '</span>';
        } else {
            // free event
            $content .= '<span class="reg-overview-free-event-spn reg-pad-rght">'
                        . __('free', 'event_espresso')
                        . '</span>';
        }
        return $content;
    }



    /**
     * column__REG_final_price
     *
     * @access public
     * @param \EE_Registration $item
     * @return string
     */
    public function column__REG_final_price(EE_Registration $item)
    {
        $ticket = $item->ticket();
        $content = isset($_GET['event_id']) || ! $ticket instanceof EE_Ticket
            ? ''
            : '<span class="TKT_name">'
              . $ticket->name()
              . '</span><br />';
        $content .= '<span class="reg-pad-rght">' . $item->pretty_final_price() . '</span>';
        return $content;
    }



    /**
     * column__REG_paid
     *
     * @access public
     * @param \EE_Registration $item
     * @return string
     */
    public function column__REG_paid(EE_Registration $item)
    {
        $payment_method = $item->payment_method();
        $payment_method_name = $payment_method instanceof EE_Payment_Method ? $payment_method->admin_name()
            : __('Unknown', 'event_espresso');
        $content = '<span class="reg-pad-rght">' . $item->pretty_paid() . '</span>';
        if ($item->paid() > 0) {
            $content .= '<br><span class="ee-status-text-small">' . sprintf(__('...via %s', 'event_espresso'),
                    $payment_method_name) . '</span>';
        }
        return $content;
    }



    /**
     * column_TXN_total
     *
     * @access public
     * @param \EE_Registration $item
     * @return string
     * @throws \EE_Error
     */
    public function column_TXN_total(EE_Registration $item)
    {
        if ($item->transaction()) {
            $view_txn_lnk_url = EE_Admin_Page::add_query_args_and_nonce(array(
                'action' => 'view_transaction',
                'TXN_ID' => $item->transaction_ID(),
            ), TXN_ADMIN_URL);
            return EE_Registry::instance()->CAP->current_user_can('ee_read_transaction',
                'espresso_transactions_view_transaction', $item->transaction_ID())
                ? '<span class="reg-pad-rght"><a class="status-'
                  . $item->transaction()->status_ID()
                  . '" href="'
                  . $view_txn_lnk_url
                  . '"  title="'
                  . esc_attr__('View Transaction', 'event_espresso')
                  . '">'
                  . $item->transaction()->pretty_total()
                  . '</a></span>' : '<span class="reg-pad-rght">' . $item->transaction()->pretty_total() . '</span>';
        } else {
            return __("None", "event_espresso");
        }
    }



    /**
     * column_TXN_paid
     *
     * @access public
     * @param \EE_Registration $item
     * @return string
     * @throws \EE_Error
     */
    public function column_TXN_paid(EE_Registration $item)
    {
        if ($item->count() === 1) {
            $transaction = $item->transaction() ? $item->transaction() : EE_Transaction::new_instance();
            if ($transaction->paid() >= $transaction->total()) {
                return '<span class="reg-pad-rght"><div class="dashicons dashicons-yes green-icon"></div></span>';
            } else {
                $view_txn_lnk_url = EE_Admin_Page::add_query_args_and_nonce(array(
                    'action' => 'view_transaction',
                    'TXN_ID' => $item->transaction_ID(),
                ), TXN_ADMIN_URL);
                return EE_Registry::instance()->CAP->current_user_can('ee_read_transaction',
                    'espresso_transactions_view_transaction', $item->transaction_ID())
                    ? '<span class="reg-pad-rght"><a class="status-'
                      . $transaction->status_ID()
                      . '" href="'
                      . $view_txn_lnk_url
                      . '"  title="'
                      . esc_attr__('View Transaction', 'event_espresso')
                      . '">'
                      . $item->transaction()->pretty_paid()
                      . '</a><span>' : '<span class="reg-pad-rght">' . $item->transaction()->pretty_paid() . '</span>';
            }
        }
        return '&nbsp;';
    }



    /**
     * column_actions
     *
     * @access public
     * @param \EE_Registration $item
     * @return string
     * @throws \EE_Error
     */
    public function column_actions(EE_Registration $item)
    {
        $actions = array();
        $attendee = $item->attendee();
        $this->_set_related_details($item);
        //Build row actions
        $view_lnk_url = EE_Admin_Page::add_query_args_and_nonce(array(
            'action'  => 'view_registration',
            '_REG_ID' => $item->ID(),
        ), REG_ADMIN_URL);
        $edit_lnk_url = EE_Admin_Page::add_query_args_and_nonce(array(
            'action' => 'edit_attendee',
            'post'   => $item->attendee_ID(),
        ), REG_ADMIN_URL);
        // page=attendees&event_admin_reports=resend_email&registration_id=43653465634&event_id=2&form_action=resend_email
        //$resend_reg_lnk_url_params = array( 'action'=>'resend_registration', '_REG_ID'=>$item->REG_ID );
        $resend_reg_lnk_url = EE_Admin_Page::add_query_args_and_nonce(array(
            'action'  => 'resend_registration',
            '_REG_ID' => $item->ID(),
        ), REG_ADMIN_URL, true);
        //Build row actions
        $actions['view_lnk'] = EE_Registry::instance()->CAP->current_user_can('ee_read_registration',
            'espresso_registrations_view_registration', $item->ID()) ? '
			<li>
			<a href="' . $view_lnk_url . '" title="' . esc_attr__('View Registration Details', 'event_espresso') . '" class="tiny-text">
				<div class="dashicons dashicons-clipboard"></div>
			</a>
			</li>' : '';
        $actions['edit_lnk'] = EE_Registry::instance()->CAP->current_user_can('ee_edit_contacts',
            'espresso_registrations_edit_attendee')
                               && $attendee instanceof EE_Attendee ? '
			<li>
			<a href="' . $edit_lnk_url . '" title="' . esc_attr__('Edit Contact Details', 'event_espresso') . '" class="tiny-text">
				<div class="ee-icon ee-icon-user-edit ee-icon-size-16"></div>
			</a>
			</li>' : '';
        $actions['resend_reg_lnk'] = $attendee instanceof EE_Attendee
                                     && EE_Registry::instance()->CAP->current_user_can('ee_send_message',
            'espresso_registrations_resend_registration', $item->ID()) ? '
			<li>
			<a href="'
                                                                         . $resend_reg_lnk_url
                                                                         . '" title="'
                                                                         . esc_attr__('Resend Registration Details',
                'event_espresso')
                                                                         . '" class="tiny-text">
				<div class="dashicons dashicons-email-alt"></div>
			</a>
			</li>' : '';
        // page=transactions&action=view_transaction&txn=256&_wpnonce=6414da4dbb
        $view_txn_lnk_url = EE_Admin_Page::add_query_args_and_nonce(array(
            'action' => 'view_transaction',
            'TXN_ID' => $this->_transaction_details['id'],
        ), TXN_ADMIN_URL);
        $actions['view_txn_lnk'] = EE_Registry::instance()->CAP->current_user_can('ee_read_transaction',
            'espresso_transactions_view_transaction', $this->_transaction_details['id']) ? '
			<li>
			<a class="ee-status-color-'
                                                                                           . $this->_transaction_details['status']
                                                                                           . ' tiny-text" href="'
                                                                                           . $view_txn_lnk_url
                                                                                           . '"  title="'
                                                                                           . $this->_transaction_details['title_attr']
                                                                                           . '">
				<div class="dashicons dashicons-cart"></div>
			</a>
			</li>' : '';
        //invoice link
        $actions['dl_invoice_lnk'] = '';
        $dl_invoice_lnk_url = $item->invoice_url();
        //only show invoice link if message type is active.
        if ($attendee instanceof EE_Attendee
            && $item->is_primary_registrant()
            && EEH_MSG_Template::is_mt_active('invoice')
        ) {
            $actions['dl_invoice_lnk'] = '
		<li>
			<a title="'
                                         . esc_attr__('View Transaction Invoice', 'event_espresso')
                                         . '" target="_blank" href="'
                                         . $dl_invoice_lnk_url
                                         . '" class="tiny-text">
				<span class="dashicons dashicons-media-spreadsheet ee-icon-size-18"></span>
			</a>
		</li>';
        }
        $actions['filtered_messages_link'] = '';
        //message list table link (filtered by REG_ID
        if (EE_Registry::instance()->CAP->current_user_can('ee_read_global_messages', 'view_filtered_messages')) {
            $actions['filtered_messages_link'] = '<li>'
                                                 . EEH_MSG_Template::get_message_action_link('see_notifications_for',
                    null, array(
                        '_REG_ID' => $item->ID(),
                    ))
                                                 . '</li>';
        }
        $actions = apply_filters('FHEE__EE_Registrations_List_Table__column_actions__actions', $actions, $item, $this);
        return $this->_action_string(implode('', $actions), $item, 'ul', 'reg-overview-actions-ul');
    }

}
