import { renderHook, act } from '@testing-library/react-hooks';

import { useFormModalManager, EditorState } from '..';
import { ApolloMockedProvider } from '../../../../../domain/eventEditor/services/context/TestContext';

describe('useFormModalManager', () => {
	const modalId1: EditorState = {
		editorId: 'addDatetime',
		entityId: 'randomEntityId1',
		isOpen: true,
	};
	const modalId2: EditorState = {
		editorId: 'editTicket',
		entityId: 'randomEntityId2',
		isOpen: true,
	};
	const modalId3: EditorState = {
		editorId: 'ticketPriceCalculator',
		entityId: 'randomEntityId3',
		isOpen: true,
	};
	let currentlyOpenEditor: EditorState;
	const wrapper = ApolloMockedProvider();

	it('should have empty stack by default', () => {
		const { result } = renderHook(() => useFormModalManager(), { wrapper });
		currentlyOpenEditor = result.current.currentlyOpenEditor();
		expect(currentlyOpenEditor).toBeUndefined();
	});

	it('should stack multiple modals', () => {
		const { result } = renderHook(() => useFormModalManager(), { wrapper });
		const openEditor = result.current.openEditor;

		// Open first modal
		act(() => {
			openEditor(modalId1);
		});
		currentlyOpenEditor = result.current.currentlyOpenEditor();
		expect(currentlyOpenEditor).toEqual(modalId1);

		// Open second modal
		act(() => {
			openEditor(modalId2);
		});
		currentlyOpenEditor = result.current.currentlyOpenEditor();
		expect(currentlyOpenEditor).toEqual(modalId2);

		// Open third modal
		act(() => {
			openEditor(modalId3);
		});
		currentlyOpenEditor = result.current.currentlyOpenEditor();
		expect(currentlyOpenEditor).toEqual(modalId3);
	});
	it('should not do anything if we try to close other than last opened modal', () => {
		const { result } = renderHook(() => useFormModalManager(), { wrapper });
		const openEditor = result.current.openEditor;
		const closeEditor = result.current.closeEditor;

		// Open first modal
		act(() => {
			openEditor(modalId1);
			openEditor(modalId2);
			openEditor(modalId3);
		});
		act(() => {
			closeEditor(modalId2.editorId);
		});
		currentlyOpenEditor = result.current.currentlyOpenEditor();
		expect(currentlyOpenEditor).toEqual(modalId3);
		act(() => {
			closeEditor('editDatetime');
		});
		currentlyOpenEditor = result.current.currentlyOpenEditor();
		expect(currentlyOpenEditor).toEqual(modalId3);
	});

	it('should allow closing last opened modal', () => {
		const { result } = renderHook(() => useFormModalManager(), { wrapper });
		const openEditor = result.current.openEditor;
		const closeEditor = result.current.closeEditor;

		// Open first modal
		act(() => {
			openEditor(modalId1);
			openEditor(modalId2);
			openEditor(modalId3);
		});
		act(() => {
			closeEditor(modalId3.editorId);
		});
		currentlyOpenEditor = result.current.currentlyOpenEditor();
		expect(currentlyOpenEditor).toEqual(modalId2);

		act(() => {
			closeEditor(modalId2.editorId);
		});
		currentlyOpenEditor = result.current.currentlyOpenEditor();
		expect(currentlyOpenEditor).toEqual(modalId1);
	});

	it('should close the last modal', () => {
		const { result } = renderHook(() => useFormModalManager(), { wrapper });
		const openEditor = result.current.openEditor;
		const closeEditor = result.current.closeEditor;

		// Open first modal
		act(() => {
			openEditor(modalId1);
			openEditor(modalId2);
			openEditor(modalId3);
		});
		currentlyOpenEditor = result.current.currentlyOpenEditor();
		expect(currentlyOpenEditor).toEqual(modalId3);
		act(() => {
			closeEditor(modalId3.editorId);
			closeEditor(modalId2.editorId);
			closeEditor(modalId1.editorId);
		});
		currentlyOpenEditor = result.current.currentlyOpenEditor();
		expect(currentlyOpenEditor).toBeUndefined();
	});

	it('should close all editors', () => {
		const { result } = renderHook(() => useFormModalManager(), { wrapper });
		const closeAllEditors = result.current.closeAllEditors;
		const openEditor = result.current.openEditor;

		act(() => {
			openEditor(modalId1);
			openEditor(modalId2);
			openEditor(modalId3);
			closeAllEditors();
		});
		currentlyOpenEditor = result.current.currentlyOpenEditor();
		expect(currentlyOpenEditor).toBeUndefined();
	});
});
