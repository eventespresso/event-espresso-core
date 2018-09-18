/**
 * Constants describing the current "save state" for an entity.
 *
 * @type {{CLEAN: Symbol, NEW: Symbol, DIRTY: Symbol}}
 */
export const SAVE_STATE = {
	CLEAN: Symbol( 'Entity is persisted.' ),
	NEW: Symbol( 'Entity is new.' ),
	DIRTY: Symbol( 'Existing entity has changes and needs persisted.' ),
};

/**
 * Private properties used internally by the Base Entity Class
 * @type {{saveState: boolean}}
 */
export const PRIVATE_PROPERTIES = {
	SAVE_STATE: Symbol( 'baseEntityPrivatePropertiesSaveState' ),
};
