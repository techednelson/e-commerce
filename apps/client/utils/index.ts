import { NextRouter } from 'next/dist/shared/lib/router/router';

export const refresh = (router: NextRouter) =>
  router.pathname !== '/' ? router.push('/') : router.reload();
