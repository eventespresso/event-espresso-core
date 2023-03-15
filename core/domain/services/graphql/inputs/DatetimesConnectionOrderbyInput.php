<?php

namespace EventEspresso\core\domain\services\graphql\inputs;

use EventEspresso\core\services\graphql\fields\GraphQLFieldInterface;
use EventEspresso\core\services\graphql\inputs\InputBase;
use EventEspresso\core\services\graphql\fields\GraphQLField;

/**
 * Class DatetimesConnectionOrderbyInput
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\inputs
 * @author  Manzoor Wani
 * @since   5.0.0.p
 */
class DatetimesConnectionOrderbyInput extends InputBase
{
    /**
     * DatetimesConnectionOrderbyInput constructor.
     */
    public function __construct()
    {
        $this->setName($this->namespace . 'DatetimesConnectionOrderbyInput');
        $this->setDescription(esc_html__('Options for ordering the connection', 'event_espresso'));
        parent::__construct();
    }


    /**
     * @return GraphQLFieldInterface[]
     */
    protected function getFields(): array
    {
        return [
            new GraphQLField(
                'field',
                ['non_null' => $this->namespace . 'DatetimesConnectionOrderbyEnum']
            ),
            new GraphQLField(
                'order',
                'OrderEnum'
            ),
        ];
    }
}
