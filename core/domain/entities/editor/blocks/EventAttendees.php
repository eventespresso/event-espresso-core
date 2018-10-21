<?php

namespace EventEspresso\core\domain\entities\editor\blocks;

use DomainException;
use EE_Error;
use EEM_Registration;
use EventEspresso\core\domain\entities\editor\Block;
use EventEspresso\core\domain\entities\editor\CoreBlocksAssetManager;
use EventEspresso\core\domain\entities\shortcodes\EspressoEventAttendees;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\request\RequestInterface;
use InvalidArgumentException;

/**
 * Class EventAttendees
 * Returns a list of people that have registered for the specified event
 *
 * @package EventEspresso\core\domain\entities\editor\blocks\common
 * @author  Brent Christensen
 * @since   $VID:$
 */
class EventAttendees extends Block
{

    const BLOCK_TYPE = 'event-attendees';

    /**
     * @var EspressoEventAttendees $shortcode
     */
    protected $shortcode;


    /**
     * EventAttendees constructor.
     *
     * @param CoreBlocksAssetManager $block_asset_manager
     * @param RequestInterface       $request
     * @param EspressoEventAttendees $shortcode
     */
    public function __construct(
        CoreBlocksAssetManager $block_asset_manager,
        RequestInterface $request,
        EspressoEventAttendees $shortcode
    ) {
        parent::__construct($block_asset_manager, $request);
        $this->shortcode = $shortcode;
    }


    /**
     * Perform any early setup required by the block
     * including setting the block type and supported post types
     *
     * @return void
     */
    public function initialize()
    {
        $this->setBlockType(self::BLOCK_TYPE);
        $this->setSupportedRoutes(
            array(
                'EventEspresso\core\domain\entities\route_match\specifications\admin\EspressoStandardPostTypeEditor',
                'EventEspresso\core\domain\entities\route_match\specifications\admin\WordPressPostTypeEditor',
                'EventEspresso\core\domain\entities\route_match\specifications\frontend\EspressoBlockRenderer',
                'EventEspresso\core\domain\entities\route_match\specifications\frontend\AnyFrontendRequest'
            )
        );
        $EVT_ID = $this->request->getRequestParam('page') === 'espresso_events'
            ? $this->request->getRequestParam('post', 0)
            : 0;
        $this->setAttributes(
            array(
                'eventId'           => array(
                    'type'    => 'number',
                    'default' => $EVT_ID,
                ),
                'datetimeId'        => array(
                    'type'    => 'number',
                    'default' => 0,
                ),
                'ticketId'          => array(
                    'type'    => 'number',
                    'default' => 0,
                ),
                'status'            => array(
                    'type'    => 'string',
                    'default' => EEM_Registration::status_id_approved,
                ),
                'limit'             => array(
                    'type'    => 'number',
                    'default' => 10,
                ),
                'showGravatar'      => array(
                    'type'    => 'boolean',
                    'default' => false,
                ),
                'displayOnArchives' => array(
                    'type'    => 'boolean',
                    'default' => false,
                ),
            )
        );
        $this->setDynamic();
    }


    /**
     * returns an array where the key corresponds to the incoming attribute name from the WP block
     * and the value corresponds to the attribute name for the existing EspressoEventAttendees shortcode
     *
     * @since $VID:$
     * @return array
     */
    private function getAttributesMap()
    {
        return array(
            'eventId'           => array('attribute' => 'event_id', 'sanitize' => 'absint'),
            'datetimeId'        => array('attribute' => 'datetime_id', 'sanitize' => 'absint'),
            'ticketId'          => array('attribute' => 'ticket_id', 'sanitize' => 'absint'),
            'status'            => array('attribute' => 'status', 'sanitize' => 'sanitize_text_field'),
            'limit'             => array('attribute' => 'limit', 'sanitize' => 'intval'),
            'showGravatar'      => array('attribute' => 'show_gravatar', 'sanitize' => 'bool'),
            'displayOnArchives' => array('attribute' => 'display_on_archives', 'sanitize' => 'bool'),
        );
    }


    /**
     * @param array $attributes
     * @since $VID:$
     * @return array
     */
    private function parseAttributes(array $attributes)
    {
        foreach ($attributes as $attribute => $value) {
            $convert = $this->getAttributesMap();
            if (isset($convert[ $attribute ])) {
                $sanitize = $convert[ $attribute ]['sanitize'];
                $converted_attribute_key = $convert[ $attribute ]['attribute'];
                if ($sanitize === 'bool') {
                    $attributes[ $converted_attribute_key ] = filter_var(
                        $value,
                        FILTER_VALIDATE_BOOLEAN
                    );
                } else {
                    $attributes[ $converted_attribute_key ] = $sanitize($value);
                }
                if ($attribute !== $converted_attribute_key) {
                    unset($attributes[ $attribute ]);
                }
                // don't pass along attributes with a 0 value
                if ($attributes[ $converted_attribute_key ] === 0) {
                    unset($attributes[ $converted_attribute_key ]);
                }
            }
        }
        return $attributes;
    }


    /**
     * This ensures we're only sending along the needed attribute for grabbing attendees.
     * In order:
     *
     * - if ticket_id is present then datetime or event id are unneeded.
     * - if datetime_id is present than event_id is not needed.
     *
     * @param array $attributes
     * @return array
     */
    private function includeNecessaryOnly(array $attributes)
    {
        if ($attributes['ticket_id'] > 0) {
            unset($attributes['event_id'], $attributes['datetime_id']);
        }
        if ($attributes['datetime_id'] > 0) {
            unset($attributes['event_id']);
        }
        return $attributes;
    }


    /**
     * Returns true when there are no id values in the attributes.
     *
     * @param array $attributes
     * @return bool
     */
    private function hasNoIds(array $attributes)
    {
        return empty($attributes['event_id']) && empty($attributes['datetime_id']) && empty($attributes['ticket_id']);
    }

    /**
     * Returns the rendered HTML for the block
     *
     * @param array $attributes
     * @return string
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws DomainException
     */
    public function renderBlock(array $attributes = array())
    {
        $attributes = $this->includeNecessaryOnly($this->parseAttributes($attributes));
        $rendered_content = $this->shortcode->processShortcode($attributes);
        if (empty($rendered_content)) {
            return $this->noContentRender($attributes);
        }
        if ($this->hasNoIds($attributes) && $this->request->isWordPressApi()) {
            $rendered_content = '<p class="components-notice is-success">' . esc_html__(
                'The content displayed is for the most recent active or upcoming event.  You can display attendees from a different event, ticket or datetime via the block settings.',
                'event_espresso'
            ) . '</p>' . $rendered_content;
        }
        return $rendered_content;
    }


    /**
     * Returns rendered content for block when there is no content for rendering due to various conditions.
     * This content ONLY appears in the editor context.
     *
     * @param array $attributes
     * @return string
     */
    private function noContentRender(array $attributes)
    {
        $content = '';
        if ($this->request->isWordPressApi()) {
            if (empty($attributes['event_id'])) {
                $content .= esc_html__(
                    'There are no active or selected events to pull attendees from at this moment. This message only appears in the editor.',
                    'event_espresso'
                );
            } else {
                $content .= esc_html__(
                    'There was a problem displaying the content for the selected options. This message only appears in the editor.',
                    'event_espresso'
                );
            }
            $content = $content !== '' ? '<p class="components-notice is-error">' . $content . '</p>' : $content;
        }
        return $content;
    }
}
