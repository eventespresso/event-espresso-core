<?php

namespace EventEspresso\core\libraries\batch\JobHandlers;

use EE_Capabilities;
use EE_Error;
use EEH_Export;
use EEH_File;
use EEM_Attendee;
use EEM_Base;
use EEM_Country;
use EEM_State;
use EventEspresso\core\libraries\batch\JobHandlerBaseClasses\JobHandlerFile;
use EventEspresso\core\libraries\batch\Helpers\BatchRequestException;
use EventEspresso\core\libraries\batch\Helpers\JobParameters;
use EventEspresso\core\libraries\batch\Helpers\JobStepResponse;
use ReflectionException;

/**
 * Class {name}
 * Description here
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 * @since                 4.8.26
 */
class AttendeesReport extends JobHandlerFile
{
    // phpcs:disable PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    /**
     * @param JobParameters $job_parameters
     * @return JobStepResponse
     * @throws BatchRequestException
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function create_job(JobParameters $job_parameters): JobStepResponse
    {
        if (! EE_Capabilities::instance()->current_user_can('ee_read_contacts', 'generating_report')) {
            throw new BatchRequestException(
                esc_html__('You do not have permission to view contacts', 'event_espresso')
            );
        }
        $filepath = $this->create_file_from_job_with_name(
            $job_parameters->job_id(),
            esc_html__('contact-list-report.csv', 'event_espresso')
        );
        $job_parameters->add_extra_data('filepath', $filepath);
        $job_parameters->set_job_size($this->count_units_to_process());
        // we should also set the header columns
        $csv_data_for_row = $this->get_csv_data(0, 1);
        EEH_Export::write_data_array_to_csv($filepath, $csv_data_for_row);
        // if we actually processed a row there, record it
        if ($job_parameters->job_size()) {
            $job_parameters->mark_processed(1);
        }
        return new JobStepResponse(
            $job_parameters,
            esc_html__('Contacts report started successfully...', 'event_espresso')
        );
    }


    /**
     * @param JobParameters $job_parameters
     * @param int           $batch_size
     * @return JobStepResponse
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function continue_job(JobParameters $job_parameters, int $batch_size = 50): JobStepResponse
    {
        $csv_data = $this->get_csv_data($job_parameters->units_processed(), $batch_size);
        EEH_Export::write_data_array_to_csv(
            $job_parameters->extra_datum('filepath'),
            $csv_data,
            false
        );
        $units_processed = count($csv_data);
        $job_parameters->mark_processed($units_processed);
        $extra_response_data = [
            'file_url' => '',
        ];
        if ($units_processed < $batch_size) {
            $job_parameters->set_status(JobParameters::status_complete);
            $extra_response_data['file_url'] = $this->get_url_to_file($job_parameters->extra_datum('filepath'));
        }
        return new JobStepResponse(
            $job_parameters,
            sprintf(
                esc_html__('Wrote %1$s rows to report CSV file...', 'event_espresso'),
                count($csv_data)
            ),
            $extra_response_data
        );
    }


    /**
     * @param JobParameters $job_parameters
     * @return JobStepResponse
     */
    public function cleanup_job(JobParameters $job_parameters): JobStepResponse
    {
        $this->_file_helper->delete(
            EEH_File::remove_filename_from_filepath($job_parameters->extra_datum('filepath')),
            true,
            'd'
        );
        return new JobStepResponse($job_parameters, esc_html__('Cleaned up temporary file', 'event_espresso'));
    }


    /**
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function count_units_to_process(): int
    {
        return EEM_Attendee::instance()->count(['caps' => EEM_Base::caps_read_admin]);
    }


    /**
     * @param $offset
     * @param $limit
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_csv_data($offset, $limit): array
    {
        $attendee_rows = EEM_Attendee::instance()->get_all_wpdb_results(
            [
                'limit'      => [$offset, $limit],
                'force_join' => ['State', 'Country'],
                'caps'       => EEM_Base::caps_read_admin,
            ]
        );
        $csv_data      = [];
        foreach ($attendee_rows as $attendee_row) {
            $csv_row = [];
            foreach (EEM_Attendee::instance()->field_settings() as $field_name => $field_obj) {
                if ($field_name == 'STA_ID') {
                    $state_name_field                                 =
                        EEM_State::instance()->field_settings_for('STA_name');
                    $csv_row[ esc_html__('State', 'event_espresso') ] =
                        $attendee_row[ $state_name_field->get_qualified_column() ];
                } elseif ($field_name == 'CNT_ISO') {
                    $country_name_field                                 =
                        EEM_Country::instance()->field_settings_for('CNT_name');
                    $csv_row[ esc_html__('Country', 'event_espresso') ] =
                        $attendee_row[ $country_name_field->get_qualified_column() ];
                } else {
                    $csv_row[ wp_specialchars_decode($field_obj->get_nicename(), ENT_QUOTES) ] =
                        $attendee_row[ $field_obj->get_qualified_column() ];
                }
            }
            $csv_data[] = apply_filters(
                'FHEE___EventEspresso_core_libraries_batch_JobHandlers_AttendeesReport__get_csv_data__row',
                $csv_row,
                $attendee_row
            );
        }
        return $csv_data;
    }
}
