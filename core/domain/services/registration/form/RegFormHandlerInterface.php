<?php

namespace EventEspresso\core\domain\services\registration\form;

use EE_Registration;

interface RegFormHandlerInterface
{
    /**
     * @return int
     */
    public function attendeeCount(): int;


    /**
     * @param EE_Registration[] $registrations
     * @param array[][]         $reg_form_data
     * @return bool
     */
    public function processRegistrations(array $registrations, array $reg_form_data): bool;
}
