import { CamelCase } from "./CamelCase";
import { IValidation } from "./IValidation";
import { PascalCase } from "./PascalCase";
import { SnakeCase } from "./SnakeCase";
import { TypeGuardError } from "./TypeGuardError";
/**
 * Convert to camel case.
 *
 * Convert every property names of nested objects to follow the camel case convention.
 *
 * For reference, this `typia.notations.camel()` function does not validate the input value
 * type. It just believes that the input value is following the type `T`. Therefore,
 * if you can't ensure the input value type, it would be better to call one of them below:
 *
 * - {@link assertCamel}
 * - {@link isCamel}
 * - {@link validateCamel}
 *
 * @template T Type of the input value
 * @param input Target object
 * @returns Camel case object
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function camel<T>(input: T): CamelCase<T>;
declare const camelPure: typeof camel;
export { camelPure as camel };
/**
 * Converts to camel case with type assertion.
 *
 * Convert every property names of nested objects to follow the camel case convention.
 * If the input value does not follow the type `T`, it throws {@link TypeGuardError}.
 *
 * @template T Type of the input value
 * @param input Target object
 * @param errorFactory Custom error factory. Default is `TypeGuardError`
 * @returns Camel case object
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function assertCamel<T>(input: T, errorFactory?: undefined | ((props: TypeGuardError.IProps) => Error)): CamelCase<T>;
/**
 * Converts to camel case with type assertion.
 *
 * Convert every property names of nested objects to follow the camel case convention.
 * If the input value does not follow the type `T`, it throws {@link TypeGuardError}.
 *
 * @template T Type of the input value
 * @param input Target object
 * @param errorFactory Custom error factory. Default is `TypeGuardError`
 * @returns Camel case object
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function assertCamel<T>(input: unknown, errorFactory?: undefined | ((props: TypeGuardError.IProps) => Error)): CamelCase<T>;
declare const assertCamelPure: typeof assertCamel;
export { assertCamelPure as assertCamel };
/**
 * Converts to camel case with type checking.
 *
 * Convert every property names of nested objects to follow the camel case convention.
 * If the input value does not follow the type `T`, it returns `null` value instead.
 *
 * @template T Type of the input value
 * @param input Target object
 * @returns Camel case object when exact type, otherwise null
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function isCamel<T>(input: T): CamelCase<T> | null;
/**
 * Converts to camel case with type checking.
 *
 * Convert every property names of nested objects to follow the camel case convention.
 * If the input value does not follow the type `T`, it returns `null` value instead.
 *
 * @template T Type of the input value
 * @param input Target object
 * @returns Camel case object when exact type, otherwise null
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function isCamel<T>(input: unknown): CamelCase<T> | null;
declare const isCamelPure: typeof isCamel;
export { isCamelPure as isCamel };
/**
 * Converts to camel case with type validation.
 *
 * Convert every property names of nested objects to follow the camel case convention.
 * If the input value does not follow the type `T`, it returns {@link IValidation.Failure}
 * object. Otherwise, there's no problem on the input value, camel cased converted data
 * would be stored in the `data` property of the output {@link IValidation.Success} object.
 *
 * @template T Type of the input value
 * @param input Target object
 * @returns Validation result with camel case object
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function validateCamel<T>(input: T): IValidation<CamelCase<T>>;
/**
 * Converts to camel case with type validation.
 *
 * Convert every property names of nested objects to follow the camel case convention.
 * If the input value does not follow the type `T`, it returns {@link IValidation.Failure}
 * object. Otherwise, there's no problem on the input value, camel cased converted data
 * would be stored in the `data` property of the output {@link IValidation.Success} object.
 *
 * @template T Type of the input value
 * @param input Target object
 * @returns Validation result with camel case object
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function validateCamel<T>(input: unknown): IValidation<CamelCase<T>>;
declare const validateCamelPure: typeof validateCamel;
export { validateCamelPure as validateCamel };
/**
 * Convert to pascal case.
 *
 * Convert every property names of nested objects to follow the pascal case convention.
 *
 * For reference, this `typia.notations.pascal()` function does not validate the input value
 * type. It just believes that the input value is following the type `T`. Therefore,
 * if you can't ensure the input value type, it would be better to call one of them below:
 *
 * - {@link assertPascal}
 * - {@link isPascal}
 * - {@link validatePascal}
 *
 * @template T Type of the input value
 * @param input Target object
 * @returns Pascal case object
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function pascal<T>(input: T): PascalCase<T>;
declare const pascalPure: typeof pascal;
export { pascalPure as pascal };
/**
 * Converts to pascal case with type assertion.
 *
 * Convert every property names of nested objects to follow the pascal case convention.
 * If the input value does not follow the type `T`, it throws {@link TypeGuardError}.
 *
 * @template T Type of the input value
 * @param input Target object
 * @param errorFactory Custom error factory. Default is `TypeGuardError`
 * @returns Pascal case object
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function assertPascal<T>(input: T, errorFactory?: undefined | ((props: TypeGuardError.IProps) => Error)): PascalCase<T>;
/**
 * Converts to pascal case with type assertion.
 *
 * Convert every property names of nested objects to follow the pascal case convention.
 * If the input value does not follow the type `T`, it throws {@link TypeGuardError}.
 *
 * @template T Type of the input value
 * @param input Target object
 * @param errorFactory Custom error factory. Default is `TypeGuardError`
 * @returns Pascal case object
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function assertPascal<T>(input: unknown, errorFactory?: undefined | ((props: TypeGuardError.IProps) => Error)): PascalCase<T>;
declare const assertPascalPure: typeof assertPascal;
export { assertPascalPure as assertPascal };
/**
 * Converts to pascal case with type checking.
 *
 * Convert every property names of nested objects to follow the pascal case convention.
 * If the input value does not follow the type `T`, it returns `null` value instead.
 *
 * @template T Type of the input value
 * @param input Target object
 * @returns Pascal case object when exact type, otherwise null
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function isPascal<T>(input: T): PascalCase<T> | null;
/**
 * Converts to pascal case with type checking.
 *
 * Convert every property names of nested objects to follow the pascal case convention.
 * If the input value does not follow the type `T`, it returns `null` value instead.
 *
 * @template T Type of the input value
 * @param input Target object
 * @returns Pascal case object when exact type, otherwise null
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function isPascal<T>(input: unknown): PascalCase<T> | null;
declare const isPascalPure: typeof isPascal;
export { isPascalPure as isPascal };
/**
 * Converts to pascal case with type validation.
 *
 * Convert every property names of nested objects to follow the pascal case convention.
 * If the input value does not follow the type `T`, it returns {@link IValidation.Failure}
 * object. Otherwise, there's no problem on the input value, pascal cased converted data
 * would be stored in the `data` property of the output {@link IValidation.Success} object.
 *
 * @template T Type of the input value
 * @param input Target object
 * @returns Validation result with pascal case object
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function validatePascal<T>(input: T): IValidation<PascalCase<T>>;
/**
 * Converts to pascal case with type validation.
 *
 * Convert every property names of nested objects to follow the pascal case convention.
 * If the input value does not follow the type `T`, it returns {@link IValidation.Failure}
 * object. Otherwise, there's no problem on the input value, pascal cased converted data
 * would be stored in the `data` property of the output {@link IValidation.Success} object.
 *
 * @template T Type of the input value
 * @param input Target object
 * @returns Validation result with pascal case object
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function validatePascal<T>(input: unknown): IValidation<PascalCase<T>>;
declare const validatePascalPure: typeof validatePascal;
export { validatePascalPure as validatePascal };
/**
 * Convert to snake case.
 *
 * Convert every property names of nested objects to follow the snake case convention.
 *
 * For reference, this `typia.notations.snake()` function does not validate the input value
 * type. It just believes that the input value is following the type `T`. Therefore,
 * if you can't ensure the input value type, it would be better to call one of them below:
 *
 * - {@link assertSnake}
 * - {@link isSnake}
 * - {@link validateSnake}
 *
 * @template T Type of the input value
 * @param input Target object
 * @returns Snake case object
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function snake<T>(input: T): SnakeCase<T>;
declare const snakePure: typeof snake;
export { snakePure as snake };
/**
 * Converts to snake case with type assertion.
 *
 * Convert every property names of nested objects to follow the snake case convention.
 * If the input value does not follow the type `T`, it throws {@link TypeGuardError}.
 *
 * @template T Type of the input value
 * @param input Target object
 * @param errorFactory Custom error factory. Default is `TypeGuardError`
 * @returns Snake case object
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function assertSnake<T>(input: T, errorFactory?: undefined | ((props: TypeGuardError.IProps) => Error)): SnakeCase<T>;
/**
 * Converts to snake case with type assertion.
 *
 * Convert every property names of nested objects to follow the snake case convention.
 * If the input value does not follow the type `T`, it throws {@link TypeGuardError}.
 *
 * @template T Type of the input value
 * @param input Target object
 * @param errorFactory Custom error factory. Default is `TypeGuardError`
 * @returns Snake case object
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function assertSnake<T>(input: unknown, errorFactory?: undefined | ((props: TypeGuardError.IProps) => Error)): SnakeCase<T>;
declare const assertSnakePure: typeof assertSnake;
export { assertSnakePure as assertSnake };
/**
 * Converts to snake case with type checking.
 *
 * Convert every property names of nested objects to follow the snake case convention.
 * If the input value does not follow the type `T`, it returns `null` value instead.
 *
 * @template T Type of the input value
 * @param input Target object
 * @returns Snake case object when exact type, otherwise null
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function isSnake<T>(input: T): SnakeCase<T> | null;
/**
 * Converts to snake case with type checking.
 *
 * Convert every property names of nested objects to follow the snake case convention.
 * If the input value does not follow the type `T`, it returns `null` value instead.
 *
 * @template T Type of the input value
 * @param input Target object
 * @returns Snake case object when exact type, otherwise null
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function isSnake<T>(input: unknown): SnakeCase<T> | null;
declare const isSnakePure: typeof isSnake;
export { isSnakePure as isSnake };
/**
 * Converts to snake case with type validation.
 *
 * Convert every property names of nested objects to follow the snake case convention.
 * If the input value does not follow the type `T`, it returns {@link IValidation.Failure}
 * object. Otherwise, there's no problem on the input value, snake cased converted data
 * would be stored in the `data` property of the output {@link IValidation.Success} object.
 *
 * @template T Type of the input value
 * @param input Target object
 * @returns Validation result with snake case object
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function validateSnake<T>(input: T): IValidation<SnakeCase<T>>;
/**
 * Converts to snake case with type validation.
 *
 * Convert every property names of nested objects to follow the snake case convention.
 * If the input value does not follow the type `T`, it returns {@link IValidation.Failure}
 * object. Otherwise, there's no problem on the input value, snake cased converted data
 * would be stored in the `data` property of the output {@link IValidation.Success} object.
 *
 * @template T Type of the input value
 * @param input Target object
 * @returns Validation result with snake case object
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function validateSnake<T>(input: unknown): IValidation<SnakeCase<T>>;
declare const validateSnakePure: typeof validateSnake;
export { validateSnakePure as validateSnake };
/**
 * Creates a reusable {@link camel} function.
 *
 * @danger You must configure the generic argument `T`
 * @returns Nothing until be configure the generic argument `T`
 * @throws compile error
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createCamel(): never;
/**
 * Creates a reusable {@link camel} function.
 *
 * @template T Type of the input value
 * @returns A reusable `camel` function
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createCamel<T>(): (input: T) => CamelCase<T>;
declare const createCamelPure: typeof createCamel;
export { createCamelPure as createCamel };
/**
 * Creates a reusable {@link assertCamel} function.
 *
 * @danger You must configure the generic argument `T`
 * @param errorFactory Custom error factory. Default is `TypeGuardError`
 * @returns Nothing until be configure the generic argument `T`
 * @throws compile error
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createAssertCamel(errorFactory?: undefined | ((props: TypeGuardError.IProps) => Error)): never;
/**
 * Creates a reusable {@link assertCamel} function.
 *
 * @template T Type of the input value
 * @param errorFactory Custom error factory. Default is `TypeGuardError`
 * @returns A reusable `assertCamel` function
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createAssertCamel<T>(errorFactory?: undefined | ((props: TypeGuardError.IProps) => Error)): (input: T) => CamelCase<T>;
declare const createAssertCamelPure: typeof createAssertCamel;
export { createAssertCamelPure as createAssertCamel };
/**
 * Creates a reusable {@link isCamel} function.
 *
 * @danger You must configure the generic argument `T`
 * @returns Nothing until be configure the generic argument `T`
 * @throws compile error
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createIsCamel(): never;
/**
 * Creates a reusable {@link isCamel} function.
 *
 * @template T Type of the input value
 * @returns A reusable `isCamel` function
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createIsCamel<T>(): (input: T) => CamelCase<T> | null;
declare const createIsCamelPure: typeof createIsCamel;
export { createIsCamelPure as createIsCamel };
/**
 * Creates a reusable {@link validateCamel} function.
 *
 * @danger You must configure the generic argument `T`
 * @returns Nothing until be configure the generic argument `T`
 * @throws compile error
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createValidateCamel(): never;
/**
 * Creates a reusable {@link validateCamel} function.
 *
 * @template T Type of the input value
 * @returns A reusable `validateCamel` function
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createValidateCamel<T>(): (input: T) => IValidation<CamelCase<T>>;
declare const createValidateCamelPure: typeof createValidateCamel;
export { createValidateCamelPure as createValidateCamel };
/**
 * Creates a reusable {@link pascal} function.
 *
 * @danger You must configure the generic argument `T`
 * @returns Nothing until be configure the generic argument `T`
 * @throws compile error
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createPascal(): never;
/**
 * Creates a reusable {@link pascal} function.
 *
 * @template T Type of the input value
 * @returns A reusable `pascal` function
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createPascal<T>(): (input: T) => PascalCase<T>;
declare const createPascalPure: typeof createPascal;
export { createPascalPure as createPascal };
/**
 * Creates a reusable {@link assertPascal} function.
 *
 * @danger You must configure the generic argument `T`
 * @param errorFactory Custom error factory. Default is `TypeGuardError`
 * @returns Nothing until be configure the generic argument `T`
 * @throws compile error
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createAssertPascal(errorFactory?: undefined | ((props: TypeGuardError.IProps) => Error)): never;
/**
 * Creates a reusable {@link assertPascal} function.
 *
 * @template T Type of the input value
 * @param errorFactory Custom error factory. Default is `TypeGuardError`
 * @returns A reusable `assertPascal` function
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createAssertPascal<T>(errorFactory?: undefined | ((props: TypeGuardError.IProps) => Error)): (input: T) => PascalCase<T>;
declare const createAssertPascalPure: typeof createAssertPascal;
export { createAssertPascalPure as createAssertPascal };
/**
 * Creates a reusable {@link isPascal} function.
 *
 * @danger You must configure the generic argument `T`
 * @returns Nothing until be configure the generic argument `T`
 * @throws compile error
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createIsPascal(): never;
/**
 * Creates a reusable {@link isPascal} function.
 *
 * @template T Type of the input value
 * @returns A reusable `isPascal` function
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createIsPascal<T>(): (input: T) => PascalCase<T> | null;
declare const createIsPascalPure: typeof createIsPascal;
export { createIsPascalPure as createIsPascal };
/**
 * Creates a reusable {@link validatePascal} function.
 *
 * @danger You must configure the generic argument `T`
 * @returns Nothing until be configure the generic argument `T`
 * @throws compile error
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createValidatePascal(): never;
/**
 * Creates a reusable {@link validatePascal} function.
 *
 * @template T Type of the input value
 * @returns A reusable `validatePascal` function
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createValidatePascal<T>(): (input: T) => IValidation<PascalCase<T>>;
declare const createValidatePascalPure: typeof createValidatePascal;
export { createValidatePascalPure as createValidatePascal };
/**
 * Creates a reusable {@link snake} function.
 *
 * @danger You must configure the generic argument `T`
 * @returns Nothing until be configure the generic argument `T`
 * @throws compile error
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createSnake(): never;
/**
 * Creates a reusable {@link snake} function.
 *
 * @template T Type of the input value
 * @returns A reusable `snake` function
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createSnake<T>(): (input: T) => SnakeCase<T>;
declare const createSnakePure: typeof createSnake;
export { createSnakePure as createSnake };
/**
 * Creates a reusable {@link assertSnake} function.
 *
 * @danger You must configure the generic argument `T`
 * @param errorFactory Custom error factory. Default is `TypeGuardError`
 * @returns Nothing until be configure the generic argument `T`
 * @throws compile error
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createAssertSnake(errorFactory?: undefined | ((props: TypeGuardError.IProps) => Error)): never;
/**
 * Creates a reusable {@link assertSnake} function.
 *
 * @template T Type of the input value
 * @param errorFactory Custom error factory. Default is `TypeGuardError`
 * @returns A reusable `assertSnake` function
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createAssertSnake<T>(errorFactory?: undefined | ((props: TypeGuardError.IProps) => Error)): (input: T) => SnakeCase<T>;
declare const createAssertSnakePure: typeof createAssertSnake;
export { createAssertSnakePure as createAssertSnake };
/**
 * Creates a reusable {@link isSnake} function.
 *
 * @danger You must configure the generic argument `T`
 * @returns Nothing until be configure the generic argument `T`
 * @throws compile error
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createIsSnake(): never;
/**
 * Creates a reusable {@link isSnake} function.
 *
 * @template T Type of the input value
 * @returns A reusable `isSnake` function
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createIsSnake<T>(): (input: T) => SnakeCase<T> | null;
declare const createIsSnakePure: typeof createIsSnake;
export { createIsSnakePure as createIsSnake };
/**
 * Creates a reusable {@link validateSnake} function.
 *
 * @danger You must configure the generic argument `T`
 * @returns Nothing until be configure the generic argument `T`
 * @throws compile error
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createValidateSnake(): never;
/**
 * Creates a reusable {@link validateSnake} function.
 *
 * @template T Type of the input value
 * @returns A reusable `validateSnake` function
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function createValidateSnake<T>(): (input: T) => IValidation<SnakeCase<T>>;
declare const createValidateSnakePure: typeof createValidateSnake;
export { createValidateSnakePure as createValidateSnake };
