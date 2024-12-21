// Record: 构造对象类型
// Record<K, T> K是对象键的类型，T是对象值的类型
// PropertyKey: 表示任意可以作为对象键的类型，即string | number | symbol

export type AnyObject = Record<PropertyKey, any>;