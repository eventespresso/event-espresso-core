<?php

namespace EventEspresso\core\domain\services\capabilities\user_caps;

use EE_Error;
use EE_Question;
use EE_Question_Group;
use ReflectionException;

class RegFormListTableUserCapabilities extends UserCapabilities
{
    /**
     * @throws EE_Error
     * @throws ReflectionException
     * @param \EE_Question $question
     * @return bool
     */
    public function userCanEditQuestion($question)
    {
        return $this->hasEntityCap(
            'ee_edit_question',
            'espresso_registration_form_edit_question',
            $question->ID()
        );
    }


    /**
     * @return bool
     */
    public function userCanTrashQuestions()
    {
        return $this->hasGlobalCap(
            'ee_delete_questions',
            'espresso_registration_form_trash_question'
        );
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     * @param \EE_Question $question
     * @return bool
     */
    public function userCanTrashQuestion($question)
    {
        return $this->hasEntityCap(
            'ee_delete_question',
            'espresso_registration_form_trash_question',
            $question->ID()
        );
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     * @param \EE_Question $question
     * @return bool
     */
    public function userCanRestoreQuestion($question)
    {
        return $this->hasEntityCap(
            'ee_delete_question',
            'espresso_registration_form_restore_question',
            $question->ID()
        );
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     * @param \EE_Question $question
     * @return bool
     */
    public function userCanDeleteQuestion($question)
    {
        return $this->hasEntityCap(
            'ee_delete_question',
            'espresso_registration_form_delete_questions',
            $question->ID()
        );
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     * @param \EE_Question_Group $question_group
     * @return bool
     */
    public function userCanEditQuestionGroup($question_group)
    {
        return $this->hasEntityCap(
            'ee_edit_question_group',
            'espresso_registration_form_edit_question_group',
            $question_group->ID()
        );
    }


    /**
     * @return bool
     */
    public function userCanTrashQuestionGroups()
    {
        return $this->hasGlobalCap(
            'ee_delete_question_groups',
            'espresso_registration_form_trash_question_groups'
        );
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     * @param \EE_Question_Group $question_group
     * @return bool
     */
    public function userCanTrashQuestionGroup($question_group)
    {
        return $this->hasEntityCap(
            'ee_delete_question_group',
            'espresso_registration_form_trash_question_group',
            $question_group->ID()
        );
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     * @param \EE_Question_Group $question_group
     * @return bool
     */
    public function userCanRestoreQuestionGroup($question_group)
    {
        return $this->hasEntityCap(
            'ee_delete_question_group',
            'espresso_registration_form_trash_question_group',
            $question_group->ID()
        );
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     * @param \EE_Question_Group $question_group
     * @return bool
     */
    public function userCanDeleteQuestionGroup($question_group)
    {
        return $this->hasEntityCap(
            'ee_delete_question_group',
            'espresso_registration_form_delete_question_group',
            $question_group->ID()
        );
    }
}
