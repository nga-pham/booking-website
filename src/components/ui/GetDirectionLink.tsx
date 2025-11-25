const GetDirectionLink = ({address}) => {
    // gg maps link 
    const ggMapsLink = "https://www.google.com/maps/dir/?api=1&destination="

    // format address to gg maps link
    const addressToGGMaps = address.split(" ").join("+")

    return <span><a href={ggMapsLink + addressToGGMaps} target="_blank">Get Directions</a></span>
} 

export default GetDirectionLink