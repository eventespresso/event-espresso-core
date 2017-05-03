<?php

namespace EventEspresso\core\services\commands\notices;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class CommandHandlerNotices
 * Container for holding multiple CommandHandlerNotice objects until they can be processed
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class CommandHandlerNotices
{


    /**
     * @var CommandHandlerNotice[] $attention
     */
    private $attention = array();


    /**
     * @var CommandHandlerNotice[] $error
     */
    private $error = array();


    /**
     * @var CommandHandlerNotice[] $success
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
        $this->attention[] = new CommandHandlerNotice(CommandHandlerNotice::ATTENTION, $notice, $file, $func, $line);
    }



    /**
     * @param string $notice
     * @param string $file
     * @param string $func
     * @param string $line
     */
    public function addError($notice, $file, $func, $line)
    {
        $this->error[] = new CommandHandlerNotice(CommandHandlerNotice::ERROR, $notice, $file, $func, $line);
    }



    /**
     * @param string $notice
     * @param string $file
     * @param string $func
     * @param string $line
     */
    public function addSuccess($notice, $file = '', $func = '', $line = '')
    {
        $this->success[] = new CommandHandlerNotice(CommandHandlerNotice::SUCCESS, $notice, $file, $func, $line);
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
     * @return CommandHandlerNotice[]
     */
    public function getAttention()
    {
        return $this->attention;
    }



    /**
     * @return CommandHandlerNotice[]
     */
    public function getError()
    {
        return $this->error;
    }



    /**
     * @return CommandHandlerNotice[]
     */
    public function getSuccess()
    {
        return $this->success;
    }


}
