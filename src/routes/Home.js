import React, { useEffect, useState } from "react";
import { dbService, storageService } from "../myfb";
import Nweet from "../components/nweet"

const Home = ({ userObj }) => {
    const [neweet, setNeweet] = useState(""); //게시하려는 nweet의 텍스트내용 저장 
    const [nweets, setNweets] = useState([]); //서비스의 모든 nweet 들을 배열에 저장함 
    const [file, setFile] = useState(""); //업로드한 사진의 URL화를 저장해두는 state
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
            setNweets(nweetArray); // nweets라는 document(firebase의 db목록)의 내용물을 가져오고 nweets 갱신 
        });
    }, []); //배열이 변화할때마다 실행 

    const onSubmit = async (event) => {
        event.preventDefault();
        let fileUrl = ""; 
        if(file !== ""){
            const fileRef = storageService.ref().child(`${userObj.uid}`);
            const response = await fileRef.putString(file, "data_url");
            fileUrl = await response.ref.getDownloadURL();
        }
        
        const nweet = {
            text: neweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            fileUrl
        }
        await dbService.collection("nweets").add(nweet); //db에 nweet 등록, 등록자의 uid와 텍스트, 개시 시간을 저장함 
        setNeweet(""); // 글 게시 input 칸 초기화
        setFile(null);
    };
    const onChange = (event) => {
        const { target: {value}, } = event; 
        setNeweet(value);

    };
    const onFileChange = (event) => {
        const {
            target: {files},
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) =>{
            const {currentTarget: {result}} = finishedEvent;
            setFile(result);
        }
        reader.readAsDataURL(theFile);
    }
    const onClearPhoto = () => setFile(null);
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={neweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input type="file" accept="image/*" onChange={onFileChange}></input>
                <input type="submit" value="Nweet" />
                { file && 
                    <div>
                        <img src={file} width="50px" height="50px" />
                        <button onClick={onClearPhoto}>Clear</button>
                    </div> 
                }
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
