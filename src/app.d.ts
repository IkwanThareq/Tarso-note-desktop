// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
export { };
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	interface Window {
		api: {
			saveNote(content: string): Promise<{
				updated: any; success: boolean
			}>;
			loadNote(): Promise<{ success: boolean; content?: string }>;
		};
	}
}

export { };
