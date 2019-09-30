<?php

namespace EventEspresso\core\domain\services\graphql\mutators;

/**
 * Class QueryMutator
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\mutators
 * @author  Brent Christensen
 * @since   $VID:$
 */
class QueryMutator
{

    /**
     * @var object $query_data
     */
    protected $query_data;

    /**
     * QueryMutator constructor.
     *
     * @param object $query_data
     */
    public function __construct($query_data)
    {
        $this->query_data = $query_data;
    }
}