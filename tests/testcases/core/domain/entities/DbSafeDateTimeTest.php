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
        $timezones_to_test = timezone_identifiers_list();
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
}