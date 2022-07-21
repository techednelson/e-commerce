import React from 'react';
import Card from '../components/dashboard/card';
import { getPhotosByCollection } from '../services/photos';
import Layout from '../components/layout';
import Spinner from '../components/spinner';
import { IClothing } from '../interfaces/IClothing';

interface ICategories {
  data: IClothing[];
}

const Categories = ({ data }: ICategories) => {
  if (!data) {
    return <Spinner />;
  }
  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {data?.map(({ id, name, price, src }) => (
          <Card key={id} src={src} name={name} price={price} />
        ))}
      </div>
    </Layout>
  );
};

export const getServerSideProps = async ({ req, res, query }) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );
  const data = await getPhotosByCollection(query.category);
  return { props: { data } };
};

export default Categories;
