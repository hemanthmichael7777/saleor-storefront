import React, { useContext, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { commonMessages } from "@temp/intl";
import { useAuth, useCart } from "@saleor/sdk";

import Media from "react-media";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";

import classNames from "classnames";
import {
  MenuDropdown,
  Offline,
  Online,
  OverlayContext,
  OverlayTheme,
  OverlayType,
} from "..";
import * as appPaths from "../../app/routes";
import { maybe } from "../../core/utils";
import NavDropdown from "./NavDropdown";
import { TypedMainMenuQuery } from "./queries";

import { Search } from '../Search';

import cartImg from "../../images/cart.svg";
import hamburgerHoverImg from "../../images/hamburger-hover.svg";
import hamburgerImg from "../../images/hamburger.svg";
import logoImg from "../../images/logo.svg";

import userImg from "../../images/user.svg";
import {
  mediumScreen,
  smallScreen,
} from "../../globalStyles/scss/variables.scss";
import "./scss/index.scss";

interface MainMenuProps {
  demoMode: boolean;
}

const MainMenu: React.FC<MainMenuProps> = ({ demoMode }) => {
  const overlayContext = useContext(OverlayContext);

  const { user, signOut } = useAuth();
  const { items } = useCart();

  const handleSignOut = () => {
    signOut();
  };

  const cartItemsQuantity =
    (items &&
      items.reduce((prevVal, currVal) => prevVal + currVal.quantity, 0)) ||
    0;

  const [activeDropdown, setActiveDropdown] = useState<string>(undefined);

  useEffect(() => {
    if (activeDropdown) {
      overlayContext.show(OverlayType.mainMenuNav, OverlayTheme.modal);
    } else {
      overlayContext.hide();
    }
  }, [activeDropdown]);

  const showDropdownHandler = (itemId: string, hasSubNavigation: boolean) => {
    if (hasSubNavigation) {
      setActiveDropdown(itemId);
    }
  };

  const hideDropdownHandler = () => {
    if (activeDropdown) {
      setActiveDropdown(undefined);
    }
  };

  function isBaseUrl() {
    // condition is true for the homepage
    if (window.location.href.split("/").length == 4)
      return true;
  }

  const mmContainerClass = isBaseUrl() ?
    "main-menu__mmcontainer" : "main-menu__mmcontainersolid";

  return (
    <header
      className={classNames({
        "header-with-dropdown": !!activeDropdown,
      })}
    >
      <nav className="main-menu" id="header">
        <div className={mmContainerClass}>
          <div className="main-menu__top">
            <div className="main-menu__left">
              <TypedMainMenuQuery renderOnError displayLoader={false}>
                {({ data }) => {
                  const items = maybe(() => data.shop.navigation.main.items, []);

                  return (
                    <ul>
                      <Media
                        query={{ maxWidth: mediumScreen }}
                        render={() => (
                          <li
                            data-test="toggleSideMenuLink"
                            className="main-menu__hamburger"
                            onClick={() =>
                              overlayContext.show(
                                OverlayType.sideNav,
                                OverlayTheme.left,
                                { data: items }
                              )
                            }
                          >
                            <ReactSVG
                              path={hamburgerImg}
                              className="main-menu__hamburger--icon"
                            />
                            <ReactSVG
                              path={hamburgerHoverImg}
                              className="main-menu__hamburger--hover"
                            />
                          </li>
                        )}
                      />

                      <Online>
                        <Media
                          query={{ maxWidth: smallScreen }}
                          render={() => (
                            <>
                              {user ? (
                                <MenuDropdown
                                  suffixClass="__rightdown"
                                  head={
                                    <li className="main-menu__icon main-menu__user--active">
                                      <ReactSVG path={userImg} />
                                    </li>
                                  }
                                  content={
                                    <ul className="main-menu__dropdown">
                                      <li data-test="mobileMenuMyAccountLink">
                                        <Link to={appPaths.accountUrl}>
                                          <FormattedMessage
                                            {...commonMessages.myAccount}
                                          />
                                        </Link>
                                      </li>
                                      <li data-test="mobileMenuOrderHistoryLink">
                                        <Link to={appPaths.orderHistoryUrl}>
                                          <FormattedMessage
                                            {...commonMessages.orderHistory}
                                          />
                                        </Link>
                                      </li>
                                      <li data-test="mobileMenuAddressBookLink">
                                        <Link to={appPaths.addressBookUrl}>
                                          <FormattedMessage
                                            {...commonMessages.addressBook}
                                          />
                                        </Link>
                                      </li>
                                      <li
                                        onClick={handleSignOut}
                                        data-test="mobileMenuLogoutLink"
                                      >
                                        <FormattedMessage
                                          {...commonMessages.logOut}
                                        />
                                      </li>
                                    </ul>
                                  }
                                />
                              ) : (
                                  <li
                                    data-test="mobileMenuLoginLink"
                                    className="main-menu__icon"
                                    onClick={() =>
                                      overlayContext.show(
                                        OverlayType.login,
                                        OverlayTheme.left
                                      )
                                    }
                                  >
                                    <ReactSVG path={userImg} />
                                  </li>
                                )}
                            </>
                          )}
                        />
                      </Online>
                    </ul>
                  );
                }}
              </TypedMainMenuQuery>
            </div>

            <div className="main-menu__center">
              <Link to={appPaths.baseUrl}>
                <ReactSVG path={logoImg}/>
              </Link>
            </div>

            <div className="main-menu__right">
              <ul>
                <Online>

                  <li
                    data-test="menuSearchOverlayLink"
                  >

                    <Search />
                    
                  </li>

                  <Media
                    query={{ minWidth: smallScreen }}
                    render={() => (
                      <>
                        {user ? (
                          <MenuDropdown
                            head={
                              <li className="main-menu__icon main-menu__user--active">
                                <ReactSVG path={userImg} />
                              </li>
                            }
                            content={
                              <ul className="main-menu__dropdown">
                                <li data-test="desktopMenuMyAccountLink">
                                  <Link to={appPaths.accountUrl}>
                                    <FormattedMessage
                                      {...commonMessages.myAccount}
                                    />
                                  </Link>
                                </li>
                                <li data-test="desktopMenuOrderHistoryLink">
                                  <Link to={appPaths.orderHistoryUrl}>
                                    <FormattedMessage
                                      {...commonMessages.orderHistory}
                                    />
                                  </Link>
                                </li>
                                <li data-test="desktopMenuAddressBookLink">
                                  <Link to={appPaths.addressBookUrl}>
                                    <FormattedMessage
                                      {...commonMessages.addressBook}
                                    />
                                  </Link>
                                </li>
                                <li
                                  onClick={handleSignOut}
                                  data-test="desktopMenuLogoutLink"
                                >
                                  <FormattedMessage {...commonMessages.logOut} />
                                </li>
                              </ul>
                            }
                          />
                        ) : (
                            <li
                              data-test="desktopMenuLoginOverlayLink"
                              className="main-menu__icon"
                              onClick={() =>
                                overlayContext.show(
                                  OverlayType.login,
                                  OverlayTheme.right
                                )
                              }
                            >
                              <ReactSVG path={userImg} />
                            </li>
                          )}
                      </>
                    )}
                  />
                  <li
                    data-test="menuCartOverlayLink"
                    className="main-menu__icon main-menu__cart"
                    onClick={() => {
                      overlayContext.show(OverlayType.cart, OverlayTheme.right);
                    }}
                  >
                    <ReactSVG path={cartImg} />
                    {cartItemsQuantity > 0 ? (
                      <span className="main-menu__cart__quantity">
                        {cartItemsQuantity}
                      </span>
                    ) : null}
                  </li>
                </Online>
                <Offline>
                  <li className="main-menu__offline">
                    <Media
                      query={{ minWidth: mediumScreen }}
                      render={() => (
                        <span>
                          <FormattedMessage defaultMessage="Offline" />
                        </span>
                      )}
                    />
                  </li>
                </Offline>
              </ul>
            </div>
          </div>

          <div className="main-menu__bottom">
            <TypedMainMenuQuery renderOnError displayLoader={false}>
              {({ data }) => {
                const items = maybe(() => data.shop.navigation.main.items, []);

                return (
                  <ul className="main-menu__ulitem-container">
                    <Media
                      query={{ minWidth: mediumScreen }}
                      render={() =>
                        items.map(item => {
                          const hasSubNavigation = !!item?.children?.length;

                          var dropDownStyleClass = hasSubNavigation ? "main-menu__item" : "main-menu__item__no-nav";
                          
                          return (
                            <div className="main-menu__menudiv">
                              <li
                                data-test="mainMenuItem"
                                className={dropDownStyleClass}
                                key={item.id}
                              >

                                <NavDropdown
                                  hasSubNavigation={hasSubNavigation}
                                  overlay={overlayContext}
                                  showDropdown={
                                    activeDropdown === item.id && hasSubNavigation
                                  }
                                  onShowDropdown={() =>
                                    showDropdownHandler(item.id, hasSubNavigation)
                                  }
                                  onHideDropdown={hideDropdownHandler}
                                  {...item}
                                />
                              </li>
                            </div>
                          );
                        })
                      }
                    />
                  </ul>
                );
              }}
            </TypedMainMenuQuery>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default MainMenu;
