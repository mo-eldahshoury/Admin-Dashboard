import { Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getOrders } from "../../API";

function Orders() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getOrders().then((res) => {
      setDataSource(res.products);
      setLoading(false);
    });
  }, []);

  return (
    <Space size={20} direction="vertical" style={{ width: "100%", marginTop: "24px" }}>
      <div style={{ marginBottom: "16px" }}>
        <Typography.Title level={4} style={{ margin: 0 }}>Orders</Typography.Title>
      </div>

      <div style={{ width: "100%", backgroundColor: "#fff" }}>
        <Table
          loading={loading}
          columns={[
            {
              title: "Title",
              dataIndex: "title",
            },
            {
              title: "Price",
              dataIndex: "price",
              render: (value) => <span>${value}</span>,
            },
            {
              title: "DiscountedPrice",
              dataIndex: "discountedPrice",
              render: (value) => <span>${value}</span>,
            },
            {
              title: "Quantity",
              dataIndex: "quantity",
            },
            {
              title: "Total",
              dataIndex: "total",
              render: (value) => <span>${value}</span>,
            },
          ]}
          dataSource={dataSource}
          pagination={{
            pageSize: 5,
            position: ["bottomCenter"],
          }}
          scroll={{ y: 340 }}
          rowKey="id"
        ></Table>
      </div>
    </Space>
  );
}

export default Orders;