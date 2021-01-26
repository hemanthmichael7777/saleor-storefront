/* eslint-disable jsx-a11y/mouse-events-have-key-events */

import classNames from "classnames";
import * as React from "react";

import { NavLink, OverlayContextInterface } from "..";
import { MainMenu_shop_navigation_main_items } from "./gqlTypes/MainMenu";
import NavItem from "./NavItem";

import "./scss/index.scss";

class NavDropdown extends React.PureComponent<
  MainMenu_shop_navigation_main_items & {
    hasSubNavigation: boolean;
    overlay: OverlayContextInterface;
    showDropdown: boolean;
    onShowDropdown: () => void;
    onHideDropdown: () => void;
  }
> {
  render() {
    const {
      children,
      hasSubNavigation,
      showDropdown,
      onShowDropdown,
      onHideDropdown,
    } = this.props;

    console.log(this.props.hasSubNavigation);

    return (
      <ul
        className={classNames({
          "main-menu__nav-dropdown": true,
          "main-menu__nav-dropdown--no-nav": !hasSubNavigation,
          "main-menu__nav-dropdown--active": showDropdown,
        })}
        onMouseOver={onShowDropdown}
        onMouseLeave={onHideDropdown}
      >
        <li>
          <NavLink item={this.props} onClick={onHideDropdown} />
        </li>
        <li
          className={classNames({
            "main-menu__nav-dropdown__body": true,
            "main-menu__nav-dropdown__body--visible": showDropdown,
          })}
        >
          <ul className="main-menu__item-container">
            {children.map((subItem, i) => (
              <NavItem key={i} hideOverlay={onHideDropdown} {...subItem} />
            ))}
          </ul> 
        </li>
      </ul>
    );
  }
}

export default NavDropdown;
