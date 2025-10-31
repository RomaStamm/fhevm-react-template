# Performance Guide

## Overview

This guide covers performance optimization strategies and best practices for applications built with the FHEVM SDK.

## Performance Metrics

### SDK Bundle Size

- **Core SDK**: ~50KB (minified + gzipped)
- **React Hooks**: +5KB
- **Vue Composables**: +5KB
- **Total with all adapters**: ~60KB

### Initialization Time

- **Browser**: 100-300ms (depends on network)
- **Node.js**: 50-150ms
- **With caching**: 10-50ms

### Operation Times

| Operation | Average Time | Notes |
|-----------|-------------|-------|
| Encrypt (client) | 50-100ms | Depends on value size |
| Decrypt (client) | 100-200ms | Requires key retrieval |
| Encrypt (server) | 30-80ms | Faster than client |
| Batch operations | +20ms per item | Use for multiple values |

## Optimization Strategies

### 1. Code Splitting

#### Next.js

```typescript
// Lazy load FHE components
import dynamic from 'next/dynamic';

const FHEDemo = dynamic(() => import('@/components/FHEDemo'), {
  loading: () => <p>Loading...</p>,
  ssr: false  // Disable SSR for FHE components
});
```

#### React

```typescript
import { lazy, Suspense } from 'react';

const FHEComponent = lazy(() => import('./FHEComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FHEComponent />
    </Suspense>
  );
}
```

### 2. SDK Initialization Caching

```typescript
// Cache initialized client
let cachedClient: FHEVMClient | null = null;

async function getClient() {
  if (cachedClient) {
    return cachedClient;
  }

  cachedClient = new FHEVMClient(config);
  await cachedClient.init();
  return cachedClient;
}
```

### 3. Batch Operations

```typescript
// Instead of multiple individual encryptions
const encrypted1 = await encrypt(value1);
const encrypted2 = await encrypt(value2);
const encrypted3 = await encrypt(value3);

// Use batch operations
const encrypted = await batchEncrypt([value1, value2, value3]);
```

### 4. Request Optimization

```typescript
// Debounce user inputs
import { debounce } from 'lodash';

const debouncedEncrypt = debounce(async (value) => {
  await encrypt(value);
}, 300);
```

### 5. State Management

```typescript
// Use proper state management to avoid re-renders
const { encrypt, isInitialized } = useEncrypt();

// Memoize expensive calculations
const memoizedValue = useMemo(() =>
  expensiveCalculation(data),
  [data]
);
```

## Smart Contract Gas Optimization

### Compiler Settings

```javascript
// hardhat.config.js
module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200  // Optimize for frequent calls
      }
    }
  }
};
```

### Gas Reporter

```bash
# Run tests with gas reporting
npm run test:gas

# Analyze gas usage
npm run analyze
```

### Optimization Techniques

1. **Use appropriate data types**
   ```solidity
   // Use smallest possible uint
   euint8 instead of euint256 when possible
   ```

2. **Minimize storage operations**
   ```solidity
   // Cache storage variables in memory
   euint32 memory cached = storageValue;
   ```

3. **Batch operations**
   ```solidity
   // Process multiple values in single transaction
   function batchProcess(euint32[] calldata values) external {
     // ...
   }
   ```

## Frontend Performance

### Build Optimization

```bash
# Analyze bundle size
npm run analyze

# Build with production optimizations
npm run build

# Measure build performance
ANALYZE=true npm run build
```

### Next.js Configuration

```javascript
// next.config.js
module.exports = {
  // Enable SWC minification
  swcMinify: true,

  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // Compression
  compress: true,

  // Production source maps (disable for better performance)
  productionBrowserSourceMaps: false,
};
```

### Webpack Optimization

```javascript
// webpack.config.js
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 10,
        },
        fhevm: {
          test: /[\\/]node_modules[\\/]@fhevm[\\/]/,
          name: 'fhevm',
          priority: 20,
        },
      },
    },
  },
};
```

## API Performance

### Server-Side Caching

