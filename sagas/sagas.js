import { put, call, takeEvery } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { Facebook } from 'expo'
import { GET_USER, SET_USER, TOGGLE_LOGGED } from '../redux/user'

const fetchProfile = (token) => {
  console.log(`https://graph.facebook.com/me?access_token=${token}`)
  return fetch(`https://graph.facebook.com/me?access_token=${token}`)
}

const responseJSON = (response) => {
  return response.json()
}

const fetchProfilePicture = (fbid) => {
  console.log(`http://graph.facebook.com/${fbid}/picture?redirect=0&type=large`)
  return fetch(`http://graph.facebook.com/${fbid}/picture?redirect=0&type=large`)
}

const fetchUserSaga = function * fetchUserSaga(action) {
  
  try {
    const responseProfile = yield call(fetchProfile, action.token)
    //console.log(responseProfile)
    const user = yield call(responseJSON, responseProfile)
    const responseProfilePicture = yield call(fetchProfilePicture, user.id)
    //console.log(responseProfilePicture)
    const picture = yield call(responseJSON, responseProfilePicture)
    console.log(picture.data.url)

    yield put({
      type: SET_USER,
      user: {
        id: user.id,
        name: user.name,
        picture: picture.data.url,
        money: 0,
      }
    })

    yield put({
      type: TOGGLE_LOGGED
    })

    action.navigation.navigate('Main')

  } catch(e) {
    console.log('fetchUserSaga error: ' + e)
    throw e
  }
}

const dataSaga = function * dataSaga(){
  yield takeEvery(GET_USER, fetchUserSaga)
}

export default dataSaga