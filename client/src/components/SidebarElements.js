import {Link} from "react-router-dom";

const componentWithRoutes = [
    {
        to: '/',
        text: 'Table',
        icon: 'pi pi-table p-mr-2'
    }
]

function SidebarElements() {
    return (
        <div>
            {componentWithRoutes.map((x, i) => {
                return (
                    <p className="p-m-2 p-d-flex p-flex-row p-text-bold p-mb-2 text-3 p-ai-center p-p-3 pointer" key={i}>
                        <Link to={x.to}><i className={x.icon} /> {x.text}</Link>
                    </p>
                )
            })}
        </div>
    )
}

export default SidebarElements;