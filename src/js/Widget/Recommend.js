import React from 'react'

export default function Recommend(props) {
  return (
    <section className="Section" data-widget="recommend">
      <header className="Section-header">
        <h3 className="Section-title">あなたにおすすめ</h3>
      </header>
      <div className="Section-body">
        <ol className="Stream">
          {props.items.map(item => {
            return (
              <li className="Stream-item" key={item.id}>
                <article className="Listview">
                  <a href={`#post-${item.id}`} className="Arrange Arrange--middle">
                    <div className="Listview-thumbnail">
                      <div className="FlexEmbed FlexEmbed-ratio">
                        <div className="FlexEmbed-content">
                          <img src={item.main_photo.content.photo.photo_urls['ss1']} alt="" />
                        </div>
                      </div>
                    </div>
                    <div className="Arrange-sizeFill">
                      <h1 className="Listview-title" data-lineclamp="2">{item.title}</h1>
                    </div>
                  </a>
                </article>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}