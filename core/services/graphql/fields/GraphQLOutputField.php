<?php

namespace EventEspresso\core\services\graphql\fields;

/**
 * Class GraphQLOutputField
 *
 * @package       Event Espresso
 * @author        Manzoor Wani
 */
class GraphQLOutputField extends GraphQLField
{

    /**
	 * @param string          $name
	 * @param string|string[] $type
     * @param string|null     $key
     * @param string          $description
     * @param callable|null   $formatter
     * @param callable|null   $resolver
     * @param array           $caps
     */
    public function __construct(
		$name,
        $type,
        $key = null,
        $description = '',
        callable $formatter = null,
        callable $resolver = null,
        array $caps = []
    ) {
        parent::__construct(
            $name,
            $type,
            $key,
            $description,
            $formatter,
            $resolver,
            $caps
        );

        $this->setUseForInput(false);
    }
}
