import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('src/layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () =>
          import('src/components/HomeView.vue'),
      },
      {
        path: 'nfts',
        component: () =>
          import('src/components/NftList.vue'),
      },
      {
        path: 'my-nfts',
        component: () =>
          import('src/components/MyNfts.vue'),
      },
      {
        path: 'leaderboard',
        component: () =>
          import('src/components/LeaderBoard.vue'),
      },
      {
        path: 'faq',
        component: () =>
          import('src/components/DocsView.vue'),
      },
      {
        path: 'my-stats',
        component: () =>
          import('src/components/MyStats.vue'),
      }
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () =>
      import('src/shared-module/components/error/ErrorNotFound.vue'),
  },
];

export default routes;
