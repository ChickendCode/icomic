const initState = {
  stories: [],
  totalStories: 0,
  storyPage: {}
}

const storiesReducer = (state = initState, action) => {
  const { payload, type } = action
  switch (type) {
    case "GET_ALL_STORIES": {
      return {
        ...state,
        stories: payload.stories,
        storyPage: payload.storyPage,
        totalStories: payload.totalStories,
      }
    }

    case "CREATE_ONE_STORY": {
      const { stories } = state

      return {
        ...state,
        stories: [
          ...stories,
          payload
        ]
      }
    }

    case "UPDATE_ONE_STORY": {
      const { stories } = state
      const { newStory, index } = payload
      let newStories = [
        ...stories.slice(0, index),
        newStory,
        ...stories.slice(index + 1)
      ]

      return {
        ...state,
        stories: newStories
      }
    }

    case "DELETE_ONE_STORY": {
      const { stories } = state
      let newStories = stories.filter(x => x._id !== payload)

      return {
        ...state,
        stories: newStories
      }
    }
  }

  return state

}

export default storiesReducer