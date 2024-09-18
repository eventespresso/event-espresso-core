<?php

namespace EventEspresso\core\libraries\batch\JobHandlers;

use DateTimeZone;
use EEH_DTT_Helper;
use EEH_Export;
use EEH_File;
use EEM_Base;
use EEM_Checkin;
use EEM_Datetime;
use EEM_Event;
use EEM_Payment;
use EEM_Question;
use EEM_Registration;
use EEM_Status;
use EEM_Ticket;
use EEM_Transaction;
use EE_Capabilities;
use EE_Checkin;
use EE_Datetime;
use EE_Error;
use EE_Registry;
use EventEspresso\core\domain\entities\DbSafeDateTime;
use EventEspresso\core\domain\services\registration\RegStatus;
use EventEspresso\core\libraries\batch\Helpers\BatchRequestException;
use EventEspresso\core\libraries\batch\Helpers\JobParameters;
use EventEspresso\core\libraries\batch\Helpers\JobStepResponse;
use EventEspresso\core\libraries\batch\JobHandlerBaseClasses\JobHandlerFile;
use EventEspresso\core\domain\services\admin\registrations\list_table\csv_reports\AnswersCSV;
use EventEspresso\core\domain\services\admin\registrations\list_table\csv_reports\AttendeeCSV;
use EventEspresso\core\domain\services\admin\registrations\list_table\csv_reports\CheckinsCSV;
use EventEspresso\core\domain\services\admin\registrations\list_table\csv_reports\PaymentsInfoCSV;
use EventEspresso\core\domain\services\admin\registrations\list_table\csv_reports\RegistrationCSV;
use Exception;
use ReflectionException;

/**
 * Class RegistrationsReport
 * Generates the registrations report for the specified event,
 * or for all events
 *
 * @package               Event Espresso
 * @subpackage            batch
 * @author                Mike Nelson
 * @since                 4.8.26
 */
