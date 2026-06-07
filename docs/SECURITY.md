# Security Policy — AgroMaître

## Supported Versions

| Version | Supported |
|---------|----------|
| 1.x     | ✅ Yes   |

## Reporting a Vulnerability

Please DO NOT open a public GitHub issue for security vulnerabilities.

Email: security@agromatre.io

We will respond within 48 hours and provide a fix within 7 days for critical issues.

## Security Measures

### Authentication
- Firebase Authentication with email verification (mandatory)
- Google OAuth 2.0
- JWT tokens with short expiry (1 hour)
- MFA optional for Pro/Enterprise plans

### Data Protection
- AES-256 encryption at rest (PostgreSQL TDE)
- TLS 1.3 in transit
- Environment secrets via GitHub Secrets (never committed)

### Infrastructure
- Container scanning with Trivy in CI/CD
- Automated `npm audit` on every push
- Rate limiting on all API endpoints
- SQL injection prevention via Prisma ORM parameterized queries

### Compliance
- ISO 27001 Annex A controls mapped to implementation
- SOC 2 Type II Trust Services Criteria
- GDPR compliant data processing
- Right to erasure endpoint available

### HTTP Security Headers
- `Content-Security-Policy` (CSP)
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Strict-Transport-Security` (HSTS in production)
- `Referrer-Policy: strict-origin-when-cross-origin`

## Audit Trail

All API requests are logged with:
- Timestamp (ISO 8601)
- HTTP method and path
- Client IP (anonymized in logs)
- User-Agent string

Logs are immutable and retained for 90 days minimum (ISO 27001 A.12.4).
