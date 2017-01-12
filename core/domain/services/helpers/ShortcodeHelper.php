<?php
namespace EventEspresso\core\domain\services\helpers;

use EE_Error;
use EE_Registry;
use EES_Shortcode;
use ReflectionClass;
use WP;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class Shortcodes
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class ShortcodeHelper
{

    /**
     * @type  EE_Registry $registry
     * @access    protected
     */
    protected $registry;



    /**
     * Shortcodes constructor.
     *
     * @param EE_Registry $registry
     */
    public function __construct(EE_Registry $registry)
    {
        $this->registry = $registry;
    }



    /**
     * get classname, remove EES_prefix, and convert to UPPERCASE
     *
     * @param string $class_name
     * @return string
     */
    public static function generateShortcodeTagFromClassName($class_name)
    {
        return strtoupper(str_replace('EES_', '', $class_name));
    }



    /**
     * add EES_prefix and Capitalize words
     *
     * @param string $tag
     * @return string
     */
    public static function generateShortcodeClassNameFromTag($tag)
    {
        // order of operation runs from inside to out
        // 5) maybe add prefix
        return ShortcodeHelper::addShortcodeClassPrefix(
            // 4) find spaces, replace with underscores
            str_replace(
                ' ',
                '_',
                // 3) capitalize first letter of each word
                ucwords(
                    // 2) also change to lowercase so ucwords() will work
                    strtolower(
                        // 1) find underscores, replace with spaces so ucwords() will work
                        str_replace(
                            '_',
                            ' ',
                            $tag
                        )
                    )
                )
            )
        );
    }



    /**
     * maybe add EES_prefix
     *
     * @param string $class_name
     * @return string
     */
    public static function addShortcodeClassPrefix($class_name)
    {
        return strpos($class_name, 'EES_') === 0 ? $class_name : 'EES_' . $class_name;
    }



    /**
     * @return array
     */
    public function getEspressoShortcodeTags()
    {
        static $shortcode_tags = array();
        if (empty($shortcode_tags)) {
            $shortcode_tags = array_keys((array)$this->registry->shortcodes);
        }
        return $shortcode_tags;
    }



    /**
     * @param string $content
     * @return string
     */
    public function doShortcode($content)
    {
        foreach ($this->getEspressoShortcodeTags() as $shortcode_tag) {
            if (strpos($content, $shortcode_tag) !== false) {
                $shortcode_class = ShortcodeHelper::generateShortcodeClassNameFromTag($shortcode_tag);
                $this->initializeShortcode($shortcode_class);
            }
        }
        return do_shortcode($content);
    }



    /**
     * given a shortcode name, will instantiate the shortcode and call it's run() method
     *
     * @param string $shortcode_class
     * @param WP    $wp
     */
    public function initializeShortcode($shortcode_class = '', WP $wp = null)
    {
        // don't do anything if shortcode is already initialized
        if ($this->registry->shortcodes->{$shortcode_class} instanceof EES_Shortcode){
            return;
        }
        // let's pause to reflect on this...
        $sc_reflector = new ReflectionClass(ShortcodeHelper::addShortcodeClassPrefix($shortcode_class));
        // ensure that class is actually a shortcode
        if (
            defined('WP_DEBUG')
            && WP_DEBUG === true
            && ! $sc_reflector->isSubclassOf('EES_Shortcode')
        ) {
            EE_Error::add_error(
                sprintf(
                    __(
                        'The requested %s shortcode is not of the class "EES_Shortcode". Please check your files.',
                        'event_espresso'
                    ),
                    $shortcode_class
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            add_filter('FHEE_run_EE_the_content', '__return_true');
            return;
        }
        global $wp;
        // and pass the request object to the run method
        $this->registry->shortcodes->{$shortcode_class} = $sc_reflector->newInstance();
        // fire the shortcode class's run method, so that it can activate resources
        $this->registry->shortcodes->{$shortcode_class}->run($wp);
    }

}
// End of file Shortcodes.php
// Location: EventEspresso\core\domain\services\helpers/Shortcodes.php