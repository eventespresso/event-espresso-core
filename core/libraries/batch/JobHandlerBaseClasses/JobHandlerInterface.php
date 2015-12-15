<?php
/**
 *
 * Class JobHandlerInterface
 *
 * Interface describing classes that BatchRunner can send jobs to for processing.
 * Takes care of initiating the job after it's been assigned an ID,
 * processing the job across multiple HTTP requests, and then wrapping up the job
 * when completed
 *
 * @package         Event Espresso
 * @subpackage    batch
 * @author				Mike Nelson
 * @since		 	   4.8.26
 *
 */
namespace EventEspressoBatchRequest\JobHandlerBaseClasses;

use EventEspressoBatchRequest\Helpers\BatchRequestException;
use EventEspressoBatchRequest\Helpers\JobParameters;
use EventEspressoBatchRequest\Helpers\JobStepResponse;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



interface JobHandlerInterface {
	/**
	 * Performs any necessary setup for starting the job. This is also a good
	 * place to setup the $job_arguments which will be used for subsequent HTTP requests
	 * when continue_job will be called
	 * @param JobParameters $job_parameters
	 * @throws BatchRequestException
	 * @return JobStepResponse
	 */
	public function create_job( JobParameters $job_parameters );

	/**
	 * Performs another step of the job
	 * @param JobParameters $job_parameters
	 * @param int $batch_size
	 * @return JobStepResponse
	 * @throws BatchRequestException
	 */
	public function continue_job( JobParameters $job_parameters, $batch_size = 50 );

	/**
	 * Performs any clean-up logic when we know the job is completed
	 * @param JobParameters $job_parameters
	 * @return JobStepResponse
	 * @throws BatchRequestException
	 */
	public function cleanup_job( JobParameters $job_parameters );
}
