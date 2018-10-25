<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use PHPUnit\Framework\Exception;

if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * EEM_Base_Test
 * Tests EEM_Base core functionality. And currently also does the job of making sure all existing models are setup
 * correctly
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 * @group                 models
 * @group                 core/db_models
 * @group                 capabilities
 * @group                 EEM_Base_Test
 *                        ------------------------------------------------------------------------
 */
class EEM_Base_Test extends EE_UnitTestCase
{

    /**
     * @group 11043
     */
    public function test_insert__funky_characters()
    {
        $this->markTestSkipped('If a multi-byte character gets chopped in half, EEM_Base::insert and update simply dont work. Avoid it by using mb_strcut instead of substr');
        $string_of_multibyte_chracters = 'event’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’’';
        $string_with_a_chopped_multibyte_character = substr($string_of_multibyte_chracters,0,127);
        $id = EEM_Change_Log::instance()->insert(
            array(
                'LOG_message' => $string_with_a_chopped_multibyte_character
            )
        );
        $this->assertNotFalse($id);
    }
    public function test_models_defined_ok()
    {
        foreach (EE_Registry::instance()->non_abstract_db_models as $model) {
            $model_instance = EE_Registry::instance()->load_model($model);
            $this->assertInstanceOf('EEM_Base', $model_instance);
            //checks their relations
            foreach ($model_instance->relation_settings() as $relation_name => $relation_obj) {
                //verify that each relation is named according to an existing model
                $related_model_instance = EE_Registry::instance()->load_model($relation_name);
                $this->assertInstanceOf('EE_Model_Relation_Base', $relation_obj);
            }
            foreach ($model_instance->field_settings(true) as $field_name => $field_obj) {
                $this->assertInstanceOf('EE_Model_Field_Base', $field_obj);
            }
        }
    }



    /**
     * Verifies that for each model, the tables it claims to require have been installed
     */
    public function test_model_tables_exist()
    {
        foreach (EE_Registry::instance()->non_abstract_db_models as $model) {
            $model_instance = EE_Registry::instance()->load_model($model);
            foreach ($model_instance->get_tables() as $table_alias => $table_obj) {
                $this->assertTableExists($table_obj->get_table_name(), $model);
            }
        }
    }
//	public function test_models_can_insert(){
//		foreach(EE_Registry::instance()->non_abstract_db_models as $model){
//			$model_instance = EE_Registry::instance()->load_model($model);
//			$id = $model_instance->insert(array());
//			$this->assertNotEmpty($id);
//		}
//	}
    /**
     * checks that EEM_Base::has_field works properly
     */
    public function test_has_field()
    {
        $this->assertTrue(EEM_Question::instance()->has_field('QST_ID'));
        $this->assertTrue(EEM_QUestion::instance()->has_field('QST_admin_only'));
        $this->assertFalse(EEM_Question::instance()->has_field('monkey brains'));
    }



    /**
     * checks that adding a LIKE in teh WHERE clauses works ok
     */
    public function test_where_like()
    {
        $attendees_before = EEM_Attendee::instance()->get_all();
        $this->assertEmpty($attendees_before);
        $a = EE_Attendee::new_instance(array('ATT_email' => 'monkey123@hotmail.com'));
        $a->save();
        $attendees_after_insert = EEM_Attendee::instance()->get_all();
        $this->assertEquals(1, count($attendees_after_insert));
        $attendee_found = EEM_Attendee::instance()->get_one(array(array('ATT_email' => array('LIKE', '%key12%'))));
        $this->assertInstanceOf('EE_Attendee', $attendee_found);
        $this->assertEquals($a->ID(), $attendee_found->ID());
    }



    public function test_delete()
    {
        $e1 = EE_Event::new_instance();
        $e1->save();
        $e2 = EE_Event::new_instance();
        $e2->save();
        $e3 = EE_Event::new_instance();
        $e3->save();
        //now assert things are as they should be: the items are in teh Db and the entity map
        $this->assertEquals(EEM_Event::instance()->get_one_by_ID($e1->ID()), $e1);
        $this->assertEquals(EEM_Event::instance()->get_one_by_ID($e2->ID()), $e2);
        $this->assertEquals(EEM_Event::instance()->get_one_by_ID($e3->ID()), $e3);
        $this->assertEquals(EEM_Event::instance()->get_from_entity_map($e1->ID()), $e1);
        $this->assertEquals(EEM_Event::instance()->get_from_entity_map($e2->ID()), $e2);
        $this->assertEquals(EEM_Event::instance()->get_from_entity_map($e3->ID()), $e3);
        //now run a delete query that should have deleted $e1 and $e2
        EEM_Event::instance()->delete_permanently(array(array('EVT_ID' => array('<=', $e2->ID()))));
        //check $e1 and $e2 don't exist in the DB anymore
        $this->assertEmpty(EEM_Event::instance()->get_one_by_ID($e1->ID()));
        $this->assertEmpty(EEM_Event::instance()->get_one_by_ID($e2->ID()));
        $this->assertEquals(EEM_Event::instance()->get_one_by_ID($e3->ID()), $e3);
        //and now chekc $e1 and $e2 don't exist in the entity map either
        $this->assertEmpty(EEM_Event::instance()->get_from_entity_map($e1->ID()));
        $this->assertEmpty(EEM_Event::instance()->get_from_entity_map($e2->ID()));
        $this->assertEquals(EEM_Event::instance()->get_from_entity_map($e3->ID()), $e3);
    }


    /**
     * Verifies deletes still work properly, even when deleting a model object whose data is shared between two tables
     */
    public function test_delete__across_multiple_tables()
    {
        $event_to_delete = $this->new_model_obj_with_dependencies('Event');
        $event_shouldnt_be_harmed = $this->new_model_obj_with_dependencies('Event');
        global $wpdb;
        $post_table_entries       = $wpdb->get_var('SELECT COUNT(*) FROM ' . EEM_Event::instance()->table());
        $event_meta_table_entries = $wpdb->get_var('SELECT COUNT(*) FROM ' . EEM_Event::instance()->second_table());
        //make sure when we delete this event, both the record from the posts table and the event meta table get deleted
        $success = $event_to_delete->delete_permanently();
        $this->assertEquals(2, $success);
        $this->assertEquals(
            $post_table_entries - 1,
            $wpdb->get_var('SELECT COUNT(*) FROM ' . EEM_Event::instance()->table())
        );
        $this->assertEquals(
            $event_meta_table_entries - 1,
            $wpdb->get_var('SELECT COUNT(*) FROM ' . EEM_Event::instance()->second_table())
        );
    }


