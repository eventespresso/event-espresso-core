<?php

namespace EventEspresso\core\services\admin;

/**
 * Interface AdminPageHeaderDecoratorInterface
 * uses Decorator pattern to apply changes to admin page header text
 *
 * @package EventEspresso\core\services\admin\list_table
 * @author  Brent Christensen
 * @since   $VID:$
 */
interface AdminPageHeaderDecoratorInterface
{

    /**
     * @param string $text
     * @return string
     * @since $VID:$
     */
    public function getHeaderText($text = '');
}