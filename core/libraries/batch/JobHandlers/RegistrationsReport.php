<?php namespace EventEspressoBatchRequest\JobHandlers;
use EventEspressoBatchRequest\JobHandlerBaseClasses\JobHandlerFile;
use EventEspressoBatchRequest\Helpers\BatchRequestException;
use EventEspressoBatchRequest\Helpers\JobParameters;
/* 
 * Generates the registrations report for the specified event,
 * or for all events
 */

class RegistrationsReport extends JobHandlerFile {
	/**
	 * Performs any necessary setup for starting the job. This is also a good
	 * place to setup the $job_arguments which will be used for subsequent HTTP requests
	 * when continue_job will be called
	 * @param JobParameters $job_parameters
	 * @throws BatchRequestException
	 * @return array updated job arguments to be used when continuing and finishing the job
	 */
	public function start_job( JobParameters $job_parameters ) {
		$event_id = intval( $job_parameters->request_datum( 'EVT_ID', '0' ) );
		$filepath = $this->create_file_from_job_with_name($job_parameters->job_id(), $this->get_filename_from_event( $event_id ));
		echo "filepath $filepath";
		die;
		$job_parameters->add_extra_data( 'filepath', $filepath );
		//we should count how much there is to do too
	}
	
	/**
	 * Creates teh filename form the event id (or lack thereof)
	 * @param int $event_id
	 * @return string
	 */
	protected function get_filename_from_event( $event_id ) {
		if( $event_id ){
			$event_slug =  EEM_Event::instance()->get_var( array( array( 'EVT_ID' => $event_id ) ), 'EVT_slug' );
			if( ! $event_slug ) {
				$event_slug = __( 'unknown', 'event_espresso' );
			}
		}else{
			$event_slug = __( 'all', 'event_espresso' );
		}
		return sprintf( "registrations-for-%s.csv", $event_slug );
	}
	
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
	public function continue_job( JobParameters $job_parameters ) {
		echo "ocntinue job ";die;
	}
	
	/**
	 * Performs any clean-up logic when we know the job is completed
	 * @param JobParameters $job_parameters
	 * @return boolean
	 */
	public function finish_job( JobParameters $job_parameters ){
		
	}
}


