import React, { useState } from "react";
import { dbService } from "../myfb";

const Nweet = ({Key, nweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const onDeleteClick = () => {
        const ok = window.confirm("Are you sure delete?")
        if(ok){
            dbService.doc(`nweets/${nweetObj.id}`).delete();
        }
    }
    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewNweet(value);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        console.log(nweetObj, newNweet);
        await dbService.doc(`nweets/${nweetObj.id}`).update({ text: newNweet });
        setEditing(false);
    }
    const toggleEditing = () => setEditing((prev) => !prev);
    return (
        <div>
            {editing ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input type="text" value={newNweet} required onChange={onChange} />
                        <input type="submit" value="Update" />
                    </form>
                    <button onClick={toggleEditing}>Cancel</button>
                </>

            ) : (
            <>
            <h4>{nweetObj.text}</h4>
            {isOwner && (
                <>
                <button onClick={onDeleteClick}>Delete</button>
                <button onClick={toggleEditing}>Edit</button>
                </>
            )}
            </>
            )}
        </div>
    )
}


export default Nweet;