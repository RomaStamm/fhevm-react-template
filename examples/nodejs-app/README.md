# Node.js Example - FHEVM SDK Integration

This example demonstrates how to integrate the FHEVM SDK in a Node.js Express backend application.

## Features

- ✅ Express.js REST API
- ✅ FHEVM SDK server-side integration
- ✅ TypeScript support
- ✅ Encryption/Decryption endpoints
- ✅ Batch operations
- ✅ Error handling middleware
- ✅ CORS enabled
- ✅ Security headers (Helmet)
- ✅ Request logging (Morgan)

## Quick Start

```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your settings

# Run development server
npm run dev

# Server will start on http://localhost:3001
```

## Project Structure

```
nodejs-app/
├── src/
│   ├── server.ts                # Express server setup
│   ├── routes/
│   │   └── fhevm.ts            # FHEVM API routes
│   └── middleware/
│       └── errorHandler.ts     # Error handling middleware
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies and scripts
└── .env.example                # Environment variables template
```

## API Endpoints

### GET /health
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456
}
```

### GET /api/fhevm/status
Get FHEVM client initialization status.

**Response:**
```json
{
  "initialized": true,
  "error": null,
  "config": {
    "contractAddress": "0x...",
    "network": "sepolia"
  }
}
```

### POST /api/fhevm/encrypt
Encrypt a single value.

**Request:**
```json
{
  "value": 42
}
```

**Response:**
```json
{
  "success": true,
  "encrypted": {
    "data": [/* Uint8Array as number array */],
    "signature": "0x...",
    "metadata": {
      "encryptedAt": 1234567890,
      "encryptedBy": "0x..."
    }
  }
}
```

### POST /api/fhevm/decrypt
Decrypt an encrypted value.

**Request:**
```json
{
  "encryptedData": [/* number array */],
  "signature": "0x...",
  "isPublic": false
}
```

**Response:**
```json
{
  "success": true,
  "decrypted": {
    "value": "42",
    "decryptedAt": 1234567890
  }
}
```

### POST /api/fhevm/batch-encrypt
Encrypt multiple values in one request (max 100).

**Request:**
```json
{
  "values": [1, 2, 3, 4, 5]
}
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "results": [
    {
      "original": 1,
      "encrypted": { /* ... */ }
    },
    /* ... */
  ]
}
```

### GET /api/fhevm/info
Get SDK and contract information.

**Response:**
```json
{
  "sdk": {
    "version": "1.0.0",
    "initialized": true
  },
  "contract": {
    "address": "0x...",
    "network": "sepolia"
  },
  "capabilities": {
    "encrypt": true,
    "decrypt": true,
    "batchEncrypt": true,
    "publicDecrypt": true,
    "userDecrypt": true
  }
}
```

## Usage Examples

### Using the API from Frontend

```typescript
// Encrypt a value
const response = await fetch('http://localhost:3001/api/fhevm/encrypt', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ value: 42 }),
});

const { encrypted } = await response.json();
console.log('Encrypted:', encrypted);

// Decrypt the value
const decryptResponse = await fetch('http://localhost:3001/api/fhevm/decrypt', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    encryptedData: encrypted.data,
    signature: encrypted.signature,
    isPublic: false,
  }),
});

const { decrypted } = await decryptResponse.json();
console.log('Decrypted:', decrypted.value);
```

### Batch Encryption

```typescript
const response = await fetch('http://localhost:3001/api/fhevm/batch-encrypt', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    values: [1, 2, 3, 4, 5],
  }),
});

const { results } = await response.json();
console.log('Encrypted values:', results);
```

### Using with cURL

```bash
# Encrypt a value
curl -X POST http://localhost:3001/api/fhevm/encrypt \
  -H "Content-Type: application/json" \
  -d '{"value": 42}'

# Check status
curl http://localhost:3001/api/fhevm/status

# Get info
curl http://localhost:3001/api/fhevm/info
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3001` |
| `NODE_ENV` | Environment | `development` |
| `CONTRACT_ADDRESS` | FHEVM contract address | Required |
| `NETWORK` | Network (sepolia/mainnet/localhost) | `sepolia` |
| `ACL_ADDRESS` | Access control list address | Optional |
| `GATEWAY_URL` | FHEVM gateway URL | `https://gateway.zama.ai` |

## Development

```bash
# Run in development mode with auto-reload
npm run dev

# Type check
npm run type-check

# Build for production
npm run build

# Run production build
npm start
```

## Error Handling

The API includes comprehensive error handling:

- **400 Bad Request**: Invalid input parameters
- **503 Service Unavailable**: FHEVM client not initialized
- **500 Internal Server Error**: Unexpected errors

Example error response:
```json
{
  "error": "Bad Request",
  "message": "Value is required"
}
```

## Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Input Validation**: Request validation
- **Error Sanitization**: Production error messages

## Deployment

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

### Environment Setup

1. Set environment variables
2. Ensure contract is deployed
3. Configure network endpoints
4. Start server

## Integration with Frontend

This backend can be integrated with the Next.js and Vue examples:

```typescript
// In frontend config
const API_URL = 'http://localhost:3001/api/fhevm';

// Use fetch or axios to call endpoints
```

## Learn More

- [FHEVM SDK Documentation](../../packages/fhevm-sdk/README.md)
- [Express.js Documentation](https://expressjs.com/)
- [Zama FHEVM](https://docs.zama.ai/fhevm)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
