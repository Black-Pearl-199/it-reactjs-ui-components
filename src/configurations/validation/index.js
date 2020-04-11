import { required } from 'ra-core';
import {
    checkAccessTokenValiditySeconds,
    checkRefreshTokenValiditySeconds,
    checkRegisteredRedirectURIs,
    msgPrefix,
    testBirthDate,
    testEmail,
    testOrderId,
    testPasswordVerify,
    testPatientName,
    testPatternPassword,
    testPatternPasswordNotRequired,
    testPatternUsername,
    testPhoneNumber,
    testPid
} from './inputValidate';

const msgPrefixRequired = `${msgPrefix}.required`;
export const validatePid = [required(`${msgPrefixRequired}.pid`), testPid];
export const validatePatientName = [required(`${msgPrefixRequired}.patientName`), testPatientName];
export const validateBirthDate = [required(`${msgPrefixRequired}.birthDate`), testBirthDate()];
export const validateGender = [required(`${msgPrefixRequired}.gender`)];

export const validateClientId = [required(`${msgPrefixRequired}.clientId`)];
export const validateClientName = [required(`${msgPrefixRequired}.clientName`)];
export const validateSecretNotRequired = [testPatternPasswordNotRequired];
export const validateSecretVerify = [testPasswordVerify('secret')];
export const validateAccessTokenValiditySeconds = [checkAccessTokenValiditySeconds];
export const validateRefreshtokenValidaitySeconds = [checkRefreshTokenValiditySeconds];
export const validateRegisteredRedirectURIs = [checkRegisteredRedirectURIs];
export const validatePasswordNotRequired = [testPatternPasswordNotRequired];

export const validateOrderId = [required(`${msgPrefixRequired}.orderId`), testOrderId];
export const validateOrderDate = [required(`${msgPrefixRequired}.orderDate`)];
export const validateDiagnosis = [required(`${msgPrefixRequired}.diagnosis`)];
export const validateDepartment = [required(`${msgPrefixRequired}.department`)];
export const validateReferringPhysician = [required(`${msgPrefixRequired}.referringPhysician`)];
export const validateModalityType = [required(`${msgPrefixRequired}.modalityType`)];
export const validateContrastMedia = [required(`${msgPrefixRequired}.contrastMedia`)];
export const validatePriority = [required(`${msgPrefixRequired}.priority`)];
export const validateStatus = [required(`${msgPrefixRequired}.status`)];
export const validateProtocol = [required(`${msgPrefixRequired}.protocol`)];
export const validateBodyPart = [required(`${msgPrefixRequired}.bodyPart`)];
export const validateUsername = [required(`${msgPrefixRequired}.username`), testPatternUsername];
export const validatePassword = [required(`${msgPrefixRequired}.password`), testPatternPassword];

export const validatePasswordVerify = [testPasswordVerify('password')];
export const validateNewPassword = [required(`${msgPrefixRequired}.newPassword`), testPatternPassword];
export const validateNewPasswordVerify = [testPasswordVerify('password')];
export const validateFullName = [required(`${msgPrefixRequired}.fullName`)];
export const validatePhoneNumber = [required(`${msgPrefixRequired}.phone`), testPhoneNumber];
export const validateEmail = [required(`${msgPrefixRequired}.email`), testEmail];
export const validateTemplateName = [required(`${msgPrefixRequired}.templateName`)];
export const validateAuthority = [required(`${msgPrefixRequired}.authority`)];
export const validateAuthorityId = [required(`${msgPrefixRequired}.authorityId`)];
export const validateRoleId = [required(`${msgPrefixRequired}.roleId`)];
export const validateRoleName = [required(`${msgPrefixRequired}.roleName`)];
export const validateResourceId = [required(`${msgPrefixRequired}.resourceId`)];
export const validateGroupId = [required(`${msgPrefixRequired}.groupId`)];
export * from './inputValidate';
