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
