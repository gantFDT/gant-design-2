export function hisDecorator() {
  return function (target, name, desc) {
    return {
      ...desc,
      async value (...ags) {
        await desc.value.apply(this, ags);
        this.watchHistory();
      },
    };
  };
}

export function modifyDecorator() {
  return function (target, name, desc) {
    return {
      ...desc,
      async value (...ags) {
        this.loading = true;
        await desc.value.apply(this, ags);
        this.loading = false;
      },
    };
  };
}
