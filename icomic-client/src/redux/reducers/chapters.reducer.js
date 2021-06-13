const initState = {
  chapters: [],
  totalChapters: 0,
  chapterPage: {}
}

const chaptersReducer = (state = initState, action) => {
  const { payload, type } = action
  switch (type) {
    case "GET_ALL_CHAPTERS": {
      return {
        ...state,
        chapters: payload.chapters,
        chapterPage: payload.chapterPage,
      }
    }

    case "CREATE_ONE_CHAPTER": {
      const { chapters } = state

      return {
        ...state,
        chapters: [
          ...chapters,
          payload
        ]
      }
    }

    case "UPDATE_ONE_CHAPTER": {
      const { chapters } = state
      const { newChapter, index } = payload
      let newChapters = [
        ...chapters.slice(0, index),
        newChapter,
        ...chapters.slice(index + 1)
      ]

      return {
        ...state,
        chapters: newChapters
      }
    }

    case "DELETE_ONE_STORY": {
      const { chapters } = state
      let newChapters = chapters.filter(x => x._id !== payload)

      return {
        ...state,
        chapters: newChapters
      }
    }
  }

  return state
}

export default chaptersReducer