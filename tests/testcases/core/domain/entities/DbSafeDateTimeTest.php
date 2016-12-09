<?php

use \EventEspresso\core\domain\entities\DbSafeDateTime;

if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}

/**
 *
 * EE_Datetime_Field_Test
 *
 * @package        Event Espresso
 * @subpackage     tests
 * @author         Darren Ethier
 * @since          4.9.21
 * @group          core/db_fields
 * @group          datetimes
 * @group          10209
 */
class DbSafeDateTimeTest extends EE_UnitTestCase
{


    public function test_serialization_and_unserialization_with_different_timezone_strings()
    {
        $timezones_to_test = (array) timezone_identifiers_list();
        foreach ($timezones_to_test as $timezone_string) {
            $original_datetime = new DbSafeDateTime('now', new DateTimeZone($timezone_string));
            //serialize then unserialize
            $test_datetime = serialize($original_datetime);
            $test_datetime = unserialize($test_datetime);
            $this->assertEquals(
                $original_datetime->format('Y-m-d H:m:i'),
                $test_datetime->format('Y-m-d H:m:i'),
                sprintf('The timezone string: %s isn\'t working', $timezone_string)
            );
        }
    }



    public function test_serialization_and_unserialization_with_empty_datetime_string()
    {
        $utc = new DateTimeZone('UTC');
        $empty_datetime = new DateTime('0000-00-00 00:00:00.000000', $utc);
        $db_safe_datetime = new DbSafeDateTime($empty_datetime->format('Y-m-d H:i:s.u'), $utc);
        // serializing the above will write to the PHP error log,
        // so we are going to set that path to something else, so that we can grab that error
        $log_file = EVENT_ESPRESSO_UPLOAD_DIR . 'logs' . DS . 'espresso_unit_tests_errors.log';
        $db_safe_datetime->setErrorLogDir($log_file);
        // now perform the serialization
        $serialized_datetime = serialize($db_safe_datetime);
        // and grab the error log file
        $errors = file_get_contents($log_file);
        if ($errors) {
            $this->assertNotFalse(strpos($errors, 'A valid DateTime could not be generated'));
        }
        unlink($log_file);
        $db_safe_datetime = unserialize($serialized_datetime);
        $this->assertInstanceOf('DateTime', $db_safe_datetime);
        // still vot a valid date, but at least this won't cause additional errors
        $this->assertEquals(
            '-0001-11-30 00:00:00.000000',
            $db_safe_datetime->format('Y-m-d H:i:s.u')
        );
        // and just verify that nothing changed
        $this->assertEquals(
            $empty_datetime->format('Y-m-d H:i:s.u'),
            $db_safe_datetime->format('Y-m-d H:i:s.u')
        );
    }



}
// end of file DbSafeDateTimeTest.php
// Location: /tests/testcases/core/domain/entities/DbSafeDateTimeTest.php