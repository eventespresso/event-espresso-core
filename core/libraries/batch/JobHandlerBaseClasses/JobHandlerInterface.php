<?php

namespace EventEspresso\core\libraries\batch\JobHandlerBaseClasses;

use EventEspresso\core\libraries\batch\Helpers\BatchRequestException;
use EventEspresso\core\libraries\batch\Helpers\JobParameters;
use EventEspresso\core\libraries\batch\Helpers\JobStepResponse;

/**
 * JobHandlerInterface
 *
 * Interface describing classes that BatchRunner can send jobs to for processing.
 * Takes care of initiating the job after it's been assigned an ID,
 * processing the job across multiple HTTP requests, and then wrapping up the job
 * when completed
 *
 * @package             Event Espresso
 * @subpackage          batch
 * @author              Mike Nelson
 * @since               4.8.26
 *
 */
interface JobHandlerInterface
{
    /**
     * Performs any necessary setup for starting the job. This is also a good
     * place to set up the $job_arguments which will be used for subsequent HTTP requests
     * when continue_job will be called
     *
     * @param JobParameters $job_parameters
     * @return JobStepResponse
     * @throws BatchRequestException
     */
    public function create_job(JobParameters $job_parameters): JobStepResponse;


    /**
     * Performs another step of the job
     *
     * @param JobParameters $job_parameters
     * @param int           $batch_size
     * @return JobStepResponse
     * @throws BatchRequestException
     */
    public function continue_job(JobParameters $job_parameters, int $batch_size = 50): JobStepResponse;


    /**
     * used to advance from one batch job to another
     * primarily used for executing a job assessment phase where an accurate count of items to update can be made,
     * followed by the actual update job.
     *
     * @param JobParameters $job_parameters
     * @return JobStepResponse
     * @throws BatchRequestException
     */
    public function advance_job(JobParameters $job_parameters): JobStepResponse;


    /**
     * Performs any clean-up logic when we know the job is completed
     *
     * @param JobParameters $job_parameters
     * @return JobStepResponse
     * @throws BatchRequestException
     */
    public function cleanup_job(JobParameters $job_parameters): JobStepResponse;


    /**
     * Performs any necessary setup for starting the job. This is also a good
     * place to set up the $job_arguments which will be used for subsequent HTTP requests
     * when continue_job will be called
     *
     * @param JobParameters $job_parameters
     * @return JobStepResponse
     * @throws BatchRequestException
     */
    public function createJob(JobParameters $job_parameters): JobStepResponse;


    /**
     * Performs another step of the job
     *
     * @param JobParameters $job_parameters
     * @param int           $batch_size
     * @return JobStepResponse
     * @throws BatchRequestException
     */
    public function continueJob(JobParameters $job_parameters, int $batch_size = 50): JobStepResponse;


    /**
     * used to advance from one batch job to another
     * primarily used for executing a job assessment phase where an accurate count of items to update can be made,
     * followed by the actual update job.
     *
     * @param JobParameters $job_parameters
     * @return JobStepResponse
     * @throws BatchRequestException
     */
    public function advanceJob(JobParameters $job_parameters): JobStepResponse;


    /**
     * Performs any clean-up logic when we know the job is completed
     *
     * @param JobParameters $job_parameters
     * @return JobStepResponse
     * @throws BatchRequestException
     */
    public function cleanupJob(JobParameters $job_parameters): JobStepResponse;
}
