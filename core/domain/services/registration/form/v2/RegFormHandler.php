<?php

namespace EventEspresso\core\domain\services\registration\form\v2;

use EE_Checkout;
use EE_Error;
use EE_Form_Section_Proper;
use EE_Form_Submission;
use EE_Registration;
use EE_Registration_Processor;
use EE_Transaction;
use EEM_Form_Submission;
use EventEspresso\core\domain\entities\contexts\Context;
use EventEspresso\core\domain\services\registration\form\base\RegFormHandler as RegFormHandlerBase;
use EventEspresso\core\domain\services\registration\form\base\RegFormAttendeeFactory;
use EventEspresso\core\domain\services\registration\form\base\RegistrantData;
use EventEspresso\core\exceptions\EntityNotFoundException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;
use InvalidArgumentException;
use ReflectionException;
use RuntimeException;

class RegFormHandler extends RegFormHandlerBase
{

    /**
     * @var RegFormInputHandler
     */
    public $input_handler;

    /**
     * @var EE_Form_Submission
     */
    private $form_submission;


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


    // /**
    //  * @return EE_Form_Submission
    //  * @throws EE_Error
    //  * @throws ReflectionException
    //  */
    // public function getFormSubmission(): EE_Form_Submission
    // {
    //     if (! $this->form_submission instanceof EE_Form_Submission) {
    //         $form_submission = EEM_Form_Submission::instance()->getFormSubmissionForTransaction(
    //             $this->checkout->transaction
    //         );
    //         if (! $form_submission instanceof EE_Form_Submission) {
    //             $TXN_ID = $this->checkout->transaction->ID();
    //             $form_submission = EE_Form_Submission::new_instance(
    //                 [
    //                     'FSB_UUID' => md5(uniqid($TXN_ID . time(), true)),
    //                     'FSC_UUID' => md5(uniqid($TXN_ID . time(), true)),
    //                     'FSB_data' => $this->checkout->current_step->valid_data(),
    //                     'TXN_ID'   => $TXN_ID,
    //                 ]
    //             );
    //             $form_submission->save();
    //         }
    //         $this->setFormSubmission($form_submission);
    //     }
    //     \EEH_Debug_Tools::printr(__FUNCTION__, __CLASS__, __FILE__, __LINE__, 2);
    //     \EEH_Debug_Tools::printr($this->form_submission->data(), '$this->form_submission->data()', __FILE__, __LINE__);
    //     return $this->form_submission;
    // }


    /**
     * @param EE_Form_Submission $form_submission
     */
    public function setFormSubmission(EE_Form_Submission $form_submission): void
    {
        $this->form_submission = $form_submission;
    }


    public function initializeInputHandler()
    {
        \EEH_Debug_Tools::printr(__FUNCTION__, __CLASS__, __FILE__, __LINE__, 2);
        $reg_form            = $this->checkout->current_step->reg_form;
        $required_questions  = $reg_form instanceof RegForm ? $reg_form->requiredQuestions() : [];
        $this->input_handler = LoaderFactory::getShared(
            'EventEspresso\core\domain\services\registration\form\v2\RegFormInputHandler',
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
        \EEH_Debug_Tools::printr(__FUNCTION__, __CLASS__, __FILE__, __LINE__, 2);
        \EEH_Debug_Tools::printr($reg_form_data, '$reg_form_data', __FILE__, __LINE__);
        \EEH_Debug_Tools::printr($this->form_submission->data(), '$this->form_submission->data()', __FILE__, __LINE__);
        if (isset($reg_form_data[ $reg_url_link ])) {
            // do we need to copy basic info from primary attendee ?
            $copy_primary = isset($reg_form_data[ $reg_url_link ]['additional_attendee_reg_info'])
                            && absint($reg_form_data[ $reg_url_link ]['additional_attendee_reg_info']) === 0;
            $this->registrant_data->setCopyPrimary($copy_primary);
            // filter form input data for this registration
            $reg_form_data[ $reg_url_link ] = (array) apply_filters(
                'FHEE__EE_Single_Page_Checkout__process_attendee_information__valid_data_line_item',
                $reg_form_data[ $reg_url_link ]
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
                        echo "\n############### ! input_processed #########################\n";
                        return false;
                    }
                }
            }
        }
        return true;
    }


    // /**
    //  * @param EE_Registration $registration
    //  * @return void
    //  * @throws EE_Error
    //  * @throws InvalidArgumentException
    //  * @throws ReflectionException
    //  * @throws InvalidDataTypeException
    //  * @throws InvalidInterfaceException
    //  */
    // private function associateRegistrationWithTransaction(EE_Registration $registration)
    // {
    //     // add relation to registration
    //     $this->checkout->transaction->_add_relation_to($registration, 'Registration');
    //     $this->checkout->transaction->update_cache_after_object_save('Registration', $registration);
    // }
}
