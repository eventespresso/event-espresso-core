<?php

namespace EventEspresso\core\services\graphql\inputs;

use EventEspresso\core\services\graphql\fields\GraphQLFieldInterface;

/**
 * Class InputBase
 * Description
 *
 * @package EventEspresso\core\services\graphql
 * @author  Manzoor Wani
 * @since   5.0.0.p
 */
interface InputInterface
{
    /**
     * @return string
     */
    public function name();


    /**
     * @return string
     */
    public function description();


    /**
     * @return \EventEspresso\core\services\graphql\fields\GraphQLFieldInterface[]
     * @since 5.0.0.p
     */
    public function fields();
}
