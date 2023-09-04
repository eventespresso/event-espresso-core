<?php

namespace EventEspresso\core\libraries\batch\Helpers;

use DomainException;
use EventEspresso\core\services\database\WordPressOption;

/**
 * Class JobParameters
 * Class for storing information about a job. Takes care of serializing the
 * data for storing in a WordPress option
 *
 * @package               Event Espresso
 * @subpackage            batch
 * @author                Mike Nelson
 * @since                 4.8.26
 */
class JobParameters
{
    // phpcs:disable Generic.NamingConventions.UpperCaseConstantName.ClassConstantNotUpperCase
    // phpcs:disable PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    // phpcs:disable PSR2.Classes.PropertyDeclaration.Underscore


    /**
     * status indicating the job should advance to a secondary batch job (usually after an assessment phase)
     */
    const status_advance = 'advance';

    /**
     * status indicating the job has been cleaned up, and so this is probably the last
     * time you'll see this job
     */
    const status_cleaned_up = 'cleaned_up';

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
     * status indicating to temporarily stop the current job
     * so that feedback can be provided to the user and/or to prompt the user for input
     */
    const status_pause = 'pause';

    /**
     * status indicating that the current job needs to redirect to... somewhere else...
     */
    const status_redirect = 'redirect';

    /**
     * string prepended to job ID and used for saving job data to the WP options table
     */
    const wp_option_prefix = 'ee_job_parameters_';


    /**
     * String uniquely identifying the job
     *
     * @var string
     */
    protected $_job_id = '';

    /**
     * @var string
     */
    protected $_classname = '';

    /**
     * @var array
     */
    protected $_request_data = [];

    /**
     * Array of any extra data we want to remember about this request, that
     * wasn't necessarily past in with the request data
     *
     * @var array
     */
    protected $_extra_data = [];

    /**
     * Estimate of how many units HAVE been processed
     *
     * @var int
     */
    protected $_units_processed = 0;

    /**
     * @var string
     */
    protected $_status = '';

    /**
     * The size of the total job in whatever units you want.
     * If you can't provide an estimate leave as 0.
     * Once _units_processed equals _job_size, we should be done
     *
     * @var int
     */
    protected $_job_size = 0;


    /**
     * @var JobParametersWordPressOption|null
     */
    private $job_record;

    /**
     * if set to false, then the job parameters record saved to the WordPress options will NOT be deleted
     *
     * @var bool
     */
    protected $delete_job_record = false;


    /**
     * @param string $job_id
     * @param string $classname
     * @param array  $request_data
     * @param array  $extra_data
     */
    public function __construct(string $job_id, string $classname, array $request_data, array $extra_data = [])
    {
        $this->set_job_id($job_id);
        $this->set_classname($classname);
        $this->set_request_data($request_data);
        $this->set_extra_data($extra_data);
        $this->set_status(JobParameters::status_continue);
        $this->job_record = new JobParametersWordPressOption($this->option_name());
    }


    /**
     * Returns the array of strings of valid status codes
     *
     * @return array
     */
    public static function valid_status_codes(): array
    {
        return [
            JobParameters::status_continue,
            JobParameters::status_advance,
            JobParameters::status_complete,
            JobParameters::status_pause,
            JobParameters::status_error,
            JobParameters::status_cleaned_up,
            JobParameters::status_redirect,
        ];
    }


    /**
     * Saves this option to the database (WordPress options table)
     *
     * @return bool success
     */
    public function save(): bool
    {
        $object_vars = get_object_vars($this);
        unset($object_vars['job_record']);
        return $this->job_record->updateOption($object_vars);
    }


    /**
     * Deletes the job from the database if $this->delete_job_record is set to `true`,
     * although this object is still usable for the rest of the request
     *
     * @return bool
     */
    public function delete(): bool
    {
        return $this->delete_job_record ? $this->job_record->deleteOption() : WordPressOption::UPDATE_NONE;
    }


    /**
     * Loads the specified job from the database JobParametersWordPressOption
     *
     * @param string $job_id
     * @return JobParameters
     * @throws BatchRequestException
     */
    public static function load(string $job_id): JobParameters
    {
        $job_record         = new JobParametersWordPressOption(JobParameters::wp_option_prefix . $job_id);
        $job_parameter_vars = $job_record->loadOption();
        if (
            ! is_array($job_parameter_vars)
            || ! isset($job_parameter_vars['_classname'])
            || ! isset($job_parameter_vars['_request_data'])
        ) {
            throw new BatchRequestException(
                sprintf(
                    esc_html__(
                        'Could not retrieve valid data for job %1$s from the WordPress options table. The WordPress option was %2$s',
                        'event_espresso'
                    ),
                    $job_id,
                    JobParameters::wp_option_prefix . $job_id
                )
            );
        }
        $job_parameters = new JobParameters(
            $job_id,
            $job_parameter_vars['_classname'],
            $job_parameter_vars['_request_data']
        );
        foreach ($job_parameter_vars as $key => $value) {
            $job_parameters->{$key} = $value;
        }
        $job_parameters->job_record = $job_record;
        // $job_parameters->save();
        return $job_parameters;
    }


