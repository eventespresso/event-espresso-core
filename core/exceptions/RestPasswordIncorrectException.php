<?php

namespace EventEspresso\core\exceptions;

use EventEspresso\core\libraries\rest_api\RestException;

/**
 * Class RestPasswordIncorrectException
 *
 * Exception thrown by the REST API when the password supplied was incorrect.
 *
 * @package     Event Espresso
 * @author         Mike Nelson
 * @since         4.9.74.p
 *
 */
class RestPasswordIncorrectException extends RestException
{
    public function __construct($previous = null)
    {
        parent::__construct(
            'rest_post_incorrect_password',
            esc_html__('Incorrect password.', 'event_espresso'),
            array(
                'status' => 403,
            ),
            $previous
        );
    }
}
// End of file RestPasswordIncorrectException.php
// Location: EventEspresso\core\exceptions/RestPasswordIncorrectException.php
