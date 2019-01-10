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
 * @group current
 *
 */
class EE_DMS_4_10_0_Tests extends EE_UnitTestCase{

    /**
     * An event with only the personal question group for primary attendees.
     * @since $VID:$
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
     * @since $VID:$
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
     * @since $VID:$
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
     * @since $VID:$
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