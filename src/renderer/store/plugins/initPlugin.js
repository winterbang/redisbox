// import db from '@/datastore'
// import Store from 'electron-store'
// const eledb = new Store({name: 'vuex'})

const initPlugin = store => {
  // console.log(store)
  store.subscribe((mutation, state) => {
    // 每次 mutation 之后调用
    // mutation 的格式为 { type, payload }
    // console.log(mutation.type)
    // console.log(mutation.payload)
    // console.log(state.connections)
    // console.log(eledb.get('state'))
    // console.log(state)
  })
  // db.find({}, (err, docs) => {
  //   console.log('store/plugins')
  //   console.log(err)
  //   console.log(docs)
  //   store.dispatch('syncConnections', docs)
  // })
}

export default initPlugin
