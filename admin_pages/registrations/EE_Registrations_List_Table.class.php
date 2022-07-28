<?php

use EventEspresso\core\domain\services\admin\registrations\list_table\csv_reports\RegistrationsCsvReportParams;
use EventEspresso\core\exceptions\EntityNotFoundException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;

/**
 * Registrations Table class
 *
 * @package     Event Espresso
 * @subpackage  includes/admin_screens/Registrations_List_Table.class.php
 * @author      Brent Christensen
 */
class EE_Registrations_List_Table extends EE_Admin_List_Table
{
    /**
     * @var Registrations_Admin_Page
     */
    protected $_admin_page;

    /**
     * @var array
     */
    private $_status;

    /**
     * An array of transaction details for the related transaction to the registration being processed.
     * This is set via the _set_related_details method.
     *
     * @var array
     */
    protected $_transaction_details = [];

    /**
     * An array of event details for the related event to the registration being processed.
     * This is set via the _set_related_details method.
     *
     * @var array
     */
    protected $_event_details = [];


    /**
     * @param Registrations_Admin_Page $admin_page
     */
    public function __construct(Registrations_Admin_Page $admin_page)
    {
        $req_data = $admin_page->get_request_data();
        if (! empty($req_data['event_id'])) {
            $extra_query_args = [];
            foreach ($admin_page->get_views() as $view_details) {
                $extra_query_args[ $view_details['slug'] ] = ['event_id' => $req_data['event_id']];
            }
            $this->_views = $admin_page->get_list_table_view_RLs($extra_query_args);
        }
        parent::__construct($admin_page);
        $this->_status = $this->_admin_page->get_registration_status_array();
    }


    /**
     * @return void
     * @throws EE_Error
     */
    protected function _setup_data()
    {
        $this->_data           = $this->_admin_page->get_registrations($this->_per_page);
        $this->_all_data_count = $this->_admin_page->get_registrations($this->_per_page, true);
    }


    /**
     * @return void
     */
    protected function _set_properties()
    {
        $return_url          = $this->getReturnUrl();
        $this->_wp_list_args = [
            'singular' => esc_html__('registration', 'event_espresso'),
            'plural'   => esc_html__('registrations', 'event_espresso'),
            'ajax'     => true,
            'screen'   => $this->_admin_page->get_current_screen()->id,
        ];
        $ID_column_name      = esc_html__('ID', 'event_espresso');
        $ID_column_name      .= ' : <span class="show-on-mobile-view-only" style="float:none">';
        $ID_column_name      .= esc_html__('Registrant Name', 'event_espresso');
        $ID_column_name      .= '</span> ';

        $EVT_ID = isset($this->_req_data['event_id']) ? $this->_req_data['event_id'] : 0;
        $DTT_ID = isset($this->_req_data['DTT_ID']) ? $this->_req_data['DTT_ID'] : 0;

        if ($EVT_ID) {
            $this->_columns        = [
                'cb'               => '<input type="checkbox" />', // Render a checkbox instead of text
                '_REG_ID'          => $ID_column_name,
                'ATT_fname'        => esc_html__('Name', 'event_espresso'),
                'ATT_email'        => esc_html__('Email', 'event_espresso'),
                '_REG_date'        => esc_html__('Reg Date', 'event_espresso'),
                'PRC_amount'       => esc_html__('TKT Price', 'event_espresso'),
                '_REG_final_price' => esc_html__('Final Price', 'event_espresso'),
                'TXN_total'        => esc_html__('Total Txn', 'event_espresso'),
                'TXN_paid'         => esc_html__('Paid', 'event_espresso'),
                'actions'          => esc_html__('Actions', 'event_espresso'),
            ];
        } else {
            $this->_columns        = [
                'cb'               => '<input type="checkbox" />', // Render a checkbox instead of text
                '_REG_ID'          => $ID_column_name,
                'ATT_fname'        => esc_html__('Name', 'event_espresso'),
                '_REG_date'        => esc_html__('TXN Date', 'event_espresso'),
                'event_name'       => esc_html__('Event', 'event_espresso'),
                'DTT_EVT_start'    => esc_html__('Event Date', 'event_espresso'),
                '_REG_final_price' => esc_html__('Price', 'event_espresso'),
                '_REG_paid'        => esc_html__('Paid', 'event_espresso'),
                'actions'          => esc_html__('Actions', 'event_espresso'),
            ];
        }

        $csv_report = RegistrationsCsvReportParams::getRequestParams($return_url, $this->_req_data, $EVT_ID, $DTT_ID);
        if (! empty($csv_report)) {
            $this->_bottom_buttons['csv_reg_report'] = $csv_report;
        }

        $this->_primary_column   = '_REG_ID';
        $this->_sortable_columns = [
            '_REG_date'     => ['_REG_date' => true],   // true means its already sorted
            /**
             * Allows users to change the default sort if they wish.
             * Returning a falsey on this filter will result in the default sort to be by firstname rather than last
             * name.
             */
            'ATT_fname'     => [
                'FHEE__EE_Registrations_List_Table___set_properties__default_sort_by_registration_last_name',
                true,
                $this,
            ]
                ? ['ATT_lname' => false]
                : ['ATT_fname' => false],
            'event_name'    => ['event_name' => false],
            'DTT_EVT_start' => ['DTT_EVT_start' => false],
            '_REG_ID'       => ['_REG_ID' => false],
        ];
        $this->_hidden_columns   = [];
    }


