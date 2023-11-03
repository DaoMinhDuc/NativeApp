export const validateEmail = (email: string): string | null => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }
    return null; 
  };
  
  export const validateFullName = (fullName: string): string | null => {
    if (!fullName) {
      return "Vui lòng nhập tên.";
    }
    return null;
  };
  
  export const validatePassword = (password: string): string | null => {
    if (!password) {
      return "Vui lòng nhập mật khẩu.";
    }
    return null;
  };
  export const validatePhoneNumber = (phoneNumber) => {
    // Kiểm tra xem phoneNumber có hợp lệ theo quy tắc nào đó không, ví dụ:
    const phoneNumberRegex = /^[0-9]{10}$/; // Đây là ví dụ regex kiểm tra xem phoneNumber có 10 chữ số hay không
    if (!phoneNumberRegex.test(phoneNumber)) {
      return "Số điện thoại phải có 10 chữ số.";
    }
    return null;
  };