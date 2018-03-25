import { createArticle, fetchList } from '@/api/article'
import { getToken, setToken, removeToken } from '@/utils/auth'

const article = {
        state: {
                token: getToken(),
                title: '',
                content: '',
                articleList: []
        },

        mutations: {
                ADD_ARTICLE: (state) => {

                        console.log(state)
                }
        },

        actions: {
                AddArticle({ commit }, addParam) {
                        return new Promise((resolve, reject) => {
                                createArticle(addParam).then(response => {
                                        const data = response
                                        if(data.data.status == 0) {
                                                commit('ADD_ARTICLE')
                                        }
                                        //setToken(data.token)
                                        // 提交到mutations
                                        
                                        resolve(data.data)
                                }).catch(error => {
                                        reject(error)
                                })
                        })
                }
        }
}

export default article
