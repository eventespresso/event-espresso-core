<?php

namespace EventEspresso\core\services\graphql\connections;

use EE_Base;
use WPGraphQL\AppContext;
use GraphQL\Type\Definition\ResolveInfo;

/**
 * Interface ConnectionInterface
 * Description
 *
 * @package EventEspresso\core\services\graphql
 * @author  Brent Christensen
 * @since   5.0.0.p
 */
interface ConnectionInterface
{
    /**
     * @return array
     * @since 5.0.0.p
     */
    public function config();

    /**
     * @param EE_Base      $entity
     * @param array        $args
     * @param AppContext   $context
     * @param ResolveInfo  $info
     * @return array
     * @since 5.0.0.p
     */
    public function resolveConnection($entity, $args, $context, $info);
}
