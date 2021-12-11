<?php

namespace EventEspresso\core\domain\services\registration\form\v2;

use EE_Checkout;
use EE_Error;
use EE_Form_Submission;
use EE_Transaction;
use EEM_Form_Submission;
use EventEspresso\core\services\json\JsonDataAPI;
use EventEspresso\core\services\request\RequestInterface;
use ReflectionException;

class FormSubmissionHandler
{

    /**
     * @var EE_Form_Submission
     */
    private $form_submission;

    /**
     * @var EE_Checkout
     */
    private $checkout;


    /**
     * @param EE_Checkout $checkout
     */
    public function __construct(EE_Checkout $checkout)
    {
        $this->checkout = $checkout;

        add_action(
            'AHEE__EE_Form_Section_Proper__receive_form_submission__end',
            [$this]
        );
        /*
            $req_data,
            $this,
            $validate
        */
    }


    /**
     * @return JsonDataAPI
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function getFormDataAPI(): JsonDataAPI
    {
        $this->getFormSubmission();
        $form_data = $this->form_submission instanceof EE_Form_Submission ? $this->form_submission->data() : '{}';
        return new JsonDataAPI($form_data);
    }


    /**
     * @return EE_Form_Submission
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function getFormSubmission(): EE_Form_Submission
    {
        if (! $this->form_submission instanceof EE_Form_Submission) {
            $form_submission = $this->getFormSubmissionForTransaction($this->checkout->transaction);
            if ($form_submission instanceof EE_Form_Submission) {
                $this->setFormSubmission($form_submission);
            }
        }
        \EEH_Debug_Tools::printr(__FUNCTION__, __CLASS__, __FILE__, __LINE__, 2);
        \EEH_Debug_Tools::printr($this->form_submission->data(), '$this->form_submission->data()', __FILE__, __LINE__);
        return $this->form_submission;
    }


    /**
     * @param EE_Transaction $transaction
     * @return EE_Form_Submission|null
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function getFormSubmissionForTransaction(EE_Transaction $transaction): ?EE_Form_Submission
    {
        $form_submission = EEM_Form_Submission::instance()->getFormSubmissionForTransaction($transaction);
        return $form_submission instanceof EE_Form_Submission ? $form_submission : null;
        // if () {
        // }
        // return $this->generateFormSubmission($transaction);
    }


    /**
     * @return EE_Form_Submission
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function generateFormSubmission(): EE_Form_Submission
    {
        $TXN_ID = $this->checkout->transaction->ID();
        $form_data = $this->checkout->registration_form->valid_data();
        \EEH_Debug_Tools::printr(__FUNCTION__, __CLASS__, __FILE__, __LINE__, 2);
        \EEH_Debug_Tools::printr($TXN_ID, '$TXN_ID', __FILE__, __LINE__);
        \EEH_Debug_Tools::printr($form_data, 'form data', __FILE__, __LINE__);
        $form_submission = EE_Form_Submission::new_instance(
            [
                'FSB_UUID' => md5(uniqid($TXN_ID . time(), true)),
                'FSC_UUID' => md5(uniqid($TXN_ID . time(), true)),
                'FSB_data' => $form_data,
                'TXN_ID'   => $TXN_ID,
            ]
        );
        $form_submission->save();
        return $form_submission;
    }


    /**
     * @param EE_Form_Submission $form_submission
     */
    private function setFormSubmission(EE_Form_Submission $form_submission): void
    {
        $this->form_submission = $form_submission;
    }
}
