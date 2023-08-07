import React, { useEffect, useState } from "react";
import { dbService } from "../myfb";
import Nweet from "../components/nweet"

const Home = ({ userObj }) => {
    const [neweet, setNeweet] = useState("");
    const [nweets, setNweets] = useState([]);
    /*const getNweets = async () => { 
        const dbnweets = await dbService.collection("nweets").get();
        dbnweets.forEach((document) => {
            const nweetObject = {
                ...document.data(),
                id: document.id,
            };
            setNweets((prev) => [nweetObject, ...prev]);
            
        });
    }; // 트윗 받아내기, 하지만 realtime방식이 아님 */

    useEffect(() => { 
        dbService.collection("nweets").onSnapshot(snapshot => {
            const nweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setNweets(nweetArray);
        });
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("nweets").add({
            text: neweet,
            createdAt: Date.now(),
            creatorId: userObj.uid
        });
        setNeweet("");
    };
    const onChange = (event) => {
        const { target: {value}, } = event
        setNeweet(value);

    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={neweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input type="submit" value="Nweet" />
            </form>
            <div>
                {nweets.map((neweet) => (
                    <Nweet key={neweet.id} nweetObj= {neweet} isOwner ={neweet.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    );
}

export default Home;
