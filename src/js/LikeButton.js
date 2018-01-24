import React from 'react'

export default class LikeButton extends React.Component {
  render() {
    return (
      <button type="button" className="LikeButton">
        <svg><use xlinkHref={`#s-like${this.props.liked ? '-fill' : ''}`} /></svg>
      </button>
    )
  }
}
