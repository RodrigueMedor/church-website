# HTTPS/SSL Configuration Guide

## Production Setup

### Option 1: Using Reverse Proxy (Recommended - Docker)
Use Nginx or similar as reverse proxy to handle SSL/TLS termination:

```yaml
# docker-compose.yml
services:
  backend:
    environment:
      - SERVER_SSL_ENABLED=false  # SSL handled by proxy
      - SERVER_SSL_KEY_STORE=classpath:keystore.p12
      - SERVER_SSL_KEY_STORE_PASSWORD=${SSL_KEYSTORE_PASSWORD}
      - SERVER_SSL_KEY_STORE_TYPE=PKCS12
```

### Option 2: Self-Signed Certificate (Testing)
```bash
# Generate self-signed certificate
keytool -genkeypair -alias tomcat \
  -keyalg RSA -keysize 2048 \
  -keystore keystore.p12 -keystore-type PKCS12 \
  -validity 365 -storepass password

# Place in: backend/src/main/resources/keystore.p12
```

### Option 3: Let's Encrypt (Production)
```bash
# Using Certbot
certbot certonly --standalone -d fhbck.org -d www.fhbck.org

# Convert to PKCS12
openssl pkcs12 -export -in /etc/letsencrypt/live/fhbck.org/fullchain.pem \
  -inkey /etc/letsencrypt/live/fhbck.org/privkey.pem \
  -out keystore.p12 -name tomcat
```

### Enable SSL in application.yml
```yaml
server:
  port: 8443
  ssl:
    enabled: true
    key-store: classpath:keystore.p12
    key-store-password: ${SSL_KEYSTORE_PASSWORD}
    key-store-type: PKCS12
    key-alias: tomcat
  http2:
    enabled: true
```

### Environment Variables
```bash
export SSL_KEYSTORE_PASSWORD=your-secure-password
export SERVER_SSL_ENABLED=true
./gradlew bootRun
```

## Security Features Enabled

✅ HSTS (HTTP Strict-Transport-Security)
  - max-age: 31536000 (1 year)
  - includeSubDomains: true
  - preload: true

✅ CSP (Content-Security-Policy)
✅ X-Frame-Options: DENY
✅ X-Content-Type-Options: nosniff
✅ X-XSS-Protection: enabled
✅ Referrer-Policy: strict-origin-when-cross-origin
✅ Permissions-Policy: geo/mic/camera disabled

## Verification

```bash
# Test HSTS
curl -i https://fhbck.org/api/health

# Verify certificate
openssl s_client -connect fhbck.org:8443

# Check headers
curl -i -H "Accept-Encoding: gzip" https://fhbck.org/api/health | grep -i "strict-transport"
```
