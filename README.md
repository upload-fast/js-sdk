## UploadFast JS SDK

A lightweight JavaScript SDK for seamlessly uploading and managing files with
[UploadFast](https://www.uploadfast.dev).

UploadFast is a media management platform that leverages cloudflare's global edge network to serve
your users images and videos (fast)!

This SDK provides a simple interface for handling file uploads, deletions, and management in your
web applications.

## Installation

Install using your preferred package manager:

```bash
npm install @uploadfast/client
# or
yarn add @uploadfast/client
# or
pnpm add @uploadfast/client
```

## Quick Start

```typescript
import { createClient } from "@uploadfast/client";

// Initialize the client
const uploadfast = createClient({
  apiKey: "your_api_key_here",
});

// Upload a single file
const file = new File(["file content"], "example.png", { type: "image/png" });
try {
  const response = await uploadfast.upload({ resource: file });
  console.log("Upload successful:", response[0].url);
} catch (error) {
  console.error("Upload failed:", error);
}
```

## Framework Examples

### Next.js API Route (App Router)

```typescript
// app/api/upload/route.ts
import { createClient } from "@uploadfast/client";

export async function POST(request: Request) {
  const uploadfast = createClient({
    apiKey: process.env.UPLOAD_FAST_API_KEY!,
  });

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    const response = await uploadfast.upload({ resource: file });
    return Response.json(response);
  } catch (error) {
    console.error("Upload failed:", error);
    return Response.json({ error: "Upload failed" }, { status: 500 });
  }
}
```

### Next.js Client Usage

```typescript
// app/components/FileUpload.tsx
"use client";

async function handleSubmit(formData: FormData) {
  try {
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    console.log("Upload successful:", data[0].url);
  } catch (error) {
    console.error("Upload failed:", error);
  }
}

export function FileUpload() {
  return (
    <form action={handleSubmit}>
      <input type="file" name="file" />
      <button type="submit">Upload</button>
    </form>
  );
}
```

### Remix Server Action

```typescript
// app/routes/upload.tsx
import { createClient } from "@uploadfast/client";
import { json, type ActionFunctionArgs } from "@remix-run/node";

export async function action({ request }: ActionFunctionArgs) {
  const uploadfast = createClient({
    apiKey: process.env.UPLOAD_FAST_API_KEY!,
  });

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return json({ error: "No file provided" }, { status: 400 });
    }

    const response = await uploadfast.upload({ resource: file });
    return json(response);
  } catch (error) {
    console.error("Upload failed:", error);
    return json({ error: "Upload failed" }, { status: 500 });
  }
}

export default function Upload() {
  return (
    <Form method="post" encType="multipart/form-data">
      <input type="file" name="file" />
      <button type="submit">Upload</button>
    </Form>
  );
}
```

### Multiple File Upload Example

```typescript
// app/api/upload/route.ts
import { createClient } from "@uploadfast/client";

export async function POST(request: Request) {
  const uploadfast = createClient({
    apiKey: process.env.UPLOAD_FAST_API_KEY!,
  });

  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    if (!files.length) {
      return Response.json({ error: "No files provided" }, { status: 400 });
    }

    const response = await uploadfast.upload({ resource: files });
    return Response.json(response);
  } catch (error) {
    console.error("Upload failed:", error);
    return Response.json({ error: "Upload failed" }, { status: 500 });
  }
}
```

### File Deletion Example

```typescript
// app/api/delete/route.ts
import { createClient } from "@uploadfast/client";

export async function DELETE(request: Request) {
  const uploadfast = createClient({
    apiKey: process.env.UPLOAD_FAST_API_KEY!,
  });

  try {
    const { urls } = await request.json();

    if (!urls || !urls.length) {
      return Response.json({ error: "No URLs provided" }, { status: 400 });
    }

    const response = await uploadfast.delete({ resource: urls });
    return Response.json(response);
  } catch (error) {
    console.error("Deletion failed:", error);
    return Response.json({ error: "Deletion failed" }, { status: 500 });
  }
}
```

## API Reference

### Initialization

Create a new UploadFast client instance:

```typescript
import { createClient } from "@uploadfast/client";

const uploadfast = createClient({
  apiKey: process.env.UPLOAD_FAST_API_KEY,
});
```

### File Upload

Upload a single file or multiple files:

```typescript
// Single file upload
const file = new File(["content"], "example.png", { type: "image/png" });
const response = await uploadfast.upload({
  resource: file,
});
// response type: { file_name: string; file_size: number; url: string; bucket: string; }[]

// Multiple files upload
const files = [
  new File(["content1"], "example1.png", { type: "image/png" }),
  new File(["content2"], "example2.jpg", { type: "image/jpeg" }),
];
const response = await uploadfast.upload({
  resource: files,
});
```
