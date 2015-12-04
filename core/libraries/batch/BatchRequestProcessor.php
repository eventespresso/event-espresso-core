<?php
 /**
 *
 * Class BatchRequetProcessor
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
 * @since		 	   4.8.26
 *
 */
namespace EventEspressoBatchRequest;

use EventEspressoBatchRequest\JobHandlerBaseClasses\JobHandlerInterface;
use EventEspressoBatchRequest\Helpers\BatchRequestException;
use EventEspressoBatchRequest\Helpers\JobParameters;
use EventEspressoBatchRequest\Helpers\JobStepResponse;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



class BatchRequestProcessor {

	/**
	 * Current job's ID (if assigned)
	 * @var string|null
	 */
	protected $_job_id;

	/**
	 * Current job's parameters
	 * @var JobParameters|null
	 */
	protected $_job_parameters;

	/**
	 * Creates a job for the specified batch handler class (which should be autoloaded)
	 * and the specified request data
	 * @param string $batch_job_handler_class of an auto-loaded class implementing JobHandlerInterface
	 * @param array $request_data to be used by the batch job handler
	 * @return JobStepResponse
	 */
	public function create_job( $batch_job_handler_class, $request_data ) {
		try {
			$this->_job_id = wp_generate_password( 15, false );
			$obj = $this->instantiate_batch_job_handler_from_classname( $batch_job_handler_class );
			$this->_job_parameters = new JobParameters( $this->_job_id, $batch_job_handler_class, $request_data );
			$response = $obj->create_job( $this->_job_parameters );
			if( ! $response instanceof JobStepResponse ) {
				throw new BatchRequestException(
					sprintf(
						__( 'The class implementing JobHandlerInterface did not return a JobStepResponse when create_job was called with %1$s. It needs to return one or throw an Exception', 'event_espresso' ),
						wp_json_encode( $request_data )
					)
				);
			}
			$success = $this->_job_parameters->save( true );
			if( ! $success ) {
				throw new BatchRequestException(
					sprintf(
						__('Could not save job %1$s to the Wordpress Options table. These were the arguments used: %2$s', 'event_espresso'),
						$this->_job_id,
						wp_json_encode( $request_data )
					)
				);
			}
		} catch( \Exception $e ) {
			$response = $this->_get_error_response( $e, 'create_job' );
		}
		return $response;
	}



	/**
	 * Retrieves the job's arguments
	 * @param string $job_id
	 * @param int $batch_size
	 * @return JobStepResponse
	 */
	public function continue_job( $job_id, $batch_size = 50 ) {
		try {
			$this->_job_id = $job_id;
			$batch_size = defined( 'EE_BATCHRUNNER_BATCH_SIZE' ) ? EE_BATCHRUNNER_BATCH_SIZE : $batch_size;
			//get the corresponding WordPress option for the job
			$this->_job_parameters = JobParameters::load( $this->_job_id );
			$handler_obj = $this->instantiate_batch_job_handler_from_classname( $this->_job_parameters->classname() );
			//continue it
			$response = $handler_obj->continue_job( $this->_job_parameters, $batch_size );
			if( ! $response instanceof JobStepResponse ) {
				throw new BatchRequestException(
					sprintf(
						__( 'The class implementing JobHandlerInterface did not return a JobStepResponse when continue_job was called with job %1$s. It needs to return one or throw an Exception', 'event_espresso' ),
						$this->_job_id
					)
				);
			}
			$this->_job_parameters->save();
		} catch( \Exception $e ) {
			$response = $this->_get_error_response( $e, 'continue_job' );
		}
		return $response;
	}



	/**
	 * Instantiates an object of type $classname, which implements
	 * JobHandlerInterface
	 *
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
				)
			);
		}
		$obj = new $classname;
		if( ! $obj instanceof JobHandlerInterface ) {
			throw new BatchRequestException(
				sprintf(
					__('The class %1$s does not implement JobHandlerInterface and so could not be used for running a job', 'event_espresso'),
					$classname
				)
			);
		}
		return $obj;
	}



	/**
	 * Forces a job to be cleaned up
	 *
	 * @param string $job_id
	 * @return JobStepResponse
	 * @throws BatchRequestException
	 */
	public function cleanup_job( $job_id ) {
		try{
			$this->_job_id = $job_id;
			$job_parameters = JobParameters::load( $this->_job_id );
			$handler_obj = $this->instantiate_batch_job_handler_from_classname( $job_parameters->classname() );
			//continue it
			$response = $handler_obj->cleanup_job( $job_parameters );
			if( ! $response instanceof JobStepResponse ) {
				throw new BatchRequestException(
					sprintf(
						__( 'The class implementing JobHandlerInterface did not return a JobStepResponse when cleanup_job was called with job %1$s. It needs to return one or throw an Exception', 'event_espresso' ),
						$this->_job_id
					)
				);
			}
			$job_parameters->set_status( JobParameters::status_cleaned_up );
			$job_parameters->delete();
			return $response;
		} catch( \Exception $e ) {
			$response = $this->_get_error_response( $e, 'cleanup_job' );
		}
		return $response;
	}



	/**
	 * Creates a valid JobStepResponse object from an exception and method name.
	 * @param \Exception $exception
	 * @param string $method_name
	 * @return JobStepResponse
	 */
	protected function _get_error_response( \Exception $exception, $method_name ) {
		if( ! $this->_job_parameters instanceof JobParameters ) {
			$this->_job_parameters = new JobParameters( $this->_job_id, __( '__Unknown__', 'event_espresso' ), array() );
		}
		$this->_job_parameters->set_status( JobParameters::status_error );
		return new JobStepResponse(
			$this->_job_parameters,
			sprintf(
				__('An exception of type %1$s occurred while running %2$s. Its message was %3$s and had trace %4$s', 'event_espresso'),
				get_class( $exception ),
				'BatchRunner::' . $method_name . '()',
				$exception->getMessage(),
				$exception->getTraceAsString()
			)
		);
	}


}

