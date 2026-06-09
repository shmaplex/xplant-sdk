# Changelog

All notable changes to `@shmaplex/xplant-sdk` will be documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
This package uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

> **Note on scope:** This package is published as `@shmaplex/xplant-sdk` while the
> `@xplant` npm org is being arranged. It will be re-published as `@xplant/sdk`
> once the scope is available, with a deprecation notice on this package.

---

## [Unreleased]

## [0.1.0] — 2026-06-09

### Added
- `XPlantClient` — main entry point with API key auth and base URL override
- `XPlantError` — typed error class with `status` and `body` fields
- `SensorReadingsResource` — `create()` and `list()` for environmental sensor data
- `DevicesResource` — `heartbeat()`, `register()`, and `get()` for device management
- `PlantsResource` — `list()` and `get()` for plant record reads
- `TasksResource` — `list()` for due task reads
- `LabelsResource` — `resolve()` for QR/barcode label lookup
- Full TypeScript types: `SensorReading`, `DeviceEvent`, `PlantSummary`, `TaskSummary`, `LabelResolveResult`
- Dual CJS + ESM build via `tsup`
- CI workflow (Node 18/20/22)
- Automated npm publish on semver tag
