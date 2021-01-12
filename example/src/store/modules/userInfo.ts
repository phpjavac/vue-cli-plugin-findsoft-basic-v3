import { ActionTree, MutationTree, StoreOptions } from 'vuex';
import axios from '@/axios/api';
import { definitions } from '@/types/api';
import { message } from 'ant-design-vue';

class State {}

class UserInfo implements StoreOptions<State> {
  namespaced = true;

  state = new State();

  mutations: MutationTree<State> = {};

  actions: ActionTree<State, unknown> = {
    // 更改个人信息
    changeUserSignature(
      _: unknown,
      ChangeUserSignatureRequest: definitions['ChangeUserSignatureRequest'],
    ) {
      return new Promise((resolve, reject) => {
        axios
          .changeUserSignature(ChangeUserSignatureRequest)
          .then((res) => {
            message.success('保存个人信息成功');
            resolve(res.data.data);
          })
          .catch((err) => {
            message.info(err);
            reject(err);
          });
      });
    },
    // 修改密码
    changePassword(_: unknown, ChangePasswordRequest: definitions['ChangePasswordRequest']) {
      return new Promise((resolve, reject) => {
        axios
          .changePassword(ChangePasswordRequest)
          .then((res) => {
            message.success('密码修改成功');
            resolve(res.data.data);
          })
          .catch((err) => {
            message.error(err);
            reject(err);
          });
      });
    },
  };
}

export default new UserInfo();
