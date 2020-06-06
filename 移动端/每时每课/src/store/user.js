export default {
    state: {
        userInfo: {},
        courseSearch: []
    },
    mutations: {
        setUserInfo(state, val) {
            state.userInfo = val
            console.log(val)
        },
        quitLogin(state) {
            state.userInfo.remember_token = ""

        },
        courseSearch(state, val) {
            var index = state.courseSearch.findIndex((v, i, arr) => {
                return v == val
            })
            if (index == -1) {
                state.courseSearch.unshift(val)

            }


        },
        delCourseSearch(state) {
            state.courseSearch = []
        }
    }
}