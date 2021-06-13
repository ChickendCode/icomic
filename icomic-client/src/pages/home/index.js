import { useDispatch, useSelector } from "react-redux"
import StoriesList from "../../global/List"
import Collection1 from "./Collection1"
import Collection2 from "./Collection2"
import { useEffect } from "react"
import { getAllStoriesAsync } from "../../redux/actions/stories.action"



const Home = () => {
    const { stories } = useSelector(state => state.stories)
    const completed = stories.filter(x => x.isCompleted)
    const dispatch = useDispatch()

  

    useEffect(() => {
        dispatch(getAllStoriesAsync({ sort: '-createdAt', page: -1 }, true))
    }, [dispatch])

    return (
        <div id='home'>
            <div className='home-container' >
                <div className="container-fluid">
                </div>
                <div className='container' >
                    <Collection1 />
                    <Collection2 />
                    <div className='comleted-list'>
                        <h5 data-aos="fade-up" className="aaaa" style={{ marginBottom: -5, marginTop: 32, fontWeight: 'bold', color: 'var(--primary-color-2)' }} >
                            Truyện đã hoàn thành
                        </h5>
                        <StoriesList stories={completed} />
                    </div >
                </div>
            </div>
        </div>
    )
}

export default Home