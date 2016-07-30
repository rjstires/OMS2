import React from 'react';
import {Link} from 'react-router';

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
              <li><a href="#"><i className="fa fa-blind" aria-hidden="true"></i>Resource Management</a>
                <ul className="sub-menu">
                  <li><Link to="games">Games</Link></li>
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