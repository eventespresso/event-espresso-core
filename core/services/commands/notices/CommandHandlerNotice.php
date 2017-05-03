<?php

namespace EventEspresso\core\services\commands\notices;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class CommandHandlerNotice
 * DTO for temporarily holding notification information until it can be processed
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class CommandHandlerNotice
{

    const ERROR = 'error';
    const ATTENTION = 'attention';
    const SUCCESS = 'success';

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
     * CommandHandlerNotice constructor.
     *
     * @param string $type
     * @param string $message
     * @param string $file
     * @param string $func
     * @param string $line
     */
    public function __construct($type, $message, $file, $func, $line)
    {
        $this->type = $type;
        $this->message = $message;
        $this->file = $file;
        $this->func = $func;
        $this->line = $line;
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



}
