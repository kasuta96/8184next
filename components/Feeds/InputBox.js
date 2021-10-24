/* eslint-disable @next/next/no-img-element */
import { useSession, signIn } from "next-auth/client"
// import Image from "next/image";
import Avatar from "../Image/Avatar"
import { PhotographIcon } from "@heroicons/react/outline"
import { firebase, db, storage } from "../../lib/firebase"
import { useRef, useState } from "react"
import SigninBtn from "../Buttons/SigninBtn"

function InputBox() {
  const [session] = useSession()
  const inputRef = useRef(null)
  const filePickerRef = useRef(null)
  const [postImage, setPostImage] = useState(null)
  const sendPost = (e) => {
    e.preventDefault()
    if (!inputRef.current.value) return

    db.collection("posts")
      .add({
        content: inputRef.current.value,
        name: session.user.name,
        email: session.user.email,
        avatar: session.user.image,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((doc) => {
        if (postImage) {
          const uploadTask = storage.ref(`posts/${doc.id}`).putString(postImage, "data_url")
          removeImage()
          uploadTask.on(
            "state_change",
            null,
            (error) => console.error(error),
            () => {
              storage
                .ref("posts")
                .child(doc.id)
                .getDownloadURL()
                .then((url) => {
                  db.collection("posts").doc(doc.id).set(
                    {
                      imageUrl: url,
                    },
                    { merge: true }
                  )
                })
            }
          )
        }
      })

    inputRef.current.value = ""
  }

  const addPostImage = (e) => {
    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }
    reader.onload = (readerEvent) => {
      setPostImage(readerEvent.target.result)
    }
  }

  const removeImage = () => {
    setPostImage(null)
  }

  if (!session)
    return (
      <>
        <span className="">You are not signed in </span>
        <SigninBtn />
      </>
    )

  return (
    <form className="bg-50 rounded-2xl shadow-md p-3 space-y-2">
      <div className="flex space-x-4 items-center">
        <Avatar image={session.user.image} size={40} />
        <div className="flex flex-1">
          <input
            className="flex-grow px-5 rounded-full h-12 bg-100 hover:bg-200 cursor-pointer focus:outline-none w-max"
            type="text"
            ref={inputRef}
            placeholder={`What's on your mine, ${session.user.name}?`}
          />
        </div>
      </div>

      {postImage && (
        <div className="">
          <img
            className="h-20 object-contain duration-150 transform hover:scale-105 cursor-pointer rounded-md"
            src={postImage}
            alt=""
          />
          <p onClick={removeImage} className="cursor-pointer">
            Remove
          </p>
        </div>
      )}

      <div className="flex items-center border-t pt-2">
        <div className="flex-none">
          <div
            onClick={() => filePickerRef.current.click()}
            className="p-2 flex items-center space-x-1 hover:bg-200 rounded-xl cursor-pointer"
          >
            <PhotographIcon className="h-7 text-green-600" />
            <p className="text-xs sm:text-sm xl:text-base">Photos/Videos</p>
            <input type="file" hidden ref={filePickerRef} onChange={addPostImage} />
          </div>
        </div>
        <div className="flex-grow"></div>
        <button type="submit" className="btn text-50 bg-indigo-500 hover:bg-indigo-600" onClick={sendPost}>
          Submit
        </button>
      </div>
    </form>
  )
}

export default InputBox
