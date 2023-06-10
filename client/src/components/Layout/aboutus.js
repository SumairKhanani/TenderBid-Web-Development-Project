import React, { useState } from "react";
import howToUseApp from "./howtouseApp";
//import Header from "../../Components/Herosection.js";
//import howToUseApp from "./API/howToUse.js";

const Aboutus = () => {
  const [aboutData ] = useState(howToUseApp);
  return (

      <section className="common-section our-services">
        <div className="container mb-5">
          <div className="row">
            <div className="col-12 col-lg-5 text-center our-service-leftside-img">
             
            </div>

            {/* 1section right side data  */}
            <div className="col-12 col-lg-7 our-services-list">
            
              <h1 className="main-heading">How to use the website?</h1>
              {aboutData.map((curElem) => {
                const { id, title, info } = curElem;
                return (
                  <>
                    <div className="row our-services-info" key={id}>
                      <div className="col-1 our-services-number">{id}</div>
                      <div className="col-10 our-services-data">
                        <h2>{title}</h2>
                        <p className="main-hero-para">{info}</p>
                      </div>
                    </div>
                  </>
                );
              })}

              <br />
         
            </div>
          </div>
        </div>
      </section>
       
        

   )
   }
    export default Aboutus;