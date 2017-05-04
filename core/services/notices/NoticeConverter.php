<?php

namespace EventEspresso\core\services\notices;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class NoticeConverter
 * Converts notifications in a NoticesContainerInterface container into another format such as EE_Error notifications
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
abstract class NoticeConverter implements NoticeConverterInterface
{

    /**
     * @var NoticesContainerInterface $notices
     */
    private $notices;

    /**
     * if set to true, then errors will be thrown as exceptions
     *
     * @var boolean $throw_exceptions
     */
    private $throw_exceptions;



    /**
     * NoticeConverter constructor.
     *
     * @param NoticesContainerInterface $notices
     * @param bool                      $throw_exceptions
     */
    public function __construct(NoticesContainerInterface $notices, $throw_exceptions = false)
    {
        $this->notices = $notices;
        $this->throw_exceptions = $throw_exceptions;
    }



    /**
     * @return NoticesContainerInterface
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
     * Converts NoticesContainerInterface objects into other format
     */
    abstract public function process();


}
