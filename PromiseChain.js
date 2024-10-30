function fetchUserData(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = { id: userId, name: "User" + userId };
      if (user) {
        resolve(user);
      } else {
        reject("User not found");
      }
    }, 1000);
  });
}

function fetchUserPosts(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const posts = ["Post 1", "Post 2", "Post 3"];
      if (posts.length) {
        resolve(posts);
      } else {
        reject("No posts found for user");
      }
    }, 1000);
  });
}

function fetchPostComments(postId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const comments = ["Comment 1", "Comment 2"];
      if (comments.lenght) {
        resolve(comments);
      } else {
        reject("No comment found for post");
      }
    }, 1000);
  });
}

// Refactred usage with promise chain and error handling
fetchUserData(1)
  .then((user) => {
    console.log("User:", user);
    return fetchUserPosts(user.id);
  })
  .then((posts) => {
    console.log("Posts", posts);
    return fetchPostComments(posts[0]);
  })
  .then((comments) => {
    console.log("Comments:", comments);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
