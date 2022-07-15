import * as React from 'react';
import type { NextPage } from 'next';
import Dashboard from '../components/dashboard/dashboard';
import Layout from '../components/layout';
import { getCollections } from '../services/photos';

interface IHome {
  data: any;
}

const Home: NextPage = ({ data }: IHome) => (
  <Layout>
    <Dashboard data={data} />
  </Layout>
);

export const getServerSideProps = async ({ req, res }) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );
  const data = await getCollections();
  return { props: { data } };
};

export default Home;
