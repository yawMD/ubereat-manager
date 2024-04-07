import EditComponent from "../../components/edit-restaurant";
import dynamic from "next/dynamic";


function Store(){
    return (
        <EditComponent />
    )
}

export default dynamic (() => Promise.resolve(Store), {ssr: false})
