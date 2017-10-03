<?php

namespace EventEspresso\core\services\notices;

defined('EVENT_ESPRESSO_VERSION') || exit;


/**
 * NoticesContainerInterface
 * Container for holding multiple Notice objects until they can be processed
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
interface NoticesContainerInterface
{

    /**
     * @param string $notice
     * @param string $file
     * @param string $func
     * @param string $line
     * @param bool   $dismissible
     */
    public function addInformation($notice, $file = '', $func = '', $line = '', $dismissible = true);


    /**
     * @param string $notice
     * @param string $file
     * @param string $func
     * @param string $line
     * @param bool   $dismissible
     * @return
     */
    public function addAttention($notice, $file = '', $func = '', $line = '', $dismissible = true);



    /**
     * @param string $notice
     * @param string $file
     * @param string $func
     * @param string $line
     * @param bool   $dismissible
     */
    public function addError($notice, $file, $func, $line, $dismissible = true);



    /**
     * @param string $notice
     * @param string $file
     * @param string $func
     * @param string $line
     * @param bool   $dismissible
     */
    public function addSuccess($notice, $file = '', $func = '', $line = '', $dismissible = true);



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
