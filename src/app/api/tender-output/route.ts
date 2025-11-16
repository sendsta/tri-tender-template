import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// API handler for tender-output resources.
//
// When called without a `file` query parameter this endpoint returns a JSON
// object listing all HTML files present in the `tender-output/` directory.
// When called with `?file=<filename>` it will return the raw HTML for that
// specific file.  The directory traversal is prevented by only joining
// relative filenames and filtering for `.html` files.
export async function GET(request: Request) {
  const url = new URL(request.url);
  const file = url.searchParams.get('file');
  const dir = path.join(process.cwd(), 'tender-output');

  // If a file is specified, attempt to read and return its contents.
  if (file) {
    // Only allow .html files to be requested
    if (!file.endsWith('.html')) {
      return NextResponse.json({ error: 'Only HTML files may be requested' }, { status: 400 });
    }
    const filePath = path.join(dir, file);
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      return new Response(content, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    } catch (err) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
  }

  // Otherwise, list all HTML files in the directory
  try {
    const files = fs
      .readdirSync(dir)
      .filter((fname) => fname.toLowerCase().endsWith('.html'));
    return NextResponse.json({ files });
  } catch (err) {
    // Directory may not exist if nothing has been generated yet.
    return NextResponse.json({ files: [] });
  }
}