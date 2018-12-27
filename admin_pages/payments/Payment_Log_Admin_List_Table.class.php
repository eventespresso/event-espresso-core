<?php

/**
 * Payment_Log_Admin_list_table
 * Class for preparing the list table to show the payment log
 * note: anywhere there are no php docs it is because the docs are available in the parent class.
 *
 * @package         Registration_Form_Questions_Admin_List_Table
 * @subpackage      includes/core/admin/events/Registration_Form_Questions_Admin_List_Table.class.php
 * @author          Darren Ethier
 * ------------------------------------------------------------------------
 */
class Payment_Log_Admin_List_Table extends EE_Admin_List_Table
{

    /**
     * @param \EE_Admin_Page $admin_page
     * @return Payment_Log_Admin_List_Table
     */
    public function __construct($admin_page)
    {
        parent::__construct($admin_page);
    }


    /**
     * _setup_data
     *
     * @return void
     */
    protected function _setup_data()
    {
        $this->_data = $this->_admin_page->get_payment_logs($this->_per_page, $this->_current_page);
        // if (isset($this->_req_data['status']) && $this->_req_data['status'] == 'trash') {
        //     $this->_data = $this->_admin_page->get_trashed_questions($this->_per_page, $this->_current_page, false);
        // } else {
        //     $this->_data = $this->_admin_page->get_questions($this->_per_page, $this->_current_page, false);
        // }
        $this->_all_data_count = $this->_admin_page->get_payment_logs($this->_per_page, $this->_current_page, true);
        add_action(
            'AHEE__EE_Admin_List_Table__extra_tablenav__after_bottom_buttons',
            array($this, 'add_download_logs_checkbox')
        );
    }


    /**
     * add_download_logs_checkbox
     * adds a checkbox to the bottom of the list table, instead of at the top with the rest of the filters
     *
     * @return void
     */
    public function add_download_logs_checkbox()
    {
        echo "<input type='submit' class='button-primary' id='download_results' name='download_results' value='"
             . __(
                 'Download Results',
                 'event_espresso'
             ) . "'>";
    }


    /**
     * _set_properties
     *
     * @return void
     */
    protected function _set_properties()
    {
        $this->_wp_list_args = array(
            'singular' => __('payment log', 'event_espresso'),
            'plural'   => __('payment logs', 'event_espresso'),
            'ajax'     => true, // for now,
            'screen'   => $this->_admin_page->get_current_screen()->id,
        );
        $this->_columns = array(
            'cb'       => '<input type="checkbox" />',
            'id'       => __('ID', 'event_espresso'),
            'LOG_time' => __('Time', 'event_espresso'),
            'PMD_ID'   => __('Payment Method', 'event_espresso'),
            'TXN_ID'   => __('Transaction ID', 'event_espresso'),
        );
        $this->_sortable_columns = array(
            'LOG_time' => array('LOG_time' => true),
        );
        $this->_hidden_columns = array();
    }


    /**
     * _get_table_filters
     *
     * @return array
     */
    protected function _get_table_filters()
    {
        $filters = array();
        // todo we're currently using old functions here. We need to move things into the Events_Admin_Page() class as methods.
        $payment_methods = EEM_Payment_Method::instance()->get_all();
        $payment_method_names = array(
            array('id' => 'all', 'text' => __("All", 'event_espresso')),
            array('id' => '0', 'text' => __("Unknown Payment Method", 'event_espresso')),
        );
        foreach ($payment_methods as $payment_method) {
            $payment_method_names[] = array('id' => $payment_method->ID(), 'text' => $payment_method->admin_name());
        }
        $filters[] = EEH_Form_Fields::select_input(
            '_payment_method',
            $payment_method_names,
            isset($this->_req_data['_payment_method'])
                ? $this->_req_data['_payment_method'] : 'all'
        );
        $start_date = isset($this->_req_data['payment-filter-start-date']) ? wp_strip_all_tags(
            $this->_req_data['payment-filter-start-date']
        ) : date('m/d/Y', strtotime('-6 months'));
        $end_date = isset($this->_req_data['payment-filter-end-date']) ? wp_strip_all_tags(
            $this->_req_data['payment-filter-end-date']
        ) : date('m/d/Y');
        ob_start();
        ?>
        <label for="txn-filter-start-date"><?php _e('Display Transactions from ', 'event_espresso'); ?></label>
        <input id="payment-filter-start-date" class="datepicker" type="text" value="<?php echo $start_date; ?>"
               name="payment-filter-start-date" size="15"/>
        <label for="txn-filter-end-date"><?php _e(' until ', 'event_espresso'); ?></label>
        <input id="payment-filter-end-date" class="datepicker" type="text" value="<?php echo $end_date; ?>"
               name="payment-filter-end-date" size="15"/>
        <?php
        $filters[] = ob_get_clean();
        return $filters;
    }


