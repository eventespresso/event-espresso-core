<?php

namespace EventEspresso\core\services\validation\strategies;

use EventEspresso\core\services\validation\strategies\EmailValidationInterface;
use EventEspresso\core\domain\services\validation\EmailValidationException;

defined('EVENT_ESPRESSO_VERSION') || exit('No direct script access allowed');



/**
 * Class Basic
 * Performs super basic email validation
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          $VID:$
 */
class Basic implements EmailValidationInterface
{

    /**
     * @param string $input
     * @return bool
     * @throws EmailValidationException
     */
    public function validate($input)
    {
        if (! preg_match('/^.+\@\S+$/', $input)) {
            // email not in correct {string}@{string} format
            throw new EmailValidationException(
                esc_html__('Email does not have the required @ sign.', 'event_espresso')
            );
        } else {
            $domain = $this->getDomainPartOfEmail($input);
            $local = $this->getLocalPartOfEmail($input);
            $localLen = strlen($local);
            $domainLen = strlen($domain);
            if ($localLen < 1) {
                //no local part
                throw new EmailValidationException(
                    esc_html__('Email local-part (before the @) is required.', 'event_espresso')
                );
            }
            if ($localLen > 64) {
                // local part length exceeded
                throw new EmailValidationException(
                    esc_html__('Email local-part (before the @) is too long.', 'event_espresso')
                );
            }
            if ($domainLen < 1) {
                throw new EmailValidationException(
                    esc_html__('Email domain (after the @) is required.', 'event_espresso')
                );
            }
            if ($domainLen > 255) {
                // domain part length exceeded
                throw new EmailValidationException(
                    esc_html__('Email domain (after the @) is too long.', 'event_espresso')
                );
            }
            if ($local[0] === '.') {
                // local part starts with '.'
                throw new EmailValidationException(
                    esc_html__('Email local-part (before the @) must not begin with a period.', 'event_espresso')
                );
            }
            if ($local[$localLen - 1] === '.') {
                // local part starts or ends with '.'
                throw new EmailValidationException(
                    esc_html__('Email local-part (before the @) must not end with a period.', 'event_espresso')
                );
            }
            if (preg_match('/\\.\\./', $local)) {
                // local part has two consecutive dots
                throw new EmailValidationException(
                    esc_html__(
                        'Email local-part (before the @) must not have two consecutive periods.',
                        'event_espresso'
                    )
                );
            }
            if (preg_match('/\\.\\./', $domain)) {
                // domain part has two consecutive dots
                throw new EmailValidationException(
                    esc_html__('Email domain (after the @) must not have two consecutive periods.', 'event_espresso')
                );
            }
        }
        return true;
    }



    /**
     * Gets the local part of the email
     * @param $input
     * @return bool|string
     */
    protected function getLocalPartOfEmail($input)
    {
        $atIndex = strrpos($input, '@');
        return substr($input, 0, $atIndex);
    }



    /**
     * Gets the domain part of the email
     * @param $input
     * @return bool|string
     */
    protected function getDomainPartOfEmail($input)
    {
        $atIndex = strrpos($input, '@');
        return substr($input, $atIndex + 1);
    }
}
// End of file Basic.php
// Location: core\services\validation/Basic.php