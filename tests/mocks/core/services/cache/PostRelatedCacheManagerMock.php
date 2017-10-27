<?php

namespace EventEspresso\tests\mocks\core\services\cache;

use EventEspresso\core\services\cache\PostRelatedCacheManager;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class PostRelatedCacheManagerMock
 * Description
 *
 * @package EventEspresso\tests\mocks\core\services\cache
 * @author  Brent Christensen
 * @since   $VID:$
 */
class PostRelatedCacheManagerMock extends PostRelatedCacheManager
{

    /**
     * @return array
     */
    public function getPostRelatedCache()
    {
        return parent::getPostRelatedCache();
    }


    /**
     * @param array $post_related_cache
     */
    public function updatePostRelatedCache(array $post_related_cache = array())
    {
        parent::updatePostRelatedCache($post_related_cache);
    }

}
// Location: PostRelatedCacheManagerMock.php
