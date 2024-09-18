<?php

use EventEspresso\core\domain\services\admin\registrations\list_table\csv_reports\RegistrationsCsvReportParams;
use EventEspresso\core\domain\services\capabilities\user_caps\RegistrationsListTableUserCapabilities;
use EventEspresso\core\domain\services\registration\RegStatus;
use EventEspresso\core\exceptions\EntityNotFoundException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\request\DataType;
use EventEspresso\core\services\request\RequestInterface;

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
    protected EE_Admin_Page $_admin_page;

    protected RegistrationsListTableUserCapabilities $caps_handler;

    private array $_status;

    /**
     * An array of transaction details for the related transaction to the registration being processed.
     * This is set via the _set_related_details method.
     *
     * @var array
     */
    protected array $_transaction_details = [];

    /**
     * An array of event details for the related event to the registration being processed.
     * This is set via the _set_related_details method.
     *
     * @var array
     */
    protected array $_event_details = [];

    private array $filters = [];

    private int $EVT_ID = 0;

    private int $DTT_ID = 0;

    private int $TKT_ID = 0;


    /**
     * @param Registrations_Admin_Page $admin_page
     */
    public function __construct(Registrations_Admin_Page $admin_page)
    {
        $this->caps_handler = new RegistrationsListTableUserCapabilities(EE_Registry::instance()->CAP);
        $this->request      = $this->request ?? LoaderFactory::getShared(RequestInterface::class);
        $this->setupFilters();
        parent::__construct($admin_page);
        $this->_status = $this->_admin_page->get_registration_status_array();
    }


    private function setupFilters()
    {
        // for event filtering
        $this->EVT_ID = $this->request->getRequestParam('event_id', 0, DataType::INTEGER);
        $this->EVT_ID = $this->request->getRequestParam('EVT_ID', $this->EVT_ID, DataType::INTEGER);
        // for datetime filtering
        $this->DTT_ID = $this->request->getRequestParam('datetime_id', 0, DataType::INTEGER);
        $this->DTT_ID = $this->request->getRequestParam('DTT_ID', $this->DTT_ID, DataType::INTEGER);
        // for ticket filtering
        $this->TKT_ID = $this->request->getRequestParam('ticket_id', 0, DataType::INTEGER);
        $this->TKT_ID = $this->request->getRequestParam('TKT_ID', $this->TKT_ID, DataType::INTEGER);

        $filters = [
            'event_id'    => $this->EVT_ID,
            'datetime_id' => $this->DTT_ID,
            'ticket_id'   => $this->TKT_ID,
        ];
        foreach ($filters as $filter_key => $filter_value) {
            if ($filter_value) {
                $this->filters[ $filter_key ] = $filter_value;
            }
        }

        add_filter(
            'FHEE__EE_Admin_Page__get_list_table_view_RLs__extra_query_args',
            [$this, 'filterExtraQueryArgs'],
            10,
            2
        );
    }


    /**
     * @param array         $extra_query_args
     * @param EE_Admin_Page $admin_page
     * @return void
     * @since 5.0.13.p
     */
    public function filterExtraQueryArgs(array $extra_query_args, EE_Admin_Page $admin_page): array
    {
        if ($admin_page instanceof Registrations_Admin_Page) {
            foreach ($admin_page->get_views() as $view_details) {
                foreach ($this->filters as $filter_key => $filter_value) {
                    $extra_query_args[ $view_details['slug'] ][ $filter_key ] = $filter_value;
                }
            }
        }
        return $extra_query_args;
    }


    /**
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
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
        $this->_wp_list_args = [
            'singular' => esc_html__('registration', 'event_espresso'),
            'plural'   => esc_html__('registrations', 'event_espresso'),
            'ajax'     => true,
            'screen'   => $this->_admin_page->get_current_screen()->id,
        ];

        if ($this->EVT_ID) {
            $this->_columns = [
                'cb'               => '<input type="checkbox" />', // Render a checkbox instead of text
                'id'               => esc_html__('ID', 'event_espresso'),
                'ATT_fname'        => esc_html__('Name', 'event_espresso'),
                'ATT_email'        => esc_html__('Email', 'event_espresso'),
                '_REG_date'        => esc_html__('Reg Date', 'event_espresso'),
                'REG_ticket'       => esc_html__('Ticket', 'event_espresso'),
                '_REG_final_price' => esc_html__('Price', 'event_espresso'),
                '_REG_paid'        => esc_html__('REG Paid', 'event_espresso'),
                'TXN_total'        => esc_html__('TXN Paid/Total', 'event_espresso'),
                'actions'          => $this->actionsColumnHeader(),
            ];
        } elseif ($this->TKT_ID) {
            $this->_columns = [
                'cb'               => '<input type="checkbox" />', // Render a checkbox instead of text
                'id'               => esc_html__('ID', 'event_espresso'),
                'ATT_fname'        => esc_html__('Name', 'event_espresso'),
                'ATT_email'        => esc_html__('Email', 'event_espresso'),
                '_REG_date'        => esc_html__('Reg Date', 'event_espresso'),
                '_REG_final_price' => esc_html__('Price', 'event_espresso'),
                '_REG_paid'        => esc_html__('REG Paid', 'event_espresso'),
                'TXN_total'        => esc_html__('TXN Paid/Total', 'event_espresso'),
                'actions'          => $this->actionsColumnHeader(),
            ];
        } else {
            $this->_columns = [
                'cb'               => '<input type="checkbox" />', // Render a checkbox instead of text
                'id'               => esc_html__('ID', 'event_espresso'),
                'ATT_fname'        => esc_html__('Name', 'event_espresso'),
                '_REG_date'        => esc_html__('Reg Date', 'event_espresso'),
                'event_name'       => esc_html__('Event', 'event_espresso'),
                'DTT_EVT_start'    => esc_html__('Event Date', 'event_espresso'),
                'REG_ticket'       => esc_html__('Ticket', 'event_espresso'),
                '_REG_final_price' => esc_html__('Price', 'event_espresso'),
                '_REG_paid'        => esc_html__('REG Paid', 'event_espresso'),
                'TXN_total'        => esc_html__('TXN Paid/Total', 'event_espresso'),
                'actions'          => $this->actionsColumnHeader(),
            ];
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

        $csv_report = RegistrationsCsvReportParams::getRequestParams(
            $this->getReturnUrl(),
            $this->_admin_page->get_request_data(),
            $this->EVT_ID,
            $this->DTT_ID
        );
        if (! empty($csv_report)) {
            $this->_bottom_buttons['csv_reg_report'] = $csv_report;
        }
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
        $transaction                = $registration->transaction();
        $status                     = $transaction->status_ID();
        $this->_transaction_details = [
            'transaction' => $transaction,
            'status'      => $status,
            'id'          => $transaction->ID(),
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
    protected function _get_table_filters()
    {
        $filters = [];
        $cur_date     = $this->request->getRequestParam('month_range', '');
        $cur_category = $this->request->getRequestParam('EVT_CAT', -1, DataType::INTEGER);
        $reg_status   = $this->request->getRequestParam('_reg_status', '');

        $month_filter = EEH_Form_Fields::generate_registration_months_dropdown($cur_date, $reg_status, $cur_category);
        $filters[] = "
        <span class='ee-list-table-filter ee-reg-filter__month'>
            <label for='month_range' class='ee-reg-filter__label'>" . esc_html__('Month', 'event_espresso') . "</label>
            $month_filter
        </span>";

        $cat_filter = EEH_Form_Fields::generate_event_category_dropdown($cur_category);
        $filters[] = "
        <span class='ee-list-table-filter ee-reg-filter__category'>
            <label for='EVT_CAT' class='ee-reg-filter__label'>" . esc_html__('Category', 'event_espresso') . "</label>
            $cat_filter
        </span>";

        $status       = [];
        $status[]     = ['id' => 0, 'text' => esc_html__('Select Status', 'event_espresso')];
        foreach ($this->_status as $key => $value) {
            $status[] = ['id' => $key, 'text' => $value];
        }
        if ($this->_view !== 'incomplete') {
            $status_filter = EEH_Form_Fields::select_input(
                '_reg_status',
                $status,
                $reg_status ? strtoupper($reg_status) : ''
            );
            $filters[] = "
        <span class='ee-list-table-filter ee-reg-filter__status'>
            <label for='_reg_status' class='ee-reg-filter__label'>" . esc_html__('Status', 'event_espresso') . "</label>
            $status_filter
        </span>";
        }
        foreach ($this->filters as $filter_key => $filter_value) {
            // add hidden inputs for each filter with ids like "reg_event_id", "reg_datetime_id", & "reg_ticket_id"
            $filters[] = EEH_Form_Fields::hidden_input($filter_key, $filter_value, "reg_$filter_key");
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
        $this->_views['all']['count']       = $this->_total_registrations();
        $this->_views['today']['count']     = $this->_total_registrations_today();
        $this->_views['yesterday']['count'] = $this->totalRegistrationsYesterday();
        $this->_views['month']['count']     = $this->_total_registrations_this_month();
        if ($this->caps_handler->userCanTrashRegistrations()) {
            $this->_views['incomplete']['count'] = $this->_total_registrations('incomplete');
            $this->_views['trash']['count']      = $this->_total_registrations('trash');
        }
    }


    private function addWhereParamsForFilters(array $where = []): array
    {
        if ($this->EVT_ID) {
            $where['EVT_ID'] = $this->EVT_ID;
        }
        if ($this->DTT_ID) {
            $where['Ticket.Datetime.DTT_ID'] = $this->DTT_ID;
        }
        if ($this->TKT_ID) {
            $where['TKT_ID'] = $this->TKT_ID;
        }
        return $where;
    }


    /**
     * @param string $view
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _total_registrations(string $view = ''): int
    {
        $where = $this->addWhereParamsForFilters();
        switch ($view) {
            case 'trash':
                return EEM_Registration::instance()->count_deleted([$where]);
            case 'incomplete':
                $where['STS_ID'] = RegStatus::INCOMPLETE;
                break;
            default:
                $where['STS_ID'] = ['!=', RegStatus::INCOMPLETE];
        }
        return EEM_Registration::instance()->count([$where]);
    }


    /**
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _total_registrations_this_month(): int
    {
        $current_time   = current_time('timestamp');
        $year_and_month = date('Y-m', $current_time);
        $days_in_month  = date('t', $current_time);

        $start_date = "$year_and_month-01";
        $end_date   = "$year_and_month-$days_in_month";

        return $this->totalRegistrationsForDateRange($start_date, $end_date);
    }


    /**
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _total_registrations_today(): int
    {
        $today = date('Y-m-d', current_time('timestamp'));
        return $this->totalRegistrationsForDateRange($today, $today);
    }


    /**
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function totalRegistrationsYesterday(): int
    {
        $yesterday = date('Y-m-d', current_time('timestamp') - DAY_IN_SECONDS);
        return $this->totalRegistrationsForDateRange($yesterday, $yesterday);
    }


    /**
     * @param string $start_date earlier date string in format 'Y-m-d'
     * @param string $end_date   later date string in format 'Y-m-d'
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function totalRegistrationsForDateRange(string $start_date, string $end_date): int
    {
        $where = $this->addWhereParamsForFilters(
            [
                'REG_date' => [
                    'BETWEEN',
                    [
                        EEM_Registration::instance()->convert_datetime_for_query(
                            'REG_date',
                            "$start_date 00:00:00",
                            'Y-m-d H:i:s'
                        ),
                        EEM_Registration::instance()->convert_datetime_for_query(
                            'REG_date',
                            "$end_date  23:59:59",
                            'Y-m-d H:i:s'
                        ),
                    ],
                ],
                'STS_ID'   => ['!=', RegStatus::INCOMPLETE],
            ]
        );
        return EEM_Registration::instance()->count([$where]);
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
        $transaction   = $item->transaction();
        $payment_count = $transaction->count_related('Payment');

        $content = '<input type="checkbox" name="_REG_ID[]" value="' . $REG_ID . '" />';
        $content .= $payment_count > 0 || ! $this->caps_handler->userCanEditRegistration($item)
            ? '<span class="ee-locked-entity dashicons dashicons-lock ee-aria-tooltip ee-aria-tooltip--big-box"
                    aria-label="' . $this->lockedRegMessage() . '"></span>'
            : '';
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
        if ($this->EVT_ID) {
            $url_params['event_id'] = $this->EVT_ID;
        }
        // trash/restore/delete actions
        $actions = $this->trashRegistrationLink($registration, $url_params);
        $actions = $this->restoreRegistrationLink($registration, $url_params, $actions);
        $actions = $this->deleteRegistrationLink($registration, $url_params, $actions);

        $content .= $this->row_actions($actions);

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
        $content = $this->viewTransactionLink(
            $registration->transaction(),
            $registration->get_i18n_datetime('REG_date', 'M jS Y g:i a')
        );
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
        $edit_event              = $this->editEventLink($registration);
        $actions['event_filter'] = $this->eventFilterLink($registration);
        return $this->columnContent(
            'event_name',
            $edit_event . $this->row_actions($actions)
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
        // get first item for initial visibility
        $content = (string) array_shift($datetime_strings);
        if (! empty($datetime_strings)) {
            $content .= '
                <div class="ee-registration-event-datetimes-container-wrap">
                    <div class="ee-registration-event-datetimes-container__control">
                        <span class="tiny-text">' . esc_html__('Click to view additional dates', 'event_espresso') . '</span>
                        <button aria-label="' . esc_attr__('Click to view additional dates', 'event_espresso') . '"
                              class="ee-aria-tooltip button button--secondary button--tiny button--icon-only ee-js ee-more-datetimes-toggle"
                        >
                           <span class="dashicons dashicons-admin-collapse"></span>
                        </button>
                    </div>
                    <div class="ee-registration-event-datetimes-container more-items hidden">
                        ' . implode("", $datetime_strings) . '
                    </div>
                </div>';
        }
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
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column__REG_count(EE_Registration $registration): string
    {
        $content = sprintf(
            esc_html__('%1$s / %2$s', 'event_espresso'),
            $registration->count(),
            $registration->group_size()
        );
        return $this->columnContent('_REG_count', $content);
    }


    /**
     * @param EE_Registration $registration
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_REG_ticket(EE_Registration $registration): string
    {
        $ticket = $registration->ticket();
        $ticket_name = $this->ticketName($ticket);
        $actions['ticket_filter'] = $this->ticketFilterLink($ticket);
        return $this->columnContent(
            'REG_ticket',
            $ticket_name . $this->row_actions($actions)
        );
    }


    /**
     * @param EE_Registration $registration
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column__REG_final_price(EE_Registration $registration): string
    {
        // free ticket?
        $content = $registration->final_price() > 0
            ? '<span class="reg-overview-paid-event-spn">' . $registration->pretty_final_price() . '</span>'
            : '<span class="reg-overview-free-event-spn">' . esc_html__('free', 'event_espresso') . '</span>';
        return $this->columnContent('_REG_final_price', $content, 'end');
    }


    /**
     * @param EE_Registration $registration
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column__REG_paid(EE_Registration $registration): string
    {
        $payment_method      = $registration->payment_method();
        $payment_method_name = $payment_method instanceof EE_Payment_Method
            ? $payment_method->admin_name()
            : esc_html__('Unknown', 'event_espresso');

        $payment_status = RegStatus::PENDING_PAYMENT;
        $content = '<span>';
        $icon = '';
        $label = esc_attr__('pending payment', 'event_espresso');
        if ($registration->paid() == $registration->final_price()) {
            $icon = '<span class="dashicons dashicons-yes green-icon"></span> ';
            $label = esc_attr__('paid in full', 'event_espresso');
            $payment_status = RegStatus::APPROVED;
        }
        if ($registration->paid() > $registration->final_price()) {
            $icon = '<span class="dashicons dashicons-warning orange-icon"></span> ';
            $label = esc_attr__('overpaid', 'event_espresso');
            $payment_status = EEM_Transaction::overpaid_status_code;
        }
        $content .= '
            <span class="reg-overview-paid-event-spn ee-aria-tooltip ee-status-color--' . $payment_status . '"
                  aria-label="' . $label . '"
            >
                ' . $icon . $registration->pretty_paid('no_currency_code') . '
            </span>
            </span>';
        if ($registration->paid() > 0) {
            $content .= '
            <span class="ee-status-text-small">
                ' . sprintf(
                esc_html__('...via %s', 'event_espresso'),
                $payment_method_name
            ) . '
            </span>';
        }
        return $this->columnContent('_REG_paid', $content, 'end', 'stack');
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
        $content      = '';
        if ($registration->count() === 1) {
            $transaction = $registration->transaction();
            $content     = '
            <span class="ee-status-color--' . $transaction->status_ID() . '">
                ' . $transaction->pretty_paid('no_currency_code') . '
                <span class="separator">/</span>
                ' . $transaction->pretty_total('no_currency_code') . '
            </span>';

            $content .= '<span class="row-actions">' . $this->viewTransactionLink($transaction) . '</span>';
        }
        return $this->columnContent('TXN_total', $content, 'end', 'stack');
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
                'view_txn_lnk'           => $this->viewTransactionAction($registration->transaction()),
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
    protected function viewRegistrationUrl(EE_Registration $registration): string
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
    protected function viewRegistrationLink(
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
    protected function viewRegistrationAction(EE_Registration $registration): string
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


    protected function editContactAction(EE_Registration $registration, ?EE_Attendee $attendee = null): string
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
    protected function resendRegistrationMessageAction(
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


    /**
     * @param EE_Transaction $transaction
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function viewTransactionUrl(EE_Transaction $transaction): string
    {
        return EE_Admin_Page::add_query_args_and_nonce(
            [
                'action' => 'view_transaction',
                'TXN_ID' => $transaction->ID(),
            ],
            TXN_ADMIN_URL
        );
    }


    /**
     * @param EE_Transaction $transaction
     * @param string         $link_text
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     * @since 5.0.18.p
     */
    protected function viewTransactionLink(EE_Transaction $transaction, string $link_text = ''): string
    {
        if ($this->caps_handler->userCanViewTransaction()) {
            $link_text = $link_text ?: '<span class="dashicons dashicons-cart"></span> '
                . esc_html__('View Transaction', 'event_espresso');
            return '
            <a class="ee-reg-list-txn-link ee-aria-tooltip ee-status-color--' . $transaction->status_ID() . '"
                href="' . $this->viewTransactionUrl($transaction) . '"
                aria-label="' . esc_attr__('View Transaction', 'event_espresso') . '"
            >
                ' . $link_text . '
            </a>';
        }
        return $link_text;
    }


    /**
     * @param EE_Transaction $transaction
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function viewTransactionAction(EE_Transaction $transaction): string
    {
        if ($this->caps_handler->userCanViewTransaction()) {
            return '
                <a class="ee-aria-tooltip button button--icon-only"
                   href="' . $this->viewTransactionUrl($transaction) . '"
                   aria-label="' . sprintf(
                       esc_html__('View Transaction Details (%s)', 'event_espresso'),
                       EEH_Template::pretty_status($transaction->status_ID(), false, 'sentence')
                   ) . '"
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
    protected function viewTransactionInvoiceAction(
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
    protected function viewNotificationsAction(EE_Registration $registration): string
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
    protected function trashRegistrationLink(
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
        $transaction   = $registration->transaction();
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
    protected function restoreRegistrationLink(
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
    protected function deleteRegistrationLink(
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


    protected function editEventLink(EE_Registration $registration): string
    {
        $EVT_ID     = $registration->event_ID();
        $event_name = $this->eventName($registration);
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


    protected function eventName(EE_Registration $registration): string
    {
        $event_name = $registration->event_name();
        $event_name = $event_name ?: esc_html__("No Associated Event", 'event_espresso');
        return wp_trim_words($event_name, 30, '...');
    }


    protected function eventFilterLink(EE_Registration $registration): string
    {
        $event_filter_url = EE_Admin_Page::add_query_args_and_nonce(
            ['event_id' => $registration->event_ID()],
            REG_ADMIN_URL
        );
        return '
            <a  class="ee-aria-tooltip ee-event-filter-link"
                href="' . $event_filter_url . '"
                aria-label="' . sprintf(
                    esc_attr__('Filter this list to only show registrations for %s', 'event_espresso'),
                    $this->eventName($registration)
                ) . '"
            >
                <span class="dashicons dashicons-groups dashicons--small"></span>'
                . esc_html__('View Registrations', 'event_espresso') . '
            </a>';
    }


    /**
     * @param EE_Ticket $ticket
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     * @since 5.0.18.p
     */
    protected function ticketName(EE_Ticket $ticket): string
    {
        return '<span class="TKT_name ee-status-color--' . $ticket->ticket_status() . '">' . $ticket->name() . '</span>';
    }


    /**
     * @param EE_Ticket $ticket
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     * @since 5.0.18.p
     */
    protected function ticketFilterLink(EE_Ticket $ticket): string
    {
        $ticket_filter_url = EE_Admin_Page::add_query_args_and_nonce(['ticket_id' => $ticket->ID()], REG_ADMIN_URL);
        return '
            <a  class="ee-aria-tooltip ee-ticket-filter-link"
                href="' . $ticket_filter_url . '"
                aria-label="' . sprintf(
                    esc_attr__('Filter this list to only show registrations for ticket %s', 'event_espresso'),
                    $ticket->name()
                ) . '"
            >
                <span class="dashicons dashicons-groups dashicons--small"></span>'
                . esc_html__('View Registrations', 'event_espresso') . '
            </a>';
    }


    /**
     * @param EE_Registration $registration
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     * @deprecated 5.0.18.p
     */
    public function column_TXN_paid(EE_Registration $registration): string
    {
        $transaction = $registration->transaction();
        $content = $transaction->pretty_paid();
        if ($transaction->paid() >= $transaction->total()) {
            $content .= '<span class="dashicons dashicons-yes green-icon"></span>';
        }
        $content .= $this->viewTransactionLink($transaction);
        return $this->columnContent('TXN_paid', $content, 'end');
    }


    /**
     * @param EE_Registration $registration
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     * @deprecated 5.0.18.p
     */
    public function column_PRC_amount(EE_Registration $registration): string
    {
        $ticket = $registration->ticket();

        $content = $this->EVT_ID && $ticket instanceof EE_Ticket
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
}
