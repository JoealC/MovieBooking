const optGenerator = require("otp-generator")

const generateOtp = async(length = 6) => {
    return optGenerator.generate(length, {digits: true, alphabets: false, upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false})
}

const validateOtp = async(inputOtp, storeOtp) =>{
    return inputOtp === storeOtp
}

module.exports = {generateOtp, validateOtp}