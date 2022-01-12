import React from 'react';
import { graphql, Link, StaticQuery } from 'gatsby';
import Menu from './Menu';
import Hamburger from './Hamburger';
// import logo from '../../static/images/logo/logo.svg';
// import logoMobile from '../../static/images/logo/logo-mobile.svg';
import MenuMobile from './MenuMobile';
import { Helmet } from 'react-helmet';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuActive: false
    };
  }

  toggleMenu = menuActive => {
    this.setState(prevState => ({
      menuActive: !prevState.menuActive
    }));
  };

  render() {
    const config = this.props.data.configJson;
    return (
      <div className="header">
        <div className="container">
          <div className="logo">
            <Link to="/">
              <img height={config.logo.desktop_height} alt={config.logo.alt} src={config.logo.desktop} />
            </Link>
          </div>
          <div className="logo-mobile">
            <Link to="/">
              <img height={config.logo.desktop_height} alt={config.logo.alt} src={config.logo.mobile} />
            </Link>
          </div>
          <MenuMobile active={this.state.menuActive} />
            {/* added by A @9jan */}
            <Helmet>
            <div id="fb-root"></div>
            <script async defer crossorigin="anonymous" src="https://connect.facebook.net/sv_SE/sdk.js#xfbml=1&version=v12.0&appId=657403964314634&autoLogAppEvents=1" nonce="JO7jWEtu"></script>


            </Helmet>
            {/* <div class="fb-page" data-href="https://www.facebook.com/vwentusiasten/" data-tabs="timeline" data-width="180" data-height="70" data-small-header="true" data-adapt-container-width="true" data-hide-cover="true" data-show-facepile="true"><blockquote cite="https://www.facebook.com/vwentusiasten/" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/vwentusiasten/">vwentusiasten.se</a></blockquote></div> */}
            {/* <div class="fbb" style="margin-top: 1em;position: absolute;top: -30px;left: 220px;"><div class="fb-like fb_iframe_widget fb_iframe_widget_fluid" data-href="https://www.facebook.com/vwentusiasten" data-width="220" data-layout="standard" data-action="like" data-size="small" data-show-faces="true" data-share="true" fb-xfbml-state="rendered" fb-iframe-plugin-query="action=like&amp;app_id=657403964314634&amp;container_width=0&amp;href=https%3A%2F%2Fwww.facebook.com%2Fvwentusiasten&amp;layout=standard&amp;locale=en_US&amp;sdk=joey&amp;share=true&amp;show_faces=true&amp;size=small&amp;width=220"><span style="vertical-align: bottom; width: 225px; height: 28px;"><iframe name="f26b563e7dae7ac" width="220px" height="1000px" data-testid="fb:like Facebook Social Plugin" title="fb:like Facebook Social Plugin" frameborder="0" allowtransparency="true" allowfullscreen="true" scrolling="no" allow="encrypted-media" src="https://www.facebook.com/v2.8/plugins/like.php?action=like&amp;app_id=657403964314634&amp;channel=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Df374bd6cc25bbb4%26domain%3Dvwentusiasten.se%26is_canvas%3Dfalse%26origin%3Dhttps%253A%252F%252Fvwentusiasten.se%252Ffb112b0b1db5f4%26relation%3Dparent.parent&amp;container_width=0&amp;href=https%3A%2F%2Fwww.facebook.com%2Fvwentusiasten&amp;layout=standard&amp;locale=en_US&amp;sdk=joey&amp;share=true&amp;show_faces=true&amp;size=small&amp;width=220" style="border: none; visibility: visible; width: 225px; height: 28px;" class=""></iframe></span></div></div> */}
            {/* <div class="fb-like" data-href="https://www.facebook.com/vwentusiasten/" data-width="200" data-layout="button_count" data-action="like" data-size="small" data-share="true"></div> */}
            <iframe src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2Fvwentusiasten%2F&width=200&layout=button_count&action=like&size=small&share=true&height=46&appId=657403964314634" width="200" height="46" style={{border: "none", overflow:"hidden"}} scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
          <Menu />
          <Hamburger toggleMenu={this.toggleMenu} />
        </div>
      </div>
    );
  }
}

const props = () => (
  <StaticQuery
    query={graphql`
      query HeaderQuery {
        configJson {
          logo {
            alt
            desktop
            mobile
            desktop_height
          }
        }
      }
    `}
    render={data => <Header data={data} />}
  />
);

export default props;
