<?php

namespace EventEspresso\core\libraries\batch;

use EventEspresso\core\services\loaders\LoaderInterface;
use EventEspresso\core\services\request\RequestInterface;
use EventEspresso\core\libraries\batch\Helpers\BatchRequestException;
use EventEspresso\core\libraries\batch\JobHandlerBaseClasses\JobHandlerInterface;
use EventEspresso\core\libraries\batch\Helpers\JobParameters;
use EventEspresso\core\libraries\batch\Helpers\JobStepResponse;
use EventSmart\Multisite\core\services\database\service\DbServiceJobHandler;
use Exception;

// phpcs:disable PSR1.Methods.CamelCapsMethodName.NotCamelCaps
// phpcs:disable PSR2.Classes.PropertyDeclaration.Underscore
// phpcs:disable PSR2.Methods.MethodDeclaration.Underscore

/**
 * Class BatchRequestProcessor
 * Responsible for receiving a request to start a job and assign it a job Id.
 * Then when subsequent requests come in to continue that job, dispatches
 * the request to the appropriate JobHandler, which processes a step of the batch,
 * and then returns the job's new status.
 * This class is used by controller code, and the controller code is sent HTTP
 * requests from the batch_runner.js library
 *
 * @package               Event Espresso
 * @subpackage            batch
 * @author                Mike Nelson
 * @since                 4.8.26
 */
class BatchRequestProcessor
{
    /**
     * Current job's ID (if assigned)
     *
     * @var string|null
     */
    protected $_job_id = '';

    /**
     * Current job's parameters
     *
     * @var JobParameters|null
     */
    protected $_job_parameters = null;

    /**
     * @var LoaderInterface|null
     */
    private $loader;


    /**
     * @var RequestInterface|null
     */
    private $request;


    /**
     * BatchRequestProcessor constructor.
     *
     * @param LoaderInterface  $loader
     * @param RequestInterface $request
     */
    public function __construct(LoaderInterface $loader, RequestInterface $request)
    {
        $this->loader  = $loader;
        $this->request = $request;
    }


    /**
     * @param string $job_id
     * @param string $job_handler_class
     * @param array  $request_data
     * @return JobHandlerInterface
     * @throws BatchRequestException
     * @since   5.0.0.p
     */
    private function initializeJobHandler(
        string $job_id,
        string $job_handler_class = '',
        array $request_data = []
    ): JobHandlerInterface {
        $this->_job_id         = $job_id;
        $this->_job_parameters = ! empty($job_handler_class)
            ? new JobParameters($this->_job_id, $job_handler_class, $request_data)
            : JobParameters::load($this->_job_id);
        $this->_job_parameters->save();
        return $this->instantiateBatchJobHandlerFromJobParameters($this->_job_parameters);
    }


    /**
     * Creates a job for the specified batch handler class (which should be autoloaded)
     * and the specified request data
     *
     * @return JobStepResponse
     */
    public function createJob(): JobStepResponse
    {
        try {
            $request_data = $this->request->requestParams();
            $job_id       = $this->request->getRequestParam(
                'job_code',
                wp_generate_password(15, false)
            );
            $service      = $this->request->getRequestParam('job_handler', '', 'fqcn');
            $assessment   = $this->request->getRequestParam('job_assessment', '', 'fqcn');
            $job_class    = $assessment !== '' ? $assessment : $service;
            // replace escaped escaped backslashes with escaped unescaped backslashes :lol:
            $job_class    = str_replace('\\\\', '\\', urldecode($job_class));
            $job_handler  = $this->initializeJobHandler($job_id, $job_class, $request_data);
            $job_response = $job_handler->createJob($this->_job_parameters);
            $this->validateResponse('createJob', $this->_job_id, $job_response);
            $success = $this->_job_parameters->save();
            if (! $success) {
                throw new BatchRequestException(
                    sprintf(
                        esc_html__(
                            'Could not save job %1$s to the Wordpress Options table. These were the arguments used: %2$s',
                            'event_espresso'
                        ),
                        $this->_job_id,
                        wp_json_encode($request_data)
                    )
                );
            }
        } catch (Exception $e) {
            $job_response = $this->_get_error_response($e, 'createJob');
        }
        return $job_response;
    }


    /**
     * Retrieves the job's arguments
     *
     * @param string $job_id
     * @param int    $batch_size
     * @return JobStepResponse
     */
    public function continueJob(string $job_id, int $batch_size = 50): JobStepResponse
    {
        try {
            $batch_size   = defined('EE_BATCHRUNNER_BATCH_SIZE')
                ? EE_BATCHRUNNER_BATCH_SIZE
                : $batch_size;
            $job_handler  = $this->initializeJobHandler($job_id);
            $job_response = $job_handler->continueJob($this->_job_parameters, $batch_size);
            $this->validateResponse('continueJob', $this->_job_id, $job_response);
            $this->_job_parameters->save();
        } catch (Exception $e) {
            $job_response = $this->_get_error_response($e, 'continueJob');
        }
        return $job_response;
    }


