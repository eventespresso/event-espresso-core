<?php

namespace EventEspresso\core\domain\services\registration\form\v1;

use EE_Form_Section_HTML;
use EEH_Template;

class AutoCopyAttendeeInfoForm extends EE_Form_Section_HTML
{
    /**
     * CopyAttendeeInfoForm constructor.
     */
    public function __construct(string $slug)
    {
        parent::__construct(
            EEH_Template::locate_template(
                SPCO_REG_STEPS_PATH . $slug . '/_auto_copy_attendee_info.template.php',
                apply_filters(
                    'FHEE__EventEspresso_core_domain_services_registration_form_v1_AutoCopyAttendeeInfoForm__construct__template_args',
                    []
                ),
                true,
                true
            )
        );
    }
}
