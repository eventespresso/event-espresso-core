<?php

namespace EventEspresso\core\services\commands\notices;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class ConvertNotices
 * Converts notifications in a CommandHandlerNotices into another format such as EE_Error notifications
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
abstract class ConvertNotices
{

    /**
     * @var CommandHandlerNotices $notices
     */
    private $notices;

    /**
     * if set to true, then errors will be thrown as exceptions
     *
     * @var boolean $throw_exceptions
     */
    private $throw_exceptions;



    /**
     * ConvertNotices constructor.
     *
     * @param CommandHandlerNotices $notices
     * @param bool                  $throw_exceptions
     */
    public function __construct(CommandHandlerNotices $notices, $throw_exceptions = false)
    {
        $this->notices = $notices;
        $this->throw_exceptions = $throw_exceptions;
    }



    /**
     * @return CommandHandlerNotices
     */
    public function getNotices()
    {
        return $this->notices;
    }



    /**
     * @return bool
     */
    public function getThrowExceptions()
    {
        return $this->throw_exceptions;
    }



    /**
     * Converts CommandHandlerNotice objects into other format
     */
    abstract public function process();


}
