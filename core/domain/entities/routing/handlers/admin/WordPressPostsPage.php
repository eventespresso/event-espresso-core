<?php

namespace EventEspresso\core\domain\entities\routing\handlers\admin;

use EventEspresso\core\services\cache\PostRelatedCacheManager;

/**
 * Class WordPressPostsPage
 * detects and executes logic for the WordPress Posts admin page
 *
 * @package EventEspresso\core\domain\entities\routing\handlers\admin
 * @author  Brent Christensen
 * @since   5.0.21.p
 */
class WordPressPostsPage extends AdminRoute
{
    /**
     * returns true if the current request matches this route
     *
     * @return bool
     */
    public function matchesCurrentRequest(): bool
    {
        global $pagenow;
        return (
                ($pagenow === 'edit.php' || $pagenow === 'post.php' || $pagenow === 'post-new.php')
                && ($this->request->isAdmin() || $this->request->isAdminAjax())
            )
            // and because Posts are updated via the WordPress REST API
            || $this->request->isWordPressApi();
    }


    /**
     * implements logic required to run during request
     *
     * @return bool
     */
    protected function requestHandler(): bool
    {
        $this->loader->getShared(PostRelatedCacheManager::class);
        return true;
    }
}
