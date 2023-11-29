<?php

namespace EventEspresso\core\domain\entities\routing\handlers\admin;

use EE_Dependency_Map;

/**
 * Class EspressoEventsAdmin
 * detects and executes logic for any Event Espresso Events admin page
 *
 * @package EventEspresso\core\domain\entities\routing\admin
 * @author  Brent Christensen
 * @since   5.0.0.p
 */
class EspressoEventsAdmin extends AdminRoute
{
    /**
     * returns true if the current request matches this route
     *
     * @return bool
     * @since   5.0.0.p
     */
    public function matchesCurrentRequest(): bool
    {
        global $pagenow;
        return parent::matchesCurrentRequest()
               && $pagenow
               && $pagenow === 'admin.php'
               && $this->request->getRequestParam('page') === 'espresso_events';
    }


    /**
     * @since 5.0.0.p
     */
    protected function registerDependencies()
    {
        $this->dependency_map->registerDependencies(
            'EventEspresso\core\domain\services\admin\events\default_settings\AdvancedEditorAdminFormSection',
            AdminRoute::getDefaultDependencies()
        );
    }
}
