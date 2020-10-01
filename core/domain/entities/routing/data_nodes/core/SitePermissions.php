<?php

namespace EventEspresso\core\domain\entities\routing\data_nodes\core;

use EventEspresso\core\services\json\JsonDataNode;
use EventEspresso\core\services\json\JsonDataNodeValidator;

class SitePermissions extends JsonDataNode
{
    const NODE_NAME = 'sitePermissions';

    /**
     * @param JsonDataNodeValidator $validator
     */
    public function __construct(JsonDataNodeValidator $validator)
    {
        parent::__construct($validator);
        $this->setNodeName(SitePermissions::NODE_NAME);
    }

    /**
     * @inheritDoc
     */
    public function initialize()
    {
        $permissions = [];
        $all_permissions = [
            'use_bulk_edit' => true,
        ];
        foreach ($all_permissions as $permission => $you_can_do_it) {
            if ($you_can_do_it) {
                $permissions[] = $permission;
            }
        }
        $this->setDataArray($permissions);
    }
}