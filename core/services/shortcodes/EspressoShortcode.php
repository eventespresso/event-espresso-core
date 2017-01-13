<?php
namespace EventEspresso\core\services\shortcodes;

use EE_Registry;
use EventEspresso\core\domain\EnqueueAssetsInterface;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class EspressoShortcode
 * base class for all EE shortcode classes
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
abstract class EspressoShortcode implements ShortcodeInterface
{

    /**
     * enqueues scripts then processes the shortcode
     *
     * @param array $attributes
     * @return string
     */
    final public function processShortcodeCallback($attributes = array())
    {
        if ($this instanceof EnqueueAssetsInterface) {
            if (is_admin()) {
                $this->enqueueAdminScripts();
            } else {
                $this->enqueueScripts();
            }
        }
        return $this->processShortcode($attributes);
    }

}
// End of file EspressoShortcode.php
// Location: EventEspresso\core\services\shortcodes/EspressoShortcode.php