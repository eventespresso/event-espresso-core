<?php namespace EventEspressoBatchRequest\Helpers;

/* 
 * Class for storing information about a job. Takes care of serializing the
 * data for storing in a wordpress option
 */

class JobParameters {
	
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
	}
	
	/**
	 * Saves this option to the database (wordpress options table)
	 * @param boolean $first
	 * @return boolean success
	 */
	function save( $first = false ) {
		if( $first ) {
			return add_option( $this->option_name(), $this, null, 'no' );
		} else{
			return update_option( $this->option_name(), $this );
		}
	}
	
	/**
	 * Loads the specified job from the database
	 * @param string $job_id
	 * @return JobParameters
	 * @throws BatchRequestException
	 */
	static function load( $job_id ) {
		$job_parameters = get_option( BatchRunner::wp_option_prefix . $job_id );
		if( $job_parameters === false ) {
			throw new BatchRequestException(
				sprintf( 
					__('Could not retrieve job %1$s from the Wordpress options table, and so the job could not continue.', 'event_espresso'),
					$job_id
					) );
		}
		return $job_parameters;
	}
	
	/**
	 * Gets the naem of the wordpress option that should store these job parameters
	 * @return string
	 */
	function option_name() {
		return JobParameters::wp_option_prefix . $this->job_id();
	}
}

