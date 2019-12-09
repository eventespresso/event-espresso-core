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

        // Ok traverse 2 objects in the tree. That means we'll grab two of the datetimes, but not finish visiting
        // their children.
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
        // Not complete, but did 2 of the 3.
        $this->assertFalse($partial_tree['rels']['Datetime']['complete']);
        $this->assertEquals( $datetimes_count, $partial_tree['rels']['Datetime']['count']);
        $this->assertEquals($work_done, count($partial_tree['rels']['Datetime']['objs']));
        // Their related ticket relations should not have been visited yet
        $a_datetime_node = reset($partial_tree['rels']['Datetime']['objs']);
        $this->assertFalse($a_datetime_node['complete']);

        // Hit it again. Now we should visit the first datetime node.
        $e_node->visit($work_budget);
        $partial_tree = $e_node->toArray();
        // still shouldn't be done. We haven't yet had a chance to see if the datetime's datetime-ticket relation
        // has any related items.
        $this->assertFalse($partial_tree['complete']);
        $this->assertFalse($partial_tree['rels']['Datetime']['complete']);
        // The first datetime should have been visited, and its ticket relation.
        $a_datetime_node = reset($partial_tree['rels']['Datetime']['objs']);
        $that_datetimes_ticket = reset($a_datetime_node['rels']['Datetime_Ticket']['objs']);
        $this->assertTrue($that_datetimes_ticket['complete']);
        $this->assertTrue($a_datetime_node['complete']);
        $another_datetime_node = next($partial_tree['rels']['Datetime']['objs']);
        $this->assertFalse($another_datetime_node['complete']);

        // Hit it a third time. This time the other datetime should be visited and its ticket, but not the 3rd datetime.
        $e_node->visit($work_budget);
        $partial_tree = $e_node->toArray();
        $first_datetime = reset($partial_tree['rels']['Datetime']['objs']);
        $this->assertTrue($first_datetime['complete']);
        $second_datetime = next($partial_tree['rels']['Datetime']['objs']);
        $this->assertTrue($second_datetime['complete']);
        $third_datetime = next($partial_tree['rels']['Datetime']['objs']);
        $this->assertFalse($third_datetime['complete']);

        // Hit it a fourth time. We'll fetch the last datetime, and then its datetime-ticket relation.
        // But we won't have time to finish checking if it has more related items.
        $e_node->visit($work_budget);
        $partial_tree = $e_node->toArray();
        $first_datetime = reset($partial_tree['rels']['Datetime']['objs']);
        $this->assertTrue($first_datetime['complete']);
        $second_datetime = next($partial_tree['rels']['Datetime']['objs']);
        $this->assertTrue($second_datetime['complete']);
        $third_datetime = next($partial_tree['rels']['Datetime']['objs']);
        $this->assertTrue($third_datetime['complete']);
        $this->assertTrue($partial_tree['complete']);
    }

    public function testGetIds(){
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
        $e_node->visit(999);
        $ids = $e_node->getIds();
        $this->assertArrayHasKey('Event', $ids);
        $this->assertArrayHasKey($e->ID(),$ids['Event']);
        $this->assertEquals(1, count($ids['Event']));
        $this->assertArrayHasKey('Datetime', $ids);
        $this->assertArrayHasKey('Datetime_Ticket', $ids);
        foreach($e->datetimes() as $datetime){
            $this->assertArrayHasKey($datetime->ID(), $ids['Datetime']);
            foreach($datetime->get_many_related('Datetime_Ticket') as $datetime_ticket){
                $this->assertArrayHasKey($datetime_ticket->ID(), $ids['Datetime_Ticket']);
            }
        }
        // Check it doesn't have anything weird...
        $this->assertEquals(
            [
                'Event',
                'Datetime',
                'Datetime_Ticket',
            ],
            array_keys($ids)
        );
    }
}
// End of file EntityNodeTest.php
// Location: EventEspresso\core\services\orm\tree_traversal/EntityNodeTest.php
