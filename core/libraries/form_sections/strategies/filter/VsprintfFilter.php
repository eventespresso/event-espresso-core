<?php
namespace EventEspresso\core\libraries\form_sections\strategies\filter;

use EE_Form_Section_Proper;
use EE_Form_Section_Validatable;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Parses a form section's rendered HTML using vsprintf()
 * PLZ NOTE:
 *      the rendered HTML for the full form will be the FIRST argument
 *      appended to the array of args passed to vsprintf(),
 *      and the rendered HTML for each form subsection
 *      will be appended to the array of args passed after that
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class VsprintfFilter extends FormHtmlFilter
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
     * @param EE_Form_Section_Validatable $form_section
     * @return string
     */
    public function filterHtml($html, EE_Form_Section_Validatable $form_section)
    {
        $this->args[] = $html;
        if ($form_section instanceof EE_Form_Section_Proper) {
            $subsections = $form_section->subsections();
            foreach ((array)$subsections as $subsection) {
                $this->args[] = $subsection->get_html();
            }
        }
        return vsprintf($this->format, $this->args);
    }



}
// End of file VsprintfFormHtmlParser.php
// Location: EventEspresso\core\libraries\form_sections\strategies\filter\VsprintfFormHtmlParser.php