import { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { FaQuestion, FaPen } from "react-icons/fa6";
import { GoNote } from "react-icons/go";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import DashboardHeader from "./Misc/DashboardHeader";
import { getUserInfo } from "../utility/user";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MathJaxContext } from "better-react-mathjax";
const { Sider, Content } = Layout;

const DashboardLayout = ({ children }) => {
  const user = getUserInfo();
  const [collapsed, setCollapsed] = useState(false);

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
      label: <Link to="/teacher/question-add">Add question</Link>,
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
    <MathJaxContext>
      <div className="min-h-screen">
        <DashboardHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            className="min-h-screen"
            style={{
              backgroundColor: "#ffffff",
              marginTop: "64px",
              position: "fixed",
              top: 0,
              left: 0,
              borderRight: "1px solid #e2e8f0",
            }}
          >
            <div className="demo-logo-vertical" />
            <Menu
              theme="light"
              mode="inline"
              defaultSelectedKeys={["1"]}
              items={
                user?.role === "teacher" ? teacherMenuItems : studentMenuItems
              }
              style={{ width: "200px" }}
            />
          </Sider>
          <Layout>
            <Content
              style={{
                // margin: "24px 16px",
                marginLeft: "200px",
                marginTop: "64px",
                // minHeight: 280,
                background: "#D8CED8",
              }}
              className="min-h-screen"
            >
              {children}
              <ToastContainer />
            </Content>
          </Layout>
        </Layout>
      </div>
    </MathJaxContext>
  );
};
export default DashboardLayout;
