import axios from 'axios'

export default {
    namespaced: true,


    state: {
        wallet: {},
        // deposits
        deposit: [],
        // transactions
        transaction: []
    },


    getters: {
        wallet: state => state.wallet,
        deposit: state => state.deposit,
        transaction: state => state.transaction
    },


    mutations: {
        getw: (state, wallet) => {
            state.wallet = wallet
        },
        getd: (state, deposit) => {
            state.deposit = deposit
        },
        gett: (state, transaction) => {
            state.transaction = transaction
        },
        addm: (state, amount) => {
            state.wallet.amount += amount
        }
    },


    actions: {
        // get wallet
        getw: async ({ commit }, id) => {
            return axios.get(`/wallet/user/${id}`)
            .then (({ data }) => {
                commit('getw', data)
            })
        },
        // get deposits
        getd: async ({ state, commit }) => {
            return axios.get(`/wallet/deposit/wallet/id/${state.wallet.id}`)
            .then (({ data }) => {
                commit('getd', data)
            })
        },
        // transaction
        gett: async ({ state, commit }) => {
            return axios.get(`/wallet/transaction/wallet/id/${state.wallet.id}`)
            .then (({ data }) => {
                commit('gett', data)
            })
        },
        // add money
        addm: async ({ state, commit }, amount) => {
            return axios.post(`/wallet/topUp`, {
                id: state.wallet.id,
                amount: amount
            })
            .then ((response) => {
                commit('addm', amount)
                return response
            })
        }
    }
}