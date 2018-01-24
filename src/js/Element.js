import React from 'react';
import { dispatcher } from 'react-dispatcher-decorator';
import 'intersection-observer' // optional polyfill
import Observer from '@researchgate/react-intersection-observer'

@dispatcher
export default class Element extends React.Component {
  render() {
    const props = this.props
    switch (props.type) {
      case 1:
        return <h2 className="Post-heading">{props.description}</h2>
        break;
      case 2:
        return <p className="Post-text">{props.description}</p>
        break;
      case 3:
        const pad = {
          paddingBottom: `${Math.round(props.content.photo.height / props.content.photo.width * 10000) / 100}%`
        }
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
          <div className="PostPhoto" data-photo-id={props.content.photo.id} data-element-id={props.id}>
            <figure>
                <a href={`#photo-${props.content.photo.id}/`} className="PostPhoto-photolink">
                  <Observer {...options}>
                    <div className="FlexEmbed">
                      <div className="FlexEmbed-ratio" style={pad}></div>
                      <div className="FlexEmbed-content">
                        <img ref={(img) => { this.img = img; }} alt="" />
                      </div>
                    </div>
                  </Observer>
                </a>
              <figcaption>
                <p>{props.description}</p>
              </figcaption>
            </figure>
          </div>
        )
        break;
      default:
        return <p></p>
    }
  }
}
