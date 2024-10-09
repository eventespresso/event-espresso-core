<?php

/**
 * Template for content to be displayed in an iframe.
 * Following template arguments are available:
 *
 * @var boolean $enqueue_wp_assets    whether to call wp_head()
 * @var string  $title                HTML for notices and ajax gif
 * @var string  $notices              HTML for notices and ajax gif
 * @var string  $content              HTML for the content being displayed
 * @var array   $inline_styles        array of CSS styles to be printed inline before/after another CSS file
 * @var array   $css                  an array of CSS URLs.
 * @var string  $eei18n               localized JSON vars
 * @var array   $header_js            an array of JS URLs.
 * @var array   $header_js_attributes an array of extra attributes for header JS
 * @var array   $footer_js            an array of JS URLs.
 * @var array   $footer_js_attributes an array of extra attributes for footer JS.
 * @since   4.9.0
 * @package Event Espresso
 */


use EventEspresso\core\services\request\sanitizers\AllowedTags;
use EventEspresso\core\services\request\sanitizers\AttributesSanitizer;

?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <title><?php echo wp_strip_all_tags($title); ?></title>
    <meta name="robots" content="noindex,nofollow">
    <?php if ($enqueue_wp_assets) : ?>
        <?php wp_head(); ?>
    <?php else : ?>
        <?php foreach ($css as $handle => $url) : ?>
            <?php if (isset($inline_styles["{$handle}_before"])) :?>
                <style>
                    <?php echo wp_kses($inline_styles["{$handle}_before"], AllowedTags::getWithFullTags()); ?>
                </style>
            <?php endif; ?>
            <link rel="stylesheet" type="text/css" id="<?php esc_attr_e($handle); ?>" href="<?php echo esc_url_raw($url); ?>">
            <?php if (isset($inline_styles["{$handle}_after"])) :?>
                <style>
                    <?php echo wp_kses($inline_styles["{$handle}_after"], AllowedTags::getWithFullTags()); ?>
                </style>
            <?php endif; ?>
        <?php endforeach; ?>
        <script type="text/javascript">
            <?php echo $eei18n; ?>
        </script>
        <?php foreach ($header_js as $key => $url) :?>
            <?php $header_attributes = $header_js_attributes[ $key ] ?? ''; ?>
            <script type="text/javascript" src="<?php echo esc_url_raw($url); ?>" <?php echo AttributesSanitizer::clean($header_attributes, AllowedTags::getAllowedTags(), 'script'); ?>></script>
        <?php endforeach; ?>
    <?php endif; ?>
</head>
<body>
    <?php echo wp_kses($notices, AllowedTags::getWithFormTags()); ?>
    <div style="padding: 1em;">
        <?php echo wp_kses($content, AllowedTags::getWithFullTags()); ?>
    </div>
    <?php foreach ($footer_js as $key => $url) : ?>
        <?php $footer_attributes = $footer_js_attributes[ $key ] ?? ''; ?>
        <script type="text/javascript" src="<?php echo esc_url_raw($url); ?>" <?php echo AttributesSanitizer::clean($footer_attributes, AllowedTags::getAllowedTags(), 'script'); ?>></script>
    <?php endforeach; ?>
    <?php if ($enqueue_wp_assets) : ?>
        <?php wp_footer(); ?>
    <?php endif; ?>
</body>
</html>
