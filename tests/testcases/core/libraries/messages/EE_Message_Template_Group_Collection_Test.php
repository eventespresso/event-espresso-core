<?php
/**
 * Contains test class for /core/repositories/EE_Message_Template_Group_Collection.lib.php
 *
 * @since         4.9.0
 * @package       Event Espresso
 * @subpackage    tests
 */

/**
 * All tests for the EE_Message_Template_Group_Collection class.
 *
 * @since         4.9.0
 * @package       Event Espresso
 * @subpackage    tests
 * @group         messages
 */
class EE_Message_Template_Group_Collection_Test extends EE_UnitTestCase
{


    /**
     * @return EE_Message_Template_Group_Collection
     */
    public function test_add()
    {
        //there should be a message template group in the db.  Let's get it.
        $message_template_group = EEM_Message_Template_Group::instance()->get_one(
            array(
                array(
                    'MTP_messenger'    => 'email',
                    'MTP_message_type' => 'registration',
                ),
            )
        );
        $this->assertInstanceOf('EE_Message_Template_Group', $message_template_group);

        $test_repo = new EE_Message_Template_Group_Collection();

        $this->assertInstanceOf('EE_Message_Template_Group_Collection', $test_repo);

        //add mtpg to repo with dummy evtID used for later tests.
        $test_repo->add($message_template_group, 22);

        //verify the message was added
        $this->assertEquals(1, $test_repo->count());
        $test_repo->rewind();
        $this->assertInstanceOf('EE_Message_Template_Group', $test_repo->current());
        return $test_repo;
    }


    /**
     * @depends test_add
     * @param EE_Message_Template_Group_Collection $test_repo
     * @return EE_Message_Template_Group_Collection
     */
    public function test_get_by_ID(EE_Message_Template_Group_Collection $test_repo)
    {
        //get the object to remove.
        $mtpg = $test_repo->current();

        //verify that retrieving the object by ID works
        $this->assertEquals($mtpg, $test_repo->get_by_ID($mtpg->ID()));

        return $test_repo;
    }


    /**
     * @depends test_get_by_ID
     * @param EE_Message_Template_Group_Collection $test_repo
     */
    public function test_get_by_key(EE_Message_Template_Group_Collection $test_repo)
    {
        $key_should_exist     = $test_repo->get_key('email', 'registration', 22);
        $key_should_not_exist = $test_repo->get_key('email', 'registration', 15);
        $this->assertNotInstanceOf('EE_Message_Template_Group', $test_repo->get_by_key($key_should_not_exist));
        $this->assertInstanceOf('EE_Message_Template_Group', $test_repo->get_by_key($key_should_exist));
    }


}
