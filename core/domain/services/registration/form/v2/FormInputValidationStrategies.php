<?php

namespace EventEspresso\core\domain\services\registration\form\v2;

use EE_Error;
use EE_Form_Element;
use EE_Full_HTML_Validation_Strategy;
use EE_Max_Length_Validation_Strategy;
use EE_Min_Length_Validation_Strategy;
use EE_Simple_HTML_Validation_Strategy;
use EE_URL_Validation_Strategy;
use EventEspresso\core\services\form\meta\inputs\Input;
use EventEspresso\core\services\form\meta\inputs\Text;
use EventEspresso\core\services\loaders\LoaderFactory;
use ReflectionException;

class FormInputValidationStrategies
{
    /**
     * @var FieldLengthCalculator
     */
    public $field_length_calculator;


    /**
     * FormInputFactory constructor.
     *
     * @param FieldLengthCalculator $field_length_calculator
     */
    public function __construct(FieldLengthCalculator $field_length_calculator)
    {
        $this->field_length_calculator = $field_length_calculator;
    }


    /**
     * @param EE_Form_Element $form_input
     * @param array           $input_args
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function applyValidationStrategies(EE_Form_Element $form_input, array $input_args): array
    {
        if ($form_input->getAttribute('max') !== EE_INF || $form_input->mapsTo()) {
            $max_field_length = $this->field_length_calculator->getMaxFieldLengthForInput($form_input);
            if ($max_field_length !== EE_INF) {
                $input_args['validation_strategies'][] = new EE_Max_Length_Validation_Strategy(
                    null,
                    $max_field_length
                );
            }
        }
        if ($form_input->getAttribute('min') > 0 || $form_input->mapsTo()) {
            $min_field_length = $this->field_length_calculator->getMinFieldLengthForInput($form_input);
            if ($min_field_length !== EE_INF) {
                $input_args['validation_strategies'][] = new EE_Min_Length_Validation_Strategy(
                    null,
                    $min_field_length
                );
            }
        }

        if ($form_input->type() === Text::TYPE_TEXTAREA) {
            $input_args['validation_strategies'][] = new EE_Simple_HTML_Validation_Strategy();
        }

        if ($form_input->type() === Text::TYPE_TEXTAREA_HTML) {
            $input_args['validation_strategies'][] = new EE_Full_HTML_Validation_Strategy();
        }

        if ($form_input->type() === Input::TYPE_URL) {
            $input_args['validation_strategies'][] = LoaderFactory::getNew(EE_URL_Validation_Strategy::class);
        }
        return $input_args;
    }
}
