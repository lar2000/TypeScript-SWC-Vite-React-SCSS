const Menu = [
  {
    path: "dashboard",
    icon: "fa fa-sitemap",
    title: "Dashboard",
    children: [
      { path: "/dashboard/v1", title: "Dashboard v1" },
      { path: "/dashboard/v2", title: "Dashboard v2" },
    ],
  },
  {
    path: "/email",
    icon: "fa fa-hdd",
    title: "Email",
    badge: "10",
    children: [
      { path: "/email/inbox", title: "ທັກສ່ວນຕົວ" },
      { path: "/email/compose", title: "Compose" },
      { path: "/email/detail", title: "Detail" },
    ],
  },
  {
    path: "/widgets",
    icon: "fab fa-simplybuilt",
    title: "Widgets",
    label: "NEW",
  },
  {
    path: "/insuranceData",
    icon: "fa fa-elevator",
    title: "ຂໍ້ມູນການຊື້ປະກັນໄພ",
    children: [
      { path: "/insuranceData/companies", title: "ບໍລິສັດປະກັນໄພ" },
      { path: "/insuranceData/agent", title: "ຕົວແທນຂາຍປະກັນ" },
      { path: "/insuranceData/customer", title: "ຂໍ້ມູນຜູ້ຊື້ປະກັນ" },
      { path: "/insuranceData/commisionget", title: "ຄ່າຄອມມິດຊັນ" },
    ],
  },
  {
    path: "/report",
    icon: "fa fa-chart-pie",
    title: "ລາຍງານ",
    children: [
      { path: "/report/1", title: "ລາຍງານ1" },
      { path: "/report/2", title: "ລາຍງານ2" },
      { path: "/report/3", title: "ລາຍງານ3" },
      { path: "/report/4", title: "ລາຍງານ4" },
    ],
  },
  {
    path: "/setting",
    icon: "fa fa-gears",
    title: "ຕັ້ງຄ່າ",
    children: [
      { path: "/setting/ins_type", title: "ປະເພດປະກັນໄພ" },
      { path: "/setting/car_type", title: "ປະເພດລົດ" },
      { path: "/setting/brand", title: "ຍີ່ຫໍ້ລົດ" },
      { path: "/setting/currency", title: "ຕັ້ງຄ່າອັດຕາແລກປ່ຽນ" },
    ],
  },
];

export default Menu;
