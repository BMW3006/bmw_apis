import { NextRequest, NextResponse } from "next/server"

const upstreamBase = "https://apis.davidcyril.name.ng"

const candidates: Record<string, string[]> = {
  tiktok: ["/api/tiktok", "/api/download/tiktok", "/api/v1/tiktok"],
  youtube: ["/api/youtube", "/api/download/youtube", "/api/v1/youtube"],
  instagram: ["/api/instagram", "/api/download/instagram", "/api/v1/instagram"],
  threads: ["/api/threads", "/api/download/threads", "/api/v1/threads"],
  y2mate: ["/api/y2mate", "/api/download/y2mate", "/api/v1/y2mate"],
  downr: ["/api/downr", "/api/download", "/api/v1/downr"],
  spotify: ["/api/spotify", "/api/download/spotify", "/api/v1/spotify"],
}

function isValidUrl(value: string) {
  try { return ["http:", "https:"].includes(new URL(value).protocol) } catch { return false }
}

export async function GET(request: NextRequest, context: { params: Promise<{ service: string }> }) {
  const { service } = await context.params
  const input = request.nextUrl.searchParams.get("url")
  if (!input) return NextResponse.json({ status: false, error: "Missing required query parameter: url" }, { status: 400 })
  if (!isValidUrl(input)) return NextResponse.json({ status: false, error: "url must be a valid http or https URL" }, { status: 400 })

  const query = new URLSearchParams(request.nextUrl.searchParams)
  const paths = candidates[service] ?? [`/api/${service}`, `/api/v1/${service}`]
  let lastStatus = 502
  let lastBody = "Upstream API unavailable"

  for (const path of paths) {
    try {
      const upstream = await fetch(`${upstreamBase}${path}?${query.toString()}`, {
        headers: { Accept: "application/json", "User-Agent": "BMW-APIs/1.0" },
        signal: AbortSignal.timeout(25000),
        cache: "no-store",
      })
      const body = await upstream.text()
      lastStatus = upstream.status
      lastBody = body
      if (upstream.status === 404) continue
      try { return NextResponse.json(JSON.parse(body), { status: upstream.status }) } catch { return new NextResponse(body, { status: upstream.status, headers: { "content-type": upstream.headers.get("content-type") ?? "text/plain" } }) }
    } catch (error) {
      lastBody = error instanceof Error ? error.message : "Upstream request failed"
    }
  }

  return NextResponse.json({ status: false, error: "BMW API upstream did not return a result", upstream_status: lastStatus, details: lastBody.slice(0, 300) }, { status: 502 })
}

export const dynamic = "force-dynamic"
export const runtime = "nodejs"
