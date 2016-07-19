import React from 'react';

const NavNotifcations = () => {
  const displayNone = {
    display: 'none'
  };

  return (
    <ul className="nav navbar-nav not-nav">
      <li className="button dropdown">
        <a href="javascript:;" className="dropdown-toggle" data-toggle="dropdown"><i className=" fa fa-inbox"></i></a>
        <ul className="dropdown-menu messages">
          <li>
            <div className="nano nscroller has-scrollbar">
              <div className="content" tabIndex="0">
                <ul>
                  <li>
                    <a href="#">
                      <img src="lib/images/avatar2.jpg" alt="avatar" /><span className="date pull-right">13 Sept.</span> <span className="name">Daniel</span> Hey! How are you?
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="lib/images/avatar_50.jpg" alt="avatar" /><span className="date pull-right">20 Oct.</span><span className="name">Adam</span> Hi! Can you fix my phone?
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="lib/images/avatar4_50.jpg" alt="avatar" /><span className="date pull-right">2 Nov.</span><span className="name">Michael</span> Regards!
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="lib/images/avatar3_50.jpg" alt="avatar" /><span className="date pull-right">2 Nov.</span><span className="name">Lucy</span> Hello, my name is Lucy
                    </a>
                  </li>
                </ul>
              </div>
              <div className="pane" style={displayNone}><div className="slider"></div></div></div>
            <ul className="foot"><li><a href="#">View all messages </a></li></ul>
          </li>
        </ul>
      </li>
      <li className="button dropdown">
        <a href="javascript:;" className="dropdown-toggle" data-toggle="dropdown"><i className="fa fa-globe"></i><span className="bubble">2</span></a>
        <ul className="dropdown-menu">
          <li>
            <div className="nano nscroller has-scrollbar">
              <div className="content" tabIndex="0">
                <ul>
                  <li><a href="#"><i className="fa fa-cloud-upload info"></i><b>Daniel</b> is now following you <span className="date">2 minutes ago.</span></a></li>
                  <li><a href="#"><i className="fa fa-male success"></i> <b>Michael</b> commented on your link <span className="date">15 minutes ago.</span></a></li>
                  <li><a href="#"><i className="fa fa-bug warning"></i> <b>Mia</b> commented on post <span className="date">30 minutes ago.</span></a></li>
                  <li><a href="#"><i className="fa fa-credit-card danger"></i> <b>Andrew</b> sent you a request <span className="date">1 hour ago.</span></a></li>
                </ul>
              </div>
              <div className="pane" style={displayNone}><div className="slider"></div></div></div>
            <ul className="foot"><li><a href="#">View all activity </a></li></ul>
          </li>
        </ul>
      </li>
    </ul>
  );
};

export default NavNotifcations;