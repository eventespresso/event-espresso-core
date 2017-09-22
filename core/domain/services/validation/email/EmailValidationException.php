<?php

namespace EventEspresso\core\domain\services\validation\email;

use DomainException;

defined('EVENT_ESPRESSO_VERSION') || exit('No direct script access allowed');



/**
 * Class EmailValidationException
 * Exception that occurs when an invalid email is detected.
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          $VID:$
 */
class EmailValidationException extends DomainException
{
}
// End of file EmailValidationException.php
// Location: core\domain\services\validation/EmailValidationException.php
