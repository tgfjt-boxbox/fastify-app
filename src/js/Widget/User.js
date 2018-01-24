import React from 'react'

export default function User(props) {
  return (
    <section className="Section" data-widget="user">
      <header className="Section-header">
        <h3 className="Section-title">投稿者</h3>
      </header>
      <div className="Section-body">
        <div className="User">
          <div className="Arrange Arrange--middle">
            <figure><img src={props.profile_photo_urls.ls1} /></figure>
            <div className="Arrange-sizeFit">{props.nickname}</div>
        </div>
        </div>
      </div>
    </section>
  )
}