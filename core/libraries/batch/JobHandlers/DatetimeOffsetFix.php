<?php

namespace EventEspressoBatchRequest\JobHandlers;

use EE_Model_Field_Base;
use EE_Table_Base;
use EventEspressoBatchRequest\JobHandlerBaseClasses\JobHandler;
use EventEspressoBatchRequest\Helpers\BatchRequestException;
use EventEspressoBatchRequest\Helpers\JobParameters;
use EventEspressoBatchRequest\Helpers\JobStepResponse;
use EE_Registry;
use EE_Datetime_Field;
use EEM_Base;
use EE_Change_Log;

defined('EVENT_ESPRESSO_VERSION') || exit('No direct access allowed.');

class DatetimeOffsetFix extends JobHandler
{

    /**
     * Key for the option used to track which models have been processed when doing the batches.
     */
    const MODELS_TO_PROCESS_OPTION_KEY = 'ee_models_processed_for_datetime_offset_fix';


    const COUNT_OF_MODELS_PROCESSED = 'ee_count_of_ee_models_processed_for_datetime_offset_fixed';

    /**
     * Key for the option used to track what the current offset is that will be applied when this tool is executed.
     */
    const OFFSET_TO_APPLY_OPTION_KEY = 'ee_datetime_offset_fix_offset_to_apply';


    /**
     * String labelling the datetime offset fix type for change-log entries.
     */
    const DATETIME_OFFSET_FIX_CHANGELOG_TYPE = 'datetime_offset_fix';


    /**
     * String labelling a datetime offset fix error for change-log entries.
     */
    const DATETIME_OFFSET_FIX_CHANGELOG_ERROR_TYPE = 'datetime_offset_fix_error';

    /**
     * @var EEM_Base[]
     */
    protected $models_with_datetime_fields = array();


    /**
     * Performs any necessary setup for starting the job. This is also a good
     * place to setup the $job_arguments which will be used for subsequent HTTP requests
     * when continue_job will be called
     *
     * @param JobParameters $job_parameters
     * @throws BatchRequestException
     * @return JobStepResponse
     */
    public function create_job(JobParameters $job_parameters)
    {
        $models_with_datetime_fields = $this->getModelsWithDatetimeFields();
        //we'll be doing each model as a batch.
        $job_parameters->set_job_size(count($models_with_datetime_fields));
        return new JobStepResponse(
            $job_parameters,
            esc_html__('Starting Datetime Offset Fix', 'event_espresso')
        );
    }

    /**
     * Performs another step of the job
     *
     * @param JobParameters $job_parameters
     * @param int           $batch_size
     * @return JobStepResponse
     * @throws \EE_Error
     */
    public function continue_job(JobParameters $job_parameters, $batch_size = 50)
    {
        $models_to_process = $this->getModelsWithDatetimeFields();
        //let's pop off the a model and do the query to apply the offset.
        $model_to_process = array_pop($models_to_process);
        //update our record
        $this->setModelsToProcess($models_to_process);
        $this->processModel($model_to_process);
        $this->updateCountOfModelsProcessed();
        $job_parameters->set_units_processed($this->getCountOfModelsProcessed());
        if (count($models_to_process) > 0) {
            $job_parameters->set_status(JobParameters::status_continue);
        } else {
            $job_parameters->set_status(JobParameters::status_complete);
        }
        return new JobStepResponse(
            $job_parameters,
            sprintf(
                esc_html__('Updated the offset for all datetime fields on the %s model.', 'event_espresso'),
                $model_to_process
            )
        );
    }

    /**
     * Performs any clean-up logic when we know the job is completed
     *
     * @param JobParameters $job_parameters
     * @return JobStepResponse
     * @throws BatchRequestException
     */
    public function cleanup_job(JobParameters $job_parameters)
    {
        //delete important saved options.
        delete_option(self::MODELS_TO_PROCESS_OPTION_KEY);
        delete_option(self::COUNT_OF_MODELS_PROCESSED);
        return new JobStepResponse($job_parameters, esc_html__(
            'Offset has been applied to all affected fields.',
            'event_espresso'
        ));
    }


    /**
     * Contains the logic for processing a model and applying the datetime offset to affected fields on that model.
     * @param string $model_class_name
     * @throws \EE_Error
     */
    protected function processModel($model_class_name)
    {
        global $wpdb;
        /** @var EEM_Base $model */
        $model = $model_class_name::instance();
        $original_offset = self::getOffset();
        $sql_date_function = $original_offset > 0 ? 'DATE_ADD' : 'DATE_SUB';
        $offset = abs($original_offset) * 60;
        //since some affected models might have two tables, we have to get our tables and set up a query for each table.
        foreach ($model->get_tables() as $table) {
            $query = 'UPDATE ' . $table->get_table_name();
            $fields_affected = array();
            $inner_query = array();
            foreach ($model->_get_fields_for_table($table->get_table_alias()) as $model_field) {
                if ($model_field instanceof EE_Datetime_Field) {
                    $inner_query[] = $model_field->get_table_column() . ' = '
                                     . $sql_date_function . '('
                                     . $model_field->get_table_column()
                                     . ", INTERVAL $offset MINUTE)";
                    $fields_affected[] = $model_field;
                }
            }
            if (! $fields_affected) {
                continue;
            }
            //k convert innerquery to string
            $query .= ' SET ' . implode(',', $inner_query);
            //execute query
            $result = $wpdb->query($query);
            //record log
            if ($result !== false) {
                $this->recordChangeLog($model, $original_offset, $table, $fields_affected);
            } else {
                //record error.
                $error_message = $wpdb->last_error;
                //handle the edgecases where last_error might be empty.
                if (! $error_message) {
                    $error_message = esc_html__('Unknown mysql error occured.', 'event_espresso');
                }
                $this->recordChangeLog($model, $original_offset, $table, $fields_affected, $error_message);
            }
        }
    }


