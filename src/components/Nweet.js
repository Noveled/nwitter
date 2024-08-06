import React, { useState } from 'react'
import { dbService } from 'fbase';
import { doc, deleteDoc, updateDoc  } from 'firebase/firestore';

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.nweet);
    const NweetTextRef = doc(dbService, 'nweets', `${nweetObj.id}`);


    const onDeleteClick = async () => {
        const ok = window.confirm("삭제하시겠습니까?");
        // console.log(ok);
        if (ok) {
            // console.log(nweetObj.id);
            await deleteDoc(NweetTextRef);
        }
    };

    const toggleEditing = () => setEditing((prev) => !prev);
    
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewNweet(value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        await updateDoc(NweetTextRef, {
            nweet: newNweet,
        });
        setEditing(false);
    }

    return (
        <div>
            {editing ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input onChange={onChange} value={newNweet} required />
                        <input type="submit" value="Update Nweet" />
                    </form>
                    <button onClick={toggleEditing}>Cancel</button>
                </>
            ) : (
                <>
                    <h4>{nweetObj.nweet}</h4>
                    {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>Delete Nweet</button>
                            <button onClick={toggleEditing}>Edit Nweet</button>
                        </>
                    )}
                </>
            )}
        </div>
    )
}

export default Nweet