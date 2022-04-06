<div id="evt-prc-overview-filters-dv">
    <ul class="subsubsub">
        <?php use EventEspresso\core\services\request\sanitizers\AllowedTags;

        foreach ($view_RLs as $view) : ?>
            <li class="">
                <a class="<?php echo sanitize_html_class($view['class']); ?>" href="<?php echo esc_url_raw($view['url']); ?>">
                    <?php echo esc_html($view['label']); ?> <span class="count">(<?php echo esc_html($view['count']); ?>)</span>
                </a>
            </li>
        <?php endforeach; ?>
    </ul>
    <!--<div class="clear"></div>-->
</div>

<form id="event-price-overview-frm" action="<?php echo esc_url_raw($evt_prc_overview_url); ?>" method="post">
    <?php // $list_table->search_box( $search['btn_label'], $search['callback'] ); ?>
    <input type="hidden" id="status" name="status" value="<?php echo esc_attr($status); ?>"/>
    <input type="hidden" id="per_page" name="per_page" value=""/>
    <?php echo wp_kses($list_table->display(), AllowedTags::getWithFormTags()); ?>
</form>

