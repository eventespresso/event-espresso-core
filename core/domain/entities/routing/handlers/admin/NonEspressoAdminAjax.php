<?php

namespace EventEspresso\core\domain\entities\routing\handlers\admin;

use EventEspresso\core\domain\services\admin\events\editor\ui\DuplicateEventButton;
use EventEspresso\core\domain\services\admin\events\editor\ui\EventShortlinkButton;
use EventEspresso\core\domain\services\admin\events\editor\ui\PreviewButton;
use EventEspresso\core\domain\services\admin\events\editor\ui\TicketSelectorShortcodeButton;
use EventEspresso\core\services\routing\Route;

/**
 * Class NonEspressoAdminAjax
 * detects and executes logic for any non-EE initiated AJAX request
 *
 * @package EventEspresso\core\domain\entities\routing\admin
 * @author  Brent Christensen
 * @since   5.0.0.p
 */
class NonEspressoAdminAjax extends Route
{
    /**
     * returns true if the current request matches this route
     *
     * @return bool
     * @since   5.0.0.p
     */
    public function matchesCurrentRequest(): bool
    {
        return $this->request->isOtherAjax();
    }


    /**
     * @since 5.0.0.p
     */
    protected function registerDependencies()
    {
    }


    /**
     * implements logic required to run during request
     *
     * @return bool
     * @since   5.0.0.p
     */
    protected function requestHandler(): bool
    {
        $domain = $this->loader->getShared('EventEspresso\core\domain\Domain');
        if ($domain->isCaffeinated()) {
            // Add duplicate button
            add_filter(
                'get_sample_permalink_html',
                [DuplicateEventButton::class, 'addButton'],
                8,
                4
            );
        }
        // Add shortlink button
        add_filter(
            'get_sample_permalink_html',
            [EventShortlinkButton::class, 'addButton'],
            10,
            2
        );
        // Add ticket selector shortcode button
        add_filter(
            'get_sample_permalink_html',
            [TicketSelectorShortcodeButton::class, 'addButton'],
            12,
            4
        );
        // Add preview button
        add_filter(
            'get_sample_permalink_html',
            [PreviewButton::class, 'addButton'],
            5,
            2
        );
        return true;
    }
}