class RegistrationsReport extends JobHandlerFile
{
    // phpcs:disable PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    // phpcs:disable PSR2.Methods.MethodDeclaration.Underscore
    /**
     * Performs any necessary setup for starting the job. This is also a good
     * place to set up the $job_arguments which will be used for subsequent HTTP requests
     * when continue_job will be called
     *
     * @param JobParameters $job_parameters
     * @return JobStepResponse
     * @throws BatchRequestException
     * @throws EE_Error
     * @throws ReflectionException
     * @throws Exception
     */
    public function create_job(JobParameters $job_parameters): JobStepResponse
    {
        $event_id = absint($job_parameters->request_datum('EVT_ID', '0'));
        $DTT_ID   = absint($job_parameters->request_datum('DTT_ID', '0'));
        if (! EE_Capabilities::instance()->current_user_can('ee_read_registrations', 'generating_report')) {
            throw new BatchRequestException(
                esc_html__('You do not have permission to view registrations', 'event_espresso')
            );
        }
        $filepath = $this->create_file_from_job_with_name(
            $job_parameters->job_id(),
            $this->get_filename()
        );
        $job_parameters->add_extra_data('filepath', $filepath);

        if ($job_parameters->request_datum('use_filters', false)) {
            $query_params = maybe_unserialize($job_parameters->request_datum('filters', []));
        } else {
            $query_params = [
                [ 'Ticket.TKT_deleted' => ['IN', [true, false]] ],
                'order_by'   => ['Transaction.TXN_ID' => 'asc', 'REG_count' => 'asc'],
                'force_join' => ['Transaction', 'Ticket', 'Attendee'],
                'caps'       => EEM_Base::caps_read_admin,
            ];
            if ($event_id) {
                $query_params[0]['EVT_ID'] = $event_id;
            } else {
                $query_params['force_join'][] = 'Event';
            }
        }
        // unless the query params already include a status,
        // we want to exclude registrations from failed or abandoned transactions
        if (! isset($query_params[0]['Transaction.STS_ID'])) {
            $query_params[0]['OR'] = [
                // don't include registrations from failed or abandoned transactions...
                'Transaction.STS_ID' => [
                    'NOT IN',
                    [
                        EEM_Transaction::failed_status_code,
                        EEM_Transaction::abandoned_status_code,
                    ],
                ],
                // unless the registration is approved,
                // in which case include it regardless of transaction status
                'STS_ID' => RegStatus::APPROVED,
            ];
        }

        if (! isset($query_params['force_join'])) {
            $query_params['force_join'] = ['Event', 'Transaction', 'Ticket', 'Attendee'];
        }

        $return_url_args = [];
        parse_str(
            parse_url(
                $job_parameters->request_datum('return_url'),
                PHP_URL_QUERY
            ),
            $return_url_args
        );

        if (
            isset($return_url_args['orderby'], $return_url_args['order'])
            && $return_url_args['orderby'] === 'ATT_lname'
        ) {
            $query_params['order_by'] = [
                'Attendee.ATT_lname' => $return_url_args['order'],
                'Attendee.ATT_fname' => $return_url_args['order'],
                'REG_ID' => $return_url_args['order']
            ];
        }

        $query_params = apply_filters(
            'FHEE__EE_Export__report_registration_for_event',
            $query_params,
            $event_id
        );

        $utc_timezone = new DateTimeZone('UTC');
        $site_timezone = new DateTimeZone(EEH_DTT_Helper::get_timezone());
        $query_params = $this->convertDateStringsToObjects($query_params, $site_timezone, $utc_timezone);

        $job_parameters->add_extra_data('query_params', $query_params);
        $question_labels = $this->_get_question_labels($query_params);
        $job_parameters->add_extra_data('question_labels', $question_labels);
        $job_parameters->set_job_size($this->count_units_to_process($query_params));
        // we need to set the header columns
        // but to do that we need to process one row so that we can extract ALL the column headers
        $csv_data_for_row = $this->get_csv_data_for(
            $event_id,
            0,
            1,
            $question_labels,
            $query_params,
            $DTT_ID
        );
        // but we don't want to write any actual data yet...
        // so let's blank out all the values for that first row
        array_walk(
            $csv_data_for_row[0],
            function (&$value) {
                $value = null;
            }
        );

        EEH_Export::write_data_array_to_csv($filepath, $csv_data_for_row, true, true);
        $this->updateTextHeader(
            esc_html__('Registrations report started successfully...', 'event_espresso')
        );
        return new JobStepResponse($job_parameters, $this->feedback);
    }


    /**
     * Gets the filename
     *
     * @return string
     */
    protected function get_filename(): string
    {
        return apply_filters(
            'FHEE__EventEspressoBatchRequest__JobHandlers__RegistrationsReport__get_filename',
            sprintf(
                'event-espresso-registrations-%s.csv',
                str_replace([':', ' '], '-', current_time('mysql'))
            )
        );
    }


