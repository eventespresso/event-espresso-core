<?php

namespace EventEspresso\core\domain\services\admin\events\data;

use EE_Admin_Page;
use EE_Error;
use EED_Batch;
use EEH_URL;
use EventEspresso\admin_pages\events\form_sections\ConfirmEventDeletionForm;
use EventEspresso\core\services\orm\tree_traversal\NodeGroupDao;

/**
 * Class ConfirmDeletion
 *
 * Description
 *
 * @package     Event Espresso
 * @author         Mike Nelson
 * @since         $VID:$
 *
 */
class ConfirmDeletion
{
    /**
     * @var NodeGroupDao
     */
    private $dao;

    /**
     * ConfirmDeletion constructor.
     * @param NodeGroupDao $dao
     */
    public function __construct(
        NodeGroupDao $dao
    )
    {

        $this->dao = $dao;
    }

    /**
     * @since $VID:$
     * @param \Events_Admin_Page $admin_page
     * @throws EE_Error
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     * @throws \EventEspresso\core\exceptions\UnexpectedEntityException
     * @throws \InvalidArgumentException
     * @throws \ReflectionException
     */
    public function handle(\Events_Admin_Page $admin_page)
    {
        $request_data = $admin_page->get_request_data();
        $deletion_job_code = isset($request_data['deletion_job_code']) ? sanitize_key($request_data['deletion_job_code']) : '';
        $models_and_ids_to_delete = $this->dao->getModelsAndIdsFromGroup($deletion_job_code);
        $form = new ConfirmEventDeletionForm($models_and_ids_to_delete['Event']);
        // Initialize the form from the request, and check if its valid.
        $form->receive_form_submission($request_data);
        if ($form->is_valid()) {
            // Redirect the user to the deletion batch job.
            EEH_URL::safeRedirectAndExit(
                EE_Admin_Page::add_query_args_and_nonce(
                    array(
                        'page' => 'espresso_batch',
                        'batch' => EED_Batch::batch_job,
                        'deletion_job_code' => $deletion_job_code,
                        'job_handler' => urlencode('EventEspressoBatchRequest\JobHandlers\ExecuteBatchDeletion'),
                        'return_url' => urlencode(
                            add_query_arg(
                                [
                                    'status' => 'trash'
                                ],
                                EVENTS_ADMIN_URL
                            )
                        )
                    ),
                    admin_url()
                )
            );
        }
        // Dont' use $form->submission_error_message() because it adds the form input's label in front
        // of each validation error which ends up looking quite confusing.
        $validation_errors = $form->get_validation_errors_accumulated();
        foreach ($validation_errors as $validation_error) {
            EE_Error::add_error(
                $validation_error->getMessage(),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        }

        EEH_URL::safeRedirectAndExit(
            EE_Admin_Page::add_query_args_and_nonce(
                [
                    'action' => 'preview_deletion',
                    'deletion_job_code' => $deletion_job_code
                ],
                $admin_page->admin_base_url()
            )
        );
    }
}
// End of file ConfirmDeletion.php
// Location: EventEspresso\core\domain\services\admin\events\data/ConfirmDeletion.php
