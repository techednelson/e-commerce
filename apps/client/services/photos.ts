import { getFetch } from '../utils';

export const getCollections = () => {
  try {
    const page = 1;
    const perPage = 20;
    const collection = `users/${process.env.UNSPLASH_USERNAME}/collections`;
    return getFetch(
      `https://api.unsplash.com/${collection}/?client_id=${process.env.UNSPLASH_CLIENT_ID}&page=${page}&per_page=${perPage}`
    );
  } catch (err) {
    console.error(err);
  }
};

export const getPhotosByCollectionId = (id) => {
  try {
    const page = 1;
    const perPage = 20;
    const collection = `collections/${id}/photos`;
    return getFetch(
      `https://api.unsplash.com/${collection}/?client_id=${process.env.UNSPLASH_CLIENT_ID}&page=${page}&per_page=${perPage}`
    );
  } catch (err) {
    console.error(err);
  }
};
