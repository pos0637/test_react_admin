import Request from '~/components/request';

/**
 * 获取菜单
 *
 * @export
 * @param {*} succ 成功处理函数
 * @param {*} err 错误处理函数
 * @returns
 */
export default function getMenus(succ, err) {
    return Request.get('/api/v1/system/menus').then(response => succ && succ(response.data)).catch((error) => err && err(error));
}
