/**
 * @description: 公共配置
 */

// 接口域名
const ENV_URL = {
  // 生产环境
  production: {
    baseURL: 'https://fyudeyinji.com'
  },
  // 测试环境
  test: {
    baseURL: 'https://test.fyudeyinji.com'
  },
  // 开发环境
  development: {
    baseURL: 'http://127.0.0.1:8001'
  }
};

const BASE_URL: string = ENV_URL[process.env.VUE_APP_ENV].baseURL;

export { BASE_URL };
