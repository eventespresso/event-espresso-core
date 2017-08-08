<?php

defined('EVENT_ESPRESSO_VERSION') || exit('No direct access allowed.');

/**
 * Transactions Table class
 *
 * @package                   Event Espresso
 * @subpackage                includes/admin_screens/Transactions_List_Table.class.php
 * @author                    Brent Christensen
 * ------------------------------------------------------------------------
 */
class EE_Admin_Transactions_List_Table extends EE_Admin_List_Table
{

    private $_status;


    /**
     * @param \Transactions_Admin_Page $admin_page
     */
    public function __construct(\Transactions_Admin_Page $admin_page)
    {
        parent::__construct($admin_page);
        $this->_status = $this->_admin_page->get_transaction_status_array();
    }


    /**
     *_setup_data
     */
    protected function _setup_data()
    {
        $this->_data           = $this->_admin_page->get_transactions($this->_per_page);
        $status                = ! empty($this->_req_data['status']) ? $this->_req_data['status'] : 'all';
        $this->_all_data_count = $this->_admin_page->get_transactions($this->_per_page, true, $status);
    }


    /**
     *_set_properties
     */
    protected function _set_properties()
    {
        $this->_wp_list_args = array(
            'singular' => __('transaction', 'event_espresso'),
            'plural'   => __('transactions', 'event_espresso'),
            'ajax'     => true,
            'screen'   => $this->_admin_page->get_current_screen()->id,
        );
        $ID_column_name      = __('ID', 'event_espresso');
        $ID_column_name      .= ' : <span class="show-on-mobile-view-only" style="float:none">';
        $ID_column_name      .= __('Transaction Date', 'event_espresso');
        $ID_column_name      .= '</span> ';
        $this->_columns      = array(
            'TXN_ID'        => $ID_column_name,
            'TXN_timestamp' => __('Transaction Date', 'event_espresso'),
            'TXN_total'     => __('Total', 'event_espresso'),
            'TXN_paid'      => __('Paid', 'event_espresso'),
            'ATT_fname'     => __('Primary Registrant', 'event_espresso'),
            'event_name'    => __('Event', 'event_espresso'),
            'actions'       => __('Actions', 'event_espresso'),
        );

        $this->_sortable_columns = array(
            'TXN_ID'        => array('TXN_ID' => false),
            'event_name'    => array('event_name' => false),
            'ATT_fname'     => array('ATT_fname' => false),
            'TXN_timestamp' => array('TXN_timestamp' => true) //true means its already sorted
        );

        $this->_primary_column = 'TXN_ID';

        $this->_hidden_columns = array();
    }


