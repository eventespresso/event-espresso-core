<p><strong><?php _e('Importing CSV Event Espresso Data', 'event_espresso'); ?></strong></p>
<p>
<?php _e('The importer can be used to import event information into Event Espresso using a CSV file.', 'event_espresso'); ?>
</p>
<p><strong><?php _e("Importing from other Event Espresso 4 Sites", 'event_espresso');?></strong></p>
<p>
<?php _e('To import Event Espresso data from another Event Espresso 4 install, export a CSV file from the admin Events overview page, or anywhere you can generate a CSV export file from. Then upload that file here (regardless of what type of information was exported).', 'event_espresso'); ?>
</p>
<p>
<?php _e('Note: its possible that data from the other site have the same IDs as data in this site. The importer recognizes that this data is from a different database and inserts new items for each item in the CSV file, regardless of whether its ID matches that of an item in this site\'s database or not. However, the importer also remembers the mapping from the old site\'s database to this site\'s database, and on subsequent CSV importers from that site, the data in this database will be updated instead of re-inserting new items.', 'event_espresso'); ?>
</p>
<p><strong><?php _e("Importing from this Site", 'event_espresso');?></strong></p>
<p><?php _e("You may want to export data from this site, modify it (or modify the database), and re-import it. When this is done, the importer recognizes that the data is from this site\'s database and updates the records (instead of inserting new items like it would have, had the CSV data been from a different site).", 'event_espresso');?></p>

	<p><strong><?php _e("Notes about Generating your own CSV Import Files", "event_espresso");?></strong></p>
	<p><?php _e("If you think you could save time entering data into a CSV file, you can use the sample import file below. Note that creating your own CSV file is more complicated than in Event Espresso 3.1 because of the more advanced data structure, and so we recommend creating/editing your events using the normal web-interface.", "event_espresso");?></p>
	<p><?php _e("The export file is just an export of an event, or if you do not have any events in your system, it will only contain column headers. Do not change those column headers. Add as many rows as you like. ", "event_espresso");?></p>
	<p><?php _e("In the ID columns (columns ending in '_ID'), you should enter 'temporary IDs', which are unique numbers/words that identify that item, which can be used later when you want to refer to that item. (For example, if you assign an event's EVT_ID to be a temporary id of 'my-event-1', then use that same phrase 'my-event-1' to refer to that event in the Datetime model's EVT_ID column)", "event_espresso");?></p>
	<p><?php _e("Also note, you do NOT have to enter info in for each model. (You can, for example, only enter in Term_Taxonomies and Term model data)", "event_espresso");?></p>