    /**
     * This simply sets up the row class for the table rows.
     * Allows for easier overriding of child methods for setting up sorting.
     *
     * @param EE_Registration $item the current item
     * @return string
     */
    protected function _get_row_class($item)
    {
        $class = parent::_get_row_class($item);
        // add status class
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
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    protected function _set_related_details(EE_Registration $registration)
    {
        $transaction                = $registration->get_first_related('Transaction');
        $status                     = $transaction instanceof EE_Transaction
            ? $transaction->status_ID()
            : EEM_Transaction::failed_status_code;
        $this->_transaction_details = [
            'transaction' => $transaction,
            'status'      => $status,
            'id'          => $transaction instanceof EE_Transaction
                ? $transaction->ID()
                : 0,
            'title_attr'  => sprintf(
                esc_html__('View Transaction Details (%s)', 'event_espresso'),
                EEH_Template::pretty_status($status, false, 'sentence')
            ),
        ];
        try {
            $event = $registration->event();
        } catch (EntityNotFoundException $e) {
            $event = null;
        }
        $status               = $event instanceof EE_Event
            ? $event->get_active_status()
            : EE_Datetime::inactive;
        $this->_event_details = [
            'event'      => $event,
            'status'     => $status,
            'id'         => $event instanceof EE_Event
                ? $event->ID()
                : 0,
            'title_attr' => sprintf(
                esc_html__('Edit Event (%s)', 'event_espresso'),
                EEH_Template::pretty_status($status, false, 'sentence')
            ),
        ];
    }


    /**
     *    _get_table_filters
     *
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _get_table_filters()
    {
        $filters = [];
        // todo we're currently using old functions here. We need to move things into the Events_Admin_Page() class as
        // methods.
        $cur_date     = isset($this->_req_data['month_range'])
            ? $this->_req_data['month_range']
            : '';
        $cur_category = isset($this->_req_data['EVT_CAT'])
            ? $this->_req_data['EVT_CAT']
            : -1;
        $reg_status   = isset($this->_req_data['_reg_status'])
            ? $this->_req_data['_reg_status']
            : '';
        $filters[]    = EEH_Form_Fields::generate_registration_months_dropdown($cur_date, $reg_status, $cur_category);
        $filters[]    = EEH_Form_Fields::generate_event_category_dropdown($cur_category);
        $status       = [];
        $status[]     = ['id' => 0, 'text' => esc_html__('Select Status', 'event_espresso')];
        foreach ($this->_status as $key => $value) {
            $status[] = ['id' => $key, 'text' => $value];
        }
        if ($this->_view !== 'incomplete') {
            $filters[] = EEH_Form_Fields::select_input(
                '_reg_status',
                $status,
                isset($this->_req_data['_reg_status'])
                    ? strtoupper(sanitize_key($this->_req_data['_reg_status']))
                    : ''
            );
        }
        if (isset($this->_req_data['event_id'])) {
            $filters[] = EEH_Form_Fields::hidden_input('event_id', $this->_req_data['event_id'], 'reg_event_id');
        }
        return $filters;
    }


    /**
     * @return void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    protected function _add_view_counts()
    {
        $this->_views['all']['count']   = $this->_total_registrations();
        $this->_views['month']['count'] = $this->_total_registrations_this_month();
        $this->_views['today']['count'] = $this->_total_registrations_today();
        if (
            EE_Registry::instance()->CAP->current_user_can(
                'ee_delete_registrations',
                'espresso_registrations_trash_registrations'
            )
        ) {
            $this->_views['incomplete']['count'] = $this->_total_registrations('incomplete');
            $this->_views['trash']['count']      = $this->_total_registrations('trash');
        }
    }


    /**
     * @param string $view
     * @return int
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    protected function _total_registrations($view = '')
    {
        $_where = [];
        $EVT_ID = isset($this->_req_data['event_id'])
            ? absint($this->_req_data['event_id'])
            : false;
        if ($EVT_ID) {
            $_where['EVT_ID'] = $EVT_ID;
        }
        switch ($view) {
            case 'trash':
                return EEM_Registration::instance()->count_deleted([$_where]);
            case 'incomplete':
                $_where['STS_ID'] = EEM_Registration::status_id_incomplete;
                break;
            default:
                $_where['STS_ID'] = ['!=', EEM_Registration::status_id_incomplete];
        }
        return EEM_Registration::instance()->count([$_where]);
    }


    /**
     * @return int
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    protected function _total_registrations_this_month()
    {
        $EVT_ID          = isset($this->_req_data['event_id'])
            ? absint($this->_req_data['event_id'])
            : false;
        $_where          = $EVT_ID
            ? ['EVT_ID' => $EVT_ID]
            : [];
        $this_year_r     = date('Y', current_time('timestamp'));
        $time_start      = ' 00:00:00';
        $time_end        = ' 23:59:59';
        $this_month_r    = date('m', current_time('timestamp'));
        $days_this_month = date('t', current_time('timestamp'));
        // setup date query.
        $beginning_string   = EEM_Registration::instance()->convert_datetime_for_query(
            'REG_date',
            $this_year_r . '-' . $this_month_r . '-01' . ' ' . $time_start,
            'Y-m-d H:i:s'
        );
        $end_string         = EEM_Registration::instance()->convert_datetime_for_query(
            'REG_date',
            $this_year_r . '-' . $this_month_r . '-' . $days_this_month . ' ' . $time_end,
            'Y-m-d H:i:s'
        );
        $_where['REG_date'] = [
            'BETWEEN',
            [
                $beginning_string,
                $end_string,
            ],
        ];
        $_where['STS_ID']   = ['!=', EEM_Registration::status_id_incomplete];
        return EEM_Registration::instance()->count([$_where]);
    }


    /**
     * @return int
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    protected function _total_registrations_today()
    {
        $EVT_ID             = isset($this->_req_data['event_id'])
            ? absint($this->_req_data['event_id'])
            : false;
        $_where             = $EVT_ID
            ? ['EVT_ID' => $EVT_ID]
            : [];
        $current_date       = date('Y-m-d', current_time('timestamp'));
        $time_start         = ' 00:00:00';
        $time_end           = ' 23:59:59';
        $_where['REG_date'] = [
            'BETWEEN',
            [
                EEM_Registration::instance()->convert_datetime_for_query(
                    'REG_date',
                    $current_date . $time_start,
                    'Y-m-d H:i:s'
                ),
                EEM_Registration::instance()->convert_datetime_for_query(
                    'REG_date',
                    $current_date . $time_end,
                    'Y-m-d H:i:s'
                ),
            ],
        ];
        $_where['STS_ID']   = ['!=', EEM_Registration::status_id_incomplete];
        return EEM_Registration::instance()->count([$_where]);
    }


    /**
     * @param EE_Registration $item
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function column_cb($item)
    {
        /** checkbox/lock **/
        $transaction   = $item->get_first_related('Transaction');
        $payment_count = $transaction instanceof EE_Transaction
            ? $transaction->count_related('Payment')
            : 0;
        return $payment_count > 0 || ! EE_Registry::instance()->CAP->current_user_can(
            'ee_edit_registration',
            'registration_list_table_checkbox_input',
            $item->ID()
        )
            ? sprintf('<input type="checkbox" name="_REG_ID[]" value="%1$d" />', $item->ID())
              . '<span class="ee-lock-icon"></span>'
            : sprintf('<input type="checkbox" name="_REG_ID[]" value="%1$d" />', $item->ID());
    }


