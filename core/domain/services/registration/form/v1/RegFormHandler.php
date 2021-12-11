<?php

namespace EventEspresso\core\domain\services\registration\form\v1;

use EE_Checkout;
use EE_Error;
use EE_Form_Section_Proper;
use EE_Registration;
use EE_Registration_Processor;
use EventEspresso\core\domain\services\registration\form\base\RegFormAttendeeFactory;
use EventEspresso\core\domain\services\registration\form\base\RegFormHandler as RegFormHandlerBase;
use EventEspresso\core\domain\services\registration\form\base\RegistrantData;
use EventEspresso\core\services\loaders\LoaderFactory;
use ReflectionException;

class RegFormHandler extends RegFormHandlerBase
{
    /**
     * @var RegFormInputHandler
     */
    public $input_handler;


    /**
     * RegFormHandler constructor.
     */
    public function __construct(
        EE_Checkout $checkout,
        RegistrantData $registrant_data,
        EE_Form_Section_Proper $reg_form,
        RegFormAttendeeFactory $attendee_factory,
        EE_Registration_Processor $registration_processor
    ) {
        parent::__construct($checkout, $registrant_data, $reg_form, $attendee_factory, $registration_processor);
    }


    /**
     * @return void
     */
    public function initializeInputHandler()
    {
        $reg_form            = $this->checkout->current_step->reg_form;
        $required_questions  = $reg_form instanceof RegForm ? $reg_form->requiredQuestions() : [];
        $this->input_handler = LoaderFactory::getShared(
            RegFormInputHandler::class,
            [$this->checkout->reg_url_link, $required_questions]
        );
    }


    /**
     * @param EE_Registration $registration
     * @param string          $reg_url_link
     * @param array           $reg_form_data
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function processRegFormData(
        EE_Registration $registration,
        string $reg_url_link,
        array $reg_form_data
    ): bool {
        if (isset($reg_form_data[ $reg_url_link ])) {
            // do we need to copy basic info from primary attendee ?
            $copy_primary = isset($reg_form_data[ $reg_url_link ]['additional_attendee_reg_info'])
                            && absint($reg_form_data[ $reg_url_link ]['additional_attendee_reg_info']) === 0;
            $this->registrant_data->setCopyPrimary($copy_primary);
            // filter form input data for this registration
            $reg_form_data[ $reg_url_link ] = (array) apply_filters(
                'FHEE__EventEspresso_core_domain_services_registration_form_v1_RegFormHandler__processRegFormData__registrant_form_data',
                $reg_form_data[ $reg_url_link ],
                $registration
            );
            if (isset($reg_form_data['primary_attendee'])) {
                $primary_reg_url_link = $reg_form_data['primary_attendee'] ?? '';
                $this->registrant_data->addPrimaryRegistrantDataValue('reg_url_link', $primary_reg_url_link);
                unset($reg_form_data['primary_attendee']);
            }
            // now loop through our array of valid post data && process attendee reg forms
            foreach ($reg_form_data[ $reg_url_link ] as $form_section => $form_inputs) {
                if (in_array($form_section, $this->non_input_form_sections, true)) {
                    continue;
                }
                foreach ($form_inputs as $form_input => $input_value) {
                    $input_processed = $this->input_handler->processFormInput(
                        $registration,
                        $reg_url_link,
                        $form_input,
                        $input_value
                    );
                    if (! $input_processed) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
}
