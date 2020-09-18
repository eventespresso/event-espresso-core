<?php

namespace EventEspresso\core\services\json;


/**
 * Class JsonDataNode
 * A Root level Data Node for a specific domain (use case) that it provides data for.
 * There can only be one primary data node per request, so care has to be taken to ensure that
 * multiple Route objects are not attempting to set a primary data node - THERE CAN ONLY BE ONE !!!
 *
 * @package EventEspresso\core\services\json
 * @author  Brent Christensen
 * @since   $VID:$
 */
abstract class PrimaryJsonDataNode extends JsonDataNode
{
}
