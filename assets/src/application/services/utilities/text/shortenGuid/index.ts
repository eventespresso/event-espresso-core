import { EntityId, EntityDbId } from '@appServices/apollo/types';

/**
 * converts a GUID like "RGF0ZXRpbWU6NQ==" into "WU6NQ=="
 */
const shortenGuid = (guid: EntityId | EntityDbId, start = 9, end = 16): string | EntityDbId => {
	if (typeof guid === 'string' && guid.length > start) {
		// use a smaller more unique portion of the CUID
		return guid.substring(start, end);
	}
	return guid;
};

export default shortenGuid;