    /**
     * Verifies permanent deletes will also remove any extra meta that might be present in the database for items
     * deleted.
     */
    public function test_delete_with_extra_meta()
    {
        /** @var EE_Registration $registration_to_delete */
        $registration_to_delete = $this->factory->registration->create();
        //add extrameta
        $registration_to_delete->update_extra_meta('test_registration_meta', 'value');

        //get the extra meta so we have its ID for checking later.
        $extra_meta = EEM_Extra_Meta::instance()->get_one(array(
            array(
                'OBJ_ID' => $registration_to_delete->ID(),
                'EXM_type' => 'Registration',
                'EXM_key' => 'test_registration_meta'
            )
        ));
        $this->assertInstanceOf('EE_Extra_Meta', $extra_meta);

        //delete the registration
        $success = $registration_to_delete->delete_permanently();
        $this->assertEquals(1, $success);

        //assert the meta no longer exists in the db.
        $extra_meta = EEM_Extra_Meta::instance()->get_one_by_ID($extra_meta->ID());
        $this->assertNotInstanceOf('EE_Extra_Meta', $extra_meta);
    }



    /**
     * @throws EE_Error
     */
    public function test_distanced_HABTM_join()
    {
        try {
            EEM_Line_Item::instance()->get_all(array(array('Ticket.Datetime.EVT_ID' => 1, 'TXN_ID' => 1)));
            $this->assertTrue(true);
        } catch (EE_Error $e) {
            throw $e;
        }
    }



    public function test_get_col()
    {
        $att1 = EEM_Attendee::instance()->insert(array('ATT_fname' => 'one'));
        $att2 = EEM_Attendee::instance()->insert(array('ATT_fname' => 'two'));
        $att3 = EEM_Attendee::instance()->insert(array('ATT_fname' => 'three'));
        $att4 = EEM_Attendee::instance()->insert(array('ATT_fname' => 'four'));
        $all = EEM_Attendee::instance()->get_col();
        $this->assertArrayContains((string)$att1, $all);
        $this->assertArrayContains((string)$att2, $all);
        $this->assertArrayContains((string)$att3, $all);
        $this->assertArrayContains((string)$att4, $all);
        $just_two_and_threes_names = EEM_Attendee::instance()->get_col(array(
            array(
                'ATT_fname' => array(
                    'IN',
                    array(
                        'two',
                        'three',
                    ),
                ),
            ),
        ), 'ATT_fname');
        $this->assertArrayDoesNotContain('one', $just_two_and_threes_names);
        $this->assertArrayContains('two', $just_two_and_threes_names);
        $this->assertArrayContains('three', $just_two_and_threes_names);
        $this->assertArrayDoesNotContain('four', $just_two_and_threes_names);
    }



    /**
     *
     */
    public function test_update__keeps_model_objs_in_sync()
    {
        $att1 = EE_Attendee::new_instance(array('ATT_fname' => 'one'));
        $att2 = EE_Attendee::new_instance(array('ATT_fname' => 'two'));
        $att3 = EE_Attendee::new_instance(array('ATT_fname' => 'three'));
        $att1->save();
        $att2->save();
        $att3->save();
        //test taht when do perform an update, the model objects are updated also
        $attm = EE_Registry::instance()->load_model('EEM_Attendee');
        $attm->update(array('ATT_fname' => 'win'), array(array('ATT_fname' => 'two')));
        $this->assertEquals('one', $att1->fname());
        $this->assertEquals('win', $att2->fname());
        $this->assertEquals('three', $att3->fname());
        //now test doing an update that should be more efficient wehre we DON'T update
        //model objects
        $attm->update(array('ATT_fname' => 'win_again'), array(array('ATT_fname' => 'one')), false);
        $this->assertEquals('one', $att1->fname());
        $this->assertEquals('win', $att2->fname());
        $this->assertEquals('three', $att3->fname());
        global $wpdb;
        $name_in_db = $wpdb->get_var("select ATT_fname FROM "
                                     . $wpdb->prefix
                                     . "esp_attendee_meta WHERE ATT_ID = "
                                     . $att1->ID());
        $this->assertEquals('win_again', $name_in_db);
        //also test to make sure there are no errors when there was nothing to update in the entity map
        $att4 = EEM_Attendee::instance()->insert(array('ATT_fname' => 'four'));
        $wpdb->last_error = null;
        EEM_Attendee::instance()->update(array('ATT_fname' => 'lose'), array(array('ATT_fname' => 'four')));
        $this->assertEmpty($wpdb->last_error);
        //and that there are no errors when nothing at all is updated
        EEM_Attendee::instance()
                    ->update(array('ATT_fname' => 'lose_again'), array(array('ATT_fname' => 'nonexistent')));
        $this->assertEmpty($wpdb->last_error);
    }



    /**
     * @group 6767
     */
    public function test_two_joins()
    {
        EEM_Attendee::instance()->get_all(array(array('Registration.Event.EVT_name' => 'bob')));
        $this->assertTrue(true, 'No exception thrown');
    }



    /**
     * @group 7151
     */
    public function test_refresh_entity_map_from_db()
    {
        //get an object purposefully out-of-sync with the DB
        //call this and make sure it's wiped clean and
        $p = $this->new_model_obj_with_dependencies('Payment', array('PAY_amount' => 25));
        $p->save();
        $this->assertEquals($p, EEM_Payment::instance()->get_from_entity_map($p->ID()));
        //now manually update it in teh DB, but not the model object
        global $wpdb;
        $affected = $wpdb->query($wpdb->prepare("update {$wpdb->prefix}esp_payment SET PAY_amount = 100, TXN_ID = 0 WHERE PAY_ID = %d",
            $p->ID()));
        $this->assertEquals(1, $affected);
        //and when it's refreshed, its PAY_amount should be updated too and it should no longer have any transaction cached or evenfindable
        EEM_Payment::instance()->refresh_entity_map_from_db($p->ID());
        $this->assertEquals(100, $p->get('PAY_amount'));
        $this->assertEquals(0, $p->get('TXN_ID'));
        $this->assertEquals(array(), $p->get_all_from_cache('Transaction'));
        $this->assertEquals(null, $p->transaction());
    }



