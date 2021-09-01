import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../../lib/firebase';
import Post from './Post';

function Posts() {
  const [value, loading, error] = useCollection(
    db.collection('posts').orderBy('timestamp', 'desc'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  return (
    <div>
      {error && console.log('Error',JSON.stringify(error))}
      {loading && <span>Loading...</span>}
      {value && (
        <span>
          {value.docs.map((doc) => (
            <Post
            key={doc.id}
            name={doc.data().name}
            content={doc.data().content}
            email={doc.data().email}
            avatar={doc.data().avatar}
            imageUrl={doc.data().imageUrl}
            timestamp={doc.data().timestamp}
          />
          ))}
        </span>
      )}
    </div>
  );
}

export default Posts
