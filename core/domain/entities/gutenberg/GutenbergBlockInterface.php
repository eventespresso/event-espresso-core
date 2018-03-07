<?php

namespace EventEspresso\core\domain\entities\gutenberg;

use WP_Block_Type;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Interface GutenbergBlockInterface
 * Classes implementing this interface are responsible for
 * Registering a Gutenberg block type with WordPress core,
 * specifying all assets required for the block,
 * and executing all logic as necessary
 * ALL blocks should be located in
 *  \core\domain\entities\gutenberg\blocks\
 * under the appropriate namespace root
 *
 * @package EventEspresso\core\services\gutenberg
 * @author  Brent Christensen
 * @since   $VID:$
 */
interface GutenbergBlockInterface
{

    /**
     * Perform any early setup required by the block
     *
     * @return void
     */
    public function initialize();


    /**
     * @return WP_Block_Type|false The registered block type on success, or false on failure.
     */
    public function registerBlock();


    /**
     * @return WP_Block_Type|false The registered block type on success, or false on failure.
     */
    public function unRegisterBlock();


    /**
     * @return  void
     */
    public function registerScripts();


    /**
     * @return void
     */
    public function registerStyles();
}
