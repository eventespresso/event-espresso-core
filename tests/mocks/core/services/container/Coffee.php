<?php
namespace EventEspresso\tests\mocks\core\services\container;

if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * Class Coffee
 *
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 *
 */
class Coffee
{

    /**
     * @var BeanInterface $beans
     */
    private $beans;



    /**
     * Coffee constructor.
     *
     * @param BeanInterface $beans
     */
    public function __construct(BeanInterface $beans)
    {
        $this->beans = $beans;
    }



    /**
     * @return string
     */
    public function getBeans()
    {
        return $this->beans;
    }

}
// End of file Coffee.php
// Location: /Coffee.php