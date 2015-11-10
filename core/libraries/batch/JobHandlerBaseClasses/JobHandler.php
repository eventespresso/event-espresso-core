<?php 
namespace EventEspressoBatchRequest\JobHandlerBaseClasses;
use EventEspressoBatchRequest\JobHandlerBaseClasses\JobHandlerInterface;
use EventEspressoBatchRequest\Helpers\JobParameters;

/* 
 * Base class for common implementations of JobHandlerInterface.
 */
abstract class JobHandler implements JobHandlerInterface {
	/**
	 * Performs any necessary setup for starting the job. This is also a good
	 * place to setup the $job_arguments which will be used for subsequent HTTP requests
	 * when continue_job will be called
	 * @param JobParameters $job_parameters
	 * @throws \helpers\BatchRequestException
	 * @return array updated job arguments to be used when continuing and finishing the job
	 */
	abstract public function start_job( JobParameters $job_parameters );
	
	/**
	 * Performs another step of the job
	 * @param JobParameters $job_parameters
	 * @return array{
	 *	@type string $status
	 *	@type int $records_processed
	 *	@type int $records_to_process
	 *	@type string message
	 * } and anything more we want to add
	 * @throws 
	 */
	abstract public function continue_job( JobParameters $job_parameters );
	
	/**
	 * Performs any clean-up logic when we know the job is completed
	 * @param string $job_id
	 * @param array $job_arguments
	 * @return boolean
	 */
	abstract public function finish_job( JobParameters $job_parameters );
}

