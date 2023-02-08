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
     * @param string $key
     * @param string          $description
     * @param callable|null   $formatter
     * @param callable|null   $resolver
     * @param array           $caps
     * @param array           $args
     */
    public function __construct(
        $name,
        $type,
        $key = null,
        $description = '',
        array $caps = []
    ) {
        $name = (string) $name;
        $description = (string) $description;
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
