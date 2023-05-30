const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configure the input and output folders
const inputFolder = path.join(__dirname, 'uploads');
const outputFolder = path.join(__dirname, 'compressed');

// Define the target image width and height
const targetWidth = 800;
const targetHeight = 600;

// Compress and resize images
async function compressAndResizeImages() {
  try {
    // Read the input folder
    const files = await fs.promises.readdir(inputFolder);

    console.log('Images compressed and resized successfully:');

    // Process each file for compression and resizing
    for (const file of files) {
      const sourcePath = path.join(inputFolder, file);
      const destinationPath = path.join(outputFolder, file);

      // Read the image file using sharp
      const image = sharp(sourcePath);

      // Apply appropriate compression based on file format
      if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
        image.jpeg({ quality: 70 });
      } else if (file.endsWith('.png')) {
        image.png({ compressionLevel: 9, adaptiveFiltering: true, force: true });
      }

      // Resize the image
      await image.resize(targetWidth, targetHeight).toFile(destinationPath);

      console.log(`${sourcePath} -> ${destinationPath}`);
    }
  } catch (error) {
    console.error('Error compressing and resizing images:', error);
  }
}

// Run the compression and resizing script
compressAndResizeImages();