    /**
     * Retrieves the job's arguments
     *
     * @param string $job_id
     * @return JobStepResponse
     */
    public function advanceJob(string $job_id): JobStepResponse
    {
        try {
            $job_handler  = $this->initializeJobHandler($job_id);
            $job_response = $job_handler->advanceJob($this->_job_parameters);
            $this->validateResponse('advanceJob', $this->_job_id, $job_response);
            $this->_job_parameters->save();
        } catch (Exception $e) {
            $job_response = $this->_get_error_response($e, 'advanceJob');
        }
        return $job_response;
    }


    /**
     * Forces a job to be cleaned up
     *
     * @param string $job_id
     * @return JobStepResponse
     */
    public function cleanupJob(string $job_id): JobStepResponse
    {
        try {
            $job_handler  = $this->initializeJobHandler($job_id);
            $job_response = $job_handler->cleanupJob($this->_job_parameters);
            $this->validateResponse('cleanupJob', $this->_job_id, $job_response);
            $this->_job_parameters->set_status(JobParameters::status_cleaned_up);
            $this->_job_parameters->delete();
        } catch (Exception $e) {
            $job_response = $this->_get_error_response($e, 'cleanupJob');
        }
        return $job_response;
    }


    /**
     * Instantiates an object of type $classname, which implements
     * JobHandlerInterface
     *
     * @param JobParameters $job_parameters
     * @return JobHandlerInterface
     * @throws BatchRequestException
     */
    public function instantiateBatchJobHandlerFromJobParameters(JobParameters $job_parameters): JobHandlerInterface
    {
        $this->verifyJobHandlerClassExists($job_parameters);
        $job_handler = $this->loader->getNew($job_parameters->classname());
        $this->validateJobHandler($job_handler, $job_parameters);
        $job_handler->setRequestData($job_parameters->request_data());
        if ($job_handler instanceof DbServiceJobHandler) {
            $job_handler->initialize($job_parameters);
        }
        return $job_handler;
    }


    /**
     * Instantiates an object of type $classname, which implements
     * JobHandlerInterface
     *
     * @param string $classname
     * @param array  $request_data
     * @return JobHandlerInterface
     * @throws BatchRequestException
     * @deprecatd 5.0.0.p
     */
    public function instantiate_batch_job_handler_from_classname(
        string $classname,
        array $request_data = []
    ): JobHandlerInterface {
        return $this->instantiateBatchJobHandlerFromJobParameters($this->_job_parameters);
    }


    /**
     * Creates a valid JobStepResponse object from an exception and method name.
     *
     * @param Exception $exception
     * @param string    $method_name
     * @return JobStepResponse
     */
    protected function _get_error_response(Exception $exception, string $method_name): JobStepResponse
    {
        if (! $this->_job_parameters instanceof JobParameters) {
            $this->_job_parameters = new JobParameters($this->_job_id, esc_html__('__Unknown__', 'event_espresso'), []);
        }
        $this->_job_parameters->set_status(JobParameters::status_error);

        $error_message = sprintf(
            esc_html__(
                '%1$sWhile running %3$s the following %2$s occurred: %4$s %5$s',
                'event_espresso'
            ),
            '<h4>',
            get_class($exception),
            '<code>' . 'BatchRunner::' . $method_name . '()</code>',
            '</h4><p>' . $exception->getMessage() . '</p>',
            '<pre>' . $exception->getTraceAsString() . '</pre>'
        );
        return new JobStepResponse(
            $this->_job_parameters,
            "<div class='ee-batch-runner__error ee-status-outline ee-status-outline--error'>$error_message</div>"
        );
    }


    /**
     * @param string $function
     * @param string $job_id
     * @param        $job_response
     * @throws BatchRequestException
     * @since   5.0.0.p
     */
    private function validateResponse(string $function, string $job_id, $job_response)
    {
        if (! $job_response instanceof JobStepResponse) {
            throw new BatchRequestException(
                sprintf(
                    esc_html__(
                        'The class implementing JobHandlerInterface did not return a JobStepResponse when %1$s was called for job %2$s. It needs to return one or throw an Exception',
                        'event_espresso'
                    ),
                    $function,
                    $job_id
                )
            );
        }
    }


    /**
     * @param JobParameters $job_parameters
     * @throws BatchRequestException
     * @since   5.0.0.p
     */
    private function verifyJobHandlerClassExists(JobParameters $job_parameters)
    {
        if (! class_exists($job_parameters->classname())) {
            throw new BatchRequestException(
                sprintf(
                    esc_html__(
                        'The class %1$s does not exist, and so could not be used for running a job. It should implement JobHandlerInterface.',
                        'event_espresso'
                    ),
                    $job_parameters->classname()
                )
            );
        }
    }

    /**
     * @param JobHandlerInterface|NULL $job_handler
     * @param JobParameters $job_parameters
     * @throws BatchRequestException
     * @since   5.0.0.p
     */
    private function validateJobHandler(?JobHandlerInterface $job_handler, JobParameters $job_parameters)
    {
        if (! $job_handler instanceof JobHandlerInterface) {
            throw new BatchRequestException(
                sprintf(
                    esc_html__(
                        'The class %1$s does not implement JobHandlerInterface and so could not be used for running a job',
                        'event_espresso'
                    ),
                    $job_parameters->classname()
                )
            );
        }
    }
}
