<?php
namespace EventEspresso\core\domain\entities;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class DbSafeDateTime
 * Some versions of PHP do bad things when you try to serialize a DateTime object for storage.
 * This DateTime class extension can be safely serialized and unserialized,
 * because the only data it stores is a string containing all o fits relevant details
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class DbSafeDateTime extends \DateTime {

	/**
	 * @type string db_safe_timestamp_format
	 */
	const db_safe_timestamp_format = 'Y-m-d H:i:s O e';

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



    /**
     * @param string $error_log_dir
     */
    public function setErrorLogDir($error_log_dir)
    {
        // if the folder path is writable, then except the path + filename, else keep empty
        $this->_error_log_dir = is_writable(str_replace(basename($error_log_dir), '', $error_log_dir))
            ?  $error_log_dir
            : '';
    }



	public function __toString() {
		return $this->format( DbSafeDateTime::db_safe_timestamp_format );
	}



	public function __sleep() {
		$this->_datetime_string = $this->format( DbSafeDateTime::db_safe_timestamp_format );
        $date = \DateTime::createFromFormat(DbSafeDateTime::db_safe_timestamp_format, $this->_datetime_string);
        if ( ! $date instanceof \DateTime) {
            try {
                // we want a stack trace to determine where the malformed date came from, so...
                throw new \DomainException();
            } catch (\DomainException $e) {
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
                    print_r(\DateTime::getLastErrors(), true),
                    PHP_VERSION,
                    $stack_trace
                )
            );
        }
        return array( '_datetime_string' );
	}



	public function __wakeup() {
	    // if an empty or null value got saved to the db for a datetime,
        // then some servers and/or PHP itself will incorrectly convert that date string
        // resulting in "-0001-11-30" for the year-month-day.
        // We'll replace those with "0000-00-00" which will allow a valid DateTime object to be created,
        // but still result in the internal date for that object being set to "-0001-11-30 10:00:00.000000".
        // so we're no better off, but at least things won't go fatal on us.
        $this->_datetime_string = str_replace('-0001-11-30', '0000-00-00', $this->_datetime_string);
		$date = \DateTime::createFromFormat( DbSafeDateTime::db_safe_timestamp_format, $this->_datetime_string );
		if ( ! $date instanceof \DateTime) {
            $this->writeToErrorLog(
                sprintf(
                    __(
                        'A valid DateTime could not be recreated from "%1$s" because the following errors occurred: %2$s %3$s %2$s PHP version: %4$s',
                        'event_espresso'
                    ),
                    $this->_datetime_string,
                    '<br />',
                    print_r(\DateTime::getLastErrors(), true),
                    PHP_VERSION
                )
            );
        } else {
            $this->__construct(
                $date->format(\EE_Datetime_Field::mysql_timestamp_format),
                new \DateTimeZone($date->format('e'))
            );
        }
	}

    /**
     * Creates a DbSafeDateTime from ye old DateTime
     * @param \DateTime $datetime
     * @return \EventEspresso\core\domain\entities\DbSafeDateTime
     */
    public static function createFromDateTime(\DateTime $datetime)
    {
        return new DbSafeDateTime(
            $datetime->format(\EE_Datetime_Field::mysql_timestamp_format),
            new \DateTimeZone($datetime->format('e'))
        );
    }

    private function writeToErrorLog($message)
    {
        if ( ! empty($this->_error_log_dir)) {
            error_log($message, 3, $this->_error_log_dir);
        } else {
            error_log($message);
        }
    }


}
// End of file DbSafeDateTime.php
// Location: EventEspresso\core\domain\entities/DbSafeDateTime.php