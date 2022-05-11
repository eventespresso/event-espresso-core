<?php

defined('EVENT_ESPRESSO_VERSION') || exit('No direct access allowed.');


/**
 * EE_Message_Template_Group_Test tests EE_Message_Template_Group
 *
 *
 * @package EventEspressoTests
 * @author  Darren Ethier
 * @since   4.9.46.rc.066
 * @group messages
 */
class EE_Message_Template_Group_Test extends EE_UnitTestCase
{
    /**
     * @var EE_Message_Template_Group
     */
    private $message_template_group;

    public function set_up()
    {
        parent::set_up();
        $this->message_template_group = EEM_Message_Template_Group::instance()->get_one(
            array(
                array(
                    'MTP_messenger' => 'email',
                    'MTP_message_type' => 'registration'
                )
            )
        );
    }


    public function tear_down()
    {
        parent::tear_down();
        $this->message_template_group = null;
    }


    /**
     * This tests that a valid context that should be active on a fresh install is.
     */
    public function testValidContextTemplateShouldBeActive()
    {
        $this->assertTrue(
            $this->message_template_group->is_context_active(
                'admin'
            )
        );
    }


    public function testInvalidContextTemplateForIsContextActive()
    {
        $this->expectException(EventEspresso\core\exceptions\InvalidIdentifierException::class);
        $this->message_template_group->is_context_active('bogus');
    }




    public function testDeactivatingAndReactivatingValidContext()
    {
        //deactivate
        $this->message_template_group->deactivate_context('admin');
        $this->assertFalse(
            $this->message_template_group->is_context_active('admin')
        );

        //activate again
        $this->message_template_group->activate_context('admin');
        $this->assertTrue(
            $this->message_template_group->is_context_active('admin')
        );
    }


    public function testActivatingInvalidContext()
    {
        $this->expectException(EventEspresso\core\exceptions\InvalidIdentifierException::class);
        $this->message_template_group->deactivate_context('bogus');
    }


    public function testDeactivatingInvalidContext()
    {
        $this->expectException(EventEspresso\core\exceptions\InvalidIdentifierException::class);
        $this->message_template_group->activate_context('bogus');
    }
}
