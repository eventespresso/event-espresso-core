<?php
defined('EVENT_ESPRESSO_VERSION') || exit;


/**
 * Test Class for EE_Messages_Scheduler
 *
 * @package    Event Espresso
 * @subpackage tests
 * @author     Darren Ethier
 * @since      4.9.26.rc.x
 * @group messages
 */
class EE_Messages_Scheduler_Test extends EE_UnitTestCase
{

    /**
     * Tests the cleanup method for messages when config is set to keep forever.
     * @group 10417
     */
    public function test_cleanup_turned_off()
    {
        //create some messages
        $this->addSomeMessagesForTesting();
        EE_Registry::instance()->CFG->messages->delete_threshold = 0;
        EE_Messages_Scheduler::cleanup();
        //there should still be the old message in there.
        $this->assertEquals(3, EEM_Message::instance()->count());
    }


    /**
     * Tests the cleanup method for messages when config is set to remove.
     * @group 10417
     */
    public function test_cleanup_turned_on()
    {
        //create some messages
        $this->addSomeMessagesForTesting();
        EE_Registry::instance()->CFG->messages->delete_threshold = 3;
        EE_Messages_Scheduler::cleanup();
        $this->assertEquals(1, EEM_Message::instance()->count());
    }


    protected function addSomeMessagesForTesting()
    {
        $this->loadFactories();
        $messages_to_create = array(
            array(
                'STS_ID' => EEM_Message::status_idle,
                'MSG_modified' => time() - (4*MONTH_IN_SECONDS)
            ),
            array(
                'STS_ID' => EEM_Message::status_debug_only,
                'MSG_modified' => time() - (4*MONTH_IN_SECONDS)
            ),
            array(
                'STS_ID' => EEM_Message::status_sent,
                'MSG_modified' => time() - (4*MONTH_IN_SECONDS)
            )
        );
        foreach ($messages_to_create as $message_to_create) {
            $this->factory->message->create($message_to_create);
        }
    }

}