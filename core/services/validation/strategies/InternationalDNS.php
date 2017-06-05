<?php

namespace EventEspresso\core\services\validation\strategies;

use EventEspresso\core\domain\services\validation\EmailValidationException;

defined('EVENT_ESPRESSO_VERSION') || exit('No direct script access allowed');



/**
 * Class EmailValidationInternationalDNS
 * Validates the email in teh same way as the parent, but also
 * verifies the domain exists.
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          $VID:$
 */
class InternationalDNS extends International
{

    /**
     * Validates the email in teh same way as the parent, but also
     * verifies the domain exists.
     * @param string $input
     * @return bool
     * @throws EmailValidationException
     */
    public function validate($input)
    {
        parent::validate($input);
        $domain = $this->getDomainPartOfEmail($input);
        if (! checkdnsrr($domain, "MX")) {
            // domain not found in MX records
            throw new EmailValidationException(
                __(
                    // @codingStandardsIgnoreStart
                    'Although the email address provided is formatted correctly, a valid "MX record" could not be located for that address and domain. Please enter a valid email address.',
                    // @codingStandardsIgnoreEnd
                    'event_espresso'
                )
            );
        } elseif (! checkdnsrr($domain, "A")) {
            // domain not found in A records
            throw new EmailValidationException(
                __(
                    // @codingStandardsIgnoreStart
                    'Although the email address provided is formatted correctly, a valid "A record" could not be located for that address and domain. Please enter a valid email address.',
                    // @codingStandardsIgnoreEnd
                    'event_espresso'
                )
            );
        }
        return true;
    }
}
// End of file EmailValidationInternationalDNS.php
// Location: core\services\validation/EmailValidationInternationalDNS.php