<?php

namespace EventEspresso\core\domain\entities\admin\menu;

class AdminMenuTopLevel extends AdminMenuItem
{
    /**
     * The page to a icon used for this menu.
     *
     * @since  4.4.0
     * @see    http://codex.wordpress.org/Function_Reference/add_menu_page#Parameters
     *        for what can be set for this property.
     * @var string
     */
    protected $icon_url = '';

    /**
     * What position in the main menu order for the WP admin menu this menu item
     * should show.
     *
     * @since  4.4.0
     * @see    http://codex.wordpress.org/Function_Reference/add_menu_page#Parameters
     *        for what can be set for this property.
     * @var integer
     */
    protected $position = 0;

    /**
     * If included int incoming params, then this class will also register a Sub Menu Admin page with a different
     * subtitle than the main menu item.
     *
     * @since 4.4.0
     * @var string
     */
    protected $subtitle = '';


    public function __construct(array $menu_args)
    {
        $this->setIconUrl(isset($menu_args['icon_url']) ? $menu_args['icon_url'] : '');
        $this->setPosition(isset($menu_args['position']) ? $menu_args['position'] : 0);
        $this->setSubtitle(isset($menu_args['subtitle']) ? $menu_args['subtitle'] : '');
        unset($menu_args['icon_url'], $menu_args['position'], $menu_args['subtitle']);
        parent::__construct(
            $menu_args,
            // required args
            [
                'menu_label',
                'menu_slug',
                'menu_group',
                'menu_order',
            ]
        );
    }


    /**
     * Uses the proper WP utility for registering a menu page for the main WP pages.
     * @return string
     */
    protected function registerMenuItem()
    {
        return add_menu_page(
            $this->title(),
            $this->menuLabel(),
            $this->capability(),
            $this->parentSlug(),
            $this->menuCallback(),
            $this->iconUrl(),
            $this->position()
        );
    }


    /**
     * @return string
     */
    public function iconUrl()
    {
        return $this->icon_url;
    }


    /**
     * @param string $icon_url
     * @return void
     */
    public function setIconUrl($icon_url)
    {
        $this->icon_url = $icon_url;
    }


    /**
     * @return int
     */
    public function position()
    {
        return $this->position;
    }


    /**
     * @param int $position
     * @return void
     */
    public function setPosition($position)
    {
        $this->position = absint($position);
    }


    /**
     * @return string
     */
    public function subtitle()
    {
        return $this->subtitle;
    }


    /**
     * @param string $subtitle
     * @return void
     */
    public function setSubtitle($subtitle)
    {
        $this->subtitle = $subtitle;
    }
}