    /**
     * @group 7151
     */
    public function test_refresh_entity_map_from_db__serialized_object()
    {
        //get an object purposefully out-of-sync with the DB
        //call this and make sure it's wiped clean and
        $p = $this->new_model_obj_with_dependencies('Payment', array('PAY_amount' => 25));
        $p->save();
        $this->assertEquals($p, EEM_Payment::instance()->get_from_entity_map($p->ID()));
        //ok now remember that ID, serialize the payment, and otherwise remove the object
        $p_id = $p->ID();
        $p_serialized = serialize($p);
        unset($p);
        EEM_Payment::reset();
        //now manually update it in teh DB, but not the model object
        global $wpdb;
        $affected = $wpdb->query($wpdb->prepare("update {$wpdb->prefix}esp_payment SET PAY_amount = 100, TXN_ID = 0 WHERE PAY_ID = %d",
            $p_id));
        $this->assertEquals(1, $affected);
        //now unserialize it and verify it's what we thought it was
        $p_unserialized = unserialize($p_serialized);
        $this->assertEquals($p_id, $p_unserialized->ID());
        $this->assertEquals(25, $p_unserialized->get('PAY_amount'));
        //and when it's refreshed, its PAY_amount should be updated too and it should no longer have any transaction cached or even findable
        $p_unserialized = EEM_Payment::instance()->refresh_entity_map_from_db($p_unserialized->ID());
        $this->assertEquals(100, $p_unserialized->get('PAY_amount'));
        $this->assertEquals(0, $p_unserialized->get('TXN_ID'));
        $this->assertEquals(array(), $p_unserialized->get_all_from_cache('Transaction'));
        $this->assertEquals(null, $p_unserialized->transaction());
    }



    /**
     * @group 7151
     */
    public function test_fresh_entity_map_with()
    {
        $p = $this->new_model_obj_with_dependencies('Payment', array('PAY_amount' => 25));
        $p->save();
        $this->assertEquals($p, EEM_Payment::instance()->get_from_entity_map($p->ID()));
        //now purposefully make a naughty payment which isn't in the entity map
        $p2 = clone $p;
        $this->assertFalse($p2->in_entity_map());
        //make the two EE_Payments diverge
        $p2->set('PAY_amount', 99);
        $t = EE_Transaction::new_instance();
        $p2->cache('Transaction', $t);
        $this->assertEquals(25, $p->get('PAY_amount'));
        $this->assertEquals(99, $p2->get('PAY_amount'));
        $this->assertNotEquals($p->get_all_from_cache('Transaction'), $p2->get_all_from_cache('Transaction'));
        //now update the payment in the entity map with the other
        EEM_Payment::instance()->refresh_entity_map_with($p->ID(), $p2);
        $this->assertEquals(99, $p->get('PAY_amount'));
        //make sure p hasn't changed into p2. that's not what we wanted to do...
        $this->assertFalse($p2 === $p);
        //We wanted to just UPDATE p with p2's values
        $this->assertEquals($p, EEM_Payment::instance()->get_from_entity_map($p->ID()));
        //and make sure p's cache was updated to be the same as p2's
        $this->assertEquals($p2->get_all_from_cache('Transaction'), $p->get_all_from_cache('Transaction'));
    }



    /**
     * This tests the get_formats_for method with exception
     *
     * @since 4.6.x
     */
    public function test_get_formats_for_with_exception()
    {
        EEM_Datetime::reset();
        //test expected exception for invalid field
        $this->setExpectedException('EE_Error');
        EEM_Datetime::instance()->get_formats_for('Bogus_Field');
    }



    /**
     * This tests the get_formats_for method with valid field
     *
     * @since 4.6.x
     */
    public function test_get_formats_for_with_valid_field()
    {
        EEM_Datetime::reset();
        //first test default field setup
        $formats = EEM_Datetime::instance()->get_formats_for('DTT_EVT_start');
        $this->assertContains('F j, Y', $formats);
        $this->assertContains('g:i a', $formats);
        //test values on EE_Datetime_Field after EE_Datetime instantiation.
        $this->factory->datetime->create(array('formats' => array('Y-m-d', 'H:i:s')));
        $test_formats = EEM_Datetime::instance()->get_formats_for('DTT_EVT_start');
        $this->assertContains('Y-m-d', $test_formats);
        $this->assertContains('H:i:s', $test_formats);
    }



    /**
     * @since 4.6.x
     */
    public function test_current_time_for_query()
    {
        EEM_Datetime::reset();
        //baseline DateTime object for testing
        $now = new DateTime("now");
        $DateTimeZone = new DateTimeZone('America/Vancouver');
        $timezoneTest = new DateTime("now", $DateTimeZone);
        //just in case some other test has messed up the default date format string in WordPress unit tests.
        $expected_format = get_option('date_format') . ' ' . get_option('time_format');
        //test getting default formatted string and default formatted unix timestamp.
        $formatted_string = EEM_Datetime::instance()->current_time_for_query('DTT_EVT_start');
        $this->assertEquals($now->format($expected_format), $formatted_string);
        $timestamp_with_offset = EEM_Datetime::instance()->current_time_for_query('DTT_EVT_start', true);
        $this->assertEquals($now->format('U'), $timestamp_with_offset);
        //test values when timezone and formats modified on EE_Datetime instantiation
        $this->factory->datetime->create(array(
            'formats'  => array('Y-m-d', 'H:i:s'),
            'timezone' => 'America/Vancouver',
        ));
        $formatted_string = EEM_Datetime::instance()->current_time_for_query('DTT_EVT_start');
        $this->assertDateWithinOneMinute($timezoneTest->format('Y-m-d H:i:s'), $formatted_string, 'Y-m-d H:i:s');
        $unix_timestamp = EEM_Datetime::instance()->current_time_for_query('DTT_EVT_start', true);
        $this->assertDateWithinOneMinute($timezoneTest->format('U'), $unix_timestamp, 'U');
    }



