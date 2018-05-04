<?php

namespace EventEspresso\core\services\notices;

/**
 * Class NoticeConverter
 * Converts notifications in a NoticesContainerInterface container into another format such as EE_Error notifications
 *
 * @package       Event Espresso
 * @author        Brent Christensen
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
     * @param bool $throw_exceptions
     */
    public function __construct($throw_exceptions = false)
    {
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
     * @param NoticesContainerInterface $notices
     */
    protected function setNotices(NoticesContainerInterface $notices)
    {
        $this->notices = $notices;
    }


    /**
     * @return bool
     */
    public function getThrowExceptions()
    {
        return $this->throw_exceptions;
    }


    /**
     * @param bool $throw_exceptions
     */
    public function setThrowExceptions($throw_exceptions)
    {
        $this->throw_exceptions = filter_var($throw_exceptions, FILTER_VALIDATE_BOOLEAN);
    }


    /**
     * @return void;
     */
    public function clearNotices()
    {
        $this->notices = null;
    }
}
