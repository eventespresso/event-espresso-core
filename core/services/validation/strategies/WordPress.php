<?php

namespace EventEspresso\core\services\validation\strategies;

use EventEspresso\core\domain\services\validation\EmailValidationException;

defined('EVENT_ESPRESSO_VERSION') || exit('No direct script access allowed');



/**
 * Class WordPressEmailValidation
 * Description
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          $VID:$
 */
class WordPress extends Basic
{

    /**
     *
     * @param $input
     * @return boolean
     * @throws EmailValidationException
     */
    public function validate($input)
    {
        parent::validate($input);
        if( ! is_email($input)){
            throw new EmailValidationException(
                esc_html__('The email address provided is not valid.', 'event_espresso')
            );
        }
        return true;
    }


}
// End of file WordPressEmailValidation.php
// Location: core\services\validation/WordPressEmailValidation.php