    /**
     * If the site time format doesn't include seconds (which it doesn't, by default)
     * then EEM_Base::current_time_for_query() truncates them
     * @group 10869
     */
    public function test_current_time_for_query__ignore_minutes(){
        $formats = EE_Registry::instance()->load_model('Datetime')->get_formats_for('DTT_EVT_start');
        $this->assertEquals(
            Datetime::createFromFormat(
                'Y-m-d H:i',
                gmdate( 'Y-m-d H:i' )
            ),
            DateTime::createFromFormat(
                implode(' ', $formats
                ),
                EEM_Datetime::instance()->current_time_for_query('DTT_EVT_start')
            )
        );
    }

    /**
     * If the site time format doesn't include seconds (which it doesn't, by default)
     * then EEM_Base::current_time_for_query() truncates them
     * @group 10869
     */
    public function test_current_time_for_query__timestamp(){
        $formats = EE_Registry::instance()->load_model('Datetime')->get_formats_for('DTT_EVT_start');
        $datetime = new DateTime();
        $datetime->setTimestamp(
            EEM_Datetime::instance()->current_time_for_query('DTT_EVT_start', true)
        );
        $this->assertDateWithinOneMinute(
            time(),
            $datetime->format('U'),
            'U'
        );
    }



    /**
     * @group 341
     * @since 4.6.x
     */
    public function test_convert_datetime_for_query()
    {
        EEM_Datetime::reset();
        //baselines for testing with
        //baseline DateTime object for testing
        $now = new DateTime("now");
        $timezoneTest = new DateTime("now", new DateTimeZone('America/Vancouver'));
        $timezones_to_test = array(
            'Asia/Singapore',
            'America/Denver',
        );
        $original_timezone = get_option('timezone_string');
        $original_offset = get_option('gmt_offset');
        foreach ($timezones_to_test as $timezone) {
            //change the timezone set in wp options to something that has a positive offset
            update_option('timezone_string', $timezone);
            //initialize EEM_Datetime and EE_Datetime_Field settings for caches
            $this->factory->datetime->create(array('formats' => array('F j, Y', 'g:i a'), 'timezone' => 'UTC'));
            //test getting correctly formatted string for matching incoming format with defaults in WP
            //options
            $converted = EEM_Datetime::instance()
                                     ->convert_datetime_for_query('DTT_EVT_start', $now->format('F j, Y g:i a'),
                                         'F j, Y g:i a', 'UTC');
            $this->assertDateWithinOneMinute(
                $now->format('F j, Y g:i a'),
                $converted->format('F j, Y g:i a'),
                'F j, Y g:i a',
                sprintf('Dates not within one minute for timezone: %s', $timezone)
            );
            //test getting correctly formatted string for different incoming format in same timezone.
            $converted = EEM_Datetime::instance()
                                     ->convert_datetime_for_query('DTT_EVT_start', $now->format('Y-m-d H:i:s'),
                                         'Y-m-d H:i:s', 'UTC');
            $this->assertDateWithinOneMinute(
                $now->format('F j, Y g:i a'),
                $converted->format('F j, Y g:i a'),
                'F j, Y g:i a',
                sprintf('Dates not within one minute for timezone tested: %s', $timezone)
            );
            //test getting correctly formatted string for different incoming format in different incoming timezone.
            $converted = EEM_Datetime::instance()
                                     ->convert_datetime_for_query('DTT_EVT_start', $timezoneTest->format('Y-m-d H:i:s'),
                                         'Y-m-d H:i:s', 'America/Vancouver');
            $this->assertDateWithinOneMinute(
                $now->format('F j, Y g:i a'),
                $converted->format('F j, Y g:i a'),
                'F j, Y g:i a',
                sprintf('Dates not within one minute for timezone: %s', $timezone));
            //test getting correctly formatted string for unix_timestamp format.
            $converted = EEM_Datetime::instance()->convert_datetime_for_query('DTT_EVT_start', time(), 'U');
            $this->assertDateWithinOneMinute(
                $now->format('F j, Y g:i a'),
                $converted->format('F j, Y g:i a'),
                'F j, Y g:i a',
                sprintf('Timezone tested: %s', $timezone)
            );
            //test getting correctly formatted string for current_time('mysql') format.
            $converted = EEM_Datetime::instance()
                                     ->convert_datetime_for_query('DTT_EVT_start', current_time('mysql'),
                                         'Y-m-d H:i:s');
            $this->assertDateWithinOneMinute(
                $now->format('F j, Y g:i a'),
                $converted->format('F j, Y g:i a'),
                'F j, Y g:i a',
                sprintf('Dates not within one minute for timezone: %s', $timezone)
            );
            //repeat above tests when internals on EE_Datetime_Field have been modified by new
            //datetime creation.
            $this->factory->datetime->create(array(
                'formats'  => array('d/m/Y', 'h:i a'),
                'timezone' => 'America/Vancouver',
            ));
            //test getting correctly formatted string for matching incoming format with what is currently
            //set
            $converted = EEM_Datetime::instance()
                                     ->convert_datetime_for_query('DTT_EVT_start', $timezoneTest->format('U'), 'U',
                                         'America/Vancouver');
            $this->assertDateWithinOneMinute(
                $timezoneTest->format('d/m/Y h:i a'),
                $converted->format('d/m/Y h:i a'),
                'd/m/Y h:i a',
                sprintf('Dates not within one minute for timezone: %s', $timezone)
            );
            //test getting correctly formatted string for different incoming format in same timezone.
            $converted = EEM_Datetime::instance()
                                     ->convert_datetime_for_query('DTT_EVT_start', $timezoneTest->format('Y-m-d H:i:s'),
                                         'Y-m-d H:i:s', 'America/Vancouver');
            $this->assertDateWithinOneMinute(
                $timezoneTest->format('d/m/Y h:i a'),
                $converted->format('d/m/Y h:i a'),
                'd/m/Y h:i a',
                sprintf('Dates not within one minute for timezone tested: %s', $timezone)
            );
            //test getting correctly formatted string for different incoming format in different incoming timezone.
            $converted = EEM_Datetime::instance()
                                     ->convert_datetime_for_query('DTT_EVT_start', $now->format('U'), 'U', 'UTC');
            $this->assertDateWithinOneMinute(
                $timezoneTest->format('d/m/Y h:i a'),
                $converted->format('d/m/Y h:i a'),
                'd/m/Y h:i a',
                sprintf('Dates not within one minute for timezone tested: %s', $timezone)
            );
            //test getting correctly formatted string for time() format.
            $converted = EEM_Datetime::instance()->convert_datetime_for_query('DTT_EVT_start', time(), 'U');
            $this->assertDateWithinOneMinute(
                $timezoneTest->format('d/m/Y h:i a'),
                $converted->format('d/m/Y h:i a'),
                'd/m/Y h:i a',
                sprintf('Dates not within one minute for timezone tested: %s', $timezone)
            );
            //test getting correctly formatted string for current_time('mysql') format.
            $converted = EEM_Datetime::instance()
                                     ->convert_datetime_for_query('DTT_EVT_start', current_time('mysql'),
                                         'Y-m-d H:i:s');
            $this->assertDateWithinOneMinute(
                $timezoneTest->format('d/m/Y h:i a'),
                $converted->format('d/m/Y h:i a'),
                'd/m/Y h:i a',
                sprintf('Dates not within one minute for timezone tested: %s', $timezone)
            );
        }
        update_option('timezone_string', $original_timezone);
        update_option('gmt_offset', $original_offset);
    }



