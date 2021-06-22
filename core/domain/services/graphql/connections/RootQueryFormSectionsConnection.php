<?php

namespace EventEspresso\core\domain\services\graphql\connections;

use EEM_Form_Section;
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
        $this->model = $model;
    }


    /**
     * @return array
     * @since $VID:$
     */
    public function config()
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
     * @since $VID:$
     */
    public function getConnectionResolver($entity, $args, $context, $info)
    {
        return new FormSectionConnectionResolver($entity, $args, $context, $info);
    }
}
