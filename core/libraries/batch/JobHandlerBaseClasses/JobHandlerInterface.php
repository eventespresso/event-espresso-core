<?php 
namespace EventEspressoBatch\JobHandlerBaseClasses;
use EventEspressoBatch\Helpers\JobHandlerException;

/* 
 * Interface describing classes that BatchRunner can send jobs to for processing.
 * Takes care of initiating the job after it's been assigned an ID,
 * processing the job across multiple HTTP requests, and then wrapping up the job
 * when completed
 */
interface JobHandlerInterface {
	const status_continue = 'continue';
	const status_complete = 'complete';
	const status_error = 'error';
	/**
	 * Performs any necessary setup for starting the job. This is also a good
	 * place to setup the $job_arguments which will be used for subsequent HTTP requests
	 * when continue_job will be called
	 * @param string $job_id
	 * @throws \helpers\JobHandlerException
	 * @return array updated job arguments to be used when continuing and finishing the job
	 */
	public function start_job( $job_id, $job_arguments );
	
	/**
	 * Performs another step of the job
	 * @param string $job_id
	 * @param array $job_arguments 
	 * @return array{
	 *	@type string $status
	 *	@type int $records_processed
	 *	@type int $records_to_process
	 *	@type string message
	 * } and anything more we want to add
	 * @throws 
	 */
	public function continue_job( $job_id, $job_arguments );
	
	/**
	 * Performs any clean-up logic when we know the job is completed
	 * @param string $job_id
	 * @param array $job_arguments
	 * @return boolean
	 */
	public function finish_job( $job_id, $job_arguments );
}
