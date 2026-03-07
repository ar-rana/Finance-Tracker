$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Push-Location "$root\v0"
try {
  $cacheDir = Join-Path $root ".gocache"
  $modCacheDir = Join-Path $root ".gomodcache"
  if (!(Test-Path $cacheDir)) {
    New-Item -ItemType Directory -Path $cacheDir | Out-Null
  }
  if (!(Test-Path $modCacheDir)) {
    New-Item -ItemType Directory -Path $modCacheDir | Out-Null
  }
  $env:CGO_ENABLED = "0"
  $env:GOOS = "linux"
  $env:GOARCH = "amd64"
  $env:GOCACHE = $cacheDir
  $env:GOMODCACHE = $modCacheDir
  go build -o "$root\handler" .
}
finally {
  Pop-Location
}
