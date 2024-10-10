export const dashboardData = {
  statCards: [
    {
      title: "Total Products",
      value: "1,234",
      details: [
        { label: "Change", value: "+12% from last month" },
        { label: "Categories", value: "15" }
      ]
    },
    {
      title: "Low Stock Items",
      value: "23",
      details: "5 critically low"
    },
    {
      title: "Out of Stock",
      value: "7",
      details: "-3 from last week"
    },
    {
      title: "Total Revenue",
      value: "$125,430",
      details: [
        { label: "Change", value: "+8.3% vs last month" },
        { label: "Forecast", value: "$135,000 next month" }
      ]
    },
    {
      title: "Top Selling Product",
      value: "Widget X",
      details: [
        { label: "Units Sold", value: "423 this month" },
        { label: "Revenue", value: "$21,150" }
      ]
    },
    {
      title: "Inventory Value",
      value: "$543,210",
      details: [
        { label: "Change", value: "-2.5% from last month" },
        { label: "Items", value: "1,234 total" }
      ]
    }
  ],
  productSales: [
    { name: "Widget A", sales: 1200 },
    { name: "Gadget B", sales: 800 },
    { name: "Tool C", sales: 600 },
    { name: "Device D", sales: 400 },
    { name: "Component E", sales: 200 },
  ],
  lowStockItems: [
    { id: 1, name: "Widget A", quantity: 5 },
    { id: 2, name: "Gadget B", quantity: 3 },
    { id: 3, name: "Tool C", quantity: 2 },
    { id: 4, name: "Device D", quantity: 4 },
    { id: 5, name: "Component E", quantity: 1 },
  ],
  recentStockMovements: [
    {
      id: 1,
      type: "Restock",
      item: "Widget A",
      quantity: 50,
      date: "2023-04-15",
    },
    {
      id: 2,
      type: "Sale",
      item: "Gadget B",
      quantity: -10,
      date: "2023-04-14",
    },
    {
      id: 3,
      type: "Restock",
      item: "Tool C",
      quantity: 25,
      date: "2023-04-13",
    },
    {
      id: 4,
      type: "Sale",
      item: "Device D",
      quantity: -5,
      date: "2023-04-12",
    },
    {
      id: 5,
      type: "Restock",
      item: "Component E",
      quantity: 100,
      date: "2023-04-11",
    },
  ],
};