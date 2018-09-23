import { Mock } from '@/components/request';

Mock.onGet('/api/v1/system/modules').reply(200, {
    code: 201,
    data: [{
        id: 0,
        name: '123'
    }, {
        id: 1,
        name: '223'
    }, {
        id: 2,
        name: '223'
    }, {
        id: 3,
        name: '223'
    }, {
        id: 4,
        name: '223'
    }, {
        id: 5,
        name: '223'
    }, {
        id: 6,
        name: '223'
    }, {
        id: 7,
        name: '223'
    }, {
        id: 8,
        name: '223'
    }, {
        id: 9,
        name: '223'
    }, {
        id: 10,
        name: '223'
    }, {
        id: 11,
        name: '223'
    }, {
        id: 12,
        name: '223'
    }]
});
