<?php

namespace EventEspresso\core\domain\entities\routing\handlers\admin;

use EE_Dependency_Map;

/**
 * Class EspressoEventsAdmin
 * detects and executes logic for any Event Espresso Events admin page
 *
 * @package EventEspresso\core\domain\entities\routing\admin
 * @author  Brent Christensen
 * @since   $VID:$
 */
class EspressoEventsAdmin extends AdminRoute
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
               && $pagenow === 'admin.php'
               && $this->request->getRequestParam('page') === 'espresso_events';
    }


    /**
     * @since $VID:$
     */
    protected function registerDependencies()
    {
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\admin\events\default_settings\AdvancedEditorAdminFormSection',
            ['EE_Admin_Config' => EE_Dependency_Map::load_from_cache]
        );
    }
}
