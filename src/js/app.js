import React from 'react'
import { render } from 'react-dom'
import domready from 'domready'
import onIdle from 'on-idle'
import axios from 'axios'
import { ReactEmitter } from 'kuker-emitters'
import Content from './Content'
import Widget from './Widget'
import LikeButton from './LikeButton'

domready(() => {
  console.log('on-DOMContentLoaded')

  if (process.env.NODE_ENV !== 'production') {
    ReactEmitter()
  }
  const props = JSON.parse(document.getElementById('post-props').innerHTML)

  axios.get('/api/element')
    .then((res) => {
      render(<Content elements={res.data.elements || []}/>, document.getElementById('content'))
    })
    .catch((error) => {
      console.log(error);
    });

  onIdle(() => {
    console.log('on-idle')
    axios.get('/api/recommend')
      .then((res) => {
        console.log(res.data)
        render(<Widget user={props.user} recommend={res.data} />, document.getElementById('widget'))
      })
      .catch((error) => {
        console.log(error);
      });
  })

  window.addEventListener('load', () => {
    console.log('on-load')
    render(<LikeButton liked={props.is_liked} />, document.getElementById('like'))
  })
})
