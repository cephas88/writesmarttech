# PowerShell script to create placeholder image files
# Note: This script creates text files as placeholders - in a real project,
# you would use actual images

# List of required images
$images = @(
    "hero-bg.jpg",
    "extract.jpg",
    "chrome-extensions.jpg",
    "developer-mode.jpg",
    "load-unpacked.jpg",
    "pin-extension.jpg"
)

# Ensure images directory exists
if (!(Test-Path -Path "images")) {
    New-Item -ItemType Directory -Path "images"
}

# Create placeholder files with instructions
foreach ($image in $images) {
    $content = "This is a placeholder for $image`n`n"
    
    switch ($image) {
        "hero-bg.jpg" { 
            $content += "For the actual website, replace this with a professional hero image background.`n"
            $content += "Recommended size: 1920x1080px with dark overlay for text readability."
        }
        "extract.jpg" { 
            $content += "Replace with a screenshot showing how to extract ZIP files in Windows.`n"
            $content += "Include the right-click menu with 'Extract All...' option visible."
        }
        "chrome-extensions.jpg" { 
            $content += "Replace with a screenshot of Chrome's extensions page (chrome://extensions).`n"
            $content += "Show the address bar with 'chrome://extensions' visible."
        }
        "developer-mode.jpg" { 
            $content += "Replace with a screenshot highlighting the Developer Mode toggle in Chrome's extensions page.`n"
            $content += "Make sure the toggle is clearly visible in the top-right corner."
        }
        "load-unpacked.jpg" { 
            $content += "Replace with a screenshot showing the 'Load unpacked' button in Chrome's extensions page.`n"
            $content += "Highlight the button in the top-left area of the page."
        }
        "pin-extension.jpg" { 
            $content += "Replace with a screenshot showing how to pin an extension in Chrome.`n"
            $content += "Include the puzzle piece icon and the pin option next to an extension."
        }
    }
    
    $filePath = "images/$image.txt"
    Set-Content -Path $filePath -Value $content
    
    Write-Host "Created placeholder for $image at $filePath" -ForegroundColor Green
}

Write-Host "Placeholder images created successfully!" -ForegroundColor Green
Write-Host "Note: For the actual website, replace these text files with real images." -ForegroundColor Yellow 