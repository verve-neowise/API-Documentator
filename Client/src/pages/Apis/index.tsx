import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "../../components/Button"
import Title from "../../components/Title"
import { useApisContext } from "../../context/ApisContext"
import { useApiDialog, ApiDialog } from "../../dialogs/ApiDialog"
import { Api, ApiListResponse } from "../../models/Api"
import { getApis } from "../../network/apis/apis"
import { useGet, ErrorType } from "../../network/queries/baseQuery"
import ApiItem from "./ApiItem"
import Share from "./Share"

export default () => {

    const { apis, setApis, deleteApi } = useApisContext()

    const { changeVisiblity } = useApiDialog()

    const [showShare, setShowShare] = useState({ show: false, url: '' })

    useGet('getApis', getApis(), {
        onResponse(response: ApiListResponse) {
            setApis(response.apis)
        },
        onError(error: ErrorType) {
            alert(error.message)
        }
    })


    const navigate = useNavigate()

    const onDelete = (api: Api) => {
        deleteApi(api)
    }

    const onOpen = (api: Api) => {
        navigate('/apis/' + api.uid)
    }

    const onShare = (api: Api) => {
        setShowShare({
            show: true,
            url: `http://${window.location.hostname}/apis/${api.uid}`
        })
    }

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center">
                <Title>Api List</Title>
                <Button size="sm" onClick={() => changeVisiblity(true)}> Create API </Button>
            </div>
            <div className="grid lg:grid-cols-4 gap-3 md:grid-cols-3 sm:grid-cols-2">
                {
                    apis?.map(api => (
                        <ApiItem key={api.id} api={api} onOpen={onOpen} onShare={onShare} onDelete={onDelete}/>
                    ))
                }
            </div>
            <Share show={showShare.show} url={showShare.url} onClose={ () => setShowShare({ show: false, url: '' }) }/>
            <ApiDialog/>
        </div>
    )
}