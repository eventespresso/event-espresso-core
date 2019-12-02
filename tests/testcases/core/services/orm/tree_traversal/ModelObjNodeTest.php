<?php

namespace EventEspresso\core\services\orm\tree_traversal;

use EE_UnitTestCase;

/**
 * Class EntityNodeTest
 *
 * Description
 *
 * @package     Event Espresso
 * @author         Mike Nelson
 * @since         $VID:$
 *
 */
class ModelObjNodeTest extends EE_UnitTestCase
{
    public function testVisit(){
        $e = $this->new_model_obj_with_dependencies('Event');
        $event_node = new ModelObjNode($e);
        $work_done = $event_node->visit(1);
        $this->assertEquals(0, $work_done);
        $tree = $event_node->toArray();

        // We should know the ID of the main object.
        $this->assertEquals($e->ID(), $tree['id']);

        $this->assertEquals(true, $tree['complete']);

        // We should have a node for the datetime relation.
        $this->assertArrayHasKey('Datetime', $tree['rels']);

        // We should NOT have relation nodes for HABTM relations...
        $this->assertArrayNotHasKey('Question_Group', $tree['rels']);

        // ...but we should for their join tables...
        $this->assertArrayHasKey('Event_Question_Group', $tree['rels']);

        // ...even if they're only an implied relation.
        $this->assertArrayHasKey('Event_Venue', $tree['rels']);
    }

    public function testVisitRepeated(){
        $e = $this->new_model_obj_with_dependencies('Event');
        $datetimes_count = 3;
        for($i=0;$i<$datetimes_count;$i++){
            $d = $this->new_model_obj_with_dependencies(
                'Datetime',
                [
                    'EVT_ID'=> $e->ID()
                ]
            );
            $this->new_ticket(
                [
                    'datetime_objects' => [
                        $d->ID()
                    ]
                ]
            );
        }

        $e_node = new ModelObjNode($e);
        $work_budget = 2;
        $work_done = $e_node->visit($work_budget);
        $this->assertEquals($work_budget, $work_done);
        $partial_tree = $e_node->toArray();
        $this->assertFalse($partial_tree['complete']);
        // It goes through the relations in alphabetical order. Change log is the first at the time of writing.
        // So we should have checked for change logs, found none (did not "work"), and then kept going.
        $this->assertArrayHasKey('Change_Log', $partial_tree['rels']);
        $this->assertTrue($partial_tree['rels']['Change_Log']['complete']);
        $this->assertEquals(0, $partial_tree['rels']['Change_Log']['count']);
        // Assert datetimes done as expected.
        $this->assertArrayHasKey('Datetime', $partial_tree['rels']);
        // Not complete, but did 2 or the three.
        $this->assertFalse($partial_tree['rels']['Datetime']['complete']);
        $this->assertEquals( $datetimes_count, $partial_tree['rels']['Datetime']['count']);
        $this->assertEquals($work_done, count($partial_tree['rels']['Datetime']['objs']));
        // Their related ticket relations should not have been visited yet
        $a_datetime_node = reset($partial_tree['rels']['Datetime']['objs']);
        $this->assertFalse($a_datetime_node['complete']);
        $this->assertNull($a_datetime_node['rels']);
        // We'll get them next time, probably.
    }
}
// End of file EntityNodeTest.php
// Location: EventEspresso\core\services\orm\tree_traversal/EntityNodeTest.php
