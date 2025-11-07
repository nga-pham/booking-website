import { TabPane, Tabs } from "react-bootstrap";
import ServiceCard from "./ServiceCard";
import { useState, useEffect } from 'react'

interface ServiceTabsProps {
    services: any[] | [],
    isBookingPage: boolean | false,
    sendDataToBookingPage?: (any) => void   // only in booking page
}

const ServiceTabs = ({ services, isBookingPage, sendDataToBookingPage }: ServiceTabsProps) => {
    //For services displayed
    let featuredServices: any[] = []
    services.map(skill => {
        skill.items.map(item => {
            if (item.featured) featuredServices.push(item)
        })
    })

    // For get chosen service from card and send to parent
    const [chosenService, setChosenService] = useState<string>(undefined)
    const getChosenServiceFromCard = (service) => {
        setChosenService(service)
    }

    if (sendDataToBookingPage) {
        useEffect(() => {
            sendDataToBookingPage(chosenService)
        }, [chosenService])
    }

    return (
        <div className="text-start mt-5">
            <h3 style={{ fontWeight: 'bold'}}>Services</h3>
            <Tabs defaultActiveKey="home" fill>
                {/*featured tab here*/}
                <TabPane eventKey="featured" title="Featured">
                    {featuredServices.map((item, _idx) => (
                        <ServiceCard
                            id={_idx}
                            name={item.name}
                            duration={item.duration}
                            cost={item.cost}
                            isBookingPage={isBookingPage}
                            sendDataToTabs={getChosenServiceFromCard}
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
                                isBookingPage={isBookingPage}
                                sendDataToTabs={getChosenServiceFromCard}

                            />
                        ))}
                    </TabPane>
                ))}
            </Tabs>

        </div>
    )
}

export default ServiceTabs