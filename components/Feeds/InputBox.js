import { useSession, signIn } from "next-auth/client";
import Image from "next/image";
import { PhotographIcon } from "@heroicons/react/outline";
import { db, storage } from "../../firebase";
import { useRef, useState } from "react";
import firebase from 'firebase';

function InputBox() {
  const [session] = useSession();
  const inputRef = useRef(null);
  const filePickerRef = useRef(null);
  const [postImage, setPostImage] = useState(null);
  const sendPost = (e) => {
    e.preventDefault();
    if (!inputRef.current.value) return;

    db.collection('posts').add({
      content: inputRef.current.value,
      name: session.user.name,
      email: session.user.email,
      avatar: session.user.image,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(doc => {
      if (postImage) {
        const uploadTask = storage.ref(`posts/${doc.id}`).putString(postImage, 'data_url');
        removeImage();
        uploadTask.on(
          'state_change',
          null,
          (error) => console.error(error),
          () => {
            storage.ref('posts').child(doc.id).getDownloadURL().then(url => {
              db.collection('posts').doc(doc.id).set({
                imageUrl: url
              }, { merge: true })
            })
          }
        )
      }
    });

    inputRef.current.value = "";

  }

  const addPostImage = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    };
    reader.onload = (readerEvent) => {
      setPostImage(readerEvent.target.result);
    };
  };

  const removeImage = () => {
    setPostImage(null);
  }

  if (!session) return (
    <>
      <span className="">You are not signed in </span>
      <a
        href={`/api/auth/signin`}
        className="text-white bg-indigo-500 border-0 p-2 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        onClick={(e) => {
          e.preventDefault()
          signIn()
        }}
      >
        Sign in
      </a>
    </>
  );

  return (
    <form className="bg-white rounded-2xl shadow-md p-3 space-y-2">
      <div className="flex space-x-4 items-center">
        <Image
          className="rounded-full"
          src={(typeof session.user.image === 'undefined') ? "../public/default-avatar.jpg" : session.user.image}
          width={40}
          height={40}
          layout="fixed"
        />
        <div className="flex flex-1">
          <input
            className="flex-grow px-5 rounded-full h-12 bg-gray-100 hover:bg-gray-200 cursor-pointer focus:outline-none w-max"
            type="text"
            ref={inputRef}
            placeholder={`What's on your mine, ${session.user.name}?`}
          />
        </div>
      </div>

      {postImage && (
        <div onClick={removeImage} className="">
          <img
            className="h-20 object-contain duration-150 transform hover:scale-105 cursor-pointer rounded-md"
            src={postImage}
            alt=""
          />
          <p className="">Remove</p>
        </div>
      )}

      <div className="flex items-center border-t pt-2">
        <div className="flex-none">
          <div onClick={() => filePickerRef.current.click()} className="p-2 flex items-center space-x-1 hover:bg-gray-200 rounded-xl cursor-pointer">
            <PhotographIcon className="h-7 text-green-600" />
            <p className="text-xs sm:text-sm xl:text-base">Photos/Videos</p>
            <input
              type="file"
              hidden
              ref={filePickerRef}
              onChange={addPostImage}
            />
          </div>
        </div>
        <div className="flex-grow"></div>
        <button
          type="submit"
          className="flex-none px-3 py-2 border border-transparent text-base rounded-md text-white bg-indigo-500 hover:bg-indigo-600 cursor-pointer"
          onClick={sendPost}
        >
          Submit
        </button>
      </div>
    </form>
  )
}

export default InputBox
