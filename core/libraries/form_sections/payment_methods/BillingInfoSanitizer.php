<?php

namespace EventEspresso\core\libraries\form_sections\payment_methods;

use EE_All_Sensitive_Data_Removal;
use EE_CCV_Sensitive_Data_Removal;
use EE_Credit_Card_Sensitive_Data_Removal;
use EE_Error;
use EE_Form_Input_Base;
use EE_Form_Section_Proper;
use EE_Hidden_Display_Strategy;
use EventEspresso\core\services\request\sanitizers\AllowedTags;

/**
 * BillingInfoSanitizer
 *
 * @package     Event Espresso
 * @subpackage  EventEspresso\core\services\payment_methods\gateways
 * @author      Brent Christensen
 * @since       5.0.22.p
 */
class BillingInfoSanitizer
{
    /**
     * @param EE_Form_Section_Proper $form_section
     * @param bool                   $found_cc_data
     * @return bool|mixed
     * @throws EE_Error
     */
    public static function displaySanitizedBillingInfo(EE_Form_Section_Proper $form_section, bool $found_cc_data = false)
    {
        foreach ($form_section->subsections() as $subsection) {
            if ($subsection instanceof EE_Form_Input_Base) {
                if (
                    $subsection->get_sensitive_data_removal_strategy() instanceof EE_All_Sensitive_Data_Removal
                    || $subsection->get_sensitive_data_removal_strategy() instanceof EE_CCV_Sensitive_Data_Removal
                    || $subsection->get_display_strategy() instanceof EE_Hidden_Display_Strategy
                ) {
                    continue;
                }
                if ($subsection->get_sensitive_data_removal_strategy() instanceof EE_Credit_Card_Sensitive_Data_Removal) {
                    $found_cc_data = true;
                }
                $subsection->add_html_label_class('admin-side-mbox-label-spn lt-grey-txt');
                echo wp_kses($subsection->get_html_for_label(), AllowedTags::getWithFormTags());
                echo "<span class='admin-side-mbox-value-spn'>";
                echo wp_kses($subsection->pretty_value(), AllowedTags::getWithFormTags());
                echo "</span>";
            } elseif ($subsection instanceof EE_Form_Section_Proper) {
                $found_cc_data = BillingInfoSanitizer::displaySanitizedBillingInfo($subsection, $found_cc_data);
            }
        }
        return $found_cc_data;
    }
}
