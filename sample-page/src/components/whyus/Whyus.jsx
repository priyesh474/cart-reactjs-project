import React from 'react'
import './Whyus.css'

const Whyus = () => {

    const whyUsData = [
        {
            title: "Luxury facilities",
            desc: "The advantage of hiring a workspace with us is that givees you comfortable service and all-around facilities.",
            link: {
                linkText: "More Info",
                linkHref: "#"
            }
        },
        {
            title: "Affordable Price",
            desc: "You can get a workspace of the highst quality at an affordable price and still enjoy the facilities that are oly here.",
            link: {
                linkText: "More Info",
                linkHref: "#"
            }
        },
        {
            title: "Many Choices",
            desc: "We provide many unique work space choices so that you can choose the workspace to your liking.",
            link: {
                linkText: "More Info",
                linkHref: "#"
            }
        },     
    ]

  return (
    <section className='why-us'>
      <h2 className='section-title'>Why Choosing Us</h2>
      <div className="box-wrap">
        {
            whyUsData.map((boxData, i) => (
                <div className="box" key={i}>
                    <h3>{boxData.title}</h3>
                    <p>{boxData.desc}</p>
                    <a href={boxData.link.linkHref}>{boxData.link.linkText}</a>
                </div>
            ))
        }
      </div>
    </section>
  )
}

export default Whyus
