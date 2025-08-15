# Website Security Configuration

## 🔒 Security Features Implemented

### **1. URL Obfuscation & Clean URLs**
- **Hidden page extensions**: URLs now show `/profile` instead of `/about.html`
- **Custom URL mappings**: 
  - `/profile` → `about.html`
  - `/experience` → `resume.html`
  - `/projects` → `projects.html`
  - `/connect` → `contact.html`
  - `/home` → `index.html`

### **2. Security Headers**
- **X-Frame-Options**: Prevents clickjacking attacks
- **X-Content-Type-Options**: Prevents MIME type sniffing
- **X-XSS-Protection**: Enables XSS protection
- **Referrer-Policy**: Controls referrer information
- **Content-Security-Policy**: Restricts resource loading
- **Permissions-Policy**: Controls browser feature access

### **3. File Access Protection**
- **Sensitive files blocked**: `.htaccess`, `.htpasswd`, `.ini`, `.log`, `.sh`, `.inc`, `.bak`, `.sql`, `.env`, `.config`
- **Hidden files blocked**: All files starting with `.`
- **Backup files blocked**: `.bak`, `.tmp`, `.temp`, `.swp`, `.old`, `.orig`, `.save`, `.backup`, `~`
- **Directory browsing disabled**: Prevents listing of directory contents

### **4. Malicious Request Blocking**
- **SQL injection prevention**: Blocks suspicious query strings
- **XSS prevention**: Blocks script injection attempts
- **Malicious user agents**: Blocks scanning tools and bots
- **Hotlinking protection**: Prevents unauthorized image/asset usage

### **5. Custom Error Pages**
- **404 Not Found**: Custom page for missing resources
- **403 Forbidden**: Custom page for access denied
- **500 Server Error**: Custom page for server errors
- **Security features**: Anti-iframe, right-click disabled, text selection disabled

### **6. SEO & Security**
- **robots.txt**: Controls search engine crawling
- **sitemap.xml**: Helps search engines discover pages
- **Meta tags**: Proper security and SEO meta tags

### **7. Performance & Caching**
- **Gzip compression**: Reduces file sizes
- **Browser caching**: Optimizes loading times
- **Rate limiting**: Prevents abuse (if supported)

## 🚀 How to Use Clean URLs

### **Old URLs (Still Work)**
- `https://rajugottumukkala.in/about.html`
- `https://rajugottumukkala.in/resume.html`
- `https://rajugottumukkala.in/contact.html`

### **New Clean URLs (Recommended)**
- `https://rajugottumukkala.in/profile`
- `https://rajugottumukkala.in/experience`
- `https://rajugottumukkala.in/connect`
- `https://rajugottumukkala.in/home`

## ⚠️ Important Notes

1. **HTTPS Enforcement**: All HTTP requests are redirected to HTTPS
2. **Security Headers**: Automatically applied to all pages
3. **Error Handling**: Custom error pages for better user experience
4. **Bot Protection**: Blocks malicious scanning and crawling
5. **Asset Protection**: Prevents unauthorized hotlinking

## 🔧 Maintenance

- **Update sitemap.xml** when adding new pages
- **Review security headers** periodically
- **Monitor error logs** for suspicious activity
- **Keep .htaccess** file secure and up-to-date

## 📱 Mobile Security

- **Touch-friendly**: Secure interactions on mobile devices
- **Responsive design**: Secure across all screen sizes
- **Performance optimized**: Fast loading on all devices

---
**Last Updated**: August 15, 2025
**Security Level**: Enterprise-grade protection
**Compliance**: GDPR, CCPA, Security Best Practices