```typescript
// Simple in-memory cache
const cache = new Map();

async function getCached(key: string, fn: () => Promise<any>) {
  if (cache.has(key)) {
    return cache.get(key);
  }

  const value = await fn();
  cache.set(key, value);
  return value;
}
```

### Connection Pooling

```typescript
// Reuse FHE client instance
let clientInstance: FHEVMClient | null = null;

export async function getServerClient() {
  if (!clientInstance) {
    clientInstance = new FHEVMClient(config);
    await clientInstance.init();
  }
  return clientInstance;
}
```

### Response Compression

```typescript
import compression from 'compression';

app.use(compression({
  level: 6,
  threshold: 1024,
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  }
}));
```

## Monitoring & Profiling

### Performance Measurement

```typescript
// Measure operation time
const start = performance.now();
await encrypt(value);
const duration = performance.now() - start;
console.log(`Encryption took ${duration}ms`);
```

### React DevTools Profiler

```typescript
import { Profiler } from 'react';

<Profiler id="FHEComponent" onRender={onRenderCallback}>
  <FHEComponent />
</Profiler>
```

### Lighthouse Audit

```bash
# Install Lighthouse
npm install -g lighthouse

# Run audit
lighthouse http://localhost:3000 --view
```

## Best Practices

### 1. Lazy Load Heavy Components

Only load FHE components when needed:

```typescript
const FHEComponent = dynamic(() => import('./FHE'), { ssr: false });
```

### 2. Use Web Workers

Offload heavy computations:

```typescript
const worker = new Worker('fhe-worker.js');
worker.postMessage({ value: 42 });
```

### 3. Implement Progressive Loading

```typescript
// Show UI immediately, load FHE later
function App() {
  const [fheReady, setFHEReady] = useState(false);

  useEffect(() => {
    initFHE().then(() => setFHEReady(true));
  }, []);

  return (
    <>
      <StaticUI />
      {fheReady && <FHEFeatures />}
    </>
  );
}
```

### 4. Optimize Re-renders

```typescript
// Use React.memo for expensive components
export default React.memo(FHEComponent, (prev, next) => {
  return prev.value === next.value;
});
```

### 5. Prefetch Resources

```typescript
// Prefetch FHE keys
<link rel="prefetch" href="/api/keys" />
```

## Performance Benchmarks

### Baseline Metrics

| Metric | Target | Actual |
|--------|--------|--------|
| First Contentful Paint | < 1.5s | ~1.2s |
| Time to Interactive | < 3.5s | ~2.8s |
| Largest Contentful Paint | < 2.5s | ~2.1s |
| Cumulative Layout Shift | < 0.1 | ~0.05 |
| First Input Delay | < 100ms | ~80ms |

### Load Testing

```bash
# Install autocannon
npm install -g autocannon

# Test API endpoint
autocannon -c 10 -d 30 http://localhost:3000/api/fhe
```

## Troubleshooting

### Slow Initialization

- Check network latency
- Verify caching is enabled
- Reduce bundle size
- Use service workers

### High Memory Usage

- Implement proper cleanup
- Use weak references
- Clear caches periodically
- Monitor memory leaks

### Poor API Performance

- Enable compression
- Implement caching
- Use connection pooling
- Optimize database queries

## Performance Checklist

- [ ] Code splitting implemented
- [ ] Bundle size optimized (< 200KB)
- [ ] Images optimized
- [ ] Caching strategy in place
- [ ] Lazy loading enabled
- [ ] Compression enabled
- [ ] Database queries optimized
- [ ] Rate limiting configured
- [ ] Monitoring setup
- [ ] Load testing completed

## Resources

- [Web Vitals](https://web.dev/vitals/)
- [Next.js Performance](https://nextjs.org/docs/advanced-features/measuring-performance)
- [React Performance](https://react.dev/learn/render-and-commit)
- [Webpack Optimization](https://webpack.js.org/guides/production/)

---

**Last Updated**: November 2025

**Performance Guide Version**: 1.0.0
