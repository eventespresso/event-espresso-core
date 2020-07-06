<?php

namespace EventEspresso\core\domain\entities\routing\data_nodes\core;

use EventEspresso\core\services\json\JsonDataNode;
use EventEspresso\core\services\json\JsonDataNodeValidator;
use WP_User;
use GraphQLRelay\Relay;

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

        $this->addData('id', Relay::toGlobalId('user', $current_user->ID));
        $this->addData('databaseId', $current_user->ID);
        $this->addData('description', $current_user->description);
        $this->addData('email', $current_user->user_email);
        $this->addData('firstName', $current_user->first_name);
        $this->addData('lastName', $current_user->last_name);
        $this->addData('locale', get_user_locale($current_user->ID));
        $this->addData('name', $current_user->display_name);
        $this->addData('nicename', $current_user->user_nicename);
        $this->addData('nickname', $current_user->nickname);
        $this->addData('username', $current_user->user_login);
        $this->addData('__typename', 'User');
        $this->setInitialized(true);
    }
}
