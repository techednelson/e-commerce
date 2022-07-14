export const getCollections = async () => {
  try {
    const page = 1;
    const perPage = 20;
    const collection = `users/${process.env.UNSPLASH_USERNAME}/collections`;
    const res = await fetch(
      `https://api.unsplash.com/${collection}/?client_id=${process.env.UNSPLASH_CLIENT_ID}&page=${page}&per_page=${perPage}`
    );
    return res.json();
  } catch (err) {
    console.error(err);
  }
};

export const getPhotosByCollectionId = async (id) => {
  try {
    const page = 1;
    const perPage = 20;
    const collection = `collections/${id}/photos`;
    const res = await fetch(
      `https://api.unsplash.com/${collection}/?client_id=${process.env.UNSPLASH_CLIENT_ID}&page=${page}&per_page=${perPage}`
    );
    return res.json();
  } catch (err) {
    console.error(err);
  }
};