    public function test_alter_query_params_to_only_include_mine__logged_in()
    {
        global $current_user;
        //setup our user and set as current user.
        $user = $this->factory->user->create_and_get();
        $this->assertInstanceOf('WP_User', $user);
        $user->add_role('administrator');
        $current_user = $user;
        $this->assertTrue(is_user_logged_in());
        $this->assertEquals(
            array(
                array(
                    'QST_wp_user' => get_current_user_id(),
                ),
            ),
            EEM_Question::instance()->alter_query_params_to_only_include_mine());
    }



    public function test_alter_query_params_to_only_include_mine__not_logged_in()
    {
        $this->assertFalse(is_user_logged_in());
        $this->assertEquals(
            array(
                array(
                    'QST_wp_user' => get_current_user_id(),
                ),
            ),
            EEM_Question::instance()->alter_query_params_to_only_include_mine());
    }



    public function test_alter_query_params_to_only_include_mine__across_model_chain_once()
    {
        $this->assertFalse(is_user_logged_in());
        $this->assertEquals(
            array(
                array(
                    'Event.EVT_wp_user' => get_current_user_id(),
                ),
            ),
            EEM_Registration::instance()->alter_query_params_to_only_include_mine());
    }



    public function test_alter_query_params_to_only_include_mine__across_model_chain_twice()
    {
        $this->assertFalse(is_user_logged_in());
        $this->assertEquals(
            array(
                array(
                    'Registration.Event.EVT_wp_user' => get_current_user_id(),
                ),
            ),
            EEM_Transaction::instance()->alter_query_params_to_only_include_mine());
    }



    /**
     * @group 10083
     */
    public function test_alter_query_params_to_restrict_by_ID__simple_id()
    {
        $e = $this->new_model_obj_with_dependencies('Event');
        $query_params = EEM_Event::instance()->alter_query_params_to_restrict_by_ID($e->ID());
        $e_found = EEM_Event::instance()->get_one($query_params);
        $this->assertEquals($e, $e_found);
    }



    /**
     * @group 10083
     */
    public function test_alter_query_params_to_restrict_by_ID__get_index_primary_key_string()
    {
        $e = $this->new_model_obj_with_dependencies('Event');
        $query_params = EEM_Event::instance()->alter_query_params_to_restrict_by_ID(
            EEM_Event::instance()->get_index_primary_key_string(
                $e->model_field_array()
            )
        );
        $e_found = EEM_Event::instance()->get_one($query_params);
        $this->assertEquals($e, $e_found);
    }



    /**
     * Checks that we can correctly apply backend read caps where there is only
     * one cap controlling access to the model
     *
     * @group model_caps
     */
    public function test_get_all__caps_admin_read__basic()
    {
        $this->assertEquals(0, EEM_Transaction::instance()->count());
        $this->new_typical_transaction();
        $current_user = $this->_ensure_current_user_set();
        //let's test first on transactions, which just have a single cap controlling access
        //which the current user doesn't have so nothing should be found
        $this->assertEquals(0, EEM_Transaction::instance()->count(array('caps' => EEM_Base::caps_read_admin)));
        //now give the user permission to access transactions and make sure he can
        $current_user->add_cap('ee_read_transactions');
        $this->assertEquals(EEM_Transaction::instance()->count(),
            EEM_Transaction::instance()->count(array('caps' => EEM_Base::caps_read_admin)));
    }



    /**
     * Checks that we can correctly apply backend read caps where there are two
     * caps controlling access to the model: the basic cap (eg 'ee_read_registrations')
     * and the 'others' cap (eg 'ee_read_others_registrations' )
     *
     * @group model_caps
     */
    public function test_get_all__caps_admin_read__basic_and_others()
    {
        $current_user = $this->_ensure_current_user_set();
        $mtg_mine = $this->new_model_obj_with_dependencies('Message_Template_Group',
            array('MTP_user_id' => $current_user->ID, 'MTP_is_global' => false));
        $mtg_others = $this->new_model_obj_with_dependencies('Message_Template_Group',
            array('MTP_user_id' => $current_user->ID + 1, 'MTP_is_global' => false));
        //current user can't access messages
        $this->assertEquals(0,
            EEM_Message_Template_Group::instance()->count(array('caps' => EEM_Base::caps_read_admin)));
        //ok now allow them to see their own messages
        $current_user->add_cap('ee_read_messages');
        $mtgs_i_can_see_now = EEM_Message_Template_Group::instance()
                                                        ->get_all(array('caps' => EEM_Base::caps_read_admin));
        $this->assertEquals(1, count($mtgs_i_can_see_now));
        $first_mtg_i_can_see_now = reset($mtgs_i_can_see_now);
        $this->assertEquals($mtg_mine, $first_mtg_i_can_see_now);
        //ok now allowthem to see others non-global messages (tesing global-related-caps should happen on EEM_Message_template_Group_Test)
        $current_user->add_cap('ee_read_others_messages');
        $mtgs_i_can_see_now = EEM_Message_Template_Group::instance()->get_all(array(
            'caps' => EEM_Base::caps_read_admin,
            array('MTP_is_global' => false),
        ));
        $this->assertEquals(2, count($mtgs_i_can_see_now));
        $first_mtg_i_can_see_now = reset($mtgs_i_can_see_now);
        $this->assertEquals($mtg_mine, $first_mtg_i_can_see_now);
        $last_mtg_i_can_see_now = end($mtgs_i_can_see_now);
        $this->assertEquals($mtg_others, $last_mtg_i_can_see_now);
    }



