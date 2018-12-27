<?php

namespace EventEspresso\core\libraries\form_sections\strategies\filter;

use EE_Form_Section_Validatable;

/**
 * Class FormHtmlFilter
 * abstract class for parsing a form section's rendered HTML
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 */
abstract class FormHtmlFilter
{

    /**
     * @param                             $html
     * @param EE_Form_Section_Validatable $form_section
     * @return string
     */
    abstract public function filterHtml($html, EE_Form_Section_Validatable $form_section);
}
