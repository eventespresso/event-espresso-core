<?php

namespace EventEspresso\core\services\notices;

defined('EVENT_ESPRESSO_VERSION') || exit;


/**
 * NoticesInterface
 * Container for holding multiple Notice objects until they can be processed
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
interface NoticesInterface
{

    /**
     * @param string $notice
     * @param string $file
     * @param string $func
     * @param string $line
     */
    public function addAttention($notice, $file = '', $func = '', $line = '');



    /**
     * @param string $notice
     * @param string $file
     * @param string $func
     * @param string $line
     */
    public function addError($notice, $file, $func, $line);



    /**
     * @param string $notice
     * @param string $file
     * @param string $func
     * @param string $line
     */
    public function addSuccess($notice, $file = '', $func = '', $line = '');



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
     * @return Notice[]
     */
    public function getAttention();



    /**
     * @return Notice[]
     */
    public function getError();



    /**
     * @return Notice[]
     */
    public function getSuccess();
}