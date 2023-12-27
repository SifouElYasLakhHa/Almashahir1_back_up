
exports.forgetPassword = (user, lang) => {
    if(lang === 'ar') {
        return `
        مرحبا هذا الرابط لاعادة تعيين كلمة مرورك
        <br>
        <br>
        ${user.forgetLink}
        <br>
        هذا الرابط صالح لمدة 24 ساعة.
        <br>
        شكرا لك على استعمالك لخدماتنا
        للتواصل مع الدعم: 
        <br>
        ${user.supportEmail}
        <br>
        موقع المشاهير
        <br>
        https://www.almashahir1.com
        `;
    } else {
        return `
        Hello this link to reset your password
        <br>
        <br>
        ${user.forgetLink}
        <br>
        This link is valid for 24 hours.
        <br>
        Thank you for using our services
        To contact support:
        <br>
        ${user.supportEmail}
        موقع المشاهير
        <br>
        https://www.almashahir1.com
        ` 
    }
}