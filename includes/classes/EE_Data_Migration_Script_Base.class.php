<?php

/**
 * 
 */
abstract class EE_Data_Migration_Script_Base{
	/**
	 * string returned by EE_Data_Migration_Script_Base::migration_step() to indicate
	 * that the migration should continue
	 */
	const status_continue = 'status_continue';
	/**
	 * tring returned by EE_Data_Migration_Script_Base::migration_step() to indicate
	 * that the migration has completed and should be ended
	 */
	const status_completed = 'status_completed';
	/**
	 * tring returned by EE_Data_Migration_Script_Base::migration_step() to indicate
	 * that the migration had an ERROR and should exit early
	 */
	const status_error = 'status_error';
	
	
	/**
	 * Returns whether or not this data migration script can operate on the given version of the database.
	 * Eg, if this migration script can migrate from 3.1.26 or higher (but not anything after 4.0.0), and
	 * it's passed a string like '3.1.38B', it should return true
	 * @return boolean
	 */
	abstract public function  can_migrate_from_version($version_string);
	/**
	 * Performs database schema changes that need to occur BEFORE the data is migrated.
	 * Eg, if we were going to change user passwords from plaintext to encoded versions
	 * during this migration, this would probably add a new column called somethign like
	 * "encoded_password".
	 * @return boolean of success
	 */
	abstract public function schema_changes_before_migration();
	/**
	 * Performs the database schema changes that need to occur AFTER the data has been migrated.
	 * Usually this will mean we'll be removing old columns. Eg, if we were changing passwords
	 * from plaintext to encoded versions, and we had added a column called "encoded_password",
	 * this function would probably remove the old column "password" (which still holds the plaintext password)
	 * and possibly rename "encoded_password" to "password"
	 * @return boolean of success
	 */
	abstract public function schema_changes_after_migration();
	/**
	 * Counts all the records that will be migrated during this data migration.
	 * For example, if we were changing old user passwords from plaintext to encoded versions, 
	 * this would be a count of all users who have passwords. If we were going to also split
	 * attendee records into transactions, registrations, and attendee records, this would include
	 * the count of all attendees currently in existence in the DB (ie, users + attendees).
	 * If you can't determine how many records there are to migrate, just provide a guess: this
	 * number will only be used in calculating the percent complete. If you estimate there to be
	 * 100 records to migrate, and it turns out there's 120, we'll just show the migration as being at 
	 * 99% until the function "migration_step" returns EE_Data_Migration_Script_Base::status_complete.
	 * @return int
	 */
	abstract public function count_records_to_migrate();
	
	/**
	 * Is called repeatedly by the migration script manager to proceed witht he migration. 
	 * This function should keep track of its own progress (probaly using wp options it defines and then cleans up),
	 *  and only migrate the indicated  number of records at a time. 
	 * Should return an array, the first item being a status string, the 2nd item being a sting describing what happened
	 * The status should be EE_Data_Migration_Script_Base::status_complete when
	 * the migration is finished, EE_Data_Migration_Base::status_continue if it executed its function successfully
	 * but isn't done it's complete migration; and EE_Data_Migration_Base::status_error if there was an error.
	 * @return array, the first item in it being the status; the second being a string describing what happened
	 */
	abstract public function migration_step($num_records_to_migrate=50);
	
	
	protected function _add_error($error_code,$error_description){
		//get the option that stores data migrations and errors
		
		//add this as an error
		
		//save the option
	}
}