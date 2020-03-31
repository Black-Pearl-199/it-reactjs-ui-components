export const groups = {
    name: 'Nhóm',
    fields: {
        name: 'Tên nhóm',
        description: 'Mô tả',
        provider: 'Tên nhà chuẩn đoán'
    }

};

export const radiologists = {
    name: 'Bác sĩ chẩn đoán',
    fields: {
        fullName: 'Tên',
        workPhone: 'Số điện thoại',
        workEmail: 'Email',
        nameGroup: 'Tên nhóm',
        specialization: 'Chuyên môn hóa',
        title: 'Chủ đề'
    }
};

export const members = {
    name: 'Thành viên',
    fields: {
        roleId: 'Quyền',
        group: 'Nhóm',
        radiologist: 'Bác sĩ chẩn đoán'
    }
};
