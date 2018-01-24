import React from 'react'
import { subscriber } from 'react-dispatcher-decorator'
import Element from './Element'

@subscriber((self, subscribe) => {
  subscribe('example', (prop) => {
    console.log('example received on', prop);
  });
})
export default class Content extends React.Component {
  render () {
    return (
      <div className="Post-content">
        {this.props.elements.map(el => {
          return (
            <div className="Post-section" key={el.id}>
              <Element {...el} />
            </div>
          )
        })}
      </div>
    )
  }
}
