export const page = {
    login: {
        label: {
            username: 'Tên đăng nhập',
            password: 'Mật khẩu',
            remember: 'Duy trì đăng nhập'
        },
        button: {
            login: 'Đăng nhập',
            register: 'Đăng kí'
        },
        text: {
            formTitle: 'iPACS Operation Portal',
            formFooter: 'Bản quyền thuộc về © 2019 iTech Solution.\nLiên hệ: info@itechcorp.com.vn - Điện thoại: 024.7300.8698',
            forgetPassword: 'Quên mật khẩu',
            currentLogin: 'Bạn đang đăng nhập vào tài khoản'
        }
    },
    resource: {
        title: {
            list: 'Quản lý tài nguyên hệ thống',
            edit: 'Sửa tài nguyên hệ thống',
            create: 'Tạo tài nguyên hệ thống'
        },
        notification: {
            delete: {
                confirm: 'Bạn có chắc chắn xóa tài nguyên %{resource_name} này không?',
                success: 'Xóa tài nguyên thành công',
                failure: 'Xóa tài nguyên thất bại'
            },
            create: {
                duplicated: 'Tài nguyên bạn tạo đã tồn tại!'
            }
        }
    },
    application: {
        title: {
            list: 'Quản lý ứng dụng',
            create: 'Thêm mới ứng dụng',
            edit: 'Thay đổi ứng dụng',
            info: 'Thông tin ứng dụng'
        }
    },
    // user: {
    //     authority: {
    //         title: {
    //             list: 'Quản lý phân quyền',
    //             eidt: 'Sửa phân quyền hệ thống',
    //             create: 'Thêm phân quyền hệ thống'
    //         }
    //     },
    //     role: {
    //         title: {
    //             list: 'Quản lý vai trò',
    //             edit: 'Sửa mới vai trò',
    //             create: 'Thêm mới vai trò'
    //         }
    //     },
    //     user_info: {
    //         title: {
    //             list: 'Quản lý thông tin người dùng',
    //             info: 'Thông tin người dùng',
    //             edit: 'Thay đổi thông tin người dùng',
    //             create: 'Thêm thông tin người dùng'
    //         }
    //     },
    //     account: {
    //         title: {
    //             list: 'Quản lý tài khoản',
    //             edit: 'Sửa đổi tài khoản',
    //             create: 'Thêm tài khoản'
    //         }
    //     }
    // },
    // study: {
    //     title: {
    //         list: 'Danh sách ca chụp',
    //     },
    //     label: {
    //         source: 'Nguồn',
    //         fromDate: 'Từ',
    //         toDate: 'Đến',
    //         report: 'Báo cáo',
    //         images: 'Ảnh'
    //     }
    // },
    user: {
        title: {
            list: 'Quản lý tài khoản',
            edit: 'Chỉnh sửa tài khoản',
            create: 'Thêm tài khoản'
        },
        filter: {
            name: 'Tìm theo tên',
            role: 'Tìm theo chức vụ',
            includeDisableUser: 'Bao gồm các tài khoản đã khóa'
        },
        text: {
            userInfo: 'Thông tin tài khoản',
            loginInfo: 'Thông tin đăng nhập',
            demographicInfo: 'Thông tin cá nhân'
        },
        notification: {
            duplicateUsername: 'Tên đăng nhập đã tồn tại. Vui lòng chọn tên đăng nhập khác',
            create: {
                success: 'Thêm tài khoản mới thành công',
                failure: 'Không thể thêm tài khoản. Vui lòng thử lại hoặc liên hệ quản trị viên.'
            },
            update: {
                success: 'Cập nhật thông tin tài khoản thành công',
                failure: 'Không thể chỉnh sửa thông tin tài khoản. Vui lòng thử lại hoặc liên hệ quản trị viên.'
            },
            delete: {
                confirm: 'Bạn có chắc chắn muốn xóa tài khoản này?',
                success: 'Cập nhật thông tin tài khoản thành công',
                failure: 'Không thể chỉnh sửa thông tin tài khoản. Vui lòng thử lại hoặc liên hệ quản trị viên.'
            },
            changePassword: {
                confirm: 'Bạn có chắc chắn muốn thay đổi mật khẩu của tài khoản này?',
                success: 'Cập nhật mật khẩu thành công',
                failure: 'Không thể thay đổi mật khẩu. Vui lòng thử lại hoặc liên hệ quản trị viên.'
            },
            goToCreatePage: {
                confirm: 'Tạo tài khoản từ người dùng %{personName}?',
                notChoosePerson: 'Bạn chưa chọn người dùng nào! Hãy chọn một người dùng hoặc thêm người dùng mới'
            },
            updateAvatar: {
                success: 'Cập nhật avatar thành công',
                failure: 'Không thể thay đổi . Vui lòng thử lại hoặc liên hệ quản trị viên.',
                overUpload: 'Kích cỡ ảnh vượt quá mức cho phép'
            }
        }
    },
    role: {
        title: {
            list: 'Quản lý vai trò',
            edit: 'Sửa mới vai trò',
            create: 'Thêm mới vai trò'
        },
        notification: {
            create: {
                duplicated: 'Mã vai trò bị trùng',
                success: 'Thêm phân quyền mới thành công',
                failure: 'Không thể thêm phân quyền mới. Vui lòng thử lại hoặc liên hệ quản trị viên.'
            },
            update: {
                confirm: 'Bạn có chắc chắn muốn cập nhật thông tin phân quyền này?',
                success: 'Cập nhật thông tin phân quyền thành công',
                failure: 'Không thể chỉnh sửa thông tin phân quyền. Vui lòng thử lại hoặc liên hệ quản trị viên.'
            },
            delete: {
                confirm: 'Bạn có chắc chắn muốn xóa thông tin phân quyền này?',
                success: 'Xóa thông tin phân quyền thành công',
                failure: 'Không thể xóa thông tin phân quyền. Vui lòng thử lại hoặc liên hệ quản trị viên.'
            }
        }
    },
    authority: {
        title: {
            list: 'Danh sách quyền',
            edit: 'Chỉnh sửa quyền',
            create: 'Thêm quyền'
        },
        notification: {
            delete: {
                before: 'Bạn có chắc chắn muốn xóa quyền %{authorityName} này không?',
                success: 'Xóa thành công!',
                failure: 'Xóa thất bại'
            },
            create: {
                duplicated: 'Phân quyền bạn tạo đã tồn tại!'
            }
        }
    },

    clients: {
        title: {
            list: 'Quản lý ứng dụng',
            edit: 'Chỉnh sửa ứng dụng',
            create: 'Thêm ứng dụng'
        },

        filter: {
            name: 'Tìm theo tên',
            scope: 'Tìm theo phạm vi',
            includeDisableUser: 'Bao gồm các tài khoản đã khóa'
        },
        notification: {
            duplicateClientname: 'Tên đăng nhập đã tồn tại. Vui lòng chọn tên đăng nhập khác',
            create: {
                duplicated: 'Mã ứng dụng bị trùng!',
                success: 'Thêm ứng dụng mới thành công',
                failure: 'Không thể thêm ứng dụng mới. Vui lòng thử lại hoặc liên hệ quản trị viên.'
            },
            update: {
                confirm: 'Bạn có chắc chắn muốn cập nhật thông tin ứng dụng này?',
                success: 'Cập nhật thông tin ứng dụng thành công',
                failure: 'Không thể chỉnh sửa thông tin ứng dụng. Vui lòng thử lại hoặc liên hệ quản trị viên.'
            },
            delete: {
                confirm: 'Bạn có chắc chắn muốn xóa thông tin ứng dụng này?',
                success: 'Xóa thông tin ứng dụng thành công',
                failure: 'Không thể xóa thông tin ứng dụng. Vui lòng thử lại hoặc liên hệ quản trị viên.'
            }
        }
    },

    persons: {
        title: {
            list: 'Quản lý người dùng',
            edit: 'Chỉnh sửa người dùng',
            create: 'Thêm người dùng'
        },

        filter: {
            name: 'Tìm theo tên',
            address: 'Tìm theo địa chỉ'
        },
        notification: {
            duplicatePerson: 'Người dùng đã tồn tại. Vui lòng chỉnh sửa lại',
            create: {
                success: 'Thêm người dùng mới thành công',
                failure: 'Không thể thêm người dùng mới. Vui lòng thử lại hoặc liên hệ quản trị viên.'
            },
            update: {
                success: 'Cập nhật thông tin người dùng thành công',
                failure: 'Không thể chỉnh sửa thông tin người dùng. Vui lòng thử lại hoặc liên hệ quản trị viên.'
            },
            delete: {
                confirm: 'Bạn có chắc chắn muốn xóa người dùng này?',
                success: 'Xóa người dùng thành công',
                failure: 'Không thể chỉnh xóa người dùng này. Vui lòng thử lại hoặc liên hệ quản trị viên.'
            }
        }
    },

    attributes: {
        title: {
            list: 'Quản lý phân loại quan hệ',
            edit: 'Chỉnh sửa phân loại quan hệ',
            create: 'Thêm phân loại quan hệ'
        },

        text: {
            attributeTypes: 'Thông tin loại quan hệ'
        },

        filter: {
            name: 'Tìm theo tên'
        },
        notification: {
            create: {
                success: 'Thêm phân loại thành công',
                failure: 'Không thể thêm phân loại mới. Vui lòng thử lại hoặc liên hệ quản trị viên.'
            },
            update: {
                success: 'Cập nhật phân loại thành công',
                failure: 'Không thể chỉnh sửa phân loại. Vui lòng thử lại hoặc liên hệ quản trị viên.'
            }
        }
    },

    relation_person: {
        title: {
            list: 'Quản lý quan hệ cá nhân',
            edit: 'Chỉnh sửa quan hệ cá nhân',
            create: 'Thêm quan hệ cá nhân'
        },

        text: {
            relationTypes: 'Phân loại quan hệ cá nhân'
        },

        filter: {
            name: 'Tìm theo tên',
            includeDisableUser: 'Bao gồm các đơn vị đã khóa'
        },
        notification: {
            create: {
                success: 'Thêm quan hệ cá nhân mới thành công',
                failure: 'Không thể thêm quan hệ cá nhân mới. Vui lòng thử lại hoặc liên hệ quản trị viên.'
            },
            update: {
                success: 'Cập nhật thông tin quan hệ cá nhân thành công',
                failure: 'Không thể chỉnh sửa thông tin quan hệ cá nhân. Vui lòng thử lại hoặc liên hệ quản trị viên.'
            }
        }
    },


    centers: {
        title: {
            list: 'Quản lý đơn vị y tế',
            edit: 'Chỉnh sửa đơn vị y tế',
            create: 'Thêm đơn vị y tế',
            show: 'Thông tin đơn vị y tế'
        },

        filter: {
            name: 'Tìm theo tên',
            includeDisableUser: 'Bao gồm các đơn vị đã khóa'
        }
        // notification: {
        //     duplicateId: 'Mã đơn vị ý tế đã tồn tại. Vui lòng tạo mã khác',
        //     accept: 'Bạn có chắc chắn thêm đơn vị ý tế mới không',
        //     edit: 'Bạn có chắc chắn sửa đơn vị ý tế không',
        //     create: {
        //         success: '%{resourceName} đã được thêm',
        //         failure: 'Không thể thêm đơn vị y tế mới. Vui lòng thử lại hoặc liên hệ quản trị viên.'
        //     },
        //     update: {
        //         success: '%{resourceName} đã được cập nhật',
        //         failure: 'Không thể chỉnh sửa thông tin đơn vị y tế. Vui lòng thử lại hoặc liên hệ quản trị viên.'
        //     }
        // }
    },

    types: {
        title: {
            list: 'Quản lý phân loại đơn vị y tế',
            create: 'Thêm phân loại đơn vị y tế',
            edit: 'Thông tin phân loại đơn vị y tế'
        }
    },

    relations: {
        title: {
            list: 'Quản lý liên kết đơn vị y tế',
            edit: 'Thông tin liên kết đơn vị y tế',
            create: 'Thêm liên kết đơn vị y tế'
        },

        text: {
            relationTypes: 'Phân loại liên kết'
        },

        filter: {
            name: 'Tìm theo tên'
        }
        // notification: {
        //     create: {
        //         success: 'Thêm liên kết đơn vị y tế mới thành công',
        //         failure: 'Không thể thêm liên kết đơn vị y tế mới. Vui lòng thử lại hoặc liên hệ quản trị viên.'
        //     },
        //     update: {
        //         success: 'Cập nhật thông tin liên kết đơn vị y tế thành công',
        //         failure: 'Không thể chỉnh sửa thông tin liên kết đơn vị y tế. Vui lòng thử lại hoặc liên hệ quản trị viên.'
        //     }
        // }
    },

    relation_type_center: {
        title: {
            list: 'Quản lý phân loại liên kế ',
            edit: 'Thông tin phân loại liên kế ',
            create: 'Thêm phân loại liên kế '
        }


        // notification: {
        //     create: {
        //         success: 'Thêm phân loại liên kế  mới thành công',
        //         failure: 'Không thể phân loại liên kế  mới. Vui lòng thử lại hoặc liên hệ quản trị viên.'
        //     },
        //     update: {
        //         success: 'Cập nhật thông tin phân loại liên kế  thành công',
        //         failure: 'Không thể chỉnh sửa thông tin phân loại liên kế . Vui lòng thử lại hoặc liên hệ quản trị viên.'
        //     }
        // }
    },

    groups: {
        title: {
            list: 'Quản lý nhóm',
            edit: 'Chỉnh sửa nhóm',
            create: 'Thêm nhóm'
        },

        filter: {
            name: 'Tìm theo tên'
        },
        notification: {
            create: {
                success: 'Thêm nhóm mới thành công',
                failure: 'Không thể thêm nhóm mới. Vui lòng thử lại hoặc liên hệ quản trị viên.'
            },
            update: {
                success: 'Cập nhật thông tin nhóm thành công',
                failure: 'Không thể chỉnh sửa thông tin nhóm. Vui lòng thử lại hoặc liên hệ quản trị viên.'
            }
        }
    },

    radiologists: {
        title: {
            list: 'Quản lý bác sĩ',
            edit: 'Chỉnh sửa bác sĩ',
            create: 'Thêm bác sĩ',
            request: 'Thông tin bác sĩ'
        },

        filter: {
            name: 'Tìm theo nhóm'
        },
        notification: {
            userNotFound: 'Không tìm thấy tài khoản. Vui lòng kiểm tra lại hoặc tạo tài khoản mới',
            create: {
                success: 'Thêm bác sĩ mới thành công',
                failure: 'Không thể thêm bác sĩ mới. Vui lòng thử lại hoặc liên hệ quản trị viên.'
            },
            update: {
                success: 'Cập nhật thông tin bác sĩ thành công',
                failure: 'Không thể chỉnh sửa thông tin bác sĩ. Vui lòng thử lại hoặc liên hệ quản trị viên.'
            }
        }
    },

    role_radiologist: {
        title: {
            list: 'Quản lý phân quyền',
            edit: 'Chỉnh sửa phân quyền',
            create: 'Thêm phân quyền'
        },

        notification: {
            create: {
                success: 'Thêm quyền mới thành công',
                failure: 'Không thể thêm quyền mới. Vui lòng thử lại hoặc liên hệ quản trị viên.'
            },
            update: {
                success: 'Cập nhật thông tin quyền thành công',
                failure: 'Không thể chỉnh sửa thông tin quyền. Vui lòng thử lại hoặc liên hệ quản trị viên.'
            }
        }
    },

    members: {
        title: {
            list: 'Quản lý thành viên',
            edit: 'Chỉnh sửa thành viên',
            create: 'Thêm thành viên'
        },

        notification: {
            create: {
                success: 'Thêm thành viên mới thành công',
                failure: 'Không thể thêm thành viên mới. Vui lòng thử lại hoặc liên hệ quản trị viên.'
            },
            update: {
                success: 'Cập nhật thông tin thành viên thành công',
                failure: 'Không thể chỉnh sửa thông tin thành viên. Vui lòng thử lại hoặc liên hệ quản trị viên.'
            }
        }
    },

    client_authorities: {
        title: {
            list: 'Quản lý quyền',
            edit: 'Chỉnh sửa quyền',
            create: 'Thêm quyền'
        },
        notification: {
            create: {
                success: 'Thêm thiết bị mới thành công',
                failure: 'Không thể thêm thiết bị mới. Vui lòng thử lại hoặc liên hệ quản trị viên.'
            },
            update: {
                success: 'Cập nhật thông tin thiết bị thành công',
                failure: 'Không thể chỉnh sửa thông tin thiết bị. Vui lòng thử lại hoặc liên hệ quản trị viên.'
            }
        }
    },

    client_scopes: {
        title: {
            list: 'Quản lý phạm vi',
            edit: 'Chỉnh sửa phạm vi',
            create: 'Thêm phạm vi'
        },
        notification: {
            create: {
                success: 'Thêm thiết bị mới thành công',
                failure: 'Không thể thêm thiết bị mới. Vui lòng thử lại hoặc liên hệ quản trị viên.'
            },
            update: {
                success: 'Cập nhật thông tin thiết bị thành công',
                failure: 'Không thể chỉnh sửa thông tin thiết bị. Vui lòng thử lại hoặc liên hệ quản trị viên.'
            }
        }
    },

    client_resources: {
        title: {
            list: 'Quản lý tài nguyên',
            edit: 'Chỉnh sửa tài nguyên',
            create: 'Thêm tài nguyên'
        },
        notification: {
            create: {
                success: 'Thêm tài nguyên mới thành công',
                failure: 'Không thể thêm tài nguyên mới. Vui lòng thử lại hoặc liên hệ quản trị viên.'
            },
            update: {
                success: 'Cập nhật thông tin tài nguyên thành công',
                failure: 'Không thể chỉnh sửa thông tin tài nguyên. Vui lòng thử lại hoặc liên hệ quản trị viên.'
            }
        }
    },


    modality: {
        title: {
            list: 'Quản lý thiết bị',
            edit: 'Chỉnh sửa thiết bị',
            create: 'Thêm thiết bị',
            information: 'Thông tin thiết bị',
            config: 'Cấu hình'
        },
        text: {
            selectRentType: 'Hãy lựa chọn loại thiết bị',
            owner: 'Sở hữu',
            rent: 'Thuê'
        },
        button: {
            testConnect: 'Kiểm tra kết nối'
        },
        notification: {
            testConnect: {
                success: 'Kết nối thành công',
                failure: 'Không thể kết nối với thiết bị. Hãy kiểm tra lại cấu hình kết nối hoặc liên hệ quản trị viên!'
            },
            create: {
                success: 'Thêm thiết bị mới thành công',
                failure: 'Không thể thêm thiết bị mới. Vui lòng thử lại hoặc liên hệ quản trị viên.'
            },
            update: {
                success: 'Cập nhật thông tin thiết bị thành công',
                failure: 'Không thể chỉnh sửa thông tin thiết bị. Vui lòng thử lại hoặc liên hệ quản trị viên.'
            }
        }
    },
    report: {
        error: 'Không thể tải báo cáo chuẩn đoán. Hãy thử lại hoặc liên hệ quản trị viên!',
        loading: 'Đang tải báo cáo chuẩn đoán...'
    },
    patient: {
        title: {
            list: 'Danh sách bệnh nhân',
            edit: 'Chỉnh sửa thông tin bệnh nhân',
            create: 'Thêm bệnh nhân',
            history: 'Lịch sử',
            info: ' Thông tin bệnh nhân'
        },
        notification: {
            duplicateId: 'Mã bệnh nhân đã tồn tại. Vui lòng nhập mã mới',
            duplicateIdentifier: '%{identifierTypeId} %{identifier} đã tồn tại.',
            create: {
                success: 'Thêm bệnh nhân mới thành công',
                failure: 'Không thể thêm bệnh nhân. Vui lòng thử lại hoặc liên hệ quản trị viên.'
            },
            update: {
                success: 'Cập nhật thông tin bệnh nhân thành công',
                failure: 'Không thể chỉnh sửa thông tin bệnh nhân. Vui lòng thử lại hoặc liên hệ quản trị viên.'
            }
        }
    },
    order: {
        title: {
            list: 'Quản lý chỉ định chụp',
            edit: 'Sửa thông tin chỉ định chụp',
            create: 'Tạo chỉ định chụp',
            patientInfo: 'Thông tin bệnh nhân',
            request: 'Thông tin chỉ định chụp'
        },
        notification: {
            patientNotFound: 'Không tìm thấy thông tin bệnh nhân. Hãy tạo thông tin bệnh nhân mới!',
            duplicateOrderId: 'Mã chỉ định đã tồn tại. Hãy nhập mã chỉ định mới'
        }
    },
    teleOrder: {
        title: {
            list: 'Danh sách ca hội chẩn',
            create: 'Tạo yêu cầu hội chẩn',
            dicom: 'Thông tin ca chụp'
        },
        label: {
            selectDestination: 'Chọn nơi nhận',
            selectSpecificDoctor: 'Chỉ định bác sĩ chuẩn đoán',
            chooseDoctor: 'Chọn bác sĩ',
            dontSendPatientInfo: 'Không gửi thông tin bệnh nhân'
        }
    },
    template: {
        title: {
            list: 'Danh sách mẫu báo cáo',
            create: 'Tạo mẫu báo cáo',
            edit: 'Sửa mẫu báo cáo'
        },
        notification: {
            empty: 'Nội dung báo cáo và kết luận không được để trống'
        }
    }
};
