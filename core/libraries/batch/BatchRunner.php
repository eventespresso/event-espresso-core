<?php 
 /**
 *
 * Class BatchRunner
 *
 * Responsible for receiving a request to start a job and assign it a job Id.
 * Then when subsequent requests come in to continue that job, dispatches
 * the request to the appropriate JobHandler, which processes a step of the batch,
 * and then returns the job's new status. 
 * This class is used by controller code, and the controller code is sent HTTP
 * requests from the batch_runner.js library
 *
 * @package         Event Espresso
 * @subpackage    batch
 * @author				Mike Nelson
 * @since		 	   $VID:$
 *
 */
namespace EventEspressoBatchRequest;
if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }

use EventEspressoBatchRequest\JobHandlerBaseClasses\JobHandlerInterface;
use EventEspressoBatchRequest\Helpers\BatchRequestException;
use EventEspressoBatchRequest\Helpers\JobParameters;
use EventEspressoBatchRequest\Helpers\JobStepResponse;

class BatchRunner {
	
	/**
	 * Creates a job for the specified batch handler class (which should be autoloaded)
	 * and the specified request data
	 * @param string $batch_job_handler_class of an auto-loaded class implementing JobHandlerInterface
	 * @param array $request_data to be used by the batch job handler
	 * @return JobStepResponse
	 * @throws BatchRequestException
	 */
	public function create_job( $batch_job_handler_class, $request_data ) {
		$job_id = wp_generate_password( 15, false );
		$obj = $this->instantiate_batch_job_handler_from_classname( $batch_job_handler_class );
		$job_parameters = new JobParameters( $job_id, $batch_job_handler_class, $request_data );
		$response = $obj->create_job( $job_parameters );
		if( ! $response instanceof JobStepResponse ) {
			throw new BatchRequestException( 
					sprintf( 
						__( 'The class implementing JobHandlerInterface did not return a JobStepResponse when create_job was called with $1%s. It needs to return one or throw an Exception', 'event_espresso' ),
						wp_json_encode( $request_data ) ) );
		}
		$success = $job_parameters->save( true );
		if( ! $success ) {
			throw new BatchRequestException(
				sprintf( 
					__('Could not save job %1$s to the Wordpress Options table. These were the arguments used: %2$s', 'event_espresso'),
					$job_id,
						wp_json_encode( $request_data )
					) );
		}
		return $response;
	}
	
	/**
	 * Retrieves the job's arguments
	 * @param string $job_id
	 * @param int $batch_size
	 * @return JobStepResponse
	 * @throws BatchRequestException
	 */
	public function continue_job( $job_id, $batch_size = 50 ) {
		$batch_size = defined( 'EE_BATCHRUNNER_BATCH_SIZE' ) ? EE_BATCHRUNNER_BATCH_SIZE : $batch_size;
		//get the corresponding worpdress option for the job
		$job_parameters = JobParameters::load( $job_id );
		$handler_obj = $this->instantiate_batch_job_handler_from_classname( $job_parameters->classname() );
		//continue it
		$response = $handler_obj->continue_job( $job_parameters, $batch_size );
		if( ! $response instanceof JobStepResponse ) {
			throw new BatchRequestException( 
					sprintf( 
						__( 'The class implementing JobHandlerInterface did not return a JobStepResponse when continue_job was called with job $1%s. It needs to return one or throw an Exception', 'event_espresso' ),
						$job_id ) );
		}
		$job_parameters->save();
		return $response;
	}
	
	/**
	 * Instantiates an object of type $classname, which implements
	 * JobHandlerInterface
	 * @param string $classname
	 * @return JobHandlerInterface
	 * @throws BatchRequestException
	 */
	public function instantiate_batch_job_handler_from_classname( $classname ) {
		if( ! class_exists( $classname ) ) {
			throw new BatchRequestException(
					sprintf( 
						__('The class %1$s does not exist, and so could not be used for running a job. It should implement JobHandlerInterface.', 'event_espresso'),
						$classname
						) );
			
		}
		$obj = new $classname;
		if( ! $obj instanceof JobHandlerInterface ) {
			throw new BatchRequestException(
				sprintf( 
					__('The class %1$s does not implement JobHandlerInterface and so could not be used for running a job', 'event_espresso'),
					$classname
					) );
			
		}
		return $obj;
	}
	/**
	 * Forces a job to be cleaned up
	 * @param string $job_id
	 * @return JobStepResponse
	 */
	public function cleanup_job( $job_id ) {
		$job_parameters = JobParameters::load( $job_id );
		$handler_obj = $this->instantiate_batch_job_handler_from_classname( $job_parameters->classname() );
		//continue it
		$response = $handler_obj->cleanup_job( $job_parameters );
		if( ! $response instanceof JobStepResponse ) {
			throw new BatchRequestException( 
					sprintf( 
						__( 'The class implementing JobHandlerInterface did not return a JobStepResponse when cleanup_job was called with job $1%s. It needs to return one or throw an Exception', 'event_espresso' ),
						$job_id ) );
		}
		$job_parameters->set_status( JobParameters::status_cleaned_up );
		$job_parameters->delete();
		return $response;
		
	}
}

