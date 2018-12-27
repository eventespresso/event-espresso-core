<?php

namespace EventEspresso\core\domain\services\validation\email\strategies;

use EventEspresso\core\domain\services\validation\email\EmailValidationException;

/**
 * Class EmailValidationInternationalDNS
 * Validates the email in the same way as the parent, but also
 * verifies the domain exists.
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 */
class InternationalDNS extends International
{

    /**
     * Validates the email in teh same way as the parent, but also
     * verifies the domain exists.
     *
     * @param string $email_address
     * @return bool
     * @throws EmailValidationException
     */
    public function validate($email_address)
    {
        parent::validate($email_address);
        $domain = $this->getDomainPartOfEmail(
            $email_address,
            $this->getAtIndex($email_address)
        );
        if (! checkdnsrr($domain, 'MX')) {
            // domain not found in MX records
            throw new EmailValidationException(
                __(
                // @codingStandardsIgnoreStart
                    'Although the email address provided is formatted correctly, a valid "MX record" could not be located for that address and domain. Please enter a valid email address.',
                    // @codingStandardsIgnoreEnd
                    'event_espresso'
                )
            );
        }
        if (! checkdnsrr($domain, 'A')) {
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
