import { firebase, db } from './firebase';


const profilesRef = db.collection('profiles');
const tweetsRef = db.collection('tweets');

function sleep(intervalMs) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, intervalMs);
  });
}


export async function isProfileHandleTaken(handle) {
  const snapshot = await profilesRef.where('handle', '==', handle).get();
  return !snapshot.empty;
}

export async function createProfile({ uid, handle, displayName }) {
  await profilesRef.doc(uid).set({
    handle,
    displayName,
    createdAt: new Date(),
    lastUpdatedAt: new Date(),
  });
}

export async function getProfile({ user }) {
  const profile = await profilesRef.doc(user.uid).get();
  if (!profile.exists) return null;
  return profile.data();
}

export async function postTweet({ user, profile, content }) {
  const tweet = {
    uid: user.uid,
    profile,
    content,
    favorites: [],
    timestamp: new Date(),
  };
  console.log('postTweet', tweet);
  return await tweetsRef.add(tweet);
}

export async function favoriteTweet({ tweetId, uid }) {
  return await tweetsRef.doc(tweetId).update({
    favorites: firebase.firestore.FieldValue.arrayUnion(uid),
  });
}

export async function unFavoriteTweet({ tweetId, uid }) {
  return await tweetsRef.doc(tweetId).update({
    favorites: firebase.firestore.FieldValue.arrayRemove(uid)
  });
}

export function getTweets({ user, callback }) {
  return tweetsRef.orderBy('timestamp', 'desc').onSnapshot(querySnapshot => {
    const tweets = [];
    querySnapshot.docChanges().forEach(change => {
      console.log(change);
    });
    querySnapshot.forEach(docSnapshot => tweets.push({ id: docSnapshot.id, ...docSnapshot.data() }));
    callback(tweets);
  });
}
