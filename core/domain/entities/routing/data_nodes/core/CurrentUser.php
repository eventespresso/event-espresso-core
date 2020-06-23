<?php

namespace EventEspresso\core\domain\entities\routing\data_nodes\core;

use EventEspresso\core\services\json\JsonDataNode;
use EventEspresso\core\services\json\JsonDataNodeValidator;
use WP_User;

/**
 * Class CurrentUser
 *
 * @package EventEspresso\core\domain\entities\routing\data_nodes
 * @author  Brent Christensen
 * @since   $VID:$
 */
class CurrentUser extends JsonDataNode
{

    const NODE_NAME = 'currentUser';


    /**
     * JsonDataNodeHandler constructor.
     *
     * @param JsonDataNodeValidator $validator
     */
    public function __construct(JsonDataNodeValidator $validator)
    {
        parent::__construct($validator);
        $this->setNodeName(CurrentUser::NODE_NAME);
    }

    /**
     * @inheritDoc
     */
    public function initialize()
    {
        $current_user = wp_get_current_user();
        if (! $current_user instanceof WP_User) {
            $current_user = new WP_User();
        }
        $this->addData('description', $current_user->description);
        $this->addData('email', $current_user->email);
        $this->addData('firstName', $current_user->firstName);
        $this->addData('name', $current_user->name);
        $this->addData('nicename', $current_user->nicename);
        $this->addData('nickname', $current_user->nickname);
        $this->addData('lastName', $current_user->lastName);
        $this->addData('locale', $current_user->locale);
        $this->addData('userId', $current_user->userId);
        $this->addData('username', $current_user->username);
        $this->addData('__typename', 'User');
        $this->setInitialized(true);
    }
}
