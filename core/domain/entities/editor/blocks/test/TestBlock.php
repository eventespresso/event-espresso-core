<?php

namespace EventEspresso\core\domain\entities\editor\blocks\test;

use EventEspresso\core\domain\entities\editor\Block;
use EventEspresso\core\domain\entities\editor\blocks\CoreBlocksAssetManager;
use EventEspresso\core\domain\entities\shortcodes\EspressoEvents;

/**
 * Class TestBlock
 * Description
 *
 * @package EventEspresso\core\domain\entities\editor\blocks
 * @author  Brent Christensen
 * @since   $VID:$
 */
class TestBlock extends Block
{

    const BLOCK_TYPE = 'test-block';


    /**
     * EventsList constructor.
     *
     * @param CoreBlocksAssetManager $block_asset_manager
     */
    public function __construct(CoreBlocksAssetManager $block_asset_manager)
    {
        parent::__construct($block_asset_manager);
    }


    /**
     * Perform any early setup required by the block
     * including setting the block type and supported post types
     *
     * @return void
     */
    public function initialize()
    {
        $this->setBlockType(self::BLOCK_TYPE);
        $this->setSupportedPostTypes(array('post', 'page'));
        $this->setAttributes(array());
        $this->setDynamic();
    }


    /**
     * returns the rendered HTML for the block
     *
     * @param array $attributes
     * @return string
     * @throws \EE_Error
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     * @throws \InvalidArgumentException
     */
    public function renderBlock(array $attributes = array())
    {
        return '<h2>' . __METHOD__ . '()</h2>' . var_export($attributes, true);
    }
}