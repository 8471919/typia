import { IJsonApplication } from "./schemas/json/IJsonApplication";
import { IValidation } from "./IValidation";
import { Primitive } from "./Primitive";
import { TypeGuardError } from "./TypeGuardError";
/**
 * > You must configure the generic argument `Types`.
 *
 * JSON Schema Application.
 *
 * Creates a JSON schema application which contains both main JSON schemas and
 * components. Note that, all of the named types are stored in the
 * {@link IJsonApplication.components} property for the `$ref` referencing.
 *
 * Also, you can specify the OpenAPI version by configuring the second generic
 * argument `Version`. For reference, the default version is `"3.1"`, and key
 * different of `"3.0"` and `"3.1"` is whether supporting the tuple type or not.
 *
 * @template Types Tuple of target types
 * @template Purpose Purpose of the JSON schema
 * @template Surplus Allow surplus properties starting with `x-typia-` or not
 * @return JSON schema application
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare function application(): never;
/**
 * JSON Schema Application.
 *
 * Creates a JSON schema application which contains both main JSON schemas and
 * components. Note that, all of the named types are stored in the
 * {@link IJsonApplication.components} property for the `$ref` referencing.
 *
 * Also, you can specify the OpenAPI version by configuring the second generic
 * argument `Version`. For reference, the default version is `"3.1"`, and key
 * different of `"3.0"` and `"3.1"` is whether supporting the tuple type or not.
 *
 * @template Types Tuple of target types
 * @template Version Version of OpenAPI specification. Default is 3.1
 * @return JSON schema application
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare function application<Types extends unknown[], Version extends "3.0" | "3.1" = "3.1">(): IJsonApplication<Version, Types>;
/**
 * > You must configure the generic argument `T`.
 *
 * Safe `JSON.parse()` function with type assertion.
 *
 * `typia.json.assertParse()` is a combination function of `JSON.parse()` and
 * {@link assert}. Therefore, it convers a JSON (JavaScript Object Notation) string
 * to a `T` typed instance with type assertion.
 *
 * In such reason, when parsed JSON string value is not matched with the type `T`, it
 * throws {@link TypeGuardError} or custom error generated by *errorFactory*. Otherwise,
 * there's no problem on the parsed value, the parsed value would be returned.
 *
 * @template T Expected type of parsed value
 * @param input JSON string
 * @param errorFactory Custom error factory. Default is `TypeGuardError`
 * @returns Parsed value
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function assertParse(input: string, errorFactory?: undefined | ((props: TypeGuardError.IProps) => Error)): never;
/**
 * Safe `JSON.parse()` function with type assertion.
 *
 * `typia.json.assertParse()` is a combination function of `JSON.parse()` and
 * {@link assert}. Therefore, it convers a JSON (JavaScript Object Notation) string
 * to a `T` typed instance with type assertion.
 *
 * In such reason, when parsed JSON string value is not matched with the type `T`,
 * it throws {@link TypeGuardError} or custom error generated by *errorFactory*.
 * Otherwise, there's no problem on the parsed value, the parsed value would be
 * returned.
 *
 * @template T Expected type of parsed value
 * @param input JSON string
 * @param errorFactory Custom error factory. Default is `TypeGuardError`
 * @returns Parsed value
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function assertParse<T>(input: string, errorFactory?: undefined | ((props: TypeGuardError.IProps) => Error)): Primitive<T>;
declare const assertParsePure: typeof assertParse;
export { assertParsePure as assertParse };
/**
 * > You must configure the generic argument `T`.
 *
 * Safe `JSON.parse()` function with type checking.
 *
 * `typia.json.isParse()` is a combination function of `JSON.parse()` and {@link is}.
 * Therefore, it convers a JSON (JavaScript Object Notation) string to a `T` typed
 * instance with type checking.
 *
 * In such reason, when parsed JSON string value is not matched with the type `T`, it
 * returns `null` value. Otherwise, there's no problem on the parsed value, the parsed
 * value would be returned.
 *
 * @template T Expected type of parsed value
 * @param input JSON string
 * @returns Parsed value when exact type, otherwise `null`
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function isParse(input: string): never;
/**
 * Safe `JSON.parse()` function with type checking.
 *
 * `typia.json.isParse()` is a combination function of `JSON.parse()` and {@link is}.
 * Therefore, it convers a JSON (JavaScript Object Notation) string to a `T` typed
 * instance with type checking.
 *
 * In such reason, when parsed JSON string value is not matched with the type `T`, it
 * returns `null` value. Otherwise, there's no problem on the parsed value, the parsed
 * value would be returned.
 *
 * @template T Expected type of parsed value
 * @param input JSON string
 * @returns Parsed value when exact type, otherwise `null`
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function isParse<T>(input: string): Primitive<T> | null;
declare const isParsePure: typeof isParse;
export { isParsePure as isParse };
/**
 * > You must configure the generic argument `T`.
 *
 * Safe `JSON.parse()` function with detailed type validation.
 *
 * `typia.json.validateParse()` is a combination function of `JSON.parse()` and
 * {@link validate}. Therefore, it convers a JSON (JavaScript Object Notation) string
 * to a `T` typed instance with detailed type validation.
 *
 * In such reason, when parsed JSON string value is not matched with the type `T`, it
 * returns {@link IValidation.IFailure} value with detailed error reasons. Otherwise,
 * there's no problem on the parsed value, the parsed value would be stored in `data`
 * property of the output {@link IValidation.ISuccess} instance.
 *
 * @template T Expected type of parsed value
 * @param input JSON string
 * @returns Validation result with JSON parsed value
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function validateParse(input: string): never;
/**
 * Safe `JSON.parse()` function with detailed type validation.
 *
 * `typia.json.validateParse()` is a combination function of `JSON.parse()` and
 * {@link validate}. Therefore, it convers a JSON (JavaScript Object Notation) string
 * to a `T` typed instance with detailed type validation.
 *
 * In such reason, when parsed JSON string value is not matched with the type `T`, it
 * returns {@link IValidation.IFailure} value with detailed error reasons. Otherwise,
 * there's no problem on the parsed value, the parsed value would be stored in `data`
 * property of the output {@link IValidation.ISuccess} instance.
 *
 * @template T Expected type of parsed value
 * @param input JSON string
 * @returns Validation result with JSON parsed value
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function validateParse<T>(input: string): IValidation<Primitive<T>>;
declare const validateParsePure: typeof validateParse;
export { validateParsePure as validateParse };
/**
 * 8x faster `JSON.stringify()` function.
 *
 * Converts an input value to a JSON (JavaScript Object Notation) string, about 8x
 * faster than the native `JSON.stringify()` function. The 5x faster principle is
 * because it writes an optimized JSON conversion plan, only for the type `T`.
 *
 * For reference, this `typia.json.stringify()` does not validate the input value type.
 * It just believes that the input value is following the type `T`. Therefore, if you
 * can't ensure the input value type, it would be better to call one of below
 * functions instead.
 *
 *  - {@link assertStringify}
 *  - {@link isStringify}
 *  - {@link validateStringify}
 *
 * @template T Type of the input value
 * @param input A value to be converted
 * @return JSON string value
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function stringify<T>(input: T): string;
declare const stringifyPure: typeof stringify;
export { stringifyPure as stringify };
/**
 * 5x faster `JSON.stringify()` function with type assertion.
 *
 * `typia.json.assertStringify()` is a combination function of {@link assert} and
 * {@link stringify}. Therefore, it converts an input value to
 * JSON (JavaScript Object Notation) string, with type assertion.
 *
 * In such reason, when `input` value is not matched with the type `T`, it throws an
 * {@link TypeGuardError} or custom error generated by *errorFactory*. Otherwise,
 * there's no problem on the `input` value, JSON string would be returned.
 *
 * For reference, with type assertion, it is even 5x times faster than the native
 * `JSON.stringify()` function. So, just enjoy the safe and fast JSON conversion
 * with confidence.
 *
 * @template T Type of the input value
 * @param input A value to be asserted and converted
 * @param errorFactory Custom error factory. Default is `TypeGuardError`
 * @return JSON string value
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function assertStringify<T>(input: T, errorFactory?: undefined | ((props: TypeGuardError.IProps) => Error)): string;
/**
 * 5x faster `JSON.stringify()` function with type assertion.
 *
 * `typia.json.assertStringify()` is a combination function of {@link assert} and
 * {@link stringify}. Therefore, it converts an input value to
 * JSON (JavaScript Object Notation) string, with type assertion.
 *
 * In such reason, when `input` value is not matched with the type `T`, it throws an
 * {@link TypeGuardError} or custom error generated by *errorFactory*. Otherwise,
 * there's no problem on the `input` value, JSON string would be returned.
 *
 * For reference, with type assertion, it is even 5x times faster than the native
 * `JSON.stringify()` function. So, just enjoy the safe and fast JSON conversion
 * with confidence.
 *
 * @template T Type of the input value
 * @param input A value to be asserted and converted
 * @param errorFactory Custom error factory. Default is `TypeGuardError`
 * @return JSON string value
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function assertStringify<T>(input: T, errorFactory?: undefined | ((props: TypeGuardError.IProps) => Error)): unknown;
declare const assertStringifyPure: typeof assertStringify;
export { assertStringifyPure as assertStringify };
/**
 * 7x faster `JSON.stringify()` function with type checking.
 *
 * `typia.json.stringify()` is a combination function of {@link is} and
 * {@link stringify}. Therefore, it converts an input value to JSON
 * (JavaScript Object Notation) string, with type checking.
 *
 * In such reason, when `input` value is not matched with the type `T`, it returns
 * `null` value. Otherwise, there's no problem on the `input` value, JSON string
 * would be returned.
 *
 * For reference, with type checking, it is even 7x times faster than the native
 * `JSON.stringify()` function. So, just enjoy the safe and fast JSON conversion
 * with confidence.
 *
 * @template T Type of the input value
 * @param input A value to be checked and converted
 * @return JSON string value when exact type, otherwise null
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function isStringify<T>(input: T): string | null;
/**
 * 7x faster `JSON.stringify()` function with type checking.
 *
 * `typia.json.isStringify()` is a combination function of {@link is} and
 * {@link stringify}. Therefore, it converts an input value to JSON
 * (JavaScript Object Notation) string, with type checking.
 *
 * In such reason, when `input` value is not matched with the type `T`, it returns
 * `null` value. Otherwise, there's no problem on the `input` value, JSON string
 * would be returned.
 *
 * For reference, with type checking, it is even 7x times faster than the native
 * `JSON.stringify()` function. So, just enjoy the safe and fast JSON conversion
 * with confidence.
 *
 * @template T Type of the input value
 * @param input A value to be checked and converted
 * @return JSON string value when exact type, otherwise null
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function isStringify<T>(input: unknown): string | null;
declare const isStringifyPure: typeof isStringify;
export { isStringifyPure as isStringify };
/**
 * 5x faster `JSON.stringify()` function with detailed type validation.
 *
 * `typia.json.validateStringify()` is a combination function of {@link validate} and
 * {@link stringify}. Therefore, it converts an input value to JSON (JavaScript Object
 * Notation) string, with detailed type validation.
 *
 * In such reason, when `input` value is not matched with the type `T`, it returns
 * {@link IValidation.IFailure} value with detailed error reasons. Otherwise,
 * there's no problem on the `input` value, JSON string would be stored in `data`
 * property of the output {@link IValidation.ISuccess} instance.
 *
 * For reference, with detailed type validation, it is even 5x times faster than the
 * native `JSON.stringify()` function. So, just enjoy the safe and fast JSON
 * conversion with confidence.
 *
 * @template T Type of the input value
 * @param input A value to be checked and converted
 * @returns Validation result with JSON string value
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function validateStringify<T>(input: T): IValidation<string>;
/**
 * 5x faster `JSON.stringify()` function with detailed type validation.
 *
 * `typia.json.validateStringify()` is a combination function of {@link validate} and
 * {@link stringify}. Therefore, it converts an input value to JSON (JavaScript Object
 * Notation) string, with detailed type validation.
 *
 * In such reason, when `input` value is not matched with the type `T`, it returns
 * {@link IValidation.IFailure} value with detailed error reasons. Otherwise,
 * there's no problem on the `input` value, JSON string would be stored in `data`
 * property of the output {@link IValidation.ISuccess} instance.
 *
 * For reference, with detailed type validation, it is even 5x times faster than the
 * native `JSON.stringify()` function. So, just enjoy the safe and fast JSON
 * conversion with confidence.
 *
 * @template T Type of the input value
 * @param input A value to be checked and converted
 * @returns Validation result with JSON string value
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function validateStringify<T>(input: unknown): IValidation<string>;
declare const validateStringifyPure: typeof validateStringify;
export { validateStringifyPure as validateStringify };
/**
 * Creates a reusable {@link isParse} function.
 *
 * @danger You must configure the generic argument `T`
 * @returns Nothing until you configure the generic argument `T`
 * @throws compile error
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createIsParse(): never;
/**
 * Creates a reusable {@link isParse} function.
 *
 * @template T Expected type of parsed value
 * @returns A reusable `isParse` function
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createIsParse<T>(): (input: string) => Primitive<T> | null;
declare const createIsParsePure: typeof createIsParse;
export { createIsParsePure as createIsParse };
/**
 * Creates a reusable {@link assertParse} function.
 *
 * @danger You must configure the generic argument `T`
 * @returns Nothing until you configure the generic argument `T`
 * @param errorFactory Custom error factory. Default is `TypeGuardError`
 * @throws compile error
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createAssertParse(errorFactory?: undefined | ((props: TypeGuardError.IProps) => Error)): never;
/**
 * Creates a reusable {@link assertParse} function.
 *
 * @template T Expected type of parsed value
 * @param errorFactory Custom error factory. Default is `TypeGuardError`
 * @returns A reusable `assertParse` function
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createAssertParse<T>(errorFactory?: undefined | ((props: TypeGuardError.IProps) => Error)): (input: string) => Primitive<T>;
declare const createAssertParsePure: typeof createAssertParse;
export { createAssertParsePure as createAssertParse };
/**
 * Creates a reusable {@link validateParse} function.
 *
 * @danger You must configure the generic argument `T`
 * @returns Nothing until you configure the generic argument `T`
 * @throws compile error
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createValidateParse(): never;
/**
 * Creates a reusable {@link validateParse} function.
 *
 * @template T Expected type of parsed value
 * @returns A reusable `validateParse` function
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createValidateParse<T>(): (input: string) => IValidation<Primitive<T>>;
declare const createValidateParsePure: typeof createValidateParse;
export { createValidateParsePure as createValidateParse };
/**
 * Creates a reusable {@link stringify} function.
 *
 * @danger You must configure the generic argument `T`
 * @returns Nothing until you configure the generic argument `T`
 * @throws compile error
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createStringify(): never;
/**
 * Creates a reusable {@link stringify} function.
 *
 * @template T Type of the input value
 * @returns A reusable `stringify` function
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createStringify<T>(): (input: T) => string;
declare const createStringifyPure: typeof createStringify;
export { createStringifyPure as createStringify };
/**
 * Creates a reusable {@link assertStringify} function.
 *
 * @danger You must configure the generic argument `T`
 * @param errorFactory Custom error factory. Default is `TypeGuardError`
 * @returns Nothing until you configure the generic argument `T`
 * @throws compile error
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createAssertStringify(errorFactory?: undefined | ((props: TypeGuardError.IProps) => Error)): never;
/**
 * Creates a reusable {@link assertStringify} function.
 *
 * @template T Type of the input value
 * @param errorFactory Custom error factory. Default is `TypeGuardError`
 * @returns A reusable `assertStringify` function
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createAssertStringify<T>(errorFactory?: undefined | ((props: TypeGuardError.IProps) => Error)): (input: unknown) => string;
declare const createAssertStringifyPure: typeof createAssertStringify;
export { createAssertStringifyPure as createAssertStringify };
/**
 * Creates a reusable {@link isStringify} function.
 *
 * @danger You must configure the generic argument `T`
 * @returns Nothing until you configure the generic argument `T`
 * @throws compile error
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createIsStringify(): never;
/**
 * Creates a reusable {@link isStringify} function.
 *
 * @template T Type of the input value
 * @returns A reusable `isStringify` function
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createIsStringify<T>(): (input: unknown) => string | null;
declare const createIsStringifyPure: typeof createIsStringify;
export { createIsStringifyPure as createIsStringify };
/**
 * Creates a reusable {@link validateStringify} function.
 *
 * @danger You must configure the generic argument `T`
 * @returns Nothing until you configure the generic argument `T`
 * @throws compile error
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createValidateStringify(): never;
/**
 * Creates a reusable {@link validateStringify} function.
 *
 * @template T Type of the input value
 * @returns A reusable `validateStringify` function

 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createValidateStringify<T>(): (input: unknown) => IValidation<string>;
declare const createValidateStringifyPure: typeof createValidateStringify;
export { createValidateStringifyPure as createValidateStringify };
