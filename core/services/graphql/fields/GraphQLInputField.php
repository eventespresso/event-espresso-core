<?php

namespace EventEspresso\core\services\graphql\fields;

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
     * @param callable|null   $formatter
     * @param callable|null   $resolver
     * @param array           $caps
     * @param array           $args
     */
    public function __construct(
        string $name,
        $type,
        string $key = null,
        string $description = '',
        callable $formatter = null,
        callable $resolver = null,
        array $caps = [],
        array $args = []
    ) {
        parent::__construct(
            $name,
            $type,
            $key,
            $description,
            $formatter,
            $resolver,
            $caps,
            $args
        );

        $this->setUseForOutput(false);
    }
}
