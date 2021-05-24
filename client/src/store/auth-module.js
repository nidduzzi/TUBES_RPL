import AuthService from '../services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit,}, user) {
      return AuthService.login(user).then(
        user => {
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    adminlogin({ commit,}, admin) {
      return AuthService.adminLogin(admin).then(
        admin => {
          commit('loginSuccess', admin);
          return Promise.resolve(admin);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
    refresh({ commit, state }) {
      AuthService.refreshToken(state.user.auth[0].role).then(
        user => {
          commit('refresh', user);
          return Promise.resolve(user);
        },
        error => {
          commit('refreshFailure');
          return Promise.reject(error);
        }
      );
    }
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    refresh(state, user){
      state.status.loggedIn = true;
      state.user = user;
    },
    refreshFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    }
  }
};