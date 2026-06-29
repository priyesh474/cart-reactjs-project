import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './products.css'

const Products = () => {

    const [apiData, setApiData] = useState([]);
    const [activeTab, setActiveTab] = useState();
    const [mensCloth, setMensCloth] = useState([]);
    const [jewelery, setJewelery] = useState([]);
    const [electronics, setElectronics] = useState([]);
    const [womensCloth, setWomensCloth] = useState([]);


    const handleTab = (index) => {
        setActiveTab(index)
        console.log(setActiveTab(index));
    }

    useEffect(() => {

        const fetchAPI = async () => {
            const API_KEY = 'https://fakestoreapi.com/products'

            try{
                const res = await axios.get(API_KEY)
                setApiData(res.data)
                setMensCloth(res.data.filter(p => p.category === "men's clothing"))
                setJewelery(res.data.filter(p => p.category === "jewelery"))
                setElectronics(res.data.filter(p => p.category === "electronics"))
                setWomensCloth(res.data.filter(p => p.category === "women's clothing"))
            }catch(error){
                console.log("Error", error);
            }
        
        }
        fetchAPI();
    }, [])

    console.log(apiData);
    

    const filterTab = [...new Set(apiData.map(item => item.category))]  // Chatgpt - Whenever you want unique values from an array, always use Set:

    // const mensCloth = apiData === "men's clothing" ?  


  return (
    <section className='sell-products'>
      <h2 className='section-title'>Best Selling Product</h2>
      <div className="tab-head">
        {
            filterTab.map((ad,index) => 
                <button className={activeTab === index ? "active" : ""} key={index} onClick={() => handleTab(index)}>{ad}</button> 
            )
        }
      </div>
      <div className="tab-wrap">
        {
            mensCloth === activeTab ? mensCloth.map((mc, i) => (
                <div key={i} className="tab-card">
                    <img src={mc.image} alt={mc.title} width="200" height="400"/>
                    <span>{mc.category}</span>
                    <h4>{mc.title}</h4>
                    <span>{mc.price}</span>
                </div>
            )) : ""
        }
        {/* {
            mensCloth.map((mc, i) => (
                <div key={i} className="tab-card">
                    <img src={mc.image} alt={mc.title} width="200" height="400"/>
                    <span>{mc.category}</span>
                    <h4>{mc.title}</h4>
                    <span>{mc.price}</span>
                </div>
            ))
        }
        {
            jewelery.map((j, i) => (    
                <div key={i} className="tab-card">
                    <img src={j.image} alt={j.title} width="200" height="400"/>
                    <span>{j.category}</span>
                    <h4>{j.title}</h4>
                    <span>{j.price}</span>
                </div>
            ))
        }
        {
            electronics.map((j, i) => (    
                <div key={i} className="tab-card">
                    <img src={j.image} alt={j.title} width="200" height="400"/>
                    <span>{j.category}</span>
                    <h4>{j.title}</h4>
                    <span>{j.price}</span>
                </div>
            ))
        }
        {
            womensCloth.map((j, i) => (    
                <div key={i} className="tab-card">
                    <img src={j.image} alt={j.title} width="200" height="400"/>
                    <span>{j.category}</span>
                    <h4>{j.title}</h4>
                    <span>{j.price}</span>
                </div>
            ))
        } */}
        
      </div>
    </section>
  )
}

export default Products

