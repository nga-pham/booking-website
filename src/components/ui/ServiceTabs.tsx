import { TabPane, Tabs } from "react-bootstrap";
import ServiceCard from "./ServiceCard";

const ServiceTabs = ({ services }) => {
    //For services displayed
    let featuredServices: any[] = []
    services.map(skill => {
        skill.items.map(item => {
            if (item.featured) featuredServices.push(item)
        })
    })

    return (
        <>
            <h3 style={{ fontWeight: 'bold' }}>Services</h3>
            <Tabs defaultActiveKey="home" fill>
                {/*featured tab here*/}
                <TabPane eventKey="featured" title="Featured">
                    {featuredServices.map((item, _idx) => (
                        <ServiceCard
                            id={_idx}
                            name={item.name}
                            duration={item.duration}
                            cost={item.cost}
                        />
                    ))}
                </TabPane>
                {services.map(skill => (
                    <TabPane eventKey={skill.type} title={skill.type}>
                        {skill.items.map((item, _idx) => (
                            <ServiceCard
                                id={_idx}
                                name={item.name}
                                duration={item.duration}
                                cost={item.cost}
                            />
                        ))}
                    </TabPane>
                ))}
            </Tabs>

        </>
    )
}

export default ServiceTabs