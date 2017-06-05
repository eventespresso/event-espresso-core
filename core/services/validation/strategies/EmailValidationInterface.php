<?php

namespace EventEspresso\core\services\validation\strategies;

use EventEspresso\core\domain\services\validation\EmailValidationException;

defined('EVENT_ESPRESSO_VERSION') || exit('No direct script access allowed');



/**
 * Class EmailValidationInterface
 * Description
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          $VID:$
 */
interface EmailValidationInterface
{

    /**
     * Validates the email. If it is invalid, throws EmailValidationException
     * @param string $input
     * @return boolean
     * @throws EmailValidationException
     */
    public function validate($input);
}
// End of file EmailValidationInterface.php
// Location: core\services\validation\strategies/EmailValidationInterface.php
