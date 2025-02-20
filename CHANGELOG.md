# @uploadfast/client

## 1.1.0

### Minor Changes

- Migrated test framework from Jest to Japa
- Added comprehensive test suite for SDK functionality including:
  - Client creation validation
  - File upload validation
  - Single and multiple file upload testing
  - File deletion validation and testing
  - Integration tests for upload and delete operations

### Maintenance & Improvements

- Updated development dependencies
- Improved error handling in test environment
- Added CI environment support in tests
- Standardized test response validation

## 1.0.2

### Patch Changes

- Deprecated file method inside of upload and delete method parameter object, in favor of 'resource'
  property.

- Instead of file property now use the 'resource' property to reference a single file objects or an
  array of file object

## 0.1.2

### Patch Changes

- Deprecated file method inside of upload and delete method parameter object, in favor of 'resource'
  property.

- Instead of file property now use the 'resource' property to reference a single file objects or an
  array of file object

## 0.1.1

### Maintenance & Improvements

- Added documentation comments

## 0.1.0

### Minor Changes

- Added new method (delete) for deleting files and fixed buggy tests

## 0.0.14

### Patch Changes

- switched back to fetch api

## 0.0.13

### Patch Changes

- Upload method bug

## 0.0.7

### Patch Changes

- Patched upload method

## 0.0.5

### Patch Changes

- Added createClient for instantiating SDK.

## 0.0.4

### Patch Changes

- 586de89: Added MIT license and moved some packages to devDependencies. Added CreateClient function
  as an alternative to instantiating a new class. (Breaking change)
