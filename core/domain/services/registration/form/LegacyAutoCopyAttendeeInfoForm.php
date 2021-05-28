<?php

namespace EventEspresso\core\domain\services\registration\form;

use EE_Form_Section_HTML;
use EEH_Template;

class LegacyAutoCopyAttendeeInfoForm extends EE_Form_Section_HTML
{

    /**
     * LegacyCopyAttendeeInfoForm constructor.
     */
    public function __construct(string $slug)
    {
        parent::__construct(
            EEH_Template::locate_template(
                SPCO_REG_STEPS_PATH . $slug . '/_auto_copy_attendee_info.template.php',
                apply_filters(
                    'FHEE__EE_SPCO_Reg_Step_Attendee_Information__auto_copy_attendee_info__template_args',
                    []
                ),
                true,
                true
            )
        );
    }
}