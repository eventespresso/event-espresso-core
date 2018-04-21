<?php

namespace EventEspresso\core\domain\entities\editor\blocks\widgets;

use EventEspresso\core\domain\DomainInterface;
use EventEspresso\core\domain\entities\editor\Block;
use EventEspresso\core\domain\entities\editor\blocks\CoreBlocksAssetRegister;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\services\assets\AssetRegisterInterface;
use EventEspresso\core\services\assets\Registry;
use EventEspresso\core\services\loaders\LoaderInterface;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class EventAttendees
 * Returns a list of people that have registered for the specified event
 *
 * @package EventEspresso\core\domain\entities\editor\blocks\common
 * @author  Brent Christensen
 * @since   $VID:$
 */
class EventAttendees extends Block
{

    const BLOCK_TYPE = 'widgets-event-attendees';


    /**
     * EventAttendees constructor.
     *
     * @param CoreBlocksAssetRegister $asset_register
     */
    public function __construct(CoreBlocksAssetRegister $asset_register) {
        parent::__construct($asset_register);
    }


    /**
     * Perform any early setup required by the block
     * including setting the block type and supported post types
     *
     * @return void
     */
    public function initialize()
    {
        $this->setBlockType(EventAttendees::BLOCK_TYPE);
        $this->setSupportedPostTypes(array('espresso_events', 'post', 'page'));
        $this->setAttributes(array());
    }
}
