<?php

namespace EventEspressoBatchRequest\JobHandlers;

use EEM_Event;
use EEM_Price;
use EEM_Ticket;
use EventEspresso\core\exceptions\InvalidClassException;
use EventEspresso\core\services\orm\tree_traversal\ModelObjNode;
use EventEspressoBatchRequest\Helpers\BatchRequestException;
use EventEspressoBatchRequest\Helpers\JobParameters;
use EventEspressoBatchRequest\Helpers\JobStepResponse;
use EventEspressoBatchRequest\JobHandlerBaseClasses\JobHandler;

/**
 * Class EventDeletion
 *
 * Given a list of event IDs, identified all the dependent model objects that would need to be deleted in order to not
 * leave any orphaned data.
 *
 * @package     Event Espresso
 * @author         Mike Nelson
 * @since         $VID:$
 *
 */
class PreviewEventDeletion extends JobHandler
{


    /**
     *
     * @param JobParameters $job_parameters
     * @throws BatchRequestException
     * @return JobStepResponse
     */
    public function create_job(JobParameters $job_parameters)
    {
        // Set the "root" model objects we will want to delete (record their ID and model)
        $event_ids = $job_parameters->request_datum('EVT_IDs', array());
        // Find all the root nodes to delete (this isn't just events, because there's other data, like related tickets,
        // prices, message templates, etc, whose model definition doesn't make them dependent on events. But,
        // we have no UI to access them independent of events, so they may as well get deleted too.)
        $model_objects_to_delete = [];
        foreach ($event_ids as $event_id) {
            $event = EEM_Event::instance()->get_one_by_ID($event_id);
            // Also, we want to delete their related, non-global, tickets, prices and message templates
            $related_non_global_tickets = EEM_Ticket::instance()->get_all_deleted_and_undeleted(
                [
                    [
                        'TKT_is_default' => false,
                        'Datetime.EVT_ID' => $event_id
                    ]
                ]
            );
            $related_non_global_prices = EEM_Price::instance()->get_all_deleted_and_undeleted(
                [
                    [
                        'PRC_is_default' => false,
                        'Ticket.Datetime.EVT_ID' => $event_id
                    ]
                ]
            );
            $related_message_templates = $event->get_many_related(
                'Message_Template_Group',
                [
                    [
                        'MTP_is_global' => false
                    ]
                ]
            );
            $model_objects_to_delete = array_merge(
                $model_objects_to_delete,
                [$event],
                $related_non_global_tickets,
                $related_non_global_prices,
                $related_message_templates
            );
        }
        $roots = [];
        foreach($model_objects_to_delete as $model_object){
            $roots[] = new ModelObjNode($model_object);
        }
        $job_parameters->add_extra_data('roots', $roots);
        // Set an estimate of how long this will take (we're discovering as we go, so it seems impossible to give
        // an accurate count.)
        $estimated_work_per_model_obj = 100;
        $job_parameters->set_job_size(count($roots) * $estimated_work_per_model_obj);
        return new JobStepResponse(
            $job_parameters,
            esc_html__('Generating preview of data to be deleted...', 'event_espresso')
        );
    }

    /**
     * Performs another step of the job
     * @param JobParameters $job_parameters
     * @param int $batch_size
     * @return JobStepResponse
     * @throws BatchRequestException
     */
    public function continue_job(JobParameters $job_parameters, $batch_size = 50)
    {
        $units_processed = 0;
        foreach($job_parameters->extra_datum('roots', array()) as $root_node){
            if($units_processed >= $batch_size){
                break;
            }
            if(! $root_node instanceof ModelObjNode){
                throw new InvalidClassException('ModelObjNode');
            }
            if($root_node->isComplete()){
                continue;
            }
            $units_processed += $root_node->visit($batch_size - $units_processed);
        }
        $job_parameters->mark_processed($units_processed);
        // If the most-recently processed root node is complete, we must be all done because we're doing them
        // sequentially.
        if(isset($root_node) && $root_node instanceof ModelObjNode && $root_node->isComplete()){
            $job_parameters->set_status(JobParameters::status_complete);
            // Show a full progress bar.
            $job_parameters->set_units_processed($job_parameters->job_size());
            $deletion_job_code = $job_parameters->request_datum('deletion_job_code');
            add_option('ee_deletion_' . $deletion_job_code, $job_parameters->extra_datum('roots'), null, 'no');
            return new JobStepResponse(
                $job_parameters,
                esc_html__('Finished identifying items for deletion.', 'event_espresso'),
                [
                    'deletion_job_code' => $deletion_job_code
                ]
            );
        } else {
            // Because the job size was a guess, it may have likely been provden wrong. We don't want to show more work
            // done than we originally said there would be. So adjust the estimate.
            if(($job_parameters->units_processed() / $job_parameters->job_size()) > .8){
                $job_parameters->set_job_size($job_parameters->job_size() * 2);
            }
            return new JobStepResponse(
                $job_parameters,
                sprintf(
                    esc_html__('Identified %d items for deletion.', 'event_espresso'),
                    $units_processed
                )
            );
        }
    }

    /**
     * Performs any clean-up logic when we know the job is completed
     * @param JobParameters $job_parameters
     * @return JobStepResponse
     * @throws BatchRequestException
     */
    public function cleanup_job(JobParameters $job_parameters)
    {
        // Nothing much to do. We can't delete the option with the built tree because we may need it in a moment for the deletion
    }
}
// End of file EventDeletion.php
// Location: EventEspressoBatchRequest\JobHandlers/EventDeletion.php
