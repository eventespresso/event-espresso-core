<?php

namespace EventEspresso\core\services\notices;

/**
 * NoticesContainerInterface
 * Container for holding multiple Notice objects until they can be processed
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 *
 */
interface NoticesContainerInterface
{

    /**
     * @param string $notice
     * @param bool   $dismissible
     * @param string $file
     * @param string $func
     * @param string $line
     */
    public function addInformation($notice, $dismissible = true, $file = '', $func = '', $line = '');


    /**
     * @param string $notice
     * @param bool   $dismissible
     * @param string $file
     * @param string $func
     * @param string $line
     * @return
     */
    public function addAttention($notice, $dismissible = true, $file = '', $func = '', $line = '');



    /**
     * @param string $notice
     * @param bool   $dismissible
     * @param string $file
     * @param string $func
     * @param string $line
     */
    public function addError($notice, $dismissible = true, $file, $func, $line);



    /**
     * @param string $notice
     * @param bool   $dismissible
     * @param string $file
     * @param string $func
     * @param string $line
     */
    public function addSuccess($notice, $dismissible = true, $file = '', $func = '', $line = '');



    /**
     * @return boolean
     */
    public function hasInformation();



    /**
     * @return boolean
     */
    public function hasAttention();



    /**
     * @return boolean
     */
    public function hasError();



    /**
     * @return boolean
     */
    public function hasSuccess();



    /**
     * @return int
     */
    public function countInformation();



    /**
     * @return int
     */
    public function countAttention();



    /**
     * @return int
     */
    public function countError();



    /**
     * @return int
     */
    public function countSuccess();



    /**
     * @return NoticeInterface[]
     */
    public function getInformation();



    /**
     * @return NoticeInterface[]
     */
    public function getAttention();



    /**
     * @return NoticeInterface[]
     */
    public function getError();



    /**
     * @return NoticeInterface[]
     */
    public function getSuccess();
}
