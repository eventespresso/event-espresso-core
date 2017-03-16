<?php
namespace EventEspresso\core\libraries\form_sections\strategies\filter;

use EE_Form_Section_Validatable;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class FormHtmlFilter
 * abstract class for parsing a form section's rendered HTML
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
abstract class FormHtmlFilter
{

    /**
     * @param                        $html
     * @param EE_Form_Section_Validatable $form_section
     * @return string
     */
    abstract public function filterHtml($html, EE_Form_Section_Validatable $form_section);

}
// End of file FormHtmlFilter.php
// Location: EventEspresso\core\libraries\form_sections\strategies\filter\FormHtmlFilter.php