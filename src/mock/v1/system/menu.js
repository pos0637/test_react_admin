import { Mock } from '@/components/request';

Mock.onGet('/api/v1/system/menus').reply(200, {
    code: 200,
    data: '123'
});
