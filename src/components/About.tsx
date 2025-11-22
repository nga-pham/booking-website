const About = ({ currentPartner }) => {
    const {about, address} = currentPartner

    // gg maps link 
    const ggMapsLink = "https://www.google.com/maps/dir/?api=1&destination="

    // format address to gg maps link
    const addressToGGMaps = address.split(" ").join("+")

    return (
        <div className="text-start mt-5">
            <h3 style={{ fontWeight: 'bold' }}>About</h3>
            <p>{about}</p>
            <p>{address}. <span><a href={ggMapsLink + addressToGGMaps} target="_blank">Get Directions</a></span></p>
        </div>
    )
}

export default About