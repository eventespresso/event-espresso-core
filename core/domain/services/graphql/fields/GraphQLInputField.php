<?php

namespace EventEspresso\core\domain\services\graphql\fields;

use EventEspresso\core\domain\services\graphql\fields\GraphQLField;
use GraphQL\Type\Definition\ResolveInfo;
use LogicException;
use WPGraphQL\AppContext;

/**
 * Class GraphQLInputField
 *
 * @package       Event Espresso
 * @author        Manzoor Wani
 */
class GraphQLInputField extends GraphQLField
{

    /**
	 * @param string          $name
	 * @param string|string[] $type
     * @param string|null     $key
     * @param string          $description
     * @param array           $caps
     */
    public function __construct(
		$name,
        $type,
        $key = null,
        $description = '',
        array $caps = []
    ) {
        parent::__construct(
            $name,
            $type,
            $key,
            $description,
            null,
            null,
            $caps
        );

        $this->setUseForOutput(false);
    }
}
