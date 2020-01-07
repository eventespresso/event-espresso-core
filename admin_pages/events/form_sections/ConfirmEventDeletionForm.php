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
        if(! isset($options_array['subsections'])){
            $options_array['subsections'] = [];
        }
        if(! isset($options_array['subsections']['events'])){
            $events_subsection = new \EE_Form_Section_Proper();
            $options_array['subsections']['events'] = $events_subsection;
        }
        $events = EEM_Event::instance()->get_all_deleted(
            [
                [
                    'EVT_ID' => ['IN',$event_ids]
                ]
            ]
        );
        if( ! is_array($events)){
            throw new UnexpectedEntityException($event_ids, 'array');
        }
        $this->events = $events;
        $events_inputs = [
            'intro' => new EE_Form_Section_HTML(
                EEH_HTML::h2(esc_html__('In order to prevent accidentally deleting the wrong events, please enter the unique URL slug of each event.', 'event_espresso'))
            )
        ];
        foreach($events as $event){
             $events_inputs[$event->slug()] = new \EE_Text_Input(
                [
                    'html_label_text' => esc_html(
                        sprintf(
                            __('Please enter the URL slug of "%1$s" (hint: it’s "%2$s")', 'event_espresso'),
                            $event->name(),
                            $event->slug()
                        )
                    ),
                    'required' => false
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

    public function _validate()
    {
        parent::_validate();
        $events_subsection = $this->get_proper_subsection('events');
        foreach($this->events as $event){
            $event_input = $events_subsection->get_input($event->slug());
            if((string)$event_input->normalized_value() !== $event->slug()){
                $event_input->add_validation_error(
                    sprintf(
                        esc_html__('You entered the incorrect URL slug for the event "%1$s". Please enter it again (use "%2$s") to confirm you are deleting the correct event.', 'event_espresso'),
                        $event->name(),
                        $event->slug()
                    )
                );
            }
        }
    }

}
// End of file ConfirmEventDeletionForm.php
// Location: EventEspresso\admin_pages\events\form_sections/ConfirmEventDeletionForm.php
