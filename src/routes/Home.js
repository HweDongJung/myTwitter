import React, { useEffect, useState } from "react";
import { dbService } from "../myfb";

const Home = () => {
    const [neweet, setNeweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const getNweets = async () => { 
        const dbnweets = await dbService.collection("nweets").get();
        dbnweets.forEach((document) => {
            const nweetObject = {
                ...document.data(),
                id: document.id,
            };
            setNweets((prev) => [nweetObject, ...prev]);
            
        });
        console.log(nweets);
    };

    useEffect(() => { 
        getNweets();
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("nweets").add({
            neweet,
            createdAt: Date.now()
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
                    <div key={neweet.id}>
                        <h4>{neweet.neweet}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
