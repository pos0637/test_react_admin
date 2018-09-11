import axios from 'axios';

/**
 * 获取菜单
 *
 * @export
 * @param {*} succ 成功处理函数
 * @param {*} err 错误处理函数
 * @returns
 */
export function getMenus(succ, err) {
    return axios.get("").then((response) => succ(response.data)).catch((error) => err(error));
}
