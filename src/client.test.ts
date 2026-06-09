import { describe, it, expect } from "vitest";
import { XPlantClient, XPlantError } from "./client.js";

describe("XPlantClient", () => {
  it("instantiates with an API key", () => {
    const client = new XPlantClient({ apiKey: "xpk_live_test" });
    expect(client).toBeInstanceOf(XPlantClient);
  });

  it("exposes resource accessors", () => {
    const client = new XPlantClient({ apiKey: "xpk_live_test" });
    expect(client.sensorReadings).toBeDefined();
    expect(client.devices).toBeDefined();
    expect(client.plants).toBeDefined();
    expect(client.tasks).toBeDefined();
    expect(client.labels).toBeDefined();
  });

  it("accepts a custom baseUrl", () => {
    const client = new XPlantClient({
      apiKey: "xpk_live_test",
      baseUrl: "https://custom.example.com",
    });
    expect(client).toBeInstanceOf(XPlantClient);
  });
});

describe("XPlantError", () => {
  it("stores status and body", () => {
    const err = new XPlantError(403, "Forbidden");
    expect(err.status).toBe(403);
    expect(err.body).toBe("Forbidden");
    expect(err).toBeInstanceOf(Error);
  });

  it("has a readable message", () => {
    const err = new XPlantError(401, "Unauthorized");
    expect(err.message).toContain("401");
  });
});