    /**
     * Checks that we can correctly apply backend read caps where there are three
     * caps controlling access to the model: the basic cap (eg 'ee_read_events')
     * and the 'others' cap (eg 'ee_read_others_events' ) and the
     * 'private' cap (eg 'ee_read_private_events')
     *
     * @group model_caps
     */
    public function test_get_all__caps_admin_read__basic_others_and_private()
    {
        $current_user = $this->_ensure_current_user_set();
        $my_e = $this->new_model_obj_with_dependencies('Event',
            array('EVT_wp_user' => $current_user->ID, 'status' => 'publish'));
        $others_public_e = $this->new_model_obj_with_dependencies('Event',
            array('EVT_wp_user' => $current_user->ID + 1, 'status' => 'publish'));
        $others_private_e = $this->new_model_obj_with_dependencies('Event',
            array('EVT_wp_user' => $current_user->ID + 1, 'status' => 'private'));
        //although there are 3 events, the current user shouldn't have permission to see any in the admin
        $this->assertEquals(3, EEM_Event::instance()->count());
        $this->assertEquals(0, EEM_Event::instance()->count(array('caps' => EEM_Base::caps_read_admin)));
        //ok give them the cap to view their own
        $current_user->add_cap('ee_read_events');
        $events_i_can_see = EEM_Event::instance()->get_all(array('caps' => EEM_Base::caps_read_admin));
        $this->assertEquals(1, count($events_i_can_see));
        $first_event_i_can_see = reset($events_i_can_see);
        $this->assertEquals($my_e, $first_event_i_can_see);
        //ok now allowthem to see others, but not others private events
        $current_user->add_cap('ee_read_others_events');
        $events_i_can_see = EEM_Event::instance()->get_all(array('caps' => EEM_Base::caps_read_admin));
        $this->assertEquals(2, count($events_i_can_see));
        $first_event_i_can_see = reset($events_i_can_see);
        $this->assertEquals($my_e, $first_event_i_can_see);
        $second_event_i_can_see = next($events_i_can_see);
        $this->assertEquals($others_public_e, $second_event_i_can_see);
        //ok now allowthem to see others private events
        $current_user->add_cap('ee_read_private_events');
        $events_i_can_see = EEM_Event::instance()->get_all(array(
            'caps'     => EEM_Base::caps_read_admin,
            'order_by' => array('EVT_ID' => 'ASC'),
        ));
        $this->assertEquals(3, count($events_i_can_see));
        $first_event_i_can_see = reset($events_i_can_see);
        $this->assertEquals($my_e, $first_event_i_can_see);
        $second_event_i_can_see = next($events_i_can_see);
        $this->assertEquals($others_public_e, $second_event_i_can_see);
        $second_event_i_can_see = next($events_i_can_see);
        $this->assertEquals($others_private_e, $second_event_i_can_see);
    }



    /**
     * Checks that we can correctly apply FRONTEND  read caps where there are three
     * caps controlling access to the model: the basic cap (eg 'ee_read_events')
     * and the 'others' cap (eg 'ee_read_others_events' ) and the
     * 'private' cap (eg 'ee_read_private_events')
     *
     * @group model_caps
     */
    public function test_get_all__caps_read_read__basic_others_and_private()
    {
        $others_public_e = $this->new_model_obj_with_dependencies('Event',
            array('EVT_wp_user' => 45678, 'status' => 'publish'));
        $others_private_e = $this->new_model_obj_with_dependencies('Event',
            array('EVT_wp_user' => 3456, 'status' => 'private'));
        $others_draft_e = $this->new_model_obj_with_dependencies('Event',
            array('EVT_wp_user' => 1234, 'status' => 'draft'));
        //although there are 3 events, the current user shouldn't have permission to see any in the admin
        $this->assertEquals(3, EEM_Event::instance()->count());
        $events_i_can_see = EEM_Event::instance()->get_all(array('caps' => EEM_Base::caps_read));
        $this->assertEquals(1, count($events_i_can_see));
        $first_event_i_can_see = reset($events_i_can_see);
        $this->assertEquals($others_public_e, $first_event_i_can_see);
        //ok great. now let's authenticate and create some events for the authenticated user
        $current_user = $this->_ensure_current_user_set();
        //ok give them the cap to view their own
        $current_user->add_cap('ee_read_events');
        $my_e = $this->new_model_obj_with_dependencies('Event',
            array('EVT_wp_user' => $current_user->ID, 'status' => 'publish'));
        $my_private_e = $this->new_model_obj_with_dependencies('Event',
            array('EVT_wp_user' => $current_user->ID, 'status' => 'private'));
        $this->assertEquals(5, EEM_Event::instance()->count());
        $events_i_can_see = EEM_Event::instance()->get_all(array(
            'caps'     => EEM_Base::caps_read,
            'order_by' => array('EVT_ID' => 'ASC'),
        ));
        $this->assertEquals(3, count($events_i_can_see));
        $first_event_i_can_see = reset($events_i_can_see);
        $this->assertEquals($others_public_e, $first_event_i_can_see);
        $second_event_i_can_see = next($events_i_can_see);
        $this->assertEquals($my_e, $second_event_i_can_see);
        $third_event_i_can_see = next($events_i_can_see);
        $this->assertEquals($my_private_e, $third_event_i_can_see);
        //ok great. give them the cap to view others
        $current_user->add_cap('ee_read_others_events');
        $events_i_can_see = EEM_Event::instance()->get_all(array(
            'caps'     => EEM_Base::caps_read,
            'order_by' => array('EVT_ID' => 'ASC'),
        ));
        $this->assertEquals(4, count($events_i_can_see));
        $first_event_i_can_see = reset($events_i_can_see);
        $this->assertEquals($others_public_e, $first_event_i_can_see);
        $second_event_i_can_see = next($events_i_can_see);
        $this->assertEquals($others_draft_e, $second_event_i_can_see);
        $third_event_i_can_see = next($events_i_can_see);
        $this->assertEquals($my_e, $third_event_i_can_see);
        $fourth_event_i_can_see = next($events_i_can_see);
        $this->assertEquals($my_private_e, $fourth_event_i_can_see);
        //ok now allowthem to see others, but not others private events
        $current_user->add_cap('ee_read_others_events');
        $events_i_can_see = EEM_Event::instance()->get_all(array(
            'caps'     => EEM_Base::caps_read,
            'order_by' => array('EVT_ID' => 'ASC'),
        ));
        $this->assertEquals(4, count($events_i_can_see));
        $first_event_i_can_see = reset($events_i_can_see);
        $this->assertEquals($others_public_e, $first_event_i_can_see);
        $second_event_i_can_see = next($events_i_can_see);
        $this->assertEquals($others_draft_e, $second_event_i_can_see);
        $third_event_i_can_see = next($events_i_can_see);
        $this->assertEquals($my_e, $third_event_i_can_see);
        $fourth_event_i_can_see = next($events_i_can_see);
        $this->assertEquals($my_private_e, $fourth_event_i_can_see);
        //ok now allowthem to see others private events
        $current_user->add_cap('ee_read_private_events');
        $events_i_can_see = EEM_Event::instance()->get_all(array(
            'caps'     => EEM_Base::caps_read,
            'order_by' => array('EVT_ID' => 'ASC'),
        ));
        $this->assertEquals(5, count($events_i_can_see));
        $first_event_i_can_see = reset($events_i_can_see);
        $this->assertEquals($others_public_e, $first_event_i_can_see);
        $second_event_i_can_see = next($events_i_can_see);
        $this->assertEquals($others_private_e, $second_event_i_can_see);
        $third_event_i_can_see = next($events_i_can_see);
        $this->assertEquals($others_draft_e, $third_event_i_can_see);
        $fourth_event_i_can_see = next($events_i_can_see);
        $this->assertEquals($my_e, $fourth_event_i_can_see);
        $fifth_event_i_can_see = next($events_i_can_see);
        $this->assertEquals($my_private_e, $fifth_event_i_can_see);
    }



