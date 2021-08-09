import Image from "next/image";
import {  ChatIcon, ShareIcon, ThumbUpIcon } from "@heroicons/react/outline"
import Avatar from "../Image/Avatar";

function Post({ name, content, email, avatar, imageUrl, timestamp }) {
  return (
    <div className="flex flex-col">
      <div className="p-5 bg-white mt-5 rounded-t-2xl shadow-sm">
        <div className="flex items-center space-x-2">
          <Avatar image={avatar} size={40}/>
          <div>
            <p className="font-medium">{name}</p>
              <p className="text-xs text-gray-400">
            {timestamp ? (
              new Date(timestamp?.toDate()).toLocaleDateString()
            ): (
              'Loading...'
            )

            }
              </p>
          </div>
        </div>

        <p className="pt-3">{content}</p>
      </div>

      {imageUrl && (
        <div className="relative h-56 md:h-96 bg-white">
          <Image
            src={imageUrl}
            alt=""
            objectFit="cover"
            layout="fill"
          />
        </div>
      )}

      <div className="flex justify-between items-center text-gray-400 border-t rounded-b-2xl bg-white shadow-md">
        <div className="input-icon rounded-bl-2xl">
          <ThumbUpIcon className="h-4" />
          <p className="text-xs sm:text-base">Like</p>
        </div>
        <div className="input-icon">
          <ChatIcon className="h-4" />
          <p className="text-xs sm:text-base">Comment</p>
        </div>
        <div className="input-icon rounded-br-2xl">
          <ShareIcon className="h-4" />
          <p className="text-xs sm:text-base">Share</p>
        </div>
      </div>
    </div>
  )
}

export default Post
