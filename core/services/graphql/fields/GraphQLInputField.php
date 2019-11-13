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
