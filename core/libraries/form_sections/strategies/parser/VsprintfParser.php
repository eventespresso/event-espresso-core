<?php
namespace EventEspresso\core\libraries\form_sections\strategies\parser;

use EE_Form_Section_Proper;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class SprintfFormHtmlParser
 * parses a form section's rendered HTML using vsprintf()
 * PLZ NOTE: the rendered HTML will be the LAST argument in the array of args passed to vsprintf()
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class VsprintfParser extends FormHtmlParser
{

    /**
     * @var string $format
     */
    protected $format = '';


    /**
     * @var array $args
     */
    protected $args = array();



    /**
     * SprintfFormHtmlParser constructor.
     *
     * @param string $format
     * @param array  $args
     */
    public function __construct($format, array $args)
    {
        $this->format = $format;
        $this->args = $args;
    }



    /**
     * @param                        $html
     * @param EE_Form_Section_Proper $form_section
     * @return string
     */
    public function parseHtml($html, EE_Form_Section_Proper $form_section)
    {
        $this->args = array_merge($this->args, $form_section->subsections());
        return vprintf($this->format, $this->args);
    }



}
// End of file SprintfFormHtmlParser.php
// Location: EventEspresso\core\libraries\form_sections\strategies\parser/SprintfFormHtmlParser.php