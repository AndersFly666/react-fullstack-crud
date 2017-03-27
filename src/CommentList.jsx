import React, { Component } from 'react';
import Comment from './Comment';
import style from './style';

export default class CommentList extends Component {
  render() {
    let commentNodes = this.props.data.map(comment => {
      return(
        < Comment 
          author={ comment.author }
          uniqueID={ comment['_id'] }
          key={ comment['_id'] }
          onCommentUpdate={ this.props.onCommentUpdate }
          onCommentDelete={ this.props.onCommentDelete } >
          { comment.text }
        </Comment>
      )
    });

    return (
      <div style={ style.commentList }>
        { commentNodes }
      </div>
    )
  }
}
