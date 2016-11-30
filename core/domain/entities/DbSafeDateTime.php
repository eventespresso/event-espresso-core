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



	public function __toString() {
		return $this->format( DbSafeDateTime::db_safe_timestamp_format );
	}



	public function __sleep() {
		$this->_datetime_string = $this->format( DbSafeDateTime::db_safe_timestamp_format );
		return array( '_datetime_string' );
	}



	public function __wakeup() {
		$date = \DateTime::createFromFormat( DbSafeDateTime::db_safe_timestamp_format, $this->_datetime_string );
		if ( ! $date instanceof \DateTime) {
            error_log(
                sprintf(
                    __(
                        'A valid DateTime could not be recreated from "%1$s"  because the following errors occurred: %2$s %3$s %2$s PHP version: %4$s',
                        'event_espresso'
                    ),
                    $this->_datetime_string,
                    '<br />',
                    print_r(\DateTime::getLastErrors(), true),
                    PHP_VERSION
                )
            );
        }
		$this->__construct(
			$date->format( \EE_Datetime_Field::mysql_timestamp_format),
			new \DateTimeZone( $date->format( 'e' ) )
		);
	}


}
// End of file DbSafeDateTime.php
// Location: EventEspresso\core\domain\entities/DbSafeDateTime.php