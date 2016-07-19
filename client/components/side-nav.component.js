import React from 'react';

const SideNav = (props) => {
  return (
    <div className="cl-sidebar">
      <div className="cl-toggle">
        <i className="fa fa-bars"></i>
      </div>
      <div className="cl-navblock">
        <div className="menu-space">
          <div className="content">
            <div className="sidebar-logo">
              <div className="logo">
                <a href="index2.html">{/*Logo*/}</a>
              </div>
            </div>
            <div className="side-user">
              {/*User Progress Bar*/}
            </div>
            {/*Menu*/}
            <ul className="cl-vnavigation">
              <li><a href="#"><i className="fa fa-blind" aria-hidden="true"></i>First Level Item</a>
                <ul className="sub-menu">
                  <li><a href="#">Second Level Item</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;