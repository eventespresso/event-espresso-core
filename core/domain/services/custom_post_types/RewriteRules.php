<?php

namespace EventEspresso\core\domain\services\custom_post_types;

/**
 * Class RewriteRules
 * Manages the flushing of rewrite rules
 *
 * @package EventEspresso\core\domain\services\custom_post_types
 * @author  Brent Christensen
 * @since   4.9.62.p
 */
class RewriteRules
{

    const OPTION_KEY_FLUSH_REWRITE_RULES = 'ee_flush_rewrite_rules';


    /**
     * This will flush rewrite rules on demand.  This actually gets called around wp init priority level 100.
     *
     * @return void
     */
    public function flush()
    {
        update_option(RewriteRules::OPTION_KEY_FLUSH_REWRITE_RULES, true);
    }


    /**
     * This will flush rewrite rules on demand.  This actually gets called around wp init priority level 100.
     *
     * @return void
     */
    public function flushRewriteRules()
    {
        if (get_option(RewriteRules::OPTION_KEY_FLUSH_REWRITE_RULES, true)) {
            flush_rewrite_rules();
            update_option(RewriteRules::OPTION_KEY_FLUSH_REWRITE_RULES, false);
        }
    }
}
