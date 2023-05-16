<?php

namespace EventEspresso\core\domain\services\admin;

use EventEspresso\core\services\database\WordPressOption;
use EventEspresso\core\services\loaders\LoaderFactory;

class AdminFontSize extends WordPressOption
{
    private const OPTION_NAME      = 'ee-admin-font-size';

    public const FONT_SIZE_TINY    = 1;

    public const FONT_SIZE_SMALLER = 2;

    public const FONT_SIZE_SMALL   = 3;

    public const FONT_SIZE_DEFAULT = 4;

    public const FONT_SIZE_BIG     = 5;

    public const FONT_SIZE_BIGGER  = 6;

    private array $css_classes = [
        AdminFontSize::FONT_SIZE_TINY    => 'espresso-admin-font-size-tiny',
        AdminFontSize::FONT_SIZE_SMALLER => 'espresso-admin-font-size-smaller',
        AdminFontSize::FONT_SIZE_SMALL   => 'espresso-admin-font-size-small',
        AdminFontSize::FONT_SIZE_DEFAULT => 'espresso-admin-font-size-default',
        AdminFontSize::FONT_SIZE_BIG     => 'espresso-admin-font-size-big',
        AdminFontSize::FONT_SIZE_BIGGER  => 'espresso-admin-font-size-bigger',
    ];


    /**
     * SessionLifespanOption constructor.
     */
    public function __construct()
    {
        parent::__construct(
            AdminFontSize::OPTION_NAME . '-' . get_current_user_id(),
            AdminFontSize::FONT_SIZE_DEFAULT,
            true
        );
    }


    /**
     * @return false|mixed|void
     */
    public function getAdminFontSize()
    {
        return $this->loadOption();
    }


    public static function setAdminFontSizeBodyClass()
    {
        add_filter('admin_body_class', [AdminFontSize::class, 'adminFontSizeBodyClass'], 99);
    }


    public static function adminFontSizeBodyClass($classes): string
    {
        /** @var AdminFontSize $AFS */
        $AFS       = LoaderFactory::getShared(AdminFontSize::class);
        $font_size = $AFS->getAdminFontSize();
        $font_size_class = $AFS->css_classes[ $font_size ] ?? $AFS->css_classes[ AdminFontSize::FONT_SIZE_DEFAULT ];
        if (strpos($classes, $font_size_class) === false) {
            $classes .= " $font_size_class";
        }
        return $classes;
    }


    public static function setAdminFontSize(int $font_size): int
    {
        /** @var AdminFontSize $AFS */
        $AFS       = LoaderFactory::getShared(AdminFontSize::class);
        $font_size = max($font_size, AdminFontSize::FONT_SIZE_TINY);
        $font_size = min($font_size, AdminFontSize::FONT_SIZE_BIGGER);
        return $AFS->updateOption($font_size);
    }
}
