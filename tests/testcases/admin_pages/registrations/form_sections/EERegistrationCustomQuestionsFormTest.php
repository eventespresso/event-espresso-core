<?php

/**
 * Class EERegistrationCustomQuestionsFormTest
 *
 * Description
 *
 * @package     Event Espresso
 * @author         Mike Nelson
 * @since         $VID:$
 * @group current
 *
 */
class EERegistrationCustomQuestionsFormTest extends EE_UnitTestCase
{
    public function setUp()
    {
        parent::setUp();
        $this->delayedAdminPageMocks('registrations');

    }

    /**
     * loader for setting the $_admin_page_property
     *
     * @since 4.6
     */
    protected function loadRequirements()
    {
        $this->_admin_page = new Registrations_Admin_Page_Mock();
        require_once(REG_ADMIN . 'form_sections' . DS . 'EE_Registration_Custom_Questions_Form.form.php');
    }

    /**
     * Tests build_form_from_registration. We have a primary reg, and primary regs should answer the personal info
     * question group, but no custom questions for that question group.
     * @since $VID:$
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws RuntimeException
     * @throws \EventEspresso\core\exceptions\EntityNotFoundException
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     */
    public function testBuildFormFromRegistrationForPrimaryRegistrationNoCustomQuestions()
    {
        $this->loadRequirements();
        $reg = $this->factory->registration_chained->create_object(
            [
                'REG_count' => 1,
            ]
        );
        $e = $reg->event();
        $e->add_question_group(1, true);
        $form = new EE_Registration_Custom_Questions_Form($reg);
        $subsections = $form->subsections();
        // Assert only the first question group in there
        $this->assertEquals(0, count($subsections));
    }

    /**
     * Tests build_form_from_registration. We have a primary reg, who should answer the personal info question group
     * and it has a custom question in it.
     * @since $VID:$
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws RuntimeException
     * @throws \EventEspresso\core\exceptions\EntityNotFoundException
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     */
    public function testBuildFormFromRegistrationForPrimaryRegistrationWithCustomQuestions()
    {
        $this->loadRequirements();
        $qg1 = EEM_Question_Group::instance()->get_one_by_ID(EEM_Question_Group::system_personal);
        $customq = $this->new_model_obj_with_dependencies('Question', ['QST_system' => '']);
        $qg1->_add_relation_to($customq, 'Question');
        $reg = $this->factory->registration_chained->create_object(
            [
                'REG_count' => 1,
            ]
        );
        $e = $reg->event();
        $e->add_question_group(1, true);
        $form = new EE_Registration_Custom_Questions_Form($reg);
        $subsections = $form->subsections();
        // Assert only the first question group in there
        $this->assertArrayHasKey(1, $subsections);
        $this->assertEquals(1, count($subsections));
    }

    /**
     * Tests build_form_from_registration. We have an additional reg, but only primary attendees should answer
     * the personal info question group (which has a custom question in it).
     * @since $VID:$
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws RuntimeException
     * @throws \EventEspresso\core\exceptions\EntityNotFoundException
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     */
    public function testBuildFormFromRegistrationForAdditionalRegistrationWrongContext()
    {
        $this->loadRequirements();
        $qg1 = EEM_Question_Group::instance()->get_one_by_ID(EEM_Question_Group::system_personal);
        $customq = $this->new_model_obj_with_dependencies('Question', ['QST_system' => '']);
        $qg1->_add_relation_to($customq, 'Question');
        $reg = $this->factory->registration_chained->create_object(
            [
                'REG_count' => 2,
                'REG_group_size' => 2,
            ]
        );
        $e = $reg->event();
        // Note that we're adding the question group for PRIMARY attendees, whereas this attendee is an additional one.
        $e->add_question_group(1, true);
        $form = new EE_Registration_Custom_Questions_Form($reg);
        $subsections = $form->subsections();
        // Assert this additional attendee wasn't asked to answer a question group only for primary attendees.
        $this->assertEquals(0, count($subsections));
    }

    /**
     * Tests build_form_from_registration. We have an additional reg, but only primary attendees should answer
     * the personal info question group (which has a custom question in it).
     * @since $VID:$
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws RuntimeException
     * @throws \EventEspresso\core\exceptions\EntityNotFoundException
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     */
    public function testBuildFormFromRegistrationForAdditionalRegistrationNoCustomQuestions()
    {
        $this->loadRequirements();
        $reg = $this->factory->registration_chained->create_object(
            [
                'REG_count' => 2,
                'REG_group_size' => 2,
            ]
        );
        $e = $reg->event();
        // Note that we're adding the question group for additional attendees, of which our reg is one.
        $e->add_question_group(1, false);
        $form = new EE_Registration_Custom_Questions_Form($reg);
        $subsections = $form->subsections();
        // No custom questions for additional attendees.
        $this->assertEquals(0, count($subsections));
    }

    /**
     * Tests build_form_from_registration. We have an additional reg, who should answer the personal info question group
     * and it has a custom question in it.
     * @since $VID:$
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws RuntimeException
     * @throws \EventEspresso\core\exceptions\EntityNotFoundException
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     */
    public function testBuildFormFromRegistrationForAdditionalRegistration()
    {
        $this->loadRequirements();
        $qg1 = EEM_Question_Group::instance()->get_one_by_ID(EEM_Question_Group::system_personal);
        $customq = $this->new_model_obj_with_dependencies('Question', ['QST_system' => '']);
        $qg1->_add_relation_to($customq, 'Question');
        $reg = $this->factory->registration_chained->create_object(
            [
                'REG_count' => 2,
                'REG_group_size' => 2,
            ]
        );
        $e = $reg->event();
        // Note that we are adding a question group for additional attendees, of which this registration is one.
        $e->add_question_group(1, false);
        $form = new EE_Registration_Custom_Questions_Form($reg);
        $subsections = $form->subsections();
        // Assert only the first question group in there
        $this->assertEquals(1, count($subsections));
        $this->assertArrayHasKey(1, $subsections);
    }

}
// End of file EERegistrationCustomQuestionsFormTest.php
// Location: ${NAMESPACE}/EERegistrationCustomQuestionsFormTest.php
