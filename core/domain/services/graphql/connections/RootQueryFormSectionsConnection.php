<?php

namespace EventEspresso\core\domain\services\graphql\connections;

use EEM_Form_Section;
use EventEspresso\core\domain\services\graphql\connection_resolvers\AbstractConnectionResolver;
use EventEspresso\core\domain\services\graphql\connection_resolvers\FormSectionConnectionResolver;
use EventEspresso\core\domain\services\graphql\abstracts\AbstractRootQueryConnection;
use Exception;

/**
 * Class RootQueryFormSectionsConnection
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\connections
 * @author  Manzoor Wani
 * @since   $VID:$
 */
class RootQueryFormSectionsConnection extends AbstractRootQueryConnection
{


    /**
     * FormSectionConnection constructor.
     *
     * @param EEM_Form_Section               $model
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
            'fromType'           => 'RootQuery',
            'toType'             => $this->namespace . 'FormSection',
            'fromFieldName'      => lcfirst($this->namespace) . 'FormSections',
            'connectionTypeName' => "{$this->namespace}RootQueryFormSectionsConnection",
            'resolve'            => [$this, 'resolveConnection'],
        ];
    }


    /**
     * @param $entity
     * @param $args
     * @param $context
     * @param $info
     * @return FormSectionConnectionResolver
     * @throws Exception
     */
    public function getConnectionResolver($entity, $args, $context, $info): AbstractConnectionResolver
    {
        return new FormSectionConnectionResolver($entity, $args, $context, $info);
    }
}
