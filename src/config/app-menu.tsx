const Menu = [
  { path: 'dashboard', icon: 'fa fa-sitemap', title: 'Dashboard',
    children: [
      { path: '/dashboard/v1', title: 'Dashboard v1' },
      { path: '/dashboard/v2', title: 'Dashboard v2' },
    ]
  },
  { path: '/email', icon: 'fa fa-hdd', title: 'Email', badge: '10',
    children: [
      { path: '/email/inbox', title: 'Inbox' },
      { path: '/email/compose', title: 'Compose' },
      { path: '/email/detail', title: 'Detail' }
    ]
  },
  { path: '/widgets', icon: 'fab fa-simplybuilt', title: 'Widgets', label: 'NEW' },
  
]

export default Menu;