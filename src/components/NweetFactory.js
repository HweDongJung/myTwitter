import React, { useState } from "react";
import { dbService, storageService } from "../myfb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const NweetFactory = ({ userObj }) => {
    const [neweet, setNeweet] = useState(""); //게시하려는 nweet의 텍스트내용 저장 
    const [file, setFile] = useState(""); //업로드한 사진의 URL화를 저장해두는 state

    const onSubmit = async (event) => {
        
        if(neweet === "") return;
        event.preventDefault();
        const time = Date.now();
        const timeData = new Date(time);
        const strTime = `${timeData.getFullYear()}-${timeData.getMonth() + 1}-${timeData.getDate()} ${timeData.getHours()}:${timeData.getMinutes()}`;
        

        let fileUrl = ""; 
        
        if(file !== ""){
            const fileRef = storageService.ref().child(`${userObj.uid}`);
            const response = await fileRef.putString(file, "data_url");
            fileUrl = await response.ref.getDownloadURL();
            console.log(fileUrl);
        }
        
        const nweet = {
            text: neweet,
            createdAt: time,
            createdAtStr: strTime,
            creatorId: userObj.uid,
            creatorDisplayName: userObj.displayName,
            fileUrl
        }
        await dbService.collection("nweets").add(nweet); //db에 nweet 등록, 등록자의 uid와 텍스트, 개시 시간을 저장함 
        setNeweet(""); // 글 게시 input 칸 초기화
        setFile("");
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
    const onClearPhoto = () => setFile("");

    return (
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
                <input className="factoryInput__input" value={neweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input type="submit" value="&rarr;" className="factoryInput__arrow" />
            </div>
            <label htmlFor="attach-file" className="factoryInput__label">
            <span>Add photos</span><FontAwesomeIcon icon={faPlus} />
            </label>

            <input id="attach-file" type="file" accept="image/*" onChange={onFileChange} style={{opacity: 0,}} />
            { file && 
                <div className="factoryForm__attachment">
                    <img src={file} style={{backgroundImage: file,}} />
                    <div className="factoryForm__clear" onClick={onClearPhoto}>
                        <span>Clear</span>
                        
                    </div>
                </div> 
            }        
        </form>
    )

}
export default NweetFactory;