<?php

namespace EventEspresso\core\services\admin;

/**
 * Interface AdminPageHeaderDecoratorInterface
 * uses Decorator pattern to apply changes to admin page header text
 *
 * @package EventEspresso\core\services\admin\list_table
 * @author  Brent Christensen
 * @since   4.10.2.p
 */
interface AdminPageHeaderDecoratorInterface
{

    /**
     * @param string $text
     * @return string
     * @since 4.10.2.p
     */
    public function getHeaderText($text = '');
}