    /**
     * @param EE_Registration $item
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function column__REG_ID(EE_Registration $item)
    {
        $attendee = $item->attendee();
        $content  = $item->ID();
        $content  .= '<div class="show-on-mobile-view-only">';
        $content  .= '<br>';
        $content  .= $attendee instanceof EE_Attendee
            ? $attendee->full_name()
            : '';
        $content  .= '&nbsp;';
        $content  .= sprintf(
            esc_html__('(%1$s / %2$s)', 'event_espresso'),
            $item->count(),
            $item->group_size()
        );
        $content  .= '<br>';
        $content  .= sprintf(esc_html__('Reg Code: %s', 'event_espresso'), $item->get('REG_code'));
        $content  .= '</div>';
        return $content;
    }


    /**
     * @param EE_Registration $item
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function column__REG_date(EE_Registration $item)
    {
        $this->_set_related_details($item);
        // Build row actions
        $view_lnk_url = EE_Admin_Page::add_query_args_and_nonce(
            [
                'action' => 'view_transaction',
                'TXN_ID' => $this->_transaction_details['id'],
            ],
            TXN_ADMIN_URL
        );
        $view_link    = EE_Registry::instance()->CAP->current_user_can(
            'ee_read_transaction',
            'espresso_transactions_view_transaction'
        )
            ? '<a class="ee-status-color-'
              . $this->_transaction_details['status']
              . '" href="'
              . $view_lnk_url
              . '" aria-label="'
              . esc_attr($this->_transaction_details['title_attr'])
              . '">'
              . $item->get_i18n_datetime('REG_date')
              . '</a>'
            : $item->get_i18n_datetime('REG_date');
        $view_link    .= '<br><span class="ee-status-text-small">'
                         . EEH_Template::pretty_status($this->_transaction_details['status'], false, 'sentence')
                         . '</span>';
        return $view_link;
    }


    /**
     * @param EE_Registration $item
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function column_event_name(EE_Registration $item)
    {
        $this->_set_related_details($item);
        // page=espresso_events&action=edit_event&EVT_ID=2&edit_event_nonce=cf3a7e5b62
        $EVT_ID     = $item->event_ID();
        $event_name = $item->event_name();
        $event_name =
            $event_name
                ?: esc_html__("No Associated Event", 'event_espresso');
        $event_name = wp_trim_words($event_name, 30, '...');
        if ($EVT_ID) {
            $edit_event_url          = EE_Admin_Page::add_query_args_and_nonce(
                ['action' => 'edit', 'post' => $EVT_ID],
                EVENTS_ADMIN_URL
            );
            $edit_event              =
                EE_Registry::instance()->CAP->current_user_can('ee_edit_event', 'edit_event', $EVT_ID)
                    ? '<a class="ee-status-color-'
                      . $this->_event_details['status']
                      . '" href="'
                      . $edit_event_url
                      . '" aria-label="'
                      . esc_attr($this->_event_details['title_attr'])
                      . '">'
                      . $event_name
                      . '</a>'
                    : $event_name;
            $edit_event_url          = EE_Admin_Page::add_query_args_and_nonce(['event_id' => $EVT_ID], REG_ADMIN_URL);
            $actions['event_filter'] = '<a href="' . $edit_event_url . '" aria-label="';
            $actions['event_filter'] .= sprintf(
                esc_attr__('Filter this list to only show registrations for %s', 'event_espresso'),
                $event_name
            );
            $actions['event_filter'] .= '">' . esc_html__('View Registrations', 'event_espresso') . '</a>';
        } else {
            $edit_event              = $event_name;
            $actions['event_filter'] = '';
        }
        return sprintf('%1$s %2$s', $edit_event, $this->row_actions($actions));
    }


    /**
     * @param EE_Registration $item
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function column_DTT_EVT_start(EE_Registration $item)
    {
        $datetime_strings = [];
        $ticket           = $item->ticket();
        if ($ticket instanceof EE_Ticket) {
            $remove_defaults = ['default_where_conditions' => 'none'];
            $datetimes       = $ticket->datetimes($remove_defaults);
            foreach ($datetimes as $datetime) {
                $datetime_strings[] = $datetime->get_i18n_datetime('DTT_EVT_start');
            }
            return $this->generateDisplayForDatetimes($datetime_strings);
        }
        return esc_html__('There is no ticket on this registration', 'event_espresso');
    }


    /**
     * Receives an array of datetime strings to display and converts them to the html container for the column.
     *
     * @param array $datetime_strings
     * @return string
     */
    public function generateDisplayForDateTimes(array $datetime_strings)
    {
        $content       = '<div class="ee-registration-event-datetimes-container">';
        $expand_toggle = count($datetime_strings) > 1
            ? ' <span title="' . esc_attr__('Click to view all dates', 'event_espresso')
              . '" class="ee-js ee-more-datetimes-toggle dashicons dashicons-plus"></span>'
            : '';
        // get first item for initial visibility
        $content .= '<div class="left">' . array_shift($datetime_strings) . '</div>';
        $content .= $expand_toggle;
        if ($datetime_strings) {
            $content .= '<div style="clear:both"></div>';
            $content .= '<div class="ee-registration-event-datetimes-container more-items hidden">';
            $content .= implode("<br />", $datetime_strings);
            $content .= '</div>';
        }
        $content .= '</div>';
        return $content;
    }


