import { createCampaign, dashboard, logout, payment, profile, withdraw } from '../assets';

export const navlinks = [
  {
    name: 'dashboard',
    imgUrl: dashboard,
    link: '/home',
  },
  {
    name: 'campaign',
    imgUrl: createCampaign,
    link: '/home/create-campaign',
  },
  {
    name: 'howitworks',
    imgUrl: payment,
    link: '/home/how-it-works',
  },
  // {
  //   name: 'withdraw',
  //   imgUrl: withdraw,
  //   link: '/',
  //   disabled: true,
  // },
  {
    name: 'profile',
    imgUrl: profile,
    link: '/home/profile',
  },
  {
    name: 'logout',
    imgUrl: logout,
    link: '/',
  },
];