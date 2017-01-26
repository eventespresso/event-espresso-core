<?php
/**
 *
 * Class JobParameters
 *
 * Class for storing information about a job. Takes care of serializing the
 * data for storing in a wordpress option
 *
 * @package         Event Espresso
 * @subpackage    batch
 * @author				Mike Nelson
 * @since		 	   4.8.26
 *
 */
namespace EventEspressoBatchRequest\Helpers;

if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }

class JobParameters {

	/**
	 * status indicating the job should continue
	 */
	const status_continue = 'continue';

	/**
	 * status indicated the job has been completed successfully and should be cleaned up next
	 */
	const status_complete = 'complete';

	/**
	 * status indicating there was an error and the job should be cleaned up
	 */
	const status_error = 'error';

	/**
	 * status indicating the job has been cleaned up, and so this is probably the last
	 * time you'll see this job
	 */
	const status_cleaned_up = 'cleaned_up';

	const wp_option_prefix = 'ee_job_parameters_';



	/**
	 * String uniquely identifying the job
	 * @var string
	 */
	protected $_job_id;

	/**
	 *
	 * @var string
	 */
	protected $_classname;

	/**
	 *
	 * @var array
	 */
	protected $_request_data;

	/**
	 * Array of any extra data we want to remember about this request, that
	 * wasn't necessarily past in with the request data
	 * @var array
	 */
	protected $_extra_data;

	/**
	 * Estimate of how many units HAVE been processed
	 * @var int
	 */
	protected $_units_processed = 0;

	/**
	 * @var string
	 */
	protected $_status;

	/**
	 * The size of the total job in whatever units you want.
	 * If you can't provide an estimate leave as 0.
	 * Once _units_processed equals _job_size, we should be done
	 * @var int
	 */
	protected $_job_size = 0;



	/**
	 *
	 * @param string $job_id
	 * @param string $classname
	 * @param array $request_data
	 * @param array $extra_data
	 */
	function __construct( $job_id, $classname, $request_data, $extra_data = array() ) {
		$this->set_job_id( $job_id );
		$this->set_classname( $classname );
		$this->set_request_data( $request_data );
		$this->set_extra_data( $extra_data );
		$this->set_status( JobParameters::status_continue );
	}



	/**
	 * Returns the array of strings of valid stati
	 * @return array
	 */
	public static function valid_stati() {
		return array(
			JobParameters::status_complete,
			JobParameters::status_continue,
			JobParameters::status_error,
			JobParameters::status_cleaned_up,
		);
	}



	/**
	 * Saves this option to the database (wordpress options table)
	 * @param boolean $first
	 * @return boolean success
	 */
	function save( $first = false ) {
		$object_vars = get_object_vars( $this );
		if( $first ) {
			return add_option( $this->option_name(), $object_vars, null, 'no' );
		} else{
			return update_option( $this->option_name(), $object_vars );
		}
	}



	/**
	 * Deletes the job from teh database, although this object is still usable
	 * for the rest of the request
	 * @return boolean
	 */
	function delete() {
		return delete_option( $this->option_name() );
	}



	/**
	 * Loads the specified job from the database
	 * @param string $job_id
	 * @return JobParameters
	 * @throws BatchRequestException
	 */
	static function load( $job_id ) {
		$job_parameter_vars = get_option( JobParameters::wp_option_prefix . $job_id );
		if(
			! is_array( $job_parameter_vars ) ||
			! isset( $job_parameter_vars[ '_classname' ] ) ||
			! isset( $job_parameter_vars[ '_request_data' ] )
		) {
			throw new BatchRequestException(
				sprintf(
					__('Could not retrieve job %1$s from the Wordpress options table, and so the job could not continue. The wordpress option was %2$s', 'event_espresso'),
					$job_id,
					get_option( JobParameters::wp_option_prefix . $job_id )
				)
			);
		}
		$job_parameters = new JobParameters(
				$job_id,
				$job_parameter_vars[ '_classname' ],
				$job_parameter_vars[ '_request_data'] );
		foreach( $job_parameter_vars as $key => $value ) {
			$job_parameters->{$key} = $value;
		}
		return $job_parameters;
	}



	/**
	 * Gets the job's unique string
	 * @return string
	 */
	function job_id() {
		return $this->_job_id;
	}



	/**
	 * Gets the classname that should run this job
	 * @return string
	 */
	function classname() {
		return $this->_classname;
	}



	/**
	 * Gets the original array of $_REQUEST data for this job
	 * @return array
	 */
	function request_data() {
		return $this->_request_data;
	}



	/**
	 * Gets a single item from the request data
	 * @param string $key
	 * @param string|array $default
	 * @return string|array
	 */
	function request_datum( $key, $default = '' ) {
		if( isset( $this->_request_data[ $key ] ) ) {
			return $this->_request_data[ $key ];
		} else {
			return $default;
		}
	}



	/**
	 * Gets a single item from the extra data
	 * @param string $key
	 * @param string|array $default
	 * @return string|array
	 */
	function extra_datum( $key, $default = '' ) {
		if( isset( $this->_extra_data[ $key ] ) ) {
			return $this->_extra_data[ $key ];
		} else {
			return $default;
		}
	}



	/**
	 * Adds an extra piece of extra data that we're going to want later during the job
	 * @param string $key
	 * @param string|int|array|null $value almost any extra data you want to store
	 */
	function add_extra_data( $key, $value ) {
		$this->_extra_data[ $key ] = $value;
	}



	/**
	 * Array of any extra data we want to store
	 * @return array
	 */
	function extra_data() {
		return $this->_extra_data;
	}



	/**
	 * Returns the job size, in whatever units you want
	 * @return int
	 */
	function job_size() {
		return $this->_job_size;
	}



	/**
	 * Sets the job size. You decide what units to use
	 * @param int $size
	 */
	function set_job_size( $size ) {
		$this->_job_size = $size;
	}



	/**
	 * The number of "units" processed, in the same units as the "job size"
	 * @return int
	 */
	function units_processed() {
		return $this->_units_processed;
	}



	/**
	 * Marks more units as processed
	 * @param int $newly_processed
	 * @return int updated units processed
	 */
	function mark_processed( $newly_processed ) {
		$this->_units_processed += $newly_processed;
		return $this->_units_processed;
	}



	/**
	 * Sets the total count of units processed. You might prefer to use mark_processed
	 * @param int $total_units_processed
	 */
	function set_units_processed( $total_units_processed ) {
		$this->_units_processed = $total_units_processed;
	}



	/**
	 * Sets the job's ID
	 * @param string $job_id
	 */
	function set_job_id( $job_id ) {
		$this->_job_id = $job_id;
	}



	/**
	 * sets the classname
	 * @param string $classname
	 */
	function set_classname( $classname ) {
		$this->_classname = $classname;
	}



	/**
	 * Sets the request data
	 * @param array $request_data
	 */
	function set_request_data( $request_data ) {
		$this->_request_data = $request_data;
	}



	/**
	 * Sets the array of extra data we want to store on this request
	 * @param array $extra_data
	 */
	function set_extra_data( $extra_data ) {
		$this->_extra_data = $extra_data;
	}



	/**
	 * Gets the name of the wordpress option that should store these job parameters
	 * @return string
	 */
	function option_name() {
		return JobParameters::wp_option_prefix . $this->job_id();
	}



	/**
	 * Gets the job\s current status. One of JobParameters::valid_stati();
	 * @return string
	 */
	public function status() {
		return $this->_status;
	}



	/**
	 *
	 * @param string $status on eof JobParameters::valid_stati()
	 */
	public function set_status( $status ) {
		$this->_status = $status;
	}



}

