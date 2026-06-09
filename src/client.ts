import { SensorReadingsResource } from "./resources/sensor-readings.js";
import { DevicesResource } from "./resources/devices.js";
import { PlantsResource } from "./resources/plants.js";
import { TasksResource } from "./resources/tasks.js";
import { LabelsResource } from "./resources/labels.js";

/** Internal type for the shared request function passed to each resource. */
export type RequestFn = <T>(path: string, options?: RequestInit) => Promise<T>;

export interface XPlantClientConfig {
  /**
   * Your xPlant API key (xpk_live_... or xpk_dev_...).
   * Create one at https://xplant.shmaplex.com/settings/integrations
   *
   * Note: keep this out of version control. Use environment variables:
   *   const client = new XPlantClient({ apiKey: process.env.XPLANT_API_KEY! });
   */
  apiKey: string;
  /**
   * Override the base URL. Defaults to https://xplant.shmaplex.com.
   * Useful for pointing at a local dev server during testing.
   */
  baseUrl?: string;
}

/** Error thrown when the xPlant API returns a non-2xx response. */
export class XPlantError extends Error {
  readonly status: number;
  readonly body: string;

  constructor(status: number, body: string) {
    super(`xPlant API error ${status}: ${body}`);
    this.name = "XPlantError";
    this.status = status;
    this.body = body;
  }
}

export class XPlantClient {
  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor(config: XPlantClientConfig) {
    if (!config.apiKey) {
      throw new Error(
        "XPlantClient: apiKey is required. " +
          "Create one at https://xplant.shmaplex.com/settings/integrations",
      );
    }
    this.apiKey = config.apiKey;
    this.baseUrl = (config.baseUrl ?? "https://xplant.shmaplex.com").replace(/\/$/, "");
  }

  async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
        ...(options.headers ?? {}),
      },
    });

    if (!res.ok) {
      const body = await res.text();
      throw new XPlantError(res.status, body);
    }

    return res.json() as Promise<T>;
  }

  /** Submit environmental sensor readings (temperature, humidity, CO2, lux, etc.) */
  get sensorReadings(): SensorReadingsResource {
    return new SensorReadingsResource(this.request.bind(this));
  }

  /** Register devices, send heartbeats, and retrieve device metadata */
  get devices(): DevicesResource {
    return new DevicesResource(this.request.bind(this));
  }

  /** Read plant summaries — requires `read:plants` scope */
  get plants(): PlantsResource {
    return new PlantsResource(this.request.bind(this));
  }

  /** Read task summaries — requires `read:tasks` scope */
  get tasks(): TasksResource {
    return new TasksResource(this.request.bind(this));
  }

  /** Resolve QR/barcode label codes to xPlant records — requires `read:labels` scope */
  get labels(): LabelsResource {
    return new LabelsResource(this.request.bind(this));
  }
}
