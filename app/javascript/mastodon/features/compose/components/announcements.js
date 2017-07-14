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
        id: 1,
        icon: '/announcements/icon_2x_360.png',
        body: '8月中旬に土有利古戦場が開催予定、土パ装備特集記事を公開中！',
        link: [
          {
            inline: false,
            href: 'http://gran-matome.com/archives/27579',
            body: '記事を読む',
          },
        ],
      },
      {
        id: 2,
        icon: '/announcements/icon_2x_360.png',
        body: 'ケルベロス＆フェンリル討滅戦開催中！目標本数などのイベントまとめはコチラ',
        link: [
          {
            inline: false,
            href: 'http://gran-matome.com/archives/27883',
            body: '記事を読む',
          },
        ],
      }
      // NOTE: id: 2 まで使用した
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
