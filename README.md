# GraphQL benchmarks with NodeJS

Forked from https://gist.github.com/lovitt/effa205b876d9a9b86ee58399cceaf31

To run:

```
npm install
node index.js
```

# Results

As observed on: ![](https://www.dropbox.com/s/vbk3c14deb0q91x/Screenshot%202017-08-01%2002.18.02.png?raw=1)

```
10 objects x 1,137 ops/sec ±3.21% (76 runs sampled)
100 objects x 256 ops/sec ±2.11% (79 runs sampled)
1000 objects x 27.64 ops/sec ±3.26% (65 runs sampled)
10000 objects x 2.81 ops/sec ±2.45% (18 runs sampled)
10 objects (no arrays) x 1,663 ops/sec ±2.52% (76 runs sampled)
100 objects (no arrays) x 495 ops/sec ±3.40% (75 runs sampled)
1000 objects (no arrays) x 65.04 ops/sec ±1.76% (74 runs sampled)
10000 objects (no arrays) x 6.44 ops/sec ±2.96% (35 runs sampled)
10 objects (id only) x 3,037 ops/sec ±2.22% (76 runs sampled)
100 objects (id only) x 1,596 ops/sec ±3.02% (78 runs sampled)
1000 objects (id only) x 281 ops/sec ±1.61% (80 runs sampled)
10000 objects (id only) x 28.94 ops/sec ±3.08% (68 runs sampled)

NAME                                     IPS              AVERAGE            DEVIATION
10 objects                1137.0491100872064 0.8794694891615584ms ±3.2068396345634036%
100 objects                256.4679159559358 3.8991231954792025ms ±2.1051028360606914%
1000 objects               27.64235019620354  36.17637403846154ms ±3.2555553552662495%
10000 objects              2.810808099064705 355.76957400000003ms  ±2.449599190168127%
10 objects (no arrays)    1662.8573887460336 0.6013744815206933ms ±2.5169179281180725%
100 objects (no arrays)    494.6649812916237  2.021570229994636ms  ±3.396158656328151%
1000 objects (no arrays)   65.03604170764956 15.376089530405409ms  ±1.760272863650425%
10000 objects (no arrays)  6.438636104538122  155.3123959428571ms ±2.9586317809166047%
10 objects (id only)      3037.4571154710034 0.3292227550823989ms ±2.2240186010690244%
100 objects (id only)      1595.889857965434 0.6266096591871815ms ±3.0183030233552612%
1000 objects (id only)    281.45398474431585 3.5529786544270827ms  ±1.614902966805844%
10000 objects (id only)    28.94270922674551 34.551015669117646ms  ±3.079313744116911%
```
