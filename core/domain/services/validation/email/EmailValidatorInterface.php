<?php

namespace EventEspresso\core\domain\services\validation\email;

use EventEspresso\core\domain\services\validation\email\EmailValidationException;

/**
 * Class EmailValidationInterface
 * Validates the supplied email address
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 */
interface EmailValidatorInterface
{

    /**
     * Validates the supplied email address. If it is invalid, throws EmailValidationException
     *
     * @param string $email_address
     * @return boolean
     * @throws EmailValidationException
     */
    public function validate($email_address);
}
