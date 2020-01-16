<?php

namespace EventEspressoBatchRequest\JobHandlers;

use EEM_Event;
use EEM_Price;
use EEM_Ticket;
use EventEspresso\core\exceptions\InvalidClassException;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\orm\tree_traversal\ModelObjNode;
use EventEspresso\core\services\orm\tree_traversal\NodeGroupDao;
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
     * @var NodeGroupDao
     */
    protected $model_obj_node_group_persister;
    public function __construct(NodeGroupDao $model_obj_node_group_persister)
    {
        $this->model_obj_node_group_persister = $model_obj_node_group_persister;
    }

    // phpcs:disable PSR1.Methods.CamelCapsMethodName.NotCamelCaps
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
        $roots = [];
        foreach ($event_ids as $event_id) {
            $roots[] = new ModelObjNode(
                $event_id,
                EEM_Event::instance()
            );
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
            $roots = array_merge(
                $roots,
                // Dont have ticket nodes also traverse registrations, its unnecessary because
                // registrations also depend on events so they will already get traversed.
                $this->createModelObjNodes($related_non_global_tickets,['Registration']),
                $this->createModelObjNodes($related_non_global_prices)
            );
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
     * @since $VID:$
     * @param EE_Base_Class[] $model_objs
     * @param array $dont_traverse_models
     */
    protected function createModelObjNodes($model_objs, $dont_traverse_models = [])
    {
        $nodes = [];
        foreach($model_objs as $model_obj){
            $nodes[] = new ModelObjNode(
                $model_obj->ID(),
                $model_obj->get_model(),
                $dont_traverse_models
            );
        }
        return $nodes;
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
        // Serializing and unserializing is what really makes this drag on (eg on localhost, the ajax requests took
        // about 4 seconds when the batch size was 250, but 3 seconds when the batch size was 50. So like
        // 50% of the request is just serializing and unserializing.) So, make the batches much bigger.
        $batch_size *= 3;
        $units_processed = 0;
        foreach ($job_parameters->extra_datum('roots', array()) as $root_node) {
            if ($units_processed >= $batch_size) {
                break;
            }
            if (! $root_node instanceof ModelObjNode) {
                throw new InvalidClassException('ModelObjNode');
            }
            if ($root_node->isComplete()) {
                continue;
            }
            $units_processed += $root_node->visit($batch_size - $units_processed);
        }
        $job_parameters->mark_processed($units_processed);
        // If the most-recently processed root node is complete, we must be all done because we're doing them
        // sequentially.
        if (isset($root_node) && $root_node instanceof ModelObjNode && $root_node->isComplete()) {
            $job_parameters->set_status(JobParameters::status_complete);
            // Show a full progress bar.
            $job_parameters->set_units_processed($job_parameters->job_size());
            $deletion_job_code = $job_parameters->request_datum('deletion_job_code');
            $this->model_obj_node_group_persister->persistModelObjNodesGroup(
                $job_parameters->extra_datum('roots'),
                $deletion_job_code
            );
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
            if (($job_parameters->units_processed() / $job_parameters->job_size()) > .8) {
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
     */
    public function cleanup_job(JobParameters $job_parameters)
    {
        // Nothing much to do. We can't delete the option with the built tree because we may need it in a moment for the deletion
        return new JobStepResponse(
            $job_parameters,
            esc_html__('All done', 'event_espresso')
        );
    }
}
// End of file EventDeletion.php
// Location: EventEspressoBatchRequest\JobHandlers/EventDeletion.php
