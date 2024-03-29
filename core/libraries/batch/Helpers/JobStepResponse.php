<?php

namespace EventEspresso\core\libraries\batch\Helpers;

/**
 * Class JobStepResponse
 * Response object describing the current state of a job
 *
 * @package               Event Espresso
 * @subpackage            batch
 * @author                Mike Nelson
 * @since                 4.8.26
 */
class JobStepResponse
{
	// phpcs:disable PSR2.Classes.PropertyDeclaration.Underscore
    /**
     * Description fo what happened during this step
     *
     * @var array|string
     */
    protected $_update_text;

    /**
     * @var JobParameters
     */
    protected $_job_parameters;

    /**
     * Extra data to include as part of the response.
     *
     * @var array
     */
    protected $_extra_data = [];

	// phpcs:enable

	// phpcs:disable PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    /**
     * @param JobParameters $job_parameters
     * @param array|string  $update_text
     * @param array         $extra_data
     */
    public function __construct(JobParameters $job_parameters, $update_text = [], array $extra_data = [])
    {
        $this->_job_parameters = $job_parameters;
        $this->_update_text    = (array) $update_text;
        $this->_extra_data     = $extra_data;
    }


    /**
     * @return JobParameters
     */
    public function job_parameters(): JobParameters
    {
        return $this->_job_parameters;
    }


    /**
     * Gets the update_text of what happened in this job during the current step
     *
     * @return string
     */
    public function update_text(): string
    {
        return implode('', array_filter(array_map('trim', $this->_update_text)));
    }


    /**
     * @param string $update_text
     */
    public function addUpdateText(string $update_text)
    {
        $this->_update_text[] = $update_text;
    }


    /**
     * Returns any extra data we may want to include with this response
     *
     * @return array
     */
    public function extra_data(): array
    {
        return $this->_extra_data ?: [];
    }


    /**
     * Converts this response into an array that can be easily serialized.
     * This is most useful for serializing or json encoding
     *
     * @return array {
     * @type string $status          , one of JobParameters::valid_stati()
     * @type int    $units_processed count of units processed
     * @type int    $job_size        total number of units TO process
     * @type string $job_id          unique string identifying the job
     * @type string $update_text     string describing what happened during this step
     * } and any other items from $this->extra_data()
     */
    public function to_array(): array
    {
        return apply_filters(
            'FHEE__EventEspressoBatchRequest\Helpers\JobStepResponse__to_array__return',
            [
                'status'          => $this->job_parameters()->status(),
                'units_processed' => $this->job_parameters()->units_processed(),
                'job_size'        => $this->job_parameters()->job_size(),
                'job_id'          => $this->job_parameters()->job_id(),
                'update_text'     => $this->update_text(),
            ]
            + $this->extra_data()
            + $this->job_parameters()->extra_data(),
            $this
        );
    }
}
