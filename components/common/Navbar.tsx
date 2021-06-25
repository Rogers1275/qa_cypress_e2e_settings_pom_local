/** @jsximportsource @emotion/react */
import { css } from '@emotion/react'
import styled from "@emotion/styled";
import React from "react";
import Link from "next/link";
import useSWR from "swr";

import CustomLink from "components/common/CustomLink";
import Maybe from "components/common/Maybe";
import NavLink from "components/common/NavLink";
import { usePageDispatch } from "lib/context/PageContext";
import checkLogin from "lib/utils/checkLogin";
import storage from "lib/utils/storage";

const NavbarItem = ({ children }) => (
  <li className="nav-item">{children}</li>
)

const Navbar = () => {
  const setPage = usePageDispatch();
  const { data: currentUser } = useSWR("user", storage);
  const isLoggedIn = checkLogin(currentUser);
  const handleClick = React.useCallback(() => setPage(0), []);
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link href="/" as="/" onClick={handleClick}>
          <a className="navbar-brand">conduit</a>
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <NavbarItem>
            <NavLink href="/" as="/" onClick={handleClick}>
              Home
            </NavLink>
          </NavbarItem>
          <Maybe test={isLoggedIn}>
            <NavbarItem>
              <NavLink href="/editor/new" as="/editor/new">
                <i className="ion-compose" />
                &nbsp;New Article
              </NavLink>
            </NavbarItem>
            <NavbarItem>
              <NavLink href="/user/settings" as="/user/settings">
                <i className="ion-gear-a" />
                &nbsp;Settings
              </NavLink>
            </NavbarItem>
            <NavbarItem>
              <NavLink
                href={`/profile/${currentUser?.username}`}
                as={`/profile/${currentUser?.username}`}
                onClick={handleClick}
              >
                {currentUser?.username}
              </NavLink>
            </NavbarItem>
          </Maybe>
          <Maybe test={!isLoggedIn}>
            <NavbarItem>
              <NavLink href="/user/login" as="/user/login">
                Sign in
              </NavLink>
            </NavbarItem>
            <NavbarItem>
              <NavLink href="/user/register" as="/user/register">
                Sign up
              </NavLink>
            </NavbarItem>
          </Maybe>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
