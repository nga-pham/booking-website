
import { useEffect, useState } from 'react';
import { TabPane, Tabs } from "react-bootstrap";
import { chosenServiceProps } from "./ui/Interfaces";
import ServiceCard from "./ui/ServiceCard";

interface ServiceTabsProps {
    services: any[] | [],
    isBookingPage: boolean | false,
    sendDataToBookingPage?: (savedService: chosenServiceProps, removedService: chosenServiceProps) => void   // only in booking page
}

const ServiceTabs = ({ services, isBookingPage, sendDataToBookingPage }: ServiceTabsProps) => {
    //For displaying featured servicess
    let featuredServices: any[] = services.flatMap(serviceType => serviceType.items.filter(item => item.featured));

    // For get chosen service from card and send to parent
    const [chosenService, setChosenService] = useState<chosenServiceProps>(undefined)
    const [removedService, setRemovedService] = useState<chosenServiceProps>(undefined)
    const getChosenServiceFromCard = (chosenService: chosenServiceProps, removedService: chosenServiceProps) => {
        setChosenService(chosenService)
        setRemovedService(removedService)
    }

    if (sendDataToBookingPage) {
        useEffect(
            () => {
            sendDataToBookingPage(chosenService, removedService)
            }, [chosenService, removedService]
        )
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