import React from 'react';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import IconButton from '../../../components/icon_button';

const storageKey = 'announcements_dismissed';

class Announcements extends React.PureComponent {

  static propTypes = {
    account: ImmutablePropTypes.map.isRequired,
  };

  componentDidUpdate (prevProps, prevState) {
    if (prevState.dismissed !== this.state.dismissed) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(this.state.dismissed));
      } catch (e) {}
    }
  }

  componentWillMount () {
    try {
      const dismissed = JSON.parse(localStorage.getItem(storageKey));
      this.state = { dismissed: Array.isArray(dismissed) ? dismissed : [] };
    } catch (e) {
      this.state = { dismissed: [] };
    }

    const announcements = [];
    announcements.push(
      {
        id: 28,
        icon: '/announcements/info_03.png',
        body: 'メドンラボはじめました！',
        link: [
          {
            inline: false,
            href: 'http://medon-lab.com/',
            body: 'メドンラボを見る',
          },
        ],
      },
      {
        id: 32,
        icon: '/announcements/info_05.png',
        body: '1/17日開幕！闇有利古戦場特集！',
        link: [
          {
            inline: false,
            href: 'https://gran-matome.com/kosenjo-dark',
            body: '記事をみる',
          },
        ],
      },
      {
        id: 15,
        icon: '/announcements/info_02.png',
        body: '【重要なお知らせ】mimumedonの利用におけるガイドラインを策定しました',
        link: [
          {
            inline: false,
            href: 'https://mimumedon.com/about/more',
            body: 'ガイドラインをみる',
          },
        ],
      }
      // NOTE: id: 32 まで使用した
    );

    this.announcements = Immutable.fromJS(announcements);
  }

  handleDismiss = (event) => {
    const id = +event.currentTarget.getAttribute('title');

    if (Number.isInteger(id)) {
      this.setState({ dismissed: [].concat(this.state.dismissed, id) });
    }
  }

  render () {
    return (
      <ul className='announcements'>
        {this.announcements.map(announcement => this.state.dismissed.indexOf(announcement.get('id')) === -1 && (
          <li key={announcement.get('id')}>
            <div className='announcements__icon'>
              <img src={announcement.get('icon')} alt='' />
            </div>
            <div className='announcements__body'>
              <div className='announcements__body__dismiss'>
                <IconButton icon='close' title={`${announcement.get('id')}`} onClick={this.handleDismiss} />
              </div>
              <p>{announcement.get('body')}</p>
              <p>
                {announcement.get('link').map((link) => {
                  const classNames = ['announcements__link'];

                  if (link.get('inline')) {
                    classNames.push('announcements__link-inline');
                  }

                  return (
                    <a className={classNames.join(' ')} key={link.get('href')} href={link.get('href')} target='_blank'>
                      {link.get('body')}
                    </a>
                  );
                })}
              </p>
            </div>
          </li>
        ))}
      </ul>
    );
  }

};

export default Announcements;
