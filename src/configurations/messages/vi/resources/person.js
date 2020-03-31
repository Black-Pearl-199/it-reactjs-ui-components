export const person = {
    name: 'Người dùng',
    fields: {
        fullName: 'Tên đầy đủ',
        degree: 'Trình độ',
        title: 'Danh hiệu',
        race: 'Dân tộc',
        personAddresses: 'Địa chỉ',
        birthDate: 'Ngày sinh',
        gender: 'Giới tính',
        deathDate: 'Ngày mất'
    },
    labels: {
        info: 'Thông tin người dùng',
        listUser: 'Danh sách tài khoản của người dùng này'
    }
};

export const addresses = {
    name: 'Địa chỉ',
    fields: {
        personId: 'Mã người dùng',
        address: 'Địa chỉ',
        district: 'Quận/Huyện',
        city: 'Tỉnh/Thành phố',
        country: 'Quốc gia',
        personName: 'Tên người dùng',
        preferred: 'Ưu tiên'
    }
};

export const attributes = {
    name: 'Phân loại quan hệ cá nhân',
    fields: {
        id: 'ID',
        value: 'Giá trị',
        personAttributeType: 'Phân loại thuộc tính',
        personId: 'Mã người dùng',
        fullName: 'Tên người dùng',
        name: 'Tên phân loại',
        format: 'Định dạng',
        description: 'Mô tả'
    }
};
