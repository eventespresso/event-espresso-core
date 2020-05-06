import { EntityId } from '@dataServices/types';

/**
 * converts a GUID like "RGF0ZXRpbWU6NQ==" into "U6NQ=="
 */
const shortenGuid = <T extends EntityId>(guid: T): string => {
	// Return last 6 characters
	return guid.slice(-6);
};

export default shortenGuid;
