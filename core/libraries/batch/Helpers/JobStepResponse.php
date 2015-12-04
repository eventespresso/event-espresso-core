<?php
/**
 *
 * Class JobStepResponse
 *
 * Response object describing the current state of a job
 *
 * @package         Event Espresso
 * @subpackage    batch
 * @author				Mike Nelson
 * @since		 	   4.8.26
 *
 */
namespace EventEspressoBatchRequest\Helpers;

if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }

class JobStepResponse {

	/**
	 * Description fo what happened during this step
	 * @var string
	 */
	protected $_update_text;

	/**
	 *
	 * @var JobParameters
	 */
	protected $_job_parameters;

	/**
	 * Extra data to include as part of the response.
	 * @var array
	 */
	protected $_extra_data = array();



	/**
	 *
	 * @param \EventEspressoBatchRequest\Helpers\JobParameters $job_parameters
	 * @param string $update_text
	 * @param array $extra_data
	 */
	public function __construct(JobParameters $job_parameters, $update_text, $extra_data = array() ) {
		$this->_job_parameters 	= $job_parameters;
		$this->_update_text 	= $update_text;
		$this->_extra_data 		= (array)$extra_data;
	}



	/**
	 *
	 * @return JobParameters
	 */
	public function job_parameters() {
		return $this->_job_parameters;
	}



	/**
	 * Gets the update_text of what happened in this job during the current step
	 * @return string
	 */
	public function update_text() {
		return $this->_update_text;
	}



	/**
	 * Returns any extra data we may want to include with this response
	 * @return array
	 */
	public function extra_data() {
		return $this->_extra_data;
	}



	/**
	 * Converts this response into an array that can be easily serialized.
	 * This is most useful for serializing or json encoding
	 * @return array {
	 *	@type string $status, one of JobParameters::valid_stati()
	 *	@type int $units_processed count of units processed
	 *	@type int $job_size total number of units TO process
	 *	@type string $job_id unique string identifying the job
	 *	@type string $update_text string describing what happened during this step
	 * } and any other items from $this->extra_data()
	 */
	public function to_array() {
		return apply_filters(
			'FHEE__EventEspressoBatchRequest\Helpers\JobStepResponse__to_array__return',
			array_merge(
				$this->extra_data(),
				array(
					'status'          => $this->job_parameters()->status(),
					'units_processed' => $this->job_parameters()->units_processed(),
					'job_size'        => $this->job_parameters()->job_size(),
					'job_id'          => $this->job_parameters()->job_id(),
					'update_text'     => $this->update_text(),
				)
			),
			$this
		);
	}
}
