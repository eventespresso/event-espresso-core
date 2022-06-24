<?php

namespace EventEspresso\core\services\notices;

use EventEspresso\core\exceptions\InvalidDataTypeException;

/**
 * Class NoticesContainer
 * Container for holding multiple Notice objects until they can be processed
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 */
class NoticesContainer implements NoticesContainerInterface
{
    /**
     * @var NoticeInterface[] $information
     */
    private $information = array();


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
     * @param bool   $dismissible
     * @param string $file
     * @param string $func
     * @param string $line
     * @throws InvalidDataTypeException
     */
    public function addInformation($notice, $dismissible = true, $file = '', $func = '', $line = '')
    {
        $this->information[] = new Notice(
            Notice::INFORMATION,
            $notice,
            $dismissible,
            $file,
            $func,
            $line
        );
    }


    /**
     * @param string $notice
     * @param bool   $dismissible
     * @param string $file
     * @param string $func
     * @param string $line
     * @throws InvalidDataTypeException
     */
    public function addAttention($notice, $dismissible = true, $file = '', $func = '', $line = '')
    {
        $this->attention[] = new Notice(
            Notice::ATTENTION,
            $notice,
            $dismissible,
            $file,
            $func,
            $line
        );
    }

    // phpcs:disable PEAR.Functions.ValidDefaultValue.NotAtEnd
    /**
     * @param string $notice
     * @param bool   $dismissible
     * @param string $file
     * @param string $func
     * @param string $line
     * @throws InvalidDataTypeException
     */
    public function addError($notice, $dismissible = true, $file = '', $func = '', $line = '')
    {
        $this->error[] = new Notice(
            Notice::ERROR,
            $notice,
            $dismissible,
            $file,
            $func,
            $line
        );
    }


    /**
     * @param string $notice
     * @param bool   $dismissible
     * @param string $file
     * @param string $func
     * @param string $line
     * @throws InvalidDataTypeException
     */
    public function addSuccess($notice, $dismissible = true, $file = '', $func = '', $line = '')
    {
        $this->success[] = new Notice(
            Notice::SUCCESS,
            $notice,
            $dismissible,
            $file,
            $func,
            $line
        );
    }


    /**
     * @return boolean
     */
    public function hasInformation(): bool
    {
        return ! empty($this->information);
    }


    /**
     * @return boolean
     */
    public function hasAttention(): bool
    {
        return ! empty($this->attention);
    }


    /**
     * @return boolean
     */
    public function hasError(): bool
    {
        return ! empty($this->error);
    }


    /**
     * @return boolean
     */
    public function hasSuccess(): bool
    {
        return ! empty($this->success);
    }


    /**
     * @return int
     */
    public function countInformation(): int
    {
        return count($this->information);
    }


    /**
     * @return int
     */
    public function countAttention(): int
    {
        return count($this->attention);
    }


    /**
     * @return int
     */
    public function countError(): int
    {
        return count($this->error);
    }


    /**
     * @return int
     */
    public function countSuccess(): int
    {
        return count($this->success);
    }


    /**
     * @return NoticeInterface[]
     */
    public function getInformation(): array
    {
        return $this->information;
    }


    /**
     * @return NoticeInterface[]
     */
    public function getAttention(): array
    {
        return $this->attention;
    }


    /**
     * @return NoticeInterface[]
     */
    public function getError(): array
    {
        return $this->error;
    }


    /**
     * @return NoticeInterface[]
     */
    public function getSuccess(): array
    {
        return $this->success;
    }
}
