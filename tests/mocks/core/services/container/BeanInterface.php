<?php
namespace EventEspresso\tests\mocks\core\services\container;

if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}

/**
 * Interface BeanInterface
 *
 * @package EventEspresso\tests\mocks\core\services\container
 */
interface BeanInterface
{
    /**
     * @return string
     */
    public function type();
}
// End of file BeanInterface.php
// Location: /BeanInterface.php