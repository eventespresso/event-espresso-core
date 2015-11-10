<?php namespace EventEspresso\Core\Libraries\Batch;

use EventEspresso\Core\Libraries\Batch\JobHandlers\JobHandlerInterface;
use EventEspresso\Core\Libraries\Batch\Helpers\JobHandlerException;

/* 
 * Responsible for receiving a request to start a job and assign it a job Id.
 * Then when subsequent requests come in to continue that job, dispatches
 * the request to the appropriate JobHandler, which processes a step of the batch,
 * and then returns the job's new status. 
 * This class is used by controller code, and the controller code is sent HTTP
 * requests from the batch_runner.js library
 */
class BatchRunner {
	
	const wp_option_prefix = 'ee_batch_runner_job_';
	/**
	 * Creates a job for the specified batch handler class (which should be autoloaded)
	 * and the specified request data
	 * @param string $batch_job_handler_class of an auto-loaded class implementing JobHandlerInterface
	 * @param array $request_data to be used by the batch job handler
	 * @return string job_id
	 * @throws JobHandlerException
	 */
	public function create_job( $batch_job_handler_class, $request_data ) {
		$job_id = wp_generate_password( 15, false );
		$obj = $this->instantiate_batch_job_handler_from_classname( $batch_job_handler_class );
		$original_job_arguments = array(
			'classname' => $batch_job_handler_class,
			'request_data' => $request_data
		);
		$job_arguments = $obj->start_job( $job_id, $original_job_arguments );
		$success = add_option( BatchRunner::wp_option_prefix . $job_id, $job_arguments, null, 'no' );
		if( ! $success ) {
			throw new JobHandlerException(
				sprintf( 
					__('Could not save job %1$s to the Wordpress Options table. These were the arguments used: %2$s', 'event_espresso'),
					$job_id,
						wp_json_encode( $job_arguments )
					) );
		}
		return $job_id;
	}
	
	/**
	 * Retrieves the job's arguments
	 * @param string $job_id
	 * @return array{
	 *	@type string $status
	 *	@type int $records_processed
	 *	@type int $records_to_process
	 *	@type string $message
	 * } and anything
	 * @throws JobHandlerException
	 */
	public function continue_job( $job_id ) {
		//get the corresponding worpdress option for the job
		$job_arguments = $this->retrieve_job_arguments( $job_id );
		$classname = isset( $job_arguments[ 'classname' ] ) ? $job_arguments[ 'classname' ] : '';
		//from that, get the batch job handler class and instantiate it
		$handler_obj = $this->instantiate_batch_job_handler_from_classname( $classname );
		//continue it
		$response = $handler_obj->continue_job( $job_id, $job_arguments );
		//if its done, call finish job on it
		if( isset( $response[ 'status' ] ) &&
				$response[ 'status' ] === JobHandlerInterface::status_complete ) {
			$handler_obj->finish_job( $job_id, $job_arguments );
		}
		return $response;
	}
	
	/**
	 * 
	 * @param type $job_id
	 * @return array {
	 *	@type string $classname name of the autoloaded class implementing JobHandlerInterface
	 *	@type int
	 * @throws JobHandlerException
	 */
	public function retrieve_job_arguments( $job_id ) {
		$job_arguments = get_option( BatchRunner::wp_option_prefix . $job_id );
		if( $job_arguments === false ) {
			throw new JobHandlerException(
				sprintf( 
					__('Could not retrieve job %1$s from the Wordpress options table, and so the job could not continue.', 'event_espresso'),
					$job_id
					) );
		}
		return $job_arguments;
	}
	
	/**
	 * Instantiates an object of type $classname, which implements
	 * JobHandlerInterface
	 * @param string $classname
	 * @return JobHandlerInterface
	 * @throws JobHandlerException
	 */
	public function instantiate_batch_job_handler_from_classname( $classname ) {
		if( ! class_exists( $classname ) ) {
			throw new JobHandlerException(
					sprintf( 
						__('The class %1$s does not exist, and so could not be used for running a job. It should implement JobHandlerInterface.', 'event_espresso'),
						$classname
						) );
			
		}
		$obj = new $classname;
		if( ! $obj instanceof JobHandlerInterface ) {
			throw new JobHandlerException(
				sprintf( 
					__('The class %1$s does not implement JobHandlerInterface and so could not be used for running a job', 'event_espresso'),
					$classname
					) );
			
		}
		return $obj;
	}
	/**
	 * Forces a job to be cancelled
	 * @param string $job_id
	 * @return boolean success
	 */
	public function cancel_job( $job_id ) {
		$job_arguments = $this->retrieve_job_arguments( $job_id );
		$classname = isset( $job_arguments[ 'classname' ] ) ? $job_arguments[ 'classname' ] : '';
		//from that, get the batch job handler class and instantiate it
		$handler_obj = $this->instantiate_batch_job_handler_from_classname( $classname );
		//continue it
		return $handler_obj->finish_job( $job_id, $job_arguments );
	}
}

