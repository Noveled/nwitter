import React, { useEffect } from 'react'
import { useState } from 'react'
import { dbService } from 'fbase';
import { query, collection, addDoc, onSnapshot } from 'firebase/firestore';
import Nweet from 'components/Nweet';

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

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

  console.log(nweets);
  console.log('n', nweet.creatorId, 'm', userObj.uid);
  return (
    <>
      <form onSubmit={onSubmit}>
        <input value={nweet} onChange={onChange} type="text"
        placeholder="What's on your mind?" maxLength={120} />
        <input type="submit" value="Nweet" />
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