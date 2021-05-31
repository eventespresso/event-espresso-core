<?php

namespace EventEspresso\core\domain\services\registration\form;

use EE_Answer;
use EE_Country;
use EE_Error;
use EE_Question;
use EE_Registration;
use EEM_Answer;
use EEM_Country;
use ReflectionException;

class CountryOptions
{
    /**
     * the action being performed on the current step
     *
     * @var string
     */
    public $action = '';

    /**
     * @var EEM_Answer
     */
    public $answer_model;

    /**
     * @var EEM_Country
     */
    public $country_model;

    /**
     * @var [][]
     */
    private $country_options = [];


    /**
     * CountryOptions constructor.
     *
     * @param string      $action
     * @param EEM_Answer  $answer_model
     * @param EEM_Country $country_model
     */
    public function __construct(string $action, EEM_Answer $answer_model, EEM_Country $country_model)
    {
        $this->action        = $action;
        $this->answer_model  = $answer_model;
        $this->country_model = $country_model;
        add_filter(
            'FHEE__EE_Question__generate_form_input__country_options',
            [$this, 'forLegacyFormInput'],
            10,
            4
        );
    }


    /**
     * Gets the list of countries for the form input
     *
     * @param array|null           $countries_list deprecated prop from an old hook
     * @param EE_Question|null     $question
     * @param EE_Registration|null $registration
     * @param EE_Answer|null       $answer deprecated prop from an old hook
     * @return array 2d keys are country IDs, values are their names
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function forLegacyFormInput(
        array $countries_list = null,
        EE_Question $question = null,
        EE_Registration $registration = null,
        EE_Answer $answer = null
    ): array {
        if (! isset($this->country_options[ $this->action ])) {
            $this->generateLegacyCountryOptions($question, $registration);
        }
        return $this->country_options[ $this->action ];
    }


    /**
     * @param EE_Question|null     $question
     * @param EE_Registration|null $registration
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function generateLegacyCountryOptions(EE_Question $question = null, EE_Registration $registration = null)
    {
        // get possibly cached list of countries
        $countries = $this->action === 'process_reg_step'
            ? $this->country_model->get_all_countries()
            : $this->country_model->get_all_active_countries();
        // start with an empty option
        $country_options = ['' => ''];
        if (! empty($countries)) {
            foreach ($countries as $country) {
                if ($country instanceof EE_Country) {
                    $country_options[ $country->ID() ] = $country->name();
                }
            }
        }
        if ($question instanceof EE_Question && $registration instanceof EE_Registration) {
            $answer = $this->answer_model->get_one(
                [['QST_ID' => $question->ID(), 'REG_ID' => $registration->ID()]]
            );
        } else {
            $answer = EE_Answer::new_instance();
        }
        $this->country_options[ $this->action ] = apply_filters(
            'FHEE__EE_SPCO_Reg_Step_Attendee_Information___generate_question_input__country_options',
            $country_options,
            $this,
            $registration,
            $question,
            $answer
        );
    }
}
