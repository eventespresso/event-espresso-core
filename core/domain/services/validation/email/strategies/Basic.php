<?php

namespace EventEspresso\core\domain\services\validation\email\strategies;

use EventEspresso\core\domain\services\validation\email\EmailValidationException;
use EventEspresso\core\domain\services\validation\email\EmailValidatorInterface;

/**
 * Class Basic
 * Performs super basic email validation
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 */
class Basic implements EmailValidatorInterface
{

    /**
     * @param string $email_address
     * @return bool
     * @throws EmailValidationException
     */
    public function validate($email_address)
    {
        if (! preg_match('/^.+\@\S+$/', $email_address)) {
            // email not in correct {string}@{string} format
            throw new EmailValidationException(
                esc_html__('Email does not have the required @ sign.', 'event_espresso')
            );
        }
        $atIndex = $this->getAtIndex($email_address);
        $local = $this->getLocalPartOfEmail($email_address, $atIndex);
        $localLen = strlen($local);
        if ($localLen < 1) {
            // no local part
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
        if ($local[0] === '.') {
            // local part starts with '.'
            throw new EmailValidationException(
                esc_html__('Email local-part (before the @) must not begin with a period.', 'event_espresso')
            );
        }
        if ($local[ $localLen - 1 ] === '.') {
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
        $domain = $this->getDomainPartOfEmail($email_address, $atIndex);
        $domainLen = strlen($domain);
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
        if (preg_match('/\\.\\./', $domain)) {
            // domain part has two consecutive dots
            throw new EmailValidationException(
                esc_html__('Email domain (after the @) must not have two consecutive periods.', 'event_espresso')
            );
        }
        return true;
    }


    /**
     * returns the location of the @ symbol
     *
     * @param string $email_address
     * @return bool|string
     */
    protected function getAtIndex($email_address)
    {
        return strrpos($email_address, '@');
    }


    /**
     * Gets the local part of the email
     *
     * @param string   $email_address
     * @param bool|int $atIndex
     * @return bool|string
     */
    protected function getLocalPartOfEmail($email_address, $atIndex)
    {
        return substr($email_address, 0, $atIndex);
    }


    /**
     * Gets the domain part of the email
     *
     * @param string   $email_address
     * @param bool|int $atIndex
     * @return bool|string
     */
    protected function getDomainPartOfEmail($email_address, $atIndex)
    {
        return substr($email_address, $atIndex + 1);
    }
}
