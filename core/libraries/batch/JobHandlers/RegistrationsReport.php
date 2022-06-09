<?php

namespace EventEspressoBatchRequest\JobHandlers;

use EE_Capabilities;
use EE_Checkin;
use EE_Datetime;
use EE_Error;
use EE_Registry;
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
use EEM_Transaction;
use EventEspresso\core\domain\services\admin\registrations\list_table\csv_reports\AnswersCSV;
use EventEspresso\core\domain\services\admin\registrations\list_table\csv_reports\AttendeeCSV;
use EventEspresso\core\domain\services\admin\registrations\list_table\csv_reports\CheckinsCSV;
use EventEspresso\core\domain\services\admin\registrations\list_table\csv_reports\PaymentsInfoCSV;
use EventEspresso\core\domain\services\admin\registrations\list_table\csv_reports\RegistrationCSV;
use EventEspressoBatchRequest\JobHandlerBaseClasses\JobHandlerFile;
use EventEspressoBatchRequest\Helpers\BatchRequestException;
use EventEspressoBatchRequest\Helpers\JobParameters;
use EventEspressoBatchRequest\Helpers\JobStepResponse;
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
     * place to setup the $job_arguments which will be used for subsequent HTTP requests
     * when continue_job will be called
     *
     * @param JobParameters $job_parameters
     * @return JobStepResponse
     * @throws BatchRequestException
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function create_job(JobParameters $job_parameters)
    {
        $event_id = (int) $job_parameters->request_datum('EVT_ID', '0');
        $DTT_ID   = (int) $job_parameters->request_datum('DTT_ID', '0');
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
                [
                    'OR'                 => [
                        // don't include registrations from failed or abandoned transactions...
                        'Transaction.STS_ID' => [
                            'NOT IN',
                            [
                                EEM_Transaction::failed_status_code,
                                EEM_Transaction::abandoned_status_code,
                            ],
                        ],
                        // unless the registration is approved, in which case include it regardless of transaction status
                        'STS_ID'             => EEM_Registration::status_id_approved,
                    ],
                    'Ticket.TKT_deleted' => ['IN', [true, false]],
                ],
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

        if (! isset($query_params['force_join'])) {
            $query_params['force_join'] = ['Event', 'Transaction', 'Ticket', 'Attendee'];
        }

        $query_params = apply_filters(
            'FHEE__EE_Export__report_registration_for_event',
            $query_params,
            $event_id
        );

        $job_parameters->add_extra_data('query_params', $query_params);
        $question_labels = $this->_get_question_labels($query_params);
        $job_parameters->add_extra_data('question_labels', $question_labels);
        $job_parameters->set_job_size($this->count_units_to_process($query_params));
        // we should also set the header columns
        $csv_data_for_row = $this->get_csv_data_for(
            $event_id,
            0,
            1,
            $job_parameters->extra_datum('question_labels'),
            $job_parameters->extra_datum('query_params'),
            $DTT_ID
        );
        EEH_Export::write_data_array_to_csv($filepath, $csv_data_for_row, true);
        // if we actually processed a row there, record it
        if ($job_parameters->job_size()) {
            $job_parameters->mark_processed(1);
        }
        return new JobStepResponse(
            $job_parameters,
            esc_html__('Registrations report started successfully...', 'event_espresso')
        );
    }


    /**
     * Gets the filename
     *
     * @return string
     */
    protected function get_filename()
    {
        return apply_filters(
            'FHEE__EventEspressoBatchRequest__JobHandlers__RegistrationsReport__get_filename',
            sprintf(
                "event-espresso-registrations-%s.csv",
                str_replace(array(':', ' '), '-', current_time('mysql'))
            )
        );
    }


    /**
     * Gets the questions which are to be used for this report, so they
     * can be remembered for later
     *
     * @param array $registration_query_params
     * @return array question admin labels to be used for this report
     * @throws EE_Error
     */
    protected function _get_question_labels($registration_query_params)
    {
        $where = isset($registration_query_params[0]) ? $registration_query_params[0] : null;
        $question_query_params = array();
        if ($where !== null) {
            $question_query_params = array(
                $this->_change_registration_where_params_to_question_where_params($registration_query_params[0]),
            );
        }
        // Make sure it's not a system question
        $question_query_params[0]['OR*not-system-questions'] = [
            'QST_system' => '',
            'QST_system*null' => ['IS_NULL']
        ];
        if (
            apply_filters(
                'FHEE__EventEspressoBatchRequest__JobHandlers__RegistrationsReport___get_question_labels__only_include_answered_questions',
                false,
                $registration_query_params
            )
        ) {
            $question_query_params[0]['Answer.ANS_ID'] = array('IS_NOT_NULL');
        }
        $question_query_params['group_by'] = array('QST_ID');
        return array_unique(EEM_Question::instance()->get_col($question_query_params, 'QST_admin_label'));
    }


    /**
     * Takes where params meant for registrations and changes them to work for questions
     *
     * @param array $reg_where_params
     * @return array
     * @throws EE_Error
     */
    protected function _change_registration_where_params_to_question_where_params($reg_where_params)
    {
        $question_where_params = array();
        foreach ($reg_where_params as $key => $val) {
            if (EEM_Registration::instance()->is_logic_query_param_key($key)) {
                $question_where_params[ $key ] = $this->_change_registration_where_params_to_question_where_params($val);
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
     * @param int $batch_size
     * @return JobStepResponse
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function continue_job(JobParameters $job_parameters, $batch_size = 50)
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
            EEH_Export::write_data_array_to_csv($job_parameters->extra_datum('filepath'), $csv_data, false);
            $units_processed = count($csv_data);
        } else {
            $csv_data = array();
            $units_processed = 0;
        }
        $job_parameters->mark_processed($units_processed);
        $extra_response_data = array(
            'file_url' => '',
        );
        if ($units_processed < $batch_size) {
            $job_parameters->set_status(JobParameters::status_complete);
            $extra_response_data['file_url'] = $this->get_url_to_file($job_parameters->extra_datum('filepath'));
        }

        return new JobStepResponse(
            $job_parameters,
            sprintf(esc_html__('Wrote %1$s rows to report CSV file...', 'event_espresso'), count((array) $csv_data)),
            $extra_response_data
        );
    }


    /**
     * Gets the csv data for a batch of registrations
     *
     * @param int|null $event_id
     * @param int $offset
     * @param int $limit
     * @param array $question_labels the IDs for all the questions which were answered by someone in this selection
     * @param array $query_params for using where querying the model
     * @param int $DTT_ID
     * @return array top-level keys are numeric, next-level keys are column headers
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_csv_data_for($event_id, $offset, $limit, $question_labels, $query_params, $DTT_ID = 0)
    {
        $reg_fields_to_include = [
            'TXN_ID',
            'ATT_ID',
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
        $registrations_csv_ready_array = [];
        $reg_model = EE_Registry::instance()->load_model('Registration');
        $query_params['limit'] = [$offset, $limit];
        $registration_rows = $reg_model->get_all_wpdb_results($query_params);
        foreach ($registration_rows as $reg_row) {
            if (!is_array($reg_row)) {
                continue;
            }
            $reg_csv_array = [];
            // registration Id
            $reg_id_field = $reg_model->field_settings_for('REG_ID');
            $reg_csv_array[ EEH_Export::get_column_name_for_field($reg_id_field) ] = EEH_Export::prepare_value_from_db_for_display(
                $reg_model,
                'REG_ID',
                $reg_row[ $reg_id_field->get_qualified_column() ]
            );
            if (! $event_id) {
                // get the event's name and Id
                $reg_csv_array[ (string) esc_html__('Event', 'event_espresso') ] = sprintf(
                    /* translators: 1: event name, 2: event ID */
                    esc_html__('%1$s (%2$s)', 'event_espresso'),
                    EEH_Export::prepare_value_from_db_for_display(
                        EEM_Event::instance(),
                        'EVT_name',
                        $reg_row['Event_CPT.post_title']
                    ),
                    $reg_row['Event_CPT.ID']
                );
            }
            // add attendee columns
            $reg_csv_array = AttendeeCSV::addAttendeeColumns($att_fields_to_include, $reg_row, $reg_csv_array);
            // add registration columns
            $reg_csv_array = RegistrationCSV::addRegistrationColumns($reg_fields_to_include, $reg_row, $reg_model, $reg_csv_array);
            // get pretty status
            $stati = EEM_Status::instance()->localized_status(
                [
                    $reg_row['Registration.STS_ID']     => esc_html__('unknown', 'event_espresso'),
                    $reg_row['TransactionTable.STS_ID'] => esc_html__('unknown', 'event_espresso'),
                ],
                false,
                'sentence'
            );
            $is_primary_reg = $reg_row['Registration.REG_count'] == '1' ? true : false;
            $reg_csv_array[ (string) esc_html__("Registration Status", 'event_espresso') ] = $stati[ $reg_row['Registration.STS_ID'] ];
            // get pretty transaction status
            $reg_csv_array[ (string) esc_html__("Transaction Status", 'event_espresso') ] = $stati[ $reg_row['TransactionTable.STS_ID'] ];
            $reg_csv_array[ (string) esc_html__('Transaction Amount Due', 'event_espresso') ] = $is_primary_reg
                ? EEH_Export::prepare_value_from_db_for_display(
                    EEM_Transaction::instance(),
                    'TXN_total',
                    $reg_row['TransactionTable.TXN_total'],
                    'localized_float'
                ) : '0.00';
            $reg_csv_array[ (string) esc_html__('Amount Paid', 'event_espresso') ] = $is_primary_reg
                ? EEH_Export::prepare_value_from_db_for_display(
                    EEM_Transaction::instance(),
                    'TXN_paid',
                    $reg_row['TransactionTable.TXN_paid'],
                    'localized_float'
                ) : '0.00';
            $payment_methods = [];
            $gateway_txn_ids_etc = [];
            $payment_times = [];
            if ($is_primary_reg && $reg_row['TransactionTable.TXN_ID']) {
                $payments_info = EEM_Payment::instance()->get_all_wpdb_results(
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
                [$payment_methods, $gateway_txn_ids_etc, $payment_times] = PaymentsInfoCSV::extractPaymentInfo($payments_info);
            }
            $reg_csv_array[ (string) esc_html__('Payment Date(s)', 'event_espresso') ] = implode(',', $payment_times);
            $reg_csv_array[ (string) esc_html__('Payment Method(s)', 'event_espresso') ] = implode(",", $payment_methods);
            $reg_csv_array[ (string) esc_html__('Gateway Transaction ID(s)', 'event_espresso') ] = implode(
                ',',
                $gateway_txn_ids_etc
            );
            // get ticket of registration and its price
            $ticket_model = EE_Registry::instance()->load_model('Ticket');
            if ($reg_row['Ticket.TKT_ID']) {
                $ticket_name = EEH_Export::prepare_value_from_db_for_display(
                    $ticket_model,
                    'TKT_name',
                    $reg_row['Ticket.TKT_name']
                );
                $datetimes_strings = [];
                foreach (
                    EEM_Datetime::instance()->get_all_wpdb_results(
                        [
                            ['Ticket.TKT_ID' => $reg_row['Ticket.TKT_ID']],
                            'order_by' => ['DTT_EVT_start' => 'ASC'],
                            'default_where_conditions' => 'none',
                        ]
                    ) as $datetime
                ) {
                    $datetimes_strings[] = EEH_Export::prepare_value_from_db_for_display(
                        EEM_Datetime::instance(),
                        'DTT_EVT_start',
                        $datetime['Datetime.DTT_EVT_start']
                    );
                }
            } else {
                $ticket_name = esc_html__('Unknown', 'event_espresso');
                $datetimes_strings = [esc_html__('Unknown', 'event_espresso')];
            }
            $reg_csv_array[ (string) $ticket_model->field_settings_for('TKT_name')->get_nicename() ] = $ticket_name;
            $reg_csv_array[ (string) esc_html__("Datetimes of Ticket", "event_espresso") ] = implode(", ", $datetimes_strings);
            // add answer columns
            $reg_csv_array = AnswersCSV::addAnswerColumns($reg_row, $reg_csv_array, $question_labels);
            // Include check-in data
            if ($event_id && $DTT_ID) {
                // get whether or not the user has checked in
                $reg_csv_array[ (string) esc_html__('Datetime Check-ins #', 'event_espresso') ] = $reg_model->count_related(
                    $reg_row['Registration.REG_ID'],
                    'Checkin',
                    [
                        [
                            'DTT_ID' => $DTT_ID
                        ]
                    ]
                );
                /** @var EE_Datetime $datetime */
                $datetime = EEM_Datetime::instance()->get_one_by_ID($DTT_ID);
                $checkin_rows = EEM_Checkin::instance()->get_all(
                    [
                        [
                            'REG_ID' => $reg_row['Registration.REG_ID'],
                            'DTT_ID' => $datetime->get('DTT_ID'),
                        ],
                    ]
                );
                $checkins = [];
                foreach ($checkin_rows as $checkin_row) {
                    /** @var EE_Checkin $checkin_row */
                    $checkin_value = CheckinsCSV::getCheckinValue($checkin_row);
                    if ($checkin_value) {
                        $checkins[] = $checkin_value;
                    }
                }
                $datetime_name = CheckinsCSV::getDatetineLabel($datetime);
                $reg_csv_array[ (string) $datetime_name ] = implode(' --- ', $checkins);
            } elseif ($event_id) {
                // get whether or not the user has checked in
                $reg_csv_array[ (string) esc_html__('Event Check-ins #', 'event_espresso') ] = $reg_model->count_related(
                    $reg_row['Registration.REG_ID'],
                    'Checkin'
                );
                $datetimes = EEM_Datetime::instance()->get_all(
                    [
                        [
                            'Ticket.TKT_ID' => $reg_row['Ticket.TKT_ID'],
                        ],
                        'order_by' => ['DTT_EVT_start' => 'ASC'],
                        'default_where_conditions' => 'none',
                    ]
                );
                foreach ($datetimes as $datetime) {
                    /** @var EE_Checkin $checkin_row */
                    $checkin_row = EEM_Checkin::instance()->get_one(
                        [
                            [
                                'REG_ID' => $reg_row['Registration.REG_ID'],
                                'DTT_ID' => $datetime->get('DTT_ID'),
                            ],
                            'limit' => 1,
                            'order_by' => [
                                'CHK_ID' => 'DESC'
                            ]
                        ]
                    );
                    $checkin_value = CheckinsCSV::getCheckinValue($checkin_row);
                    $datetime_name = CheckinsCSV::getDatetineLabel($datetime);
                    $reg_csv_array[ (string) $datetime_name ] = $checkin_value;
                }
            }
            /**
             * Filter to change the contents of each row of the registrations report CSV file.
             * This can be used to add or remote columns from the CSV file, or change their values.
             * Note when using: all rows in the CSV should have the same columns.
             * @param array $reg_csv_array keys are the column names, values are their cell values
             * @param array $reg_row one entry from EEM_Registration::get_all_wpdb_results()
             */
            $registrations_csv_ready_array[] = apply_filters(
                'FHEE__EventEspressoBatchRequest__JobHandlers__RegistrationsReport__reg_csv_array',
                $reg_csv_array,
                $reg_row
            );
        }
        // if we couldn't export anything, we want to at least show the column headers
        if (empty($registrations_csv_ready_array)) {
            $reg_csv_array = [];
            $model_and_fields_to_include = [
                'Registration' => $reg_fields_to_include,
                'Attendee'     => $att_fields_to_include,
            ];
            foreach ($model_and_fields_to_include as $model_name => $field_list) {
                $model = EE_Registry::instance()->load_model($model_name);
                foreach ($field_list as $field_name) {
                    $field = $model->field_settings_for($field_name);
                    $reg_csv_array[ EEH_Export::get_column_name_for_field($field) ] = null;
                }
            }
            $registrations_csv_ready_array[] = $reg_csv_array;
        }
        return $registrations_csv_ready_array;
    }


    /**
     * Counts total unit to process
     *
     * @param array $query_params
     * @return int
     * @throws EE_Error
     */
    public function count_units_to_process($query_params)
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
     * @throws EE_Error
     */
    public function cleanup_job(JobParameters $job_parameters)
    {
        $this->_file_helper->delete(
            EEH_File::remove_filename_from_filepath($job_parameters->extra_datum('filepath')),
            true,
            'd'
        );
        return new JobStepResponse($job_parameters, esc_html__('Cleaned up temporary file', 'event_espresso'));
    }
}
