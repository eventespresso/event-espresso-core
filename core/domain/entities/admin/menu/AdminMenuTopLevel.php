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
        $this->setIconUrl($menu_args['icon_url'] ?? '');
        $this->setPosition($menu_args['position'] ?? 0);
        $this->setSubtitle($menu_args['subtitle'] ?? '');
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
     */
    protected function registerMenuItem(): string
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
    public function iconUrl(): string
    {
        return $this->icon_url;
    }


    /**
     * @param string $icon_url
     */
    public function setIconUrl(string $icon_url): void
    {
        $this->icon_url = $icon_url;
    }


    /**
     * @return int
     */
    public function position(): int
    {
        return $this->position;
    }


    /**
     * @param int $position
     */
    public function setPosition(int $position): void
    {
        $this->position = absint($position);
    }


    /**
     * @return string
     */
    public function subtitle(): string
    {
        return $this->subtitle;
    }


    /**
     * @param string $subtitle
     */
    public function setSubtitle(string $subtitle): void
    {
        $this->subtitle = $subtitle;
    }
}
