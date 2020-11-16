# Murmurations Library

This repo is for storing and curating Murmurations **fields** and **schemas**.

Additions or modifications to library fields occur through pull requests to this repo. Issues can be used to discuss and propose updates or changes. 

Schemas are created by specific networks or interest groups, and they are added to this repo by pull request.

## Overview

A **schema** is a group of **fields** (data points) that together provide information that is useful to **aggregators** who present that data in meaningful ways. Schemas define the composition of fields, and fields define the type and validation rules for data.

An example of field composition in a schema can be seen in this [demo schema](schemas/demo-v1.json).

Note how fields are defined separately, including information about their type and other validation rules. For example, see how the [`name` field](fields/name-v1.json) is defined.

### Validation

All schemas and fields must validate against the [JSON Schema](https://json-schema.org/) vocabulary for annotating and validating JSON documents.

A useful online validation tool can be found at: https://www.jsonschemavalidator.net/

Schemas and fields in the Murmurations library are validated against JSON Schema Draft 4.

## Creating a Schema

1. Define all of the data points (fields) you want to collect from the nodes you want to aggregate
2. Check if any of those fields already exist in the [field library](fields/)
3. Draft your schema following the example format of the [demo schema](schemas/demo-v1.json)
    - Use `$ref`s to point to any existing fields in the library you want to use, or else define the new fields you need directly in the schema
    - Reusing existing fields from the library whenever possible makes it easier for nodes using your schema to be compatible with other schemas without needing to re-enter the same data twice
4. Make sure your schema validates using the [JSON Schema Validator](https://www.jsonschemavalidator.net/)
    - Select _Schema Draft v4_ from the "Select schema" dropdown menu and then paste your schema into the "Input JSON" text area
5. Fork this library repo and create a new branch for your schema, then create a pull request
