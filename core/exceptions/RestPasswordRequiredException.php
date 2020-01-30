<?php

namespace EventEspresso\core\exceptions;

use EventEspresso\core\libraries\rest_api\RestException;

/**
 * Class RestPasswordRequired
 *
 * An exception thrown by the REST API when a password is required to access something.
 * Can be caught in cases where upstream logic knows the password isn't required, and instead other consequences actions
 * taken (eg, removing protected fields, or nothing)
 *
 * @package     Event Espresso
 * @author         Mike Nelson
 * @since         4.9.74.p
 *
 */
class RestPasswordRequiredException extends RestException
{
    public function __construct($previous = null)
    {
        parent::__construct(
            'rest_post_password_required',
            esc_html__('A password is required to access this content.', 'event_espresso'),
            array(
                'status' => 403,
            ),
            $previous
        );
    }
}
// End of file RestPasswordRequired.php
// Location: EventEspresso\core\exceptions/RestPasswordRequired.php
