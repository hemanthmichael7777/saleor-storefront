import * as React from "react";

import { NavLink } from "..";
import { TypedSecondaryMenuQuery } from "./queries";

import ReactSVG from "react-svg";
import logoImg from "../../images/logo.svg";
import amexImg from "../../images/american_express_logo.svg";
import discoverImg from "../../images/discover_logo.svg";
import mastercardImg from "../../images/mastercard_logo.svg";
import visaImg from "../../images/visa_logo.svg";

import "./scss/index.scss";

class Nav extends React.PureComponent {

  state = { value: "" }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <footer className="footer-nav">
        <div className="container">
          <TypedSecondaryMenuQuery>
            {({ data }) => {
              return data.shop.navigation.secondary.items.map(item => (
                <div className="footer-nav__section" key={item.id}>
                  <h4 className="footer-nav__section-header">
                    <NavLink item={item} />
                  </h4>
                  <div className="footer-nav__section-content">
                    {item.children.map(subItem => (
                      <p key={subItem.id}>
                        <NavLink item={subItem} />
                      </p>
                    ))}
                  </div>
                </div>
              ));
            }}
          </TypedSecondaryMenuQuery>

          <div className="footer__sectionsecondary">
            <div className="footer__contactcontainer">
              <div className="footer__secondaryheader">
                Stay In Touch
              </div>
              <form>
                <input
                  type="text" disabled
                  className="footer__inputform"
                  placeholder="address@email.com"
                  value={this.state.value}
                  onChange={evt => this.setState({ value: evt.target.value })}
                />
                 {/* <input type="submit" value="Submit" /> */}
              </form>
            </div>

            <div className="footer__paymentcontainer">
              <div className="footer__secondaryheader">
                Payment Options
              </div>

              <div className="footer__paymentimgcontainer">
                <div className="footer__paymentimg">
                  <ReactSVG path={visaImg} />
                </div>
                <div className="footer__paymentimg">
                  <ReactSVG path={amexImg} />
                </div>
                <div className="footer__paymentimg">
                  <ReactSVG path={discoverImg} />
                </div>
                <div className="footer__paymentimg">
                  <ReactSVG path={mastercardImg} />
                </div>
              </div>
            </div>

          </div>

          <div className="footer__sectionsecondary">
            <div className="footer__logo">
              <ReactSVG path={logoImg} />
            </div>

            <div className="footer__c">
              © 2021 All Rights Reserved
            </div>

          </div>
        </div>


      </footer>
    );
  }
}

export default Nav;
