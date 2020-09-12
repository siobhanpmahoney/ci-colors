export const fetchAllColors = () => {
    fetch("https://reqres.in/api/unknown")
        .then(res =>{
          console.log(res.json())
          return res.json()
        })
}

export const fetchFeed = () => {
  return new Promise((resolve, reject) => {
    fetch("https://www.reddit.com/r/modernarchitecture/.json")
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
