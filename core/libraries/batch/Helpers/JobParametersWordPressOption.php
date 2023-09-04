<?php

namespace EventEspresso\core\libraries\batch\Helpers;

use EventEspresso\core\services\database\WordPressOption;

class JobParametersWordPressOption extends WordPressOption
{
    public function __construct($option_name)
    {
        parent::__construct($option_name, [], false);
    }
}