    /**
     * Makes sure the current user global is set and returns whoever that is
     *
     * @global WP_User $current_user
     * @return WP_User
     */
    protected function _ensure_current_user_set()
    {
        global $current_user;
        if ( ! $current_user instanceof WP_User || ($current_user instanceof WP_User && $current_user->ID == 0)) {
            $current_user = $this->factory->user->create_and_get();
        }
        return $current_user;
    }



    /**
     * Tests that when we get rows from the database and a secondary table has no row,
     * but the primary one does, that the fields for the secondary table are given
     * DEFAULT values instead of NULLs
     *
     * @group 7634
     */
    public function test_if_no_meta_row_use_defaults_not_nulls()
    {
        $e = $this->new_model_obj_with_dependencies('Event');
        //now use wpdb to directly delete its meta row
        global $wpdb;
        $deletions = $wpdb->delete(EEM_Event::instance()->second_table(), array('EVT_ID' => $e->ID()), array('%d'));
        $this->assertEquals(1, $deletions);
        //now forget about the old event object we had, we want to see what happens when we fetch it again
        EEM_Event::reset();
        $incomplete_e = EEM_Event::instance()->get_one_by_ID($e->ID());
        $actual_row = EEM_Event::instance()->get_all_wpdb_results(array(array('EVT_ID' => $e->ID())));
        $a_field_from_meta_table = EEM_Event::instance()->field_settings_for('EVT_display_ticket_selector');
        $another_field_from_meta_table = EEM_Event::instance()->field_settings_for('EVT_additional_limit');
        $this->assertEquals($a_field_from_meta_table->get_default_value(),
            $incomplete_e->get('EVT_display_ticket_selector'));
        $this->assertTrue(null !== $incomplete_e->get('EVT_display_ticket_selector'));
        $this->assertEquals($another_field_from_meta_table->get_default_value(),
            $incomplete_e->get('EVT_additional_limit'));
    }



    /**
     * Tests that if we are joining to a table that has no entries matching the query,
     * but the primary table does that we don't create model objects for the non-existent
     * row, but we do still create model objects for the row that did exist.
     *
     * @group 7634
     */
    public function test_get_all_if_related_model_blank_use_nulls()
    {
        $price_sans_price_type = EE_Price::new_instance(array(
            'PRC_name' => 'original',
            'PRT_ID'   => EEM_Price_Type::instance()->count() + 1,
        ));
        $price_sans_price_type->save();
        $fetched_price = EEM_Price::reset()->get_one(array(
            array('PRC_ID' => $price_sans_price_type->ID()),
            'force_join' => array('Price_Type'),
        ));
        $this->assertInstanceOf('EE_Price', $fetched_price);
        $this->assertEquals(null, $fetched_price->type_obj());
    }



    /**
     * Should reproduce issue 7791
     *
     * @group 7791
     */
    public function test_create_question_options()
    {
        foreach (EE_Registry::instance()->non_abstract_db_models as $model_name => $model_classname) {
            $model = EE_Registry::instance()->load_model($model_name);
            $question_option = $this->new_model_obj_with_dependencies($model_name);
            $this->assertInstanceOf('EE_' . $model_name, $question_option);
            //make sure this model is queryable and when we fetch its items that there's no errors
            $model->get_all();
        }
    }



    /**
     * @since 4.6.x
     */
    public function test_next_x()
    {
        //create 5 events for testing with.
        $events = $this->factory->event->create_many(5);
        //grab the first event in the list as the reference
        $event = reset($events);
        $this->assertInstanceOf('EE_Event', $event);
        //test method retrieving objects
        $next_events = EEM_Event::instance()->next_x($event->ID(), 'EVT_ID', 4);
        $this->assertEquals(4, count($next_events));
        $this->assertInstanceOf('EE_Event', reset($next_events));
        //test retrieving just ids
        $next_events = EEM_Event::instance()->next_x($event->ID(), 'EVT_ID', 4, array(), 'EVT_ID');
        $this->assertEquals(4, count($next_events));
        $this->assertTrue(array_key_exists('EVT_ID', $next_events[0]));
    }



