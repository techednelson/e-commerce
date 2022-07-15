import { NextRouter } from 'next/dist/shared/lib/router/router';

export const refreshBrowser = (router: NextRouter) =>
  router.pathname !== '/' ? router.push('/') : router.reload();