    /**
     * Gets the questions which are to be used for this report,
     * so they can be remembered for later
     *
     * @param array $registration_query_params
     * @return array question admin labels to be used for this report
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _get_question_labels(array $registration_query_params): array
    {
        $where                 = $registration_query_params[0] ?? null;
        $question_query_params = [];
        if ($where !== null) {
            $question_query_params = [
                $this->_change_registration_where_params_to_question_where_params($registration_query_params[0]),
            ];
        }
        // Make sure it's not a system question
        $question_query_params[0]['OR*not-system-questions'] = [
            'QST_system'      => '',
            'QST_system*null' => ['IS_NULL']
        ];
        if (
            apply_filters(
                'FHEE__EventEspressoBatchRequest__JobHandlers__RegistrationsReport___get_question_labels__only_include_answered_questions',
                false,
                $registration_query_params
            )
        ) {
            $question_query_params[0]['Answer.ANS_ID'] = ['IS_NOT_NULL'];
        }
        $question_query_params['order_by'] = [
            'Question_Group_Question.QGQ_order' => 'ASC',
            'QST_order' => 'ASC',
            'QST_admin_label' => 'ASC'
        ];
        $question_query_params['group_by'] = ['QST_ID'];
        return array_unique(EEM_Question::instance()->get_col($question_query_params, 'QST_admin_label'));
    }


    /**
     * Takes where params meant for registrations and changes them to work for questions
     *
     * @param array $reg_where_params
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _change_registration_where_params_to_question_where_params(array $reg_where_params): array
    {
        $question_where_params = [];
        foreach ($reg_where_params as $key => $val) {
            if (EEM_Registration::instance()->is_logic_query_param_key($key)) {
                $question_where_params[ $key ] =
                    $this->_change_registration_where_params_to_question_where_params($val);
            } else {
                // it's a normal where condition
                $question_where_params[ 'Question_Group.Event.Registration.' . $key ] = $val;
            }
        }
        return $question_where_params;
    }


    /**
     * Performs another step of the job
     *
     * @param JobParameters $job_parameters
     * @param int           $batch_size
     * @return JobStepResponse
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function continue_job(JobParameters $job_parameters, int $batch_size = 50): JobStepResponse
    {
        if ($job_parameters->units_processed() < $job_parameters->job_size()) {
            $csv_data = $this->get_csv_data_for(
                (int) $job_parameters->request_datum('EVT_ID', '0'),
                $job_parameters->units_processed(),
                $batch_size,
                $job_parameters->extra_datum('question_labels'),
                $job_parameters->extra_datum('query_params'),
                (int) $job_parameters->request_datum('DTT_ID', '0')
            );
            EEH_Export::write_data_array_to_csv(
                $job_parameters->extra_datum('filepath'),
                $csv_data,
                false
            );
            $units_processed = count($csv_data);
            if ($units_processed) {
                $job_parameters->mark_processed($units_processed);
                $this->updateText(
                    sprintf(
                        esc_html__('Wrote %1$s rows to report CSV file...', 'event_espresso'),
                        $units_processed
                    )
                );
            }
        }
        $extra_response_data = ['file_url' => ''];
        if ($job_parameters->units_processed() >= $job_parameters->job_size()) {
            $job_parameters->set_status(JobParameters::status_complete);
            $extra_response_data['file_url'] = $this->get_url_to_file($job_parameters->extra_datum('filepath'));
            $this->displayJobFinalResults($job_parameters);
        } else {
            $job_parameters->set_status(JobParameters::status_continue);
        }
        return new JobStepResponse($job_parameters, $this->feedback, $extra_response_data);
    }


    /**
     * Gets the csv data for a batch of registrations
     *
     * @param int|null $event_id
     * @param int      $offset
     * @param int      $limit
     * @param array    $question_labels the IDs for all the questions which were answered by someone in this selection
     * @param array    $query_params    for using where querying the model
     * @param int      $DTT_ID
     * @return array top-level keys are numeric, next-level keys are column headers
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_csv_data_for(
        ?int $event_id,
        int $offset,
        int $limit,
        array $question_labels,
        array $query_params,
        int $DTT_ID = 0
    ): array {
        $reg_fields_to_include = [
            'TXN_ID',
            'ATT_ID',
            'REG_ID',
            'REG_date',
            'REG_code',
            'REG_count',
            'REG_final_price',
        ];
        $att_fields_to_include = [
            'ATT_fname',
            'ATT_lname',
            'ATT_email',
            'ATT_address',
            'ATT_address2',
            'ATT_city',
            'STA_ID',
            'CNT_ISO',
            'ATT_zip',
            'ATT_phone',
        ];

        // get models
        $event_model   = EEM_Event::instance();
        $date_model    = EEM_Datetime::instance();
        $ticket_model  = EEM_Ticket::instance();
        $txn_model     = EEM_Transaction::instance();
        $reg_model     = EEM_Registration::instance();
        $pay_model     = EEM_Payment::instance();
        $status_model  = EEM_Status::instance();

        $registrations_csv_ready_array = [];
        $query_params['limit']         = [$offset, $limit];
        $registration_rows             = $reg_model->get_all_wpdb_results($query_params);

        foreach ($registration_rows as $reg_row) {
            if (! is_array($reg_row)) {
                continue;
            }
            $reg_csv_array = [];
            // registration ID
            $reg_id_field = $reg_model->field_settings_for('REG_ID');
            $reg_csv_array[ EEH_Export::get_column_name_for_field($reg_id_field) ] =
                EEH_Export::prepare_value_from_db_for_display(
                    $reg_model,
                    'REG_ID',
                    $reg_row[ $reg_id_field->get_qualified_column() ]
                );
            // ALL registrations, or is list filtered to just one?
            if (! $event_id) {
                // ALL registrations, so get each event's name and ID
                $reg_csv_array[ esc_html__('Event', 'event_espresso') ] = sprintf(
                    /* translators: 1: event name, 2: event ID */
                    esc_html__('%1$s (%2$s)', 'event_espresso'),
                    EEH_Export::prepare_value_from_db_for_display(
                        $event_model,
                        'EVT_name',
                        $reg_row['Event_CPT.post_title']
                    ),
                    $reg_row['Event_CPT.ID']
                );
            }
            // add attendee columns
            $reg_csv_array = AttendeeCSV::addAttendeeColumns($att_fields_to_include, $reg_row, $reg_csv_array);
            // add registration columns
            $reg_csv_array = RegistrationCSV::addRegistrationColumns($reg_fields_to_include, $reg_row, $reg_csv_array);
            // get pretty status
            $stati = $status_model->localized_status(
                [
                    $reg_row['Registration.STS_ID']     => esc_html__('unknown', 'event_espresso'),
                    $reg_row['TransactionTable.STS_ID'] => esc_html__('unknown', 'event_espresso'),
                ],
                false,
                'sentence'
            );
            $is_primary_reg = $reg_row['Registration.REG_count'] == '1';

            $reg_csv_array[ esc_html__('Registration Status', 'event_espresso') ] =
                $stati[ $reg_row['Registration.STS_ID'] ];
            // get pretty transaction status
            $reg_csv_array[ esc_html__('Transaction Status', 'event_espresso') ]     =
                $stati[ $reg_row['TransactionTable.STS_ID'] ];
            $reg_csv_array[ esc_html__('Transaction Amount Due', 'event_espresso') ] = $is_primary_reg
                ? EEH_Export::prepare_value_from_db_for_display(
                    $txn_model,
                    'TXN_total',
                    $reg_row['TransactionTable.TXN_total'],
                    'localized_float'
                )
                : '0.00';

            $reg_csv_array[ esc_html__('Amount Paid', 'event_espresso') ]            = $is_primary_reg
                ? EEH_Export::prepare_value_from_db_for_display(
                    $txn_model,
                    'TXN_paid',
                    $reg_row['TransactionTable.TXN_paid'],
                    'localized_float'
                )
                : '0.00';

            $payment_methods                                                                  = [];
            $gateway_txn_ids_etc                                                              = [];
            $payment_times                                                                    = [];
            if ($is_primary_reg && $reg_row['TransactionTable.TXN_ID']) {
                $payments_info = $pay_model->get_all_wpdb_results(
                    [
                        [
                            'TXN_ID' => $reg_row['TransactionTable.TXN_ID'],
                            'STS_ID' => EEM_Payment::status_id_approved,
                        ],
                        'force_join' => ['Payment_Method'],
                    ],
                    ARRAY_A,
                    'Payment_Method.PMD_admin_name as name, Payment.PAY_txn_id_chq_nmbr as gateway_txn_id, Payment.PAY_timestamp as payment_time'
                );
                [$payment_methods, $gateway_txn_ids_etc, $payment_times] = PaymentsInfoCSV::extractPaymentInfo(
                    $payments_info
                );
            }

            $reg_csv_array[ esc_html__('Payment Date(s)', 'event_espresso') ] = implode(
                ',',
                $payment_times
            );

            $reg_csv_array[ esc_html__('Payment Method(s)', 'event_espresso') ] = implode(
                ',',
                $payment_methods
            );

            $reg_csv_array[ esc_html__('Gateway Transaction ID(s)', 'event_espresso') ] = implode(
                ',',
                $gateway_txn_ids_etc
            );

            $ticket_name      = esc_html__('Unknown', 'event_espresso');
            $datetime_strings = [esc_html__('Unknown', 'event_espresso')];
            if ($reg_row['Ticket.TKT_ID']) {
                $ticket_name       = EEH_Export::prepare_value_from_db_for_display(
                    $ticket_model,
                    'TKT_name',
                    $reg_row['Ticket.TKT_name']
                );
                $datetime_strings = [];
                $datetimes        = $date_model->get_all_wpdb_results(
                    [
                        ['Ticket.TKT_ID' => $reg_row['Ticket.TKT_ID']],
                        'order_by'                 => ['DTT_EVT_start' => 'ASC'],
                        'default_where_conditions' => 'none',
                    ]
                );
                foreach ($datetimes as $datetime) {
                    $datetime_strings[] = EEH_Export::prepare_value_from_db_for_display(
                        $date_model,
                        'DTT_EVT_start',
                        $datetime['Datetime.DTT_EVT_start']
                    );
                }
            }

            $reg_csv_array[ $ticket_model->field_settings_for('TKT_name')->get_nicename() ] = $ticket_name;


            $reg_csv_array[ esc_html__('Ticket Datetimes', 'event_espresso') ] = implode(
                ', ',
                $datetime_strings
            );

            // add answer columns
            $reg_csv_array = AnswersCSV::addAnswerColumns($reg_row, $reg_csv_array, $question_labels);
            // Include check-in data
            if ($event_id && $DTT_ID) {
                // get whether the user has checked in
                $reg_csv_array[ esc_html__('Datetime Check-ins #', 'event_espresso') ] =
                    $reg_model->count_related(
                        $reg_row['Registration.REG_ID'],
                        'Checkin',
                        [
                            [
                                'DTT_ID' => $DTT_ID
                            ]
                        ]
                    );
                $datetime     = $date_model->get_one_by_ID($DTT_ID);
                $checkin_rows = EEM_Checkin::instance()->get_all(
                    [
                        [
                            'REG_ID' => $reg_row['Registration.REG_ID'],
                            'DTT_ID' => $datetime->get('DTT_ID'),
                        ],
                    ]
                );
                $checkins     = [];
                foreach ($checkin_rows as $checkin_row) {
                    /** @var EE_Checkin $checkin_row */
                    $checkin_value = CheckinsCSV::getCheckinValue($checkin_row);
                    if ($checkin_value) {
                        $checkins[] = $checkin_value;
                    }
                }
                $datetime_name                   = CheckinsCSV::getDatetimeLabel($datetime);
                $reg_csv_array[ $datetime_name ] = implode(' --- ', $checkins);
            } elseif ($event_id) {
                // get whether the user has checked in
                $reg_csv_array[ esc_html__('Event Check-ins #', 'event_espresso') ] =
                    $reg_model->count_related(
                        $reg_row['Registration.REG_ID'],
                        'Checkin'
                    );

                $datetimes = $date_model->get_all(
                    [
                        [
                            'Ticket.TKT_ID' => $reg_row['Ticket.TKT_ID'],
                        ],
                        'order_by'                 => ['DTT_EVT_start' => 'ASC'],
                        'default_where_conditions' => 'none',
                    ]
                );
                foreach ($datetimes as $datetime) {
                    if (! $datetime instanceof EE_Datetime) {
                        continue;
                    }

                    /** @var EE_Checkin $checkin_row */
                    $checkin_row = EEM_Checkin::instance()->get_one(
                        [
                            [
                                'REG_ID' => $reg_row['Registration.REG_ID'],
                                'DTT_ID' => $datetime->get('DTT_ID'),
                            ],
                            'limit'    => 1,
                            'order_by' => [
                                'CHK_ID' => 'DESC'
                            ]
                        ]
                    );

                    $checkin_value = CheckinsCSV::getCheckinValue($checkin_row);
                    $datetime_name = CheckinsCSV::getDatetimeLabel($datetime);

                    $reg_csv_array[ $datetime_name ] = $checkin_value;
                }
            }
            /**
             * Filter to change the contents of each row of the registrations report CSV file.
             * This can be used to add or remote columns from the CSV file, or change their values.
             * Note when using: all rows in the CSV should have the same columns.
             *
             * @param array $reg_csv_array keys are the column names, values are their cell values
             * @param array $reg_row       one entry from EEM_Registration::get_all_wpdb_results()
             */
            $registrations_csv_ready_array[] = apply_filters(
                'FHEE__EventEspressoBatchRequest__JobHandlers__RegistrationsReport__reg_csv_array',
                $reg_csv_array,
                $reg_row
            );
        }
        // if we couldn't export anything, we want to at least show the column headers
        if (empty($registrations_csv_ready_array)) {
            $reg_csv_array               = [];
            $model_and_fields_to_include = [
                'Registration' => $reg_fields_to_include,
                'Attendee'     => $att_fields_to_include,
            ];
            foreach ($model_and_fields_to_include as $model_name => $field_list) {
                $model = EE_Registry::instance()->load_model($model_name);
                foreach ($field_list as $field_name) {
                    $field                                                          =
                        $model->field_settings_for($field_name);
                    $reg_csv_array[ EEH_Export::get_column_name_for_field($field) ] = null;
                }
            }
            $registrations_csv_ready_array[] = $reg_csv_array;
        }
        return $registrations_csv_ready_array;
    }


    /**
     * recursively convert MySQL format date strings in query params array to Datetime objects
     *
     * @param array        $query_params
     * @param DateTimeZone $site_timezone
     * @param DateTimeZone $utc_timezone
     * @return array
     * @throws Exception
     * @since 5.0.19.p
     */
    private function convertDateStringsToObjects(
        array $query_params,
        DateTimeZone $site_timezone,
        DateTimeZone $utc_timezone
    ): array {
        foreach ($query_params as $key => $value) {
            if (is_array($value)) {
                $query_params[ $key ] = $this->convertDateStringsToObjects($value, $site_timezone, $utc_timezone);
                continue;
            }
            if (preg_match('/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/', $value)) {
                $query_params[ $key ] = DbSafeDateTime::createFromFormat('Y-m-d H:i:s', $value, $site_timezone);
                $query_params[ $key ] = $query_params[ $key ]->setTimezone($utc_timezone);
            }
        }
        return $query_params;
    }


    /**
     * Counts total unit to process
     *
     * @param array $query_params
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function count_units_to_process(array $query_params): int
    {
        return EEM_Registration::instance()->count(
            array_diff_key(
                $query_params,
                array_flip(
                    ['limit']
                )
            )
        );
    }


    /**
     * Performs any clean-up logic when we know the job is completed.
     * In this case, we delete the temporary file
     *
     * @param JobParameters $job_parameters
     * @return JobStepResponse
     */
    public function cleanup_job(JobParameters $job_parameters): JobStepResponse
    {
        $this->updateText(esc_html__('File Generation complete and downloaded', 'event_espresso'));

        $this->_file_helper->delete(
            EEH_File::remove_filename_from_filepath($job_parameters->extra_datum('filepath')),
            true,
            'd'
        );
        $this->updateText(esc_html__('Cleaned up temporary file', 'event_espresso'));
        $this->updateText(
            $this->infoWrapper(
                sprintf(
                    esc_html__(
                        'If not automatically redirected in %1$s seconds, click here to return to the %2$sRegistrations List Table%3$s',
                        'event_espresso'
                    ),
                    '<span id="ee-redirect-timer">10</span>',
                    '<a href="' . $job_parameters->request_datum('return_url') . '">',
                    '</a>'
                )
            )
        );
        return new JobStepResponse($job_parameters, $this->feedback);
    }
}
