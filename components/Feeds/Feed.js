import InputBox from "./InputBox";
import Posts from "./Posts";

function Feed() {
  return (
    <div className="flex-grow min-h-screen p-5 mx-auto">
      <div className="max-w-lg lg:max-w-2xl mx-auto">
        <InputBox />
        <Posts />
      </div>
    </div>
  )
}

export default Feed
