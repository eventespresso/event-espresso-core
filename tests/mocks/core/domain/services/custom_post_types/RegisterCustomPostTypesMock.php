<?php

namespace EventEspresso\tests\mocks\core\domain\services\custom_post_types;

use EventEspresso\core\domain\services\custom_post_types\RegisterCustomPostTypes;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class RegisterCustomPostTypesMock
 * Description
 *
 * @package EventEspresso\tests\mocks\core\domain\services\custom_post_types
 * @author  Brent Christensen
 * @since   4.9.62.p
 */
class RegisterCustomPostTypesMock extends RegisterCustomPostTypes
{

    /**
     * @param string $post_type
     * @param string $singular_name
     * @param string $plural_name
     * @param string $singular_slug
     * @param string $plural_slug
     * @param array  $override_arguments
     * @since 4.9.62.p
     * @return array
     */
    public function prepareArguments(
        $post_type,
        $singular_name,
        $plural_name,
        $singular_slug,
        $plural_slug,
        array $override_arguments = array()
    ) {
        return parent::prepareArguments(
            $post_type,
            $singular_name,
            $plural_name,
            $singular_slug,
            $plural_slug,
            $override_arguments
        );
    }
}