<?php

namespace EventEspresso\core\domain\entities;

use DateTime;
use DateTimeZone;
use DomainException;

/**
 * Class DbSafeDateTime
 * Some versions of PHP do bad things when you try to serialize a DateTime object for storage.
 * This DateTime class extension can be safely serialized and unserialized,
 * because the only data it stores is a string containing all o fits relevant details
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 */
class DbSafeDateTime extends DateTime
{

    // phpcs:disable Generic.NamingConventions.UpperCaseConstantName.ClassConstantNotUpperCase
    /**
     * @type string db_safe_timestamp_format
     */
    const db_safe_timestamp_format = 'Y-m-d H:i:s O e';
    // phpcs:enable

    // phpcs:disable PSR2.Classes.PropertyDeclaration.Underscore
    /**
     * DateTime object converted to a string that includes the date, time, UTC offset, and timezone identifier
     *
     * @type string $_datetime_string
     */
    protected $_datetime_string = '';

    /**
     * where to write the error log to
     *
     * @type string $_error_log_dir
     */
    protected $_error_log_dir = '';
    // phpcs:enable


    /**
     * @param string $error_log_dir
     */
    public function setErrorLogDir($error_log_dir)
    {
        // if the folder path is writable, then except the path + filename, else keep empty
        $this->_error_log_dir = is_writable(str_replace(basename($error_log_dir), '', $error_log_dir))
            ? $error_log_dir
            : '';
    }


    /**
     * @return string
     */
    public function __toString()
    {
        return $this->format(DbSafeDateTime::db_safe_timestamp_format);
    }


    /**
     * @return array
     */
    public function __sleep()
    {
        $this->_datetime_string = $this->format(DbSafeDateTime::db_safe_timestamp_format);
        $date = DateTime::createFromFormat(
            DbSafeDateTime::db_safe_timestamp_format,
            $this->_datetime_string
        );
        if (! $date instanceof DateTime) {
            try {
                // we want a stack trace to determine where the malformed date came from, so...
                throw new DomainException('');
            } catch (DomainException $e) {
                $stack_trace = $e->getTraceAsString();
            }
            $this->writeToErrorLog(
                sprintf(
                    __(
                        'A valid DateTime could not be generated from "%1$s" because the following errors occurred: %2$s %3$s %2$s PHP version: %4$s %2$s Stack Trace: %5$s',
                        'event_espresso'
                    ),
                    $this->_datetime_string,
                    '<br />',
                    print_r(DateTime::getLastErrors(), true),
                    PHP_VERSION,
                    $stack_trace
                )
            );
        }
        return array('_datetime_string');
    }


    /**
     * if an empty or null value got saved to the db for a datetime,
     * then some servers and/or PHP itself will incorrectly convert that date string
     * resulting in "-0001-11-30" for the year-month-day.
     * see the Notes section
     *
     * @link http://php.net/manual/en/datetime.formats.date.php
     * We'll replace those with "0000-00-00" which will allow a valid DateTime object to be created,
     * but still result in the internal date for that object being set to "-0001-11-30 10:00:00.000000".
     * so we're no better off, but at least things won't go fatal on us.
     */
    public function __wakeup()
    {
        $date = self::createFromFormat(
            DbSafeDateTime::db_safe_timestamp_format,
            $this->_datetime_string
        );
        if (! $date instanceof DateTime) {
            $this->writeToErrorLog(
                sprintf(
                    __(
                        'A valid DateTime could not be recreated from "%1$s" because the following errors occurred: %2$s %3$s %2$s PHP version: %4$s',
                        'event_espresso'
                    ),
                    $this->_datetime_string,
                    '<br />',
                    print_r(DateTime::getLastErrors(), true),
                    PHP_VERSION
                )
            );
        } else {
            $this->__construct(
                $date->format(\EE_Datetime_Field::mysql_timestamp_format),
                new DateTimeZone($date->format('e'))
            );
        }
    }


    /**
     * Normalizes incoming date string so that it is a bit more stable for use.
     * @param string $date_string
     * @return string
     */
    public static function normalizeInvalidDate($date_string)
    {
        return str_replace(
            array('-0001-11-29', '-0001-11-30', '0000-00-00'),
            '0000-01-03',
            $date_string
        );
    }


    /**
     * Creates a DbSafeDateTime from ye old DateTime
     *
     * @param DateTime $datetime
     * @return \EventEspresso\core\domain\entities\DbSafeDateTime
     */
    public static function createFromDateTime(DateTime $datetime)
    {
        return new DbSafeDateTime(
            $datetime->format(\EE_Datetime_Field::mysql_timestamp_format),
            new DateTimeZone($datetime->format('e'))
        );
    }


    /**
     * Parse a string into a new DateTime object according to the specified format
     *
     * @param string       $format   Format accepted by date().
     * @param string       $time     String representing the time.
     * @param DateTimeZone $timezone A DateTimeZone object representing the desired time zone.
     * @return DbSafeDateTime|boolean
     * @link https://php.net/manual/en/datetime.createfromformat.php
     */
    public static function createFromFormat($format, $time, $timezone = null)
    {
        $time = self::normalizeInvalidDate($time);
        // Various php versions handle the third argument differently.  This conditional accounts for that.
        $DateTime = $timezone === null
            ? parent::createFromFormat($format, $time)
            : parent::createFromFormat($format, $time, $timezone);
        return $DateTime instanceof DateTime
            ? self::createFromDateTime($DateTime)
            : $DateTime;
    }


    /**
     * @param string $message
     */
    private function writeToErrorLog($message)
    {
        if (! empty($this->_error_log_dir)) {
            /** @noinspection ForgottenDebugOutputInspection */
            error_log($message, 3, $this->_error_log_dir);
        } else {
            /** @noinspection ForgottenDebugOutputInspection */
            error_log($message);
        }
    }
}