    /**
     * @param EE_Registration $item
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function column_ATT_fname(EE_Registration $item)
    {
        $attendee      = $item->attendee();
        $edit_lnk_url  = EE_Admin_Page::add_query_args_and_nonce(
            [
                'action'  => 'view_registration',
                '_REG_ID' => $item->ID(),
            ],
            REG_ADMIN_URL
        );
        $attendee_name = $attendee instanceof EE_Attendee
            ? $attendee->full_name()
            : '';
        $link          = EE_Registry::instance()->CAP->current_user_can(
            'ee_read_registration',
            'espresso_registrations_view_registration',
            $item->ID()
        )
            ? '<a href="'
              . $edit_lnk_url
              . '" aria-label="'
              . esc_attr__('View Registration Details', 'event_espresso')
              . '">'
              . $attendee_name
              . '</a>'
            : $attendee_name;
        $link          .= $item->count() === 1
            ? '&nbsp;<sup><div class="dashicons dashicons-star-filled lt-blue-icon ee-icon-size-8"></div></sup>'
            : '';
        $t             = $item->get_first_related('Transaction');
        $payment_count = $t instanceof EE_Transaction
            ? $t->count_related('Payment')
            : 0;
        // append group count to name
        $link .= '&nbsp;' . sprintf(esc_html__('(%1$s / %2$s)', 'event_espresso'), $item->count(), $item->group_size());
        // append reg_code
        $link .= '<br>' . sprintf(esc_html__('Reg Code: %s', 'event_espresso'), $item->get('REG_code'));
        // reg status text for accessibility
        $link   .= '<br><span class="ee-status-text-small">'
                   . EEH_Template::pretty_status($item->status_ID(), false, 'sentence')
                   . '</span>';
        $action = ['_REG_ID' => $item->ID()];
        if (isset($this->_req_data['event_id'])) {
            $action['event_id'] = $item->event_ID();
        }
        // trash/restore/delete actions
        $actions = [];
        if (
            $this->_view !== 'trash'
            && $payment_count === 0
            && EE_Registry::instance()->CAP->current_user_can(
                'ee_delete_registration',
                'espresso_registrations_trash_registrations',
                $item->ID()
            )
        ) {
            $action['action'] = 'trash_registrations';
            $trash_lnk_url    = EE_Admin_Page::add_query_args_and_nonce(
                $action,
                REG_ADMIN_URL
            );
            $actions['trash'] = '<a href="'
                                . $trash_lnk_url
                                . '" aria-label="'
                                . esc_attr__('Trash Registration', 'event_espresso')
                                . '">' . esc_html__('Trash', 'event_espresso') . '</a>';
        } elseif ($this->_view === 'trash') {
            // restore registration link
            if (
                EE_Registry::instance()->CAP->current_user_can(
                    'ee_delete_registration',
                    'espresso_registrations_restore_registrations',
                    $item->ID()
                )
            ) {
                $action['action']   = 'restore_registrations';
                $restore_lnk_url    = EE_Admin_Page::add_query_args_and_nonce(
                    $action,
                    REG_ADMIN_URL
                );
                $actions['restore'] = '
                    <a href="' . $restore_lnk_url . '" 
                       aria-label="' . esc_attr__('Restore Registration', 'event_espresso') . '"
                   >
                       ' . esc_html__('Restore', 'event_espresso') . '
                   </a>';
            }
            if (
                EE_Registry::instance()->CAP->current_user_can(
                    'ee_delete_registration',
                    'espresso_registrations_ee_delete_registrations',
                    $item->ID()
                )
            ) {
                $action['action']  = 'delete_registrations';
                $delete_lnk_url    = EE_Admin_Page::add_query_args_and_nonce(
                    $action,
                    REG_ADMIN_URL
                );
                $actions['delete'] = '
                    <a href="' . $delete_lnk_url . '" 
                       aria-label="' . esc_attr__('Delete Registration Permanently', 'event_espresso') . '"
                    >
                        ' . esc_html__('Delete', 'event_espresso') . '
                    </a>';
            }
        }
        return sprintf('%1$s %2$s', $link, $this->row_actions($actions));
    }


    /**
     * @param EE_Registration $item
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function column_ATT_email(EE_Registration $item)
    {
        $attendee = $item->get_first_related('Attendee');
        return ! $attendee instanceof EE_Attendee
            ? esc_html__('No attached contact record.', 'event_espresso')
            : $attendee->email();
    }


    /**
     * @param EE_Registration $item
     * @return string
     */
    public function column__REG_count(EE_Registration $item)
    {
        return sprintf(esc_html__('%1$s / %2$s', 'event_espresso'), $item->count(), $item->group_size());
    }


