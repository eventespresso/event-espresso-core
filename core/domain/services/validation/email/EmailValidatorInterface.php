<?php

namespace EventEspresso\core\domain\services\validation\email;


use EventEspresso\core\domain\services\validation\email\EmailValidationException;

defined('EVENT_ESPRESSO_VERSION') || exit('No direct script access allowed');



/**
 * Class EmailValidationInterface
 * Validates the supplied email address
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          $VID:$
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
// End of file EmailValidationInterface.php
// Location: core\services\validation\strategies/EmailValidationInterface.php
