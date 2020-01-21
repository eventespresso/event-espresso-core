/**
 * External dependencies
 */
import { renderHook, act } from '@testing-library/react-hooks';

/**
 * Internal dependencies
 */
import useEditorModalState from './index';

describe('useEditorModalState', () => {
	const modalId1 = 'randomModalId1';
	const modalId2 = 'randomModalId2';
	const modalId3 = 'randomModalId3';
	let currentlyOpenEditor: string;

	it('should have empty stack by default', () => {
		const { result } = renderHook(() => useEditorModalState());
		currentlyOpenEditor = result.current.currentlyOpenEditor();
		expect(currentlyOpenEditor).toBeUndefined();
	});

	describe('should stack multiple modal IDs', () => {
		const { result } = renderHook(() => useEditorModalState());
		const closeEditor = result.current.closeEditor;
		const openEditor = result.current.openEditor;

		describe('should add first modal ID', () => {
			act(() => {
				openEditor(modalId1);
			});
			currentlyOpenEditor = result.current.currentlyOpenEditor();
			expect(currentlyOpenEditor).toBe(modalId1);
		});

		describe('should add second modal ID', () => {
			const modalId = 'randomModalId2';
			act(() => {
				openEditor(modalId);
			});
			currentlyOpenEditor = result.current.currentlyOpenEditor();
			expect(currentlyOpenEditor).toBe(modalId);
		});

		describe('should add third modal ID', () => {
			const modalId = 'randomModalId3';
			act(() => {
				openEditor(modalId);
			});
			currentlyOpenEditor = result.current.currentlyOpenEditor();
			expect(currentlyOpenEditor).toBe(modalId);
		});

		describe('should not do anything if we try to close other than last opened modal', () => {
			act(() => {
				closeEditor(modalId2);
			});
			currentlyOpenEditor = result.current.currentlyOpenEditor();
			expect(currentlyOpenEditor).toBe(modalId3);
			act(() => {
				closeEditor('randomModalId');
			});
			currentlyOpenEditor = result.current.currentlyOpenEditor();
			expect(currentlyOpenEditor).toBe(modalId3);
		});

		describe('should allow closing last opened modal', () => {
			act(() => {
				closeEditor(modalId3);
			});
			currentlyOpenEditor = result.current.currentlyOpenEditor();
			expect(currentlyOpenEditor).toBe(modalId2);

			act(() => {
				closeEditor(modalId2);
			});
			currentlyOpenEditor = result.current.currentlyOpenEditor();
			expect(currentlyOpenEditor).toBe(modalId1);
		});

		describe('when closing last modal', () => {
			act(() => {
				closeEditor(modalId1);
			});
			it('should have empty stack', () => {
				currentlyOpenEditor = result.current.currentlyOpenEditor();
				expect(currentlyOpenEditor).toBeUndefined();
			});
		});

		describe('when closeAllEditors is executed', () => {
			const { result } = renderHook(() => useEditorModalState());
			const closeAllEditors = result.current.closeAllEditors;
			const openEditor = result.current.openEditor;

			act(() => {
				openEditor('randomModalId11');
				openEditor('randomModalId22');
				openEditor('randomModalId33');
				openEditor('randomModalId44');
				closeAllEditors();
			});
		});

		it('should have empty stack', () => {
			const currentlyOpenEditor = result.current.currentlyOpenEditor();
			expect(currentlyOpenEditor).toBeUndefined();
		});
	});
});
