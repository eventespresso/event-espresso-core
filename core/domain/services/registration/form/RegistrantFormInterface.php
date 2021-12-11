<?php

namespace EventEspresso\core\domain\services\registration\form;

interface RegistrantFormInterface
{
    /**
     * @return bool
     */
    public function hasQuestions(): bool;
}
