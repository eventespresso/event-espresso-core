<?php

namespace EventEspresso\core\domain\services\registration\form\v1;

use EE_Answer;
use EE_Error;
use EE_Question;
use EE_Registration;
use EE_State;
use EEM_State;
use ReflectionException;

class StateOptions
{
    /**
     * the action being performed on the current step
     *
     * @var string
     */
    public $action = '';

    /**
     * @var EEM_State
     */
    public $state_model;

    /**
     * @var [][]
     */
    private $state_options = [];


    /**
     * CountryOptions constructor.
     *
     * @param string    $action
     * @param EEM_State $state_model
     */
    public function __construct(string $action, EEM_State $state_model)
    {
        $this->action      = $action;
        $this->state_model = $state_model;
        add_filter(
            'FHEE__EE_Question__generate_form_input__state_options',
            [$this, 'forLegacyFormInput'],
            10,
            4
        );
    }


    /**
     * Gets the list of states for the form input
     *
     * @param array|null           $states_list deprecated prop from an old hook
     * @param EE_Question|null     $question
     * @param EE_Registration|null $registration
     * @param EE_Answer|null       $answer
     * @return array 2d keys are state IDs, values are their names
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function forLegacyFormInput(
        array $states_list = null,
        EE_Question $question = null,
        EE_Registration $registration = null,
        EE_Answer $answer = null
    ): array {
        if (! isset($this->state_options[ $this->action ])) {
            $this->generateLegacyStateOptions($question, $registration, $answer);
        }
        return $this->state_options[ $this->action ];
    }


    /**
     * @param EE_Question|null     $question
     * @param EE_Registration|null $registration
     * @param EE_Answer|null       $answer
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function generateLegacyStateOptions(
        EE_Question $question = null,
        EE_Registration $registration = null,
        EE_Answer $answer = null
    ) {
        $state_options = ['' => ['' => '']];
        $states        = $this->action === 'process_reg_step'
            ? $this->state_model->get_all_states()
            : $this->state_model->get_all_active_states();
        if (! empty($states)) {
            foreach ($states as $state) {
                if ($state instanceof EE_State) {
                    $state_options[ $state->country()->name() ][ $state->ID() ] = $state->name();
                }
            }
        }
        $this->state_options[ $this->action ] = apply_filters(
            'FHEE__EventEspresso_core_domain_services_registration_form_v1_StateOptions__generateLegacyStateOptions__state_options',
            $state_options,
            $registration,
            $question,
            $answer,
            $this
        );
    }
}