    /**
     * This simply sets up the row class for the table rows.
     * Allows for easier overriding of child methods for setting up sorting.
     *
     * @param  EE_Transaction $transaction the current item
     * @return string
     * @throws \EE_Error
     */
    protected function _get_row_class($transaction)
    {
        $class = parent::_get_row_class($transaction);
        //add status class
        $class .= ' ee-status-strip txn-status-' . $transaction->status_ID();
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
     * @return array
     */
    protected function _get_table_filters()
    {
        $filters    = array();
        $start_date = isset($this->_req_data['txn-filter-start-date'])
            ? wp_strip_all_tags($this->_req_data['txn-filter-start-date'])
            : date(
                'm/d/Y',
                strtotime('-10 year')
            );
        $end_date   = isset($this->_req_data['txn-filter-end-date'])
            ? wp_strip_all_tags($this->_req_data['txn-filter-end-date'])
            : date(
                'm/d/Y',
                current_time('timestamp')
            );
        ob_start();
        ?>
        <label for="txn-filter-start-date">Display Transactions from </label>
        <input id="txn-filter-start-date" class="datepicker" type="text" value="<?php echo $start_date; ?>"
               name="txn-filter-start-date" size="15"/>
        <label for="txn-filter-end-date"> until </label>
        <input id="txn-filter-end-date" class="datepicker" type="text" value="<?php echo $end_date; ?>"
               name="txn-filter-end-date" size="15"/>
        <?php
        $filters[] = ob_get_contents();
        ob_end_clean();
        return $filters;
    }


    /**
     *_add_view_counts
     */
    protected function _add_view_counts()
    {
        $this->_views['all']['count']       = $this->_admin_page->get_transactions($this->_per_page, true, 'all');
        $this->_views['abandoned']['count'] = $this->_admin_page->get_transactions($this->_per_page, true, 'abandoned');
        $this->_views['failed']['count']    = $this->_admin_page->get_transactions($this->_per_page, true, 'failed');
    }


    /**
     *    column TXN_ID
     *
     * @param \EE_Transaction $transaction
     * @return string
     * @throws \EE_Error
     */
    public function column_TXN_ID(EE_Transaction $transaction)
    {
        $view_lnk_url = EE_Admin_Page::add_query_args_and_nonce(array(
            'action' => 'view_transaction',
            'TXN_ID' => $transaction->ID(),
        ), TXN_ADMIN_URL);
        $content      = '<a href="' . $view_lnk_url . '"'
                        . ' title="' . esc_attr__('Go to Transaction Details', 'event_espresso') . '">'
                        . $transaction->ID()
                        . '</a>';

        //txn timestamp
        $content .= '  <span class="show-on-mobile-view-only">' . $this->_get_txn_timestamp($transaction) . '</span>';
        return $content;
    }


    /**
     * @param \EE_Transaction $transaction
     * @return string
     * @throws \EE_Error
     */
    protected function _get_txn_timestamp(EE_Transaction $transaction)
    {
        //txn timestamp
        // is TXN less than 2 hours old ?
        if (($transaction->failed() || $transaction->is_abandoned())
            && (
                (time() - EE_Registry::instance()->SSN->lifespan()) < $transaction->datetime(false, true)
            )
        ) {
            $timestamp = esc_html__('TXN in progress...', 'event_espresso');
        } else {
            $timestamp = $transaction->get_i18n_datetime('TXN_timestamp');
        }
        return $timestamp;
    }


    /**
     *    column_cb
     *
     * @param \EE_Transaction $transaction
     * @return string
     * @throws \EE_Error
     */
    public function column_cb($transaction)
    {
        return sprintf(
            '<input type="checkbox" name="%1$s[]" value="%2$s" />',
            $this->_wp_list_args['singular'],
            $transaction->ID()
        );
    }


    /**
     *    column_TXN_timestamp
     *
     * @param \EE_Transaction $transaction
     * @return string
     * @throws \EE_Error
     */
    public function column_TXN_timestamp(EE_Transaction $transaction)
    {
        $view_lnk_url = EE_Admin_Page::add_query_args_and_nonce(array(
            'action' => 'view_transaction',
            'TXN_ID' => $transaction->ID(),
        ), TXN_ADMIN_URL);
        $txn_date     = '<a href="' . $view_lnk_url . '"'
                        . ' title="'
                        . esc_attr__('View Transaction Details for TXN #', 'event_espresso') . $transaction->ID() . '">'
                        . $this->_get_txn_timestamp($transaction)
                        . '</a>';
        //status
        $txn_date .= '<br><span class="ee-status-text-small">'
                     . EEH_Template::pretty_status(
                         $transaction->status_ID(),
                         false,
                         'sentence'
                     )
                     . '</span>';
        return $txn_date;
    }


    /**
     *    column_TXN_total
     *
     * @param \EE_Transaction $transaction
     * @return string
     * @throws \EE_Error
     */
    public function column_TXN_total(EE_Transaction $transaction)
    {
        if ($transaction->get('TXN_total') > 0) {
            return '<span class="txn-pad-rght">'
                   . apply_filters(
                       'FHEE__EE_Admin_Transactions_List_Table__column_TXN_total__TXN_total',
                       $transaction->get_pretty('TXN_total'),
                       $transaction
                   )
                   . '</span>';
        } else {
            return '<span class="txn-overview-free-event-spn">' . esc_html__('free', 'event_espresso') . '</span>';
        }
    }


    /**
     *    column_TXN_paid
     *
     * @param \EE_Transaction $transaction
     * @return mixed|string
     * @throws \EE_Error
     */
    public function column_TXN_paid(EE_Transaction $transaction)
    {
        $transaction_total = $transaction->get('TXN_total');
        $transaction_paid  = $transaction->get('TXN_paid');

        if (\EEH_Money::compare_floats($transaction_total, 0, '>')) {
            // monies owing
            $span_class = 'txn-overview-part-payment-spn';
            if (\EEH_Money::compare_floats($transaction_paid, $transaction_total, '>=')) {
                // paid in full
                $span_class = 'txn-overview-full-payment-spn';
            } elseif (\EEH_Money::compare_floats($transaction_paid, 0, '==')) {
                // no payments made
                $span_class = 'txn-overview-no-payment-spn';
            }
        } else {
            $span_class       = 'txn-overview-free-event-spn';
            $transaction_paid = 0;
        }

        $payment_method      = $transaction->payment_method();
        $payment_method_name = $payment_method instanceof EE_Payment_Method
            ? $payment_method->admin_name()
            : esc_html__('Unknown', 'event_espresso');
        $transaction_paid_content = $transaction_paid !== 0 ? $transaction->get_pretty('TXN_paid') : $transaction_paid;

        $content = '<span class="' . $span_class . ' txn-pad-rght">'
                   . $transaction_paid_content
                   . '</span>';
        if ($transaction_paid > 0) {
            $content .= '<br><span class="ee-status-text-small">'
                        . sprintf(
                            esc_html__('...via %s', 'event_espresso'),
                            $payment_method_name
                        )
                        . '</span>';
        }
        return $content;
    }


    /**
     *    column_ATT_fname
     *
     * @param \EE_Transaction $transaction
     * @return string
     * @throws \EE_Error
     */
    public function column_ATT_fname(EE_Transaction $transaction)
    {
        $primary_reg = $transaction->primary_registration();
        $attendee    = $primary_reg->get_first_related('Attendee');
        if ($attendee instanceof EE_Attendee) {
            $edit_lnk_url = EE_Admin_Page::add_query_args_and_nonce(array(
                'action'  => 'view_registration',
                '_REG_ID' => $primary_reg->ID(),
            ), REG_ADMIN_URL);
            $content      = EE_Registry::instance()->CAP->current_user_can(
                'ee_read_registration',
                'espresso_registrations_view_registration',
                $primary_reg->ID()
            )
                ? '<a href="' . $edit_lnk_url . '"'
                    . ' title="' . esc_attr__('View Registration Details', 'event_espresso') . '">'
                    . $attendee->full_name()
                    . '</a>'
                : $attendee->full_name();
            $content      .= '<br>' . $attendee->email();
            return $content;
        }
        return $transaction->failed() || $transaction->is_abandoned()
            ? esc_html__('no contact record.', 'event_espresso')
            : esc_html__(
                'No contact record, because the transaction was abandoned or the registration process failed.',
                'event_espresso'
            );
    }


    /**
     *    column_ATT_email
     *
     * @param \EE_Transaction $transaction
     * @return string
     * @throws \EE_Error
     */
    public function column_ATT_email(EE_Transaction $transaction)
    {
        $attendee = $transaction->primary_registration()->get_first_related('Attendee');
        if (! empty($attendee)) {
            return '<a href="mailto:' . $attendee->get('ATT_email') . '">'
                   . $attendee->get('ATT_email')
                   . '</a>';
        } else {
            return $transaction->failed() || $transaction->is_abandoned()
                ? esc_html__('no contact record.', 'event_espresso')
                : esc_html__(
                    'No contact record, because the transaction was abandoned or the registration process failed.',
                    'event_espresso'
                );
        }
    }


    /**
     *    column_event_name
     *
     * @param \EE_Transaction $transaction
     * @return string
     * @throws \EE_Error
     */
    public function column_event_name(EE_Transaction $transaction)
    {
        $actions = array();
        $event   = $transaction->primary_registration()->get_first_related('Event');
        if (! empty($event)) {
            $edit_event_url = EE_Admin_Page::add_query_args_and_nonce(
                array('action' => 'edit', 'post' => $event->ID()),
                EVENTS_ADMIN_URL
            );
            $event_name     = $event->get('EVT_name');

            //filter this view by transactions for this event
            $txn_by_event_lnk = EE_Admin_Page::add_query_args_and_nonce(array(
                'action' => 'default',
                'EVT_ID' => $event->ID(),
            ));
            if (EE_Registry::instance()->CAP->current_user_can(
                'ee_edit_event',
                'espresso_events_edit',
                $event->ID()
            )) {
                $actions['filter_by_event'] = '<a href="' . $txn_by_event_lnk . '"'
                        . ' title="' . esc_attr__('Filter transactions by this event', 'event_espresso') . '">'
                        . esc_html__('View Transactions for this event', 'event_espresso')
                        . '</a>';
            }

            return sprintf(
                '%1$s %2$s',
                EE_Registry::instance()->CAP->current_user_can(
                    'ee_edit_event',
                    'espresso_events_edit',
                    $event->ID()
                )
                    ? '<a href="' . $edit_event_url . '"'
                        . ' title="'
                        . sprintf(
                            esc_attr__('Edit Event: %s', 'event_espresso'),
                            $event->get('EVT_name')
                        )
                        . '">'
                        . wp_trim_words(
                            $event_name,
                            30,
                            '...'
                        )
                        . '</a>'
                        : wp_trim_words($event_name, 30, '...'),
                $this->row_actions($actions)
            );
        } else {
            return esc_html__(
                'The event associated with this transaction via the primary registration cannot be retrieved.',
                'event_espresso'
            );
        }
    }


    /**
     *    column_actions
     *
     * @param \EE_Transaction $transaction
     * @return string
     * @throws \EE_Error
     */
    public function column_actions(EE_Transaction $transaction)
    {
        return $this->_action_string(
            $this->get_transaction_details_link($transaction)
            . $this->get_invoice_link($transaction)
            . $this->get_receipt_link($transaction)
            . $this->get_primary_registration_details_link($transaction)
            . $this->get_send_payment_reminder_trigger_link($transaction)
            . $this->get_payment_overview_link($transaction)
            . $this->get_related_messages_link($transaction),
            $transaction,
            'ul',
            'txn-overview-actions-ul'
        );
    }


    /**
     * Get the transaction details link.
     * @param EE_Transaction $transaction
     * @return string
     * @throws EE_Error
     */
    protected function get_transaction_details_link(EE_Transaction $transaction)
    {
        $url          = EE_Admin_Page::add_query_args_and_nonce(array(
            'action' => 'view_transaction',
            'TXN_ID' => $transaction->ID(),
        ), TXN_ADMIN_URL);
        return '
			<li>
				<a href="' . $url . '"'
                    . ' title="' . esc_attr__('View Transaction Details', 'event_espresso') . '" class="tiny-text">
					<span class="dashicons dashicons-cart"></span>
				</a>
			</li>';
    }


    /**
     * Get the invoice link for the given registration.
     * @param EE_Transaction $transaction
     * @return string
     * @throws EE_Error
     */
    protected function get_invoice_link(EE_Transaction $transaction)
    {
        $registration = $transaction->primary_registration();
        if ($registration instanceof EE_Registration) {
            $url = $registration->invoice_url();
            //only show invoice link if message type is active.
            if ($registration->attendee() instanceof EE_Attendee
                && EEH_MSG_Template::is_mt_active('invoice')
            ) {
                return '
                <li>
                    <a title="' . esc_attr__('View Transaction Invoice', 'event_espresso') . '"'
                       . ' target="_blank" href="' . $url . '" class="tiny-text">
                        <span class="dashicons dashicons-media-spreadsheet ee-icon-size-18"></span>
                    </a>
                </li>';
            }
        }
        return '';
    }


    /**
     * Get the receipt link for the transaction.
     * @param EE_Transaction $transaction
     * @return string
     * @throws EE_Error
     */
    protected function get_receipt_link(EE_Transaction $transaction)
    {
        $registration = $transaction->primary_registration();
        if ($registration instanceof EE_Registration) {
            $url = $registration->receipt_url();
            //only show receipt link if message type is active.
            if ($registration->attendee() instanceof EE_Attendee
                && EEH_MSG_Template::is_mt_active('receipt')) {
                return '
			<li>
				<a title="' . esc_attr__('View Transaction Receipt', 'event_espresso') . '"'
                                  . ' target="_blank" href="' . $url . '" class="tiny-text">
					<span class="dashicons dashicons-media-default ee-icon-size-18"></span>
				</a>
			</li>';
            }
        }
        return '';
    }


    /**
     * Get the link to view the details for the primary registration.
     * @param EE_Transaction $transaction
     * @return string
     * @throws EE_Error
     */
    protected function get_primary_registration_details_link(EE_Transaction $transaction)
    {
        $registration = $transaction->primary_registration();
        if ($registration instanceof EE_Registration) {
            $url      = EE_Admin_Page::add_query_args_and_nonce(array(
                'action'  => 'view_registration',
                '_REG_ID' => $registration->ID(),
            ), REG_ADMIN_URL);
            return EE_Registry::instance()->CAP->current_user_can(
                'ee_read_registration',
                'espresso_registrations_view_registration',
                $registration->ID()
            )
                ? '
				<li>
					<a href="' . $url . '"'
                  . ' title="' . esc_attr__('View Registration Details', 'event_espresso') . '" class="tiny-text">
						<span class="dashicons dashicons-clipboard"></span>
					</a>
				</li>'
                : '';
        }
        return '';
    }


    /**
     * Get send payment reminder trigger link
     * @param EE_Transaction $transaction
     * @return string
     * @throws EE_Error
     */
    protected function get_send_payment_reminder_trigger_link(EE_Transaction $transaction)
    {
        $registration = $transaction->primary_registration();
        if ($registration instanceof EE_Registration
            && $registration->attendee() instanceof EE_Attendee
            && EEH_MSG_Template::is_mt_active('payment_reminder')
            && ! in_array(
                $transaction->status_ID(),
                array(EEM_Transaction::complete_status_code, EEM_Transaction::overpaid_status_code),
                true
            )
            && EE_Registry::instance()->CAP->current_user_can(
                'ee_send_message',
                'espresso_transactions_send_payment_reminder'
            )
        ) {
            $url = EE_Admin_Page::add_query_args_and_nonce(array(
                'action' => 'send_payment_reminder',
                'TXN_ID' => $transaction->ID(),
            ), TXN_ADMIN_URL);
            return  '
            <li>
                <a href="' . $url . '"'
                  . ' title="' . esc_attr__('Send Payment Reminder', 'event_espresso') . '" class="tiny-text">
                    <span class="dashicons dashicons-email-alt"></span>
                </a>
            </li>';
        }
        return '';
    }



    /**
     * Get link to filtered view in the message activity list table of messages for this transaction.
     * @param EE_Transaction $transaction
     * @return string
     * @throws EE_Error
     */
    protected function get_related_messages_link(EE_Transaction $transaction)
    {
        $url = EEH_MSG_Template::get_message_action_link(
            'see_notifications_for',
            null,
            array('TXN_ID' => $transaction->ID())
        );
        return EE_Registry::instance()->CAP->current_user_can(
            'ee_read_global_messages',
            'view_filtered_messages'
        )
            ? '<li>' . $url . '</li>'
            : '';
    }


    /**
     * Return the link to make a payment on the frontend
     * @param EE_Transaction $transaction
     * @return string
     * @throws EE_Error
     */
    protected function get_payment_overview_link(EE_Transaction $transaction)
    {
        $registration = $transaction->primary_registration();
        if ($registration instanceof EE_Registration
            && $transaction->status_ID() !== EEM_Transaction::complete_status_code
            && $registration->owes_monies_and_can_pay()
        ) {
            return '
            <li>
                <a title="' . esc_attr__('Make Payment from the Frontend.', 'event_espresso') . '"'
                    . ' target="_blank" href="' . $registration->payment_overview_url(true) . '"'
                    . ' class="tiny-text">
                    <span class="dashicons dashicons-money ee-icon-size-18"></span>
                </a>
            </li>
            ';

        }
        return '';
    }
}
