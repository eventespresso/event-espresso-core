<?php
use EventEspresso\core\libraries\rest_api\ModelDataTranslator;

/**
 * Class Model_Data_Translator_Test
 * Description here
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 * @since                 $VID:$
 * @group                 rest_api
 */
if (! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



class ModelDataTranslatorTest extends EE_REST_TestCase
{

    public function testPrepareQueryParamsForRestApi()
    {
        $mysql_date = '2015-01-01 00:00:00';
        $statuses_in_query = array(
            EEM_Registration::status_id_cancelled,
            EEM_Registration::status_id_declined,
        );
        $model_query = array(
            array(
                'STS_ID'      => array(
                    'IN',
                    $statuses_in_query,
                ),
                'REG_date'    => strtotime($mysql_date),
                'REG_deleted' => false,
            ),
            'limit' => 10,
        );
        $rest_query = ModelDataTranslator::prepareQueryParamsForRestApi($model_query, EEM_Registration::instance());
        //assert the reg date matches and is in the right format
        $this->assertArrayHasKey('where', $rest_query);
        $this->assertArrayHasKey('REG_date', $rest_query['where']);
        $this->assertEquals(strtotime($mysql_date), rest_parse_date($rest_query['where']['REG_date']));
        //assert statuses got translated
        $this->assertArrayHasKey('STS_ID', $rest_query['where']);
        $this->assertEquals($statuses_in_query, $rest_query['where']['STS_ID'][1]);
        //assert limit got translated
        $this->assertArrayHasKey('limit', $rest_query);
        $this->assertEquals(10, (int)$rest_query['limit']);
        //assert booleans correctly translated
        $this->assertArrayHasKey('REG_deleted', $rest_query['where']);
        $this->assertEquals(false, $rest_query['where']['REG_deleted']);
    }



    /**
     * Verifies prepare_conditions_query_params_for_models works properly,
     * especially with datetimes which can be in UTC or local time
     */
    public function testPrepareConditionsQueryParamsForModels__gmtDatetimes()
    {
        update_option('gmt_offset', '');
        $data_translator = new ModelDataTranslator();
        $gmt_offsets = array(-12, -10.5, -9, -7.5, -6, -4.5, -3, -1.5, 0, 1.5, 3, 4.5, 6, 7.5, 9, 10.5, 12);
        foreach ($gmt_offsets as $gmt_offset) {
            $TZ_NAME = \EEH_DTT_Helper::get_timezone_string_from_gmt_offset($gmt_offset);
            update_option('timezone_string', $TZ_NAME);
            $now_local_time = current_time('mysql');
            $now_utc_time = current_time('mysql', true);
            $this->assertNotEquals($now_local_time, $now_utc_time);
            $model_data = $data_translator::prepareConditionsQueryParamsForModels(
                array(
                    'EVT_created'      => mysql_to_rfc3339($now_local_time),
                    'EVT_modified_gmt' => mysql_to_rfc3339($now_utc_time),
                ),
                \EEM_Event::instance(),
                '4.8.36'
            );
            //verify the model data being inputted is in UTC
            $this->assertEquals($now_utc_time, date('Y-m-d H:i:s', $model_data['EVT_created']));
            //NOT in local time
            $this->assertNotEquals($now_local_time, $model_data['EVT_created']);
            //notice that there's no "_gmt" on EVT_modified. That's (currently at least)
            //not a real model field. It just indicates to treat the time already being in UTC
            $this->assertEquals($now_utc_time, date('Y-m-d H:i:s', $model_data['EVT_modified']));
        }
    }



    public function testIsGmtDateFieldName__success()
    {
        $this->assertTrue(ModelDataTranslator::isGmtDateFieldName('Event.EVT_created_gmt'));
    }



    public function testIsGmtDateFieldName__fail()
    {
        $this->assertFalse(ModelDataTranslator::isGmtDateFieldName('Event.EVT_created'));
    }



    public function testIsGmtDateFieldName__failTinyInput()
    {
        $this->assertFalse(ModelDataTranslator::isGmtDateFieldName('foo'));
    }



    public function testRemoveGmtFromFieldName()
    {
        $this->assertEquals(
            'Event.EVT_created',
            ModelDataTranslator::removeGmtFromFieldName('Event.EVT_created_gmt'));
    }



    public function testRemoveGmtFromFieldName__noGmtAnyways()
    {
        $this->assertEquals(
            'Event.EVT_created',
            ModelDataTranslator::removeGmtFromFieldName('Event.EVT_created'));
    }



    /**
     * @return array first item is the expected value, 2nd is the input, 3rd is the field object to use
     */
    public function dataProviderForTestPrepareFieldValueFromJsonOk()
    {
        $serialized_field = new EE_Maybe_Serialized_Simple_HTML_Field('whatever', 'Whatever', true);
        return array(
            array('1', '1', $serialized_field),
            array('stringy', 'stringy', $serialized_field),
            array(array('foo' => 'bar'), array('foo' => 'bar'), $serialized_field),
        );
    }



    /**
     * @dataProvider dataProviderForTestPrepareFieldValueFromJsonOk
     * @param mixed $expected_result
     * @param mixed $inputted_json_value
     * @param EE_Model_Field_Base $field_obj
     * @group        9222
     */
    public function testPrepareFieldValueFromJsonOk(
        $expected_result,
            $inputted_json_value,
            EE_Model_Field_Base $field_obj)
    {
        $this->assertEquals(
            $expected_result,
            ModelDataTranslator::prepareFieldValueFromJson(
                $field_obj,
                $inputted_json_value,
                '4.8.36'
            )
        );
    }



    /**
     * @return array where the first item is value that would be retrieved from the request which should throw an
     * exception. The 2nd item is an EE_Model_Field_Base child
     */
    public function dataProviderForTestPrepareFieldValueFromJsonBad()
    {
        $serializable_field = new EE_Maybe_Serialized_Simple_HTML_Field('whatever', 'Whatever', true);
        $text_field = new EE_Plain_Text_Field('whatever', 'whatever', true);
        return array(
            array('s:6:"foobar";', $serializable_field),//that's a serialized string alright!
            array('O:4:"Evil":0:{}', $serializable_field),//that's a string with a serialized object of class "Evil"
            array(array('s:6:"foobar";'), $serializable_field),//that's an array with a serialized string in it
            array(array('s:6:"foobar";' => 1), $serializable_field),//that's an array with a serialized string as a key
            array('O:4:"Evil":0:{}', $text_field),//double-check we don't even accept serialized text even on normal
            // text fields. Theoretically these won't get unserialized, but I don't see much need for anyone to ever
            // submit this kind of malicious junk, and having them sit around in our DB is dangerous
        );
    }



    /**
     * @dataProvider dataProviderForTestPrepareFieldValueFromJsonBad
     * @expectedException EventEspresso\core\libraries\rest_api\RestException
     * @param mixed $expected_result
     * @param mixed $inputted_json_value
     * @param EE_Model_Field_Base $field_obj
     * @group 9222
     */
    public function testPrepareFieldValueFromJsonBad($inputted_json_value, EE_Model_Field_Base $field_obj)
    {
        //ok duck and cover! It's gonna blow!
        ModelDataTranslator::prepareFieldValueFromJson($field_obj, $inputted_json_value, '4.8.36');
    }



    /**
     * @return array 1st item is the expected value, 2nd is the input, 3rd is the field object to use
     */
    public function dataProviderForTestPrepareFieldValuesForJson()
    {
        $field = new EE_Maybe_Serialized_Simple_HTML_Field('whatever', 'whatever', true);
        $datetime_field = new EE_Datetime_Field('whatever2', 'whatever2', true, EE_Datetime_Field::now);
        return array(
            array(null, new stdClass(), $field),
            array(array('obj' => null), array('obj' => new stdClass()), $field),
            array(array('foo' => 'bar'), array('foo' => 'bar'), $field),
            array(1, 1, $field),
            array('stringy', 'stringy', $field),
            array(
                '2016-01-03T00:00:00',
                new \EventEspresso\core\domain\entities\DbSafeDateTime(
                    '2016-01-03 00:00:00',
                    new DateTimeZone('UTC')),
                $datetime_field
            )
        );
    }



    /**
     * @group        9222
     * @dataProvider dataProviderForTestPrepareFieldValuesForJson
     * @param                     $expected
     * @param                     $input
     * @param EE_Model_Field_Base $field_obj
     */
    public function testPrepareFieldValuesForJson($expected, $input, $field_obj)
    {
        $this->assertEquals(
            $expected,
            ModelDataTranslator::prepareFieldValuesForJson($field_obj, $input, '4.8.36')
        );
    }
}

// Location: tests/testcases/core/libraries/rest_api/Model_Data_Translator_Test.php
