/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useEffect, useState } from 'react';
import SidebarNote from './SidebarNote';

export default function NoteList({ searchText }) {
  // const notes = await (await fetch('http://localhost:4000/notes')).json();
  const [notes, setNotes] = useState([])
  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:3001/api/notes`);
      console.log(res)
      const notes = await res.json();
      setNotes(notes)
    })()
  }, [])

  // Now let's see how the Suspense boundary above lets us not block on this.
  // await fetch('http://localhost:4000/sleep/3000');

  return notes.length > 0 ? (
    <ul className="notes-list">
      {notes.map((note) => (
        <li key={note.id}>
          <SidebarNote note={note} />
        </li>
      ))}
    </ul>
  ) : (
    <div className="notes-empty">
      {searchText
        ? `Couldn't find any notes titled "${searchText}".`
        : 'No notes created yet!'}{' '}
    </div>
  );
}
