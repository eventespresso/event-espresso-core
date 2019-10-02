<?php

namespace EventEspresso\core\domain\services\admin\registrations\list_table;

use EE_Error;
use EEH_DTT_Helper;
use EEM_Registration;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\request\RequestInterface;
use InvalidArgumentException;

/**
 * Class QueryBuilder
 * Sets up the query parameters for the registrations admin page list table query
 *
 * @package EventEspresso\core\domain\services\admin\registrations
 * @author  Brent Christensen
 * @since   $VID:$
 */
class QueryBuilder
{

    /**
     * @var RequestInterface $request
     */
    protected $request;

    /**
     * @var EEM_Registration $registration_model
     */
    protected $registration_model;

    /**
     * @var string $view
     */
    protected $view;

    /**
     * @var array $where_params
     */
    protected $where_params;


    /**
     * QueryBuilder constructor.
     *
     * @param array            $extra_request_params
     * @param RequestInterface $request
     * @param EEM_Registration $registration_model
     */
    public function __construct(
        array $extra_request_params,
        RequestInterface $request,
        EEM_Registration $registration_model
    ) {
        $this->request = $request;
        $this->registration_model = $registration_model;
        foreach ($extra_request_params as $key => $value) {
            $this->request->setRequestParam($key, $value);
        }
        $this->view = $this->request->getRequestParam('status', '');
        $this->where_params = [];
    }


    /**
     * Sets up the where conditions for the registrations query.
     *
     * @param int  $per_page
     * @param bool $count_query
     * @return array
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function getQueryParams($per_page = 10, $count_query = false)
    {
        $query_params = [
            0                          => $this->getWhereClause(),
            'caps'                     => EEM_Registration::caps_read_admin,
            'default_where_conditions' => 'this_model_only',
        ];
        if (! $count_query) {
            $query_params = array_merge(
                $query_params,
                $this->getOrderbyClause(),
                $this->getLimitClause($per_page)
            );
        }

        return $query_params;
    }


    /**
     * Sets up the where conditions for the registrations query.
     *
     * @return array
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    protected function getWhereClause()
    {
        $this->addAttendeeIdToWhereConditions();
        $this->addEventIdToWhereConditions();
        $this->addCategoryIdToWhereConditions();
        $this->addDatetimeIdToWhereConditions();
        $this->addTicketIdToWhereConditions();
        $this->addRegistrationStatusToWhereConditions();
        $this->addDateToWhereConditions();
        $this->addSearchToWhereConditions();
        return apply_filters(
            'FHEE__Registrations_Admin_Page___get_where_conditions_for_registrations_query',
            $this->where_params,
            $this->request->requestParams()
        );
    }


    /**
     * This will add ATT_ID to the provided $this->where_clause array for EE model query parameters.
     */
    protected function addAttendeeIdToWhereConditions()
    {
        $ATT_ID = $this->request->getRequestParam('attendee_id');
        $ATT_ID = $this->request->getRequestParam('ATT_ID', $ATT_ID);
        if ($ATT_ID) {
            $this->where_params['ATT_ID'] = absint($ATT_ID);
        }
    }


    /**
     * This will add EVT_ID to the provided $this->where_clause array for EE model query parameters.
     */
    protected function addEventIdToWhereConditions()
    {
        $EVT_ID = $this->request->getRequestParam('event_id');
        $EVT_ID = $this->request->getRequestParam('EVT_ID', $EVT_ID);
        if ($EVT_ID) {
            $this->where_params['EVT_ID'] = absint($EVT_ID);
        }
    }


    /**
     * Adds category ID if it exists in the request to the where conditions for the registrations query.
     */
    protected function addCategoryIdToWhereConditions()
    {
        $EVT_CAT = (int) $this->request->getRequestParam('EVT_CAT');
        if ($EVT_CAT > 0) {
            $this->where_params['Event.Term_Taxonomy.term_id'] = absint($EVT_CAT);
        }
    }


