import { Breadcrumb } from "react-bootstrap";
interface MyBreadCrumbProps {
    isList?: boolean;
    name?: string;
}

const MyBreadCrumb = ({ isList, name }: MyBreadCrumbProps) => {
    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                {/*show different breadcrumb based on list or detail view*/}
                {isList ? <Breadcrumb.Item active>Vendors</Breadcrumb.Item> :
                    <>
                        <Breadcrumb.Item href="/results">Vendors</Breadcrumb.Item>
                        <Breadcrumb.Item active>{name}</Breadcrumb.Item>
                    </>
                }
            </Breadcrumb>
        </>
    )
}

export default MyBreadCrumb;