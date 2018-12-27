<?php

namespace EventEspresso\core\services\notices;

/**
 * Class Notice
 * DTO for temporarily holding notification information until it can be processed
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 *
 */
interface NoticeInterface
{

    /**
     * @return string
     */
    public function type();


    /**
     * @return string
     */
    public function message();


    /**
     * @return bool
     */
    public function isDismissible();


    /**
     * @return string
     */
    public function file();


    /**
     * @return string
     */
    public function func();


    /**
     * @return string
     */
    public function line();
}
