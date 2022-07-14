import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Spinner from '../common/spinner';

interface IDashboard {
  data: any;
}

const Dashboard = ({ data }: IDashboard) => {
  const router = useRouter();

  const goToCategory = async (title: string) => {
    if (title.includes('women')) {
      await router.push('/categories?category=women');
      return;
    }
    if (title.includes('men')) {
      await router.push('/categories?category=men');
      return;
    }
    await router.push('/categories?category=kids');
  };

  if (!data) {
    return <Spinner />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {data?.map(({ id, preview_photos, title, tags }) => (
        <div
          key={id}
          className="flex justify-center pt-8 pb-4"
          onClick={() => goToCategory(title)}
        >
          <div className="card w-96 bg-base-100 shadow-xl cursor-pointer">
            <div className="flex">
              <div>
                <Image
                  src={preview_photos[0].urls.thumb}
                  alt="shoes"
                  width="190"
                  height="190"
                />
                <Image
                  src={preview_photos[1].urls.thumb}
                  alt="shoes"
                  width="190"
                  height="190"
                />
              </div>
              <div>
                <Image
                  src={preview_photos[2].urls.thumb}
                  alt="shoes"
                  width="190"
                  height="190"
                />
                <Image
                  src={preview_photos[3].urls.thumb}
                  alt="shoes"
                  width="190"
                  height="190"
                />
              </div>
            </div>
            <div className="card-body">
              <h2 className="card-title">{title}</h2>
              <div className="grid grid-cols-3 gap-3 text-center mt-2">
                {tags
                  .filter(({ type }) => type === 'search')
                  .map(({ title }) => (
                    <span
                      className="bg-base-300 rounded text-sm py-1"
                      key={title}
                    >
                      {title}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
