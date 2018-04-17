<?php

namespace EventEspresso\Codeception\helpers;

use Page\Checkout as CheckoutPage;


/**
 * Trait Checkout
 * Helper actions for the checkout process (SPCO).
 *
 * @package EventEspresso\Codeception\helpers
 */
trait Checkout
{
    /**
     * @param     $value
     * @param int $attendee_number
     * @param bool  $admin  Used to indicate whether we're filling out the field from the context of the admin or not.
     */
    public function fillOutFirstNameFieldForAttendee($value, $attendee_number = 1, $admin = false)
    {
        $this->actor()->fillField(CheckoutPage::firstNameFieldSelectorForAttendeeNumber($attendee_number, $admin), $value);
    }

    /**
     * @param     $value
     * @param int $attendee_number
     * @param bool  $admin  Used to indicate whether we're filling out the field from the context of the admin or not.
     */
    public function fillOutLastNameFieldForAttendee($value, $attendee_number = 1, $admin = false)
    {
        $this->actor()->fillField(CheckoutPage::lastNameFieldSelectorForAttendeeNumber($attendee_number, $admin), $value);
    }

    /**
     * @param     $value
     * @param int $attendee_number
     * @param bool  $admin  Used to indicate whether we're filling out the field from the context of the admin or not.
     */
    public function fillOutEmailFieldForAttendee($value, $attendee_number = 1, $admin = false)
    {
        $this->actor()->fillField(CheckoutPage::emailFieldSelectorForAttendeeNumber($attendee_number, $admin), $value);
    }


    /**
     * Clicks the next registration step button.
     */
    public function goToNextRegistrationStep()
    {
        $this->actor()->click(CheckoutPage::NEXT_STEP_BUTTON_SELECTOR);
    }


    /**
     * Selects the payment option for the given payment method slug.
     *
     * @param string $payment_method_slug
     * @param bool   $verify_selected      If true, this will wait for the "Important Information" info box after the
     *                                     payment option select box is complete.  Otherwise its up to calling code to
     *                                     wait for whatever is needed after selecting the payment method.
     */
    public function selectPaymentOptionFor($payment_method_slug = 'invoice', $verify_selected = true)
    {
        $this->waitForElementVisible(CheckoutPage::SELECTOR_PAYMENT_OPTIONS_CONTAINER);
        $this->wait(5);
        $this->actor()->selectOption(
            CheckoutPage::PAYMENT_METHOD_STEP_FORM,
            $payment_method_slug
        );
        if ($verify_selected) {
            $this->actor()->waitForText('Important information regarding your payment');
        }
    }


    /**
     * Submits the payment options step form.
     * Assumes the actor is in the context of the payment options SPCO step.
     */
    public function submitPaymentOptionsRegistrationStepForm()
    {
        $this->actor()->submitForm(CheckoutPage::PAYMENT_METHOD_STEP_FORM, array());
    }

}