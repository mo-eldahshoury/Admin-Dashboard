import { BellFilled, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Badge, Drawer, List, Space, Typography, Avatar } from "antd";
import { useEffect, useState } from "react";
import { getComments, getOrders } from "../../API";


function AppHeader() {
  const [comments, setComments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    getComments().then((res) => {
      setComments(res.comments);
    });
    getOrders().then((res) => {
      setOrders(res.products);
    });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 24px",
        height: "70px",
        background: "#ffffff",
        boxShadow: "0 1px 4px rgba(0, 21, 41, 0.08)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <Typography.Title
        level={4}
        style={{ margin: 0, fontWeight: 700, color: "#1e293b" }}
      >
        Admin Dashboard
      </Typography.Title>

      <Space size={20} align="center">
        <Badge count={comments.length} dot offset={[-2, 2]}>
          <div
            style={{
              padding: "8px",
              borderRadius: "50%",
              background: "#f1f5f9",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s",
            }}
            onClick={() => setCommentsOpen(true)}
          >
            <MailOutlined style={{ fontSize: 18, color: "#475569" }} />
          </div>
        </Badge>

        <Badge count={orders.length} offset={[-2, 2]}>
          <div
            style={{
              padding: "8px",
              borderRadius: "50%",
              background: "#f1f5f9",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s",
            }}
            onClick={() => setNotificationsOpen(true)}
          >
            <BellFilled style={{ fontSize: 18, color: "#475569" }} />
          </div>
        </Badge>

        <Space style={{ cursor: "pointer", marginLeft: "10px" }}>
          <Avatar
            style={{ backgroundColor: "#2563eb", fontWeight: "bold" }}
            icon={<UserOutlined />}
          />
          <Typography.Text strong style={{ color: "#334155" }}>
            Admin
          </Typography.Text>
        </Space>
      </Space>

      <Drawer
        title="Messages & Comments"
        open={commentsOpen}
        onClose={() => setCommentsOpen(false)}
        maskClosable
        width={350}
      >
        <List
          dataSource={comments}
          renderItem={(item) => (
            <List.Item style={{ padding: "12px 0" }}>
              <Typography.Text style={{ color: "#475569" }}>
                {item.body}
              </Typography.Text>
            </List.Item>
          )}
        />
      </Drawer>

      <Drawer
        title="Recent Orders & Notifications"
        open={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        maskClosable
        width={350}
      >
        <List
          dataSource={orders}
          renderItem={(item) => (
            <List.Item style={{ padding: "12px 0" }}>
              <div>
                <Typography.Text strong style={{ color: "#1e293b" }}>
                  {item.title}
                </Typography.Text>
                <div style={{ fontSize: "12px", color: "#64748b" }}>
                  has been ordered successfully!
                </div>
              </div>
            </List.Item>
          )}
        />
      </Drawer>
    </div>
  );
}

export default AppHeader;