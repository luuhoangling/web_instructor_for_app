const authProvider = {
  // Gọi API login
  login: ({ username, password }) => {
    console.log('🔐 Login attempt:', username);
    const loginUrl = process.env.REACT_APP_LOGIN_ENDPOINT;
    console.log('🌐 Login URL:', loginUrl);
    
    const request = new Request(loginUrl, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    return fetch(request)
      .then(response => {
        console.log('📡 Login response status:', response.status);
        console.log('📡 Login response headers:', response.headers);
        
        // Xử lý các mã lỗi HTTP khác nhau
        if (response.status === 401) {
          throw new Error('Tài khoản hoặc mật khẩu không đúng');
        }
        if (response.status === 403) {
          throw new Error('Bạn không có quyền truy cập vào hệ thống này');
        }
        if (response.status === 404) {
          throw new Error('Không thể kết nối đến server. Vui lòng thử lại sau');
        }
        if (response.status === 429) {
          throw new Error('Quá nhiều lần đăng nhập. Vui lòng thử lại sau');
        }
        if (response.status >= 500) {
          throw new Error('Lỗi server nội bộ. Vui lòng liên hệ quản trị viên');
        }
        if (response.status < 200 || response.status >= 300) {
          throw new Error(`Lỗi không xác định (${response.status})`);
        }
        
        // Kiểm tra content-type
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Server trả về dữ liệu không hợp lệ');
        }
        
        return response.json();
      })
      .then((data) => {
        console.log('👤 Login response data:', data);
        
        const { token, user, message } = data;
        
        // Kiểm tra cấu trúc dữ liệu trả về
        if (!token) {
          throw new Error('Server không trả về token xác thực');
        }
        if (!user) {
          throw new Error('Server không trả về thông tin người dùng');
        }
        
        console.log('👤 User data:', user);
        console.log('🔍 is_instructor value:', user.is_instructor);
        console.log('🔍 is_instructor type:', typeof user.is_instructor);
        
        // Hiển thị thông báo từ server trước khi kiểm tra quyền
        if (message) {
          console.log('💬 Server message:', message);
        }
        
        // Kiểm tra quyền instructor
        if (user.is_instructor === undefined || user.is_instructor === null) {
          console.log('⚠️ is_instructor field is missing from API response');
          throw new Error('Thông tin quyền người dùng không đầy đủ');
        } else if (user.is_instructor === false || user.is_instructor === 0 || user.is_instructor === '0') {
          console.log('❌ User is not an instructor');
          console.log('💬 Login attempt message:', message || 'Đăng nhập thành công với tư cách học viên');
          throw new Error('Chỉ tài khoản giảng viên mới có quyền truy cập hệ thống này. Bạn đã đăng nhập với tư cách học viên nhưng không có quyền sử dụng hệ thống quản lý này.');
        }
        
        // Lưu thông tin vào localStorage (chỉ cho instructor)
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        console.log('✅ Instructor login successful, data saved');
        console.log('💬 Welcome message:', message || 'Đăng nhập thành công với tư cách giảng viên');
        return Promise.resolve();
      })
      .catch((error) => {
        console.error('❌ Login error:', error);
        
        // Xử lý lỗi network
        if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
          throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối internet');
        }
        
        // Xử lý timeout
        if (error.name === 'AbortError') {
          throw new Error('Kết nối quá chậm. Vui lòng thử lại');
        }
        
        // Ném lại lỗi đã được xử lý
        throw error;
      });
  },

  // Kiểm tra khi logout
  logout: () => {
    console.log('🚪 Logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return Promise.resolve();
  },

  // Kiểm tra authentication khi load page
  checkAuth: () => {
    console.log('🔍 Check auth');
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (!token || !user) {
      console.log('❌ No token or user data found');
      return Promise.reject(new Error('Chưa đăng nhập'));
    }

    try {
      const userData = JSON.parse(user);
      
      // Kiểm tra tính hợp lệ của dữ liệu user
      if (!userData.id) {
        console.log('❌ Invalid user data');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return Promise.reject(new Error('Dữ liệu người dùng không hợp lệ'));
      }
      
      // Kiểm tra quyền instructor
      if (userData.is_instructor === undefined || userData.is_instructor === null) {
        console.log('❌ is_instructor field is missing');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return Promise.reject(new Error('Thông tin quyền người dùng không đầy đủ'));
      } else if (userData.is_instructor === false || userData.is_instructor === 0 || userData.is_instructor === '0') {
        console.log('❌ User is not an instructor');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return Promise.reject(new Error('Không có quyền truy cập - chỉ dành cho giảng viên'));
      }

      console.log('✅ Auth check passed');
      return Promise.resolve();
    } catch (error) {
      console.log('❌ Error parsing user data:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return Promise.reject(new Error('Dữ liệu xác thực không hợp lệ'));
    }
  },

  // Kiểm tra lỗi authentication
  checkError: (error) => {
    console.log('⚠️ Check error:', error.status);
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return Promise.reject();
    }
    return Promise.resolve();
  },

  // Lấy thông tin user
  getIdentity: () => {
    console.log('👤 Get identity');
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        return Promise.reject(new Error('Không tìm thấy thông tin người dùng'));
      }

      const user = JSON.parse(userStr);
      if (!user.id) {
        return Promise.reject(new Error('Thông tin người dùng không hợp lệ'));
      }

      return Promise.resolve({
        id: user.id,
        fullName: user.full_name || user.username || 'Người dùng',
        avatar: user.avatar_url || user.avatar,
        email: user.email,
        role: user.is_instructor ? 'Giảng viên' : 'Người dùng'
      });
    } catch (error) {
      console.error('❌ Error getting identity:', error);
      return Promise.reject(new Error('Lỗi khi lấy thông tin người dùng'));
    }
  },

  // Kiểm tra quyền (tất cả instructor đều có quyền như nhau)
  getPermissions: () => {
    console.log('🔐 Get permissions');
    return Promise.resolve('instructor');
  },
};

export default authProvider;
