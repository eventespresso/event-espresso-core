<?php

namespace EventEspresso\admin_pages\events\form_sections;

use EE_Admin_Page;
use EE_Checkbox_Multi_Input;
use EE_Error;
use EE_Event;
use EE_Form_Section_HTML;
use EE_Form_Section_Proper;
use EEM_Event;
use EventEspresso\core\exceptions\UnexpectedEntityException;
use ReflectionException;

/**
 * Class ConfirmEventDeletionForm
 *
 * Special form that requests the user confirm they want to delete the specified events, and have made a database
 * backup.
 *
 * @package     Event Espresso
 * @author         Mike Nelson
 * @since         4.10.12.p
 *
 */
class ConfirmEventDeletionForm extends EE_Form_Section_Proper
{
    /**
     * @throws ReflectionException
     * @throws EE_Error
     */
    public function __construct($event_ids, $options_array = array())
    {
        if (! isset($options_array['subsections'])) {
            $options_array['subsections'] = [];
        }
        if (
            ! (
                isset($options_array['subsections']['events'])
                && $options_array['subsections']['events'] instanceof EE_Form_Section_Proper
            )
        ) {
            $options_array['subsections']['events'] = new EE_Form_Section_Proper();
        }
        $events_subsection = $options_array['subsections']['events'];
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
        $events_inputs = [];
        foreach ($events as $event) {
            if ($event instanceof EE_Event) {
                $events_inputs[ $event->ID() ] = new EE_Checkbox_Multi_Input(
                    [
                        'yes' => $event->name(),
                    ],
                    [
                        'html_label_text' => esc_html__('Please confirm you wish to delete:', 'event_espresso'),
                        'required'        => true
                    ]
                );
            }
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
        $events_list_url = EE_Admin_Page::add_query_args_and_nonce(
            [
                'status' => 'trash',
                'return' => 'default',
            ],
            EVENTS_ADMIN_URL
        );
        $options_array['subsections']['buttons'] = new EE_Form_Section_HTML(
            "
        <div class='ee-admin-button-row ee-admin-button-row--align-start'>
            <input type='submit' 
                   class='button button--primary' 
                   value='" . esc_attr__('Confirm', 'event_espresso') . "'
            />
            <a href='" . esc_url_raw($events_list_url) . ";' class='button button--secondary'>
                " . esc_html__('Cancel', 'event_espresso') . "
            </a>
        </div>"
        );
        parent::__construct($options_array);
    }
}
// End of file ConfirmEventDeletionForm.php
// Location: EventEspresso\admin_pages\events\form_sections/ConfirmEventDeletionForm.php
