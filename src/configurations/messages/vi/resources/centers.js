export const centers = {
    name: 'đơn vị y tế',
    fields: {
        id: 'Mã đơn vị',
        name: 'Tên đơn vị',
        address: 'Địa chỉ',
        district: 'Quận/Huyện',
        country: 'Quốc gia',
        stateProvince: 'Tỉnh/Thành phố',
        phone: 'Số điện thoại',
        types: 'Phân loại',
        description: 'Mô tả',
        centerType: 'Phân loại',
        email: 'Email',
        organization: 'Đơn vị chủ quản',
        specialized: 'Đơn vị chuyên khoa',
        stateOwned: 'Đơn vị nhà nước'
    }
};

export const types = {
    name: 'phân loại đơn vị y tế',
    fields: {
        id: 'Mã phân loại',
        name: 'Tên phân loại',
        description: 'Mô tả'
    }
};

export const relations = {
    name: 'quan hệ',
    fields: {
        id: 'ID',
        name: 'Tên quan hệ',
        healthCenterA: 'Tên đơn vị A',
        healthCenterB: 'Tên đơn vị B',
        aisToB: 'A đối với B',
        bisToA: 'B đối với A',
        description: 'Mô tả',
        personA: 'Cá nhân A',
        personB: 'Cá nhân B',
        relationshipType: 'Tên phân loại liên kết',
        dateEnd: 'Ngày kết thúc',
        dateStart: 'Ngày bắt đầu',
        active: 'Hoạt động',
        preferred: 'Ưu tiên'
    }
};
