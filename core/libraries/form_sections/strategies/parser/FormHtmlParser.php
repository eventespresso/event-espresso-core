<?php
namespace EventEspresso\core\libraries\form_sections\strategies\parser;

use EE_Form_Section_Proper;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class FormHtmlParser
 * abstract class for parsing a form section's rendered HTML
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
abstract class FormHtmlParser
{

    /**
     * @param                        $html
     * @param EE_Form_Section_Proper $form_section
     * @return string
     */
    abstract public function parseHtml($html, EE_Form_Section_Proper $form_section);

}
// End of file FormHtmlParser.php
// Location: EventEspresso\core\libraries\form_sections\strategies\parser/FormHtmlParser.php