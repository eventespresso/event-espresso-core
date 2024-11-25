<?php

namespace EventEspresso\modules\single_page_checkout\form;

use EE_Checkout;
use EE_Error;
use EE_Form_Section_HTML;
use EE_Form_Section_Proper;
use EE_No_Layout;
use EE_Registry;
use EE_SPCO_Reg_Step;
use EEH_HTML;

class SinglePageCheckoutForm extends EE_Form_Section_Proper
{
    private EE_Checkout $checkout;

    private bool $empty_cart;

    private array $subsections = [];


    public function __construct(EE_Checkout $checkout, bool $empty_cart)
    {
        $this->checkout   = $checkout;
        $this->empty_cart = $empty_cart;
        parent::__construct(
            [
                'name'            => 'single-page-checkout',
                'html_id'         => 'ee-single-page-checkout-dv',
                'layout_strategy' => new EE_No_Layout(),
                'subsections'     => $this->generateSubsections(),
            ]
        );
    }


    /**
     * @throws EE_Error
     */
    private function generateSubsections(): array
    {
        $this->subsections['spco-div-open'] = new EE_Form_Section_HTML(
            EEH_HTML::div('', 'ee-single-page-checkout-dv')
        );

        if ($this->empty_cart) {
            $this->subsections['empty-cart-notice'] = new EmptyCartNotice();
        } else {
            $this->addTimeLimitNotice();
            $this->addRegStepsHeader();
            $this->addRegStepHookPoint('AHEE__SPCO__before_registration_steps');
            $this->addRegistrationSteps();
            $this->addRegStepHookPoint('AHEE__SPCO__after_registration_steps');
        }

        $this->addRegStepHookPoint('AHEE__SPCO__reg_form_footer');

        $this->subsections['spco-div-close'] = new EE_Form_Section_HTML(
            EEH_HTML::divx('ee-single-page-checkout-dv')
        );

        return $this->subsections;
    }


    private function addTimeLimitNotice()
    {
        if (
            ! EE_Registry::instance()->CFG->registration->useSessionCountdown() ||
            ! apply_filters('FHEE__registration_page_wrapper_template__display_time_limit', false)
        ) {
            return;
        }

        $this->subsections['registration_time_limit'] = new EE_Form_Section_HTML(
            EEH_HTML::p(
                sprintf(
                    apply_filters(
                        'FHEE__registration_page_wrapper_template___time_limit',
                        esc_html__('You have %1$s to complete your registration.', 'event_espresso')
                    ),
                    EEH_HTML::span(
                        $this->checkout->get_registration_time_limit(),
                        'spco-registration-time-limit-spn',
                        'spco-registration-time-limit-spn'
                    )
                ),
                'spco-registration-time-limit-pg',
                'spco-steps-pg ee-attention important-notice',
                'display: none;'
            )
        );
    }

    private function addRegStepsHeader(): void
    {
        if (
            $this->checkout->revisit
            || ! apply_filters('FHEE__registration_page_wrapper_template__steps_display', true)
        ) {
            return;
        }
        $this->subsections['registration_steps_display'] = new RegStepsHeader($this->checkout);
    }


    private function addRegStepHookPoint(string $hook_name)
    {
        $key = str_replace('AHEE__SPCO__', '', $hook_name);
        $this->subsections[ $key ] = new EE_Form_Section_HTML($this->captureRegStepHookPoint($hook_name));
    }

    private function captureRegStepHookPoint()
    {
        $args = func_get_args();
        ob_start();
        do_action(...$args);
        return ob_get_clean();
    }


    /**
     * @throws EE_Error
     */
    private function addRegistrationSteps()
    {
        $reg_steps = '';
        foreach ($this->checkout->reg_steps as $reg_step) {
            if ($reg_step instanceof EE_SPCO_Reg_Step && $reg_step->slug() !== 'finalize_registration') {
                $slug = $reg_step->slug();
                $reg_steps .= $this->captureRegStepHookPoint("AHEE__{$slug}__reg_step_start", $reg_step);
                $reg_form_html = $reg_step->display_reg_form();
                $reg_steps .= EEH_HTML::div(
                    $reg_form_html
                    . $this->captureRegStepHookPoint(
                        'AHEE__SPCO_after_reg_step_form',
                        $slug,
                        $this->checkout->next_step->slug()
                    ),
                    'spco-' . esc_attr($slug) . '-dv',
                    "spco-step-dv " . esc_attr($reg_step->div_class())
                );
                if (empty($reg_form_html)) {
                    $reg_steps .= EEH_HTML::divx();
                }
            }
        }
        $this->subsections['registration_steps'] = new EE_Form_Section_HTML($reg_steps);
    }
}
