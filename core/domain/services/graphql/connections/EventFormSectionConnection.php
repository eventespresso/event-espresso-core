<?php

namespace EventEspresso\core\domain\services\graphql\connections;

use EEM_Form_Section;
use EventEspresso\core\domain\services\graphql\connection_resolvers\FormSectionConnectionResolver;
use EventEspresso\core\services\graphql\connections\ConnectionBase;
use Exception;
use GraphQL\Deferred;

/**
 * Class EventVenuesConnection
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\connections
 * @author  Brent Christensen
 * @since   $VID:$
 */
class EventFormSectionConnection extends ConnectionBase
{
    /**
     * EventFormSectionConnection constructor.
     *
     * @param EEM_Form_Section $model
     */
    public function __construct(EEM_Form_Section $model)
    {
        parent::__construct($model);
    }


    /**
     * @return array
     */
    public function config(): array
    {
        return [
            'fromType'           => $this->namespace . 'Event',
            'toType'             => $this->namespace . 'FormSection',
            'fromFieldName'      => 'regFormUuid',
            'connectionTypeName' => "{$this->namespace}EventFormSectionConnection",
            'resolve'            => [$this, 'resolveConnection'],
        ];
    }


    /**
     * @param $entity
     * @param $args
     * @param $context
     * @param $info
     * @return array|Deferred|mixed
     * @throws Exception
     */
    public function resolveConnection($entity, $args, $context, $info)
    {
        $resolver = new FormSectionConnectionResolver($entity, $args, $context, $info);
        return $resolver->get_connection();
    }
}
