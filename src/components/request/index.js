import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const Request = axios.create({
    baseURL: 'localhost:8080',
});

const Mock = new MockAdapter(Request, {
    delayResponse: 100
});

/**
 * 获取请求响应数据
 *
 * @export
 * @param {*} response 响应信息
 * @returns 响应数据
 */
export function getResponseData(response) {
    if ((!response) || (!response.data)) {
        return { data: null, message: null };
    } else if ((response.data.code !== 200) || (!response.data.data)) {
        return { data: null, message: response.data.message };
    } else {
        return { data: response.data.data, message: null };
    }
}

/**
 * 网络请求
 *
 * @export
 * @param {*} url URL地址
 * @param {*} method 方法
 * @param {*} parameters 参数
 * @param {*} resolve 成功处理函数
 * @param {*} reject 失败处理函数
 */
export function request(url, method, parameters, resolve, reject) {
    const onError = (message = null) => {
        reject && reject(message);
    }

    if (method.toLowerCase() === 'get') {
        Request.get(url, { params: parameters }).then(response => {
            const { data, message } = getResponseData(response);
            if (!data) {
                onError(message);
            } else {
                resolve && resolve(data);
            }
        }).catch(() => {
            onError();
        });
    } else if (method.toLowerCase() === 'post') {
        Request.post(url, parameters).then(response => {
            const { data, message } = getResponseData(response);
            if (!data) {
                onError(message);
            } else {
                resolve && resolve(data);
            }
        }).catch(() => {
            onError();
        });
    } else if (method.toLowerCase() === 'put') {
        Request.put(url, parameters).then(response => {
            const { data, message } = getResponseData(response);
            if (!data) {
                onError(message);
            } else {
                resolve && resolve(data);
            }
        }).catch(() => {
            onError();
        });
    } else if (method.toLowerCase() === 'delete') {
        Request.delete(url, parameters).then(response => {
            const { data, message } = getResponseData(response);
            if (!data) {
                onError(message);
            } else {
                resolve && resolve(data);
            }
        }).catch(() => {
            onError();
        });
    } else {
        onError();
    }
}

export default Request;
export { Mock };
