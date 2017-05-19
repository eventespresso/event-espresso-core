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
     */
    public function fillOutFirstNameFieldForAttendee($value, $attendee_number = 1)
    {
        $this->actor()->fillField(CheckoutPage::firstNameFieldSelectorForAttendeeNumber($attendee_number), $value);
    }

    /**
     * @param     $value
     * @param int $attendee_number
     */
    public function fillOutLastNameFieldForAttendee($value, $attendee_number = 1)
    {
        $this->actor()->fillField(CheckoutPage::lastNameFieldSelectorForAttendeeNumber($attendee_number), $value);
    }

    /**
     * @param     $value
     * @param int $attendee_number
     */
    public function fillOutEmailFieldForAttendee($value, $attendee_number = 1)
    {
        $this->actor()->fillField(CheckoutPage::emailFieldSelectorForAttendeeNumber($attendee_number), $value);
    }


    /**
     * Clicks the next registration step button.
     */
    public function goToNextRegistrationStep()
    {
        $this->actor()->click(CheckoutPage::NEXT_STEP_BUTTON_SELECTOR);
    }
}