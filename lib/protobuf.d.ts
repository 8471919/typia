import { IValidation } from "./IValidation";
import { Resolved } from "./Resolved";
import { TypeGuardError } from "./TypeGuardError";
/**
 * > You must configure the generic argument `T`.
 *
 * Protocol Buffer Message Schema.
 *
 * Creates a Protocol Buffer Message Schema from a TypeScript type. The message
 * schema would be returned as a string value, and it can be used to share with
 * other developers/languages/frameworks.
 *
 * For reference, Protocol Buffer has lots of restrictions, so that expression power
 * of Protocol Buffer is not enough strong to fully meet the TypeScript type specs.
 * In such reason, if you put a TypeScript type that is not compatible with Protocol
 * Buffer, this function would throw compilation errors.
 *
 *  - [Restrictions of Protocol Buffer](https://typia.io/docs/protobuf/message/#restrictions)
 *
 * @template T Target type
 * @returns Protocol Buffer Message Schema.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare function message(): never;
/**
 * Protocol Buffer Message Schema.
 *
 * Creates a Protocol Buffer Message Schema from a TypeScript type. The message
 * schema would be returned as a string value, and it can be used to share with
 * other developers/languages/frameworks.
 *
 * For reference, Protocol Buffer has lots of restrictions, so that expression power
 * of Protocol Buffer is not enough strong to fully meet the TypeScript type specs.
 * In such reason, if you put a TypeScript type that is not compatible with Protocol
 * Buffer, this function would throw compilation errors.
 *
 * @template T Target type
 * @returns Protocol Buffer Message Schema.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare function message<T>(): string;
/**
 * > You must configure the generic argument `T`.
 *
 * Protocol Buffer Decoder.
 *
 * `typia.protobuf.decode()` is a function decoding a binary data of Protocol Buffer
 * format to a TypeScript instance.
 *
 * For reference, as Protocol Buffer handles binary data directly, there's no way
 * when `input` binary data was not encoded from the `T` typed value. In that case,
 * unexpected behavior or internal error would be occured. Therefore, I recommend you
 * to encode binary data of Protocol Buffer from type safe encode functions like below.
 * Use {@link encode} function only when you can ensure it.
 *
 *  - {@link assertEncode}
 *  - {@link isEncode}
 *  - {@link validateEncode}
 *
 * Also, `typia` is providing type safe decoders like {@link assertDecode}, but it
 * is just for additional type validation like `number & Minimum<7>` or
 * `string & Format<"uuid">` cases, that are represented by
 * [custom tags](https://typia.io/docs/validators/tags). Thus, I repeat that,
 * you've to ensure the type safety when using decoder functions.
 *
 * @template T Expected type of decoded value
 * @param input Protobuf Buffer binary data
 * @returns Decoded value
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function decode(input: Uint8Array): never;
/**
 * Protocol Buffer Decoder.
 *
 * `typia.protobuf.decode()` is a function decoding a binary data of Protocol Buffer
 * format to a TypeScript instance.
 *
 * For reference, as Protocol Buffer handles binary data directly, there's no way
 * when `input` binary data was not encoded from the `T` typed value. In that case,
 * unexpected behavior or internal error would be occured. Therefore, I recommend you
 * to encode binary data of Protocol Buffer from type safe encode functions like below.
 * Use {@link encode} function only when you can ensure it.
 *
 *  - {@link assertEncode}
 *  - {@link isEncode}
 *  - {@link validateEncode}
 *
 * Also, `typia` is providing type safe decoders like {@link assertDecode}, but it
 * is just for additional type validation like `number & Minimum<7>` or
 * `string & Format<"uuid">` cases, that are represented by
 * [custom tags](https://typia.io/docs/validators/tags). Thus, I repeat that,
 * you've to ensure the type safety when using decoder functions.
 *
 * @template T Expected type of decoded value
 * @param input Protobuf Buffer binary data
 * @returns Decoded value
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function decode<T>(input: Uint8Array): Resolved<T>;
declare const decodePure: typeof decode;
export { decodePure as decode };
/**
 * > You must configure the generic argument `T`.
 *
 * Protocol Buffer Decoder wity type assertion, but not safe.
 *
 * `typia.protobuf.assertDecode()` is a combination function of {@link decode} and
 * {@link assert} function. Therefore, it decodes a binary data of Protocol Buffer to
 * a TypeScript instance, and performs type assertion process. If decoded value is
 * following the type `T`, it returns the decoded value. Otherwise, it throws
 * {@link TypeGuardError} instead.
 *
 * However, note that, this validation is not always safe. It just performs additional
 * type assertion like `number & Minimum<7>` or `string & Format<"uuid">` cases,
 * that are represented by [custom tags](https://typia.io/docs/validators/tags).
 * Therefore, when using `typia.protobuf.assertDecode<T>()` function, you have to
 * ensure the type safety by yourself.
 *
 * In such type safety reason, I recommend you to use type safe encode functions.
 *
 *  - {@link assertEncode}
 *  - {@link isEncode}
 *  - {@link validateEncode}
 *
 * @template T Expected type of decoded value
 * @param input Protobuf Buffer binary data
 * @param errorFactory Custom error factory. Default is `TypeGuardError`
 * @returns Decoded value
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function assertDecode(input: Uint8Array, errorFactory?: undefined | ((props: TypeGuardError.IProps) => Error)): never;
/**
 * Protocol Buffer Decoder wity type assertion, but not safe.
 *
 * `typia.protobuf.assertDecode()` is a combination function of {@link decode} and
 * {@link assert} function. Therefore, it decodes a binary data of Protocol Buffer to
 * a TypeScript instance, and performs type assertion process. If decoded value is
 * following the type `T`, it returns the decoded value. Otherwise, it throws
 * {@link TypeGuardError} instead.
 *
 * However, note that, this validation is not always safe. It just performs additional
 * type assertion like `number & Minimum<7>` or `string & Format<"uuid">` cases,
 * that are represented by [custom tags](https://typia.io/docs/validators/tags).
 * Therefore, when using `typia.protobuf.assertDecode<T>()` function, you have to
 * ensure the type safety by yourself.
 *
 * In such type safety reason, I recommend you to use type safe encode functions.
 *
 *  - {@link assertEncode}
 *  - {@link isEncode}
 *  - {@link validateEncode}
 *
 * @template T Expected type of decoded value
 * @param input Protobuf Buffer binary data
 * @param errorFactory Custom error factory. Default is `TypeGuardError`
 * @returns Decoded value
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function assertDecode<T>(input: Uint8Array, errorFactory?: undefined | ((props: TypeGuardError.IProps) => Error)): Resolved<T>;
declare const assertDecodePure: typeof assertDecode;
export { assertDecodePure as assertDecode };
/**
 * > You must configure the generic argument `T`.
 *
 * Protocol Buffer Decoder wity type checking, but not safe.
 *
 * `typia.protobuf.isDecode()` is a combination function of {@link decode} and
 * {@link is} function. Therefore, it decodes a binary data of Protocol Buffer to
 * a TypeScript instance, and performs type checking process. If decoded value is
 * following the type `T`, it returns the decoded value. Otherwise, it returns
 * `null` value instead.
 *
 * However, note that, this validation is not always safe. It just performs additional
 * type checking like `number & Minimum<7>` or `string & Format<"uuid">` cases,
 * that are represented by [custom tags](https://typia.io/docs/validators/tags).
 * Therefore, when using `typia.protobuf.isDecode<T>()` function, you have to
 * ensure the type safety by yourself.
 *
 * In such type safety reason, I recommend you to use type safe encode functions.
 *
 *  - {@link assertEncode}
 *  - {@link isEncode}
 *  - {@link validateEncode}
 *
 * @template T Expected type of decoded value
 * @param input Protobuf Buffer binary data
 * @returns Decoded value
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function isDecode(input: Uint8Array): never;
/**
 * Protocol Buffer Decoder wity type checking, but not safe.
 *
 * `typia.protobuf.isDecode()` is a combination function of {@link decode} and
 * {@link is} function. Therefore, it decodes a binary data of Protocol Buffer to
 * a TypeScript instance, and performs type checking process. If decoded value is
 * following the type `T`, it returns the decoded value. Otherwise, it returns
 * `null` value instead.
 *
 * However, note that, this validation is not always safe. It just performs additional
 * type checking like `number & Minimum<7>` or `string & Format<"uuid">` cases,
 * that are represented by [custom tags](https://typia.io/docs/validators/tags).
 * Therefore, when using `typia.protobuf.isDecode<T>()` function, you have to
 * ensure the type safety by yourself.
 *
 * In such type safety reason, I recommend you to use type safe encode functions.
 *
 *  - {@link assertEncode}
 *  - {@link isEncode}
 *  - {@link validateEncode}
 *
 * @template T Expected type of decoded value
 * @param input Protobuf Buffer binary data
 * @returns Decoded value
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function isDecode<T>(input: Uint8Array): Resolved<T> | null;
declare const isDecodePure: typeof isDecode;
export { isDecodePure as isDecode };
/**
 * > You must configure the generic argument `T`.
 *
 * Protocol Buffer Decoder wity type validation, but not safe.
 *
 * `typia.protobuf.validateDecode()` is a combination function of {@link decode} and
 * {@link validate} function. Therefore, it decodes a binary data of Protocol Buffer to
 * a TypeScript instance, and performs type validation process. If decoded value is
 * following the type `T`, it returns the decoded value with
 * {@link IValidation.ISuccess} typed instance. Otherwise, it returns
 * {@link IValidation.IFailure} value instead with detailed error reasons.
 *
 * However, note that, this validation is not always safe. It just performs additional
 * type validation like `number & Minimum<7>` or `string & Format<"uuid">` cases,
 * that are represented by [custom tags](https://typia.io/docs/validators/tags).
 * Therefore, when using `typia.protobuf.validateDecode<T>()` function, you have to
 * ensure the type safety by yourself.
 *
 * In such type safety reason, I recommend you to use type safe encode functions.
 *
 *  - {@link assertEncode}
 *  - {@link isEncode}
 *  - {@link validateEncode}
 *
 * @template T Expected type of decoded value
 * @param input Protobuf Buffer binary data
 * @returns Decoded value
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function validateDecode(input: Uint8Array): never;
/**
 * Protocol Buffer Decoder wity type validation, but not safe.
 *
 * `typia.protobuf.validateDecode()` is a combination function of {@link decode} and
 * {@link validate} function. Therefore, it decodes a binary data of Protocol Buffer to
 * a TypeScript instance, and performs type validation process. If decoded value is
 * following the type `T`, it returns the decoded value with
 * {@link IValidation.ISuccess} typed instance. Otherwise, it returns
 * {@link IValidation.IFailure} value instead with detailed error reasons.
 *
 * However, note that, this validation is not always safe. It just performs additional
 * type validation like `number & Minimum<7>` or `string & Format<"uuid">` cases,
 * that are represented by [custom tags](https://typia.io/docs/validators/tags).
 * Therefore, when using `typia.protobuf.validateDecode<T>()` function, you have to
 * ensure the type safety by yourself.
 *
 * In such type safety reason, I recommend you to use type safe encode functions.
 *
 *  - {@link assertEncode}
 *  - {@link isEncode}
 *  - {@link validateEncode}
 *
 * @template T Expected type of decoded value
 * @param input Protobuf Buffer binary data
 * @returns Decoded value
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function validateDecode<T>(input: Uint8Array): IValidation<Resolved<T>>;
declare const validateDecodePure: typeof validateDecode;
export { validateDecodePure as validateDecode };
/**
 * Protocol Buffer Encoder.
 *
 * Converts an input value to a binary data of Protocol Buffer format.
 *
 * For reference, this `typia.protobuf.encode()` does not validate the `input` value.
 * It just believes that the `input` value is valid and converts it to a binary data
 * directly. Therefore, if you can't ensure the `input` value type, it would better to
 * call one of below functions intead.
 *
 *  - {@link assertEncode}
 *  - {@link isEncode}
 *  - {@link validateEncode}
 *
 * By the way, you know what? Expression power of Protocol Buffer is not enough strong
 * to fully meet the TypeScript type specs. In such reason, if you put a TypeScript
 * type that is not compatible with Protocol Buffer, this function would throw
 * compilation errors.
 *
 *  - [Restrictions of Protocol Buffer](https://typia.io/docs/protobuf/message/#restrictions)
 *
 * @template T Type of the value input
 * @param input A value to encode
 * @returns Encoded binary data
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function encode<T>(input: T): Uint8Array;
declare const encodePure: typeof encode;
export { encodePure as encode };
/**
 * Protocol Buffer Encoder with type assertion.
 *
 * `typia.protobuf.assertEncode()` is a combination function of {@link assert} and
 * {@link encode}.
 *
 * Therefore, it converts an `input` value to a binary data of
 * Protocol Buffer, with type assertion. If `input` value is not valid, it throws
 * {@link TypeGuardError}. Otherwise, there's no problem on the `input` value,
 * Protocol Buffer binary data would be returned.
 *
 * If you can trust `input` value, or want to perform other type of validation, use
 * below functions intead.
 *
 *  - {@link encode}
 *  - {@link isEncode}
 *  - {@link validateEncode}
 *
 * By the way, you know what? Expression power of Protocol Buffer is not enough strong
 * to fully meet the TypeScript type specs. In such reason, if you put a TypeScript
 * type that is not compatible with Protocol Buffer, this function would throw
 * compilation errors.
 *
 *  - [Restrictions of Protocol Buffer](https://typia.io/docs/protobuf/message/#restrictions)
 *
 * @template T Type of the value input
 * @param input A value to encode
 * @param errorFactory Custom error factory. Default is `TypeGuardError`
 * @returns Encoded binary data
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function assertEncode<T>(input: T, errorFactory?: undefined | ((props: TypeGuardError.IProps) => Error)): Uint8Array;
/**
 * Protocol Buffer Encoder with type assertion.
 *
 * `typia.protobuf.assertEncode()` is a combination function of {@link assert} and
 * {@link encode}.
 *
 * Therefore, it converts an `input` value to a binary data of
 * Protocol Buffer, with type assertion. If `input` value is not valid, it throws
 * {@link TypeGuardError}. Otherwise, there's no problem on the `input` value,
 * Protocol Buffer binary data would be returned.
 *
 * If you can trust `input` value, or want to perform other type of validation, use
 * below functions intead.
 *
 *  - {@link encode}
 *  - {@link isEncode}
 *  - {@link validateEncode}
 *
 * By the way, you know what? Expression power of Protocol Buffer is not enough strong
 * to fully meet the TypeScript type specs. In such reason, if you put a TypeScript
 * type that is not compatible with Protocol Buffer, this function would throw
 * compilation errors.
 *
 *  - [Restrictions of Protocol Buffer](https://typia.io/docs/protobuf/message/#restrictions)
 *
 * @template T Type of the value input
 * @param input A value to encode
 * @param errorFactory Custom error factory. Default is `TypeGuardError`
 * @returns Encoded binary data
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function assertEncode<T>(input: unknown, errorFactory?: undefined | ((props: TypeGuardError.IProps) => Error)): Uint8Array;
declare const assertEncodePure: typeof assertEncode;
export { assertEncodePure as assertEncode };
/**
 * Protocol Buffer Encoder with type checking.
 *
 * `typia.protobuf.isEncode()` is a combination function of {@link is} and
 * {@link encode}.
 *
 * Therefore, it converts an `input` value to a binary data of
 * Protocol Buffer, with type checking. If `input` value is not valid, it returns
 * `null` value. Otherwise, there's no problem on the `input` value, Protocol
 * Buffer binary data would be returned.
 *
 * If you can trust `input` value, or want to perform other type of validation, use
 * below functions intead.
 *
 *  - {@link encode}
 *  - {@link assertEncode}
 *  - {@link validateEncode}
 *
 * By the way, you know what? Expression power of Protocol Buffer is not enough strong
 * to fully meet the TypeScript type specs. In such reason, if you put a TypeScript
 * type that is not compatible with Protocol Buffer, this function would throw
 * compilation errors.
 *
 *  - [Restrictions of Protocol Buffer](https://typia.io/docs/protobuf/message/#restrictions)
 *
 * @template T Type of the value input
 * @param input A value to encode
 * @returns Encoded binary data
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function isEncode<T>(input: T): Uint8Array | null;
/**
 * Protocol Buffer Encoder with type checking.
 *
 * `typia.protobuf.isEncode()` is a combination function of {@link is} and
 * {@link encode}.
 *
 * Therefore, it converts an `input` value to a binary data of
 * Protocol Buffer, with type checking. If `input` value is not valid, it returns
 * `null` value. Otherwise, there's no problem on the `input` value, Protocol
 * Buffer binary data would be returned.
 *
 * If you can trust `input` value, or want to perform other type of validation, use
 * below functions intead.
 *
 *  - {@link encode}
 *  - {@link assertEncode}
 *  - {@link validateEncode}
 *
 * By the way, you know what? Expression power of Protocol Buffer is not enough strong
 * to fully meet the TypeScript type specs. In such reason, if you put a TypeScript
 * type that is not compatible with Protocol Buffer, this function would throw
 * compilation errors.
 *
 *  - [Restrictions of Protocol Buffer](https://typia.io/docs/protobuf/message/#restrictions)
 *
 * @template T Type of the value input
 * @param input A value to encode
 * @returns Encoded binary data
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function isEncode<T>(input: unknown): Uint8Array | null;
declare const isEncodePure: typeof isEncode;
export { isEncodePure as isEncode };
/**
 * Protocol Buffer Encoder with type validation.
 *
 * `typia.protobuf.validateEncode()` is a combination function of
 * {@link validation} and {@link encode}.
 *
 * Therefore, it converts an `input` value to a binary data of
 * Protocol Buffer, with type validation. If `input` value is not valid, it returns
 * {@link IValidation.IFailure} value with detailed error reasons. Otherwise, there's
 * no problem on the `input` value, Protocol Buffer binary data would be stored in
 * `data` property of the output {@link IValidation.ISuccess} instance.
 *
 * If you can trust `input` value, or want to perform other type of validation, use
 * below functions intead.
 *
 *  - {@link encode}
 *  - {@link assertEncode}
 *  - {@link isEncode}
 *
 * By the way, you know what? Expression power of Protocol Buffer is not enough strong
 * to fully meet the TypeScript type specs. In such reason, if you put a TypeScript
 * type that is not compatible with Protocol Buffer, this function would throw
 * compilation errors.
 *
 *  - [Restrictions of Protocol Buffer](https://typia.io/docs/protobuf/message/#restrictions)
 *
 * @template T Type of the value input
 * @param input A value to encode
 * @returns Encoded binary data
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function validateEncode<T>(input: T): IValidation<Uint8Array>;
/**
 * Protocol Buffer Encoder with type validation.
 *
 * `typia.protobuf.validateEncode()` is a combination function of
 * {@link validation} and {@link encode}.
 *
 * Therefore, it converts an `input` value to a binary data of
 * Protocol Buffer, with type validation. If `input` value is not valid, it returns
 * {@link IValidation.IFailure} value with detailed error reasons. Otherwise, there's
 * no problem on the `input` value, Protocol Buffer binary data would be stored in
 * `data` property of the output {@link IValidation.ISuccess} instance.
 *
 * If you can trust `input` value, or want to perform other type of validation, use
 * below functions intead.
 *
 *  - {@link encode}
 *  - {@link assertEncode}
 *  - {@link isEncode}
 *
 * By the way, you know what? Expression power of Protocol Buffer is not enough strong
 * to fully meet the TypeScript type specs. In such reason, if you put a TypeScript
 * type that is not compatible with Protocol Buffer, this function would throw
 * compilation errors.
 *
 *  - [Restrictions of Protocol Buffer](https://typia.io/docs/protobuf/message/#restrictions)
 *
 * @template T Type of the value input
 * @param input A value to encode
 * @returns Encoded binary data
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function validateEncode<T>(input: unknown): IValidation<Uint8Array>;
declare const validateEncodePure: typeof validateEncode;
export { validateEncodePure as validateEncode };
/**
 * Creates a reusable {@link decode} function.
 *
 * @danger You must configure the generic argument `T`
 * @returns Nothing until you configure the generic argument `T`
 * @throws compile error
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createDecode(): never;
/**
 * Creates a reusable {@link decode} function.
 *
 * @template T Target type
 * @returns A reusable `decode` function
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createDecode<T>(): (input: Uint8Array) => Resolved<T>;
declare const createDecodePure: typeof createDecode;
export { createDecodePure as createDecode };
/**
 * Creates a reusable {@link isDecode} function.
 *
 * @danger You must configure the generic argument `T`
 * @returns Nothing until you configure the generic argument `T`
 * @throws compile error
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createIsDecode(): never;
/**
 * Creates a reusable {@link isDecode} function.
 *
 * @template T Target type
 * @returns A reusable `isDecode` function
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createIsDecode<T>(): (input: Uint8Array) => Resolved<T> | null;
declare const createIsDecodePure: typeof createIsDecode;
export { createIsDecodePure as createIsDecode };
/**
 * Creates a reusable {@link assertDecode} function.
 *
 * @danger You must configure the generic argument `T`
 * @param errorFactory Custom error factory. Default is `TypeGuardError`
 * @returns Nothing until you configure the generic argument `T`
 * @throws compile error
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createAssertDecode(errorFactory?: undefined | ((props: TypeGuardError.IProps) => Error)): never;
/**
 * Creates a reusable {@link assertDecode} function.
 *
 * @template T Target type
 * @param errorFactory Custom error factory. Default is `TypeGuardError`
 * @returns A reusable `assertDecode` function
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createAssertDecode<T>(errorFactory?: undefined | ((props: TypeGuardError.IProps) => Error)): (input: Uint8Array) => Resolved<T>;
declare const createAssertDecodePure: typeof createAssertDecode;
export { createAssertDecodePure as createAssertDecode };
/**
 * Creates a reusable {@link validateDecode} function.
 *
 * @danger You must configure the generic argument `T`
 * @returns Nothing until you configure the generic argument `T`
 * @throws compile error
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createValidateDecode(): never;
/**
 * Creates a reusable {@link validateDecode} function.
 *
 * @template T Target type
 * @returns A reusable `validateDecode` function
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createValidateDecode<T>(): (input: Uint8Array) => IValidation<Resolved<T>>;
declare const createValidateDecodePure: typeof createValidateDecode;
export { createValidateDecodePure as createValidateDecode };
/**
 * Creates a reusable {@link encode} function.
 *
 * @danger You must configure the generic argument `T`
 * @returns Nothing until you configure the generic argument `T`
 * @throws compile error
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createEncode(): never;
/**
 * Creates a reusable {@link encode} function.
 *
 * @template T Target type
 * @returns A reusable `encode` function
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createEncode<T>(): (input: T) => Uint8Array;
declare const createEncodePure: typeof createEncode;
export { createEncodePure as createEncode };
/**
 * Creates a reusable {@link isEncode} function.
 *
 * @danger You must configure the generic argument `T`
 * @returns Nothing until you configure the generic argument `T`
 * @throws compile error
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createIsEncode(): never;
/**
 * Creates a reusable {@link isEncode} function.
 *
 * @template T Target type
 * @returns A reusable `isEncode` function
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createIsEncode<T>(): (input: T) => Uint8Array | null;
declare const createIsEncodePure: typeof createIsEncode;
export { createIsEncodePure as createIsEncode };
/**
 * Creates a reusable {@link assertEncode} function.
 *
 * @danger You must configure the generic argument `T`
 * @param errorFactory Custom error factory. Default is `TypeGuardError`
 * @returns Nothing until you configure the generic argument `T`
 * @throws compile error
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createAssertEncode(errorFactory?: undefined | ((props: TypeGuardError.IProps) => Error)): never;
/**
 * Creates a reusable {@link assertEncode} function.
 *
 * @template T Target type
 * @param errorFactory Custom error factory. Default is `TypeGuardError`
 * @returns A reusable `assertEncode` function
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createAssertEncode<T>(errorFactory?: undefined | ((props: TypeGuardError.IProps) => Error)): (input: T) => Uint8Array;
declare const createAssertEncodePure: typeof createAssertEncode;
export { createAssertEncodePure as createAssertEncode };
/**
 * Creates a reusable {@link validateEncode} function.
 *
 * @danger You must configure the generic argument `T`
 * @returns Nothing until you configure the generic argument `T`
 * @throws compile error
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createValidateEncode(): never;
/**
 * Creates a reusable {@link validateEncode} function.
 *
 * @template T Target type
 * @returns A reusable `validateEncode` function
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createValidateEncode<T>(): (input: T) => IValidation<Uint8Array>;
declare const createValidateEncodePure: typeof createValidateEncode;
export { createValidateEncodePure as createValidateEncode };
