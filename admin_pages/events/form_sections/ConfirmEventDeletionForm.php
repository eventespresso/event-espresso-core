<?php

namespace EventEspresso\admin_pages\events\form_sections;

use EE_Checkbox_Multi_Input;
use EE_Event;
use EE_Form_Section_HTML;
use EEH_HTML;
use EEM_Event;
use EventEspresso\core\exceptions\UnexpectedEntityException;

/**
 * Class ConfirmEventDeletionForm
 *
 * Description
 *
 * @package     Event Espresso
 * @author         Mike Nelson
 * @since         $VID:$
 *
 */
class ConfirmEventDeletionForm extends \EE_Form_Section_Proper
{
    /**
     * @var EE_Event[]
     */
    protected $events;
    public function __construct($event_ids, $options_array = array())
    {
        if (! isset($options_array['subsections'])) {
            $options_array['subsections'] = [];
        }
        if (! isset($options_array['subsections']['events'])) {
            $events_subsection = new \EE_Form_Section_Proper();
            $options_array['subsections']['events'] = $events_subsection;
        }
        $events = EEM_Event::instance()->get_all_deleted_and_undeleted(
            [
                [
                    'EVT_ID' => ['IN',$event_ids]
                ]
            ]
        );
        if (! is_array($events)) {
            throw new UnexpectedEntityException($event_ids, 'array');
        }
        $this->events = $events;
        $events_inputs = [
        ];
        foreach ($events as $event) {
             $events_inputs[ $event->ID() ] = new EE_Checkbox_Multi_Input(
                [
                    'yes' => $event->name(),
                ],
                [
                    'html_label_text' => esc_html__('Please confirm you wish to delete:', 'event_espresso'),
                    'required' => true
                ]
            );
        }
        $events_subsection->add_subsections($events_inputs);
        $options_array['subsections']['backup'] = new EE_Checkbox_Multi_Input(
            [
                'yes' => esc_html__('I have backed up my database.', 'event_espresso')
            ],
            [
                'html_label_text' => esc_html__('Deleting this data cannot be undone. Please confirm you have a usable database backup.', 'event_espresso'),
                'required' => true
            ]
        );
        parent::__construct($options_array);
    }
}
// End of file ConfirmEventDeletionForm.php
// Location: EventEspresso\admin_pages\events\form_sections/ConfirmEventDeletionForm.php
