<?php

namespace EventEspresso\core\domain\entities\editor;

use WP_Block_Type;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Interface EditorBlockInterface
 * Classes implementing this interface are responsible for
 * Registering a Editor block type with WordPress core,
 * specifying all assets required for the block,
 * and executing all logic as necessary
 * ALL blocks should be located in
 *  \core\domain\entities\editor\blocks\
 * under the appropriate namespace root
 *
 * @package EventEspresso\core\services\editor
 * @author  Brent Christensen
 * @since   $VID:$
 */
interface EditorBlockInterface
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
