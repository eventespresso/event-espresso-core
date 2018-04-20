<?php

namespace EventEspresso\core\domain\entities\editor\blocks;

use EventEspresso\core\domain\DomainInterface;
use EventEspresso\core\services\assets\Registry;
use EventEspresso\core\services\editor\BlockAssetRegister;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class CoreBlocksAssetRegister
 * Register Editor Block Assets for Event Espresso Core
 *
 * @package EventEspresso\core\domain\entities\editor\blocks
 * @author  Brent Christensen
 * @since   $VID:$
 */
class CoreBlocksAssetRegister extends BlockAssetRegister
{
    /**
     * CoreBlocksAssetRegister constructor.
     *
     * @param DomainInterface $domain
     * @param Registry        $registry
     */
    public function __construct(DomainInterface $domain, Registry $registry) {
        parent::__construct(
            'core-blocks',
            array(),
            'core-blocks',
            array(),
            $domain,
            $registry
        );
    }
}