    /**
     * @since 4.6.x
     */
    public function test_previous_x()
    {
        //create 5 events for testing with.
        $events = $this->factory->event->create_many(5);
        //grab the last event in the list as the reference
        $event = end($events);
        $this->assertInstanceOf('EE_Event', $event);
        //test method retrieving objects
        $previous_events = EEM_Event::instance()->previous_x($event->ID(), 'EVT_ID', 4);
        $this->assertEquals(4, count($previous_events));
        $this->assertInstanceOf('EE_Event', reset($previous_events));
        //test retrieving just ids
        $previous_events = EEM_Event::instance()->previous_x($event->ID(), 'EVT_ID', 4, array(), 'EVT_ID');
        $this->assertEquals(4, count($previous_events));
        $this->assertTrue(array_key_exists('EVT_ID', $previous_events[3]));
    }



    /**
     * @since 4.6.x
     */
    public function test_next()
    {
        //create 5 events for testing with.
        $events = $this->factory->event->create_many(5);
        //grab the first event in the list as the reference
        $event = reset($events);
        $this->assertInstanceOf('EE_Event', $event);
        //test method retrieving object
        $next_event = EEM_Event::instance()->next($event->ID());
        $this->assertInstanceOf('EE_Event', $next_event);
        $this->assertEquals($event->ID() + 1, $next_event->ID());
        //test retrieving just ids
        $next_event = EEM_Event::instance()->next($event->ID(), 'EVT_ID', array(), 'EVT_ID');
        $this->assertTrue(array_key_exists('EVT_ID', $next_event));
        $this->assertEquals($event->ID() + 1, $next_event['EVT_ID']);
    }



    /**
     * @since 4.6.x
     */
    public function test_previous()
    {
        //create 5 events for testing with.
        $events = $this->factory->event->create_many(5);
        //grab the last event in the list as the reference
        $event = end($events);
        $this->assertInstanceOf('EE_Event', $event);
        //test method retrieving object
        $previous_event = EEM_Event::instance()->previous($event->ID());
        $this->assertInstanceOf('EE_Event', $previous_event);
        $this->assertEquals($event->ID() - 1, $previous_event->ID());
        //test retrieving just ids
        $previous_event = EEM_Event::instance()->previous($event->ID(), 'EVT_ID', array(), 'EVT_ID');
        $this->assertTrue(array_key_exists('EVT_ID', $previous_event));
        $this->assertEquals($event->ID() - 1, $previous_event['EVT_ID']);
    }



    /**
     * checks that the BETWEEN operator works ok
     *
     * @group 8187
     */
    public function test_get_all__between()
    {
        EEM_Event::instance()->get_all(array(
            array(
                'Datetime.DTT_EVT_start' => array('BETWEEN', array('2015-03-02 00:00:00', '2016-03-04 00:00:00')),
            ),
        ));
        $this->assertTrue(true);
    }



    /**
     * @group 8241
     */
    public function test_get_IDs__empty_ID()
    {
        $e1 = $this->new_model_obj_with_dependencies('Event', array(), false);
        $e2 = $this->new_model_obj_with_dependencies('Event', array(), false);
        $this->assertEquals(array(), EEM_Event::instance()->get_IDs(array($e1, $e2), true));
    }



    /**
     * @group 8241
     */
    public function test_get_IDS()
    {
        $e1 = $this->new_model_obj_with_dependencies('Event', array());
        $e2 = $this->new_model_obj_with_dependencies('Event', array());
        $this->assertEquals(array($e1->ID(), $e2->ID()), EEM_Event::instance()->get_IDs(array($e1, $e2), true));
    }



    /**
     * @group 9389
     */
    public function test_get_all__automatic_group_by()
    {
        $this->assertEquals(2, EEM_Question_Group::instance()->count());
        $qsgs = EEM_Question_Group::instance()->get_all(
            array(
                'force_join' => array('Question'),
                'limit'      => array(2, 2),//grab 2 but offset by 2
            )
        );
        //so there are only 2 question groups, and we offset by 2.
        //so we shouldn't see any right?
        $this->assertEmpty($qsgs);
    }



    /**
     * Verifies that the EEM_Base::$_model_query_blog_id is not set until any model is instantiated and that if the
     * blog id is explicitly changed after instantiation (via the setter), future models instantiated will still retain
     * the blog id changed to.
     *
     * @group 9743
     */
    public function test_model_query_blog_id_set_on_instantiation()
    {
        //instantiate a model and verify that sets to current_blog_id();
        $attendee = EEM_Attendee::instance();
        $this->assertEquals(EEM_Base::get_model_query_blog_id(), get_current_blog_id());
        //verify blog_id changes
        EEM_Base::set_model_query_blog_id(2);
        $this->assertEquals(EEM_Base::get_model_query_blog_id(), 2);
        //verify that any NEW models instantiated retain that change.
        $question = EEM_Question::reset();
        $this->assertEquals(EEM_Base::get_model_query_blog_id(), 2);
        //make sure we restore the models to blog 1 for future tests.
        EEM_Base::set_model_query_blog_id(1);
    }



    /**
     * @group 9566
     */
    public function test_is_logic_query_param_key()
    {
        $this->assertTrue( EEM_Answer::instance()->is_logic_query_param_key( 'OR' ) );
        $this->assertTrue( EEM_Answer::instance()->is_logic_query_param_key( 'NOT*' ) );
        $this->assertTrue( EEM_Answer::instance()->is_logic_query_param_key( 'AND*other-condition' ) );
        $this->assertFalse( EEM_Answer::instance()->is_logic_query_param_key( 'ATT_fname' ) );
        $this->assertFalse( EEM_Answer::instance()->is_logic_query_param_key( 'Registration.REG_date' ) );
        $this->assertFalse( EEM_Answer::instance()->is_logic_query_param_key( 'ORG_name' ) );

    }


    /**
     * @group customselects
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws Exception
     */
    public function testExtraSelects()
    {
        //setup some data in the db
        $attendee = $this->factory->attendee->create();
        $this->factory->registration->create_many(3, array('ATT_ID' => $attendee->ID()));
        EEM_Attendee::reset();
        EEM_Registration::reset();
        $attendees = EEM_Attendee::instance()->get_all(
            array(
                'extra_selects' => array(
                    'registration_count' => array('Registration.REG_ID', 'count', '%d')
                )
            )
        );
        $this->assertCount(1, $attendees);
        $attendee = reset($attendees);
        $this->assertInstanceOf('EE_Attendee', $attendee);
        $this->assertEquals(3, $attendee->getCustomSelect('registration_count'));
    }
}

// End of file EEM_Base_Test.php
// Location: testcases/core/db_models/EEM_Base_Test.php
