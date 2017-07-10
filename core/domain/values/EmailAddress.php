<?php

namespace EventEspresso\core\domain\values;

use EventEspresso\core\domain\services\validation\email\EmailValidationException;
use EventEspresso\core\domain\services\validation\email\EmailValidatorInterface;

defined('EVENT_ESPRESSO_VERSION') || exit;


/**
 * Class EmailAddress
 * Value Object for representing a valid email address
 *
 * @package       EventEspresso\core\domain\values
 * @author        Brent Christensen
 * @since         $VID:$
 */
class EmailAddress
{

    /**
     * @var string $email_address
     */
    private $email_address;



    /**
     * EmailAddress constructor.
     *
     * @param string                  $email_address
     * @param EmailValidatorInterface $validator
     * @throws EmailValidationException
     */
    public function __construct($email_address, EmailValidatorInterface $validator)
    {
        $validator->validate($email_address);
        $this->email_address = $email_address;
    }



    /**
     * returns the string value for this EmailAddress
     *
     * @return string
     */
    public function get()
    {
        return $this->email_address;
    }



    /**
     * compare another EmailAddress to this one to determine if they are the same
     *
     * @param EmailAddress $address
     * @return bool
     */
    public function equals(EmailAddress $address)
    {
        return strtolower((string)$this) === strtolower((string)$address);
    }


    /**
     * allows an EmailAddress object to be used as a string
     *
     * @return string
     */
    public function __toString()
    {
        return $this->email_address;
    }



}
// Location: EmailAddress.php
