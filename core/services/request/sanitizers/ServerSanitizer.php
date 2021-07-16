<?php

namespace EventEspresso\core\services\request\sanitizers;

/**
 * Class ServerSanitizer
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\services\request\sanitizers
 * @since   $VID:$
 */
class ServerSanitizer
{

    /**
     * @param string $param
     * @return mixed|string
     */
    public function clean($param)
    {
        switch ($param) {
            case 'AUTH_TYPE':
                $valid_types = [
                    'Basic',
                    'Bearer',
                    'Digest',
                    'HOBA',
                    'Mutual',
                    'Negotiate',
                    'OAuth',
                    'SCRAM-SHA-1',
                    'SCRAM-SHA-256',
                    'vapid',
                ];
                return in_array($param, $valid_types, true) ? $param : 'Basic';
            case 'argc':
            case 'HTTP_DNT':
            case 'HTTP_UPGRADE_INSECURE_REQUESTS':
            case 'SERVER_PORT':
            case 'REMOTE_PORT':
            case 'REQUEST_TIME':
                return filter_var($param, FILTER_SANITIZE_NUMBER_INT);
            case 'REQUEST_TIME_FLOAT':
                return filter_var($param,FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
            case 'REQUEST_METHOD':
                $valid_types = [
                    'CONNECT',
                    'DELETE',
                    'GET',
                    'HEAD',
                    'OPTIONS',
                    'PATCH',
                    'POST',
                    'PUT',
                    'TRACE',
                ];
                return in_array($param, $valid_types, true) ? $param : 'GET';
            case 'HTTP_HOST':
            case 'QUERY_STRING':
            case 'REQUEST_URI':
            case 'SCRIPT_NAME':
            case 'SERVER_NAME':
                return filter_var($param, FILTER_SANITIZE_URL);
            case 'SERVER_ADMIN':
                return filter_var($param, FILTER_SANITIZE_EMAIL);
            default:
                return filter_var($param, FILTER_SANITIZE_STRING);
        }
    }
}
