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

    private static $valid_keys = [
        'argc',
        'argv',
        'COMSPEC',
        'DOCUMENT_ROOT',
        'GATEWAY_INTERFACE',
        'HTTP_ACCEPT',
        'HTTP_ACCEPT_ENCODING',
        'HTTP_ACCEPT_LANGUAGE',
        'HTTP_CONNECTION',
        'HTTP_HOST',
        'HTTP_USER_AGENT',
        'PATH',
        'PATHEXT',
        'PHP_SELF',
        'QUERY_STRING',
        'REMOTE_ADDR',
        'REMOTE_PORT',
        'REQUEST_METHOD',
        'REQUEST_TIME',
        'REQUEST_URI',
        'SCRIPT_FILENAME',
        'SCRIPT_NAME',
        'SERVER_ADDR',
        'SERVER_ADMIN',
        'SERVER_NAME',
        'SERVER_PORT',
        'SERVER_PROTOCOL',
        'SERVER_SIGNATURE',
        'SERVER_SOFTWARE',
        'SystemRoot',
        'UNIQUE_ID',
        'WINDIR',
    ];


    /**
     * @param string $value
     * @return mixed|string
     */
    public function clean($key, $value)
    {
        if (! $this->isValidServerKey($key)) {
            return null;
        }

        switch ($key) {
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
                return in_array($value, $valid_types, true) ? $value : 'Basic';
            case 'argc':
            case 'HTTP_DNT':
            case 'HTTP_UPGRADE_INSECURE_REQUESTS':
            case 'SERVER_PORT':
            case 'REMOTE_PORT':
            case 'REQUEST_TIME':
                return filter_var($value, FILTER_SANITIZE_NUMBER_INT);
            case 'REQUEST_TIME_FLOAT':
                return filter_var($value, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
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
                return in_array($value, $valid_types, true) ? $value : 'GET';
            case 'HTTP_HOST':
            case 'QUERY_STRING':
            case 'REQUEST_URI':
            case 'SCRIPT_NAME':
            case 'SERVER_NAME':
                return filter_var($value, FILTER_SANITIZE_URL);
            case 'SERVER_ADMIN':
                return filter_var($value, FILTER_SANITIZE_EMAIL);
            default:
                return filter_var($value, FILTER_SANITIZE_STRING);
        }
    }


    /**
     * @param string $key
     * @return bool
     */
    public function isValidServerKey($key)
    {
        return array_key_exists($key, ServerSanitizer::$valid_keys);
    }
}
