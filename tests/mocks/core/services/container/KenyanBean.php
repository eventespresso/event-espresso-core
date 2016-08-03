<?php
namespace EventEspresso\tests\mocks\core\services\container;

if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * Class KenyanBean
 *
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 *
 */
class KenyanBean implements BeanInterface
{
    /**
     * @return string
     */
    public function type()
    {
        return __CLASS__;
    }
}
// End of file KenyanBean.php
// Location: /KenyanBean.php