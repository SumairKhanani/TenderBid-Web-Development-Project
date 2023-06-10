import React from "react";

const Herosection = () => {
  return (
    <>
      <header>
        <section className="container main-hero-container">
          <div className="row">
            <div className="col-12 col-lg-6 header-left-side d-flex justify-content-center flex-column align-items-start ">
              <h1 className="display-2">
                Online Bidding Made <br /> Easy For You.
              </h1>
              <p className="main-hero-para">
              We are on the mission of resolving a crisis for a lot of small and medium enterprises, who are looking for contractors with the least price and best quality. This platform aims to find contractors who have applied to the companies and help them understand the process and make the transition smooth. This platform is the best place where we can gather all contractors who bid on the project set by the company.
                Here at TenderBid we will offer you with great services.You can easily create tender, bid on a tender or find a good contractor.
              </p>
              <h3>   </h3>
              <div className="input-group mt-3">
                <input
                  type="text"
                  className="rounded-pill w-50  w-lg-75 me-3 p-2 form-control-text"
                  placeholder=" "
                />
                <div className="input-group-button">   </div>
              </div>
            </div>
            {/*  --------------- main header right side--------------  */}
            <div className="col-12 col-lg-6 header-right-side d-flex justify-content-center align-items-center main-herosection-images">
            
              
            </div>
          </div>
        </section>
      </header>
    </>
  );
};

export default Herosection;