

export const fetchFeed = () => {
  return new Promise((resolve, reject) => {
    fetch("https://www.reddit.com/r/AccidentalWesAnderson/.json")
      .then((response) => response.json())
      .then((json) =>

        resolve(
          json.data.children.map((post) => {
            return {
              post_hint: post.data.post_hint,
              url: post.data.url,
              title: post.data.title,
              author: post.data.author,
              ups: post.data.ups,
              created: post.data.created,
              id: post.data.id,
              secure_media: post.data.secure_media,
              secure_media_embed: post.data.secure_media_embed,
              is_video: post.data.is_video
            };
          })
        )
      );
  });
};

export const generateTimestamp = (postTimestamp) => {
  let elapsed =
    new Date().getTime() - new Date(postTimestamp * 1000).getTime();

  switch (true) {
    case elapsed < 60000:
      return "Just Now";
    case elapsed >= 60000 && elapsed < 3600000:
      return `${parseInt(elapsed / 60000)} minutes ago`;
    case elapsed >= 3600000 && elapsed < 86400000:
      return `${parseInt(elapsed / 3600000)} hours ago`;
    case elapsed >= 86400000:
      return `${parseInt(elapsed / 86400000)} days ago`;
      break;
  }
};
