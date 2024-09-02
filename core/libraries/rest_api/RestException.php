<?php

namespace EventEspresso\core\libraries\rest_api;

use EE_Error;
use Exception;

/**
 * Class Exception
 * similar to EE's EE_Error, except has space to hold the "data" we
 * want to eventually pass to WP_Error
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 *
 */
class RestException extends EE_Error
{
    protected array $wp_error_data = [];

    protected string $wp_error_code = '';


    public function __construct(
        string $string_code,
        string $message,
        array $wp_error_data = [],
        ?Exception $previous = null
    ) {
        $this->wp_error_code = $string_code;
        $this->wp_error_data = $wp_error_data;

        parent::__construct(
            $message,
            ! empty($wp_error_data['status']) ? $wp_error_data['status'] : 500,
            $previous
        );
    }


    /**
     * Array of data that may have been set during the constructor, intended for WP_Error's data
     *
     * @return array
     */
    public function getData(): array
    {
        return $this->wp_error_data;
    }


    /**
     * Gets the error string
     *
     * @return string
     */
    public function getStringCode(): string
    {
        return $this->wp_error_code;
    }
}
