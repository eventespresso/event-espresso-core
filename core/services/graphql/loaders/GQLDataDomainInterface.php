<?php

namespace EventEspresso\core\services\graphql\loaders;

use WPGraphQL\AppContext;

/**
 * Class EspressoEditor
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\data\domains
 * @author  Brent Christensen
 * @since   5.0.0.p
 */
interface GQLDataDomainInterface
{
    /**
     * @param array      $loaders The loaders accessible in the AppContext
     * @param AppContext $context The AppContext
     * @return array
     * @return array
     * @since 5.0.0.p
     */
    public function registerLoaders(array $loaders, AppContext $context): array;
}
