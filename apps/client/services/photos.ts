import { getFetch } from '../utils';

export const getCollections = () => {
  try {
    const page = 1;
    const perPage = 20;
    return getFetch(
      `https://api.unsplash.com/users/${process.env.UNSPLASH_USERNAME}/collections/?client_id=${process.env.UNSPLASH_CLIENT_ID}&page=${page}&per_page=${perPage}`
    );
  } catch (err) {
    console.error(err);
  }
};

export const getPhotosByCollectionId = (id) => {
  try {
    const page = 1;
    const perPage = 20;
    return getFetch(
      `https://api.unsplash.com/collections/${id}/photos/?client_id=${process.env.UNSPLASH_CLIENT_ID}&page=${page}&per_page=${perPage}`
    );
  } catch (err) {
    console.error(err);
  }
};
