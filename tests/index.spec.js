import { test } from "@japa/runner";
import { createClient } from "../dist/index.js";
import { UF_Error } from "../dist/error.js";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.API_KEY;

test.group("UploadFast SDK", () => {
  test("should create client instance successfully", ({ assert }) => {
    const client = createClient({ apiKey: API_KEY });
    assert.exists(client);
  });

  test("should throw error when creating client without API key", ({
    assert,
  }) => {
    assert.throws(() => createClient({ apiKey: "" }), "API key is required");
  });

  test("should throw error when uploading without resource", async ({
    assert,
  }) => {
    const client = createClient({ apiKey: API_KEY });

    try {
      // @ts-ignore - Testing invalid input
      await client.upload({ resource: null });
      assert.fail("Should have thrown an error");
    } catch (error) {
      assert.instanceOf(error, UF_Error);
      assert.equal(error.code, 400);
      assert.equal(error.message, "Resource is required");
    }
  });

  test("should throw error when uploading invalid file resource", async ({
    assert,
  }) => {
    const client = createClient({ apiKey: API_KEY });

    try {
      // @ts-ignore - Testing invalid input
      await client.upload({ resource: { invalid: "file" } });
      assert.fail("Should have thrown an error");
    } catch (error) {
      assert.instanceOf(error, UF_Error);
      assert.equal(error.code, 400);
      assert.equal(error.message, "Invalid file resource");
    }
  });

  test("should upload single file successfully", async ({ assert }) => {
    const client = createClient({ apiKey: API_KEY });
    const file = new File(["test content"], "test.txt", { type: "text/plain" });

    try {
      const response = await client.upload({ resource: file });
      assert.isArray(response);
      assert.property(response[0], "url");
      assert.property(response[0], "file_name");
      assert.property(response[0], "file_size");
      assert.property(response[0], "bucket");

      // Delete the uploaded file
      await client.delete({ resource: response[0].url });
    } catch (error) {
      // Skip test if API key is not valid (for CI environments)
      if (API_KEY === "test_key") {
        assert.isTrue(true);
      } else {
        throw error;
      }
    }
  });

  test("should upload multiple files successfully", async ({ assert }) => {
    const client = createClient({ apiKey: API_KEY });
    const files = [
      new File(["test content 1"], "test1.txt", { type: "text/plain" }),
      new File(["test content 2"], "test2.txt", { type: "text/plain" }),
    ];

    try {
      const response = await client.upload({ resource: files });
      assert.isArray(response);
      assert.lengthOf(response, 2);
      response.forEach((item) => {
        assert.property(item, "url");
        assert.property(item, "file_name");
        assert.property(item, "file_size");
        assert.property(item, "bucket");
      });

      // Delete the uploaded files
      await client.delete({ resource: response.map((item) => item.url) });
    } catch (error) {
      // Skip test if API key is not valid (for CI environments)
      if (API_KEY === "test_key") {
        assert.isTrue(true);
      } else {
        throw error;
      }
    }
  });

  test("should throw error when deleting without resource", async ({
    assert,
  }) => {
    const client = createClient({ apiKey: API_KEY });

    try {
      // @ts-ignore - Testing invalid input
      await client.delete({ resource: null });
      assert.fail("Should have thrown an error");
    } catch (error) {
      assert.instanceOf(error, UF_Error);
      assert.equal(error.code, 400);
      assert.equal(error.message, "Resource URL is required");
    }
  });
});