    /**
     * Adds the datetime ID if it exists in the request to the where conditions for the registrations query.
     */
    protected function addDatetimeIdToWhereConditions()
    {
        // first look for 'datetime_id' then 'DTT_ID' using first result as fallback default value
        $DTT_ID = $this->request->getRequestParam('datetime_id');
        $DTT_ID = $this->request->getRequestParam('DTT_ID', $DTT_ID);
        if ($DTT_ID) {
            $this->where_params['Ticket.Datetime.DTT_ID'] = absint($DTT_ID);
        }
    }


    /**
     * Adds the ticket ID if it exists in the request to the where conditions for the registrations query.
     */
    protected function addTicketIdToWhereConditions()
    {
        // first look for 'ticket_id' then 'TKT_ID' using first result as fallback default value
        $TKT_ID = $this->request->getRequestParam('ticket_id');
        $TKT_ID = $this->request->getRequestParam('TKT_ID', $TKT_ID);
        if ($TKT_ID) {
            $this->where_params['TKT_ID'] = absint($TKT_ID);
        }
    }


    /**
     * Adds the correct registration status to the where conditions for the registrations query.
     * If filtering by registration status, then we show registrations matching that status.
     * If not filtering by specified status, then we show all registrations excluding incomplete registrations
     * UNLESS viewing trashed registrations.
     */
    protected function addRegistrationStatusToWhereConditions()
    {
        $registration_status = $this->request->getRequestParam('_reg_status');
        if ($registration_status) {
            $this->where_params['STS_ID'] = sanitize_text_field($registration_status);
            return;
        }
        // make sure we exclude incomplete registrations, but only if not trashed.
        if ($this->view === 'trash') {
            $this->where_params['REG_deleted'] = true;
            return;
        }
        $this->where_params['STS_ID'] = $this->view === 'incomplete'
            ? EEM_Registration::status_id_incomplete
            : ['!=', EEM_Registration::status_id_incomplete];
    }


    /**
     * Adds any provided date restraints to the where conditions for the registrations query.
     *
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    protected function addDateToWhereConditions()
    {
        if ($this->view === 'today') {
            $now = date('Y-m-d', current_time('timestamp'));
            $this->where_params['REG_date'] = [
                'BETWEEN',
                [
                    $this->registration_model->convert_datetime_for_query(
                        'REG_date',
                        $now . ' 00:00:00',
                        'Y-m-d H:i:s'
                    ),
                    $this->registration_model->convert_datetime_for_query(
                        'REG_date',
                        $now . ' 23:59:59',
                        'Y-m-d H:i:s'
                    ),
                ],
            ];
            return;
        }
        if ($this->view === 'month') {
            $current_year_and_month = date('Y-m', current_time('timestamp'));
            $days_this_month = date('t', current_time('timestamp'));
            $this->where_params['REG_date'] = [
                'BETWEEN',
                [
                    $this->registration_model->convert_datetime_for_query(
                        'REG_date',
                        $current_year_and_month . '-01 00:00:00',
                        'Y-m-d H:i:s'
                    ),
                    $this->registration_model->convert_datetime_for_query(
                        'REG_date',
                        $current_year_and_month . '-' . $days_this_month . ' 23:59:59',
                        'Y-m-d H:i:s'
                    ),
                ],
            ];
            return;
        }
        $month_range = $this->request->getRequestParam('month_range');
        if ($month_range) {
            $month_range = sanitize_text_field($month_range);
            $pieces = explode(' ', $month_range, 3);
            $month_requested = ! empty($pieces[0])
                ? date('m', EEH_DTT_Helper::first_of_month_timestamp($pieces[0]))
                : '';
            $year_requested = ! empty($pieces[1])
                ? $pieces[1]
                : '';
            // if there is not a month or year then we can't go further
            if ($month_requested && $year_requested) {
                $days_in_month = date('t', strtotime($year_requested . '-' . $month_requested . '-' . '01'));
                $this->where_params['REG_date'] = [
                    'BETWEEN',
                    [
                        $this->registration_model->convert_datetime_for_query(
                            'REG_date',
                            $year_requested . '-' . $month_requested . '-01 00:00:00',
                            'Y-m-d H:i:s'
                        ),
                        $this->registration_model->convert_datetime_for_query(
                            'REG_date',
                            $year_requested . '-' . $month_requested . '-' . $days_in_month . ' 23:59:59',
                            'Y-m-d H:i:s'
                        ),
                    ],
                ];
            }
        }
    }


    /**
     * Adds any provided search restraints to the where conditions for the registrations query
     */
    protected function addSearchToWhereConditions()
    {
        $search = $this->request->getRequestParam('s');
        if ($search) {
            $search_string = '%' . sanitize_text_field($search) . '%';
            $this->where_params['OR*search_conditions'] = [
                'Event.EVT_name'                          => ['LIKE', $search_string],
                'Event.EVT_desc'                          => ['LIKE', $search_string],
                'Event.EVT_short_desc'                    => ['LIKE', $search_string],
                'Attendee.ATT_full_name'                  => ['LIKE', $search_string],
                'Attendee.ATT_fname'                      => ['LIKE', $search_string],
                'Attendee.ATT_lname'                      => ['LIKE', $search_string],
                'Attendee.ATT_short_bio'                  => ['LIKE', $search_string],
                'Attendee.ATT_email'                      => ['LIKE', $search_string],
                'Attendee.ATT_address'                    => ['LIKE', $search_string],
                'Attendee.ATT_address2'                   => ['LIKE', $search_string],
                'Attendee.ATT_city'                       => ['LIKE', $search_string],
                'REG_final_price'                         => ['LIKE', $search_string],
                'REG_code'                                => ['LIKE', $search_string],
                'REG_count'                               => ['LIKE', $search_string],
                'REG_group_size'                          => ['LIKE', $search_string],
                'Ticket.TKT_name'                         => ['LIKE', $search_string],
                'Ticket.TKT_description'                  => ['LIKE', $search_string],
                'Transaction.Payment.PAY_txn_id_chq_nmbr' => ['LIKE', $search_string],
            ];
        }
    }


