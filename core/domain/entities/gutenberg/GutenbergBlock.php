<?php

namespace EventEspresso\core\domain\entities\gutenberg;


use EventEspresso\core\services\loaders\LoaderInterface;
use WP_Block_Type;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class GutenbergBlock
 * Registers a Gutenberg block type with WordPress core,
 * specifies all assets required for the block,
 * and executes all logic as necessary
 * ALL blocks should be located in
 *  \core\domain\entities\gutenberg\blocks\
 * under the appropriate namespace root
 *
 * @package EventEspresso\core\services\gutenberg
 * @author  Brent Christensen
 * @since   $VID:$
 */
abstract class GutenbergBlock implements GutenbergBlockInterface
{

    /**
     * @var WP_Block_Type $block_type
     */
    protected $block_type;

    /**
     * @var LoaderInterface $loader
     */
    protected $loader;


    /**
     * GutenbergBlockLoader constructor.
     *
     * @param LoaderInterface $loader
     */
    public function __construct(LoaderInterface $loader)
    {
        $this->loader = $loader;
    }
}
