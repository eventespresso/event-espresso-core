<?php

/**
 * Payment_Log_Admin_list_table
 * Class for preparing the list table to show the payment log
 * note: anywhere there are no php docs it is because the docs are available in the parent class.
 *
 * @package         Registration_Form_Questions_Admin_List_Table
 * @subpackage      includes/core/admin/events/Registration_Form_Questions_Admin_List_Table.class.php
 * @author          Darren Ethier
 */
class Payment_Log_Admin_List_Table extends EE_Admin_List_Table
{
    /**
     * @var Payments_Admin_Page $_admin_page
     */
    protected $_admin_page;


    /**
     * @param EE_Admin_Page $admin_page
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
            [$this, 'add_download_logs_checkbox']
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
        echo "<input type='submit' class='button--primary' id='download_results' name='download_results' value='"
             . esc_html__('Download Results', 'event_espresso') . "'>";
    }


    /**
     * _set_properties
     *
     * @return void
     */
    protected function _set_properties()
    {
        $this->_wp_list_args     = [
            'singular' => esc_html__('payment log', 'event_espresso'),
            'plural'   => esc_html__('payment logs', 'event_espresso'),
            'ajax'     => true, // for now,
            'screen'   => $this->_admin_page->get_current_screen()->id,
        ];
        $this->_columns          = [
            'cb'       => '<input type="checkbox" />',
            'id'       => esc_html__('ID', 'event_espresso'),
            'LOG_time' => esc_html__('Time', 'event_espresso'),
            'PMD_ID'   => esc_html__('Payment Method', 'event_espresso'),
            'TXN_ID'   => esc_html__('Transaction ID', 'event_espresso'),
        ];
        $this->_sortable_columns = [
            'LOG_time' => ['LOG_time' => true],
        ];
        $this->_hidden_columns   = [];
    }


    /**
     * _get_table_filters
     *
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _get_table_filters()
    {
        $filters = [];
        // todo we're currently using old functions here. We need to move things into the Events_Admin_Page() class as methods.
        /** @var EE_Payment_Method[] $payment_methods */
        $payment_methods      = EEM_Payment_Method::instance()->get_all();
        $payment_method_names = [
            ['id' => 'all', 'text' => esc_html__("All", 'event_espresso')],
            ['id' => '0', 'text' => esc_html__("Unknown Payment Method", 'event_espresso')],
        ];
        foreach ($payment_methods as $payment_method) {
            $payment_method_names[] = ['id' => $payment_method->ID(), 'text' => $payment_method->admin_name()];
        }
        $filters[]  = EEH_Form_Fields::select_input(
            '_payment_method',
            $payment_method_names,
            isset($this->_req_data['_payment_method'])
                ? $this->_req_data['_payment_method']
                : 'all'
        );
        $start_date = isset($this->_req_data['payment-filter-start-date'])
            ? wp_strip_all_tags($this->_req_data['payment-filter-start-date'])
            : date('m/d/Y', strtotime('-6 months'));
        $end_date   = isset($this->_req_data['payment-filter-end-date'])
            ? wp_strip_all_tags($this->_req_data['payment-filter-end-date'])
            : date('m/d/Y');
        ob_start();
        ?>
        <label for="payment-filter-start-date">
            <?php esc_html_e('Display Transactions from ', 'event_espresso'); ?>
        </label>
        <input id="payment-filter-start-date"
               class="datepicker"
               type="text"
               value="<?php echo esc_attr($start_date); ?>"
               name="payment-filter-start-date"
               size="15"
        />
        <label for="payment-filter-end-date">
            <?php esc_html_e(' until ', 'event_espresso'); ?>
        </label>
        <input id="payment-filter-end-date"
               class="datepicker"
               type="text"
               value="<?php echo esc_attr($end_date); ?>"
               name="payment-filter-end-date"
               size="15"
        />
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
     * @param EE_Change_Log $item
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_cb($item)
    {
        return sprintf('<input type="checkbox" class="option_id" name="checkbox[%1$d]" value="%1$d" />', $item->ID());
    }


    /**
     * column_id
     *
     * @param EE_Change_Log $item
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_id(EE_Change_Log $item)
    {
        $ID = absint($item->ID());
        $url = esc_url_raw(
            EE_Admin_Page::add_query_args_and_nonce(
                [
                        'action' => 'payment_log_details',
                        'ID'     => $ID,
                ],
                EE_PAYMENTS_ADMIN_URL
            )
        );
        $label = esc_attr__('View Payment Log Details', 'event_espresso');
        $payment_log = "<a class='ee-aria-tooltip' aria-label='{$label}' href='$url'>{$ID}</a>";
        $content = '
            <span class="ee-entity-id">' . $payment_log . '</span>
            <span class="show-on-mobile-view-only">
                <span>' . $this->column_LOG_time($item, false) . '</span>
                &nbsp;
                <span>' . $this->column_PMD_ID($item, false) . '</span>
            </span>';
        return $this->columnContent('id', $content, 'end');
    }


    /**
     * column_LOG_time
     *
     * @param EE_Change_Log $item
     * @param bool          $prep_content
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_LOG_time(EE_Change_Log $item, bool $prep_content = true): string
    {
        $content = $item->get_datetime('LOG_time');
        return $prep_content ? $this->columnContent('LOG_time', $content) : $content;
    }


    /**
     * column_PMD_ID
     *
     * @param EE_Change_Log $item
     * @param bool          $prep_content
     * @return string
     * @throws EE_Error
     */
    public function column_PMD_ID(EE_Change_Log $item, bool $prep_content = true): string
    {
        $object = $item->object();
        if ($object instanceof EE_Payment_Method) {
            $content = $object->admin_name();
        } elseif (
            $object instanceof EE_Payment
            && $object->payment_method() instanceof EE_Payment_Method
        ) {
            $content = $object->payment_method()->admin_name();
        } elseif ($object instanceof EE_Transaction) {
            $content = esc_html__('Unknown', 'event_espresso');
        } else {
            $content = esc_html__('No longer exists', 'event_espresso');
        }
        return $prep_content ? $this->columnContent('PMD_ID', $content) : $content;
    }


    /**
     * column_TXN_ID
     *
     * @param EE_Change_Log $item
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_TXN_ID(EE_Change_Log $item): string
    {
        $object = $item->object();
        if ($object instanceof EE_Payment) {
            $transaction_id = $object->TXN_ID();
        } elseif ($object instanceof EE_Transaction) {
            $transaction_id = $object->ID();
        } else {
            $transaction_id = null;
        }
        if (
            $transaction_id
            && EE_Registry::instance()->CAP->current_user_can(
                'ee_read_transaction',
                'espresso_transactions_view_transaction',
                $transaction_id
            )
        ) {
            $view_txn_lnk_url = EE_Admin_Page::add_query_args_and_nonce(
                ['action' => 'view_transaction', 'TXN_ID' => $transaction_id],
                TXN_ADMIN_URL
            );
            $content = '<a href="' . esc_url_raw($view_txn_lnk_url) . '"  '
                   . 'title="' . sprintf(
                       esc_attr__('click to view transaction #%s', 'event_espresso'),
                       $transaction_id
                   ) . '">'
                   . sprintf(esc_html__('view txn %s', 'event_espresso'), $transaction_id)
                   . '</a>';
        } else {
            // No transaction id or use can not view the transaction.
            $content = esc_html__('Unable to find transaction', 'event_espresso');
        }
        return $this->columnContent('TXN_ID', $content);
    }
}
