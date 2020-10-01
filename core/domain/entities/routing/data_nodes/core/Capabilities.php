<?php

namespace EventEspresso\core\domain\entities\routing\data_nodes\core;

use EventEspresso\core\services\json\JsonDataNode;
use EventEspresso\core\services\json\JsonDataNodeValidator;

class Capabilities extends JsonDataNode
{
    const NODE_NAME = 'capabilities';

    /**
     * @param JsonDataNodeValidator $validator
     */
    public function __construct(JsonDataNodeValidator $validator)
    {
        parent::__construct($validator);
        $this->setNodeName(Capabilities::NODE_NAME);
    }

	/**
	 * @inheritDoc
	 */
	public function initialize()
	{
        $current_user = wp_get_current_user();
        $capabilities = [];
        $role_capabilities = $current_user->get_role_caps();
        foreach ($role_capabilities as $capability => $you_can_do_it) {
            if ($you_can_do_it) {
                $capabilities[] = $capability;
            }
        }
        $this->setDataArray($capabilities);
	}
}