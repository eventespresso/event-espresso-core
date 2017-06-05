<?php

namespace EventEspresso\core\domain\services\validation;

use EventEspresso\core\domain\services\DomainServiceInterface;

defined('EVENT_ESPRESSO_VERSION') || exit('No direct script access allowed');



/**
 * Class EmailValidationService
 * Service that takes care of validating email addresses.
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          $VID:$
 */
interface EmailValidationServiceInterface extends DomainServiceInterface
{

    /**
     * EmailValidationService constructor.
     * Accepts an \EE_Config as an argument.
     * @param string $validation_level one of: 'basic', 'wp_default', 'i18n', or '18n_dns'
     */
    public function __construct($validation_level);

    /**
     * Validates the email address. If it's invalid, an EmailValidationException
     * is thrown that describes why its invalid.
     * @param string $input
     * @return boolean
     * @throws EmailValidationException
     */
    public function validate($input);
}
// End of file EmailValidationService.php
// Location: core\domain\services\validation/EmailValidationService.php