    /**
     * Records a changelog entry using the given information.
     *
     * @param EEM_Base              $model
     * @param float                 $offset
     * @param EE_Table_Base         $table
     * @param EE_Model_Field_Base[] $model_fields_affected
     * @param string                $error_message   If present then there was an error so let's record that instead.
     * @throws \EE_Error
     */
    private function recordChangeLog(
        EEM_Base $model,
        $offset,
        EE_Table_Base $table,
        $model_fields_affected,
        $error_message = ''
    ) {
        //setup $fields list.
        $fields = array();
        /** @var EE_Datetime_Field $model_field */
        foreach ($model_fields_affected as $model_field) {
            if (! $model_field instanceof EE_Datetime_Field) {
                continue;
            }
            $fields[] = $model_field->get_name();
        }
        //setup the message for the changelog entry.
        $message = $error_message
            ? sprintf(
                esc_html__(
                    'The %1$s table for the %2$s model did not have the offset of %3$f applied to its fields (%4$s), because of the following error:%5$s',
                    'event_espresso'
                ),
                $table->get_table_name(),
                $model->get_this_model_name(),
                $offset,
                implode(',', $fields),
                $error_message
            )
            : sprintf(
                esc_html__(
                    'The %1$s table for the %2$s model has had the offset of %3$f applied to its following fields: %4$s',
                    'event_espresso'
                ),
                $table->get_table_name(),
                $model->get_this_model_name(),
                $offset,
                implode(',', $fields)
            );
        //write to the log
        $changelog = EE_Change_Log::new_instance(array(
            'LOG_type' => $error_message
                ? self::DATETIME_OFFSET_FIX_CHANGELOG_ERROR_TYPE
                : self::DATETIME_OFFSET_FIX_CHANGELOG_TYPE,
            'LOG_message' => $message
        ));
        $changelog->save();
    }


    /**
     * Returns an array of models that have datetime fields.
     * This array is added to a short lived transient cache to keep having to build this list to a minimum.
     * @return array  an array of model class names.
     */
    private function getModelsWithDatetimeFields()
    {
        $this->getModelsToProcess();
        if (! empty($this->models_with_datetime_fields)) {
            return $this->models_with_datetime_fields;
        }

        $all_non_abstract_models = EE_Registry::instance()->non_abstract_db_models;
        foreach ($all_non_abstract_models as $non_abstract_model) {
            //get model instance
            /** @var EEM_Base $non_abstract_model */
            $non_abstract_model = $non_abstract_model::instance();
            if ($non_abstract_model->get_a_field_of_type('EE_Datetime_Field') instanceof EE_Datetime_Field) {
                $this->models_with_datetime_fields[] = get_class($non_abstract_model);
            }
        }
        $this->setModelsToProcess($this->models_with_datetime_fields);
        return $this->models_with_datetime_fields;
    }


    /**
     * This simply records the models that have been processed with our tracking option.
     * @param array $models_to_set  array of model class names.
     */
    private function setModelsToProcess($models_to_set)
    {
        update_option(self::MODELS_TO_PROCESS_OPTION_KEY, $models_to_set);
    }


    /**
     * Used to keep track of how many models have been processed for the batch
     * @param $count
     */
    private function updateCountOfModelsProcessed($count = 1)
    {
        $count = $this->getCountOfModelsProcessed() + (int) $count;
        update_option(self::COUNT_OF_MODELS_PROCESSED, $count);
    }


    /**
     * Retrieve the tracked number of models processed between requests.
     * @return int
     */
    private function getCountOfModelsProcessed()
    {
        return (int) get_option(self::COUNT_OF_MODELS_PROCESSED, 0);
    }


    /**
     * Returns the models that are left to process.
     * @return array  an array of model class names.
     */
    private function getModelsToProcess()
    {
        if (empty($this->models_with_datetime_fields)) {
            $this->models_with_datetime_fields = get_option(self::MODELS_TO_PROCESS_OPTION_KEY, array());
        }
        return $this->models_with_datetime_fields;
    }


    /**
     * Used to record the offset that will be applied to dates and times for EE_Datetime_Field columns.
     * @param float $offset
     */
    public static function updateOffset($offset)
    {
        update_option(self::OFFSET_TO_APPLY_OPTION_KEY, $offset);
    }


    /**
     * Used to retrieve the saved offset that will be applied to dates and times for EE_Datetime_Field columns.
     *
     * @return float
     */
    public static function getOffset()
    {
        return (float) get_option(self::OFFSET_TO_APPLY_OPTION_KEY, 0);
    }
}
