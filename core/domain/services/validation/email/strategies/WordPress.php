<?php

namespace EventEspresso\core\domain\services\validation\email\strategies;

use EventEspresso\core\domain\services\validation\email\EmailValidationException;

defined('EVENT_ESPRESSO_VERSION') || exit('No direct script access allowed');



/**
 * Class WordPressEmailValidation
 * Uses the WP core is_email() function to validate the email address.
 * Does not allow for International charsets.
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          $VID:$
 */
class WordPress extends Basic
{

    /**
     *
     * @param string $email_address
     * @return boolean
     * @throws EmailValidationException
     */
    public function validate($email_address)
    {
        parent::validate($email_address);
        if( ! is_email($email_address)){
            throw new EmailValidationException(
                esc_html__('The email address provided is not valid.', 'event_espresso')
            );
        }
        return true;
    }


}
// End of file WordPressEmailValidation.php
// Location: core\services\validation/WordPressEmailValidation.php
