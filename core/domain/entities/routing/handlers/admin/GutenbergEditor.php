<?php

namespace EventEspresso\core\domain\entities\routing\handlers\admin;

use EE_Dependency_Map;
use EventEspresso\core\domain\entities\editor\CoreBlocksAssetManager;
use EventEspresso\core\domain\entities\routing\data_nodes\domains\EventEditor;
use EventEspresso\core\domain\entities\routing\data_nodes\EventEspressoData;
use EventEspresso\core\domain\services\assets\EspressoCoreAppAssetManager;

/**
 * Class GutenbergEditor
 * detects and executes logic for the WP Gutenberg Editor
 *
 * @package EventEspresso\core\domain\entities\routing\admin
 * @author  Brent Christensen
 * @since   $VID:$
 */
class GutenbergEditor extends AdminRoute
{

    /**
     * returns true if the current request matches this route
     *
     * @return bool
     * @since   $VID:$
     */
    public function matchesCurrentRequest()
    {
        global $pagenow;
        return parent::matchesCurrentRequest()
               && $pagenow
               && (
                   $pagenow === 'post-new.php'
                   || (
                       $pagenow === 'post.php'
                       && $this->request->getRequestParam('action') === 'edit'
                   )
               );
    }


    /**
     * @since $VID:$
     */
    protected function registerDependencies()
    {
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\entities\routing\data_nodes\domains\GutenbergEditorData',
            [
                'EventEspresso\core\services\json\JsonDataNodeValidator' => EE_Dependency_Map::load_from_cache,
            ]
        );
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\entities\editor\CoreBlocksAssetManager',
            [
                'EventEspresso\core\domain\Domain'                   => EE_Dependency_Map::load_from_cache,
                'EventEspresso\core\services\assets\AssetCollection' => EE_Dependency_Map::load_new_object,
                'EventEspresso\core\services\assets\Registry'        => EE_Dependency_Map::load_from_cache,
            ]
        );
        /** @var EventEspressoData $primary_data_node */
        $primary_data_node = $this->loader->getShared(
            'EventEspresso\core\domain\entities\routing\data_nodes\EventEspressoData'
        );
        $primary_data_node->setTargetScript(CoreBlocksAssetManager::JS_HANDLE_CORE_BLOCKS);
        /** @var EventEditor $data_node */
        $data_node = $this->loader->getShared(
            'EventEspresso\core\domain\entities\routing\data_nodes\domains\GutenbergEditorData'
        );
        $this->setDataNode($data_node);
    }


    /**
     * implements logic required to run during request
     *
     * @return bool
     * @since   $VID:$
     */
    protected function requestHandler()
    {
        $this->asset_manager = $this->loader->getShared(
            'EventEspresso\core\domain\entities\editor\CoreBlocksAssetManager'
        );
        add_action('admin_enqueue_scripts', [$this->asset_manager, 'enqueueBrowserAssets'], 100);
        return true;
    }
}
