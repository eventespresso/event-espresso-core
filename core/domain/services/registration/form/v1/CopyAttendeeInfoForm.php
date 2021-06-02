<?php

namespace EventEspresso\core\domain\services\registration\form\v1;

use EE_Checkbox_Multi_Input;
use EE_Error;
use EE_Form_Section_HTML;
use EE_Form_Section_Proper;
use EE_Registration;
use EE_Template_Layout;
use ReflectionException;

class CopyAttendeeInfoForm extends EE_Form_Section_Proper
{
    /**
     * CopyAttendeeInfoForm constructor.
     *
     * @param EE_Registration[] $registrations
     * @param string            $slug
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function __construct(array $registrations, string $slug)
    {
        parent::__construct(
            [
                'subsections'     => $this->copyAttendeeInfoInputs($registrations),
                'layout_strategy' => new EE_Template_Layout(
                    [
                        'layout_template_file'     => SPCO_REG_STEPS_PATH
                                                      . $slug
                                                      . '/copy_attendee_info.template.php',
                        'begin_template_file'      => null,
                        'input_template_file'      => null,
                        'subsection_template_file' => null,
                        'end_template_file'        => null,
                    ]
                ),
            ]);
    }


    /**
     * @param array $registrations
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function copyAttendeeInfoInputs(array $registrations): array
    {
        $copy_attendee_info_inputs = [];
        $prev_ticket               = null;
        foreach ($registrations as $registration) {
            // for all  attendees other than the primary attendee
            if ($registration instanceof EE_Registration && ! $registration->is_primary_registrant()) {
                // if this is a new ticket OR if this is the very first additional attendee after the primary attendee
                if ($registration->ticket()->ID() !== $prev_ticket) {
                    $item_name   = $registration->ticket()->name();
                    $item_name   .= $registration->ticket()->description() !== ''
                        ? ' - ' . $registration->ticket()->description()
                        : '';
                    $copy_attendee_info_inputs[ 'spco_copy_attendee_chk[ticket-' . $registration->ticket()->ID() . ']' ]
                                 = new EE_Form_Section_HTML(
                        '<h6 class="spco-copy-attendee-event-hdr">' . $item_name . '</h6>'
                    );
                    $prev_ticket = $registration->ticket()->ID();
                }

                $copy_attendee_info_inputs[ 'spco_copy_attendee_chk[' . $registration->ID() . ']' ]
                    = new EE_Checkbox_Multi_Input(
                    [
                        $registration->ID() => sprintf(
                            esc_html_x('Attendee #%s', 'Attendee #123', 'event_espresso'),
                            $registration->count()
                        ),
                    ],
                    [
                        'html_id'                 => 'spco-copy-attendee-chk-' . $registration->reg_url_link(),
                        'html_class'              => 'spco-copy-attendee-chk ee-do-not-validate',
                        'display_html_label_text' => false,
                    ]
                );
            }
        }
        return $copy_attendee_info_inputs;
    }
}
