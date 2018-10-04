<table class="form-table">
    <tr>
        <td valign="top" class="use-ven-manager">
            <fieldset id="venue-manager">
                <legend><?php echo __('Venue Information', 'event_espresso') ?></legend>
                <?php echo $no_venues_info; ?>
                <p><a href="admin.php?page=espresso_venues">
                        <?php echo __(
                            'Add venues to the Venue Manager',
                            'event_espresso'
                        ) ?></a></p>
            </fieldset>
        </td>
    </tr>
</table>