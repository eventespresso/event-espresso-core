<?php

namespace EventEspresso\core\domain\services\admin\events\data;

use DomainException;
use EE_Admin_Page;
use EE_Error;
use EEH_Template;
use EEM_Datetime;
use EEM_Event;
use EEM_Registration;
use EventEspresso\admin_pages\events\form_sections\ConfirmEventDeletionForm;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\exceptions\UnexpectedEntityException;
use EventEspresso\core\services\orm\tree_traversal\NodeGroupDao;
use Events_Admin_Page;
use InvalidArgumentException;
use ReflectionException;

/**
 * Class PreviewDeletion
 *
 * Displays the important data that will be deleted. If the form had been submitted earlier but wasn't valid, the
 * user is redirected here, and the forms system takes care of populating the form with that invalid data.
 *
 * @package     Event Espresso
 * @author         Mike Nelson
 * @since         $VID:$
 *
 */
class PreviewDeletion
{
    /**
     * @var NodeGroupDao
     */
    protected $dao;

    /**
     * @var EEM_Event
     */
    protected $event_model;

    /**
     * @var EEM_Datetime
     */
    protected $datetime_model;

    /**
     * @var EEM_Registration
     */
    protected $registration_model;

    /**
     * PreviewDeletion constructor.
     * @param NodeGroupDao $dao
     * @param EEM_Event $event_model
     * @param EEM_Datetime $datetime_model
     * @param EEM_Registration $registration_model
     */
    public function __construct(
        NodeGroupDao $dao,
        EEM_Event $event_model,
        EEM_Datetime $datetime_model,
        EEM_Registration $registration_model
    ) {
        $this->dao = $dao;
        $this->event_model = $event_model;
        $this->datetime_model = $datetime_model;
        $this->registration_model = $registration_model;
    }

    /**
     * Renders the preview deletion page.
     * @since $VID:$
     * @param $request_data
     * @param $admin_base_url
     * @return array
     * @throws UnexpectedEntityException
     * @throws DomainException
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     */
    public function handle($request_data, $admin_base_url)
    {
        $deletion_job_code = isset($request_data['deletion_job_code']) ? sanitize_key($request_data['deletion_job_code']) : '';
        $models_and_ids_to_delete = $this->dao->getModelsAndIdsFromGroup($deletion_job_code);
        $event_ids = isset($models_and_ids_to_delete['Event']) ? $models_and_ids_to_delete['Event'] : array();
        if (empty($event_ids) || !is_array($event_ids)) {
            throw new EE_Error(
                esc_html__('No Events were found to delete.', 'event_espresso')
            );
        }
        $datetime_ids = isset($models_and_ids_to_delete['Datetime']) ? $models_and_ids_to_delete['Datetime'] : array();
        if (!is_array($datetime_ids)) {
            throw new UnexpectedEntityException($datetime_ids, 'array');
        }
        $registration_ids = isset($models_and_ids_to_delete['Registration']) ? $models_and_ids_to_delete['Registration'] : array();
        if (!is_array($registration_ids)) {
            throw new UnexpectedEntityException($registration_ids, 'array');
        }
        $num_registrations_to_show = 10;
        $reg_count = count($registration_ids);
        if ($reg_count > $num_registrations_to_show) {
            $registration_ids = array_slice($registration_ids, 0, $num_registrations_to_show);
        }
        $form = new ConfirmEventDeletionForm($event_ids);
        $events = $this->event_model->get_all_deleted_and_undeleted(
            [
                [
                    'EVT_ID' => ['IN', $event_ids]
                ]
            ]
        );
        $datetimes = $this->datetime_model->get_all_deleted_and_undeleted(
            [
                [
                    'DTT_ID' => ['IN', $datetime_ids]
                ]
            ]
        );
        $registrations = $this->registration_model->get_all_deleted_and_undeleted(
            [
                [
                    'REG_ID' => ['IN', $registration_ids]
                ]
            ]
        );
        $confirm_deletion_args = [
            'action' => 'confirm_deletion',
            'deletion_job_code' => $deletion_job_code
        ];
        return [
            'admin_page_content' => EEH_Template::display_template(
                EVENTS_TEMPLATE_PATH . 'event_preview_deletion.template.php',
                [
                    'form_url' => EE_Admin_Page::add_query_args_and_nonce(
                        $confirm_deletion_args,
                        $admin_base_url
                    ),
                    'form' => $form,
                    'events' => $events,
                    'datetimes' => $datetimes,
                    'registrations' => $registrations,
                    'reg_count' => $reg_count,
                    'num_registrations_to_show' => $num_registrations_to_show
                ],
                true
            )
        ];
    }
}
// End of file PreviewDeletion.php
// Location: EventEspresso\core\domain\services\admin\events\data/PreviewDeletion.php
