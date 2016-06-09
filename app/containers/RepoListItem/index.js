/**
 * RepoListItem
 *
 * Lists the name and the issue count of a repository
 */

import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { selectCurrentUser } from 'containers/App/selectors';

import ListItem from 'components/ListItem';
import A from 'components/A';

import { Media, Img, ImgExt, Bd } from 'react-media-object';

export class RepoListItem extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const item = this.props.item;
    let nameprefix = '';

    // If the repository is owned by a different person than we got the data for
    // it's a fork and we should show the name of the owner
    if (item.owner.login !== this.props.currentUser) {
      nameprefix = `${item.owner.login}/`;
    }

    // Put together the content of the repository
    const content = (
      <Media>
          <Img href="http://twitter.com/chantastic">
            <ImgExt src={`https://resizer.paytm.com/images/hotels/${item._id}/full/0x100/${item.paytm_images.full}`} alt="chantastic" />
          </Img>

      <Bd>
     
        {item.name}
        {item.address}
        {item.priceData}
     
      </Bd>
  </Media>
    );

    // Render the content into a list item
    return (
      <ListItem key={`repo-list-item-${item.full_name}`} item={content} />
    );
  }
}

RepoListItem.propTypes = {
  item: React.PropTypes.object,
  currentUser: React.PropTypes.string,
};

export default connect(createSelector(
  selectCurrentUser(),
  (currentUser) => ({ currentUser })
))(RepoListItem);
