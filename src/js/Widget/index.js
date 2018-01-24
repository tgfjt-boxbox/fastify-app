import React from 'react'
import User from './User'
import Recommend from './Recommend'
import RectangleTop from './RectangleTop'

export default class Widget extends React.Component {
  render () {
    const rectangleTop = (<RectangleTop />)
    const user = this.props.user
      ? <User {...this.props.user} />
      : null
    const recommend = this.props.recommend
      ? <Recommend items={this.props.recommend} />
      : null

    const handleChange = (event) => {
      if (event.isIntersecting) {
        this.img.classList.add('is-loaded')
        this.img.src = props.content.photo.photo_urls['o3']
      }
    }
    const options = {
      onChange: handleChange.bind(this)
    }

    return (
      <div className="Widget">
        {rectangleTop}
        {recommend}
        {user}
      </div>
    )
  }
}