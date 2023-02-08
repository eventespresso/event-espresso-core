<?php

namespace EventEspressoBatchRequest\JobHandlerBaseClasses;

use EventEspressoBatchRequest\Helpers\BatchRequestException;
use EventEspressoBatchRequest\Helpers\JobParameters;
use EventEspressoBatchRequest\Helpers\JobStepResponse;

/**
 * Class JobHandler
 * Base class for common implementations of JobHandlerInterface.
 *
 * @package               Event Espresso
 * @subpackage            batch
 * @author                Mike Nelson
 * @since                 4.8.26
 */
abstract class JobHandler implements JobHandlerInterface
{
    /**
     * @var array
     */
    protected $feedback = [];

    /**
     * incoming Request data
     *
     * @var array
     */
    protected $request_data = [];

    /**
     * Extra data to include as part of the response, literally gets set as JobStepResponse::$_extra_data
     *
     * @var array
     */
    protected $response_data = [];


    /**
     * utilized in newer batch job implementations, but forwarding to existing methods for now.
     * Performs any necessary setup for starting the job. This is also a good
     * place to setup the $job_arguments which will be used for subsequent HTTP requests
     * when continue_job will be called
     *
     * @param JobParameters $job_parameters
     * @return JobStepResponse
     * @throws BatchRequestException
     * @since $VID:$
     */
    public function createJob($job_parameters)
    {
        return $this->create_job($job_parameters);
    }


    /**
     * utilized in newer batch job implementations, but forwarding to existing methods for now.
     * Performs another step of the job
     *
     * @param JobParameters $job_parameters
     * @param int           $batch_size
     * @return JobStepResponse
     * @throws BatchRequestException
     * @since $VID:$
     */
    public function continueJob($job_parameters, $batch_size = 50)
    {
        return $this->continue_job($job_parameters, $batch_size);
    }


    /**
     * utilized in newer batch job implementations, but forwarding to existing methods for now.
     * used to advance from one batch job to another
     * primarily used for executing a job assessment phase where an accurate count of items to update can be made,
     * followed by the actual update job.
     *
     * @param JobParameters $job_parameters
     * @return JobStepResponse
     * @since $VID:$
     */
    public function advanceJob($job_parameters)
    {
        return $this->advance_job($job_parameters);
    }

    // phpcs:disable PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    /**
     * used to advance from one batch job to another
     * primarily used for executing a job assessment phase where an accurate count of items to update can be made,
     * followed by the actual update job.
     * By default, this function won't do anything until overridden in a chile class.
     *
     * @param JobParameters $job_parameters
     * @return JobStepResponse
     * @since $VID:$
     */
    public function advance_job($job_parameters)
    {
        $job_parameters->set_status(JobParameters::status_continue);
        return new JobStepResponse($job_parameters, $this->feedback);
    }


    /**
     * utilized in newer batch job implementations, but forwarding to existing methods for now.
     * Performs any clean-up logic when we know the job is completed
     *
     * @param JobParameters $job_parameters
     * @return JobStepResponse
     * @throws BatchRequestException
     * @since $VID:$
     */
    public function cleanupJob($job_parameters)
    {
        return $this->cleanup_job($job_parameters);
    }


    /**
     * @return array
     */
    public function requestData()
    {
        return $this->request_data;
    }


    /**
     * @return mixed
     */
    public function getRequestData($key)
    {
        return isset($this->request_data[ $key ]) ? $this->request_data[ $key ] : null;
    }


    /**
     * @param array $request_data
     * @return void
     */
    public function setRequestData($request_data)
    {
        $this->request_data = $request_data;
    }


    /**
     * @return array
     */
    public function responseData()
    {
        return $this->response_data;
    }


    /**
     * @param array $response_data
     * @return void
     */
    public function addResponseData($response_data)
    {
        $this->response_data += $response_data;
    }



    /**
     * @param array $response_data
     * @return void
     */
    public function setResponseData($response_data)
    {
        $this->response_data = $response_data;
    }




    /**
     * @param int $processed
     * @param string $custom_message
     */
    protected function displayJobStepResults($processed, $custom_message = '')
    {
        $this->feedback[] = '
			<div class="ee-batch-job-step-results">
			' . $this->infoWrapper(
            sprintf(
                $custom_message !== ''
                        ? $custom_message
                        : esc_html__('processed this batch: %d', 'event_espresso'),
                $processed
            )
        ) . '
			</div>';
    }


    /**
     * @param JobParameters $job_parameters
     * @param string $custom_message
     */
    protected function displayJobFinalResults($job_parameters, $custom_message = '')
    {
        if ($job_parameters->status() === JobParameters::status_complete) {
            $this->feedback[] = '
			<div class="ee-batch-job-final-results">
				' . $this->okWrapper(
                sprintf(
                    $custom_message !== ''
                            ? $custom_message
                            : esc_html__('total units processed: %d', 'event_espresso'),
                    $job_parameters->units_processed()
                )
            ) . '
				' . $this->jobStatusNotice($job_parameters) . '
			</div>';
        }
    }


    /**
     * @param JobParameters $job_parameters
     * @return string
     */
    protected function jobStatusNotice($job_parameters)
    {
        switch ($job_parameters->status()) {
            case JobParameters::status_cleaned_up:
            case JobParameters::status_continue:
            case JobParameters::status_pause:
                break;
            case JobParameters::status_complete:
                return $this->successWrapper('job status: COMPLETE');
            case JobParameters::status_error:
                return $this->errorWrapper('job status: ERROR');
        }
        return '';
    }


    /**
     * @param string $update_text
     */
    protected function updateText($update_text)
    {
        $this->feedback[] = "<p class='ee-batch-job-update'>$update_text</p>";
    }


    /**
     * @param string $update_text
     */
    protected function updateTextHeader($update_text)
    {
        $this->feedback[] = "<h4 class='ee-batch-job-update-heading'>$update_text</h4>";
    }


    /**
     * @param string $update_text
     * @return string
     */
    protected function attentionWrapper($update_text)
    {
        return "<span class='ee-status-outline ee-status-bg--attention'>$update_text</span>";
    }


    /**
     * @param string $update_text
     * @return string
     */
    protected function errorWrapper($update_text)
    {
        return "<span class='ee-status-outline ee-status-bg--error'>$update_text</span>";
    }


    /**
     * @param string $update_text
     * @return string
     */
    protected function infoWrapper($update_text)
    {
        return "<span class='ee-status-outline ee-status-bg--info'>$update_text</span>";
    }


    /**
     * @param string $update_text
     * @return string
     */
    protected function okWrapper($update_text)
    {
        return "<span class='ee-status-outline ee-status-bg--ok'>$update_text</span>";
    }


    /**
     * @param string $update_text
     * @return string
     */
    protected function successWrapper($update_text)
    {
        return "<span class='ee-status-outline ee-status-bg--success'>$update_text</span>";
    }


    /**
     * @param string $update_text
     * @return string
     */
    protected function warningWrapper($update_text)
    {
        return "<span class='ee-status-outline ee-status-bg--warning'>$update_text</span>";
    }


    /**
     * @return string
     */
    protected function spinner()
    {
        return '<span class="spinner"></span>';
    }
}
