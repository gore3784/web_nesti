import axios from 'axios';

// ✅ Atur base URL sesuai alamat backend Laravel-mu
axios.defaults.baseURL = 'http://127.0.0.1:8000'; // ganti kalau port / domain berbeda

// ❌ Hapus ini karena kita pakai Bearer token, bukan cookies
// axios.defaults.withCredentials = true;

// ✅ Interceptor untuk otomatis kirim token Authorization
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axios;
