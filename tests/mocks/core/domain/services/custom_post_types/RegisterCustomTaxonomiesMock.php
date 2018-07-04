<?php

namespace EventEspresso\tests\mocks\core\domain\services\custom_post_types;

use EventEspresso\core\domain\entities\custom_post_types\CustomTaxonomyDefinitions;
use EventEspresso\core\domain\services\custom_post_types\RegisterCustomTaxonomies;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class RegisterCustomTaxonomiesMock
 *
 * @package EventEspresso\tests\mocks\core\domain\services\custom_post_types
 * @author  Brent Christensen
 * @since   4.9.62.p
 */
class RegisterCustomTaxonomiesMock extends RegisterCustomTaxonomies
{
    public function prepareArguments($singular_name, $plural_name, array $override_arguments)
    {
        return parent::prepareArguments(
            $singular_name,
            $plural_name,
            $override_arguments
        );
    }
}