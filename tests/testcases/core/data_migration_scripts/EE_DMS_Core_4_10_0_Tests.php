<?php

use EventEspresso\core\services\loaders\LoaderFactory;

if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EE_DMS_4_10_0_Tests
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 * @group data_migration_scripts
 * @group core/data_migration_scripts
 * @group EE_DMS_4_10_0_Tests
 *
 */
class EE_DMS_4_10_0_Tests extends EE_UnitTestCase{

    /**
     * An event with only the personal question group for primary attendees.
     * @since 4.10.0.p
     */
	public function testMigratePersonalForPrimary()
    {
        $e = $this->new_model_obj_with_dependencies('Event');
        $e->add_question_group(1, true);
        $this->assertEquals(1, EEM_Event_Question_Group::instance()->count());
        $this->migrateFiveEventQuestionGroups();
        // It should have actually not migrated anything over.
        $this->assertEquals(1, EEM_Event_Question_Group::instance()->count());
    }

    /**
     * An event with personal and address question group for primary attendees.
     * @since 4.10.0.p
     */
    public function testMigratePersonalAndAdditionalForPrimary()
    {
        $e = $this->new_model_obj_with_dependencies('Event');
        $e->add_question_group(1, true);
        $e->add_question_group(2, true);
        $this->assertEquals(2, EEM_Event_Question_Group::instance()->count());
        $this->migrateFiveEventQuestionGroups();
        $this->assertEquals(2, EEM_Event_Question_Group::instance()->count());
        foreach(EEM_Event_Question_Group::instance()->get_all() as $eqg) {
            $this->assertTrue($eqg->get('EQG_primary'));
            $this->assertFalse($eqg->get('EQG_additional'));
        }
    }

    /**
     * An event with personal question group for primary and additional attendees.
     * @since 4.10.0.p
     */
    public function testMigratePersonalForPrimaryAndAdditional()
    {
        $e = $this->new_model_obj_with_dependencies('Event');
        $e->add_question_group(1, true);
        // Manually enter the duplicate row. In 4.9 and lower, this meant the question group was for additional
        // attendees.
        EEM_Event_Question_Group::instance()->insert(
            [
                'EVT_ID' => $e->ID(),
                'QSG_ID' => 1,
                'EQG_primary' => false,
            ]
        );
        $this->assertEquals(2, EEM_Event_Question_Group::instance()->count());
        $this->migrateFiveEventQuestionGroups();
        // That "duplicate" row should have been removed...
        $this->assertEquals(1, EEM_Event_Question_Group::instance()->count());
        // ...and `EQG_additional` should have been populated on the sole row.
        $eqg = EEM_Event_Question_Group::instance()->get_one();
        $this->assertTrue($eqg->get('EQG_primary'));
        $this->assertTrue($eqg->get('EQG_additional'));

    }

    /**
     * Tests what happens when we need to do the migrations across multiple requests.
     * In the first iteration of this script, this cause problems because we were modifying the original set,
     * which made the limit part of our queries off.
     * @since 4.10.0.p
     */
    public function testMigrateMultipleSteps()
    {
        // Create 10 event-question-group rows that need to be migrated.
        for($i=0; $i<10; $i++) {
            $e = $this->new_model_obj_with_dependencies('Event');
            $e->add_question_group(1, true);
            // Manually create a "duplicate" row that has EQG_primary=false. This was the old way of representing
            // a question group that applied to additional attendees.
            EEM_Event_Question_Group::instance()->insert(
                [
                    'EVT_ID' => $e->ID(),
                    'QSG_ID' => 1,
                    'EQG_primary' => false
                ]
            );
        }
        $this->assertEquals(20, EEM_Event_Question_Group::instance()->count());
        // Run two migration steps of size 5.
        $stage = $this->migrateFiveEventQuestionGroups();
        $stage->migration_step(5);

        // All 10 of them should have been removed
        $this->assertEquals(10, EEM_Event_Question_Group::instance()->count());
    }

