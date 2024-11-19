import Note from '../components/Note'

export default function Home() {
  if (false /*isEditing*/) {
    return (
      <NoteEditor noteId={null} initialTitle="Untitled" initialBody="" />
    );
  } else {
    return (
      <div className="note--empty-state">
        <span className="note-text--empty-state">
          Click a note on the left to view something! 🥺
        </span>
      </div>
    );
  }
}
