<?php

namespace EventEspresso\core\services\notices;

use EventEspresso\core\exceptions\InvalidDataTypeException;

/**
 * Class Notice
 * DTO for temporarily holding notification information until it can be processed
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 */
class Notice implements NoticeInterface
{

    const ERROR = 'error';

    const SUCCESS = 'success';

    const ATTENTION = 'attention'; // alias for warning

    const INFORMATION = 'information';

    /**
     * @var string $type
     */
    private $type;


    /**
     * @var string $message
     */
    private $message;


    /**
     * @var string $file
     */
    private $file;


    /**
     * @var string $func
     */
    private $func;


    /**
     * @var string $line
     */
    private $line;


    /**
     * @var boolean $dismissible
     */
    private $dismissible;


    /**
     * Notice constructor.
     *
     * @param string $type
     * @param string $message
     * @param bool   $dismissible
     * @param string $file
     * @param string $func
     * @param string $line
     * @throws InvalidDataTypeException
     */
    public function __construct($type, $message, $dismissible = true, $file = '', $func = '', $line = '')
    {
        $this->setType($type);
        $this->setMessage($message);
        $this->setDismissible($dismissible);
        $this->setFile($file);
        $this->setFunc($func);
        $this->setLine($line);
    }


    /**
     * @return array
     */
    private function types()
    {
        return (array) apply_filters(
            'FHEE__EventEspresso_core_services_notices_Notice__types',
            array(
                Notice::ERROR,
                Notice::SUCCESS,
                Notice::ATTENTION,
                Notice::INFORMATION,
            )
        );
    }


    /**
     * @return string
     */
    public function type()
    {
        return $this->type;
    }


    /**
     * @return string
     */
    public function message()
    {
        return $this->message;
    }


    /**
     * @return string
     */
    public function file()
    {
        return $this->file;
    }


    /**
     * @return string
     */
    public function func()
    {
        return $this->func;
    }


    /**
     * @return string
     */
    public function line()
    {
        return $this->line;
    }


    /**
     * @return bool
     */
    public function isDismissible()
    {
        return $this->dismissible;
    }


    /**
     * @param string $type
     * @throws InvalidDataTypeException
     */
    private function setType($type)
    {
        if (! in_array($type, $this->types(), true)) {
            throw new InvalidDataTypeException(
                '$type',
                $type,
                $this->invalidTypeMessage()
            );
        }
        $this->type = $type;
    }


    /**
     * gets the $invalid_type_message string
     */
    private function invalidTypeMessage()
    {
        return apply_filters(
            'FHEE__EventEspresso_core_services_notices_Notice__invalidTypeMessage',
            sprintf(
                esc_html__(
                    ' one of the following notice types was expected: %1$s %2$s',
                    'event_espresso'
                ),
                '<br />',
                var_export($this->types(), true)
            )
        );
    }


    /**
     * @param string $message
     * @throws InvalidDataTypeException
     */
    private function setMessage($message)
    {
        if (empty($message) || ! is_string($message)) {
            throw new InvalidDataTypeException(
                '$message',
                $message,
                esc_html__('non empty string', 'event_espresso')
            );
        }
        $this->message = $message;
    }


    /**
     * @param string $file
     * @throws InvalidDataTypeException
     */
    private function setFile($file)
    {
        if ($this->type === Notice::ERROR && (empty($file) || ! is_string($file))) {
            throw new InvalidDataTypeException(
                '$file',
                $file,
                esc_html__('non empty string', 'event_espresso')
            );
        }
        $this->file = $file;
    }


    /**
     * @param string $func
     * @throws InvalidDataTypeException
     */
    private function setFunc($func)
    {
        if ($this->type === Notice::ERROR && (empty($func) || ! is_string($func))) {
            throw new InvalidDataTypeException(
                '$func',
                $func,
                esc_html__('non empty string', 'event_espresso')
            );
        }
        $this->func = $func;
    }


    /**
     * @param int $line
     * @throws InvalidDataTypeException
     */
    private function setLine($line)
    {
        $line = absint($line);
        if ($this->type === Notice::ERROR && $line === 0) {
            throw new InvalidDataTypeException(
                '$line',
                $line,
                esc_html__('integer', 'event_espresso')
            );
        }
        $this->line = $line;
    }


    /**
     * @param boolean $dismissible
     */
    private function setDismissible($dismissible = true)
    {
        $this->dismissible = filter_var($dismissible, FILTER_VALIDATE_BOOLEAN);
    }
}
