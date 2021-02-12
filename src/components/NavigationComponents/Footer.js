import React from "react";


const Footer = () => {

    return(
        <React.Fragment>
            <footer class="bg-light text-center text-lg-start">
                <div class="container p-4">
                    <div class="row">
                    <div class="col-lg-6 col-md-12 mb-4 mb-md-0">
                        <h5 class="text-uppercase">About us</h5>
                        <p>
                        Jobify is the newest job platform specialized in tech jobs.
                        Here you will find all most wanted jobs!
                        </p>
                    </div>
               
                    <div class="col-lg-6 col-md-12 mb-4 mb-md-0">
                    <h5 class="text-uppercase">Find your Dream Job</h5>
                        <p>
                        We have become a reference in the Recruitment Industry by 
                        publishing only Job Offers at more than 3000€ per month.
                        </p>
                    </div>
        
                    </div>
            
                </div>

                <div class="text-center p-3" style={{backgroundColor: "#eefcff"}}>
                    © 2021  
                    <a class="text-dark" href="/#"> Brogrammers Team</a>
                </div>
                </footer>
        </React.Fragment>
    )

};

export default Footer