    /**
     * _add_view_counts
     *
     * @return void
     */
    protected function _add_view_counts()
    {
        $this->_views['all']['count'] = $this->_admin_page->get_payment_logs(
            $this->_per_page,
            $this->_current_page,
            true
        );
    }


    /**
     * column_cb
     *
     * @param \EE_Change_Log $item
     * @return string
     */
    public function column_cb($item)
    {
        return sprintf('<input type="checkbox" class="option_id" name="checkbox[%1$d]" value="%1$d" />', $item->ID());
    }


    /**
     * column_id
     *
     * @param \EE_Change_Log $item
     * @return string
     */
    public function column_id(EE_Change_Log $item)
    {
        $details_query_args = array(
            'action' => 'payment_log_details',
            'ID'     => $item->ID(),
        );
        $url = EE_Admin_Page::add_query_args_and_nonce($details_query_args, EE_PAYMENTS_ADMIN_URL);
        return "<a href='$url'>{$item->ID()}</a>";
    }


    /**
     * column_LOG_time
     *
     * @param \EE_Change_Log $item
     * @return string
     */
    public function column_LOG_time(EE_Change_Log $item)
    {
        return $item->get_datetime('LOG_time');
    }


    /**
     * column_PMD_ID
     *
     * @param \EE_Change_Log $item
     * @return string
     */
    public function column_PMD_ID(EE_Change_Log $item)
    {
        if ($item->object() instanceof EE_Payment_Method) {
            return $item->object()->admin_name();
        } elseif ($item->object() instanceof EE_Payment && $item->object()->payment_method()) {
            return $item->object()->payment_method()->admin_name();
        } elseif ($item->object() instanceof EE_Transaction) {
            return esc_html__('Unknown', 'event_espresso');
        } else {
            return esc_html__("No longer exists", 'event_espresso');
        }
    }


    /**
     * column_TXN_ID
     *
     * @param \EE_Change_Log $item
     * @return string
     */
    public function column_TXN_ID(EE_Change_Log $item)
    {
        if ($item->object() instanceof EE_Payment) {
            $transaction_id = $item->object()->TXN_ID();
        } elseif ($item->object() instanceof EE_Transaction) {
            $transaction_id = $item->object()->ID();
        } else {
            $transaction_id = null;
        }
        if ($transaction_id
            && EE_Registry::instance()->CAP->current_user_can(
                'ee_read_transaction',
                'espresso_transactions_view_transaction',
                $transaction_id
            )) {
            $view_txn_lnk_url = EE_Admin_Page::add_query_args_and_nonce(
                array('action' => 'view_transaction', 'TXN_ID' => $transaction_id),
                TXN_ADMIN_URL
            );
            return '<a href="'
                   . $view_txn_lnk_url
                   . '"  title="'
                   . sprintf(
                       esc_attr__('click to view transaction #%s', 'event_espresso'),
                       $transaction_id
                   )
                   . '">'
                   . sprintf(esc_html__('view txn %s', 'event_espresso'), $transaction_id)
                   . '</a>';
        }
        // No transaction id or use can not view the transaction.
        return __("Unable to find transaction", 'event_espresso');
    }
}
