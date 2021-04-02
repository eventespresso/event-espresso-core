<?php
/**
 * Contains test class for /core/libraries/messages/EE_Messages_Generator.lib.php
 *
 * @since         4.9.0
 * @package       Event Espresso
 * @subpackage    tests
 */

/**
 * All tests for the EE_Messages_Generator class.
 * Note: the following public methods in this class are implicitly tested via the EE_Messages_Processor_Test
 * - generate() (and the children methods it calls)
 * - create_and_add_message_to_queue() (and the children it depends on)
 *
 * @since         4.9.0
 * @package       Event Espresso
 * @subpackage    tests
 * @group         messages
 */
class EE_Messages_Generator_Test extends EE_UnitTestCase
{


    /**
     * @return EE_Messages_Generator
     */
    function test_construct()
    {
        /** @type EE_Messages_Generator $generator */
        $generator = EE_Registry::factory('EE_Messages_Generator');
        //assert $generator loaded okay
        $this->assertInstanceOf('EE_Messages_Generator', $generator);
        return $generator;
    }


    /**
     * This test verifies that the generation queue only generates messages with the status of incomplete.
     *
     * @see   https://events.codebasehq.com/projects/event-espresso/tickets/9787
     * @group 9787
     */
    function test_generate_only_incomplete_messages()
    {
        $this->loadFactories();
        $message_processor = EE_Registry::instance()->load_lib('Messages_Processor');
        //make sure there is nothing in the queue
        $this->assertFalse($message_processor->batch_generate_from_queue(array(), true));

        //get an event (with relations via creating the ticket) in the db for the message preview
        $this->factory->ticket_chained->create();

        //get some ready to generate
        $this->factory->message->create_many(5);

        /** @var EE_Messages_Queue $new_queue */
        $new_queue = $message_processor->batch_generate_from_queue();
        $this->assertInstanceOf('EE_Messages_Queue', $new_queue);

        //now let's grab the generated messages from this queue and send it in to the batch_generate_from_queue
        $messages = array();
        $new_queue->get_message_repository()->rewind();
        while ($new_queue->get_message_repository()->valid()) {
            $messages[] = $new_queue->get_message_repository()->current();
            $new_queue->get_message_repository()->next();
        }

        /** @var EE_Messages_Queue $newer_queue */
        $newer_queue = $message_processor->batch_generate_from_queue($messages);
        $this->assertInstanceOf('EE_Messages_Queue', $newer_queue);
        //there should be NO fails in the queue.
        $this->assertEquals(0, $newer_queue->count_STS_in_queue(array(EEM_Message::status_failed)));
    }


} //end EE_Messages_Generator_Test class
// Location: tests/testcases/core/libraries/messages/EE_Messages_Generator_Test.php