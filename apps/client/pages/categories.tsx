import React from 'react';
import Card from '../components/dashboard/card';
import { getPhotosByCollectionId } from '../services/photos';
import Layout from '../components/layout';
import Spinner from '../components/spinner';

interface ICategories {
  data: any;
}

const Categories = ({ data }: ICategories) => {
  if (!data) {
    return <Spinner />;
  }
  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {data?.map(({ id, urls }) => (
          <Card key={id} src={urls.thumb} />
        ))}
      </div>
    </Layout>
  );
};

const getCategoryId = (category: string): string => {
  switch (category) {
    case 'women':
      return 'nmKlbiw0bMg';
    case 'men':
      return 'VE-RnmcfgBg';
    case 'kids':
      return 'BisIwcJaWRQ';
    default:
      return null;
  }
};

export const getServerSideProps = async ({ req, res, query }) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );
  const id = getCategoryId(query.category);
  const data = await getPhotosByCollectionId(id);
  return { props: { data } };
};

export default Categories;
