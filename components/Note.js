/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { format } from 'date-fns';

// Uncomment if you want to read from a file instead.
// import {readFile} from 'fs/promises';
// import {resolve} from 'path';

import NotePreview from './NotePreview';
import EditButton from './EditButton';
import NoteEditor from './NoteEditor';
import { useEffect, useState } from 'react';
import NoteSkeleton from './NoteSkeleton';

export default function Note({ selectedId, isEditing }) {
  const [note, setNote] = useState(null)
  useEffect(() => {
    (async () => {
      if (!selectedId)
        return
      const res = await fetch(`http://localhost:3001/api/notes/${selectedId}`);
      console.log(res)
      const note = await res.json();
      setNote(note)
    })()
  }, [selectedId])

  if (!note)
    return <NoteSkeleton></NoteSkeleton>

  let { id, title, body, updated_at } = note;
  const updatedAt = new Date(updated_at);

  // We could also read from a file instead.
  // body = await readFile(resolve(`./notes/${note.id}.md`), 'utf8');

  // Now let's see how the Suspense boundary above lets us not block on this.
  // await fetch('http://localhost:4000/sleep/3000');

  if (isEditing) {
    return <NoteEditor noteId={id} initialTitle={title} initialBody={body} />;
  } else {
    return (
      <div className="note">
        <div className="note-header">
          <h1 className="note-title">{title}</h1>
          <div className="note-menu" role="menubar">
            <small className="note-updated-at" role="status">
              Last updated on {format(updatedAt, "d MMM yyyy 'at' h:mm bb")}
            </small>
            <EditButton noteId={id}>Edit</EditButton>
          </div>
        </div>
        <NotePreview body={body} />
      </div>
    );
  }
}