    /**
     * An event with personal question group for primary and additional attendees.
     * @since 4.10.0.p
     */
    public function testMigrateManyQuestionGroupslForPrimaryAndAdditional()
    {
        // Create 2 custom question groups.
        $cqg1 = $this->new_model_obj_with_dependencies('Question_Group');
        $q1 = $this->new_model_obj_with_dependencies('Question');
        $cqg1->_add_relation_to($q1,'Question');
        $cqg2 = $this->new_model_obj_with_dependencies('Question_Group');
        $q2 = $this->new_model_obj_with_dependencies('Question');
        $cqg2->_add_relation_to($q2, 'Question');

        // Create an event with ALL the question groups.
        $e = $this->new_model_obj_with_dependencies('Event');
        $e->add_question_group(EEM_Question_Group::system_personal, true);
        $e->add_question_group(EEM_Question_Group::system_address, true);
        $e->add_question_group($cqg1, true);
        $e->add_question_group($cqg2, true);

        foreach(array(
            EEM_Question_Group::system_personal,
            EEM_Question_Group::system_address,
            $cqg1->ID(),
            $cqg2->ID()
            ) as $question_group_id) {
            $e->add_question_group($question_group_id, true);
            // Manually enter the duplicate row. In 4.9 and lower, this meant the question group was for additional
            // attendees.
            EEM_Event_Question_Group::instance()->insert(
                [
                    'EVT_ID' => $e->ID(),
                    'QSG_ID' => $question_group_id,
                    'EQG_primary' => false,
                ]
            );
        }

        $this->assertEquals(8, EEM_Event_Question_Group::instance()->count());
        $this->migrateFiveEventQuestionGroups();
        $this->migrateFiveEventQuestionGroups();
        // That "duplicate" row should have been removed...
        $this->assertEquals(4, EEM_Event_Question_Group::instance()->count());
        // And double-check we still find those groups are related.
        $primary_attendee_question_groups = EEM_Event::instance()->get_event_question_groups($e->ID(), true);
        $this->assertEquals(4, count($primary_attendee_question_groups));
        $additional_attendee_question_groups = EEM_Event::instance()->get_event_question_groups($e->ID(), false);
        $this->assertEquals(4, count($additional_attendee_question_groups));
    }

    /**
     * An event with personal question groups additional attendees only.
     * @since 4.10.0.p
     */
    public function testMigrateManyQuestionGroupslForAdditionalAttendeesOnly()
    {
        // Create 2 custom question groups.
        $cqg1 = $this->new_model_obj_with_dependencies('Question_Group');
        $q1 = $this->new_model_obj_with_dependencies('Question');
        $cqg1->_add_relation_to($q1,'Question');
        $cqg2 = $this->new_model_obj_with_dependencies('Question_Group');
        $q2 = $this->new_model_obj_with_dependencies('Question');
        $cqg2->_add_relation_to($q2, 'Question');

        // Create an event with ALL the question groups.
        $e = $this->new_model_obj_with_dependencies('Event');
        $e->add_question_group(EEM_Question_Group::system_personal, true);

        foreach(array(
                    EEM_Question_Group::system_personal,
                    EEM_Question_Group::system_address,
                    $cqg1->ID(),
                    $cqg2->ID()
                ) as $question_group_id) {

            // Manually enter the duplicate row. In 4.9 and lower, this meant the question group was for additional
            // attendees.
            EEM_Event_Question_Group::instance()->insert(
                [
                    'EVT_ID' => $e->ID(),
                    'QSG_ID' => $question_group_id,
                    'EQG_primary' => false,
                ]
            );
        }

        $this->assertEquals(5, EEM_Event_Question_Group::instance()->count());
        $this->migrateFiveEventQuestionGroups();
        $this->migrateFiveEventQuestionGroups();
        // That "duplicate" row should have been removed...
        $this->assertEquals(4, EEM_Event_Question_Group::instance()->count());
        // And double-check we still find those groups are related.
        $primary_attendee_question_groups = EEM_Event::instance()->get_event_question_groups($e->ID(), true);
        $this->assertEquals(1, count($primary_attendee_question_groups));
        $additional_attendee_question_groups = EEM_Event::instance()->get_event_question_groups($e->ID(), false);
        $this->assertEquals(4, count($additional_attendee_question_groups));
    }


    // More than 50 question groups (make sure they all get migrated)


	protected function migrateFiveEventQuestionGroups()
    {
        $script = LoaderFactory::getLoader()->getShared('EE_DMS_Core_4_10_0');
        $stage = new EE_DMS_4_10_0_Event_Question_Group();
        $stage->migration_step(5);
        return $stage;
    }
}

// End of file EE_DMS_4_10_0_Tests.php