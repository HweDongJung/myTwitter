import React, { useEffect, useState } from "react";
import { dbService, storageService } from "../myfb";
import Nweet from "../components/nweet"
import NweetFactory from "../components/NweetFactory";

const Home = ({ userObj }) => {
    const [nweets, setNweets] = useState([]); //서비스의 모든 nweet 들을 배열에 저장함 

    useEffect(() => { 
        dbService.collection("nweets").onSnapshot(snapshot => {
            const nweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setNweets(nweetArray); // nweets라는 document(firebase의 db목록)의 내용물을 가져오고 nweets 갱신
        });
    }, []); //배열이 변화할때마다 실행 

    return (
        <div className="container">
            <NweetFactory userObj={userObj} />
            <div style={{ marginTop: 30 }}>
                {nweets.map((neweet) => (
                    <Nweet key={neweet.id} nweetObj= {neweet} isOwner ={neweet.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    );
}

export default Home;
