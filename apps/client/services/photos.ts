import { getFetch } from '../utils';
import womenClothing from '../data/women-clothing';
import menClothing from '../data/men-clothing';
import KidsClothing from '../data/kids-clothing';
import { ICategoryData } from '../interfaces/ICategoryData';

interface ICategory {
  id: string;
  clothing: ICategoryData;
}

const getCategoryId = (category: string): ICategory => {
  switch (category) {
    case 'women':
      return { id: 'nmKlbiw0bMg', clothing: womenClothing };
    case 'men':
      return { id: 'VE-RnmcfgBg', clothing: menClothing };
    case 'kids':
      return { id: 'BisIwcJaWRQ', clothing: KidsClothing };
    default:
      return null;
  }
};

export const getPhotosByCollection = async (category: string) => {
  try {
    const page = 1;
    const perPage = 20;
    const { id, clothing } = getCategoryId(category);
    const data = await getFetch(
      `https://api.unsplash.com/collections/${id}/photos/?client_id=${process.env.UNSPLASH_CLIENT_ID}&page=${page}&per_page=${perPage}`
    );
    return data.map(({ id, urls }) => ({
      ...clothing[id],
      id,
      src: urls.thumb,
    }));
  } catch (err) {
    console.error(err);
  }
};

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