    /**
     * Sets up the orderby for the registrations query.
     *
     * @return array
     */
    protected function getOrderbyClause()
    {
        $orderby_field = $this->request->getRequestParam('orderby');
        $orderby_field = $orderby_field ? sanitize_text_field($orderby_field) : '_REG_date';
        switch ($orderby_field) {
            case '_REG_ID':
                $orderby = ['REG_ID'];
                break;
            case '_Reg_status':
                $orderby = ['STS_ID'];
                break;
            case 'ATT_fname':
                $orderby = ['Attendee.ATT_fname', 'Attendee.ATT_lname'];
                break;
            case 'ATT_lname':
                $orderby = ['Attendee.ATT_lname', 'Attendee.ATT_fname'];
                break;
            case 'event_name':
                $orderby = ['Event.EVT_name'];
                break;
            case 'DTT_EVT_start':
                $orderby = ['Event.Datetime.DTT_EVT_start'];
                break;
            case '_REG_date':
                $orderby = ['REG_date'];
                break;
            default:
                $orderby = [$orderby_field];
                break;
        }
        $order = $this->request->getRequestParam('order');
        $order = $order ? sanitize_text_field($order) : 'DESC';

        $orderby = array_combine(
            $orderby,
            array_fill(0, count($orderby), $order)
        );
        // because there are many registrations with the same date, define
        // a secondary way to order them, otherwise MySQL seems to be a bit random
        if (empty($orderby['REG_ID'])) {
            $orderby['REG_ID'] = $order;
        }

        $orderby = apply_filters(
            'FHEE__Registrations_Admin_Page___get_orderby_for_registrations_query',
            $orderby,
            $this->request->requestParams()
        );
        return ['order_by' => $orderby];
    }


    /**
     * Sets up the limit for the registrations query.
     *
     * @param $per_page
     * @return array
     */
    protected function getLimitClause($per_page)
    {
        $current_page = $this->request->getRequestParam('paged');
        $current_page = $current_page ? absint($current_page) : 1;
        $per_page = (int) $this->request->getRequestParam('perpage', $per_page);
        // -1 means return all results so get out if that's set.
        if ($per_page === -1) {
            return [];
        }
        $per_page = absint($per_page);
        $offset = ($current_page - 1) * $per_page;
        return ['limit' => [$offset, $per_page]];
    }
}
