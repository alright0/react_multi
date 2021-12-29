import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import { ProfileOutlined, BookOutlined } from "@ant-design/icons";

const Navbar = () => {
  const style_centered = { display: "flex", width: "100%", justifyContent: "center", position: "sticky" };

  return (
    <Menu style={style_centered} mode="horizontal">
      <Menu.Item icon={<BookOutlined />}>
        <Link to="/books">Books</Link>
      </Menu.Item>
      <Menu.Item icon={<ProfileOutlined />}>
        <Link to="/protocollist">Protocol List</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
