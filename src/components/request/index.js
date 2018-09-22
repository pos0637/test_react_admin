import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const Request = axios.create({
    baseURL: 'localhost:8080',
});

const Mock = new MockAdapter(Request, {
    delayResponse: 100
});

/**
 * 获取表格数据
 *
 * @export
 * @param {*} response 响应信息
 * @returns 表格数据
 */
export function getTableData(response) {
    if ((!response) || (!response.data) || (response.data.code !== 200) || (!response.data.data)) {
        return null;
    } else {
        return response.data.data;
    }
}

export default Request;
export { Mock };
