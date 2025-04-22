"use client";

import React, { useState } from "react";
import {
  Layout,
  Menu,
  Grid,
  ConfigProvider,
  Modal,
  Avatar,
  Button,
} from "antd";
import { createElement } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import useColor from "@/hooks/useColor";

const { useBreakpoint } = Grid;

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const {backgroundColor, lightGray} = useColor();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const screens = useBreakpoint();
  const [collapsed, setCollapsed] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);

  const isActived = (link: string) => {
    const [basePath, queryString] = link.split("?");
    const linkParams = new URLSearchParams(queryString);

    if (pathname !== basePath) return false;

    for (const [key, value] of linkParams.entries()) {
      if (searchParams.get(key) !== value) return false;
    }

    return true;
  };

  const handleMenuClick = () => {
    setCollapsed(!collapsed);
  };

  const handleItemClick = (link: string) => {
    if (link === "/logout") {
      setLogoutModal(true);
    } else {
      router.push(link);
    }
    setVisible(false);
  };

  //   const handleLogout = () => {
  //     onLogout();
  //     setLogoutModal(false);
  //     router.push("/login");
  //   };

  // Define the header navigation items
  const headerNavItems = [
    { label: `Trang chủ`, link: "/home" },
    { label: `Cửa hàng`, link: "/shop" },
    { label: `Liên hệ`, link: "/contact" },
    { label: `Đăng nhập`, link: "/login" },
    { label: `Đăng ký`, link: "/register" },
  ];

  return (
    <Layout>
        <ConfigProvider
        theme={{
          components: {
            Layout: {
              siderBg: "rgb(244, 244, 244)",
            },
            Menu: {
              itemActiveBg: lightGray,
              itemSelectedBg: lightGray,
              colorBgContainer: "rgb(244, 244, 244)",
              lineWidth: 0,
              itemBorderRadius: 5,
              itemMarginBlock: 0,
              itemHeight: 55,
              padding: 0,
            },
          },
        }}
      >
        <Sider
          trigger={null}
          collapsedWidth={0}
          width={250}
          collapsed={!collapsed}
          breakpoint="lg"
          onCollapse={(collapsed) => setCollapsed(collapsed)}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            zIndex: 100,
            insetInlineStart: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <div className="demo-logo-vertical" />
          <Menu
            mode="inline"
            className="flex flex-col justify-center h-full"
            items={headerNavItems.map((item, index) => {
              const actived = isActived(item.link);
              return {
                key: index.toString(),
                label: (
                    <div
                      className="flex items-center gap-4 w-full h-full px-4 pl-8"
                      style={{
                        backgroundColor: actived ? "white" : "transparent",
                        color: "black",

                      }}
                      onClick={() => {
                        handleItemClick(item.link);
                        !screens.lg && handleMenuClick();
                      }}
                    >
                      {/* {createElement(item.icon, {
                        size: 20,
                      })} */}
                      <span>{item.label}</span>
                    </div>
                ),
                style: {
                  paddingLeft: 0,
                  paddingRight: 0,
                  paddingTop: 0,
                  paddingBottom: 0,
                  marginBottom: 10,
                  cursor: "pointer",
                  boxShadow:actived ? "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)" : "none",
                  borderRadius: actived ? 10 : 0,
                },
              };
            })}
          />
        </Sider>
      </ConfigProvider>
      <Layout>
        <Header
        style={{
            position: "sticky",
            top: 0,
            backgroundColor: screens.lg ? "#F5F5F5" : backgroundColor,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            zIndex: 100,
            padding: 0,
          }}>
      <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <img
              src="/image/logo.png"
              alt="YourVibes"
              style={{ height: "60px", cursor: "pointer" }}
              onClick={() => router.push("/home")}
            />
          </div>
        <Menu
          mode="horizontal"
          theme="light"
          defaultSelectedKeys={["2"]}
          items={headerNavItems.map((item) => ({
            key: item.link,
            label: item.label,
            onClick: () => handleItemClick(item.link),
            }))}
          style={{ flex: 1, minWidth: 0 }}
        />
        {!screens.lg && (
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => handleMenuClick()}
              style={{ fontSize: "20px", marginRight: "16px" }}
            />
          )}
      </Header>
      <Content className="bg-white">
         
            {children}

        </Content>
      </Layout>
      
    </Layout>
  );
};

export default MainLayout;
