let effectFn = null;

const bucket = new WeakMap();

const effect = (fn) => {
  effectFn = fn;
  fn();
};

const defineProxy = (target) => {
  return new Proxy(target, {
    get (target, key) {
      let depsMap = bucket.get(target);

      if (!depsMap) {
        bucket.set(target, (depsMap = new Map()));
      }

      let deps = depsMap.get(key);

      if (!deps) {
        depsMap.set(key, (deps = new Set()));
      }

      if (effectFn) {
        deps.add(effectFn);
      }

      return target[key]
    },
    set (target, key, value) {
      target[key] = value;

      const deps = bucket.get(target)?.get(key);

      if (deps) {
        deps.forEach(effect => effect?.());
      }
    }
  })
};

const obj = {
  a: 1,
  b: 2
};

const proxy = defineProxy(obj);

effect(() => {
  document.querySelector('#app').innerHTML = proxy.a;
});

setInterval(() => {
  proxy.a = Math.random();
}, 1000);
console.log(bucket);
