<?php

/**
 * @deprecated 4.9.13
 * @var string $download_link
 */

?>

<div class="print_button_div">
    <form>
        <input class="print_button noPrint"
               onclick="window.print();return false;"
               type="button"
               value="<?php esc_html_e('Print', 'event_espresso'); ?>"
        />
    </form>
    <form method="post" action="<?php echo esc_url_raw($download_link) ?>">
        <input class="print_button noPrint" type="submit" value="<?php esc_html_e('Download PDF', 'event_espresso'); ?>"/>
    </form>
    <div class="clear"></div>
</div>

</body>
</html>