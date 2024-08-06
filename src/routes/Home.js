import React, { useEffect } from 'react'
import { useState } from 'react'
import { dbService } from 'fbase';
import { query, collection, addDoc, onSnapshot } from 'firebase/firestore';
import Nweet from 'components/Nweet';

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState("");

  useEffect(() => {
      const q = query(collection(dbService, "nweets"));  
      
      onSnapshot(q, (querySnapshot) => {
      const newArray = querySnapshot.docs.map((document) => (
        {
          id: document.id,
          ... document.data(),
        }
      ));
      console.log("newArray : ", newArray);
      setNweets(newArray);
    });
  }, []);

  // console.log(nweets);

  const onSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(dbService, 'nweets'), {
      nweet,
      createAt: Date.now(),
      creatorId: userObj.uid,
    });
    setNweet("");
  };

  const onChange = (event) => {
    event.preventDefault();
    const {
      target: {value},
    } = event;
    setNweet(value);
  };

  const onFileChange = (event) => {
    // console.log(event.target.files);
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  
  const onClearAttachment = () => setAttachment("");

  return (
    <>
      <form onSubmit={onSubmit}>
        <input value={nweet} onChange={onChange} type="text"
        placeholder="What's on your mind?" maxLength={120} />

        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Nweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
          )}

      </form>
      <div>
        {nweets.map((nweet) => (
          <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} isM={nweet.creatorId} isN={userObj.uid} />
        ))}
      </div>
    </>
    
  );
};

export default Home