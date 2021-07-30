<?php

/**
 * @deprecated 4.9.13
 */

?>

<div class="print_button_div">
    <form>
        <input class="print_button noPrint" type="button" value="<?php esc_html_e('Print', 'event_espresso'); ?>"
               onclick="window.print();return false;"/>
    </form>
    <form method="post" action="<?php echo $download_link ?>">
        <input class="print_button noPrint" type="submit" value="<?php esc_html_e('Download PDF', 'event_espresso'); ?>"/>
    </form>
    <div class="clear"></div>
</div>

</body>
</html>