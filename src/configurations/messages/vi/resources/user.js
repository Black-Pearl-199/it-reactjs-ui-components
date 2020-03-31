export const user = {
    name: 'Tài khoản',
    fields: {
        id: 'Mã tài khoản',
        uuid: 'Mã số',
        username: 'Tên đăng nhập',
        password: 'Mật khẩu',
        firstName: 'Tên',
        middleName: 'Đệm',
        lastName: 'Họ',
        address: 'Địa chỉ',
        birthDate: 'Ngày sinh',
        gender: 'Giới tính',
        roles: 'Vai trò',
        authorities: 'Quyền',
        fullName: 'Tên đầy đủ',
        degree: 'Trình độ',
        race: 'Dân tộc',
        phoneNumber: 'Số điện thoại',
        email: 'Email',
        passwordVerify: 'Nhập lại mật khẩu',
        passwordNew: 'Mật khẩu mới',
        all: 'Tất cả',
        hint: 'Gợi ý',
        active: 'Kích hoạt'
    },
    labels: {
        changePassword: 'Đổi mật khẩu',
        chooseExistPerson: 'Hoặc chọn một người dùng có sẵn',
        info: 'Thông tin tài khoản'
    },
    actions: {
        add: 'Thêm tài khoản',
        addPerson: 'Thêm người dùng mới',
        chooseAvatar: 'Chọn Avatar'
    }
};

export const roles = {
    name: 'Chức vụ',
    fields: {
        id: 'ID',
        name: 'Tên chức vụ',
        description: 'Mô tả',
        authorities: 'Phân quyền',
        roles: 'Chức vụ',
        parentRoleIds: 'Quyền kế thừa'
    }
};

export const authorities = {
    name: 'Quyền',
    fields: {
        uuid: 'Mã quyền',
        id: 'Mã quyền',
        authority: 'Tên quyền',
        description: 'Mô tả'
    }
};
