<?php

namespace EventEspresso\core\services\notices;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class NoticesContainer
 * Container for holding multiple Notice objects until they can be processed
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class NoticesContainer implements NoticesContainerInterface
{


    /**
     * @var NoticeInterface[] $attention
     */
    private $attention = array();


    /**
     * @var NoticeInterface[] $error
     */
    private $error = array();


    /**
     * @var NoticeInterface[] $success
     */
    private $success = array();



    /**
     * @param string $notice
     * @param string $file
     * @param string $func
     * @param string $line
     */
    public function addAttention($notice, $file = '', $func = '', $line = '')
    {
        $this->attention[] = new Notice(Notice::ATTENTION, $notice, $file, $func, $line);
    }



    /**
     * @param string $notice
     * @param string $file
     * @param string $func
     * @param string $line
     */
    public function addError($notice, $file, $func, $line)
    {
        $this->error[] = new Notice(Notice::ERROR, $notice, $file, $func, $line);
    }



    /**
     * @param string $notice
     * @param string $file
     * @param string $func
     * @param string $line
     */
    public function addSuccess($notice, $file = '', $func = '', $line = '')
    {
        $this->success[] = new Notice(Notice::SUCCESS, $notice, $file, $func, $line);
    }



    /**
     * @return boolean
     */
    public function hasAttention()
    {
        return ! empty($this->attention);
    }



    /**
     * @return boolean
     */
    public function hasError()
    {
        return ! empty($this->error);
    }



    /**
     * @return boolean
     */
    public function hasSuccess()
    {
        return ! empty($this->success);
    }



    /**
     * @return int
     */
    public function countAttention()
    {
        return count($this->attention);
    }



    /**
     * @return int
     */
    public function countError()
    {
        return count($this->error);
    }



    /**
     * @return int
     */
    public function countSuccess()
    {
        return count($this->success);
    }



    /**
     * @return NoticeInterface[]
     */
    public function getAttention()
    {
        return $this->attention;
    }



    /**
     * @return NoticeInterface[]
     */
    public function getError()
    {
        return $this->error;
    }



    /**
     * @return NoticeInterface[]
     */
    public function getSuccess()
    {
        return $this->success;
    }


}
