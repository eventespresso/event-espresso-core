<?php

namespace EventEspresso\core\domain\entities\routing\handlers\admin;

use EE_Dependency_Map;
use EventEspresso\core\domain\entities\routing\data_nodes\domains\GutenbergEditorData;

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
     */
    public function matchesCurrentRequest(): bool
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
               )
               && apply_filters('FHEE__EE_System__canLoadBlocks', true);
    }


    /**
     * @return void
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
    }


    /**
     * @return string
     */
    protected function dataNodeClass(): string
    {
        return GutenbergEditorData::class;
    }


    /**
     * implements logic required to run during request
     *
     * @return bool
     */
    protected function requestHandler(): bool
    {
        $this->asset_manager = $this->loader->getShared(
            'EventEspresso\core\domain\entities\editor\CoreBlocksAssetManager'
        );
        add_action('admin_enqueue_scripts', [$this->asset_manager, 'enqueueBrowserAssets'], 100);
        return true;
    }
}