    /**
     * @param EE_Registration $item
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_PRC_amount(EE_Registration $item)
    {
        $ticket   = $item->ticket();
        $req_data = $this->_admin_page->get_request_data();
        $content  = isset($req_data['event_id']) && $ticket instanceof EE_Ticket
            ? '<span class="TKT_name">' . $ticket->name() . '</span><br />'
            : '';
        if ($item->final_price() > 0) {
            $content .= '<span class="reg-pad-rght">' . $item->pretty_final_price() . '</span>';
        } else {
            // free event
            $content .= '<span class="reg-overview-free-event-spn reg-pad-rght">'
                        . esc_html__('free', 'event_espresso')
                        . '</span>';
        }
        return $content;
    }


    /**
     * @param EE_Registration $item
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column__REG_final_price(EE_Registration $item)
    {
        $ticket   = $item->ticket();
        $req_data = $this->_admin_page->get_request_data();
        $content  = isset($req_data['event_id']) || ! $ticket instanceof EE_Ticket
            ? ''
            : '<span class="TKT_name">' . $ticket->name() . '</span><br />';
        $content  .= '<span class="reg-pad-rght">' . $item->pretty_final_price() . '</span>';
        return $content;
    }


    /**
     * @param EE_Registration $item
     * @return string
     * @throws EE_Error
     */
    public function column__REG_paid(EE_Registration $item)
    {
        $payment_method      = $item->payment_method();
        $payment_method_name = $payment_method instanceof EE_Payment_Method
            ? $payment_method->admin_name()
            : esc_html__('Unknown', 'event_espresso');
        $content             = '<span class="reg-pad-rght">' . $item->pretty_paid() . '</span>';
        if ($item->paid() > 0) {
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
     * @param EE_Registration $item
     * @return string
     * @throws EE_Error
     * @throws EntityNotFoundException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function column_TXN_total(EE_Registration $item)
    {
        if ($item->transaction()) {
            $view_txn_lnk_url = EE_Admin_Page::add_query_args_and_nonce(
                [
                    'action' => 'view_transaction',
                    'TXN_ID' => $item->transaction_ID(),
                ],
                TXN_ADMIN_URL
            );
            return EE_Registry::instance()->CAP->current_user_can(
                'ee_read_transaction',
                'espresso_transactions_view_transaction',
                $item->transaction_ID()
            )
                ? '<span class="reg-pad-rght">
                    <a class="status-' . $item->transaction()->status_ID() . '" 
                       href="' . $view_txn_lnk_url . '"  
                       aria-label="' . esc_attr__('View Transaction', 'event_espresso') . '"
                    >
                        ' . $item->transaction()->pretty_total() . '
                    </a>
                  </span>'
                : '<span class="reg-pad-rght">' . $item->transaction()->pretty_total() . '</span>';
        } else {
            return esc_html__("None", "event_espresso");
        }
    }


    /**
     * @param EE_Registration $item
     * @return string
     * @throws EE_Error
     * @throws EntityNotFoundException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function column_TXN_paid(EE_Registration $item)
    {
        if ($item->count() === 1) {
            $transaction = $item->transaction()
                ? $item->transaction()
                : EE_Transaction::new_instance();
            if ($transaction->paid() >= $transaction->total()) {
                return '<span class="reg-pad-rght"><div class="dashicons dashicons-yes green-icon"></div></span>';
            } else {
                $view_txn_lnk_url = EE_Admin_Page::add_query_args_and_nonce(
                    [
                        'action' => 'view_transaction',
                        'TXN_ID' => $item->transaction_ID(),
                    ],
                    TXN_ADMIN_URL
                );
                return EE_Registry::instance()->CAP->current_user_can(
                    'ee_read_transaction',
                    'espresso_transactions_view_transaction',
                    $item->transaction_ID()
                )
                    ? '<span class="reg-pad-rght">
                        <a class="status-' . $transaction->status_ID() . '" 
                           href="' . $view_txn_lnk_url . '"  
                           aria-label="' . esc_attr__('View Transaction', 'event_espresso') . '"
                        >
                            ' . $item->transaction()->pretty_paid() . '
                        </a>
                       <span>'
                    : '<span class="reg-pad-rght">' . $item->transaction()->pretty_paid() . '</span>';
            }
        }
        return '&nbsp;';
    }


    /**
     * column_actions
     *
     * @param EE_Registration $item
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function column_actions(EE_Registration $item)
    {
        $actions  = [];
        $attendee = $item->attendee();
        $this->_set_related_details($item);

        // Build row actions
        if (
            EE_Registry::instance()->CAP->current_user_can(
                'ee_read_registration',
                'espresso_registrations_view_registration',
                $item->ID()
            )
        ) {
            $view_lnk_url = EE_Admin_Page::add_query_args_and_nonce(
                [
                    'action'  => 'view_registration',
                    '_REG_ID' => $item->ID(),
                ],
                REG_ADMIN_URL
            );
            $actions['view_lnk'] = '
            <li>
                <a href="' . $view_lnk_url . '" 
                   aria-label="' . esc_attr__('View Registration Details', 'event_espresso') . '" 
                   class="tiny-text"
               >
				    <div class="dashicons dashicons-clipboard"></div>
			    </a>
			</li>';
        }

        if (
            $attendee instanceof EE_Attendee
            && EE_Registry::instance()->CAP->current_user_can(
                'ee_edit_contacts',
                'espresso_registrations_edit_attendee'
            )
        ) {
            $edit_lnk_url = EE_Admin_Page::add_query_args_and_nonce(
                [
                    'action' => 'edit_attendee',
                    'post'   => $item->attendee_ID(),
                ],
                REG_ADMIN_URL
            );
            $actions['edit_lnk'] = '
			<li>
			    <a href="' . $edit_lnk_url . '" 
                   aria-label="' . esc_attr__('Edit Contact Details', 'event_espresso') . '" 
                   class="tiny-text"
                >
                    <div class="ee-icon ee-icon-user-edit ee-icon-size-16"></div>
                </a>
			</li>';
        }

        if (
            $attendee instanceof EE_Attendee
            && EE_Registry::instance()->CAP->current_user_can(
                'ee_send_message',
                'espresso_registrations_resend_registration',
                $item->ID()
            )
        ) {
            $resend_reg_lnk_url = EE_Admin_Page::add_query_args_and_nonce(
                [
                    'action'  => 'resend_registration',
                    '_REG_ID' => $item->ID(),
                ],
                REG_ADMIN_URL,
                true
            );
            $actions['resend_reg_lnk'] = '
			<li>
			    <a href="' . $resend_reg_lnk_url . '" 
			       aria-label="' . esc_attr__('Resend Registration Details', 'event_espresso') . '" 
			       class="tiny-text"
                >
			        <div class="dashicons dashicons-email-alt"></div>
			    </a>
            </li>';
        }

        if (
            EE_Registry::instance()->CAP->current_user_can(
                'ee_read_transaction',
                'espresso_transactions_view_transaction',
                $this->_transaction_details['id']
            )
        ) {
            $view_txn_lnk_url        = EE_Admin_Page::add_query_args_and_nonce(
                [
                    'action' => 'view_transaction',
                    'TXN_ID' => $this->_transaction_details['id'],
                ],
                TXN_ADMIN_URL
            );
            $actions['view_txn_lnk'] = '
			<li>
                <a class="ee-status-color-' . $this->_transaction_details['status'] . ' tiny-text" 
                   href="' . $view_txn_lnk_url . '"  
                   aria-label="' . $this->_transaction_details['title_attr'] . '"
                >
                    <div class="dashicons dashicons-cart"></div>
                </a>
			</li>';
        }

        // only show invoice link if message type is active.
        if (
            $attendee instanceof EE_Attendee
            && $item->is_primary_registrant()
            && EEH_MSG_Template::is_mt_active('invoice')
        ) {
            $actions['dl_invoice_lnk'] = '
            <li>
                <a aria-label="' . esc_attr__('View Transaction Invoice', 'event_espresso') . '" 
                   class="tiny-text"
                   href="' . $item->invoice_url() . '" 
                   target="_blank" 
                >
                    <span class="dashicons dashicons-media-spreadsheet ee-icon-size-18"></span>
                </a>
            </li>';
        }

        // message list table link (filtered by REG_ID
        if (
            EE_Registry::instance()->CAP->current_user_can('ee_read_global_messages', 'view_filtered_messages')
        ) {
            $actions['filtered_messages_link'] = '
            <li>
                ' . EEH_MSG_Template::get_message_action_link(
                'see_notifications_for',
                null,
                ['_REG_ID' => $item->ID()]
            ) . '
            </li>';
        }

        $actions = apply_filters('FHEE__EE_Registrations_List_Table__column_actions__actions', $actions, $item, $this);
        return $this->_action_string(implode('', $actions), $item, 'ul', 'reg-overview-actions-ul');
    }
}
