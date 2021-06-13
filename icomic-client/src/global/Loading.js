import { useEffect } from "react"
import { useSelector } from "react-redux"

const Loading = () => {
  const loading = useSelector(state => state.web.loading)
  
  useEffect(() => {
    if (loading) {
      // document.body.style.overflow = 'hidden'
      window.scrollTo({
        top: 0,
        behavior: "auto"
      })
    } else {
      // document.body.style.overflow = 'unset'
    }
  }, [loading])

  return (
    <>
      {
        loading &&
        <div id='loading'>
          <img src='/images/loading.gif' />
        </div>
        ||
        null
      }
    </>
  )
}

export default Loading