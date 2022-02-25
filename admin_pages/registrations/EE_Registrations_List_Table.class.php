<?php

use EventEspresso\core\domain\services\capabilities\user_caps\RegistrationsListTableUserCapabilities;
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
     * @var RegistrationsListTableUserCapabilities
     */
    protected $caps_handler;

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
        $this->caps_handler = new RegistrationsListTableUserCapabilities(EE_Registry::instance()->CAP);
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
        $req_data            = $this->_admin_page->get_request_data();
        if (isset($req_data['event_id'])) {
            $this->_columns        = [
                'cb'               => '<input type="checkbox" />', // Render a checkbox instead of text
                'id'               => esc_html__('ID', 'event_espresso'),
                'ATT_fname'        => esc_html__('Name', 'event_espresso'),
                'ATT_email'        => esc_html__('Email', 'event_espresso'),
                '_REG_date'        => esc_html__('Reg Date', 'event_espresso'),
                'PRC_amount'       => esc_html__('TKT Price', 'event_espresso'),
                '_REG_final_price' => esc_html__('Final Price', 'event_espresso'),
                'TXN_total'        => esc_html__('Total Txn', 'event_espresso'),
                'TXN_paid'         => esc_html__('Paid', 'event_espresso'),
                'actions'          => $this->actionsColumnHeader(),
            ];
            $this->_bottom_buttons = [
                'report' => [
                    'route'         => 'registrations_report',
                    'extra_request' => [
                        'EVT_ID'     => $this->_req_data['event_id'] ?? null,
                        'return_url' => $return_url,
                    ],
                ],
            ];
        } else {
            $this->_columns        = [
                'cb'               => '<input type="checkbox" />', // Render a checkbox instead of text
                'id'               => esc_html__('ID', 'event_espresso'),
                'ATT_fname'        => esc_html__('Name', 'event_espresso'),
                '_REG_date'        => esc_html__('TXN Date', 'event_espresso'),
                'event_name'       => esc_html__('Event', 'event_espresso'),
                'DTT_EVT_start'    => esc_html__('Event Date', 'event_espresso'),
                '_REG_final_price' => esc_html__('Price', 'event_espresso'),
                '_REG_paid'        => esc_html__('Paid', 'event_espresso'),
                'actions'          => $this->actionsColumnHeader(),
            ];
            $this->_bottom_buttons = [
                'report_all' => [
                    'route'         => 'registrations_report',
                    'extra_request' => [
                        'return_url' => $return_url,
                    ],
                ],
            ];
        }
        $this->_bottom_buttons['report_filtered'] = [
            'route'         => 'registrations_report',
            'extra_request' => [
                'use_filters' => true,
                'return_url'  => $return_url,
            ],
        ];
        $filters                                  = array_diff_key(
            $this->_req_data,
            array_flip(
                [
                    'page',
                    'action',
                    'default_nonce',
                ]
            )
        );
        if (! empty($filters)) {
            $this->_bottom_buttons['report_filtered']['extra_request']['filters'] = $filters;
        }
        $this->_primary_column   = 'id';
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
            'id'            => ['REG_ID' => false],
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
    protected function _get_row_class($item): string
    {
        $class = parent::_get_row_class($item);
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
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _get_table_filters(): array
    {
        $filters = [];
        // todo we're currently using old functions here. We need to move things into the Events_Admin_Page() class as
        // methods.
        $cur_date     = $this->_req_data['month_range'] ?? '';
        $cur_category = $this->_req_data['EVT_CAT'] ?? -1;
        $reg_status   = $this->_req_data['_reg_status'] ?? '';
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
     * @throws ReflectionException
     */
    protected function _add_view_counts()
    {
        $this->_views['all']['count']   = $this->_total_registrations();
        $this->_views['month']['count'] = $this->_total_registrations_this_month();
        $this->_views['today']['count'] = $this->_total_registrations_today();
        if ($this->caps_handler->userCanTrashRegistrations()) {
            $this->_views['incomplete']['count'] = $this->_total_registrations('incomplete');
            $this->_views['trash']['count']      = $this->_total_registrations('trash');
        }
    }


    /**
     * @param string $view
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _total_registrations(string $view = ''): int
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
     * @throws ReflectionException
     */
    protected function _total_registrations_this_month(): int
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
     * @throws ReflectionException
     */
    protected function _total_registrations_today(): int
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
    public function column_cb($item): string
    {
        /** checkbox/lock **/
        $REG_ID        = $item->ID();
        $transaction   = $item->get_first_related('Transaction');
        $payment_count = $transaction instanceof EE_Transaction
            ? $transaction->count_related('Payment')
            : 0;

        $content = $payment_count > 0 || ! $this->caps_handler->userCanEditRegistration($item)
            ? '<span class="ee-locked-entity dashicons dashicons-lock ee-aria-tooltip ee-aria-tooltip--big-box" 
                    aria-label="' . $this->lockedRegMessage() . '"></span>'
            : '<input type="checkbox" name="_REG_ID[]" value="' . $REG_ID . '" />';
        return $this->columnContent('cb', $content, 'center');
    }


    private function lockedRegMessage(): string
    {
        return esc_html__(
           'This lock-icon means that this registration cannot be trashed.  Registrations that belong to a transaction that has payments cannot be trashed.  If you wish to trash this registration then you must delete all payments attached to the related transaction first.',
           'event_espresso'
       );
    }


    /**
     * @param EE_Registration $registration
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function column_id(EE_Registration $registration): string
    {
        $content = '<span class="ee-entity-id">' . $registration->ID() . '</span>';
        $content .= '<span class="show-on-mobile-view-only">';
        $content .= $this->column_ATT_fname($registration, false);
        $content .= '</span>';

        return $this->columnContent('id', $content, 'end');
    }


    /**
     * @param EE_Registration $registration
     * @param bool            $prep_content
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_ATT_fname(EE_Registration $registration, bool $prep_content = true): string
    {

        $status         = esc_attr($registration->status_ID());
        $pretty_status  = EEH_Template::pretty_status($status, false, 'sentence');
        $prime_reg_star = $registration->count() === 1
            ? '<sup><span class="dashicons dashicons-star-filled gold-icon"></span></sup>'
            : '';

        $group_count = '
            <span class="reg-count-group-size" >
                ' . sprintf(
            esc_html__('(%1$s / %2$s)', 'event_espresso'),
            $registration->count(),
            $registration->group_size()
        ) . '
            </span >';

        $content = '
        <div class="ee-layout-row">
            <span aria-label="' . $pretty_status . '" 
                  class="ee-status-dot ee-status-bg--' . $status . ' ee-aria-tooltip"
            ></span>
            ' . $this->viewRegistrationLink($registration, $status)
                   . $prime_reg_star
                   . $group_count . '
            <span class="spacer"></span>
            <span>
                ' . sprintf(
                    esc_html__('Reg Code: %s', 'event_espresso'),
                    $registration->get('REG_code')
                ) . '
            </span>
        </div>';

        $url_params = ['_REG_ID' => $registration->ID()];
        if (isset($this->_req_data['event_id'])) {
            $url_params['event_id'] = $registration->event_ID();
        }
        // trash/restore/delete actions
        $actions = $this->trashRegistrationLink($registration, $url_params);
        $actions = $this->restoreRegistrationLink($registration, $url_params, $actions);
        $actions = $this->deleteRegistrationLink($registration, $url_params, $actions);

        $content = sprintf('%1$s %2$s', $content, $this->row_actions($actions));

        return $prep_content ? $this->columnContent('ATT_fname', $content) : $content;
    }


    /**
     * @param EE_Registration $registration
     * @param bool            $prep_content
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column__REG_date(EE_Registration $registration, bool $prep_content = true): string
    {
        $this->_set_related_details($registration);
        // Build row actions
        $content = $this->caps_handler->userCanViewTransaction()
            ? '<a class="ee-aria-tooltip ee-status-color--' . $this->_transaction_details['status'] . '" href="'
              . $this->viewTransactionUrl()
              . '" aria-label="'
              . esc_attr($this->_transaction_details['title_attr'])
              . '">'
              . $registration->get_i18n_datetime('REG_date', 'M jS Y g:i a')
              . '</a>'
            : $registration->get_i18n_datetime('REG_date');

        return $prep_content ? $this->columnContent('_REG_date', $content) : $content;
    }


    /**
     * @param EE_Registration $registration
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function column_event_name(EE_Registration $registration): string
    {
        $this->_set_related_details($registration);
        // page=espresso_events&action=edit_event&EVT_ID=2&edit_event_nonce=cf3a7e5b62
        $EVT_ID     = $registration->event_ID();
        $event_name = $registration->event_name();
        $event_name = $event_name ?: esc_html__("No Associated Event", 'event_espresso');
        $event_name = wp_trim_words($event_name, 30, '...');
        $edit_event = $this->editEventLink($EVT_ID, $event_name);
        $actions['event_filter'] = $this->eventFilterLink($EVT_ID, $event_name);
        $content = sprintf('%1$s %2$s', $edit_event, $this->row_actions($actions));

        return $this->columnContent('event_name', $content);
    }


    /**
     * @param EE_Registration $registration
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function column_DTT_EVT_start(EE_Registration $registration): string
    {
        $datetime_strings = [];
        $ticket           = $registration->ticket();
        if ($ticket instanceof EE_Ticket) {
            $remove_defaults = ['default_where_conditions' => 'none'];
            $datetimes       = $ticket->datetimes($remove_defaults);
            foreach ($datetimes as $datetime) {
                $datetime_strings[] = $datetime->get_i18n_datetime('DTT_EVT_start', 'M jS Y g:i a');
            }
            $content = $this->generateDisplayForDatetimes($datetime_strings);
        } else {
            $content = esc_html__('There is no ticket on this registration', 'event_espresso');
        }
        return $this->columnContent('DTT_EVT_start', $content);
    }


    /**
     * Receives an array of datetime strings to display and converts them to the html container for the column.
     *
     * @param array $datetime_strings
     * @return string
     */
    public function generateDisplayForDatetimes(array $datetime_strings): string
    {
        // $content       = '<div class="ee-registration-event-datetimes-container">';
        // get first item for initial visibility
        $content = array_shift($datetime_strings);
        if (! empty($datetime_strings)) {
            $content .= '
                <div class="ee-registration-event-datetimes-container-wrap">
                    <button aria-label="' . esc_attr__('Click to view all dates', 'event_espresso') . '" 
                          class="ee-aria-tooltip button button--secondary button--tiny button--icon-only ee-js ee-more-datetimes-toggle"
                    >
                        <span class="dashicons dashicons-admin-collapse"></span>
                    </button>
                    <div class="ee-registration-event-datetimes-container more-items hidden">
                        ' . implode("", $datetime_strings) . '
                    </div>
                </div>';
        }
        // $content .= '</div>';
        return $content;
    }


    /**
     * @param EE_Registration $registration
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function column_ATT_email(EE_Registration $registration): string
    {
        $attendee = $registration->get_first_related('Attendee');
        $content  = ! $attendee instanceof EE_Attendee
            ? esc_html__('No attached contact record.', 'event_espresso')
            : $attendee->email();
        return $this->columnContent('ATT_email', $content);
    }


    /**
     * @param EE_Registration $registration
     * @return string
     */
    public function column__REG_count(EE_Registration $registration): string
    {
        $content =
            sprintf(esc_html__('%1$s / %2$s', 'event_espresso'), $registration->count(), $registration->group_size());
        return $this->columnContent('_REG_count', $content);
    }


    /**
     * @param EE_Registration $registration
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_PRC_amount(EE_Registration $registration): string
    {
        $ticket   = $registration->ticket();
        $req_data = $this->_admin_page->get_request_data();

        $content = isset($req_data['event_id']) && $ticket instanceof EE_Ticket
            ? '<div class="TKT_name">' . $ticket->name() . '</div>'
            : '';

        $payment_status = $registration->owes_monies_and_can_pay() ? 'TFL' : 'TCM';
        $content        .= $registration->final_price() > 0
            ? '<span class="reg-overview-paid-event-spn ee-status-color--' . $payment_status . '">
                ' . $registration->pretty_final_price() . '
               </span>'
            // free event
            : '<span class="reg-overview-free-event-spn">' . esc_html__('free', 'event_espresso') . '</span>';

        return $this->columnContent('PRC_amount', $content, 'end');
    }


    /**
     * @param EE_Registration $registration
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column__REG_final_price(EE_Registration $registration): string
    {
        $ticket   = $registration->ticket();
        $req_data = $this->_admin_page->get_request_data();
        $content  = isset($req_data['event_id']) || ! $ticket instanceof EE_Ticket
            ? ''
            : '<span class="TKT_name ee-status-color--'
              . $ticket->ticket_status()
              . '">'
              . $ticket->name()
              . '</span> ';

        $content .= '
            <span class="reg-overview-paid-event-spn">
                ' . $registration->pretty_final_price() . '
            </span>';
        return $this->columnContent('_REG_final_price', $content, 'end');
    }


    /**
     * @param EE_Registration $registration
     * @return string
     * @throws EE_Error
     */
    public function column__REG_paid(EE_Registration $registration): string
    {
        $payment_method      = $registration->payment_method();
        $payment_method_name = $payment_method instanceof EE_Payment_Method
            ? $payment_method->admin_name()
            : esc_html__('Unknown', 'event_espresso');

        $payment_status = $registration->owes_monies_and_can_pay() ? 'TFL' : 'TCM';
        $content        = '
            <span class="reg-overview-paid-event-spn ee-status-color--' . $payment_status . '">
                ' . $registration->pretty_paid() . '
            </span>';
        if ($registration->paid() > 0) {
            $content .= '<span class="ee-status-text-small">'
                        . sprintf(
                            esc_html__('...via %s', 'event_espresso'),
                            $payment_method_name
                        )
                        . '</span>';
        }
        return $this->columnContent('_REG_paid', $content, 'end');
    }


    /**
     * @param EE_Registration $registration
     * @return string
     * @throws EE_Error
     * @throws EntityNotFoundException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function column_TXN_total(EE_Registration $registration): string
    {
        if ($registration->transaction()) {
            $content = $this->caps_handler->userCanViewTransaction()
                ? '
                    <a class="ee-aria-tooltip ee-status-color--' . $registration->transaction()->status_ID() . '" 
                        href="' . $this->viewTransactionUrl() . '" 
                        aria-label="' . esc_attr__('View Transaction', 'event_espresso') . '"
                    >
                        ' . $registration->transaction()->pretty_total() . '
                    </a>'
                : $registration->transaction()->pretty_total();
        } else {
            $content = esc_html__("None", "event_espresso");
        }
        return $this->columnContent('TXN_total', $content, 'end');
    }


    /**
     * @param EE_Registration $registration
     * @return string
     * @throws EE_Error
     * @throws EntityNotFoundException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function column_TXN_paid(EE_Registration $registration): string
    {
        $content = '&nbsp;';
        $align   = 'end';
        if ($registration->count() === 1) {
            $transaction = $registration->transaction()
                ? $registration->transaction()
                : EE_Transaction::new_instance();
            if ($transaction->paid() >= $transaction->total()) {
                $align   = 'center';
                $content = '<span class="dashicons dashicons-yes green-icon"></span>';
            } else {
                $content = $this->caps_handler->userCanViewTransaction()
                    ? '
                    <a class="ee-aria-tooltip ee-status-color--' . $transaction->status_ID() . '" 
                        href="' . $this->viewTransactionUrl() . '"  
                        aria-label="' . esc_attr__('View Transaction', 'event_espresso') . '"
                    >
                        ' . $registration->transaction()->pretty_paid() . '
                    </a>'
                    : $registration->transaction()->pretty_paid();
            }
        }
        return $this->columnContent('TXN_paid', $content, $align);
    }


    /**
     * @param EE_Registration $registration
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function column_actions(EE_Registration $registration): string
    {
        $attendee = $registration->attendee();
        $this->_set_related_details($registration);

        // Build and filter row actions
        $actions = apply_filters(
            'FHEE__EE_Registrations_List_Table__column_actions__actions',
            [
                'view_lnk'               => $this->viewRegistrationAction($registration),
                'edit_lnk'               => $this->editContactAction($registration, $attendee),
                'resend_reg_lnk'         => $this->resendRegistrationMessageAction($registration, $attendee),
                'view_txn_lnk'           => $this->viewTransactionAction(),
                'dl_invoice_lnk'         => $this->viewTransactionInvoiceAction($registration, $attendee),
                'filtered_messages_link' => $this->viewNotificationsAction($registration),
            ],
            $registration,
            $this
        );

        $content = $this->_action_string(
            implode('', $actions),
            $registration,
            'div',
            'reg-overview-actions ee-list-table-actions'
        );

        return $this->columnContent('actions', $this->actionsModalMenu($content));
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function viewRegistrationUrl(EE_Registration $registration): string
    {
        return EE_Admin_Page::add_query_args_and_nonce(
            [
                'action'  => 'view_registration',
                '_REG_ID' => $registration->ID(),
            ],
            REG_ADMIN_URL
        );
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function viewRegistrationLink(
        EE_Registration $registration,
        string $status
    ): string {
        $attendee      = $registration->attendee();
        $attendee_name = $attendee instanceof EE_Attendee
            ? $attendee->full_name()
            : '';
        return $this->caps_handler->userCanReadRegistration($registration)
            ? '
            <a  href="' . $this->viewRegistrationUrl($registration) . '"  
                class="row-title ee-status-color--' . $status . ' ee-aria-tooltip" 
                aria-label="' . esc_attr__('View Registration Details', 'event_espresso') . '"
            >
                ' . $attendee_name . '
            </a>'
            : $attendee_name;
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function viewRegistrationAction(EE_Registration $registration): string
    {
        return $this->caps_handler->userCanReadRegistration($registration)
            ? '
            <a  href="' . $this->viewRegistrationUrl($registration) . '"  
                class="ee-aria-tooltip button button--icon-only"
                aria-label="' . esc_attr__('View Registration Details', 'event_espresso') . '"
            >
                <span class="dashicons dashicons-clipboard"></span>
            </a>'
            : '';
    }


    private function editContactAction(EE_Registration $registration, ?EE_Attendee $attendee = null): string
    {

        if ($attendee instanceof EE_Attendee && $this->caps_handler->userCanEditContacts()) {
            $edit_link_url = EE_Admin_Page::add_query_args_and_nonce(
                [
                    'action' => 'edit_attendee',
                    'post'   => $registration->attendee_ID(),
                ],
                REG_ADMIN_URL
            );
            return '
                <a href="' . $edit_link_url . '" 
                   aria-label="' . esc_attr__('Edit Contact Details', 'event_espresso') . '" 
                   class="ee-aria-tooltip button button--secondary button--icon-only"
                >
                    <span class="dashicons dashicons-admin-users"></span>
                </a>';
        }
        return '';
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function resendRegistrationMessageAction(
        EE_Registration $registration,
        ?EE_Attendee $attendee = null
    ): string {
        if ($attendee instanceof EE_Attendee && $this->caps_handler->userCanResendMessage($registration)) {
            $resend_reg_link_url = EE_Admin_Page::add_query_args_and_nonce(
                [
                    'action'  => 'resend_registration',
                    '_REG_ID' => $registration->ID(),
                ],
                REG_ADMIN_URL,
                true
            );
            return '
			    <a href="' . $resend_reg_link_url . '" aria-label="'
                                         . esc_attr__('Resend Registration Details', 'event_espresso')
                                         . '" class="ee-aria-tooltip button button--icon-only">
			        <span class="dashicons dashicons-email-alt"></span>
			    </a>';
        }
        return '';
    }


    private function viewTransactionUrl(): string
    {
        return EE_Admin_Page::add_query_args_and_nonce(
            [
                    'action' => 'view_transaction',
                    'TXN_ID' => $this->_transaction_details['id'],
                ],
            TXN_ADMIN_URL
        );
    }


    private function viewTransactionAction(): string
    {
        if ($this->caps_handler->userCanViewTransaction()) {
            return '
                <a class="ee-aria-tooltip button button--icon-only" 
                   href="' . $this->viewTransactionUrl() . '"  
                   aria-label="' . $this->_transaction_details['title_attr'] . '"
                >
                    <span class="dashicons dashicons-cart"></span>
                </a>';
        }
        return '';
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function viewTransactionInvoiceAction(
        EE_Registration $registration,
        ?EE_Attendee $attendee = null
    ): string {
        // only show invoice link if message type is active.
        if (
            $attendee instanceof EE_Attendee
            && $registration->is_primary_registrant()
            && EEH_MSG_Template::is_mt_active('invoice')
        ) {
            return '
                <a aria-label="' . esc_attr__('View Transaction Invoice', 'event_espresso')
                                         . '" target="_blank" href="' . $registration->invoice_url() . '" class="ee-aria-tooltip button button--icon-only">
                    <span class="dashicons dashicons-media-spreadsheet"></span>
                </a>';
        }
        return '';
    }


    /**
     * @throws ReflectionException
     * @throws EE_Error
     */
    private function viewNotificationsAction(EE_Registration $registration): string
    {
        // message list table link (filtered by REG_ID
        return $this->caps_handler->userCanReadGlobalMessages()
            ? EEH_MSG_Template::get_message_action_link(
                'see_notifications_for',
                null,
                ['_REG_ID' => $registration->ID()]
            )
            : '';
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function trashRegistrationLink(
        EE_Registration $registration,
        array $url_params
    ): array {
        $actions = [];
        // can't trash what's already trashed
        if ($this->_view === 'trash') {
            return $actions;
        }

        // check caps
        if (! $this->caps_handler->userCanTrashRegistration($registration)) {
            return $actions;
        }

        // don't delete registrations that have payments applied
        $transaction   = $registration->get_first_related('Transaction');
        $payment_count = $transaction instanceof EE_Transaction
            ? $transaction->count_related('Payment')
            : 0;

        if ($payment_count > 0) {
            return $actions;
        }

        $url_params['action'] = 'trash_registrations';
        $trash_link_url       = EE_Admin_Page::add_query_args_and_nonce($url_params, REG_ADMIN_URL);
        $actions['trash']     = '
            <a class="ee-aria-tooltip" 
                href="' . $trash_link_url . '" 
                aria-label="' . esc_attr__('Trash Registration', 'event_espresso') . '"
            >
                ' . esc_html__('Trash', 'event_espresso') . '
            </a>';
        return $actions;
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function restoreRegistrationLink(
        EE_Registration $registration,
        array $url_params,
        array $actions
    ): array {
        // can't restore what's not trashed
        if ($this->_view !== 'trash') {
            return $actions;
        }

        // restore registration link
        if ($this->caps_handler->userCanRestoreRegistration($registration)) {
            $url_params['action'] = 'restore_registrations';
            $restore_link_url     = EE_Admin_Page::add_query_args_and_nonce($url_params, REG_ADMIN_URL);
            $actions['restore']   = '
                <a class="ee-aria-tooltip" 
                    href="' . $restore_link_url . '" 
                    aria-label="' . esc_attr__('Restore Registration', 'event_espresso') . '"
                >
                    ' . esc_html__('Restore', 'event_espresso') . '
                </a>';
        }

        return $actions;
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function deleteRegistrationLink(
        EE_Registration $registration,
        array $url_params,
        array $actions
    ): array {
        if ($this->_view === 'trash' && $this->caps_handler->userCanDeleteRegistration($registration)) {
            $url_params['action'] = 'delete_registrations';
            $delete_link_url      = EE_Admin_Page::add_query_args_and_nonce($url_params, REG_ADMIN_URL);
            $actions['delete']    = '
                <a class="ee-aria-tooltip" 
                    href="' . $delete_link_url . '" 
                    aria-label="' . esc_attr__('Delete Registration Permanently', 'event_espresso') . '"
                >
                    ' . esc_html__('Delete', 'event_espresso') . '
                </a>';
        }
        return $actions;
    }


    private function editEventLink(int $EVT_ID, string $event_name): string
    {
        if (! $EVT_ID || ! $this->caps_handler->userCanEditEvent($EVT_ID)) {
            return $event_name;
        }
        $edit_event_url = EE_Admin_Page::add_query_args_and_nonce(
            ['action' => 'edit', 'post' => $EVT_ID],
            EVENTS_ADMIN_URL
        );
        return '
            <a class="ee-aria-tooltip ee-status-color--' . $this->_event_details['status'] . '" 
                href="' . $edit_event_url . '" 
                aria-label="' . esc_attr($this->_event_details['title_attr']) . '"
            >
                ' . $event_name . '
            </a>';
    }


    private function eventFilterLink(int $EVT_ID, string $event_name): string
    {
        if (!$EVT_ID) {
            return '';
        }
        $event_filter_url = EE_Admin_Page::add_query_args_and_nonce(['event_id' => $EVT_ID], REG_ADMIN_URL);
        return '
            <a  class="ee-aria-tooltip ee-event-filter-link" 
                href="' . $event_filter_url . '" 
                aria-label="' . sprintf(
                    esc_attr__('Filter this list to only show registrations for %s', 'event_espresso'),
                    $event_name
                ) . '"
            >
                <span class="dashicons dashicons-groups dashicons--small"></span>'
                . esc_html__('View Registrations', 'event_espresso') . '
            </a>';
    }
}
