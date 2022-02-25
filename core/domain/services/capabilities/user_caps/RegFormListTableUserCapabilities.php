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
     */
    public function userCanEditQuestion(EE_Question $question): bool
    {
        return $this->hasEntityCap(
            'ee_edit_question',
            'espresso_registration_form_edit_question',
            $question->ID()
        );
    }


    public function userCanTrashQuestions(): bool
    {
        return $this->hasGlobalCap(
            'ee_delete_questions',
            'espresso_registration_form_trash_question'
        );
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function userCanTrashQuestion(EE_Question $question): bool
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
     */
    public function userCanRestoreQuestion(EE_Question $question): bool
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
     */
    public function userCanDeleteQuestion(EE_Question $question): bool
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
     */
    public function userCanEditQuestionGroup(EE_Question_Group $question_group): bool
    {
        return $this->hasEntityCap(
            'ee_edit_question_group',
            'espresso_registration_form_edit_question_group',
            $question_group->ID()
        );
    }


    public function userCanTrashQuestionGroups(): bool
    {
        return $this->hasGlobalCap(
            'ee_delete_question_groups',
            'espresso_registration_form_trash_question_groups'
        );
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function userCanTrashQuestionGroup(EE_Question_Group $question_group): bool
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
     */
    public function userCanRestoreQuestionGroup(EE_Question_Group $question_group): bool
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
     */
    public function userCanDeleteQuestionGroup(EE_Question_Group $question_group): bool
    {
        return $this->hasEntityCap(
            'ee_delete_question_group',
            'espresso_registration_form_delete_question_group',
            $question_group->ID()
        );
    }
}
