import { useAuth } from "../store/auth"

export const Service = () =>{
    const {services} = useAuth();
    console.log(services);

    return (
        <section className = "section-services">
            <div className="container service">
                <div></div>
                <h1 className="main-heading service-heading" >Services</h1>
                <div></div>
            </div>
            <div className="container grid grid-three-cols">
                {services.map((serElem,index)=>{
                    return(
                        <div className="card" key={index}>
                            <div className="card-img">
                                <img src="/images/design.png" alt="images" width="100" height="200" />
                            </div>
                            <div className="card-details">
                                <div className="grid grid-two-cols">
                                    <p>{serElem.provider}</p>
                                    <p>{serElem.price}</p>
                                </div>
                                <h2>{serElem.service}</h2>
                                <p>{serElem.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};