    /**
     * Gets the job's unique string
     *
     * @return string
     */
    public function job_id(): string
    {
        return $this->_job_id;
    }


    /**
     * Gets the classname that should run this job
     *
     * @return string
     */
    public function classname(): string
    {
        return $this->_classname;
    }


    /**
     * Gets the original array of request data for this job
     *
     * @return array
     */
    public function request_data(): array
    {
        return $this->_request_data;
    }


    /**
     * Gets a single item from the request data
     *
     * @param string       $key
     * @param string|array $default
     * @return string|array
     */
    public function request_datum(string $key, $default = '')
    {
        if (isset($this->_request_data[ $key ])) {
            return $this->_request_data[ $key ];
        }
        return $default;
    }


    /**
     * Gets a single item from the extra data
     *
     * @param string       $key
     * @param string|array $default
     * @return string|array
     */
    public function extra_datum(string $key, $default = '')
    {
        if (isset($this->_extra_data[ $key ])) {
            return $this->_extra_data[ $key ];
        }
        return $default;
    }


    /**
     * Adds an extra piece of extra data that we're going to want later during the job
     *
     * @param string                $key
     * @param string|int|array|null $value almost any extra data you want to store
     */
    public function add_extra_data(string $key, $value)
    {
        $this->_extra_data[ $key ] = $value;
    }


    /**
     * Array of any extra data we want to store
     *
     * @return array
     */
    public function extra_data(): array
    {
        return $this->_extra_data;
    }


    /**
     * Returns the job size, in whatever units you want
     *
     * @return int
     */
    public function job_size(): int
    {
        return $this->_job_size;
    }


    /**
     * Sets the job size. You decide what units to use
     *
     * @param int $size
     */
    public function set_job_size(int $size)
    {
        $this->_job_size = $size;
    }


    /**
     * The number of "units" processed, in the same units as the "job size"
     *
     * @return int
     */
    public function units_processed(): int
    {
        return $this->_units_processed;
    }


    /**
     * Marks more units as processed
     *
     * @param int $newly_processed
     * @return int updated units processed
     */
    public function mark_processed(int $newly_processed): int
    {
        $this->_units_processed += $newly_processed;
        return $this->_units_processed;
    }


    /**
     * Sets the total count of units processed. You might prefer to use mark_processed
     *
     * @param int $total_units_processed
     */
    public function set_units_processed(int $total_units_processed)
    {
        $this->_units_processed = $total_units_processed;
    }


    /**
     * Sets the job's ID
     *
     * @param string $job_id
     */
    public function set_job_id(string $job_id)
    {
        $this->_job_id = $job_id;
    }


    /**
     * sets the classname
     *
     * @param string $classname
     */
    public function set_classname(string $classname)
    {
        $this->_classname = $classname;
    }


    /**
     * Sets the request data
     *
     * @param array $request_data
     */
    public function set_request_data(array $request_data)
    {
        $this->_request_data = $request_data;
    }


    /**
     * Sets the array of extra data we want to store on this request
     *
     * @param array $extra_data
     */
    public function set_extra_data(array $extra_data)
    {
        $this->_extra_data = $extra_data;
    }


    /**
     * Gets the name of the WordPress option that should store these job parameters
     *
     * @return string
     */
    public function option_name(): string
    {
        return JobParameters::wp_option_prefix . $this->job_id();
    }


    /**
     * Gets the job's current status. One of JobParameters::$valid_status_codes();
     *
     * @return string
     */
    public function status(): string
    {
        return $this->_status;
    }


    /**
     * @param string $status one of JobParameters::$valid_status_codes()
     */
    public function set_status(string $status)
    {
        $valid_status_codes = $this->valid_status_codes();
        if (! in_array($status, $valid_status_codes)) {
            throw new DomainException("Invalid or missing status: '$status'.");
        }
        $this->_status = $status;
    }


    /**
     * @return void
     */
    public function deleteJobRecord()
    {
        $this->delete_job_record = true;
    }


    /**
     * @return void
     */
    public function dontDeleteJobRecord()
    {
        $this->delete_job_record = false;
    }


    public function resetExtraData()
    {
        $this->set_extra_data([]);
    }
}
