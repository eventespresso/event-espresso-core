<?php
namespace EventEspresso\core\libraries\form_sections\strategies\parser;

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

    abstract public function parseHtml($html);

}
// End of file FormHtmlParser.php
// Location: EventEspresso\core\libraries\form_sections\strategies\parser/FormHtmlParser.php