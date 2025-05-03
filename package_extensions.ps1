# PowerShell script to package Chrome extensions for distribution

# Create directories if they don't exist
if (!(Test-Path -Path "downloads")) {
    New-Item -ItemType Directory -Path "downloads"
}

# Package Writedom Bidding Bot
Write-Host "Packaging Writedom Bidding Bot..." -ForegroundColor Green
$writedomSourcePath = "Writedom Bidding Bot"
$writedomZipPath = "downloads/writedom-bidding-bot.zip"

if (Test-Path -Path $writedomSourcePath) {
    Compress-Archive -Path "$writedomSourcePath/*" -DestinationPath $writedomZipPath -Force
    Write-Host "Writedom Bidding Bot packaged successfully at $writedomZipPath" -ForegroundColor Green
} else {
    Write-Host "Error: Writedom Bidding Bot directory not found at $writedomSourcePath" -ForegroundColor Red
}

# Package WritersHub Bidding Bot
Write-Host "Packaging WritersHub Bidding Bot..." -ForegroundColor Green
$writershubSourcePath = "WritersHub Bidding Bot"
$writershubZipPath = "downloads/writershub-bidding-bot.zip"

if (Test-Path -Path $writershubSourcePath) {
    Compress-Archive -Path "$writershubSourcePath/*" -DestinationPath $writershubZipPath -Force
    Write-Host "WritersHub Bidding Bot packaged successfully at $writershubZipPath" -ForegroundColor Green
} else {
    Write-Host "Error: WritersHub Bidding Bot directory not found at $writershubSourcePath" -ForegroundColor Red
}

Write-Host "Packaging complete!" -ForegroundColor Green 