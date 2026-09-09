
# Security Policy

## 🛡️ Supported Versions

We actively support and provide security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 36.x    | :white_check_mark: |
| 35.x    | :white_check_mark: |
| < 35.0  | :x:                |

---

## 📢 Reporting a Vulnerability

We take the security of our projects seriously. If you discover a security vulnerability, please follow these steps:

### **DO NOT** create a public GitHub issue for security vulnerabilities.

### How to Report

1. **Email**: Send details to **moekyawaung@programmer.net**
2. **Subject Line**: `[Security Vulnerability] - Brief Description`
3. **Include**:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)
   - Your contact information for follow-up

### Response Timeline

- **Acknowledgment**: Within 48 hours
- **Initial Assessment**: Within 5 business days
- **Status Update**: Within 10 business days
- **Resolution**: Depends on severity and complexity

---

## 🔐 Security Best Practices

### For Contributors

- **Never commit** sensitive data (API keys, passwords, tokens)
- Use environment variables for configuration
- Keep dependencies updated (`npm audit`, `dependabot`)
- Enable **Two-Factor Authentication (2FA)** on your GitHub account
- Review code for security issues before submitting PRs

### For Users

- Update to the latest version regularly
- Review `package.json` dependencies
- Use HTTPS for all API communications
- Implement proper authentication for protected routes

---

## 🛠️ Security Measures Implemented

- ✅ Dependency scanning with `npm audit`
- ✅ Automated security updates via Dependabot
- ✅ Code review requirements for all PRs
- ✅ 2FA enforcement for maintainers
- ✅ Secure headers (CSP, HSTS, X-Frame-Options)
- ✅ Input validation and sanitization
- ✅ Rate limiting on API endpoints

---

## 📚 Additional Resources

- [GitHub Security Advisories](https://docs.github.com/en/code-security/security-advisories)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/security/)

---

## 🏆 Recognition

We appreciate responsible disclosure and will acknowledge security researchers who help improve our security (with permission).

**Thank you for helping keep our projects secure!**

---

*Last Updated: September 2026*
