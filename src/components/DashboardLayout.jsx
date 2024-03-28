import { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { FaQuestion, FaPen } from "react-icons/fa6";
import { GoNote } from "react-icons/go";
import { Layout, Menu, theme } from "antd";
import { Link } from "react-router-dom";
import DashboardHeader from "./Misc/DashboardHeader";
import { getUserInfo } from "../utility/user";
const { Sider, Content } = Layout;

// eslint-disable-next-line react/prop-types
const DashboardLayout = ({ children }) => {
  const user = getUserInfo();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const teacherMenuItems = [
    {
      key: "1",
      icon: <FaPen />,
      label: <Link to="/">Take an exam</Link>,
    },
    {
      key: "2",
      icon: <GoNote />,
      label: <Link to="/teacher/exam-add">Add an exam</Link>,
    },
    {
      key: "3",
      icon: <FaQuestion />,
      label: <Link to="/teacher/add-question">Add question</Link>,
    },
  ];

  const studentMenuItems = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: <Link to="/">Take an exam</Link>,
    },
  ];
  return (
    <div className="min-h-screen">
      <DashboardHeader collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="min-h-screen"
          style={{ backgroundColor: "#ffffff", marginTop: "64px" }}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={
              user?.role === "teacher" ? teacherMenuItems : studentMenuItems
            }
          />
        </Sider>
        <Layout>
          <Content
            style={{
              margin: "24px 16px",
              marginTop: "64px",
              // minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
            className="min-h-screen"
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
export default DashboardLayout;
