import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Title from "../../components/Title"
import { useApisContext } from "../../context/ApisContext"
import { Api, ApiListResponse } from "../../models/Api"
import { getApis, getCommunityApis } from "../../network/apis/apis"
import { useGet, ErrorType } from "../../network/queries/baseQuery"
import ApiItem from "../Apis/ApiItem"
import Share from "../Apis/Share"

export default () => {

    const { apis, setApis } = useApisContext()

    const [showShare, setShowShare] = useState({ show: false, url: '' })

    useGet('getCommunity', getCommunityApis(), {
        onResponse(response: ApiListResponse) {
            setApis(response.apis)
        },
        onError(error: ErrorType) {
            alert(error.message)
        }
    })

    const navigate = useNavigate()

    const onOpen = (api: Api) => {
        navigate('/community/' + api.uid)
    }

    const onShare = (api: Api) => {
        setShowShare({
            show: true,
            url: `http://${window.location.hostname}/community/${api.uid}`
        })
    }

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center">
                <Title>Community</Title>
            </div>
            <div className="grid lg:grid-cols-4 gap-3 md:grid-cols-3 sm:grid-cols-2">
                {
                    apis?.map(api => (
                        <ApiItem key={api.id} api={api} onOpen={onOpen} onShare={onShare}/>
                    ))
                }
            </div>
            <Share show={showShare.show} url={showShare.url} onClose={ () => setShowShare({ show: false, url: '' }) }/>
        </div>
    )
}