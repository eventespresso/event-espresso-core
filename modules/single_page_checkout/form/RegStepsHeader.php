<?php

namespace EventEspresso\modules\single_page_checkout\form;

use EE_Checkout;
use EE_Form_Section_HTML;
use EE_SPCO_Reg_Step;
use EEH_HTML;

class RegStepsHeader extends EE_Form_Section_HTML
{
    private EE_Checkout $checkout;


    /**
     * @param EE_Checkout $checkout
     */
    public function __construct(EE_Checkout $checkout)
    {
        $this->checkout = $checkout;
        parent::__construct(
            EEH_HTML::h2(
                esc_html__('Steps', 'event_espresso'),
                'spco-steps-big-hdr',
                'spco-steps-big-hdr'
            )
            . EEH_HTML::div($this->regStepsHeader(), 'spco-steps-display-dv')
        );
    }


    private function regStepsHeader(): string
    {
        $reg_steps = '';
        $step_nmbr = 1;
        $total_steps = count($this->checkout->reg_steps) - 1;
        foreach ($this->checkout->reg_steps as $reg_step) {
            if ($reg_step instanceof EE_SPCO_Reg_Step && $reg_step->slug() !== 'finalize_registration') {
                $slug = esc_attr($reg_step->slug());
                $step_display_dv_class = $reg_step->is_current_step() ? 'active-step' : 'inactive-step';
                $reg_steps .= EEH_HTML::div(
                    EEH_HTML::h4(
                        EEH_HTML::span(
                            esc_html($step_nmbr),
                            '',
                            'spco-step-big-nmbr'
                        )
                        . EEH_HTML::nbsp()
                        . EEH_HTML::span(
                            str_replace('&nbsp;', '<br/>&nbsp;', $reg_step->name()),
                            '',
                            'spco-step-name'
                        ),
                        "spco-step-$slug-display-hdr",
                        'spco-steps-display-hdr'
                    ),
                    "spco-step-$slug-display-dv",
                    "spco-step-display-dv $step_display_dv_class steps-$total_steps",
                );

                if ($step_nmbr < $total_steps) {
                    $reg_steps .= EEH_HTML::div('&raquo;', '', 'spco-step-arrow-dv');
                }
                $step_nmbr++;
            }
        }
        return $reg_steps . EEH_HTML::div('', '', 'clear-float') . EEH_HTML::divx();
    }
}
