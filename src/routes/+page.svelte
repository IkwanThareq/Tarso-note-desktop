<script lang="ts">
  let noteContent: string = '';

  async function saveNote() {
    const result = await window.api.saveNote(noteContent);
    if (!result.success) alert('Save failed');
  }

  async function loadNote() {
		const result = await window.api.loadNote();
		if (result.success) {
			noteContent = result.content ?? '';
		} else {
			alert('Load failed');
		}
	}
</script>

<textarea bind:value={noteContent} rows="20" cols="80" style="width: 100%"></textarea>
<br />
<button on:click={saveNote}>Save Note</button>
<button on:click={loadNote}>Load Note</button>
